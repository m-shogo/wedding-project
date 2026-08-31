import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";

const AXES = ["PATTERN_SWITCH", "DURATION", "PACING", "TRANSITION"] as const;
type Axis = (typeof AXES)[number];
type Verdict = "NOT_RUN" | "PASS" | "FAIL";

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

function stableFingerprint(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function loadJson(path: string) {
  if (!existsSync(path)) fail("RHYTHM_REVIEW_FILE_NOT_FOUND", path);
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    fail("RHYTHM_REVIEW_JSON_INVALID", path);
  }
}

function validateReel(reel: any, reelPath: string) {
  if (reel.schemaVersion !== "wedding-movie-project-typography-preview-reel/v1") fail("RHYTHM_REVIEW_REEL_SCHEMA_MISMATCH");
  if (reel.authority !== "DERIVED_FROM_CURRENT_SELECTED_SCENE_RENDER_MANIFEST") fail("RHYTHM_REVIEW_REEL_AUTHORITY_MISMATCH");
  if (reel.projectId !== "opening" && reel.projectId !== "profile") fail("RHYTHM_REVIEW_PROJECT_INVALID", String(reel.projectId));
  if (reel.summary?.frameBoundariesVerified !== true || reel.summary?.selectionsCurrent !== true || reel.summary?.productionReady !== false) fail("RHYTHM_REVIEW_REEL_NOT_CURRENT");
  if (reel.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || reel.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || reel.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN") fail("RHYTHM_REVIEW_GUI_ACTUAL_BOUNDARY_INVALID");
  if (!Array.isArray(reel.timeline?.boundaries) || reel.timeline.boundaries.length === 0) fail("RHYTHM_REVIEW_BOUNDARIES_MISSING");
  const sourcePath = resolve(reel.sourceSelectedSceneManifest?.path ?? "");
  if (!sourcePath || !existsSync(sourcePath)) fail("RHYTHM_REVIEW_SELECTED_MANIFEST_NOT_FOUND", sourcePath);
  const currentSourceSha = sha256(sourcePath);
  if (currentSourceSha !== reel.sourceSelectedSceneManifest?.sha256) fail("RHYTHM_REVIEW_SELECTED_MANIFEST_STALE", sourcePath);
  return {
    projectId: reel.projectId as "opening" | "profile",
    reelSha256: sha256(reelPath),
    selectedManifestPath: sourcePath,
    selectedManifestSha256: currentSourceSha,
  };
}

const reelArg = arg("reel-manifest");
if (!reelArg) fail("RHYTHM_REVIEW_REEL_MANIFEST_REQUIRED", "pass --reel-manifest=/path/to/reel-manifest.json");
const reelPath = resolve(reelArg);
const reel = loadJson(reelPath);
const identity = validateReel(reel, reelPath);
const outputArg = arg("output");

const reviewIdentity = {
  projectId: identity.projectId,
  fps: reel.fps,
  reelManifestSha256: identity.reelSha256,
  selectedSceneManifestSha256: identity.selectedManifestSha256,
  boundaries: reel.timeline.boundaries.map((boundary: any) => ({
    order: boundary.order,
    sceneId: boundary.sceneId,
    sourceRevision: boundary.sourceRevision,
    patternId: boundary.patternId,
    productionRole: boundary.productionRole,
    startFrame: boundary.startFrame,
    endFrameExclusive: boundary.endFrameExclusive,
    durationFrames: boundary.durationFrames,
    gapFromPreviousFrames: boundary.gapFromPreviousFrames,
  })),
};
const fingerprint = stableFingerprint(reviewIdentity);

if (hasFlag("init")) {
  const output = resolve(outputArg ?? `out/qa/project-rhythm-review/${identity.projectId}/${identity.projectId}-project-rhythm-human-review.json`);
  const review = {
    schemaVersion: "wedding-movie-project-rhythm-human-review/v1",
    authority: "HUMAN_REVIEW_OF_CURRENT_PROJECT_TYPOGRAPHY_PREVIEW_REEL",
    projectId: identity.projectId,
    generatedAt: new Date().toISOString(),
    source: {
      reelManifestPath: reelPath,
      reelManifestSha256: identity.reelSha256,
      selectedSceneManifestPath: identity.selectedManifestPath,
      selectedSceneManifestSha256: identity.selectedManifestSha256,
      reviewIdentityFingerprint: fingerprint,
    },
    instructions: "Play the continuous reel. Review each scene boundary in context. Change only verdict/notes fields after actual human playback review. NOT_RUN is not FAIL.",
    scenes: reviewIdentity.boundaries.map((boundary: any) => ({
      ...boundary,
      axes: Object.fromEntries(AXES.map((axis) => [axis, {verdict: "NOT_RUN" as Verdict, notes: ""}])),
    })),
    finalVerdict: "NOT_RUN" as Verdict,
    finalNotes: "",
    evidenceBoundary: {
      humanPlaybackPerformed: false,
      remotionStudioGuiActual: "NOT_RUN",
      palmierGuiActual: "NOT_RUN",
      macDaVinciGuiActual: "NOT_RUN",
      productionReady: false,
    },
  };
  mkdirSync(dirname(output), {recursive: true});
  writeFileSync(output, `${JSON.stringify(review, null, 2)}\n`);
  console.log(JSON.stringify({mode: "init", output, projectId: identity.projectId, scenes: review.scenes.length, fingerprint}, null, 2));
  process.exit(0);
}

const reviewArg = arg("review");
if (!reviewArg) fail("RHYTHM_REVIEW_HUMAN_REVIEW_REQUIRED", "pass --review=/path/to/human-review.json");
const reviewPath = resolve(reviewArg);
const review = loadJson(reviewPath);
if (review.schemaVersion !== "wedding-movie-project-rhythm-human-review/v1" || review.authority !== "HUMAN_REVIEW_OF_CURRENT_PROJECT_TYPOGRAPHY_PREVIEW_REEL") fail("RHYTHM_REVIEW_HUMAN_SCHEMA_MISMATCH");
if (review.projectId !== identity.projectId) fail("RHYTHM_REVIEW_HUMAN_PROJECT_MISMATCH");
if (review.source?.reelManifestSha256 !== identity.reelSha256 || review.source?.selectedSceneManifestSha256 !== identity.selectedManifestSha256 || review.source?.reviewIdentityFingerprint !== fingerprint) fail("RHYTHM_REVIEW_HUMAN_SOURCE_STALE");
if (!Array.isArray(review.scenes) || review.scenes.length !== reviewIdentity.boundaries.length) fail("RHYTHM_REVIEW_HUMAN_SCENE_COUNT_MISMATCH");
if (review.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" || review.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" || review.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN" || review.evidenceBoundary?.productionReady !== false) fail("RHYTHM_REVIEW_HUMAN_BOUNDARY_INVALID");

const failures: Array<any> = [];
let notRunCount = 0;
review.scenes.forEach((scene: any, index: number) => {
  const expected = reviewIdentity.boundaries[index];
  for (const field of ["order", "sceneId", "sourceRevision", "patternId", "productionRole", "startFrame", "endFrameExclusive", "durationFrames", "gapFromPreviousFrames"] as const) {
    if (scene[field] !== expected[field]) fail("RHYTHM_REVIEW_HUMAN_SCENE_IDENTITY_MISMATCH", `${expected.sceneId}:${field}`);
  }
  for (const axis of AXES) {
    const verdict = scene.axes?.[axis]?.verdict as Verdict | undefined;
    if (verdict !== "NOT_RUN" && verdict !== "PASS" && verdict !== "FAIL") fail("RHYTHM_REVIEW_VERDICT_INVALID", `${scene.sceneId}:${axis}`);
    if (verdict === "NOT_RUN") notRunCount += 1;
    if (verdict === "FAIL") failures.push({
      sceneId: scene.sceneId,
      sourceRevision: scene.sourceRevision,
      patternId: scene.patternId,
      productionRole: scene.productionRole,
      axis,
      notes: String(scene.axes?.[axis]?.notes ?? ""),
      startFrame: scene.startFrame,
      endFrameExclusive: scene.endFrameExclusive,
      durationFrames: scene.durationFrames,
      startSeconds: scene.startFrame / reel.fps,
      endSeconds: scene.endFrameExclusive / reel.fps,
      returnTo: axis === "DURATION" || axis === "PACING" ? "SCENE_TIMING_AND_A_B_COMPARE" : "SCENE_BOUND_A_B_COMPARE",
    });
  }
});

if (review.evidenceBoundary?.humanPlaybackPerformed !== true && (failures.length > 0 || review.finalVerdict === "PASS" || review.finalVerdict === "FAIL")) fail("RHYTHM_REVIEW_PLAYBACK_NOT_CONFIRMED");
if (review.finalVerdict !== "NOT_RUN" && review.finalVerdict !== "PASS" && review.finalVerdict !== "FAIL") fail("RHYTHM_REVIEW_FINAL_VERDICT_INVALID");
if (review.finalVerdict === "PASS" && (failures.length > 0 || notRunCount > 0)) fail("RHYTHM_REVIEW_PASS_WITH_INCOMPLETE_OR_FAILED_AXES");

const correctionOutput = resolve(outputArg ?? `out/qa/project-rhythm-review/${identity.projectId}/${identity.projectId}-project-rhythm-correction-queue.json`);
const rerenderSelectedCommand = `node --no-warnings motion-studio/scripts/render-selected-wedding-typography-scenes.mts --batch=\"$HOME/Downloads/${identity.projectId}-typography-production-batch.json\" --render`;
const rerenderReelCommand = `node --no-warnings motion-studio/scripts/render-wedding-project-typography-preview-reel.mts --selected-manifest=\"$HOME/Downloads/${identity.projectId}-selected-scene-render-manifest.json\" --render`;
const reinitCommand = `node --no-warnings motion-studio/scripts/project-rhythm-review.mts --reel-manifest=\"$HOME/Downloads/${identity.projectId}-selected-typography-preview-reel-manifest.json\" --init`;
const queue = {
  schemaVersion: "wedding-movie-project-rhythm-correction-queue/v1",
  authority: "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_RHYTHM_FAIL_VERDICTS",
  generatedAt: new Date().toISOString(),
  projectId: identity.projectId,
  source: {
    reelManifestPath: reelPath,
    reelManifestSha256: identity.reelSha256,
    humanReviewPath: reviewPath,
    humanReviewSha256: sha256(reviewPath),
    reviewIdentityFingerprint: fingerprint,
  },
  failures,
  summary: {
    totalScenes: reviewIdentity.boundaries.length,
    failedAxes: failures.length,
    notRunAxes: notRunCount,
    finalVerdict: review.finalVerdict as Verdict,
    correctionRequired: failures.length > 0,
    reviewComplete: notRunCount === 0 && review.finalVerdict !== "NOT_RUN",
    productionReady: false,
  },
  nextActions: failures.length > 0 ? {
    returnFailedScenesToCompare: true,
    renderSelectedScenes: rerenderSelectedCommand,
    renderContinuousReel: rerenderReelCommand,
    initFreshHumanReview: reinitCommand,
  } : null,
  evidenceBoundary: {
    humanPlaybackPerformed: review.evidenceBoundary?.humanPlaybackPerformed === true,
    remotionStudioGuiActual: "NOT_RUN",
    palmierGuiActual: "NOT_RUN",
    macDaVinciGuiActual: "NOT_RUN",
    productionReady: false,
    rule: "Only explicit Human FAIL verdicts enter this queue. NOT_RUN is never converted to FAIL or PASS. Correction/rerender commands do not imply Human approval or GUI Actual evidence.",
  },
};
mkdirSync(dirname(correctionOutput), {recursive: true});
writeFileSync(correctionOutput, `${JSON.stringify(queue, null, 2)}\n`);
console.log(JSON.stringify({mode: "finalize", output: correctionOutput, projectId: identity.projectId, failures: failures.length, notRunCount, finalVerdict: review.finalVerdict}, null, 2));
