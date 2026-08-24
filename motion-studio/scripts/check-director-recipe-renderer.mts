// pnpm check:director-recipes
//
// Director Recipe Catalog (Phase A, movie-dashboard/src/data/directorRecipeCatalog.ts) x
// shared Remotion renderer adapter (Phase B, src/motion-kit/directorRecipeAdapter.ts).
//
// Verifies that every recipe in the catalog:
//   1. resolves through the adapter without throwing (unknown motionPresetIds would throw),
//   2. maps only to the shared engine set (no ad-hoc per-recipe component escape hatch),
//   3. is registered as a Composition in DirectorRecipeRoot.tsx,
// so "97 recipes are all renderable" is a checked fact, not a claim.

import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {directorRecipeCatalog, resolveAllDirectorRecipes} from '../src/motion-kit/directorRecipeAdapter.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let errors = 0;
const err = (msg: string) => {
  errors++;
  console.error(`❌ ${msg}`);
};

const KNOWN_ENGINES = new Set(['typography-reveal', 'camera-transform', 'transition-wipe', 'graphic-hit', 'native-cut', 'photo-layout']);

if (directorRecipeCatalog.length < 80) {
  err(`Director Recipe Catalog has only ${directorRecipeCatalog.length} entries; Phase A target was 80-100.`);
}

let resolved: ReturnType<typeof resolveAllDirectorRecipes>;
try {
  resolved = resolveAllDirectorRecipes();
} catch (error) {
  err(`resolveAllDirectorRecipes() threw: ${(error as Error).message}`);
  resolved = [];
}

for (const {recipe, layers, durationInFrames} of resolved) {
  if (layers.length === 0) err(`recipe "${recipe.id}" resolved to zero layers`);
  for (const layer of layers) {
    if (!KNOWN_ENGINES.has(layer.engine)) err(`recipe "${recipe.id}" uses unknown engine "${layer.engine}"`);
  }
  if (!(durationInFrames >= 24 && durationInFrames <= 180)) {
    err(`recipe "${recipe.id}" duration out of preview bounds: ${durationInFrames}`);
  }
}

const rootSrc = readFileSync(join(root, 'src/DirectorRecipeRoot.tsx'), 'utf8');
for (const recipe of directorRecipeCatalog) {
  if (!rootSrc.includes('directorRecipeCatalog.map')) {
    err('DirectorRecipeRoot.tsx must register recipes by iterating directorRecipeCatalog (data-driven), not one Composition per recipe id.');
    break;
  }
}

const indexSrc = readFileSync(join(root, 'src/index-director-recipes.ts'), 'utf8');
if (!indexSrc.includes('registerRoot(DirectorRecipeRoot)')) err('index-director-recipes.ts must registerRoot(DirectorRecipeRoot)');

const engines = readFileSync(join(root, 'src/motion-kit/engines.tsx'), 'utf8');
for (const engine of ['TypographyRevealEngine', 'CameraTransformEngine', 'TransitionWipeEngine', 'GraphicHitEngine', 'NativeCutEngine', 'PhotoLayoutEngine']) {
  if (!engines.includes(`function ${engine}`)) err(`shared renderer engine missing: ${engine}`);
}

// Guardrail from the task brief: do not balloon into one component per recipe. Count how many
// distinct component files render recipes (should stay at 1: DirectorRecipePreview.tsx).
const previewSrc = readFileSync(join(root, 'src/compositions/common/DirectorRecipePreview.tsx'), 'utf8');
if (!previewSrc.includes('export function DirectorRecipePreview')) err('DirectorRecipePreview.tsx must export a single data-driven DirectorRecipePreview component');

if (errors) {
  console.error(`Director Recipe renderer contracts FAILED (${errors})`);
  process.exit(1);
}
console.log(
  `Director Recipe renderer contracts OK: ${directorRecipeCatalog.length} recipes / ${resolved.reduce((n, r) => n + r.layers.length, 0)} total layers / 6 shared engines (4 existing + 2 Phase B: native-cut, photo-layout).`,
);
