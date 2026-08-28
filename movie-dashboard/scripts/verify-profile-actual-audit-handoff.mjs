import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const handoff = read("src/data/profileProductionStatusHandoff.ts");
const generated = read("src/data/profileDavinciActualBindingAudit.generated.ts");
const errors = [];
const need = (source, token, label) => { if (!source.includes(token)) errors.push(`${label}: ${token}`); };

for (const token of [
  'import {profileDavinciActualBindingAudit} from "./profileDavinciActualBindingAudit.generated"',
  'davinciActualBindingAudit: profileDavinciActualBindingAudit',
  'DAVINCI_RECOVERY_OR_ACTUAL_CHANGED => FINAL_APPROVAL_STALE',
  'MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
]) need(handoff, token, "Profile production handoff missing Actual audit authority");

for (const token of [
  '"schemaVersion": "profile-v1-davinci-actual-binding-audit/v1"',
  '"authority": "DERIVED_DAVINCI_ACTUAL_BINDING_AUDIT"',
  '"state": "NOT_RUN"',
  '"current": false',
  '"productionReady": false',
  '"finalApproval": {',
  '"decision": "NOT_RUN"',
  '"ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE"',
]) need(generated, token, "Profile Actual audit snapshot missing fail-closed field");

if (handoff.includes('davinciActualBindingAudit: {...profileDavinciActualBindingAudit, productionReady: true}')) errors.push("Handoff must not promote derived Profile audit to productionReady");
if (generated.includes('"state": "CURRENT_PASS"') || generated.includes('"productionReady": true')) errors.push("Fresh-clone Profile audit snapshot fabricates Mac GUI verification/readiness");

if (errors.length) {
  console.error(`Profile Actual audit handoff FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Profile Actual audit handoff OK: production status carries canonical recovery/Actual/final-approval audit without promoting GUI Actual or readiness.");
