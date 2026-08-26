import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const translator = read("src/data/tripletDaVinciTranslator.ts");
const artifact = read("src/data/tripletDaVinciActualArtifact.ts");
const capture = read("src/data/tripletDaVinciEvidenceCapture.ts");
const routing = read("src/data/typographySceneProductionRouting.ts");
const policy = read("src/data/typographyDaVinciPromotionPolicy.ts");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'patternId: "type-triplet"',
  'mode: "triplet"',
  'const firstHit = Math.round(input.fps * 0.12)',
  'const hitFrames = [firstHit, firstHit + 6, firstHit + 12] as const',
  'const pulseDurationFrames = 6',
  'const scalePeakDelta = Number((0.25 * strength).toFixed(6))',
  'opacityAppearStartFrame: firstHit - 2',
  'opacityAppearEndFrame: firstHit',
  'pulseShape: "LINEAR_DECAY_PER_HIT_SUMMED"',
  'implementationId: "impl-type-triplet-davinci-text-plus-transform-pulses"',
  'transformBinding: {',
  'state: "NOT_VERIFIED"',
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
]) requireText(translator, token, `Triplet translator missing canonical/Actual boundary: ${token}`);

for (const token of [
  'schemaVersion: "triplet-davinci-actual-artifact/v1"',
  'authority: "EVIDENCE_ONLY"',
  'readback: null',
  'comparison: null',
  'resolveIdentity: "NOT_RUN"',
  'visualQa1x: "NOT_RUN"',
  'visualQaHalfSpeed: "NOT_RUN"',
  'productionReady: false',
  'STALE_TRIPLET_ACTUAL_SELECTION',
  'expectedSource: "CANONICAL_TRANSLATOR_SPEC"',
  'hitFrames',
  'scalePeakDeltas',
  'pulseShapeObserved',
]) requireText(artifact, token, `Triplet Actual artifact missing evidence contract: ${token}`);

for (const token of [
  'schemaVersion: "triplet-davinci-evidence-capture/v1"',
  'authority: "EVIDENCE_ONLY"',
  'TRANSFORM_BINDING',
  'HIT_1',
  'HIT_2',
  'HIT_3',
  'PULSE_DECAY',
  'evaluateTypographyDaVinciHumanPromotionGate',
  'patternId: "type-triplet"',
  'checks.hitFramesApplied',
  'checks.pulseDurationApplied',
  'checks.scalePeaksApplied',
  'checks.pulseShapeApplied',
  'checks.sourceReadback',
  'checks.renderCompleted',
  'promotionGate',
  'eligibleForHumanReview',
  'automaticPromotionAllowed: false',
  'productionReady: false',
  'STALE_TRIPLET_EVIDENCE_CAPTURE',
]) requireText(capture, token, `Triplet evidence capture missing promotion/identity contract: ${token}`);

for (const token of [
  '"type-triplet": ["TEXT_PLUS_TOOL", "TRANSFORM_BINDING", "HIT_1", "HIT_2", "HIT_3", "PULSE_DECAY", "OPACITY"]',
]) requireText(policy, token, `Triplet centralized promotion policy drifted: ${token}`);

for (const token of [
  '"type-triplet",\n    "triplet",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-triplet-davinci-text-plus-transform-pulses"',
]) requireText(routing, token, `Triplet routing must remain an honest Actual candidate: ${token}`);

if (/productionReady:\s*true/.test(artifact) || /automaticPromotionAllowed:\s*true/.test(capture)) {
  errors.push("Triplet must not auto-promote from machine evidence");
}

if (errors.length) {
  console.error(`Triplet DaVinci contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Triplet DaVinci contracts OK: three-hit timing, six-frame decay, scale peaks, evidence-only capture, all required hit bindings and NOT_RUN Mac Actual boundary remain enforced.");
