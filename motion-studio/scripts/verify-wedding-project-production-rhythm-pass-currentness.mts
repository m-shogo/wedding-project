import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";

function arg(name:string){const prefix=`--${name}=`;const value=process.argv.find((item)=>item.startsWith(prefix));return value?value.slice(prefix.length):null;}
function flag(name:string){return process.argv.includes(`--${name}`);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function load(path:string,code:string){if(!existsSync(path))throw new Error(`${code}_FILE_NOT_FOUND:${path}`);try{return JSON.parse(readFileSync(path,"utf8"));}catch{throw new Error(`${code}_JSON_INVALID:${path}`);}}
function push(items:string[],code:string,detail?:string){items.push(detail?`${code}:${detail}`:code);}
function sceneIdentity(scene:any){return JSON.stringify({sceneId:scene?.sceneId,sourceRevision:scene?.sourceRevision,productionRole:scene?.productionRole??null,patternId:scene?.patternId??null,timingRevision:scene?.timing?.revision??null,durationFrames:scene?.durationFrames,startFrame:scene?.startFrame,endFrameExclusive:scene?.endFrameExclusive,transitionInFrames:scene?.transitionInFrames??0,transitionOutFrames:scene?.transitionOutFrames??0});}
function transitionIdentity(value:any){return JSON.stringify({fromSceneId:value?.fromSceneId,toSceneId:value?.toSceneId,transition:value?.transition,durationFrames:Number(value?.durationFrames??0),sourceStatus:value?.sourceStatus??null});}

const rhythmArg=arg("rhythm-pass");
if(!rhythmArg){console.error("PRODUCTION_RHYTHM_CURRENTNESS_RHYTHM_PASS_REQUIRED");process.exit(1);}
const rhythmPath=resolve(rhythmArg);
let rhythm:any;
try{rhythm=load(rhythmPath,"PRODUCTION_RHYTHM_CURRENTNESS_RHYTHM_PASS");}catch(error){console.error(error instanceof Error?error.message:String(error));process.exit(1);}
const mismatches:string[]=[];
if(rhythm.schemaVersion!=="wedding-movie-production-rhythm-pass/v1"||rhythm.authority!=="DERIVED_WHOLE_PROJECT_RHYTHM_MAP_FROM_CURRENT_RENDERED_REAL_MEDIA_PREVIEW")push(mismatches,"RHYTHM_PASS_SCHEMA_MISMATCH");
if(rhythm.projectId!=="opening"&&rhythm.projectId!=="profile")push(mismatches,"RHYTHM_PASS_PROJECT_INVALID");
if(rhythm.summary?.humanRhythmReview!=="NOT_RUN"||rhythm.summary?.productionReady!==false||rhythm.evidenceBoundary?.humanRhythmReviewPerformed!==false||rhythm.evidenceBoundary?.humanVisualQa!=="NOT_RUN"||rhythm.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||rhythm.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||rhythm.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")push(mismatches,"RHYTHM_PASS_EVIDENCE_BOUNDARY_INVALID");

const previewPath=rhythm.source?.previewManifestPath?resolve(rhythm.source.previewManifestPath):null;
let preview:any=null;
if(!previewPath||!existsSync(previewPath))push(mismatches,"SOURCE_PREVIEW_MISSING",String(previewPath??"null"));
else {
  if(sha256(previewPath)!==rhythm.source?.previewManifestSha256)push(mismatches,"SOURCE_PREVIEW_SHA_DRIFT");
  try{preview=JSON.parse(readFileSync(previewPath,"utf8"));}catch{push(mismatches,"SOURCE_PREVIEW_JSON_INVALID");}
}
if(preview){
  if(preview.schemaVersion!=="wedding-movie-project-real-media-preview/v1"||preview.authority!=="DERIVED_FROM_CURRENT_SELECTED_SCENES_AND_PRODUCTION_READINESS_AUDIT"||preview.projectId!==rhythm.projectId)push(mismatches,"SOURCE_PREVIEW_SCHEMA_MISMATCH");
  if(preview.summary?.allRealMediaBoundCurrent!==true||preview.summary?.framingCurrent!==true||preview.summary?.timingCurrent!==true||preview.summary?.bgmCurrent!==true||preview.summary?.productionReady!==false)push(mismatches,"SOURCE_PREVIEW_NOT_CURRENT");
  if(preview.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||preview.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||preview.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")push(mismatches,"SOURCE_PREVIEW_BOUNDARY_INVALID");
  const renderPath=preview.output?resolve(preview.output):null;
  if(!renderPath||!existsSync(renderPath))push(mismatches,"SOURCE_RENDER_MISSING",String(renderPath??"null"));
  else {
    const liveRenderSha=sha256(renderPath);
    if(preview.render?.state!=="RENDERED"||liveRenderSha!==preview.render?.sha256)push(mismatches,"SOURCE_RENDER_PREVIEW_SHA_DRIFT");
    if(liveRenderSha!==rhythm.source?.renderSha256||resolve(rhythm.source?.renderPath??"")!==renderPath)push(mismatches,"SOURCE_RENDER_RHYTHM_BINDING_DRIFT");
  }
  if(!Array.isArray(preview.scenes)||!Array.isArray(rhythm.scenes)||preview.scenes.length!==rhythm.scenes.length)push(mismatches,"SCENE_COUNT_DRIFT");
  else {
    const rhythmByScene=new Map((rhythm.scenes??[]).map((scene:any)=>[scene.sceneId,scene]));
    for(const scene of preview.scenes){
      const bound:any=rhythmByScene.get(scene.sceneId);
      if(!bound){push(mismatches,"SCENE_MISSING_FROM_RHYTHM",scene.sceneId);continue;}
      const projected={...scene,timing:{revision:bound.timingRevision}};
      if(sceneIdentity(projected)!==sceneIdentity(bound))push(mismatches,"SCENE_TIMING_OR_POSITION_DRIFT",scene.sceneId);
      const durationSeconds=Number(scene.durationFrames)/Number(preview.fps);
      if(Math.abs(durationSeconds-Number(bound.durationSeconds))>0.00001)push(mismatches,"SCENE_DURATION_SECONDS_DRIFT",scene.sceneId);
    }
  }
  if(!Array.isArray(preview.transitions)||!Array.isArray(rhythm.transitions)||preview.transitions.length!==rhythm.transitions.length)push(mismatches,"TRANSITION_COUNT_DRIFT");
  else for(let index=0;index<preview.transitions.length;index++)if(transitionIdentity(preview.transitions[index])!==transitionIdentity(rhythm.transitions[index]))push(mismatches,"TRANSITION_DRIFT",`${preview.transitions[index]?.fromSceneId}->${preview.transitions[index]?.toSceneId}`);
  if(Number(preview.timeline?.totalFrames)!==Number(rhythm.timeline?.totalFrames)||Math.abs(Number(preview.timeline?.durationSeconds)-Number(rhythm.timeline?.durationSeconds))>0.00001)push(mismatches,"TIMELINE_DRIFT");
}

const state=mismatches.length===0?"CURRENT":"STALE";
const output=resolve(arg("output")??`out/qa/project-real-media-preview/${rhythm.projectId??"unknown"}/${rhythm.projectId??"unknown"}-production-rhythm-pass-currentness.json`);
const result={schemaVersion:"wedding-movie-production-rhythm-pass-currentness/v1",authority:"LIVE_REVALIDATION_OF_PRODUCTION_RHYTHM_PASS_AGAINST_CURRENT_RENDERED_REAL_MEDIA_PREVIEW",generatedAt:new Date().toISOString(),projectId:rhythm.projectId??null,state,source:{rhythmPassPath:rhythmPath,rhythmPassSha256:existsSync(rhythmPath)?sha256(rhythmPath):null,previewManifestPath:previewPath,previewManifestSha256:previewPath&&existsSync(previewPath)?sha256(previewPath):null,renderPath:preview?.output?resolve(preview.output):null,renderSha256:preview?.output&&existsSync(resolve(preview.output))?sha256(resolve(preview.output)):null},checks:{rhythmBoundaryValid:!mismatches.includes("RHYTHM_PASS_EVIDENCE_BOUNDARY_INVALID"),previewManifestCurrent:!mismatches.some((item)=>item.startsWith("SOURCE_PREVIEW_")),renderCurrent:!mismatches.some((item)=>item.startsWith("SOURCE_RENDER_")),sceneTimingAndPositionsCurrent:!mismatches.some((item)=>item.startsWith("SCENE_")),transitionsCurrent:!mismatches.some((item)=>item.startsWith("TRANSITION_")),timelineCurrent:!mismatches.includes("TIMELINE_DRIFT")},mismatches,evidenceBoundary:{humanRhythmReviewPerformed:false,humanVisualQa:"NOT_RUN",remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"CURRENT proves only that the whole-project rhythm map still matches the exact current rendered real-media preview, Scene timing/positions, transitions, and render SHA. It never judges pacing quality or promotes Human/GUI Actual evidence."}};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify({output,state,mismatchCount:mismatches.length,mismatches},null,2));
if(flag("strict-current")&&state!=="CURRENT")process.exit(2);
