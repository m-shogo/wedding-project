import {readFileSync} from "node:fs";

const focus = readFileSync("movie-dashboard/src/data/motionZukanSceneFocus.ts", "utf8");
const operator = readFileSync("movie-dashboard/src/components/WeddingRealMediaVisualReviewOperatorCard.tsx", "utf8");
const backend = readFileSync("motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts", "utf8");
const openingCrop = readFileSync("movie-dashboard/src/components/OpeningCropReviewOperatorCard.tsx", "utf8");
const profileMedia = readFileSync("movie-dashboard/src/components/ProfileRealMediaReviewOperatorCard.tsx", "utf8");
const timing = readFileSync("movie-dashboard/src/components/RhythmSceneTimingCorrectionCard.tsx", "utf8");
const transition = readFileSync("movie-dashboard/src/components/RhythmSceneTransitionCorrectionCard.tsx", "utf8");

function requireText(source, text, label) {
  if (!source.includes(text)) throw new Error(`${label}: missing ${text}`);
}

for (const token of ["REAL_MEDIA_VISUAL_CORRECTION_QUEUE", "CROP_SUBJECT_SAFE", "TITLE_READABLE", "TEXT_MEDIA_CONTRAST", "NO_UNINTENDED_EDGE_CLIP"]) {
  requireText(focus, token, "shared Scene focus contract");
}
for (const token of [
  "wedding-movie-real-media-visual-correction-queue/v1",
  "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_REAL_MEDIA_VISUAL_FAIL_VERDICTS",
  "requestMotionZukanSceneFocus({",
  'requestedBy: "REAL_MEDIA_VISUAL_CORRECTION_QUEUE"',
  "loadMotionZukanComposerState()",
  "failure.fromSourceRevision",
  "failure.toSourceRevision",
  "failure.sourceRevision",
  "data-real-media-visual-correction-focus",
  "fresh preview/stills/review",
]) requireText(operator, token, "visual correction operator");
for (const token of ["fromSourceRevision", "toSourceRevision", "REAL_PREVIEW_VISUAL_REVIEW_TRANSITION_SCENE_MISSING"]) {
  requireText(backend, token, "visual correction queue revision binding");
}
requireText(openingCrop, "data-opening-crop-review-operator", "Opening crop target");
requireText(profileMedia, "data-profile-real-media-review-operator", "Profile media target");
requireText(timing, "data-rhythm-scene-timing-correction", "timing target");
requireText(transition, "data-rhythm-transition-correction", "transition target");

for (const forbidden of [
  'remotionStudioGuiActual: "PASS"',
  'palmierGuiActual: "PASS"',
  'macDaVinciGuiActual: "PASS"',
  'productionReady: true',
]) {
  if (operator.includes(forbidden) || focus.includes(forbidden) || backend.includes(forbidden)) {
    throw new Error(`visual correction navigation must not promote evidence: ${forbidden}`);
  }
}

console.log("real-media visual correction navigation contracts: PASS");
