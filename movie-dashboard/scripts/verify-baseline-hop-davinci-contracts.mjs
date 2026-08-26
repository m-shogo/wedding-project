import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const translator = read("src/data/baselineHopDaVinciTranslator.ts");
const artifact = read("src/data/baselineHopDaVinciActualArtifact.ts");
const capture = read("src/data/baselineHopDaVinciEvidenceCapture.ts");
const routing = read("src/data/typographySceneProductionRouting.ts");
const policy = read("src/data/typographyDaVinciPromotionPolicy.ts");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'patternId: "type-baseline-hop"',
  'mode: "hop"',
  'opacityDurationSeconds: 0.5',
  'hopDurationSeconds: 0.7',
  'opacityEasing: "EASE_OUT_CUBIC"',
  'hopEasing: "REMOTION_EASING_BOUNCE"',
  'const translateFromPx = Number((-90 * strength).toFixed(6))',
  'implementationId: "impl-type-baseline-hop-davinci-text-plus-baseline"',
  'baselineBinding: {',
  'state: "NOT_VERIFIED"',
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
]) requireText(translator, token, `Baseline Hop translator missing canonical/Actual boundary: ${token}`);

for (const token of [
  'schemaVersion: "baseline-hop-davinci-actual-artifact/v1"',
  'authority: "EVIDENCE_ONLY"',
  'parameterBinding: {state: "NOT_VERIFIED"',
  'readback: null',
  'comparison: null',
  'resolveIdentity: "NOT_RUN"',
  'visualQa1x: "NOT_RUN"',
  'visualQaHalfSpeed: "NOT_RUN"',
  'productionReady: false',
  'STALE_BASELINE_HOP_ACTUAL_SELECTION',
  'expectedSource: "CANONICAL_TRANSLATOR_SPEC"',
  'normalizedTranslateYFromPx',
  'rawPositionFrom',
  'hopEasingMatches',
]) requireText(artifact, token, `Baseline Hop Actual artifact missing evidence contract: ${token}`);

for (const token of [
  'schemaVersion: "baseline-hop-davinci-evidence-capture/v1"',
  'authority: "EVIDENCE_ONLY"',
  'BASELINE_POSITION_BINDING',
  'POSITION_UNIT_CALIBRATION',
  'BOUNCE_SPLINE',
  'evaluateTypographyDaVinciHumanPromotionGate',
  'patternId: "type-baseline-hop"',
  'checks.hopEasingApplied',
  'checks.sourceReadback',
  'checks.renderCompleted',
  'promotionGate',
  'eligibleForHumanReview',
  'automaticPromotionAllowed: false',
  'productionReady: false',
  'STALE_BASELINE_HOP_EVIDENCE_CAPTURE',
]) requireText(capture, token, `Baseline Hop evidence capture missing promotion/identity contract: ${token}`);

for (const token of [
  '"type-baseline-hop": ["TEXT_PLUS_TOOL", "BASELINE_POSITION_BINDING", "POSITION_UNIT_CALIBRATION", "OPACITY", "HOP_POSITION", "OPACITY_EASING", "BOUNCE_SPLINE"]',
]) requireText(policy, token, `Baseline Hop centralized promotion policy drifted: ${token}`);

for (const token of [
  '"type-baseline-hop",\n    "hop",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-baseline-hop-davinci-text-plus-baseline"',
]) requireText(routing, token, `Baseline Hop routing must remain an honest Actual candidate: ${token}`);

if (/productionReady:\s*true/.test(artifact) || /automaticPromotionAllowed:\s*true/.test(capture)) {
  errors.push("Baseline Hop must not auto-promote from machine evidence");
}

if (errors.length) {
  console.error(`Baseline Hop DaVinci contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Baseline Hop DaVinci contracts OK: canonical 0.5s opacity + 0.7s bounce target, native position calibration, evidence-only capture, shared promotion gate and NOT_RUN Mac Actual boundary remain enforced.");
