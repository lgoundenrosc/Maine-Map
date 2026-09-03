/**
 * Bundles index.html (the ecosystem map) into a single self-contained
 * fragment for publishing as a hosted page.
 *
 * The multi-file version in this repository is the one to edit. This script
 * folds every stylesheet and script inline and drops the document wrapper,
 * because the host supplies its own doctype, head and body.
 *
 *   node tools/build-artifact.js [outfile]
 *
 * Nothing is fetched at runtime, so the result works with a strict content
 * security policy and sends no request anywhere when opened.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');
var out = process.argv[2] || path.join(root, 'ecosystem-standalone.html');

function read(p) { return fs.readFileSync(path.join(root, p), 'utf8'); }

/* A closing script tag inside a JS string would end the block early. */
function safe(js) { return js.replace(/<\/script/gi, '<\\/script'); }

var src = read('index.html');

var title = (src.match(/<title>([^<]*)<\/title>/) || [])[1] || 'Ecosystem Map';

var styles = [];
src.replace(/<link rel="stylesheet" href="\.\/([^"]+)">/g, function (_, href) {
  styles.push('/* ' + href + ' */\n' + read(href));
  return '';
});

var scripts = [];
src.replace(/<script src="\.\/([^"]+)"><\/script>/g, function (_, s) {
  scripts.push('/* ' + s + ' */\n' + safe(read(s)));
  return '';
});

/* Everything between the main tags, the noscript notice included. */
var body = (src.match(/<main id="app">[\s\S]*?<\/main>/) || ['<main id="app"></main>'])[0];

var doc =
  '<title>' + title + '</title>\n' +
  '<!-- Self-contained build of index.html, the ecosystem map. Every stylesheet\n' +
  '     and script is inlined below, the basemap included. Nothing is fetched at runtime.\n' +
  '     Coastline data from OpenStreetMap contributors, ODbL.\n' +
  '     Edit the multi-file version in the repository, not this file. -->\n' +
  '<style>\n' + styles.join('\n\n') + '\n</style>\n\n' +
  body + '\n\n' +
  scripts.map(function (s) { return '<script>\n' + s + '\n</script>'; }).join('\n');

fs.writeFileSync(out, doc);
console.log('Wrote ' + out + ' (' + (fs.statSync(out).size / 1024).toFixed(0) + ' KB)');
console.log('Remaining external references: ' + (doc.match(/(?:src|href)="\.\//g) || []).length);
