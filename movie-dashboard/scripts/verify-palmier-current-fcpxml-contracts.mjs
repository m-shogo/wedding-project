import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(root, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readRepo = (relative) => fs.readFileSync(path.join(repoRoot, relative), "utf8");

const evidence = read("src/data/palmierFCPXMLCurrentEvidence.ts");
const legacyRegistry = read("src/data/palmierDavinciHandoffFidelity.ts");
const run34 = readRepo("docs/research/2026-08-26-movie-tool-learning-run-34-palmier-current-export-terminal-nested-title-scale.md");
const runbook = readRepo("docs/runbooks/2026-08-26-palmier-real-export-attach.md");
const prompt = readRepo("docs/prompts/2026-08-26-palmier-resolve-fcpxml-export-agent-v2.md");

const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

requireText(evidence, 'latestRelease: "v0.7.6"', "Palmier current release coordinate must be v0.7.6");
requireText(evidence, 'sourceCommit: "8805801fa4df8bc2dbc57cb0a854a1f5108f95c6"', "Palmier current source commit coordinate missing");
requireText(evidence, 'supersedesCoarsePropertyIds: ["title-rotation-scale"]', "Run34 must explicitly supersede the coarse legacy title rotation/scale classification");

for (const id of [
  "export-job-terminal-lifecycle",
  "fcpxml-version-gate",
  "nested-timeline-compound",
  "title-independent-text-scale",
  "title-box-transform-scale-rotation",
  "audio-volume-keyframes-collapse-static",
  "audio-fade-omitted",
]) {
  requireText(evidence, `id: "${id}"`, `Current Palmier FCPXML evidence missing: ${id}`);
}

for (const guardrail of [
  "EXPORT_QUEUED != EXPORT_SUCCEEDED",
  "PROGRESS_100 != TERMINAL_SUCCESS",
  "JOB_ID_MUST_MATCH_TERMINAL_RESULT",
  "FCPXML_VERSION_ATTRIBUTE != HANDOFF_FIDELITY_LEVEL",
  "FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED",
  "TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE",
  "STATIC_AUDIO_VOLUME_TRANSPORT != AUDIO_AUTOMATION_TRANSPORT",
]) {
  requireText(evidence, guardrail, `Current Palmier evidence guardrail missing: ${guardrail}`);
}

if (evidence.includes('resolveRuntime: "RUNTIME_VERIFIED"')) {
  errors.push("Current Palmier source overlay must not claim Resolve runtime verification before Actual");
}

requireText(legacyRegistry, 'id: "title-rotation-scale"', "Legacy title-rotation-scale record unexpectedly disappeared; Run34 correction should be explicit rather than silently rewriting history");
requireText(run34, "textScaleExportsAsIndependentTitleTransform", "Run34 must preserve the upstream independent text-scale test evidence");
requireText(run34, "twoLevelNestingEmitsBothCompounds", "Run34 must preserve the upstream two-level nested timeline test evidence");
requireText(run34, "volumeKeyframesCollapseToStaticLevel", "Run34 must preserve the upstream audio-keyframe collapse evidence");
requireText(run34, "fadesAndChannelLayoutAreNotExported", "Run34 must preserve the upstream fade omission evidence");
requireText(run34, "RESEARCH_SATURATED = false", "Run34 saturation state must stay explicit while Resolve Actual remains pending");

for (const source of [runbook, prompt]) {
  requireText(source, "manage_exports", "Current Palmier execution instructions must use manage_exports");
  requireText(source, "jobId", "Current Palmier execution instructions must preserve exact jobId");
  requireText(source, "completed", "Current Palmier execution instructions must require terminal completed status");
  requireText(source, "--check-freshness-only", "Terminal success must still be followed by freshness checking");
  requireText(source, "--attest-real-palmier-export", "Terminal/freshness checks must not replace explicit Palmier provenance attestation");
}

const runbookTerminal = runbook.indexOf("manage_exports");
const runbookStructure = runbook.indexOf("--inspect-only");
const runbookFreshness = runbook.indexOf("--check-freshness-only");
const runbookAttest = runbook.indexOf("--attest-real-palmier-export");
if (!(runbookTerminal >= 0 && runbookTerminal < runbookStructure && runbookStructure < runbookFreshness && runbookFreshness < runbookAttest)) {
  errors.push("Palmier runbook order must be terminal job -> structure -> freshness -> attestation");
}

requireText(prompt, 'fcpxmlTarget = "resolve"', "Palmier agent prompt must explicitly request Resolve-target FCPXML");
requireText(prompt, 'timelineId = "<EXACT_CANARY_TIMELINE_ID>"', "Palmier agent prompt must require exact bounded timelineId");
requireText(prompt, "overwrite = false", "Palmier agent prompt must preserve the unique-path/overwrite=false safety option");
requireText(prompt, "Never substitute another completed job", "Palmier agent prompt must forbid matching the wrong export job");

if (errors.length) {
  console.error(`Palmier current FCPXML contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Palmier current FCPXML contracts OK: v0.7.6/current-source coordinate, exact export-job terminal verification, nested-timeline source tests, title-scale semantic split, audio static-vs-automation distinction, freshness, and provenance boundaries are explicit without claiming Resolve runtime PASS.",
);
