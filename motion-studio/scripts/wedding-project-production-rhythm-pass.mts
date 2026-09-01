import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";

function arg(name:string){const prefix=`--${name}=`;const value=process.argv.find((item)=>item.startsWith(prefix));return value?value.slice(prefix.length):null;}
function fail(code:string,detail?:string):never{console.error(`${code}${detail?`: ${detail}`:""}`);process.exit(1);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function load(path:string){if(!existsSync(path))fail("PRODUCTION_RHYTHM_PREVIEW_NOT_FOUND",path);try{return JSON.parse(readFileSync(path,"utf8"));}catch{fail("PRODUCTION_RHYTHM_PREVIEW_JSON_INVALID",path);}}
function number(value:unknown,code:string,detail:string){const n=Number(value);if(!Number.isFinite(n))fail(code,detail);return n;}

const previewArg=arg("preview-manifest");
if(!previewArg)fail("PRODUCTION_RHYTHM_PREVIEW_REQUIRED","pass --preview-manifest=...");
const previewPath=resolve(previewArg);
const preview=load(previewPath);
if(preview.schemaVersion!=="wedding-movie-project-real-media-preview/v1"||preview.authority!=="DERIVED_FROM_CURRENT_SELECTED_SCENES_AND_PRODUCTION_READINESS_AUDIT")fail("PRODUCTION_RHYTHM_PREVIEW_SCHEMA_MISMATCH");
if(preview.projectId!=="opening"&&preview.projectId!=="profile")fail("PRODUCTION_RHYTHM_PROJECT_INVALID",String(preview.projectId));
if(preview.summary?.allRealMediaBoundCurrent!==true||preview.summary?.framingCurrent!==true||preview.summary?.timingCurrent!==true||preview.summary?.bgmCurrent!==true||preview.summary?.productionReady!==false)fail("PRODUCTION_RHYTHM_PREVIEW_NOT_CURRENT");
if(preview.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||preview.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||preview.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")fail("PRODUCTION_RHYTHM_EVIDENCE_BOUNDARY_INVALID");
if(preview.render?.state!=="RENDERED"||!preview.render?.sha256||!preview.output)fail("PRODUCTION_RHYTHM_RENDER_REQUIRED");
const renderPath=resolve(preview.output);
if(!existsSync(renderPath))fail("PRODUCTION_RHYTHM_RENDER_NOT_FOUND",renderPath);
const renderSha256=sha256(renderPath);
if(renderSha256!==preview.render.sha256)fail("PRODUCTION_RHYTHM_RENDER_SHA_DRIFT",renderPath);
if(!Array.isArray(preview.scenes)||preview.scenes.length===0)fail("PRODUCTION_RHYTHM_SCENES_MISSING");
if(!Array.isArray(preview.transitions))fail("PRODUCTION_RHYTHM_TRANSITIONS_MISSING");
const fps=number(preview.fps,"PRODUCTION_RHYTHM_FPS_INVALID","fps");
if(fps<=0)fail("PRODUCTION_RHYTHM_FPS_INVALID","fps");

const transitionByEdge=new Map(preview.transitions.map((item:any)=>[`${item.fromSceneId}->${item.toSceneId}`,item]));
const scenes=preview.scenes.map((scene:any,index:number)=>{
  const durationFrames=number(scene.durationFrames,"PRODUCTION_RHYTHM_SCENE_DURATION_INVALID",scene.sceneId);
  const startFrame=number(scene.startFrame,"PRODUCTION_RHYTHM_SCENE_START_INVALID",scene.sceneId);
  const endFrameExclusive=number(scene.endFrameExclusive,"PRODUCTION_RHYTHM_SCENE_END_INVALID",scene.sceneId);
  const transitionInFrames=number(scene.transitionInFrames??0,"PRODUCTION_RHYTHM_TRANSITION_IN_INVALID",scene.sceneId);
  const transitionOutFrames=number(scene.transitionOutFrames??0,"PRODUCTION_RHYTHM_TRANSITION_OUT_INVALID",scene.sceneId);
  if(durationFrames<=0||endFrameExclusive-startFrame!==durationFrames)fail("PRODUCTION_RHYTHM_SCENE_FRAME_DRIFT",scene.sceneId);
  const previous=preview.scenes[index-1]??null;
  const next=preview.scenes[index+1]??null;
  const inEdge=previous?transitionByEdge.get(`${previous.sceneId}->${scene.sceneId}`)??null:null;
  const outEdge=next?transitionByEdge.get(`${scene.sceneId}->${next.sceneId}`)??null:null;
  const overlapFrames=transitionInFrames+transitionOutFrames;
  const exclusiveFrames=Math.max(0,durationFrames-overlapFrames);
  const overlapRatio=durationFrames>0?overlapFrames/durationFrames:0;
  return {
    order:index+1,
    sceneId:scene.sceneId,
    sourceRevision:scene.sourceRevision,
    productionRole:scene.productionRole??null,
    patternId:scene.patternId??null,
    timingRevision:scene.timing?.revision??null,
    durationFrames,
    durationSeconds:durationFrames/fps,
    startFrame,
    startSeconds:startFrame/fps,
    endFrameExclusive,
    endSeconds:endFrameExclusive/fps,
    transitionIn:inEdge?{transition:inEdge.transition,durationFrames:inEdge.durationFrames,durationSeconds:Number(inEdge.durationFrames??0)/fps}:null,
    transitionOut:outEdge?{transition:outEdge.transition,durationFrames:outEdge.durationFrames,durationSeconds:Number(outEdge.durationFrames??0)/fps}:null,
    overlapFrames,
    overlapSeconds:overlapFrames/fps,
    exclusiveFrames,
    exclusiveSeconds:exclusiveFrames/fps,
    overlapRatio:Number(overlapRatio.toFixed(4)),
  };
});

const mechanicalCues:any[]=[];
for(const scene of scenes){
  if(scene.durationSeconds<1.5)mechanicalCues.push({code:"SHORT_SCENE_REVIEW_CUE",sceneId:scene.sceneId,valueSeconds:scene.durationSeconds,rule:"duration < 1.5s; mechanical cue only, not a quality verdict"});
  if(scene.durationSeconds>6)mechanicalCues.push({code:"LONG_SCENE_REVIEW_CUE",sceneId:scene.sceneId,valueSeconds:scene.durationSeconds,rule:"duration > 6s; mechanical cue only, not a quality verdict"});
  if(scene.overlapRatio>=0.35)mechanicalCues.push({code:"HIGH_TRANSITION_OVERLAP_REVIEW_CUE",sceneId:scene.sceneId,overlapRatio:scene.overlapRatio,rule:"transition overlap >= 35% of Scene duration; mechanical cue only"});
}
for(let index=1;index<scenes.length;index++){
  const previous=scenes[index-1]; const current=scenes[index];
  const ratio=Math.max(previous.durationSeconds,current.durationSeconds)/Math.max(0.001,Math.min(previous.durationSeconds,current.durationSeconds));
  if(ratio>=2)mechanicalCues.push({code:"ADJACENT_DURATION_JUMP_REVIEW_CUE",fromSceneId:previous.sceneId,toSceneId:current.sceneId,ratio:Number(ratio.toFixed(3)),rule:"adjacent Scene duration ratio >= 2x; mechanical cue only"});
}

const totalFrames=number(preview.timeline?.totalFrames,"PRODUCTION_RHYTHM_TOTAL_FRAMES_INVALID","timeline.totalFrames");
const durationSeconds=number(preview.timeline?.durationSeconds,"PRODUCTION_RHYTHM_TOTAL_DURATION_INVALID","timeline.durationSeconds");
if(Math.abs(totalFrames/fps-durationSeconds)>0.00001)fail("PRODUCTION_RHYTHM_TIMELINE_DRIFT");
const rawSceneFrames=scenes.reduce((sum:number,scene:any)=>sum+scene.durationFrames,0);
const crossDissolveOverlapFrames=preview.transitions.filter((item:any)=>item.transition==="CROSS_DISSOLVE").reduce((sum:number,item:any)=>sum+Number(item.durationFrames??0),0);
if(rawSceneFrames-crossDissolveOverlapFrames!==totalFrames)fail("PRODUCTION_RHYTHM_OVERLAP_ACCOUNTING_DRIFT",`${rawSceneFrames}-${crossDissolveOverlapFrames}!=${totalFrames}`);

const output=resolve(arg("output")??`out/qa/project-real-media-preview/${preview.projectId}/${preview.projectId}-production-rhythm-pass.json`);
const result={
  schemaVersion:"wedding-movie-production-rhythm-pass/v1",
  authority:"DERIVED_WHOLE_PROJECT_RHYTHM_MAP_FROM_CURRENT_RENDERED_REAL_MEDIA_PREVIEW",
  generatedAt:new Date().toISOString(),
  projectId:preview.projectId,
  source:{previewManifestPath:previewPath,previewManifestSha256:sha256(previewPath),renderPath,renderSha256},
  fps,
  scenes,
  transitions:preview.transitions.map((item:any)=>({...item,durationSeconds:Number(item.durationFrames??0)/fps})),
  timeline:{totalFrames,durationSeconds,rawSceneFrames,rawSceneSeconds:rawSceneFrames/fps,crossDissolveOverlapFrames,crossDissolveOverlapSeconds:crossDissolveOverlapFrames/fps},
  mechanicalReviewCues:mechanicalCues,
  humanReview:{
    performed:false,
    reviewer:null,
    reviewedAt:null,
    axes:{
      openingPace:"NOT_RUN",
      midsectionVariety:"NOT_RUN",
      emotionalHold:"NOT_RUN",
      endingBreathingRoom:"NOT_RUN",
      transitionCadence:"NOT_RUN",
      overallRhythm:"NOT_RUN",
    },
    notes:"",
  },
  summary:{sceneCount:scenes.length,transitionCount:preview.transitions.length,mechanicalReviewCueCount:mechanicalCues.length,humanRhythmReview:"NOT_RUN",productionReady:false},
  evidenceBoundary:{humanRhythmReviewPerformed:false,humanVisualQa:"NOT_RUN",remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"This pass exposes timing, overlap, duration jumps, and neutral mechanical review cues from the current rendered real-media preview. Thresholds are attention cues only. It never decides pacing quality, creates Human PASS, promotes GUI Actual evidence, or marks productionReady."},
};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify({output,projectId:preview.projectId,sceneCount:scenes.length,durationSeconds,mechanicalReviewCueCount:mechanicalCues.length,humanRhythmReview:"NOT_RUN"},null,2));
