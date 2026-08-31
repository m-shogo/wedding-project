import {createHash} from "node:crypto";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";

const SCENE_CHECKS = ["CROP_SUBJECT_SAFE", "TITLE_READABLE", "TEXT_MEDIA_CONTRAST", "NO_UNINTENDED_EDGE_CLIP", "VISUAL_TEMPO_FEELS_INTENTIONAL"] as const;
const TRANSITION_CHECKS = ["TRANSITION_VISUALLY_CLEAN", "NO_FLASH_OR_UNINTENDED_BLACK_FRAME", "SUBJECT_CONTINUITY_ACCEPTABLE"] as const;
type Verdict = "NOT_RUN" | "PASS" | "FAIL";

function arg(name:string){const p=`--${name}=`;const v=process.argv.find((x)=>x.startsWith(p));return v?v.slice(p.length):null;}
function flag(name:string){return process.argv.includes(`--${name}`);}
function fail(code:string,detail?:string):never{console.error(`${code}${detail?`: ${detail}`:""}`);process.exit(1);}
function sha256(path:string){return createHash("sha256").update(readFileSync(path)).digest("hex");}
function fingerprint(v:unknown){return createHash("sha256").update(JSON.stringify(v)).digest("hex");}
function load(path:string){if(!existsSync(path))fail("REAL_PREVIEW_VISUAL_REVIEW_FILE_NOT_FOUND",path);try{return JSON.parse(readFileSync(path,"utf8"));}catch{fail("REAL_PREVIEW_VISUAL_REVIEW_JSON_INVALID",path);}}

const stillsArg=arg("stills-manifest");
if(!stillsArg)fail("REAL_PREVIEW_VISUAL_REVIEW_STILLS_MANIFEST_REQUIRED");
const stillsPath=resolve(stillsArg); const stills=load(stillsPath);
if(stills.schemaVersion!=="wedding-movie-real-media-preview-qa-stills/v1"||stills.authority!=="DERIVED_VISUAL_QA_ARTIFACTS_FROM_CURRENT_REAL_MEDIA_PREVIEW")fail("REAL_PREVIEW_VISUAL_REVIEW_STILLS_SCHEMA_MISMATCH");
if(stills.projectId!=="opening"&&stills.projectId!=="profile")fail("REAL_PREVIEW_VISUAL_REVIEW_PROJECT_INVALID");
if(stills.summary?.sourceCurrentVerified!==true||stills.summary?.humanVisualQa!=="NOT_RUN"||stills.summary?.productionReady!==false)fail("REAL_PREVIEW_VISUAL_REVIEW_STILLS_NOT_CURRENT");
if(stills.evidenceBoundary?.visualQa!=="NOT_RUN"||stills.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||stills.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||stills.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN")fail("REAL_PREVIEW_VISUAL_REVIEW_BOUNDARY_INVALID");
const previewManifestPath=resolve(stills.source?.previewManifestPath??"");
const previewPath=resolve(stills.source?.previewPath??"");
if(!existsSync(previewManifestPath)||sha256(previewManifestPath)!==stills.source?.previewManifestSha256)fail("REAL_PREVIEW_VISUAL_REVIEW_PREVIEW_MANIFEST_STALE");
if(!existsSync(previewPath)||sha256(previewPath)!==stills.source?.previewSha256)fail("REAL_PREVIEW_VISUAL_REVIEW_PREVIEW_VIDEO_STALE");
for(const item of [...(stills.stills??[]),...(stills.transitionStills??[])]){const p=resolve(item.path??"");if(!existsSync(p)||sha256(p)!==item.sha256)fail("REAL_PREVIEW_VISUAL_REVIEW_STILL_STALE",String(item.path));}
const scenes=[...new Map((stills.stills??[]).map((s:any)=>[s.sceneId,{sceneId:s.sceneId,sourceRevision:s.sourceRevision,patternId:s.patternId,productionRole:s.productionRole}])).values()];
const transitions=(stills.transitionStills??[]).map((t:any)=>({fromSceneId:t.fromSceneId,toSceneId:t.toSceneId,durationFrames:t.durationFrames,frame:t.frame,stillSha256:t.sha256}));
const identity={projectId:stills.projectId,stillsManifestSha256:sha256(stillsPath),previewManifestSha256:stills.source.previewManifestSha256,previewSha256:stills.source.previewSha256,scenes,transitions};
const identityFingerprint=fingerprint(identity);
const output=resolve(arg("output")??`out/qa/project-real-media-preview/${stills.projectId}/${stills.projectId}-real-media-human-visual-review.json`);

if(flag("init")){
 const review={schemaVersion:"wedding-movie-real-media-human-visual-review/v1",authority:"EXPLICIT_HUMAN_REVIEW_OF_CURRENT_REAL_MEDIA_PREVIEW_QA_STILLS",generatedAt:new Date().toISOString(),projectId:stills.projectId,source:{stillsManifestPath:stillsPath,stillsManifestSha256:identity.stillsManifestSha256,previewManifestSha256:identity.previewManifestSha256,previewSha256:identity.previewSha256,identityFingerprint},instructions:"Inspect the extracted Scene and transition stills and play the bound real-media preview when judging tempo. Change only verdict/notes/reviewer/reviewedAt and humanVisualReviewPerformed after actual Human review. NOT_RUN is never PASS or FAIL.",scenes:scenes.map((s:any)=>({...s,checks:Object.fromEntries(SCENE_CHECKS.map((c)=>[c,{verdict:"NOT_RUN" as Verdict,notes:""}]))})),transitions:transitions.map((t:any)=>({...t,checks:Object.fromEntries(TRANSITION_CHECKS.map((c)=>[c,{verdict:"NOT_RUN" as Verdict,notes:""}]))})),finalVerdict:"NOT_RUN" as Verdict,finalNotes:"",reviewer:null,reviewedAt:null,evidenceBoundary:{humanVisualReviewPerformed:false,remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false}};
 mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(review,null,2)}\n`);console.log(JSON.stringify({mode:"init",output,projectId:stills.projectId,scenes:review.scenes.length,transitions:review.transitions.length,identityFingerprint},null,2));process.exit(0);
}

const reviewArg=arg("review"); if(!reviewArg)fail("REAL_PREVIEW_VISUAL_REVIEW_HUMAN_REVIEW_REQUIRED");
const reviewPath=resolve(reviewArg); const review=load(reviewPath);
if(review.schemaVersion!=="wedding-movie-real-media-human-visual-review/v1"||review.authority!=="EXPLICIT_HUMAN_REVIEW_OF_CURRENT_REAL_MEDIA_PREVIEW_QA_STILLS")fail("REAL_PREVIEW_VISUAL_REVIEW_HUMAN_SCHEMA_MISMATCH");
if(review.projectId!==stills.projectId||review.source?.stillsManifestSha256!==identity.stillsManifestSha256||review.source?.previewManifestSha256!==identity.previewManifestSha256||review.source?.previewSha256!==identity.previewSha256||review.source?.identityFingerprint!==identityFingerprint)fail("REAL_PREVIEW_VISUAL_REVIEW_HUMAN_SOURCE_STALE");
if(review.evidenceBoundary?.remotionStudioGuiActual!=="NOT_RUN"||review.evidenceBoundary?.palmierGuiActual!=="NOT_RUN"||review.evidenceBoundary?.macDaVinciGuiActual!=="NOT_RUN"||review.evidenceBoundary?.productionReady!==false)fail("REAL_PREVIEW_VISUAL_REVIEW_HUMAN_BOUNDARY_INVALID");
const failures:any[]=[]; let notRun=0;
function checkVerdict(v:any,label:string){if(!["NOT_RUN","PASS","FAIL"].includes(v))fail("REAL_PREVIEW_VISUAL_REVIEW_VERDICT_INVALID",label);if(v==="NOT_RUN")notRun++;return v as Verdict;}
if(!Array.isArray(review.scenes)||review.scenes.length!==scenes.length)fail("REAL_PREVIEW_VISUAL_REVIEW_SCENE_COUNT_MISMATCH");
review.scenes.forEach((scene:any,i:number)=>{const expected:any=scenes[i];for(const k of ["sceneId","sourceRevision","patternId","productionRole"]){if(scene[k]!==expected[k])fail("REAL_PREVIEW_VISUAL_REVIEW_SCENE_IDENTITY_MISMATCH",`${expected.sceneId}:${k}`);}for(const c of SCENE_CHECKS){const v=checkVerdict(scene.checks?.[c]?.verdict,`${scene.sceneId}:${c}`);if(v==="FAIL")failures.push({kind:"SCENE",sceneId:scene.sceneId,sourceRevision:scene.sourceRevision,patternId:scene.patternId,productionRole:scene.productionRole,check:c,notes:String(scene.checks?.[c]?.notes??""),returnTo:c==="CROP_SUBJECT_SAFE"?"REAL_MEDIA_CROP":c==="VISUAL_TEMPO_FEELS_INTENTIONAL"?"SCENE_TIMING_AND_RHYTHM":"SCENE_BOUND_A_B_COMPARE"});}});
if(!Array.isArray(review.transitions)||review.transitions.length!==transitions.length)fail("REAL_PREVIEW_VISUAL_REVIEW_TRANSITION_COUNT_MISMATCH");
review.transitions.forEach((tr:any,i:number)=>{const e:any=transitions[i];for(const k of ["fromSceneId","toSceneId","durationFrames","frame","stillSha256"]){if(tr[k]!==e[k])fail("REAL_PREVIEW_VISUAL_REVIEW_TRANSITION_IDENTITY_MISMATCH",`${e.fromSceneId}->${e.toSceneId}:${k}`);}for(const c of TRANSITION_CHECKS){const v=checkVerdict(tr.checks?.[c]?.verdict,`${tr.fromSceneId}->${tr.toSceneId}:${c}`);if(v==="FAIL")failures.push({kind:"TRANSITION",fromSceneId:tr.fromSceneId,toSceneId:tr.toSceneId,durationFrames:tr.durationFrames,check:c,notes:String(tr.checks?.[c]?.notes??""),returnTo:"SCENE_EDGE_TRANSITION"});}});
const finalVerdict=checkVerdict(review.finalVerdict,"finalVerdict");
if((failures.length>0||finalVerdict!=="NOT_RUN")&&review.evidenceBoundary?.humanVisualReviewPerformed!==true)fail("REAL_PREVIEW_VISUAL_REVIEW_HUMAN_REVIEW_NOT_CONFIRMED");
if(finalVerdict==="PASS"&&(failures.length>0||notRun>0))fail("REAL_PREVIEW_VISUAL_REVIEW_PASS_INCOMPLETE");
if(finalVerdict!=="NOT_RUN"&&(!review.reviewer||!review.reviewedAt))fail("REAL_PREVIEW_VISUAL_REVIEW_REVIEWER_REQUIRED");
const queue={schemaVersion:"wedding-movie-real-media-visual-correction-queue/v1",authority:"DERIVED_ONLY_FROM_EXPLICIT_HUMAN_REAL_MEDIA_VISUAL_FAIL_VERDICTS",generatedAt:new Date().toISOString(),projectId:stills.projectId,source:{stillsManifestPath:stillsPath,stillsManifestSha256:identity.stillsManifestSha256,humanReviewPath:reviewPath,humanReviewSha256:sha256(reviewPath),identityFingerprint},failures,summary:{failedChecks:failures.length,notRunChecks:notRun,finalVerdict,reviewComplete:notRun===0&&finalVerdict!=="NOT_RUN",correctionRequired:failures.length>0,productionReady:false},nextActions:failures.length?{fixFailedScenes:true,rerenderRealPreview:`node --no-warnings motion-studio/scripts/wedding-project-real-media-preview.mts --project=${stills.projectId} --render`,extractFreshQaStills:`node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-qa-stills.mts --preview-manifest=\"$HOME/Downloads/${stills.projectId}-real-media-preview-manifest.json\"`,initFreshVisualReview:`node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts --stills-manifest=\"$HOME/Downloads/${stills.projectId}-real-media-preview-qa-stills-manifest.json\" --init`}:null,evidenceBoundary:{humanVisualReviewPerformed:review.evidenceBoundary?.humanVisualReviewPerformed===true,remotionStudioGuiActual:"NOT_RUN",palmierGuiActual:"NOT_RUN",macDaVinciGuiActual:"NOT_RUN",productionReady:false,rule:"Only explicit Human FAIL verdicts become correction work. Mechanical still extraction, CLI render, and CI fixtures never create Human visual PASS or GUI Actual evidence."}};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,`${JSON.stringify(queue,null,2)}\n`);console.log(JSON.stringify({mode:"finalize",output,projectId:stills.projectId,failures:failures.length,notRun,finalVerdict},null,2));