import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifact = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciActualArtifact.ts"), "utf8");
const translator = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciTranslator.ts"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const maskEvidence = fs.readFileSync(path.join(root, "src/data/maskRevealDaVinciAppliedEvidence.ts"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "char-stagger-davinci-actual-artifact/v1"',
  'authority: "EVIDENCE_ONLY"',
  'patternId: "type-char-stagger"',
  'BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER',
  'resolveEditableValue(scene.editableIntent.fields.text)',
  'resolveEditableValue(scene.editableIntent.fields.intensity)',
  'color: "#ffffff"',
  'fps: 30',
  'buildCharStaggerDaVinciTranslatorSpec(baseline)',
  'selection.patternId !== "type-char-stagger"',
  'selection.sourceRevision !== scene.updatedAt',
  'STALE_CHAR_STAGGER_ACTUAL_SELECTION',
  'state: "NOT_VERIFIED"',
  'Do not invent Fusion input/property names',
  'Attach a real Follower modifier',
  'Read back the actual Text+/Follower values and live input/property names',
  'Keep every check NOT_RUN unless that exact step was performed',
  'parameter binding, apply/readback, render, and visual parity evidence',
  'productionReady: false',
  'compareCharStaggerDaVinciActualReadback',
  'readback.sourceRevision !== artifact.sourceRevision',
  'expectedSource: "CANONICAL_TRANSLATOR_SPEC"',
  'delayFrameDelta',
  'translateYFromDeltaPixels',
  'opacityFromDelta',
  'easingMatches',
  'attachCharStaggerDaVinciActualReadback',
]) {
  requireText(artifact, token, `Char Stagger Actual artifact missing contract: ${token}`);
}

for (const token of [
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
  'impl-type-char-stagger-davinci-text-plus-follower',
]) {
  requireText(translator, token, `Char Stagger translator honesty contract missing: ${token}`);
}

for (const token of [
  'authority: "EVIDENCE_ONLY"',
  'status: "PENDING_LOCAL_DAVINCI"',
  'productionReady: false',
  'Resolve readback and rendered media are evidence only.',
]) {
  requireText(maskEvidence, token, `Existing Mask Reveal evidence pattern missing reusable boundary: ${token}`);
}

requireText(
  routing,
  '"type-char-stagger",\n    "stagger",\n    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED"',
  "Char Stagger production route must stay blocked while Actual parameter bindings are unverified",
);

if (/parameterBinding:[\s\S]{0,100}state:\s*"VERIFIED"/.test(artifact)) {
  errors.push("Char Stagger Actual artifact must not pre-verify Fusion parameter bindings");
}
if (/visualQa1x:\s*"PASS"/.test(artifact) || /visualQaHalfSpeed:\s*"PASS"/.test(artifact)) {
  errors.push("Template must not fabricate visual QA PASS");
}
if (/productionReady:\s*true/.test(artifact)) {
  errors.push("Char Stagger Actual artifact must remain productionReady=false until promotion logic is separately proven");
}
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,120}type-char-stagger/.test(routing)) {
  errors.push("Actual preparation artifact alone must not promote Char Stagger to an implemented DaVinci route");
}

if (errors.length) {
  console.error(`Char Stagger DaVinci Actual Artifact contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Char Stagger DaVinci Actual Artifact contracts OK: the bounded canary derives text/intensity from current Scene authority, uses a clearly non-Human-Master white/30fps test baseline, reuses the existing evidence-only boundary, leaves live Fusion parameter bindings unverified and all GUI/render QA NOT_RUN, compares future readback to the canonical translator spec, and keeps production routing fail-closed.");
