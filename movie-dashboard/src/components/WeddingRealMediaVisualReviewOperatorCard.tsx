import {useEffect, useMemo, useState} from "react";
import {
  MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT,
  requestMotionZukanSceneFocus,
  type MotionZukanSceneFocusRequest,
} from "../data/motionZukanSceneFocus";
import {
  listProjectSceneTransitionSelections,
  PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT,
  resolveProjectSceneTransitions,
} from "../data/projectSceneTransitionSelectionStore";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type SceneProjectId,
} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

type Verdict = "NOT_RUN" | "PASS" | "FAIL";
type Check = {verdict: Verdict; notes: string};
type Review = {
  schemaVersion: "wedding-movie-real-media-human-visual-review/v1";
  authority: string;
  projectId: SceneProjectId;
  source: {stillsManifestSha256: string; previewManifestSha256: string; previewSha256: string; identityFingerprint: string};
  scenes: Array<{sceneId: string; sourceRevision: string; patternId: string; productionRole: string; checks: Record<string, Check>}>;
  transitions: Array<{fromSceneId: string; toSceneId: string; fromSourceRevision: string; toSourceRevision: string; durationFrames: number; frame: number; stillSha256: string; checks: Record<string, Check>}>;
  finalVerdict: Verdict;
  finalNotes: string;
  reviewer: string | null;
  reviewedAt: string | null;
  evidenceBoundary: {humanVisualReviewPerformed: boolean; remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};
type SceneFailure = {
  kind: "SCENE"; sceneId: string; sourceRevision: string; patternId: string; productionRole: string;
  check: "CROP_SUBJECT_SAFE" | "TITLE_READABLE" | "TEXT_MEDIA_CONTRAST" | "NO_UNINTENDED_EDGE_CLIP" | "VISUAL_TEMPO_FEELS_INTENTIONAL";
  notes: string; returnTo: "REAL_MEDIA_CROP" | "SCENE_TIMING_AND_RHYTHM" | "SCENE_BOUND_A_B_COMPARE";
};
type TransitionFailure = {
  kind: "TRANSITION"; fromSceneId: string; toSceneId: string; fromSourceRevision: string; toSourceRevision: string; durationFrames: number;
  check: "TRANSITION_VISUALLY_CLEAN" | "NO_FLASH_OR_UNINTENDED_BLACK_FRAME" | "SUBJECT_CONTINUITY_ACCEPTABLE";
  notes: string; returnTo: "SCENE_EDGE_TRANSITION";
};
type VisualCorrectionQueue = {
  schemaVersion: "wedding-movie-real-media-visual-correction-queue/v1";
  authority: "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_REAL_MEDIA_VISUAL_FAIL_VERDICTS";
  projectId: SceneProjectId;
  source: {stillsManifestSha256: string; humanReviewSha256: string; identityFingerprint: string};
  failures: Array<SceneFailure | TransitionFailure>;
  summary: {failedChecks: number; correctionRequired: boolean; productionReady: false};
  nextActions?: {rerenderRealPreview?: string; extractFreshQaStills?: string; initFreshVisualReview?: string} | null;
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};

type QueueCurrentness = {status: "CURRENT" | "STALE"; mismatches: string[]; staleKeys: Set<string>};
const failureKey = (failure: SceneFailure | TransitionFailure, index: number) => failure.kind === "SCENE" ? `SCENE:${failure.sceneId}:${index}` : `TRANSITION:${failure.fromSceneId}->${failure.toSceneId}:${index}`;

function shapeValid(value: unknown, projectId: SceneProjectId): value is Review {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<Review>;
  return review.schemaVersion === "wedding-movie-real-media-human-visual-review/v1" && review.projectId === projectId && Array.isArray(review.scenes) && Array.isArray(review.transitions)
    && review.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN" && review.evidenceBoundary?.palmierGuiActual === "NOT_RUN"
    && review.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN" && review.evidenceBoundary?.productionReady === false;
}
function queueShapeValid(value: unknown, projectId: SceneProjectId): value is VisualCorrectionQueue {
  if (!value || typeof value !== "object") return false;
  const queue = value as Partial<VisualCorrectionQueue>;
  return queue.schemaVersion === "wedding-movie-real-media-visual-correction-queue/v1"
    && queue.authority === "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_REAL_MEDIA_VISUAL_FAIL_VERDICTS" && queue.projectId === projectId && Array.isArray(queue.failures)
    && queue.summary?.productionReady === false && queue.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN"
    && queue.evidenceBoundary?.palmierGuiActual === "NOT_RUN" && queue.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN" && queue.evidenceBoundary?.productionReady === false;
}
function updateCheck(review: Review, kind: "scene" | "transition", index: number, key: string, patch: Partial<Check>): Review {
  const next = structuredClone(review); const target = kind === "scene" ? next.scenes[index] : next.transitions[index]; target.checks[key] = {...target.checks[key], ...patch}; return next;
}
function resolveQueueCurrentness(queue: VisualCorrectionQueue): QueueCurrentness {
  const composer = loadMotionZukanComposerState();
  const mismatches: string[] = []; const staleKeys = new Set<string>();
  const timeline = composer.timelines.find((item) => item.projectId === queue.projectId);
  const transitions = timeline ? resolveProjectSceneTransitions(queue.projectId, composer.scenes, timeline, listProjectSceneTransitionSelections(queue.projectId)) : [];
  queue.failures.forEach((failure, index) => {
    const key = failureKey(failure, index);
    if (failure.kind === "SCENE") {
      const current = composer.scenes.find((scene) => scene.projectId === queue.projectId && scene.sceneId === failure.sceneId);
      if (!current || current.updatedAt !== failure.sourceRevision) { staleKeys.add(key); mismatches.push(`${failure.sceneId}: Scene revision changed`); }
      return;
    }
    const from = composer.scenes.find((scene) => scene.projectId === queue.projectId && scene.sceneId === failure.fromSceneId);
    const to = composer.scenes.find((scene) => scene.projectId === queue.projectId && scene.sceneId === failure.toSceneId);
    const edge = transitions.find((item) => item.fromSceneId === failure.fromSceneId && item.toSceneId === failure.toSceneId);
    if (!from || !to || from.updatedAt !== failure.fromSourceRevision || to.updatedAt !== failure.toSourceRevision) {
      staleKeys.add(key); mismatches.push(`${failure.fromSceneId}→${failure.toSceneId}: Scene edge revision changed`); return;
    }
    if (!edge || edge.transition !== "CROSS_DISSOLVE" || edge.durationFrames !== failure.durationFrames) {
      staleKeys.add(key); mismatches.push(`${failure.fromSceneId}→${failure.toSceneId}: transition intent changed`);
    }
  });
  return {status: mismatches.length ? "STALE" : "CURRENT", mismatches, staleKeys};
}

export function WeddingRealMediaVisualReviewOperatorCard({projectId}: {projectId: SceneProjectId}) {
  const [review, setReview] = useState<Review | null>(null);
  const [queue, setQueue] = useState<VisualCorrectionQueue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queueError, setQueueError] = useState<string | null>(null);
  const [navigationFeedback, setNavigationFeedback] = useState<string | null>(null);
  const [authorityRevision, setAuthorityRevision] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const counts = useMemo(() => { if (!review) return {pass:0,fail:0,notRun:0}; const verdicts=[...review.scenes.flatMap((s)=>Object.values(s.checks).map((x)=>x.verdict)),...review.transitions.flatMap((t)=>Object.values(t.checks).map((x)=>x.verdict))]; return {pass:verdicts.filter((x)=>x==="PASS").length,fail:verdicts.filter((x)=>x==="FAIL").length,notRun:verdicts.filter((x)=>x==="NOT_RUN").length}; },[review]);
  const queueCurrentness = useMemo(() => queue ? resolveQueueCurrentness(queue) : null, [queue, authorityRevision]);
  const finalizeCommand=`node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts --stills-manifest="$HOME/Downloads/${projectId}-real-media-preview-qa-stills-manifest.json" --review="$HOME/Downloads/${projectId}-real-media-human-visual-review.json" --output="$HOME/Downloads/${projectId}-real-media-visual-correction-queue.json"`;
  const initCommand=`node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts --stills-manifest="$HOME/Downloads/${projectId}-real-media-preview-qa-stills-manifest.json" --init --output="$HOME/Downloads/${projectId}-real-media-human-visual-review.json"`;

  useEffect(()=>{const refresh=()=>setAuthorityRevision((v)=>v+1); window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,refresh); window.addEventListener(PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT,refresh); return()=>{window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,refresh);window.removeEventListener(PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT,refresh);};},[]);
  useEffect(()=>{function onFocusResolved(event:Event){const request=(event as CustomEvent<MotionZukanSceneFocusRequest>).detail;if(!request||request.projectId!==projectId||request.requestedBy!=="REAL_MEDIA_VISUAL_CORRECTION_QUEUE"||request.axis!=="CROP_SUBJECT_SAFE")return;window.setTimeout(()=>{const selector=projectId==="opening"?"[data-opening-crop-review-operator]":"[data-profile-real-media-review-operator]";document.querySelector<HTMLElement>(selector)?.scrollIntoView({behavior:"smooth",block:"center"});},0);}window.addEventListener(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT,onFocusResolved);return()=>window.removeEventListener(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT,onFocusResolved);},[projectId]);

  async function loadFile(file:File|null){if(!file)return;setError(null);try{const value=JSON.parse(await file.text());if(!shapeValid(value,projectId))throw new Error("schema / project / evidence boundary mismatch");setReview(value);}catch(cause){setReview(null);setError(cause instanceof Error?cause.message:"invalid visual review JSON");}}
  async function loadQueue(file:File|null){if(!file)return;setQueueError(null);setNavigationFeedback(null);try{const value=JSON.parse(await file.text());if(!queueShapeValid(value,projectId))throw new Error("correction queue schema / project / evidence boundary mismatch");setQueue(value);setAuthorityRevision((v)=>v+1);}catch(cause){setQueue(null);setQueueError(cause instanceof Error?cause.message:"invalid visual correction queue JSON");}}
  function focusCorrectionTarget(failure:SceneFailure|TransitionFailure,index:number){setNavigationFeedback(null);if(queueCurrentness?.status!=="CURRENT"){setNavigationFeedback("修正navigation拒否: queueはSTALEです。real preview → QA stills → Human reviewをfreshに作り直してください。");return;}if(queueCurrentness.staleKeys.has(failureKey(failure,index)))return;const composer=loadMotionZukanComposerState();if(failure.kind==="TRANSITION"){const from=composer.scenes.find((s)=>s.projectId===projectId&&s.sceneId===failure.fromSceneId);const to=composer.scenes.find((s)=>s.projectId===projectId&&s.sceneId===failure.toSceneId);if(!from||!to||from.updatedAt!==failure.fromSourceRevision||to.updatedAt!==failure.toSourceRevision){setAuthorityRevision((v)=>v+1);setNavigationFeedback("修正navigation拒否: transition edgeがSTALEです。");return;}requestMotionZukanSceneFocus({projectId,sceneId:failure.toSceneId,sourceRevision:failure.toSourceRevision,axis:"TRANSITION",surface:"SCENE_TIMING_AND_A_B_COMPARE",requestedBy:"REAL_MEDIA_VISUAL_CORRECTION_QUEUE"});setNavigationFeedback(`transition修正へ: ${failure.fromSceneId} → ${failure.toSceneId}`);return;}const current=composer.scenes.find((s)=>s.projectId===projectId&&s.sceneId===failure.sceneId);if(!current||current.updatedAt!==failure.sourceRevision){setAuthorityRevision((v)=>v+1);setNavigationFeedback(`修正navigation拒否: ${failure.sceneId} はSTALEです。`);return;}const axis=failure.check==="VISUAL_TEMPO_FEELS_INTENTIONAL"?"PACING":failure.check;const surface=failure.returnTo==="SCENE_BOUND_A_B_COMPARE"?"SCENE_BOUND_A_B_COMPARE":"SCENE_TIMING_AND_A_B_COMPARE";requestMotionZukanSceneFocus({projectId,sceneId:failure.sceneId,sourceRevision:failure.sourceRevision,axis,surface,requestedBy:"REAL_MEDIA_VISUAL_CORRECTION_QUEUE"});setNavigationFeedback(`修正surfaceへ: ${failure.sceneId} / ${failure.check}`);}
  async function copy(value:string,key:string){await navigator.clipboard.writeText(value);setCopied(key);window.setTimeout(()=>setCopied(null),1200);}
  function setVerdict(kind:"scene"|"transition",index:number,key:string,verdict:Verdict){if(review)setReview(updateCheck(review,kind,index,key,{verdict}));}
  function setNotes(kind:"scene"|"transition",index:number,key:string,notes:string){if(review)setReview(updateCheck(review,kind,index,key,{notes}));}

  return <section className="mt-3 border-2 border-fuchsia-300 p-3 dark:border-fuchsia-800" data-real-media-visual-review-operator={projectId}>
    <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-[8px] font-semibold tracking-[0.14em] text-fuchsia-700 dark:text-fuchsia-300">REAL-MEDIA VISUAL QA OPERATOR / {projectId.toUpperCase()}</p><p className="mt-1 text-[11px] font-semibold">{review?`PASS ${counts.pass} / FAIL ${counts.fail} / NOT_RUN ${counts.notRun}`:"Human review JSONを読み込んでScene/transitionを判定"}</p></div><div className="flex flex-wrap gap-1"><label className="cursor-pointer border border-fuchsia-300 px-2 py-1 text-[8px]">Review JSON読込<input className="hidden" type="file" accept="application/json,.json" onChange={(e)=>void loadFile(e.target.files?.[0]??null)}/></label><label className="cursor-pointer border border-amber-300 px-2 py-1 text-[8px]">Correction Queue読込<input className="hidden" type="file" accept="application/json,.json" onChange={(e)=>void loadQueue(e.target.files?.[0]??null)}/></label></div></div>
    <div className="mt-2 grid gap-1 text-[7px]"><code className="overflow-x-auto whitespace-nowrap">{initCommand}</code><button type="button" className="w-fit border px-2 py-1" onClick={()=>void copy(initCommand,"init")}>{copied==="init"?"COPIED ✓":"fresh review init command"}</button></div>
    {error?<p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">VISUAL_REVIEW_INVALID: {error}</p>:null}{queueError?<p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">VISUAL_CORRECTION_QUEUE_INVALID: {queueError}</p>:null}
    {queue&&queueCurrentness?<div className={`mt-3 border-2 p-3 ${queueCurrentness.status==="CURRENT"?"border-amber-300 dark:border-amber-800":"border-rose-400 dark:border-rose-800"}`} data-real-media-visual-correction-queue={projectId} data-real-media-visual-correction-currentness={queueCurrentness.status}><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[8px] font-semibold tracking-[0.14em]">VISUAL CORRECTION QUEUE / LIVE CURRENTNESS</p><p className="mt-1 text-[10px] font-semibold">{queueCurrentness.status} · Human FAIL {queue.failures.length}件</p></div><span className="font-mono text-[7px]">identity {queue.source.identityFingerprint?.slice(0,12)}…</span></div>{queueCurrentness.status==="STALE"?<div className="mt-2 border border-rose-300 p-2 text-[7px] text-rose-700 dark:text-rose-300"><strong>旧preview / stills / Human review / correction queueはSTALE。</strong>{queueCurrentness.mismatches.map((m)=><p key={m}>• {m}</p>)}<p className="mt-1">修正後はreal preview再render → fresh QA stills → fresh Human reviewが必要です。</p>{[queue.nextActions?.rerenderRealPreview,queue.nextActions?.extractFreshQaStills,queue.nextActions?.initFreshVisualReview].filter(Boolean).map((cmd)=><code key={cmd} className="mt-1 block overflow-x-auto whitespace-nowrap">{cmd}</code>)}</div>:null}<div className="mt-2 space-y-1">{queue.failures.map((failure,index)=>{const stale=queueCurrentness.staleKeys.has(failureKey(failure,index));return <div key={failureKey(failure,index)} className={`flex flex-wrap items-center justify-between gap-2 border p-2 text-[7px] ${stale?"border-rose-300 opacity-60":"border-amber-200 dark:border-amber-900"}`}><div>{failure.kind==="SCENE"?<><strong>{failure.sceneId}</strong> / {failure.check} / {failure.returnTo}</>:<><strong>{failure.fromSceneId} → {failure.toSceneId}</strong> / {failure.check} / {failure.returnTo}</>}<p className="mt-1 text-navy-400">{failure.notes||"Human notesなし"}</p></div><button type="button" disabled={queueCurrentness.status!=="CURRENT"||stale} onClick={()=>focusCorrectionTarget(failure,index)} className="border border-amber-400 px-2 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-40" data-real-media-visual-correction-focus={failure.kind==="SCENE"?failure.sceneId:`${failure.fromSceneId}->${failure.toSceneId}`}>{stale?"STALE":"修正Sceneへ"}</button></div>;})}</div>{navigationFeedback?<p role="status" className={`mt-2 border px-2 py-1.5 text-[7px] ${navigationFeedback.includes("拒否")?"border-rose-300 text-rose-700":"border-emerald-300 text-emerald-700"}`}>{navigationFeedback}</p>:null}<p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px]">composer/transition authority変更をlive監視し、1件でもsource bindingが変わった旧queueは全体をSTALE化します。silent rebaseしません。</p></div>:null}
    {review?<><div className="mt-3 space-y-2">{review.scenes.map((scene,index)=><div key={scene.sceneId} className="border p-2 text-[7px]" data-real-media-visual-review-scene={scene.sceneId}><p className="font-semibold">{scene.sceneId} / {scene.patternId} / {scene.productionRole}</p>{Object.entries(scene.checks).map(([key,check])=><div key={key} className="mt-1 grid gap-1 sm:grid-cols-[1fr_90px_2fr]"><span>{key}</span><select value={check.verdict} onChange={(e)=>setVerdict("scene",index,key,e.target.value as Verdict)} className="border bg-transparent"><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select><input value={check.notes} onChange={(e)=>setNotes("scene",index,key,e.target.value)} placeholder="Human notes" className="border bg-transparent px-1"/></div>)}</div>)}{review.transitions.map((tr,index)=><div key={`${tr.fromSceneId}:${tr.toSceneId}`} className="border p-2 text-[7px]" data-real-media-visual-review-transition={`${tr.fromSceneId}->${tr.toSceneId}`}><p className="font-semibold">{tr.fromSceneId} → {tr.toSceneId} / {tr.durationFrames}f</p>{Object.entries(tr.checks).map(([key,check])=><div key={key} className="mt-1 grid gap-1 sm:grid-cols-[1fr_90px_2fr]"><span>{key}</span><select value={check.verdict} onChange={(e)=>setVerdict("transition",index,key,e.target.value as Verdict)} className="border bg-transparent"><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select><input value={check.notes} onChange={(e)=>setNotes("transition",index,key,e.target.value)} placeholder="Human notes" className="border bg-transparent px-1"/></div>)}</div>)}</div><div className="mt-3 grid gap-2 border-t pt-2 text-[7px]"><label>Overall <select value={review.finalVerdict} onChange={(e)=>setReview({...review,finalVerdict:e.target.value as Verdict})} className="ml-1 border bg-transparent"><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select></label><input value={review.reviewer??""} onChange={(e)=>setReview({...review,reviewer:e.target.value||null})} placeholder="Human reviewer" className="border bg-transparent px-1"/><input value={review.reviewedAt??""} onChange={(e)=>setReview({...review,reviewedAt:e.target.value||null})} placeholder="reviewedAt ISO-8601" className="border bg-transparent px-1"/><label><input type="checkbox" checked={review.evidenceBoundary.humanVisualReviewPerformed} onChange={(e)=>setReview({...review,evidenceBoundary:{...review.evidenceBoundary,humanVisualReviewPerformed:e.target.checked}})}/> 実際にHuman visual reviewを行った</label><button type="button" onClick={()=>downloadText(`${JSON.stringify(review,null,2)}\n`,`${projectId}-real-media-human-visual-review.json`)} className="w-fit border px-2 py-1 font-semibold">Human review JSONを書き出す</button><code className="overflow-x-auto whitespace-nowrap">{finalizeCommand}</code><button type="button" className="w-fit border px-2 py-1" onClick={()=>void copy(finalizeCommand,"finalize")}>{copied==="finalize"?"COPIED ✓":"canonical finalize command"}</button></div></>:null}
    <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] text-amber-800 dark:text-amber-200">PASSは自動設定しません。CURRENT/STALEはnavigation safetyだけです。Remotion Studio / Palmier / Mac DaVinci GUI ActualはNOT_RUN、productionReady=falseのままです。</p>
  </section>;
}
