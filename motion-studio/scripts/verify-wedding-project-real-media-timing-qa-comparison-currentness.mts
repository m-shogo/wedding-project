import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, isAbsolute, resolve} from "node:path";

function arg(name:string){const prefix=`--${name}=`;const value=process.argv.find((item)=>item.startsWith(prefix));return value?value.slice(prefix.length):null;}
function flag(name:string){return process.argv.includes(`--${name}`);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function load(path:string,code:string){if(!existsSync(path))throw new Error(`${code}_FILE_NOT_FOUND:${path}`);try{return JSON.parse(readFileSync(path,"utf8"));}catch{throw new Error(`${code}_JSON_INVALID:${path}`);}}
function actualPath(path:string,manifestPath:string){return isAbsolute(path)?path:resolve(dirname(manifestPath),path);}
function timingKey(value:any){return JSON.stringify({targetDurationSeconds:value?.targetDurationSeconds,computedDurationSeconds:value?.computedDurationSeconds,durationFrames:value?.durationFrames,fps:value?.fps,revision:value?.revision});}
function framingKey(value:any){return JSON.stringify({fit:value?.fit,focusX:value?.focusX,focusY:value?.focusY,scale:value?.scale,revision:value?.revision});}
function push(mismatches:string[],code:string,detail?:string){mismatches.push(detail?`${code}:${detail}`:code);}

const receiptArg=arg("receipt"); const selectedArg=arg("current-selected");
if(!receiptArg){console.error("REAL_MEDIA_TIMING_COMPARISON_CURRENTNESS_RECEIPT_REQUIRED");process.exit(1);}
if(!selectedArg){console.error("REAL_MEDIA_TIMING_COMPARISON_CURRENTNESS_SELECTED_REQUIRED");process.exit(1);}
const receiptPath=resolve(receiptArg); const selectedPath=resolve(selectedArg);
let receipt:any; let selected:any;
try{receipt=load(receiptPath,"REAL_MEDIA_TIMING_COMPARISON_CURRENTNESS_RECEIPT");selected=load(selectedPath,"REAL_MEDIA_TIMING_COMPARISON_CURRENTNESS_SELECTED");}catch(error){console.error(error instanceof Error?error.message:String(error));process.exit(1);}
const mismatches:string[]=[];
if(receipt.schemaVersion!=="wedding-movie-real-media-timing-qa-comparison/v1"||receipt.authority!=="DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS")push(mismatches,"RECEIPT_SCHEMA_MISMATCH");
if(receipt.summary?.humanVisualQa!=="NOT_RUN"||receipt.summary?.productionReady!==false||receipt.evidenceBoundary?.humanVisualReviewPerformed!==false||receipt.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||receipt.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||receipt.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")push(mismatches,"RECEIPT_EVIDENCE_BOUNDARY_INVALID");
if(selected.schemaVersion!=="wedding-movie-selected-scene-render-manifest/v1"||selected.authority!=="DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH"||selected.projectId!==receipt.projectId||selected.summary?.allSelectionsCurrent!==true||selected.summary?.timingBoundScenes!==selected.scenes?.length||selected.summary?.productionReady!==false)push(mismatches,"CURRENT_SELECTED_NOT_CURRENT");

const beforeManifestPath=receipt.source?.beforeManifestPath?resolve(receipt.source.beforeManifestPath):null;
const afterManifestPath=receipt.source?.afterManifestPath?resolve(receipt.source.afterManifestPath):null;
let beforeManifest:any=null; let afterManifest:any=null;
for(const [label,path,expectedSha] of [["BEFORE",beforeManifestPath,receipt.source?.beforeManifestSha256],["AFTER",afterManifestPath,receipt.source?.afterManifestSha256]] as const){
 if(!path||!existsSync(path)){push(mismatches,`${label}_MANIFEST_MISSING`,String(path??"null"));continue;}
 if(sha256(path)!==expectedSha)push(mismatches,`${label}_MANIFEST_SHA_DRIFT`);
 try{const value=JSON.parse(readFileSync(path,"utf8"));if(value.schemaVersion!=="wedding-movie-real-media-preview-qa-stills/v1"||value.projectId!==receipt.projectId||value.summary?.sourceCurrentVerified!==true||value.summary?.framingCurrentVerified!==true||value.summary?.timingCurrentVerified!==true||value.summary?.humanVisualQa!=="NOT_RUN"||value.summary?.productionReady!==false)push(mismatches,`${label}_MANIFEST_NOT_CURRENT`);if(label==="BEFORE")beforeManifest=value;else afterManifest=value;}catch{push(mismatches,`${label}_MANIFEST_JSON_INVALID`);}
}

const selectedByScene=new Map<string,any>((selected.scenes??[]).map((scene:any)=>[scene.sceneId,scene]));
for(const scene of receipt.scenes??[]){
 const current=selectedByScene.get(scene.sceneId);
 if(!current){push(mismatches,"CURRENT_SELECTED_SCENE_MISSING",scene.sceneId);continue;}
 if(current.sourceRevision!==scene.after?.sourceRevision)push(mismatches,"CURRENT_SELECTED_SOURCE_REVISION_DRIFT",scene.sceneId);
 if(current.patternId!==scene.patternId||current.productionRole!==scene.productionRole)push(mismatches,"CURRENT_SELECTED_ROLE_DRIFT",scene.sceneId);
 if(timingKey(current.timing)!==timingKey(scene.after?.timing)||current.timing?.revision!==scene.after?.timingRevision)push(mismatches,"CURRENT_SELECTED_TIMING_DRIFT",scene.sceneId);
 for(const side of ["before","after"] as const){
  for(const still of scene[side]?.stills??[]){
   const sourceManifestPath=side==="before"?beforeManifestPath:afterManifestPath;
   if(!sourceManifestPath){push(mismatches,"STILL_SOURCE_MANIFEST_MISSING",`${scene.sceneId}:${side}:${still.kind}`);continue;}
   const path=actualPath(still.path,sourceManifestPath);
   if(!existsSync(path)){push(mismatches,"STILL_FILE_MISSING",`${scene.sceneId}:${side}:${still.kind}`);continue;}
   if(sha256(path)!==still.sha256)push(mismatches,"STILL_SHA_DRIFT",`${scene.sceneId}:${side}:${still.kind}`);
  }
 }
}

if(beforeManifest&&afterManifest){
 const rows=(value:any)=>new Map<string,any>((value.stills??[]).map((row:any)=>[`${row.sceneId}:${row.kind}`,row]));
 const bRows=rows(beforeManifest); const aRows=rows(afterManifest);
 for(const scene of receipt.scenes??[]){
  for(const side of ["before","after"] as const){
   const source=side==="before"?bRows:aRows;
   for(const still of scene[side]?.stills??[]){
    const live=source.get(`${scene.sceneId}:${still.kind}`);
    if(!live||live.sha256!==still.sha256||live.timingRevision!==scene[side]?.timingRevision||timingKey(live.timing)!==timingKey(scene[side]?.timing)||framingKey(live.framing)!==framingKey(beforeManifest?.stills?.find((x:any)=>x.sceneId===scene.sceneId)?.framing))push(mismatches,"RECEIPT_TO_MANIFEST_STILL_BINDING_DRIFT",`${scene.sceneId}:${side}:${still.kind}`);
   }
  }
 }
}

const state=mismatches.length===0?"CURRENT":"STALE";
const output=resolve(arg("output")??`out/qa/project-real-media-preview/${receipt.projectId??"unknown"}/${receipt.projectId??"unknown"}-timing-before-after-currentness.json`);
const result={schemaVersion:"wedding-movie-real-media-timing-qa-comparison-currentness/v1",authority:"LIVE_REVALIDATION_OF_TIMING_COMPARISON_AGAINST_SOURCE_MANIFESTS_STILLS_AND_CURRENT_SELECTED_SCENES",generatedAt:new Date().toISOString(),projectId:receipt.projectId??null,state,source:{receiptPath,receiptSha256:existsSync(receiptPath)?sha256(receiptPath):null,currentSelectedPath:selectedPath,currentSelectedSha256:existsSync(selectedPath)?sha256(selectedPath):null,beforeManifestPath,afterManifestPath},checks:{receiptBoundaryValid:!mismatches.includes("RECEIPT_EVIDENCE_BOUNDARY_INVALID"),sourceManifestHashesCurrent:!mismatches.some((item)=>item.includes("MANIFEST_SHA_DRIFT")||item.includes("MANIFEST_MISSING")),stillFilesCurrent:!mismatches.some((item)=>item.startsWith("STILL_FILE_MISSING")||item.startsWith("STILL_SHA_DRIFT")),currentSelectedTimingCurrent:!mismatches.some((item)=>item.startsWith("CURRENT_SELECTED_")),receiptManifestBindingCurrent:!mismatches.some((item)=>item.startsWith("RECEIPT_TO_MANIFEST_"))},mismatches,evidenceBoundary:{humanVisualReviewPerformed:false,humanVisualQa:"NOT_RUN",remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"CURRENT proves only that the timing comparison, its source QA manifests/stills, and the current selected Scene timing authority still agree. It does not decide whether the new pacing is better and never promotes Human or GUI Actual evidence."}};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify({output,state,mismatchCount:mismatches.length,mismatches},null,2));
if(flag("strict-current")&&state!=="CURRENT")process.exit(2);
