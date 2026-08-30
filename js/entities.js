/* Flattens the six record sets into one array the ecosystem map can plot,
   count and filter. Runs at load time rather than at build time so that
   editing anything in data/ is immediately reflected here. Contains no prose,
   every string a reader sees still comes from data/. */
(function (global) {
  'use strict';

  var D = global.RoscData;

  /* The only contact strings permitted anywhere in this repository. Values in
     `entryPoints` are matched against this list before any of them becomes a
     link. A domain added to data/ without being added here renders as a gap,
     which is the intended failure direction. */
  var DOMAIN_ALLOWLIST = [
    'mainetechnology.org', 'brunswicklanding.us', 'umaine.edu',
    'roux.northeastern.edu', 'maineapex.com', 'centralmaine.org',
    'maineventurefund.com', 'bigelow.org', 'diu.mil', 'buildsubmarines.com',
    'statsamerica.org',
    /* Education and workforce pipeline, added on request. Each domain was
       checked against the official site it names before being added here. */
    'smccme.edu', 'yccc.edu', 'mainemaritime.edu', 'bowdoin.edu',
    'usm.maine.edu', 'uma.edu',
    'bates.edu', 'colby.edu', 'cmcc.edu', 'emcc.edu', 'kvcc.me.edu',
    'nmcc.edu', 'wccc.me.edu', 'educatemaine.org', 'liveandworkinmaine.com',
    'apprenticeship.maine.gov',
    /* Website links, added on request. Each domain was checked against the
       organization's own site before being added here. */
    'gdbiw.com', 'prattwhitney.com', 'gd-ots.com', 'howeandhowe.com',
    'teledyne-e2v.com', 'idexx.com', 'onsemi.com', 'oceanrenewablepower.com',
    'highbyte.com', 'defendify.com', 'tilsontech.com', 'elmettechnologies.com',
    'maineangels.org', 'ceimaine.org', 'mainespacecorp.org',
    'mainedefenseindustryalliance.com', 'mainemep.org', 'maineco.org',
    'dirigolabs.org', 'mainemfg.com', 'loring.org', 'mced.biz', 'emdc.org',
    'nmdc.org', 'msgc.org', 'gmri.org', 'islandinstitute.org', 'mdibl.org',
    'dmc.umaine.edu', 'sbir.gov'
  ];

  var DOMAIN_RE = /^[a-z0-9][a-z0-9.-]*\.(org|com|mil|edu|us|gov|net|biz)(\/[\w\-/]*)?$/i;

  function website(record) {
    var eps = record.entryPoints || [];
    for (var i = 0; i < eps.length; i++) {
      var v = String(eps[i].value || '').trim();
      if (!DOMAIN_RE.test(v)) continue;
      var host = v.split('/')[0].toLowerCase();
      if (DOMAIN_ALLOWLIST.indexOf(host) === -1) continue;
      return { host: host, value: v, confidence: eps[i].confidence || 'unverified' };
    }
    return null;
  }

  /* Each set names its summary field differently. Nothing is rewritten, the
     existing string is carried across as it stands. */
  var BLURB = {
    anchor: 'summary',
    institution: 'what',
    company: 'note',
    'test-asset': 'detail',
    capital: 'summary'
  };

  function resolvePlace(record) {
    var loc = record.location;
    if (!loc || typeof loc.lat !== 'number') {
      return { town: null, placement: 'unplaced', sub: null, lat: null, lng: null };
    }
    var rule = D.places.canonical[loc.town] || {};
    var town = rule.town || loc.town;
    var placement = rule.placement || 'municipality';
    var center = D.places.centers[town];
    return {
      town: town,
      sub: rule.sub || null,
      placement: placement,
      /* Municipalities snap to a single center so that five records in
         Brunswick make one bubble rather than three overlapping ones. */
      lat: placement === 'municipality' && center ? center.lat : loc.lat,
      lng: placement === 'municipality' && center ? center.lng : loc.lng,
      precision: loc.precision || 'approximate',
      sourceTown: loc.town
    };
  }

  function build() {
    var sets = [
      ['anchor', (D.anchorNodes && D.anchorNodes.nodes) || []],
      ['institution', (D.institutions && D.institutions.items) || []],
      ['company', (D.companies && D.companies.items) || []],
      ['test-asset', (D.testAssets && D.testAssets.assets) || []],
      ['capital', (D.capitalStack && D.capitalStack.instruments) || []]
    ];

    var out = [];
    sets.forEach(function (pair) {
      var type = pair[0];
      pair[1].forEach(function (r) {
        out.push({
          id: r.id,
          name: r.name,
          shortName: r.short || r.shortName || r.name,
          type: type,
          category: r.category || type,
          /* A record can belong to several capability clusters, and the source
             stores that as an array. Nine of them do. */
          clusters: Array.isArray(r.cluster) ? r.cluster : (r.cluster ? [r.cluster] : []),
          confidence: r.confidence || 'unverified',
          asOf: r.asOf || null,
          sourceIds: r.sourceIds || [],
          blurb: r[BLURB[type]] || '',
          website: website(r),
          openness: r.openness || null,
          ventureBacked: typeof r.ventureBacked === 'boolean' ? r.ventureBacked : null,
          /* Three independent facets, not a value of type or cluster. A
             record is a startup, an established company or a major defense
             company, set explicitly in data/companies.js and
             data/anchorNodes.js rather than guessed from name, size or age. */
          startup: r.startup === true,
          establishedCompany: r.establishedCompany === true,
          majorDefenseCompany: r.majorDefenseCompany === true,
          entryGap: r.entryGap || null,
          place: resolvePlace(r)
        });
      });
    });
    return out;
  }

  /* Municipality rollup. Only placements that name a real town are counted,
     so the community list cannot be inflated by the statewide placeholders. */
  function communities(entities) {
    var by = {};
    entities.forEach(function (e) {
      var p = e.place;
      if (p.placement !== 'municipality' && p.placement !== 'out-of-state') return;
      if (!by[p.town]) {
        by[p.town] = { town: p.town, lat: p.lat, lng: p.lng, placement: p.placement, items: [] };
      }
      by[p.town].items.push(e);
    });
    return Object.keys(by).map(function (k) { return by[k]; })
      .sort(function (a, b) {
        return b.items.length - a.items.length || a.town.localeCompare(b.town);
      });
  }

  function unplaced(entities) {
    return entities.filter(function (e) {
      return ['statewide', 'region', 'unplaced'].indexOf(e.place.placement) !== -1;
    });
  }

  global.RoscEntities = { build: build, communities: communities, unplaced: unplaced };
})(window);
