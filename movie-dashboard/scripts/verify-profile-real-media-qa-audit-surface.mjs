import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sync = read("scripts/sync-profile-real-media-review-gate.mjs");
const generated = read("src/data/profileRealMediaReviewGate.generated.ts");
const auditAdapter = read("src/data/profileRealMediaQaAudit.ts");
const statusHandoff = read("src/data/profileProductionStatusHandoff.ts");
const projectManifest = read("src/data/projectProductionHandoffManifest.ts");
const auditCard = read("src/components/ProfileRealMediaQaAuditCard.tsx");
const zukanPage = read("src/pages/VisualMotionLibrary.tsx");
const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'evidenceRelativePath = "motion-studio/out/qa/profile-v1-real-media-review.json"',
  'createHash("sha256")',
  'parseState !== "MISSING"',
  'return emptyAudit("INVALID_JSON", evidenceSha256)',
  'previewSourceFingerprintSha256',
  'runtimeManifestSha256',
  'productionPlanSha256',
  'previewComponentSha256',
  'canonicalPlanFingerprint',
  'crop: item?.qa?.crop ?? "NOT_RUN"',
  'focus: item?.qa?.focus ?? "NOT_RUN"',
  'contentAccuracy: item?.qa?.contentAccuracy ?? "NOT_RUN"',
  'audit: buildAudit()',
]) requireText(sync, token, `Profile QA audit sync missing: ${token}`);

for (const token of [
  '"state": "NOT_RUN"',
  '"humanReviewComplete": false',
  '"REAL_MEDIA_REVIEW_EVIDENCE_MISSING"',
  '"macDaVinciActual": "NOT_RUN"',
  '"productionReady": false',
  '"evidencePath": "motion-studio/out/qa/profile-v1-real-media-review.json"',
  '"evidenceExists": false',
  '"evidenceSha256": null',
  '"parseState": "MISSING"',
  '"previewSourceFingerprintSha256": null',
  '"media": []',
  '"chapters": []',
]) requireText(generated, token, `Generated Profile QA audit missing honest default: ${token}`);

for (const token of [
  'ProfileRealMediaQaAuditV1',
  'ProfileRealMediaQaAuditSurfaceV1',
  'getProfileRealMediaQaAuditSurface',
  'audit: profileRealMediaReviewGate.audit as unknown as ProfileRealMediaQaAuditV1',
  'macDaVinciActual: "NOT_RUN"',
  'productionReady: false',
]) requireText(auditAdapter, token, `Profile QA audit adapter missing: ${token}`);

for (const token of [
  'audit: profileRealMediaReviewGate.audit',
  'PROFILE_REAL_MEDIA_QA_AUDIT_EXPORTED != HUMAN_REVIEW_PASS',
  'PROFILE_REAL_MEDIA_QA_AUDIT_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
]) requireText(statusHandoff, token, `Profile production-status handoff missing QA audit: ${token}`);

for (const token of [
  'audit: typeof profileRealMediaReviewGate.audit',
  'audit: profileRealMediaReviewGate.audit',
  'real-media evidence SHA/fingerprint/各QA bindingはhandoffへ保持する',
  'productionReady: false',
]) requireText(projectManifest, token, `Project production handoff missing Profile QA audit: ${token}`);

for (const token of [
  'PROFILE REAL-MEDIA HUMAN QA / AUDIT',
  '承認済み証拠と「何が変わるとSTALEか」を確認',
  'Evidence binding',
  'Staleness fingerprints',
  'audit.previewSourceFingerprintSha256',
  '17素材 QA binding',
  '<QaBadge label="crop"',
  '<QaBadge label="focus"',
  '<QaBadge label="content"',
  '章 QA binding',
  'DaVinci Actual {surface.macDaVinciActual}',
  'AUDIT_EXPORTED != HUMAN_REVIEW_PASS / MAC_DAVINCI_ACTUAL_VERIFIED',
]) requireText(auditCard, token, `Motion Zukan Profile QA audit card missing: ${token}`);

for (const token of [
  'import { ProfileRealMediaQaAuditCard } from "../components/ProfileRealMediaQaAuditCard"',
  '<ProfileRealMediaQaAuditCard />',
]) requireText(zukanPage, token, `Motion Zukan page does not expose Profile QA audit: ${token}`);

for (const [source, label] of [
  [generated, "generated gate"],
  [auditAdapter, "audit adapter"],
  [statusHandoff, "status handoff"],
  [projectManifest, "project handoff"],
  [auditCard, "audit card"],
]) {
  if (source.includes('macDaVinciActual: "PASS"') || source.includes('"macDaVinciActual": "PASS"')) {
    errors.push(`${label} fabricates Mac DaVinci Actual PASS`);
  }
  if (source.includes('productionReady: true') || source.includes('"productionReady": true')) {
    errors.push(`${label} fabricates production readiness`);
  }
}
if (generated.includes('"state": "PASS"')) errors.push("Generated Profile Human QA must not be pre-approved");
if (generated.includes('"evidenceExists": true')) errors.push("Generated Profile QA evidence must remain absent until real evidence exists");

if (errors.length) {
  console.error(`Profile real-media QA audit surface contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Profile real-media QA audit surface contracts OK: the existing SHA-bound Human review evidence now flows through generated status, production handoff, project manifest and Motion Zukan without manufacturing evidence, Human PASS, Mac DaVinci Actual or production readiness.");
