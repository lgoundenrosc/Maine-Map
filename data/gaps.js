/**
 * Section 5.12. Verification gaps as of August 2026.
 * Rendered as a working table with an owner column the team fills in.
 */
window.RoscData = window.RoscData || {};

window.RoscData.gaps = {
  intro:
    'The known unknowns as of August 2026. The owner column is deliberately empty and is for the team ' +
    'to fill in. Nothing in this table has been filled with a plausible guess, and no institutional ' +
    'email or phone number has been generated anywhere in this build.',

  groups: [
    {
      id: 'gap-leadership',
      title: 'Leadership',
      kind: 'leadership',
      items: [
        { id: 'gap-l-13', item: 'TechPlace manager', ref: 'inst-techplace' },
        { id: 'gap-l-14', item: 'MRRA executive director, given a November 2024 search for a replacement and conflicting current sources', ref: 'inst-techplace' }
      ]
    },
    {
      id: 'gap-figures',
      title: 'Figures',
      kind: 'figure',
      items: [
        { id: 'gap-f-01', item: 'Maine’s annual SBIR and STTR award volume in dollars', ref: 'cap-sbir', priority: 'high', why: 'The cleanest single measure of the state’s federal R&D pipeline.' },
        { id: 'gap-f-02', item: 'MTI’s current annual appropriation', ref: 'inst-mti' },
        { id: 'gap-f-03', item: 'Maine Venture Fund’s current fund size, given three conflicting sources', ref: 'inst-mvf' },
        { id: 'gap-f-04', item: 'BIW current headcount, given two conflicting sources', ref: 'anchor-biw' },
        { id: 'gap-f-09', item: 'Maine Maritime Academy Brunswick Landing workforce center opening and square footage', ref: 'inst-mma' },
        { id: 'gap-f-10', item: 'The reported $9.5M ONR contract to UMaine and $9M DoD Arctic snowpack contract', ref: 'inst-ascc' },
        { id: 'gap-f-11', item: 'Reported $150M private and $100M Navy investment into Brunswick Landing', ref: 'inst-techplace' },
        { id: 'gap-f-12', item: 'Reported SpaceX Starlink ground station in Maine', ref: null },
        { id: 'gap-f-13', item: 'Poseidon Aerospace’s two-ton payload and 1,500-mile range claims, company-supplied and independent of the now-confirmed $11M seed', ref: 'co-poseidon' }
      ]
    },
    {
      id: 'gap-status',
      title: 'Status items',
      kind: 'status',
      items: [
        { id: 'gap-s-01', item: 'Current AFFF remediation status at Brunswick Landing and whether concentrate remains in Hangars 5 and 6', ref: 'test-msc', priority: 'high', why: 'Material to any lease or test-siting decision on the hangar complex.' },
        { id: 'gap-s-02', item: 'Whether Maine’s NSF Regional Innovation Engines proposal advanced', ref: 'inst-msc' },
        { id: 'gap-s-03', item: 'Status and mandate of the new state marine economy entity announced June 2026', ref: null },
        { id: 'gap-s-04', item: 'Whether the DIU OnRamp Hub round that closed 31 July 2026 has produced awards', ref: null, priority: 'high', why: 'Determines whether the stage 7 break is about to be addressed by someone else.' },
        { id: 'gap-s-05', item: 'Whether any Maine entity holds a Partnership Intermediary Agreement with a DoW component', ref: null }
      ]
    },
    {
      id: 'gap-contacts',
      title: 'Contacts',
      kind: 'contact',
      items: [
        { id: 'gap-c-01', item: 'Every institutional email and phone not explicitly listed in the institution playbook. Do not generate these.', ref: null, priority: 'high' }
      ]
    }
  ]
};
