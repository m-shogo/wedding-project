// pnpm check:director-visual-fidelity
//
// Visual-truth audit. `renderable` only proves a recipe resolves to shared engines; this check
// separately tracks whether the named visual is exact, representative, or placeholder.

import {directorRecipeCatalog} from '../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import {startMotionPresets} from '../../movie-dashboard/src/data/startMotionKit.ts';
import {readFileSync} from 'node:fs';
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

// These J3 visuals are exact promotion candidates. Static metadata alone is insufficient:
// the separate CI rendered-pixel oracle must validate their artifact before merge.
const exactPromotionCandidates = [
  'photo-2p5d-parallax',
  'accent-halftone-burst',
  'accent-scribble-underline',
  'accent-stamp-triplet',
];
for (const id of exactPromotionCandidates) {
  const item = supportById.get(id);
  if (!item) fail(`missing exact-promotion visual fidelity preset: ${id}`);
  else if (item.fidelity !== 'exact') fail(`${id} should remain exact while its independent rendered-pixel oracle is required`);
}

const reviewWorkflow = readFileSync('../.github/workflows/start-director-review-ci.yml', 'utf8');
const renderStep = reviewWorkflow.indexOf('remotion render src/index-director-recipes.ts StartDirectorVisualUpgradesV1');
const oracleStep = reviewWorkflow.indexOf('pnpm check:director-visual-upgrade-artifact');
const uploadStep = reviewWorkflow.indexOf('Upload StaRt visual-upgrade review artifact');
if (renderStep < 0 || oracleStep < renderStep || uploadStep < oracleStep) {
  fail('exact visual upgrades require the independent rendered-pixel oracle in Start Director Review CI');
}
const oracleSource = readFileSync('scripts/verify-director-visual-upgrade-artifact.mts', 'utf8');
for (const forbiddenImport of [/from\s+['"][^'"]*\/src\//, /from\s+['"][^'"]*directorRecipeAdapter/, /from\s+['"][^'"]*directorRecipeVisualFidelity/, /from\s+['"][^'"]*DirectorVisualUpgradeReview/]) {
  if (forbiddenImport.test(oracleSource)) fail(`rendered-pixel oracle must not import implementation/audit source: ${forbiddenImport}`);
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
