import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const matrix = fs.readFileSync(path.join(root, "src/components/TypographyProductionRoutingMatrix.tsx"), "utf8");
const selector = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteSelector.tsx"), "utf8");
const candidates = fs.readFileSync(path.join(root, "src/data/remotionElementCandidates.ts"), "utf8");
const maskBundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const charTranslator = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciTranslator.ts"), "utf8");
const charActual = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciActualArtifact.ts"), "utf8");
const rhythmTranslator = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciTranslator.ts"), "utf8");
const rhythmActual = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciActualArtifact.ts"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

const expected = [
  ["type-mask-reveal", "mask"],
  ["type-char-stagger", "stagger"],
  ["type-type-on-rhythm", "word-stagger"],
  ["type-word-punch", "punch"],
  ["type-tracking-burst", "tracking"],
  ["type-vertical-wipe", "vertical-wipe"],
  ["type-outline-fill", "outline"],
  ["type-baseline-hop", "hop"],
  ["type-triplet", "triplet"],
];

for (const [patternId, mode] of expected) {
  requireText(candidates, `patternId: "${patternId}"`, `Remotion candidate missing ${patternId}`);
  requireText(candidates, `canonicalMode: "${mode}"`, `Remotion candidate missing canonical mode ${mode}`);
  requireText(routing, `"${patternId}"`, `Production routing missing ${patternId}`);
  requireText(routing, `"${mode}"`, `Production routing missing canonical mode ${mode}`);
}

for (const token of [
  '"DAVINCI_TRANSLATION_NOT_IMPLEMENTED"',
  '"DAVINCI_ACTUAL_CANDIDATE"',
  '"DAVINCI_IMPLEMENTATION_AVAILABLE"',
  '"DAVINCI_ACTUAL_VERIFIED"',
  'translatorSpecAvailable: boolean',
  'actualEvidenceWorkflowAvailable: boolean',
  'liveImplementationAvailable: boolean',
  'actualVerified: boolean',
  'schemaVersion: "motion-zukan-typography-production/v1"',
  'authority: "DERIVED_FROM_HUMAN_MASTER_AND_HUMAN_SELECTED_ROUTE"',
  'schemaVersion: "typography-production-selection/v1"',
  'authority: "HUMAN_SELECTED"',
  'createTypographyProductionSelection',
  'sourceRevision: scene.updatedAt',
  'selectedAt',
  'assertFreshRouteSelection(scene, selection)',
  'selection.sceneId !== scene.sceneId',
  'selection.sourceRevision !== scene.updatedAt',
  'STALE_TYPOGRAPHY_ROUTE_SELECTION',
  'routeSelection: { ...selection }',
  'routeSelectionSourceRevision: selection.sourceRevision',
  'routeSelectionFresh: true',
  'stale selectionを自動適用しない。',
  'buildMaskRevealSceneProductionBundle(scene)',
  'candidate.readiness === "STUDIO_ACTUAL_VERIFIED"',
  'candidate.studioInstallActual === "PASS"',
  'candidate.studioControlReadbackActual === "PASS"',
  'ELEMENT_CANDIDATEやstandalone render成功をStudio GUI Actual成功へ読み替えない。',
  'capability: "PALMIER_TIMING_ONLY"',
  'xmlGeneratedExternally: true',
  'PalmierはSceneInstanceのplacement/trim/markerを担当し、Typography visual motion自体の正本にはしない。',
  'actualAppliedEvidence: "NOT_RUN"',
  'productionReady: false',
  'REMOTION_STUDIO_ACTUAL_NOT_VERIFIED',
  'DAVINCI_TRANSLATION_NOT_IMPLEMENTED',
  'DAVINCI_ACTUAL_CANDIDATE_NOT_LIVE_IMPLEMENTATION',
  'DAVINCI_ACTUAL_APPLIED_EVIDENCE_NOT_RUN',
  'generatedFromSceneUpdatedAt: scene.updatedAt',
  'buildTypographySceneProductionBundleJson',
]) {
  requireText(routing, token, `Typography production bundle missing contract token: ${token}`);
}

requireText(
  routing,
  '"DAVINCI_IMPLEMENTATION_AVAILABLE",\n    "impl-type-mask-reveal-davinci-text-plus"',
  "Mask Reveal must reuse the existing DaVinci implementation route",
);
requireText(
  maskBundle,
  'implementationId: "impl-type-mask-reveal-davinci-text-plus"',
  "Mask Reveal source bundle no longer exposes the implementation reused by the routing registry",
);

for (const [source, implementationId, label] of [
  [charTranslator, "impl-type-char-stagger-davinci-text-plus-follower", "Char Stagger translator"],
  [rhythmTranslator, "impl-type-type-on-rhythm-davinci-text-plus-follower-words", "Type on Rhythm translator"],
]) {
  requireText(source, implementationId, `${label} no longer proves its routed implementation id`);
}
for (const [source, translatorBuilder, creator, label] of [
  [charActual, "buildCharStaggerDaVinciTranslatorSpec", "createCharStaggerDaVinciActualArtifact", "Char Stagger Actual artifact"],
  [rhythmActual, "buildTypeOnRhythmDaVinciTranslatorSpec", "createTypeOnRhythmDaVinciActualArtifact", "Type on Rhythm Actual artifact"],
]) {
  requireText(source, translatorBuilder, `${label} no longer derives expected values from its canonical translator`);
  requireText(source, creator, `${label} no longer exposes its bounded Actual artifact creator`);
  requireText(source, 'authority: "EVIDENCE_ONLY"', `${label} must remain evidence-only`);
  requireText(source, 'productionReady: false', `${label} must remain non-production-ready`);
}

requireText(
  routing,
  '"type-char-stagger",\n    "stagger",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-char-stagger-davinci-text-plus-follower"',
  "Char Stagger must be staged as an Actual candidate backed by its translator/evidence workflow",
);
requireText(
  routing,
  '"type-type-on-rhythm",\n    "word-stagger",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-type-on-rhythm-davinci-text-plus-follower-words"',
  "Type on Rhythm must be staged as an Actual candidate backed by its translator/evidence workflow",
);

for (const [source, label] of [[matrix, "Routing Matrix"], [selector, "Route Selector"]]) {
  for (const token of [
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    "DAVINCI_ACTUAL_CANDIDATE",
    "DAVINCI_IMPLEMENTATION_AVAILABLE",
    "DAVINCI_ACTUAL_VERIFIED",
  ]) {
    requireText(source, token, `${label} missing staged DaVinci state ${token}`);
  }
}
for (const token of [
  "Actual候補",
  "live実装あり",
  "Actual検証済み",
  "Translator:",
  "Actual workflow:",
  "Live binding:",
  "Production: NOT_READY",
]) {
  requireText(matrix, token, `Routing Matrix missing human-readable readiness evidence: ${token}`);
}
for (const token of [
  "Translator + Actual workflowあり / live未検証",
  "DaVinci live実装あり / Actual未確認",
  "DaVinci stage:",
  "bundle.davinci.translatorSpecAvailable",
  "bundle.davinci.actualEvidenceWorkflowAvailable",
  "bundle.davinci.liveImplementationAvailable",
  "bundle.davinci.actualVerified",
]) {
  requireText(selector, token, `Route Selector missing staged DaVinci readiness evidence: ${token}`);
}

const routeCalls = [...routing.matchAll(/\n\s*route\(\n\s*"(type-[^"]+)"/g)].map((match) => match[1]);
if (routeCalls.length !== expected.length) {
  errors.push(`Expected ${expected.length} Typography production routes, found ${routeCalls.length}`);
}
if (new Set(routeCalls).size !== routeCalls.length) {
  errors.push("Typography production routes contain duplicate pattern ids");
}
for (const [patternId] of expected) {
  if (!routeCalls.includes(patternId)) errors.push(`Typography production route list omitted ${patternId}`);
}

const implementationAvailable = [...routing.matchAll(/route\(\s*\n\s*"(type-[^"]+)",\s*\n\s*"[^"]+",\s*\n\s*"DAVINCI_IMPLEMENTATION_AVAILABLE"/g)]
  .map((match) => match[1]);
if (implementationAvailable.length !== 1 || implementationAvailable[0] !== "type-mask-reveal") {
  errors.push(`Only type-mask-reveal may claim a live DaVinci implementation right now; got ${implementationAvailable.join(", ")}`);
}

const actualCandidates = [...routing.matchAll(/route\(\s*\n\s*"(type-[^"]+)",\s*\n\s*"[^"]+",\s*\n\s*"DAVINCI_ACTUAL_CANDIDATE"/g)]
  .map((match) => match[1]);
const expectedActualCandidates = ["type-char-stagger", "type-type-on-rhythm"];
if (actualCandidates.length !== expectedActualCandidates.length || expectedActualCandidates.some((id) => !actualCandidates.includes(id))) {
  errors.push(`Actual candidates must be exactly ${expectedActualCandidates.join(", ")}; got ${actualCandidates.join(", ")}`);
}

const actualVerified = [...routing.matchAll(/route\(\s*\n\s*"(type-[^"]+)",\s*\n\s*"[^"]+",\s*\n\s*"DAVINCI_ACTUAL_VERIFIED"/g)]
  .map((match) => match[1]);
if (actualVerified.length !== 0) {
  errors.push(`No Typography route may claim DaVinci Actual verification without real Mac evidence; got ${actualVerified.join(", ")}`);
}

if (/productionReady:\s*true/.test(routing)) {
  errors.push("Typography production routing must not claim productionReady before real applied evidence");
}
if (/actualAppliedEvidence:\s*"PASS"/.test(routing)) {
  errors.push("Typography production routing must not fabricate DaVinci Actual evidence");
}
if (/xmlGeneratedExternally:\s*false/.test(routing)) {
  errors.push("Typography production routing must not pretend the dashboard generated Palmier XML");
}
if (/authority:\s*"HUMAN_MASTER"/.test(routing)) {
  errors.push("Derived Typography route bundle must not call a caller-selected pattern HUMAN_MASTER");
}
if (!routing.includes('selection.sourceRevision !== scene.updatedAt')) {
  errors.push("Typography route selection must fail closed when the SceneInstance revision changes");
}

if (errors.length) {
  console.error(`Typography Production Routing contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Production Routing contracts OK: all nine candidates use four-stage DaVinci readiness in data/UI; Mask Reveal alone has a live implementation, Char Stagger and Type on Rhythm are honest Actual candidates whose artifacts derive expected values from canonical translators, six remain untranslated, and no route fabricates Mac Actual verification or production readiness.");
