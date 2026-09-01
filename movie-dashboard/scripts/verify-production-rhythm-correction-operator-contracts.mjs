import {readFileSync} from "node:fs";

const operator=readFileSync(new URL("../src/components/WeddingProductionRhythmCorrectionQueueCard.tsx",import.meta.url),"utf8");
const intake=readFileSync(new URL("../src/components/WeddingMediaIntakeChecklistCard.tsx",import.meta.url),"utf8");
const required=[
  "wedding-movie-production-rhythm-correction-queue/v1",
  "DERIVED_FROM_CURRENT_RHYTHM_PASS_AND_EXPLICIT_HUMAN_WHOLE_PROJECT_REVIEW_WITHOUT_AUTOMATIC_QUALITY_INFERENCE",
  "data-production-rhythm-correction-queue",
  "data-production-rhythm-correction-binding",
  "QUEUE_RHYTHM_SHA_MISMATCH",
  "QUEUE_CURRENTNESS_SHA_MISMATCH",
  "RHYTHM_CURRENTNESS_NOT_CURRENT",
  "CURRENTNESS_RHYTHM_SHA_MISMATCH",
  "PREVIEW_SHA_MISMATCH",
  "RENDER_SHA_MISMATCH",
  "HUMAN_MUST_SELECT_EXACT_SCENE_OR_EDGE_BEFORE_EDIT",
  "MECHANICAL_CUE_ONLY_NOT_QUALITY_VERDICT",
  "PROJECT_RHYTHM_MECHANICAL_CUE_CORRECTION_QUEUE",
  "PROJECT_RHYTHM_HUMAN_FAIL_EXPLICIT_SCENE_SELECTION",
  'axis:"PACING"',
  'surface:"SCENE_TIMING_AND_A_B_COMPARE"',
  "createHash(buffer)",
  "exact SceneはHuman選択必須",
  "quality verdictではありません",
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
if(!operator.includes('disabled={gate.state!=="BOUND"}')) throw new Error("mechanical correction navigation must fail closed unless queue/rhythm/currentness are SHA-bound");
if(!operator.includes('disabled={gate.state!=="BOUND"||!humanSelections[item.id]}')) throw new Error("Human FAIL navigation must require explicit Human Scene selection");
console.log("Wedding production rhythm correction queue Motion Zukan operator contracts: PASS");
