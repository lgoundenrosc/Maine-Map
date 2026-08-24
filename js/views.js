/* The two signature views: the formation chain and the geographic plot.
   Both read from the generated data. Neither authors any content. */

(function (global) {
  'use strict';

  var el = R.el, svgEl = R.svgEl;

  /* ---------------------------------------------------------------- */
  /* Formation chain                                                   */
  /* ---------------------------------------------------------------- */

  function stageNode(stage, expanded) {
    var cls = 'stage-node h-' + stage.health.toLowerCase();
    var node = el('div', { class: cls });

    node.appendChild(el('span', { class: 'snum', text: 'STAGE ' + stage.index }));
    node.appendChild(el('div', { class: 'sname', text: stage.name }));
    node.appendChild(el('div', { class: 'swhat', text: stage.what }));
    node.appendChild(el('div', { class: 'chiprow' }, [R.healthChip(stage.health)]));

    var list = el('ul', { class: 'insts', hidden: !expanded },
      stage.institutions.map(function (i) { return el('li', { text: i }); }));

    var btn = el('button', {
      class: 'toggle',
      type: 'button',
      'aria-expanded': expanded ? 'true' : 'false',
      text: (expanded ? 'Hide ' : 'Show ') + stage.institutions.length + ' institutions',
      onclick: function () {
        var open = list.hidden;
        list.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = (open ? 'Hide ' : 'Show ') + stage.institutions.length + ' institutions';
      }
    });

    node.appendChild(btn);
    node.appendChild(list);
    return node;
  }

  function chainDiagram(chain, opts) {
    opts = opts || {};
    var row = el('div', { class: 'chain' });

    chain.stages.forEach(function (stage, i) {
      if (i > 0) {
        var rail = chain.rails[i - 1];
        var r = el('div', { class: 'rail' + (rail.broken ? ' broken' : '') }, [
          el('span', { class: 'raillabel', text: rail.from + ' → ' + rail.to }),
          el('span', { class: 'line' })
        ]);
        row.appendChild(r);
      }
      row.appendChild(el('div', { class: 'stage' }, [stageNode(stage, !!opts.expanded)]));
    });

    var legend = el('div', { class: 'chain-legend' }, [
      el('span', null, [el('i', { class: 'swatch solid' }), 'Rail carries through']),
      el('span', null, [el('i', { class: 'swatch dashed' }), 'Rail breaks, stage rated LIMITED']),
      el('span', null, [R.healthChip('STRONG')]),
      el('span', null, [R.healthChip('ADEQUATE')]),
      el('span', null, [R.healthChip('LIMITED')])
    ]);

    return el('div', null, [
      el('div', { class: 'chain-scroll' }, [row]),
      legend
    ]);
  }

  /* ---------------------------------------------------------------- */
  /* Geographic view                                                   */
  /* ---------------------------------------------------------------- */

  var BOUNDS = { latMin: 43.0, latMax: 47.5, lngMin: -71.15, lngMax: -66.85 };
  var MEAN_COS = Math.cos((BOUNDS.latMin + BOUNDS.latMax) / 2 * Math.PI / 180);
  var SCALE = 400 / ((BOUNDS.lngMax - BOUNDS.lngMin) * MEAN_COS);
  var VW = 400;
  var VH = (BOUNDS.latMax - BOUNDS.latMin) * SCALE;

  function px(lng) { return (lng - BOUNDS.lngMin) * MEAN_COS * SCALE; }
  function py(lat) { return (BOUNDS.latMax - lat) * SCALE; }

  var CATEGORY_ORDER = ['anchor', 'test', 'company', 'institution'];
  var CATEGORY_LABEL = {
    anchor: 'Anchor demand',
    test: 'Test asset',
    company: 'Company',
    institution: 'Institution'
  };

  function groupByTown(points) {
    var map = {};
    points.forEach(function (p) {
      if (!map[p.town]) {
        map[p.town] = {
          town: p.town, lat: p.lat, lng: p.lng,
          countyLevel: p.countyLevel, offshore: p.offshore,
          outsideMaine: p.outsideMaine, plotted: p.plotted !== false,
          items: []
        };
      }
      map[p.town].items.push(p);
    });
    return Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) { return b.items.length - a.items.length; });
  }

  /* Greedy label placement. Busiest towns claim a slot first. A label that
     collides everywhere is dropped, and its town keeps the dot and the
     hover title. */
  var LABEL_SLOTS = [
    { dx:  1, dy:  2.3, anchor: 'start' },
    { dx: -1, dy:  2.3, anchor: 'end' },
    { dx:  1, dy: -4.0, anchor: 'start' },
    { dx: -1, dy: -4.0, anchor: 'end' },
    { dx:  1, dy:  8.4, anchor: 'start' },
    { dx: -1, dy:  8.4, anchor: 'end' },
    { dx:  0, dy: -6.2, anchor: 'middle' },
    { dx:  0, dy: 10.4, anchor: 'middle' }
  ];

  function placeLabels(towns) {
    var boxes = [];
    var CH = 3.95;           // monospace advance at font-size 6.4
    var LH = 7.6;
    var PAD = 0.7;

    function overlaps(a, b) {
      return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
    }

    /* A dot is an obstacle too, so a label never lands on top of one. */
    towns.forEach(function (t) {
      if (!t.plotted) return;
      var r = Math.min(8.5, 3.1 + Math.sqrt(t.items.length) * 1.5);
      t.r = r;
      var cx = px(t.lng), cy = py(t.lat);
      boxes.push({ x1: cx - r, x2: cx + r, y1: cy - r, y2: cy + r });
    });

    towns.forEach(function (t) {
      if (!t.plotted) { t.label = null; return; }
      var cx = px(t.lng), cy = py(t.lat);
      var w = t.town.length * CH;

      for (var i = 0; i < LABEL_SLOTS.length; i++) {
        var sl = LABEL_SLOTS[i];
        var x = cx + sl.dx * (t.r + 2.5);
        var y = cy + sl.dy;
        var x1 = sl.anchor === 'start' ? x : sl.anchor === 'end' ? x - w : x - w / 2;
        if (x1 < 1 || x1 + w > VW - 1 || y < 6 || y > VH - 2) continue;
        var box = { x1: x1 - PAD, x2: x1 + w + PAD, y1: y - LH * 0.82, y2: y + LH * 0.26 };
        var clash = boxes.some(function (b) { return overlaps(box, b); });
        if (!clash) {
          boxes.push(box);
          t.label = { x: x, y: y, anchor: sl.anchor };
          return;
        }
      }
      t.label = null;
    });
    return towns;
  }

  function townCategory(town) {
    for (var i = 0; i < CATEGORY_ORDER.length; i++) {
      var c = CATEGORY_ORDER[i];
      if (town.items.some(function (x) { return x.category === c; })) return c;
    }
    return 'institution';
  }

  function geoView(geo) {
    var towns = groupByTown(geo.points);
    var active = { category: 'all', corridor: false, selected: null };

    var side = el('div', { class: 'geo-side' });
    var svgHost = el('div', { class: 'geo-figure' });

    /* ---- side list ---- */
    function renderSide() {
      side.textContent = '';
      side.appendChild(el('h4', { text: active.selected ? active.selected : 'Plotted entities' }));

      var shown = towns.filter(function (t) {
        if (active.selected && t.town !== active.selected) return false;
        if (active.category === 'all') return true;
        return t.items.some(function (x) { return x.category === active.category; });
      });

      if (active.selected) {
        side.appendChild(el('button', {
          class: 'fbtn', type: 'button', text: 'Clear selection',
          onclick: function () { active.selected = null; draw(); }
        }));
      }

      var list = el('ul', { class: 'geo-list' });
      shown.forEach(function (t) {
        t.items.forEach(function (item) {
          if (active.category !== 'all' && item.category !== active.category) return;
          var tags = item.lat.toFixed(3) + ', ' + item.lng.toFixed(3) + '  APPROXIMATE';
          if (item.outsideMaine) tags += '  OUTSIDE MAINE, NOT PLOTTED';
          else if (item.offshore) tags += '  OPEN WATER';
          else if (item.countyLevel) tags += '  COUNTY LEVEL';
          list.appendChild(el('li', null, [
            el('span', { class: 'nm', text: item.name }),
            el('span', { class: 'tw', text: t.town + '  ' + tags }),
            el('span', { class: 'src', text: item.sourceRef })
          ]));
        });
      });
      if (!list.children.length) {
        side.appendChild(el('div', { class: 'empty', text: 'Nothing plotted under this filter' }));
      } else {
        side.appendChild(list);
      }
    }

    /* ---- map ---- */
    function draw() {
      svgHost.textContent = '';
      var svg = svgEl('svg', {
        viewBox: '0 0 ' + VW + ' ' + Math.round(VH),
        role: 'img',
        'aria-label': 'Schematic map of Maine with plotted entities'
      });

      var ring = geo.outline.map(function (p) { return px(p[0]).toFixed(1) + ',' + py(p[1]).toFixed(1); }).join(' ');
      svg.appendChild(svgEl('polygon', { class: 'maine-outline', points: ring }));

      var corridorPts = geo.corridor.map(function (c) { return px(c.lng).toFixed(1) + ',' + py(c.lat).toFixed(1); }).join(' ');
      svg.appendChild(svgEl('polyline', { class: 'corridor-band' + (active.corridor ? ' on' : ''), points: corridorPts }));
      if (active.corridor) svg.appendChild(svgEl('polyline', { class: 'corridor-line', points: corridorPts }));

      placeLabels(towns).forEach(function (t) {
        if (!t.plotted) return;
        var cat = townCategory(t);
        var matches = active.category === 'all' ||
          t.items.some(function (x) { return x.category === active.category; });
        var cls = 'pt cat-' + cat + (matches ? '' : ' dim') + (active.selected === t.town ? ' sel' : '');
        /* An invisible hit circle. The painted dot runs from 3 to 8.5 units in
           a 400 unit viewBox, which is a small target for a mouse and a very
           small one for a finger. */
        var kids = [
          svgEl('circle', {
            class: 'hit',
            cx: px(t.lng).toFixed(1), cy: py(t.lat).toFixed(1),
            r: Math.max(t.r + 4, 9).toFixed(1)
          }),
          svgEl('circle', { cx: px(t.lng).toFixed(1), cy: py(t.lat).toFixed(1), r: t.r.toFixed(1) }),
          svgEl('title', null, [t.town + ', ' + t.items.length + (t.items.length === 1 ? ' entity' : ' entities')])
        ];
        if (t.label) {
          kids.push(svgEl('text', {
            x: t.label.x.toFixed(1),
            y: t.label.y.toFixed(1),
            'text-anchor': t.label.anchor
          }, [t.town]));
        }
        svg.appendChild(svgEl('g', {
          class: cls,
          onclick: function () { active.selected = active.selected === t.town ? null : t.town; draw(); }
        }, kids));
      });

      svgHost.appendChild(svg);
      svgHost.appendChild(el('p', { class: 'geo-note', text: geo.disclaimer }));
      renderSide();
    }

    /* ---- toolbar ---- */
    var bar = el('div', { class: 'toolbar' });
    var catGroup = el('div', { class: 'fgroup' }, [el('span', { class: 'flabel', text: 'Layer' })]);
    ['all'].concat(CATEGORY_ORDER).forEach(function (c) {
      var b = el('button', {
        class: 'fbtn', type: 'button',
        'aria-pressed': c === 'all' ? 'true' : 'false',
        text: c === 'all' ? 'All' : CATEGORY_LABEL[c],
        onclick: function () {
          active.category = c;
          Array.prototype.forEach.call(catGroup.querySelectorAll('.fbtn'), function (x) {
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          draw();
        }
      });
      catGroup.appendChild(b);
    });
    bar.appendChild(catGroup);

    var corridorBtn = el('button', {
      class: 'fbtn', type: 'button', 'aria-pressed': 'false',
      text: 'Bath to Kittery corridor',
      onclick: function () {
        active.corridor = !active.corridor;
        corridorBtn.setAttribute('aria-pressed', active.corridor ? 'true' : 'false');
        draw();
      }
    });
    bar.appendChild(el('div', { class: 'fgroup' }, [el('span', { class: 'flabel', text: 'Overlay' }), corridorBtn]));
    bar.appendChild(el('span', {
      class: 'fcount',
      text: geo.points.length + ' entities across ' + towns.length + ' places'
    }));

    draw();

    return el('div', null, [
      bar,
      el('div', { class: 'geo-layout' }, [svgHost, side])
    ]);
  }

  global.V = { chainDiagram: chainDiagram, geoView: geoView };
})(window);
