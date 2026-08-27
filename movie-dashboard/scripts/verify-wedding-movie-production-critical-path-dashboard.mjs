import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const model = read("src/data/weddingMovieProductionCriticalPath.ts");
const card = read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const sceneHandoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const openingHandoff = read("src/data/openingProductionStatusHandoff.ts");
const profileHandoff = read("src/data/profileProductionStatusHandoff.ts");
const errors = [];
const need = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'wedding-movie-production-critical-path-dashboard/v1',
  'DERIVED_FROM_MOTION_STUDIO_PRODUCTION_STATUS',
  'openingProductionStatus.stages',
  'profileProductionStatus.stages',
  'currentCriticalStage',
  'downstreamBlockedStages',
  'productionReady: opening.productionReady && profile.productionReady',
  'CI_STATUS != MAC_DAVINCI_ACTUAL',
]) need(model, token, `critical-path model missing ${token}`);

for (const token of [
  'NOW / PRODUCTION CRITICAL PATH',
  'current.detail',
  'current.path',
  'current.recovery',
  'project.downstreamBlockedStages',
  'wedding-movie-production-critical-path.json',
  'Opening:',
  'Profile:',
]) need(card, token, `critical-path UI missing ${token}`);

for (const token of [
  'WeddingMovieProductionCriticalPathCard',
  '<WeddingMovieProductionCriticalPathCard projectId={scene.projectId} />',
]) need(sceneHandoff, token, `Scene handoff critical-path routing missing ${token}`);

for (const [name, source, projectKey] of [
  ['Opening', openingHandoff, 'criticalPath: criticalPath.projects.opening'],
  ['Profile', profileHandoff, 'criticalPath: criticalPath.projects.profile'],
]) {
  need(source, 'buildWeddingMovieProductionCriticalPath', `${name} handoff does not derive critical path`);
  need(source, projectKey, `${name} handoff missing project critical path`);
  need(source, 'crossProjectCriticalPath', `${name} handoff missing cross-project critical path`);
  need(source, 'CRITICAL_PATH_EXPORTED != RECOVERY_EXECUTED', `${name} handoff missing recovery guardrail`);
}

for (const source of [model, card, openingHandoff, profileHandoff]) {
  if (source.includes('macDaVinciActualVerified: true') || source.includes('productionReady: true')) {
    errors.push('Critical-path dashboard hardcodes Actual or production readiness');
  }
}

if (errors.length) {
  console.error(`Wedding Movie production critical-path dashboard FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Wedding Movie production critical-path dashboard OK: current blocker, recovery, downstream waiting stages and cross-project readiness remain visible/exportable without promoting Human QA or Mac Actual.');
