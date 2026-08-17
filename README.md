# Maine Defense Innovation Ecosystem, VC Landscape Map

Third in the Rosc VC Landscape Map series, after US SOCOM (June 2026) and US Space Force (May 2026).
Internal Rosc Capital document, August 2026.

Unlike the prior two maps, which are demand-side documents built around an acquisition chain, this one
is the supply-side inverse. Maine holds no acquisition authority, so the spine is a formation chain
that runs from research origin to mission partner, and it visibly breaks at stages 6 and 7.

## Running it

There is no build step and no dependency to install. Open `index.html` in a browser, from disk or from
a static host. Every path is relative and nothing is fetched at runtime, so the document works offline
and on GitHub Pages without configuration.

```
python3 -m http.server 8000     # or just open index.html directly
```

## Why plain HTML, CSS and JS

The spec allows React with Vite or plain HTML. Plain won because a bundler adds a build artifact and a
module loader for no gain here. The data is static, there are no runtime dependencies, and a Vite build
emits ES modules that a browser refuses to load over `file://`, which would break the offline
requirement. Classic scripts assigning into a `window.RoscData` namespace load everywhere.

## Layout

```
index.html            document shell, loads data before the application
css/styles.css        design system, derived from the SOCOM map
css/print.css         @media print, see below
data/                 all content, one module per section of the source brief
js/components.js      chips, callouts, inset boxes, accordion cards
js/views.js           chain diagram and geographic map
js/app.js             tabs, filters, search, detail panel, section panels
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
`stale` renders a grey italic badge carrying the source year, and `gap` renders a grey empty state
where the SOCOM map would show a contact string. Nothing is silently upgraded.

## Two rules this build follows without exception

**No invented contact information.** The only contact strings anywhere in the repository are the ones
supplied in the source brief: `mainetechnology.org`, `brunswicklanding.us`, `umaine.edu`,
`roux.northeastern.edu`, `maineapex.com`, `centralmaine.org`, `maineventurefund.com`, `bigelow.org`,
`diu.mil`, `BuildSubmarines.com`, `statsamerica.org/innovation2`, and the Maine SBDC number
`207-780-4420` which is tagged unverified because it came from a secondary source. Every other entry
point renders the empty state and appears in the verification gaps table. There is an audit script
note at the bottom of this file for re-checking after any edit.

**Every fact carries a confidence tag.** Where sources conflict, the range renders and the conflict is
stated rather than resolved. BIW headcount, ASCC staff and MVF capitalisation are the three live
examples.

## Print

`css/print.css` expands every accordion, renders all nine tab panels in order with a page break
between them, collapses the tabs, filters, search and detail panel, keeps background colours so the
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
