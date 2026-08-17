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
      title: 'Leadership, all unconfirmed',
      kind: 'leadership',
      items: [
        { id: 'gap-l-01', item: 'Maine Defense Industry Alliance executive director', ref: 'inst-mdia' },
        { id: 'gap-l-02', item: 'Roux Institute entrepreneurship lead', ref: 'inst-roux' },
        { id: 'gap-l-03', item: 'Maine APEX statewide director', ref: 'inst-apex' },
        { id: 'gap-l-04', item: 'Maine MEP director', ref: 'inst-mep' },
        { id: 'gap-l-05', item: 'Gulf of Maine Research Institute president', ref: 'inst-gmri' },
        { id: 'gap-l-06', item: 'Maine Maritime Academy president', ref: 'inst-mma' },
        { id: 'gap-l-07', item: 'Loring Development Authority lead', ref: 'inst-loring' },
        { id: 'gap-l-08', item: 'SUPSHIP Bath commanding officer', ref: null },
        { id: 'gap-l-09', item: 'PNSY shipyard commander', ref: 'anchor-pnsy' },
        { id: 'gap-l-10', item: 'MRRA board chair', ref: 'inst-techplace' },
        { id: 'gap-l-11', item: 'Maine DECD commissioner', ref: null },
        { id: 'gap-l-12', item: 'Maine Space Grant Consortium director', ref: 'inst-msgc' },
        { id: 'gap-l-13', item: 'TechPlace manager', ref: 'inst-techplace' }
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
        { id: 'gap-f-05', item: 'Pratt & Whitney North Berwick program specifics', ref: 'anchor-pw' },
        { id: 'gap-f-06', item: 'Teledyne e2v Brunswick Landing scope', ref: 'anchor-tdy' },
        { id: 'gap-f-07', item: 'Poseidon Aerospace’s reported $11M seed', ref: 'co-poseidon' },
        { id: 'gap-f-08', item: 'Elmet Technologies IPO status', ref: 'co-elmet' },
        { id: 'gap-f-09', item: 'Maine Maritime Academy Brunswick Landing workforce center opening and square footage', ref: 'inst-mma' },
        { id: 'gap-f-10', item: 'The reported $9.5M ONR contract to UMaine and $9M DoD Arctic snowpack contract', ref: 'inst-ascc' },
        { id: 'gap-f-11', item: 'Reported $150M private and $100M Navy investment into Brunswick Landing', ref: 'inst-techplace' },
        { id: 'gap-f-12', item: 'Reported SpaceX Starlink ground station in Maine', ref: null }
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
