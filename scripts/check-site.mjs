// Guardrails for a static site: run against _site/ before anything ships.
// Zero dependencies on purpose - no supply chain, no install step, fast in CI.
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = path.join(ROOT, '_site');
const BASELINE = path.join(ROOT, 'scripts', 'i18n-baseline.json');

const problems = [];
const notes = [];
const fail = (check, msg) => problems.push(`${check}: ${msg}`);

if (!existsSync(SITE)) {
  console.error('check: _site/ not found - run `npm run build` first');
  process.exit(1);
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const htmlFiles = (await walk(SITE)).sort();

const strip = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

for (const file of htmlFiles) {
  const rel = path.relative(SITE, file);
  const raw = await readFile(file, 'utf8');
  const html = strip(raw);

  // ---- 1. local asset integrity -------------------------------------------
  const refs = [...raw.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#|data:|\/\/)/.test(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    const target = path.resolve(path.dirname(file), clean);
    if (!existsSync(target)) fail('assets', `${rel} references missing file "${ref}"`);
  }

  // ---- 2. internal anchor integrity ---------------------------------------
  const ids = new Set([...raw.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  for (const ref of refs) {
    if (!ref.startsWith('#') || ref === '#') continue;
    if (!ids.has(ref.slice(1))) fail('anchors', `${rel} links to "${ref}" but no element has that id`);
  }

  // ---- 3. accessibility basics --------------------------------------------
  for (const [, tag] of raw.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt=/.test(tag)) fail('a11y', `${rel} has an <img> with no alt attribute: ${tag.trim().slice(0, 70)}`);
  }
  if (!/<html[^>]+\blang=/.test(raw)) fail('a11y', `${rel} <html> is missing a lang attribute`);
  // prototypes/ is a design showcase - several variants share one page, each
  // with its own h1 - so document-structure rules apply to real pages only.
  const isShowcase = rel.startsWith('prototypes' + path.sep) || rel.startsWith('prototypes/');
  if (!isShowcase) {
    const h1s = [...html.matchAll(/<h1\b/g)].length;
    if (h1s !== 1) fail('a11y', `${rel} has ${h1s} <h1> elements (expected exactly 1)`);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => +m[1]);
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        fail('a11y', `${rel} heading order jumps h${levels[i - 1]} -> h${levels[i]}`);
        break;
      }
    }
  }

  // ---- 4. document head ----------------------------------------------------
  if (!/<title>[^<]{5,}<\/title>/.test(raw)) fail('meta', `${rel} missing a non-trivial <title>`);
  if (!/name="viewport"[^>]*width=device-width/.test(raw))
    fail('meta', `${rel} missing <meta name="viewport" content="width=device-width...">`);
  if (rel === 'index.html' && !/name="description"/.test(raw))
    fail('meta', `${rel} missing <meta name="description">`);
}

// ---- 5. EN/FR translation completeness ------------------------------------
// Any element carrying visible text should have a data-en/data-fr pair so the
// FR toggle swaps it. Strings that are legitimately identical in French
// (names, numbers, brands) live in the baseline; this check fails only on NEW
// untranslated strings, so the guardrail works without forcing a copy rewrite.
const index = await readFile(path.join(SITE, 'index.html'), 'utf8');
const body = strip(index.split('<body')[1] ?? index);
const untranslated = [];
for (const m of body.matchAll(/<(h1|h2|h3|h4|p|span|a|li|dt|dd|button|address|b|i)\b([^>]*)>([\s\S]*?)<\/\1>/g)) {
  const [, tag, attrs, inner] = m;
  const text = inner.replace(/<[^>]+>/g, '').trim();
  if (!text) continue;
  if (attrs.includes('data-fr') || inner.includes('data-fr')) continue;
  untranslated.push(text);
}
let base = { intentional: [], knownGaps: [] };
try { base = JSON.parse(await readFile(BASELINE, 'utf8')); } catch {}
const intentional = base.intentional ?? [];
const knownGaps = base.knownGaps ?? [];
const known = new Set([...intentional, ...knownGaps]);
const fresh = [...new Set(untranslated)].filter(t => !known.has(t));
for (const t of fresh) fail('i18n', `new untranslated string (no data-fr): "${t.slice(0, 60)}"`);
const openGaps = knownGaps.filter(t => untranslated.includes(t));
if (openGaps.length)
  notes.push(`i18n: ${openGaps.length} known untranslated string(s) still open -> ${openGaps.map(g => JSON.stringify(g)).join(', ')}`);
const stale = [...intentional, ...knownGaps].filter(t => !untranslated.includes(t));
if (stale.length) notes.push(`i18n: ${stale.length} baseline entr(ies) no longer in the page - prune scripts/i18n-baseline.json`);

// ---- report ---------------------------------------------------------------
for (const n of notes) console.log(`note  ${n}`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s) found:\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`check: passed - ${htmlFiles.length} HTML file(s), assets/anchors/a11y/meta/i18n all clean`);
