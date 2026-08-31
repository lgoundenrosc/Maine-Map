/**
 * Document metadata, design tokens for text, and the shared record schema.
 *
 * @typedef {'verified'|'unverified'|'stale'|'gap'} Confidence
 * @typedef {'HIGH'|'MED'|'LOW'} Openness
 * @typedef {'HOT'|'OPEN'|'WATCH'} Heat
 *
 * @typedef {Object} GeoPoint
 * @property {string} town
 * @property {number} lat
 * @property {number} lng
 * @property {'approximate'|'exact'} precision
 *
 * @typedef {Object} Record
 * @property {string} id
 * @property {string} name
 * @property {GeoPoint} [location]
 * @property {string} category
 * @property {Confidence} confidence
 * @property {string} asOf              ISO year and month, YYYY-MM
 * @property {string[]} sourceIds       keys into sources.js
 * @property {string} [note]            optional caveat rendered as a tooltip
 */

window.RoscData = window.RoscData || {};

window.RoscData.meta = {
  // The document name is fixed by the client and carries an em dash as a
  // proper name. All prose in this build avoids em dashes and semicolons.
  title: 'Maine Defense Innovation Ecosystem — VC Landscape Map',
  shortTitle: 'Maine Defense Innovation Ecosystem',
  subtitle:
    'August 2026 · For internal Rosc use · 19 of 20 named contacts confirmed to a dated source; see the ' +
    'verification gaps table (Section 5.12) for what remains open, and confirm any seat before outreach. ' +
    'Maine builds and tests for other people’s programs and holds no acquisition authority of its own.',
  badge: 'ROSC INTERNAL',
  date: 'August 2026',
  asOf: '2026-08',
  version: '1.0.0',
  series: 'Third in the Rosc VC Landscape Map series, after US SOCOM (June 2026) and US Space Force (May 2026)',
  runningHeader:
    'Maine Defense Innovation Ecosystem — VC Landscape Map · Rosc Capital · August 2026 · INTERNAL',
  runningFooter:
    'For internal Rosc Capital use only, see Section 5.12 for open verification gaps, confirm any seat before outreach',
  structuralNote: {
    label: 'Structural note:',
    body:
      'Maine has no acquisition authority. Not one dollar of the roughly $4.6 billion in annual DoD ' +
      'spending in Maine is decided in Maine. The state builds, tests, and sustains for programs owned ' +
      'elsewhere. This map is therefore the supply-side inverse of the SOCOM and USSF maps, and its ' +
      'spine is a formation chain rather than an acquisition chain.'
  },
  thesis: {
    headline:
      'Maine is roughly 4.7 percent defense by share of GDP, among the highest in the country, and has ' +
      'close to zero venture-backed defense companies.',
    body:
      'The state manufactures for other people’s programs. That gap between industrial depth and ' +
      'venture formation is the investment thesis, and every section of this map ladders to it.'
  },
  weakness: {
    headline: 'Maine ranks 46th of 50 states in R&D spending at 0.8 percent of GDP against a 2.8 percent national average.',
    body:
      'That is stated up front rather than buried. A map that only sells will not be trusted internally. ' +
      'The thin R&D base is the reason non-dilutive federal capital and out-of-state customer development ' +
      'carry more weight in a Maine thesis than they would elsewhere.'
  },
  mapDisclaimer:
    'All coordinates in this document are approximate and the state outline is stylized rather than survey accurate. Use for orientation only.',
  corridor: {
    label: 'The defense corridor',
    body:
      'Maine’s defense industry sits on a roughly 60-mile arc from Bath through Portland to Kittery. ' +
      'Brunswick Landing sits about 11 miles from Bath Iron Works, Portland roughly 35 miles from Bath ' +
      'and roughly 50 miles from Kittery. Treat these distances as approximate road miles.'
  },
  /* The corridor as coordinates, so the chain diagram and the ecosystem map
     draw the same line from the same source. Bath, Portland, Kittery. */
  corridorPath: [[43.9109, -69.8133], [43.6591, -70.2568], [43.0793, -70.7420]],

  /* Every municipality the ecosystem map's communities() function can
     produce along that arc, canonical names as resolved by data/places.js.
     Drives the corridor inset: the main map draws this whole stretch into
     a stretch of a few hundred pixels, so the inset re-renders just these
     towns on their own, deeper zoom. Brunswick is included even though the
     corridor is named for Bath, since it sits three miles off Bath and
     carries more records than anywhere else on the arc. */
  corridorTowns: [
    'Kittery', 'North Berwick', 'Wells', 'Saco', 'South Portland',
    'Westbrook', 'Portland', 'Waterboro', 'Brunswick', 'Bath'
  ],

  /* The ecosystem map is a second document over the same records. It carries
     no internal marking and no personnel layer, it maps organizations and the
     places they sit in. */
  ecosystem: {
    title: 'Maine Defense Innovation Ecosystem Map',
    shortTitle: 'Ecosystem Map',
    description:
      'Organizations in Maine\u2019s defense innovation ecosystem, plotted by the town they sit in. ' +
      'Companion to the Maine Defense Innovation Ecosystem VC Landscape Map.',
    scopeNote:
      'This map shows organizations and places. Named individuals, routing contacts and the ' +
      'engagement playbook stay in the VC landscape map, which is the document built to carry them.'
  },

  siblingMaps: [
    { id: 'socom', label: 'Rosc US SOCOM Map (June 2026)', url: 'https://scremling.github.io/Rosc-US-SOCOM-Map/' },
    { id: 'ussf', label: 'Rosc US Space Force Map (May 2026)', url: 'https://scremling.github.io/Rosc-US-Space-Force/' }
  ],
  /** Data integrity legend rendered in the UI. */
  legend: [
    { tag: 'verified', meaning: 'Sourced to a named publication or primary document, dated', treatment: 'Normal, no badge' },
    { tag: 'unverified', meaning: 'Believed accurate, no source confirmed', treatment: 'Amber badge, tooltip reads unconfirmed' },
    { tag: 'stale', meaning: 'Sourced but the source is old enough that it may have changed', treatment: 'Gray italic badge with the source year' },
    { tag: 'gap', meaning: 'Known missing, listed in the verification gaps table', treatment: 'Gray empty state reading not yet confirmed' }
  ]
};
