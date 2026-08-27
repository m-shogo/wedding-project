import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(p)=>fs.readFileSync(path.join(root,p),"utf8");
const sync=read("scripts/sync-opening-production-status.mjs");
const generated=read("src/data/openingProductionStatus.generated.ts");
const handoff=read("src/data/openingProductionStatusHandoff.ts");
const card=read("src/components/OpeningProductionStatusHandoffCard.tsx");
const projectStatusSlot=read("src/components/ProfileProductionStatusHandoffCard.tsx");
const errors=[];const need=(s,t,m)=>{if(!s.includes(t))errors.push(m)};
for(const t of ['opening-v1-production-status.mts','opening-v1-production-status/v1','DERIVED_PRODUCTION_STATUS','opening-v1-palmier-handoff/v2','report.handoff.palmier.contractVersion','openingProductionStatus.generated.ts','productionReady','nextActions'])need(sync,t,`Opening status sync missing ${t}`);
for(const t of [
  '"overallState": "MEDIA_REQUIRED"','"media": {','"previewRender": {','"previewReview": {','"finalRender": {','"productionBundle": {','"davinciFinishing": {','"finalDeliveryApproval": {','"state": "BLOCKED"','"state": "NOT_RUN"','"macDaVinciActualVerified": false','"finalDeliveryApproved": false','"productionReady": false',
  '"handoff": {','"palmier": {','"contractVersion": "opening-v1-palmier-handoff/v2"','"current": false','"src/data/openingV1.ts#openingV1Scenes"','"src/data/openingV1Sound.ts#openingV1SoundCues"','"path": "out/handoff/opening-v1/opening-v1-palmier-timeline.csv"','"replacement_policy"','"path": "out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv"','"ambience_j_cut"','"shaBound": true',
  '"nextActions": [','"pnpm sync:photos"','"pnpm opening:assembly-preflight"'
])need(generated,t,`generated Opening status missing ${t}`);
for(const t of ['wedding-opening-production-status-handoff/v1','MOTION_STUDIO_DERIVED_OPENING_STATUS_HANDOFF','openingProductionGate.expectedPhotoCount','openingProductionGate.photoSlots.map','preferredFileStem: slot.key','intakeDirectory: "motion-studio/public/photos/opening/"','openingProductionGate.bgm','openingProductionStatus.overallState','openingProductionStatus.stages','openingProductionStatus.readiness','palmierHandoff: openingProductionStatus.handoff.palmier','openingProductionStatus.nextActions','nextActions: [...openingProductionStatus.nextActions]','STATUS_EXPORTABLE != FINAL_RENDER_ELIGIBLE','DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED','MEDIA_REQUIREMENT_EXPORTED != MEDIA_RESOLVED','HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT','NEXT_ACTION_EXPORTED != ACTION_COMPLETED'])need(handoff,t,`Opening handoff envelope missing ${t}`);
for(const t of ['buildOpeningProductionStatusHandoff()','buildOpeningProductionStatusHandoffJson()','projectId !== "opening"','Opening production statusを書き出す','opening-production-status-handoff.json','production.overallState','production.readiness.productionReady','production.readiness.macDaVinciActualVerified','Object.entries(production.stages)','const palmier = production.palmierHandoff','PALMIER HANDOFF / {palmier.contractVersion}','palmier.artifacts.sceneTimeline.path','palmier.artifacts.sceneTimeline.carries.join','palmier.artifacts.soundCues.path','palmier.artifacts.soundCues.carries.join','artifacts={palmier.current ? "CURRENT" : "NOT_EXPORTED_OR_STALE"}','HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT','NEXT ACTIONS','production.nextActions.map','MEDIA_REQUIRED / NOT_RUNも含めて現在状態とPalmier handoff contractを外へ渡す','NEXT_ACTION_EXPORTED != ACTION_COMPLETED'])need(card,t,`Opening status UI missing ${t}`);
for(const t of ['OpeningProductionStatusHandoffCard','projectId === "opening"','<OpeningProductionStatusHandoffCard projectId={projectId} />'])need(projectStatusSlot,t,`Existing project production-status slot does not route Opening status: ${t}`);
if(card.includes('disabled={!productionReady}')||card.includes('disabled={!finalRenderEligible}'))errors.push('Opening status export must remain available while blocked');
if(handoff.includes('resolved: true')||handoff.includes('productionReady: true'))errors.push('Opening handoff must not fabricate resolved media or production readiness');
if(generated.includes('"macDaVinciActualVerified": true'))errors.push('Dashboard snapshot fabricates Mac DaVinci Actual');
if(generated.includes('"productionReady": true'))errors.push('Dashboard snapshot fabricates production readiness');
if(generated.includes('"current": true'))errors.push('Fresh-clone Dashboard snapshot must not fabricate current Palmier artifacts');
if(errors.length){console.error(`Opening production-status handoff FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('Opening production-status handoff OK: Motion Studio state, 11-slot intake requirements, versioned Palmier scene/sound handoff metadata and executable next actions reach the Motion Zukan UI/export while unresolved artifacts and Mac/production readiness remain fail-closed.');
