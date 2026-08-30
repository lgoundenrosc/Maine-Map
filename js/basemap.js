/* The map surface. Leaflet supplies dragging, scroll zoom, tooltip anchoring
   and marker management. It is loaded without a tile layer, because the
   document fetches nothing at runtime. The coastline it draws instead is baked
   into data/geo.js at build time from OpenStreetMap vectors. */
(function (global) {
  'use strict';

  var D = global.RoscData;

  /* Purple carries the sequential by-count scale, darkest at the low end and
     brightest at the top before orange takes over for the top tier, the one
     place a bubble's color is meant to say "look here" rather than "more". */
  var COLORS = {
    count: [
      { min: 12, fill: '#f0924a', label: '12 or more' },
      { min: 6,  fill: '#9b6fe0', label: '6 to 11' },
      { min: 3,  fill: '#7c4fc7', label: '3 to 5' },
      { min: 1,  fill: '#5a3f8a', label: '1 or 2' }
    ],
    type: {
      anchor:      { fill: '#5b8fd6', label: 'Anchor demand node' },
      institution: { fill: '#9b6fe0', label: 'Institution' },
      company:     { fill: '#f0924a', label: 'Company' },
      'test-asset':{ fill: '#3fb8ba', label: 'Test asset' },
      capital:     { fill: '#d1609f', label: 'Capital instrument' }
    },
    /* The seven-category ecosystem wheel a reader supplied, adapted from a
       generic "around one founder" framing to the mix of record types this
       map actually carries: demand-side anchors and market-facing companies
       read as Market Access, dual-use and venture-backed companies read as
       Innovation alongside the research centers, and so on. Order here is
       the order the legend renders in. */
    role: {
      'market-access':     { fill: '#5b8fd6', label: 'Market access' },
      innovation:          { fill: '#f0924a', label: 'Innovation' },
      capital:             { fill: '#d1609f', label: 'Capital' },
      'human-capital':     { fill: '#4ecb86', label: 'Human capital' },
      resources:           { fill: '#c9a227', label: 'Resources' },
      'community-building':{ fill: '#3fb8ba', label: 'Community building' },
      policy:              { fill: '#9b6fe0', label: 'Policy' }
    }
  };

  function countColor(n) {
    for (var i = 0; i < COLORS.count.length; i++) {
      if (n >= COLORS.count[i].min) return COLORS.count[i].fill;
    }
    return COLORS.count[COLORS.count.length - 1].fill;
  }

  /* A community holding several kinds of record takes the color of whichever
     kind is most numerous, ties going to the earlier entry in COLORS.type. */
  function typeColor(items) {
    var tally = {}, best = null, bestN = 0;
    items.forEach(function (e) { tally[e.type] = (tally[e.type] || 0) + 1; });
    Object.keys(COLORS.type).forEach(function (t) {
      if ((tally[t] || 0) > bestN) { bestN = tally[t]; best = t; }
    });
    return COLORS.type[best] ? COLORS.type[best].fill : '#7c4fc7';
  }

  /* Same rule, for ecosystem role instead of record type. */
  function roleColor(items) {
    var tally = {}, best = null, bestN = 0;
    items.forEach(function (e) { tally[e.ecoRole] = (tally[e.ecoRole] || 0) + 1; });
    Object.keys(COLORS.role).forEach(function (k) {
      if ((tally[k] || 0) > bestN) { bestN = tally[k]; best = k; }
    });
    return COLORS.role[best] ? COLORS.role[best].fill : '#7c4fc7';
  }

  /* Area, not diameter, tracks the count. Kept small enough that the dense
     stretch between Portland and Bath stays readable rather than merging into
     one blob. */
  function radius(n) { return 12 + 4.4 * Math.sqrt(n); }

  var map = null, layer = null, corridorLine = null, frameBounds = null;

  function init(el) {
    var geo = D.geo;
    var v = geo.view;
    /* Panning is limited to the inset view rectangle, not to everything that
       was baked. The reader can therefore never reach the edge where the
       clipped coastline stops and the canvas would read as open ocean. */
    var viewBounds = L.latLngBounds([v.s, v.w], [v.n, v.e]);

    map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
      maxZoom: 11,
      maxBounds: viewBounds,
      maxBoundsViscosity: 1,
      zoomSnap: 0.25,
      wheelPxPerZoomLevel: 140
    });

    map.attributionControl.setPrefix('');
    map.attributionControl.addAttribution(D.geo.attribution);

    /* Land and boundaries are painted to canvas. They are not interactive and
       there are 299 of them, so the DOM cost of SVG is not worth paying. */
    var base = L.canvas({ padding: 0.45 });

    geo.land.forEach(function (ring) {
      L.polygon(ring.map(function (p) { return [p[1], p[0]]; }), {
        renderer: base, interactive: false,
        fillColor: '#1f1830', fillOpacity: 1,
        color: '#5b3f8a', weight: 0.7, lineJoin: 'round'
      }).addTo(map);
    });

    geo.borders.forEach(function (ring) {
      L.polyline(ring.map(function (p) { return [p[1], p[0]]; }), {
        renderer: base, interactive: false,
        color: '#4a3570', weight: 1, opacity: 0.6, dashArray: '4 5'
      }).addTo(map);
    });

    /* The defense corridor, Bath through Portland to Kittery. Same three
       points the VC map draws. Orange, the one line on the map that isn't
       purple, so it reads as a route rather than as more data. */
    corridorLine = L.polyline(D.meta.corridorPath, {
      renderer: base, interactive: false,
      color: '#f0924a', weight: 2.5, opacity: 0.8, dashArray: '9 7'
    }).addTo(map);

    layer = L.layerGroup().addTo(map);

    /* The floor is whatever zoom makes the view rectangle cover the window.
       Recomputed on resize, because a wide window needs a closer zoom than a
       narrow one before the rectangle stops filling it. */
    function floor() {
      var z = map.getBoundsZoom(viewBounds, true);
      map.setMinZoom(z);
      if (map.getZoom() < z) map.setZoom(z);
    }
    floor();
    map.on('resize', floor);

    map.setView(viewBounds.getCenter(), map.getMinZoom());
    return map;
  }

  /* Draws one bubble per community. `onPick` receives the community. */
  function render(communities, mode, onPick) {
    layer.clearLayers();
    communities.forEach(function (c) {
      var n = c.items.length;
      var r = radius(n);
      var fill = mode === 'role' ? roleColor(c.items) : countColor(n);
      var icon = L.divIcon({
        className: '',
        iconSize: [r * 2, r * 2],
        iconAnchor: [r, r],
        /* Higher fill opacity than the old dark map needed. Against a light
           basemap a translucent bubble washes out, especially the lightest
           purple tier, and the white count label loses contrast with it. */
        html: '<div class="e-bubble" style="width:' + (r * 2) + 'px;height:' + (r * 2) +
          'px;border-radius:50%;background:' + fill + 'e8;border:2px solid ' + fill +
          ';display:grid;place-items:center"><span class="e-bubble-label" style="stroke:none">' +
          n + '</span></div>'
      });
      var m = L.marker([c.lat, c.lng], {
        icon: icon, keyboard: true, title: c.town,
        /* Small bubbles sit above large ones. Brunswick's 16 would otherwise
           swallow the single record next to it. */
        zIndexOffset: 1000 - n
      })
        .bindTooltip(c.town + '<b>' + n + (n === 1 ? ' organization' : ' organizations') + '</b>',
          { className: 'e-tip', direction: 'top', offset: [0, -r] })
        .on('click', function () { onPick(c); })
        .on('keypress', function (ev) { if (ev.originalEvent.key === 'Enter') onPick(c); });
      m.addTo(layer);
    });
  }

  /* Frames the records rather than the baked rectangle. The surrounding
     geography then fills whatever space is left, at any window shape, instead
     of leaving a margin beside a letterboxed state outline. */
  function frame(communities, animate) {
    if (!map || !communities.length) return;
    var pts = communities.map(function (c) { return [c.lat, c.lng]; });
    frameBounds = L.latLngBounds(pts).pad(0.16);
    var opts = { padding: [64, 64], maxZoom: 9.5 };
    if (animate) map.flyToBounds(frameBounds, Object.assign({ duration: 0.55 }, opts));
    else map.fitBounds(frameBounds, opts);
  }

  function focus(community) {
    if (!map) return;
    map.flyTo([community.lat, community.lng], Math.max(map.getZoom(), 9), { duration: 0.55 });
  }

  function reset() {
    if (!frameBounds) return;
    map.flyToBounds(frameBounds, { padding: [64, 64], maxZoom: 9.5, duration: 0.55 });
  }

  function invalidate() { if (map) map.invalidateSize(); }

  global.RoscBasemap = {
    init: init, render: render, frame: frame, focus: focus, reset: reset,
    invalidate: invalidate, colors: COLORS, countColor: countColor, typeColor: typeColor,
    roleColor: roleColor
  };
})(window);
