/**
 * Section 5.5. Test and evaluation infrastructure.
 * Maine's genuine differentiator, with no equivalent section in the prior two maps.
 * The AFFF constraint renders inline on this section, not in a footnote.
 */
window.RoscData = window.RoscData || {};

window.RoscData.testAssets = {
  intro:
    'This section has no equivalent in the SOCOM or USSF maps. Maine’s test and qualification base is ' +
    'the one part of the formation chain where the state is genuinely ahead of its peers and genuinely ' +
    'underused by companies from outside Maine. Read the accreditation badge on each row before ' +
    'planning around it, because only one asset in the state is accredited.',

  assets: [
    {
      id: 'test-ascc',
      ecoRole: 'resources',
      name: 'UMaine ASCC',
      category: 'test-asset',
      cluster: ['composites-am', 'maritime-autonomy'],
      location: { town: 'Orono', lat: 44.9012, lng: -68.6698, precision: 'approximate' },
      accreditation: 'ISO 17025',
      accreditationNote: 'Accredited by the International Accreditation Service',
      tests: 'Structures, composites, large-format additive, ballistic protection, marine structures',
      accessRoute: 'Direct engagement, 500-plus existing clients',
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-35', 'src-22'],
      entryPoints: [ { value: 'umaine.edu', confidence: 'verified' } ],
      ref: 'inst-ascc',
      detail:
        'The only ISO 17025 accredited test capability in the state and the only one whose data will be ' +
        'accepted without argument by a federal customer. A 100,000 square foot facility valued at $110 ' +
        'million, with the world’s largest polymer 3D printer.'
    },
    {
      id: 'test-msc',
      ecoRole: 'resources',
      name: 'Maine Space Corporation test lab',
      category: 'test-asset',
      cluster: ['space-high-latitude'],
      location: { town: 'Hangar 5, Brunswick Landing', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      accreditation: 'UNACCREDITED',
      accreditationNote: 'Accreditation status is a known gap',
      contaminated: true,
      tests: 'Vibration, shock, environmental, electronics',
      accessRoute: '',
      accessGap: true,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-25', 'src-103', 'src-163', 'src-164', 'src-165'],
      entryPoints: [ { value: 'mainespacecorp.org', confidence: 'verified' } ],
      ref: 'inst-msc',
      detail:
        'Maine’s first space qualification testing facility, opened 2025. Sited in Hangar 5 at Brunswick ' +
        'Landing. Of roughly 6,300 gallons of AFFF concentrate found across the hangar complex after the ' +
        'August 2024 release (Hangar 5 alone held about 3,200 gallons, the most of any hangar), Hangars ' +
        '6 and 7 were cleared and retrofitted with non-PFAS suppression by April 2025. A state law signed ' +
        'May 2025 requires all AFFF use and storage at Brunswick Landing to end by January 1, 2026. ' +
        'Whether Hangar 5 itself, which houses this test lab, has been cleared is not independently ' +
        'confirmed. Both the accreditation status and the access route remain open gaps.'
    },
    {
      id: 'test-bxm',
      ecoRole: 'resources',
      name: 'Brunswick Executive Airport',
      category: 'test-asset',
      cluster: ['space-high-latitude', 'ugs', 'maritime-autonomy'],
      location: { town: 'Brunswick Landing', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      accreditation: 'N/A',
      contaminated: true,
      tests: 'UAS operations, autonomy trials, jet engine testing',
      accessRoute: 'MRRA',
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34'],
      entryPoints: [ { value: 'brunswicklanding.us', confidence: 'verified' } ],
      ref: 'inst-techplace',
      detail:
        'Two 8,000-foot former Navy runways, one active and one closed. 650,000 square feet of hangar ' +
        'and maintenance space. Established UAS operating procedures, 18 aerospace tenants and 27,000-plus ' +
        'annual flight operations. The hangar space counted here is the same hangar complex covered by ' +
        'the AFFF constraint below.'
    },
    {
      id: 'test-gom',
      ecoRole: 'resources',
      name: 'Gulf of Maine littorals',
      category: 'test-asset',
      cluster: ['maritime-autonomy', 'food-water-bio'],
      location: { town: 'Coastal', lat: 43.7, lng: -69.4, precision: 'approximate' },
      accreditation: 'N/A',
      tests: 'USV and UUV trials, sensing, over-water BVLOS corridors above Casco Bay',
      accessRoute: 'Varies',
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10'],
      ref: null,
      detail:
        'Open test water on the doorstep of both major yards, with over-water BVLOS corridors above ' +
        'Casco Bay. Access arrangements vary by location and use, so this is a capability rather than a ' +
        'single bookable facility.'
    },
    {
      id: 'test-loring',
      ecoRole: 'resources',
      name: 'Loring runways',
      category: 'test-asset',
      cluster: ['space-high-latitude', 'ugs'],
      location: { town: 'Limestone', lat: 46.95, lng: -67.8858, precision: 'approximate' },
      accreditation: 'N/A',
      tests: 'Long-endurance UAS, hypersonic test, cold weather',
      accessRoute: 'Loring Development Authority',
      openness: 'LOW',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-25', 'src-109'],
      entryPoints: [ { value: 'loring.org', confidence: 'verified' } ],
      ref: 'inst-loring',
      detail:
        'Two 12,100-foot runways, the longest in Maine, on 3,800 acres of former Air Force base with ' +
        'uncongested airspace. bluShift launched Stardust 1.0 from here in January 2021. Undeveloped as ' +
        'an innovation node rather than closed to one.'
    },
    {
      id: 'test-microgrid',
      ecoRole: 'resources',
      name: 'Brunswick Landing microgrid',
      category: 'test-asset',
      cluster: ['space-high-latitude', 'food-water-bio'],
      location: { town: 'Brunswick Landing', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      accreditation: 'N/A',
      contaminated: true,
      tests: 'Installation energy resilience',
      accessRoute: 'MRRA',
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34'],
      entryPoints: [ { value: 'brunswicklanding.us', confidence: 'verified' } ],
      ref: 'inst-techplace',
      detail:
        'An independent renewable-powered microgrid with its own fiber network. This is a live testbed ' +
        'for installation energy resilience work, which routes to the SOCOM map’s power and energy white ' +
        'space.'
    },
    {
      id: 'test-mma',
      ecoRole: 'resources',
      name: 'Maine Maritime Academy',
      category: 'test-asset',
      cluster: ['maritime-autonomy'],
      location: { town: 'Castine', lat: 44.3873, lng: -68.7998, precision: 'approximate' },
      accreditation: 'N/A',
      tests: 'Vessel operations, power plant and navigation simulators, diesel engine lab, liquid cargo simulation, research vessels',
      accessRoute: 'MMA',
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-32', 'src-47'],
      entryPoints: [ { value: 'mainemaritime.edu', confidence: 'verified' } ],
      ref: 'inst-mma',
      detail:
        'Simulators and research vessels usable for concept-of-operations work, plus the licensed ' +
        'mariners who will define what an uncrewed system has to satisfy operationally.'
    },
    {
      id: 'test-unh',
      ecoRole: 'resources',
      name: 'UNH deep-water engineering tank and wave tank',
      category: 'test-asset',
      cluster: ['maritime-autonomy'],
      location: { town: 'Durham, New Hampshire', lat: 43.1339, lng: -70.9264, precision: 'approximate' },
      accreditation: 'UNACCREDITED',
      accreditationNote: 'Accreditation status is a known gap',
      outOfState: true,
      tests: 'Ocean engineering, autonomous systems, ocean mapping',
      accessRoute: 'UNH',
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-32', 'src-133'],
      entryPoints: [ { value: 'marine.unh.edu', confidence: 'verified' } ],
      ref: null,
      detail:
        'Outside Maine and inside 100 miles, which matters because the OnRamp Hub criteria and any ' +
        'regional case are read on a radius rather than a state line. Accreditation status is a gap.'
    }
  ],

  afff: {
    label: 'MAINE CONSTRAINT',
    badge: 'CONTAMINATED',
    lead: 'The hangar space counted as a test asset above is the same hangar complex.',
    body:
      'On 19 August 2024 a fire suppression malfunction in Hangar 4 at Brunswick Landing discharged ' +
      'roughly 1,450 gallons of AFFF mixed with 50,000 gallons of water into stormwater drains, sewers ' +
      'and retention ponds. It was the largest accidental AFFF release in Maine’s history and among the ' +
      'largest nationally in three decades. EPA wrote to the Navy on 26 September 2024 stating the Navy ' +
      'retained ultimate responsibility under CERCLA and the NAS Brunswick federal facility agreement. ' +
      'MRRA drew public criticism from the Brunswick town council and state legislators over its ' +
      'handling. AFFF concentrate reportedly remained in Hangars 5 and 6. Current remediation status is ' +
      'a known gap.',
    confidence: 'verified',
    asOf: '2026-08',
    sourceIds: ['src-26', 'src-133'],
    entryPoints: [ { value: 'marine.unh.edu', confidence: 'verified' } ],
    affected: ['test-msc', 'test-bxm', 'test-microgrid']
  }
};
