import {createHash} from "node:crypto";
import {copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync} from "node:fs";
import {dirname, extname, resolve} from "node:path";
import {spawnSync} from "node:child_process";

const FPS = 30;
const COMPOSITION = "WeddingProjectTypographyPreviewReelV1";

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
function exactFrame(seconds: unknown, code: string, sceneId: string) {
  const numeric = Number(seconds);
  if (!Number.isFinite(numeric) || numeric < 0) fail(code, sceneId);
  const frame = Math.round(numeric * FPS);
  if (Math.abs(frame / FPS - numeric) > 0.00001) fail("REAL_MEDIA_PREVIEW_TIMELINE_NOT_FRAME_ALIGNED", `${sceneId}:${numeric}`);
  return frame;
}
function load(path: string, missingCode: string, invalidCode: string) {
  if (!existsSync(path)) fail(missingCode, path);
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { fail(invalidCode, path); }
}
function safeName(value: string) { return value.replace(/[^a-zA-Z0-9._-]/g, "_"); }
function parseFraming(media: any, sceneId: string) {
  const raw = media?.framing ?? null;
  if (!raw) return {fit: "COVER" as const, focusX: 50, focusY: 50, scale: 1, revision: "DEFAULT_CENTER_COVER"};
  const fit = raw.fit === "CONTAIN" ? "CONTAIN" as const : raw.fit === "COVER" ? "COVER" as const : null;
  const focusX = Number(raw.focusX);
  const focusY = Number(raw.focusY);
  const scale = Number(raw.scale ?? 1);
  const revision = String(raw.revision ?? "").trim();
  if (!fit) fail("REAL_MEDIA_PREVIEW_FRAMING_FIT_INVALID", sceneId);
  if (!Number.isFinite(focusX) || focusX < 0 || focusX > 100 || !Number.isFinite(focusY) || focusY < 0 || focusY > 100) fail("REAL_MEDIA_PREVIEW_FRAMING_FOCUS_INVALID", sceneId);
  if (!Number.isFinite(scale) || scale < 1 || scale > 2) fail("REAL_MEDIA_PREVIEW_FRAMING_SCALE_INVALID", sceneId);
  if (!revision) fail("REAL_MEDIA_PREVIEW_FRAMING_REVISION_REQUIRED", sceneId);
  return {fit, focusX, focusY, scale, revision};
}
function parseTiming(scene: any, durationFrames: number) {
  const raw = scene?.timing;
  if (!raw) fail("REAL_MEDIA_PREVIEW_TIMING_BINDING_REQUIRED", scene.sceneId);
  const targetDurationSeconds = Number(raw.targetDurationSeconds);
  const computedDurationSeconds = Number(raw.computedDurationSeconds);
  const timingFrames = Number(raw.durationFrames);
  const fps = Number(raw.fps);
  if (raw.sourceRevision !== scene.sourceRevision) fail("REAL_MEDIA_PREVIEW_TIMING_SOURCE_REVISION_STALE", scene.sceneId);
  if (!Number.isFinite(targetDurationSeconds) || targetDurationSeconds <= 0) fail("REAL_MEDIA_PREVIEW_TIMING_TARGET_INVALID", scene.sceneId);
  if (!Number.isFinite(computedDurationSeconds) || computedDurationSeconds <= 0) fail("REAL_MEDIA_PREVIEW_TIMING_COMPUTED_INVALID", scene.sceneId);
  if (fps !== FPS || timingFrames !== durationFrames || exactFrame(computedDurationSeconds, "REAL_MEDIA_PREVIEW_TIMING_COMPUTED_INVALID", scene.sceneId) !== durationFrames) fail("REAL_MEDIA_PREVIEW_TIMING_FRAME_DRIFT", scene.sceneId);
  const identity = {sceneId: scene.sceneId, sourceRevision: scene.sourceRevision, targetDurationSeconds, computedDurationSeconds, durationFrames: timingFrames, fps};
  if (!raw.revision || raw.revision !== stableSha(identity)) fail("REAL_MEDIA_PREVIEW_TIMING_REVISION_STALE", scene.sceneId);
  return {...identity, revision: raw.revision};
}

const selectedArg = arg("selected-manifest");
const auditArg = arg("readiness-audit");
if (!selectedArg) fail("REAL_MEDIA_PREVIEW_SELECTED_MANIFEST_REQUIRED");
if (!auditArg) fail("REAL_MEDIA_PREVIEW_READINESS_AUDIT_REQUIRED");
const selectedPath = resolve(selectedArg);
const auditPath = resolve(auditArg);
const selected = load(selectedPath, "REAL_MEDIA_PREVIEW_SELECTED_MANIFEST_NOT_FOUND", "REAL_MEDIA_PREVIEW_SELECTED_MANIFEST_INVALID");
const audit = load(auditPath, "REAL_MEDIA_PREVIEW_READINESS_AUDIT_NOT_FOUND", "REAL_MEDIA_PREVIEW_READINESS_AUDIT_INVALID");

if (selected.schemaVersion !== "wedding-movie-selected-scene-render-manifest/v1" || selected.authority !== "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH") fail("REAL_MEDIA_PREVIEW_SELECTED_SCHEMA_MISMATCH");
if (audit.schemaVersion !== "wedding-movie-production-readiness-audit/v1" || audit.authority !== "DERIVED_FROM_CURRENT_HUMAN_MASTER_AND_REAL_MEDIA_BINDINGS") fail("REAL_MEDIA_PREVIEW_AUDIT_SCHEMA_MISMATCH");
if (selected.projectId !== audit.projectId || (selected.projectId !== "opening" && selected.projectId !== "profile")) fail("REAL_MEDIA_PREVIEW_PROJECT_MISMATCH");
const projectId = selected.projectId as "opening" | "profile";
if (selected.summary?.allSelectionsCurrent !== true || selected.summary?.productionReady !== false) fail("REAL_MEDIA_PREVIEW_SELECTED_AUTHORITY_NOT_CURRENT");
if (selected.summary?.timingBoundScenes !== selected.scenes?.length) fail("REAL_MEDIA_PREVIEW_SELECTED_TIMING_INCOMPLETE");
if (audit.summary?.readyForContinuousRealMediaPreview !== true || audit.summary?.productionReady !== false) fail("REAL_MEDIA_PREVIEW_AUDIT_NOT_READY");
if (selected.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || audit.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || audit.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || audit.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN") fail("REAL_MEDIA_PREVIEW_EVIDENCE_BOUNDARY_INVALID");

const sourceBatchPath = resolve(selected.sourceBatch?.path ?? "");
if (!sourceBatchPath || !existsSync(sourceBatchPath)) fail("REAL_MEDIA_PREVIEW_SOURCE_BATCH_NOT_FOUND", sourceBatchPath);
const batchSha256 = sha256(sourceBatchPath);
if (batchSha256 !== selected.sourceBatch?.sha256 || batchSha256 !== audit.source?.batchSha256) fail("REAL_MEDIA_PREVIEW_SOURCE_BATCH_STALE");
if (!Array.isArray(selected.scenes) || selected.scenes.length === 0 || !Array.isArray(audit.scenes)) fail("REAL_MEDIA_PREVIEW_SCENES_MISSING");
if (selected.scenes.length !== audit.scenes.length) fail("REAL_MEDIA_PREVIEW_SCENE_COUNT_MISMATCH");
if (audit.audio?.state !== "CURRENT" || !audit.audio?.path || !audit.audio?.sha256) fail("REAL_MEDIA_PREVIEW_BGM_NOT_CURRENT");
const bgmPath = resolve(audit.audio.path);
if (!existsSync(bgmPath) || sha256(bgmPath) !== audit.audio.sha256) fail("REAL_MEDIA_PREVIEW_BGM_SHA_MISMATCH", bgmPath);

let previousSourceStartFrame = -1;
const sourceScenes = selected.scenes.map((scene: any, index: number) => {
  const bound = audit.scenes.find((item: any) => item.sceneId === scene.sceneId);
  if (!bound) fail("REAL_MEDIA_PREVIEW_AUDIT_SCENE_MISSING", scene.sceneId);
  if (bound.readiness !== "READY_FOR_REAL_MEDIA_PREVIEW" || bound.media?.state !== "CURRENT") fail("REAL_MEDIA_PREVIEW_SCENE_NOT_READY", scene.sceneId);
  if (bound.sourceRevision !== scene.sourceRevision || bound.patternId !== scene.patternId || bound.productionRole !== scene.productionRole) fail("REAL_MEDIA_PREVIEW_SCENE_BINDING_STALE", scene.sceneId);
  if (!bound.media?.path || !bound.media?.sha256 || (bound.media.kind !== "IMAGE" && bound.media.kind !== "VIDEO")) fail("REAL_MEDIA_PREVIEW_MEDIA_BINDING_INVALID", scene.sceneId);
  const mediaPath = resolve(bound.media.path);
  if (!existsSync(mediaPath)) fail("REAL_MEDIA_PREVIEW_MEDIA_NOT_FOUND", mediaPath);
  const mediaSha256 = sha256(mediaPath);
  if (mediaSha256 !== bound.media.sha256) fail("REAL_MEDIA_PREVIEW_MEDIA_SHA_MISMATCH", scene.sceneId);
  const framing = parseFraming(bound.media, scene.sceneId);
  const sourceStartFrame = exactFrame(scene.timeline?.startSeconds, "REAL_MEDIA_PREVIEW_START_INVALID", scene.sceneId);
  const sourceEndFrame = exactFrame(scene.timeline?.endSeconds, "REAL_MEDIA_PREVIEW_END_INVALID", scene.sceneId);
  const durationFrames = sourceEndFrame - sourceStartFrame;
  if (!(durationFrames > 0) || durationFrames !== scene.timeline?.frames) fail("REAL_MEDIA_PREVIEW_FRAME_BOUNDARY_MISMATCH", scene.sceneId);
  const timing = parseTiming(scene, durationFrames);
  if (sourceStartFrame < previousSourceStartFrame) fail("REAL_MEDIA_PREVIEW_TIMELINE_ORDER_INVALID", scene.sceneId);
  previousSourceStartFrame = sourceStartFrame;
  return {scene, bound, mediaPath, mediaSha256, framing, timing, sourceStartFrame, sourceEndFrame, durationFrames, order: index + 1};
});

const selectedTransitions = Array.isArray(selected.transitions) ? selected.transitions : [];
const transitionByEdge = new Map(selectedTransitions.map((item: any) => [`${item.fromSceneId}->${item.toSceneId}`, item]));
const transitions = sourceScenes.slice(1).map((scene: any, index: number) => {
  const previous = sourceScenes[index];
  const edge = `${previous.scene.sceneId}->${scene.scene.sceneId}`;
  const source: any = transitionByEdge.get(edge) ?? null;
  if (source?.sourceStatus === "STALE_HUMAN_SELECTION") fail("REAL_MEDIA_PREVIEW_TRANSITION_STALE", edge);
  const transition = source?.transition === "CROSS_DISSOLVE" ? "CROSS_DISSOLVE" : "HARD_CUT";
  const durationFrames = transition === "CROSS_DISSOLVE" ? Math.round(Number(source?.durationFrames ?? 0)) : 0;
  if (transition === "CROSS_DISSOLVE" && (!(durationFrames >= 6) || durationFrames > 30 || durationFrames >= previous.durationFrames || durationFrames >= scene.durationFrames)) fail("REAL_MEDIA_PREVIEW_TRANSITION_DURATION_INVALID", edge);
  return {fromSceneId: previous.scene.sceneId, toSceneId: scene.scene.sceneId, transition, durationFrames, sourceStatus: source?.sourceStatus ?? "DEFAULT_HARD_CUT"};
});

let cursor = 0;
const timelineScenes = sourceScenes.map((entry: any, index: number) => {
  const transitionIn = index === 0 ? null : transitions[index - 1];
  const transitionOut = transitions[index] ?? null;
  const overlap = transitionIn?.transition === "CROSS_DISSOLVE" ? transitionIn.durationFrames : 0;
  const startFrame = index === 0 ? 0 : cursor - overlap;
  const endFrame = startFrame + entry.durationFrames;
  cursor = endFrame;
  return {...entry, startFrame, endFrame, transitionInFrames: transitionIn?.transition === "CROSS_DISSOLVE" ? transitionIn.durationFrames : 0, transitionOutFrames: transitionOut?.transition === "CROSS_DISSOLVE" ? transitionOut.durationFrames : 0};
});
const totalFrames = Math.max(...timelineScenes.map((scene: any) => scene.endFrame));
if (!(totalFrames > 0)) fail("REAL_MEDIA_PREVIEW_TOTAL_FRAMES_INVALID");

const identitySha256 = createHash("sha256").update(JSON.stringify({projectId, batchSha256, selectedSha256: sha256(selectedPath), auditSha256: sha256(auditPath), media: timelineScenes.map((scene: any) => [scene.scene.sceneId, scene.mediaSha256, scene.framing, scene.timing]), bgm: audit.audio.sha256})).digest("hex");
const stageRelative = `__wedding-real-preview/${projectId}-${identitySha256.slice(0, 12)}`;
const stageDir = resolve("motion-studio/public", stageRelative);
const output = resolve(arg("output") ?? `out/qa/project-real-media-preview/${projectId}/${projectId}-real-media-preview.mp4`);
const manifestPath = resolve(arg("manifest") ?? `${dirname(output)}/${projectId}-real-media-preview-manifest.json`);
const shouldRender = hasFlag("render");

let renderState = "PLANNED";
let renderSha256: string | null = null;
let renderBytes: number | null = null;
if (shouldRender) {
  rmSync(stageDir, {recursive: true, force: true});
  mkdirSync(stageDir, {recursive: true});
  const stagedScenes = timelineScenes.map((entry: any) => {
    const fileName = `${String(entry.order).padStart(2, "0")}-${safeName(entry.scene.sceneId)}${extname(entry.mediaPath).toLowerCase()}`;
    copyFileSync(entry.mediaPath, resolve(stageDir, fileName));
    return {...entry, stagedSrc: `${stageRelative}/${fileName}`};
  });
  const bgmFileName = `bgm${extname(bgmPath).toLowerCase()}`;
  copyFileSync(bgmPath, resolve(stageDir, bgmFileName));
  const props = {
    projectId,
    bgmSrc: `${stageRelative}/${bgmFileName}`,
    scenes: stagedScenes.map((entry: any) => ({
      order: entry.order,
      sceneId: entry.scene.sceneId,
      startFrame: entry.startFrame,
      durationFrames: entry.durationFrames,
      transitionInFrames: entry.transitionInFrames,
      transitionOutFrames: entry.transitionOutFrames,
      media: {kind: entry.bound.media.kind, src: entry.stagedSrc, sha256: entry.mediaSha256, label: entry.scene.props?.label ?? entry.scene.sceneId, framing: entry.framing},
      props: {...entry.scene.props, transparentBackground: true},
    })),
  };
  mkdirSync(dirname(output), {recursive: true});
  const result = spawnSync("pnpm", ["exec", "remotion", "render", "src/index-start-motion-kit.ts", COMPOSITION, output, `--props=${JSON.stringify(props)}`, `--frames=0-${totalFrames - 1}`, `--scale=${hasFlag("smoke") ? "0.2" : "0.5"}`, `--crf=${hasFlag("smoke") ? "35" : "24"}`], {cwd: resolve("motion-studio"), stdio: "inherit"});
  if (result.status !== 0 || !existsSync(output)) fail("REAL_MEDIA_PREVIEW_RENDER_FAILED", projectId);
  renderState = "RENDERED";
  renderSha256 = sha256(output);
  renderBytes = statSync(output).size;
  rmSync(stageDir, {recursive: true, force: true});
}

const manifest = {
  schemaVersion: "wedding-movie-project-real-media-preview/v1",
  authority: "DERIVED_FROM_CURRENT_SELECTED_SCENES_AND_PRODUCTION_READINESS_AUDIT",
  generatedAt: new Date().toISOString(),
  projectId,
  fps: FPS,
  composition: COMPOSITION,
  identity: {identitySha256, selectedManifestPath: selectedPath, selectedManifestSha256: sha256(selectedPath), readinessAuditPath: auditPath, readinessAuditSha256: sha256(auditPath), sourceBatchPath, sourceBatchSha256: batchSha256, bgmPath, bgmSha256: audit.audio.sha256},
  scenes: timelineScenes.map((entry: any) => ({order: entry.order, sceneId: entry.scene.sceneId, sourceRevision: entry.scene.sourceRevision, patternId: entry.scene.patternId, productionRole: entry.scene.productionRole, mediaKind: entry.bound.media.kind, mediaPath: entry.mediaPath, mediaSha256: entry.mediaSha256, framing: entry.framing, timing: entry.timing, startFrame: entry.startFrame, endFrameExclusive: entry.endFrame, durationFrames: entry.durationFrames, transitionInFrames: entry.transitionInFrames, transitionOutFrames: entry.transitionOutFrames})),
  transitions,
  timeline: {totalFrames, durationSeconds: totalFrames / FPS},
  output,
  render: {state: renderState, sha256: renderSha256, bytes: renderBytes},
  summary: {totalScenes: timelineScenes.length, allRealMediaBoundCurrent: true, framingCurrent: true, timingCurrent: true, bgmCurrent: true, frameBoundariesVerified: true, transitionsCurrent: true, productionReady: false},
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", visualQa: "NOT_RUN", productionReady: false, rule: "A CLI real-media preview render proves deterministic binding of Human-approved media/BGM plus current Human timing/framing state to current Scene authority. It does not constitute Human visual QA, Remotion Studio GUI Actual, Palmier GUI Actual, Mac DaVinci Actual, or production approval."},
};
mkdirSync(dirname(manifestPath), {recursive: true});
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({manifestPath, output, projectId, scenes: timelineScenes.length, totalFrames, renderState, renderSha256, identitySha256}, null, 2));
