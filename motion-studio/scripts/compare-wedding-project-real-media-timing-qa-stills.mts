import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";

function arg(name:string){const prefix=`--${name}=`;const value=process.argv.find((item)=>item.startsWith(prefix));return value?value.slice(prefix.length):null;}
function flag(name:string){return process.argv.includes(`--${name}`);}
function fail(code:string,detail?:string):never{console.error(`${code}${detail?`: ${detail}`:""}`);process.exit(1);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function load(path:string){if(!existsSync(path))fail("REAL_MEDIA_TIMING_COMPARE_FILE_NOT_FOUND",path);try{return JSON.parse(readFileSync(path,"utf8"));}catch{fail("REAL_MEDIA_TIMING_COMPARE_JSON_INVALID",path);}}
function timingKey(value:any){return JSON.stringify({targetDurationSeconds:value?.targetDurationSeconds,computedDurationSeconds:value?.computedDurationSeconds,durationFrames:value?.durationFrames,fps:value?.fps,revision:value?.revision});}
function framingKey(value:any){return JSON.stringify({fit:value?.fit,focusX:value?.focusX,focusY:value?.focusY,scale:value?.scale,revision:value?.revision});}

const beforeArg=arg("before-manifest");
const afterArg=arg("after-manifest");
if(!beforeArg)fail("REAL_MEDIA_TIMING_COMPARE_BEFORE_REQUIRED");
if(!afterArg)fail("REAL_MEDIA_TIMING_COMPARE_AFTER_REQUIRED");
const beforePath=resolve(beforeArg); const afterPath=resolve(afterArg);
const before=load(beforePath); const after=load(afterPath);
for(const [label,value] of [["BEFORE",before],["AFTER",after]] as const){
 if(value.schemaVersion!=="wedding-movie-real-media-preview-qa-stills/v1"||value.authority!=="DERIVED_VISUAL_QA_ARTIFACTS_FROM_CURRENT_REAL_MEDIA_PREVIEW")fail(`REAL_MEDIA_TIMING_COMPARE_${label}_SCHEMA_MISMATCH`);
 if(value.summary?.sourceCurrentVerified!==true||value.summary?.framingCurrentVerified!==true||value.summary?.timingCurrentVerified!==true||value.summary?.humanVisualQa!=="NOT_RUN"||value.summary?.productionReady!==false)fail(`REAL_MEDIA_TIMING_COMPARE_${label}_NOT_CURRENT`);
 if(value.evidenceBoundary?.visualQa!=="NOT_RUN"||value.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||value.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||value.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")fail(`REAL_MEDIA_TIMING_COMPARE_${label}_BOUNDARY_INVALID`);
}
if(before.projectId!==after.projectId||(before.projectId!=="opening"&&before.projectId!=="profile"))fail("REAL_MEDIA_TIMING_COMPARE_PROJECT_MISMATCH");
const kinds=["SCENE_START_SAFE","SCENE_MID","SCENE_END_SAFE"];
const collect=(source:any,label:string)=>{
 const map=new Map<string,any>();
 for(const row of source.stills??[]){
  if(!row.sceneId||!row.sourceRevision||!row.mediaSha256||!row.framingRevision||!row.timingRevision||row.framing?.revision!==row.framingRevision||row.timing?.revision!==row.timingRevision)fail(`REAL_MEDIA_TIMING_COMPARE_${label}_STILL_IDENTITY_INVALID`,String(row.sceneId));
  const current=map.get(row.sceneId)??{sceneId:row.sceneId,sourceRevision:row.sourceRevision,mediaSha256:row.mediaSha256,patternId:row.patternId,productionRole:row.productionRole,framing:row.framing,framingRevision:row.framingRevision,timing:row.timing,timingRevision:row.timingRevision,stills:new Map<string,any>()};
  if(current.sourceRevision!==row.sourceRevision||current.mediaSha256!==row.mediaSha256||current.framingRevision!==row.framingRevision||current.timingRevision!==row.timingRevision||framingKey(current.framing)!==framingKey(row.framing)||timingKey(current.timing)!==timingKey(row.timing))fail(`REAL_MEDIA_TIMING_COMPARE_${label}_SCENE_IDENTITY_INCONSISTENT`,row.sceneId);
  current.stills.set(row.kind,row); map.set(row.sceneId,current);
 }
 return map;
};
const beforeScenes=collect(before,"BEFORE"); const afterScenes=collect(after,"AFTER");
if(beforeScenes.size!==afterScenes.size)fail("REAL_MEDIA_TIMING_COMPARE_SCENE_COUNT_MISMATCH");
const scenes:any[]=[]; let changed=0;
for(const [sceneId,b] of beforeScenes){
 const a=afterScenes.get(sceneId); if(!a)fail("REAL_MEDIA_TIMING_COMPARE_SCENE_MISSING_AFTER",sceneId);
 if(b.mediaSha256!==a.mediaSha256)fail("REAL_MEDIA_TIMING_COMPARE_MEDIA_CHANGED",sceneId);
 if(b.patternId!==a.patternId||b.productionRole!==a.productionRole)fail("REAL_MEDIA_TIMING_COMPARE_SCENE_ROLE_CHANGED",sceneId);
 if(framingKey(b.framing)!==framingKey(a.framing))fail("REAL_MEDIA_TIMING_COMPARE_FRAMING_CHANGED",sceneId);
 for(const kind of kinds){if(!b.stills.has(kind)||!a.stills.has(kind))fail("REAL_MEDIA_TIMING_COMPARE_SAMPLE_MISSING",`${sceneId}:${kind}`);}
 const timingChanged=b.timingRevision!==a.timingRevision||timingKey(b.timing)!==timingKey(a.timing);
 if(timingChanged)changed++;
 scenes.push({sceneId,mediaSha256:b.mediaSha256,patternId:b.patternId,productionRole:b.productionRole,framingRevision:b.framingRevision,timingChanged,before:{sourceRevision:b.sourceRevision,timingRevision:b.timingRevision,timing:b.timing,previewSha256:before.source?.previewSha256,stills:kinds.map((kind)=>({kind,frame:b.stills.get(kind).frame,seconds:b.stills.get(kind).seconds,sha256:b.stills.get(kind).sha256,path:b.stills.get(kind).path}))},after:{sourceRevision:a.sourceRevision,timingRevision:a.timingRevision,timing:a.timing,previewSha256:after.source?.previewSha256,stills:kinds.map((kind)=>({kind,frame:a.stills.get(kind).frame,seconds:a.stills.get(kind).seconds,sha256:a.stills.get(kind).sha256,path:a.stills.get(kind).path}))}});
}
if(flag("require-timing-change")&&changed===0)fail("REAL_MEDIA_TIMING_COMPARE_NO_TIMING_CHANGE");
const output=resolve(arg("output")??`out/qa/project-real-media-preview/${before.projectId}/${before.projectId}-timing-before-after.json`);
const receipt={schemaVersion:"wedding-movie-real-media-timing-qa-comparison/v1",authority:"DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS",generatedAt:new Date().toISOString(),projectId:before.projectId,source:{beforeManifestPath:beforePath,beforeManifestSha256:sha256(beforePath),afterManifestPath:afterPath,afterManifestSha256:sha256(afterPath)},scenes,summary:{sceneCount:scenes.length,timingChangedScenes:changed,unchangedScenes:scenes.length-changed,sameSceneMediaFramingAuthorityVerified:true,humanVisualQa:"NOT_RUN",productionReady:false},evidenceBoundary:{humanVisualReviewPerformed:false,remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"This receipt isolates Human timing changes while requiring the same Scene identity, media, pattern, production role, and framing. Source revision may advance because Human timing correction creates a new Scene revision. The receipt never judges which pacing is better and never creates Human visual PASS or GUI Actual evidence."}};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(receipt,null,2)}\n`);
console.log(JSON.stringify({output,projectId:before.projectId,sceneCount:scenes.length,timingChangedScenes:changed},null,2));
