import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {spawnSync} from "node:child_process";

const FPS = 30;
const COMPOSITION = "WeddingProjectTypographyPreviewReelV1";

function arg(name: string) {
  const prefix = `--${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}

function hasFlag(name: string) {
  return process.argv.includes(`--${name}`);
}

function fail(code: string, detail?: string): never {
  console.error(`${code}${detail ? `: ${detail}` : ""}`);
  process.exit(1);
}

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function exactFrame(seconds: unknown, code: string, sceneId: string) {
  const numeric = Number(seconds);
  if (!Number.isFinite(numeric) || numeric < 0) fail(code, sceneId);
  const frame = Math.round(numeric * FPS);
  if (Math.abs(frame / FPS - numeric) > 0.00001) fail("PROJECT_PREVIEW_TIMELINE_NOT_FRAME_ALIGNED", `${sceneId}:${numeric}`);
  return frame;
}

const selectedArg = arg("selected-manifest");
if (!selectedArg) fail("PROJECT_PREVIEW_SELECTED_MANIFEST_REQUIRED", "pass --selected-manifest=/abs/or/repo/path.json");
const selectedManifestPath = resolve(selectedArg);
if (!existsSync(selectedManifestPath)) fail("PROJECT_PREVIEW_SELECTED_MANIFEST_NOT_FOUND", selectedManifestPath);

const selected = JSON.parse(readFileSync(selectedManifestPath, "utf8"));
if (selected.schemaVersion !== "wedding-movie-selected-scene-render-manifest/v1") fail("PROJECT_PREVIEW_SELECTED_SCHEMA_MISMATCH");
if (selected.authority !== "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH") fail("PROJECT_PREVIEW_SELECTED_AUTHORITY_MISMATCH");
if (!Array.isArray(selected.scenes) || selected.scenes.length === 0) fail("PROJECT_PREVIEW_SCENES_MISSING");
if (selected.summary?.allSelectionsCurrent !== true) fail("PROJECT_PREVIEW_SELECTIONS_NOT_CURRENT");
if (selected.summary?.productionReady !== false) fail("PROJECT_PREVIEW_EVIDENCE_BOUNDARY_INVALID");
if (selected.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || selected.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || selected.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN") {
  fail("PROJECT_PREVIEW_GUI_ACTUAL_BOUNDARY_INVALID");
}

const projectId = selected.projectId;
if (projectId !== "opening" && projectId !== "profile") fail("PROJECT_PREVIEW_PROJECT_INVALID", String(projectId));

const sourceBatchPath = resolve(selected.sourceBatch?.path ?? "");
if (!sourceBatchPath || !existsSync(sourceBatchPath)) fail("PROJECT_PREVIEW_SOURCE_BATCH_NOT_FOUND", sourceBatchPath);
const currentBatchSha = sha256(sourceBatchPath);
if (currentBatchSha !== selected.sourceBatch?.sha256) fail("PROJECT_PREVIEW_SOURCE_BATCH_STALE", sourceBatchPath);

let previousSourceStartFrame = -1;
const sourceScenes = selected.scenes.map((scene: any, index: number) => {
  if (scene.order !== index + 1) fail("PROJECT_PREVIEW_SCENE_ORDER_MISMATCH", scene.sceneId);
  if (!scene.sceneId || !scene.sourceRevision || !scene.patternId || !scene.productionRole) fail("PROJECT_PREVIEW_SCENE_IDENTITY_INVALID", String(scene.sceneId));
  if (!scene.props || typeof scene.props.text !== "string" || !scene.props.mode || !scene.props.intensity) fail("PROJECT_PREVIEW_SCENE_PROPS_INVALID", scene.sceneId);
  const sourceStartFrame = exactFrame(scene.timeline?.startSeconds, "PROJECT_PREVIEW_START_INVALID", scene.sceneId);
  const sourceEndFrame = exactFrame(scene.timeline?.endSeconds, "PROJECT_PREVIEW_END_INVALID", scene.sceneId);
  const durationFrames = sourceEndFrame - sourceStartFrame;
  if (!(durationFrames > 0)) fail("PROJECT_PREVIEW_DURATION_INVALID", scene.sceneId);
  if (durationFrames !== scene.timeline?.frames) fail("PROJECT_PREVIEW_FRAME_BOUNDARY_MISMATCH", `${scene.sceneId}:${durationFrames}!=${scene.timeline?.frames}`);
  if (sourceStartFrame < previousSourceStartFrame) fail("PROJECT_PREVIEW_TIMELINE_ORDER_INVALID", scene.sceneId);
  previousSourceStartFrame = sourceStartFrame;
  return {
    order: scene.order,
    sceneId: scene.sceneId,
    sourceRevision: scene.sourceRevision,
    patternId: scene.patternId,
    productionRole: scene.productionRole,
    selectionClass: scene.selectionClass ?? null,
    sourceStartFrame,
    sourceEndFrame,
    durationFrames,
    sourceStartSeconds: scene.timeline.startSeconds,
    sourceEndSeconds: scene.timeline.endSeconds,
    props: scene.props,
  };
});

const selectedTransitions = Array.isArray(selected.transitions) ? selected.transitions : [];
const transitionByEdge = new Map(selectedTransitions.map((item: any) => [`${item.fromSceneId}->${item.toSceneId}`, item]));
const transitions = sourceScenes.slice(1).map((scene: any, index: number) => {
  const previous = sourceScenes[index];
  const edgeKey = `${previous.sceneId}->${scene.sceneId}`;
  const source: any = transitionByEdge.get(edgeKey) ?? null;
  const transition = source?.transition === "CROSS_DISSOLVE" ? "CROSS_DISSOLVE" : "HARD_CUT";
  const durationFrames = transition === "CROSS_DISSOLVE" ? Math.round(Number(source?.durationFrames ?? 0)) : 0;
  if (source?.sourceStatus === "STALE_HUMAN_SELECTION") fail("PROJECT_PREVIEW_TRANSITION_STALE", edgeKey);
  if (transition === "CROSS_DISSOLVE") {
    if (!(durationFrames >= 6) || durationFrames > 30) fail("PROJECT_PREVIEW_TRANSITION_DURATION_INVALID", `${edgeKey}:${durationFrames}`);
    if (durationFrames >= previous.durationFrames || durationFrames >= scene.durationFrames) fail("PROJECT_PREVIEW_TRANSITION_EXCEEDS_SCENE", edgeKey);
  }
  return {
    fromSceneId: previous.sceneId,
    toSceneId: scene.sceneId,
    transition,
    durationFrames,
    sourceStatus: source?.sourceStatus ?? "DEFAULT_HARD_CUT",
    selectedAt: source?.selectedAt ?? null,
  };
});

let previewCursor = 0;
const scenes = sourceScenes.map((scene: any, index: number) => {
  const transitionIn = index === 0 ? null : transitions[index - 1];
  const transitionOut = transitions[index] ?? null;
  const overlapFrames = transitionIn?.transition === "CROSS_DISSOLVE" ? transitionIn.durationFrames : 0;
  const startFrame = index === 0 ? 0 : previewCursor - overlapFrames;
  const endFrame = startFrame + scene.durationFrames;
  previewCursor = endFrame;
  return {
    ...scene,
    startFrame,
    endFrame,
    startSeconds: startFrame / FPS,
    endSeconds: endFrame / FPS,
    transitionInFrames: transitionIn?.transition === "CROSS_DISSOLVE" ? transitionIn.durationFrames : 0,
    transitionOutFrames: transitionOut?.transition === "CROSS_DISSOLVE" ? transitionOut.durationFrames : 0,
  };
});

const totalFrames = Math.max(...scenes.map((scene: any) => scene.endFrame));
if (!(totalFrames > 0)) fail("PROJECT_PREVIEW_TOTAL_FRAMES_INVALID");
const boundaries = scenes.map((scene: any, index: number) => ({
  order: scene.order,
  sceneId: scene.sceneId,
  sourceRevision: scene.sourceRevision,
  patternId: scene.patternId,
  productionRole: scene.productionRole,
  sourceStartFrame: scene.sourceStartFrame,
  sourceEndFrameExclusive: scene.sourceEndFrame,
  startFrame: scene.startFrame,
  endFrameExclusive: scene.endFrame,
  durationFrames: scene.durationFrames,
  startSeconds: scene.startSeconds,
  endSeconds: scene.endSeconds,
  gapFromPreviousFrames: index === 0 ? scene.startFrame : scene.startFrame - scenes[index - 1].endFrame,
  transitionInFrames: scene.transitionInFrames,
  transitionOutFrames: scene.transitionOutFrames,
}));

const output = resolve(arg("output") ?? `out/qa/project-typography-preview/${projectId}/${projectId}-selected-typography-preview-reel.mp4`);
const manifestPath = resolve(arg("manifest") ?? `${dirname(output)}/${projectId}-selected-typography-preview-reel-manifest.json`);
const shouldRender = hasFlag("render");
const props = {
  projectId,
  scenes: scenes.map((scene: any) => ({
    order: scene.order,
    sceneId: scene.sceneId,
    startFrame: scene.startFrame,
    durationFrames: scene.durationFrames,
    transitionInFrames: scene.transitionInFrames,
    transitionOutFrames: scene.transitionOutFrames,
    props: scene.props,
  })),
};

let renderState = "PLANNED";
let renderSha256: string | null = null;
let renderBytes: number | null = null;
if (shouldRender) {
  mkdirSync(dirname(output), {recursive: true});
  const args = [
    "exec",
    "remotion",
    "render",
    "src/index-start-motion-kit.ts",
    COMPOSITION,
    output,
    `--props=${JSON.stringify(props)}`,
    `--frames=0-${totalFrames - 1}`,
    `--scale=${hasFlag("smoke") ? "0.2" : "0.5"}`,
    `--crf=${hasFlag("smoke") ? "35" : "24"}`,
  ];
  const result = spawnSync("pnpm", args, {cwd: resolve("motion-studio"), stdio: "inherit"});
  if (result.status !== 0 || !existsSync(output)) fail("PROJECT_PREVIEW_RENDER_FAILED", projectId);
  renderState = "RENDERED";
  renderSha256 = sha256(output);
  renderBytes = statSync(output).size;
}

const manifest = {
  schemaVersion: "wedding-movie-project-typography-preview-reel/v1",
  authority: "DERIVED_FROM_CURRENT_SELECTED_SCENE_RENDER_MANIFEST",
  generatedAt: new Date().toISOString(),
  projectId,
  fps: FPS,
  composition: COMPOSITION,
  sourceSelectedSceneManifest: {
    path: selectedManifestPath,
    sha256: sha256(selectedManifestPath),
    sourceBatchPath,
    sourceBatchSha256: currentBatchSha,
  },
  timeline: {
    totalFrames,
    durationSeconds: totalFrames / FPS,
    boundaries,
    transitions,
  },
  output,
  render: {state: renderState, sha256: renderSha256, bytes: renderBytes},
  summary: {
    totalScenes: scenes.length,
    transitionEdges: transitions.length,
    crossDissolveEdges: transitions.filter((item: any) => item.transition === "CROSS_DISSOLVE").length,
    frameBoundariesVerified: true,
    selectionsCurrent: true,
    productionReady: false,
  },
  evidenceBoundary: {
    remotionStudioGuiActual: "NOT_RUN",
    palmierGuiActual: "NOT_RUN",
    macDaVinciGuiActual: "NOT_RUN",
    rule: "Continuous CLI preview render validates selected Scene rhythm, frame boundaries, and Human-selected transition intent only. Human playback review and all GUI Actual evidence remain NOT_RUN until explicitly performed.",
  },
};

mkdirSync(dirname(manifestPath), {recursive: true});
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({manifestPath, output, projectId, scenes: scenes.length, transitions: transitions.length, totalFrames, renderState}, null, 2));