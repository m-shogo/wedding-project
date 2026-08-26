import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const candidates = fs.readFileSync(path.join(root, "src/data/remotionElementCandidates.ts"), "utf8");
const maskBundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
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

const concreteAvailableRoutes = [...routing.matchAll(/route\(\s*\n\s*"(type-[^"]+)",\s*\n\s*"[^"]+",\s*\n\s*"DAVINCI_IMPLEMENTATION_AVAILABLE"/g)]
  .map((match) => match[1]);
if (concreteAvailableRoutes.length !== 1 || concreteAvailableRoutes[0] !== "type-mask-reveal") {
  errors.push(`Only type-mask-reveal may claim a concrete DaVinci route right now; got ${concreteAvailableRoutes.join(", ")}`);
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

console.log("Typography Production Routing contracts OK: all nine canonical Typography Element candidates are routed into production via an explicit HUMAN_SELECTED route selection bound to the SceneInstance revision; stale selections fail closed; Palmier remains timing-only/external-XML truth; only Mask Reveal claims an implemented DaVinci translation; Studio and DaVinci Actual evidence remain NOT_RUN until real verification.");
