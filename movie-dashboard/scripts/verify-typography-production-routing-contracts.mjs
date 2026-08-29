import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const routing = read("src/data/typographySceneProductionRouting.ts");
const matrix = read("src/components/TypographyProductionRoutingMatrix.tsx");
const selector = read("src/components/TypographyProductionRouteSelector.tsx");
const requirements = read("src/components/TypographyDaVinciPromotionRequirements.tsx");
const candidates = read("src/data/remotionElementCandidates.ts");
const maskBundle = read("src/data/maskRevealSceneProductionBundle.ts");
const promotionPolicy = read("src/data/typographyDaVinciPromotionPolicy.ts");
const sharedEvidence = read("src/data/davinciFollowerEvidenceContract.ts");
const errors = [];
const requireText = (source, token, message) => {if (!source.includes(token)) errors.push(message);};

const routeContracts = [
  {id: "type-mask-reveal", mode: "mask", state: "DAVINCI_IMPLEMENTATION_AVAILABLE", implementationId: "impl-type-mask-reveal-davinci-text-plus", translator: null, actual: null, capture: null},
  {id: "type-char-stagger", mode: "stagger", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-char-stagger-davinci-text-plus-follower", translator: "charStaggerDaVinciTranslator.ts", actual: "charStaggerDaVinciActualArtifact.ts", capture: "charStaggerDaVinciEvidenceCapture.ts"},
  {id: "type-type-on-rhythm", mode: "word-stagger", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-type-on-rhythm-davinci-text-plus-follower-words", translator: "typeOnRhythmDaVinciTranslator.ts", actual: "typeOnRhythmDaVinciActualArtifact.ts", capture: "typeOnRhythmDaVinciEvidenceCapture.ts"},
  {id: "type-word-punch", mode: "punch", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-word-punch-davinci-text-plus-transform", translator: "wordPunchDaVinciTranslator.ts", actual: "wordPunchDaVinciActualArtifact.ts", capture: "wordPunchDaVinciEvidenceCapture.ts"},
  {id: "type-tracking-burst", mode: "tracking", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-tracking-burst-davinci-text-plus-tracking", translator: "trackingBurstDaVinciTranslator.ts", actual: "trackingBurstDaVinciActualArtifact.ts", capture: "trackingBurstDaVinciEvidenceCapture.ts"},
  {id: "type-vertical-wipe", mode: "vertical-wipe", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-vertical-wipe-davinci-text-plus-mask", translator: "verticalWipeDaVinciTranslator.ts", actual: "verticalWipeDaVinciActualArtifact.ts", capture: "verticalWipeDaVinciEvidenceCapture.ts"},
  {id: "type-outline-fill", mode: "outline", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-outline-fill-davinci-text-plus-shading", translator: "outlineFillDaVinciTranslator.ts", actual: "outlineFillDaVinciActualArtifact.ts", capture: "outlineFillDaVinciEvidenceCapture.ts"},
  {id: "type-baseline-hop", mode: "hop", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-baseline-hop-davinci-text-plus-baseline", translator: "baselineHopDaVinciTranslator.ts", actual: "baselineHopDaVinciActualArtifact.ts", capture: "baselineHopDaVinciEvidenceCapture.ts"},
  {id: "type-triplet", mode: "triplet", state: "DAVINCI_ACTUAL_CANDIDATE", implementationId: "impl-type-triplet-davinci-text-plus-transform-pulses", translator: "tripletDaVinciTranslator.ts", actual: "tripletDaVinciActualArtifact.ts", capture: "tripletDaVinciEvidenceCapture.ts"},
];

for (const contract of routeContracts) {
  requireText(candidates, `patternId: "${contract.id}"`, `Remotion candidate missing ${contract.id}`);
  requireText(candidates, `canonicalMode: "${contract.mode}"`, `Remotion candidate missing canonical mode ${contract.mode}`);
  const routeToken = `"${contract.id}",\n    "${contract.mode}",\n    "${contract.state}",\n    "${contract.implementationId}"`;
  requireText(routing, routeToken, `Production route drifted for ${contract.id}`);
  if (contract.translator) {
    const translator = read(`src/data/${contract.translator}`);
    const actual = read(`src/data/${contract.actual}`);
    const capture = read(`src/data/${contract.capture}`);
    requireText(translator, contract.implementationId, `${contract.id} translator no longer proves routed implementation id`);
    requireText(actual, 'authority: "EVIDENCE_ONLY"', `${contract.id} Actual artifact must remain evidence-only`);
    requireText(actual, 'productionReady: false', `${contract.id} Actual artifact must remain non-production-ready`);
    requireText(capture, 'authority: "EVIDENCE_ONLY"', `${contract.id} evidence capture must remain evidence-only`);
    requireText(capture, "evaluateTypographyDaVinciHumanPromotionGate", `${contract.id} evidence must use shared Typography promotion gate`);
    requireText(capture, `patternId: "${contract.id}"`, `${contract.id} evidence must evaluate its own policy`);
    requireText(capture, "promotionGate", `${contract.id} evaluated evidence must expose promotionGate`);
    requireText(capture, "eligibleForHumanReview", `${contract.id} evaluated evidence must expose human-review eligibility`);
    requireText(capture, "automaticPromotionAllowed", `${contract.id} evaluated evidence must explicitly forbid automatic promotion`);
    requireText(capture, "productionReady: false", `${contract.id} evaluated evidence must remain non-production-ready`);
    requireText(promotionPolicy, `"${contract.id}"`, `${contract.id} required binding roles missing from centralized policy`);
  }
}

for (const token of [
  'schemaVersion: "davinci-human-promotion-gate/v1"',
  'authority: "DERIVED_EVIDENCE_GATE"',
  'DAVINCI_MACHINE_EVIDENCE_INCOMPLETE',
  'DAVINCI_REQUIRED_BINDINGS_INCOMPLETE',
  'DAVINCI_VISUAL_QA_INCOMPLETE',
  'DAVINCI_HUMAN_PROMOTION_REVIEW_REQUIRED',
  'automaticPromotionAllowed: false',
  'productionReady: false',
]) requireText(sharedEvidence, token, `Shared DaVinci promotion gate missing safety contract: ${token}`);
for (const token of [
  "typographyDaVinciRequiredBindingRoles",
  "evaluateTypographyDaVinciHumanPromotionGate",
  'Exclude<TypographyProductionPatternId, "type-mask-reveal">',
]) requireText(promotionPolicy, token, `Typography promotion policy missing: ${token}`);

for (const token of [
  "TypographyDaVinciPromotionRequirements",
  "getTypographyDaVinciRequiredBindingRoles",
  "Machine parity",
  "Live bindings",
  "Visual QA",
  "1x PASS + half-speed PASS + reviewedAt実記録",
  "FOLLOWER_UNIT",
  "wordUnitApplied=PASS",
  "automaticPromotionAllowed: NO",
  "productionReady: NO",
]) requireText(requirements, token, `Typography promotion requirements UI missing: ${token}`);
requireText(selector, "<TypographyDaVinciPromotionRequirements patternId={bundle.patternId} />", "Selected Typography route must show its promotion requirements");
for (const token of [
  "getTypographyDaVinciRequiredBindingRoles",
  "Human Review gate:",
  "machine parity +",
  "bindings + 1x/half-speed QA",
]) requireText(matrix, token, `Routing Matrix must expose promotion requirements: ${token}`);

requireText(maskBundle, 'implementationId: "impl-type-mask-reveal-davinci-text-plus"', "Mask Reveal live implementation id drifted");
for (const token of [
  '"DAVINCI_TRANSLATION_NOT_IMPLEMENTED"', '"DAVINCI_ACTUAL_CANDIDATE"', '"DAVINCI_IMPLEMENTATION_AVAILABLE"', '"DAVINCI_ACTUAL_VERIFIED"',
  'translatorSpecAvailable: boolean', 'actualEvidenceWorkflowAvailable: boolean', 'liveImplementationAvailable: boolean', 'actualVerified: boolean',
  'schemaVersion: "motion-zukan-typography-production/v1"', 'authority: "DERIVED_FROM_HUMAN_MASTER_AND_HUMAN_SELECTED_ROUTE"',
  'schemaVersion: "typography-production-selection/v1"', 'authority: "HUMAN_SELECTED"', 'createTypographyProductionSelection',
  'selection.sourceRevision !== scene.updatedAt', 'STALE_TYPOGRAPHY_ROUTE_SELECTION', 'routeSelectionFresh: true',
  'candidate.readiness === "STUDIO_ACTUAL_VERIFIED"', 'candidate.studioInstallActual === "PASS"', 'candidate.studioControlReadbackActual === "PASS"',
  'ELEMENT_CANDIDATEやstandalone render成功をStudio GUI Actual成功へ読み替えない。', 'capability: "PALMIER_TIMING_ONLY"',
  'xmlGeneratedExternally: true', 'actualAppliedEvidence: "NOT_RUN"', 'productionReady: false',
  'DAVINCI_ACTUAL_CANDIDATE_NOT_LIVE_IMPLEMENTATION', 'DAVINCI_ACTUAL_APPLIED_EVIDENCE_NOT_RUN',
]) requireText(routing, token, `Typography production bundle missing contract token: ${token}`);

const evidenceSpecificContracts = [
  ["typeOnRhythmDaVinciEvidenceCapture.ts", "checks.wordUnitApplied"],
  ["typeOnRhythmDaVinciEvidenceCapture.ts", '"FOLLOWER_UNIT"'],
  ["trackingBurstDaVinciEvidenceCapture.ts", '"NATIVE_UNIT_CALIBRATION"'],
  ["trackingBurstDaVinciEvidenceCapture.ts", "normalizedTrackingFromEm"],
  ["verticalWipeDaVinciEvidenceCapture.ts", '"MASK_COORDINATE_CONVENTION"'],
  ["verticalWipeDaVinciEvidenceCapture.ts", '"MASK_INVERSION"'],
  ["verticalWipeDaVinciEvidenceCapture.ts", "normalizedTopInsetFrom"],
  ["outlineFillDaVinciEvidenceCapture.ts", '"FILL_SHADING_BINDING"'],
  ["outlineFillDaVinciEvidenceCapture.ts", '"STROKE_WIDTH_UNIT_CALIBRATION"'],
  ["baselineHopDaVinciEvidenceCapture.ts", '"BASELINE_POSITION_BINDING"'],
  ["baselineHopDaVinciEvidenceCapture.ts", '"POSITION_UNIT_CALIBRATION"'],
  ["tripletDaVinciEvidenceCapture.ts", '"HIT_1"'],
  ["tripletDaVinciEvidenceCapture.ts", '"HIT_2"'],
  ["tripletDaVinciEvidenceCapture.ts", '"HIT_3"'],
  ["tripletDaVinciEvidenceCapture.ts", '"PULSE_DECAY"'],
];
for (const [file, token] of evidenceSpecificContracts) requireText(read(`src/data/${file}`), token, `${file} missing required honest Actual evidence token ${token}`);

for (const [source, label] of [[matrix, "Routing Matrix"], [selector, "Route Selector"]]) {
  for (const token of ["DAVINCI_TRANSLATION_NOT_IMPLEMENTED", "DAVINCI_ACTUAL_CANDIDATE", "DAVINCI_IMPLEMENTATION_AVAILABLE", "DAVINCI_ACTUAL_VERIFIED"]) requireText(source, token, `${label} missing DaVinci state ${token}`);
}
for (const token of ["Actual候補", "live実装あり", "Actual検証済み", "Translator:", "Actual workflow:", "Live binding:", "Production: NOT_READY"]) requireText(matrix, token, `Routing Matrix missing ${token}`);
for (const token of ["Translator + Actual workflowあり / live未検証", "DaVinci live実装あり / Actual未確認", "DaVinci stage:", "bundle.davinci.translatorSpecAvailable", "bundle.davinci.actualEvidenceWorkflowAvailable", "bundle.davinci.liveImplementationAvailable", "bundle.davinci.actualVerified"]) requireText(selector, token, `Route Selector missing ${token}`);

const routeCalls = [...routing.matchAll(/\n\s*route\(\n\s*"(type-[^"]+)"/g)].map((match) => match[1]);
if (routeCalls.length !== routeContracts.length) errors.push(`Expected ${routeContracts.length} Typography production routes, found ${routeCalls.length}`);
if (new Set(routeCalls).size !== routeCalls.length) errors.push("Typography production routes contain duplicate pattern ids");
for (const contract of routeContracts) if (!routeCalls.includes(contract.id)) errors.push(`Typography route omitted ${contract.id}`);

const expectedActualCandidates = routeContracts.filter((item) => item.state === "DAVINCI_ACTUAL_CANDIDATE").map((item) => item.id);
const actualCandidates = [...routing.matchAll(/route\(\s*\n\s*"(type-[^"]+)",\s*\n\s*"[^"]+",\s*\n\s*"DAVINCI_ACTUAL_CANDIDATE"/g)].map((match) => match[1]);
if (actualCandidates.length !== expectedActualCandidates.length || expectedActualCandidates.some((id) => !actualCandidates.includes(id))) errors.push(`Actual candidate set drifted: ${actualCandidates.join(", ")}`);
const actualVerified = [...routing.matchAll(/route\(\s*\n\s*"(type-[^"]+)",\s*\n\s*"[^"]+",\s*\n\s*"DAVINCI_ACTUAL_VERIFIED"/g)].map((match) => match[1]);
if (actualVerified.length !== 0) errors.push(`No Typography route may claim Actual verification without real Mac evidence: ${actualVerified.join(", ")}`);
if (/productionReady:\s*true/.test(routing)) errors.push("Typography routing must not claim productionReady");
if (/actualAppliedEvidence:\s*"PASS"/.test(routing)) errors.push("Typography routing must not fabricate Actual evidence");

if (errors.length) {
  console.error(`Typography Production Routing contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Typography Production Routing contracts OK: all eight Actual candidates use one shared human-promotion policy and expose the exact machine/binding/visual requirements in the Dashboard without fabricating Mac Actual or production readiness.");
