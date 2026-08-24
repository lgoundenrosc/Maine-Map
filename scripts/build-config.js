/*
 * Declared deviations from the source.
 *
 * Rule 1 is that the build renders the document rather than editing it, so
 * every intentional difference between content/maine_map_content_v3.md and
 * what a reader sees is declared here instead of being applied to the source
 * file. The source stays byte identical to the extraction.
 *
 * scripts/parse-content.js applies this list. scripts/verify-fidelity.js
 * applies the same list before diffing, so the build still proves that
 * nothing outside this file changed anywhere in the document.
 */

'use strict';

/* Applied to the markdown before parsing. Longest match first. */
const SUBSTITUTIONS = [
  { from: 'Rosc Capital', to: 'Rosc', reason: 'Rosc is the official name, per the document owner' }
];

/*
 * Parsed and validated as normal, then held back from the rendered document.
 * Section numbers are not resequenced. They are the document's own numbers
 * and its internal cross-references depend on them, so the tab strip skips
 * from 8 to 10 rather than renumbering the sections that follow.
 */
const RENDER_EXCLUDE_SECTIONS = [
  { num: '9', reason: 'constraints and gaps not needed at this time, per the document owner' }
];

module.exports = { SUBSTITUTIONS, RENDER_EXCLUDE_SECTIONS };
