/**
 * Section 5.9. Cross-reference to the SOCOM and USSF maps, plus the engagement
 * channels and the Rosc Maine playbook that share the routing tab.
 * This is the reason the three documents are a set.
 */
window.RoscData = window.RoscData || {};

window.RoscData.crossReference = {
  intro:
    'Maine is the supply side. The SOCOM and USSF maps are the demand side. This table is the join. ' +
    'Each row takes a Maine capability and names the program office and entry point that already ' +
    'appears in one of the prior two documents, so a portfolio company does not have to rediscover the ' +
    'route.',

  routes: [
    {
      id: 'xr-01',
      capability: 'Large-format additive, composites (ASCC, Evergreen, Compotech)',
      routesTo: 'PEO-SOF Warrior, additive manufacturing at deployed locations',
      map: 'SOCOM',
      entryPoint: 'SOFWERX sustainment program, PEO-SOF Warrior, SBIR',
      cluster: 'composites-am',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-22']
    },
    {
      id: 'xr-02',
      capability: 'Additive part qualification (PNSY workflow)',
      routesTo: 'NAVSEA 05T, Afloat Additive Manufacturing Program, DIU Blue Manufacturing',
      map: 'Neither, new',
      entryPoint: 'DIU Blue Manufacturing, ONR RFP due 1 Oct 2026',
      cluster: 'composites-am',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-02', 'src-07', 'src-28']
    },
    {
      id: 'xr-03',
      capability: 'USV and UUV (white space, no company yet)',
      routesTo: 'PEO-SOF Maritime and Undersea Systems (LOW openness, high classification barrier), NAVSEA undersea',
      map: 'SOCOM',
      entryPoint: 'SOFWERX maritime, ONR undersea, PEO-SOF MSS SBIR',
      cluster: 'maritime-autonomy',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-28']
    },
    {
      id: 'xr-04',
      capability: 'Underwater navigation, acoustic SLAM',
      routesTo: 'SOCOM white space, underwater navigation in GPS-denied environments for combat divers',
      map: 'SOCOM',
      entryPoint: 'PEO-SOF MSS / ONR',
      cluster: 'maritime-autonomy',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: []
    },
    {
      id: 'xr-05',
      capability: 'UGV payloads and autonomy (Howe & Howe adjacency)',
      routesTo: 'Army RCV program, USMC Force Design 2030, SOCOM CUAS white space',
      map: 'SOCOM',
      entryPoint: 'SOFWERX autonomy, JIDA for counter-UAS',
      cluster: 'ugs',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-12']
    },
    {
      id: 'xr-06',
      capability: 'Space qualification and electronics test (Maine Space Corp lab)',
      routesTo: 'SSC PEO Space Combat Power, SpaceWERX',
      map: 'USSF',
      entryPoint: 'SpaceWERX STRATFI/TACFI, SSC Front Door',
      cluster: 'space-high-latitude',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-25']
    },
    {
      id: 'xr-07',
      capability: 'High-latitude and polar ground systems',
      routesTo: 'SSC, Golden Dome sensing',
      map: 'USSF',
      entryPoint: 'SSC Front Door, SHIELD IDIQ registration',
      cluster: 'space-high-latitude',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: []
    },
    {
      id: 'xr-08',
      capability: 'Installation microgrid and cold-weather energy',
      routesTo: 'SOCOM power and energy white space, installation resilience',
      map: 'SOCOM',
      entryPoint: 'SOFWERX power program, PEO-SOF Warrior',
      cluster: 'space-high-latitude',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34']
    },
    {
      id: 'xr-09',
      capability: 'Shipyard industrial data (HighByte adjacency)',
      routesTo: 'NAVSEA sustainment, MIB Program',
      map: 'Neither, new',
      entryPoint: 'ONR RFP due 1 Oct 2026',
      cluster: 'shipyard-ai',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-04', 'src-28']
    },
    {
      id: 'xr-10',
      capability: 'PFAS and water remediation',
      routesTo: 'New. No routing in either prior map.',
      map: 'Neither',
      entryPoint: '',
      entryPointGap: 'To be developed',
      cluster: 'food-water-bio',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-26']
    }
  ],

  newPrograms: [
    {
      id: 'prog-blue-mfg',
      name: 'DIU Blue Manufacturing',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-02', 'src-03'],
      body:
        'Launched 3 April 2025 by then-Director Doug Beck. Qualifies advanced commercial manufacturers ' +
        'and connects them to technology companies needing to scale, across 3D printing, automation and ' +
        'high-rate production. The initial solicitation covered six areas including automated metal ' +
        'machining for parts production, composite or ceramic additive manufacturing, and 3D-printed ' +
        'tooling. Modeled on the Blue UAS approach. Program coordinator named in reporting as Travis ' +
        'DeMeester.',
      action:
        'Maine’s composites and machining base is the supply side of this program and no Maine entity ' +
        'appears to be engaged with it. This is an immediate, concrete action.',
      entryPoints: [{ value: 'diu.mil', confidence: 'verified' }]
    },
    {
      id: 'prog-sib',
      name: 'Navy Submarine Industrial Base (SIB) Program Office',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-04'],
      body:
        'Formally established 6 April 2026 under the Direct Reporting Program Manager for Submarines. ' +
        'Context from the Maritime Industrial Base Program 2025 Year in Review is that the submarine ' +
        'industrial base has contracted from 17,000 suppliers to roughly 5,000 since the Cold War, ' +
        'nearly 70 percent of the current workforce is nearing retirement, and the base needs to add ' +
        'more than 250,000 skilled workers over the next decade. In 2025 coordinated efforts placed ' +
        'more than 14,000 workers with maritime industrial base suppliers and BuildSubmarines.com ' +
        'generated over 435,000 job applications, a 107 percent increase. The demand target is one ' +
        'Columbia-class and two Virginia-class submarines per year by 2028.',
      action:
        'This is the funding and policy context behind the $5M that MDIA raised via BlueForge Alliance, ' +
        'and it is the reason workforce arguments carry weight in Maine that technology arguments alone ' +
        'do not.',
      entryPoints: [{ value: 'BuildSubmarines.com', confidence: 'verified' }]
    }
  ],

  policyAnchors: [
    {
      id: 'pol-eo14269',
      name: 'Executive Order 14269, Restoring America’s Maritime Dominance',
      detail: 'Signed 9 April 2025, 90 FR 15635.',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-06']
    },
    {
      id: 'pol-map',
      name: 'America’s Maritime Action Plan',
      detail:
        'Released by the White House February 2026. Names Portsmouth Naval Shipyard specifically and ' +
        'calls for digital shipyard infrastructure investment, additional additive manufacturing centers ' +
        'of excellence in key maritime regions, and expanded talent pipelines linking trade schools, ' +
        'centers of excellence and shipyards.',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-05']
    }
  ],

  /** Left column of the engagement tab. Ranked by usefulness to an outside company. */
  channels: [
    { rank: 1, name: 'Maine Technology Institute', ref: 'inst-mti', openness: 'HIGH', why: 'First funding call. Every instrument carries a 1:1 match, so an outside check unlocks state money rather than competing with it.' },
    { rank: 2, name: 'Maine APEX Accelerator', ref: 'inst-apex', openness: 'HIGH', why: 'Free procurement navigation. Registration, solicitation analysis and compliance work, which is what kills first-time federal applicants.' },
    { rank: 3, name: 'UMaine ASCC', ref: 'inst-ascc', openness: 'HIGH', why: 'The only ISO 17025 accredited test capability in the state, and a spinout source, so it is deal flow as well as a service.' },
    { rank: 4, name: 'TechPlace at Brunswick Landing', ref: 'inst-techplace', openness: 'HIGH', why: 'Shared machine shop, welding, composites layup and bioproduction, at the site of the proposed hub.' },
    { rank: 5, name: 'PNSY innovation team', ref: 'anchor-pnsy', openness: 'HIGH', why: 'The most legible demand signal in the state, with named innovation staff and a public adoption record. A test partner and never a reference.' },
    { rank: 6, name: 'Roux Founder Residency', ref: 'inst-roux', openness: 'HIGH', why: 'Roughly 10 companies a year across AI, digital engineering, advanced manufacturing and blue economy. Small enough to review in full.' },
    { rank: 7, name: 'Maine Venture Fund and Maine Angels', ref: 'inst-mvf', openness: 'MED', why: 'Co-investment and local diligence. Not a lead for hardware at roughly $400,000 per position.' },
    { rank: 8, name: 'Maine & Co', ref: 'inst-maineco', openness: 'MED', why: 'Confidential, free access into corporate and public leadership for a relocation or expansion conversation.' },
    { rank: 9, name: 'Maine Space Corporation', ref: 'inst-msc', openness: 'MED', why: 'Qualification test lab, and the 50-plus organization NSF Engines coalition list as a letters-of-support roster.' },
    { rank: 10, name: 'Maine Defense Industry Alliance', ref: 'inst-mdia', openness: 'MED', why: 'Workforce coalition only. No technology scouting and no transition work, which is exactly the gap at stage 7.' },
    { rank: 11, name: 'Congressional delegation', ref: null, openness: 'MED', why: 'Collins on Appropriations, King on Armed Services, Pingree on Appropriations for ME-1, Golden on Armed Services for ME-2. Build on the delegation rather than on the current administration.' }
  ],

  /** Right column of the engagement tab. */
  playbook: {
    title: 'The Rosc Maine playbook',
    steps: [
      { n: 1, title: 'Domicile in Maine before the first check', body: 'MSCTC eligibility requires the business to be located in Maine with annual gross sales under $5,000,000 and at least one principal owner working the business full time. MTI eligibility runs on the same domicile logic. Structure this before the round, not after.' },
      { n: 2, title: 'Close in calendar 2026 where timing allows', body: 'The seed credit pool is $15,000,000 through calendar 2026 and $5,000,000 from calendar 2027. A 2026 close is worth real basis points to the investor and changes nothing operationally.' },
      { n: 3, title: 'Size the check to trigger the match', body: 'MTI Seed, Development Loans, MTAF and IEDP all carry a 1:1 match. Fund dollars committed against a specific MTI program pull state dollars in behind them.' },
      { n: 4, title: 'Route the company to APEX before it touches a solicitation', body: 'SAM registration, certification guidance and bid preparation are free here. Doing this first is the cheapest failure avoided in the whole sequence.' },
      { n: 5, title: 'Buy accredited test time early', body: 'ASCC is the only ISO 17025 capability in the state. Qualification data from an accredited lab is the artifact a federal customer will accept, and it is available in state at stage 4 rather than after a raise.' },
      { n: 6, title: 'Build the customer relationship out of state from day one', body: 'Maine has no acquisition authority and no in-state program office. PNSY and BIW are demand signals and test partners. The buying decision is made elsewhere, so the customer development plan has to start elsewhere.' },
      { n: 7, title: 'Target the ONR solicitation due 1 October 2026', body: 'Accelerating Maritime Modernization covers advanced materials, robotics, AI/ML, digital tools and inspection technologies, which maps almost exactly onto clusters 2 and 3.' },
      { n: 8, title: 'Put the manufacturing base into DIU Blue Manufacturing', body: 'Maine’s composites and machining base is the supply side of this program and no Maine entity appears to be engaged with it. This is an immediate action with no capital requirement.' },
      { n: 9, title: 'Use the cross-reference table to name the program office', body: 'Do not let a Maine company describe its customer as the Navy. The routing table names the office and the entry point already documented in the SOCOM and USSF maps.' },
      { n: 10, title: 'Confirm every name before outreach', body: 'The personnel in this document are unverified unless tagged otherwise, and the verification gaps table lists what is missing. Confirm the seat first. A wrong call costs the relationship.' }
    ]
  }
};
