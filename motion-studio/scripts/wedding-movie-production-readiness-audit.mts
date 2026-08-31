import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, extname, resolve} from "node:path";

type ProjectId = "opening" | "profile";
type SceneReadiness = "READY_FOR_REAL_MEDIA_PREVIEW" | "WAITING_HUMAN_INPUT" | "BLOCKED_BY_STALE_AUTHORITY";

const PLACEHOLDER_TEXT = [/^welcome$/i, /^sample$/i, /^dummy$/i, /^placeholder$/i, /^todo$/i, /^tbd$/i, /仮/, /ダミー/, /未定/, /ここに/];
const PLACEHOLDER_MEDIA = [/hero photo/i, /^photo$/i, /^video$/i, /sample/i, /dummy/i, /placeholder/i, /仮/, /ダミー/, /未定/];
const ALLOWED_MEDIA_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".m4v"]);
const ALLOWED_AUDIO_EXTENSIONS = new Set([".wav", ".mp3", ".m4a", ".aac", ".flac"]);

function arg(name: string) {
  const prefix = `--${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}
function fail(code: string, detail?: string): never { console.error(`${code}${detail ? `: ${detail}` : ""}`); process.exit(1); }
function loadJson(path: string, missingCode: string, invalidCode: string) {
  if (!existsSync(path)) fail(missingCode, path);
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { fail(invalidCode, path); }
}
function sha256(path: string) { return createHash("sha256").update(readFileSync(path)).digest("hex"); }
function stableSha(value: unknown) { return createHash("sha256").update(JSON.stringify(value)).digest("hex"); }
function isPlaceholder(value: unknown, patterns: RegExp[]) {
  const normalized = String(value ?? "").trim();
  return normalized.length === 0 || patterns.some((pattern) => pattern.test(normalized));
}
function validateFileBinding(entry: any, allowedExtensions: Set<string>, prefix: string) {
  const path = resolve(String(entry?.path ?? ""));
  if (!path || !existsSync(path)) return {current: false, blocker: `${prefix}_FILE_NOT_FOUND`, path};
  if (!allowedExtensions.has(extname(path).toLowerCase())) return {current: false, blocker: `${prefix}_FILE_EXTENSION_UNSUPPORTED`, path};
  const actualSha256 = sha256(path);
  if (!/^[a-f0-9]{64}$/i.test(String(entry?.sha256 ?? "")) || actualSha256 !== entry.sha256) return {current: false, blocker: `${prefix}_SHA_MISMATCH`, path, actualSha256};
  if (entry?.humanApproved !== true) return {current: false, blocker: `${prefix}_HUMAN_APPROVAL_REQUIRED`, path, actualSha256};
  return {current: true, blocker: null, path, actualSha256};
}
function parseFraming(entry: any, sceneId: string, blockers: string[]) {
  const raw = entry?.framing ?? null;
  if (!raw) return {fit: "COVER", focusX: 50, focusY: 50, scale: 1, revision: "DEFAULT_CENTER_COVER"};
  const fit = raw.fit === "COVER" || raw.fit === "CONTAIN" ? raw.fit : null;
  const focusX = Number(raw.focusX);
  const focusY = Number(raw.focusY);
  const scale = Number(raw.scale ?? 1);
  const revision = String(raw.revision ?? "").trim();
  if (!fit) blockers.push("REAL_MEDIA_FRAMING_FIT_INVALID");
  if (!Number.isFinite(focusX) || focusX < 0 || focusX > 100 || !Number.isFinite(focusY) || focusY < 0 || focusY > 100) blockers.push("REAL_MEDIA_FRAMING_FOCUS_INVALID");
  if (!Number.isFinite(scale) || scale < 1 || scale > 2) blockers.push("REAL_MEDIA_FRAMING_SCALE_INVALID");
  if (!revision) blockers.push("REAL_MEDIA_FRAMING_REVISION_REQUIRED");
  if (raw.sourceRevision && raw.sourceRevision !== entry.sourceRevision) blockers.push("STALE_REAL_MEDIA_FRAMING_BINDING");
  return {fit: fit ?? "COVER", focusX: Number.isFinite(focusX) ? focusX : 50, focusY: Number.isFinite(focusY) ? focusY : 50, scale: Number.isFinite(scale) ? scale : 1, revision: revision || `INVALID_${sceneId}`};
}

const batchArg = arg("batch");
if (!batchArg) fail("MOVIE_PRODUCTION_READINESS_BATCH_REQUIRED", "pass --batch=/path/to/project-typography-production-batch.json");
const batchPath = resolve(batchArg);
const batch = loadJson(batchPath, "MOVIE_PRODUCTION_READINESS_BATCH_NOT_FOUND", "MOVIE_PRODUCTION_READINESS_BATCH_JSON_INVALID");
if (batch.schemaVersion !== "wedding-movie-typography-project-delivery/v1" || batch.authority !== "DERIVED_PROJECT_HANDOFF") fail("MOVIE_PRODUCTION_READINESS_BATCH_SCHEMA_MISMATCH");
if (batch.projectId !== "opening" && batch.projectId !== "profile") fail("MOVIE_PRODUCTION_READINESS_PROJECT_INVALID", String(batch.projectId));
const projectId = batch.projectId as ProjectId;
if (!Array.isArray(batch.scenes) || batch.scenes.length === 0) fail("MOVIE_PRODUCTION_READINESS_SCENES_MISSING");

const mediaManifestArg = arg("media-manifest");
const mediaManifestPath = mediaManifestArg ? resolve(mediaManifestArg) : null;
const mediaManifest = mediaManifestPath ? loadJson(mediaManifestPath, "MOVIE_PRODUCTION_MEDIA_MANIFEST_NOT_FOUND", "MOVIE_PRODUCTION_MEDIA_MANIFEST_JSON_INVALID") : null;
if (mediaManifest && (mediaManifest.schemaVersion !== "wedding-movie-production-media-input/v1" || mediaManifest.projectId !== projectId || !Array.isArray(mediaManifest.scenes))) fail("MOVIE_PRODUCTION_MEDIA_MANIFEST_SCHEMA_MISMATCH");
const mediaByScene = new Map<string, any>((mediaManifest?.scenes ?? []).map((entry: any) => [String(entry.sceneId), entry]));

const audioManifestArg = arg("audio-manifest");
const audioManifestPath = audioManifestArg ? resolve(audioManifestArg) : null;
const audioManifest = audioManifestPath ? loadJson(audioManifestPath, "MOVIE_PRODUCTION_AUDIO_MANIFEST_NOT_FOUND", "MOVIE_PRODUCTION_AUDIO_MANIFEST_JSON_INVALID") : null;
if (audioManifest && (audioManifest.schemaVersion !== "wedding-movie-production-audio-input/v1" || audioManifest.projectId !== projectId || audioManifest.usage !== "BGM")) fail("MOVIE_PRODUCTION_AUDIO_MANIFEST_SCHEMA_MISMATCH");

const scenes = batch.scenes.map((scene: any, index: number) => {
  const blockers: string[] = [];
  const humanInputs: string[] = [];
  const packageReady = scene.status === "CURRENT_PACKAGE_READY" && scene.package?.identity?.sourceRevision === scene.sourceRevision;
  const roleReady = scene.roleContextStatus === "CURRENT_ROLE_CONTEXT";
  if (!packageReady) blockers.push(scene.status === "STALE_HUMAN_ROUTE" ? "STALE_HUMAN_SELECTED_ROUTE" : "CURRENT_HUMAN_SELECTED_ROUTE_REQUIRED");
  if (!roleReady) blockers.push(scene.roleContextStatus === "STALE_ROLE_CONTEXT" ? "STALE_HUMAN_SELECTED_ROLE" : "CURRENT_HUMAN_SELECTED_ROLE_REQUIRED");

  const humanState = scene.package?.canonical?.humanState;
  const resolved = humanState?.resolvedEditableIntent ?? {};
  const text = String(resolved.text ?? "").trim();
  const mediaLabel = String(resolved.mediaLabel ?? "").trim();
  if (isPlaceholder(text, PLACEHOLDER_TEXT)) humanInputs.push("FINAL_COPY_REQUIRED");
  if (isPlaceholder(mediaLabel, PLACEHOLDER_MEDIA)) humanInputs.push("DESCRIPTIVE_MEDIA_LABEL_REQUIRED");
  if (Number(scene.package?.canonical?.humanState?.canonicalSceneState?.sceneDurationSeconds ?? scene.package?.canonical?.humanState?.resolvedEditableIntent?.sceneDurationSeconds ?? 0) <= 0) blockers.push("SCENE_DURATION_INVALID");

  const mediaEntry = mediaByScene.get(scene.sceneId) ?? null;
  let media: any = {state: "NOT_PROVIDED", path: null, sha256: null, kind: null, blocker: "REAL_MEDIA_REQUIRED", framing: null};
  if (!mediaEntry) {
    humanInputs.push("REAL_MEDIA_REQUIRED");
  } else if (mediaEntry.sourceRevision !== scene.sourceRevision) {
    blockers.push("STALE_REAL_MEDIA_BINDING");
    media = {state: "STALE", path: String(mediaEntry.path ?? ""), sha256: String(mediaEntry.sha256 ?? ""), kind: String(mediaEntry.kind ?? ""), blocker: "STALE_REAL_MEDIA_BINDING", framing: null};
  } else if (mediaEntry.kind !== "IMAGE" && mediaEntry.kind !== "VIDEO") {
    blockers.push("REAL_MEDIA_KIND_INVALID");
    media = {state: "INVALID", path: String(mediaEntry.path ?? ""), sha256: String(mediaEntry.sha256 ?? ""), kind: String(mediaEntry.kind ?? ""), blocker: "REAL_MEDIA_KIND_INVALID", framing: null};
  } else {
    const file = validateFileBinding(mediaEntry, ALLOWED_MEDIA_EXTENSIONS, "REAL_MEDIA");
    if (!file.current) {
      if (file.blocker === "REAL_MEDIA_HUMAN_APPROVAL_REQUIRED") humanInputs.push(file.blocker);
      else blockers.push(file.blocker!);
    }
    const framing = parseFraming(mediaEntry, scene.sceneId, blockers);
    media = {state: file.current && blockers.filter((b) => b.startsWith("REAL_MEDIA_FRAMING_") || b === "STALE_REAL_MEDIA_FRAMING_BINDING").length === 0 ? "CURRENT" : "INVALID", path: file.path, sha256: file.actualSha256 ?? String(mediaEntry.sha256 ?? ""), kind: mediaEntry.kind, blocker: file.blocker, framing};
  }

  const transitionAfter = Array.isArray(batch.timeline?.transitions) ? batch.timeline.transitions.find((transition: any) => transition.fromSceneId === scene.sceneId) ?? null : null;
  if (transitionAfter?.status === "STALE_HUMAN_SELECTION") blockers.push("STALE_HUMAN_SELECTED_TRANSITION");
  const readiness: SceneReadiness = blockers.length > 0 ? "BLOCKED_BY_STALE_AUTHORITY" : humanInputs.length > 0 ? "WAITING_HUMAN_INPUT" : "READY_FOR_REAL_MEDIA_PREVIEW";

  return {
    order: index + 1,
    sceneId: scene.sceneId,
    sourceRevision: scene.sourceRevision,
    patternId: scene.selectedPatternId ?? null,
    productionRole: scene.productionRole ?? null,
    text,
    mediaLabel,
    media,
    transitionAfter: transitionAfter ? {toSceneId: transitionAfter.toSceneId, type: transitionAfter.transition, durationFrames: transitionAfter.durationFrames ?? 0, status: transitionAfter.status} : null,
    readiness,
    blockers,
    humanInputs: [...new Set(humanInputs)],
    nextAction: readiness === "READY_FOR_REAL_MEDIA_PREVIEW" ? "INCLUDE_IN_CONTINUOUS_REMOTION_PRODUCTION_PREVIEW" : blockers.length > 0 ? "REFRESH_STALE_OR_INVALID_AUTHORITY" : "COLLECT_HUMAN_COPY_OR_REAL_MEDIA",
  };
});

let audio: any = {state: "NOT_PROVIDED", path: null, sha256: null, blocker: "BGM_AUDIO_REQUIRED"};
const projectHumanInputs: string[] = [];
const projectBlockers: string[] = [];
if (!audioManifest) projectHumanInputs.push("BGM_AUDIO_REQUIRED");
else {
  const file = validateFileBinding(audioManifest, ALLOWED_AUDIO_EXTENSIONS, "BGM_AUDIO");
  if (!file.current) {
    if (file.blocker === "BGM_AUDIO_HUMAN_APPROVAL_REQUIRED") projectHumanInputs.push(file.blocker);
    else projectBlockers.push(file.blocker!);
  }
  audio = {state: file.current ? "CURRENT" : "INVALID", path: file.path, sha256: file.actualSha256 ?? String(audioManifest.sha256 ?? ""), blocker: file.blocker};
}
if (batch.summary?.staleTransitions > 0) projectBlockers.push("STALE_PROJECT_TRANSITION_AUTHORITY");
if (batch.summary?.batchReadyForPalmierDaVinciHandoff !== true) projectBlockers.push("TYPOGRAPHY_BATCH_NOT_HANDOFF_READY");

const readyScenes = scenes.filter((scene: any) => scene.readiness === "READY_FOR_REAL_MEDIA_PREVIEW");
const waitingScenes = scenes.filter((scene: any) => scene.readiness === "WAITING_HUMAN_INPUT");
const blockedScenes = scenes.filter((scene: any) => scene.readiness === "BLOCKED_BY_STALE_AUTHORITY");
const readyForContinuousRealMediaPreview = readyScenes.length === scenes.length && audio.state === "CURRENT" && projectBlockers.length === 0;
const identity = {
  projectId,
  batchSha256: sha256(batchPath),
  mediaManifestSha256: mediaManifestPath ? sha256(mediaManifestPath) : null,
  audioManifestSha256: audioManifestPath ? sha256(audioManifestPath) : null,
  sceneBindings: scenes.map((scene: any) => ({sceneId: scene.sceneId, sourceRevision: scene.sourceRevision, patternId: scene.patternId, productionRole: scene.productionRole, mediaSha256: scene.media.sha256, framing: scene.media.framing, readiness: scene.readiness})),
  audioSha256: audio.sha256,
};

const output = resolve(arg("output") ?? `out/qa/movie-production-readiness/${projectId}/${projectId}-production-readiness-audit.json`);
const audit = {
  schemaVersion: "wedding-movie-production-readiness-audit/v1",
  authority: "DERIVED_FROM_CURRENT_HUMAN_MASTER_AND_REAL_MEDIA_BINDINGS",
  generatedAt: new Date().toISOString(),
  projectId,
  source: {batchPath, batchSha256: identity.batchSha256, mediaManifestPath, mediaManifestSha256: identity.mediaManifestSha256, audioManifestPath, audioManifestSha256: identity.audioManifestSha256, identitySha256: stableSha(identity)},
  scenes,
  audio,
  summary: {totalScenes: scenes.length, readyForRealMediaPreview: readyScenes.length, waitingHumanInput: waitingScenes.length, blockedByStaleAuthority: blockedScenes.length, projectHumanInputs: [...new Set(projectHumanInputs)], projectBlockers: [...new Set(projectBlockers)], readyForContinuousRealMediaPreview, framingBoundScenes: scenes.filter((scene: any) => scene.media?.framing).length, productionReady: false},
  nextActions: {
    renderableSceneIds: readyScenes.map((scene: any) => scene.sceneId),
    waitingSceneIds: waitingScenes.map((scene: any) => scene.sceneId),
    blockedSceneIds: blockedScenes.map((scene: any) => scene.sceneId),
    renderSelectedScenes: readyScenes.length > 0 ? `node --no-warnings motion-studio/scripts/render-selected-wedding-typography-scenes.mts --batch=\"${batchPath}\" --render` : null,
    renderContinuousPreview: readyForContinuousRealMediaPreview ? `node --no-warnings motion-studio/scripts/render-wedding-project-typography-preview-reel.mts --selected-manifest=\"$HOME/Downloads/${projectId}-selected-scene-render-manifest.json\" --render` : null,
  },
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", productionReady: false, rule: "This audit verifies current Human-selected scene authority plus explicitly Human-approved real-media/BGM file bindings and scene framing state. It does not claim visual quality, Remotion Studio GUI Actual, Palmier GUI Actual, Mac DaVinci Actual, or final production approval."},
};
mkdirSync(dirname(output), {recursive: true});
writeFileSync(output, `${JSON.stringify(audit, null, 2)}\n`);
console.log(JSON.stringify({output, projectId, ...audit.summary, renderableSceneIds: audit.nextActions.renderableSceneIds}, null, 2));
if (process.argv.includes("--strict-real-preview-ready") && !readyForContinuousRealMediaPreview) fail("MOVIE_PRODUCTION_REAL_MEDIA_PREVIEW_NOT_READY", `${readyScenes.length}/${scenes.length} scenes; audio=${audio.state}; blockers=${projectBlockers.join(",") || "none"}`);
