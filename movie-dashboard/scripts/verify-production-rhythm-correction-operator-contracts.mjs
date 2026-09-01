import {readFileSync} from "node:fs";

const operator=readFileSync(new URL("../src/components/WeddingProductionRhythmCorrectionQueueCard.tsx",import.meta.url),"utf8");
const intake=readFileSync(new URL("../src/components/WeddingMediaIntakeChecklistCard.tsx",import.meta.url),"utf8");
const required=[
  "wedding-movie-production-rhythm-correction-queue/v1",
  "DERIVED_FROM_CURRENT_RHYTHM_PASS_AND_EXPLICIT_HUMAN_WHOLE_PROJECT_REVIEW_WITHOUT_AUTOMATIC_QUALITY_INFERENCE",
  "data-production-rhythm-correction-queue",
  "data-production-rhythm-correction-binding",
  "data-production-rhythm-live-composer",
  "data-production-rhythm-correction-refresh-required",
  "data-rhythm-transition-edge-selector",
  "QUEUE_RHYTHM_SHA_MISMATCH",
  "QUEUE_CURRENTNESS_SHA_MISMATCH",
  "RHYTHM_CURRENTNESS_NOT_CURRENT",
  "CURRENTNESS_RHYTHM_SHA_MISMATCH",
  "PREVIEW_SHA_MISMATCH",
  "RENDER_SHA_MISMATCH",
  "LIVE_SCENE_MISSING",
  "LIVE_SCENE_REVISION_DRIFT",
  "HUMAN_MUST_SELECT_EXACT_SCENE_OR_EDGE_BEFORE_EDIT",
  "MECHANICAL_CUE_ONLY_NOT_QUALITY_VERDICT",
  'requestedBy:"PROJECT_RHYTHM_CORRECTION_QUEUE"',
  'axis:"PACING"',
  'axis:"TRANSITION"',
  'surface:"SCENE_TIMING_AND_A_B_COMPARE"',
  "edge.returnTo.focusSceneId",
  "edge.returnTo.focusSourceRevision",
  "Human-selected EdgeをTransition editorへ",
  "Scene edgeを選択",
  "createHash(buffer)",
  "loadMotionZukanComposerState",
  "MOTION_ZUKAN_COMPOSER_CHANGED_EVENT",
  "current.updatedAt!==source.sourceRevision",
  "Human選択必須",
  "quality verdictではありません",
  "TIMING EDIT DETECTED → OLD RHYTHM EVIDENCE STALE",
  "refresh-wedding-project-real-media-visual-qa.mts",
  "wedding-project-production-rhythm-pass.mts",
  "verify-wedding-project-production-rhythm-pass-currentness.mts",
  "Human whole-project rhythm reviewをNOT_RUNから再実施",
  "silent rebaseしません",
  "Remotion Studio GUI Actual = NOT_RUN",
  "Palmier GUI Actual = NOT_RUN",
  "Mac DaVinci GUI Actual = NOT_RUN",
  "Human visual QA = NOT_RUN",
  "productionReady = false",
];
for(const token of required) if(!operator.includes(token)) throw new Error(`production rhythm correction operator contract missing: ${token}`);
if(!intake.includes("<WeddingProductionRhythmCorrectionQueueCard projectId={projectId} />")) throw new Error("production rhythm correction operator is not mounted in real-media intake surface");
if(/productionReady\s*:\s*true/.test(operator)) throw new Error("operator must never manufacture productionReady");
if(/humanVisualQa\s*:\s*["']PASS["']/.test(operator)) throw new Error("operator must never manufacture Human visual QA PASS");
if(!operator.includes('disabled={gate.state!=="BOUND"}')) throw new Error("mechanical correction navigation must fail closed unless queue/rhythm/currentness/live composer are bound");
if(!operator.includes('disabled={gate.state!=="BOUND"||!humanSelections[item.id]}')) throw new Error("Human non-transition FAIL navigation must require explicit Human Scene selection");
if(!operator.includes('disabled={gate.state!=="BOUND"||!humanEdgeSelections[item.id]}')) throw new Error("Human transition cadence FAIL navigation must require explicit Human edge selection");
if(!operator.includes('if(liveComposerBinding.state==="STALE")reasons.push(...liveComposerBinding.reasons)')) throw new Error("live composer Scene revision drift must invalidate the loaded correction queue");
console.log("Wedding production rhythm correction queue Motion Zukan live-stale + Human edge-selection operator contracts: PASS");
