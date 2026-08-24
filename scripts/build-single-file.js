#!/usr/bin/env node
/*
 * Inline the whole document into one HTML file.
 *
 * Same interface as index.html, with the stylesheets, the generated data and
 * the application inlined. No external request of any kind, so it opens by
 * double-click, travels as an email attachment, and works with no server.
 *
 *   node scripts/build-single-file.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist');
const OUT = path.join(OUT_DIR, 'maine-map.html');

const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* A closing script tag inside a string literal would end the block early. */
const safe = js => js.replace(/<\/script/gi, '<\\/script');

let html = read('index.html');

html = html.replace(
  /<link rel="stylesheet" href="\.\/css\/([^"]+)">/g,
  (_, f) => '<style>\n' + read('css/' + f) + '\n</style>'
);

html = html.replace(
  /<script src="\.\/(data|js)\/([^"]+)"><\/script>/g,
  (_, dir, f) => '<script>\n' + safe(read(dir + '/' + f)) + '\n</script>'
);

/* The comments that pointed at the external files no longer describe anything. */
html = html.replace(/<!-- Generated from[\s\S]*?-->\n?/, '');

if (/src="\.\/|href="\.\/(css|js|data)/.test(html)) {
  console.error('An external reference survived the inline pass.');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT, html);

console.log('Wrote ' + path.relative(ROOT, OUT));
console.log('  ' + (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0) + ' KB, no external references');

/*
 * A second variant for hosting as an Artifact, which supplies its own
 * doctype, html, head and body. Same inlined content with the document
 * skeleton and the meta tags removed.
 */
const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
const titleMatch = html.match(/<title>[\s\S]*?<\/title>/);
const styles = html.match(/<style>[\s\S]*?<\/style>/g) || [];
if (!bodyMatch || !titleMatch) {
  console.error('Could not isolate the body for the hosted variant.');
  process.exit(1);
}
const hosted = [titleMatch[0], ...styles, bodyMatch[1].trim(), ''].join('\n');
const HOSTED = path.join(OUT_DIR, 'maine-map.artifact.html');
fs.writeFileSync(HOSTED, hosted);
console.log('Wrote ' + path.relative(ROOT, HOSTED));
console.log('  ' + (Buffer.byteLength(hosted, 'utf8') / 1024).toFixed(0) + ' KB, no document skeleton');
