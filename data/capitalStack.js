/**
 * Section 5.6. The contract-vehicles analogue and the section a founder will
 * actually use. Carries the MSCTC term table and the 2027 cliff countdown.
 */
window.RoscData = window.RoscData || {};

window.RoscData.capitalStack = {
  intro:
    'The SOCOM map details contract vehicles because a company selling to SOCOM needs to know how the ' +
    'money arrives. A company forming in Maine needs the same thing from the other direction. This is ' +
    'the instrument list, in the order a company touches it.',

  cliff: {
    id: 'cap-cliff',
    label: 'DATED CALLOUT',
    title: 'The 2027 seed credit cliff',
    body:
      'The Maine Seed Capital Tax Credit annual pool is $15,000,000 through calendar 2026 and reverts to ' +
      '$5,000,000 for calendar 2027 and forward. Any Maine investment with timing flexibility should ' +
      'close in 2026. This is the single most actionable mechanic in the document and it is the direct ' +
      'analogue of the SBIR authorization lapse note in the USSF map.',
    deadline: '2026-12-31',
    badge: '$15M POOL ENDS 2026',
    confidence: 'verified',
    asOf: '2026-08',
    sourceIds: ['src-14', 'src-16']
  },

  msctc: {
    id: 'cap-msctc',
    name: 'Maine Seed Capital Tax Credit (MSCTC)',
    category: 'capital',
    administrator: 'Finance Authority of Maine (FAME)',
    administratorLead: { name: 'Carlos Mello', role: 'CEO, FAME', confidence: 'verified' },
    confidence: 'verified',
    asOf: '2026-08',
    sourceIds: ['src-14', 'src-16'],
    summary: 'The central instrument in the Maine capital stack.',
    terms: [
      { term: 'Credit rate', value: '40 percent of cash equity invested' },
      { term: 'Per investor, per business', value: 'Up to $500,000 in any consecutive three-year period' },
      { term: 'Aggregate per business', value: '$3,500,000 eligible for credit' },
      { term: 'At-risk period', value: 'Five years' },
      { term: 'Credit usage', value: '25 percent of the authorized credit per year, over four years starting the year of investment' },
      { term: 'Annual liability cap', value: 'For investments not made through a private VC fund, credits used cannot exceed 50 percent of the investor’s total tax due that year before the credit' },
      { term: 'Business eligibility', value: 'Located in Maine, annual gross sales under $5,000,000, operating the business is the full-time professional activity of at least one principal owner' },
      { term: 'Investor eligibility', value: 'Must own less than 50 percent and not otherwise control the business. Principal owners and immediate relatives excluded.' },
      { term: 'Annual credit pool', value: '$15,000,000 through calendar 2026. Reverts to $5,000,000 for calendar 2027 and forward.', highlight: true }
    ],
    history: [
      { year: '2022', value: '$6.1M allocated against $46M invested into participating companies' },
      { year: '2023', value: '$5.3M allocated supporting 35 companies across 141 issued credits' }
    ]
  },

  instruments: [
    {
      id: 'cap-nmcip',
      ecoRole: 'capital',
      name: 'Maine New Markets Capital Investment Program (NMCIP)',
      category: 'capital',
      type: 'State tax credit',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-15'],
      summary: 'FAME-administered, modeled on the federal NMTC.',
      detail:
        '39 percent credit on an approved project’s total qualifying investment. Maximum eligible ' +
        'investment per qualified business is $40,000,000 for manufacturing or value-added production ' +
        'enterprises with 200 or more employees, or $10,000,000 for others. Recapitalized for 2026. ' +
        'Allocation validity is one year for authority awarded after 1 January 2026, and two years for ' +
        'authority issued before that date.'
    },
    {
      id: 'cap-sbir',
      ecoRole: 'capital',
      name: 'SBIR and STTR',
      category: 'capital',
      type: 'Federal non-dilutive',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-19', 'src-39', 'src-118'],
      summary: 'The backbone of stage 3 and the cleanest measure of Maine’s federal R&D pipeline.',
      detail:
        'Phase I up to $150,000 (SBIR) or $200,000 (STTR), Phase II up to $1,000,000. Roughly $3.5B to ' +
        '$4B distributed annually across 11 federal agencies. Maine access support runs through MTI’s ' +
        'free application assistance and the Central Maine Growth Council FAST award.',
      gap:
        'Maine’s annual SBIR and STTR award volume in dollars is a known gap and should be obtained, ' +
        'since it is the cleanest single measure of the state’s federal R&D pipeline.',
      entryPoints: [
        { value: 'sbir.gov', confidence: 'verified' }
      ]
    },
    {
      id: 'cap-mti-instruments',
      ecoRole: 'capital',
      name: 'MTI instruments',
      category: 'capital',
      type: 'State non-dilutive and debt',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-19'],
      summary: 'TechStart, Seed, Development Loans and MTAF 3.0, nearly all carrying a 1:1 match.',
      detail:
        'TechStart grants up to $5,000. Business Innovation Seed Grants of $5,000 to $50,000 with a 1:1 ' +
        'match, capped at $50,000 per technology and $50,000 in any 24-month period per organization, ' +
        'assessed on the VIRAL scale across eight areas. Development Loans up to $500,000 with a 1:1 ' +
        'match. MTAF 3.0 interest-free loans to for-profits with partial forgiveness up to 50 percent of ' +
        'the original amount, awarded incrementally, on a 5-year repayment term starting from planned ' +
        'project completion, with initial funds anticipated Q1 2026.',
      entryPoints: [
        { value: 'mainetechnology.org', confidence: 'verified' }
      ]
    },
    {
      id: 'cap-mvf',
      ecoRole: 'capital',
      name: 'Maine Venture Fund',
      category: 'capital',
      type: 'State equity',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-17', 'src-18'],
      summary: 'The state’s only institutional venture vehicle, and the point where the chain breaks.',
      detail:
        'Evergreen structure with returns recycled. $3.3M deployed across 13 new portfolio companies in ' +
        '2025. Typical position roughly $400,000 over time. More than 365 co-investors leveraging $196.6 ' +
        'million. Capitalization is reported inconsistently across three sources, from $13 million in ' +
        'state contributions to $25.2M in fund investment.',
      entryPoints: [
        { value: 'maineventurefund.com', confidence: 'verified' }
      ]
    }
  ],

  solicitation: {
    id: 'cap-onr-rfp',
    label: 'LIVE SOLICITATION',
    title: 'ONR, Accelerating Maritime Modernization: Innovation in Naval Manufacturing, Sustainment, and Industrial Base Capability',
    due: '2026-10-01',
    dueLabel: 'Due 1 October 2026',
    body:
      'Covers advanced materials, robotics, AI/ML, digital tools and inspection technologies to improve ' +
      'speed, throughput, affordability and operational readiness. This lines up almost exactly with ' +
      'clusters 2 and 3.',
    confidence: 'verified',
    asOf: '2026-08',
    sourceIds: ['src-28']
  },

  matchNote: {
    lead: 'Everything in Maine requires a match.',
    body:
      'MTI Seed Grants, Development Loans, MTAF and the IEDP all carry a 1:1 matching requirement. This ' +
      'is the defining mechanic of Maine’s public capital and it means private capital is the trigger ' +
      'rather than the follow-on. A fund dollar committed in Maine unlocks a state dollar.'
  },

  ladder: [
    { label: 'TechStart', value: '$5K', kind: 'grant' },
    { label: 'MTI Seed', value: '$5K to $50K, 1:1 match', kind: 'grant' },
    { label: 'SBIR Phase I', value: 'up to $150K, or $200K STTR', kind: 'federal' },
    { label: 'MTI Development Loan or MTAF 3.0', value: 'up to $500K, 1:1 match', kind: 'debt' },
    { label: 'SBIR Phase II', value: 'up to $1M', kind: 'federal' },
    { label: 'Maine Angels / MVF', value: 'roughly $400K', kind: 'equity' },
    { label: 'GAP', value: 'no in-state institutional round', kind: 'gap' },
    { label: 'Out-of-state Series A', value: 'raised outside Maine', kind: 'equity' }
  ]
};
