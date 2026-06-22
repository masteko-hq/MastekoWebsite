# How to publish the Masteko website (for Nicole)

This is a static site — one `index.html` file with everything inside it. That makes hosting simple. The easiest free option is **GitHub Pages**, which serves the site straight from this repository. Steps below.

You only need a GitHub account with access to the repository.

> **Two handoff files come with this site** (alongside the `MastekoWebsite` folder):
> - `masteko-website.zip` — all the website files, ready to drag-and-drop into GitHub (use this for the simplest path, Part 1 Option A below).
> - `masteko-website.bundle` — a complete git repository in a single file, in case you prefer to clone the history: `git clone masteko-website.bundle masteko-website` (it already has a `main` branch and the first commit).

## Part 1 — Create the GitHub repository (one time)

If the repo isn't on GitHub yet:

1. Go to https://github.com/new
2. Repository name: `masteko-website`
3. Owner: the Masteko organization account (or Marc's account for now)
4. Visibility: **Private** is fine — GitHub Pages still works on private repos with a paid plan; if you want the simplest free path, choose **Public** (the site is public anyway once deployed).
5. Do **not** add a README, .gitignore, or license (this repo already has them).
6. Click **Create repository**. GitHub will show you a URL like `https://github.com/masteko/masteko-website.git`.

Then upload the files. Two ways:

**Option A — drag and drop (no command line):**
1. On the new empty repo page, click **uploading an existing file**.
2. Drag in all the files from the `MastekoWebsite` folder (`index.html`, `README.md`, `DEPLOY.md`, `EDITING.md`, `.gitignore`, `Masteko_Website_Brief.md`).
3. Click **Commit changes**.

**Option B — command line (if the repo is already initialized locally):**
```bash
cd MastekoWebsite
git remote add origin https://github.com/masteko/masteko-website.git
git branch -M main
git push -u origin main
```

## Part 2 — Turn on GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Click **Save**.
4. Wait 1–2 minutes. The page will refresh and show your live URL, e.g.
   `https://masteko.github.io/masteko-website/`
5. Open that URL to confirm the site is live.

That's it — the site is published. Every time someone commits a change to `main`, GitHub republishes automatically within a minute or two.

## Part 3 — Point the masteko.ca domain (optional, do once)

To serve the site at `www.masteko.ca` instead of the github.io URL:

1. In **Settings → Pages → Custom domain**, enter `www.masteko.ca` and Save.
2. At the domain registrar (wherever masteko.ca is managed), add a **CNAME** record:
   - Host/Name: `www`
   - Value: `masteko.github.io`
3. Back in GitHub Pages, tick **Enforce HTTPS** once it becomes available (can take up to a few hours).

If anything about DNS is unclear, send the registrar login to whoever manages it and I (or Marc) can finish this step.

## Notes

- **Contact form:** the form currently opens the visitor's email app addressed to `pete@masteko.ca` (a `mailto:` link). If we want submissions captured to a dashboard instead, the simplest path is a free service like Formspree — happy to wire that in; just ask.
- **Alternative host:** if GitHub Pages is ever inconvenient, this same folder can be drag-and-dropped onto Netlify (netlify.com) or Cloudflare Pages and it will work identically.
