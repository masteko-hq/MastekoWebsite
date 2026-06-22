# Masteko Website

The marketing website for **Masteko (9408-4811 Québec Inc.)** — Asset Management, Property Management, and Bookkeeping & Accounting. Montréal, Québec. Bilingual (EN/FR).

It is a single, self-contained static page. No build step, no backend, no dependencies. Open `index.html` and it works.

## Repository contents

| File | What it is |
|------|------------|
| `index.html` | The entire website (HTML + CSS + JavaScript in one file) |
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

- Single-page scroll layout: Hero, Services, Approach/Technology, Properties, Who We Serve, Why Masteko, Contact
- Bilingual EN / FR toggle (top-right button) — full French translation built in
- Mobile-responsive, with subtle scroll animations
- Contact form (currently a `mailto:` link — see DEPLOY.md to capture submissions)

## Before going live — checklist

- Confirm the public contact email (currently `pete@masteko.ca`)
- Point the domain (e.g. `masteko.ca`) at the host — see DEPLOY.md
- Optional: add a logo image in place of the text wordmark
- Optional: self-host the fonts for full offline reliability
