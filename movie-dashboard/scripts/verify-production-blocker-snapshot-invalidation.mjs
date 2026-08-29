import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(dashboardRoot, "package.json"), "utf8"));
const workflowPath = path.join(repoRoot, ".github/workflows/movie-production-blocker-codes-ci.yml");
const workflow = fs.readFileSync(workflowPath, "utf8");

const fail = (message) => {
  console.error(`Production state invalidation contract failed: ${message}`);
  process.exit(1);
};

const scripts = packageJson.scripts ?? {};
const expectedScripts = {
  "sync:opening-gate": "node scripts/sync-opening-production-gate.mjs --write",
  "check:opening-gate": "node scripts/sync-opening-production-gate.mjs --check",
  "sync:profile-gate": "node scripts/sync-profile-production-gate.mjs --write",
  "check:profile-gate": "node scripts/sync-profile-production-gate.mjs",
  "sync:production-blocker-codes": "node scripts/sync-production-stage-blocker-codes.mjs --write",
  "check:production-blocker-codes": "node scripts/sync-production-stage-blocker-codes.mjs",
  "sync:production-state": "pnpm sync:opening-gate && pnpm sync:profile-gate && pnpm sync:production-blocker-codes",
  "check:production-state": "pnpm check:opening-gate && pnpm check:profile-gate && pnpm check:production-blocker-codes",
};
for (const [name, expected] of Object.entries(expectedScripts)) {
  if (scripts[name] !== expected) fail(`${name} must equal ${expected}`);
}
if (!String(scripts.dev ?? "").startsWith("pnpm sync:production-state && ")) {
  fail("Dashboard dev must refresh Opening/Profile gates and blocker codes together before Vite starts");
}
if (!String(scripts.build ?? "").startsWith("pnpm check:production-state && ")) {
  fail("Dashboard build must fail closed when any committed production-state snapshot is stale");
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
  '"movie-dashboard/scripts/sync-opening-production-gate.mjs"',
  '"movie-dashboard/scripts/sync-profile-production-gate.mjs"',
  '"movie-dashboard/scripts/sync-production-stage-blocker-codes.mjs"',
  '"movie-dashboard/scripts/verify-production-blocker-snapshot-invalidation.mjs"',
  '"movie-dashboard/src/data/openingProductionGate.generated.ts"',
  '"movie-dashboard/src/data/profileProductionGate.generated.ts"',
  '"movie-dashboard/src/data/movieProductionStageBlockerCodes.generated.ts"',
];
for (const expected of requiredWorkflowPaths) {
  const occurrences = workflow.split(expected).length - 1;
  if (occurrences < 2) fail(`workflow must watch ${expected} on pull_request and main push`);
}
if (!workflow.includes("Verify production state invalidation wiring")) {
  fail("workflow must execute this production-state invalidation contract verifier");
}
if (!workflow.includes("Verify Dashboard production state snapshots")) {
  fail("workflow must verify Opening/Profile gates and blocker-code snapshots as one state unit");
}

console.log("Production state invalidation contract PASS: local dev refreshes Opening/Profile gates + blocker codes together; build/CI fail closed; production inputs trigger whole-state revalidation.");
