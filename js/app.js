/* Application shell. Tabs, filters, search, detail panel, and the nine
   section panels. All panels stay in the DOM so that search, print and
   deep links work regardless of the active tab. */
(function (global) {
  'use strict';

  var D = global.RoscData, U = global.RoscUI, V = global.RoscViews;

  var state = {
    tab: 'formation-chain',
    view: 'chain',
    q: '',
    filters: { cluster: [], type: [], openness: [], confidence: [] },
    anchorCode: 'All',
    clusterView: 'all',
    selected: null,
    corridor: false
  };

  /* ================================================== entity index ======== */

  var entities = [];

  function buildIndex() {
    D.anchorNodes.nodes.forEach(function (n) {
      entities.push({
        id: n.id, name: n.name, shortName: n.code, type: 'anchor', code: n.code,
        cluster: n.cluster || [], openness: n.openness, confidence: n.confidence,
        location: n.location, description: n.summary, vc: n.vcRead, vcLabel: 'VC READ',
        entryPoints: n.entryPoints, sourceIds: n.sourceIds, asOf: n.asOf, raw: n
      });
    });
    D.institutions.items.forEach(function (i) {
      entities.push({
        id: i.id, name: i.name, shortName: i.short, type: i.category === 'capital' ? 'capital' : 'institution',
        cluster: i.cluster || [], openness: i.openness, confidence: i.confidence,
        location: i.location, description: i.what, vc: i.vcAngle, vcLabel: 'VC ANGLE',
        entryPoints: i.entryPoints, entryGap: i.entryGap, sourceIds: i.sourceIds, asOf: i.asOf, raw: i
      });
    });
    D.testAssets.assets.forEach(function (t) {
      entities.push({
        id: t.id, name: t.name, shortName: t.name, type: 'test-asset',
        cluster: t.cluster || [], openness: t.openness, confidence: t.confidence,
        location: t.location, description: t.detail, sourceIds: t.sourceIds, asOf: t.asOf, raw: t
      });
    });
    D.companies.items.forEach(function (c) {
      entities.push({
        id: c.id, name: c.name, shortName: c.name, type: 'company',
        cluster: c.cluster || [], openness: null, confidence: c.confidence,
        location: c.location, description: c.note, sourceIds: c.sourceIds, asOf: c.asOf, raw: c
      });
    });
    [D.capitalStack.msctc].concat(D.capitalStack.instruments).forEach(function (c) {
      entities.push({
        id: c.id, name: c.name, shortName: c.name, type: 'capital',
        cluster: [], openness: null, confidence: c.confidence,
        location: null, description: c.summary || '', sourceIds: c.sourceIds, asOf: c.asOf, raw: c
      });
    });
    entities.forEach(function (e) {
      e.search = (e.name + ' ' + (e.shortName || '') + ' ' + (e.description || '') + ' ' +
        (e.location ? e.location.town : '') + ' ' + e.type).toLowerCase();
    });
  }

  function byId(id) {
    for (var i = 0; i < entities.length; i++) if (entities[i].id === id) return entities[i];
    return null;
  }

  /* ==================================================== filtering ========= */

  function matches(e) {
    var f = state.filters;
    if (state.q && e.search.indexOf(state.q) === -1) return false;
    if (f.type.length && f.type.indexOf(e.type) === -1) return false;
    if (f.openness.length && (!e.openness || f.openness.indexOf(e.openness) === -1)) return false;
    if (f.confidence.length && f.confidence.indexOf(e.confidence) === -1) return false;
    if (f.cluster.length) {
      var hit = (e.cluster || []).some(function (c) { return f.cluster.indexOf(c) !== -1; });
      if (!hit) return false;
    }
    return true;
  }

  function anyFilterActive() {
    var f = state.filters;
    return !!(state.q || f.type.length || f.openness.length || f.confidence.length || f.cluster.length);
  }

  function applyFilters() {
    var active = anyFilterActive();

    document.querySelectorAll('[data-entity]').forEach(function (el) {
      var e = byId(el.getAttribute('data-entity'));
      el.hidden = !!(e && !matches(e));
    });

    document.querySelectorAll('svg.maine .pt, svg.maine .lbl').forEach(function (el) {
      var e = byId(el.getAttribute('data-ref'));
      var ok = !active || (e && matches(e));
      el.classList.toggle('dim', !ok);
    });

    document.querySelectorAll('.chain-node[data-ref]').forEach(function (el) {
      var e = byId(el.getAttribute('data-ref'));
      var ok = !active || (e && matches(e));
      el.style.opacity = ok ? '1' : '0.25';
    });

    document.querySelectorAll('.panel').forEach(function (p) {
      var cards = p.querySelectorAll('[data-entity]');
      if (!cards.length) return;
      var visible = 0;
      cards.forEach(function (c) { if (!c.hidden) visible++; });
      var nr = p.querySelector('.no-results');
      if (nr) nr.hidden = visible !== 0;
    });
  }

  /* ================================================= detail panel ========= */

  function renderDetail(e) {
    var el = document.getElementById('detail-panel');
    if (!el) return;
    if (!e) {
      el.innerHTML = '<h3>Detail</h3><p class="empty">Select any node on the chain or any point on the map to read its full record, its entry points and its sources.</p>';
      mirrorDetail(el);
      return;
    }
    var r = e.raw || {};
    var html = '<h3>' + U.esc(e.name) + '</h3>' +
      '<p class="muted">' + U.esc(e.type.replace('-', ' ')) + (e.location ? ' · ' + U.esc(e.location.town) : '') + ' ' +
      U.confidenceChip(e.confidence, r.note, e.asOf) + '</p>';

    if (e.description) html += '<p style="font-size:13px;line-height:1.55">' + U.esc(e.description) + '</p>';

    html += '<dl>';
    if (e.openness) html += '<dt>Openness</dt><dd>' + U.opennessChip(e.openness) + '</dd>';
    if (r.accreditation) html += '<dt>Accreditation</dt><dd>' + U.accreditationChip(r.accreditation, r.accreditationNote) +
      (r.contaminated ? ' ' + U.contaminatedChip() : '') + '</dd>';
    if (e.location) html += '<dt>Location</dt><dd>' + U.locLine(e.location) + '</dd>';
    if (e.cluster && e.cluster.length) {
      html += '<dt>Clusters</dt><dd>' + e.cluster.map(function (c) {
        var cl = D.clusters.items.filter(function (x) { return x.id === c; })[0];
        return U.esc(cl ? cl.name : c);
      }).join(', ') + '</dd>';
    }
    if (r.tests) html += '<dt>What it tests</dt><dd>' + U.esc(r.tests) + '</dd>';
    if (r.accessRoute || r.accessGap) {
      html += '<dt>Access route</dt><dd>' + (r.accessRoute ? U.esc(r.accessRoute) : U.emptyState('not yet confirmed')) + '</dd>';
    }
    html += '</dl>';

    if (e.vc) html += (e.vcLabel === 'VC READ' ? U.vcRead(e.vc) : U.vcAngle(e.vc));
    if (r.constraint) html += U.constraint(r.constraint);
    if (e.type === 'institution' || e.type === 'capital' || e.type === 'anchor') {
      html += U.entryPoints(e.entryPoints, e.entryGap ||
        (e.type === 'anchor' && (!e.entryPoints || !e.entryPoints.length)
          ? 'No published entry point for an outside company. Route via the institution playbook.' : ''));
    }
    html += U.sourceRefs(e.sourceIds);
    el.innerHTML = html;
    mirrorDetail(el);
  }

  /* The geographic view carries its own copy of the detail panel beside the map. */
  function mirrorDetail(el) {
    var geo = document.getElementById('detail-panel-geo');
    if (geo) geo.innerHTML = el.innerHTML;
  }

  function select(id) {
    state.selected = id;
    renderDetail(byId(id));
    var panel = document.getElementById(state.view === 'geo' && state.tab === 'formation-chain'
      ? 'detail-panel-geo' : 'detail-panel');
    if (panel && panel.scrollIntoView) panel.scrollIntoView({ block: 'nearest' });
  }

  /* ================================================= panel builders ======= */

  function filterAttrs(e) {
    return ' data-entity="' + U.attr(e.id) + '"';
  }

  function panelFormationChain() {
    var fc = D.formationChain;
    return '<p class="section-intro">' + U.esc(fc.intro) + '</p>' +
      '<div class="screen-only" style="display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap">' +
        '<div class="view-toggle" role="group" aria-label="View">' +
          '<button type="button" data-view="chain" aria-pressed="true">Chain view</button>' +
          '<button type="button" data-view="geo" aria-pressed="false">Geographic view</button>' +
        '</div>' +
        '<button type="button" class="filter-chip" id="corridor-toggle" aria-pressed="false">Highlight defense corridor</button>' +
      '</div>' +
      '<div id="view-chain"><div class="chain-scroll">' + V.renderChain(entities) + '</div>' +
        V.renderBreaks() +
        '<div class="note-box" style="margin-top:14px"><b>The capital ladder in one line.</b><br>' + V.renderLadder() + '</div>' +
      '</div>' +
      '<div id="view-geo" hidden><div class="geo-wrap">' +
        V.renderMap(entities) +
        '<div><div class="detail-panel" id="detail-panel-geo"></div>' +
        '<div class="note-box" style="margin-top:12px;font-size:13px"><b>' + U.esc(D.meta.corridor.label) + '.</b> ' +
          U.esc(D.meta.corridor.body) + '</div></div>' +
      '</div></div>' +
      '<div class="detail-panel" id="detail-panel" style="margin-top:14px"></div>';
  }

  function panelAnchors() {
    var a = D.anchorNodes;
    var chips = a.filterCodes.map(function (c) {
      return '<button type="button" class="filter-chip anchor-code" data-code="' + U.attr(c) + '" aria-pressed="' + (c === 'All') + '">' + U.esc(c) + '</button>';
    }).join('');

    var cards = a.nodes.map(function (n) {
      var body =
        '<p>' + U.esc(n.summary) + '</p>' +
        (n.caveat ? U.constraint(n.caveat) : '') +
        U.factRows(n.facts) +
        U.programsAndDeals(n.programsAndDeals) +
        U.vcRead(n.vcRead) +
        U.entryPoints(n.entryPoints, 'No published entry point for an outside company. Route via the institution playbook.') +
        '<p style="font-size:12px;color:#64748b">' + U.locLine(n.location) + '</p>' +
        U.sourceRefs(n.sourceIds);

      return U.card({
        entityId: n.id,
        filterData: ' data-code="' + U.attr(n.code) + '"',
        tile: { label: n.code, color: n.tileColor },
        title: U.esc(n.name) + ' ' + U.confidenceChip(n.confidence, null, n.asOf),
        sub: U.esc(n.location.town) + ' · ' + U.esc(n.valueNote || ''),
        right: U.opennessChip(n.openness) + ' ' + U.valuePill(n.value, n.tileColor),
        body: body
      });
    }).join('');

    return '<p class="section-intro">' + U.esc(a.intro) + '</p>' +
      '<div class="filter-bar screen-only"><div class="filter-group"><span class="flabel">Entity</span>' + chips + '</div></div>' +
      cards + '<div class="no-results" hidden>No anchor node matches the current filters.</div>';
  }

  function panelClusters() {
    var c = D.clusters;
    var vf = c.viewFilters.map(function (f) {
      return '<button type="button" class="filter-chip cluster-view" data-cview="' + U.attr(f.id) + '" aria-pressed="' + (f.id === 'all') + '">' + U.esc(f.label) + '</button>';
    }).join('');

    var cards = c.items.map(function (cl) {
      var assets = '<ul>' + cl.assets.map(function (a) { return '<li>' + U.esc(a) + '</li>'; }).join('') + '</ul>';
      var who = '<ul>' + cl.whoIsThere.map(function (w) {
        return '<li>' + (w.ref ? '<a href="#" class="ref-link" data-ref="' + U.attr(w.ref) + '">' + U.esc(w.name) + '</a>' : U.esc(w.name)) +
          (w.note ? '. ' + U.esc(w.note) : '') + '</li>';
      }).join('') + '</ul>';

      var body =
        (cl.flag ? '<p style="font-size:13px"><span class="warn-tag">NOTE</span> ' + U.esc(cl.flag) + '</p>' : '') +
        '<div class="cview cview-assets">' + U.inset('grey', 'MAINE ASSETS', assets) + '</div>' +
        '<div class="cview cview-who">' + U.inset('grey', 'WHO IS THERE', who) + '</div>' +
        (cl.constraint ? '<div class="cview cview-all">' + U.constraint(cl.constraint) + '</div>' : '') +
        '<div class="cview cview-whitespace">' + U.whiteSpace(cl.whiteSpace) + '</div>' +
        '<div class="cview cview-all">' + companyTable(cl.id) + U.sourceRefs(cl.sourceIds) + '</div>';

      return U.card({
        entityId: null,
        filterData: ' data-cluster-card="' + U.attr(cl.id) + '"',
        title: U.esc(cl.name),
        sub: U.esc(cl.summary.slice(0, 110)) + (cl.summary.length > 110 ? '...' : ''),
        right: U.heatChip(cl.heat) + ' ' + U.depthTag(cl.depth),
        body: body
      });
    }).join('');

    var ctx = D.companies.contextFigures.map(function (f) {
      return '<div class="thesis-card"><span class="lead mono">' + U.esc(f.value) + '</span>' +
        '<p>' + U.esc(f.label) + ' ' + U.confidenceChip(f.confidence, f.note) +
        (f.warn ? ' <span class="warn-tag">LOW QUALITY SOURCE</span>' : '') + '</p></div>';
    }).join('');

    return '<p class="section-intro">' + U.esc(c.intro) + '</p>' +
      '<div class="filter-bar screen-only"><div class="filter-group"><span class="flabel">View</span>' + vf +
      '<span class="screen-only-hint" style="margin-left:8px">View filters change which fields render inside every card, not which cards show.</span></div></div>' +
      cards +
      '<h3 class="section-title">Company inventory</h3>' +
      '<p class="section-intro">' + U.esc(D.companies.intro) + '</p>' +
      '<div class="thesis-row" style="grid-template-columns:repeat(3,1fr)">' + ctx + '</div>' +
      companyTable(null);
  }

  function clusterLabel(id) {
    var c = D.clusters.items.filter(function (x) { return x.id === id; })[0];
    return c ? (c.short || c.name) : id;
  }

  function companyTable(clusterId) {
    var items = D.companies.items.filter(function (c) {
      return !clusterId || (c.cluster || []).indexOf(clusterId) !== -1;
    });
    if (!items.length) return '';
    var rows = items.map(function (c) {
      return '<tr' + filterAttrs({ id: c.id }) + '>' +
        '<td>' + U.esc(c.name) + ' ' + U.confidenceChip(c.confidence, c.warnNote, c.asOf) +
          (c.warn ? ' <span class="warn-tag">CHECK</span>' : '') + '</td>' +
        '<td class="mono">' + U.esc(c.location.town) + '</td>' +
        '<td class="mono">' + U.esc((c.cluster || []).map(clusterLabel).join(', ') || 'none') + '</td>' +
        '<td class="mono">' + (c.ventureBacked ? 'YES' : 'NO') + '</td>' +
        '<td>' + U.esc(c.note || '') + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="tbl-scroll"><table class="data"><thead><tr>' +
      '<th class="sortable" data-sort="0">Company</th><th class="sortable" data-sort="1">Town</th>' +
      '<th class="sortable" data-sort="2">Cluster</th><th class="sortable" data-sort="3">VC backed</th><th>Note</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  function panelInstitutions() {
    var inst = D.institutions;
    var cards = inst.items.map(function (i) {
      var programs = i.programs && i.programs.length
        ? U.inset('grey', 'PROGRAMS & THRESHOLDS', '<ul>' + i.programs.map(function (p) {
            return '<li><b>' + U.esc(p.name) + '.</b> ' + U.esc(p.terms) + '</li>';
          }).join('') + '</ul>')
        : '';
      var body =
        '<p>' + U.esc(i.what) + '</p>' +
        U.factRows(i.facts) +
        programs +
        (i.scopeNote ? U.inset('scope', 'SCOPE NOTE', '<p>' + U.esc(i.scopeNote) + '</p>') : '') +
        U.vcAngle(i.vcAngle) +
        U.entryPoints(i.entryPoints, i.entryGap) +
        '<p style="font-size:12px;color:#64748b">' + U.locLine(i.location) + '</p>' +
        U.sourceRefs(i.sourceIds);

      return U.card({
        entityId: i.id,
        title: U.esc(i.name) + ' ' + U.confidenceChip(i.confidence, null, i.asOf) +
          (i.badge ? ' <span class="node-badge start">' + U.esc(i.badge) + '</span>' : ''),
        sub: U.esc(i.location.town) + (i.opennessNote ? ' · ' + U.esc(i.opennessNote) : ''),
        right: (i.accreditation ? U.accreditationChip(i.accreditation) + ' ' : '') + U.opennessChip(i.openness),
        body: body
      });
    }).join('');

    return '<div class="highlight-box"><span class="lead">' + U.esc(inst.highlight.lead) + '</span> ' + U.esc(inst.highlight.body) + '</div>' +
      '<div class="explainer-box"><span class="lead">' + U.esc(inst.explainer.lead) + '</span> ' + U.esc(inst.explainer.body) + '</div>' +
      cards + '<div class="no-results" hidden>No institution matches the current filters.</div>';
  }

  function panelCapital() {
    var cs = D.capitalStack;
    var terms = cs.msctc.terms.map(function (t) {
      return '<tr' + (t.highlight ? ' style="background:#fdeef0"' : '') + '><td>' + U.esc(t.term) + '</td>' +
        '<td class="mono">' + U.esc(t.value) + '</td></tr>';
    }).join('');
    var hist = cs.msctc.history.map(function (h) {
      return '<li><span class="mono">' + U.esc(h.year) + '</span> ' + U.esc(h.value) + '</li>';
    }).join('');

    var instruments = cs.instruments.map(function (i) {
      return U.card({
        entityId: i.id,
        title: U.esc(i.name) + ' ' + U.confidenceChip(i.confidence, null, i.asOf),
        sub: U.esc(i.type),
        right: '<span class="value-pill">' + U.esc(i.summary.slice(0, 46)) + (i.summary.length > 46 ? '...' : '') + '</span>',
        body: '<p>' + U.esc(i.detail) + '</p>' +
          (i.gap ? U.constraint(i.gap) : '') + U.sourceRefs(i.sourceIds)
      });
    }).join('');

    var days = Math.max(0, Math.round((new Date(cs.cliff.deadline) - new Date(D.meta.asOf + '-17')) / 86400000));
    var onrDays = Math.max(0, Math.round((new Date(cs.solicitation.due) - new Date(D.meta.asOf + '-17')) / 86400000));

    return '<p class="section-intro">' + U.esc(cs.intro) + '</p>' +
      '<div class="callout"><span class="co-label">' + U.esc(cs.cliff.label) + '</span>' +
        '<h4>' + U.esc(cs.cliff.title) + '</h4><p>' + U.esc(cs.cliff.body) + '</p>' +
        '<span class="countdown">' + U.esc(cs.cliff.badge) + ' · 31 DEC 2026 · ' + days + ' DAYS FROM AUGUST 2026</span>' +
        U.sourceRefs(cs.cliff.sourceIds) + '</div>' +

      '<div class="callout solicitation"><span class="co-label">' + U.esc(cs.solicitation.label) + '</span>' +
        '<h4>' + U.esc(cs.solicitation.title) + '</h4><p>' + U.esc(cs.solicitation.body) + '</p>' +
        '<span class="countdown blue">' + U.esc(cs.solicitation.dueLabel) + ' · ' + onrDays + ' DAYS FROM AUGUST 2026</span>' +
        U.sourceRefs(cs.solicitation.sourceIds) + '</div>' +

      '<h3 class="section-title">' + U.esc(cs.msctc.name) + '</h3>' +
      '<p class="section-intro">Administered by the ' + U.esc(cs.msctc.administrator) + '. CEO ' +
        U.esc(cs.msctc.administratorLead.name) + '.</p>' +
      '<div class="tbl-scroll"><table class="data"><thead><tr><th>Term</th><th>Value</th></tr></thead>' +
        '<tbody>' + terms + '</tbody></table></div>' +
      '<div class="inset inset-grey" style="margin-top:12px"><span class="inset-label">HISTORIC USAGE</span><ul>' + hist + '</ul></div>' +

      '<h3 class="section-title">Other instruments</h3>' + instruments +

      '<h3 class="section-title">The stack in one line</h3>' + V.renderLadder() +
      '<div class="note-box" style="margin-top:12px"><b>' + U.esc(cs.matchNote.lead) + '</b> ' + U.esc(cs.matchNote.body) + '</div>';
  }

  function panelEngagement() {
    var xr = D.crossReference;
    var channels = xr.channels.map(function (c) {
      return '<div class="channel-row">' +
        '<span class="channel-rank">' + c.rank + '</span>' +
        '<div><div class="channel-name">' +
          (c.ref ? '<a href="#" class="ref-link" data-ref="' + U.attr(c.ref) + '">' + U.esc(c.name) + '</a>' : U.esc(c.name)) +
          ' ' + U.opennessChip(c.openness) + '</div>' +
          '<div class="channel-why">' + U.esc(c.why) + '</div></div></div>';
    }).join('');

    var steps = xr.playbook.steps.map(function (s) {
      return '<li><span class="st-title">' + U.esc(s.title) + '</span><span class="st-body">' + U.esc(s.body) + '</span></li>';
    }).join('');

    var maps = {};
    D.meta.siblingMaps.forEach(function (m) { maps[m.id] = m; });

    var rows = xr.routes.map(function (r) {
      var mapCell = U.esc(r.map);
      if (r.map === 'SOCOM') mapCell = '<a href="' + U.attr(maps.socom.url) + '" target="_blank" rel="noopener">SOCOM</a>';
      else if (r.map === 'USSF') mapCell = '<a href="' + U.attr(maps.ussf.url) + '" target="_blank" rel="noopener">USSF</a>';
      return '<tr><td>' + U.esc(r.capability) + '</td>' +
        '<td>' + U.esc(r.routesTo) + '</td>' +
        '<td class="mono">' + mapCell + '</td>' +
        '<td class="mono">' + (r.entryPoint ? U.esc(r.entryPoint) : U.emptyState(r.entryPointGap || 'not yet confirmed')) + '</td>' +
        '</tr>';
    }).join('');

    var programs = xr.newPrograms.map(function (p) {
      return U.card({
        entityId: null,
        title: U.esc(p.name) + ' ' + U.confidenceChip(p.confidence, null, p.asOf),
        sub: 'New since the prior maps',
        right: '',
        body: '<p>' + U.esc(p.body) + '</p>' + U.vcRead(p.action) +
          U.entryPoints(p.entryPoints) + U.sourceRefs(p.sourceIds)
      });
    }).join('');

    var policy = xr.policyAnchors.map(function (p) {
      return '<li><b>' + U.esc(p.name) + '.</b> ' + U.esc(p.detail) + '</li>';
    }).join('');

    return '<div class="two-col">' +
        '<div><h3 class="section-title">Channels, ranked</h3>' +
          '<p class="section-intro">Ranked by usefulness to an outside company with no Maine history, not by importance.</p>' +
          channels + '</div>' +
        '<div><h3 class="section-title">' + U.esc(xr.playbook.title) + '</h3>' +
          '<ol class="stepped">' + steps + '</ol></div>' +
      '</div>' +

      '<h3 class="section-title">Two federal programs new since the prior maps</h3>' + programs +
      '<div class="inset inset-grey"><span class="inset-label">POLICY ANCHORS</span><ul>' + policy + '</ul></div>' +

      '<h3 class="section-title">Cross-reference routing table</h3>' +
      '<p class="section-intro">' + U.esc(xr.intro) + '</p>' +
      '<div class="tbl-scroll"><table class="data"><thead><tr>' +
        '<th>Maine capability</th><th>Routes to</th><th>Named in which map</th><th>Entry point from that map</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="screen-only-hint">Map links open the Rosc US SOCOM and US Space Force landscape maps. Both are password gated.</p>';
  }

  function panelTest() {
    var ta = D.testAssets;
    var afff = ta.afff;

    var cards = ta.assets.map(function (t) {
      var body = '<p>' + U.esc(t.detail) + '</p>' +
        U.factRows([
          { label: 'What it tests', value: t.tests, confidence: 'verified' },
          { label: 'Access route', value: t.accessRoute, confidence: t.accessGap ? 'gap' : 'verified' },
          { label: 'Accreditation', value: t.accreditation === 'N/A' ? 'Not applicable' : t.accreditation, confidence: t.accreditation === 'UNACCREDITED' ? 'gap' : 'verified', note: t.accreditationNote }
        ]) +
        (t.contaminated ? U.constraint(afff.lead + ' ' + afff.body) : '') +
        (t.outOfState ? U.inset('scope', 'OUTSIDE MAINE', '<p>Sited outside Maine and inside 100 miles. Included because the OnRamp Hub criteria and any regional case are read on a radius rather than a state line.</p>') : '') +
        '<p style="font-size:12px;color:#64748b">' + U.locLine(t.location) + '</p>' +
        U.sourceRefs(t.sourceIds);

      return U.card({
        entityId: t.id,
        title: U.esc(t.name) + ' ' + U.confidenceChip(t.confidence, null, t.asOf),
        sub: U.esc(t.location.town),
        right: U.accreditationChip(t.accreditation, t.accreditationNote) +
          (t.contaminated ? ' ' + U.contaminatedChip() : '') + ' ' + U.opennessChip(t.openness),
        body: body
      });
    }).join('');

    var rows = ta.assets.map(function (t) {
      return '<tr' + filterAttrs({ id: t.id }) + '>' +
        '<td>' + U.esc(t.name) + '</td>' +
        '<td class="mono">' + U.esc(t.location.town) + '</td>' +
        '<td>' + U.accreditationChip(t.accreditation, t.accreditationNote) + (t.contaminated ? ' ' + U.contaminatedChip() : '') + '</td>' +
        '<td>' + U.esc(t.tests) + '</td>' +
        '<td class="mono">' + (t.accessRoute ? U.esc(t.accessRoute) : U.emptyState('not yet confirmed')) + '</td>' +
        '</tr>';
    }).join('');

    return '<p class="section-intro">' + U.esc(ta.intro) + '</p>' +
      '<div class="tbl-scroll" style="margin-bottom:16px"><table class="data"><thead><tr>' +
        '<th class="sortable" data-sort="0">Asset</th><th class="sortable" data-sort="1">Location</th>' +
        '<th>Accreditation</th><th>What it tests</th><th>Access route</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>' +

      '<div class="callout"><span class="co-label">' + U.esc(afff.label) + ' · ' + U.esc(afff.badge) + '</span>' +
        '<h4>' + U.esc(afff.lead) + '</h4><p>' + U.esc(afff.body) + '</p>' + U.sourceRefs(afff.sourceIds) + '</div>' +

      cards + '<div class="no-results" hidden>No test asset matches the current filters.</div>';
  }

  function panelConstraints() {
    var cc = D.criticalContext;
    var items = cc.items.map(function (i) {
      return U.card({
        entityId: null,
        title: U.esc(i.n + '. ' + i.title),
        sub: '',
        right: '',
        body: '<p>' + U.esc(i.body) + '</p>' + U.constraint(i.implication) + U.sourceRefs(i.sourceIds)
      });
    }).join('');

    var cannot = cc.cannotSupport.items.map(function (t) { return '<li>' + U.esc(t) + '</li>'; }).join('');

    var gapRows = D.gaps.groups.map(function (g) {
      return '<tr><td colspan="4" style="background:#f7f8fa;font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#64748b">' +
        U.esc(g.title) + '</td></tr>' +
        g.items.map(function (it) {
          return '<tr><td>' + U.esc(it.item) + (it.priority === 'high' ? ' <span class="warn-tag">PRIORITY</span>' : '') + '</td>' +
            '<td class="mono">' + U.esc(g.kind) + '</td>' +
            '<td>' + U.esc(it.why || '') + '</td>' +
            '<td><span class="owner-cell"></span></td></tr>';
        }).join('');
    }).join('');

    return '<p class="section-intro">' + U.esc(cc.intro) + '</p>' +
      '<h3 class="section-title">Critical context</h3>' + items +

      '<h3 class="section-title">' + U.esc(cc.cannotSupport.title) + '</h3>' +
      '<p class="section-intro">' + U.esc(cc.cannotSupport.intro) + '</p>' +
      '<div class="inset inset-constraint"><span class="inset-label">MAINE CONSTRAINT</span><ul>' + cannot + '</ul>' +
        '<p style="margin-top:10px">' + U.esc(cc.cannotSupport.indexNote.body) + '</p>' +
        U.sourceRefs(cc.cannotSupport.indexNote.sourceIds) + '</div>' +

      '<h3 class="section-title">Verification gaps</h3>' +
      '<p class="section-intro">' + U.esc(D.gaps.intro) + '</p>' +
      '<div class="tbl-scroll"><table class="data"><thead><tr>' +
        '<th>Gap</th><th>Kind</th><th>Why it matters</th><th>Owner</th>' +
        '</tr></thead><tbody>' + gapRows + '</tbody></table></div>';
  }

  function panelGlossary() {
    var g = D.glossary;
    var rows = g.items.slice().sort(function (a, b) { return a.term.localeCompare(b.term); }).map(function (t) {
      return U.card({
        entityId: null,
        title: '<span class="mono">' + U.esc(t.term) + '</span> ' + U.esc(t.name),
        sub: '',
        right: '',
        body: '<p>' + U.esc(t.body) + '</p>'
      });
    }).join('');
    return '<p class="section-intro">' + U.esc(g.intro) + '</p>' + rows;
  }

  function footerSections() {
    var p = D.people;
    var rows = p.items.map(function (i) {
      return '<tr><td>' + U.esc(i.name) + '</td><td>' + U.esc(i.role) + '</td>' +
        '<td>' + U.esc(i.why) + '</td>' +
        '<td class="mono">' + (i.confidence === 'verified' ? 'VERIFIED' : U.confidenceChip(i.confidence, i.confidenceNote, i.asOf)) +
        (i.confidenceNote ? ' <span style="font-size:11px;color:#64748b">' + U.esc(i.confidenceNote) + '</span>' : '') + '</td></tr>';
    }).join('');

    var srcs = D.sources.map(function (s) {
      return '<li id="' + U.attr(s.id) + '"><span class="mono">' + s.n + '.</span> ' + U.esc(s.title) +
        '. <i>' + U.esc(s.publisher) + '</i>, ' + U.esc(s.date) +
        (s.locator ? '. <span class="mono">' + U.esc(s.locator) + '</span>' : '') +
        (s.quality ? ' <span style="color:#64748b;font-size:12px">(' + U.esc(s.quality) + ')</span>' : '') + '</li>';
    }).join('');

    return '<div class="footer-sections">' +
      '<h3 class="section-title">Key names to know</h3>' +
      '<div class="note-box">' + U.esc(p.caveat) + '</div>' +
      '<div class="tbl-scroll"><table class="data"><thead><tr>' +
        '<th class="sortable" data-sort="0">Name</th><th>Role</th><th>Why they matter</th><th>Confidence</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<h3 class="section-title">Sources</h3>' +
      '<ol style="font-size:13px;line-height:1.6;color:#3c4a5d">' + srcs + '</ol>' +
      '</div>';
  }

  /* ================================================= global filter bar ==== */

  function globalFilterBar() {
    function group(label, key, opts) {
      return '<div class="filter-group"><span class="flabel">' + label + '</span>' +
        opts.map(function (o) {
          return '<button type="button" class="filter-chip gf" data-key="' + key + '" data-val="' + U.attr(o.v) + '" aria-pressed="false">' + U.esc(o.l) + '</button>';
        }).join('') + '</div>';
    }
    return '<div class="filter-bar screen-only">' +
      '<div class="search-box"><span class="sicon">⌕</span>' +
        '<input type="search" id="global-search" placeholder="Search entity names and descriptions" aria-label="Search">' +
      '</div>' +
      group('Cluster', 'cluster', D.clusters.items.map(function (c) { return { v: c.id, l: c.short || c.name }; })) +
      group('Type', 'type', [
        { v: 'institution', l: 'Institution' }, { v: 'company', l: 'Company' },
        { v: 'anchor', l: 'Anchor node' }, { v: 'test-asset', l: 'Test asset' },
        { v: 'capital', l: 'Capital' }
      ]) +
      group('Openness', 'openness', [{ v: 'HIGH', l: 'High' }, { v: 'MED', l: 'Med' }, { v: 'LOW', l: 'Low' }]) +
      group('Confidence', 'confidence', [
        { v: 'verified', l: 'Verified' }, { v: 'unverified', l: 'Unverified' },
        { v: 'stale', l: 'Stale' }, { v: 'gap', l: 'Gap' }
      ]) +
      '<button type="button" class="filter-chip" id="clear-filters">Clear</button>' +
      '</div>';
  }

  function legendGrid() {
    return '<div class="legend-grid screen-only">' + D.meta.legend.map(function (l) {
      var demo = l.tag === 'verified' ? '<span class="mono" style="font-size:11px;color:#64748b">no badge</span>'
        : l.tag === 'gap' ? U.emptyState('not yet confirmed')
        : U.confidenceChip(l.tag, l.meaning, '2026-08');
      return '<div class="legend-cell"><span class="lt">' + demo + '</span>' +
        '<span class="lm">' + U.esc(l.meaning) + '</span>' +
        '<span class="ltr">' + U.esc(l.treatment) + '</span></div>';
    }).join('') + '</div>';
  }

  /* ======================================================== bootstrap ===== */

  var TABS = [
    { id: 'formation-chain', label: 'Formation chain', build: panelFormationChain },
    { id: 'anchors', label: 'Anchor demand nodes', build: panelAnchors },
    { id: 'clusters', label: 'Capability clusters', star: true, build: panelClusters },
    { id: 'institutions', label: 'Institution playbook', build: panelInstitutions },
    { id: 'capital', label: 'Capital & instruments', build: panelCapital },
    { id: 'engagement', label: 'Engagement & routing', build: panelEngagement },
    { id: 'test', label: 'Test infrastructure', build: panelTest },
    { id: 'constraints', label: 'Constraints & gaps', square: true, build: panelConstraints },
    { id: 'glossary', label: 'Glossary', build: panelGlossary }
  ];

  function init() {
    buildIndex();

    var m = D.meta;
    var root = document.getElementById('app');

    var tabsHtml = TABS.map(function (t) {
      return '<button class="tab" role="tab" type="button" data-tab="' + t.id + '" aria-selected="' + (t.id === state.tab) + '">' +
        (t.square ? '<span class="sq">■</span>' : '') + U.esc(t.label) +
        (t.star ? ' <span class="star">★</span>' : '') + '</button>';
    }).join('');

    var panelsHtml = TABS.map(function (t) {
      return '<section class="panel" id="panel-' + t.id + '" role="tabpanel"' + (t.id === state.tab ? '' : ' hidden') + '>' +
        '<div class="running-header print-only">' + U.esc(m.runningHeader) + '</div>' +
        '<h2 class="section-title">' + (t.square ? '■ ' : '') + U.esc(t.label) + (t.star ? ' ★' : '') + '</h2>' +
        t.build() + '</section>';
    }).join('');

    root.innerHTML =
      '<div class="running-header print-only">' + U.esc(m.runningHeader) + '</div>' +
      '<header class="page-header">' +
        '<span class="header-badge">' + U.esc(m.badge) + '</span>' +
        '<h1>' + U.esc(m.title) + '</h1>' +
        '<p class="sub">' + U.esc(m.subtitle) + '</p>' +
      '</header>' +
      '<div class="note-box"><b>' + U.esc(m.structuralNote.label) + '</b> ' + U.esc(m.structuralNote.body) + '</div>' +
      '<div class="thesis-row">' +
        '<div class="thesis-card"><span class="lead">' + U.esc(m.thesis.headline) + '</span><p>' + U.esc(m.thesis.body) + '</p></div>' +
        '<div class="thesis-card warn"><span class="lead">' + U.esc(m.weakness.headline) + '</span><p>' + U.esc(m.weakness.body) + '</p></div>' +
      '</div>' +
      legendGrid() +
      '<div class="tabs" role="tablist">' + tabsHtml + '</div>' +
      globalFilterBar() +
      panelsHtml +
      footerSections() +
      '<div class="running-footer">' + U.esc(m.runningFooter) + '</div>';

    U.bindAccordions(root);
    renderDetail(null);
    bindEvents(root);
    applyClusterView();
  }

  function bindEvents(root) {
    root.addEventListener('click', function (ev) {
      var t = ev.target;

      var tab = t.closest ? t.closest('.tab') : null;
      if (tab) {
        state.tab = tab.getAttribute('data-tab');
        root.querySelectorAll('.tab').forEach(function (b) {
          b.setAttribute('aria-selected', String(b === tab));
        });
        root.querySelectorAll('.panel').forEach(function (p) {
          p.hidden = p.id !== 'panel-' + state.tab;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      var vt = t.closest ? t.closest('[data-view]') : null;
      if (vt) {
        state.view = vt.getAttribute('data-view');
        root.querySelectorAll('[data-view]').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === vt));
        });
        document.getElementById('view-chain').hidden = state.view !== 'chain';
        document.getElementById('view-geo').hidden = state.view !== 'geo';
        applyFilters();
        return;
      }

      if (t.id === 'corridor-toggle') {
        state.corridor = !state.corridor;
        t.setAttribute('aria-pressed', String(state.corridor));
        var path = document.getElementById('corridor-path');
        if (path) path.classList.toggle('on', state.corridor);
        return;
      }

      var gf = t.closest ? t.closest('.gf') : null;
      if (gf) {
        var key = gf.getAttribute('data-key'), val = gf.getAttribute('data-val');
        var arr = state.filters[key];
        var idx = arr.indexOf(val);
        if (idx === -1) arr.push(val); else arr.splice(idx, 1);
        gf.setAttribute('aria-pressed', String(idx === -1));
        applyFilters();
        return;
      }

      if (t.id === 'clear-filters') {
        state.filters = { cluster: [], type: [], openness: [], confidence: [] };
        state.q = '';
        var si = document.getElementById('global-search');
        if (si) si.value = '';
        root.querySelectorAll('.gf').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        applyFilters();
        return;
      }

      var ac = t.closest ? t.closest('.anchor-code') : null;
      if (ac) {
        state.anchorCode = ac.getAttribute('data-code');
        root.querySelectorAll('.anchor-code').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === ac));
        });
        root.querySelectorAll('#panel-anchors .card').forEach(function (c) {
          c.hidden = state.anchorCode !== 'All' && c.getAttribute('data-code') !== state.anchorCode;
        });
        return;
      }

      var cv = t.closest ? t.closest('.cluster-view') : null;
      if (cv) {
        state.clusterView = cv.getAttribute('data-cview');
        root.querySelectorAll('.cluster-view').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === cv));
        });
        applyClusterView();
        return;
      }

      var ref = t.closest ? t.closest('[data-ref]') : null;
      if (ref) {
        ev.preventDefault();
        var id = ref.getAttribute('data-ref');
        if (byId(id)) select(id);
        return;
      }

      var th = t.closest ? t.closest('th.sortable') : null;
      if (th) sortTable(th);
    });

    root.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      var n = ev.target.closest ? ev.target.closest('.chain-node[data-ref]') : null;
      if (n) { ev.preventDefault(); select(n.getAttribute('data-ref')); }
    });

    var search = document.getElementById('global-search');
    if (search) {
      search.addEventListener('input', function () {
        state.q = search.value.trim().toLowerCase();
        applyFilters();
      });
    }
  }

  function applyClusterView() {
    var v = state.clusterView;
    document.querySelectorAll('#panel-clusters .cview').forEach(function (el) {
      var show = v === 'all' ||
        el.classList.contains('cview-all') ||
        el.classList.contains('cview-' + v);
      el.hidden = !show;
    });
  }

  function sortTable(th) {
    var idx = parseInt(th.getAttribute('data-sort'), 10);
    var table = th.closest('table');
    var tbody = table.querySelector('tbody');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    var asc = th.getAttribute('data-dir') !== 'asc';
    rows.sort(function (a, b) {
      var av = (a.cells[idx] ? a.cells[idx].textContent : '').trim().toLowerCase();
      var bv = (b.cells[idx] ? b.cells[idx].textContent : '').trim().toLowerCase();
      return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    th.setAttribute('data-dir', asc ? 'asc' : 'desc');
    rows.forEach(function (r) { tbody.appendChild(r); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
