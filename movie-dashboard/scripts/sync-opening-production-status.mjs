import {execFileSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const repoRoot=path.resolve(dashboardRoot,"..");
const motionStudioRoot=path.join(repoRoot,"motion-studio");
const statusPath=path.join(motionStudioRoot,"scripts/opening-v1-production-status.mts");
const finalRenderReviewPath=path.join(motionStudioRoot,"scripts/opening-v1-final-render-review.mts");
const davinciPath=path.join(motionStudioRoot,"scripts/opening-v1-davinci-handoff-contract.mts");
const outputPath=path.join(dashboardRoot,"src/data/openingProductionStatus.generated.ts");
const report=JSON.parse(execFileSync(process.execPath,["--no-warnings",statusPath,"--json"],{cwd:motionStudioRoot,encoding:"utf8"}));
const finalRenderReview=JSON.parse(execFileSync(process.execPath,["--no-warnings",finalRenderReviewPath,"--json"],{cwd:motionStudioRoot,encoding:"utf8"}));
const davinci=JSON.parse(execFileSync(process.execPath,["--no-warnings",davinciPath,"--json"],{cwd:motionStudioRoot,encoding:"utf8"}));
if(report.schemaVersion!=="opening-v1-production-status/v1"||report.authority!=="DERIVED_PRODUCTION_STATUS")throw new Error(`Unexpected Opening production status contract: ${report.schemaVersion}/${report.authority}`);
if(finalRenderReview.schemaVersion!=="opening-v1-final-render-review-status/v1"||finalRenderReview.authority!=="DERIVED_FINAL_RENDER_REVIEW_STATUS")throw new Error(`Unexpected Opening final render review contract: ${finalRenderReview.schemaVersion}/${finalRenderReview.authority}`);
if(report.handoff?.palmier?.contractVersion!=="opening-v1-palmier-handoff/v2")throw new Error(`Unexpected Opening Palmier handoff contract: ${report.handoff?.palmier?.contractVersion??"missing"}`);
if(davinci.schemaVersion!=="opening-v1-davinci-handoff/v1"||davinci.authority!=="MOTION_STUDIO_OPENING_DAVINCI_HANDOFF")throw new Error(`Unexpected Opening DaVinci handoff contract: ${davinci.schemaVersion}/${davinci.authority}`);

const finalReviewStage={
  state:finalRenderReview.state,
  blockers:Array.isArray(finalRenderReview.blockers)?finalRenderReview.blockers.map(String):[],
  humanReviewComplete:finalRenderReview.humanReviewComplete===true,
  path:"out/qa/opening-v1-final-render-review.json",
};
const finalRenderPassed=report.stages?.finalRender?.state==="PASS";
const finalReviewNeedsInit=finalRenderPassed&&finalReviewStage.state==="NOT_RUN";
const finalReviewNeedsHuman=finalRenderPassed&&finalReviewStage.state!=="PASS"&&!finalReviewNeedsInit;
const effectiveOverallState=finalReviewNeedsInit
  ? "FINAL_RENDER_REVIEW_INIT_REQUIRED"
  : finalReviewNeedsHuman
    ? "HUMAN_FINAL_RENDER_REVIEW_REQUIRED_OR_STALE"
    : report.overallState;
const effectiveNextActions=finalReviewNeedsInit
  ? [
      "node --no-warnings scripts/init-opening-v1-final-render-review.mts",
      "final MP4を人間が通し視聴してvisual/timing/readability/BGM/encodingを判定",
      "node --no-warnings scripts/opening-v1-final-render-review.mts --strict",
    ]
  : finalReviewNeedsHuman
    ? [
        "current final MP4 / render source / upstream reviewに対してHuman final-render QAを完了または再初期化",
        "node --no-warnings scripts/opening-v1-final-render-review.mts --strict",
      ]
    : [...report.nextActions];

const stageNames=["media","previewRender","previewSourceBinding","previewReview","finalRender","productionBundle","davinciFinishing","finalDeliveryApproval"];
const sourceStage=report.stages.previewSourceBinding;
const sourceBlockers=Array.isArray(sourceStage?.blockers)?sourceStage.blockers.map(String):[];
const sourceRevalidation={
  realMediaPreview:{
    state:sourceStage.state==="STALE"
      ? "RE_RENDER_AND_REVIEW_REQUIRED"
      : sourceStage.state==="MISSING"
        ? "BIND_AND_REVIEW_REQUIRED"
        : sourceStage.state==="PASS" && report.stages.previewReview.state!=="PASS"
          ? "CURRENT_SOURCE_REVIEW_REQUIRED"
          : sourceStage.state==="PASS"
            ? "CURRENT"
            : "NOT_RUN",
    blockers:sourceBlockers,
    recovery:sourceStage.state==="STALE"
      ? ["pnpm opening:preview-review:init","Opening previewを再Human QA","pnpm opening:preview-review:strict"]
      : sourceStage.state==="MISSING"
        ? ["pnpm opening:preview-review:init","Opening previewをHuman QA","pnpm opening:preview-review:strict"]
        : sourceStage.state==="PASS" && report.stages.previewReview.state!=="PASS"
          ? ["Opening previewをHuman QA","pnpm opening:preview-review:strict"]
          : [],
  },
  finalRender:{
    state:!finalRenderPassed
      ? "NOT_RUN"
      : finalReviewStage.state==="PASS"
        ? "CURRENT"
        : finalReviewStage.state==="NOT_RUN"
          ? "FINAL_REVIEW_INIT_REQUIRED"
          : "RE_REVIEW_REQUIRED",
    blockers:[...finalReviewStage.blockers],
    recovery:!finalRenderPassed||finalReviewStage.state==="PASS"
      ? []
      : finalReviewStage.state==="NOT_RUN"
        ? ["node --no-warnings scripts/init-opening-v1-final-render-review.mts","final MP4をHuman QA","node --no-warnings scripts/opening-v1-final-render-review.mts --strict"]
        : ["current final MP4を再Human QA","node --no-warnings scripts/opening-v1-final-render-review.mts --strict"],
  },
  guardrails:[
    "SOURCE_CHANGED => RE_RENDER_REQUIRED",
    "RE_RENDER_REQUIRED => RE_REVIEW_REQUIRED",
    "OLD_HUMAN_REVIEW != CURRENT_RENDER_IMPLEMENTATION",
    "PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS",
    "FINAL_RENDER_OR_SOURCE_CHANGED => FINAL_RENDER_RE_REVIEW_REQUIRED",
  ],
};
const snapshot={
  source:{
    status:"motion-studio/scripts/opening-v1-production-status.mts",
    previewSourceBinding:"motion-studio/scripts/opening-v1-preview-source-fingerprint.mts",
    finalRenderReview:"motion-studio/scripts/opening-v1-final-render-review.mts",
    davinciHandoff:"motion-studio/scripts/opening-v1-davinci-handoff-contract.mts",
  },
  overallState:effectiveOverallState,
  stages:{
    ...Object.fromEntries(stageNames.map((name)=>[name,{state:report.stages[name].state}])),
    finalRenderReview:{state:finalReviewStage.state},
  },
  readiness:{
    ...report.readiness,
    humanFinalRenderApproved:finalReviewStage.state==="PASS",
  },
  sourceRevalidation,
  handoff:{
    palmier:{
      contractVersion:report.handoff.palmier.contractVersion,
      current:report.handoff.palmier.current&&finalReviewStage.state==="PASS",
      sourceAuthorities:[...report.handoff.palmier.sourceAuthorities,"out/qa/opening-v1-final-render-review.json"],
      artifacts:{
        sceneTimeline:{...report.handoff.palmier.artifacts.sceneTimeline, carries:[...report.handoff.palmier.artifacts.sceneTimeline.carries]},
        soundCues:{...report.handoff.palmier.artifacts.soundCues, carries:[...report.handoff.palmier.artifacts.soundCues.carries]},
      },
    },
    davinci:{
      contractVersion:davinci.schemaVersion,
      current:davinci.current&&finalReviewStage.state==="PASS",
      sourceAuthorities:[...davinci.sourceAuthorities,"out/qa/opening-v1-final-render-review.json"],
      upstreamPalmier:davinci.upstreamPalmier,
      handoffAsset:davinci.handoffAsset,
      actualEvidence:{...davinci.actualEvidence,requiredChecks:[...davinci.actualEvidence.requiredChecks]},
      productionReady:false,
    },
  },
  nextActions:effectiveNextActions,
};
const output=`// AUTO-GENERATED by scripts/sync-opening-production-status.mjs\n// Motion Studio production status is the authority. Do not edit by hand.\n\nexport const openingProductionStatus = ${JSON.stringify(snapshot,null,2)} as const;\n`;
if(process.argv.includes("--write")){fs.writeFileSync(outputPath,output,"utf8");console.log(`Opening production status synced: ${snapshot.overallState}, previewSource=${snapshot.sourceRevalidation.realMediaPreview.state}, finalReview=${snapshot.sourceRevalidation.finalRender.state}, davinci=${snapshot.handoff.davinci.contractVersion}`);process.exit(0)}
if(!fs.existsSync(outputPath)){console.error("Opening production status generated file is missing. Run: node scripts/sync-opening-production-status.mjs --write");process.exit(1)}
if(fs.readFileSync(outputPath,"utf8")!==output){console.error("Opening production status generated snapshot is stale. Run: node scripts/sync-opening-production-status.mjs --write");process.exit(1)}
console.log(`Opening production status current: ${snapshot.overallState}, previewSource=${snapshot.sourceRevalidation.realMediaPreview.state}, finalReview=${snapshot.sourceRevalidation.finalRender.state}, palmier=${snapshot.handoff.palmier.contractVersion}, davinci=${snapshot.handoff.davinci.contractVersion}, productionReady=${snapshot.readiness.productionReady}`);
