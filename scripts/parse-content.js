#!/usr/bin/env node
/*
 * Build-time parser for maine_map_content_v3.md.
 *
 * Reads the source markdown and emits a data/ directory of JSON. No prose is
 * rewritten, reordered, merged or corrected anywhere in this file. Text is
 * only ever split, never edited. The one transformation applied to prose is
 * that inline confidence markers such as [UNVERIFIED] are lifted out of the
 * character stream into their own run, so the interface can render them as
 * chips in the exact position they occupied.
 *
 * Run:  node scripts/parse-content.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { PLACES, OUTLINE, CORRIDOR } = require('./geo-coordinates.js');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'content', 'maine_map_content_v3.md');
const OUT = path.join(ROOT, 'data');

/* ------------------------------------------------------------------ */
/* Expected inventory. The parser fails the build if these drift.      */
/* ------------------------------------------------------------------ */
const EXPECTED = {
  sections: 12,      // top-level numbered sections, Contents excluded
  clusters: 9,       // section 4.1 through 4.9
  callouts: 43,
  tables: 15
};

const { RENDER_EXCLUDE_SECTIONS, applyDeclared } = require('./build-config.js');

/* ------------------------------------------------------------------ */
/* Callout label to colour scheme. Brief section 4.3.                  */
/* ------------------------------------------------------------------ */
function calloutScheme(label) {
  const L = label.toUpperCase();
  if (L === 'MTI IS THE UNIVERSAL FIRST CALL' || L === 'THE DEFINING MECHANIC') return 'start';
  if (L.startsWith('VC WHITE SPACE') || L.startsWith('VC READ')) return 'green';
  if (L.startsWith('TIME') || L.startsWith('DUE')) return 'urgent';
  if (L.startsWith('MAINE CONSTRAINT') || L === 'HANDLE WITH CARE' ||
      L === 'TRACK THIS, DO NOT UNDERWRITE IT') return 'red';
  if (L === 'RELATED PARTY' || L === 'ON CONTACT INFORMATION' ||
      L === 'HOW TO READ THIS ENTRY') return 'amber';
  if (L === 'ROSC INTERNAL' || L === 'REVISION NOTE') return 'structural';
  return 'rust';
}

/* Labels the mapping above names explicitly. Anything outside this set
 * falls through to the neutral rust default and is reported at the end of
 * the run so an unrecognised label is never silently absorbed. */
const KNOWN_LABELS = new Set([
  'MTI IS THE UNIVERSAL FIRST CALL', 'THE DEFINING MECHANIC', 'HANDLE WITH CARE',
  'TRACK THIS, DO NOT UNDERWRITE IT', 'RELATED PARTY', 'ON CONTACT INFORMATION',
  'HOW TO READ THIS ENTRY', 'ROSC INTERNAL', 'REVISION NOTE'
]);
function labelIsClassified(label) {
  const L = label.toUpperCase();
  return KNOWN_LABELS.has(L) || L.startsWith('VC WHITE SPACE') || L.startsWith('VC READ') ||
    L.startsWith('TIME') || L.startsWith('DUE') || L.startsWith('MAINE CONSTRAINT');
}

/* ------------------------------------------------------------------ */
/* Inline confidence markers.                                          */
/* ------------------------------------------------------------------ */
const MARKER_RE = /\[([A-Z][A-Z0-9 ,./:()-]*)\]/g;

function markerTone(body) {
  const B = body.toUpperCase().trim();
  if (B === 'VERIFIED') return 'verified';
  if (B === 'NOT CONFIRMED') return 'empty';
  if (B === 'COMPANY-SUPPLIED') return 'supplied';
  return 'unverified';
}

/*
 * Split a string into runs of plain text and confidence markers. The
 * concatenation of every run's text, with each marker rendered back as
 * [BODY], reproduces the input exactly.
 */
function toRuns(text) {
  const runs = [];
  let last = 0;
  MARKER_RE.lastIndex = 0;
  let m;
  while ((m = MARKER_RE.exec(text)) !== null) {
    if (m.index > last) runs.push({ t: 'text', v: text.slice(last, m.index) });
    runs.push({ t: 'marker', v: m[1].trim(), tone: markerTone(m[1]) });
    last = m.index + m[0].length;
  }
  if (last < text.length) runs.push({ t: 'text', v: text.slice(last) });
  if (!runs.length) runs.push({ t: 'text', v: text });
  return runs;
}

function countMarkers(runs) {
  return runs.filter(r => r.t === 'marker').length;
}

/* ------------------------------------------------------------------ */
/* Line classifiers.                                                   */
/* ------------------------------------------------------------------ */
const RE_H2 = /^## (.+)$/;
const RE_H3 = /^### (.+)$/;
const RE_H4 = /^#### (.+)$/;
const RE_CALLOUT_OPEN = /^> \[!CALLOUT\] (.+)$/;
const RE_QUOTE = /^> ?(.*)$/;
const RE_TABLE = /^\|/;
const RE_SEPARATOR = /^\|[\s\-:|]+\|$/;
const RE_RATING = /^\*\*([A-Z]+)\s+DEPTH:\s*([A-Z]+)\*\*$/;
const RE_OPENNESS = /^(HIGH|MED|LOW)(?:\s{2,}(.+))?$/;
const RE_NUMBERED = /^(\d+(?:\.\d+)?)\.?\s+(.*)$/;

function splitRow(line) {
  return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
}

/* ------------------------------------------------------------------ */
/* Block parse.                                                        */
/* ------------------------------------------------------------------ */
function parseBlocks(lines) {
  const blocks = [];
  let i = 0;
  let tableSeq = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.replace(/\s+$/, '');

    if (!line.trim()) { i++; continue; }

    let m;
    if ((m = line.match(RE_H2))) { blocks.push({ type: 'h2', text: m[1].trim(), line: i + 1 }); i++; continue; }
    if ((m = line.match(RE_H3))) { blocks.push({ type: 'h3', text: m[1].trim(), line: i + 1 }); i++; continue; }
    if ((m = line.match(RE_H4))) { blocks.push({ type: 'h4', text: m[1].trim(), line: i + 1 }); i++; continue; }

    if ((m = line.match(RE_RATING))) {
      blocks.push({ type: 'rating', heat: m[1], depth: m[2], line: i + 1 });
      i++; continue;
    }

    if ((m = line.match(RE_OPENNESS))) {
      blocks.push({ type: 'openness', level: m[1], contact: m[2] ? m[2].trim() : null, line: i + 1 });
      i++; continue;
    }

    /* Callout: an opening label line followed by continuation quote lines.
     * A blank quote line separates paragraphs inside the callout. */
    if ((m = line.match(RE_CALLOUT_OPEN))) {
      const label = m[1].trim();
      const paras = [];
      i++;
      while (i < lines.length) {
        const q = lines[i].replace(/\s+$/, '');
        const qm = q.match(RE_QUOTE);
        if (!qm) break;
        if (q.match(RE_CALLOUT_OPEN)) break;
        const body = qm[1].trim();
        if (body) paras.push(body);
        i++;
      }
      blocks.push({
        type: 'callout',
        label,
        scheme: calloutScheme(label),
        classified: labelIsClassified(label),
        paragraphs: paras.map(p => ({ runs: toRuns(p) })),
        line: i
      });
      continue;
    }

    if (RE_TABLE.test(line)) {
      const rows = [];
      const start = i + 1;
      while (i < lines.length && RE_TABLE.test(lines[i].replace(/\s+$/, ''))) {
        const l = lines[i].replace(/\s+$/, '');
        if (!RE_SEPARATOR.test(l)) rows.push(splitRow(l));
        i++;
      }
      tableSeq++;
      const headers = rows.shift() || [];
      blocks.push({
        type: 'table',
        id: 'table-' + String(tableSeq).padStart(2, '0'),
        headers,
        rows: rows.map(cells => cells.map(c => ({ raw: c, runs: toRuns(c) }))),
        line: start
      });
      continue;
    }

    /* A meta line: middot-separated identity strip under an entry heading. */
    if (line.includes('·') && !line.startsWith('|')) {
      const parts = line.split('·').map(p => p.trim()).filter(Boolean);
      if (parts.length > 1) {
        blocks.push({ type: 'meta', parts, line: i + 1 });
        i++; continue;
      }
    }

    blocks.push({ type: 'para', runs: toRuns(line.trim()), line: i + 1 });
    i++;
  }
  return blocks;
}

/* ------------------------------------------------------------------ */
/* Tree assembly.                                                      */
/* ------------------------------------------------------------------ */
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function splitNumber(text) {
  const m = text.match(RE_NUMBERED);
  if (m) return { num: m[1], title: m[2].trim() };
  return { num: null, title: text };
}

function buildTree(blocks) {
  const sections = [];
  let section = null, sub = null, entry = null;

  const push = (b) => {
    if (entry) entry.blocks.push(b);
    else if (sub) sub.blocks.push(b);
    else if (section) section.blocks.push(b);
  };

  for (const b of blocks) {
    if (b.type === 'h2') {
      const { num, title } = splitNumber(b.text);
      section = { kind: 'section', num, title, heading: b.text, id: slug(b.text), blocks: [], subsections: [] };
      sections.push(section);
      sub = null; entry = null;
      continue;
    }
    if (b.type === 'h3') {
      if (!section) continue;
      const { num, title } = splitNumber(b.text);
      sub = { kind: 'subsection', num, title, heading: b.text, id: slug(b.text), blocks: [], entries: [] };
      section.subsections.push(sub);
      entry = null;
      continue;
    }
    if (b.type === 'h4') {
      if (!section) continue;
      entry = { kind: 'entry', title: b.text, id: slug(b.text), blocks: [] };
      (sub ? sub.entries : (section.entries || (section.entries = []))).push(entry);
      continue;
    }
    push(b);
  }
  return sections;
}

/* Walk every block in the tree, in document order. */
function walk(sections, fn) {
  for (const s of sections) {
    s.blocks.forEach(b => fn(b, s, null, null));
    (s.entries || []).forEach(e => e.blocks.forEach(b => fn(b, s, null, e)));
    for (const sub of s.subsections) {
      sub.blocks.forEach(b => fn(b, s, sub, null));
      for (const e of sub.entries) e.blocks.forEach(b => fn(b, s, sub, e));
    }
  }
}

/* ------------------------------------------------------------------ */
/* Formation chain, from the section 2 table.                          */
/* ------------------------------------------------------------------ */

/*
 * Split a comma list without cutting inside parentheses. The stage 3 cell
 * reads "MTI (TechStart, Seed, Development Loans, MTAF), SBIR and STTR, ..."
 * and a naive split turns one institution into four fragments.
 */
function splitTopLevel(text) {
  const out = [];
  let depth = 0, buf = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    else if (ch === ')') depth = Math.max(0, depth - 1);
    if (ch === ',' && depth === 0) { out.push(buf.trim()); buf = ''; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf.trim());
  return out.filter(Boolean);
}
function buildChain(sections) {
  const s2 = sections.find(s => s.num === '2');
  const table = s2.blocks.find(b => b.type === 'table');
  const stages = table.rows.map(cells => {
    const label = cells[0].raw;
    const m = label.match(/^(\d+)\.\s*(.*)$/);
    return {
      index: m ? Number(m[1]) : null,
      name: m ? m[2] : label,
      what: cells[1].raw,
      institutions: splitTopLevel(cells[2].raw),
      institutionsRaw: cells[2].raw,
      health: cells[3].raw.trim()
    };
  });
  /* Rails into a LIMITED stage render broken and red. That is stages 6 and 7
   * in this revision, and it is derived from the health column rather than
   * hard-coded, so a future revision that repairs a stage repairs the rail. */
  const rails = [];
  for (let i = 0; i < stages.length - 1; i++) {
    rails.push({ from: stages[i].index, to: stages[i + 1].index, broken: stages[i + 1].health === 'LIMITED' });
  }
  const constraints = s2.blocks.filter(b => b.type === 'callout');
  return { stages, rails, constraints, intro: s2.blocks.filter(b => b.type === 'para') };
}

/* ------------------------------------------------------------------ */
/* Capability clusters, from section 4.                                */
/* ------------------------------------------------------------------ */
function buildClusters(sections) {
  const s4 = sections.find(s => s.num === '4');
  return s4.subsections.map(sub => {
    const rating = sub.blocks.find(b => b.type === 'rating');
    const all = [];
    sub.blocks.forEach(b => all.push({ b, entry: null }));
    sub.entries.forEach(e => e.blocks.forEach(b => all.push({ b, entry: e.title })));
    const callouts = all.filter(x => x.b.type === 'callout').map(x => x.b);
    return {
      num: sub.num,
      title: sub.title,
      id: sub.id,
      heat: rating ? rating.heat : null,
      depth: rating ? rating.depth : null,
      whiteSpace: callouts.filter(c => c.label.toUpperCase().startsWith('VC WHITE SPACE')),
      reads: callouts.filter(c => c.label.toUpperCase().startsWith('VC READ')),
      constraints: callouts.filter(c => c.label.toUpperCase().startsWith('MAINE CONSTRAINT')),
      otherCallouts: callouts.filter(c => {
        const L = c.label.toUpperCase();
        return !L.startsWith('VC WHITE SPACE') && !L.startsWith('VC READ') && !L.startsWith('MAINE CONSTRAINT');
      }),
      whoIsThere: sub.entries.filter(e => /^who is there$/i.test(e.title)),
      assets: sub.blocks.filter(b => b.type === 'para' || b.type === 'table'),
      entries: sub.entries
    };
  });
}

/* ------------------------------------------------------------------ */
/* Geographic view.                                                    */
/* ------------------------------------------------------------------ */

/*
 * Locations taken from prose rather than from a Location column. Each one
 * records the exact source string it was read out of, so the derivation is
 * checkable without reopening the markdown.
 */
const PROSE_LOCATIONS = [
  { name: 'Maine Technology Institute',              place: null,                sourceQuote: 'no location stated in the source' },
  { name: 'UMaine Advanced Structures and Composites Center', place: 'Orono',    sourceQuote: 'section 7 table, Location column: Orono' },
  { name: 'Bigelow Laboratory for Ocean Sciences',   place: 'East Boothbay',     sourceQuote: '5. Institution playbook: "East Boothbay. President, CEO and senior research scientist Deborah Bronk"' },
  { name: 'Roux Institute at Northeastern',          place: 'Portland',          sourceQuote: '5. Institution playbook: "Portland. Launched 2020 with a $100 million founding gift."' },
  { name: 'New England Ocean Cluster',               place: 'Portland',          sourceQuote: '5. Institution playbook: "Blue economy incubator on Portland’s working waterfront."' },
  { name: 'Maine Maritime Academy',                  place: 'Castine',           sourceQuote: '5. Institution playbook: "Castine. Public college established 1941"' },
  { name: 'Maine Venture Fund',                      place: 'Newport',           sourceQuote: '5. Institution playbook: "investing since 1997, based in Newport"' },
  { name: 'Corsair Venture Partners',                place: 'Portland',          sourceQuote: '5. Institution playbook: "Early-stage venture capital firm based in Portland, Maine"' },
  { name: 'Maine Defense Industry Alliance',         place: 'Sanford',           sourceQuote: '5. Institution playbook: "based at the York County Community College instructional site in Sanford"' },
  { name: 'Loring Development Authority',            place: 'Limestone',         sourceQuote: '5. Institution playbook: "Limestone, Aroostook County. Former Loring AFB"' },
  { name: 'Central Maine Growth Council',            place: 'Waterville',        sourceQuote: '5. Institution playbook: "Waterville is a Qualified Opportunity Zone."' },
  { name: 'Compotech',                               place: 'Brewer',            sourceQuote: 'cluster 4.2: "Compotech (Brewer, $40 million in contracts 2017 to 2025..."' },
  { name: 'Kenway Composites',                       place: 'Augusta',           sourceQuote: 'cluster 4.2: "Kenway Composites (Augusta)"' },
  { name: 'Custom Composite Technologies',           place: 'Bath',              sourceQuote: 'cluster 4.2: "Custom Composite Technologies (Bath)"' },
  { name: 'Advanced Infrastructure Technologies',    place: 'Brewer',            sourceQuote: 'cluster 4.2: "Advanced Infrastructure Technologies (Brewer)"' },
  { name: 'HighByte',                                place: 'Portland',          sourceQuote: 'cluster 4.3: "HighByte (Portland, industrial DataOps)"' },
  { name: 'Evergreen Additive',                      place: 'Brunswick Landing', sourceQuote: 'cluster 4.1: "Headquartered at TechPlace at Brunswick Landing"' },
  { name: 'Pennington Mountain',                     place: 'Aroostook County',  sourceQuote: 'cluster 4.8: "Pennington Mountain, Aroostook County"' },
  { name: 'Coast Guard Sector Northern New England', place: 'South Portland',    sourceQuote: 'cluster 4.9: "Coast Guard Sector Northern New England is already headquartered in South Portland."' }
].filter(x => x.place);

function resolvePlaces(locationString) {
  if (!locationString) return [];
  const found = [];
  const s = locationString.trim();
  /* Longest names first so "Brunswick Landing" wins over "Brunswick". */
  const names = Object.keys(PLACES).sort((a, b) => b.length - a.length);
  let remaining = s;
  for (const n of names) {
    const re = new RegExp('(^|[^A-Za-z])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^A-Za-z])');
    if (re.test(remaining)) {
      found.push(n);
      remaining = remaining.replace(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), ' ');
    }
  }
  return found;
}

function buildGeo(sections) {
  const points = [];
  const unresolved = [];
  const geoNotes = [];
  const seen = new Set();

  const add = (name, placeName, category, detail, sourceRef) => {
    const p = PLACES[placeName];
    if (!p) return;
    const key = name + '|' + placeName;
    if (seen.has(key)) return;
    seen.add(key);
    points.push({
      name,
      town: placeName,
      category,
      detail: detail || '',
      sourceRef: sourceRef || '',
      lat: p.lat,
      lng: p.lng,
      precision: 'approximate',
      countyLevel: !!p.countyLevel,
      offshore: !!p.offshore,
      outsideMaine: !!p.outsideMaine,
      /* Outside the state outline, so listed but never drawn. */
      plotted: !p.outsideMaine
    });
  };

  /* 1. Anchor demand nodes. Location comes from the middot meta strip. */
  const s3 = sections.find(s => s.num === '3');
  const anchors = [];
  s3.subsections.forEach(sub => {
    const meta = sub.blocks.find(b => b.type === 'meta');
    if (meta) anchors.push({ title: sub.title, meta });
    sub.entries.forEach(e => {
      const m = e.blocks.find(b => b.type === 'meta');
      if (m) anchors.push({ title: e.title, meta: m });
    });
  });
  /*
   * A middot strip reads: short name · location · commentary. Part 0 is the
   * identifier and the tail is commentary, and commentary mentions towns that
   * are not where the entity sits. "BIW · Bath, Maine · approximately 11 miles
   * from Brunswick Landing" must plot at Bath alone.
   *
   * Rule: skip part 0, and read places only out of parts short enough to be a
   * location rather than a sentence. Every part this drops is listed in the
   * closing notes so the judgement is visible.
   */
  var LOCATION_PART_MAX = 40;
  anchors.forEach(a => {
    const tail = a.meta.parts.slice(1);
    const locParts = tail.filter(p => p.length <= LOCATION_PART_MAX);
    const skipped = tail.filter(p => p.length > LOCATION_PART_MAX && resolvePlaces(p).length);
    skipped.forEach(p => geoNotes.push({ entity: a.title, ignoredPart: p, reason: 'commentary, not a location' }));
    const places = [];
    locParts.forEach(p => resolvePlaces(p).forEach(x => { if (places.indexOf(x) < 0) places.push(x); }));
    if (!places.length) unresolved.push({ name: a.title, location: a.meta.parts.join(' · '), where: 'section 3 meta line' });
    places.forEach(pl => add(a.title, pl, 'anchor', a.meta.parts.join(' · '), 'section 3, identity line'));
  });

  /* 2, 3, 4, 5. Any table carrying a Location column. */
  const tableSources = [
    { sectionNum: '4', category: 'company',    label: 'cluster 4.5 company table' },
    { sectionNum: '4', category: 'institution', label: 'cluster 4.6 biotechnology table' },
    { sectionNum: '5', category: 'space',      label: 'section 5 table' },
    { sectionNum: '7', category: 'test',       label: 'section 7 test asset table' }
  ];
  const handled = new Set();
  walk(sections, (b, s, sub) => {
    if (b.type !== 'table') return;
    if (handled.has(b.id)) return;
    const li = b.headers.findIndex(h => /^location$/i.test(h));
    if (li < 0) return;
    handled.add(b.id);
    const src = tableSources.find(t => t.sectionNum === s.num);
    const category = s.num === '7' ? 'test' : s.num === '4' ? 'company' : 'institution';
    const label = (sub ? (sub.num ? sub.num + ' ' : '') + sub.title : s.title);
    b.rows.forEach(cells => {
      const name = cells[0].raw;
      const loc = cells[li].raw;
      const places = resolvePlaces(loc);
      if (!places.length) unresolved.push({ name, location: loc, where: label });
      places.forEach(pl => add(name, pl, category, loc, label + ', Location column'));
    });
  });

  /* 6. Prose locations, each with its source quote. */
  PROSE_LOCATIONS.forEach(x => add(x.name, x.place, 'institution', x.place, x.sourceQuote));

  const usedTowns = [...new Set(points.map(p => p.town))].sort();
  return {
    points,
    unresolved,
    notes: geoNotes,
    outline: OUTLINE,
    corridor: CORRIDOR.map(n => ({ name: n, lat: PLACES[n].lat, lng: PLACES[n].lng })),
    derivedCoordinates: usedTowns.map(t => ({
      town: t, lat: PLACES[t].lat, lng: PLACES[t].lng,
      precision: 'approximate',
      countyLevel: !!PLACES[t].countyLevel,
      offshore: !!PLACES[t].offshore,
      outsideMaine: !!PLACES[t].outsideMaine
    })),
    proseLocationAudit: PROSE_LOCATIONS,
    disclaimer: 'Coordinates are derived from town names in the source and are approximate. The source carries no coordinates. The outline is schematic.'
  };
}

/* ------------------------------------------------------------------ */
/* Tabs.                                                               */
/* ------------------------------------------------------------------ */
const TAB_LABELS = {
  '1': 'Overview',
  '2': 'Formation chain',
  '3': 'Anchor demand nodes',
  '4': 'Capability clusters',
  '5': 'Institution playbook',
  '6': 'Capital stack',
  '7': 'Test infrastructure',
  '8': 'Engagement and routing',
  '9': 'Constraints and gaps',
  '10': 'Key names',
  '11': 'Glossary',
  '12': 'Sources'
};
const TAB_MARKS = { '4': 'star', '9': 'square' };

/* ------------------------------------------------------------------ */
/* Main.                                                               */
/* ------------------------------------------------------------------ */
function main() {
  const raw = fs.readFileSync(SRC, 'utf8');
  const declared = applyDeclared(raw);
  const md = declared.text;
  const lines = md.split(/\r?\n/);
  const blocks = parseBlocks(lines);
  const sections = buildTree(blocks);

  const numbered = sections.filter(s => s.num !== null);
  const contents = sections.find(s => s.title.toLowerCase() === 'contents' && s.num === null);

  /* The source Contents block is a markdown table with no header row, so its
     first row is content. Flag it rather than promoting "1. Overview" into a
     column heading. The row is pushed back where it belongs. */
  if (contents) {
    contents.blocks.filter(b => b.type === 'table').forEach(t => {
      t.headerless = true;
      t.rows.unshift(t.headers.map(c => ({ raw: c, runs: toRuns(c) })));
      t.headers = [];
    });
  }

  /* The document header block is the opening ROSC INTERNAL callout, which sits
   * before any heading and therefore lands outside every section. */
  const headerCallout = blocks.find(b => b.type === 'callout' && b.label.toUpperCase() === 'ROSC INTERNAL');

  const allCallouts = [];
  const allTables = [];
  let markerTotal = 0;
  let unclassified = [];

  blocks.forEach(b => {
    if (b.type === 'callout') {
      allCallouts.push(b);
      if (!b.classified) unclassified.push(b.label);
      b.paragraphs.forEach(p => { markerTotal += countMarkers(p.runs); });
    }
    if (b.type === 'table') {
      allTables.push(b);
      b.rows.forEach(cells => cells.forEach(c => { markerTotal += countMarkers(c.runs); }));
    }
    if (b.type === 'para') markerTotal += countMarkers(b.runs);
  });

  const chain = buildChain(sections);
  const clusters = buildClusters(sections);
  const geo = buildGeo(sections);

  /* Validation above ran against the full parse. Only now is the excluded
     set held back, so a source change still has to survive every check. */
  const excludeNums = RENDER_EXCLUDE_SECTIONS.map(x => x.num);
  const rendered = numbered.filter(s => excludeNums.indexOf(s.num) < 0);
  const withheld = numbered.filter(s => excludeNums.indexOf(s.num) >= 0);

  const tabs = rendered.map(s => ({
    num: s.num,
    id: s.id,
    label: TAB_LABELS[s.num] || s.title,
    heading: s.heading,
    mark: TAB_MARKS[s.num] || null
  }));

  const meta = {
    title: headerCallout ? headerCallout.paragraphs[0].runs.map(r => r.v).join('') : 'Maine Defense Innovation Ecosystem',
    subtitle: headerCallout ? headerCallout.paragraphs.slice(1).map(p => p.runs.map(r => r.v).join('')) : [],
    badge: 'ROSC INTERNAL',
    runningHeader: ['Maine Defense Innovation Ecosystem', 'Rosc', 'August 2026', 'INTERNAL'],
    runningFooter: 'For internal Rosc use only · Personnel unverified, confirm before any outreach',
    sourceFile: 'content/maine_map_content_v3.md',
    generated: true
  };

  const countIn = (list, type) => {
    let n = 0;
    const scanBlocks = bs => bs.forEach(b => { if (b.type === type) n++; });
    list.forEach(sec => {
      scanBlocks(sec.blocks);
      (sec.entries || []).forEach(e => scanBlocks(e.blocks));
      sec.subsections.forEach(sub => {
        scanBlocks(sub.blocks);
        sub.entries.forEach(e => scanBlocks(e.blocks));
      });
    });
    return n;
  };
  const countEntries = list => list.reduce(
    (n, sec) => n + (sec.entries || []).length + sec.subsections.reduce((m, x) => m + x.entries.length, 0), 0);

  const manifest = {
    sections: rendered.length,
    sectionsParsed: numbered.length,
    withheldSections: withheld.map(s => ({
      num: s.num, title: s.title,
      reason: (RENDER_EXCLUDE_SECTIONS.find(x => x.num === s.num) || {}).reason,
      callouts: countIn([s], 'callout'), tables: countIn([s], 'table'),
      subsections: s.subsections.length, entries: countEntries([s])
    })),
    declared: declared.counts,
    renderedCallouts: countIn(rendered, 'callout') + 1,   // the masthead block
    renderedTables: countIn(rendered, 'table') + (contents ? countIn([contents], 'table') : 0),
    renderedSubsections: rendered.reduce((n, s) => n + s.subsections.length, 0),
    renderedEntries: countEntries(rendered),
    sectionsAll: numbered.length,
    clusters: clusters.length,
    callouts: allCallouts.length,
    tables: allTables.length,
    inlineMarkers: markerTotal,
    subsections: sections.reduce((n, s) => n + s.subsections.length, 0),
    entries: sections.reduce((n, s) => n + (s.entries || []).length + s.subsections.reduce((m, x) => m + x.entries.length, 0), 0),
    sourceBytes: Buffer.byteLength(md, 'utf8'),
    sourceWords: md.split(/\s+/).filter(Boolean).length,
    defaultedCalloutLabels: unclassified,   // fell through to the neutral rust scheme
    unresolvedLocations: geo.unresolved,
    expected: EXPECTED
  };

  /* Fail loudly rather than shipping a partial parse. */
  const problems = [];
  if (numbered.length !== EXPECTED.sections) problems.push(`sections ${numbered.length} != ${EXPECTED.sections}`);
  if (clusters.length !== EXPECTED.clusters) problems.push(`clusters ${clusters.length} != ${EXPECTED.clusters}`);
  if (allCallouts.length !== EXPECTED.callouts) problems.push(`callouts ${allCallouts.length} != ${EXPECTED.callouts}`);
  if (allTables.length !== EXPECTED.tables) problems.push(`tables ${allTables.length} != ${EXPECTED.tables}`);
  if (problems.length) {
    console.error('PARSE FAILED against the expected inventory:');
    problems.forEach(p => console.error('  ' + p));
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const files = {
    'meta.json': meta,
    'tabs.json': tabs,
    'contents.json': contents || null,
    'sections.json': rendered,
    'chain.json': chain,
    'clusters.json': clusters,
    'geo.json': geo,
    'callouts.json': allCallouts.map(c => ({ label: c.label, scheme: c.scheme, classified: c.classified, line: c.line })),
    'manifest.json': manifest
  };
  for (const [name, value] of Object.entries(files)) {
    fs.writeFileSync(path.join(OUT, name), JSON.stringify(value, null, 2) + '\n');
  }

  /* A single classic script carrying the same JSON, so the document opens from
   * disk. fetch() of a local JSON file is blocked under file://. */
  const bundle = {};
  for (const [name, value] of Object.entries(files)) bundle[name.replace(/\.json$/, '')] = value;
  fs.writeFileSync(
    path.join(OUT, 'bundle.js'),
    '/* Generated by scripts/parse-content.js. Do not edit. */\n' +
    'window.MAINE_MAP_DATA = ' + JSON.stringify(bundle) + ';\n'
  );

  console.log('Parsed ' + meta.sourceFile);
  console.log('  sections        ' + manifest.sectionsParsed + '   (expected ' + EXPECTED.sections + ')');
  console.log('  clusters        ' + manifest.clusters + '   (expected ' + EXPECTED.clusters + ')');
  console.log('  callouts        ' + manifest.callouts + '  (expected ' + EXPECTED.callouts + ')');
  console.log('  tables          ' + manifest.tables + '  (expected ' + EXPECTED.tables + ')');
  console.log('  subsections     ' + manifest.subsections);
  console.log('  entries         ' + manifest.entries);
  console.log('  inline markers  ' + manifest.inlineMarkers);
  console.log('  geo points      ' + geo.points.length + ' across ' + geo.derivedCoordinates.length + ' derived coordinates');
  declared.counts.substitutions.forEach(x => console.log(
    '  substitution    x' + x.replaced + '  ' + x.reason));
  declared.counts.lineRules.forEach(x => console.log(
    '  line rule       x' + x.replaced + (x.expected != null ? ' of ' + x.expected : '') + '  ' + x.reason));
  manifest.withheldSections.forEach(x => console.log(
    '  withheld        section ' + x.num + ' ' + x.title +
    '  (' + x.callouts + ' callouts, ' + x.tables + ' table, ' + x.entries + ' entries)  ' + x.reason));
  console.log('  rendered        ' + manifest.sections + ' sections, ' + manifest.renderedCallouts +
    ' callouts, ' + manifest.renderedTables + ' tables');
  if (unclassified.length) console.log('  labels defaulted to rust (' + unclassified.length + '): ' + unclassified.join(' / '));
  if (geo.unresolved.length) {
    console.log('  locations not plotted (' + geo.unresolved.length + '):');
    geo.unresolved.forEach(u => console.log('    ' + u.name + '  <- ' + u.location + '  [' + u.where + ']'));
  }
}

main();
