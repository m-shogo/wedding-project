import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const handoff = fs.readFileSync(path.join(root, "src/data/profileProductionStatusHandoff.ts"), "utf8");
const gate = fs.readFileSync(path.join(root, "src/data/profileProductionGate.generated.ts"), "utf8");
const errors = [];

const requireToken = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "filesReady: profileProductionGate.media.fileReady",
  "ready: profileProductionGate.media.ready",
  "current: profileProductionGate.media.intakeReceiptCurrent",
  "path: profileProductionGate.media.intakeReceiptPath",
  "verifiedCount: profileProductionGate.media.intakeReceiptVerifiedCount",
  "expectedCount: profileProductionGate.media.intakeReceiptExpectedCount",
  "blockerCodes: [...profileProductionGate.media.intakeReceiptBlockerCodes]",
  "MEDIA_FILES_PRESENT != MEDIA_INTAKE_RECEIPT_CURRENT",
  "MEDIA_INTAKE_RECEIPT_CURRENT != HUMAN_REAL_MEDIA_QA_PASS",
]) {
  requireToken(handoff, token, `Profile media-intake handoff contract missing: ${token}`);
}

for (const token of [
  '"fileReady": false',
  '"intakeReceiptCurrent": false',
  '"intakeReceiptPath": "out/intake/profile-media-intake.json"',
  '"intakeReceiptVerifiedCount": 0',
  '"intakeReceiptExpectedCount": 17',
  '"RECEIPT_MISSING"',
  '"productionReady": false',
]) {
  requireToken(gate, token, `Generated Profile media gate honesty drifted: ${token}`);
}

if (handoff.includes("current: true") || handoff.includes("productionReady: true")) {
  errors.push("Profile media handoff must not hardcode receipt CURRENT or production readiness");
}

if (errors.length) {
  console.error(`Profile media intake handoff FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Profile media intake handoff OK: file presence and canonical SHA receipt currency are exported separately; missing/stale receipt remains visible; Human real-media QA, Mac Actual, and production readiness are not promoted.");
