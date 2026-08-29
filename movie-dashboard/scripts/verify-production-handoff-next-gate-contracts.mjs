import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const opening = read("src/data/openingProductionStatusHandoff.ts");
const profile = read("src/data/profileProductionStatusHandoff.ts");
const effectiveExport = read("src/lib/effectiveProductionHandoffExport.ts");
const openingUi = read("src/components/OpeningProductionHandoffExportButton.tsx");
const profileUi = read("src/components/ProfileProductionHandoffExportButton.tsx");
const nextGateUi = read("src/components/ProductionNextGateSummary.tsx");
const effectiveNextGateUi = read("src/components/EffectiveProductionNextGateSummary.tsx");
const errors = [];

const need = (source, token, label) => {
  if (!source.includes(token)) errors.push(`${label} missing ${token}`);
};

for (const [label, source, project] of [
  ["Opening", opening, "opening"],
  ["Profile", profile, "profile"],
]) {
  for (const token of [
    "const buildNextGate =",
    "currentCriticalStage",
    'state: "BLOCKED" as const',
    "artifactPath: current.path ?? null",
    "blockerCodes: [...current.blockerCodes]",
    "blockerActions: current.blockerActions.map",
    "recovery: [...current.recovery]",
    "actionTargets: current.actionTargets.map",
    'state: "PRODUCTION_READY" as const',
    "blockerActions: [] as MovieProductionBlockerRecoveryAction[]",
    "actionTargets: [] as Array<{label: string; route: string; purpose: string}>",
    `nextGate: buildNextGate(${project}CriticalPath)`,
    `criticalPath: criticalPath.projects.${project}`,
    '"NEXT_GATE_EXPORTED != NEXT_GATE_COMPLETED"',
    '"ACTION_TARGET_EXPORTED != ACTION_COMPLETED"',
    '"BLOCKER_ACTION_EXPORTED != RECOVERY_EXECUTED"',
    '"STABLE_BLOCKER_CODE != RAW_BLOCKER_DETAIL"',
  ]) need(source, token, label);

  if (source.includes("macDaVinciActual: 'PASS'") || source.includes('productionReady: true')) {
    errors.push(`${label} handoff must not fabricate Mac Actual or production readiness`);
  }
}

need(opening, "const openingCriticalPath = criticalPath.projects.opening", "Opening");
need(profile, "const profileCriticalPath = criticalPath.projects.profile", "Profile");

for (const token of [
  'wedding-effective-production-handoff-overlay/v1',
  'authority: "MOTION_STUDIO_EFFECTIVE_WEDDING_PRODUCTION_GATE"',
  'buildPalmierWeddingProductionGate(movieId)',
  'productionReady: project.productionReady',
  'effectiveProductionState: project.effectiveProductionState',
  'blockingAuthorities: [...project.blockingAuthorities]',
  'effectiveNextGate:',
  'blockerCodes: [...project.effectiveNextGate.blockerCodes]',
  'blockerActions: project.effectiveNextGate.blockerActions.map',
  'adoptedCandidateIds: [...project.effectiveNextGate.adoptedCandidateIds]',
  'remotionStudioToolingDependency:',
  'CANONICAL_HANDOFF_REMAINS_SOURCE_OF_WEDDING_MEDIA_AND_STAGE_EVIDENCE',
  'EFFECTIVE_OVERLAY_EXPORTED != EFFECTIVE_GATE_COMPLETED',
  'REMOTION_DEPENDENCY_OVERLAY_EXPORTED != STUDIO_ACTUAL_VERIFIED',
  'HUMAN_QA_NOT_RUN != HUMAN_QA_PASS',
  'MAC_DAVINCI_ACTUAL_NOT_RUN != MAC_DAVINCI_ACTUAL_VERIFIED',
  '...buildOpeningProductionStatusHandoff()',
  '...buildProfileProductionStatusHandoff()',
  'effectiveProduction: buildOverlay("opening")',
  'effectiveProduction: buildOverlay("profile")',
]) need(effectiveExport, token, "Effective production export");

for (const [label, source, project, movieId, builder] of [
  ["Opening UI", openingUi, "Opening", "opening", "buildOpeningEffectiveProductionHandoffJson"],
  ["Profile UI", profileUi, "Profile", "profile", "buildProfileEffectiveProductionHandoffJson"],
]) {
  for (const token of [
    builder,
    "buildPalmierWeddingProductionGate",
    `buildPalmierWeddingProductionGate(\"${movieId}\")`,
    "effectiveNextGate",
    "EffectiveProductionNextGateSummary",
    `projectLabel=\"${project}\"`,
    "gate={effectiveProject.effectiveNextGate}",
    "effective next gate",
    "effective authority",
  ]) need(source, token, label);
}

for (const token of [
  'import {Link} from "react-router-dom"',
  "MovieProductionBlockerRecoveryAction",
  'state: "BLOCKED" | "PRODUCTION_READY"',
  "blockerActions: readonly MovieProductionBlockerRecoveryAction[]",
  "actionTargets: readonly ActionTarget[]",
  "NEXT GATE",
  "ARTIFACT:",
  "blockerCodes.map",
  "BLOCKER RECOVERY",
  "blockerActions.map",
  'action.kind === "ROUTE"',
  'action.kind === "COMMAND"',
  "actionTargets.map",
  "to={target.route}",
  "CANONICAL RECOVERY",
  "recovery.map",
]) need(nextGateUi, token, "Canonical next-gate UI");

for (const token of [
  'import {Link} from "react-router-dom"',
  "PalmierEffectiveNextGate",
  "PalmierEffectiveRecoveryAction",
  "EFFECTIVE NEXT GATE",
  'gate.state !== "PRODUCTION_READY"',
  "gate.authority",
  "gate.stage",
  "gate.artifactPath",
  "gate.adoptedCandidateIds",
  "gate.blockerCodes",
  "ACTUAL NEXT ACTION",
  "gate.blockerActions",
  'action.kind === "ROUTE"',
  'action.kind === "COMMAND"',
  "EFFECTIVE RECOVERY",
  "gate.recovery",
  "Wedding canonical blockerを先に解消し",
  "表示・exportだけではHuman QA / Studio Actual / DaVinci ActualをPASSへ昇格しません",
]) need(effectiveNextGateUi, token, "Effective next-gate UI");

if (nextGateUi.includes("NOT_RUN = PASS") || nextGateUi.includes("productionReady = true")) {
  errors.push("Canonical next-gate UI must remain display-only and must not promote production state");
}
if (effectiveNextGateUi.includes("NOT_RUN = PASS") || effectiveNextGateUi.includes("productionReady = true")) {
  errors.push("Effective next-gate UI must remain display-only and must not promote production state");
}
if (effectiveExport.includes('productionReady: true') || effectiveExport.includes('studioActualVerified: true')) {
  errors.push("Effective production export must derive readiness from canonical authorities instead of hardcoding PASS");
}

if (errors.length) {
  console.error(`Production handoff next-gate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production handoff next-gate contracts OK: Opening/Profile download JSON preserves canonical production evidence and adds a fail-closed effective production overlay with the actual next blocking authority and explicit Remotion dependency state.");
