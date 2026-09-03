/**
 * Bakes the basemap into data/geo.js.
 *
 * The document has no runtime dependencies and fetches nothing, so the map
 * cannot call a tile service. Instead the coastline is clipped from
 * OpenStreetMap derived vectors at build time and committed as plain data.
 * Run with `npm run geo` after changing the viewport below.
 *
 * Coastline: OpenStreetMap contributors, ODbL, via @geo-maps.
 * Boundaries: US Census Bureau, via us-atlas.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var topojson = require('topojson-client');

/* Two rectangles.
 *
 * BAKE is what geometry is clipped to. It is far wider than Maine because the
 * map has no tile service behind it, so past this edge land simply stops and
 * the canvas reads as open ocean. Baking the Maritimes, the Gulf of St
 * Lawrence and southern New England fills the screen with real geography at
 * any window shape.
 *
 * VIEW is what the reader is allowed to pan to, inset far enough inside BAKE
 * that the cut edge can never come on screen. The map sets maxBounds from it.
 *
 * Resolution is 500m rather than 100m. At the zoom range this map allows the
 * two are indistinguishable, and 500m costs about a third as much: 272 KB
 * against 765 KB, still carrying 146 islands along the Maine coast.
 */
var RESOLUTION = '500m';
var BAKE = { w: -78.0, e: -58.5, s: 38.5, n: 51.0 };
var VIEW = { w: -75.5, e: -61.0, s: 40.5, n: 49.3 };
var BB = BAKE;

/* Coordinates are rounded to four decimal places, about 11 meters at this
   latitude. Below the width of the stroke that draws them. */
function r4(x) { return Math.round(x * 1e4) / 1e4; }

/* -------------------------------------------------- Sutherland-Hodgman ---- */
/* Clips a ring against the viewport rectangle. The mainland arrives as a
   single continental ring of tens of thousands of points, so clipping rather
   than filtering is what keeps the payload small and the polygon closed. */

function clipEdge(pts, inside, intersect) {
  var out = [];
  if (!pts.length) return out;
  for (var i = 0; i < pts.length; i++) {
    var cur = pts[i], prev = pts[(i + pts.length - 1) % pts.length];
    var curIn = inside(cur), prevIn = inside(prev);
    if (curIn) {
      if (!prevIn) out.push(intersect(prev, cur));
      out.push(cur);
    } else if (prevIn) {
      out.push(intersect(prev, cur));
    }
  }
  return out;
}

function atX(p, q, x) { var t = (x - p[0]) / (q[0] - p[0]); return [x, p[1] + t * (q[1] - p[1])]; }
function atY(p, q, y) { var t = (y - p[1]) / (q[1] - p[1]); return [p[0] + t * (q[0] - p[0]), y]; }

function clipRect(ring) {
  var r = ring;
  r = clipEdge(r, function (p) { return p[0] >= BB.w; }, function (a, b) { return atX(a, b, BB.w); });
  r = clipEdge(r, function (p) { return p[0] <= BB.e; }, function (a, b) { return atX(a, b, BB.e); });
  r = clipEdge(r, function (p) { return p[1] >= BB.s; }, function (a, b) { return atY(a, b, BB.s); });
  r = clipEdge(r, function (p) { return p[1] <= BB.n; }, function (a, b) { return atY(a, b, BB.n); });
  return r;
}

function touches(ring) {
  return ring.some(function (p) {
    return p[0] >= BB.w && p[0] <= BB.e && p[1] >= BB.s && p[1] <= BB.n;
  });
}

function eachRing(feature, fn) {
  var polys = feature.geometry.type === 'Polygon'
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
  polys.forEach(function (poly) { poly.forEach(fn); });
}

/* ------------------------------------------------------------- land ------ */

var coastPath = require.resolve('@geo-maps/countries-coastline-' + RESOLUTION + '/map.geo.json');
var coast = JSON.parse(fs.readFileSync(coastPath, 'utf8'));

var land = [];
coast.features.forEach(function (f) {
  if (['USA', 'CAN'].indexOf(f.properties.A3) === -1) return;
  eachRing(f, function (ring) {
    if (!touches(ring)) return;
    var c = clipRect(ring);
    if (c.length > 2) land.push(c.map(function (p) { return [r4(p[0]), r4(p[1])]; }));
  });
});
/* Largest first so the mainland paints before the islands sitting in its bays. */
land.sort(function (a, b) { return b.length - a.length; });

/* --------------------------------------------------------- borders ------- */
/* Maine and New Hampshire only. Drawn as thin dotted lines, the way a slippy
   map shows an administrative boundary, not as filled shapes. */

var atlasPath = require.resolve('us-atlas/states-10m.json');
var atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf8'));
var states = topojson.feature(atlas, atlas.objects.states).features;

var borders = [];
states.filter(function (f) { return ['23', '33'].indexOf(f.id) !== -1; })
  .forEach(function (f) {
    eachRing(f, function (ring) {
      if (!touches(ring)) return;
      var c = clipRect(ring);
      if (c.length > 2) borders.push(c.map(function (p) { return [r4(p[0]), r4(p[1])]; }));
    });
  });

/* ------------------------------------------------------------ write ------ */

var out = {
  bbox: BAKE,
  view: VIEW,
  land: land,
  borders: borders,
  attribution: 'Coastline data from OpenStreetMap contributors, ODbL. State boundaries from the US Census Bureau.',
  generated: new Date().toISOString().slice(0, 10)
};

var banner = '/* Generated by tools/build-geo.js. Do not edit by hand, run `npm run geo`.\n' +
  '   Coastline: OpenStreetMap contributors, ODbL, via @geo-maps.\n' +
  '   Boundaries: US Census Bureau, via us-atlas. */\n';

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'geo.js'),
  banner + 'window.RoscData = window.RoscData || {};\nwindow.RoscData.geo = ' + JSON.stringify(out) + ';\n'
);

var pts = land.reduce(function (a, r) { return a + r.length; }, 0);
console.log('land polygons ' + land.length + ', points ' + pts);
console.log('border rings ' + borders.length);
console.log('resolution ' + RESOLUTION);
console.log('data/geo.js written, ' + Math.round(fs.statSync(path.join(__dirname, '..', 'data', 'geo.js')).size / 1024) + ' KB');
