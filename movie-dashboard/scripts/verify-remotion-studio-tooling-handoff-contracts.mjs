import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const helper = read("src/data/remotionStudioActualToolingEvidence.ts");
const opening = read("src/data/openingProductionStatusHandoff.ts");
const profile = read("src/data/profileProductionStatusHandoff.ts");
const palmier = read("src/lib/palmierWeddingProductionGate.ts");
const errors = [];
const need = (source, token, label) => { if (!source.includes(token)) errors.push(`${label} missing ${token}`); };

for (const token of [
  "remotionElementStudioActualBatch",
  'authority: "MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_TOOLING_REFERENCE"',
  "summaryPath: batch.evidence.summaryPath",
  "summarySchemaVersion: batch.evidence.summarySchemaVersion",
  "summaryAuthority: batch.evidence.summaryAuthority",
  "statusCommand: batch.evidence.statusCommand",
  "strictCommand: batch.evidence.strictCommand",
  "currentRepoState: batch.evidence.currentRepoState",
  "humanReviewed: batch.evidence.humanReviewed",
  "productionDependencyPromoted: batch.productionDependencyPromoted",
  '"ELEMENT_NOT_ADOPTED_BY_PROJECT => TOOLING_ACTUAL_IS_NON_BLOCKING"',
]) need(helper, token, "tooling helper");

for (const [label, source] of [["Opening", opening], ["Profile", profile]]) {
  need(source, "buildRemotionStudioActualToolingEvidence", label);
  need(source, "remotionStudioToolingEvidence: buildRemotionStudioActualToolingEvidence()", label);
  need(source, '"REMOTION_STUDIO_TOOLING_EVIDENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED"', label);
  need(source, '"REMOTION_STUDIO_TOOLING_EVIDENCE != WEDDING_PRODUCTION_GATE"', label);
  if (source.includes("remotionStudioToolingEvidence.productionDependencyPromoted") || source.includes("remotionStudioToolingEvidence.currentRepoState === \"PASS\"")) {
    errors.push(`${label} must not turn tooling evidence into a production gate`);
  }
}

for (const token of [
  "remotionStudioToolingEvidence: RemotionStudioToolingEvidence",
  "remotionStudioToolingEvidence: production.remotionStudioToolingEvidence",
  "remotion-studio-tooling-state:",
  "remotion-studio-summary:",
  "remotion-studio-summary-schema:",
  "remotion-studio-summary-authority:",
  "remotion-studio-status:",
  "remotion-studio-strict:",
  "remotion-studio-human-reviewed:",
  "remotion-studio-production-dependency-promoted:",
  "tooling evidence is non-blocking unless a project explicitly adopts an Element dependency",
  '"REMOTION_STUDIO_TOOLING_EVIDENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED"',
  '"REMOTION_STUDIO_TOOLING_EVIDENCE != WEDDING_PRODUCTION_GATE"',
]) need(palmier, token, "Palmier");

if (errors.length) {
  console.error(`Remotion Studio tooling handoff contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Remotion Studio tooling handoff contracts PASS: machine-readable Actual summary reference reaches Opening/Profile/Palmier without becoming a Wedding production blocker or fabricating GUI Actual.");
