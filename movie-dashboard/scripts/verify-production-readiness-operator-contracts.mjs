import {readFileSync} from "node:fs";

const operator = readFileSync(new URL("../src/components/WeddingMovieProductionReadinessOperatorCard.tsx", import.meta.url), "utf8");
const framing = readFileSync(new URL("../src/components/WeddingRealMediaFramingOperatorCard.tsx", import.meta.url), "utf8");
const framingComparison = readFileSync(new URL("../src/components/WeddingRealMediaFramingComparisonReviewCard.tsx", import.meta.url), "utf8");
const timingComparison = readFileSync(new URL("../src/components/WeddingRealMediaTimingComparisonReviewCard.tsx", import.meta.url), "utf8");
const rhythmReview = readFileSync(new URL("../src/components/WeddingProductionRhythmReviewCard.tsx", import.meta.url), "utf8");
const visualReview = readFileSync(new URL("../src/components/WeddingRealMediaVisualReviewOperatorCard.tsx", import.meta.url), "utf8");
const intake = readFileSync(new URL("../src/components/WeddingMediaIntakeChecklistCard.tsx", import.meta.url), "utf8");

const required = [
  "wedding-movie-production-readiness-audit/v1",
  "data-production-readiness-operator",
  "data-currentness={currentness.state}",
  "READY_FOR_REAL_MEDIA_PREVIEW",
  "WAITING_HUMAN_INPUT",
  "BLOCKED_BY_STALE_AUTHORITY",
  "REVISION:${scene.sceneId}",
  "PATTERN:${scene.sceneId}",
  "ROLE:${scene.sceneId}",
  "TRANSITION_AUTHORITY_STALE",
  "readyForContinuousRealMediaPreview",
  "framingBoundScenes",
  "data-real-media-framing",
  "data-framing-revision",
  "framing.fit",
  "framing.focusX",
  "framing.focusY",
  "framing.scale",
  "framing.revision",
  "remotionStudioGuiActual === \"NOT_RUN\"",
  "palmierGuiActual === \"NOT_RUN\"",
  "macDaVinciGuiActual === \"NOT_RUN\"",
  "productionReady === false",
  "Human/GUI evidenceは自動昇格しません",
];
for (const token of required) if (!operator.includes(token)) throw new Error(`production readiness operator contract missing: ${token}`);
if (!intake.includes("<WeddingMovieProductionReadinessOperatorCard projectId={projectId} />")) throw new Error("production readiness operator is not mounted in the real-media intake surface");
if (!operator.includes("disabled={!continuousPreviewAllowed}")) throw new Error("continuous real preview command must fail closed when audit transport is stale");

const framingRequired = [
  "wedding-movie-production-media-input/v1",
  "data-real-media-framing-operator",
  "data-real-media-framing-scene",
  "data-source-revision",
  "data-framing-revision",
  'value="COVER"',
  'value="CONTAIN"',
  'type="range" min="0" max="100"',
  'type="range" min="1" max="2"',
  "scene.updatedAt",
  "scene.sourceRevision",
  "STALE_REAL_MEDIA_FRAMING_BINDING",
  "silent rebaseしません",
  "Framing反映Media JSONを書き出す",
  "Human visual QA PASS",
  "Remotion Studio GUI Actual",
  "Palmier GUI Actual",
  "Mac DaVinci GUI Actual",
];
for (const token of framingRequired) if (!framing.includes(token)) throw new Error(`real-media framing operator contract missing: ${token}`);
if (!intake.includes("<WeddingRealMediaFramingOperatorCard projectId={projectId} />")) throw new Error("framing operator is not mounted in the real-media intake surface");
if (/humanApproved:\s*true/.test(framing)) throw new Error("framing operator must preserve loaded media approval, never manufacture approval");
if (/humanVisualReviewPerformed:\s*true/.test(framing)) throw new Error("framing operator must never manufacture Human visual review evidence");

const comparisonRequired = [
  "wedding-movie-real-media-framing-qa-comparison/v1",
  "DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS",
  "wedding-movie-real-media-framing-qa-comparison-currentness/v1",
  "LIVE_REVALIDATION_OF_FRAMING_COMPARISON_AGAINST_SOURCE_MANIFESTS_STILLS_AND_CURRENT_MEDIA",
  "data-real-media-framing-comparison-review",
  "data-comparison-current",
  "data-comparison-strict-current",
  "data-human-visual-qa=\"NOT_RUN\"",
  "sameSceneAndMediaAuthorityVerified",
  "humanVisualReviewPerformed",
  "remotionStudioGuiActual",
  "palmierGuiActual",
  "macDaVinciGuiActual",
  "STILL_SHA_MISMATCH",
  "STALE_FRAMING_COMPARISON",
  "STRICT_CURRENTNESS_REQUIRED",
  "CURRENTNESS_RECEIPT_SHA_MISMATCH",
  "CURRENTNESS_MEDIA_SHA_MISMATCH",
  "currentMedia.sha256 !== scene.mediaSha256",
  "revision !== scene.after.framingRevision",
  "strictCurrentness.source.receiptSha256 !== receiptSha",
  "strictCurrentness.source.currentMediaSha256 !== mediaSha",
  "browserBinding.state === \"CURRENT\" && strictBinding.state === \"CURRENT\"",
  "data-framing-comparison-image-pair",
  "HUMAN REVIEW READY",
  "HUMAN REVIEW BLOCKED",
  "verify-wedding-project-real-media-framing-qa-comparison-currentness.mts",
  "--strict-current",
];
for (const token of comparisonRequired) if (!framingComparison.includes(token)) throw new Error(`framing comparison review contract missing: ${token}`);
if (!intake.includes("<WeddingRealMediaFramingComparisonReviewCard projectId={projectId} />")) throw new Error("framing comparison review is not mounted in the real-media intake surface");
if (/humanVisualReviewPerformed:\s*true/.test(framingComparison)) throw new Error("framing comparison review must never manufacture Human visual review evidence");
if (/productionReady:\s*true/.test(framingComparison)) throw new Error("framing comparison review must never manufacture productionReady");
if (!framingComparison.includes("createHash(buffer)")) throw new Error("framing comparison receipt/media/stills must be browser-SHA verified before review");

const timingComparisonRequired = [
  "wedding-movie-real-media-timing-qa-comparison/v1",
  "wedding-movie-real-media-timing-qa-comparison-currentness/v1",
  "LIVE_REVALIDATION_OF_TIMING_COMPARISON_AGAINST_SOURCE_MANIFESTS_STILLS_AND_CURRENT_SELECTED_SCENES",
  "data-real-media-timing-comparison-review",
  "data-timing-comparison-current",
  "data-timing-comparison-strict-current",
  "data-human-visual-qa=\"NOT_RUN\"",
  "sameSceneMediaFramingAuthorityVerified",
  "CURRENTNESS_RECEIPT_SHA_MISMATCH",
  "CURRENTNESS_SELECTED_SHA_MISMATCH",
  "currentness.source.receiptSha256 !== receiptSha",
  "currentness.source.currentSelectedSha256 !== selectedSha",
  "STILL_SHA_MISMATCH",
  "BEFORE TOTAL",
  "AFTER TOTAL",
  "MOVIE DELTA",
  "隣接transition位置",
  "HUMAN REVIEW READY",
  "HUMAN REVIEW BLOCKED",
  "verify-wedding-project-real-media-timing-qa-comparison-currentness.mts",
  "--current-selected=",
  "--strict-current",
];
for (const token of timingComparisonRequired) if (!timingComparison.includes(token)) throw new Error(`timing comparison review contract missing: ${token}`);
if (!intake.includes("<WeddingRealMediaTimingComparisonReviewCard projectId={projectId} />")) throw new Error("timing comparison review is not mounted in the real-media intake surface");
if (/humanVisualReviewPerformed:\s*true/.test(timingComparison)) throw new Error("timing comparison review must never manufacture Human visual review evidence");
if (/productionReady:\s*true/.test(timingComparison)) throw new Error("timing comparison review must never manufacture productionReady");
if (!timingComparison.includes("createHash(buffer)")) throw new Error("timing comparison receipt/selected/stills must be browser-SHA verified before review");
if (!timingComparison.includes('browserBinding.state === "CURRENT"') || !timingComparison.includes('strictBinding.state === "CURRENT"')) throw new Error("timing Human review must fail closed unless browser and canonical strict currentness are CURRENT");

const rhythmRequired = [
  "wedding-movie-production-rhythm-pass/v1",
  "wedding-movie-production-rhythm-pass-currentness/v1",
  "LIVE_REVALIDATION_OF_PRODUCTION_RHYTHM_PASS_AGAINST_CURRENT_RENDERED_REAL_MEDIA_PREVIEW",
  "data-production-rhythm-review",
  "data-production-rhythm-current",
  "data-production-rhythm-timeline",
  "data-production-rhythm-scene",
  "data-production-rhythm-human-operator",
  "wedding-movie-production-rhythm-human-review/v1",
  "EXPLICIT_HUMAN_WHOLE_PROJECT_RHYTHM_REVIEW_BOUND_TO_CURRENT_RHYTHM_PASS",
  "RHYTHM_PASS_SHA_MISMATCH",
  "PREVIEW_MANIFEST_SHA_NOT_CURRENT",
  "RENDER_SHA_NOT_CURRENT",
  "requestMotionZukanSceneFocus",
  'requestedBy:"PROJECT_RHYTHM_CORRECTION_QUEUE"',
  'axis:"PACING"',
  'surface:"SCENE_TIMING_AND_A_B_COMPARE"',
  "mechanical cue",
  "quality verdictではありません",
  "Human rhythm review JSONを書き出す",
  "Human visual QA = NOT_RUN",
  "Remotion Studio GUI Actual = NOT_RUN",
  "Palmier GUI Actual = NOT_RUN",
  "Mac DaVinci GUI Actual = NOT_RUN",
  "productionReady:false",
];
for (const token of rhythmRequired) if (!rhythmReview.includes(token)) throw new Error(`whole-project rhythm review contract missing: ${token}`);
if (!intake.includes("<WeddingProductionRhythmReviewCard projectId={projectId} />")) throw new Error("whole-project rhythm review is not mounted in the real-media intake surface");
if (!rhythmReview.includes("const [performed,setPerformed]=useState(false)")) throw new Error("whole-project Human rhythm review must initialize NOT_RUN / not performed");
if (!rhythmReview.includes('const initialAxes=()=>Object.fromEntries(AXES.map(({key})=>[key,{verdict:"NOT_RUN",notes:""}]))')) throw new Error("whole-project Human rhythm axes must initialize NOT_RUN");
if (!rhythmReview.includes('const canExport=gate.state==="CURRENT"&&performed&&allReviewed')) throw new Error("whole-project Human rhythm evidence export must require CURRENT + explicit performed + all axes reviewed");
if (!rhythmReview.includes('disabled={gate.state!=="CURRENT"}')) throw new Error("whole-project rhythm correction navigation / review controls must fail closed when strict authority is not CURRENT");

const visualRequired = [
  "wedding-movie-real-media-human-visual-review/v1",
  "data-real-media-visual-review-operator",
  "data-real-media-visual-review-scene",
  "data-real-media-visual-review-transition",
  "humanVisualReviewPerformed",
  "finalVerdict",
  "NOT_RUN",
  "PASS",
  "FAIL",
  "canonical finalize command",
  "wedding-project-real-media-preview-visual-review.mts",
  "Remotion Studio / Palmier / Mac DaVinci GUI Actual",
];
for (const token of visualRequired) if (!visualReview.includes(token)) throw new Error(`real-media visual review operator contract missing: ${token}`);
if (!intake.includes("<WeddingRealMediaVisualReviewOperatorCard projectId={projectId} />")) throw new Error("real-media visual review operator is not mounted in the real-media intake surface");
if (/humanVisualReviewPerformed:\s*true/.test(visualReview)) throw new Error("visual review operator must not auto-promote Human review performed");
console.log("Wedding Movie production readiness + Human framing + strict-current framing/timing comparison + whole-project rhythm + visual review operator contracts: PASS");
