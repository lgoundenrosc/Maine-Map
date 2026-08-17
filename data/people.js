/**
 * Section 5.8. Key names to know.
 * Every row carries a confidence tag and the standing caveat. No contact
 * information is listed for any individual anywhere in this file.
 */
window.RoscData = window.RoscData || {};

window.RoscData.people = {
  caveat:
    'Standing caveat. Personnel are unverified unless tagged otherwise, and no direct contact ' +
    'information is recorded for any individual in this document. Confirm the seat and the route before ' +
    'any outreach.',

  items: [
    { id: 'p-whitney', name: 'Brian Whitney', role: 'President, Maine Technology Institute', why: 'Controls the first funding call for any Maine startup. Sits on the MVF board and the Maine Space Corporation. The highest-leverage single relationship in the state.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-19', 'src-20'], ref: 'inst-mti' },
    { id: 'p-dagher', name: 'Habib Dagher', role: 'Founding Executive Director, UMaine ASCC', why: 'Runs the only ISO 17025 test capability and the DoD-facing composites and additive program. Spins out companies.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-35'], ref: 'inst-ascc' },
    { id: 'p-powers', name: 'Joe Powers', role: 'Managing Director, Maine Venture Fund', why: 'Runs the state’s only institutional venture vehicle.', confidence: 'unverified', confidenceNote: 'Confirm still in seat.', asOf: '2026-08', sourceIds: ['src-21', 'src-37'], ref: 'inst-mvf' },
    { id: 'p-burns', name: 'John Burns', role: 'Strategic advisor, formerly Managing Director of MVF for roughly 21 years', why: 'Institutional memory of every Maine deal since roughly 2000.', confidence: 'unverified', asOf: '2026-08', sourceIds: ['src-21'], ref: 'inst-mvf' },
    { id: 'p-mello', name: 'Carlos Mello', role: 'CEO, Finance Authority of Maine', why: 'Controls the Seed Capital Tax Credit and NMCIP allocation.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-14', 'src-15'], ref: 'cap-msctc' },
    { id: 'p-logan', name: 'Kristine Logan', role: 'Executive Director, MRRA', why: 'Controls site access at Brunswick Landing.', confidence: 'unverified', asOf: '2026-08', sourceIds: ['src-34'], ref: 'inst-techplace' },
    { id: 'p-delgreco', name: 'Peter DelGreco', role: 'President and CEO, Maine & Co', why: 'Single point of contact into Maine’s corporate and public leadership.', confidence: 'unverified', asOf: '2026-08', sourceIds: ['src-10'], ref: 'inst-maineco' },
    { id: 'p-bronk', name: 'Deborah Bronk', role: 'President and CEO, Bigelow Laboratory', why: 'Runs the state’s premier ocean science institute and the blue biotech initiative.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-23'], ref: 'inst-bigelow' },
    { id: 'p-shehata', name: 'Terry Shehata', role: 'Executive Director, Maine Space Corporation', why: 'Holds the 50-plus organization NSF Engines coalition list.', confidence: 'unverified', asOf: '2026-08', sourceIds: ['src-25'], ref: 'inst-msc' },
    { id: 'p-krugh', name: 'Charles F. Krugh', role: 'President, Bath Iron Works', why: 'Largest defense employer in the state.', confidence: 'unverified', asOf: '2026-08', sourceIds: ['src-30'], ref: 'anchor-biw' },
    { id: 'p-mhowe', name: 'Michael Howe', role: 'President and Chief Engineer, Howe & Howe', why: 'Built Maine’s only UGV producer.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-12', 'src-13'], ref: 'anchor-txt' },
    { id: 'p-ghowe', name: 'Geoffrey Howe', role: 'CEO, Howe & Howe', why: 'Co-founder.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-12', 'src-13'], ref: 'anchor-txt' },
    { id: 'p-redden', name: 'Nate Redden', role: 'Innovation specialist, PNSY', why: 'Named technology adopter at the shipyard.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-08'], ref: 'anchor-pnsy' },
    { id: 'p-edwards', name: 'Jeremy Edwards', role: 'Innovation specialist, PNSY', why: 'Named technology adopter at the shipyard.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-08'], ref: 'anchor-pnsy' },
    { id: 'p-weyand', name: 'James Weyand', role: 'Mechanical engineer, PNSY', why: 'Articulated the UUV dry dock inspection requirement.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-08'], ref: 'anchor-pnsy' },
    { id: 'p-kittredge', name: 'Tom Kittredge', role: 'MTI, IEDP contact', why: 'Gatekeeper for ecosystem development grants.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-19'], ref: 'inst-mti' },
    { id: 'p-collins', name: 'Sen. Susan Collins', role: 'Senate Appropriations', why: 'Maine’s strongest federal card. Routinely announces Maine defense awards.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-10'] },
    { id: 'p-king', name: 'Sen. Angus King', role: 'Senate Armed Services', why: 'Champions the Maine defense industrial base.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-10'] },
    { id: 'p-pingree', name: 'Rep. Chellie Pingree', role: 'House Appropriations, ME-1', why: 'Brunswick and Portland sit in her district.', confidence: 'verified', asOf: '2026-08', sourceIds: ['src-10'] },
    { id: 'p-golden', name: 'Rep. Jared Golden', role: 'House Armed Services, ME-2', why: 'Loring, Presque Isle and Bangor sit in his district.', confidence: 'unverified', confidenceNote: '2026 election cycle.', asOf: '2026-08', sourceIds: ['src-10'] }
  ]
};
