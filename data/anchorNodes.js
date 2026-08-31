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

  filterCodes: ['All', 'BIW', 'PNSY', 'P&W', 'GD-OTS', 'TXT', 'TDY', 'ANG', 'SERE'],

  nodes: [
    {
      id: 'anchor-biw',
      ecoRole: 'market-access',
      majorDefenseCompany: true,
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
      sourceIds: ['src-10', 'src-30', 'src-31', 'src-32', 'src-89'],
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
      entryPoints: [
        { value: 'gdbiw.com', confidence: 'verified' }
      ]
    },
    {
      id: 'anchor-pnsy',
      ecoRole: 'market-access',
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
      sourceIds: ['src-07', 'src-08', 'src-09', 'src-05', 'src-153'],
      openness: 'HIGH',
      summary:
        'Overhaul and modernization of Los Angeles and Virginia class attack submarines. The Navy’s ' +
        'oldest continuously operating shipyard, and despite the name it sits in Kittery, Maine.',
      facts: [
        { label: 'Civilian employment', value: '7,721, up from 7,469 the prior year', confidence: 'verified', note: '2024 Seacoast Shipyard Association report.' },
        { label: 'Regional economic impact', value: '$1.6 billion, up from $1.54B in 2023 and $1.46B in 2022', confidence: 'verified', note: 'This is a Maine plus New Hampshire plus Massachusetts figure from a booster association, not a Navy Maine-only number.' },
        { label: 'Infrastructure', value: 'The $1.7B-plus Multi-Mission Dry Dock, the largest project to date under the Shipyard Infrastructure Optimization Program', confidence: 'verified' },
        { label: 'Policy position', value: 'Named in America’s Maritime Action Plan (February 2026) as a target for digital shipyard infrastructure investment', confidence: 'verified' },
        { label: 'Shipyard Commander', value: 'Capt. Jesse Nice', confidence: 'verified', note: '88th shipyard commander in PNSY’s 225-year history, relieved Capt. Michael Oberdorf on June 13, 2025.' }
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
      ecoRole: 'market-access',
      majorDefenseCompany: true,
      code: 'P&W',
      tileColor: '#4b4f63',
      name: 'Pratt & Whitney North Berwick',
      category: 'anchor',
      cluster: ['composites-am'],
      value: 'more than 2,100 workers',
      valueNote: 'AME tour page; other sources give a 2,000 to 2,300 range',
      location: { town: 'North Berwick', lat: 43.3037, lng: -70.7328, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-32', 'src-90', 'src-142', 'src-143'],
      openness: 'LOW',
      summary:
        'Operating as North Berwick Aero Systems (NBAS), the largest manufacturing plant in Maine under ' +
        'one roof at more than 1 million square feet, machining flight-critical jet engine components.',
      facts: [
        { label: 'Site', value: 'More than 1 million square feet, four business units: Repair Operations, Parts Center, Modular Assembly and Engineering Center', confidence: 'verified' },
        { label: 'Workforce', value: 'More than 2,100 workers', confidence: 'verified', note: 'Other sources give 2,000 to 2,300.' },
        { label: 'Specific programs', value: 'Roughly 1,200 part types across five classes (compressor stators, outer air seals, low pressure turbine blades, brush seals, bearing compartments); F135 engine (F-35) work is roughly 25 percent of production, alongside PurePower engine modules', confidence: 'verified' }
      ],
      programsAndDeals: [
        { text: '$216 million F-35 contract announced by Senator Collins’ office', confidence: 'verified' }
      ],
      vcRead:
        'Precision machining at scale with an aerospace quality system already in place. The relevance to ' +
        'a venture portfolio is as a contract manufacturing base rather than as a customer. Note the ' +
        'connection to DIU’s Blue Manufacturing initiative on the engagement and routing tab.',
      entryPoints: [
        { value: 'prattwhitney.com', confidence: 'verified' }
      ]
    },
    {
      id: 'anchor-gdots',
      ecoRole: 'market-access',
      majorDefenseCompany: true,
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
      sourceIds: ['src-27', 'src-33', 'src-11', 'src-91'],
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
      entryPoints: [
        { value: 'gd-ots.com', confidence: 'verified' }
      ]
    },
    {
      id: 'anchor-txt',
      ecoRole: 'market-access',
      majorDefenseCompany: true,
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
      sourceIds: ['src-12', 'src-13', 'src-92'],
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
      entryPoints: [
        { value: 'howeandhowe.com', confidence: 'verified' }
      ]
    },
    {
      id: 'anchor-tdy',
      ecoRole: 'market-access',
      majorDefenseCompany: true,
      code: 'TDY',
      tileColor: '#5b3f7a',
      name: 'Teledyne e2v, Brunswick Landing',
      category: 'anchor',
      cluster: ['space-high-latitude', 'cyber-software'],
      value: 'part-time office, not a manufacturing site',
      valueNote: 'Rents space from Maine Space Corporation; not an operating or manufacturing footprint',
      location: { town: 'Brunswick', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34', 'src-93', 'src-144'],
      openness: 'LOW',
      summary:
        'Rents a part-time office from the Maine Space Corporation at Brunswick Landing, focused on ' +
        'networking with higher education, R&D and commercial space-related entities, not manufacturing ' +
        'or operations.',
      facts: [
        { label: 'Headcount', value: '', confidence: 'gap' },
        { label: 'Footprint', value: 'Part-time office rented from Maine Space Corporation', confidence: 'verified' },
        { label: 'Purpose', value: 'Networking with higher education, R&D and commercial space-related entities', confidence: 'verified' }
      ],
      programsAndDeals: [
        { text: 'No manufacturing or operational program identified at this site; the footprint is an office presence rather than a demand signal.', confidence: 'verified' }
      ],
      vcRead:
        'The parent company is a genuine major defense electronics manufacturer, but this specific site is ' +
        'a small networking office, not a manufacturing or operational anchor. Its inclusion alongside ' +
        'Bath Iron Works, Pratt & Whitney, GD-OTS and Textron as an equally weighted "major defense ' +
        'company" anchor is worth revisiting now that the scope is confirmed rather than unknown.',
      entryPoints: [
        { value: 'teledyne-e2v.com', confidence: 'verified' }
      ]
    },
    {
      id: 'anchor-ang',
      ecoRole: 'market-access',
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
    },
    {
      id: 'anchor-sere',
      ecoRole: 'market-access',
      code: 'SERE',
      tileColor: '#5c4a2e',
      name: 'Navy SERE School',
      category: 'anchor',
      cluster: ['space-high-latitude'],
      value: '12,000 acres',
      valueNote: 'Redington Township field training site',
      location: { town: 'Redington Township', lat: 45.0151, lng: -70.4503, precision: 'approximate' },
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-86', 'src-87', 'src-88'],
      openness: 'LOW',
      summary:
        'The Navy’s only cold-weather Survival, Evasion, Resistance and Escape school, established 1961, ' +
        'field training on 12,000 acres near Rangeley.',
      facts: [
        { label: 'Established', value: '1961', confidence: 'verified' },
        { label: 'Program', value: 'SERE and Cold Weather Environmental Survival Training (CWEST), classroom instruction at Portsmouth Naval Shipyard in Kittery and field training in Redington Township', confidence: 'verified' },
        { label: 'Personnel trained', value: 'Almost 50,000 since 1962', confidence: 'stale', note: 'From a 2015 source. Confirm the current figure.' }
      ],
      programsAndDeals: [
        { text: '12-day cold-weather SERE and CWEST program, field training on 12,000 acres near Rangeley, classroom component at Portsmouth Naval Shipyard.', confidence: 'verified' }
      ],
      vcRead:
        'Not a demand signal. Included for completeness as a federal military presence on the corridor, ' +
        'not because it buys anything or hosts a formation-chain stage. If it has an angle at all it is ' +
        'adjacent to Bangor ANG’s cold-weather and high-latitude mission, not to any cluster in this map.',
      entryPoints: []
    }
  ]
};
