# Working on the Masteko website

Static site: HTML, CSS, and one small JS file. No framework, no bundler.

## Requirements

Node 20 or newer. No dependencies to install — every script uses only the Node
standard library, so there is no `npm install` step and no supply chain to
audit.

## Run it locally

```bash
npm run dev
```

Serves the repo at <http://localhost:4173>. Edit `index.html` or anything in
`assets/`, then refresh. Use `npm run dev -- --port 8080` for a different port.

## Before you open a PR

```bash
npm run verify
```

Builds `_site/` and runs every check. This is exactly what CI runs, so if it
passes locally it passes in CI.

## What the checks catch

`npm run check` fails the build on:

- **assets** — any `src`/`href` pointing at a file that does not exist
- **anchors** — any `href="#id"` with no matching element
- **a11y** — `<img>` without `alt`, missing `lang`, wrong `<h1>` count, skipped heading levels
- **meta** — missing `<title>`, `viewport`, or `description`
- **i18n** — any *new* visible string lacking a `data-en`/`data-fr` pair

The i18n check compares against `scripts/i18n-baseline.json`, which separates
strings that are identical in French by nature (names, numbers, brands) from
`knownGaps` — real untranslated copy, reported as a warning every run so it
stays visible. Currently open:

- `Skip to content`
- `02 / CONSOLIDATE`
- `03 / DECIDE`

Fix one by adding `data-en`/`data-fr` to the element and removing it from
`knownGaps`.

## Adding content

Every user-visible string needs both attributes, or the FR toggle will leave it
in English:

```html
<p data-en="Asset management" data-fr="Gestion d'actifs">Asset management</p>
```

The visible text should match `data-en`. `assets/site.js` swaps `textContent`
from whichever attribute matches the active language and remembers the choice in
`localStorage`.

## How it ships

`main` is production. Merging to `main` triggers **Deploy to HostGator**, which
builds, runs the same checks, uploads `_site/` over SFTP, and then verifies the
live URL returns 200 and contains the logo. A failing check blocks the upload.

Only `index.html`, `assets/`, and `prototypes/` are published. Internal
markdown stays in the repo and is not served — see `scripts/build.mjs`.

See `MIGRATION-RUNBOOK.md` for the GitHub Pages → HostGator cutover.
