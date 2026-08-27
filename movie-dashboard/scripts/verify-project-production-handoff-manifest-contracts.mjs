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
const openingPhotoPlan = read("src/data/openingV1PhotoProductionPlan.ts");
const profileGate = read("src/data/profileProductionGate.generated.ts");

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
  'openingV1PhotoPlanForSlot',
  'authority: "MOTION_STUDIO_OPENING_V1_MEDIA_GATE"',
  'if (projectId !== "opening") return null',
  'photoMissingCount: openingProductionGate.photoMissingCount',
  'OPENING_V1_PHOTO_PLAN_MISSING',
  'placements: plan.placements.map',
  'qa: {...plan.qa}',
  'bgm: {...openingProductionGate.bgm}',
  'ambience: openingProductionGate.ambience.map',
  'blockingGatePass: !openingProductionGate.finalBlocked',
  'OPENING_V1_PHOTOS:',
  'OPENING_V1_BGM:',
  'OPENING_V1_AMBIENCE:',
  'openingV1MediaBlockingGatePass',
  'import {profileProductionGate} from "./profileProductionGate.generated"',
  'authority: "MOTION_STUDIO_PROFILE_V1_MEDIA_GATE"',
  'if (projectId !== "profile") return null',
  'profileV1Media: ProfileV1ProductionMediaGateV1 | null',
  'PROFILE_V1_MEDIA:',
  'PROFILE_V1_BGM:',
  'profileV1MediaBlockingGatePass',
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
  '写真/BGM blocking gate',
  'PROFILE V1 / MOTION STUDIO MEDIA GATE',
  'profileMedia.resolvedMediaCount',
  'profileMedia.bgm.rightsState',
  'profileMedia.chapters.map',
  'profileMedia.mediaSlots.map',
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

for (const slot of [
  "okinawa-01", "okinawa-02", "okinawa-03",
  "seoul-01", "seoul-02", "seoul-03",
  "hawaii-01", "hawaii-02", "hawaii-03",
  "hero-01", "hero-02",
]) {
  requireText(openingPhotoPlan, `slotKey: "${slot}"`, `Opening photo production plan missing slot: ${slot}`);
}
for (const token of [
  'startSeconds: 0, endSeconds: 2, role: "cold-open"',
  'startSeconds: 35, endSeconds: 44, role: "hero-a"',
  'startSeconds: 44, endSeconds: 53, role: "hero-b"',
  'crop: "NOT_RUN"',
  'focus: "NOT_RUN"',
  'color: "NOT_RUN"',
  'motion: "NOT_RUN"',
]) {
  requireText(openingPhotoPlan, token, `Opening photo production plan contract missing: ${token}`);
}

for (const token of [
  '"chapterCount": 5',
  '"expectedMediaCount": 17',
  '"mediaMissingCount": 17',
  '"assetId": "profile-bgm-main"',
  '"rightsState": "NOT_RUN"',
  '"blockingGatePass": false',
  '"macDaVinciActual": "NOT_RUN"',
  '"productionReady": false',
]) {
  requireText(profileGate, token, `Profile generated production gate contract missing: ${token}`);
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

console.log("Project Production Handoff Manifest contracts OK: current Typography/workspace state is joined with Opening 11-photo/BGM/ambience and Profile 5-chapter/17-media/BGM-rights gates; Profile rights begin NOT_RUN until a separate human approval is current; Human QA, Mac Actual and release remain fail-closed.");
