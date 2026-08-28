import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(dashboardRoot, "package.json"), "utf8"));
const workflowPath = path.join(repoRoot, ".github/workflows/movie-production-blocker-codes-ci.yml");
const workflow = fs.readFileSync(workflowPath, "utf8");

const fail = (message) => {
  console.error(`Production blocker snapshot invalidation contract failed: ${message}`);
  process.exit(1);
};

const scripts = packageJson.scripts ?? {};
if (scripts["sync:production-blocker-codes"] !== "node scripts/sync-production-stage-blocker-codes.mjs --write") {
  fail("sync:production-blocker-codes must regenerate the canonical Dashboard snapshot");
}
if (scripts["check:production-blocker-codes"] !== "node scripts/sync-production-stage-blocker-codes.mjs") {
  fail("check:production-blocker-codes must verify without mutating tracked evidence");
}
if (!String(scripts.dev ?? "").startsWith("pnpm sync:production-blocker-codes && ")) {
  fail("Dashboard dev must refresh blocker codes from current local production inputs before Vite starts");
}
if (!String(scripts.build ?? "").startsWith("pnpm check:production-blocker-codes && ")) {
  fail("Dashboard build must fail closed when the committed blocker snapshot is stale");
}

const requiredWorkflowPaths = [
  '"motion-studio/scripts/**"',
  '"motion-studio/src/**"',
  '"motion-studio/public/opening/**"',
  '"motion-studio/public/profile/**"',
  '"motion-studio/public/photos/**"',
  '"motion-studio/public/audio/**"',
  '"motion-studio/package.json"',
  '"movie-dashboard/package.json"',
  '"movie-dashboard/scripts/sync-production-stage-blocker-codes.mjs"',
  '"movie-dashboard/scripts/verify-production-blocker-snapshot-invalidation.mjs"',
  '"movie-dashboard/src/data/movieProductionStageBlockerCodes.generated.ts"',
];
for (const expected of requiredWorkflowPaths) {
  const occurrences = workflow.split(expected).length - 1;
  if (occurrences < 2) fail(`workflow must watch ${expected} on pull_request and main push`);
}
if (!workflow.includes("Verify blocker snapshot invalidation wiring")) {
  fail("workflow must execute this invalidation contract verifier");
}

console.log("Production blocker snapshot invalidation contract PASS: local dev refreshes current real-media/BGM state, build/CI fail closed, and Motion Studio production surfaces trigger revalidation.");
