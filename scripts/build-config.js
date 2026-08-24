/*
 * Declared deviations from the source.
 *
 * Rule 1 is that the build renders the document rather than editing it, so
 * every intentional difference between content/maine_map_content_v3.md and
 * what a reader sees is declared here instead of being applied to the source
 * file. The source stays byte identical to the extraction.
 *
 * scripts/parse-content.js applies these. scripts/verify-fidelity.js applies
 * the same list before diffing, so the build still proves that nothing
 * outside this file changed anywhere in the document.
 */

'use strict';

/*
 * Whole-string replacements, applied to the markdown before parsing.
 * Longest match first where two could overlap.
 */
const SUBSTITUTIONS = [
  {
    from: 'Rosc Capital',
    to: 'Rosc',
    reason: 'Rosc is the official name, per the document owner'
  },

  /* Section 9 is withheld, so the four references that pointed at it are
   * removed rather than left dangling. Each is trimmed to the smallest edit
   * that drops the reference. */
  {
    from: '| Section 9 carries the limits | What Maine cannot support is listed in one place rather than distributed through the document. |',
    to: '',
    reason: 'section 9 withheld, whole row removed from the 8.1 mechanics table'
  },
  {
    from: 'To be developed. See section 9.3.',
    to: 'To be developed.',
    reason: 'section 9 withheld, cross-reference dropped from the 8.2 routing table'
  },
  {
    from: 'The talent constraint in section 9 is the binding one',
    to: 'The talent constraint is the binding one',
    reason: 'section 9 withheld, cross-reference dropped from the MIWTC VC READ box'
  },
  {
    from: ' Section 9.3 is the working list of what must be confirmed before the next version, and several areas of the Maine market noted there have not yet been surveyed.',
    to: '',
    reason: 'section 9 withheld, sentence removed from the revision note'
  }
];

/*
 * Line-level rules, applied to each line of the markdown before parsing.
 * `pattern` is a JavaScript regular expression source string, anchored by the
 * author. Every line that matches is rewritten.
 */
const LINE_RULES = [
  {
    pattern: '^(HIGH|MED|LOW)\\s{2,}.+$',
    replacement: '$1',
    reason: 'contact information removed from the institution playbook, per the document owner',
    /* All 22 openness lines in the source sit inside section 5, so the rule
     * cannot reach any other section. */
    expectedMatches: 22
  }
];

/*
 * Outbound links added to the rendered document.
 *
 * Rule 2 says no contact route is ever invented, and scripts/audit.js enforces
 * it by failing on any address that is not in the source. A link the document
 * owner supplies directly is declared here so the audit can tell the two
 * apart: anything not in the source and not on this list still fails.
 *
 * `text` must match a phrase in the rendered prose exactly. The phrase becomes
 * a link and the words themselves are untouched.
 */
const LINKS = [
  {
    text: 'Maine builds what the nation sails and flies',
    href: 'https://firstlightworks.com/',
    reason: 'supplied by the document owner'
  }
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

/* Apply every declared rule to a markdown string. Shared so the parser and
 * the fidelity check can never drift apart. */
function applyDeclared(text) {
  const counts = { substitutions: [], lineRules: [] };

  SUBSTITUTIONS.forEach(sub => {
    const hits = text.split(sub.from).length - 1;
    text = text.split(sub.from).join(sub.to);
    counts.substitutions.push({ from: sub.from, to: sub.to, reason: sub.reason, replaced: hits });
  });

  LINE_RULES.forEach(rule => {
    const re = new RegExp(rule.pattern);
    let hits = 0;
    text = text.split('\n').map(l => {
      if (!re.test(l)) return l;
      hits++;
      return l.replace(re, rule.replacement);
    }).join('\n');
    counts.lineRules.push({ pattern: rule.pattern, reason: rule.reason, replaced: hits, expected: rule.expectedMatches });
  });

  return { text, counts };
}

module.exports = { SUBSTITUTIONS, LINE_RULES, LINKS, RENDER_EXCLUDE_SECTIONS, applyDeclared };
