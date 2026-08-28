import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const opening = read("src/data/openingProductionStatusHandoff.ts");
const profile = read("src/data/profileProductionStatusHandoff.ts");
const openingUi = read("src/components/OpeningProductionHandoffExportButton.tsx");
const profileUi = read("src/components/ProfileProductionHandoffExportButton.tsx");
const nextGateUi = read("src/components/ProductionNextGateSummary.tsx");
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

for (const [label, source, project, builder] of [
  ["Opening UI", openingUi, "Opening", "buildOpeningProductionStatusHandoff"],
  ["Profile UI", profileUi, "Profile", "buildProfileProductionStatusHandoff"],
]) {
  for (const token of [
    builder,
    "production.nextGate",
    "ProductionNextGateSummary",
    `projectLabel=\"${project}\"`,
    "state={nextGate.state}",
    "stage={nextGate.stage}",
    "artifactPath={nextGate.artifactPath}",
    "blockerCodes={nextGate.blockerCodes}",
    "blockerActions={nextGate.blockerActions}",
    "recovery={nextGate.recovery}",
    "actionTargets={nextGate.actionTargets}",
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
]) need(nextGateUi, token, "Next-gate UI");

if (nextGateUi.includes("NOT_RUN = PASS") || nextGateUi.includes("productionReady = true")) {
  errors.push("Next-gate UI must remain display-only and must not promote production state");
}

if (errors.length) {
  console.error(`Production handoff next-gate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production handoff next-gate contracts OK: Opening/Profile exports and handoff cards expose canonical stage/blocker evidence plus structured ROUTE/COMMAND/HUMAN recovery without promoting Human QA or Mac DaVinci Actual.");
