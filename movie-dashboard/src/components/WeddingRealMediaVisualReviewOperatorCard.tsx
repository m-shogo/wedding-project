import {useMemo, useState} from "react";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

type Verdict = "NOT_RUN" | "PASS" | "FAIL";
type Check = {verdict: Verdict; notes: string};
type Review = {
  schemaVersion: "wedding-movie-real-media-human-visual-review/v1";
  authority: string;
  projectId: SceneProjectId;
  source: {stillsManifestSha256: string; previewManifestSha256: string; previewSha256: string; identityFingerprint: string};
  scenes: Array<{sceneId: string; sourceRevision: string; patternId: string; productionRole: string; checks: Record<string, Check>}>;
  transitions: Array<{fromSceneId: string; toSceneId: string; durationFrames: number; frame: number; stillSha256: string; checks: Record<string, Check>}>;
  finalVerdict: Verdict;
  finalNotes: string;
  reviewer: string | null;
  reviewedAt: string | null;
  evidenceBoundary: {humanVisualReviewPerformed: boolean; remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};

function shapeValid(value: unknown, projectId: SceneProjectId): value is Review {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<Review>;
  return review.schemaVersion === "wedding-movie-real-media-human-visual-review/v1"
    && review.projectId === projectId
    && Array.isArray(review.scenes)
    && Array.isArray(review.transitions)
    && review.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN"
    && review.evidenceBoundary?.palmierGuiActual === "NOT_RUN"
    && review.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN"
    && review.evidenceBoundary?.productionReady === false;
}

function updateCheck(review: Review, kind: "scene" | "transition", index: number, key: string, patch: Partial<Check>): Review {
  const next = structuredClone(review);
  const target = kind === "scene" ? next.scenes[index] : next.transitions[index];
  target.checks[key] = {...target.checks[key], ...patch};
  return next;
}

export function WeddingRealMediaVisualReviewOperatorCard({projectId}: {projectId: SceneProjectId}) {
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const counts = useMemo(() => {
    if (!review) return {pass: 0, fail: 0, notRun: 0};
    const verdicts = [...review.scenes.flatMap((scene) => Object.values(scene.checks).map((x) => x.verdict)), ...review.transitions.flatMap((transition) => Object.values(transition.checks).map((x) => x.verdict))];
    return {pass: verdicts.filter((x) => x === "PASS").length, fail: verdicts.filter((x) => x === "FAIL").length, notRun: verdicts.filter((x) => x === "NOT_RUN").length};
  }, [review]);

  const finalizeCommand = `node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts --stills-manifest="$HOME/Downloads/${projectId}-real-media-preview-qa-stills-manifest.json" --review="$HOME/Downloads/${projectId}-real-media-human-visual-review.json" --output="$HOME/Downloads/${projectId}-real-media-visual-correction-queue.json"`;
  const initCommand = `node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-visual-review.mts --stills-manifest="$HOME/Downloads/${projectId}-real-media-preview-qa-stills-manifest.json" --init --output="$HOME/Downloads/${projectId}-real-media-human-visual-review.json"`;

  async function loadFile(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const value = JSON.parse(await file.text());
      if (!shapeValid(value, projectId)) throw new Error("schema / project / evidence boundary mismatch");
      setReview(value);
    } catch (cause) {
      setReview(null);
      setError(cause instanceof Error ? cause.message : "invalid visual review JSON");
    }
  }
  async function copy(value: string, key: string) { await navigator.clipboard.writeText(value); setCopied(key); window.setTimeout(() => setCopied(null), 1200); }
  function setVerdict(kind: "scene" | "transition", index: number, key: string, verdict: Verdict) { if (review) setReview(updateCheck(review, kind, index, key, {verdict})); }
  function setNotes(kind: "scene" | "transition", index: number, key: string, notes: string) { if (review) setReview(updateCheck(review, kind, index, key, {notes})); }

  return (
    <section className="mt-3 border-2 border-fuchsia-300 p-3 dark:border-fuchsia-800" data-real-media-visual-review-operator={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div><p className="text-[8px] font-semibold tracking-[0.14em] text-fuchsia-700 dark:text-fuchsia-300">REAL-MEDIA VISUAL QA OPERATOR / {projectId.toUpperCase()}</p><p className="mt-1 text-[11px] font-semibold">{review ? `PASS ${counts.pass} / FAIL ${counts.fail} / NOT_RUN ${counts.notRun}` : "Human review JSONを読み込んでScene/transitionを判定"}</p></div>
        <label className="cursor-pointer border border-fuchsia-300 px-2 py-1 text-[8px] dark:border-fuchsia-800">Review JSON読込<input className="hidden" type="file" accept="application/json,.json" onChange={(event) => void loadFile(event.target.files?.[0] ?? null)} /></label>
      </div>
      <div className="mt-2 grid gap-1 text-[7px]"><code className="overflow-x-auto whitespace-nowrap">{initCommand}</code><button type="button" className="w-fit border px-2 py-1" onClick={() => void copy(initCommand,"init")}>{copied==="init"?"COPIED ✓":"fresh review init command"}</button></div>
      {error ? <p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">VISUAL_REVIEW_INVALID: {error}</p> : null}
      {review ? <>
        <div className="mt-3 space-y-2">
          {review.scenes.map((scene, index) => <div key={scene.sceneId} className="border p-2 text-[7px]" data-real-media-visual-review-scene={scene.sceneId}><p className="font-semibold">{scene.sceneId} / {scene.patternId} / {scene.productionRole}</p>{Object.entries(scene.checks).map(([key, check]) => <div key={key} className="mt-1 grid gap-1 sm:grid-cols-[1fr_90px_2fr]"><span>{key}</span><select value={check.verdict} onChange={(event) => setVerdict("scene",index,key,event.target.value as Verdict)} className="border bg-transparent"><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select><input value={check.notes} onChange={(event) => setNotes("scene",index,key,event.target.value)} placeholder="Human notes" className="border bg-transparent px-1" /></div>)}</div>)}
          {review.transitions.map((transition, index) => <div key={`${transition.fromSceneId}:${transition.toSceneId}`} className="border p-2 text-[7px]" data-real-media-visual-review-transition={`${transition.fromSceneId}->${transition.toSceneId}`}><p className="font-semibold">{transition.fromSceneId} → {transition.toSceneId} / {transition.durationFrames}f</p>{Object.entries(transition.checks).map(([key, check]) => <div key={key} className="mt-1 grid gap-1 sm:grid-cols-[1fr_90px_2fr]"><span>{key}</span><select value={check.verdict} onChange={(event) => setVerdict("transition",index,key,event.target.value as Verdict)} className="border bg-transparent"><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select><input value={check.notes} onChange={(event) => setNotes("transition",index,key,event.target.value)} placeholder="Human notes" className="border bg-transparent px-1" /></div>)}</div>)}
        </div>
        <div className="mt-3 grid gap-2 border-t pt-2 text-[7px]">
          <label>Overall <select value={review.finalVerdict} onChange={(event) => setReview({...review,finalVerdict:event.target.value as Verdict})} className="ml-1 border bg-transparent"><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select></label>
          <input value={review.reviewer ?? ""} onChange={(event) => setReview({...review,reviewer:event.target.value||null})} placeholder="Human reviewer" className="border bg-transparent px-1" />
          <input value={review.reviewedAt ?? ""} onChange={(event) => setReview({...review,reviewedAt:event.target.value||null})} placeholder="reviewedAt ISO-8601" className="border bg-transparent px-1" />
          <label><input type="checkbox" checked={review.evidenceBoundary.humanVisualReviewPerformed} onChange={(event) => setReview({...review,evidenceBoundary:{...review.evidenceBoundary,humanVisualReviewPerformed:event.target.checked}})} /> 実際にHuman visual reviewを行った</label>
          <button type="button" onClick={() => downloadText(`${JSON.stringify(review,null,2)}\n`,`${projectId}-real-media-human-visual-review.json`)} className="w-fit border px-2 py-1 font-semibold">Human review JSONを書き出す</button>
          <code className="overflow-x-auto whitespace-nowrap">{finalizeCommand}</code><button type="button" className="w-fit border px-2 py-1" onClick={() => void copy(finalizeCommand,"finalize")}>{copied==="finalize"?"COPIED ✓":"canonical finalize command"}</button>
        </div>
      </> : null}
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] text-amber-800 dark:text-amber-200">このUIはHuman入力surfaceです。PASSは自動設定しません。canonical CLIがstills/preview SHA currentnessを再検証します。Remotion Studio / Palmier / Mac DaVinci GUI Actualは常に別証拠で、ここではNOT_RUNのままです。</p>
    </section>
  );
}
