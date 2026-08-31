import {readFileSync} from "node:fs";

const focus = readFileSync("movie-dashboard/src/data/motionZukanSceneFocus.ts", "utf8");
const operator = readFileSync("movie-dashboard/src/components/WeddingRealMediaVisualReviewOperatorCard.tsx", "utf8");
const framing = readFileSync("movie-dashboard/src/components/WeddingRealMediaFramingOperatorCard.tsx", "utf8");
const backend = readFileSync("motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts", "utf8");
const refresh = readFileSync("motion-studio/scripts/refresh-wedding-project-real-media-visual-qa.mts", "utf8");
const openingCrop = readFileSync("movie-dashboard/src/components/OpeningCropReviewOperatorCard.tsx", "utf8");
const profileMedia = readFileSync("movie-dashboard/src/components/ProfileRealMediaReviewOperatorCard.tsx", "utf8");
const timing = readFileSync("movie-dashboard/src/components/RhythmSceneTimingCorrectionCard.tsx", "utf8");
const transition = readFileSync("movie-dashboard/src/components/RhythmSceneTransitionCorrectionCard.tsx", "utf8");

function requireText(source, text, label) { if (!source.includes(text)) throw new Error(`${label}: missing ${text}`); }

for (const token of ["REAL_MEDIA_VISUAL_CORRECTION_QUEUE", "CROP_SUBJECT_SAFE", "TITLE_READABLE", "TEXT_MEDIA_CONTRAST", "NO_UNINTENDED_EDGE_CLIP"]) requireText(focus, token, "shared Scene focus contract");
for (const token of [
  "wedding-movie-real-media-visual-correction-queue/v1",
  "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_REAL_MEDIA_VISUAL_FAIL_VERDICTS",
  "requestMotionZukanSceneFocus({",
  'requestedBy:"REAL_MEDIA_VISUAL_CORRECTION_QUEUE"',
  "loadMotionZukanComposerState()",
  "failure.fromSourceRevision",
  "failure.toSourceRevision",
  "failure.sourceRevision",
  "data-real-media-visual-correction-focus",
  "data-real-media-visual-correction-currentness",
  "MOTION_ZUKAN_COMPOSER_CHANGED_EVENT",
  "PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT",
  "resolveProjectSceneTransitions",
  'edge.transition !== "CROSS_DISSOLVE"',
  'queueCurrentness?.status!=="CURRENT"',
]) requireText(operator, token, "visual correction operator");
for (const token of [
  "MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT",
  'request.requestedBy !== "REAL_MEDIA_VISUAL_CORRECTION_QUEUE"',
  'request.axis !== "CROP_SUBJECT_SAFE"',
  "currentSceneRevisions.get(request.sceneId)",
  "request.sourceRevision",
  "data-framing-correction-focus",
  "data-correction-focused",
  "data-real-media-framing-scene",
  "scrollIntoView",
  "canonical fresh visual QA refresh",
]) requireText(framing, token, "real-media framing correction target");
for (const token of ["fromSourceRevision", "toSourceRevision", "REAL_PREVIEW_VISUAL_REVIEW_TRANSITION_SCENE_MISSING", "refresh-wedding-project-real-media-visual-qa.mts", "render-wedding-project-real-media-preview.mts"]) requireText(backend, token, "visual correction queue revision/refresh binding");
for (const token of ["render-wedding-project-real-media-preview.mts", "wedding-project-real-media-preview-qa-stills.mts", "wedding-project-real-media-preview-visual-review.mts", "humanVisualReviewPerformed:false", "humanVisualReview:\"NOT_RUN\""]) requireText(refresh, token, "canonical visual QA refresh chain");
if (backend.includes("motion-studio/scripts/wedding-project-real-media-preview.mts")) throw new Error("non-canonical missing rerender script must never be emitted");
requireText(openingCrop, "data-opening-crop-review-operator", "Opening crop target");
requireText(profileMedia, "data-profile-real-media-review-operator", "Profile media target");
requireText(timing, "data-rhythm-scene-timing-correction", "timing target");
requireText(transition, "data-rhythm-transition-correction", "transition target");
if (!operator.includes("旧preview / stills / Human review / correction queueはSTALE")) throw new Error("STALE UX must explicitly invalidate old visual artifacts");
if (!operator.includes("rerenderRealPreview") || !operator.includes("extractFreshQaStills") || !operator.includes("initFreshVisualReview")) throw new Error("fresh correction cycle commands missing");
if (!operator.includes('disabled={queueCurrentness.status!=="CURRENT"||stale}')) throw new Error("STALE queue navigation must be disabled");
for (const forbidden of ['remotionStudioGuiActual: "PASS"','palmierGuiActual: "PASS"','macDaVinciGuiActual: "PASS"','productionReady: true','humanVisualReviewPerformed: true']) {
  if (operator.includes(forbidden) || framing.includes(forbidden) || focus.includes(forbidden) || backend.includes(forbidden) || refresh.includes(forbidden)) throw new Error(`visual correction navigation must not promote evidence: ${forbidden}`);
}
console.log("real-media crop FAIL -> revision-bound framing operator -> canonical refresh contracts: PASS");
