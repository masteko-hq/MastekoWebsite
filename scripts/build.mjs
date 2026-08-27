// Assembles the publishable site into _site/.
// Only what belongs on the public web goes in - internal docs stay in the repo.
import { cp, rm, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, '_site');

// Everything the browser needs, and nothing else. Internal markdown
// (WEBSITE_RECOMMENDATIONS.md, Masteko_Website_Brief.md, DEPLOY.md, EDITING.md)
// is deliberately excluded so it is not served publicly.
const PUBLISH = ['index.html', 'assets', 'prototypes'];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const entry of PUBLISH) {
  const src = path.join(ROOT, entry);
  if (!existsSync(src)) {
    console.error(`build: missing "${entry}" - refusing to publish an incomplete site`);
    process.exit(1);
  }
  await cp(src, path.join(OUT, entry), { recursive: true });
}

const count = async (dir) => {
  let n = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? await count(path.join(dir, e.name)) : 1;
  }
  return n;
};
console.log(`build: _site/ ready - ${await count(OUT)} files from [${PUBLISH.join(', ')}]`);
