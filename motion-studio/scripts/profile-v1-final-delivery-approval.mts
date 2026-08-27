import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const bundlePath=join(root,'out/handoff/profile-v1/profile-v1-production-bundle.json');
const finalRenderReviewPath=join(root,'out/qa/profile-v1-final-render-review.json');
const davinciPath=join(root,'out/qa/profile-v1-davinci-finishing-evidence.json');
const approvalPath=join(root,'out/qa/profile-v1-final-delivery-approval.json');
const mode=process.argv.includes('--init')?'init':process.argv.includes('--strict')?'strict':'status';
type Decision='HOLD'|'APPROVE';
type Bundle={schemaVersion:'profile-v1-production-bundle/v1';authority:'FINAL_RENDER_BOUND_HANDOFF';finalRender:{path:string;sha256:string};davinci:{expectedSha256:string;productionReady:false}};
type FinalRenderReview={schemaVersion:'profile-v1-final-render-review/v1';authority:'HUMAN_FINAL_RENDER_REVIEW';finalRender:{path:string;sha256:string};review:{overall:string;reviewer:string|null;reviewedAt:string|null};macDaVinciActual:'NOT_RUN';productionReady:false};
type Davinci={schemaVersion:'profile-v1-davinci-finishing-evidence/v1';authority:'MAC_DAVINCI_ACTUAL_EVIDENCE';sourceRender:{path:string;expectedSha256:string};export:{path:string|null;sha256:string|null;watchedWithSound:string};review:{overall:string;reviewer:string|null;reviewedAt:string|null};productionReady:false};
type Approval={schemaVersion:'profile-v1-final-delivery-approval/v1';authority:'HUMAN_FINAL_DELIVERY_APPROVAL';boundAt:string;productionBundle:{path:string;sha256:string};humanFinalRenderReview:{path:string;sha256:string};davinciEvidence:{path:string;sha256:string};sourceRender:{path:string;sha256:string};davinciExport:{path:string;sha256:string};decision:Decision;approver:string|null;decidedAt:string|null;notes:string;productionReady:boolean};
const sha=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
const rel=(p:string)=>relative(root,p).replaceAll('\\','/');
const run=(script:string,args:string[]=[])=>spawnSync(process.execPath,['--no-warnings',script,...args],{cwd:root,encoding:'utf8'});
function current(){
  if(!existsSync(bundlePath))throw new Error('PROFILE_FINAL_DELIVERY_BUNDLE_MISSING');
  if(!existsSync(finalRenderReviewPath))throw new Error('PROFILE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_MISSING');
  if(!existsSync(davinciPath))throw new Error('PROFILE_FINAL_DELIVERY_DAVINCI_EVIDENCE_MISSING');
  const finalReviewStrict=run('scripts/profile-v1-final-render-review.mts',['--strict']);
  if(finalReviewStrict.status!==0)throw new Error(`PROFILE_FINAL_DELIVERY_HUMAN_FINAL_RENDER_REVIEW_NOT_VERIFIED:${(finalReviewStrict.stdout||finalReviewStrict.stderr||'').trim()}`);
  const strictRun=run('scripts/profile-v1-davinci-finishing-evidence.mts',['--strict']);
  if(strictRun.status!==0)throw new Error('PROFILE_FINAL_DELIVERY_DAVINCI_ACTUAL_NOT_VERIFIED');
  const bundle=JSON.parse(readFileSync(bundlePath,'utf8')) as Bundle;
  const finalReview=JSON.parse(readFileSync(finalRenderReviewPath,'utf8')) as FinalRenderReview;
  const davinci=JSON.parse(readFileSync(davinciPath,'utf8')) as Davinci;
  if(bundle.schemaVersion!=='profile-v1-production-bundle/v1'||bundle.authority!=='FINAL_RENDER_BOUND_HANDOFF'||bundle.davinci.productionReady!==false)throw new Error('PROFILE_FINAL_DELIVERY_BUNDLE_CONTRACT');
  if(finalReview.schemaVersion!=='profile-v1-final-render-review/v1'||finalReview.authority!=='HUMAN_FINAL_RENDER_REVIEW')throw new Error('PROFILE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_CONTRACT');
  if(finalReview.productionReady!==false||finalReview.macDaVinciActual!=='NOT_RUN')throw new Error('PROFILE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_MUST_REMAIN_SEPARATE');
  if(finalReview.review.overall!=='PASS'||!finalReview.review.reviewer?.trim())throw new Error('PROFILE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_NOT_PASS');
  if(finalReview.finalRender.path!==bundle.finalRender.path||finalReview.finalRender.sha256!==bundle.finalRender.sha256)throw new Error('PROFILE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_BINDING_MISMATCH');
  if(davinci.schemaVersion!=='profile-v1-davinci-finishing-evidence/v1'||davinci.authority!=='MAC_DAVINCI_ACTUAL_EVIDENCE'||davinci.productionReady!==false)throw new Error('PROFILE_FINAL_DELIVERY_DAVINCI_CONTRACT');
  if(davinci.sourceRender.expectedSha256!==bundle.finalRender.sha256||!davinci.export.path?.trim()||!davinci.export.sha256?.trim()||davinci.export.watchedWithSound!=='PASS'||davinci.review.overall!=='PASS')throw new Error('PROFILE_FINAL_DELIVERY_DAVINCI_BINDING_NOT_PASS');
  return{bundle,finalReview,davinci,bundleSha:sha(bundlePath),finalRenderReviewSha:sha(finalRenderReviewPath),davinciSha:sha(davinciPath)};
}
function init(){
  const c=current(); const a:Approval={schemaVersion:'profile-v1-final-delivery-approval/v1',authority:'HUMAN_FINAL_DELIVERY_APPROVAL',boundAt:new Date().toISOString(),productionBundle:{path:rel(bundlePath),sha256:c.bundleSha},humanFinalRenderReview:{path:rel(finalRenderReviewPath),sha256:c.finalRenderReviewSha},davinciEvidence:{path:rel(davinciPath),sha256:c.davinciSha},sourceRender:{path:c.bundle.finalRender.path,sha256:c.bundle.finalRender.sha256},davinciExport:{path:c.davinci.export.path!,sha256:c.davinci.export.sha256!},decision:'HOLD',approver:null,decidedAt:null,notes:'',productionReady:false};
  mkdirSync(dirname(approvalPath),{recursive:true}); writeFileSync(approvalPath,`${JSON.stringify(a,null,2)}\n`); console.log(`Profile final delivery approval initialized: ${rel(approvalPath)}`); console.log('decision=HOLD productionReady=false — Human final-MP4 review and DaVinci export are SHA-bound upstream.');
}
function verify(strict:boolean){
  if(!existsSync(approvalPath)){console.log('Profile final delivery approval: NOT_RUN');if(strict)process.exit(1);return;}
  const errors:string[]=[];let c:ReturnType<typeof current>|null=null;try{c=current();}catch(e){errors.push(e instanceof Error?e.message:String(e));}
  let a:Approval|null=null;try{a=JSON.parse(readFileSync(approvalPath,'utf8')) as Approval;}catch{errors.push('PROFILE_FINAL_APPROVAL_INVALID_JSON');}
  if(!a){console.log(`Profile final delivery approval: HOLD/BLOCKED (${errors.length})`);for(const e of errors)console.log(`BLOCK / ${e}`);if(strict)process.exit(1);return;}
  if(a.schemaVersion!=='profile-v1-final-delivery-approval/v1'||a.authority!=='HUMAN_FINAL_DELIVERY_APPROVAL')errors.push('PROFILE_FINAL_APPROVAL_CONTRACT');
  if(a.productionBundle.path!==rel(bundlePath))errors.push('PROFILE_FINAL_APPROVAL_BUNDLE_PATH');
  if(a.humanFinalRenderReview.path!==rel(finalRenderReviewPath))errors.push('PROFILE_FINAL_APPROVAL_FINAL_RENDER_REVIEW_PATH');
  if(a.davinciEvidence.path!==rel(davinciPath))errors.push('PROFILE_FINAL_APPROVAL_DAVINCI_EVIDENCE_PATH');
  if(c){if(a.productionBundle.sha256!==c.bundleSha)errors.push('STALE_PROFILE_FINAL_BUNDLE');if(a.humanFinalRenderReview.sha256!==c.finalRenderReviewSha)errors.push('STALE_PROFILE_FINAL_RENDER_REVIEW');if(a.davinciEvidence.sha256!==c.davinciSha)errors.push('STALE_PROFILE_FINAL_DAVINCI_EVIDENCE');if(a.sourceRender.path!==c.bundle.finalRender.path||a.sourceRender.sha256!==c.bundle.finalRender.sha256)errors.push('STALE_PROFILE_FINAL_SOURCE');if(a.davinciExport.path!==c.davinci.export.path||a.davinciExport.sha256!==c.davinci.export.sha256)errors.push('STALE_PROFILE_FINAL_EXPORT');}
  const boundAtMs=Date.parse(a.boundAt);const decidedAtMs=a.decidedAt?Date.parse(a.decidedAt):Number.NaN;
  if(!a.boundAt||Number.isNaN(boundAtMs))errors.push('PROFILE_FINAL_BOUND_AT_INVALID');
  if(a.decision!=='APPROVE')errors.push(`PROFILE_FINAL_DECISION_${a.decision}`);if(!a.approver?.trim())errors.push('PROFILE_FINAL_APPROVER_MISSING');if(!a.decidedAt||Number.isNaN(decidedAtMs))errors.push('PROFILE_FINAL_DECIDED_AT_INVALID');else if(!Number.isNaN(boundAtMs)&&decidedAtMs<boundAtMs)errors.push('PROFILE_FINAL_DECIDED_BEFORE_BINDING');if(a.productionReady!==(a.decision==='APPROVE'))errors.push('PROFILE_FINAL_PRODUCTION_READY_MISMATCH');
  if(errors.length){console.log(`Profile final delivery approval: HOLD/BLOCKED (${errors.length})`);for(const e of errors)console.log(`BLOCK / ${e}`);if(strict)process.exit(1);return;}console.log('Profile final delivery approval: APPROVED — current Human final-MP4 review and DaVinci export are explicitly bound to this approval.');
}
if(mode==='init')init();else verify(mode==='strict');
