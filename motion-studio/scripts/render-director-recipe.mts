// pnpm render:director-recipe <recipe-id> [--scale=0.25] [--crf=30]
//
// Renders exactly one Director Recipe Catalog entry to out/director-recipes/<id>.mp4.
// Defaults to a low-res / high-crf preview since the point is "does this recipe actually
// render", not delivering a final-quality asset for all 97 recipes. See
// src/motion-kit/directorRecipeAdapter.ts for how a recipe id maps to shared engines, and
// `pnpm director-recipes:list` for all valid ids.

import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {directorRecipeCatalog} from '../src/motion-kit/directorRecipeAdapter.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const recipeId = args.find((arg) => !arg.startsWith('--'));
const extraFlags = args.filter((arg) => arg.startsWith('--'));

if (!recipeId) {
  console.error('Usage: pnpm render:director-recipe <recipe-id> [remotion render flags]');
  console.error(`Example ids: ${directorRecipeCatalog.slice(0, 3).map((r) => r.id).join(', ')}, ...`);
  process.exit(1);
}

if (!directorRecipeCatalog.some((recipe) => recipe.id === recipeId)) {
  console.error(`❌ unknown recipe id "${recipeId}". Run: pnpm director-recipes:list`);
  process.exit(1);
}

const outDir = join(root, 'out/director-recipes');
if (!existsSync(outDir)) mkdirSync(outDir, {recursive: true});
const outFile = join('out/director-recipes', `${recipeId}.mp4`);

const defaultFlags = ['--scale=0.25', '--crf=30'];
const flags = extraFlags.length ? extraFlags : defaultFlags;

const result = spawnSync(
  'pnpm',
  ['exec', 'remotion', 'render', 'src/index-director-recipes.ts', `DirectorRecipe-${recipeId}`, outFile, ...flags],
  {cwd: root, stdio: 'inherit'},
);
process.exit(result.status ?? 1);
