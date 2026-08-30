import { readFile } from "node:fs/promises";

const files = {
  usage: new URL("../src/data/weddingProductionMotionUsage.ts", import.meta.url),
  panel: new URL("../src/components/WeddingProductionMotionUsagePanel.tsx", import.meta.url),
  page: new URL("../src/pages/MotionZukanWorkspaceHandoff.tsx", import.meta.url),
  library: new URL("../src/data/visualMotionLibrary.ts", import.meta.url),
};

const [usage, panel, page, library] = await Promise.all(Object.values(files).map((file) => readFile(file, "utf8")));
const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${JSON.stringify(needle)}`);
};
const forbidText = (source, needle, label) => {
  if (source.includes(needle)) failures.push(`${label}: forbidden ${JSON.stringify(needle)}`);
};

requireText(library, 'export type UsageStage = "NEVER" | "ROUGH" | "FINAL"', "usage authority");
requireText(usage, 'if (pattern.usageStage === "NEVER") return null', "NEVER must stay out of production usage");
requireText(usage, 'usageScope: "PROJECT_UNASSIGNED"', "project assignment honesty");
requireText(usage, 'projectAssignmentAuthority: "NOT_RECORDED_IN_USAGE_STAGE"', "project assignment authority");
requireText(usage, 'rough: used.filter((record) => record.usageStage === "ROUGH")', "ROUGH derivation");
requireText(usage, 'final: used.filter((record) => record.usageStage === "FINAL")', "FINAL derivation");
requireText(panel, "PROJECT ASSIGNMENT UNRECORDED", "UI project assignment boundary");
requireText(panel, "Remotion Studio GUI Actual / Mac DaVinci GUI Actualもここから昇格しない", "GUI Actual boundary");
requireText(page, "<WeddingProductionMotionUsagePanel />", "workspace mount");
forbidText(usage, 'usageScope: "OPENING"', "must not invent Opening assignment");
forbidText(usage, 'usageScope: "PROFILE"', "must not invent Profile assignment");

const roughUsageCount = [...library.matchAll(/usageStage:\s*"ROUGH"/g)].length;
const finalUsageCount = [...library.matchAll(/usageStage:\s*"FINAL"/g)].length;
const neverUsageCount = [...library.matchAll(/usageStage:\s*"NEVER"/g)].length;
if (roughUsageCount + finalUsageCount < 1) {
  failures.push("usage authority: expected at least one ROUGH or FINAL record in current library");
}
if (neverUsageCount < 1) {
  failures.push("usage authority: expected NEVER records to prove browse catalog is broader than production usage");
}

if (failures.length) {
  console.error("Wedding Production Motion Usage Bridge contracts FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Wedding Production Motion Usage Bridge contracts PASS");
console.log(`usageStage evidence in source: ROUGH=${roughUsageCount} FINAL=${finalUsageCount} NEVER=${neverUsageCount}`);
console.log("Project assignment remains explicitly unrecorded; fit is not promoted into usage authority.");
