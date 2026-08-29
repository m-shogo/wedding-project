import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const translator = read("src/data/outlineFillDaVinciTranslator.ts");
const artifact = read("src/data/outlineFillDaVinciActualArtifact.ts");
const capture = read("src/data/outlineFillDaVinciEvidenceCapture.ts");
const gate = read("src/data/outlineFillDaVinciPromotionGate.ts");
const engine = read("../motion-studio/src/motion-kit/engines.tsx");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const [source, token, message] of [
  [engine, "const outlineAppear = interpolate(frame, [0, 4], [0, 1]", "canonical outline appearance timing drifted"],
  [engine, "const outlineFill = interpolate(progress, [0.35, 1], [0, 1]", "canonical outline fill timing drifted"],
  [engine, "const outlineStrokeWidth = interpolate(progress, [0, 1], [2.5, 0]) * strength", "canonical outline stroke formula drifted"],
  [translator, "durationSeconds = 0.5", "translator reveal duration must remain canonical 0.5s"],
  [translator, "outlineAppearFrames = 4", "translator outline appearance drifted"],
  [translator, "fillStartProgress: 0.35", "translator fill start progress drifted"],
  [translator, "2.5 * strength", "translator stroke width formula drifted"],
  [translator, 'target: "FUSION_TEXT_PLUS_FILL_STROKE_SHADING"', "translator target missing"],
  [translator, 'state: "NOT_VERIFIED"', "Shading binding must start NOT_VERIFIED"],
  [translator, "CANONICAL_STROKE_PX != VERIFIED_TEXT_PLUS_STROKE_UNIT", "stroke-unit honesty guardrail missing"],
  [artifact, 'authority: "EVIDENCE_ONLY"', "Actual artifact must remain evidence-only"],
  [artifact, "STALE_OUTLINE_FILL_ACTUAL_SELECTION", "stale Actual selection must fail-close"],
  [artifact, "fillBindingIdentity", "fill binding readback missing"],
  [artifact, "strokeBindingIdentity", "stroke binding readback missing"],
  [artifact, "rawStrokeWidthFrom", "raw stroke width evidence missing"],
  [artifact, "normalizedStrokeWidthFromPx", "normalized stroke width evidence missing"],
  [artifact, 'productionReady: false', "Actual artifact cannot claim production readiness"],
  [capture, "STALE_OUTLINE_FILL_EVIDENCE_CAPTURE", "stale evidence capture must fail-close"],
  [capture, '"STROKE_WIDTH_UNIT_CALIBRATION"', "stroke-width calibration binding required"],
  [capture, '"FILL_SHADING_BINDING"', "fill Shading binding required"],
  [capture, '"STROKE_SHADING_BINDING"', "stroke Shading binding required"],
  [gate, "SHADING_BINDING_NOT_PASS", "promotion must block missing Shading binding"],
  [gate, "automaticPromotionAllowed: false", "automatic promotion must remain forbidden"],
  [gate, 'productionReady: false', "promotion gate cannot claim production readiness"],
]) requireText(source, token, message);

for (const forbidden of [
  "shadingBinding: {\n        state: \"PASS\"",
  "runtimeApplyState: \"PASS\"",
  "runtimeReadbackState: \"PASS\"",
  "shadingBindingState: \"PASS\"",
  "renderParityState: \"PASS\"",
  "automaticPromotionAllowed: true",
  "productionReady: true",
]) {
  if ([translator, artifact, capture, gate].some((source) => source.includes(forbidden))) errors.push(`Outline Fill must not fabricate Mac Resolve Actual success: ${forbidden}`);
}

if (errors.length) {
  console.error(`Outline Fill DaVinci contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Outline Fill DaVinci contracts OK: canonical outline/fill curves + bounded Actual + explicit Text+ Shading/stroke-unit evidence + human promotion gate remain fail-closed.");
