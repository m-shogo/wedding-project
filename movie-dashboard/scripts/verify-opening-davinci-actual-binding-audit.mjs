import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const readDashboard = (relative) => fs.readFileSync(path.join(dashboardRoot, relative), "utf8");
const readRepo = (relative) => fs.readFileSync(path.join(repoRoot, relative), "utf8");

const audit = readRepo("motion-studio/scripts/opening-v1-davinci-actual-binding-audit.mts");
const sync = readDashboard("scripts/sync-opening-davinci-actual-binding-audit.mjs");
const generated = readDashboard("src/data/openingDavinciActualBindingAudit.generated.ts");
const card = readDashboard("src/components/OpeningDavinciActualBindingAuditCard.tsx");
const parent = readDashboard("src/components/OpeningProductionStatusHandoffCard.tsx");
const errors = [];
const need = (source, token, label) => { if (!source.includes(token)) errors.push(`${label}: ${token}`); };

for (const token of [
  "opening-v1-davinci-actual-binding-audit/v1",
  "DERIVED_DAVINCI_ACTUAL_BINDING_AUDIT",
  "OPENING_DAVINCI_ACTUAL_AUDIT_RECOVERY_SHA_STALE",
  "OPENING_DAVINCI_ACTUAL_AUDIT_RENDER_SHA_STALE",
  "OPENING_DAVINCI_ACTUAL_AUDIT_CROP_REVIEW_SHA_STALE",
  "OPENING_DAVINCI_ACTUAL_AUDIT_CROP_REVIEW_FINGERPRINT_STALE",
  "OPENING_DAVINCI_ACTUAL_AUDIT_APPROVAL_RECOVERY_SHA_STALE",
  "OPENING_DAVINCI_ACTUAL_AUDIT_APPROVAL_EVIDENCE_SHA_STALE",
  "evidence.productionRecovery?.sha256 !== recoverySha256",
  "approval.davinciEvidence?.sha256 !== evidenceSha256",
  "state = 'NOT_RUN'",
  "state = 'STALE'",
  "state = 'CURRENT_PASS'",
  "productionReady: false",
  "CROP_REVIEW_CHANGED => ACTUAL_EVIDENCE_STALE",
  "ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE",
  "CURRENT_PASS != FINAL_DELIVERY_APPROVED",
]) need(audit, token, "Opening audit contract missing");

for (const token of [
  "opening-v1-davinci-actual-binding-audit.mts",
  "openingDavinciActualBindingAudit.generated.ts",
  "audit.productionReady !== false",
  "audit.state === \"CURRENT_PASS\"",
  "audit.actualEvidence?.allChecksPass !== true",
]) need(sync, token, "Opening audit sync missing");

for (const token of [
  '"state": "NOT_RUN"',
  '"current": false',
  '"productionReady": false',
  '"decision": "NOT_RUN"',
  '"exists": false',
  '"reviewOverall": "NOT_RUN"',
  '"ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE"',
]) need(generated, token, "Generated Opening audit must remain fail-closed");

for (const token of [
  "OPENING DAVINCI ACTUAL / RECOVERY / FINAL APPROVAL AUDIT",
  "audit.recovery.sha256",
  "audit.actualEvidence.boundRecoverySha256",
  "audit.actualEvidence.boundSourceRenderSha256",
  "audit.actualEvidence.boundCropReviewEvidenceSha256",
  "audit.finalApproval.boundRecoverySha256",
  "audit.finalApproval.boundDavinciEvidenceSha256",
  "audit.mismatches.join",
]) need(card, token, "Opening audit UI missing");

for (const token of [
  'import {OpeningDavinciActualBindingAuditCard} from "./OpeningDavinciActualBindingAuditCard"',
  "<OpeningDavinciActualBindingAuditCard />",
]) need(parent, token, "Opening production surface missing audit");

if (generated.includes('"state": "CURRENT_PASS"') || generated.includes('"reviewOverall": "PASS"') || generated.includes('"productionReady": true')) errors.push("Generated Opening audit fabricates Mac GUI evidence or production readiness");
if (card.includes("Mac DaVinci Actual=PASS") || parent.includes("DaVinci recovery sidecar: PASS")) errors.push("Opening UI must not hard-code Mac DaVinci Actual success");

if (errors.length) {
  console.error(`Opening DaVinci Actual binding audit contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Opening DaVinci Actual binding audit contracts OK: recovery/render/crop SHA+fingerprint, bound Mac Actual evidence and final approval are audited together; stale reasons are visible and no GUI Actual/final approval/production readiness is fabricated.");
