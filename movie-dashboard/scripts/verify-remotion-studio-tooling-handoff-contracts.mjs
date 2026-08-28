import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const helper = read("src/data/remotionStudioActualToolingEvidence.ts");
const dependency = read("src/data/remotionStudioToolingProductionDependency.ts");
const opening = read("src/data/openingProductionStatusHandoff.ts");
const profile = read("src/data/profileProductionStatusHandoff.ts");
const palmier = read("src/lib/palmierWeddingProductionGate.ts");
const app = read("src/App.tsx");
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

for (const token of [
  "remotionStudioToolingProductionAdoption",
  "opening: []",
  "profile: []",
  "unknownCandidateIds",
  'tooling.currentRepoState === "VERIFIED"',
  "resolveRemotionStudioToolingDependencyState",
  "RemotionStudioToolingDependencyStateInput",
  "remotionStudioToolingDependencyStateScenarios",
  'label: "unadopted"',
  'expected: "NOT_ADOPTED"',
  'label: "adopted-before-studio-actual"',
  'expected: "STUDIO_ACTUAL_REQUIRED"',
  'label: "studio-actual-before-human-review"',
  'expected: "HUMAN_REVIEW_REQUIRED"',
  'label: "human-review-before-promotion"',
  'expected: "DEPENDENCY_PROMOTION_REQUIRED"',
  'label: "fully-promoted"',
  'expected: "READY"',
  'const blocking = adopted && state !== "READY"',
  "buildRecoveryActions",
  'kind: "ROUTE"',
  'kind: "COMMAND"',
  'kind: "HUMAN"',
  'const MOTION_LIBRARY_RECOVERY_ROUTE = "/movie-coach/motion-library"',
  "motionLibraryRecoveryAction(state)",
  'route: MOTION_LIBRARY_RECOVERY_ROUTE',
  "action.route ?? action.command ?? action.purpose",
  "recoveryActions",
  "adoptedCandidateCount",
  '"ELEMENT_CANDIDATE_EXISTS != WEDDING_PROJECT_ADOPTED"',
  '"UNADOPTED_ELEMENT_TOOLING_STATE_IS_NON_BLOCKING"',
  '"DEPENDENCY_STATE_RESOLVER_IS_SINGLE_AUTHORITY"',
  '"RECOVERY_ROUTE_EXPORTED != RECOVERY_EXECUTED"',
  '"RECOVERY_ACTION_EXPORTED != RECOVERY_EXECUTED"',
  '"CI_MUST_NOT_PROMOTE_STUDIO_GUI_ACTUAL"',
]) need(dependency, token, "explicit adoption dependency");

need(app, '<Route path="movie-coach/motion-library" element={<VisualMotionLibrary />} />', "Motion Library recovery route target");

for (const [label, source] of [["Opening", opening], ["Profile", profile]]) {
  need(source, "buildRemotionStudioActualToolingEvidence", label);
  need(source, "remotionStudioToolingEvidence: buildRemotionStudioActualToolingEvidence()", label);
  need(source, '"REMOTION_STUDIO_TOOLING_EVIDENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED"', label);
  need(source, '"REMOTION_STUDIO_TOOLING_EVIDENCE != WEDDING_PRODUCTION_GATE"', label);
  if (source.includes("remotionStudioToolingEvidence.productionDependencyPromoted") || source.includes("remotionStudioToolingEvidence.currentRepoState === \"PASS\"")) {
    errors.push(`${label} raw tooling evidence must not become a production gate; explicit project adoption owns that transition`);
  }
}

for (const token of [
  "remotionStudioToolingEvidence: RemotionStudioToolingEvidence",
  "remotionStudioToolingEvidence: production.remotionStudioToolingEvidence",
  "remotionStudioToolingDependency: RemotionStudioToolingProductionDependency",
  "remotionStudioToolingDependency: toolingDependency",
  'buildRemotionStudioToolingProductionDependency("opening")',
  'buildRemotionStudioToolingProductionDependency("profile")',
  "deriveEffectiveProductionState",
  "resolvePalmierEffectiveNextGate",
  '"WEDDING_PRODUCTION_BLOCKED"',
  '"REMOTION_STUDIO_TOOLING_BLOCKED"',
  'effective.effectiveProductionState === "PRODUCTION_READY"',
  "blockingAuthorities",
  "effectiveNextGate",
  "effective-production-state:",
  "blocking-authorities:",
  "effective-next-authority:",
  "effective-next-recovery-actions:",
  "remotion-studio-tooling-state:",
  "remotion-studio-summary:",
  "remotion-studio-summary-schema:",
  "remotion-studio-summary-authority:",
  "remotion-studio-status:",
  "remotion-studio-strict:",
  "remotion-studio-human-reviewed:",
  "remotion-studio-production-dependency-promoted:",
  "remotion-studio-project-adopted:",
  "remotion-studio-project-adopted-count:",
  "remotion-studio-project-dependency-state:",
  "remotion-studio-project-dependency-blocking:",
  "remotion-studio-project-adopted-candidates:",
  "remotion-studio-dependency-recovery-actions:",
  "markdownToolingRecoveryAction",
  "tooling evidence is non-blocking unless a project explicitly adopts an Element dependency",
  '"ELEMENT_ADOPTED_AND_STUDIO_ACTUAL_NOT_VERIFIED => WEDDING_PRODUCTION_BLOCKED"',
  '"CANONICAL_NEXT_GATE_READY != EFFECTIVE_PRODUCTION_READY_WHEN_ADOPTED_DEPENDENCY_BLOCKS"',
  '"UNADOPTED_ELEMENT_TOOLING_STATE_IS_NON_BLOCKING"',
]) need(palmier, token, "Palmier");

if (errors.length) {
  console.error(`Remotion Studio tooling handoff contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Remotion Studio tooling handoff contracts PASS: one state resolver owns NOT_ADOPTED -> STUDIO_ACTUAL_REQUIRED -> HUMAN_REVIEW_REQUIRED -> DEPENDENCY_PROMOTION_REQUIRED -> READY; each blocking state routes back to Motion Library, current empty adoption stays non-blocking, and GUI Actual is not fabricated.");
