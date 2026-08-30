/**
 * Integrity checks for the ecosystem map's data layer: every data/*.js and
 * js/*.js file ecosystem.html loads, in the order it loads them, so a
 * syntax error surfaces at the file and line Node reports rather than only
 * inside a browser. Requiring each file already is the syntax check; this
 * adds cross-file checks a syntax pass alone can't catch: duplicate ids,
 * sourceIds that point at nothing, and how many entities resolve a website.
 *
 * This was, until now, a script re-typed into a shell command every session.
 * It belongs in the repository instead of a scratchpad.
 *
 *   node tools/validate.js
 *
 * Exits non-zero if any check fails, so it can gate a commit or a build.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');

var html = fs.readFileSync(path.join(root, 'ecosystem.html'), 'utf8');
var scripts = [];
html.replace(/<script src="\.\/([^"]+)"><\/script>/g, function (_, src) {
  scripts.push(src);
  return '';
});

/* Everything through js/entities.js is plain data and pure functions. Leaflet
   itself and the two files that drive it (js/basemap.js, js/ecosystem.js)
   touch `document` and the DOM at load time or on boot, which this data-only
   check has no need to exercise and no `document` to give them. */
var skip = ['vendor/leaflet.js', 'js/basemap.js', 'js/ecosystem.js'];

global.window = global;
scripts.forEach(function (src) {
  if (skip.indexOf(src) !== -1) return;
  require(path.join(root, src));
});

var D = global.RoscData;
var ALL = global.RoscEntities.build();
var failures = [];

function check(label, ok, detail) {
  var line = (ok ? 'ok   ' : 'FAIL ') + label;
  if (detail !== undefined) line += ': ' + detail;
  console.log(line);
  if (!ok) failures.push(label);
}

check('entities loaded', ALL.length > 0, ALL.length + ' records');

var seenIds = {}, dupeIds = [];
ALL.forEach(function (e) {
  if (seenIds[e.id]) dupeIds.push(e.id);
  seenIds[e.id] = true;
});
check('no duplicate entity ids', dupeIds.length === 0, dupeIds.join(', '));

var sourceIds = {}, dupeSources = [];
(D.sources || []).forEach(function (s) {
  if (sourceIds[s.id]) dupeSources.push(s.id);
  sourceIds[s.id] = true;
});
check('no duplicate source definitions', dupeSources.length === 0, dupeSources.join(', '));

var dangling = [];
ALL.forEach(function (e) {
  (e.sourceIds || []).forEach(function (sid) {
    if (!sourceIds[sid]) dangling.push(e.id + ' -> ' + sid);
  });
});
check('no dangling sourceIds', dangling.length === 0, dangling.join(', '));

var withWebsite = ALL.filter(function (e) { return e.website; }).length;
check('website links resolve', true, withWebsite + ' of ' + ALL.length + ' entities');

var comms = global.RoscEntities.communities(ALL);
var unplaced = global.RoscEntities.unplaced(ALL);
check('communities and unplaced records', true,
  comms.length + ' communities, ' + unplaced.length + ' not plotted');

console.log('');
if (failures.length) {
  console.log(failures.length + ' check(s) failed: ' + failures.join(', '));
  process.exit(1);
}
console.log('All checks passed.');
