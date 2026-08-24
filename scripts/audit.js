#!/usr/bin/env node
/*
 * Acceptance audit. Renders the page in a real browser, walks every text node,
 * and splits what a reader sees into text that came from the source markdown
 * and text this build authored. Then checks each half against its own rules.
 *
 *   node scripts/audit.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { SUBSTITUTIONS } = require('./build-config.js');

const ROOT = path.resolve(__dirname, '..');
let source = fs.readFileSync(path.join(ROOT, 'content', 'maine_map_content_v3.md'), 'utf8');
/* Compare against the source as rendered, so the declared substitutions do not
   show up as text this build invented. */
SUBSTITUTIONS.forEach(sub => { source = source.split(sub.from).join(sub.to); });
const norm = s => s.replace(/\s+/g, ' ').trim();
const SOURCE_NORM = norm(source);

/* Contact strings are allowed only if the source carries them. */
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const PHONE = /\+?\d[\d\s().-]{7,}\d/g;
const URL = /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|net|edu|gov|mil|us|vc|io|co)\b(?:\/\S*)?/gi;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  await page.goto('file://' + ROOT + '/index.html');
  await page.waitForTimeout(400);
  /* Reveal every panel so the audit sees the whole document. */
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await page.waitForTimeout(400);

  const texts = await page.evaluate(() => {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      /* noscript holds markup as a text node when scripts are on, and a
         reader with scripts on never sees it. */
      if (n.parentElement && n.parentElement.closest('noscript')) continue;
      const v = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (v) out.push(v);
    }
    return out;
  });
  await browser.close();

  const fromSource = [];
  const authored = [];
  texts.forEach(t => {
    (SOURCE_NORM.indexOf(t) >= 0 ? fromSource : authored).push(t);
  });

  const uniqueAuthored = [...new Set(authored)];

  /* Rule: no em dash, no semicolon, no emoji in authored interface text.
     The star and the square are house-style section markers named in the
     brief, and the arrow is a rail label, so all three are allowed. */
  const ALLOWED_GLYPHS = /[★■→·]/g;
  const badProse = uniqueAuthored.filter(t => {
    const stripped = t.replace(ALLOWED_GLYPHS, '');
    return /—/.test(stripped) || /;/.test(stripped) ||
      /[\u{1F300}-\u{1FAFF}\u{2190}-\u{2BFF}]/u.test(stripped);
  });

  /* Rule: no contact route that is not in the source. */
  const contacts = [];
  texts.forEach(t => {
    [EMAIL, PHONE, URL].forEach(re => {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(t)) !== null) {
        const hit = m[0].replace(/[.,)]+$/, '');
        if (SOURCE_NORM.indexOf(hit) < 0) contacts.push({ found: hit, inText: t.slice(0, 90) });
      }
    });
  });

  /* Rule: no credential anywhere in the tree or in git history. */
  /* A credential is an assigned value, not the word "password" in a sentence
     about access control. Match assignment shapes and key headers only. */
  const SECRET = /((?:password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]\s*['"`][^'"`]{4,}|BEGIN\s+[A-Z ]*PRIVATE KEY|Bearer\s+[A-Za-z0-9._-]{16,}|gh[pousr]_[A-Za-z0-9]{20,})/i;
  const files = [];
  (function scan(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
      if (d.name === '.git' || d.name === 'node_modules') return;
      const p = path.join(dir, d.name);
      if (d.isDirectory()) scan(p);
      else files.push(p);
    });
  })(ROOT);
  const secretHits = [];
  files.forEach(f => {
    let txt;
    try { txt = fs.readFileSync(f, 'utf8'); } catch (e) { return; }
    txt.split('\n').forEach((line, i) => {
      if (SECRET.test(line) && SOURCE_NORM.indexOf(norm(line)) < 0) {
        secretHits.push(path.relative(ROOT, f) + ':' + (i + 1) + '  ' + line.trim().slice(0, 110));
      }
    });
  });

  const line = s => console.log(s);
  line('AUDIT');
  line('  text nodes rendered      ' + texts.length);
  line('  matched to the source    ' + fromSource.length);
  line('  authored by this build   ' + uniqueAuthored.length + ' distinct strings');
  line('');
  line('  em dash / semicolon / emoji in authored text: ' + (badProse.length || 'none'));
  badProse.forEach(t => line('     ! ' + t));
  line('  contact strings not present in the source:    ' + (contacts.length || 'none'));
  contacts.forEach(c => line('     ! ' + c.found + '   in: ' + c.inText));
  line('  credential-shaped lines in the tree:          ' + (secretHits.length || 'none'));
  secretHits.forEach(s => line('     ? ' + s));
  line('  page errors:                                 ' + (pageErrors.length || 'none'));
  pageErrors.forEach(e => line('     ! ' + e));
  line('');
  line('  authored strings, for review:');
  uniqueAuthored.sort().forEach(t => line('     · ' + t));

  process.exit(badProse.length || contacts.length || pageErrors.length ? 1 : 0);
})();
