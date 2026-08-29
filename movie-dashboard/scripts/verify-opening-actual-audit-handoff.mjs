import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const handoff = read("src/data/openingProductionStatusHandoff.ts");
const generated = read("src/data/openingDavinciActualBindingAudit.generated.ts");
const errors = [];
const need = (source, token, label) => { if (!source.includes(token)) errors.push(`${label}: ${token}`); };

for (const token of [
  'import {openingDavinciActualBindingAudit} from "./openingDavinciActualBindingAudit.generated"',
  'davinciActualBindingAudit: openingDavinciActualBindingAudit',
  'DAVINCI_RECOVERY_OR_ACTUAL_CHANGED => FINAL_APPROVAL_STALE',
  'DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
  'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
]) need(handoff, token, "Opening production handoff missing Actual audit authority");

for (const token of [
  '"schemaVersion": "opening-v1-davinci-actual-binding-audit/v1"',
  '"authority": "DERIVED_DAVINCI_ACTUAL_BINDING_AUDIT"',
  '"state": "NOT_RUN"',
  '"current": false',
  '"productionReady": false',
  '"decision": "NOT_RUN"',
  '"ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE"',
]) need(generated, token, "Opening Actual audit snapshot missing fail-closed field");

if (handoff.includes('davinciActualBindingAudit: {...openingDavinciActualBindingAudit, productionReady: true}')) errors.push("Handoff must not promote derived audit to productionReady");
if (generated.includes('"state": "CURRENT_PASS"') || generated.includes('"productionReady": true')) errors.push("Fresh-clone audit snapshot fabricates Mac GUI verification/readiness");

if (errors.length) {
  console.error(`Opening Actual audit handoff FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Opening Actual audit handoff OK: machine-readable production status carries the canonical read-only recovery/Actual/final-approval audit without promoting GUI Actual or readiness.");
