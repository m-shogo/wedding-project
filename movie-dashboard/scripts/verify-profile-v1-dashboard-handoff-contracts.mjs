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
  'role: string',
  'editIntent: readonly string[]',
  'structureReview:',
  'profileV1Media = buildProfileV1ProductionMediaGate(projectId)',
  'editIntent: [...chapter.editIntent]',
  'blockers: [...profileProductionGate.structureReview.blockers]',
  'profileV1MediaBlockingGatePass',
  'PROFILE_V1_MEDIA:',
  'PROFILE_V1_BGM:',
  'PROFILE_V1_STRUCTURE_REVIEW:',
  'profileV1MediaBlockingGatePass;',
  'Profileの章role/editIntentとSHA-bound structure review状態もhandoffへ保持',
  'productionReady: false',
]) {
  requireText(manifest, token, `Profile handoff manifest contract missing: ${token}`);
}

for (const token of [
  'PROFILE V1 / MOTION STUDIO MEDIA GATE',
  'profileMedia.resolvedMediaCount',
  'profileMedia.expectedMediaCount',
  'profileMedia.bgm.rightsState',
  'profileMedia.structureReview.state',
  'profileMedia.structureReview.evidencePath',
  'profileMedia.qa.macDaVinciActual',
  'profileMedia.chapters.map',
  'chapter.role',
  'chapter.editIntent.join',
  'profileMedia.mediaSlots.map',
  '章ごとのedit intentをhandoffへ保持',
  'disabled={!assemblyReady}',
]) {
  requireText(batchCard, token, `Profile handoff UI contract missing: ${token}`);
}

for (const token of [
  '"chapterCount": 5',
  '"expectedMediaCount": 17',
  '"resolvedMediaCount": 0',
  '"mediaMissingCount": 17',
  '"role": "旅行テーマの世界観を提示してプロフィール本編へ出発する。"',
  '"editIntent": [',
  '"写真中心"',
  '"現在の二人を主役にする"',
  '"assetId": "profile-bgm-main"',
  '"rightsState": "NOT_RUN"',
  '"structureReview": {',
  '"state": "NOT_RUN"',
  '"STRUCTURE_REVIEW_EVIDENCE_MISSING"',
  '"humanReviewComplete": false',
  '"blockingGatePass": false',
  '"structurePreview": "NOT_RUN"',
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
  'structureReview: "motion-studio/scripts/profile-v1-full-structure-review.mts"',
  'execFileSync(process.execPath',
  'report.schemaVersion !== "profile-v1-assembly-preflight/v1"',
  'role: chapter.role',
  'editIntent: chapter.editIntent',
  'state: report.structureReview.state',
  'humanReviewComplete: report.structureReview.humanReviewComplete',
  'structurePreview: report.readiness.structurePreviewQaState',
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
if (profileGate.includes('"structurePreview": "PASS"')) errors.push("generated Profile structure review must not be pre-approved");
if (profileGate.includes('"humanReviewComplete": true')) errors.push("generated Profile structure human review must not be fabricated");

if (errors.length) {
  console.error(`Profile V1 Dashboard Handoff contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Profile V1 Dashboard Handoff contracts OK: the canonical five-chapter role/editIntent plus SHA-bound structure-review state are preserved through the generated gate, UI and production handoff export; real-media/BGM/content/Mac Actual gates remain separate and productionReady is never manufactured.");
