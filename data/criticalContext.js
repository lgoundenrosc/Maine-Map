/**
 * Sections 5.10 and 5.11. Critical context and what Maine cannot support.
 * This is where the bad news lives, in a named tab rather than an appendix.
 */
window.RoscData = window.RoscData || {};

window.RoscData.criticalContext = {
  intro:
    'The analogue to the ITAR, clearances and PPBE section in the USSF map. Read this tab before the ' +
    'clusters tab if you are deciding whether to invest rather than how. Nothing here is hedged.',

  items: [
    {
      id: 'cc-match',
      n: 1,
      title: 'Everything in Maine requires a match',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-19'],
      body:
        'MTI Seed Grants, Development Loans, MTAF and the IEDP all carry a 1:1 matching requirement. ' +
        'This is the defining mechanic of Maine’s public capital and it means private capital is the ' +
        'trigger rather than the follow-on.',
      implication:
        'For Rosc the implication is plain. A fund dollar committed in Maine unlocks a state dollar. ' +
        'That is a real and unusual advantage, and it is also a dependency, because a company that ' +
        'cannot raise privately cannot access the public money either.'
    },
    {
      id: 'cc-cliff',
      n: 2,
      title: 'The 2027 seed credit cliff',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-14', 'src-16'],
      body:
        'Investments made in calendar 2026 draw against a $15,000,000 pool. Calendar 2027 draws against ' +
        '$5,000,000.',
      implication:
        'Any Maine investment with timing flexibility should close in 2026. This is the single most ' +
        'actionable mechanic in the document.'
    },
    {
      id: 'cc-clearance',
      n: 3,
      title: 'No clearance density and no acquisition authority',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10'],
      body:
        'Maine has no cleared facility capacity of consequence outside PNSY and BIW, and no cleared ' +
        'workforce pipeline. Getting a TS/SCI takes six months to two-plus years, and a facility ' +
        'clearance six to twelve months with a dedicated Facility Security Officer, per the USSF map’s ' +
        'treatment. A Maine-domiciled company pursuing classified work faces the same Catch-22 described ' +
        'there with none of the local infrastructure to shorten it.',
      implication:
        'Combined with the absence of any in-state acquisition authority, this means Maine companies ' +
        'must build the customer relationship out of state from day one.'
    },
    {
      id: 'cc-talent',
      n: 4,
      title: 'Talent supply is the binding constraint',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-41', 'src-10'],
      body:
        'Defense employers in Maine need 1,200 to 1,700 skilled workers annually and anticipate more ' +
        'than 7,500 openings across BIW, PNSY and Pratt & Whitney over five years. BIW is spending $60M ' +
        'on parking and $20M on worker housing, which tells you how hard the constraint bites.',
      implication:
        'Any venture thesis that adds labor demand without addressing supply will meet resistance from ' +
        'MDIA and the community colleges.'
    },
    {
      id: 'cc-political',
      n: 5,
      title: 'Political transition',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34'],
      body:
        'Maine holds a gubernatorial election in November 2026 and Governor Mills is term-limited. ' +
        'MRRA’s eleven trustees are gubernatorial appointees. State-side sponsorship and the facility ' +
        'partner’s governing board both turn over during any 2027 standup.',
      implication:
        'Build relationships on the congressional delegation and bipartisan legislative support rather ' +
        'than on the current administration.'
    }
  ],

  cannotSupport: {
    title: 'What Maine cannot support',
    intro: 'Stated plainly, with no hedging.',
    items: [
      'Classified program work at any scale, absent a partner with an existing facility clearance',
      'Hardware companies needing a Series A raised in state',
      'Anything requiring proximity to a program office or acquisition authority',
      'Launch-dependent space businesses, given local opposition and the sea-based pivot',
      'Companies needing a deep bench of ITAR-experienced counsel or export compliance staff locally',
      'High-volume software talent hiring at Boston or Bay Area scale',
      'Any thesis premised on Maine’s EDA Innovation Intelligence Index score competing with Utah, North Carolina, or other likely rival hub locations'
    ],
    indexNote: {
      body:
        'Cumberland County scores 132.6, ranked 189 of roughly 3,100 US counties, which is the top 6 ' +
        'percent and strong for a rural state. It is not competitive against Salt Lake or the Research ' +
        'Triangle. Portland metro scores 137.2, ranked 46th among US metros.',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-29']
    }
  }
};
