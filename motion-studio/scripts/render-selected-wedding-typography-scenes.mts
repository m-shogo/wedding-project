import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {spawnSync} from "node:child_process";

const FPS = 30;
const COMPOSITION = "WeddingSceneTypographyCandidateV1";

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

function safeToken(value: unknown) {
  return String(value ?? "scene")
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "scene";
}

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function stableSha(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

const batchArg = arg("batch");
if (!batchArg) fail("SELECTED_SCENE_RENDER_BATCH_REQUIRED", "pass --batch=/abs/or/repo/path.json");
const batchPath = resolve(batchArg);
if (!existsSync(batchPath)) fail("SELECTED_SCENE_RENDER_BATCH_NOT_FOUND", batchPath);

const batch = JSON.parse(readFileSync(batchPath, "utf8"));
if (batch.schemaVersion !== "wedding-movie-typography-project-delivery/v1") fail("SELECTED_SCENE_RENDER_BATCH_SCHEMA_MISMATCH");
if (batch.authority !== "DERIVED_PROJECT_HANDOFF") fail("SELECTED_SCENE_RENDER_BATCH_AUTHORITY_MISMATCH");
if (!Array.isArray(batch.scenes) || !Array.isArray(batch.timeline?.placements)) fail("SELECTED_SCENE_RENDER_BATCH_STRUCTURE_INVALID");
if (batch.summary?.batchReadyForPalmierDaVinciHandoff !== true) fail("SELECTED_SCENE_RENDER_BATCH_NOT_READY");

const projectId = batch.projectId;
if (projectId !== "opening" && projectId !== "profile") fail("SELECTED_SCENE_RENDER_PROJECT_INVALID", String(projectId));

const placementByScene = new Map(batch.timeline.placements.map((item: any) => [item.sceneId, item]));
const outputRoot = resolve(arg("output-dir") ?? `out/qa/selected-scene-remotion/${projectId}`);
const manifestPath = resolve(arg("manifest") ?? `${outputRoot}/selected-scene-render-manifest.json`);
const shouldRender = hasFlag("render");
const smoke = hasFlag("smoke");

const scenes = batch.scenes.map((item: any, index: number) => {
  if (item.status !== "CURRENT_PACKAGE_READY") fail("SELECTED_SCENE_RENDER_ROUTE_NOT_CURRENT", item.sceneId);
  if (item.roleContextStatus !== "CURRENT_ROLE_CONTEXT") fail("SELECTED_SCENE_RENDER_ROLE_NOT_CURRENT", item.sceneId);
  if (!item.selectedPatternId || item.selectedRevision !== item.sourceRevision) fail("SELECTED_SCENE_RENDER_REVISION_MISMATCH", item.sceneId);
  if (!item.productionRole) fail("SELECTED_SCENE_RENDER_ROLE_MISSING", item.sceneId);
  if (!item.package || item.package.identity?.sourceRevision !== item.sourceRevision || item.package.identity?.patternId !== item.selectedPatternId) {
    fail("SELECTED_SCENE_RENDER_PACKAGE_STALE", item.sceneId);
  }
  const placement: any = placementByScene.get(item.sceneId);
  if (!placement || !(placement.durationSeconds > 0)) fail("SELECTED_SCENE_RENDER_TIMELINE_MISSING", item.sceneId);
  const resolved = item.package.canonical?.humanState?.resolvedEditableIntent;
  const text = resolved?.text;
  const intensity = resolved?.intensity;
  const mode = item.package.canonical?.mode;
  if (typeof text !== "string" || !intensity || !mode) fail("SELECTED_SCENE_RENDER_PROPS_MISSING", item.sceneId);
  const frames = Math.max(1, Math.round(Number(placement.durationSeconds) * FPS));
  const targetDurationSeconds = Number(resolved?.sceneDurationSeconds ?? placement.durationSeconds);
  if (!Number.isFinite(targetDurationSeconds) || targetDurationSeconds <= 0) fail("SELECTED_SCENE_RENDER_HUMAN_TIMING_INVALID", item.sceneId);
  const timingIdentity = {
    sceneId: item.sceneId,
    sourceRevision: item.sourceRevision,
    targetDurationSeconds: Number(targetDurationSeconds.toFixed(3)),
    computedDurationSeconds: Number(Number(placement.durationSeconds).toFixed(3)),
    durationFrames: frames,
    fps: FPS,
  };
  const timing = {...timingIdentity, revision: stableSha(timingIdentity)};
  const patternToken = safeToken(item.selectedPatternId);
  const roleToken = safeToken(item.productionRole);
  const sceneToken = safeToken(item.sceneId);
  const output = resolve(outputRoot, `${String(index + 1).padStart(2, "0")}-${sceneToken}-${roleToken}-${patternToken}.mp4`);
  const props = {
    text,
    intensity,
    mode,
    label: `${String(projectId).toUpperCase()} / ${item.productionRole} / ${item.selectedPatternId}`,
  };
  return {
    order: index + 1,
    sceneId: item.sceneId,
    sourceRevision: item.sourceRevision,
    patternId: item.selectedPatternId,
    productionRole: item.productionRole,
    selectionClass: item.selectionClass ?? null,
    timing,
    timeline: {
      startSeconds: placement.startSeconds,
      endSeconds: placement.endSeconds,
      durationSeconds: placement.durationSeconds,
      frames,
      fps: FPS,
    },
    composition: COMPOSITION,
    props,
    output,
    render: {
      state: "PLANNED",
      sha256: null as string | null,
      bytes: null as number | null,
    },
  };
});

if (scenes.length !== batch.timeline.sceneIds.length) fail("SELECTED_SCENE_RENDER_SCENE_COUNT_MISMATCH");
for (const [index, sceneId] of batch.timeline.sceneIds.entries()) {
  if (scenes[index]?.sceneId !== sceneId) fail("SELECTED_SCENE_RENDER_ORDER_MISMATCH", String(sceneId));
}

const sourceTransitions = Array.isArray(batch.timeline.transitions) ? batch.timeline.transitions : [];
const transitions = batch.timeline.sceneIds.slice(1).map((toSceneId: string, index: number) => {
  const fromSceneId = batch.timeline.sceneIds[index];
  const source = sourceTransitions.find((item: any) => item.fromSceneId === fromSceneId && item.toSceneId === toSceneId) ?? null;
  if (source?.status === "STALE_HUMAN_SELECTION") fail("SELECTED_SCENE_RENDER_TRANSITION_STALE", `${fromSceneId}->${toSceneId}`);
  const transition = source?.transition === "CROSS_DISSOLVE" ? "CROSS_DISSOLVE" : "HARD_CUT";
  const durationFrames = transition === "CROSS_DISSOLVE" ? Math.round(Number(source?.durationFrames ?? 0)) : 0;
  if (transition === "CROSS_DISSOLVE" && (!(durationFrames >= 6) || durationFrames > 30)) {
    fail("SELECTED_SCENE_RENDER_TRANSITION_DURATION_INVALID", `${fromSceneId}->${toSceneId}:${durationFrames}`);
  }
  return {
    fromSceneId,
    toSceneId,
    transition,
    durationFrames,
    sourceStatus: source?.status ?? "DEFAULT_HARD_CUT",
    selectedAt: source?.selectedAt ?? null,
  };
});

if (shouldRender) {
  mkdirSync(outputRoot, {recursive: true});
  for (const scene of scenes) {
    mkdirSync(dirname(scene.output), {recursive: true});
    const maxFrame = smoke ? Math.min(scene.timeline.frames - 1, 11) : scene.timeline.frames - 1;
    const args = [
      "exec",
      "remotion",
      "render",
      "src/index-start-motion-kit.ts",
      COMPOSITION,
      scene.output,
      `--props=${JSON.stringify(scene.props)}`,
      `--frames=0-${maxFrame}`,
      `--scale=${smoke ? "0.2" : "0.5"}`,
      `--crf=${smoke ? "35" : "24"}`,
    ];
    const result = spawnSync("pnpm", args, {cwd: resolve("motion-studio"), stdio: "inherit"});
    if (result.status !== 0 || !existsSync(scene.output)) fail("SELECTED_SCENE_RENDER_FAILED", scene.sceneId);
    scene.render.state = "RENDERED";
    scene.render.sha256 = sha256(scene.output);
    scene.render.bytes = statSync(scene.output).size;
  }
}

const manifest = {
  schemaVersion: "wedding-movie-selected-scene-render-manifest/v1",
  authority: "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH",
  generatedAt: new Date().toISOString(),
  projectId,
  sourceBatch: {
    path: batchPath,
    sha256: sha256(batchPath),
    schemaVersion: batch.schemaVersion,
  },
  composition: COMPOSITION,
  scenes,
  transitions,
  summary: {
    totalScenes: scenes.length,
    renderedScenes: scenes.filter((scene: any) => scene.render.state === "RENDERED").length,
    timingBoundScenes: scenes.filter((scene: any) => Boolean(scene.timing?.revision)).length,
    transitionEdges: transitions.length,
    crossDissolveEdges: transitions.filter((item: any) => item.transition === "CROSS_DISSOLVE").length,
    allSelectionsCurrent: true,
    productionReady: false,
  },
  evidenceBoundary: {
    remotionStudioGuiActual: "NOT_RUN",
    palmierGuiActual: "NOT_RUN",
    macDaVinciGuiActual: "NOT_RUN",
    rule: "CLI selected-scene renders, Human-selected timing/transition bindings, and SHA-bound manifest are visual-reference artifacts only. They do not promote Remotion Studio GUI Actual, Palmier GUI Actual, Mac DaVinci GUI Actual, Human approval, or productionReady.",
  },
};

mkdirSync(dirname(manifestPath), {recursive: true});
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({manifestPath, projectId, scenes: scenes.length, timingBoundScenes: manifest.summary.timingBoundScenes, transitions: transitions.length, rendered: manifest.summary.renderedScenes}, null, 2));