// pnpm render:director-recipe-collection <composition-id> [--scale=0.667] [--crf=30]
//
// Renders one Phase C reel/category-reel/comparison Composition (NOT one of the 97 single-recipe
// ones, which use render-director-recipe.mts) to out/director-recipes/<id>.mp4. Valid ids:
//   DirectorRecipeReel-Highlight
//   DirectorRecipeReel-<category-slug>       e.g. DirectorRecipeReel-cinematic-camera (see categorySlug())
//   DirectorRecipeComparison-<set-id>        (see directorRecipeReelSelections.ts comparisonSets)
//
// Defaults to scale=0.667 against the 1920x1080 Composition (-> 1280x720) at crf=30, per the
// Phase C brief ("実際に見て比較できるレベルの720pプレビュー"). Pass --scale=1 for a full 1080p
// render.

import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const compositionId = args.find((arg) => !arg.startsWith('--'));
const extraFlags = args.filter((arg) => arg.startsWith('--'));

if (!compositionId) {
  console.error('Usage: pnpm render:director-recipe-collection <composition-id> [remotion render flags]');
  console.error('Example ids: DirectorRecipeReel-Highlight, DirectorRecipeReel-typography, DirectorRecipeComparison-hero-photo-presentation');
  console.error('List all: pnpm exec remotion compositions src/index-director-recipes.ts');
  process.exit(1);
}

if (!compositionId.startsWith('DirectorRecipeReel-') && !compositionId.startsWith('DirectorRecipeComparison-')) {
  console.error(`❌ "${compositionId}" is not a reel/category-reel/comparison id. Use render:director-recipe for a single recipe id instead.`);
  process.exit(1);
}

const knownIdsRaw = execSync('pnpm exec remotion compositions src/index-director-recipes.ts', {cwd: root}).toString();
if (!knownIdsRaw.includes(compositionId)) {
  console.error(`❌ unknown composition id "${compositionId}". Run: pnpm exec remotion compositions src/index-director-recipes.ts`);
  process.exit(1);
}

const outDir = join(root, 'out/director-recipes');
if (!existsSync(outDir)) mkdirSync(outDir, {recursive: true});
const outFile = join('out/director-recipes', `${compositionId}.mp4`);

const hasScaleFlag = extraFlags.some((f) => f.startsWith('--scale'));
const hasCrfFlag = extraFlags.some((f) => f.startsWith('--crf'));
const defaultFlags = [
  ...(hasScaleFlag ? [] : ['--scale=0.667']),
  ...(hasCrfFlag ? [] : ['--crf=30']),
];

const result = spawnSync(
  'pnpm',
  ['exec', 'remotion', 'render', 'src/index-director-recipes.ts', compositionId, outFile, ...defaultFlags, ...extraFlags],
  {cwd: root, stdio: 'inherit'},
);
process.exit(result.status ?? 1);
