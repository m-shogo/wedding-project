import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path: string) => readFileSync(join(studioRoot, path), 'utf8');
const pkg = JSON.parse(read('package.json')) as {scripts?: Record<string, string>};
const profile = read('scripts/init-profile-v1-real-media-review.mts');
const opening = read('scripts/init-opening-v1-preview-review.mts');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

if (pkg.scripts?.['profile:real-media-review:init'] !== 'node --no-warnings scripts/init-profile-v1-real-media-review.mts') {
  errors.push('profile review init must use the fresh-preview wrapper');
}
if (pkg.scripts?.['opening:preview-review:init'] !== 'node --no-warnings scripts/init-opening-v1-preview-review.mts') {
  errors.push('opening review init must use the fresh-preview wrapper');
}

requireText(profile, "spawnSync('pnpm', ['render:profile-v1:real-media-preview']", 'profile wrapper must render current real-media preview first');
requireText(profile, "'scripts/profile-v1-real-media-review.mts', '--init'", 'profile wrapper must initialize Human evidence after render');
requireText(opening, "spawnSync('pnpm', ['render:opening-v1:preview']", 'opening wrapper must render current preview first');
requireText(opening, "'scripts/opening-v1-preview-review.mts', '--init'", 'opening wrapper must initialize Human evidence after render');

const profileRenderIndex = profile.indexOf("render:profile-v1:real-media-preview");
const profileInitIndex = profile.indexOf("scripts/profile-v1-real-media-review.mts");
if (profileRenderIndex < 0 || profileInitIndex < 0 || profileRenderIndex >= profileInitIndex) {
  errors.push('profile wrapper ordering must be render -> evidence init');
}
const openingRenderIndex = opening.indexOf("render:opening-v1:preview");
const openingInitIndex = opening.indexOf("scripts/opening-v1-preview-review.mts");
if (openingRenderIndex < 0 || openingInitIndex < 0 || openingRenderIndex >= openingInitIndex) {
  errors.push('opening wrapper ordering must be render -> evidence init');
}

if (errors.length) {
  console.error(`Preview review init contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Preview review init contracts OK: Opening/Profile Human review initialization always refreshes the current-input preview before evidence binding.');
