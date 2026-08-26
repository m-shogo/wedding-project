import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const translator = read("src/data/trackingBurstDaVinciTranslator.ts");
const artifact = read("src/data/trackingBurstDaVinciActualArtifact.ts");
const capture = read("src/data/trackingBurstDaVinciEvidenceCapture.ts");
const gate = read("src/data/trackingBurstDaVinciPromotionGate.ts");
const engine = read("../motion-studio/src/motion-kit/engines.tsx");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const [source, token, message] of [
  [engine, "mode === 'tracking'", "canonical tracking mode missing"],
  [engine, "[0.18 * strength, 0.02]", "canonical tracking values drifted"],
  [translator, "durationSeconds = 0.5", "translator duration must remain canonical 0.5s"],
  [translator, "0.18 * strength", "translator tracking start formula drifted"],
  [translator, "trackingToEm = 0.02", "translator tracking end drifted"],
  [translator, 'target: "FUSION_TEXT_PLUS_CHARACTER_SPACING"', "translator target missing"],
  [translator, 'state: "NOT_VERIFIED"', "native unit calibration must start NOT_VERIFIED"],
  [translator, "NORMALIZED_TRACKING_EM != VERIFIED_NATIVE_FUSION_UNIT", "native unit honesty guardrail missing"],
  [artifact, 'authority: "EVIDENCE_ONLY"', "Actual artifact must remain evidence-only"],
  [artifact, 'patternId: "type-tracking-burst"', "Actual artifact pattern mismatch"],
  [artifact, "STALE_TRACKING_BURST_ACTUAL_SELECTION", "stale selection must fail-close"],
  [artifact, "nativeUnitCalibrationRecorded", "Actual artifact must track native unit calibration"],
  [artifact, 'productionReady: false', "Actual artifact cannot be production-ready"],
  [capture, "STALE_TRACKING_BURST_EVIDENCE_CAPTURE", "stale evidence must fail-close"],
  [capture, '"NATIVE_UNIT_CALIBRATION"', "capture must bind native calibration evidence"],
  [capture, "normalizedTrackingFromEm", "normalized start readback missing"],
  [capture, "allMachineComparableChecksPass", "machine comparison gate missing"],
  [gate, "NATIVE_TRACKING_UNIT_CALIBRATION_NOT_PASS", "promotion must block missing calibration"],
  [gate, "automaticPromotionAllowed: false", "automatic promotion must remain forbidden"],
  [gate, 'productionReady: false', "promotion assessment cannot claim production readiness"],
]) requireText(source, token, message);

for (const forbidden of [
  "nativeUnitCalibration: {\n        state: \"PASS\"",
  "runtimeApplyState: \"PASS\"",
  "runtimeReadbackState: \"PASS\"",
  "renderParityState: \"PASS\"",
  "automaticPromotionAllowed: true",
  "productionReady: true",
]) {
  if ([translator, artifact, capture, gate].some((source) => source.includes(forbidden))) {
    errors.push(`Tracking Burst must not fabricate Mac Resolve Actual success: ${forbidden}`);
  }
}

if (errors.length) {
  console.error(`Tracking Burst DaVinci contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Tracking Burst DaVinci contracts OK: canonical translator + bounded Actual + native-unit calibration evidence + human promotion gate remain fail-closed.");
