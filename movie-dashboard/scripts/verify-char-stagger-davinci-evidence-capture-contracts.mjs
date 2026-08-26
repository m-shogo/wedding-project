import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const capture = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciEvidenceCapture.ts"), "utf8");
const shared = fs.readFileSync(path.join(root, "src/data/davinciActualEvidenceContract.ts"), "utf8");
const compatibilityAlias = fs.readFileSync(path.join(root, "src/data/davinciFollowerEvidenceContract.ts"), "utf8");
const gate = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciPromotionGate.ts"), "utf8");
const artifact = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciActualArtifact.ts"), "utf8");
const selector = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteSelector.tsx"), "utf8");
const gateView = fs.readFileSync(path.join(root, "src/components/CharStaggerDaVinciPromotionAssessmentView.tsx"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const errors = [];
const requireText = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'schemaVersion: "char-stagger-davinci-evidence-capture/v1"','authority: "EVIDENCE_ONLY"',
  'createCharStaggerDaVinciEvidenceCaptureTemplate','liveParameterBindings: []','blankDaVinciVisualQa()',
  'Do not infer live Fusion tool/input names from docs','parseCharStaggerDaVinciEvidenceCapture',
  'STALE_CHAR_STAGGER_EVIDENCE_CAPTURE','capture/readback identity mismatch','parseDaVinciLiveParameterBindings',
  'parseDaVinciVisualQa','assertDaVinciEvidenceIdentity','evaluateCharStaggerDaVinciEvidenceCapture',
  'attachCharStaggerDaVinciActualReadback','allMachineComparableChecksPass: machineComparable.every((state) => state === "PASS")',
  'productionReady: false'
]) requireText(capture, token, `Char Stagger evidence capture missing contract: ${token}`);

for (const token of [
  'export type DaVinciEvidenceState = "NOT_RUN" | "PASS" | "FAIL"','DaVinciLiveParameterBindingV1',
  'DaVinciVisualQaV1','parseDaVinciLiveParameterBindings','liveParameterBindings must be an array',
  'parseDaVinciVisualQa','capturedDaVinciBindingRoles','assertDaVinciEvidenceIdentity','blankDaVinciVisualQa',
  'oneX: "NOT_RUN"','halfSpeed: "NOT_RUN"'
]) requireText(shared, token, `Generic Actual evidence contract missing: ${token}`);
requireText(compatibilityAlias, 'export * from "./davinciActualEvidenceContract"', "Follower compatibility alias must re-export generic Actual contract");

for (const token of [
  'schemaVersion: "char-stagger-davinci-promotion-assessment/v1"','authority: "DERIVED_GATE_ONLY"',
  'eligibleForHumanPromotionReview: blockers.length === 0','LIVE_PARAMETER_BINDINGS_INCOMPLETE',
  'VISUAL_QA_1X_NOT_PASS','VISUAL_QA_HALF_SPEED_NOT_PASS','automaticPromotionAllowed: false','productionReady: false'
]) requireText(gate, token, `Char Stagger promotion gate missing contract: ${token}`);
for (const token of ['Readback template','Readback取込','Readback rejected:','Machine checks:','Visual QA: 1x','CharStaggerDaVinciPromotionAssessmentView']) requireText(selector, token, `Char Stagger UI missing: ${token}`);
for (const token of ['assessCharStaggerDaVinciPromotionEligibility','Promotion review:','Live binding roles:','Automatic promotion: NO / productionReady: NO']) requireText(gateView, token, `Char Stagger promotion UI missing: ${token}`);
for (const token of ['compareCharStaggerDaVinciActualReadback','readback.sourceRevision !== artifact.sourceRevision','productionReady: false']) requireText(artifact, token, `Char Stagger Actual contract missing: ${token}`);
requireText(routing,'"type-char-stagger",\n    "stagger",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-char-stagger-davinci-text-plus-follower"',"Char Stagger must remain Actual candidate");

if (/productionReady:\s*true/.test(capture)||/productionReady:\s*true/.test(gate)||/automaticPromotionAllowed:\s*true/.test(gate)) errors.push("Char Stagger evidence must never auto-promote");
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,120}type-char-stagger/.test(routing)) errors.push("Char Stagger evidence must not promote live implementation");
if (/DAVINCI_ACTUAL_VERIFIED[\s\S]{0,120}type-char-stagger/.test(routing)) errors.push("Char Stagger must not claim Mac Actual verification");
if (errors.length) { console.error(`Char Stagger evidence contracts FAILED (${errors.length})`); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log("Char Stagger evidence contracts OK: generic DaVinci Actual parsing is reused through a compatibility alias while pattern-specific canonical comparison, seven-role review and fail-closed promotion remain intact.");
