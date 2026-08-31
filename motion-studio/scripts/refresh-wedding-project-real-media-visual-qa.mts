import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {spawnSync} from "node:child_process";

function arg(name:string){const prefix=`--${name}=`;const value=process.argv.find((item)=>item.startsWith(prefix));return value?value.slice(prefix.length):null;}
function fail(code:string,detail?:string):never{console.error(`${code}${detail?`: ${detail}`:""}`);process.exit(1);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function load(path:string){if(!existsSync(path))fail("REAL_MEDIA_VISUAL_QA_REFRESH_FILE_NOT_FOUND",path);try{return JSON.parse(readFileSync(path,"utf8"));}catch{fail("REAL_MEDIA_VISUAL_QA_REFRESH_JSON_INVALID",path);}}
function run(label:string,script:string,args:string[]){
  const scriptPath=resolve(script);
  if(!existsSync(scriptPath))fail("REAL_MEDIA_VISUAL_QA_REFRESH_CANONICAL_SCRIPT_MISSING",script);
  const result=spawnSync(process.execPath,["--no-warnings",scriptPath,...args],{stdio:"inherit"});
  if(result.status!==0)fail("REAL_MEDIA_VISUAL_QA_REFRESH_STEP_FAILED",label);
}

const selectedArg=arg("selected-manifest");
const auditArg=arg("readiness-audit");
if(!selectedArg)fail("REAL_MEDIA_VISUAL_QA_REFRESH_SELECTED_MANIFEST_REQUIRED");
if(!auditArg)fail("REAL_MEDIA_VISUAL_QA_REFRESH_READINESS_AUDIT_REQUIRED");
const selectedPath=resolve(selectedArg); const auditPath=resolve(auditArg);
const selected=load(selectedPath); const audit=load(auditPath);
if(selected.schemaVersion!=="wedding-movie-selected-scene-render-manifest/v1"||selected.authority!=="DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH")fail("REAL_MEDIA_VISUAL_QA_REFRESH_SELECTED_SCHEMA_MISMATCH");
if(audit.schemaVersion!=="wedding-movie-production-readiness-audit/v1"||audit.authority!=="DERIVED_FROM_CURRENT_HUMAN_MASTER_AND_REAL_MEDIA_BINDINGS")fail("REAL_MEDIA_VISUAL_QA_REFRESH_AUDIT_SCHEMA_MISMATCH");
if(selected.projectId!==audit.projectId||(selected.projectId!=="opening"&&selected.projectId!=="profile"))fail("REAL_MEDIA_VISUAL_QA_REFRESH_PROJECT_MISMATCH");
if(selected.summary?.allSelectionsCurrent!==true||audit.summary?.readyForContinuousRealMediaPreview!==true)fail("REAL_MEDIA_VISUAL_QA_REFRESH_AUTHORITY_NOT_CURRENT");
for(const boundary of [selected.evidenceBoundary,audit.evidenceBoundary]){
  if(boundary?.remotionStudioGuiActual!=="NOT_RUN")fail("REAL_MEDIA_VISUAL_QA_REFRESH_REMOTION_GUI_BOUNDARY_INVALID");
}
if(audit.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||audit.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")fail("REAL_MEDIA_VISUAL_QA_REFRESH_GUI_BOUNDARY_INVALID");

const projectId=selected.projectId as "opening"|"profile";
const outputDir=resolve(arg("output-dir")??`out/qa/project-real-media-preview/${projectId}`);
const previewPath=resolve(outputDir,`${projectId}-real-media-preview.mp4`);
const previewManifestPath=resolve(outputDir,`${projectId}-real-media-preview-manifest.json`);
const stillsDir=resolve(outputDir,"stills");
const stillsManifestPath=resolve(outputDir,`${projectId}-real-media-preview-qa-stills-manifest.json`);
const reviewPath=resolve(outputDir,`${projectId}-real-media-human-visual-review.json`);
const receiptPath=resolve(arg("receipt")??`${outputDir}/${projectId}-real-media-visual-qa-refresh-receipt.json`);
mkdirSync(outputDir,{recursive:true});

run("RENDER_REAL_MEDIA_PREVIEW","motion-studio/scripts/render-wedding-project-real-media-preview.mts",[
  `--selected-manifest=${selectedPath}`,`--readiness-audit=${auditPath}`,`--output=${previewPath}`,`--manifest=${previewManifestPath}`,"--render",
]);
run("EXTRACT_QA_STILLS","motion-studio/scripts/wedding-project-real-media-preview-qa-stills.mts",[
  `--preview-manifest=${previewManifestPath}`,`--output-dir=${stillsDir}`,`--manifest=${stillsManifestPath}`,
]);
run("INIT_HUMAN_VISUAL_REVIEW","motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts",[
  `--stills-manifest=${stillsManifestPath}`,"--init",`--output=${reviewPath}`,
]);

for(const path of [previewPath,previewManifestPath,stillsManifestPath,reviewPath])if(!existsSync(path))fail("REAL_MEDIA_VISUAL_QA_REFRESH_OUTPUT_MISSING",path);
const preview=load(previewManifestPath); const stills=load(stillsManifestPath); const review=load(reviewPath);
if(preview.render?.state!=="RENDERED"||preview.summary?.allRealMediaBoundCurrent!==true||preview.summary?.bgmCurrent!==true)fail("REAL_MEDIA_VISUAL_QA_REFRESH_PREVIEW_NOT_CURRENT");
if(stills.summary?.sourceCurrentVerified!==true||stills.summary?.humanVisualQa!=="NOT_RUN")fail("REAL_MEDIA_VISUAL_QA_REFRESH_STILLS_NOT_CURRENT");
if(review.finalVerdict!=="NOT_RUN"||review.evidenceBoundary?.humanVisualReviewPerformed!==false)fail("REAL_MEDIA_VISUAL_QA_REFRESH_REVIEW_NOT_FRESH_NOT_RUN");
if(review.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||review.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||review.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")fail("REAL_MEDIA_VISUAL_QA_REFRESH_REVIEW_GUI_BOUNDARY_INVALID");

const receipt={
  schemaVersion:"wedding-movie-real-media-visual-qa-refresh-receipt/v1",
  authority:"CANONICAL_CHAIN_FROM_CURRENT_SELECTED_SCENES_AND_READINESS_TO_FRESH_NOT_RUN_HUMAN_VISUAL_REVIEW",
  generatedAt:new Date().toISOString(), projectId,
  source:{selectedManifestPath:selectedPath,selectedManifestSha256:sha256(selectedPath),readinessAuditPath:auditPath,readinessAuditSha256:sha256(auditPath)},
  outputs:{previewPath,previewSha256:sha256(previewPath),previewManifestPath,previewManifestSha256:sha256(previewManifestPath),stillsManifestPath,stillsManifestSha256:sha256(stillsManifestPath),humanReviewPath:reviewPath,humanReviewSha256:sha256(reviewPath)},
  summary:{rendered:true,sourceCurrentVerified:true,humanVisualReview:"NOT_RUN",productionReady:false},
  evidenceBoundary:{remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",humanVisualReviewPerformed:false,productionReady:false,rule:"This command mechanically refreshes the real-media preview, QA stills, and a fresh NOT_RUN Human review template. It never creates Human PASS or GUI Actual evidence."},
};
mkdirSync(dirname(receiptPath),{recursive:true});writeFileSync(receiptPath,`${JSON.stringify(receipt,null,2)}\n`);
console.log(JSON.stringify({projectId,previewPath,previewManifestPath,stillsManifestPath,reviewPath,receiptPath,humanVisualReview:"NOT_RUN"},null,2));
