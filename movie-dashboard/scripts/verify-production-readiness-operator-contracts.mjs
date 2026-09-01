import {readFileSync} from "node:fs";

const operator = readFileSync(new URL("../src/components/WeddingMovieProductionReadinessOperatorCard.tsx", import.meta.url), "utf8");
const framing = readFileSync(new URL("../src/components/WeddingRealMediaFramingOperatorCard.tsx", import.meta.url), "utf8");
const framingComparison = readFileSync(new URL("../src/components/WeddingRealMediaFramingComparisonReviewCard.tsx", import.meta.url), "utf8");
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
  "data-real-media-framing-comparison-review",
  "data-comparison-current",
  "data-human-visual-qa=\"NOT_RUN\"",
  "sameSceneAndMediaAuthorityVerified",
  "humanVisualReviewPerformed",
  "remotionStudioGuiActual",
  "palmierGuiActual",
  "macDaVinciGuiActual",
  "STILL_SHA_MISMATCH",
  "STALE_FRAMING_COMPARISON",
  "currentMedia.sha256 !== scene.mediaSha256",
  "revision !== scene.after.framingRevision",
  "data-framing-comparison-image-pair",
  "HUMAN REVIEW READY",
  "HUMAN REVIEW BLOCKED",
  "compare-wedding-project-real-media-framing-qa-stills.mts",
];
for (const token of comparisonRequired) if (!framingComparison.includes(token)) throw new Error(`framing comparison review contract missing: ${token}`);
if (!intake.includes("<WeddingRealMediaFramingComparisonReviewCard projectId={projectId} />")) throw new Error("framing comparison review is not mounted in the real-media intake surface");
if (/humanVisualReviewPerformed:\s*true/.test(framingComparison)) throw new Error("framing comparison review must never manufacture Human visual review evidence");
if (/productionReady:\s*true/.test(framingComparison)) throw new Error("framing comparison review must never manufacture productionReady");
if (!framingComparison.includes("createHash(buffer)")) throw new Error("framing comparison stills must be browser-SHA verified before display");

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
console.log("Wedding Movie production readiness + Human framing + framing comparison + visual review operator contracts: PASS");
