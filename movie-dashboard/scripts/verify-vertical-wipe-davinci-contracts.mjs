import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const translator = read("src/data/verticalWipeDaVinciTranslator.ts");
const artifact = read("src/data/verticalWipeDaVinciActualArtifact.ts");
const capture = read("src/data/verticalWipeDaVinciEvidenceCapture.ts");
const gate = read("src/data/verticalWipeDaVinciPromotionGate.ts");
const engine = read("../motion-studio/src/motion-kit/engines.tsx");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const [source, token, message] of [
  [engine, "mode === 'vertical-wipe'", "canonical vertical-wipe mode missing"],
  [engine, "inset(${(1 - progress) * 100}% 0 0 0)", "canonical vertical wipe clip formula drifted"],
  [engine, "mode === 'vertical-wipe' ? 1 : progress", "vertical wipe must remain clip-only opacity=1"],
  [translator, "durationSeconds = 0.5", "translator duration must remain canonical 0.5s"],
  [translator, 'direction: "TOP_TO_BOTTOM"', "translator direction missing"],
  [translator, "topInsetFromNormalized: 1", "translator start inset drifted"],
  [translator, "topInsetToNormalized: 0", "translator end inset drifted"],
  [translator, "textOpacity: 1", "translator must preserve clip-only opacity"],
  [translator, 'target: "FUSION_TEXT_PLUS_MASK_REVEAL"', "translator target missing"],
  [translator, 'state: "NOT_VERIFIED"', "mask binding must start NOT_VERIFIED"],
  [translator, "CANONICAL_CLIP_PATH != VERIFIED_FUSION_MASK_BINDING", "mask honesty guardrail missing"],
  [artifact, 'authority: "EVIDENCE_ONLY"', "Actual artifact must remain evidence-only"],
  [artifact, 'patternId: "type-vertical-wipe"', "Actual artifact pattern mismatch"],
  [artifact, "STALE_VERTICAL_WIPE_ACTUAL_SELECTION", "stale selection must fail-close"],
  [artifact, "maskToolType", "Actual artifact must capture mask tool type"],
  [artifact, "coordinateConvention", "Actual artifact must capture mask coordinates"],
  [artifact, "maskInverted", "Actual artifact must capture inversion state"],
  [artifact, 'productionReady: false', "Actual artifact cannot be production-ready"],
  [capture, "STALE_VERTICAL_WIPE_EVIDENCE_CAPTURE", "stale evidence must fail-close"],
  [capture, '"MASK_COORDINATE_CONVENTION"', "capture must bind coordinate convention evidence"],
  [capture, '"MASK_INVERSION"', "capture must bind inversion evidence"],
  [capture, "normalizedTopInsetFrom", "normalized start readback missing"],
  [capture, "allMachineComparableChecksPass", "machine comparison gate missing"],
  [gate, "MASK_BINDING_NOT_PASS", "promotion must block missing mask binding"],
  [gate, "automaticPromotionAllowed: false", "automatic promotion must remain forbidden"],
  [gate, 'productionReady: false', "promotion assessment cannot claim production readiness"],
]) requireText(source, token, message);

for (const forbidden of [
  "maskBinding: {\n        state: \"PASS\"",
  "runtimeApplyState: \"PASS\"",
  "runtimeReadbackState: \"PASS\"",
  "maskBindingState: \"PASS\"",
  "renderParityState: \"PASS\"",
  "automaticPromotionAllowed: true",
  "productionReady: true",
]) {
  if ([translator, artifact, capture, gate].some((source) => source.includes(forbidden))) {
    errors.push(`Vertical Wipe must not fabricate Mac Resolve Actual success: ${forbidden}`);
  }
}

if (errors.length) {
  console.error(`Vertical Wipe DaVinci contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Vertical Wipe DaVinci contracts OK: canonical clip translator + bounded Actual + explicit Fusion mask binding evidence + human promotion gate remain fail-closed.");
