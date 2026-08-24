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

  /* The industrial arc named in the brief, as a window on the same projection.
     Everything from Kittery up to Bath, which is where the plotted entities
     crowd together and where the whole map most needs the room. */
  var CORRIDOR_BOX = { latMin: 43.00, latMax: 44.05, lngMin: -70.95, lngMax: -69.60 };

  function boxToView(box) {
    var x1 = px(box.lngMin), x2 = px(box.lngMax);
    var y1 = py(box.latMax), y2 = py(box.latMin);
    return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
  }

  var FULL_VIEW = { x: 0, y: 0, w: VW, h: VH };
  var MIN_W = VW / 12;

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

  function townCategory(town) {
    for (var i = 0; i < CATEGORY_ORDER.length; i++) {
      var c = CATEGORY_ORDER[i];
      if (town.items.some(function (x) { return x.category === c; })) return c;
    }
    return 'institution';
  }

  function baseRadius(town) {
    return Math.min(8.5, 3.1 + Math.sqrt(town.items.length) * 1.5);
  }

  /*
   * Greedy label placement, in projection units. `k` is the current zoom
   * factor: dots and labels keep a constant size on screen, so zooming in
   * spreads them apart instead of magnifying them, which is what declutters
   * the southwest. Busiest towns claim a slot first, and a label that
   * collides everywhere is dropped. Its town keeps the dot and the tooltip.
   */
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

  function placeLabels(towns, view, k) {
    var boxes = [];
    var CH = 3.95 * k;
    var LH = 7.6 * k;
    var PAD = 0.7 * k;

    function overlaps(a, b) {
      return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
    }
    function inView(x, y) {
      return x >= view.x && x <= view.x + view.w && y >= view.y && y <= view.y + view.h;
    }

    towns.forEach(function (t) {
      t.r = baseRadius(t) * k;
      t.cx = px(t.lng);
      t.cy = py(t.lat);
      t.onScreen = t.plotted && inView(t.cx, t.cy);
      if (t.onScreen) boxes.push({ x1: t.cx - t.r, x2: t.cx + t.r, y1: t.cy - t.r, y2: t.cy + t.r });
    });

    towns.forEach(function (t) {
      t.label = null;
      if (!t.onScreen) return;
      var w = t.town.length * CH;

      for (var i = 0; i < LABEL_SLOTS.length; i++) {
        var sl = LABEL_SLOTS[i];
        var x = t.cx + sl.dx * (t.r + 2.5 * k);
        var y = t.cy + sl.dy * k;
        var x1 = sl.anchor === 'start' ? x : sl.anchor === 'end' ? x - w : x - w / 2;
        if (x1 < view.x + k || x1 + w > view.x + view.w - k) continue;
        if (y < view.y + 6 * k || y > view.y + view.h - 2 * k) continue;
        var box = { x1: x1 - PAD, x2: x1 + w + PAD, y1: y - LH * 0.82, y2: y + LH * 0.26 };
        if (boxes.some(function (b) { return overlaps(box, b); })) continue;
        boxes.push(box);
        t.label = { x: x, y: y, anchor: sl.anchor, size: 6.4 * k };
        return;
      }
    });
    return towns;
  }

  /*
   * Draw one map into an <svg>. Used for the main view and for the corridor
   * inset, which is the same projection windowed onto the industrial arc.
   */
  function drawMap(svg, geo, towns, state, view, opts) {
    opts = opts || {};
    var k = view.w / VW;
    svg.textContent = '';
    svg.setAttribute('viewBox', [view.x, view.y, view.w, view.h].map(function (n) {
      return n.toFixed(1);
    }).join(' '));

    var ring = geo.outline.map(function (p) {
      return px(p[0]).toFixed(1) + ',' + py(p[1]).toFixed(1);
    }).join(' ');
    svg.appendChild(svgEl('polygon', { class: 'maine-outline', points: ring, 'stroke-width': (1.1 * k).toFixed(2) }));

    var corridorPts = geo.corridor.map(function (c) {
      return px(c.lng).toFixed(1) + ',' + py(c.lat).toFixed(1);
    }).join(' ');
    var corridorOn = state.corridor || opts.forceCorridor;
    svg.appendChild(svgEl('polyline', {
      class: 'corridor-band' + (corridorOn ? ' on' : ''),
      points: corridorPts, 'stroke-width': (15 * k).toFixed(1)
    }));
    if (corridorOn) {
      svg.appendChild(svgEl('polyline', {
        class: 'corridor-line', points: corridorPts,
        'stroke-width': (1.4 * k).toFixed(2), 'stroke-dasharray': (5 * k).toFixed(1) + ' ' + (4 * k).toFixed(1)
      }));
    }

    placeLabels(towns, view, k).forEach(function (t) {
      if (!t.onScreen) return;
      var cat = townCategory(t);
      var matches = state.category === 'all' ||
        t.items.some(function (x) { return x.category === state.category; });
      var cls = 'pt cat-' + cat + (matches ? '' : ' dim') + (state.selected === t.town ? ' sel' : '');

      var kids = [
        svgEl('circle', {
          class: 'hit', cx: t.cx.toFixed(1), cy: t.cy.toFixed(1),
          r: Math.max(t.r + 4 * k, 9 * k).toFixed(1)
        }),
        svgEl('circle', {
          cx: t.cx.toFixed(1), cy: t.cy.toFixed(1), r: t.r.toFixed(1),
          'stroke-width': ((state.selected === t.town ? 2.2 : 1.4) * k).toFixed(2)
        }),
        svgEl('title', null, [t.town + ', ' + t.items.length + (t.items.length === 1 ? ' entity' : ' entities')])
      ];
      if (t.label) {
        kids.push(svgEl('text', {
          x: t.label.x.toFixed(1), y: t.label.y.toFixed(1),
          'text-anchor': t.label.anchor,
          style: 'font-size:' + t.label.size.toFixed(2) + 'px'
        }, [t.town]));
      }
      svg.appendChild(svgEl('g', {
        class: cls,
        onclick: function () { opts.onSelect(t.town); }
      }, kids));
    });

    /* Locator rectangle showing what the inset covers. */
    if (opts.locator) {
      var lb = boxToView(CORRIDOR_BOX);
      svg.appendChild(svgEl('rect', {
        class: 'locator',
        x: lb.x.toFixed(1), y: lb.y.toFixed(1),
        width: lb.w.toFixed(1), height: lb.h.toFixed(1),
        'stroke-width': (1.2 * k).toFixed(2),
        'stroke-dasharray': (4 * k).toFixed(1) + ' ' + (3 * k).toFixed(1)
      }));
    }
  }

  function geoView(geo) {
    var towns = groupByTown(geo.points);
    var state = { category: 'all', corridor: false, selected: null };
    var view = { x: FULL_VIEW.x, y: FULL_VIEW.y, w: FULL_VIEW.w, h: FULL_VIEW.h };

    var side = el('div', { class: 'geo-side' });
    var mainSvg = svgEl('svg', {
      class: 'mainmap', role: 'img',
      'aria-label': 'Schematic map of Maine with plotted entities'
    });
    var insetSvg = svgEl('svg', {
      class: 'insetmap', role: 'img',
      'aria-label': 'Detail of the Bath to Kittery corridor'
    });
    var note = el('p', { class: 'geo-note', text: geo.disclaimer });

    function clamp() {
      var minW = MIN_W, maxW = VW;
      view.w = Math.max(minW, Math.min(maxW, view.w));
      view.h = view.w * (VH / VW);
      view.x = Math.max(0, Math.min(VW - view.w, view.x));
      view.y = Math.max(0, Math.min(VH - view.h, view.y));
    }

    function zoomAt(factor, fx, fy) {
      var oldW = view.w;
      view.w = view.w * factor;
      clamp();
      var scale = view.w / oldW;
      view.x = fx - (fx - view.x) * scale;
      view.y = fy - (fy - view.y) * scale;
      clamp();
      draw();
    }

    function select(town) {
      state.selected = state.selected === town ? null : town;
      draw();
    }

    function draw() {
      drawMap(mainSvg, geo, towns, state, view, { onSelect: select, locator: true });
      drawMap(insetSvg, geo, towns, state, boxToView(CORRIDOR_BOX), { onSelect: select, forceCorridor: true });
      zoomLabel.textContent = (VW / view.w).toFixed(1) + 'x';
      renderSide();
    }

    /* ---- side list ---- */
    function renderSide() {
      side.textContent = '';
      side.appendChild(el('h4', { text: state.selected ? state.selected : 'Plotted entities' }));

      var shown = towns.filter(function (t) {
        if (state.selected && t.town !== state.selected) return false;
        if (state.category === 'all') return true;
        return t.items.some(function (x) { return x.category === state.category; });
      });

      if (state.selected) {
        side.appendChild(el('button', {
          class: 'fbtn', type: 'button', text: 'Clear selection',
          onclick: function () { state.selected = null; draw(); }
        }));
      }

      var list = el('ul', { class: 'geo-list' });
      shown.forEach(function (t) {
        t.items.forEach(function (item) {
          if (state.category !== 'all' && item.category !== state.category) return;
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

    /* ---- toolbar ---- */
    var bar = el('div', { class: 'toolbar' });
    var catGroup = el('div', { class: 'fgroup' }, [el('span', { class: 'flabel', text: 'Layer' })]);
    ['all'].concat(CATEGORY_ORDER).forEach(function (c) {
      var b = el('button', {
        class: 'fbtn', type: 'button',
        'aria-pressed': c === 'all' ? 'true' : 'false',
        text: c === 'all' ? 'All' : CATEGORY_LABEL[c],
        onclick: function () {
          state.category = c;
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
        state.corridor = !state.corridor;
        corridorBtn.setAttribute('aria-pressed', state.corridor ? 'true' : 'false');
        draw();
      }
    });
    bar.appendChild(el('div', { class: 'fgroup' }, [el('span', { class: 'flabel', text: 'Overlay' }), corridorBtn]));

    var zoomLabel = el('span', { class: 'zoomlabel', text: '1.0x' });
    var zoomGroup = el('div', { class: 'fgroup' }, [
      el('span', { class: 'flabel', text: 'Zoom' }),
      el('button', {
        class: 'fbtn', type: 'button', text: '−', 'aria-label': 'Zoom out',
        onclick: function () { zoomAt(1.5, view.x + view.w / 2, view.y + view.h / 2); }
      }),
      el('button', {
        class: 'fbtn', type: 'button', text: '+', 'aria-label': 'Zoom in',
        onclick: function () { zoomAt(1 / 1.5, view.x + view.w / 2, view.y + view.h / 2); }
      }),
      el('button', {
        class: 'fbtn', type: 'button', text: 'Fit corridor',
        onclick: function () {
          var b = boxToView(CORRIDOR_BOX);
          view.x = b.x; view.y = b.y; view.w = b.w;
          clamp();
          view.y = b.y;
          clamp();
          draw();
        }
      }),
      el('button', {
        class: 'fbtn', type: 'button', text: 'Reset',
        onclick: function () {
          view.x = 0; view.y = 0; view.w = VW; view.h = VH;
          draw();
        }
      }),
      zoomLabel
    ]);
    bar.appendChild(zoomGroup);
    bar.appendChild(el('span', {
      class: 'fcount',
      text: geo.points.length + ' entities across ' + towns.length + ' places'
    }));

    /* ---- wheel and drag on the main map ---- */
    var figure = el('div', { class: 'geo-figure' }, [mainSvg, note]);

    mainSvg.addEventListener('wheel', function (ev) {
      ev.preventDefault();
      var rect = mainSvg.getBoundingClientRect();
      var fx = view.x + ((ev.clientX - rect.left) / rect.width) * view.w;
      var fy = view.y + ((ev.clientY - rect.top) / rect.height) * view.h;
      zoomAt(ev.deltaY > 0 ? 1.15 : 1 / 1.15, fx, fy);
    }, { passive: false });

    var drag = null;
    mainSvg.addEventListener('pointerdown', function (ev) {
      if (ev.target.closest && ev.target.closest('.pt')) return;
      var rect = mainSvg.getBoundingClientRect();
      drag = { x: ev.clientX, y: ev.clientY, vx: view.x, vy: view.y, rw: rect.width, rh: rect.height };
      mainSvg.setPointerCapture(ev.pointerId);
      mainSvg.classList.add('dragging');
    });
    mainSvg.addEventListener('pointermove', function (ev) {
      if (!drag) return;
      view.x = drag.vx - ((ev.clientX - drag.x) / drag.rw) * view.w;
      view.y = drag.vy - ((ev.clientY - drag.y) / drag.rh) * view.h;
      clamp();
      draw();
    });
    ['pointerup', 'pointercancel'].forEach(function (t) {
      mainSvg.addEventListener(t, function () { drag = null; mainSvg.classList.remove('dragging'); });
    });

    var insetPanel = el('div', { class: 'inset-map' }, [
      el('p', { class: 'inset-label', text: 'Bath to Kittery corridor' }),
      insetSvg
    ]);

    draw();

    return el('div', null, [
      bar,
      el('div', { class: 'geo-layout' }, [
        figure,
        el('div', { class: 'geo-rail' }, [insetPanel, side])
      ])
    ]);
  }

  global.V = { chainDiagram: chainDiagram, geoView: geoView };
})(window);
