import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const capture = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciEvidenceCapture.ts"), "utf8");
const gate = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciPromotionGate.ts"), "utf8");
const artifact = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciActualArtifact.ts"), "utf8");
const selector = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteSelector.tsx"), "utf8");
const gateView = fs.readFileSync(path.join(root, "src/components/CharStaggerDaVinciPromotionAssessmentView.tsx"), "utf8");
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
  'schemaVersion: "char-stagger-davinci-promotion-assessment/v1"',
  'authority: "DERIVED_GATE_ONLY"',
  'eligibleForHumanPromotionReview: blockers.length === 0',
  '"TEXT_PLUS_TOOL"',
  '"FOLLOWER_MODIFIER"',
  '"FOLLOWER_DELAY"',
  '"FOLLOWER_ORDER"',
  '"TRANSLATE_Y"',
  '"OPACITY"',
  '"EASING"',
  'MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS',
  'LIVE_PARAMETER_BINDINGS_INCOMPLETE',
  'VISUAL_QA_1X_NOT_PASS',
  'VISUAL_QA_HALF_SPEED_NOT_PASS',
  'VISUAL_QA_REVIEW_TIMESTAMP_MISSING',
  'automaticPromotionAllowed: false',
  'productionReady: false',
  'must not mutate typographyProductionRoutes',
]) {
  requireText(gate, token, `Char Stagger promotion gate missing contract: ${token}`);
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
  'CharStaggerDaVinciPromotionAssessmentView',
  'productionReady は自動昇格しません',
]) {
  requireText(selector, token, `Char Stagger readback UI missing contract: ${token}`);
}

for (const token of [
  'assessCharStaggerDaVinciPromotionEligibility',
  'Promotion review:',
  'Live binding roles:',
  'Automatic promotion: NO / productionReady: NO',
  'Promotion blockers:',
  '別PRで昇格します',
]) {
  requireText(gateView, token, `Char Stagger promotion assessment UI missing contract: ${token}`);
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
  '"type-char-stagger",\n    "stagger",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-char-stagger-davinci-text-plus-follower"',
  "Char Stagger must expose its translator/evidence workflow as an Actual candidate without claiming live verification",
);

if (/productionReady:\s*true/.test(capture) || /productionReady:\s*true/.test(gate)) {
  errors.push("Evidence capture and promotion gate must never auto-promote productionReady=true");
}
if (/automaticPromotionAllowed:\s*true/.test(gate)) {
  errors.push("Promotion assessment must never allow automatic route promotion");
}
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,120}type-char-stagger/.test(routing)) {
  errors.push("Readback capture implementation alone must not promote Char Stagger to live DaVinci implementation");
}
if (/DAVINCI_ACTUAL_VERIFIED[\s\S]{0,120}type-char-stagger/.test(routing)) {
  errors.push("Char Stagger must not claim Actual verification before real Mac evidence");
}
if (/visualQa1x:\s*"PASS"/.test(capture) || /visualQaHalfSpeed:\s*"PASS"/.test(capture)) {
  errors.push("Evidence capture template must not fabricate visual QA PASS");
}
if (!/sceneId !== artifact\.sceneId/.test(capture) || !/sourceRevision !== artifact\.sourceRevision/.test(capture)) {
  errors.push("Evidence evaluation must fail-close on Scene identity and revision drift");
}
if (!/capturedRoles\.length !== REQUIRED_BINDING_ROLES\.length/.test(gate)) {
  errors.push("Promotion review eligibility must require every live parameter binding role");
}

if (errors.length) {
  console.error(`Char Stagger DaVinci Evidence Capture contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Char Stagger DaVinci Evidence Capture contracts OK: Dashboard exports a blank evidence-only readback template, accepts only schema/scene/revision-matched Actual captures, records all seven live Fusion binding roles separately from canonical authority, evaluates machine-comparable values against the canonical translator, carries explicit 1x/half-speed QA states, and exposes an honest Actual-candidate route without live/Actual/production auto-promotion.");
