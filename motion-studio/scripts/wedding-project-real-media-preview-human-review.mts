import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";

const SCENE_AXES = ["CROP_SUBJECT_SAFE", "TITLE_READABLE", "TEXT_MEDIA_CONTRAST", "NO_UNINTENDED_EDGE_CLIP", "VISUAL_TEMPO_FEELS_INTENTIONAL"] as const;
const TRANSITION_AXES = ["TRANSITION_VISUALLY_CLEAN", "NO_FLASH_OR_UNINTENDED_BLACK_FRAME", "SUBJECT_CONTINUITY_ACCEPTABLE"] as const;
type Verdict = "NOT_RUN" | "PASS" | "FAIL";

function arg(name: string) {
  const prefix = `--${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}
function hasFlag(name: string) { return process.argv.includes(`--${name}`); }
function fail(code: string, detail?: string): never {
  console.error(`${code}${detail ? `: ${detail}` : ""}`);
  process.exit(1);
}
function sha256(path: string) { return createHash("sha256").update(readFileSync(path)).digest("hex"); }
function stableSha(value: unknown) { return createHash("sha256").update(JSON.stringify(value)).digest("hex"); }
function load(path: string, missing: string, invalid: string) {
  if (!existsSync(path)) fail(missing, path);
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { fail(invalid, path); }
}
function ensureSourceCurrent(stillsPath: string, stills: any) {
  if (stills.schemaVersion !== "wedding-movie-real-media-preview-qa-stills/v1" || stills.authority !== "DERIVED_VISUAL_QA_ARTIFACTS_FROM_CURRENT_REAL_MEDIA_PREVIEW") fail("REAL_MEDIA_VISUAL_REVIEW_STILLS_SCHEMA_MISMATCH");
  if (stills.projectId !== "opening" && stills.projectId !== "profile") fail("REAL_MEDIA_VISUAL_REVIEW_PROJECT_INVALID", String(stills.projectId));
  if (stills.summary?.sourceCurrentVerified !== true || stills.summary?.humanVisualQa !== "NOT_RUN" || stills.summary?.productionReady !== false) fail("REAL_MEDIA_VISUAL_REVIEW_STILLS_BOUNDARY_INVALID");
  if (stills.evidenceBoundary?.visualQa !== "NOT_RUN" || stills.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || stills.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || stills.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN") fail("REAL_MEDIA_VISUAL_REVIEW_GUI_BOUNDARY_INVALID");
  const previewPath = resolve(stills.source?.previewPath ?? "");
  if (!previewPath || !existsSync(previewPath) || !stills.source?.previewSha256 || sha256(previewPath) !== stills.source.previewSha256) fail("REAL_MEDIA_VISUAL_REVIEW_PREVIEW_SHA_MISMATCH", previewPath);
  const samples = [...(stills.stills ?? []), ...(stills.transitionStills ?? [])];
  if (samples.length === 0) fail("REAL_MEDIA_VISUAL_REVIEW_STILLS_MISSING");
  for (const sample of samples) {
    const path = resolve(sample.path ?? "");
    if (!path || !existsSync(path)) fail("REAL_MEDIA_VISUAL_REVIEW_STILL_NOT_FOUND", path);
    if (!sample.sha256 || sha256(path) !== sample.sha256) fail("REAL_MEDIA_VISUAL_REVIEW_STILL_SHA_MISMATCH", path);
  }
  return {projectId: stills.projectId as "opening" | "profile", previewPath, samples, stillsSha256: sha256(stillsPath)};
}

const stillsArg = arg("stills-manifest");
if (!stillsArg) fail("REAL_MEDIA_VISUAL_REVIEW_STILLS_MANIFEST_REQUIRED");
const stillsPath = resolve(stillsArg);
const stills = load(stillsPath, "REAL_MEDIA_VISUAL_REVIEW_STILLS_MANIFEST_NOT_FOUND", "REAL_MEDIA_VISUAL_REVIEW_STILLS_MANIFEST_INVALID");
const source = ensureSourceCurrent(stillsPath, stills);
const evidencePath = resolve(arg("evidence") ?? `out/qa/project-real-media-preview/${source.projectId}/${source.projectId}-human-visual-review.json`);
const outputPath = resolve(arg("output") ?? `out/qa/project-real-media-preview/${source.projectId}/${source.projectId}-human-visual-review-result.json`);
const queuePath = resolve(arg("correction-queue") ?? `out/qa/project-real-media-preview/${source.projectId}/${source.projectId}-human-visual-correction-queue.json`);

function buildTemplate() {
  const sceneIds = [...new Set((stills.stills ?? []).map((sample: any) => String(sample.sceneId)))];
  return {
    schemaVersion: "wedding-movie-real-media-preview-human-visual-review/v1",
    authority: "HUMAN_REVIEW_ONLY",
    projectId: source.projectId,
    source: {stillsManifestPath: stillsPath, stillsManifestSha256: source.stillsSha256, previewPath: source.previewPath, previewSha256: stills.source.previewSha256, previewIdentitySha256: stills.source.identitySha256 ?? null},
    scenes: sceneIds.map((sceneId) => ({sceneId, axes: Object.fromEntries(SCENE_AXES.map((axis) => [axis, "NOT_RUN"])), notes: ""})),
    transitions: (stills.transitionStills ?? []).map((sample: any) => ({fromSceneId: sample.fromSceneId, toSceneId: sample.toSceneId, axes: Object.fromEntries(TRANSITION_AXES.map((axis) => [axis, "NOT_RUN"])), notes: ""})),
    review: {overall: "NOT_RUN", reviewer: null, reviewedAt: null, notes: ""},
    evidenceBoundary: {humanVisualQa: "NOT_RUN", remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", productionReady: false},
  };
}

if (hasFlag("init")) {
  const template = buildTemplate();
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(template, null, 2)}\n`);
  console.log(JSON.stringify({state: "NOT_RUN", evidencePath, projectId: source.projectId, scenes: template.scenes.length, transitions: template.transitions.length}, null, 2));
  process.exit(0);
}

if (!existsSync(evidencePath)) fail("REAL_MEDIA_VISUAL_REVIEW_EVIDENCE_NOT_FOUND", `${evidencePath}; run with --init first`);
const evidence = load(evidencePath, "REAL_MEDIA_VISUAL_REVIEW_EVIDENCE_NOT_FOUND", "REAL_MEDIA_VISUAL_REVIEW_EVIDENCE_INVALID");
if (evidence.schemaVersion !== "wedding-movie-real-media-preview-human-visual-review/v1" || evidence.authority !== "HUMAN_REVIEW_ONLY" || evidence.projectId !== source.projectId) fail("REAL_MEDIA_VISUAL_REVIEW_EVIDENCE_SCHEMA_MISMATCH");
if (evidence.source?.stillsManifestSha256 !== source.stillsSha256 || evidence.source?.previewSha256 !== stills.source.previewSha256 || evidence.source?.previewIdentitySha256 !== (stills.source.identitySha256 ?? null)) fail("REAL_MEDIA_VISUAL_REVIEW_EVIDENCE_STALE");
if (evidence.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || evidence.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || evidence.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN" || evidence.evidenceBoundary?.productionReady !== false) fail("REAL_MEDIA_VISUAL_REVIEW_EVIDENCE_BOUNDARY_INVALID");

const template = buildTemplate();
if (!Array.isArray(evidence.scenes) || evidence.scenes.length !== template.scenes.length) fail("REAL_MEDIA_VISUAL_REVIEW_SCENE_COUNT_MISMATCH");
if (!Array.isArray(evidence.transitions) || evidence.transitions.length !== template.transitions.length) fail("REAL_MEDIA_VISUAL_REVIEW_TRANSITION_COUNT_MISMATCH");
const corrections: any[] = [];
let hasNotRun = false;
let hasFail = false;
for (const expected of template.scenes) {
  const actual = evidence.scenes.find((scene: any) => scene.sceneId === expected.sceneId);
  if (!actual) fail("REAL_MEDIA_VISUAL_REVIEW_SCENE_MISSING", expected.sceneId);
  for (const axis of SCENE_AXES) {
    const verdict = actual.axes?.[axis] as Verdict;
    if (verdict !== "PASS" && verdict !== "FAIL" && verdict !== "NOT_RUN") fail("REAL_MEDIA_VISUAL_REVIEW_VERDICT_INVALID", `${expected.sceneId}:${axis}`);
    if (verdict === "NOT_RUN") hasNotRun = true;
    if (verdict === "FAIL") { hasFail = true; corrections.push({kind: "SCENE_AXIS", sceneId: expected.sceneId, axis, notes: String(actual.notes ?? "")}); }
  }
}
for (const expected of template.transitions) {
  const actual = evidence.transitions.find((edge: any) => edge.fromSceneId === expected.fromSceneId && edge.toSceneId === expected.toSceneId);
  if (!actual) fail("REAL_MEDIA_VISUAL_REVIEW_TRANSITION_MISSING", `${expected.fromSceneId}->${expected.toSceneId}`);
  for (const axis of TRANSITION_AXES) {
    const verdict = actual.axes?.[axis] as Verdict;
    if (verdict !== "PASS" && verdict !== "FAIL" && verdict !== "NOT_RUN") fail("REAL_MEDIA_VISUAL_REVIEW_VERDICT_INVALID", `${expected.fromSceneId}->${expected.toSceneId}:${axis}`);
    if (verdict === "NOT_RUN") hasNotRun = true;
    if (verdict === "FAIL") { hasFail = true; corrections.push({kind: "TRANSITION_AXIS", fromSceneId: expected.fromSceneId, toSceneId: expected.toSceneId, axis, notes: String(actual.notes ?? "")}); }
  }
}
if (hasNotRun) fail("REAL_MEDIA_VISUAL_REVIEW_INCOMPLETE", "all applicable Human axes must be PASS or FAIL");
const reviewer = String(evidence.review?.reviewer ?? "").trim();
const reviewedAt = String(evidence.review?.reviewedAt ?? "").trim();
if (!reviewer) fail("REAL_MEDIA_VISUAL_REVIEW_REVIEWER_REQUIRED");
if (!reviewedAt || Number.isNaN(Date.parse(reviewedAt))) fail("REAL_MEDIA_VISUAL_REVIEW_REVIEWED_AT_INVALID");
const computedOverall: "PASS" | "FAIL" = hasFail ? "FAIL" : "PASS";
if (evidence.review?.overall !== computedOverall) fail("REAL_MEDIA_VISUAL_REVIEW_OVERALL_MISMATCH", `${evidence.review?.overall}!=${computedOverall}`);

const binding = {projectId: source.projectId, stillsManifestSha256: source.stillsSha256, previewSha256: stills.source.previewSha256, previewIdentitySha256: stills.source.identitySha256 ?? null, reviewer, reviewedAt, sceneVerdicts: evidence.scenes.map((scene: any) => ({sceneId: scene.sceneId, axes: scene.axes})), transitionVerdicts: evidence.transitions.map((edge: any) => ({fromSceneId: edge.fromSceneId, toSceneId: edge.toSceneId, axes: edge.axes}))};
const result = {
  schemaVersion: "wedding-movie-real-media-preview-human-visual-review-result/v1",
  authority: "FINALIZED_HUMAN_VISUAL_REVIEW",
  generatedAt: new Date().toISOString(),
  projectId: source.projectId,
  source: {...evidence.source, evidencePath, evidenceSha256: sha256(evidencePath)},
  review: {overall: computedOverall, reviewer, reviewedAt, notes: String(evidence.review?.notes ?? ""), reviewBindingSha256: stableSha(binding)},
  summary: {sceneCount: evidence.scenes.length, transitionCount: evidence.transitions.length, corrections: corrections.length, humanVisualQa: computedOverall, productionReady: false},
  evidenceBoundary: {humanVisualQa: computedOverall, remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", productionReady: false, rule: "Human still-based visual review may PASS/FAIL crop/readability/transition aesthetics only. It does not constitute Remotion Studio, Palmier, or Mac DaVinci GUI Actual evidence and never sets productionReady."},
};
const queue = {
  schemaVersion: "wedding-movie-real-media-preview-visual-correction-queue/v1",
  authority: "DERIVED_FROM_FINALIZED_HUMAN_VISUAL_REVIEW_FAILURES_ONLY",
  generatedAt: new Date().toISOString(),
  projectId: source.projectId,
  sourceReviewBindingSha256: result.review.reviewBindingSha256,
  corrections,
  summary: {correctionCount: corrections.length, state: corrections.length === 0 ? "EMPTY" : "ACTION_REQUIRED", productionReady: false},
  evidenceBoundary: {humanVisualQa: computedOverall, remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", productionReady: false},
};
mkdirSync(dirname(outputPath), {recursive: true});
mkdirSync(dirname(queuePath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`);
console.log(JSON.stringify({outputPath, queuePath, projectId: source.projectId, overall: computedOverall, corrections: corrections.length, reviewBindingSha256: result.review.reviewBindingSha256}, null, 2));
if (hasFlag("strict-pass") && computedOverall !== "PASS") fail("REAL_MEDIA_VISUAL_REVIEW_HUMAN_FAIL", `${corrections.length} corrections`);
