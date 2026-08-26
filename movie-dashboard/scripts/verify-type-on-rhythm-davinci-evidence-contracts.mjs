import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const capture = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciEvidenceCapture.ts"), "utf8");
const gate = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciPromotionGate.ts"), "utf8");
const actual = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciActualArtifact.ts"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1"',
  'authority: "EVIDENCE_ONLY"',
  'createTypeOnRhythmDaVinciEvidenceCaptureTemplate',
  'followerUnit: null',
  'liveParameterBindings: []',
  'oneX: "NOT_RUN"',
  'halfSpeed: "NOT_RUN"',
  'Do not infer bindings from documentation',
  'parseTypeOnRhythmDaVinciEvidenceCapture',
  'capture.schemaVersion mismatch',
  'capture.authority must be EVIDENCE_ONLY',
  'STALE_TYPE_ON_RHYTHM_EVIDENCE_CAPTURE',
  'capture/readback identity mismatch',
  'readback.followerUnit must be WORDS|null',
  '"FOLLOWER_UNIT"',
  'evaluateTypeOnRhythmDaVinciEvidenceCapture',
  'attachTypeOnRhythmDaVinciActualReadback',
  'checks.wordUnitApplied',
  'allMachineComparableChecksPass: machineComparable.every((item) => item === "PASS")',
  'productionReady: false',
]) requireText(capture, token, `Type-on-rhythm evidence capture missing: ${token}`);

for (const token of [
  'schemaVersion: "type-on-rhythm-davinci-promotion-assessment/v1"',
  'authority: "DERIVED_GATE_ONLY"',
  '"TEXT_PLUS_TOOL"',
  '"FOLLOWER_MODIFIER"',
  '"FOLLOWER_UNIT"',
  '"FOLLOWER_DELAY"',
  '"FOLLOWER_ORDER"',
  '"TRANSLATE_Y"',
  '"OPACITY"',
  '"EASING"',
  'eligibleForHumanPromotionReview: blockers.length === 0',
  'automaticPromotionAllowed: false',
  'productionReady: false',
  'Never mutate typographyProductionRoutes',
]) requireText(gate, token, `Type-on-rhythm promotion gate missing: ${token}`);

for (const token of [
  'wordUnitApplied: "NOT_RUN"',
  'unitMatches',
  'wordUnitApplied: booleanComparisonState(comparison.unitMatches)',
  'productionReady: false',
]) requireText(actual, token, `Type-on-rhythm Actual honesty contract missing: ${token}`);

requireText(
  routing,
  '"type-type-on-rhythm",\n    "word-stagger",\n    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED"',
  "type-type-on-rhythm route must remain fail-closed",
);

if (/productionReady:\s*true/.test(capture) || /productionReady:\s*true/.test(gate)) errors.push("Evidence path must not auto-promote productionReady");
if (/automaticPromotionAllowed:\s*true/.test(gate)) errors.push("Evidence gate must not allow automatic promotion");
if (/visualQa1x:\s*"PASS"/.test(capture) || /visualQaHalfSpeed:\s*"PASS"/.test(capture)) errors.push("Blank evidence template must not fabricate visual QA PASS");
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,140}type-type-on-rhythm/.test(routing)) errors.push("Evidence implementation alone must not promote route");
if (!/sourceRevision !== artifact\.sourceRevision/.test(capture)) errors.push("Evidence evaluation must fail-close on revision drift");
if (!/evidence\.capturedBindingRoles\.length !== requiredBindingRoles\.length/.test(gate)) errors.push("Promotion gate must require all eight live binding roles");

if (errors.length) {
  console.error(`Type-on-rhythm DaVinci Evidence contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Type-on-rhythm DaVinci Evidence contracts OK: blank Mac Actual capture starts NOT_RUN, requires explicit WORDS unit plus eight live binding roles, rejects stale/mismatched evidence, evaluates canonical readback without changing Scene authority, and only becomes eligible for a separate human promotion review after machine checks, bindings, 1x/half-speed QA and review timestamp are complete.");
