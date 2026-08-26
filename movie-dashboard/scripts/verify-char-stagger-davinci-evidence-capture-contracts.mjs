import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const capture = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciEvidenceCapture.ts"), "utf8");
const artifact = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciActualArtifact.ts"), "utf8");
const selector = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteSelector.tsx"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "char-stagger-davinci-evidence-capture/v1"',
  'authority: "EVIDENCE_ONLY"',
  'createCharStaggerDaVinciEvidenceCaptureTemplate',
  'liveParameterBindings: []',
  'oneX: "NOT_RUN"',
  'halfSpeed: "NOT_RUN"',
  'Do not infer live Fusion tool/input names from docs',
  'parseCharStaggerDaVinciEvidenceCapture',
  'capture.schemaVersion mismatch',
  'capture.authority must be EVIDENCE_ONLY',
  'STALE_CHAR_STAGGER_EVIDENCE_CAPTURE',
  'capture/readback identity mismatch',
  'readback.schemaVersion mismatch',
  'liveParameterBindings must be an array',
  'evaluateCharStaggerDaVinciEvidenceCapture',
  'attachCharStaggerDaVinciActualReadback',
  'visualQa1x: capture.visualQa.oneX',
  'visualQaHalfSpeed: capture.visualQa.halfSpeed',
  'allMachineComparableChecksPass: machineComparable.every((state) => state === "PASS")',
  'parameterBindingsCaptured: capture.liveParameterBindings.length > 0',
  'productionReady: false',
  'Production routing must be promoted separately',
]) {
  requireText(capture, token, `Char Stagger evidence capture missing contract: ${token}`);
}

for (const token of [
  'createCharStaggerDaVinciEvidenceCaptureTemplate',
  'parseCharStaggerDaVinciEvidenceCapture',
  'evaluateCharStaggerDaVinciEvidenceCapture',
  'Readback template',
  'Readback取込',
  'Readback rejected:',
  'Machine checks:',
  'live bindings',
  'Visual QA: 1x',
  'Evaluated evidence',
  'productionReady は自動昇格しません',
]) {
  requireText(selector, token, `Char Stagger readback UI missing contract: ${token}`);
}

for (const token of [
  'compareCharStaggerDaVinciActualReadback',
  'readback.sourceRevision !== artifact.sourceRevision',
  'productionReady: false',
]) {
  requireText(artifact, token, `Existing Actual artifact fail-close contract missing: ${token}`);
}

requireText(
  routing,
  '"type-char-stagger",\n    "stagger",\n    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED"',
  "Char Stagger must remain blocked until Actual evidence is separately reviewed and promoted",
);

if (/productionReady:\s*true/.test(capture)) {
  errors.push("Evidence capture must never auto-promote productionReady=true");
}
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,120}type-char-stagger/.test(routing)) {
  errors.push("Readback capture implementation alone must not promote Char Stagger DaVinci route");
}
if (/visualQa1x:\s*"PASS"/.test(capture) || /visualQaHalfSpeed:\s*"PASS"/.test(capture)) {
  errors.push("Evidence capture template must not fabricate visual QA PASS");
}
if (!/sceneId !== artifact\.sceneId/.test(capture) || !/sourceRevision !== artifact\.sourceRevision/.test(capture)) {
  errors.push("Evidence evaluation must fail-close on Scene identity and revision drift");
}

if (errors.length) {
  console.error(`Char Stagger DaVinci Evidence Capture contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Char Stagger DaVinci Evidence Capture contracts OK: Dashboard exports a blank evidence-only readback template, accepts only schema/scene/revision-matched Actual captures, records live Fusion bindings separately from canonical authority, evaluates machine-comparable values against the existing canonical translator, carries explicit 1x/half-speed QA states, never fabricates PASS or production readiness, and keeps the production route fail-closed until separate review/promotion.");
