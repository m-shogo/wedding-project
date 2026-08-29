import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {profileV1GeneratedAccentImplementations} from '../src/data/profileV1GeneratedAccentRegistry.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(root, 'out/handoff/profile-v1/profile-v1-production-bundle.json');
const recoveryPath = join(root, 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json');
const timelinePath = join(root, 'out/handoff/profile-v1/profile-v1-palmier-timeline.csv');
const realMediaReviewPath = join(root, 'out/qa/profile-v1-real-media-review.json');
const finalReviewPath = join(root, 'out/qa/profile-v1-final-render-review.json');
const evidencePath = join(root, 'out/qa/profile-v1-davinci-finishing-evidence.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';
type Qa = 'NOT_RUN' | 'PASS' | 'FAIL';
type GeneratedAccentRoute = {slotId:string;chapterId:string;implementation:string;canonicalReuse:string};
type Bundle = {
  schemaVersion:'profile-v1-production-bundle/v1';
  authority:'FINAL_RENDER_BOUND_HANDOFF';
  finalRender:{path:string;sha256:string};
  humanFinalRenderReview:{evidencePath:string;evidenceSha256:string};
  realMediaHumanQa:{evidencePath:string;evidenceSha256:string;bindingFingerprintSha256:string;previewSourceFingerprintSha256:string;canonicalPlanFingerprint:string};
  upstreamHumanEvidence:{realMediaReviewSha256:string;realMediaReviewBindingFingerprintSha256:string;structureReviewSha256:string;bgmRightsApprovalSha256:string};
  generatedAccents:GeneratedAccentRoute[];
  palmier:{timelineCsv:string;timelineCsvSha256:string;generatedAccentAuthority:string;realMediaHumanQaBindingFingerprintSha256:string};
  davinci:{expectedSha256:string;generatedAccentRoutes:GeneratedAccentRoute[];expectedRealMediaHumanQaEvidenceSha256:string;expectedRealMediaHumanQaBindingFingerprintSha256:string;productionReady:false};
};
type RecoverySidecar = {
  schemaVersion:'wedding-davinci-production-recovery-export/v1';
  authority:'FINAL_RENDER_BOUND_DAVINCI_RECOVERY';
  sourceBundle:{
    path:string;
    schemaVersion:string;
    finalRenderPath:string;
    finalRenderSha256:string;
    realMediaHumanQaEvidencePath:string;
    realMediaHumanQaEvidenceSha256:string;
    realMediaHumanQaBindingFingerprintSha256:string;
    realMediaHumanQaPreviewSourceFingerprintSha256:string;
    realMediaHumanQaCanonicalPlanFingerprint:string;
  };
  recovery:{movieId:string;stage:string;artifactPath:string;productionReady:false;actual:{state:string;evidencePath:string};bridge:{macDaVinciActualVerified:boolean;finalDeliveryApproved:boolean}};
};
type Evidence = {
  schemaVersion:'profile-v1-davinci-finishing-evidence/v1'; authority:'MAC_DAVINCI_ACTUAL_EVIDENCE'; boundAt:string;
  bundle:{path:string;sha256:string};
  productionRecovery:{path:string;sha256:string;sourceRenderSha256:string;realMediaHumanQaEvidenceSha256:string;realMediaHumanQaBindingFingerprintSha256:string};
  sourceRender:{path:string;expectedSha256:string;readbackSha256:string|null;shaMatch:Qa};
  resolve:{version:string|null;projectName:string|null;timelineName:string|null;timelineInsertion:Qa;durationAndFps:Qa};
  finishing:{color:Qa;audio:Qa;titleSafeAndFraming:Qa;playback1x:Qa;playbackHalfSpeed:Qa};
  export:{path:string|null;sha256:string|null;duration:Qa;dimensions:Qa;fps:Qa;audioPresent:Qa;watchedWithSound:Qa};
  review:{overall:Qa;reviewer:string|null;reviewedAt:string|null;notes:string}; productionReady:false;
};
const sha=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
const rel=(p:string)=>relative(root,p).replaceAll('\\','/');
const accentSignature=(value:GeneratedAccentRoute)=>`${value.slotId}|${value.chapterId}|${value.implementation}|${value.canonicalReuse}`;
const expectedAccentRoutes=profileV1GeneratedAccentImplementations.map(accentSignature).sort();
const sameAccentRoutes=(routes:GeneratedAccentRoute[]|undefined)=>Array.isArray(routes)&&JSON.stringify(routes.map(accentSignature).sort())===JSON.stringify(expectedAccentRoutes);
const runRealMediaReviewStrict=()=>spawnSync(process.execPath,['--no-warnings','scripts/profile-v1-real-media-review.mts','--strict'],{cwd:root,encoding:'utf8'});
function loadBundle(){
  if(!existsSync(bundlePath)) throw new Error('PROFILE_DAVINCI_BUNDLE_MISSING');
  const bundle=JSON.parse(readFileSync(bundlePath,'utf8')) as Bundle;
  if(bundle.schemaVersion!=='profile-v1-production-bundle/v1'||bundle.authority!=='FINAL_RENDER_BOUND_HANDOFF') throw new Error('PROFILE_DAVINCI_BUNDLE_CONTRACT');
  if(bundle.davinci.productionReady!==false||bundle.finalRender.sha256!==bundle.davinci.expectedSha256) throw new Error('PROFILE_DAVINCI_BUNDLE_SHA_CONTRACT');

  if(!existsSync(realMediaReviewPath)) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_REVIEW_MISSING');
  const currentRealMediaReviewSha=sha(realMediaReviewPath);
  if(bundle.upstreamHumanEvidence?.realMediaReviewSha256!==currentRealMediaReviewSha) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_REVIEW_SHA_MISMATCH');
  let realMediaReview:any;
  try{realMediaReview=JSON.parse(readFileSync(realMediaReviewPath,'utf8'));}catch{throw new Error('PROFILE_DAVINCI_REAL_MEDIA_REVIEW_INVALID_JSON');}
  if(realMediaReview.schemaVersion!=='profile-v1-real-media-review/v1'||realMediaReview.authority!=='HUMAN_REAL_MEDIA_PREVIEW_REVIEW') throw new Error('PROFILE_DAVINCI_REAL_MEDIA_REVIEW_CONTRACT');
  if(realMediaReview.macDaVinciActual!=='NOT_RUN'||realMediaReview.productionReady!==false) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_REVIEW_BOUNDARY_INVALID');
  if(bundle.realMediaHumanQa?.evidencePath!==rel(realMediaReviewPath)||bundle.realMediaHumanQa?.evidenceSha256!==currentRealMediaReviewSha) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_BINDING_STALE');
  if(!bundle.realMediaHumanQa?.bindingFingerprintSha256||bundle.upstreamHumanEvidence?.realMediaReviewBindingFingerprintSha256!==bundle.realMediaHumanQa.bindingFingerprintSha256) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE');
  if(bundle.realMediaHumanQa.previewSourceFingerprintSha256!==realMediaReview.previewSourceFingerprintSha256||bundle.realMediaHumanQa.canonicalPlanFingerprint!==realMediaReview.canonicalPlanFingerprint) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_SOURCE_STALE');
  if(bundle.palmier?.realMediaHumanQaBindingFingerprintSha256!==bundle.realMediaHumanQa.bindingFingerprintSha256||bundle.davinci?.expectedRealMediaHumanQaEvidenceSha256!==currentRealMediaReviewSha||bundle.davinci?.expectedRealMediaHumanQaBindingFingerprintSha256!==bundle.realMediaHumanQa.bindingFingerprintSha256) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_HANDOFF_STALE');
  const realMediaStrict=runRealMediaReviewStrict();
  if(realMediaStrict.status!==0) throw new Error('PROFILE_DAVINCI_REAL_MEDIA_REVIEW_NOT_CURRENT_PASS');

  if(!existsSync(finalReviewPath)) throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_MISSING');
  if(bundle.humanFinalRenderReview?.evidencePath!==rel(finalReviewPath)) throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_PATH_MISMATCH');
  if(bundle.humanFinalRenderReview?.evidenceSha256!==sha(finalReviewPath)) throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_SHA_MISMATCH');
  let finalReview:any;
  try{finalReview=JSON.parse(readFileSync(finalReviewPath,'utf8'));}catch{throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_INVALID_JSON');}
  if(finalReview.schemaVersion!=='profile-v1-final-render-review/v1'||finalReview.authority!=='HUMAN_FINAL_RENDER_REVIEW') throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_CONTRACT');
  if(finalReview.review?.overall!=='PASS'||!finalReview.review?.reviewer?.trim()) throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_NOT_PASS');
  if(finalReview.finalRender?.path!==bundle.finalRender.path||finalReview.finalRender?.sha256!==bundle.finalRender.sha256) throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_BINDING_STALE');
  if(finalReview.macDaVinciActual!=='NOT_RUN'||finalReview.productionReady!==false) throw new Error('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_BOUNDARY_INVALID');

  if(!sameAccentRoutes(bundle.generatedAccents)) throw new Error('PROFILE_DAVINCI_GENERATED_ACCENT_ROUTES_STALE');
  if(bundle.palmier?.generatedAccentAuthority!=='PROFILE_V1_GENERATED_ACCENT_REGISTRY') throw new Error('PROFILE_DAVINCI_PALMIER_ACCENT_AUTHORITY_MISSING');
  if(!sameAccentRoutes(bundle.davinci?.generatedAccentRoutes)) throw new Error('PROFILE_DAVINCI_DAVINCI_ACCENT_ROUTES_STALE');
  if(bundle.palmier?.timelineCsv!==rel(timelinePath)) throw new Error('PROFILE_DAVINCI_PALMIER_TIMELINE_PATH_MISMATCH');
  if(!existsSync(timelinePath)) throw new Error('PROFILE_DAVINCI_PALMIER_TIMELINE_MISSING');
  if(bundle.palmier?.timelineCsvSha256!==sha(timelinePath)) throw new Error('PROFILE_DAVINCI_PALMIER_TIMELINE_SHA_MISMATCH');
  const source=join(root,bundle.finalRender.path);
  if(!existsSync(source)||sha(source)!==bundle.finalRender.sha256) throw new Error('PROFILE_DAVINCI_SOURCE_RENDER_STALE');

  if(!existsSync(recoveryPath)) throw new Error('PROFILE_DAVINCI_RECOVERY_SIDECAR_MISSING');
  let recovery:RecoverySidecar;
  try{recovery=JSON.parse(readFileSync(recoveryPath,'utf8')) as RecoverySidecar;}catch{throw new Error('PROFILE_DAVINCI_RECOVERY_SIDECAR_INVALID_JSON');}
  if(recovery.schemaVersion!=='wedding-davinci-production-recovery-export/v1'||recovery.authority!=='FINAL_RENDER_BOUND_DAVINCI_RECOVERY') throw new Error('PROFILE_DAVINCI_RECOVERY_SIDECAR_CONTRACT');
  if(recovery.sourceBundle?.path!==rel(bundlePath)||recovery.sourceBundle?.schemaVersion!==bundle.schemaVersion) throw new Error('PROFILE_DAVINCI_RECOVERY_BUNDLE_STALE');
  if(recovery.sourceBundle?.finalRenderPath!==bundle.finalRender.path||recovery.sourceBundle?.finalRenderSha256!==bundle.finalRender.sha256) throw new Error('PROFILE_DAVINCI_RECOVERY_RENDER_STALE');
  if(recovery.sourceBundle?.realMediaHumanQaEvidencePath!==bundle.realMediaHumanQa.evidencePath||recovery.sourceBundle?.realMediaHumanQaEvidenceSha256!==bundle.realMediaHumanQa.evidenceSha256) throw new Error('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_SHA_STALE');
  if(recovery.sourceBundle?.realMediaHumanQaBindingFingerprintSha256!==bundle.realMediaHumanQa.bindingFingerprintSha256||recovery.sourceBundle?.realMediaHumanQaPreviewSourceFingerprintSha256!==bundle.realMediaHumanQa.previewSourceFingerprintSha256||recovery.sourceBundle?.realMediaHumanQaCanonicalPlanFingerprint!==bundle.realMediaHumanQa.canonicalPlanFingerprint) throw new Error('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE');
  if(recovery.recovery?.movieId!=='profile'||recovery.recovery?.stage!=='davinciFinishing'||recovery.recovery?.artifactPath!==bundle.finalRender.path) throw new Error('PROFILE_DAVINCI_RECOVERY_TARGET_STALE');
  if(recovery.recovery?.productionReady!==false||recovery.recovery?.actual?.state!=='NOT_RUN'||recovery.recovery?.bridge?.macDaVinciActualVerified!==false||recovery.recovery?.bridge?.finalDeliveryApproved!==false) throw new Error('PROFILE_DAVINCI_RECOVERY_MUST_PRECEDE_ACTUAL');
  if(recovery.recovery?.actual?.evidencePath!==rel(evidencePath)) throw new Error('PROFILE_DAVINCI_RECOVERY_EVIDENCE_PATH_STALE');
  return {bundle,bundleSha256:sha(bundlePath),source,recovery,recoverySha256:sha(recoveryPath)};
}
function init(){
  const {bundle,bundleSha256,recovery,recoverySha256}=loadBundle();
  const evidence:Evidence={schemaVersion:'profile-v1-davinci-finishing-evidence/v1',authority:'MAC_DAVINCI_ACTUAL_EVIDENCE',boundAt:new Date().toISOString(),bundle:{path:rel(bundlePath),sha256:bundleSha256},productionRecovery:{path:rel(recoveryPath),sha256:recoverySha256,sourceRenderSha256:recovery.sourceBundle.finalRenderSha256,realMediaHumanQaEvidenceSha256:recovery.sourceBundle.realMediaHumanQaEvidenceSha256,realMediaHumanQaBindingFingerprintSha256:recovery.sourceBundle.realMediaHumanQaBindingFingerprintSha256},sourceRender:{path:bundle.finalRender.path,expectedSha256:bundle.finalRender.sha256,readbackSha256:null,shaMatch:'NOT_RUN'},resolve:{version:null,projectName:null,timelineName:null,timelineInsertion:'NOT_RUN',durationAndFps:'NOT_RUN'},finishing:{color:'NOT_RUN',audio:'NOT_RUN',titleSafeAndFraming:'NOT_RUN',playback1x:'NOT_RUN',playbackHalfSpeed:'NOT_RUN'},export:{path:null,sha256:null,duration:'NOT_RUN',dimensions:'NOT_RUN',fps:'NOT_RUN',audioPresent:'NOT_RUN',watchedWithSound:'NOT_RUN'},review:{overall:'NOT_RUN',reviewer:null,reviewedAt:null,notes:''},productionReady:false};
  mkdirSync(dirname(evidencePath),{recursive:true}); writeFileSync(evidencePath,`${JSON.stringify(evidence,null,2)}\n`);
  console.log(`Profile DaVinci finishing evidence initialized: ${rel(evidencePath)}`); console.log('All Mac GUI Actual verdicts remain NOT_RUN. Current Human real-media QA + current DaVinci recovery sidecar were required before this template could be created.');
}
function verify(strict:boolean){
  if(!existsSync(evidencePath)){console.log('Profile DaVinci finishing evidence: NOT_RUN'); if(strict)process.exit(1); return;}
  const errors:string[]=[]; let loaded:ReturnType<typeof loadBundle>|null=null;
  try{loaded=loadBundle();}catch(e){errors.push(e instanceof Error?e.message:String(e));}
  let ev:Evidence|null=null;
  try{ev=JSON.parse(readFileSync(evidencePath,'utf8')) as Evidence;}catch{errors.push('PROFILE_DAVINCI_EVIDENCE_INVALID_JSON');}
  if(!ev){console.log(`Profile DaVinci finishing evidence: BLOCKED (${errors.length})`);for(const e of errors)console.log(`BLOCK / ${e}`);if(strict)process.exit(1);return;}
  if(ev.schemaVersion!=='profile-v1-davinci-finishing-evidence/v1'||ev.authority!=='MAC_DAVINCI_ACTUAL_EVIDENCE')errors.push('PROFILE_DAVINCI_EVIDENCE_CONTRACT');
  if(ev.productionReady!==false)errors.push('PROFILE_DAVINCI_MUST_NOT_SELF_PROMOTE');
  const boundAtMs=Date.parse(ev.boundAt);
  if(!ev.boundAt||Number.isNaN(boundAtMs))errors.push('PROFILE_DAVINCI_BOUND_AT_INVALID');
  if(loaded){
    if(ev.bundle.path!==rel(bundlePath))errors.push('STALE_PROFILE_DAVINCI_BUNDLE_PATH');
    if(ev.bundle.sha256!==loaded.bundleSha256)errors.push('STALE_PROFILE_DAVINCI_BUNDLE');
    if(ev.productionRecovery?.path!==rel(recoveryPath))errors.push('STALE_PROFILE_DAVINCI_RECOVERY_PATH');
    if(ev.productionRecovery?.sha256!==loaded.recoverySha256)errors.push('STALE_PROFILE_DAVINCI_RECOVERY_SIDECAR');
    if(ev.productionRecovery?.sourceRenderSha256!==loaded.recovery.sourceBundle.finalRenderSha256)errors.push('STALE_PROFILE_DAVINCI_RECOVERY_RENDER_SHA');
    if(ev.productionRecovery?.realMediaHumanQaEvidenceSha256!==loaded.recovery.sourceBundle.realMediaHumanQaEvidenceSha256)errors.push('STALE_PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_SHA');
    if(ev.productionRecovery?.realMediaHumanQaBindingFingerprintSha256!==loaded.recovery.sourceBundle.realMediaHumanQaBindingFingerprintSha256)errors.push('STALE_PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_FINGERPRINT');
    if(ev.sourceRender.path!==loaded.bundle.finalRender.path)errors.push('STALE_PROFILE_DAVINCI_SOURCE_PATH');
    if(ev.sourceRender.expectedSha256!==loaded.bundle.finalRender.sha256)errors.push('STALE_PROFILE_DAVINCI_SOURCE_SHA');
  }
  if(ev.sourceRender.shaMatch!=='PASS'||!ev.sourceRender.readbackSha256||ev.sourceRender.readbackSha256!==ev.sourceRender.expectedSha256)errors.push('PROFILE_DAVINCI_SOURCE_READBACK_NOT_PASS');
  if(!ev.resolve.version?.trim()||!ev.resolve.projectName?.trim()||!ev.resolve.timelineName?.trim())errors.push('PROFILE_DAVINCI_RESOLVE_METADATA_MISSING');
  for(const [k,v] of Object.entries({...ev.resolve,...ev.finishing,duration:ev.export.duration,dimensions:ev.export.dimensions,fps:ev.export.fps,audioPresent:ev.export.audioPresent,watchedWithSound:ev.export.watchedWithSound})) if(['timelineInsertion','durationAndFps','color','audio','titleSafeAndFraming','playback1x','playbackHalfSpeed','duration','dimensions','fps','audioPresent','watchedWithSound'].includes(k)&&v!=='PASS')errors.push(`PROFILE_DAVINCI_${k}_${v}`);
  if(!ev.export.path?.trim()||!ev.export.sha256?.trim())errors.push('PROFILE_DAVINCI_EXPORT_BINDING_MISSING');
  if(ev.export.path?.trim()&&ev.export.sha256?.trim()){
    const exportPath=join(root,ev.export.path);
    if(!existsSync(exportPath))errors.push('PROFILE_DAVINCI_EXPORT_FILE_MISSING');
    else if(sha(exportPath)!==ev.export.sha256)errors.push('PROFILE_DAVINCI_EXPORT_SHA_MISMATCH');
  }
  const reviewedAtMs=ev.review.reviewedAt?Date.parse(ev.review.reviewedAt):Number.NaN;
  if(ev.review.overall!=='PASS'||!ev.review.reviewer?.trim()||!ev.review.reviewedAt||Number.isNaN(reviewedAtMs))errors.push('PROFILE_DAVINCI_HUMAN_REVIEW_NOT_PASS');
  else if(!Number.isNaN(boundAtMs)&&reviewedAtMs<boundAtMs)errors.push('PROFILE_DAVINCI_REVIEWED_BEFORE_BINDING');
  if(errors.length){console.log(`Profile DaVinci finishing evidence: BLOCKED (${errors.length})`); for(const e of errors)console.log(`BLOCK / ${e}`); if(strict)process.exit(1); return;}
  console.log('Profile DaVinci finishing evidence: ACTUAL_VERIFIED — current Human real-media QA, current DaVinci recovery sidecar, Human final-render review, canonical Motion Zukan accent routes, bundle/source, Palmier timeline and exported movie bytes match real Mac Resolve evidence.');
}
if(mode==='init')init();else verify(mode==='strict');
