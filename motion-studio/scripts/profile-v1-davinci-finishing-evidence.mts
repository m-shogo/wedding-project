import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(root, 'out/handoff/profile-v1/profile-v1-production-bundle.json');
const timelinePath = join(root, 'out/handoff/profile-v1/profile-v1-palmier-timeline.csv');
const evidencePath = join(root, 'out/qa/profile-v1-davinci-finishing-evidence.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';
type Qa = 'NOT_RUN' | 'PASS' | 'FAIL';
type Bundle = {
  schemaVersion:'profile-v1-production-bundle/v1';
  authority:'FINAL_RENDER_BOUND_HANDOFF';
  finalRender:{path:string;sha256:string};
  palmier:{timelineCsv:string;timelineCsvSha256:string};
  davinci:{expectedSha256:string;productionReady:false};
};
type Evidence = {
  schemaVersion:'profile-v1-davinci-finishing-evidence/v1'; authority:'MAC_DAVINCI_ACTUAL_EVIDENCE'; boundAt:string;
  bundle:{path:string;sha256:string}; sourceRender:{path:string;expectedSha256:string;readbackSha256:string|null;shaMatch:Qa};
  resolve:{version:string|null;projectName:string|null;timelineName:string|null;timelineInsertion:Qa;durationAndFps:Qa};
  finishing:{color:Qa;audio:Qa;titleSafeAndFraming:Qa;playback1x:Qa;playbackHalfSpeed:Qa};
  export:{path:string|null;sha256:string|null;duration:Qa;dimensions:Qa;fps:Qa;audioPresent:Qa;watchedWithSound:Qa};
  review:{overall:Qa;reviewer:string|null;reviewedAt:string|null;notes:string}; productionReady:false;
};
const sha=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
const rel=(p:string)=>relative(root,p).replaceAll('\\','/');
function loadBundle(){
  if(!existsSync(bundlePath)) throw new Error('PROFILE_DAVINCI_BUNDLE_MISSING');
  const bundle=JSON.parse(readFileSync(bundlePath,'utf8')) as Bundle;
  if(bundle.schemaVersion!=='profile-v1-production-bundle/v1'||bundle.authority!=='FINAL_RENDER_BOUND_HANDOFF') throw new Error('PROFILE_DAVINCI_BUNDLE_CONTRACT');
  if(bundle.davinci.productionReady!==false||bundle.finalRender.sha256!==bundle.davinci.expectedSha256) throw new Error('PROFILE_DAVINCI_BUNDLE_SHA_CONTRACT');
  if(bundle.palmier?.timelineCsv!==rel(timelinePath)) throw new Error('PROFILE_DAVINCI_PALMIER_TIMELINE_PATH_MISMATCH');
  if(!existsSync(timelinePath)) throw new Error('PROFILE_DAVINCI_PALMIER_TIMELINE_MISSING');
  if(bundle.palmier?.timelineCsvSha256!==sha(timelinePath)) throw new Error('PROFILE_DAVINCI_PALMIER_TIMELINE_SHA_MISMATCH');
  const source=join(root,bundle.finalRender.path);
  if(!existsSync(source)||sha(source)!==bundle.finalRender.sha256) throw new Error('PROFILE_DAVINCI_SOURCE_RENDER_STALE');
  return {bundle,bundleSha256:sha(bundlePath),source};
}
function init(){
  const {bundle,bundleSha256}=loadBundle();
  const evidence:Evidence={schemaVersion:'profile-v1-davinci-finishing-evidence/v1',authority:'MAC_DAVINCI_ACTUAL_EVIDENCE',boundAt:new Date().toISOString(),bundle:{path:rel(bundlePath),sha256:bundleSha256},sourceRender:{path:bundle.finalRender.path,expectedSha256:bundle.finalRender.sha256,readbackSha256:null,shaMatch:'NOT_RUN'},resolve:{version:null,projectName:null,timelineName:null,timelineInsertion:'NOT_RUN',durationAndFps:'NOT_RUN'},finishing:{color:'NOT_RUN',audio:'NOT_RUN',titleSafeAndFraming:'NOT_RUN',playback1x:'NOT_RUN',playbackHalfSpeed:'NOT_RUN'},export:{path:null,sha256:null,duration:'NOT_RUN',dimensions:'NOT_RUN',fps:'NOT_RUN',audioPresent:'NOT_RUN',watchedWithSound:'NOT_RUN'},review:{overall:'NOT_RUN',reviewer:null,reviewedAt:null,notes:''},productionReady:false};
  mkdirSync(dirname(evidencePath),{recursive:true}); writeFileSync(evidencePath,`${JSON.stringify(evidence,null,2)}\n`);
  console.log(`Profile DaVinci finishing evidence initialized: ${rel(evidencePath)}`); console.log('All Mac GUI Actual verdicts remain NOT_RUN.');
}
function verify(strict:boolean){
  if(!existsSync(evidencePath)){console.log('Profile DaVinci finishing evidence: NOT_RUN'); if(strict)process.exit(1); return;}
  const errors:string[]=[]; let loaded:ReturnType<typeof loadBundle>|null=null;
  try{loaded=loadBundle();}catch(e){errors.push(e instanceof Error?e.message:String(e));}
  const ev=JSON.parse(readFileSync(evidencePath,'utf8')) as Evidence;
  if(ev.schemaVersion!=='profile-v1-davinci-finishing-evidence/v1'||ev.authority!=='MAC_DAVINCI_ACTUAL_EVIDENCE')errors.push('PROFILE_DAVINCI_EVIDENCE_CONTRACT');
  if(ev.productionReady!==false)errors.push('PROFILE_DAVINCI_MUST_NOT_SELF_PROMOTE');
  if(loaded){if(ev.bundle.sha256!==loaded.bundleSha256)errors.push('STALE_PROFILE_DAVINCI_BUNDLE'); if(ev.sourceRender.expectedSha256!==loaded.bundle.finalRender.sha256)errors.push('STALE_PROFILE_DAVINCI_SOURCE_SHA');}
  if(ev.sourceRender.shaMatch!=='PASS'||!ev.sourceRender.readbackSha256||ev.sourceRender.readbackSha256!==ev.sourceRender.expectedSha256)errors.push('PROFILE_DAVINCI_SOURCE_READBACK_NOT_PASS');
  if(!ev.resolve.version?.trim()||!ev.resolve.projectName?.trim()||!ev.resolve.timelineName?.trim())errors.push('PROFILE_DAVINCI_RESOLVE_METADATA_MISSING');
  for(const [k,v] of Object.entries({...ev.resolve,...ev.finishing,duration:ev.export.duration,dimensions:ev.export.dimensions,fps:ev.export.fps,audioPresent:ev.export.audioPresent,watchedWithSound:ev.export.watchedWithSound})) if(['timelineInsertion','durationAndFps','color','audio','titleSafeAndFraming','playback1x','playbackHalfSpeed','duration','dimensions','fps','audioPresent','watchedWithSound'].includes(k)&&v!=='PASS')errors.push(`PROFILE_DAVINCI_${k}_${v}`);
  if(!ev.export.path?.trim()||!ev.export.sha256?.trim())errors.push('PROFILE_DAVINCI_EXPORT_BINDING_MISSING');
  if(ev.review.overall!=='PASS'||!ev.review.reviewer?.trim()||!ev.review.reviewedAt||Number.isNaN(Date.parse(ev.review.reviewedAt)))errors.push('PROFILE_DAVINCI_HUMAN_REVIEW_NOT_PASS');
  if(errors.length){console.log(`Profile DaVinci finishing evidence: BLOCKED (${errors.length})`); for(const e of errors)console.log(`BLOCK / ${e}`); if(strict)process.exit(1); return;}
  console.log('Profile DaVinci finishing evidence: ACTUAL_VERIFIED — current bundle/source/Palmier timeline match real Mac Resolve evidence.');
}
if(mode==='init')init();else verify(mode==='strict');
