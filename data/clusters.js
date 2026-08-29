/**
 * Section 5.3. Seven capability clusters.
 * Dollar sizing is deliberately omitted. Maine has no budget authority and any
 * figure would be invented. The slot carries a qualitative depth rating instead.
 */
window.RoscData = window.RoscData || {};

window.RoscData.clusters = {
  intro:
    'Seven clusters, each with a heat rating and a qualitative depth rating. There are no dollar figures ' +
    'anywhere on this tab and that is deliberate. Maine holds no budget authority, so any cluster sizing ' +
    'would be fabricated. Depth reads the state’s existing industrial and research base, heat reads how ' +
    'fast the surrounding federal demand is moving.',

  viewFilters: [
    { id: 'all', label: 'All' },
    { id: 'assets', label: 'Assets' },
    { id: 'who', label: 'Who’s there' },
    { id: 'whitespace', label: 'White space' }
  ],

  items: [
    {
      id: 'maritime-autonomy',
      short: 'Maritime',
      name: 'Maritime autonomy and undersea',
      category: 'cluster',
      heat: 'HOT',
      depth: 'deep',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-11', 'src-22', 'src-28'],
      summary:
        'Every input for an uncrewed surface vessel company exists in Maine and no company assembles them. ' +
        'This is the sharpest formation opportunity in the state.',
      assets: [
        'BIW surface combatant construction',
        'PNSY submarine sustainment',
        'Maine Maritime Academy mariners and simulators',
        'The Gulf of Maine littorals as open test water',
        'Bigelow and GMRI ocean science',
        'Darling Marine Center',
        'A working boatbuilding industry from Kittery to Eastport',
        'ASCC’s proven ability to print large marine structures for Marine Corps Systems Command'
      ],
      whoIsThere: [
        { name: 'Hodgdon', note: 'Combatant craft for special operations', ref: 'co-hodgdon' },
        { name: 'Lyman-Morse', ref: 'co-lyman-morse' },
        { name: 'Front Street Shipyard', ref: 'co-front-street' },
        { name: 'Washburn and Doughty', ref: 'co-washburn' },
        { name: 'Kelson Marine', ref: 'co-kelson' },
        { name: 'Bluesonde Technologies', ref: 'co-bluesonde' }
      ],
      whiteSpace:
        'Maine has the water, the hulls, the mariners and the sustainment base, and not one uncrewed ' +
        'surface vessel company. The USV sector is the fastest-moving segment in Navy procurement and ' +
        'DIU is directly involved in it. Every input exists and no company assembles them. This is the ' +
        'sharpest formation opportunity in the state.'
    },
    {
      id: 'composites-am',
      short: 'Composites',
      name: 'Advanced composites and additive manufacturing',
      category: 'cluster',
      heat: 'HOT',
      depth: 'deep',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-22', 'src-35', 'src-07', 'src-02'],
      summary:
        'The strongest technical base in the state, and the bottleneck has moved from printing to ' +
        'qualification paperwork.',
      assets: [
        'UMaine ASCC',
        'World-record large-format polymer printing',
        'Forest-derived biocomposites',
        'TechPlace composites layup facility'
      ],
      whoIsThere: [
        { name: 'Compotech', note: 'Brewer. $40M in contracts 2017 to 2025 for the Expeditionary Shelter Protection System, a quick-setup composite fencing system with panel armor that protects soldiers from blast and ballistic threats', ref: 'co-compotech' },
        { name: 'Kenway Composites', note: 'Augusta', ref: 'co-kenway' },
        { name: 'Custom Composite Technologies', note: 'Bath', ref: 'co-cct' },
        { name: 'Evergreen Additive', note: '2025 ASCC spinout, Navy-funded core technology', ref: 'co-evergreen' }
      ],
      whiteSpace:
        'Qualification and certification workflow for additively manufactured parts entering naval ' +
        'service. PNSY just proved the technical path with the copper-nickel flange and the bottleneck ' +
        'is now paperwork, inspection and weld qualification rather than printing. Software that ' +
        'compresses AM part certification has a named customer in state and a Navy-wide market.'
    },
    {
      id: 'shipyard-ai',
      short: 'Shipyard AI',
      name: 'Shipyard sustainment and industrial AI',
      category: 'cluster',
      heat: 'HOT',
      depth: 'moderate',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-08', 'src-05', 'src-28'],
      summary:
        'Two major yards inside 50 miles, one of which is already running a sensor pilot, and nobody in ' +
        'Maine building for either.',
      assets: [
        'Two major yards inside 50 miles',
        'PNSY’s innovation team and sensor pilot',
        'BIW’s throughput constraint'
      ],
      whoIsThere: [
        { name: 'HighByte', note: 'Portland, industrial DataOps', ref: 'co-highbyte' },
        { name: 'Maine MEP', ref: 'inst-mep' }
      ],
      whiteSpace:
        'Machine-shop and dry dock data capture, predictive maintenance for yard equipment, and ' +
        'automated non-destructive testing. A pilot at Norfolk Naval Shipyard using commercially ' +
        'available NDT technology reduced part-inspection times by 20 percent, which establishes both ' +
        'the demand and the benchmark. Nobody in Maine is building this and both customers are local.'
    },
    {
      id: 'ugs',
      short: 'UGS',
      name: 'Uncrewed ground systems',
      category: 'cluster',
      heat: 'OPEN',
      depth: 'moderate',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-12', 'src-13'],
      flag: 'This cluster was missing from all prior Maine analysis including the First Light Works bid.',
      summary:
        'Maine has a UGV producer tied to an Army program of record and a Marine Corps demonstrator, and ' +
        'no supplier ecosystem around it.',
      assets: [
        'Howe & Howe Inc., Waterboro, founded 2004 by twin brothers Michael Howe (president and chief engineer) and Geoffrey Howe (CEO)',
        'Acquired by Textron Systems December 2018, announced October 2018, roughly 50 employees at acquisition',
        'RIPSAW M5 delivered for the Army’s Robotic Combat Vehicle medium program, including an all-electric M5-E variant delivered for CCDC Armaments Center weapon integration testing',
        'RIPSAW M1 UGV technology demonstrator debuted at Modern Day Marine April 2026 for Marine Corps littoral mobility and uncrewed teaming, supporting the Advanced Reconnaissance Vehicle and Amphibious Combat Vehicle under Force Design 2030, with target missions including hard-kill counter-UAS and RSTA',
        'Modular Open Systems Approach design',
        'Thermite firefighting robot line and the Badger'
      ],
      whoIsThere: [
        { name: 'Howe & Howe Inc.', note: 'Waterboro, Textron Systems subsidiary', ref: 'anchor-txt' }
      ],
      whiteSpace:
        'Maine has a UGV producer tied to an Army program of record and a Marine Corps demonstrator, and ' +
        'no supplier ecosystem around it. Payload modules, autonomy software and power systems for the ' +
        'MOSA-designed Ripsaw family are an obvious adjacency. Cross-reference the SOCOM map’s white ' +
        'space on man-portable counter-UAS and autonomous resupply.'
    },
    {
      id: 'space-high-latitude',
      short: 'Space',
      name: 'Space and high-latitude',
      category: 'cluster',
      heat: 'OPEN',
      depth: 'moderate',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-25', 'src-34'],
      summary:
        'Real qualification and test assets, and a launch story that should not be the basis of the case.',
      assets: [
        'Maine Space Corporation electronics test lab at Brunswick Landing, opened 2025',
        'Maine Space Grant Consortium',
        'Brunswick Executive Airport with 18 aerospace tenants and rocket engine test capability',
        'Loring’s runways',
        'High-latitude geography suited to polar orbit access',
        'The Andover earth station heritage'
      ],
      whoIsThere: [
        { name: 'bluShift Aerospace', note: 'Biofuel launch, launched Stardust 1.0 from Loring January 2021', ref: 'co-blushift' },
        { name: 'Poseidon Aerospace', note: 'Heavy-lift unmanned cargo aircraft, claimed $11M seed and two-ton payload over 1,500 miles, company-supplied and unverified', ref: 'co-poseidon' },
        { name: 'Greisen Aerospace', ref: 'co-greisen' },
        { name: 'Promin Aerospace', ref: 'co-promin' },
        { name: 'Teledyne e2v', ref: 'anchor-tdy' },
        { name: 'VALT Enterprizes', note: 'Presque Isle, hypersonic delivery systems, $14.8M DoD contract September 2024', ref: 'co-valt' }
      ],
      constraint:
        'Do not build the space case on launch. Maine’s coastal launch plans met local opposition and the ' +
        'Maine Space Corporation has pivoted toward sea-based options. The Corporation was created by the ' +
        'Legislature in 2022, only recently filed for 501(c)(3) status, and has been funded largely by a ' +
        'two-year $426,000 MTI grant plus $29,000 from the Maine Space Grant Consortium. The durable ' +
        'assets are qualification testing, component supply and airborne test.',
      whiteSpace:
        'The durable openings are qualification testing as a service, component supply into other ' +
        'people’s space programs, and airborne test. Route the capability to SpaceWERX and SSC through ' +
        'the USSF map rather than to any in-state buyer, because there is none.'
    },
    {
      id: 'food-water-bio',
      short: 'Bio supply',
      name: 'Food, water, and biological supply chain security',
      category: 'cluster',
      heat: 'OPEN',
      depth: 'moderate',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-23', 'src-24'],
      flag: 'The most differentiated cluster and the least built. No other candidate location has this combination.',
      summary:
        'The most differentiated cluster in the state and the least built. On the defense side there is ' +
        'essentially nobody in it.',
      assets: [
        'Bigelow Laboratory’s National Center for Marine Algae and Microbiota',
        'Bigelow’s Tandy Center for Ocean Forecasting',
        'Bigelow’s Center for Seafood Solutions',
        'Blue Biotech Innovation Ecosystem launched October 2025 with MTI seed funding alongside Hatch Blue and Ocean House Consulting',
        'UMaine Maine-eDNA',
        'UMaine Cooperative Extension',
        'Forest Bioproducts Research Institute',
        'UMaine-led Forest Bioproducts Tech Hub, roughly $20M EDA, July 2026 (unverified)',
        'The state aquaculture sector and the Maine Aquaculture Innovation Center'
      ],
      whoIsThere: [
        { name: 'Essentially nobody on the defense side', note: 'That is the finding, not an omission', ref: null }
      ],
      whiteSpace:
        'Ration and supplement inputs, marine-derived pharmaceutical precursors, biomanufacturing ' +
        'feedstock resilience, environmental DNA for biosurveillance and detection, cold-chain and ' +
        'remote-base food security, and expeditionary water treatment. Add PFAS remediation as a water ' +
        'security use case, since Maine has an instrumented contaminated site and DoD has the problem ' +
        'portfolio-wide. None of this requires new institutions.'
    },
    {
      id: 'cyber-software',
      short: 'Cyber',
      name: 'Cyber, secure communications, and dual-use software',
      category: 'cluster',
      heat: 'WATCH',
      depth: 'thin',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-38'],
      summary: 'The thinnest of the seven. Do not lead with it.',
      assets: [
        'SubCom subsea cable presence',
        'Roux Institute computer and data science',
        'Bowdoin and Colby CS departments'
      ],
      whoIsThere: [
        { name: 'HighByte', ref: 'co-highbyte' },
        { name: 'Defendify', ref: 'co-defendify' },
        { name: 'Tilson Technology', ref: 'co-tilson' },
        { name: 'VividCloud', ref: 'co-vividcloud' }
      ],
      constraint:
        'Thinnest of the seven. Maine has no clearance density and no meaningful cleared facility ' +
        'capacity outside PNSY and BIW. Do not lead with this cluster.',
      whiteSpace:
        'Where it works, it works as dual-use industrial software attached to cluster 3 rather than as a ' +
        'cyber thesis of its own. HighByte is the pattern to copy, not Defendify.'
    },
    {
      id: 'workforce-education',
      short: 'Workforce',
      name: 'Education and workforce training pipeline',
      category: 'cluster',
      heat: 'OPEN',
      depth: 'deep',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-41', 'src-65'],
      flag: 'Added on request. Not one of the original seven clusters, and not a target for a portfolio company in the way the others are, it is the labor supply behind all of them. Pruned to the campuses that carry a specific manufacturing or defense relevant program rather than every UMaine System location.',
      summary:
        'Every other cluster in this map assumes a workforce exists to staff it. This is that workforce, ' +
        'and where it is trained, limited to the institutions with a named program rather than a general ' +
        'degree.',
      assets: [
        'Maine Community College System, all seven colleges carry a manufacturing, welding or machining program',
        'University of Maine, Orono, the flagship campus and the Advanced Structures and Composites Center graduate pipeline',
        'University of Southern Maine, ABET-accredited mechanical and industrial engineering, and the Composite Engineering Research Laboratory',
        'University of Maine at Augusta, an NSA-designated Center of Academic Excellence in Cyber Defense Education',
        'Maine Maritime Academy, licensed mariners and marine engineers',
        'Bowdoin, Bates and Colby, the Colby-Bates-Bowdoin consortium',
        'The Maine Apprenticeship Program, registered apprenticeships across trades and technical occupations',
        'Educate Maine and Live + Work in Maine, advocacy and talent attraction rather than training providers themselves'
      ],
      whoIsThere: [
        { name: 'University of Maine', ref: 'inst-umaine' },
        { name: 'University of Southern Maine', note: 'ABET mechanical and industrial engineering, Composite Engineering Research Laboratory', ref: 'inst-usm' },
        { name: 'University of Maine at Augusta', note: 'NSA-designated cyber defense center, Department of Labor apprenticeship', ref: 'inst-uma' },
        { name: 'Maine Maritime Academy', ref: 'inst-mma' },
        { name: 'Bates College', ref: 'inst-bates' },
        { name: 'Colby College', ref: 'inst-colby' },
        { name: 'Bowdoin College', ref: 'inst-bowdoin' },
        { name: 'Southern Maine Community College', note: 'Marine Design Short-Term Training with Bath Iron Works, MATEC composites program', ref: 'inst-smcc' },
        { name: 'York County Community College', note: 'BlueForge-funded welding lab for the submarine industrial base', ref: 'inst-yccc' },
        { name: 'Central Maine Community College', note: 'Precision Machining Technology', ref: 'inst-cmcc' },
        { name: 'Eastern Maine Community College', note: 'Welding Technology, Precision Machining', ref: 'inst-emcc' },
        { name: 'Kennebec Valley Community College', note: 'Precision Machining Technology', ref: 'inst-kvcc' },
        { name: 'Northern Maine Community College', note: 'Precision Machining, Tool, Die and Mold Making', ref: 'inst-nmcc' },
        { name: 'Washington County Community College', note: 'Welding Technology, AWS certified', ref: 'inst-wccc' },
        { name: 'Educate Maine', ref: 'inst-educatemaine' },
        { name: 'Live + Work in Maine', ref: 'inst-livework' },
        { name: 'Maine Apprenticeship Program', ref: 'inst-apprenticeship' }
      ],
      whiteSpace:
        'Once the general-education campuses are set aside, the manufacturing and defense relevant capacity ' +
        'is real rather than theoretical. YCCC’s welding lab is funded through MDIA and BlueForge Alliance ' +
        'specifically for the submarine industrial base, and SMCC runs a marine design program in direct ' +
        'partnership with Bath Iron Works. UMA holds an NSA cyber defense designation. What is not ' +
        'confirmed anywhere in the source material is whether the precision machining and welding output of ' +
        'the other five community colleges specifically feeds BIW, PNSY or GD-OTS rather than general ' +
        'manufacturing, or whether any of these programs carries a security clearance pathway or a ' +
        'track built around a defense program of record. That absence, not a shortage of colleges, is the ' +
        'finding.'
    }
  ]
};
