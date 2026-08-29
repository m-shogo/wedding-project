import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const readDashboard = (relative) => fs.readFileSync(path.join(dashboardRoot, relative), "utf8");
const readRepo = (relative) => fs.readFileSync(path.join(repoRoot, relative), "utf8");

const audit = readRepo("motion-studio/scripts/profile-v1-davinci-actual-binding-audit.mts");
const sync = readDashboard("scripts/sync-profile-davinci-actual-binding-audit.mjs");
const generated = readDashboard("src/data/profileDavinciActualBindingAudit.generated.ts");
const card = readDashboard("src/components/ProfileDavinciActualBindingAuditCard.tsx");
const parent = readDashboard("src/components/ProfileProductionStatusHandoffCard.tsx");
const errors = [];
const need = (source, token, message) => { if (!source.includes(token)) errors.push(`${message}: ${token}`); };

for (const token of [
  "profile-v1-davinci-actual-binding-audit/v1",
  "DERIVED_DAVINCI_ACTUAL_BINDING_AUDIT",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_SHA_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_RENDER_SHA_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_HUMAN_QA_SHA_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_HUMAN_QA_FINGERPRINT_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_RECOVERY_SHA_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_EVIDENCE_SHA_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_HUMAN_QA_SHA_STALE",
  "PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_HUMAN_QA_FINGERPRINT_STALE",
  "evidence.productionRecovery?.sha256 !== recoverySha256",
  "approval.davinciEvidence?.sha256 !== evidenceSha256",
  "state = 'NOT_RUN'",
  "state = 'STALE'",
  "state = 'CURRENT_PASS'",
  "productionReady: false",
  "ACTUAL_EVIDENCE_EXISTS != MAC_DAVINCI_ACTUAL_VERIFIED",
  "RECOVERY_SIDECAR_CHANGED => ACTUAL_EVIDENCE_STALE",
  "ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE",
  "CURRENT_PASS != FINAL_DELIVERY_APPROVED",
]) need(audit, token, "Profile DaVinci Actual audit contract missing");

for (const token of [
  "profile-v1-davinci-actual-binding-audit.mts",
  "profileDavinciActualBindingAudit.generated.ts",
  "audit.productionReady !== false",
  "audit.state === \"CURRENT_PASS\"",
  "audit.actualEvidence?.allChecksPass !== true",
  "audit.finalApproval.current",
  "audit.finalApproval.decision !== \"NOT_RUN\"",
]) need(sync, token, "Profile DaVinci Actual audit sync missing");

for (const token of [
  '"state": "NOT_RUN"',
  '"current": false',
  '"productionReady": false',
  '"exists": false',
  '"reviewOverall": "NOT_RUN"',
  '"finalApproval": {',
  '"decision": "NOT_RUN"',
  '"boundRecoverySha256": null',
  '"boundDavinciEvidenceSha256": null',
  '"ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE"',
]) need(generated, token, "Generated Profile DaVinci Actual audit must stay fail-closed");

for (const token of [
  "PROFILE DAVINCI ACTUAL / RECOVERY / FINAL APPROVAL AUDIT",
  "audit.recovery.sha256",
  "audit.actualEvidence.boundRecoverySha256",
  "audit.actualEvidence.boundSourceRenderSha256",
  "audit.actualEvidence.boundRealMediaHumanQaEvidenceSha256",
  "audit.actualEvidence.boundRealMediaHumanQaBindingFingerprintSha256",
  "audit.finalApproval.sha256",
  "audit.finalApproval.current",
  "audit.finalApproval.boundRecoverySha256",
  "audit.finalApproval.boundDavinciEvidenceSha256",
  "audit.mismatches.join",
  "audit.actualEvidence.allChecksPass",
]) need(card, token, "Profile DaVinci Actual audit UI missing");

for (const token of [
  'import {ProfileDavinciActualBindingAuditCard} from "./ProfileDavinciActualBindingAuditCard"',
  "<ProfileDavinciActualBindingAuditCard />",
]) need(parent, token, "Motion Zukan Profile production surface missing Actual binding audit");

if (generated.includes('"state": "CURRENT_PASS"') || generated.includes('"reviewOverall": "PASS"') || generated.includes('"productionReady": true')) {
  errors.push("Generated Profile DaVinci Actual audit fabricates Mac GUI evidence or production readiness");
}
if (card.includes("productionReady=YES") || parent.includes("Mac DaVinci=PASS")) {
  errors.push("Profile Motion Zukan UI must not hard-code Mac DaVinci Actual success");
}

if (errors.length) {
  console.error(`Profile DaVinci Actual binding audit contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Profile DaVinci Actual binding audit contracts OK: recovery/render/Human-QA SHA chain and Human final approval are compared against current bound Actual evidence, stale reasons are visible in Motion Zukan, and Mac GUI Actual/final approval/production readiness remain independent and fail-closed.");
