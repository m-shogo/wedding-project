import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {spawnSync} from "node:child_process";

function arg(name: string) {
  const prefix = `--${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}
function fail(code: string, detail?: string): never {
  console.error(`${code}${detail ? `: ${detail}` : ""}`);
  process.exit(1);
}
function sha256(path: string) { return createHash("sha256").update(readFileSync(path)).digest("hex"); }
function safe(value: string) { return value.replace(/[^a-zA-Z0-9._-]/g, "_"); }
function frameToSeconds(frame: number, fps: number) { return frame / fps; }
function extractStill(input: string, output: string, seconds: number) {
  mkdirSync(dirname(output), {recursive: true});
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-ss", seconds.toFixed(6), "-i", input, "-frames:v", "1", "-y", output], {stdio: "inherit"});
  if (result.status !== 0 || !existsSync(output) || statSync(output).size <= 0) fail("REAL_MEDIA_PREVIEW_QA_STILL_EXTRACTION_FAILED", `${seconds}:${output}`);
}
function probeDimensions(path: string) {
  const result = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "json", path], {encoding: "utf8"});
  if (result.status !== 0) fail("REAL_MEDIA_PREVIEW_QA_STILL_PROBE_FAILED", path);
  try {
    const parsed = JSON.parse(result.stdout ?? "{}");
    const stream = parsed.streams?.[0];
    const width = Number(stream?.width ?? 0);
    const height = Number(stream?.height ?? 0);
    if (!(width > 0) || !(height > 0)) fail("REAL_MEDIA_PREVIEW_QA_STILL_DIMENSIONS_INVALID", path);
    return {width, height};
  } catch {
    fail("REAL_MEDIA_PREVIEW_QA_STILL_PROBE_JSON_INVALID", path);
  }
}

const previewManifestArg = arg("preview-manifest");
if (!previewManifestArg) fail("REAL_MEDIA_PREVIEW_QA_MANIFEST_REQUIRED", "pass --preview-manifest=/path/to/real-media-preview-manifest.json");
const previewManifestPath = resolve(previewManifestArg);
if (!existsSync(previewManifestPath)) fail("REAL_MEDIA_PREVIEW_QA_MANIFEST_NOT_FOUND", previewManifestPath);
let preview: any;
try { preview = JSON.parse(readFileSync(previewManifestPath, "utf8")); } catch { fail("REAL_MEDIA_PREVIEW_QA_MANIFEST_JSON_INVALID"); }
if (preview.schemaVersion !== "wedding-movie-project-real-media-preview/v1" || preview.authority !== "DERIVED_FROM_CURRENT_SELECTED_SCENES_AND_PRODUCTION_READINESS_AUDIT") fail("REAL_MEDIA_PREVIEW_QA_SCHEMA_MISMATCH");
if (preview.projectId !== "opening" && preview.projectId !== "profile") fail("REAL_MEDIA_PREVIEW_QA_PROJECT_INVALID", String(preview.projectId));
if (preview.render?.state !== "RENDERED" || !preview.render?.sha256) fail("REAL_MEDIA_PREVIEW_QA_RENDER_REQUIRED");
if (preview.summary?.allRealMediaBoundCurrent !== true || preview.summary?.bgmCurrent !== true || preview.summary?.transitionsCurrent !== true || preview.summary?.productionReady !== false) fail("REAL_MEDIA_PREVIEW_QA_SOURCE_NOT_CURRENT");
if (preview.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || preview.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || preview.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN" || preview.evidenceBoundary?.visualQa !== "NOT_RUN") fail("REAL_MEDIA_PREVIEW_QA_EVIDENCE_BOUNDARY_INVALID");
if (!Array.isArray(preview.scenes) || preview.scenes.length === 0) fail("REAL_MEDIA_PREVIEW_QA_SCENES_MISSING");
const fps = Number(preview.fps ?? 30);
if (!(fps > 0)) fail("REAL_MEDIA_PREVIEW_QA_FPS_INVALID");
const previewPath = resolve(preview.output ?? "");
if (!previewPath || !existsSync(previewPath)) fail("REAL_MEDIA_PREVIEW_QA_VIDEO_NOT_FOUND", previewPath);
const previewSha256 = sha256(previewPath);
if (previewSha256 !== preview.render.sha256) fail("REAL_MEDIA_PREVIEW_QA_VIDEO_SHA_MISMATCH", previewPath);

const selectedManifestPath = resolve(preview.identity?.selectedManifestPath ?? "");
const readinessAuditPath = resolve(preview.identity?.readinessAuditPath ?? "");
const sourceBatchPath = resolve(preview.identity?.sourceBatchPath ?? "");
for (const [label, path, expected] of [
  ["SELECTED_MANIFEST", selectedManifestPath, preview.identity?.selectedManifestSha256],
  ["READINESS_AUDIT", readinessAuditPath, preview.identity?.readinessAuditSha256],
  ["SOURCE_BATCH", sourceBatchPath, preview.identity?.sourceBatchSha256],
] as const) {
  if (!path || !existsSync(path)) fail(`REAL_MEDIA_PREVIEW_QA_${label}_NOT_FOUND`, path);
  if (!expected || sha256(path) !== expected) fail(`REAL_MEDIA_PREVIEW_QA_${label}_SHA_MISMATCH`, path);
}
for (const scene of preview.scenes) {
  const mediaPath = resolve(scene.mediaPath ?? "");
  if (!mediaPath || !existsSync(mediaPath)) fail("REAL_MEDIA_PREVIEW_QA_MEDIA_NOT_FOUND", String(scene.sceneId));
  if (!scene.mediaSha256 || sha256(mediaPath) !== scene.mediaSha256) fail("REAL_MEDIA_PREVIEW_QA_MEDIA_SHA_MISMATCH", String(scene.sceneId));
}
const bgmPath = resolve(preview.identity?.bgmPath ?? "");
if (!bgmPath || !existsSync(bgmPath) || !preview.identity?.bgmSha256 || sha256(bgmPath) !== preview.identity.bgmSha256) fail("REAL_MEDIA_PREVIEW_QA_BGM_SHA_MISMATCH");

const outputDir = resolve(arg("output-dir") ?? `out/qa/project-real-media-preview/${preview.projectId}/stills`);
const manifestPath = resolve(arg("manifest") ?? `${outputDir}/${preview.projectId}-real-media-preview-qa-stills-manifest.json`);
const stills: any[] = [];
for (const scene of preview.scenes) {
  const start = Number(scene.startFrame);
  const endExclusive = Number(scene.endFrameExclusive);
  const duration = Number(scene.durationFrames);
  if (!(start >= 0) || !(endExclusive > start) || duration !== endExclusive - start) fail("REAL_MEDIA_PREVIEW_QA_SCENE_FRAMES_INVALID", String(scene.sceneId));
  const sampleFrames = [
    {kind: "SCENE_START_SAFE", frame: Math.min(endExclusive - 1, start + Math.min(2, Math.max(0, duration - 1)))},
    {kind: "SCENE_MID", frame: start + Math.floor((duration - 1) / 2)},
    {kind: "SCENE_END_SAFE", frame: Math.max(start, endExclusive - 3)},
  ];
  for (const sample of sampleFrames) {
    const fileName = `${String(scene.order).padStart(2, "0")}-${safe(scene.sceneId)}-${sample.kind.toLowerCase()}-f${sample.frame}.png`;
    const path = resolve(outputDir, fileName);
    extractStill(previewPath, path, frameToSeconds(sample.frame, fps));
    const dimensions = probeDimensions(path);
    stills.push({kind: sample.kind, sceneId: scene.sceneId, sourceRevision: scene.sourceRevision, patternId: scene.patternId, productionRole: scene.productionRole, mediaSha256: scene.mediaSha256, frame: sample.frame, seconds: frameToSeconds(sample.frame, fps), path, sha256: sha256(path), bytes: statSync(path).size, ...dimensions});
  }
}

const transitionStills: any[] = [];
for (const transition of preview.transitions ?? []) {
  if (transition.transition !== "CROSS_DISSOLVE") continue;
  const toScene = preview.scenes.find((scene: any) => scene.sceneId === transition.toSceneId);
  if (!toScene) fail("REAL_MEDIA_PREVIEW_QA_TRANSITION_SCENE_MISSING", `${transition.fromSceneId}->${transition.toSceneId}`);
  const durationFrames = Number(transition.durationFrames ?? 0);
  if (!(durationFrames > 0)) fail("REAL_MEDIA_PREVIEW_QA_TRANSITION_DURATION_INVALID", `${transition.fromSceneId}->${transition.toSceneId}`);
  const frame = Number(toScene.startFrame) + Math.floor(durationFrames / 2);
  const fileName = `transition-${safe(transition.fromSceneId)}-to-${safe(transition.toSceneId)}-mid-f${frame}.png`;
  const path = resolve(outputDir, fileName);
  extractStill(previewPath, path, frameToSeconds(frame, fps));
  const dimensions = probeDimensions(path);
  transitionStills.push({kind: "CROSS_DISSOLVE_MID", fromSceneId: transition.fromSceneId, toSceneId: transition.toSceneId, durationFrames, frame, seconds: frameToSeconds(frame, fps), path, sha256: sha256(path), bytes: statSync(path).size, ...dimensions});
}

const manifest = {
  schemaVersion: "wedding-movie-real-media-preview-qa-stills/v1",
  authority: "DERIVED_VISUAL_QA_ARTIFACTS_FROM_CURRENT_REAL_MEDIA_PREVIEW",
  generatedAt: new Date().toISOString(),
  projectId: preview.projectId,
  source: {previewManifestPath, previewManifestSha256: sha256(previewManifestPath), previewPath, previewSha256, identitySha256: preview.identity?.identitySha256 ?? null, sourceBatchSha256: preview.identity?.sourceBatchSha256 ?? null, selectedManifestSha256: preview.identity?.selectedManifestSha256 ?? null, readinessAuditSha256: preview.identity?.readinessAuditSha256 ?? null},
  fps,
  stills,
  transitionStills,
  summary: {sceneCount: preview.scenes.length, stillCount: stills.length, transitionStillCount: transitionStills.length, sourceCurrentVerified: true, humanVisualQa: "NOT_RUN", productionReady: false},
  humanReviewChecklist: {
    sceneChecks: ["CROP_SUBJECT_SAFE", "TITLE_READABLE", "TEXT_MEDIA_CONTRAST", "NO_UNINTENDED_EDGE_CLIP", "VISUAL_TEMPO_FEELS_INTENTIONAL"],
    transitionChecks: ["TRANSITION_VISUALLY_CLEAN", "NO_FLASH_OR_UNINTENDED_BLACK_FRAME", "SUBJECT_CONTINUITY_ACCEPTABLE"],
    verdict: "NOT_RUN",
    reviewer: null,
    reviewedAt: null,
    notes: null,
  },
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", visualQa: "NOT_RUN", productionReady: false, rule: "Extracted stills are mechanical visual-review artifacts only. They do not auto-evaluate crop, readability, pacing, transition aesthetics, or any GUI Actual evidence."},
};
mkdirSync(dirname(manifestPath), {recursive: true});
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({manifestPath, projectId: preview.projectId, sceneCount: preview.scenes.length, stillCount: stills.length, transitionStillCount: transitionStills.length, previewSha256}, null, 2));
