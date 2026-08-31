/**
 * Section 5.4. Ranked by openness to an outside company.
 * Where an entry point is a gap, the empty state renders. No contact string is
 * generated anywhere in this file.
 */
window.RoscData = window.RoscData || {};

window.RoscData.institutions = {
  highlight: {
    lead: 'MTI is the first call for any Maine-domiciled company.',
    body:
      'Every MTI instrument carries a 1:1 match requirement, which makes MTI a multiplier on outside ' +
      'capital rather than a competitor to it. The caveat that matters is that MTI is a funder and not a ' +
      'scouting or transition body. It has no equivalent of SOFWERX’s technology scouting, no IV&V role, ' +
      'and no route into a program office. For procurement navigation the parallel first call is the ' +
      'Maine APEX Accelerator, which is free.'
  },
  explainer: {
    lead: 'How to read this tab.',
    body:
      'In the SOCOM map the playbook tab lists buyers. None of these institutions buy anything. They ' +
      'sit on the formation chain instead, and each one moves a company one stage to the right. Openness ' +
      'rates how reachable the institution is for an outside company with no Maine history, not how ' +
      'important it is. A HIGH openness body with a small balance sheet is often more useful in the ' +
      'first ninety days than a MED body with a large one.'
  },

  items: [
    {
      id: 'inst-mti',
      ecoRole: 'capital',
      name: 'Maine Technology Institute (MTI)',
      short: 'MTI',
      category: 'institution',
      chainStage: 3,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-19', 'src-20', 'src-160'],
      location: { town: 'Brunswick', lat: 43.9145, lng: -69.9653, precision: 'approximate' },
      cluster: [],
      badge: 'START HERE',
      what:
        'Publicly funded nonprofit created by the Maine Legislature in 1999, with a 15-member board ' +
        'representing Maine’s seven targeted technology sectors plus state agency officials. It has ' +
        'awarded $372 million across more than 4,000 projects since founding.',
      facts: [
        { label: 'President', value: 'Brian Whitney', confidence: 'verified', note: 'More than 30 years in economic development and legislative work, has overseen deployment of more than $200M during his tenure.' },
        { label: 'Board interlock', value: 'Whitney also sits on the Maine Venture Fund board, Maine & Company, and the Maine Space Corporation', confidence: 'verified', note: 'This interlock is rendered in the chain view. It is the highest-leverage single relationship in the state.' },
        { label: 'Lifetime awards', value: '$372 million across more than 4,000 projects since founding', confidence: 'verified' },
        { label: 'FY25 core funding', value: '307 awards totaling $8.04 million, matched by $12.7 million from recipients', confidence: 'verified' },
        { label: 'Seven targeted sectors', value: 'Biotechnology, advanced composites and materials, environmental technology, marine and aquaculture, forestry and agriculture, precision manufacturing, information technology', confidence: 'verified' },
        { label: 'Location note', value: 'MTI opened a presence at Cloudport Coworking in Portland and has been seeking a northern Maine hub', confidence: 'verified' }
      ],
      programs: [
        { name: 'TechStart grants', terms: 'Up to $5,000, for investigating new technologies' },
        { name: 'Business Innovation Seed Grants', terms: '$5,000 to $50,000, capped at $50,000 per technology and $50,000 in any 24-month period per organization. 1:1 match required. Uses a VIRAL assessment (Venture Investment Readiness and Awareness Level) across eight areas.' },
        { name: 'Development Loans', terms: 'Up to $500,000, for commercialization. 1:1 match required.' },
        { name: 'Maine Technology Asset Fund (MTAF) 3.0', terms: 'Interest-free loans to for-profits, eligible for partial forgiveness up to 50 percent of the original amount, forgiveness awarded incrementally, 5-year repayment term starting from planned project completion. Initial funds anticipated Q1 2026.' },
        { name: 'Innovation Ecosystem Development Program (IEDP)', terms: '1:1 match, not currently accepting applications, next round expected early fall 2026. Contact named on MTI’s site as Tom Kittredge.' },
        { name: 'SBIR/STTR application assistance', terms: 'Free.' },
        { name: 'Expanding Maine’s Innovation Ecosystem', terms: 'Funding rounds summer 2024 and winter 2025.' }
      ],
      vcAngle:
        'MTI is the first call for any Maine-domiciled portfolio company and the 1:1 match requirement ' +
        'means Rosc capital directly unlocks state capital. Every MTI program requires a match, which ' +
        'makes MTI a multiplier on the fund rather than a competitor to it.',
      entryPoints: [
        { value: 'mainetechnology.org', confidence: 'verified' },
        { value: 'Brian Whitney, President', confidence: 'verified' },
        { value: 'Tom Kittredge, IEDP contact', confidence: 'verified' }
      ],
      entryGap: 'Named individual contacts beyond Whitney and Kittredge are not confirmed.'
    },
    {
      id: 'inst-techplace',
      ecoRole: 'resources',
      name: 'TechPlace at Brunswick Landing (MRRA)',
      short: 'TechPlace',
      category: 'institution',
      chainStage: 2,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-34', 'src-156'],
      location: { town: 'Brunswick', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      cluster: ['composites-am', 'food-water-bio'],
      what:
        'A 95,000 square foot incubator opened 2015, converted from an aircraft maintenance facility, ' +
        'with roughly 50,000 square feet rentable plus 45,000 shared. Shared machine shop, welding, ' +
        'composites layup and bioproduction.',
      facts: [
        { label: 'Parent', value: 'Midcoast Regional Redevelopment Authority, a public municipal corporation created by the Maine Legislature in 2007, governed by 11 trustees appointed by the Governor and confirmed by the Legislature', confidence: 'verified' },
        { label: 'Executive Director', value: 'Kristine Logan', confidence: 'unverified', note: 'MRRA opened a search for a new executive director in November 2024. Confirm before outreach.' },
        { label: 'Board Chair', value: 'Barry Woods', confidence: 'verified', note: '2026 board of trustees; Herman A. Nichols is vice chair, Barry Valentine is secretary.' },
        { label: 'Site', value: 'Roughly 3,200 acres, close to 2 million square feet of commercial and industrial space, more than 150 business entities, just under 3,000 jobs', confidence: 'verified' }
      ],
      vcAngle:
        'The cheapest way for a hardware company to exist in Maine, and the site of the proposed hub. ' +
        'MRRA’s eleven trustees are gubernatorial appointees, so read the political transition note ' +
        'before treating site access as durable. The AFFF release on this site is covered on the test ' +
        'infrastructure tab and is material to any lease decision.',
      entryPoints: [
        { value: 'brunswicklanding.us', confidence: 'verified' }
      ],
      entryGap: 'TechPlace manager not confirmed.'
    },
    {
      id: 'inst-ascc',
      ecoRole: 'innovation',
      name: 'UMaine Advanced Structures and Composites Center (ASCC)',
      short: 'ASCC',
      category: 'institution',
      chainStage: 1,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-35', 'src-22'],
      location: { town: 'Orono', lat: 44.9012, lng: -68.6698, precision: 'approximate' },
      cluster: ['composites-am', 'maritime-autonomy'],
      accreditation: 'ISO 17025',
      what:
        'Founded 1996 with NSF support by Dr. Habib Dagher, who remains founding Executive Director. ' +
        'A 100,000 square foot facility, ISO 17025 accredited by the International Accreditation ' +
        'Service, valued at $110 million, and designated a UMaine Signature Research Area in 2014.',
      facts: [
        { label: 'Founding Executive Director', value: 'Dr. Habib Dagher', confidence: 'verified', note: 'Holds 25 US and international patents with 8 pending. 2015 White House Transportation Champion of Change.' },
        { label: 'Staff', value: 'Roughly 180 annually including 140 undergraduate and graduate students. Other sources cite 150 full and part-time, and 260 faculty, staff and students.', confidence: 'unverified', note: 'Sources conflict. The range is rendered rather than a single figure.' },
        { label: 'Track record', value: '500-plus clients and partners globally, over 500 product development and testing projects in a five-year period', confidence: 'verified' },
        { label: 'Capability', value: 'World’s largest polymer 3D printer. Printed the 3Dirigo vessel and the world’s largest 3D-printed logistics vessels for Marine Corps Systems Command’s Advanced Manufacturing Operations Cell, working with DoD, USMC and Army ERDC.', confidence: 'verified' },
        { label: 'Other programs', value: 'The VolturnUS floating offshore wind platform, the Modular Ballistic Protection System (first approved by the US Army to protect troops in tents from blast and ballistic threats), and Bridge-in-a-Backpack composite arch bridges now in the AASHTO code', confidence: 'verified' },
        { label: 'Spinouts', value: 'Evergreen Additive (2025)', confidence: 'verified' }
      ],
      vcAngle:
        'This is the strongest single technical asset in the state and the only ISO 17025 accredited ' +
        'test capability. It spins out companies, which means it is a deal source and not only a service ' +
        'provider. Treat the spinout pipeline as the primary reason to hold the relationship and the ' +
        'test capability as the secondary one.',
      entryPoints: [
        { value: 'umaine.edu', confidence: 'verified' },
        { value: 'Habib Dagher, founding Executive Director', confidence: 'verified' }
      ],
      entryGap: 'Industry engagement contact not confirmed.'
    },
    {
      id: 'inst-roux',
      ecoRole: 'innovation',
      name: 'Roux Institute at Northeastern',
      short: 'Roux',
      category: 'institution',
      chainStage: 2,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-38', 'src-149'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: ['cyber-software', 'maritime-autonomy'],
      what:
        'Launched 2020 with a $100M founding gift. Runs a Founder Residency accelerator taking roughly ' +
        '10 startups per year for three months on the Portland campus, plus a ClimateTech Incubator and ' +
        'a Future of Healthcare residency.',
      facts: [
        { label: 'Focus areas', value: 'AI, digital engineering, advanced manufacturing, blue economy and climate', confidence: 'verified' },
        { label: 'Program history', value: 'Ended its Techstars partnership in 2023 and brought programming in house', confidence: 'verified' },
        { label: 'Director of Entrepreneurship', value: 'Chris Torina', confidence: 'verified', note: 'Also leads the Roux Institute’s National Security Innovation Hub.' }
      ],
      vcAngle:
        'The only accelerator in the state running a repeatable cohort with a defense-adjacent focus ' +
        'area list. Roughly 10 companies a year is small enough to review in full, which makes it a ' +
        'cheap deal-flow subscription rather than a competitive process to win.',
      entryPoints: [
        { value: 'roux.northeastern.edu', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-apex',
      ecoRole: 'market-access',
      name: 'Maine APEX Accelerator',
      short: 'APEX',
      category: 'institution',
      chainStage: 3,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-36', 'src-150'],
      location: { town: 'Statewide', lat: 44.6939, lng: -69.3819, precision: 'approximate' },
      cluster: [],
      what:
        'DLA-funded procurement technical assistance, with statewide counselors hosted across regional ' +
        'development organizations including NMDC (Aroostook), AVCOG and Sunrise County Economic Council. ' +
        'The program itself is run by EMDC, already covered elsewhere in this document.',
      facts: [
        { label: 'Services', value: 'SAM registration, solicitation analysis, certification guidance (HUBZone, WOSB), bid preparation, post-award contract management, and help exploring SBIR and DoD R&D opportunities', confidence: 'verified' },
        { label: 'Claimed reach', value: 'Over 100 free workshops and more than $3.02 billion in assistance', confidence: 'unverified', note: 'Self-reported.' },
        { label: 'Director', value: 'Miranda Pelkey', confidence: 'verified', note: 'In the role since May 2025; joined Maine APEX in 2020.' }
      ],
      vcAngle:
        'Free, and it does the unglamorous registration and compliance work that kills first-time ' +
        'federal applicants. Route every portfolio company here before they touch a solicitation. This ' +
        'is Maine’s closest functional analogue to the start here role SOFWERX plays in the SOCOM map, ' +
        'though it is procurement navigation only, with no technology scouting or IV&V.',
      entryPoints: [
        { value: 'maineapex.com', confidence: 'verified' },
        { value: 'Dana Delano, Aroostook, via NMDC', confidence: 'verified' },
        { value: 'Peter Wilkens, via AVCOG', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-cmgc',
      ecoRole: 'innovation',
      name: 'Central Maine Growth Council',
      short: 'CMGC',
      category: 'institution',
      chainStage: 3,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-39'],
      location: { town: 'Waterville', lat: 44.5521, lng: -69.6317, precision: 'approximate' },
      cluster: [],
      what:
        'Holds Maine’s SBA Federal and State Technology (FAST) Partnership Program award, which funds ' +
        'work to increase SBIR/STTR proposal volume and quality in undercapitalized regions. Runs an ' +
        'SBIR Resource Center.',
      facts: [],
      vcAngle:
        'The FAST award is the only dedicated instrument in the state aimed at raising SBIR proposal ' +
        'volume, and Maine’s annual SBIR and STTR award total in dollars is itself an open gap. Use ' +
        'CMGC to close that gap as well as to prepare proposals.',
      entryPoints: [
        { value: 'centralmaine.org', confidence: 'verified' }
      ],
      entryGap: 'Named contact not confirmed.'
    },
    {
      id: 'inst-mvf',
      ecoRole: 'capital',
      name: 'Maine Venture Fund',
      short: 'MVF',
      category: 'capital',
      chainStage: 6,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-17', 'src-18', 'src-21', 'src-37', 'src-162'],
      location: { town: 'Newport', lat: 44.8362, lng: -69.2745, precision: 'approximate' },
      cluster: [],
      what:
        'Legally the Small Enterprise Growth Fund, doing business as Maine Venture Fund. Created by the ' +
        '117th Maine Legislature in 1995-96 and investing since 1997. Evergreen structure with returns ' +
        'recycled. This is the state’s only institutional venture vehicle.',
      facts: [
        { label: 'Managing Director', value: 'Joe Powers, who took over from John Burns', confidence: 'unverified', note: 'Confirm Powers is still in seat. Powers is a Middlebury graduate with a Tuck MBA, previously founder of Ripso LLC, senior manager of operations at Zoox, and director of business development at Clean Marine Energy, and worked on Tesla’s first electric vehicle. Burns continues as a strategic advisor.' },
        { label: 'Capitalization', value: '$19.5 million in state capital contributions', confidence: 'verified', note: 'Legislative testimony and Maine Venture Fund’s own 2025 year-in-review post converge on $19.5M. Two outlying figures found earlier ($13M and $25.2M) are not reflected here and may describe a different point in time or a different accounting basis (e.g. cumulative fund investment rather than state contributions).' },
        { label: 'Scale', value: 'More than 365 co-investors leveraging $196.6 million. 11-member board. More than 900 applications.', confidence: 'verified' },
        { label: '2025 activity', value: '$3.3M deployed across 13 new portfolio companies in 2025, driven partly by access to FAME’s federal Grow Maine program, which is likely to sunset in 2026. Total portfolio stood at 69 companies as of the 2025 year-in-review.', confidence: 'verified' },
        { label: 'Growth goal', value: 'Aims to grow assets under management to $100 million by May 2034', confidence: 'verified' },
        { label: 'Typical position', value: 'Roughly $400,000 over time', confidence: 'verified', note: 'This figure is the reason stage 6 of the formation chain breaks.' },
        { label: 'Portfolio', value: 'Sea Bags, Gelato Fiasco, MedRhythms, Defendify, HighByte, Hyperlite, Maine Craft Distilling, R.E.D.D., Cerahelix', confidence: 'verified' },
        { label: 'Board interlock', value: 'Brian Whitney, MTI President, sits on the Maine Venture Fund (MVF) board', confidence: 'verified' }
      ],
      vcAngle:
        'A useful co-investor and an excellent source of local diligence, and not a lead for a hardware ' +
        'round. At roughly $400,000 over time MVF is two orders of magnitude below what a maritime ' +
        'autonomy or advanced manufacturing company needs to reach a program of record. Its real value ' +
        'to Rosc is the co-investor network of 365-plus and the institutional memory.',
      entryPoints: [
        { value: 'maineventurefund.com', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-angels',
      ecoRole: 'capital',
      name: 'Maine Angels',
      short: 'Maine Angels',
      category: 'capital',
      chainStage: 6,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-17', 'src-101'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: [],
      what:
        'Angel group active since 2003, with more than $41M into 100-plus companies. Portfolio includes ' +
        'Tilson Technology, HighByte and CourseStorm.',
      facts: [],
      vcAngle:
        'The practical bridge between MTI grants and any institutional round, and a fast way to read ' +
        'whether a Maine company has local conviction behind it.',
      entryPoints: [
        { value: 'maineangels.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-cei',
      ecoRole: 'capital',
      name: 'CEI Ventures',
      short: 'CEI Ventures',
      category: 'capital',
      chainStage: 6,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-102'],
      location: { town: 'Brunswick', lat: 43.9145, lng: -69.9653, precision: 'approximate' },
      cluster: [],
      what:
        'Wholly owned subsidiary of Coastal Enterprises Inc. (CEI), a Brunswick-based CDFI. Manages ' +
        'socially responsible venture funds.',
      facts: [],
      vcAngle:
        'A CDFI-affiliated fund carries mandate constraints that a defense hardware company may not ' +
        'satisfy. Worth a conversation on mission-aligned dual-use, not on weapons-adjacent hardware.',
      entryPoints: [
        { value: 'ceimaine.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-bigelow',
      ecoRole: 'innovation',
      name: 'Bigelow Laboratory for Ocean Sciences',
      short: 'Bigelow',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-23'],
      location: { town: 'East Boothbay', lat: 43.8459, lng: -69.6072, precision: 'approximate' },
      cluster: ['food-water-bio', 'maritime-autonomy'],
      what:
        'Houses the National Center for Marine Algae and Microbiota, the Tandy Center for Ocean ' +
        'Forecasting, and the Center for Seafood Solutions. Launched the Blue Biotech Innovation ' +
        'Ecosystem in October 2025 with MTI seed funding, Hatch Blue and Ocean House Consulting.',
      facts: [
        { label: 'President, CEO and senior research scientist', value: 'Deborah Bronk', confidence: 'verified' },
        { label: 'VP for Research', value: 'Beth Orcutt', confidence: 'unverified' }
      ],
      vcAngle:
        'The origin point for the most differentiated cluster on the map and the one with essentially no ' +
        'defense-side companies in it. The Blue Biotech Innovation Ecosystem is a formation vehicle that ' +
        'already exists and already has MTI money in it, so the marginal cost of pointing it at defense ' +
        'use cases is low.',
      entryPoints: [
        { value: 'bigelow.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-msc',
      ecoRole: 'policy',
      name: 'Maine Space Corporation',
      short: 'Maine Space Corp',
      category: 'institution',
      chainStage: 4,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-25', 'src-103', 'src-166', 'src-167', 'src-168', 'src-171'],
      location: { town: 'Brunswick', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      cluster: ['space-high-latitude'],
      what:
        'Quasi-state body created by the Legislature in 2022, headquartered in Hangar 5 at Brunswick ' +
        'Landing. Operates the state’s first space qualification testing facility, opened 2025, with ' +
        'vibration, shock, environmental and electronics testing equipment.',
      facts: [
        { label: 'Executive Director', value: 'Terry Shehata', confidence: 'unverified' },
        { label: 'Coalition', value: 'Led a 50-plus organization NSF Regional Innovation Engines proposal with New Hampshire, targeting the small satellite and Earth observation value chain. The application advanced within NSF’s second Engines competition; final award status is unconfirmed.', confidence: 'unverified', note: 'A separate, unrelated NSF Engines proposal, the Seafood Engine in New England (University of Maine partner, fisheries and aquaculture focus, not led by Maine Space Corporation), won a confirmed $15M NSF Engines award in 2026. That coalition list is still a ready-made letters-of-support roster.' },
        { label: 'Funding', value: 'A two-year $426,000 MTI grant plus $29,000 from the Maine Space Grant Consortium. Recently filed for 501(c)(3) status.', confidence: 'verified' },
        { label: 'Site note', value: 'Headquartered in Hangar 5, which is the hangar complex covered by the AFFF constraint on the test infrastructure tab', confidence: 'verified' },
        { label: 'Ground station interest', value: 'SpaceX has filed with the FCC to build or upgrade Starlink E-band gateway capability at roughly 21 US sites, including one in Brunswick, Maine', confidence: 'verified', note: 'Confirmed by trade press covering the FCC filing. Not confirmed to be affiliated with Maine Space Corporation specifically; included here as the closest space-sector entity on the map.' }
      ],
      vcAngle:
        'Two things worth having, and neither is launch. The qualification test lab is a real asset for ' +
        'any hardware company, and the 50-plus organization NSF Engines coalition list is a ready-made ' +
        'letters-of-support roster for an OnRamp Hub bid or a federal proposal. The organization itself ' +
        'is thinly funded and newly incorporated, so treat it as a partner, not a backer.',
      entryPoints: [
        { value: 'mainespacecorp.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-mma',
      ecoRole: 'human-capital',
      name: 'Maine Maritime Academy',
      short: 'MMA',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-32', 'src-47', 'src-151', 'src-158'],
      location: { town: 'Castine', lat: 44.3873, lng: -68.7998, precision: 'approximate' },
      cluster: ['maritime-autonomy', 'workforce-education'],
      what:
        'Licensed mariners, marine engineering, naval architecture and vessel operations. Research ' +
        'vessels, marine science and engineering laboratories, power-plant and navigation simulators, a ' +
        'diesel-engine laboratory, and liquid-cargo simulation.',
      facts: [
        { label: 'Brunswick Landing presence', value: 'The 50,000 square foot Maritime Industrial Workforce Training Center, in the former Wayfair building, opened with an event on October 24, 2025 alongside Maine Space Corporation. Will house the Bath Iron Works Apprentice School and the Region 10 Technical High School engineering and architectural design program.', confidence: 'verified' },
        { label: 'President', value: 'Craig Johnson', confidence: 'verified', note: 'MMA class of 1991, named the Academy’s 16th president, effective March 19, 2025.' }
      ],
      vcAngle:
        'The crewed-operations counterpart to any uncrewed maritime thesis. Simulators and research ' +
        'vessels are a cheap test environment, and licensed mariners are the people who will write the ' +
        'concept of operations a USV has to satisfy.',
      entryPoints: [
        { value: 'mainemaritime.edu', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-mdia',
      ecoRole: 'human-capital',
      name: 'Maine Defense Industry Alliance (MDIA)',
      short: 'MDIA',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-41', 'src-104', 'src-148'],
      location: { town: 'Statewide', lat: 44.3, lng: -69.6, precision: 'approximate' },
      cluster: [],
      what:
        'Founded 2024 as a workforce coordination body spanning industry, education and state government. ' +
        'Founding members include the University of Maine System, Maine Community College System, Maine ' +
        'Maritime Academy, Roux Institute, Maine DECD, Maine Department of Labor, Maine Department of ' +
        'Education and Maine International Trade Center.',
      facts: [
        { label: 'Funding raised', value: '$5M from the Navy’s submarine industrial base program, executed via BlueForge Alliance, which went to York County Community College for a 10,000 square foot welding lab and trades expansion', confidence: 'verified' },
        { label: 'Workforce need addressed', value: '1,200 to 1,700 skilled workers annually, more than 7,500 openings across the big three over five years', confidence: 'verified' },
        { label: 'Executive Director', value: 'Andy Roy', confidence: 'verified' },
        { label: 'Program Director', value: 'Mark Winter', confidence: 'verified', note: 'MDIA’s first program director. Retired US Navy Captain (30 years), previously Commandant of Midshipmen and Vice President of Student Affairs at Maine Maritime Academy.' }
      ],
      scopeNote:
        'MDIA is workforce only. It does no technology scouting and no transition work. That distinction ' +
        'is the basis for the non-duplication argument, because nothing in Maine currently performs the ' +
        'scouting or transition function that stage 7 of the formation chain is missing.',
      vcAngle:
        'Useful as a coalition partner and as the counterparty for any thesis that adds labor demand. ' +
        'A venture case that increases hiring pressure without addressing supply will meet resistance ' +
        'here and at the community colleges.',
      entryPoints: [
        { value: 'mainedefenseindustryalliance.com', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-mep',
      ecoRole: 'resources',
      name: 'Maine Manufacturing Extension Partnership (Maine MEP)',
      short: 'Maine MEP',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-32', 'src-105'],
      location: { town: 'Statewide', lat: 44.5, lng: -69.7, precision: 'approximate' },
      cluster: ['shipyard-ai'],
      what:
        'NIST MEP affiliate. Roughly $1.16M per year, serving roughly 1,000 manufacturers. Previously ' +
        'conducted a defense industrial base supplier survey for the state.',
      facts: [
        { label: 'Budget and reach', value: 'Roughly $1.16M per year, serving roughly 1,000 manufacturers', confidence: 'unverified', note: 'From the First Light Works bid.' },
        { label: 'Executive Director', value: 'Rod Rodrigue', confidence: 'verified', note: 'President of Maine MEP since 1997.' }
      ],
      vcAngle:
        'The supplier survey is the interesting asset. It is the closest thing Maine has to a mapped ' +
        'industrial base and it is the natural starting dataset for any shipyard sustainment or ' +
        'industrial AI company looking for design partners.',
      entryPoints: [
        { value: 'mainemep.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-loring',
      ecoRole: 'policy',
      name: 'Loring Development Authority / Loring Commerce Centre',
      short: 'Loring',
      category: 'institution',
      chainStage: 4,
      openness: 'LOW',
      opennessNote: 'Undeveloped, not closed',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-25', 'src-109', 'src-152'],
      location: { town: 'Limestone', lat: 46.95, lng: -67.8858, precision: 'approximate' },
      cluster: ['space-high-latitude'],
      what:
        'The former Loring AFB in Aroostook County. 3,800 acres, two 12,100-foot runways which are the ' +
        'longest in Maine, the Cold War arch hangar, and DFAS Limestone, one of five DFAS sites ' +
        'nationally.',
      facts: [
        { label: 'Planning funding', value: '$740,000 DoD grant matched by $85,000 from Maine DECD for airport master planning, energy resiliency and workforce assessment', confidence: 'verified' },
        { label: 'Flight heritage', value: 'bluShift launched Stardust 1.0 from here in January 2021', confidence: 'verified' },
        { label: 'President and CEO', value: 'Jonathan Judkins', confidence: 'verified', note: 'In the role since January 1, 2024, succeeding longtime president Carl Flora.' },
        { label: 'Recent use', value: 'Hosted Operation Northern Phoenix, a National Guard exercise, in June 2026', confidence: 'verified' }
      ],
      vcAngle:
        'For long-endurance UAS, hypersonic test and cold-weather trials, Loring offers uncongested ' +
        'airspace and runway length Brunswick cannot. It also sits in Maine’s second congressional ' +
        'district, which matters politically. Currently unbuilt as an innovation node.',
      entryPoints: [
        { value: 'loring.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-maineco',
      ecoRole: 'market-access',
      name: 'Maine & Co',
      short: 'Maine & Co',
      category: 'institution',
      chainStage: 2,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-10', 'src-106', 'src-155'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: [],
      what:
        'Private nonprofit corporate attraction organization with three decades of confidential no-cost ' +
        'site selection and expansion services. Its board and membership are drawn from senior ' +
        'executives of Maine companies, the Maine State Chamber, the DECD Commissioner (Michael Duguay ' +
        'as of 2026) and university presidents.',
      facts: [
        { label: 'President and CEO', value: 'Peter DelGreco', confidence: 'verified', note: 'President since 2012, joined Maine & Co. in 2004.' }
      ],
      vcAngle:
        'The single point of contact into Maine’s corporate and public leadership, and it is free and ' +
        'confidential. Use it for the relocation or expansion conversation rather than for capital. ' +
        'Note the Brian Whitney interlock, since he also sits here.',
      entryPoints: [
        { value: 'maineco.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-dirigo',
      ecoRole: 'innovation',
      name: 'Dirigo Labs',
      short: 'Dirigo Labs',
      category: 'institution',
      chainStage: 2,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-39', 'src-107', 'src-140'],
      location: { town: 'Waterville', lat: 44.5521, lng: -69.6317, precision: 'approximate' },
      cluster: [],
      what:
        'Regional startup accelerator operated by the Central Maine Growth Council, opened its inaugural ' +
        'cohort in February 2022. A 12-week accelerator plus the Dirigo Launch Incubator, an 8-week ' +
        'virtual program for ideation-stage startups.',
      facts: [
        { label: 'Track record', value: '$14.6 million in total alumni sales and more than $21 million in capital raised by alumni companies over its first four years, plus 150 jobs created', confidence: 'verified' },
        { label: 'Operator', value: 'Central Maine Growth Council, which also holds the FAST award described elsewhere in this document', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'dirigolabs.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-mce',
      ecoRole: 'innovation',
      name: 'Maine Center for Entrepreneurs (Top Gun program)',
      short: 'MCE Top Gun',
      category: 'institution',
      chainStage: 2,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-110', 'src-141'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: [],
      what:
        'Runs the 15-week Top Gun founder training program, begun in 2009 with a single Portland cohort ' +
        'of 12 entrepreneurs. Matches founders with volunteer mentors and ends in a showcase pitch event ' +
        'in front of more than 200 business leaders and potential investors.',
      facts: [
        { label: 'Track record', value: 'More than 370 Maine entrepreneurs served since 2009', confidence: 'verified' },
        { label: 'Reach', value: 'Cohorts have run in Portland, Lewiston Auburn, Waterville, Brunswick, Rockland and Bangor', confidence: 'verified' },
        { label: '2026 partner', value: 'Northern Maine Development Commission co-announced the 2026 Top Gun class', confidence: 'verified', note: 'NMDC also hosts a Maine APEX Accelerator counselor, covered elsewhere in this document.' }
      ],
      entryPoints: [
        { value: 'mced.biz', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-mam',
      ecoRole: 'community-building',
      name: 'Manufacturers Association of Maine',
      short: 'MAME',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-108'],
      location: { town: 'Statewide', lat: 44.4, lng: -69.5, precision: 'approximate' },
      cluster: [],
      what:
        'Nonpartisan 501(c)(6) trade association serving more than 200 Maine manufacturers, originally a ' +
        'small group of metal products companies that traveled New England together for contract work. ' +
        'Renamed from that narrower identity after an early-2000s Maine Department of Labor analysis found ' +
        'the membership had diversified well beyond metal products.',
      facts: [
        { label: 'Advocacy focus', value: 'Workforce development, taxation, human resources and wage and hour rules, and energy', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'mainemfg.com', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-gmri',
      ecoRole: 'innovation',
      name: 'Gulf of Maine Research Institute',
      short: 'GMRI',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-114'],
      location: { town: 'Portland', lat: 43.6489, lng: -70.2496, precision: 'approximate' },
      cluster: ['maritime-autonomy', 'food-water-bio'],
      what:
        'Ocean science and marine resource research at a 44,000 square foot facility at Union Wharf, ' +
        'opened 2005. Its Sam L. Cohen Center for Interactive Learning, opened 2006, runs LabVenture, a ' +
        'hands-on marine science program that has reached more than 170,000 Maine 5th and 6th graders ' +
        'since launch, free of charge to every school in the state.',
      facts: [
        { label: 'President and CEO', value: 'Glenn Prickett', confidence: 'verified', note: 'Joined September 2023.' }
      ],
      entryPoints: [
        { value: 'gmri.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-island',
      ecoRole: 'community-building',
      name: 'Island Institute',
      short: 'Island Institute',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-115'],
      location: { town: 'Rockland', lat: 44.1037, lng: -69.1089, precision: 'approximate' },
      cluster: ['food-water-bio'],
      what:
        '41-year-old nonprofit building the resilience of Maine’s island and remote coastal communities ' +
        'through education, employment access, and infrastructure support for broadband, transportation ' +
        'and climate adaptation.',
      facts: [
        { label: 'Fellowship program', value: 'More than 158 fellows placed across 35 communities over 25 years, contributing over 500,000 hours of direct community support', confidence: 'verified' },
        { label: 'Community Impact Fund', value: 'More than $2 million invested in island and coastal communities since 2017', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'islandinstitute.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-mdibl',
      ecoRole: 'innovation',
      name: 'MDI Biological Laboratory',
      short: 'MDIBL',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-116'],
      location: { town: 'Bar Harbor', lat: 44.4262, lng: -68.3095, precision: 'approximate' },
      cluster: ['food-water-bio'],
      what:
        'Independent biomedical research institute founded in 1898, one of the oldest in the country. ' +
        'Ten year-round research labs plus visiting summer scientists study tissue regeneration and aging ' +
        'using non-mammalian models (Drosophila, C. elegans, axolotl, zebrafish, killifish), aimed at heart ' +
        'disease, diabetes, cancer and neurodegenerative disease.',
      facts: [
        { label: 'Recognition', value: 'NIH-designated Center of Biomedical Research Excellence since 2013', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'mdibl.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-darling',
      ecoRole: 'innovation',
      name: 'Darling Marine Center',
      short: 'Darling',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-117'],
      location: { town: 'Walpole', lat: 43.9356, lng: -69.5786, precision: 'approximate' },
      cluster: ['maritime-autonomy', 'food-water-bio'],
      what:
        'UMaine’s marine laboratory on the Damariscotta River, founded 1965 on a 127-acre farm donated by ' +
        'Ira C. Darling. Now 170 acres with 2 kilometers of river frontage, a 64-bed dormitory and a ' +
        'shellfish hatchery.',
      facts: [
        { label: 'Population', value: 'About 50 year-round, growing past 100 in summer with interns, course participants and visiting scientists', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'dmc.umaine.edu', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-smcc',
      ecoRole: 'human-capital',
      name: 'Southern Maine Community College',
      short: 'SMCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-45', 'src-85'],
      location: { town: 'Brunswick', lat: 43.8923, lng: -69.9386, precision: 'approximate' },
      cluster: ['maritime-autonomy', 'composites-am', 'workforce-education'],
      what:
        'Community college with a Midcoast campus at Brunswick Landing, part of the seven-college Maine ' +
        'Community College System. Runs a Marine Design Short-Term Training program in partnership with ' +
        'General Dynamics Bath Iron Works, and hosts the Composite Science and Manufacturing program at ' +
        'the Maine Advanced Technology and Engineering Center on the same campus.',
      facts: [],
      entryPoints: [
        { value: 'smccme.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-yccc',
      ecoRole: 'human-capital',
      name: 'York County Community College',
      short: 'YCCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-41', 'src-46'],
      location: { town: 'Wells', lat: 43.3223, lng: -70.5806, precision: 'approximate' },
      cluster: ['workforce-education'],
      what:
        'Recipient of the MDIA-raised $5M submarine industrial base funding, executed via BlueForge ' +
        'Alliance, for a 10,000 square foot welding lab and trades expansion. Part of the Maine ' +
        'Community College System.',
      facts: [],
      entryPoints: [
        { value: 'yccc.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-bowdoin',
      ecoRole: 'human-capital',
      name: 'Bowdoin College',
      short: 'Bowdoin',
      category: 'institution',
      chainStage: 1,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-48'],
      location: { town: 'Brunswick', lat: 43.9075, lng: -69.9628, precision: 'approximate' },
      cluster: ['cyber-software', 'workforce-education'],
      what: 'Liberal arts college adjacent to Brunswick Landing.',
      facts: [],
      entryPoints: [
        { value: 'bowdoin.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-sbdc',
      ecoRole: 'resources',
      name: 'Maine SBDC',
      short: 'Maine SBDC',
      category: 'institution',
      chainStage: 2,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-40', 'src-139'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: [],
      what:
        'Small Business Development Centers providing free business advising statewide, an SBA program ' +
        'run jointly with Maine DECD. Hosted by the University of Southern Maine and the Androscoggin ' +
        'Valley Council of Governments, plus the Northern Maine Development Commission, already covered ' +
        'elsewhere in this document.',
      facts: [],
      entryPoints: [
        { value: 'mainesbdc.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-msgc',
      ecoRole: 'innovation',
      name: 'Maine Space Grant Consortium',
      short: 'MSGC',
      category: 'institution',
      chainStage: 3,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-25', 'src-113', 'src-157'],
      location: { town: 'Augusta', lat: 44.3106, lng: -69.7795, precision: 'approximate' },
      cluster: ['space-high-latitude'],
      what:
        'NASA Space Grant consortium for Maine. Provided $29,000 alongside the two-year $426,000 MTI ' +
        'grant that funds the Maine Space Corporation.',
      facts: [{ label: 'Executive Director', value: 'Dr. Jeremy Qualls', confidence: 'verified', note: 'Also directs NASA Maine EPSCoR.' }],
      entryPoints: [
        { value: 'msgc.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-emdc',
      ecoRole: 'community-building',
      name: 'Eastern Maine Development Corporation',
      short: 'EMDC',
      category: 'institution',
      chainStage: 2,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-111'],
      location: { town: 'Bangor', lat: 44.8016, lng: -68.7712, precision: 'approximate' },
      cluster: [],
      what:
        'Private nonprofit economic development organization founded 1967, serving Hancock, Penobscot and ' +
        'Piscataquis Counties plus part of Waldo County, almost 11,000 square miles and Maine’s largest ' +
        'economic development district.',
      facts: [
        { label: 'Programs', value: 'SBA 7(a) Community Advantage loans up to $250,000, SBA 504 loans up to $5 million, and WIOA-funded workforce development including career navigation and apprenticeships', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'emdc.org', confidence: 'verified' }
      ]
    },
    {
      id: 'inst-nmdc',
      ecoRole: 'community-building',
      name: 'Northern Maine Development Commission',
      short: 'NMDC',
      category: 'institution',
      chainStage: 2,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-36', 'src-112'],
      location: { town: 'Caribou', lat: 46.8606, lng: -68.0117, precision: 'approximate' },
      cluster: [],
      what:
        'Regional development commission for Aroostook County, and host of a Maine APEX Accelerator ' +
        'counselor.',
      facts: [
        { label: 'APEX counselor', value: 'Dana Delano, Aroostook', confidence: 'verified' }
      ],
      entryPoints: [
        { value: 'nmdc.org', confidence: 'verified' },
        { value: 'Dana Delano, APEX counselor, Aroostook', confidence: 'verified' }
      ]
    },

    /* Education and workforce pipeline, added on request. Colleges, community
       colleges and the organizations that route people into employers rather
       than into any specific technology. Chain stage 5 follows the precedent
       already set by SMCC and YCCC above, the closest existing stage to
       workforce output. Confidence is verified because what each record
       claims is limited to name, location, type and official website, all
       confirmed against the institution's own site. */
    {
      id: 'inst-umaine',
      ecoRole: 'human-capital',
      name: 'University of Maine',
      short: 'UMaine',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-49'],
      location: { town: 'Orono', lat: 44.9012, lng: -68.6698, precision: 'approximate' },
      cluster: ['workforce-education'],
      what:
        'Flagship of the University of Maine System, in Orono. Engineering, computing and marine science ' +
        'degree programs feed the same workforce pipeline as the ASCC research center on the same campus, ' +
        'listed separately.',
      facts: [],
      entryPoints: [
        { value: 'umaine.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-usm',
      ecoRole: 'human-capital',
      name: 'University of Southern Maine',
      short: 'USM',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-50', 'src-82'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: ['composites-am', 'workforce-education'],
      what:
        'University of Maine System campus with locations in Portland, Gorham and Lewiston. ABET-accredited ' +
        'mechanical and industrial engineering on the Gorham campus, and host to the Composite Engineering ' +
        'Research Laboratory, a Maine Composites Alliance collaboration doing applied manufacturing and ' +
        'process work for the state’s composites industry.',
      facts: [],
      entryPoints: [
        { value: 'usm.maine.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-uma',
      ecoRole: 'human-capital',
      name: 'University of Maine at Augusta',
      short: 'UMA',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-51', 'src-83', 'src-84'],
      location: { town: 'Augusta', lat: 44.3106, lng: -69.7795, precision: 'approximate' },
      cluster: ['cyber-software', 'workforce-education'],
      what:
        'University of Maine System campus in the state capital, with a second location in Bangor. Its ' +
        'cybersecurity program has held the NSA Center of Academic Excellence in Cyber Defense Education ' +
        'designation since 2014, and it launched a cybersecurity apprenticeship with the Maine Department ' +
        'of Labor in 2023.',
      facts: [],
      entryPoints: [
        { value: 'uma.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-bates',
      ecoRole: 'human-capital',
      name: 'Bates College',
      short: 'Bates',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-55'],
      location: { town: 'Lewiston', lat: 44.1004, lng: -70.2148, precision: 'approximate' },
      cluster: ['workforce-education'],
      what: 'Liberal arts college in Lewiston, part of the Colby-Bates-Bowdoin consortium.',
      facts: [],
      entryPoints: [
        { value: 'bates.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-colby',
      ecoRole: 'human-capital',
      name: 'Colby College',
      short: 'Colby',
      category: 'institution',
      chainStage: 5,
      openness: 'MED',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-56'],
      location: { town: 'Waterville', lat: 44.5520, lng: -69.6317, precision: 'approximate' },
      cluster: ['workforce-education'],
      what: 'Liberal arts college in Waterville, part of the Colby-Bates-Bowdoin consortium.',
      facts: [],
      entryPoints: [
        { value: 'colby.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-cmcc',
      ecoRole: 'human-capital',
      name: 'Central Maine Community College',
      short: 'CMCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-57'],
      location: { town: 'Auburn', lat: 44.0979, lng: -70.2312, precision: 'approximate' },
      cluster: ['composites-am', 'workforce-education'],
      what:
        'Community college in Auburn, part of the Maine Community College System. Runs a Precision ' +
        'Machining Technology program, manual and CNC lathes, mills and grinders, through an associate ' +
        'degree and an advanced certificate.',
      facts: [],
      entryPoints: [
        { value: 'cmcc.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-emcc',
      ecoRole: 'human-capital',
      name: 'Eastern Maine Community College',
      short: 'EMCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-58'],
      location: { town: 'Bangor', lat: 44.8016, lng: -68.7712, precision: 'approximate' },
      cluster: ['composites-am', 'workforce-education'],
      what:
        'Community college in Bangor, part of the Maine Community College System. Runs Welding ' +
        'Technology and Precision Machining programs covering manual and CNC machining and manufacturing ' +
        'processes.',
      facts: [],
      entryPoints: [
        { value: 'emcc.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-kvcc',
      ecoRole: 'human-capital',
      name: 'Kennebec Valley Community College',
      short: 'KVCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-59'],
      location: { town: 'Fairfield', lat: 44.5887, lng: -69.5978, precision: 'approximate' },
      cluster: ['composites-am', 'workforce-education'],
      what:
        'Community college with campuses in Fairfield and Hinckley, part of the Maine Community College ' +
        'System. Runs a Precision Machining Technology program with stackable Machinist and CNC Operator ' +
        'certificates.',
      facts: [],
      entryPoints: [
        { value: 'kvcc.me.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-nmcc',
      ecoRole: 'human-capital',
      name: 'Northern Maine Community College',
      short: 'NMCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-60'],
      location: { town: 'Presque Isle', lat: 46.6812, lng: -68.0159, precision: 'approximate' },
      cluster: ['composites-am', 'workforce-education'],
      what:
        'Community college in Presque Isle, on the grounds of the former Presque Isle Air Force Base, ' +
        'part of the Maine Community College System. Runs a nine-month Precision Machining and Tool, Die ' +
        'and Mold Making program built around CNC programming.',
      facts: [
        { label: 'Completion employment rate', value: '100 percent, per a vendor case study', confidence: 'unverified', note: 'Sourced to a GibbsCAM customer-story page, not to the college. Treat as marketing, not as the college’s own reporting.' }
      ],
      entryPoints: [
        { value: 'nmcc.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-wccc',
      ecoRole: 'human-capital',
      name: 'Washington County Community College',
      short: 'WCCC',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-61'],
      location: { town: 'Calais', lat: 45.1809, lng: -67.2778, precision: 'approximate' },
      cluster: ['maritime-autonomy', 'workforce-education'],
      what:
        'Community college in Calais, part of the Maine Community College System. Runs a Welding ' +
        'Technology program with AWS structural and pipe certifications, naming shipbuilding among its ' +
        'graduates’ typical employers.',
      facts: [],
      entryPoints: [
        { value: 'wccc.me.edu', confidence: 'verified' }
      ],
      entryGap: 'No named workforce or admissions contact confirmed.'
    },
    {
      id: 'inst-educatemaine',
      ecoRole: 'human-capital',
      name: 'Educate Maine',
      short: 'Educate Maine',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-62'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: ['workforce-education'],
      what:
        'Business-led education advocacy nonprofit founded 2011, working on college and career readiness, ' +
        'computer science education, and internship and apprenticeship support.',
      facts: [],
      entryPoints: [
        { value: 'educatemaine.org', confidence: 'verified' }
      ],
      entryGap: 'No named contact confirmed.'
    },
    {
      id: 'inst-livework',
      ecoRole: 'human-capital',
      name: 'Live + Work in Maine',
      short: 'Live + Work',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-63'],
      location: { town: 'Portland', lat: 43.6591, lng: -70.2568, precision: 'approximate' },
      cluster: ['workforce-education'],
      what:
        'Nonprofit talent attraction and retention initiative, working with employers on recruiting and ' +
        'relocation marketing statewide.',
      facts: [],
      entryPoints: [
        { value: 'liveandworkinmaine.com', confidence: 'verified' }
      ],
      entryGap: 'No named contact confirmed.'
    },
    {
      id: 'inst-apprenticeship',
      ecoRole: 'human-capital',
      name: 'Maine Apprenticeship Program',
      short: 'Apprenticeship ME',
      category: 'institution',
      chainStage: 5,
      openness: 'HIGH',
      confidence: 'verified',
      asOf: '2026-08',
      sourceIds: ['src-64'],
      location: { town: 'Augusta', lat: 44.3106, lng: -69.7795, precision: 'approximate' },
      cluster: ['workforce-education'],
      what:
        'Registered apprenticeship program run by the Maine Department of Labor, connecting employers to ' +
        'trainees across trades and technical occupations statewide.',
      facts: [],
      entryPoints: [
        { value: 'apprenticeship.maine.gov', confidence: 'verified' }
      ],
      entryGap: 'No named contact confirmed.'
    }
  ]
};
