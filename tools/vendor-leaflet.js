/**
 * Copies Leaflet out of node_modules into vendor/ so the document loads it
 * from disk rather than a CDN. Run with `npm run vendor` after a version bump.
 *
 * Leaflet is used without a tile layer. It supplies dragging, scroll zoom,
 * popup anchoring and marker management over the baked vectors in data/geo.js.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var out = path.join(__dirname, '..', 'vendor');
if (!fs.existsSync(out)) fs.mkdirSync(out);

[['leaflet/dist/leaflet.js', 'leaflet.js'],
 ['leaflet/dist/leaflet.css', 'leaflet.css'],
 ['leaflet/LICENSE', 'LEAFLET-LICENSE.txt']].forEach(function (pair) {
  var src = path.join(__dirname, '..', 'node_modules', pair[0]);
  var dst = path.join(out, pair[1]);
  fs.copyFileSync(src, dst);
  console.log(pair[1] + ' ' + Math.round(fs.statSync(dst).size / 1024) + ' KB');
});
