// pnpm check:director-visual-fidelity
//
// Visual-truth audit. `renderable` only proves a recipe resolves to shared engines; this check
// separately tracks whether the named visual is exact, representative, or placeholder.

import {directorRecipeCatalog} from '../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import {startMotionPresets} from '../../movie-dashboard/src/data/startMotionKit.ts';
import {
  directorRecipeVisualAudit,
  directorVisualFidelityCounts,
  getDirectorRecipeVisualAudit,
  motionPresetVisualSupport,
  validateMotionPresetVisualSupportCoverage,
} from '../../movie-dashboard/src/data/directorRecipeVisualFidelity.ts';

let errors = 0;
const fail = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};

for (const issue of validateMotionPresetVisualSupportCoverage()) fail(issue);

if (motionPresetVisualSupport.length !== startMotionPresets.length) {
  fail(`expected one visual audit per Motion Kit preset: audit=${motionPresetVisualSupport.length}, presets=${startMotionPresets.length}`);
}
if (directorRecipeVisualAudit.length !== directorRecipeCatalog.length) {
  fail(`expected one visual audit per Director Recipe: audit=${directorRecipeVisualAudit.length}, recipes=${directorRecipeCatalog.length}`);
}
if (directorRecipeCatalog.length !== 97) {
  fail(`Director Recipe catalog contract expected 97 recipes, found ${directorRecipeCatalog.length}`);
}

for (const recipe of directorRecipeCatalog) {
  const audit = getDirectorRecipeVisualAudit(recipe);
  if (audit.limitingPresetIds.length === 0) fail(`${recipe.id}: no limiting preset recorded`);
  if (audit.reasons.some((reason) => !reason.trim())) fail(`${recipe.id}: empty visual fidelity reason`);
}

const total = directorVisualFidelityCounts.exact + directorVisualFidelityCounts.representative + directorVisualFidelityCounts.placeholder;
if (total !== directorRecipeCatalog.length) {
  fail(`fidelity counts do not sum to catalog size: ${JSON.stringify(directorVisualFidelityCounts)}`);
}

const supportById = new Map(motionPresetVisualSupport.map((item) => [item.presetId, item]));

// These J3 visuals have a dedicated implementation AND were inspected through the rendered
// StartDirectorVisualUpgradesV1 Actions artifact. Do not regress them to a generic approximation.
const artifactReviewedExact = [
  'photo-2p5d-parallax',
  'accent-halftone-burst',
  'accent-scribble-underline',
  'accent-stamp-triplet',
];
for (const id of artifactReviewedExact) {
  const item = supportById.get(id);
  if (!item) fail(`missing artifact-reviewed visual fidelity preset: ${id}`);
  else if (item.fidelity !== 'exact') fail(`${id} should remain exact after dedicated implementation + artifact review`);
}

// Remaining known approximations/placeholders stay guarded against accidental inflation.
const requiredNonExact = [
  'photo-freeze-cutout',
  'cut-hard-accent',
  'cut-match-shape',
  'wipe-route-line',
  'whip-source-matched',
  'accent-cel-shadow-sweep',
  'accent-micro-rgb-split',
];
for (const id of requiredNonExact) {
  const item = supportById.get(id);
  if (!item) fail(`missing sentinel visual fidelity preset: ${id}`);
  else if (item.fidelity === 'exact') fail(`${id} must not be marked exact until its dedicated visual is implemented and artifact-reviewed`);
}

if (errors > 0) {
  console.error(`Director Recipe visual fidelity contracts FAILED: ${errors} error(s).`);
  process.exit(1);
}

console.log(
  `Director Recipe visual fidelity OK: ${motionPresetVisualSupport.length}/${startMotionPresets.length} presets audited, ` +
    `${directorRecipeVisualAudit.length} recipes => exact=${directorVisualFidelityCounts.exact}, ` +
    `representative=${directorVisualFidelityCounts.representative}, placeholder=${directorVisualFidelityCounts.placeholder}.`,
);
