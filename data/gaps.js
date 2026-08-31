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
        { id: 'gap-f-10', item: 'The reported $9.5M ONR contract to UMaine’s Advanced Structures and Composites Center specifically. A separate $9M DoD Arctic snowpack and meltwater contract is confirmed via UMaine’s own news release, but it is led by the School of Earth and Climate Sciences and Climate Change Institute, not ASCC, so it is not recorded on ASCC’s entry.', ref: 'inst-ascc' },
        { id: 'gap-f-11', item: 'Current-dollar reported $150M private and $100M Navy investment into Brunswick Landing. Older, well-sourced figures exist for a different period ($150M in Navy upgrades before the 2011 closure and $175M in private investment by 2016) but do not match this framing, so the gap remains open rather than substituted.', ref: 'inst-techplace' }
      ]
    },
    {
      id: 'gap-status',
      title: 'Status items',
      kind: 'status',
      items: [
        { id: 'gap-s-01', item: 'Whether Hangar 5 specifically has had its AFFF concentrate removed, given a January 1, 2026 legal deadline. Hangars 6 and 7 are confirmed cleared as of April 2025.', ref: 'test-msc', priority: 'high', why: 'Material to any lease or test-siting decision on the hangar complex.' },
        { id: 'gap-s-02', item: 'Final award status of Maine Space Corporation’s own NSF Regional Innovation Engines proposal (small satellite and Earth observation, with New Hampshire), which advanced within the competition but is not confirmed as an award winner. Not to be confused with the separate Seafood Engine in New England, which won a confirmed $15M NSF Engines award in 2026.', ref: 'inst-msc' },
        { id: 'gap-s-04', item: 'Whether the DIU OnRamp Hub sources-sought solicitation, open July 7-31, 2026, has produced hub location selections or awards', ref: null, priority: 'high', why: 'Determines whether the stage 7 break is about to be addressed by someone else.' },
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
