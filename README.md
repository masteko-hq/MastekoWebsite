# Masteko Website

The marketing website for **Masteko (9408-4811 Québec Inc.)** — Asset Management, Property Management, and Bookkeeping & Accounting. Montréal, Québec. Bilingual (EN/FR).

It is a static website with no build step or backend. Open `index.html` through a local web server and it works.

## Repository contents

| File | What it is |
|------|------------|
| `index.html` | The Oxford-inspired Masteko homepage |
| `assets/site.css` | Responsive visual system and page layout |
| `assets/site.js` | Bilingual toggle and mobile navigation |
| `assets/team/` | Approved public team portraits used by the site |
| `assets/property/` | Campus Habitations project photography |
| `WEBSITE_RECOMMENDATIONS.md` | Implemented decisions and recommended next improvements |
| `DEPLOY.md` | How to publish the site (for Nicole) |
| `EDITING.md` | How to update the text and the property list (for Natali) |
| `Masteko_Website_Brief.md` | The design brief describing the site |
| `.gitignore` | Files git should ignore |

## Quick start

**View it locally:** double-click `index.html`, or run a local server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

**Publish it:** see [DEPLOY.md](DEPLOY.md).

**Change the wording or properties:** see [EDITING.md](EDITING.md).

## Features

- Oxford-inspired institutional single-page layout: capabilities, proof, representative mandates, operating platform, people, stewardship and contact
- Bilingual EN / FR toggle (top-right button) — full French translation built in
- Mobile-responsive navigation and WCAG-conscious focus/reduced-motion handling
- Direct investor portal link and contact email
- Real management-team and Campus Habitations photography

## Before going live — checklist

- Confirm the public contact email (currently `pete@masteko.ca`)
- Point the domain (e.g. `masteko.ca`) at the host — see DEPLOY.md
- Confirm the public reuse rights for all cross-brand and LinkedIn photography
- Confirm the reporting date and definition for the $75M and 30+ public metrics
- Review `WEBSITE_RECOMMENDATIONS.md` for the next institutional-content upgrades
