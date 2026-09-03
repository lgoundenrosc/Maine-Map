/**
 * Section 5.1. Seven stages, rendered left to right.
 * The chain is complete through stage 5 and breaks at stages 6 and 7.
 */
window.RoscData = window.RoscData || {};

window.RoscData.formationChain = {
  intro:
    'The SOCOM and USSF maps render an acquisition chain, because those commands buy. Maine does not buy. ' +
    'This is a formation chain, and it reads left to right from research origin to mission partner. ' +
    'Maine is strong through stage 5 and breaks twice after it. Those two breaks are the whole argument ' +
    'for Rosc capital and for an OnRamp Hub in a single image.',

  stages: [
    {
      id: 'stage-1',
      n: 1,
      name: 'Research origin',
      what: 'Technology emerges from a lab or a shop floor',
      health: 'Strong',
      healthClass: 'ok',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-35', 'src-23', 'src-38'],
      nodes: [
        { name: 'UMaine ASCC', ref: 'inst-ascc' },
        { name: 'UMaine VEMI Lab', ref: null },
        { name: 'Bigelow Laboratory', ref: 'inst-bigelow' },
        { name: 'GMRI', ref: 'inst-gmri' },
        { name: 'Roux Institute', ref: 'inst-roux' },
        { name: 'Darling Marine Center', ref: 'inst-darling' },
        { name: 'Boatyard R&D', ref: null }
      ],
      detail:
        'Maine’s research origin is narrow but deep, and it is concentrated in marine science, composites ' +
        'and structures. It is not a broad research base. The state ranks 46th of 50 in R&D spending at ' +
        '0.8 percent of GDP against a 2.8 percent national average, so origin volume is the structural ' +
        'weakness even though origin quality in the two strong domains is high.'
    },
    {
      id: 'stage-2',
      n: 2,
      name: 'Incubation',
      what: 'Space, tooling, first customers',
      health: 'Adequate',
      healthClass: 'mid',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34', 'src-38'],
      nodes: [
        { name: 'TechPlace at Brunswick Landing', ref: 'inst-techplace' },
        { name: 'Roux Founder Residency', ref: 'inst-roux' },
        { name: 'Dirigo Labs', ref: 'inst-dirigo' },
        { name: 'Maine Center for Entrepreneurs Top Gun', ref: 'inst-mce' }
      ],
      detail:
        'Physical incubation is genuinely good. TechPlace supplies a shared machine shop, welding, ' +
        'composites layup and bioproduction at a scale most states reserve for university campuses. ' +
        'What is thin is defense-specific incubation. No program in this stage does technology scouting ' +
        'or transition support for a defense customer.'
    },
    {
      id: 'stage-3',
      n: 3,
      name: 'Non-dilutive capital',
      what: 'Grants and federal R&D dollars',
      health: 'Strong',
      healthClass: 'ok',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-19', 'src-39'],
      nodes: [
        { name: 'MTI TechStart, Seed, Development Loans, MTAF', ref: 'inst-mti', badge: 'START HERE' },
        { name: 'SBIR / STTR', ref: null },
        { name: 'Central Maine Growth Council FAST', ref: 'inst-cmgc' },
        { name: 'ONR and DoD direct', ref: null }
      ],
      detail:
        'The strongest link in the chain and the reason a Maine thesis works at all at the earliest stage. ' +
        'Note the mechanic that defines it. Nearly every MTI instrument carries a 1:1 match requirement, ' +
        'which makes private capital the trigger for state capital rather than the follow-on to it.'
    },
    {
      id: 'stage-4',
      n: 4,
      name: 'Test and qualification',
      what: 'Proving the thing works',
      health: 'Strong and underused',
      healthClass: 'ok',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-35', 'src-34', 'src-25'],
      nodes: [
        { name: 'UMaine ASCC (ISO 17025)', ref: 'test-ascc' },
        { name: 'Maine Space Corporation electronics test lab', ref: 'test-msc' },
        { name: 'Brunswick Executive Airport', ref: 'test-bxm' },
        { name: 'Gulf of Maine littorals', ref: 'test-gom' },
        { name: 'Loring runways', ref: 'test-loring' }
      ],
      detail:
        'Maine’s genuine differentiator and the section with no equivalent in the SOCOM or USSF maps. ' +
        'The state has accredited structures testing, space qualification testing, two long runway ' +
        'complexes, established UAS operating procedures and open test water, and it is underused by ' +
        'companies from outside Maine. Read the AFFF constraint on the test infrastructure tab before ' +
        'treating the Brunswick hangar complex as clean space.'
    },
    {
      id: 'stage-5',
      n: 5,
      name: 'Production',
      what: 'Making it at rate',
      health: 'Strong',
      healthClass: 'ok',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-11', 'src-42'],
      nodes: [
        { name: 'BIW supplier network', ref: 'anchor-biw' },
        { name: 'Midcoast boatyards', ref: null },
        { name: 'Compotech', ref: 'co-compotech' },
        { name: 'Kenway', ref: 'co-kenway' },
        { name: 'Cianbro', ref: 'co-cianbro' },
        { name: 'Roughly 300 defense contractors statewide', ref: null }
      ],
      detail:
        'Maine can build things. BIW alone spent $122 million with 246 Maine vendors in 2025. Precision ' +
        'machining runs from gun barrels in Saco to flight-critical engine parts in North Berwick. ' +
        'The binding constraint here is labor, not capability.'
    },
    {
      id: 'stage-6',
      n: 6,
      name: 'Equity capital',
      what: 'Scaling the company',
      health: 'BREAKS HERE',
      healthClass: 'break',
      breaks: true,
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-17', 'src-18', 'src-37', 'src-14'],
      nodes: [
        { name: 'MTI equity', ref: 'inst-mti' },
        { name: 'Maine Venture Fund', ref: 'inst-mvf' },
        { name: 'Maine Angels', ref: 'inst-angels' },
        { name: 'CEI Ventures', ref: 'inst-cei' },
        { name: 'FAME Seed Capital Tax Credit', ref: 'cap-msctc', badge: '$15M POOL ENDS 2026', badgeType: 'deadline' }
      ],
      constraintShort:
        'Maine Venture Fund’s typical position is roughly $400,000 over time. No in-state institutional ' +
        'round exists after the angel stage.',
      constraint:
        'Stage 6 breaks because Maine Venture Fund’s typical position is roughly $400,000 over time, ' +
        'which is two orders of magnitude below what a maritime autonomy or advanced manufacturing ' +
        'company needs to reach a program of record. There is no in-state institutional round after the ' +
        'angel stage. A Maine hardware company that needs a Series A raises it out of state or does not ' +
        'raise it.',
      detail:
        'Everything in stage 6 is real and none of it is sized for defense hardware. The instruments that ' +
        'do carry weight are the tax credit and the match requirement, both of which make an outside ' +
        'fund dollar go further in Maine than it does elsewhere.'
    },
    {
      id: 'stage-7',
      n: 7,
      name: 'Mission partner and transition',
      what: 'Getting to a program',
      health: 'BREAKS HERE',
      healthClass: 'break',
      breaks: true,
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-01', 'src-04', 'src-28'],
      nodes: [
        { name: 'No in-state acquisition authority', ref: null, negative: true },
        { name: 'NAVSEA via SUPSHIP Bath', ref: null },
        { name: 'PNSY', ref: 'anchor-pnsy' },
        { name: 'Marine Corps Systems Command AMOC', ref: null },
        { name: 'ONR', ref: null },
        { name: 'DIU', ref: null }
      ],
      constraintShort:
        'No DIU office, no OnRamp Hub and no NSIN physical presence within 100 miles. The nearest NSIN ' +
        'activity is in Boston.',
      constraint:
        'Stage 7 breaks because there is no DIU office, no OnRamp Hub, and no NSIN physical presence ' +
        'within 100 miles of Brunswick Landing, with the nearest NSIN activity in Boston. Maine has ' +
        'demand signals and test partners in state. It has no in-state party that can move a company ' +
        'into a program.',
      detail:
        'Read stages 6 and 7 together. A Maine company can be founded, funded non-dilutively, tested to ' +
        'an accredited standard and manufactured at rate, and then has to leave the state to raise ' +
        'growth capital and to find a program office. These two breaks are the entire reason the OnRamp ' +
        'Hub bid exists, and they are exactly where Rosc’s own capital and the hub sit.'
    }
  ],

  /** Gray monospace rail labels between stages, in the SOCOM rail voice. */
  rails: [
    { from: 1, to: 2, label: 'Lab or shop floor result finds space, tooling and a first customer', broken: false },
    { from: 2, to: 3, label: 'Incubated company draws grants and federal R&D dollars, 1:1 match required', broken: false },
    { from: 3, to: 4, label: 'Non-dilutive dollars buy accredited test time and qualification data', broken: false },
    { from: 4, to: 5, label: 'Qualified design enters a supplier network already building at rate', broken: false },
    { from: 5, to: 6, label: 'Producing company seeks institutional equity to scale', broken: true, marker: 'MAINE CONSTRAINT' },
    { from: 6, to: 7, label: 'Scaled company seeks a program office. None exists in state', broken: true, marker: 'MAINE CONSTRAINT' }
  ],

  /** Rendered under the diagram as the plain summary of the capital ladder. */
  capitalLadder: [
    'TechStart ($5K)',
    'MTI Seed ($5K to $50K, 1:1 match)',
    'SBIR Phase I',
    'MTI Development Loan (up to $500K, 1:1 match) or MTAF 3.0',
    'SBIR Phase II',
    'Maine Angels / MVF (roughly $400K)',
    'GAP',
    'Out-of-state Series A'
  ]
};
