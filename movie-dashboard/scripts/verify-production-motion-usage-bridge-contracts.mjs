import { readFile } from "node:fs/promises";

const files = {
  usage: new URL("../src/data/weddingProductionMotionUsage.ts", import.meta.url),
  assignments: new URL("../src/data/weddingProjectMotionAssignments.ts", import.meta.url),
  panel: new URL("../src/components/WeddingProductionMotionUsagePanel.tsx", import.meta.url),
  page: new URL("../src/pages/MotionZukanWorkspaceHandoff.tsx", import.meta.url),
  library: new URL("../src/data/visualMotionLibrary.ts", import.meta.url),
};

const [usage, assignments, panel, page, library] = await Promise.all(Object.values(files).map((file) => readFile(file, "utf8")));
const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${JSON.stringify(needle)}`);
};
const forbidText = (source, needle, label) => {
  if (source.includes(needle)) failures.push(`${label}: forbidden ${JSON.stringify(needle)}`);
};

requireText(library, 'export type UsageStage = "NEVER" | "ROUGH" | "FINAL"', "usage authority");
requireText(usage, 'if (pattern.usageStage === "NEVER") return null', "NEVER must stay out of production usage");
requireText(usage, 'projectAssignmentAuthority: "NOT_RECORDED_IN_USAGE_STAGE"', "usageStage project boundary");
requireText(assignments, 'assignedBy: "HUMAN_MASTER"', "project assignment authority");
requireText(assignments, 'schemaVersion: "wedding-project-motion-assignments/v1"', "assignment schema");
requireText(assignments, "setWeddingProjectMotionAssignment", "explicit assignment mutation");
requireText(panel, "project assignmentは適合度から推測せず", "fit must not become assignment");
requireText(panel, "HUMAN ASSIGNED", "human assignment UI");
requireText(panel, "fit metadataだけでは割り当てない", "fit boundary UI");
requireText(panel, "Remotion Studio GUI Actual・Mac DaVinci GUI Actualを昇格させない", "GUI Actual boundary");
requireText(page, "<WeddingProductionMotionUsagePanel />", "workspace mount");
forbidText(usage, 'usageScope: "OPENING"', "must not invent Opening assignment from usageStage");
forbidText(usage, 'usageScope: "PROFILE"', "must not invent Profile assignment from usageStage");
forbidText(assignments, 'assignedBy: "AUTO"', "automatic project assignment forbidden");

const roughUsageCount = [...library.matchAll(/usageStage:\s*"ROUGH"/g)].length;
const finalUsageCount = [...library.matchAll(/usageStage:\s*"FINAL"/g)].length;
const neverUsageCount = [...library.matchAll(/usageStage:\s*"NEVER"/g)].length;
if (roughUsageCount + finalUsageCount < 1) failures.push("usage authority: expected at least one ROUGH or FINAL record");
if (neverUsageCount < 1) failures.push("usage authority: expected NEVER records so browse catalog stays broader than production usage");

if (failures.length) {
  console.error("Wedding Production Motion Usage Bridge contracts FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Wedding Production Motion Usage Bridge contracts PASS");
console.log(`usageStage evidence in source: ROUGH=${roughUsageCount} FINAL=${finalUsageCount} NEVER=${neverUsageCount}`);
console.log("Project assignment authority is explicit HUMAN_MASTER workspace state; fit metadata remains advisory only.");
