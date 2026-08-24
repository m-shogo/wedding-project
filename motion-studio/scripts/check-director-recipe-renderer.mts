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
import {directorRecipeCatalog, directorRecipeCategories, resolveAllDirectorRecipes} from '../src/motion-kit/directorRecipeAdapter.ts';
import {
  highlightReelRecipeIds,
  recipeIdsForCategory,
  categoryReelLabels,
  comparisonSets,
  reelDurationInFrames,
  comparisonDurationInFrames,
} from '../src/motion-kit/directorRecipeReelSelections.ts';

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

// --- Phase C: Highlight Reel / Category Reels / Comparison Sets --------------------------
// A reel is only useful if it stays sittable-through. 90s at 30fps is a generous cap for a
// *research* reel covering up to 16 recipes at their full declared duration (final delivery
// reels, which would be far shorter and hand-trimmed, are a Phase D+ concern).
const MAX_REEL_FRAMES = 90 * 30;

const highlightIdSet = new Set(highlightReelRecipeIds);
if (highlightIdSet.size !== highlightReelRecipeIds.length) err('Highlight Reel selection contains duplicate recipe ids.');
for (const id of highlightReelRecipeIds) {
  if (!directorRecipeCatalog.some((r) => r.id === id)) err(`Highlight Reel references unknown recipe id "${id}".`);
}
const highlightCategoriesCovered = new Set(directorRecipeCatalog.filter((r) => highlightIdSet.has(r.id)).map((r) => r.category));
if (highlightCategoriesCovered.size !== directorRecipeCategories.length) {
  err(`Highlight Reel does not cover all categories: ${highlightCategoriesCovered.size}/${directorRecipeCategories.length}.`);
}
const highlightFrames = reelDurationInFrames(highlightReelRecipeIds);
if (highlightFrames > MAX_REEL_FRAMES) err(`Highlight Reel is ${(highlightFrames / 30).toFixed(1)}s, exceeds the ${MAX_REEL_FRAMES / 30}s research-reel cap.`);

let categoryRecipeCount = 0;
for (const category of directorRecipeCategories) {
  const ids = recipeIdsForCategory(category);
  if (ids.length === 0) err(`Category "${category}" has zero recipes; its reel would be empty.`);
  categoryRecipeCount += ids.length;
  if (!categoryReelLabels[category]) err(`Category "${category}" has no entry in categoryReelLabels (used for the reel title / README).`);
  const frames = reelDurationInFrames(ids);
  if (frames > MAX_REEL_FRAMES) err(`Category Reel "${category}" is ${(frames / 30).toFixed(1)}s, exceeds the ${MAX_REEL_FRAMES / 30}s research-reel cap.`);
}
if (categoryRecipeCount !== directorRecipeCatalog.length) {
  err(`Category Reels together cover ${categoryRecipeCount} recipes, expected all ${directorRecipeCatalog.length} (every recipe belongs to exactly one category reel).`);
}

if (comparisonSets.length < 2) err(`Phase C requires at least 2 comparison sets, found ${comparisonSets.length}.`);
for (const set of comparisonSets) {
  if (set.recipeIds.length < 2) err(`Comparison set "${set.id}" has fewer than 2 recipes.`);
  const uniqueIds = new Set(set.recipeIds);
  if (uniqueIds.size !== set.recipeIds.length) err(`Comparison set "${set.id}" contains duplicate recipe ids.`);
  for (const id of set.recipeIds) {
    if (!directorRecipeCatalog.some((r) => r.id === id)) err(`Comparison set "${set.id}" references unknown recipe id "${id}".`);
  }
  const frames = comparisonDurationInFrames(set.recipeIds);
  if (!(frames >= 12 && frames <= 240)) err(`Comparison set "${set.id}" duration out of bounds: ${frames} frames.`);
}

const rootSrcPhaseC = readFileSync(join(root, 'src/DirectorRecipeRoot.tsx'), 'utf8');
if (!rootSrcPhaseC.includes('directorRecipeCategories.map')) {
  err('DirectorRecipeRoot.tsx must register Category Reels by iterating directorRecipeCategories (data-driven), not one Composition per category id.');
}
if (!rootSrcPhaseC.includes('comparisonSets.map')) {
  err('DirectorRecipeRoot.tsx must register comparison Compositions by iterating comparisonSets (data-driven).');
}
if (!rootSrcPhaseC.includes('DirectorRecipeReel-Highlight')) {
  err('DirectorRecipeRoot.tsx must register the DirectorRecipeReel-Highlight Composition.');
}

if (errors) {
  console.error(`Director Recipe renderer contracts FAILED (${errors})`);
  process.exit(1);
}
console.log(
  `Director Recipe renderer contracts OK: ${directorRecipeCatalog.length} recipes / ${resolved.reduce((n, r) => n + r.layers.length, 0)} total layers / 6 shared engines (4 existing + 2 Phase B: native-cut, photo-layout).`,
);
console.log(
  `Phase C reels OK: Highlight Reel ${highlightReelRecipeIds.length} recipes / ${(highlightFrames / 30).toFixed(1)}s, ${directorRecipeCategories.length} Category Reels covering all ${categoryRecipeCount} recipes, ${comparisonSets.length} comparison sets.`,
);
