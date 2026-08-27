import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const manifest = read("src/data/projectProductionHandoffManifest.ts");
const batchCard = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const profileGate = read("src/data/profileProductionGate.generated.ts");
const realMediaGate = read("src/data/profileRealMediaReviewGate.generated.ts");
const sync = read("scripts/sync-profile-production-gate.mjs");
const realMediaSync = read("scripts/sync-profile-real-media-review-gate.mjs");
const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'import {profileProductionGate} from "./profileProductionGate.generated"',
  'import {profileRealMediaReviewGate} from "./profileRealMediaReviewGate.generated"',
  'authority: "MOTION_STUDIO_PROFILE_V1_MEDIA_GATE"',
  'if (projectId !== "profile") return null',
  'profileV1Media: ProfileV1ProductionMediaGateV1 | null',
  'role: string',
  'editIntent: readonly string[]',
  'structureReview:',
  'realMediaReview:',
  'profileV1Media = buildProfileV1ProductionMediaGate(projectId)',
  'editIntent: [...chapter.editIntent]',
  'blockers: [...profileProductionGate.structureReview.blockers]',
  'state: profileRealMediaReviewGate.state',
  'humanReviewComplete: profileRealMediaReviewGate.humanReviewComplete',
  'mediaReviewed: profileRealMediaReviewGate.mediaReviewed',
  'inputGatePass = profileProductionGate.blockingGatePass',
  'profileProductionGate.structureReview.humanReviewComplete',
  'profileRealMediaReviewGate.humanReviewComplete',
  'profileV1MediaBlockingGatePass',
  'PROFILE_V1_MEDIA:',
  'PROFILE_V1_BGM:',
  'PROFILE_V1_STRUCTURE_REVIEW:',
  'PROFILE_V1_REAL_MEDIA_REVIEW:',
  'profileV1MediaBlockingGatePass;',
  'SHA-bound structure review + SHA-bound real-media Human QA',
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
  '"STRUCTURE_REVIEW_EVIDENCE_MISSING"',
  '"blockingGatePass": false',
  '"structurePreview": "NOT_RUN"',
  '"preview": "NOT_RUN"',
  '"humanContent": "NOT_RUN"',
  '"macDaVinciActual": "NOT_RUN"',
  '"productionReady": false',
  '"id": "adventure-dog"',
]) {
  requireText(profileGate, token, `Profile generated media gate contract missing: ${token}`);
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
  requireText(sync, token, `Profile media gate sync contract missing: ${token}`);
}

for (const token of [
  'profile-v1-real-media-review.mts',
  'profile-v1-real-media-review-status/v1',
  'DERIVED_REAL_MEDIA_REVIEW_STATUS',
  'humanReviewComplete: status.humanReviewComplete',
  'mediaExpected: status.mediaExpected',
  'mediaReviewed: status.mediaReviewed',
  'bgmReviewed: status.bgmReviewed',
  'macDaVinciActual: status.macDaVinciActual',
  'productionReady: status.productionReady',
  'profileRealMediaReviewGate.generated.ts',
]) {
  requireText(realMediaSync, token, `Profile real-media gate sync contract missing: ${token}`);
}

for (const token of [
  '"source": "motion-studio/scripts/profile-v1-real-media-review.mts"',
  '"state": "NOT_RUN"',
  '"humanReviewComplete": false',
  '"REAL_MEDIA_REVIEW_EVIDENCE_MISSING"',
  '"mediaExpected": 17',
  '"mediaReviewed": 0',
  '"bgmReviewed": false',
  '"macDaVinciActual": "NOT_RUN"',
  '"productionReady": false',
]) {
  requireText(realMediaGate, token, `Profile generated real-media review gate missing: ${token}`);
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
if (realMediaGate.includes('"state": "PASS"')) errors.push("generated Profile real-media review must not be pre-approved");
if (realMediaGate.includes('"humanReviewComplete": true')) errors.push("generated Profile real-media Human QA must not be fabricated");
if (realMediaGate.includes('"productionReady": true')) errors.push("real-media review cannot promote production readiness");

if (errors.length) {
  console.error(`Profile V1 Dashboard Handoff contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Profile V1 Dashboard Handoff contracts OK: canonical chapter role/editIntent, SHA-bound structure review, and SHA-bound 17-media Human QA are preserved through generated gates and production handoff; BGM audio/Mac Actual/production release stay separate and fail-closed.");
