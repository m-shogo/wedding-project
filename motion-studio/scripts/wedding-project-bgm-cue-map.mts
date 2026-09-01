import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {spawnSync} from "node:child_process";

const FPS=30;
const TYPES=new Set(["PHRASE","HIT","BUILD","RELEASE"]);
function arg(name:string){const p=`--${name}=`;const v=process.argv.find((x)=>x.startsWith(p));return v?v.slice(p.length):null;}
function fail(code:string,detail?:string):never{console.error(`${code}${detail?`: ${detail}`:""}`);process.exit(1);}
function load(path:string,missing:string,invalid:string){if(!existsSync(path))fail(missing,path);try{return JSON.parse(readFileSync(path,"utf8"));}catch{fail(invalid,path);}}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function stableSha(value:unknown){return createHash("sha256").update(JSON.stringify(value)).digest("hex");}
function probeDuration(path:string){const result=spawnSync("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",path],{encoding:"utf8"});if(result.status!==0)fail("BGM_CUE_AUDIO_FFPROBE_FAILED",path);const seconds=Number(String(result.stdout).trim());if(!Number.isFinite(seconds)||seconds<=0)fail("BGM_CUE_AUDIO_DURATION_INVALID",String(result.stdout));return seconds;}

const audioArg=arg("audio-manifest");
const cuesArg=arg("cues");
if(!audioArg)fail("BGM_CUE_AUDIO_MANIFEST_REQUIRED");
if(!cuesArg)fail("BGM_CUE_HUMAN_INPUT_REQUIRED","pass --cues=/path/to/human-bgm-cues.json");
const audioPath=resolve(audioArg);const cuesPath=resolve(cuesArg);
const audio=load(audioPath,"BGM_CUE_AUDIO_MANIFEST_NOT_FOUND","BGM_CUE_AUDIO_MANIFEST_INVALID");
const human=load(cuesPath,"BGM_CUE_HUMAN_INPUT_NOT_FOUND","BGM_CUE_HUMAN_INPUT_INVALID");
if(audio.schemaVersion!=="wedding-movie-production-audio-input/v1"||audio.usage!=="BGM"||(audio.projectId!=="opening"&&audio.projectId!=="profile"))fail("BGM_CUE_AUDIO_MANIFEST_SCHEMA_MISMATCH");
if(audio.humanApproved!==true)fail("BGM_CUE_AUDIO_HUMAN_APPROVAL_REQUIRED");
const projectId=audio.projectId as "opening"|"profile";
if(human.schemaVersion!=="wedding-movie-human-bgm-cues/v1"||human.projectId!==projectId||human.humanMarked!==true)fail("BGM_CUE_HUMAN_INPUT_SCHEMA_MISMATCH");
if(!human.reviewer||!human.reviewedAt)fail("BGM_CUE_HUMAN_REVIEWER_REQUIRED");
const mediaPath=resolve(String(audio.path??""));
if(!existsSync(mediaPath))fail("BGM_CUE_AUDIO_FILE_NOT_FOUND",mediaPath);
const actualSha=sha256(mediaPath);
if(actualSha!==audio.sha256)fail("BGM_CUE_AUDIO_SHA_MISMATCH",mediaPath);
if(human.audioSha256!==actualSha)fail("BGM_CUE_HUMAN_AUDIO_BINDING_STALE");
const durationSeconds=probeDuration(mediaPath);
const cuesRaw=Array.isArray(human.cues)?human.cues:fail("BGM_CUE_HUMAN_CUES_REQUIRED");
const seen=new Set<string>();
const cues=cuesRaw.map((cue:any,index:number)=>{
  const id=String(cue.id??"").trim();const type=String(cue.type??"").trim();const label=String(cue.label??"").trim();const seconds=Number(cue.seconds);
  if(!id||seen.has(id))fail("BGM_CUE_ID_INVALID",id||String(index));seen.add(id);
  if(!TYPES.has(type))fail("BGM_CUE_TYPE_INVALID",`${id}:${type}`);
  if(!label)fail("BGM_CUE_LABEL_REQUIRED",id);
  if(!Number.isFinite(seconds)||seconds<0||seconds>durationSeconds)fail("BGM_CUE_TIME_OUT_OF_RANGE",`${id}:${seconds}`);
  const frame=Math.round(seconds*FPS);const frameSeconds=frame/FPS;
  if(Math.abs(frameSeconds-seconds)>0.00001)fail("BGM_CUE_NOT_FRAME_ALIGNED",`${id}:${seconds}`);
  return {order:index+1,id,type,label,frame,seconds:frameSeconds,notes:String(cue.notes??"")};
});
for(let i=1;i<cues.length;i++)if(cues[i].frame<cues[i-1].frame)fail("BGM_CUE_ORDER_INVALID",`${cues[i-1].id}->${cues[i].id}`);
const identity={projectId,audioSha256:actualSha,audioDurationSeconds:Number(durationSeconds.toFixed(6)),fps:FPS,cues:cues.map(({id,type,label,frame,seconds})=>({id,type,label,frame,seconds}))};
const revision=stableSha(identity);
const output=resolve(arg("output")??`out/qa/project-real-media-preview/${projectId}/${projectId}-bgm-cue-map.json`);
const result={schemaVersion:"wedding-movie-bgm-cue-map/v1",authority:"HUMAN_MARKED_BGM_CUES_BOUND_TO_CURRENT_APPROVED_AUDIO",generatedAt:new Date().toISOString(),projectId,source:{audioManifestPath:audioPath,audioManifestSha256:sha256(audioPath),humanCueInputPath:cuesPath,humanCueInputSha256:sha256(cuesPath),audioPath:mediaPath,audioSha256:actualSha},audio:{durationSeconds:Number(durationSeconds.toFixed(6)),fps:FPS},revision,cues,humanReview:{performed:true,reviewer:human.reviewer,reviewedAt:human.reviewedAt,notes:String(human.notes??"")},summary:{cueCount:cues.length,phraseCount:cues.filter((x:any)=>x.type==="PHRASE").length,hitCount:cues.filter((x:any)=>x.type==="HIT").length,buildCount:cues.filter((x:any)=>x.type==="BUILD").length,releaseCount:cues.filter((x:any)=>x.type==="RELEASE").length,productionReady:false},evidenceBoundary:{cueSelectionAuthority:"HUMAN_MARKED_ONLY",automaticBeatDetection:false,automaticQualityVerdict:false,remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"This map records only Human-marked musical cues against the current approved BGM SHA. It does not infer beats, choose edit points, create quality PASS, promote GUI Actual evidence, or mark productionReady."}};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(result,null,2)}\n`);console.log(JSON.stringify({output,projectId,revision,cueCount:cues.length,audioSha256:actualSha,productionReady:false},null,2));