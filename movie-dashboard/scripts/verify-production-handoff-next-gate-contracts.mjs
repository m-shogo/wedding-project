import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const opening = read("src/data/openingProductionStatusHandoff.ts");
const profile = read("src/data/profileProductionStatusHandoff.ts");
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
    "recovery: [...current.recovery]",
    'state: "PRODUCTION_READY" as const',
    `nextGate: buildNextGate(${project}CriticalPath)`,
    `criticalPath: criticalPath.projects.${project}`,
    '"NEXT_GATE_EXPORTED != NEXT_GATE_COMPLETED"',
    '"STABLE_BLOCKER_CODE != RAW_BLOCKER_DETAIL"',
  ]) need(source, token, label);

  if (source.includes("macDaVinciActual: 'PASS'") || source.includes('productionReady: true')) {
    errors.push(`${label} handoff must not fabricate Mac Actual or production readiness`);
  }
}

need(opening, "const openingCriticalPath = criticalPath.projects.opening", "Opening");
need(profile, "const profileCriticalPath = criticalPath.projects.profile", "Profile");

if (errors.length) {
  console.error(`Production handoff next-gate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production handoff next-gate contracts OK: Opening/Profile exports expose the canonical current stage, stable blocker codes, artifact path and recovery without promoting Human QA or Mac DaVinci Actual.");
