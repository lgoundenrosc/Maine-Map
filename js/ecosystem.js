/* Application shell for the ecosystem map. Four surfaces reachable from the
   dock: home, map, index, help. All prose comes from data/. */
(function (global) {
  'use strict';

  var D = global.RoscData, U = global.RoscUI, B = global.RoscBasemap, E = global.RoscEntities;

  var esc = U.esc, attr = U.attr;

  /* ---------------------------------------------------------- icons ----- */
  var I = {
    compass: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none"/></svg>',
    filter: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>',
    layers: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    building: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h6"/></svg>',
    table: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>',
    home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
    map: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
    help: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 .5c0 1.5-2.5 2-2.5 3.5" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    globe: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    ext: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/></svg>',
    chev: '<svg class="e-chev" width="12" height="12" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M1 1l5 5 5-5"/></svg>'
  };

  /* ---------------------------------------------------------- state ----- */
  var ALL = E.build();

  /* Facets, not a second sector. Sector narrows by cluster and stays a
     single choice, because a record sits in one place on the formation
     chain. Startup, established company and major defense company describe
     the same record from an orthogonal angle, so any combination switches on
     together, sector still applies, and toggling more than one reads as
     either rather than narrowing to records that are somehow both at once.
     Every company carries exactly one of the three in the source, so the
     three together cover the full company list rather than leaving the
     mid-size, non-major companies with no facet at all. */
  var FACETS = [
    { key: 'startup', label: 'Startups' },
    { key: 'establishedCompany', label: 'Established companies' },
    { key: 'majorDefenseCompany', label: 'Major defense companies' }
  ];

  var state = {
    view: 'map',
    sector: 'all',
    facets: { startup: false, establishedCompany: false, majorDefenseCompany: false },
    mode: 'count',
    community: null,
    entity: null,
    query: '',
    sort: { key: 'name', dir: 1 }
  };

  function clusterById(id) {
    return (D.clusters.items || []).filter(function (c) { return c.id === id; })[0] || null;
  }

  function activeFacetKeys() {
    return FACETS.map(function (f) { return f.key; }).filter(function (k) { return state.facets[k]; });
  }

  function filtered() {
    var out = state.sector === 'all' ? ALL
      : ALL.filter(function (e) { return e.clusters.indexOf(state.sector) !== -1; });
    var active = activeFacetKeys();
    if (!active.length) return out;
    return out.filter(function (e) { return active.some(function (k) { return e[k]; }); });
  }

  /* Initials for the avatar tile. Two letters where the name gives two words. */
  function initials(name) {
    var w = String(name).replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/);
    return (w[0] ? w[0][0] : '?').toUpperCase() + (w[1] && w[1][0] ? w[1][0].toUpperCase() : '');
  }

  function typeFill(t) {
    var c = B.colors.type[t];
    return c ? c.fill : '#7c4fc7';
  }

  function confBadge(e) {
    if (e.confidence === 'verified') return '';
    if (e.confidence === 'unverified') return '<span class="e-badge e-badge-unverified">unconfirmed</span>';
    if (e.confidence === 'stale') {
      return '<span class="e-badge e-badge-stale">as of ' + esc(e.asOf || '') + '</span>';
    }
    return '<span class="e-badge e-badge-gap">not yet confirmed</span>';
  }

  function typeLabel(t) {
    var c = B.colors.type[t];
    return c ? c.label : t;
  }

  function roleChip(e) {
    if (!e.ecoRole) return '';
    var c = B.colors.role[e.ecoRole];
    if (!c) return '';
    return '<span class="e-chip" style="background:' + c.fill + '22;color:' + c.fill +
      ';border-color:' + c.fill + '55">' + esc(c.label) + '</span>';
  }

  /* ----------------------------------------------------------- rail ----- */

  function railHtml() {
    var f = filtered();
    var comms = E.communities(f);
    var sectorOpts = ['<option value="all">All sectors (' + ALL.length + ')</option>']
      .concat((D.clusters.items || []).map(function (c) {
        var n = ALL.filter(function (e) { return e.clusters.indexOf(c.id) !== -1; }).length;
        return '<option value="' + attr(c.id) + '"' + (state.sector === c.id ? ' selected' : '') +
          '>' + esc(c.short || c.name) + ' (' + n + ')</option>';
      })).join('');

    var cl = state.sector === 'all' ? null : clusterById(state.sector);
    var finding = '';
    if (cl) {
      finding = '<div class="e-card"><div class="e-card-body" style="padding-top:14px">' +
        '<span class="e-label">' + esc(cl.heat || '') + ' cluster</span>' +
        '<p style="margin:7px 0 0;font-size:12.5px;color:var(--e-text-2);line-height:1.5">' +
          esc(cl.whiteSpace || cl.summary || '') + '</p>' +
        '<p style="margin:9px 0 0;font-size:11.5px;color:var(--e-text-4);font-family:var(--e-mono)">' +
          f.length + ' of ' + ALL.length + ' records, ' + comms.length +
          (comms.length === 1 ? ' community' : ' communities') + '</p>' +
      '</div></div>';
    }

    var legendRows = state.mode === 'count'
      ? B.colors.count.map(function (r) {
          return '<div class="e-legend-row" style="color:' + r.fill + '">' +
            '<i style="background:' + r.fill + '99"></i>' +
            '<span style="margin-left:0;color:var(--e-text-2)">' + esc(r.label) + '</span></div>';
        }).join('')
      : Object.keys(B.colors.role).map(function (k) {
          var c = B.colors.role[k];
          var n = f.filter(function (e) { return e.ecoRole === k; }).length;
          return '<div class="e-legend-row" style="color:' + c.fill + '">' +
            '<i style="background:' + c.fill + '99"></i>' +
            '<span style="margin-left:0;color:var(--e-text-2)">' + esc(c.label) + '</span>' +
            '<span>' + n + '</span></div>';
        }).join('');

    var unpl = E.unplaced(f);

    return '' +
    '<div class="e-card">' +
      '<div class="e-card-body" style="padding-top:14px">' +
        '<span class="e-label" style="display:flex;align-items:center;gap:7px">' + I.filter + 'Sector</span>' +
        '<select class="e-select" id="e-sector" aria-label="Filter by sector" style="margin-top:8px">' + sectorOpts + '</select>' +
        '<div class="e-mode" role="group" aria-label="Color bubbles by">' +
          '<button type="button" data-mode="count" aria-pressed="' + (state.mode === 'count') + '">by count</button>' +
          '<button type="button" data-mode="role" aria-pressed="' + (state.mode === 'role') + '">by role</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="e-card">' +
      '<div class="e-card-body" style="padding-top:14px">' +
        '<span class="e-label" style="display:flex;align-items:center;gap:7px">' + I.filter + 'Also show only</span>' +
        '<div class="e-facets" role="group" aria-label="Additional filters, combine freely with sector and with each other">' +
          FACETS.map(function (fct) {
            var n = ALL.filter(function (e) { return e[fct.key]; }).length;
            return '<button type="button" data-facet="' + attr(fct.key) + '" aria-pressed="' + state.facets[fct.key] + '">' +
              esc(fct.label) + ' <span class="e-count">' + n + '</span></button>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>' +
    finding +
    '<div class="e-card">' +
      '<button class="e-card-head" type="button" data-acc="legend" aria-expanded="true" aria-controls="e-legend">' +
        I.layers + '<span class="e-grow">Legend</span>' + I.chev +
      '</button>' +
      '<div class="e-card-body" id="e-legend">' + legendRows +
        '<div class="e-legend-row" style="color:var(--e-rust-2)">' +
          '<i style="border:0;height:0;border-top:2.5px dashed var(--e-rust-2);border-radius:0"></i>' +
          '<span style="margin-left:0;color:var(--e-text-2)">' + esc(D.meta.corridor.label) + '</span></div>' +
        '<p class="e-legend-note">' + esc(D.places.unplacedNote) + '</p>' +
        (unpl.length ? '<p class="e-legend-note" style="color:var(--e-text-3)"><b>' + unpl.length +
          '</b> not plotted. Listed under Index.</p>' : '') +
      '</div>' +
    '</div>' +
    '<div class="e-card">' +
      '<button class="e-card-head" type="button" data-acc="comm" aria-expanded="true" aria-controls="e-comm">' +
        I.building + '<span class="e-grow">Communities</span>' + I.chev +
      '</button>' +
      '<div class="e-card-body" id="e-comm" style="padding-left:8px;padding-right:8px">' +
        '<div class="e-comm">' + (comms.length ? comms.map(function (c) {
          var fill = state.mode === 'role' ? B.roleColor(c.items) : B.countColor(c.items.length);
          return '<button type="button" data-town="' + attr(c.town) + '">' +
            '<i style="background:' + fill + '"></i>' +
            '<span class="e-grow">' + esc(c.town) + '</span>' +
            '<span class="e-count">' + c.items.length + '</span></button>';
        }).join('') : '<p class="e-empty" style="padding:6px 8px">No community carries a record in this sector.</p>') +
        '</div>' +
      '</div>' +
    '</div>' +
    '<button class="e-btn" type="button" id="e-index-btn">' + I.table + 'View index</button>';
  }

  /* ---------------------------------------------------------- sheet ----- */

  function tileHtml(e) {
    var fill = typeFill(e.type);
    return '<button class="e-tile" type="button" data-id="' + attr(e.id) + '">' +
      '<div class="e-tile-top">' +
        '<span class="e-avatar" style="background:linear-gradient(150deg,' + fill + ',' + fill + 'aa)">' +
          esc(initials(e.name)) + '</span>' +
        (e.website ? '<span style="color:var(--e-text-3)" title="Contact route recorded">' + I.globe + '</span>' : '') +
      '</div>' +
      '<h3>' + esc(e.name) + '</h3>' +
      (e.blurb ? '<p>' + esc(e.blurb) + '</p>' : '<p class="e-empty">No summary recorded.</p>') +
      '<div class="e-tile-foot">' +
        '<span class="e-chip e-chip-type">' + esc(typeLabel(e.type)) + '</span>' +
        confBadge(e) +
        (e.place.sub ? '<span class="e-chip">' + esc(e.place.sub) + '</span>' : '') +
      '</div>' +
    '</button>';
  }

  function sheetHtml(c) {
    if (!c) return '';
    var label = D.places.placementLabels[c.placement] || '';
    var n = c.items.length;
    return '<div class="e-sheet-head">' +
        '<span class="e-eyebrow">' + I.pin + esc(label) +
          '<button class="e-close-inline" type="button" id="e-sheet-close">' + I.close + 'Close</button>' +
        '</span>' +
        '<h2>' + esc(c.town) + '</h2>' +
        '<p>' + n + (n === 1 ? ' organization' : ' organizations') + ' in the defense innovation ecosystem' +
          (state.sector === 'all' ? '' : ', in this sector') + '</p>' +
      '</div>' +
      '<div class="e-grid' + (n <= 4 ? ' e-grid-single' : '') + '">' + c.items.map(tileHtml).join('') + '</div>';
  }

  /* --------------------------------------------------------- drawer ----- */

  function drawerHtml(e) {
    if (!e) return '';
    var fill = typeFill(e.type);
    var cls = e.clusters.map(clusterById).filter(Boolean);
    var srcs = (e.sourceIds || []).map(function (id) {
      var s = (D.sources || []).filter(function (x) { return x.id === id; })[0];
      if (!s) return id;
      return s.title + (s.publisher ? '. ' + s.publisher : '') + (s.date ? ', ' + s.date : '');
    });

    return '<button class="e-close" type="button" id="e-drawer-close" aria-label="Close">' + I.close + '</button>' +
      '<div class="e-drawer-in">' +
        '<div class="e-drawer-top">' +
          '<span class="e-avatar" style="background:linear-gradient(150deg,' + fill + ',' + fill + 'aa)">' +
            esc(initials(e.name)) + '</span>' +
          '<div><h2>' + esc(e.name) + '</h2>' +
            (e.place.town ? '<span class="e-eyebrow e-loc" style="margin-top:5px;font-size:12.5px">' + I.pin +
              esc(e.place.sourceTown || e.place.town) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="e-drawer-chips">' +
          '<span class="e-chip e-chip-type">' + esc(typeLabel(e.type)) + '</span>' +
          roleChip(e) +
          cls.map(function (c) { return '<span class="e-chip">' + esc(c.short || c.name) + '</span>'; }).join('') +
          (e.openness ? '<span class="e-chip">openness ' + esc(e.openness) + '</span>' : '') +
          confBadge(e) +
        '</div>' +
        (e.blurb ? '<div class="e-section"><span class="e-label">Overview</span><p>' + esc(e.blurb) + '</p></div>'
                 : '<div class="e-section"><span class="e-label">Overview</span><p class="e-empty">No summary recorded in the source.</p></div>') +
        '<div class="e-kv">' +
          '<div><span class="e-label">Confidence</span><span class="e-kv-val">' + esc(e.confidence) + '</span></div>' +
          '<div><span class="e-label">As of</span><span class="e-kv-val">' + esc(e.asOf || 'not recorded') + '</span></div>' +
        '</div>' +
        (e.website
          ? '<div class="e-kv"><a class="e-kv-link" style="grid-column:1/-1" href="https://' + attr(e.website.value) +
            '" target="_blank" rel="noopener noreferrer"><span class="e-label">Website</span>' +
            '<span class="e-kv-val">' + esc(e.website.host) + I.ext + '</span></a></div>' : '') +
        (srcs.length ? '<div class="e-section"><span class="e-label">Sources</span><p>' +
          srcs.map(esc).join('<br>') + '</p></div>' : '') +
        (e.entryGap ? '<div class="e-section"><span class="e-label">Verification gap</span><p>' + esc(e.entryGap) + '</p></div>' : '') +
        (e.website
          ? '<a class="e-cta" href="https://' + attr(e.website.value) + '" target="_blank" rel="noopener noreferrer">' +
            I.ext + 'Visit ' + esc(e.website.host) + '</a>'
          : '<span class="e-cta-gap">No contact route confirmed. Listed in the verification gaps.</span>') +
      '</div>';
  }

  /* ---------------------------------------------------------- views ----- */

  function homeHtml() {
    var m = D.meta, comms = E.communities(ALL), unpl = E.unplaced(ALL);
    var verified = ALL.filter(function (e) { return e.confidence === 'verified'; }).length;
    return '<div class="e-view-in">' +
      '<h2>' + esc(m.ecosystem.title) + '</h2>' +
      '<p class="e-lede">' + esc(m.ecosystem.description) + '</p>' +
      '<div class="e-stats">' +
        '<div class="e-stat"><b>' + ALL.length + '</b><span>organizations</span></div>' +
        '<div class="e-stat"><b>' + comms.length + '</b><span>communities</span></div>' +
        '<div class="e-stat"><b>' + verified + '</b><span>verified records</span></div>' +
        '<div class="e-stat"><b>' + unpl.length + '</b><span>not plotted</span></div>' +
      '</div>' +
      '<div class="e-note"><b>' + esc(m.structuralNote.label) + '</b><p>' + esc(m.structuralNote.body) + '</p></div>' +
      '<h3>Thesis</h3>' +
      '<p style="font-size:16px">' + esc(m.thesis.headline) + '</p>' +
      '<p style="color:var(--e-text-2)">' + esc(m.thesis.body) + '</p>' +
      '<h3>The weakness, stated up front</h3>' +
      '<p style="font-size:16px">' + esc(m.weakness.headline) + '</p>' +
      '<p style="color:var(--e-text-2)">' + esc(m.weakness.body) + '</p>' +
      '<h3>' + esc(m.corridor.label) + '</h3>' +
      '<p style="color:var(--e-text-2)">' + esc(m.corridor.body) + '</p>' +
      '<div class="e-note" style="margin-top:26px"><b>Scope</b><p>' + esc(m.ecosystem.scopeNote) + '</p></div>' +
    '</div>';
  }

  var COLS = [
    { key: 'name', label: 'Organization' },
    { key: 'type', label: 'Type' },
    { key: 'cluster', label: 'Sector' },
    { key: 'town', label: 'Place' },
    { key: 'confidence', label: 'Confidence' },
    { key: 'asOf', label: 'As of' }
  ];

  function cellOf(e, key) {
    if (key === 'town') return e.place.town || '';
    if (key === 'cluster') {
      return e.clusters.map(clusterById).filter(Boolean)
        .map(function (c) { return c.short || c.name; }).join(', ');
    }
    if (key === 'type') return typeLabel(e.type);
    return e[key] || '';
  }

  function indexHtml() {
    var rows = filtered().filter(function (e) {
      if (!state.query) return true;
      var q = state.query.toLowerCase();
      return (e.name + ' ' + e.blurb + ' ' + (e.place.town || '')).toLowerCase().indexOf(q) !== -1;
    });
    rows = rows.slice().sort(function (a, b) {
      var k = state.sort.key;
      return String(cellOf(a, k)).localeCompare(String(cellOf(b, k))) * state.sort.dir;
    });

    return '<div class="e-view-in">' +
      '<h2>Index</h2>' +
      '<p class="e-lede">Every record behind the map, including the ' + E.unplaced(ALL).length +
        ' that carry no plottable location.</p>' +
      '<input class="e-search" id="e-search" type="search" placeholder="Search organizations and places" value="' +
        attr(state.query) + '" aria-label="Search the index">' +
      '<div style="overflow-x:auto"><table class="e-table"><thead><tr>' +
        COLS.map(function (c) {
          var on = state.sort.key === c.key;
          return '<th><button type="button" data-sort="' + attr(c.key) + '">' + esc(c.label) +
            (on ? (state.sort.dir === 1 ? ' ↑' : ' ↓') : '') + '</button></th>';
        }).join('') +
      '</tr></thead><tbody>' +
        (rows.length ? rows.map(function (e) {
          return '<tr data-id="' + attr(e.id) + '" tabindex="0">' +
            '<td class="e-td-name">' + esc(e.name) + '</td>' +
            '<td>' + esc(typeLabel(e.type)) + '</td>' +
            '<td>' + esc(cellOf(e, 'cluster')) + '</td>' +
            '<td>' + esc(cellOf(e, 'town') || '') +
              (e.place.placement !== 'municipality'
                ? ' <span class="e-badge e-badge-gap">' + esc(D.places.placementLabels[e.place.placement] || '') + '</span>'
                : '') + '</td>' +
            '<td>' + (e.confidence === 'verified' ? esc(e.confidence) : confBadge(e)) + '</td>' +
            '<td>' + esc(e.asOf || '') + '</td>' +
          '</tr>';
        }).join('') : '<tr><td colspan="6" class="e-empty">Nothing matches that search.</td></tr>') +
      '</tbody></table></div>' +
    '</div>';
  }

  function helpHtml() {
    var m = D.meta;
    return '<div class="e-view-in">' +
      '<h2>How to read this map</h2>' +
      '<p class="e-lede">' + esc(m.mapDisclaimer) + '</p>' +
      '<h3>Data integrity</h3>' +
      '<div class="e-defs">' + (m.legend || []).map(function (l) {
        return '<div class="e-def"><b>' + esc(l.tag) + '</b><span>' + esc(l.meaning) + '. ' + esc(l.treatment) + '.</span></div>';
      }).join('') + '</div>' +
      '<h3>Places that are not plotted</h3>' +
      '<p style="color:var(--e-text-2)">' + esc(D.places.unplacedNote) + '</p>' +
      '<div class="e-unplaced">' + E.unplaced(ALL).map(function (e) {
        return '<button type="button" data-id="' + attr(e.id) + '"><b>' + esc(e.name) + '</b>' +
          '<span>' + esc(D.places.placementLabels[e.place.placement] || '') + '</span></button>';
      }).join('') + '</div>' +
      '<h3>Verification gaps</h3>' +
      '<div class="e-defs">' + ((D.gaps && D.gaps.groups) || []).map(function (g) {
        return '<div class="e-def"><b>' + esc(g.title) + '</b><span>' +
          (g.items || []).map(function (i) { return esc(i.item); }).join('<br>') + '</span></div>';
      }).join('') + '</div>' +
      '<h3>Glossary</h3>' +
      '<div class="e-defs">' + (D.glossary.items || []).map(function (g) {
        return '<div class="e-def"><b>' + esc(g.term) +
          (g.name && g.name !== g.term ? ', ' + esc(g.name) : '') + '</b>' +
          '<span>' + esc(g.body || '') + '</span></div>';
      }).join('') + '</div>' +
      '<h3>Sources and attribution</h3>' +
      '<p style="color:var(--e-text-2)">' + esc(D.places.attribution) + '</p>' +
      '<p style="color:var(--e-text-3);font-size:13px">Companion document. ' + esc(m.series) + '.</p>' +
    '</div>';
  }

  /* ------------------------------------------------------ rendering ----- */

  var el = {}, framed = false;

  function paint() {
    el.rail.innerHTML = railHtml();
    el.brand.hidden = state.view !== 'map';

    ['home', 'index', 'help'].forEach(function (v) {
      el[v].hidden = state.view !== v;
    });
    if (state.view === 'home') el.home.innerHTML = homeHtml();
    if (state.view === 'index') el.index.innerHTML = indexHtml();
    if (state.view === 'help') el.help.innerHTML = helpHtml();

    el.sheet.hidden = !(state.view === 'map' && state.community);
    if (state.community) el.sheet.innerHTML = sheetHtml(state.community);

    el.drawer.hidden = !state.entity;
    if (state.entity) el.drawer.innerHTML = drawerHtml(state.entity);
    el.app.classList.toggle('has-drawer', !!state.entity);

    /* The rail would sit on top of the card grid, so it stands down while a
       municipality is open. The dock stays, it is the way back. Same reason
       the corridor inset stands down: the sheet it would otherwise sit under
       already covers that corner of the screen. */
    el.rail.hidden = state.view !== 'map' || !!state.community;
    el.corridor.hidden = state.view !== 'map' || !!state.community;

    el.dock.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-current', String(b.dataset.view === state.view));
    });

    if (state.view === 'map') {
      var comms = E.communities(filtered());
      var pick = function (c) { state.community = c; state.entity = null; paint(); B.focus(c); };
      B.render(comms, state.mode, pick);
      B.invalidate();
      if (!framed) { B.frame(comms, false); framed = true; }

      if (!el.corridor.hidden) {
        var corridorComms = comms.filter(function (c) {
          return D.meta.corridorTowns.indexOf(c.town) !== -1;
        });
        if (corridorComms.length) {
          B.renderInset(corridorComms, state.mode, pick);
          B.invalidateInset();
          var n = corridorComms.reduce(function (a, c) { return a + c.items.length; }, 0);
          el.corridorCount.textContent = n + (n === 1 ? ' org' : ' orgs');
        } else {
          el.corridor.hidden = true;
        }
      }
    }

    var counts = D.meta.ecosystem;
    el.brand.querySelector('p').innerHTML = '<b>' + ALL.length + '</b> organizations · <b>' +
      E.communities(ALL).length + '</b> communities';
    void counts;
  }

  function byId(id) { return ALL.filter(function (e) { return e.id === id; })[0] || null; }

  function openEntity(id) {
    var e = byId(id);
    if (!e) return;
    state.entity = e;
    paint();
  }

  /* --------------------------------------------------------- wiring ----- */

  function boot() {
    var root = document.getElementById('app');
    root.innerHTML =
      '<div class="e-app">' +
        '<div id="e-map"></div>' +
        '<div class="e-corridor" id="e-corridor">' +
          '<div class="e-corridor-head">' + I.pin +
            '<span class="e-grow">Kittery-Bath corridor</span>' +
            '<span class="e-count" id="e-corridor-count"></span>' +
          '</div>' +
          '<div id="e-corridor-map"></div>' +
        '</div>' +
        '<div class="e-brand">' +
          '<span class="e-brand-mark">' + I.compass + '</span>' +
          '<div><h1>' + esc(D.meta.ecosystem.shortTitle) + '</h1><p></p></div>' +
        '</div>' +
        '<div class="e-rail" id="e-rail"></div>' +
        '<nav class="e-dock" id="e-dock" aria-label="Views">' +
          '<button type="button" data-view="home" title="Overview" aria-label="Overview">' + I.home + '</button>' +
          '<button type="button" data-view="map" title="Map" aria-label="Map">' + I.map + '</button>' +
          '<button type="button" data-view="index" title="Index" aria-label="Index">' + I.table + '</button>' +
          '<button type="button" data-view="help" title="How to read this map" aria-label="How to read this map">' + I.help + '</button>' +
        '</nav>' +
        '<div class="e-sheet" id="e-sheet" hidden></div>' +
        '<aside class="e-drawer" id="e-drawer" hidden aria-label="Organization detail"></aside>' +
        '<div class="e-view" id="e-home" hidden></div>' +
        '<div class="e-view" id="e-index" hidden></div>' +
        '<div class="e-view" id="e-help" hidden></div>' +
      '</div>';

    el = {
      app: document.querySelector('.e-app'),
      rail: document.getElementById('e-rail'),
      dock: document.getElementById('e-dock'),
      brand: document.querySelector('.e-brand'),
      sheet: document.getElementById('e-sheet'),
      drawer: document.getElementById('e-drawer'),
      home: document.getElementById('e-home'),
      index: document.getElementById('e-index'),
      help: document.getElementById('e-help'),
      corridor: document.getElementById('e-corridor'),
      corridorCount: document.getElementById('e-corridor-count')
    };

    B.init(document.getElementById('e-map'));

    B.initInset(document.getElementById('e-corridor-map'));
    B.frameInset(E.communities(ALL).filter(function (c) {
      return D.meta.corridorTowns.indexOf(c.town) !== -1;
    }));

    document.addEventListener('click', function (ev) {
      var t = ev.target;

      var dock = t.closest('#e-dock button');
      if (dock) {
        state.view = dock.dataset.view;
        if (state.view !== 'map') { state.community = null; state.entity = null; }
        paint();
        return;
      }

      var mode = t.closest('.e-mode button');
      if (mode) { state.mode = mode.dataset.mode; paint(); return; }

      var facet = t.closest('[data-facet]');
      if (facet) {
        var fk = facet.dataset.facet;
        state.facets[fk] = !state.facets[fk];
        state.community = null; state.entity = null;
        paint();
        return;
      }

      var acc = t.closest('[data-acc]');
      if (acc) {
        var open = acc.getAttribute('aria-expanded') === 'true';
        acc.setAttribute('aria-expanded', String(!open));
        document.getElementById(acc.getAttribute('aria-controls')).hidden = open;
        return;
      }

      var town = t.closest('[data-town]');
      if (town) {
        var c = E.communities(filtered()).filter(function (x) { return x.town === town.dataset.town; })[0];
        if (c) { state.community = c; state.entity = null; paint(); B.focus(c); }
        return;
      }

      if (t.closest('#e-index-btn')) { state.view = 'index'; state.community = null; paint(); return; }
      if (t.closest('#e-sheet-close')) { state.community = null; paint(); B.reset(); return; }
      if (t.closest('#e-drawer-close')) { state.entity = null; paint(); return; }

      var pick = t.closest('[data-id]');
      if (pick) { openEntity(pick.dataset.id); return; }

      var sort = t.closest('[data-sort]');
      if (sort) {
        var k = sort.dataset.sort;
        state.sort = { key: k, dir: state.sort.key === k ? -state.sort.dir : 1 };
        paint();
        return;
      }
    });

    document.addEventListener('change', function (ev) {
      if (ev.target.id === 'e-sector') {
        state.sector = ev.target.value;
        state.community = null; state.entity = null;
        paint();
      }
    });

    document.addEventListener('input', function (ev) {
      if (ev.target.id === 'e-search') {
        state.query = ev.target.value;
        var box = ev.target;
        paint();
        var again = document.getElementById('e-search');
        if (again) { again.focus(); again.setSelectionRange(box.value.length, box.value.length); }
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') return;
      if (state.entity) { state.entity = null; paint(); }
      else if (state.community) { state.community = null; paint(); B.reset(); }
    });

    paint();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
