import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const manifest = read("src/data/projectProductionHandoffManifest.ts");
const batchCard = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const profileGate = read("src/data/profileProductionGate.generated.ts");
const sync = read("scripts/sync-profile-production-gate.mjs");
const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'import {profileProductionGate} from "./profileProductionGate.generated"',
  'authority: "MOTION_STUDIO_PROFILE_V1_MEDIA_GATE"',
  'if (projectId !== "profile") return null',
  'profileV1Media: ProfileV1ProductionMediaGateV1 | null',
  'profileV1Media = buildProfileV1ProductionMediaGate(projectId)',
  'profileV1MediaBlockingGatePass',
  'PROFILE_V1_MEDIA:',
  'PROFILE_V1_BGM:',
  'profileV1MediaBlockingGatePass;',
  'Profileでは5章17実素材role + BGM権利gate',
  'productionReady: false',
]) {
  requireText(manifest, token, `Profile handoff manifest contract missing: ${token}`);
}

for (const token of [
  'PROFILE V1 / MOTION STUDIO MEDIA GATE',
  'profileMedia.resolvedMediaCount',
  'profileMedia.expectedMediaCount',
  'profileMedia.bgm.rightsState',
  'profileMedia.qa.macDaVinciActual',
  'profileMedia.chapters.map',
  'profileMedia.mediaSlots.map',
  'Profileは5章17実素材role/BGM権利',
  'disabled={!assemblyReady}',
]) {
  requireText(batchCard, token, `Profile handoff UI contract missing: ${token}`);
}

for (const token of [
  '"chapterCount": 5',
  '"expectedMediaCount": 17',
  '"resolvedMediaCount": 0',
  '"mediaMissingCount": 17',
  '"assetId": "profile-bgm-main"',
  '"rightsState": "NOT_RUN"',
  '"blockingGatePass": false',
  '"preview": "NOT_RUN"',
  '"humanContent": "NOT_RUN"',
  '"macDaVinciActual": "NOT_RUN"',
  '"productionReady": false',
  '"id": "adventure-dog"',
]) {
  requireText(profileGate, token, `Profile generated gate contract missing: ${token}`);
}

for (const token of [
  'profile-v1-assembly-preflight.mts',
  'execFileSync(process.execPath',
  'report.schemaVersion !== "profile-v1-assembly-preflight/v1"',
  'report.readiness.finalRenderEligible',
  'report.readiness.macDaVinciActualState',
  'profileProductionGate.generated.ts',
]) {
  requireText(sync, token, `Profile gate sync contract missing: ${token}`);
}

for (const forbidden of [
  'profileV1MediaBlockingGatePass = true',
  'productionReady: true',
]) {
  if (manifest.includes(forbidden)) errors.push(`Profile handoff fabricates readiness: ${forbidden}`);
}
if (profileGate.includes('"rightsState": "CLEARED"')) errors.push("generated Profile BGM rights must not be pre-cleared");
if (profileGate.includes('"macDaVinciActual": "PASS"')) errors.push("generated Profile Mac Actual must not be fabricated");

if (errors.length) {
  console.error(`Profile V1 Dashboard Handoff contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Profile V1 Dashboard Handoff contracts OK: the 5-chapter/17-media Motion Studio gate is synced into production handoff export and UI, BGM rights start NOT_RUN and require separate human approval, Human QA/Mac Actual remain fail-closed, and productionReady is never manufactured.");
