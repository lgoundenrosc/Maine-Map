/**
 * Section 5.2. Maine's analogue to the prime contractor tab in the SOCOM and
 * USSF maps, with one inversion stated in the section intro.
 */
window.RoscData = window.RoscData || {};

window.RoscData.anchorNodes = {
  intro:
    'In the SOCOM and USSF maps the primes are competitors and potential acquirers. Here they are ' +
    'customers and demand signals. Maine’s anchors do not buy programs, they execute other people’s ' +
    'programs, so the question a Rosc portfolio company should ask of each node is what it is short of, ' +
    'not what it is selling.',

  filterCodes: ['All', 'BIW', 'PNSY', 'P&W', 'GD-OTS', 'TXT', 'TDY', 'ANG'],

  nodes: [
    {
      id: 'anchor-biw',
      code: 'BIW',
      tileColor: '#1d3f6e',
      name: 'General Dynamics Bath Iron Works',
      category: 'anchor',
      cluster: ['maritime-autonomy', 'shipyard-ai'],
      value: '6,001 to 7,400 staff',
      valueNote: 'Sources conflict, see headcount below',
      location: { town: 'Bath', lat: 43.9109, lng: -69.8133, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-30', 'src-31', 'src-32'],
      openness: 'MED',
      summary:
        'Surface combatant construction for the US Navy and the largest single concentration of defense ' +
        'manufacturing demand in New England.',
      facts: [
        { label: 'President', value: 'Charles F. Krugh', confidence: 'unverified', note: 'From Wikipedia. Treat as needing confirmation.' },
        { label: 'Employees', value: '6,001 to 6,500 (Wikipedia, 2025) · 7,400 (IndustrySelect) · 6,800 (First Light Works bid)', confidence: 'unverified', note: 'Sources conflict. The range is rendered rather than a single figure.' },
        { label: 'Distance to Brunswick Landing', value: 'approximately 11 miles', confidence: 'verified' }
      ],
      programsAndDeals: [
        { text: 'DDG-51 Arleigh Burke class and DDG-1000 Zumwalt class', confidence: 'verified' },
        { text: '$610.4M contract modification for the future John Basilone', confidence: 'stale', note: 'Date unconfirmed.' },
        { text: 'Supplier spend of $122M with 246 Maine vendors in 2025', confidence: 'verified' },
        { text: '$60M on a six-story 940-space parking garage plus road improvements', confidence: 'verified' },
        { text: '$20M with the Navy and a housing developer for an 84-unit apartment complex for workers, opening mid-2027', confidence: 'verified' },
        { text: '$13M with the Navy and the YMCA', confidence: 'verified' }
      ],
      vcRead:
        'BIW is the largest single concentration of defense manufacturing demand in New England and it ' +
        'is 11 miles from the proposed hub site. Its constraint is labor and throughput, not design. ' +
        'The commercial openings are in production efficiency rather than ship design, which General ' +
        'Dynamics owns. Watch the housing and parking spend as a signal of how hard the labor ' +
        'constraint is biting.',
      entryPoints: []
    },
    {
      id: 'anchor-pnsy',
      code: 'PNSY',
      tileColor: '#155e5b',
      name: 'Portsmouth Naval Shipyard',
      category: 'anchor',
      cluster: ['maritime-autonomy', 'composites-am', 'shipyard-ai'],
      value: '7,721 civilians',
      valueNote: 'Up from 7,469 the prior year',
      location: { town: 'Kittery', lat: 43.0793, lng: -70.742, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-07', 'src-08', 'src-09', 'src-05'],
      openness: 'HIGH',
      summary:
        'Overhaul and modernization of Los Angeles and Virginia class attack submarines. The Navy’s ' +
        'oldest continuously operating shipyard, and despite the name it sits in Kittery, Maine.',
      facts: [
        { label: 'Civilian employment', value: '7,721, up from 7,469 the prior year', confidence: 'verified', note: '2024 Seacoast Shipyard Association report.' },
        { label: 'Regional economic impact', value: '$1.6 billion, up from $1.54B in 2023 and $1.46B in 2022', confidence: 'verified', note: 'This is a Maine plus New Hampshire plus Massachusetts figure from a booster association, not a Navy Maine-only number.' },
        { label: 'Infrastructure', value: 'The $1.7B-plus Multi-Mission Dry Dock, the largest project to date under the Shipyard Infrastructure Optimization Program', confidence: 'verified' },
        { label: 'Policy position', value: 'Named in America’s Maritime Action Plan (February 2026) as a target for digital shipyard infrastructure investment', confidence: 'verified' }
      ],
      caveat:
        'The $1.6 billion regional impact figure covers Maine, New Hampshire and Massachusetts and comes ' +
        'from a booster association rather than the Navy. Do not quote it as a Maine number.',
      programsAndDeals: [
        { text: 'March 2026: inspected, tested and installed a welded additively manufactured copper-nickel flange aboard USS Washington (SSN 787). Inspected and tested 9 March, installed 18 March. First AM copper-nickel flange welded at a public shipyard and one of the first uses of a welded 3D-printed component on an in-service submarine. Followed a directive to accelerate additive manufacturing across the submarine force.', confidence: 'verified' },
        { text: 'Innovation team led by innovation specialists Nate Redden and Jeremy Edwards, working on UUVs, UAS and advanced livestream.', confidence: 'verified' },
        { text: 'Late summer 2025: worked with the Dry Dock Engineering Department to test UUVs for underwater inspection of submerged infrastructure, to reduce diving risk. Mechanical engineer James Weyand quoted on the requirement.', confidence: 'verified' },
        { text: 'Certified in-house drone operator program.', confidence: 'verified' },
        { text: 'Sensor kit pilot in the PNSY machine shop to collect equipment production data.', confidence: 'verified' }
      ],
      vcRead:
        'This is the most legible demand signal in the state and the only one with named innovation staff ' +
        'and a public track record of adopting commercial technology. The openings are additive ' +
        'qualification and certification workflow, UUV and UAS inspection, non-destructive testing ' +
        'automation, and machine-shop data capture. A company that shortens submarine part lead times ' +
        'has a customer 50 miles from Portland. Note that federal entities cannot endorse a commercial ' +
        'applicant, so PNSY is a demand signal and a test partner, never a reference.',
      entryPoints: []
    },
    {
      id: 'anchor-pw',
      code: 'P&W',
      tileColor: '#4b4f63',
      name: 'Pratt & Whitney North Berwick',
      category: 'anchor',
      cluster: ['composites-am'],
      value: '2,000 to 2,300 workers',
      valueNote: 'Sources vary',
      location: { town: 'North Berwick', lat: 43.3037, lng: -70.7328, precision: 'approximate' },
      confidence: 'unverified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-32'],
      openness: 'LOW',
      summary:
        'Roughly 1 million-plus square feet machining flight-critical jet engine components.',
      facts: [
        { label: 'Site', value: 'Roughly 1 million-plus square feet', confidence: 'unverified' },
        { label: 'Workforce', value: '2,000 to 2,300 workers', confidence: 'unverified', note: 'Sources vary. The range is rendered rather than a single figure.' },
        { label: 'Specific programs', value: '', confidence: 'gap', note: 'Do not assert F135 or any other program without confirmation.' }
      ],
      programsAndDeals: [
        { text: 'Program specifics are a known gap. Nothing is asserted here.', confidence: 'gap' }
      ],
      vcRead:
        'Precision machining at scale with an aerospace quality system already in place. The relevance to ' +
        'a venture portfolio is as a contract manufacturing base rather than as a customer. Note the ' +
        'connection to DIU’s Blue Manufacturing initiative on the engagement and routing tab.',
      entryPoints: []
    },
    {
      id: 'anchor-gdots',
      code: 'GD-OTS',
      tileColor: '#8f4a1c',
      name: 'General Dynamics Ordnance and Tactical Systems, Saco',
      category: 'anchor',
      cluster: ['composites-am', 'ugs'],
      value: '$191M award 2024',
      valueNote: 'Weapon protection systems, Army',
      location: { town: 'Saco', lat: 43.5009, lng: -70.4428, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-27', 'src-33', 'src-11'],
      openness: 'LOW',
      summary:
        'Gun systems, machine gun barrels and weapon protection systems. Precision gun-barrel machining ' +
        'at a depth that is invisible in most Maine economic development material.',
      facts: [
        { label: 'Products', value: 'Gun systems, machine gun barrels, weapon protection systems', confidence: 'verified' },
        { label: 'Shop floor disciplines', value: 'Qualifier lathes, chamberer, broacher, rifling, straightener, cut-off saw, grinder', confidence: 'verified', note: 'Drawn from current job postings.' }
      ],
      programsAndDeals: [
        { text: 'Historic $225M five-year Army contract for M2A1 quick-change barrel kits for .50-caliber machine guns', confidence: 'stale', note: '2013.' },
        { text: '$191M Army contract announced October 2024 for weapon protection systems, adding 20 jobs, work expected complete by 2027', confidence: 'verified' }
      ],
      vcRead:
        'A deep precision machining capability that is invisible in most Maine economic development ' +
        'material. Relevant as a manufacturing partner for weapons-adjacent hardware, and as evidence ' +
        'that the state’s machining base is not limited to marine work.',
      entryPoints: []
    },
    {
      id: 'anchor-txt',
      code: 'TXT',
      tileColor: '#2f6b3c',
      name: 'Howe & Howe Inc. (Textron Systems)',
      category: 'anchor',
      cluster: ['ugs'],
      value: 'RCV and RIPSAW M1',
      valueNote: 'Army program plus USMC demonstrator',
      location: { town: 'Waterboro', lat: 43.6023, lng: -70.7286, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-12', 'src-13'],
      openness: 'MED',
      summary:
        'Maine’s only uncrewed ground vehicle producer, tied to an Army program of record and a Marine ' +
        'Corps demonstrator. Listed as an anchor node rather than only a portfolio comparable because it ' +
        'is a demand signal for payloads, autonomy and power in state.',
      facts: [
        { label: 'Founded', value: '2004 by twin brothers Michael Howe (president and chief engineer) and Geoffrey Howe (CEO)', confidence: 'verified' },
        { label: 'Acquired', value: 'By Textron Systems December 2018, announced October 2018. Roughly 50 employees at acquisition.', confidence: 'verified' },
        { label: 'Design approach', value: 'Modular Open Systems Approach', confidence: 'verified' }
      ],
      programsAndDeals: [
        { text: 'Delivered the RIPSAW M5 for the Army’s Robotic Combat Vehicle medium program, including an all-electric M5-E variant delivered for CCDC Armaments Center weapon integration testing.', confidence: 'verified' },
        { text: 'Debuted the RIPSAW M1 UGV technology demonstrator at Modern Day Marine in April 2026, designed for Marine Corps littoral mobility and uncrewed teaming, as a robotic force multiplier for the Advanced Reconnaissance Vehicle and Amphibious Combat Vehicle under Force Design 2030, with target missions including hard-kill counter-UAS and RSTA.', confidence: 'verified' },
        { text: 'Also builds the Thermite firefighting robot line and the Badger.', confidence: 'verified' }
      ],
      vcRead:
        'A program-of-record UGV producer sitting in Maine with no supplier ecosystem around it. Payload ' +
        'modules, autonomy software and power systems for the MOSA-designed Ripsaw family are the ' +
        'obvious adjacency, and the MOSA design is what makes third-party modules commercially possible. ' +
        'Cross-reference the SOCOM map’s white space on man-portable counter-UAS and autonomous resupply.',
      entryPoints: []
    },
    {
      id: 'anchor-tdy',
      code: 'TDY',
      tileColor: '#5b3f7a',
      name: 'Teledyne e2v, Brunswick Landing',
      category: 'anchor',
      cluster: ['space-high-latitude', 'cyber-software'],
      value: 'scope not confirmed',
      valueNote: 'Headcount, programs and site scope all unconfirmed',
      location: { town: 'Brunswick', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      confidence: 'gap',
      asOf: '2026-08',
      sourceIds: ['src-34'],
      openness: 'LOW',
      summary: 'Anchor tenant at Brunswick Landing. Defense electronics.',
      facts: [
        { label: 'Headcount', value: '', confidence: 'gap' },
        { label: 'Programs', value: '', confidence: 'gap' },
        { label: 'Site scope', value: '', confidence: 'gap' }
      ],
      programsAndDeals: [
        { text: 'Detail is a known gap. Headcount, programs and site scope are all unconfirmed and are listed in the verification gaps table.', confidence: 'gap' }
      ],
      vcRead:
        'Included because a defense electronics anchor tenant on the proposed hub site is materially ' +
        'relevant if the scope is real. Until the scope is confirmed, treat this node as a research ' +
        'task rather than a demand signal.',
      entryPoints: []
    },
    {
      id: 'anchor-ang',
      code: 'ANG',
      tileColor: '#2c5d82',
      name: 'Bangor Air National Guard, 101st Air Refueling Wing',
      category: 'anchor',
      cluster: ['space-high-latitude'],
      value: '$35.5M refueling 2023',
      valueNote: 'City of Bangor contract at Bangor International',
      location: { town: 'Bangor', lat: 44.8074, lng: -68.8281, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10'],
      openness: 'LOW',
      summary:
        'KC-135 refueling. Arctic-capable, supports the Greenland-Iceland-UK gap.',
      facts: [
        { label: 'Mission', value: 'KC-135 refueling, Arctic-capable, supports the Greenland-Iceland-UK gap', confidence: 'verified' },
        { label: 'Refueling contract', value: 'The City of Bangor holds a military aircraft refueling contract at Bangor International valued at $35.5M in 2023', confidence: 'verified' }
      ],
      programsAndDeals: [
        { text: 'Military aircraft refueling contract at Bangor International valued at $35.5M in 2023, held by the City of Bangor.', confidence: 'verified' }
      ],
      vcRead:
        'The high-latitude mission is the interesting part, not the refueling contract. Arctic and ' +
        'GIUK-gap operations are the operational context for cold-weather energy, high-latitude sensing ' +
        'and long-endurance UAS work that Loring can host physically. Treat Bangor as the mission ' +
        'rationale and Loring as the test venue.',
      entryPoints: []
    }
  ]
};
