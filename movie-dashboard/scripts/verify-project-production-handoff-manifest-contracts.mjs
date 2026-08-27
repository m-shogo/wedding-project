import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const manifest = read("src/data/projectProductionHandoffManifest.ts");
const batchCard = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const workspace = read("src/data/motionZukanProductionWorkspace.ts");
const projectBatch = read("src/data/typographyProjectDeliveryBatch.ts");

const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "wedding-movie-project-production-handoff/v1"',
  'authority: "DERIVED_HANDOFF_MANIFEST"',
  'buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections)',
  'getFinalChecks(composer, workspace, projectId)',
  'sceneMetaFor(workspace, scene.sceneId)',
  'placeholder: asset.placeholder',
  'sourceRef: asset.sourceRef',
  'workspace.musicMarkers',
  'workspace.designSettings',
  'typography.summary.batchReadyForPalmierDaVinciHandoff && finalChecksPass',
  'productionReady: false',
  'DaVinci Mac Actual / Human promotion / Scene-bound Release Gate',
]) {
  requireText(manifest, token, `production handoff manifest missing: ${token}`);
}

for (const token of [
  'MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT',
  'buildProjectProductionHandoffManifest(',
  '実制作handoff manifest',
  'disabled={!assemblyReady}',
  'workspace checks',
  'Production Workspace final checks',
  'manifest.productionWorkspace.finalChecks.map',
  'productionReady=NO',
]) {
  requireText(batchCard, token, `production handoff UI missing: ${token}`);
}

for (const finalCheck of [
  'id: "scenes-exist"',
  'id: "materials-assigned"',
  'id: "no-placeholder"',
  'id: "all-scenes-done"',
  'id: "duplicate-usage-reviewed"',
]) {
  requireText(workspace, finalCheck, `Production Workspace final check missing: ${finalCheck}`);
}

requireText(projectBatch, 'productionReady: false', "Typography project batch no longer fails closed");

for (const forbidden of [
  'productionReady: true',
  'readyForPalmierDaVinciAssembly: true',
]) {
  if (manifest.includes(forbidden)) errors.push(`manifest hardcodes unsafe readiness: ${forbidden}`);
}

if (errors.length) {
  console.error(`Project Production Handoff Manifest contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Project Production Handoff Manifest contracts OK: current Typography packages, assigned real assets, Scene completion, duplicate/placeholder checks, music markers and design settings are bundled for assembly without claiming Mac Actual or production release.");
