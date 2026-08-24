#!/usr/bin/env node
/*
 * Fidelity check. Rebuilds the source markdown out of the parsed JSON and
 * diffs it against content/maine_map_content_v3.md character by character.
 *
 * A clean run is the proof that the build renders the document rather than
 * editing it. Run it after every parser change and before any publish.
 *
 *   node scripts/verify-fidelity.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { SUBSTITUTIONS, LINE_RULES, RENDER_EXCLUDE_SECTIONS, applyDeclared } = require('./build-config.js');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'content', 'maine_map_content_v3.md');
const DATA = path.join(ROOT, 'data');

const read = f => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));

/* A run list renders back to its original string by putting every marker
 * back inside its brackets. */
const fromRuns = runs => runs.map(r => r.t === 'marker' ? '[' + r.v + ']' : r.v).join('');

function emitBlock(b, out) {
  switch (b.type) {
    case 'para':
      out.push(fromRuns(b.runs));
      break;
    case 'meta':
      out.push(b.parts.join(' · '));
      break;
    case 'rating':
      out.push('**' + b.heat + ' DEPTH: ' + b.depth + '**');
      break;
    case 'openness':
      out.push(b.contact ? b.level + ' ' + b.contact : b.level);
      break;
    case 'callout':
      out.push('> [!CALLOUT] ' + b.label);
      b.paragraphs.forEach(p => out.push('> ' + fromRuns(p.runs)));
      break;
    case 'table':
      if (!b.headerless) out.push('| ' + b.headers.join(' | ') + ' |');
      b.rows.forEach(cells => out.push('| ' + cells.map(c => fromRuns(c.runs)).join(' | ') + ' |'));
      break;
    default:
      throw new Error('unknown block type ' + b.type);
  }
}

function emitSection(s, out) {
  out.push('## ' + s.heading);
  s.blocks.forEach(b => emitBlock(b, out));
  (s.entries || []).forEach(e => { out.push('#### ' + e.title); e.blocks.forEach(b => emitBlock(b, out)); });
  s.subsections.forEach(sub => {
    out.push('### ' + sub.heading);
    sub.blocks.forEach(b => emitBlock(b, out));
    sub.entries.forEach(e => { out.push('#### ' + e.title); e.blocks.forEach(b => emitBlock(b, out)); });
  });
}

/* Normalise the source the same way the parser does: drop blank lines, drop
 * table separator rows, collapse the runs of spaces the source uses to align
 * middot strips and openness lines, and trim. Nothing else is touched. */
function normalise(text) {
  return text.split(/\r?\n/)
    .map(l => l.replace(/\s+$/, ''))
    .filter(l => l.trim())
    .filter(l => !/^\|[\s\-:|]+\|$/.test(l))
    .map(l => l.replace(/[ \t]{2,}/g, ' ').trim())
    .join('\n');
}

let source = fs.readFileSync(SRC, 'utf8');

/* Apply the declared rules, so the diff below proves the rendered document
   differs from the source by exactly that list and nothing else. */
source = applyDeclared(source).text;

/* Cut the withheld sections out of the comparison text. A section runs from
   its own H2 to the next H2. */
const excludeNums = RENDER_EXCLUDE_SECTIONS.filter(x => x.num).map(x => x.num);
const excludeTitles = RENDER_EXCLUDE_SECTIONS.filter(x => x.title).map(x => x.title.toLowerCase());
function dropSections(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let skipping = false;
  for (const l of lines) {
    if (l.startsWith('## ')) {
      const m = l.match(/^## (?:(\d+)\.)?\s*(.*)$/);
      const byNum = !!(m && m[1] && excludeNums.indexOf(m[1]) >= 0);
      const byTitle = !!(m && !m[1] && excludeTitles.indexOf(m[2].trim().toLowerCase()) >= 0);
      skipping = byNum || byTitle;
    }
    if (!skipping) out.push(l);
  }
  return out.join('\n');
}
source = dropSections(source);

const sections = read('sections.json');

/* The opening ROSC INTERNAL callout sits before any heading. */
const callouts = read('callouts.json');
const header = source.split(/\r?\n/).slice(0, 5).filter(l => l.trim()).join('\n');

const out = [];
out.push(header);
sections.forEach(s => emitSection(s, out));

const rebuilt = normalise(out.join('\n'));
const original = normalise(source);

if (rebuilt === original) {
  console.log('FIDELITY OK');
  console.log('  ' + original.split('\n').length + ' content lines round-tripped identically');
  console.log('  ' + original.length + ' characters compared');
  console.log('  declared: ' + SUBSTITUTIONS.length + ' substitutions, ' + LINE_RULES.length +
    ' line rule, ' + RENDER_EXCLUDE_SECTIONS.length + ' withheld section');
  console.log('  everything outside those declarations is character identical');
  process.exit(0);
}

const a = original.split('\n');
const b = rebuilt.split('\n');
let shown = 0;
console.error('FIDELITY FAILED');
for (let i = 0; i < Math.max(a.length, b.length) && shown < 12; i++) {
  if (a[i] !== b[i]) {
    console.error('  line ' + (i + 1));
    console.error('    source: ' + JSON.stringify(a[i]));
    console.error('    built : ' + JSON.stringify(b[i]));
    shown++;
  }
}
console.error('  source lines ' + a.length + ', rebuilt lines ' + b.length);
process.exit(1);
