import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, isAbsolute, resolve} from "node:path";

function arg(name:string){const prefix=`--${name}=`;const value=process.argv.find((item)=>item.startsWith(prefix));return value?value.slice(prefix.length):null;}
function flag(name:string){return process.argv.includes(`--${name}`);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function load(path:string,code:string){if(!existsSync(path))throw new Error(`${code}_FILE_NOT_FOUND:${path}`);try{return JSON.parse(readFileSync(path,"utf8"));}catch{throw new Error(`${code}_JSON_INVALID:${path}`);}}
function actualPath(path:string,manifestPath:string){return isAbsolute(path)?path:resolve(dirname(manifestPath),path);}
function framingKey(value:any){return JSON.stringify({fit:value?.fit,focusX:value?.focusX,focusY:value?.focusY,scale:value?.scale,revision:value?.revision});}
function push(mismatches:string[],code:string,detail?:string){mismatches.push(detail?`${code}:${detail}`:code);}

const receiptArg=arg("receipt");
const mediaArg=arg("current-media");
if(!receiptArg){console.error("REAL_MEDIA_FRAMING_COMPARISON_CURRENTNESS_RECEIPT_REQUIRED");process.exit(1);}
if(!mediaArg){console.error("REAL_MEDIA_FRAMING_COMPARISON_CURRENTNESS_MEDIA_REQUIRED");process.exit(1);}
const receiptPath=resolve(receiptArg);
const mediaPath=resolve(mediaArg);
let receipt:any; let media:any;
try{receipt=load(receiptPath,"REAL_MEDIA_FRAMING_COMPARISON_CURRENTNESS_RECEIPT");media=load(mediaPath,"REAL_MEDIA_FRAMING_COMPARISON_CURRENTNESS_MEDIA");}catch(error){console.error(error instanceof Error?error.message:String(error));process.exit(1);}

const mismatches:string[]=[];
if(receipt.schemaVersion!=="wedding-movie-real-media-framing-qa-comparison/v1"||receipt.authority!=="DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS")push(mismatches,"RECEIPT_SCHEMA_MISMATCH");
if(receipt.summary?.humanVisualQa!=="NOT_RUN"||receipt.summary?.productionReady!==false||receipt.evidenceBoundary?.humanVisualReviewPerformed!==false||receipt.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||receipt.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||receipt.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN"||receipt.evidenceBoundary?.productionReady!==false)push(mismatches,"RECEIPT_EVIDENCE_BOUNDARY_INVALID");
if(media.schemaVersion!=="wedding-movie-production-media-input/v1"||media.projectId!==receipt.projectId||!Array.isArray(media.scenes))push(mismatches,"CURRENT_MEDIA_SCHEMA_OR_PROJECT_MISMATCH");

const beforeManifestPath=receipt.source?.beforeManifestPath?resolve(receipt.source.beforeManifestPath):null;
const afterManifestPath=receipt.source?.afterManifestPath?resolve(receipt.source.afterManifestPath):null;
let beforeManifest:any=null; let afterManifest:any=null;
for(const [label,path,expectedSha] of [["BEFORE",beforeManifestPath,receipt.source?.beforeManifestSha256],["AFTER",afterManifestPath,receipt.source?.afterManifestSha256]] as const){
 if(!path||!existsSync(path)){push(mismatches,`${label}_MANIFEST_MISSING`,String(path??"null"));continue;}
 if(sha256(path)!==expectedSha)push(mismatches,`${label}_MANIFEST_SHA_DRIFT`);
 try{const value=JSON.parse(readFileSync(path,"utf8"));if(value.schemaVersion!=="wedding-movie-real-media-preview-qa-stills/v1"||value.projectId!==receipt.projectId||value.summary?.sourceCurrentVerified!==true||value.summary?.framingCurrentVerified!==true||value.summary?.humanVisualQa!=="NOT_RUN"||value.summary?.productionReady!==false)push(mismatches,`${label}_MANIFEST_NOT_CURRENT`);if(label==="BEFORE")beforeManifest=value;else afterManifest=value;}catch{push(mismatches,`${label}_MANIFEST_JSON_INVALID`);}
}

const mediaByScene=new Map<string,any>((media.scenes??[]).map((scene:any)=>[scene.sceneId,scene]));
for(const scene of receipt.scenes??[]){
 const current=mediaByScene.get(scene.sceneId);
 if(!current){push(mismatches,"CURRENT_MEDIA_SCENE_MISSING",scene.sceneId);continue;}
 if(current.sourceRevision!==scene.sourceRevision)push(mismatches,"CURRENT_MEDIA_SOURCE_REVISION_DRIFT",scene.sceneId);
 if(current.sha256!==scene.mediaSha256)push(mismatches,"CURRENT_MEDIA_SHA_DRIFT",scene.sceneId);
 const currentFraming=current.framing??{fit:"COVER",focusX:50,focusY:50,scale:1,revision:"DEFAULT_CENTER_COVER"};
 if(currentFraming.revision!==scene.after?.framingRevision||framingKey(currentFraming)!==framingKey(scene.after?.framing))push(mismatches,"CURRENT_MEDIA_FRAMING_DRIFT",scene.sceneId);
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
 const manifestSceneKeys=(value:any)=>new Map<string,any>((value.stills??[]).map((row:any)=>[`${row.sceneId}:${row.kind}`,row]));
 const beforeStills=manifestSceneKeys(beforeManifest); const afterStills=manifestSceneKeys(afterManifest);
 for(const scene of receipt.scenes??[]){
  for(const side of ["before","after"] as const){
   const source=side==="before"?beforeStills:afterStills;
   for(const still of scene[side]?.stills??[]){const live=source.get(`${scene.sceneId}:${still.kind}`);if(!live||live.sha256!==still.sha256||live.framingRevision!==scene[side].framingRevision)push(mismatches,"RECEIPT_TO_MANIFEST_STILL_BINDING_DRIFT",`${scene.sceneId}:${side}:${still.kind}`);}
  }
 }
}

const state=mismatches.length===0?"CURRENT":"STALE";
const output=resolve(arg("output")??`out/qa/project-real-media-preview/${receipt.projectId??"unknown"}/${receipt.projectId??"unknown"}-framing-before-after-currentness.json`);
const result={schemaVersion:"wedding-movie-real-media-framing-qa-comparison-currentness/v1",authority:"LIVE_REVALIDATION_OF_FRAMING_COMPARISON_AGAINST_SOURCE_MANIFESTS_STILLS_AND_CURRENT_MEDIA",generatedAt:new Date().toISOString(),projectId:receipt.projectId??null,state,source:{receiptPath,receiptSha256:existsSync(receiptPath)?sha256(receiptPath):null,currentMediaPath:mediaPath,currentMediaSha256:existsSync(mediaPath)?sha256(mediaPath):null,beforeManifestPath,afterManifestPath},checks:{receiptBoundaryValid:!mismatches.includes("RECEIPT_EVIDENCE_BOUNDARY_INVALID"),sourceManifestHashesCurrent:!mismatches.some((item)=>item.includes("MANIFEST_SHA_DRIFT")||item.includes("MANIFEST_MISSING")),stillFilesCurrent:!mismatches.some((item)=>item.startsWith("STILL_FILE_MISSING")||item.startsWith("STILL_SHA_DRIFT")),currentMediaBindingCurrent:!mismatches.some((item)=>item.startsWith("CURRENT_MEDIA_")),receiptManifestBindingCurrent:!mismatches.some((item)=>item.startsWith("RECEIPT_TO_MANIFEST_"))},mismatches,evidenceBoundary:{humanVisualReviewPerformed:false,humanVisualQa:"NOT_RUN",remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"CURRENT proves only that the framing comparison, both source QA manifests, referenced still files, and current production-media framing are mutually current. It never decides which framing is visually better or promotes Human/GUI evidence."}};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify({output,state,mismatchCount:mismatches.length,mismatches},null,2));
if(flag("strict-current")&&state!=="CURRENT")process.exit(2);
