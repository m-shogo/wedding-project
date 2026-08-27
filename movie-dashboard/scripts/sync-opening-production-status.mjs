import {execFileSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const repoRoot=path.resolve(dashboardRoot,"..");
const motionStudioRoot=path.join(repoRoot,"motion-studio");
const statusPath=path.join(motionStudioRoot,"scripts/opening-v1-production-status.mts");
const davinciPath=path.join(motionStudioRoot,"scripts/opening-v1-davinci-handoff-contract.mts");
const outputPath=path.join(dashboardRoot,"src/data/openingProductionStatus.generated.ts");
const report=JSON.parse(execFileSync(process.execPath,["--no-warnings",statusPath,"--json"],{cwd:motionStudioRoot,encoding:"utf8"}));
const davinci=JSON.parse(execFileSync(process.execPath,["--no-warnings",davinciPath,"--json"],{cwd:motionStudioRoot,encoding:"utf8"}));
if(report.schemaVersion!=="opening-v1-production-status/v1"||report.authority!=="DERIVED_PRODUCTION_STATUS")throw new Error(`Unexpected Opening production status contract: ${report.schemaVersion}/${report.authority}`);
if(report.stages?.finalRenderReview==null||report.readiness?.humanFinalRenderApproved==null)throw new Error("Opening production status must own canonical final-render Human review state");
if(report.handoff?.palmier?.contractVersion!=="opening-v1-palmier-handoff/v2")throw new Error(`Unexpected Opening Palmier handoff contract: ${report.handoff?.palmier?.contractVersion??"missing"}`);
if(davinci.schemaVersion!=="opening-v1-davinci-handoff/v1"||davinci.authority!=="MOTION_STUDIO_OPENING_DAVINCI_HANDOFF")throw new Error(`Unexpected Opening DaVinci handoff contract: ${davinci.schemaVersion}/${davinci.authority}`);

const stageNames=["media","previewRender","previewSourceBinding","previewReview","finalRender","finalRenderReview","productionBundle","davinciFinishing","finalDeliveryApproval"];
const stageRecovery={
  media:[...report.nextActions],
  previewRender:["pnpm render:opening-v1:preview"],
  previewSourceBinding:["pnpm opening:preview-review:init","pnpm opening:preview-review:strict"],
  previewReview:["pnpm opening:preview-review:init","pnpm opening:preview-review:strict"],
  finalRender:["pnpm render:opening-v1"],
  finalRenderReview:["pnpm opening:final-render-review:init","pnpm opening:final-render-review:strict"],
  productionBundle:["pnpm opening:production-bundle:finalize"],
  davinciFinishing:["pnpm opening:davinci-finishing:init","pnpm opening:davinci-finishing:strict"],
  finalDeliveryApproval:["pnpm opening:final-delivery-approval:init","pnpm opening:final-delivery-approval:strict"],
};
const stageSnapshot=(name,stage)=>({
  state:String(stage?.state??"NOT_RUN"),
  detail:String(stage?.detail??"No stage detail reported."),
  ...(stage?.path?{path:String(stage.path)}:{}),
  recovery:[...(stageRecovery[name]??[])],
});
const sourceStage=report.stages.previewSourceBinding;
const sourceBlockers=Array.isArray(sourceStage?.blockers)?sourceStage.blockers.map(String):[];
const finalReviewStage=report.stages.finalRenderReview;
const finalReviewBlockers=Array.isArray(finalReviewStage?.blockers)?finalReviewStage.blockers.map(String):[];
const finalRenderPassed=report.stages.finalRender.state==="PASS";
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
        : finalReviewStage.state==="MISSING"
          ? "FINAL_REVIEW_INIT_REQUIRED"
          : "RE_REVIEW_REQUIRED",
    blockers:finalReviewBlockers,
    recovery:!finalRenderPassed||finalReviewStage.state==="PASS"
      ? []
      : finalReviewStage.state==="MISSING"
        ? ["pnpm opening:final-render-review:init","final MP4をHuman QA","pnpm opening:final-render-review:strict"]
        : ["current final MP4を再Human QA","pnpm opening:final-render-review:strict"],
  },
  guardrails:[
    "SOURCE_CHANGED => RE_RENDER_REQUIRED",
    "RE_RENDER_REQUIRED => RE_REVIEW_REQUIRED",
    "OLD_HUMAN_REVIEW != CURRENT_RENDER_IMPLEMENTATION",
    "PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS",
    "FINAL_RENDER_OR_SOURCE_CHANGED => FINAL_RENDER_RE_REVIEW_REQUIRED",
  ],
};
const finalReviewAuthority="out/qa/opening-v1-final-render-review.json";
const palmierSourceAuthorities=[...new Set([...report.handoff.palmier.sourceAuthorities,finalReviewAuthority])];
const davinciSourceAuthorities=[...new Set([...davinci.sourceAuthorities,finalReviewAuthority])];
const snapshot={
  source:{
    status:"motion-studio/scripts/opening-v1-production-status.mts",
    previewSourceBinding:"motion-studio/scripts/opening-v1-preview-source-fingerprint.mts",
    finalRenderReview:"motion-studio/scripts/opening-v1-production-status.mts#stages.finalRenderReview",
    davinciHandoff:"motion-studio/scripts/opening-v1-davinci-handoff-contract.mts",
  },
  overallState:report.overallState,
  stages:Object.fromEntries(stageNames.map((name)=>[name,stageSnapshot(name,report.stages[name])])),
  readiness:{...report.readiness},
  sourceRevalidation,
  handoff:{
    palmier:{
      contractVersion:report.handoff.palmier.contractVersion,
      current:report.handoff.palmier.current,
      sourceAuthorities:palmierSourceAuthorities,
      artifacts:{
        sceneTimeline:{...report.handoff.palmier.artifacts.sceneTimeline,carries:[...report.handoff.palmier.artifacts.sceneTimeline.carries]},
        soundCues:{...report.handoff.palmier.artifacts.soundCues,carries:[...report.handoff.palmier.artifacts.soundCues.carries]},
      },
    },
    davinci:{
      contractVersion:davinci.schemaVersion,
      current:davinci.current&&report.readiness.humanFinalRenderApproved===true,
      sourceAuthorities:davinciSourceAuthorities,
      upstreamPalmier:davinci.upstreamPalmier,
      handoffAsset:davinci.handoffAsset,
      actualEvidence:{...davinci.actualEvidence,requiredChecks:[...davinci.actualEvidence.requiredChecks]},
      productionReady:false,
    },
  },
  nextActions:[...report.nextActions],
};
const output=`// AUTO-GENERATED by scripts/sync-opening-production-status.mjs\n// Motion Studio production status is the authority. Do not edit by hand.\n\nexport const openingProductionStatus = ${JSON.stringify(snapshot,null,2)} as const;\n`;
if(process.argv.includes("--write")){fs.writeFileSync(outputPath,output,"utf8");console.log(`Opening production status synced: ${snapshot.overallState}, previewSource=${snapshot.sourceRevalidation.realMediaPreview.state}, finalReview=${snapshot.sourceRevalidation.finalRender.state}, davinci=${snapshot.handoff.davinci.contractVersion}`);process.exit(0)}
if(!fs.existsSync(outputPath)){console.error("Opening production status generated file is missing. Run: node scripts/sync-opening-production-status.mjs --write");process.exit(1)}
if(fs.readFileSync(outputPath,"utf8")!==output){console.error("Opening production status generated snapshot is stale. Run: node scripts/sync-opening-production-status.mjs --write");process.exit(1)}
console.log(`Opening production status current: ${snapshot.overallState}, previewSource=${snapshot.sourceRevalidation.realMediaPreview.state}, finalReview=${snapshot.sourceRevalidation.finalRender.state}, palmier=${snapshot.handoff.palmier.contractVersion}, davinci=${snapshot.handoff.davinci.contractVersion}, productionReady=${snapshot.readiness.productionReady}`);
