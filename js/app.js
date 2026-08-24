/* Shell: masthead, running header and footer, tabs, panels, cluster filters.

   Interface strings authored here follow the house prose rule. No em dashes,
   no semicolons, no emoji, and no "not X, it's Y" constructions. */

(function () {
  'use strict';

  var D = window.MAINE_MAP_DATA;
  var el = R.el;

  var meta = D.meta;
  var tabs = D.tabs;
  var sections = D.sections;
  var manifest = D.manifest;

  var byNum = {};
  sections.forEach(function (s) { byNum[s.num] = s; });

  var app = document.getElementById('app');

  /* ---------------------------------------------------------------- */
  /* Running header and footer                                         */
  /* ---------------------------------------------------------------- */

  function running(cls) {
    return el('div', { class: 'running' + (cls ? ' ' + cls : '') },
      meta.runningHeader.map(function (t) { return el('span', { text: t }); }));
  }

  /* ---------------------------------------------------------------- */
  /* Masthead                                                          */
  /* ---------------------------------------------------------------- */

  function masthead() {
    return el('header', { class: 'masthead' }, [
      el('span', { class: 'badge', text: meta.badge }),
      el('h1', { text: meta.title }),
      el('p', { class: 'sub' }, meta.subtitle.map(function (t) { return el('span', { text: t }); }))
    ]);
  }

  function standfirst() {
    return el('div', { class: 'standfirst' }, [
      el('b', { text: 'Source: ' }),
      el('span', { text: meta.sourceFile }),
      el('div', { class: 'parse-audit', text:
        manifest.sections + ' sections · ' + manifest.clusters + ' capability clusters · ' +
        manifest.callouts + ' callouts · ' + manifest.tables + ' tables · ' +
        manifest.inlineMarkers + ' inline confidence markers · ' + manifest.entries + ' entries' })
    ]);
  }

  /* ---------------------------------------------------------------- */
  /* Section heading                                                   */
  /* ---------------------------------------------------------------- */

  function sectionHead(s) {
    return el('div', null, [
      el('div', { class: 'section-head' }, [el('span', { class: 'kicker', text: 'Section ' + s.num })]),
      el('h2', { class: 'section-title', text: s.title, id: 'sec-' + s.num })
    ]);
  }

  /* ---------------------------------------------------------------- */
  /* Panel 2: formation chain with the chain and geographic toggle      */
  /* ---------------------------------------------------------------- */

  /* Both views stay in the DOM and swap with the hidden attribute, so a print
     run carries the chain and the geographic plot rather than whichever one
     happened to be on screen. */
  function chainPanel() {
    var s = byNum['2'];
    var chainHost = el('div', { class: 'view-chain' }, [V.chainDiagram(D.chain)]);
    var geoHost = el('div', { class: 'view-geo', hidden: true }, [V.geoView(D.geo)]);

    var chainBtn, geoBtn;
    function paint(mode) {
      chainHost.hidden = mode !== 'chain';
      geoHost.hidden = mode !== 'geo';
      chainBtn.setAttribute('aria-selected', mode === 'chain' ? 'true' : 'false');
      geoBtn.setAttribute('aria-selected', mode === 'geo' ? 'true' : 'false');
    }

    chainBtn = el('button', { class: 'fbtn', type: 'button', 'aria-selected': 'true', text: 'Chain view',
      onclick: function () { paint('chain'); } });
    geoBtn = el('button', { class: 'fbtn', type: 'button', 'aria-selected': 'false', text: 'Geographic view',
      onclick: function () { paint('geo'); } });

    return el('div', null, [
      sectionHead(s),
      R.blocks(s.blocks.filter(function (b) { return b.type === 'para'; })),
      el('div', { class: 'viewtoggle' }, [chainBtn, geoBtn]),
      chainHost,
      geoHost,
      R.blocks(s.blocks.filter(function (b) { return b.type === 'callout'; })),
      el('details', { class: 'acc' }, [
        el('summary', { text: 'Stage table as printed in the source' }),
        el('div', { class: 'acc-body' }, [R.table(s.blocks.filter(function (b) { return b.type === 'table'; })[0])])
      ])
    ]);
  }

  /* ---------------------------------------------------------------- */
  /* Panel 4: capability clusters                                      */
  /* ---------------------------------------------------------------- */

  var VIEWS = [
    { id: 'all', label: 'All' },
    { id: 'assets', label: 'Assets' },
    { id: 'who', label: "Who's there" },
    { id: 'space', label: 'White space' }
  ];

  function clusterPanel() {
    var s = byNum['4'];
    var clusters = D.clusters;
    var subByNum = {};
    s.subsections.forEach(function (sub) { subByNum[sub.num] = sub; });

    var state = { heat: 'all', depth: 'all', view: 'all' };
    var cardHost = el('div');
    var count = el('span', { class: 'fcount' });

    function clusterCard(c) {
      var card = el('div', { class: 'card' });
      var head = el('div', { class: 'card-head' }, [
        el('h3', { class: 'sub-title', style: 'margin:0', id: c.id }, [
          el('span', { class: 'n', text: c.num }),
          document.createTextNode(c.title)
        ]),
        R.heatChip(c.heat),
        R.depthChip(c.depth)
      ]);
      card.appendChild(head);

      if (state.view === 'all') {
        var sub = subByNum[c.num];
        card.appendChild(R.blocks(sub.blocks.filter(function (b) { return b.type !== 'rating'; })));
        sub.entries.forEach(function (e) {
          card.appendChild(el('h4', { class: 'entry-title', text: e.title }));
          card.appendChild(R.blocks(e.blocks));
        });
      } else if (state.view === 'assets') {
        card.appendChild(R.blocks(c.assets));
      } else if (state.view === 'who') {
        if (!c.whoIsThere.length) {
          card.appendChild(el('div', { class: 'empty', text: 'The source names no Who is there block for this cluster' }));
        }
        c.whoIsThere.forEach(function (e) { card.appendChild(R.blocks(e.blocks)); });
      } else if (state.view === 'space') {
        if (!c.whiteSpace.length) {
          card.appendChild(el('div', { class: 'empty', text: 'The source carries no VC WHITE SPACE box for this cluster' }));
        }
        c.whiteSpace.forEach(function (co) { card.appendChild(R.callout(co)); });
      }

      /* Constraints attached to a cluster stay visible in every view, because
         they qualify everything above them. */
      if (state.view !== 'all') {
        c.constraints.forEach(function (co) { card.appendChild(R.callout(co)); });
      }
      return card;
    }

    function paint() {
      var shown = clusters.filter(function (c) {
        if (state.heat !== 'all' && c.heat !== state.heat) return false;
        if (state.depth !== 'all' && c.depth !== state.depth) return false;
        return true;
      });
      cardHost.textContent = '';
      if (!shown.length) {
        cardHost.appendChild(el('div', { class: 'empty', text: 'No cluster matches this filter' }));
      }
      shown.forEach(function (c) { cardHost.appendChild(clusterCard(c)); });
      count.textContent = shown.length + ' of ' + clusters.length + ' clusters';
    }

    function group(label, key, values) {
      var g = el('div', { class: 'fgroup' }, [el('span', { class: 'flabel', text: label })]);
      values.forEach(function (v) {
        var b = el('button', {
          class: 'fbtn', type: 'button',
          'aria-pressed': (state[key] === v.id) ? 'true' : 'false',
          text: v.label,
          onclick: function () {
            state[key] = v.id;
            Array.prototype.forEach.call(g.querySelectorAll('.fbtn'), function (x) {
              x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
            });
            paint();
          }
        });
        g.appendChild(b);
      });
      return g;
    }

    var heats = ['all'].concat(unique(clusters.map(function (c) { return c.heat; })));
    var depths = ['all'].concat(unique(clusters.map(function (c) { return c.depth; })));

    var bar = el('div', { class: 'toolbar' }, [
      group('Heat', 'heat', heats.map(function (v) { return { id: v, label: v === 'all' ? 'All' : v }; })),
      group('Depth', 'depth', depths.map(function (v) { return { id: v, label: v === 'all' ? 'All' : v }; })),
      group('Fields', 'view', VIEWS),
      count
    ]);

    paint();

    return el('div', null, [
      sectionHead(s),
      R.blocks(s.blocks),
      bar,
      cardHost
    ]);
  }

  function unique(a) {
    var out = [];
    a.forEach(function (x) { if (x && out.indexOf(x) < 0) out.push(x); });
    return out;
  }

  /* ---------------------------------------------------------------- */
  /* Panel 1: overview, plus the Contents block as printed              */
  /* ---------------------------------------------------------------- */

  function overviewPanel() {
    var s = byNum['1'];
    var nodes = [sectionHead(s), R.section(s), standfirst()];
    if (D.contents) {
      var t = (D.contents.blocks || []).filter(function (b) { return b.type === 'table'; })[0];
      if (t) {
        nodes.push(el('details', { class: 'acc' }, [
          el('summary', { text: 'Contents, reproduced from the source' }),
          el('div', { class: 'acc-body' }, [
            el('p', { class: 'table-caption', text: 'Navigation is built from the body headings. This table is the source Contents, rendered unchanged.' }),
            R.table(t)
          ])
        ]));
      }
    }
    return el('div', null, nodes);
  }

  /* ---------------------------------------------------------------- */
  /* Generic panel                                                     */
  /* ---------------------------------------------------------------- */

  function genericPanel(num) {
    var s = byNum[num];
    return el('div', null, [sectionHead(s), R.section(s)]);
  }

  /* ---------------------------------------------------------------- */
  /* Assembly                                                          */
  /* ---------------------------------------------------------------- */

  function buildPanel(num) {
    if (num === '1') return overviewPanel();
    if (num === '2') return chainPanel();
    if (num === '4') return clusterPanel();
    return genericPanel(num);
  }

  var tabList = el('div', { class: 'tabs', role: 'tablist' });
  var panelHost = el('div');
  var panels = {};
  var buttons = {};

  tabs.forEach(function (t) {
    var kids = [el('span', { class: 'num', text: t.num })];
    kids.push(document.createTextNode(t.label));
    if (t.mark === 'star') kids.push(el('span', { class: 'mark-star', text: '★' }));
    if (t.mark === 'square') kids.push(el('span', { class: 'mark-square', text: '■' }));

    var btn = el('button', {
      class: 'tab', type: 'button', role: 'tab',
      id: 'tab-' + t.num,
      'aria-selected': 'false',
      'aria-controls': 'panel-' + t.num,
      onclick: function () { select(t.num, true); }
    }, kids);
    buttons[t.num] = btn;
    tabList.appendChild(btn);

    var p = el('section', {
      class: 'panel', role: 'tabpanel',
      id: 'panel-' + t.num,
      'aria-labelledby': 'tab-' + t.num,
      hidden: true
    }, [buildPanel(t.num)]);
    panels[t.num] = p;
    panelHost.appendChild(p);
  });

  function select(num, push) {
    tabs.forEach(function (t) {
      var on = t.num === num;
      buttons[t.num].setAttribute('aria-selected', on ? 'true' : 'false');
      panels[t.num].hidden = !on;
    });
    if (push && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#section-' + num);
    }
    window.scrollTo(0, 0);
  }

  app.appendChild(running());
  app.appendChild(masthead());
  app.appendChild(tabList);
  app.appendChild(panelHost);
  app.appendChild(el('div', { class: 'running running-foot' }, [
    el('span', { text: meta.runningFooter })
  ]));

  var fromHash = (location.hash.match(/^#section-(\d+)$/) || [])[1];
  select(byNum[fromHash] ? fromHash : '2', false);

  /* ---------------------------------------------------------------- */
  /* Print                                                             */
  /* ---------------------------------------------------------------- */

  /* Print carries the whole document, so open every accordion, expand every
     stage node, and drop back to the unfiltered cluster view first. */
  function prepareForPrint() {
    Array.prototype.forEach.call(document.querySelectorAll('.toolbar .fbtn'), function (b) {
      if (b.getAttribute('aria-pressed') === 'false' && /^(All)$/.test(b.textContent)) b.click();
    });
    Array.prototype.forEach.call(document.querySelectorAll('details'), function (d) { d.open = true; });
    Array.prototype.forEach.call(document.querySelectorAll('.stage-node .insts'), function (u) { u.hidden = false; });
    var geo = document.querySelector('.view-geo');
    if (geo) geo.hidden = false;
  }
  window.addEventListener('beforeprint', prepareForPrint);
  if (window.matchMedia) {
    var mq = window.matchMedia('print');
    if (mq.addListener) mq.addListener(function (m) { if (m.matches) prepareForPrint(); });
  }
})();
