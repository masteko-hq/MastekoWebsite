# Masteko — Website Design Brief

*Prepared for Claude Design. This brief describes what Masteko does and how the website should look, read, and behave. Everything below is drawn from the company's own emails, financials, contracts, and internal systems.*

---

## 1. Who Masteko is

**Masteko** is the back-office and management-services arm of a Montréal-based real estate group (the Campus Habitations / Koran group of companies). The operating entity is **9408-4811 Québec Inc.**, which trades under the **Masteko** brand (`masteko.ca`). A related holding company, **Masteko Corp.**, is part of the same family of entities.

In plain terms: Masteko is the team that runs the numbers, the buildings, and the assets behind a portfolio of real estate companies, partnerships, and investors. Owners and developers focus on deals and construction; Masteko keeps the financial and operational machine running underneath.

- **Headquarters:** Montréal, Québec, Canada
- **Operating language:** Bilingual — English and French
- **Principal:** Marc Koran
- **Brand domain:** masteko.ca

---

## 2. What Masteko does — three service lines

The site should be organized around **three core services**. These are the real, named business lines from Masteko's internal model.

### Asset Management
Oversight of real estate assets on behalf of owners, partnerships, and investors. Includes performance monitoring, investor and limited-partner (LP) reporting, quarterly and annual reports, capital calls, distributions, lender relations, and support for financing and loan applications. Masteko prepares the financial packages that banks (e.g. Desjardins) and cost consultants (e.g. Altus) require for construction draws and credit reviews.

### Property Management
Day-to-day management of residential and multi-family properties — rent collection, tenant and unit administration, operating oversight, and coordination with on-site teams across the portfolio.

### Bookkeeping & Accounting
Full-cycle bookkeeping and accounting for multiple entities: accounts payable, accounts receivable, intercompany reconciliations, year-end financial statements (Notice to Reader / compiled financials), and coordination with external CPAs and auditors. Built on QuickBooks Online, with structured monthly and quarterly reporting.

> Internally there is also a **Shared Services** function (the central team and systems that support all three lines). This can be mentioned as part of "how we work" but does not need to be a fourth headline service.

---

## 3. What makes Masteko different — the technology angle

Masteko is not a traditional bookkeeping shop. It runs an **in-house financial data platform** that should be a clear differentiator on the site:

- **MastekoDWH** — a data warehouse that pulls live data from QuickBooks Online into BigQuery for clean, consolidated reporting across many entities.
- **Masteko Financial Model (FM)** — an EBITDA / profitability reporting and forecasting engine, with automatic QuickBooks refresh.
- **AI-assisted reporting ("Ask")** — natural-language querying over the group's financial data.

Positioning line for the site: *"Institutional-grade financial reporting, powered by our own data and AI tooling — not spreadsheets held together by hope."* (Designer may rephrase; keep the substance: real-time, consolidated, tech-enabled, multi-entity reporting.)

---

## 4. Who Masteko serves

- Real estate **owners and developers** running multiple corporate entities
- **Limited partnerships and their investors / LPs** who need clean, regular reporting (quarterly reports, capital calls, distributions)
- **Multi-family and residential property owners**
- Groups that need **lender-ready and CPA-ready financials** for financing, draws, and annual reviews

Masteko currently manages a large roster of intercompany and partner entities across Québec and Western Canada (e.g. Campus Agathe, Campus Ryan, Tremblant Gateway LP, and others). The public site should speak to the *capability* — managing many entities at once with discipline — rather than naming private clients.

---

## 4b. Properties we manage (dedicated section)

Include a "Properties We Manage" section featuring three representative managed assets. Keep it portfolio-level and professional — name, location, asset type, and a short description. Do **not** publish confidential financials (occupancy, appraisals, rents); those are reported privately to each property's owners and investors.

- **TGLP — Tremblant Gateway** (Mont-Tremblant, QC): A mixed-use hospitality and commercial asset — a hotel with street-level retail and restaurant tenants, held in a limited partnership with active investor reporting.
- **Vanchamp** (Van Horne & Champagneur, Montréal, QC): A mixed-use office and commercial building anchored by a CLSC health clinic, with professional office suites, street-level retail, and parking.
- **Bukoval** (Lajeunesse, Montréal, QC): A multi-tenant net-lease commercial property anchored by established national tenants including McDonald's and the SAQ — a stable income asset.

Close the section with a discreet note that these are a selection of managed assets and that detailed performance is reported privately to owners/investors.

## 5. Tone and positioning

- **Professional, calm, trustworthy, precise.** This is a financial and asset-stewardship firm. Confidence without hype.
- **Operator-to-operator.** The audience is sophisticated owners, developers, and investors. Speak plainly and directly; respect their time.
- **Modern and tech-forward**, but understated — clean, not flashy. The technology should read as *competence and rigor*, not as a startup pitch.
- **Bilingual-friendly.** English-first is fine for v1, but the design should leave room for a FR/EN language toggle, and avoid idioms that won't translate.

---

## 6. Suggested site structure (single-page, scroll)

1. **Header / nav** — Masteko wordmark; nav links (Services, Approach, Who We Serve, Contact); optional EN/FR toggle.
2. **Hero** — strong one-line value proposition + short supporting sentence + primary call-to-action ("Book a call" / "Get in touch"). Quiet, premium feel.
3. **Services** — three cards: Asset Management, Property Management, Bookkeeping & Accounting. Each with a short description and 3–4 bullet capabilities.
4. **Approach / Technology** — the MastekoDWH + Financial Model + AI reporting differentiator. A short "how we work" with the consolidated, multi-entity, real-time reporting story.
5. **Who We Serve** — owners/developers, LPs & investors, property owners; emphasize multi-entity discipline and lender/CPA-ready output.
6. **Why Masteko** — a few trust points: bilingual Québec team, institutional-grade reporting, one team for asset + property + books, technology-enabled.
7. **Contact** — simple contact section with email and a short form (name, email, message). Montréal, QC.
8. **Footer** — Masteko / 9408-4811 Québec Inc., Montréal QC, copyright, EN/FR.

---

## 7. Visual direction

- **Palette:** deep navy / slate blue as the primary, with a warm gold or bronze accent for trust and quality; generous white/off-white space; charcoal text. Avoid loud or saturated colors.
- **Typography:** a refined serif for headings (authority, real-estate/finance feel) paired with a clean sans-serif for body. Alternatively an all-sans, high-contrast modern look — designer's call, but keep it premium and legible.
- **Imagery:** abstract architectural lines, clean building/skyline motifs, or subtle data-grid/graph textures. Avoid stocky "handshake" clichés. Can be CSS/SVG-driven if no photography is available.
- **Layout:** lots of breathing room, clear hierarchy, restrained motion (subtle fades on scroll at most). Mobile-responsive.
- **Logo:** if no logo exists, set "Masteko" as a clean wordmark — confident, slightly serif or geometric sans, with a small accent mark.

---

## 8. Key copy points (facts to draw from)

- Three services: **Asset Management, Property Management, Bookkeeping & Accounting.**
- One team handling the full financial and operational stack for real estate groups.
- **Multi-entity** specialists — built to manage many companies, partnerships, and LPs cleanly at once.
- **Lender-ready and CPA-ready** financials and reporting.
- **Investor / LP reporting**, capital calls, distributions, quarterly and annual reports.
- Proprietary technology: **data warehouse + financial model + AI-assisted reporting**.
- **Bilingual Montréal, Québec team.**
- Contact: `pete@masteko.ca` (operations) — confirm preferred public contact address before launch.

---

## 9. Deliverable

A modern, responsive, single-page marketing website for Masteko, build-ready as static HTML/CSS (optionally light JS for nav, form, and language toggle). It should work opened directly in a browser, with no backend required for v1 (contact form can use a mailto or a placeholder endpoint).
