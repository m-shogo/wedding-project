import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const manifest = read("src/data/projectProductionHandoffManifest.ts");
const batchCard = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const workspace = read("src/data/motionZukanProductionWorkspace.ts");
const projectBatch = read("src/data/typographyProjectDeliveryBatch.ts");
const openingGate = read("src/data/openingProductionGate.generated.ts");

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
  'import {openingProductionGate} from "./openingProductionGate.generated"',
  'authority: "MOTION_STUDIO_OPENING_V1_MEDIA_GATE"',
  'if (projectId !== "opening") return null',
  'photoMissingCount: openingProductionGate.photoMissingCount',
  'bgm: {...openingProductionGate.bgm}',
  'ambience: openingProductionGate.ambience.map',
  'blockingGatePass: !openingProductionGate.finalBlocked',
  'OPENING_V1_PHOTOS:',
  'OPENING_V1_BGM:',
  'OPENING_V1_AMBIENCE:',
  'openingV1MediaBlockingGatePass',
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
  'OPENING V1 / MOTION STUDIO MEDIA GATE',
  'openingMedia.resolvedPhotoCount',
  'openingMedia.bgm.playable',
  'openingMedia.ambiencePlayableCount',
  'openingMedia.photoSlots.map',
  '11写真/BGM blocking gate',
  'manifest.handoff.warnings',
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

for (const token of [
  '"expectedPhotoCount": 11',
  '"photoSlots": [',
  '"assetId": "opening-bgm-main"',
  '"ambience": [',
  '"finalBlocked": true',
]) {
  requireText(openingGate, token, `Opening generated production gate contract missing: ${token}`);
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

console.log("Project Production Handoff Manifest contracts OK: current Typography packages and workspace state are joined with the Motion Studio Opening V1 11-photo/BGM blocking gate plus ambience mix readiness, without claiming Mac Actual or production release.");
