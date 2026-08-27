import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const repoRoot=path.resolve(root,"..");
const read=(p)=>fs.readFileSync(path.join(root,p),"utf8");
const readRepo=(p)=>fs.readFileSync(path.join(repoRoot,p),"utf8");
const sync=read("scripts/sync-opening-production-status.mjs");
const generated=read("src/data/openingProductionStatus.generated.ts");
const handoff=read("src/data/openingProductionStatusHandoff.ts");
const card=read("src/components/OpeningProductionStatusHandoffCard.tsx");
const projectStatusSlot=read("src/components/ProfileProductionStatusHandoffCard.tsx");
const productionStatus=readRepo("motion-studio/scripts/opening-v1-production-status.mts");
const finalRenderReview=readRepo("motion-studio/scripts/opening-v1-final-render-review.mts");
const davinciContract=readRepo("motion-studio/scripts/opening-v1-davinci-handoff-contract.mts");
const errors=[];const need=(s,t,m)=>{if(!s.includes(t))errors.push(m)};

for(const t of [
  'opening-v1-production-status.mts',
  'report.stages?.finalRenderReview',
  'report.readiness?.humanFinalRenderApproved',
  'const finalReviewStage=report.stages.finalRenderReview',
  'overallState:report.overallState',
  'nextActions:[...report.nextActions]',
  'opening-v1-palmier-handoff/v2',
  'opening-v1-davinci-handoff-contract.mts',
  'opening-v1-davinci-handoff/v1',
  'productionReady:false',
])need(sync,t,`Opening status sync missing canonical status authority contract ${t}`);
if(sync.includes('execFileSync(process.execPath,["--no-warnings",finalRenderReviewPath'))errors.push('Dashboard must not independently execute Opening final-render review after core production status owns it');
if(sync.includes('DERIVED_FINAL_RENDER_REVIEW_STATUS'))errors.push('Dashboard must not maintain a second derived final-render-review authority');

for(const t of ['opening-v1-final-render-review/v1','HUMAN_FINAL_RENDER_REVIEW','STALE_FINAL_RENDER','STALE_RENDER_SOURCE_FINGERPRINT','REVIEWED_BEFORE_BINDING','macDaVinciActual: \'NOT_RUN\'','productionReady: false'])need(finalRenderReview,t,`Opening final render review missing ${t}`);
for(const t of ['PREVIEW_SOURCE_BINDING_REQUIRED_OR_STALE','const previewSourceBinding: Stage','opening-v1-preview-source-fingerprint.mts','previewSourceBound','PREVIEW_SOURCE_FINGERPRINT_STALE => HUMAN_PREVIEW_REVIEW_NOT_TRUSTED','const finalRenderReview: Stage','opening-v1-final-render-review.mts','FINAL_RENDER_REVIEW_INIT_REQUIRED','HUMAN_FINAL_RENDER_REVIEW_REQUIRED_OR_STALE','BUNDLE_FINAL_REVIEW_SHA_STALE','BUNDLE_FINAL_REVIEW_RENDER_SHA_STALE','humanFinalRenderApproved','HUMAN_PREVIEW_REVIEW_PASS != HUMAN_FINAL_RENDER_REVIEW_PASS','FINAL_RENDER_REVIEW_EVIDENCE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE'])need(productionStatus,t,`Opening production status missing canonical review contract ${t}`);
for(const t of ['opening-v1-davinci-handoff/v1','MOTION_STUDIO_OPENING_DAVINCI_HANDOFF','opening-v1-production-bundle/v1','FINAL_RENDER_BOUND_HANDOFF','FINISHING_AND_OUTPUT_QA','opening-v1-palmier-handoff/v2','opening-v1-davinci-finishing-evidence/v1','MAC_DAVINCI_ACTUAL_EVIDENCE','pnpm opening:davinci-finishing:init','pnpm opening:davinci-finishing:strict','source_render_sha_readback','timeline_insertion','color_finish','audio_finish','watched_with_sound','human_overall_review','DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED','MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED'])need(davinciContract,t,`Opening DaVinci contract missing ${t}`);

for(const t of [
  '"overallState": "MEDIA_REQUIRED"',
  '"finalRenderReview": "motion-studio/scripts/opening-v1-production-status.mts#stages.finalRenderReview"',
  '"finalRenderReview": {',
  '"humanFinalRenderApproved": false',
  '"PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS"',
  '"FINAL_RENDER_OR_SOURCE_CHANGED => FINAL_RENDER_RE_REVIEW_REQUIRED"',
  '"previewSourceBinding": "motion-studio/scripts/opening-v1-preview-source-fingerprint.mts"',
  '"sourceRevalidation": {',
  '"realMediaPreview": {',
  '"previewSourceBound": false',
  '"macDaVinciActualVerified": false',
  '"productionReady": false',
  '"contractVersion": "opening-v1-palmier-handoff/v2"',
  '"contractVersion": "opening-v1-davinci-handoff/v1"',
  '"current": false',
  '"path": "out/opening/opening_v1.mp4"',
  '"expectedSha256": null',
  '"intendedUse": "FINISHING_AND_OUTPUT_QA"',
  '"path": "out/qa/opening-v1-davinci-finishing-evidence.json"',
])need(generated,t,`generated Opening status missing ${t}`);

for(const t of ['wedding-opening-production-status-handoff/v1','sourceRevalidation: openingProductionStatus.sourceRevalidation','PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS','FINAL_RENDER_OR_SOURCE_CHANGED => FINAL_RENDER_RE_REVIEW_REQUIRED','HUMAN_FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED','palmierHandoff: openingProductionStatus.handoff.palmier','davinciHandoff: openingProductionStatus.handoff.davinci','PREVIEW_SOURCE_FINGERPRINT_STALE => HUMAN_PREVIEW_REVIEW_NOT_TRUSTED','DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED','HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT'])need(handoff,t,`Opening handoff envelope missing ${t}`);
for(const t of ['finalRenderReview: "Human final MP4 QA"','production.readiness.humanFinalRenderApproved','const sourceRevalidation = production.sourceRevalidation','SOURCE / HUMAN REVIEW REVALIDATION','sourceRevalidation.realMediaPreview.state','sourceRevalidation.finalRender.state','PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS','FINAL_RENDER_OR_SOURCE_CHANGED','HUMAN_FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED','const palmier = production.palmierHandoff','const davinci = production.davinciHandoff','PALMIER HANDOFF / {palmier.contractVersion}','DAVINCI HANDOFF / {davinci.contractVersion}','davinci.handoffAsset.path','davinci.actualEvidence.path','davinci.actualEvidence.requiredChecks.join'])need(card,t,`Opening status UI missing ${t}`);
for(const t of ['OpeningProductionStatusHandoffCard','projectId === "opening"','<OpeningProductionStatusHandoffCard projectId={projectId} />'])need(projectStatusSlot,t,`Opening status routing missing ${t}`);

if(card.includes('disabled={!productionReady}')||card.includes('disabled={!finalRenderEligible}'))errors.push('Opening status export must remain available while blocked');
if(handoff.includes('productionReady: true')||generated.includes('"macDaVinciActualVerified": true')||generated.includes('"humanFinalRenderApproved": true')||generated.includes('"productionReady": true'))errors.push('Opening export fabricates Human/Actual/production readiness');
if(generated.includes('"current": true'))errors.push('Fresh-clone Opening handoff contracts must not be current');
if(errors.length){console.error(`Opening production-status handoff FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('Opening production-status handoff OK: Dashboard derives final MP4 Human-review state from the canonical Motion Studio production status only, while Motion Zukan export remains fail-closed for Human QA, Mac Actual and production readiness.');
