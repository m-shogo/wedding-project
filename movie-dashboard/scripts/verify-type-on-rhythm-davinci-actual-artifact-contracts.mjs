import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifact = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciActualArtifact.ts"), "utf8");
const translator = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciTranslator.ts"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "type-on-rhythm-davinci-actual-artifact/v1"',
  'authority: "EVIDENCE_ONLY"',
  'patternId: "type-type-on-rhythm"',
  'BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER',
  'resolveEditableValue(scene.editableIntent.fields.text)',
  'resolveEditableValue(scene.editableIntent.fields.intensity)',
  'buildTypeOnRhythmDaVinciTranslatorSpec(baseline)',
  'selection.patternId !== "type-type-on-rhythm"',
  'STALE_TYPE_ON_RHYTHM_ACTUAL_SELECTION',
  'state: "NOT_VERIFIED"',
  'do not invent live Fusion input/property names',
  'Set the Follower sequencing unit to words',
  'Read back the actual values and the live tool/input names',
  'Keep every check NOT_RUN unless that exact step was performed',
  'wordUnitApplied: "NOT_RUN"',
  'visualQa1x: "NOT_RUN"',
  'visualQaHalfSpeed: "NOT_RUN"',
  'productionReady: false',
  'compareTypeOnRhythmDaVinciActualReadback',
  'readback.sourceRevision !== artifact.sourceRevision',
  'expectedSource: "CANONICAL_TRANSLATOR_SPEC"',
  'unitMatches',
  'delayFrameDelta',
  'durationFrameDelta',
  'translateYFromDeltaPixels',
  'opacityFromDelta',
  'easingMatches',
  'attachTypeOnRhythmDaVinciActualReadback',
  'wordUnitApplied: booleanComparisonState(comparison.unitMatches)',
  'sequentialDelayApplied: exactDeltaState(comparison.delayFrameDelta, comparison.durationFrameDelta)',
]) {
  requireText(artifact, token, `Type-on-rhythm Actual artifact missing contract: ${token}`);
}

for (const token of [
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
  'liveParameterBindingState: "NOT_VERIFIED"',
  'impl-type-type-on-rhythm-davinci-text-plus-follower-words',
]) {
  requireText(translator, token, `Type-on-rhythm translator honesty contract missing: ${token}`);
}

requireText(
  routing,
  '"type-type-on-rhythm",\n    "word-stagger",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-type-on-rhythm-davinci-text-plus-follower-words"',
  "type-type-on-rhythm route must expose the bounded Actual workflow without claiming live verification",
);

if (/parameterBinding:[\s\S]{0,100}state:\s*"VERIFIED"/.test(artifact)) {
  errors.push("Type-on-rhythm Actual artifact must not pre-verify Fusion parameter bindings");
}
if (/visualQa1x:\s*"PASS"/.test(artifact) || /visualQaHalfSpeed:\s*"PASS"/.test(artifact)) {
  errors.push("Type-on-rhythm Actual template must not fabricate visual QA PASS");
}
if (/productionReady:\s*true/.test(artifact)) {
  errors.push("Type-on-rhythm Actual artifact must remain productionReady=false");
}
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,140}type-type-on-rhythm/.test(routing)) {
  errors.push("Actual preparation artifact alone must not promote type-type-on-rhythm to a live route");
}
if (/DAVINCI_ACTUAL_VERIFIED[\s\S]{0,140}type-type-on-rhythm/.test(routing)) {
  errors.push("Actual preparation artifact must not claim real Mac verification");
}

if (errors.length) {
  console.error(`Type-on-rhythm DaVinci Actual Artifact contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Type-on-rhythm DaVinci Actual Artifact contracts OK: current Scene text/intensity feeds a bounded word-level Follower canary, canonical translator values remain the comparison source, live bindings and GUI/render QA stay NOT_VERIFIED/NOT_RUN, and the route is an honest Actual candidate without live/Actual/production auto-promotion.");
