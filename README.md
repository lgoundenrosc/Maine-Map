# Maine Defense Innovation Ecosystem, VC Landscape Map

Internal Rosc document, August 2026. A supply-side landscape analysis of Maine's defense
innovation ecosystem.

The structural fact that shapes the interface: Maine holds no acquisition authority, so no customer
for any of this sits in the state. The spine is a seven-stage formation chain running from research
origin to a program of record, and the analytical payload is where that chain breaks. It breaks at
stages 6 and 7, and the diagram says so with broken red rails.

This document reads standalone. It carries no cross-references to the other maps in the series.

## The three rules this build follows

**The content is not changed.** `content/maine_map_content_v3.md` is the source of truth. The build
renders it. No sentence is rewritten, no apparent inconsistency is fixed, no duplicated entry is
merged, and no conflicting figure is resolved. `scripts/verify-fidelity.js` proves it by rebuilding
the markdown out of the emitted JSON and diffing against the source.

Deviations the document owner asks for are declared in `scripts/build-config.js` rather than applied
to the source file, so the source stays byte identical to the extraction and the fidelity check keeps
proving that nothing outside that one file changed. Two are declared today:

| Deviation | Effect |
|---|---|
| `Rosc Capital` renders as `Rosc` | One occurrence, in the glossary entry for First Light Works |
| Section 9 is withheld | Constraints and gaps does not render |

Withholding a section does not resequence the numbering. The numbers belong to the document and its
own cross-references depend on them, so the tab strip runs 1 to 8 and then 10 to 12.

**No contact information is invented.** Every institutional web address and every entry that reads
"contact not confirmed" comes from the source. `scripts/audit.js` scans the rendered page for email
addresses, phone numbers and domains, and fails if any of them is absent from the source.

**Every confidence marker survives.** The source carries 16 inline markers in square brackets, plus
34 values in a Confidence column. The parser lifts each inline marker out of the character stream
into its own run so the interface can render it as a chip in the position it occupied. Nothing is
dropped and nothing is upgraded.

## Running it

No build step, no dependency, no network. Open `index.html`, from disk or from a static host.

```
python3 -m http.server 8000     # or open index.html directly
```

## Regenerating the data after a v4 lands

Drop the new markdown into `content/`, point `SRC` in the parser at it, then:

```
node scripts/parse-content.js     # emits data/*.json and data/bundle.js
node scripts/verify-fidelity.js   # round-trips the JSON back to markdown
node scripts/audit.js             # renders the page and checks the two content rules
```

The parser validates against an expected inventory and exits non-zero on drift. For v3 that is
12 sections, 9 capability clusters, 43 callouts and 15 tables. Validation runs against the full parse
before anything is withheld, so a declared exclusion never hides a parse failure. Update `EXPECTED`
when the inventory legitimately changes, and treat a failure as a parse problem until proven
otherwise.

Components read the generated data and never carry content, so a revision usually touches no UI code.

## Layout

```
content/maine_map_content_v3.md   source of truth, committed alongside the generated JSON
scripts/build-config.js           declared substitutions and withheld sections
scripts/parse-content.js          markdown to data/*.json, with inventory validation
scripts/geo-coordinates.js        derived coordinates and the schematic Maine outline
scripts/verify-fidelity.js        rebuilds the markdown from JSON and diffs it
scripts/audit.js                  renders the page and checks prose and contact rules
data/*.json                       generated, inspectable
data/bundle.js                    generated, the same JSON as a classic script for file:// loading
css/styles.css                    design system
css/print.css                     @media print
js/render.js                      chips, callouts, tables, blocks
js/views.js                       formation chain and geographic plot
js/app.js                         masthead, tabs, panels, cluster filters
```

`data/` holds both JSON and a `bundle.js` wrapper. The JSON is the artifact worth inspecting. The
wrapper exists because a `fetch()` of a local JSON file is blocked under `file://`, and the document
has to open offline.

## The chip system

| Family | Values |
|---|---|
| Cluster heat | `HOT` `OPEN` `WATCH` |
| Cluster depth | `DEEP` `MODERATE` `THIN` |
| Chain health | `STRONG` `ADEQUATE` `LIMITED` |
| Openness | `HIGH` `MED` `LOW` |
| Accreditation | `ISO 17025` `NOT CONFIRMED` `RESTRICTED` `PFAS SITE` |
| Confidence | `VERIFIED` `UNVERIFIED` `COMPANY-SUPPLIED` `NOT CONFIRMED` |

`VERIFIED` carries no colour by design. `NOT CONFIRMED` renders as a dashed grey empty state.

The strongest red in the palette is reserved for the contaminated marker, which the source writes as
`PFAS SITE`. It marks the Brunswick Landing hangars, which are the state's test asset and its
environmental liability at once, and it renders on the same screen as the 650,000 square feet of
hangar space counted as a test asset.

## The geographic view

The source carries no coordinates. Every coordinate in `scripts/geo-coordinates.js` was derived from
a place name that appears in the text, ships tagged `precision: "approximate"`, and a disclaimer
renders next to the map. County-level points, the one offshore point, and out-of-state assets are
labelled as such in the side panel. Out-of-state assets are listed and never drawn.

Locations come from a Location column wherever the source has one. Where a location came from prose
instead, the entry records the sentence it was read out of, and that sentence renders under the entity
in the side panel.

A point-in-polygon check confirms every derived Maine town falls inside the outline. The outline is
schematic: the coast is a smooth seaward envelope, islands are omitted, and Penobscot Bay is not cut
in.

## Print

`css/print.css` prints every rendered panel in section order with a page break between sections, drops
the tabs, filters and view toggles, opens every accordion, expands the stage nodes, and keeps both
the chain and the geographic view. Background colours are forced on so the confidence system stays
legible. The chain is scaled with `zoom` rather than `transform`, because `transform` leaves the
unscaled height reserved and blows a page.

## Hosting

`node scripts/build-single-file.js` writes two inlined builds into `dist/`, neither of which loads
anything over the network:

- `maine-map.html`, a complete document that opens by double-click and works offline.
- `maine-map.artifact.html`, the same content without the doctype, html, head and body skeleton, for
  a host that supplies its own.

## Access control, needs a decision

**No password is stored in this repository and none should be added.**

A client-side password gate on GitHub Pages is obfuscation rather than access control. The check runs
in the visitor's browser, which means the gate and the whole document are already on the visitor's
machine before the prompt appears. This build names individuals at a federal installation and carries
a partly unverified contact list, so the distinction is not academic.

Real options, all of which check on the server:

1. A private repository with Pages enabled, which needs a paid GitHub plan.
2. Cloudflare Access in front of the site.
3. Netlify password protection.

If a client-side gate is wanted anyway as a speed bump, take the value from an environment variable at
build time. `.gitignore` covers `.env` and local credential files and was committed before any
content.
