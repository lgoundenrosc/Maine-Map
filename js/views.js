/* Chain view and geographic view. Chain is the default because there is no
   command hierarchy to render and the chain is the more analytically useful
   picture. The map is a hand-drawn SVG rather than a tile service so the build
   stays dependency free and prints cleanly. */
(function (global) {
  'use strict';

  var D = global.RoscData, U = global.RoscUI;

  /* ==================================================== chain view ======== */

  function renderChain(entities) {
    var fc = D.formationChain;
    var railByFrom = {};
    fc.rails.forEach(function (r) { railByFrom[r.from] = r; });

    var html = '<div class="chain">';
    fc.stages.forEach(function (st, i) {
      html += '<div class="chain-stage">' + stageCard(st) + '</div>';
      var rail = railByFrom[st.n];
      if (rail && i < fc.stages.length - 1) {
        html += '<div class="chain-rail' + (rail.broken ? ' broken' : '') + '">' +
          '<div class="rail-label">' + U.esc(rail.label) + '</div>' +
          '<div class="rail-line"></div>' +
          (rail.marker ? '<span class="rail-marker">' + U.esc(rail.marker) + '</span>' : '') +
          '</div>';
      }
    });
    html += '</div>';
    return html;
  }

  /* The two breaks again, full width and fully legible, directly under the
     diagram. The narrow stage columns carry the short form. */
  function renderBreaks() {
    return D.formationChain.stages.filter(function (s) { return s.constraint; })
      .map(function (s) {
        return '<div style="margin-top:12px">' +
          U.constraint('Stage ' + s.n + ', ' + s.name + '. ' + s.constraint) + '</div>';
      }).join('');
  }

  function stageCard(st) {
    var nodes = st.nodes.map(function (n) {
      var badge = n.badge
        ? ' <span class="node-badge ' + (n.badgeType === 'deadline' ? 'deadline' : 'start') + '">' + U.esc(n.badge) + '</span>'
        : '';
      return '<li class="chain-node' + (n.negative ? ' neg' : '') + '"' +
        (n.ref ? ' data-ref="' + U.attr(n.ref) + '" role="button" tabindex="0" style="cursor:pointer"' : '') +
        ' data-name="' + U.attr(n.name) + '">' + U.esc(n.name) + badge + '</li>';
    }).join('');

    var bodyId = 'stage-body-' + st.id;
    return '<div class="stage-card' + (st.breaks ? ' is-break' : '') + '" data-stage="' + U.attr(st.id) + '">' +
      '<button class="card-head" type="button" style="padding:0;background:none" aria-expanded="false" aria-controls="' + bodyId + '">' +
        '<span class="grow">' +
          '<span class="stage-n">Stage ' + st.n + '</span>' +
          '<span class="stage-name">' + U.esc(st.name) + '</span>' +
        '</span>' +
        '<span class="chev" aria-hidden="true">▼</span>' +
      '</button>' +
      '<p class="stage-what">' + U.esc(st.what) + '</p>' +
      '<span class="stage-health health-' + U.attr(st.healthClass) + '">' + U.esc(st.health) + '</span>' +
      '<ul class="stage-nodes">' + nodes + '</ul>' +
      (st.constraintShort ? U.constraint(st.constraintShort) : '') +
      '<div class="card-body" id="' + bodyId + '" hidden style="padding:0;border-top:1px solid #eceef3;margin-top:9px">' +
        '<p style="font-size:12px">' + U.esc(st.detail) + '</p>' +
        U.sourceRefs(st.sourceIds) +
      '</div>' +
    '</div>';
  }

  function renderLadder() {
    var steps = D.capitalStack.ladder.map(function (s) {
      return '<span class="ladder-step' + (s.kind === 'gap' ? ' is-gap' : '') + '">' +
        U.esc(s.label) + ' <span class="lv">' + U.esc(s.value) + '</span></span>';
    });
    return '<div class="ladder">' + steps.join('<span class="ladder-arrow">→</span>') + '</div>';
  }

  /* =============================================== geographic view ======== */

  /* Stylized Maine outline in lat/lng. Orientation only, not survey accurate. */
  var OUTLINE = [
    [43.09, -70.83], [43.09, -70.71], [43.34, -70.57], [43.56, -70.35], [43.65, -70.25],
    [43.79, -69.95], [43.85, -69.63], [43.95, -69.10], [44.10, -68.90], [44.39, -68.20],
    [44.55, -67.60], [44.81, -66.98], [45.14, -67.20], [45.60, -67.43], [45.94, -67.78],
    [46.70, -67.78], [47.06, -67.79], [47.24, -68.15], [47.35, -68.60], [47.28, -69.05],
    [47.46, -69.23], [46.70, -70.05], [46.00, -70.30], [45.60, -70.75], [45.30, -70.90],
    [45.10, -70.70], [44.80, -70.85], [44.35, -71.08], [43.80, -71.00], [43.30, -70.97]
  ];

  var BOUNDS = { latMin: 42.95, latMax: 47.6, lngMin: -71.3, lngMax: -66.7 };
  var K = Math.cos(45 * Math.PI / 180);
  var VB_W = 545, VB_H = 760;

  function project(lat, lng) {
    var w = (BOUNDS.lngMax - BOUNDS.lngMin) * K;
    var h = (BOUNDS.latMax - BOUNDS.latMin);
    var sx = VB_W / w, sy = VB_H / h;
    var s = Math.min(sx, sy);
    var offX = (VB_W - w * s) / 2, offY = (VB_H - h * s) / 2;
    return {
      x: offX + (lng - BOUNDS.lngMin) * K * s,
      y: offY + (BOUNDS.latMax - lat) * s
    };
  }

  var TYPE_COLOR = {
    anchor: '#1d3f6e',
    institution: '#2f6b3c',
    company: '#8f4a1c',
    'test-asset': '#5b3f7a',
    capital: '#a3163a'
  };

  function renderMap(entities) {
    var pts = entities.filter(function (e) { return e.location && typeof e.location.lat === 'number'; });

    var poly = OUTLINE.map(function (p) {
      var q = project(p[0], p[1]);
      return q.x.toFixed(1) + ',' + q.y.toFixed(1);
    }).join(' ');

    // The corridor. Bath through Portland to Kittery, roughly 60 miles.
    var corr = [[43.9109, -69.8133], [43.6591, -70.2568], [43.0793, -70.7420]]
      .map(function (p) { var q = project(p[0], p[1]); return q.x.toFixed(1) + ',' + q.y.toFixed(1); })
      .join(' ');

    var marks = pts.map(function (e) {
      var q = project(e.location.lat, e.location.lng);
      var c = TYPE_COLOR[e.type] || '#64748b';
      var r = e.type === 'anchor' ? 7 : 5;
      return '<circle class="pt" data-ref="' + U.attr(e.id) + '" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) +
        '" r="' + r + '" fill="' + c + '"><title>' + U.attr(e.name + ' · ' + e.location.town + ' (approximate)') + '</title></circle>';
    }).join('');

    /* Anchors and test assets are labelled. Several sit on top of each other at
       Brunswick Landing, so labels are nudged down until they stop colliding. */
    var placed = [];
    var labels = pts.filter(function (e) { return e.type === 'anchor' || e.type === 'test-asset'; })
      .map(function (e) { return { e: e, q: project(e.location.lat, e.location.lng) }; })
      .sort(function (a, b) { return a.q.y - b.q.y; })
      .map(function (o) {
        var ly = o.q.y + 3;
        for (var guard = 0; guard < 40; guard++) {
          var clash = placed.some(function (p2) {
            return Math.abs(p2.y - ly) < 9 && Math.abs(p2.x - o.q.x) < 90;
          });
          if (!clash) break;
          ly += 9;
        }
        placed.push({ x: o.q.x, y: ly });
        return '<text class="lbl" data-ref="' + U.attr(o.e.id) + '" x="' + (o.q.x + 9).toFixed(1) +
          '" y="' + ly.toFixed(1) + '">' + U.esc(o.e.shortName || o.e.name) + '</text>';
      }).join('');

    var legend = Object.keys(TYPE_COLOR).map(function (k) {
      return '<span><i class="dot" style="background:' + TYPE_COLOR[k] + '"></i>' + k.replace('-', ' ') + '</span>';
    }).join('');

    return '<div class="geo-panel">' +
      '<svg class="maine" viewBox="0 0 ' + VB_W + ' ' + VB_H + '" role="img" aria-label="Stylized map of Maine with plotted entities">' +
        '<polygon class="outline" points="' + poly + '"></polygon>' +
        '<polyline class="corridor" id="corridor-path" points="' + corr + '"></polyline>' +
        marks + labels +
      '</svg>' +
      '<div class="map-legend">' + legend +
        '<span style="color:#9a4a1e"><i class="dot" style="background:#9a4a1e"></i>defense corridor</span>' +
      '</div>' +
      '<p class="disclaimer">' + U.esc(D.meta.mapDisclaimer) + '</p>' +
    '</div>';
  }

  global.RoscViews = {
    renderChain: renderChain,
    renderBreaks: renderBreaks,
    renderLadder: renderLadder,
    renderMap: renderMap,
    typeColor: TYPE_COLOR
  };
})(window);
