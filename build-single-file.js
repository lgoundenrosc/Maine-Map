/**
 * Bundles the site into one self-contained HTML file.
 *
 * The multi-file version in this repository is the one to edit. This script
 * folds the stylesheets and scripts into a single document for circulation,
 * so a reader can open it by double-clicking with no server, no internet
 * connection and nothing published anywhere.
 *
 *   node build-single-file.js
 *
 * Writes maine-map-standalone.html, which is deliberately not committed.
 * Regenerate it after any change to data/, css/ or js/.
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const OUT = 'maine-map-standalone.html';

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

// A closing script tag inside a JS string would end the block early.
const safe = (js) => js.replace(/<\/script/gi, '<\\/script');

let html = read('vc-map.html');

html = html.replace(/<link rel="stylesheet" href="\.\/([^"]+)">/g, (_, href) =>
  '<style>\n/* ' + href + ' */\n' + read(href) + '\n</style>'
);

html = html.replace(/<script src="\.\/([^"]+)"><\/script>/g, (_, src) =>
  '<script>\n/* ' + src + ' */\n' + safe(read(src)) + '\n</script>'
);

html = html.replace(
  '<meta name="robots" content="noindex, nofollow">',
  '<meta name="robots" content="noindex, nofollow">\n' +
  '<!-- Self-contained build. Every stylesheet and script is inlined below.\n' +
  '     Nothing is fetched at runtime, so this file works offline and sends\n' +
  '     no request anywhere when opened. -->'
);

fs.writeFileSync(path.join(root, OUT), html);

const kb = (fs.statSync(path.join(root, OUT)).size / 1024).toFixed(0);
console.log('Wrote ' + OUT + ' (' + kb + ' KB)');
console.log('Remaining external references: ' +
  (html.match(/(?:src|href)="\.\//g) || []).length);
