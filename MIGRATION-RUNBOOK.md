# Migrating masteko.ca from GitHub Pages to HostGator

Written 2026-08-27. Follow in order. Steps 1–4 are reversible and invisible to
visitors; step 6 is the only irreversible one.

**Why the order matters:** the `masteko-hq` GitHub org is on the **free** plan,
and GitHub Pages does not serve private repositories on free. The moment the
repo becomes private, Pages stops. So HostGator must already be serving the
site before that happens.

## Current state

| | |
|---|---|
| Serving | GitHub Pages, `main` branch, repo root |
| Apex `masteko.ca` | `185.199.108–111.153` (GitHub) |
| `www` | CNAME → `masteko-hq.github.io` |
| DNS managed at | HostGator, `ns6279`/`ns6280.hostgator.com` |
| cPanel server | `gator3140.hostgator.com` → `50.87.144.175` |
| Apex TTL | **14400s (4 hours)** |
| HTTPS | Let's Encrypt via GitHub, enforced |

**Do not touch these — company email depends on them:**
`MX → mail.masteko.ca` · SPF `v=spf1 +ip4:50.87.144.175 +include:sendgrid.net -all` ·
`mail` / `whm` / `webdisk` / `autoconfig` A records → `192.254.186.58`

Only the apex `A` record and the `www` record change.

---

## 1. Lower the TTL — do this first, then wait

HostGator cPanel → Domains → Zone Editor → masteko.ca.
Change **TTL only** on the apex `A` records and `www`: `14400` → `300`.
Leave the values alone.

**Then wait at least 4 hours.** Resolvers holding the old 14400s TTL must let it
expire before they will honour the 300s value. Skipping this wait means the
cutover — and any rollback — takes 4 hours instead of 5 minutes.

No visitor impact. Nothing is serving differently.

## 2. Add the GitHub secrets

Repo → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `SFTP_HOST` | `gator3140.hostgator.com` |
| `SFTP_USER` | cPanel username |
| `SFTP_PASSWORD` | cPanel password |
| `SFTP_PORT` | `2222` (HostGator shared SSH) |
| `SFTP_REMOTE_DIR` | `public_html` |

Until `SFTP_HOST` exists the deploy workflow builds, checks, and skips the
upload with a warning — it does not fail. Adding the secrets activates it.

## 3. Publish to HostGator while DNS still points at GitHub

Actions → **Deploy to HostGator** → Run workflow.

It builds `_site/`, runs the checks, and uploads. The final verification step
will still be hitting GitHub Pages at this point, which is expected.

Confirm HostGator is actually serving the new site **without changing DNS** —
run from your own machine, not a sandbox:

```bash
curl -sI --resolve masteko.ca:443:50.87.144.175 https://masteko.ca/ -k | head -5
```

Expect `200`. Then check the body contains the new logo:

```bash
curl -s --resolve masteko.ca:443:50.87.144.175 https://masteko.ca/ -k | grep -c masteko-logo.png
```

Do not continue until both pass.

## 4. Get the certificate issued before the flip

This is the step most likely to bite. HostGator AutoSSL validates over HTTP,
so it normally cannot issue for masteko.ca until DNS already points at
HostGator — leaving a window where visitors see a certificate warning, which
looks worse than an outage.

**Open a HostGator support ticket asking them to pre-issue AutoSSL for
`masteko.ca` and `www.masteko.ca` using DNS validation, ahead of the DNS
change.** If they can, this window becomes zero. If they cannot, do step 5 at a
genuinely low-traffic hour and force AutoSSL immediately after.

## 5. Cut over DNS

Zone Editor:
- Apex `A`: replace the four `185.199.x.153` records with `192.254.186.58`
- `www`: CNAME → `masteko.ca` (or A → `192.254.186.58`)

Then immediately: cPanel → SSL/TLS Status → **Run AutoSSL**, and watch until the
certificate covers both names.

Verify:

```bash
dig +short masteko.ca A
curl -sSI https://masteko.ca/ | head -3
curl -sS https://masteko.ca/ | grep -c masteko-logo.png
```

**Rollback:** restore the four GitHub IPs. With TTL at 300 you are back within
about five minutes. GitHub Pages is still live and the repo is still public, so
rollback works — until step 6.

## 6. Only after 24–48 hours of clean HostGator serving

In this order:

1. Repo → Settings → Pages → set Source to **None** (stops Pages serving).
2. Repo → Settings → General → Danger Zone → **Change visibility → Private**.
3. Zone Editor: restore TTL `300` → `14400`.

After this, GitHub rollback is gone. Everything below is your safety net until
then, which is why the wait matters.

## 7. Afterwards

- The `CNAME` file is now inert. Harmless; delete whenever.
- `WEBSITE_RECOMMENDATIONS.md`, `Masteko_Website_Brief.md`, `DEPLOY.md`, and
  `EDITING.md` are no longer published — `scripts/build.mjs` only copies
  `index.html`, `assets/`, and `prototypes/`.
- `DEPLOY.md` still documents the GitHub Pages setup and is now out of date.
