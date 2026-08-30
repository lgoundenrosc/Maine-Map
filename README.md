# Maine Defense Innovation Ecosystem, VC Landscape Map

Third in the Rosc VC Landscape Map series, after US SOCOM (June 2026) and US Space Force (May 2026).
Internal Rosc Capital document, August 2026.

Unlike the prior two maps, which are demand-side documents built around an acquisition chain, this one
is the supply-side inverse. Maine holds no acquisition authority, so the spine is a formation chain
that runs from research origin to mission partner, and it visibly breaks at stages 6 and 7.

## Two documents

`index.html` is the VC landscape map: nine tabs, a formation chain, a print stylesheet, the personnel
and routing layers. It is the analytic document.

`ecosystem.html` is the ecosystem map: the same records plotted on a real map of Maine, browsable by
town. Four surfaces, reached from the dock on the right.

| | VC landscape map | Ecosystem map |
| --- | --- | --- |
| Entry | `index.html` | `ecosystem.html` |
| Shape | nine tabs, chain diagram | map, municipality drill-down, index, help |
| Theme | light, Rosc navy and rust, print first | dark, purple and orange, screen first |
| Records | all of `data/` | organizations and places only |
| Personnel | included | excluded, see below |
| Print | 45 pages at Letter | not a print document |

Both read the same `data/` directory. Editing a record changes both. Neither has a build step and
neither fetches anything at runtime.

### What the ecosystem map deliberately leaves out

It maps organizations and the places they sit in. Named individuals, routing contacts and the
engagement playbook stay in the VC landscape map, which is the document built to carry them. The only
contact strings it renders are the allowlisted domains, and it reaches them through the same
`entryPoints` records, filtered against an explicit list in `js/entities.js`. A domain added to
`data/` without being added to that list renders as a gap rather than as a link, which is the
intended failure direction.

It carries no `ROSC INTERNAL` badge.

### Three things the records needed before they could be plotted

The source `location.town` strings were written for a reading document, not for a rollup.
`data/places.js` resolves them and says why in full.

1. Brunswick is spelled three ways. `Brunswick`, `Brunswick Landing` and `Hangar 5, Brunswick Landing`
   are one municipality with 16 records, not three places with 5, 5 and 1.
2. `Statewide` is a real fact about an organization's scope, not a gap. Those four records are plotted
   at Augusta, the state capital, reusing the coordinate the source already carries for its own
   Augusta-based entries. Each still shows its original `Statewide` chip, so a reader is never told the
   organization is headquartered there.
3. Nine records are not in a town at all. `Maine` and `Coastal` carry coordinates that were invented so
   the old renderer could draw a dot, and four capital instruments carry no location because they are
   programs rather than places. All nine are listed rather than plotted. Nothing sits on the map at a
   coordinate made up to satisfy a renderer.
4. One record is in New Hampshire. It stays on the map because the test route matters, but it is not
   a Maine community and does not count as one.

### Sector and the two facets

The sector dropdown is a single choice, one cluster or all of them, because a record sits at one place
on the formation chain. `Startups` and `Major defense companies` in the card below it are a different
kind of filter, two independent facets rather than a second sector: either can be on, both can be on
together, and both combine with whatever sector is selected. `data/companies.js` and `data/anchorNodes.js`
carry `startup` and `majorDefenseCompany` as explicit booleans set record by record, from ventureBacked
status, incubator or spinout language already in the record's own text, or, for major defense companies,
a name on the scale of the two the request that added this named, General Dynamics and Bath Iron Works.
Neither flag is inferred from company size or age at render time. `js/entities.js` carries both through unchanged,
`js/ecosystem.js` ORs the two facets together and ANDs the result against the sector filter.

## The ecosystem map's palette

`css/ecosystem.css` is dark, purple as the primary accent and orange reserved for a short, deliberate
list: the brand mark's gradient, the two buttons that take the reader somewhere (`View index`, `Visit
[site]`), the defense corridor line, the top bubble tier, and the home view's stat numbers. Everywhere
else in the interface, purple carries the accent. Text is white, not the ground.

The first pass at this went light instead, white as a surface color rather than just text on dark, and
came back too bright. The purple and orange accent system carried over unchanged, only the ground and
ink direction flipped, along with the handful of values (bubble fill opacity, the drill-down scrim's
fade direction, shadow color) that only make sense relative to one direction or the other.

Both passes were built for a specific brief: purple, orange and white, professional and defense tech
focused, judged against `firstlightworks.com`, a site this document may end up published alongside. The
domain was not reachable from this environment when either was built, so the specific values are a
considered design against that brief rather than a color pick from the live site. Revisit them if the
two need to match more closely once the site can be seen directly.

Confidence badges and the by-type bubble legend use hues chosen to sit outside the purple and orange
family on purpose, `--e-amber` and `--e-red` for status, a separate five-hue set for anchor, institution,
company, test asset and capital, so a status color or a data category is never mistaken for the brand
accent.

## The basemap

The map draws a real coastline without calling a tile service. `tools/build-geo.js` clips
OpenStreetMap derived vectors to the viewport at build time and writes `data/geo.js`, which is
committed. Leaflet is vendored into `vendor/` and loaded without a tile layer, supplying dragging,
scroll zoom, tooltip anchoring and marker management over the baked geometry.

```
npm install          # build-time only, the documents have no runtime dependencies
npm run geo          # rebake data/geo.js after changing the viewport
npm run vendor       # recopy Leaflet after a version bump
npm run artifact     # bundle ecosystem.html into one self-contained file
npm run standalone   # the same for index.html
```

`tools/build-artifact.js` folds every stylesheet and script inline and drops the document wrapper, for
hosts that supply their own doctype, head and body. The result makes no network requests at all, which
is what lets it run under a strict content security policy. Regenerate it after any change to `data/`,
`css/` or `js/`. Both bundles are generated and neither is committed.

Two rectangles matter. `BAKE` is what geometry is clipped to and is far wider than Maine, because past
its edge land simply stops and the canvas reads as open ocean. `VIEW` is what the reader can pan to,
inset far enough inside `BAKE` that the cut edge never comes on screen, and the map takes its
`maxBounds` from it. The minimum zoom is recomputed on resize so `VIEW` always covers the window.

Resolution is 500m rather than 100m. At the zoom range this map allows the two are indistinguishable,
and 500m costs about a third as much, 272 KB against 765 KB, while still carrying 146 islands along
the Maine coast.

Attribution is required and is rendered by the map: coastline from OpenStreetMap contributors under
ODbL, boundaries from the US Census Bureau. `data/geo.js` is generated. Rerun `npm run geo` rather
than editing it.

## Running it



There is no build step and no dependency to install. Open `index.html` in a browser, from disk or from
a static host. Every path is relative and nothing is fetched at runtime, so the document works offline
and on GitHub Pages without configuration.

```
python3 -m http.server 8000     # or just open either html file directly
```

## Why plain HTML, CSS and JS

The spec allows React with Vite or plain HTML. Plain won because a bundler adds a build artifact and a
module loader for no gain here. The data is static, there are no runtime dependencies, and a Vite build
emits ES modules that a browser refuses to load over `file://`, which would break the offline
requirement. Classic scripts assigning into a `window.RoscData` namespace load everywhere.

## Layout

```
index.html            VC landscape map shell, loads data before the application
ecosystem.html        ecosystem map shell, same data layer
css/styles.css        light design system, derived from the SOCOM map
css/print.css         @media print, see below
css/ecosystem.css     dark treatment of the same palette, screen first
data/                 all content, one module per section of the source brief
data/geo.js           generated basemap, see The basemap
data/places.js        town canonicalization and placement rules
js/components.js      chips, callouts, inset boxes, accordion cards
js/views.js           chain diagram and the old stylized map
js/app.js             tabs, filters, search, detail panel, section panels
js/entities.js        flattens the six record sets into one plottable array
js/basemap.js         Leaflet wrapper, no tile layer
js/ecosystem.js       dock, rail, drill-down, drawer, index, help
tools/                build-time scripts, not loaded by either document
vendor/               Leaflet, vendored so nothing is fetched at runtime
```

No prose lives in a component. Every string a reader sees comes from `data/`.

### Record shape

```js
{
  id, name,
  location: { town, lat, lng, precision: 'approximate' | 'exact' },
  category,
  confidence: 'verified' | 'unverified' | 'stale' | 'gap',
  asOf: 'YYYY-MM',
  sourceIds: ['src-01'],
  note
}
```

`confidence` drives rendering. `verified` renders no badge, `unverified` renders an amber badge,
`stale` renders a gray italic badge carrying the source year, and `gap` renders a gray empty state
where the SOCOM map would show a contact string. Nothing is silently upgraded.

## Two rules this build follows without exception

**No invented contact information.** Every contact string in the repository is checked against its own
official site before being added, and is listed in `DOMAIN_ALLOWLIST` in `js/entities.js`, which is the
enforcement point, not this paragraph. The source brief supplied `mainetechnology.org`,
`brunswicklanding.us`, `umaine.edu`, `roux.northeastern.edu`, `maineapex.com`, `centralmaine.org`,
`maineventurefund.com`, `bigelow.org`, `diu.mil`, `BuildSubmarines.com`, `statsamerica.org/innovation2`,
and the Maine SBDC number `207-780-4420`, tagged unverified because it came from a secondary source. The
education and workforce records added afterward, on request, extend the allowlist with each
institution's own domain, checked the same way: `smccme.edu`, `yccc.edu`, `mainemaritime.edu`,
`bowdoin.edu`, `umaine.edu`, `usm.maine.edu`, `uma.edu`,
`bates.edu`, `colby.edu`, `cmcc.edu`, `emcc.edu`, `kvcc.me.edu`, `nmcc.edu`, `wccc.me.edu`,
`educatemaine.org`, `liveandworkinmaine.com`, `apprenticeship.maine.gov`. Every other entry point
renders the empty state and appears in the verification gaps table. There is an audit script note at the
bottom of this file for re-checking after any edit.

**Every fact carries a confidence tag.** Where sources conflict, the range renders and the conflict is
stated rather than resolved. BIW headcount, ASCC staff and MVF capitalization are the three live
examples.

## Print

`css/print.css` expands every accordion, renders all nine tab panels in order with a page break
between them, collapses the tabs, filters, search and detail panel, keeps background colors so the
chips stay legible, and scales the chain diagram to page width with `zoom` rather than `transform` so
it does not reserve unscaled height. Exporting to PDF at Letter portrait produces roughly 45 pages.

## Access control, needs a decision

The two reference sites are password gated. **No password is stored in this repository and none should
be added.** Raising this rather than implementing it silently:

A client-side password gate on GitHub Pages is obfuscation, not access control. The check runs in the
visitor's browser, which means the gate and the entire document are already on the visitor's machine
before the prompt appears. Anyone who can load the page can read the source. This build contains named
individuals at a federal installation and a partly unverified contact list, so that distinction is not
academic.

If real access control is wanted, the options are:

1. A private repository with Pages enabled, which requires a paid GitHub plan.
2. Cloudflare Access in front of the site.
3. Netlify password protection.

All three check on the server. If a client-side gate is chosen anyway as a speed bump, take the value
from an environment variable at build time, never from a committed file. `.gitignore` already covers
`.env` and local credential files, and was committed before any content.

## Known deviations from the brief

The brief bans em dashes in prose. The document title, `Maine Defense Innovation Ecosystem — VC
Landscape Map`, is specified verbatim with an em dash and is treated as a proper name rather than
prose, so it is preserved in the page title, the header and the running header. Every other em dash is
gone, and there are no semicolons in prose anywhere. Rewriting the document's own name seemed the
worse of the two options, but it is a one-line change in `data/meta.js` if the call goes the other way.

## Re-auditing after edits

The two checks worth repeating before any publish are a scan of every string literal in `data/` and
`js/` for em dashes and prose semicolons, and a scan of the same strings for email addresses, phone
numbers and domains that are not on the allowlist above. Both are simple regex passes over the string
literals in `data/*.js`, `js/*.js` and `index.html`.
