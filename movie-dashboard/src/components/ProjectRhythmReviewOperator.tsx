import {useMemo, useState} from "react";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

type RhythmAxis = "PATTERN_SWITCH" | "DURATION" | "PACING" | "TRANSITION";
type Verdict = "NOT_RUN" | "PASS" | "FAIL";

type RhythmReview = {
  schemaVersion: "wedding-movie-project-rhythm-human-review/v1";
  authority: "HUMAN_REVIEW_OF_CURRENT_PROJECT_TYPOGRAPHY_PREVIEW_REEL";
  projectId: SceneProjectId;
  source: {
    reelManifestPath: string;
    reelManifestSha256: string;
    selectedSceneManifestPath: string;
    selectedSceneManifestSha256: string;
    reviewIdentityFingerprint: string;
  };
  scenes: Array<{
    order: number;
    sceneId: string;
    sourceRevision: string;
    patternId: string;
    productionRole: string;
    startFrame: number;
    endFrameExclusive: number;
    durationFrames: number;
    gapFromPreviousFrames: number;
    axes: Record<RhythmAxis, {verdict: Verdict; notes: string}>;
  }>;
  finalVerdict: Verdict;
  finalNotes: string;
  evidenceBoundary: {
    humanPlaybackPerformed: boolean;
    remotionStudioGuiActual: "NOT_RUN";
    palmierGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
    productionReady: false;
  };
};

type RhythmQueue = {
  schemaVersion: "wedding-movie-project-rhythm-correction-queue/v1";
  authority: "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_RHYTHM_FAIL_VERDICTS";
  projectId: SceneProjectId;
  failures: Array<{
    sceneId: string;
    sourceRevision: string;
    patternId: string;
    productionRole: string;
    axis: RhythmAxis;
    notes: string;
    startFrame: number;
    endFrameExclusive: number;
    durationFrames: number;
    startSeconds: number;
    endSeconds: number;
    returnTo: "SCENE_TIMING_AND_A_B_COMPARE" | "SCENE_BOUND_A_B_COMPARE";
  }>;
  summary: {
    totalScenes: number;
    failedAxes: number;
    notRunAxes: number;
    finalVerdict: Verdict;
    correctionRequired: boolean;
    reviewComplete: boolean;
    productionReady: false;
  };
  nextActions: null | {
    returnFailedScenesToCompare: true;
    renderSelectedScenes: string;
    renderContinuousReel: string;
    initFreshHumanReview: string;
  };
  evidenceBoundary: {
    humanPlaybackPerformed: boolean;
    remotionStudioGuiActual: "NOT_RUN";
    palmierGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
    productionReady: false;
  };
};

const AXES: RhythmAxis[] = ["PATTERN_SWITCH", "DURATION", "PACING", "TRANSITION"];

function isActualBoundary(value: any) {
  return value?.remotionStudioGuiActual === "NOT_RUN"
    && value?.palmierGuiActual === "NOT_RUN"
    && value?.macDaVinciGuiActual === "NOT_RUN"
    && value?.productionReady === false;
}

function selectClasses(value: Verdict) {
  if (value === "PASS") return "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300";
  if (value === "FAIL") return "border-rose-300 text-rose-700 dark:border-rose-800 dark:text-rose-300";
  return "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300";
}

export function ProjectRhythmReviewOperator({projectId}: {projectId: SceneProjectId}) {
  const [review, setReview] = useState<RhythmReview | null>(null);
  const [queue, setQueue] = useState<RhythmQueue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const initCommand = `node --no-warnings motion-studio/scripts/project-rhythm-review.mts --reel-manifest=\"$HOME/Downloads/${projectId}-selected-typography-preview-reel-manifest.json\" --init --output=\"$HOME/Downloads/${projectId}-project-rhythm-human-review.json\"`;
  const finalizeCommand = `node --no-warnings motion-studio/scripts/project-rhythm-review.mts --reel-manifest=\"$HOME/Downloads/${projectId}-selected-typography-preview-reel-manifest.json\" --review=\"$HOME/Downloads/${projectId}-project-rhythm-human-review.json\" --output=\"$HOME/Downloads/${projectId}-project-rhythm-correction-queue.json\"`;

  const stats = useMemo(() => {
    if (!review) return {pass: 0, fail: 0, notRun: 0};
    return review.scenes.reduce((summary, scene) => {
      AXES.forEach((axis) => {
        const verdict = scene.axes[axis].verdict;
        if (verdict === "PASS") summary.pass += 1;
        else if (verdict === "FAIL") summary.fail += 1;
        else summary.notRun += 1;
      });
      return summary;
    }, {pass: 0, fail: 0, notRun: 0});
  }, [review]);

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1400);
  }

  async function loadReview(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const parsed = JSON.parse(await file.text()) as RhythmReview;
      if (
        parsed.schemaVersion !== "wedding-movie-project-rhythm-human-review/v1"
        || parsed.authority !== "HUMAN_REVIEW_OF_CURRENT_PROJECT_TYPOGRAPHY_PREVIEW_REEL"
        || parsed.projectId !== projectId
        || !Array.isArray(parsed.scenes)
        || !isActualBoundary(parsed.evidenceBoundary)
      ) throw new Error("Human rhythm review identity/evidence boundary mismatch");
      for (const scene of parsed.scenes) {
        for (const axis of AXES) {
          const verdict = scene.axes?.[axis]?.verdict;
          if (verdict !== "NOT_RUN" && verdict !== "PASS" && verdict !== "FAIL") throw new Error(`${scene.sceneId}/${axis} verdict invalid`);
        }
      }
      setReview(parsed);
    } catch (cause) {
      setReview(null);
      setError(cause instanceof Error ? cause.message : "Human rhythm review parse failed");
    }
  }

  async function loadQueue(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const parsed = JSON.parse(await file.text()) as RhythmQueue;
      if (
        parsed.schemaVersion !== "wedding-movie-project-rhythm-correction-queue/v1"
        || parsed.authority !== "DERIVED_ONLY_FROM_EXPLICIT_HUMAN_RHYTHM_FAIL_VERDICTS"
        || parsed.projectId !== projectId
        || parsed.summary?.productionReady !== false
        || !isActualBoundary(parsed.evidenceBoundary)
        || !Array.isArray(parsed.failures)
      ) throw new Error("Rhythm correction queue identity/evidence boundary mismatch");
      setQueue(parsed);
    } catch (cause) {
      setQueue(null);
      setError(cause instanceof Error ? cause.message : "Rhythm correction queue parse failed");
    }
  }

  function setAxis(sceneId: string, axis: RhythmAxis, patch: Partial<{verdict: Verdict; notes: string}>) {
    setReview((current) => current ? {
      ...current,
      scenes: current.scenes.map((scene) => scene.sceneId === sceneId ? {
        ...scene,
        axes: {...scene.axes, [axis]: {...scene.axes[axis], ...patch}},
      } : scene),
    } : current);
  }

  function seekScene(sceneId: string) {
    const escaped = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(sceneId) : sceneId.replace(/"/g, "\\\"");
    const target = document.querySelector<HTMLButtonElement>(`[data-preview-reel-scene="${escaped}"]`);
    target?.click();
    target?.scrollIntoView({behavior: "smooth", block: "center"});
  }

  function exportReview() {
    if (!review) return;
    downloadText(`${JSON.stringify(review, null, 2)}\n`, `${projectId}-project-rhythm-human-review.json`);
  }

  return (
    <section className="mt-2 border-2 border-rose-300 dark:border-rose-800 p-2.5" data-project-rhythm-review-operator={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-rose-700 dark:text-rose-300">PROJECT RHYTHM HUMAN REVIEW / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Continuous reelを実際にHuman再生し、Scene境界ごとにPATTERN_SWITCH / DURATION / PACING / TRANSITIONを判定します。UIはCLIが初期化したSHA-bound review JSONだけを編集します。</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <button type="button" onClick={() => void copy("init", initCommand)} className="border border-rose-300 px-2 py-1 text-[7px] font-semibold text-rose-700 dark:border-rose-800 dark:text-rose-300">{copied === "init" ? "INIT COPIED ✓" : "Review init command"}</button>
          <button type="button" disabled={!review} onClick={() => void copy("finalize", finalizeCommand)} className="border border-violet-300 px-2 py-1 text-[7px] font-semibold text-violet-700 dark:border-violet-800 dark:text-violet-300 disabled:opacity-40">{copied === "finalize" ? "FINALIZE COPIED ✓" : "Finalize queue command"}</button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <label className="cursor-pointer border border-rose-300 px-2 py-1 text-[7px] font-semibold text-rose-700 dark:border-rose-800 dark:text-rose-300">Human review JSONを読み込む<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void loadReview(event.currentTarget.files?.[0] ?? null)} /></label>
        <label className="cursor-pointer border border-violet-300 px-2 py-1 text-[7px] font-semibold text-violet-700 dark:border-violet-800 dark:text-violet-300">Correction queueを読み込む<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void loadQueue(event.currentTarget.files?.[0] ?? null)} /></label>
        {review ? <span className="px-2 py-1 font-mono text-[7px] text-rose-600 dark:text-rose-300">PASS {stats.pass} / FAIL {stats.fail} / NOT_RUN {stats.notRun}</span> : null}
      </div>
      {error ? <p className="mt-2 border border-rose-300 px-2 py-1 text-[7px] text-rose-700 dark:border-rose-800 dark:text-rose-300">INVALID / {error}</p> : null}

      {review ? (
        <>
          <label className="mt-2 flex items-center gap-2 border border-amber-200 p-2 text-[8px] text-amber-800 dark:border-amber-800 dark:text-amber-200">
            <input type="checkbox" checked={review.evidenceBoundary.humanPlaybackPerformed} onChange={(event) => setReview({...review, evidenceBoundary: {...review.evidenceBoundary, humanPlaybackPerformed: event.currentTarget.checked}})} />
            continuous MP4を実際にHuman再生して確認した
          </label>
          <div className="mt-2 space-y-2">
            {review.scenes.map((scene) => (
              <article key={`${scene.sceneId}@${scene.sourceRevision}`} className="border border-rose-100 p-2 dark:border-rose-900" data-rhythm-review-scene={scene.sceneId}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div><p className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{scene.order}. {scene.sceneId}</p><p className="font-mono text-[7px] text-navy-400">{scene.productionRole} / {scene.patternId} / {scene.durationFrames}f / gap {scene.gapFromPreviousFrames}f</p></div>
                  <button type="button" onClick={() => seekScene(scene.sceneId)} className="border border-violet-200 px-2 py-1 text-[7px] text-violet-700 dark:border-violet-900 dark:text-violet-300">continuous reelで該当Scene再生</button>
                </div>
                <div className="mt-2 grid gap-1 lg:grid-cols-2">
                  {AXES.map((axis) => (
                    <div key={axis} className="border border-sand-200 p-1.5 dark:border-navy-700">
                      <div className="flex items-center gap-1"><span className="w-24 text-[7px] font-semibold text-navy-500 dark:text-navy-300">{axis}</span><select value={scene.axes[axis].verdict} onChange={(event) => setAxis(scene.sceneId, axis, {verdict: event.currentTarget.value as Verdict})} className={`bg-transparent border px-1 py-0.5 text-[7px] ${selectClasses(scene.axes[axis].verdict)}`}><option value="NOT_RUN">NOT_RUN</option><option value="PASS">PASS</option><option value="FAIL">FAIL</option></select></div>
                      <input value={scene.axes[axis].notes} onChange={(event) => setAxis(scene.sceneId, axis, {notes: event.currentTarget.value})} placeholder="Human notes" className="mt-1 w-full border border-sand-200 bg-transparent px-1.5 py-1 text-[7px] text-navy-600 dark:border-navy-700 dark:text-navy-200" />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-2 grid gap-1 sm:grid-cols-[140px_1fr_auto]">
            <select value={review.finalVerdict} onChange={(event) => setReview({...review, finalVerdict: event.currentTarget.value as Verdict})} className={`bg-transparent border px-2 py-1 text-[8px] ${selectClasses(review.finalVerdict)}`}><option value="NOT_RUN">FINAL NOT_RUN</option><option value="PASS">FINAL PASS</option><option value="FAIL">FINAL FAIL</option></select>
            <input value={review.finalNotes} onChange={(event) => setReview({...review, finalNotes: event.currentTarget.value})} placeholder="Final Human rhythm notes" className="border border-sand-200 bg-transparent px-2 py-1 text-[8px] dark:border-navy-700" />
            <button type="button" onClick={exportReview} className="border border-rose-300 px-2 py-1 text-[8px] font-semibold text-rose-700 dark:border-rose-800 dark:text-rose-300">Human review JSONを書き出す</button>
          </div>
        </>
      ) : null}

      {queue ? (
        <div className="mt-3 border-2 border-amber-300 p-2 dark:border-amber-800" data-rhythm-correction-queue={projectId}>
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[8px] font-semibold text-amber-800 dark:text-amber-200">RHYTHM CORRECTION QUEUE / explicit Human FAIL only</p><span className="font-mono text-[7px] text-amber-700 dark:text-amber-300">{queue.summary.failedAxes} FAIL axes / {queue.summary.notRunAxes} NOT_RUN</span></div>
          <div className="mt-2 space-y-1">
            {queue.failures.map((failure, index) => (
              <div key={`${failure.sceneId}:${failure.axis}:${index}`} className="border border-amber-200 p-2 text-[7px] dark:border-amber-900">
                <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold text-navy-700 dark:text-navy-200">{failure.sceneId} / {failure.axis} / {failure.returnTo}</span><button type="button" onClick={() => seekScene(failure.sceneId)} className="border border-violet-200 px-2 py-1 text-violet-700 dark:border-violet-900 dark:text-violet-300">問題箇所を再生</button></div>
                <p className="mt-1 font-mono text-navy-400">{failure.startSeconds.toFixed(2)}–{failure.endSeconds.toFixed(2)}s / {failure.durationFrames}f / {failure.patternId} / {failure.productionRole}</p>
                {failure.notes ? <p className="mt-1 text-amber-800 dark:text-amber-200">Human note: {failure.notes}</p> : null}
              </div>
            ))}
          </div>
          {queue.nextActions ? <div className="mt-2 grid gap-1"><button type="button" onClick={() => void copy("selected", queue.nextActions!.renderSelectedScenes)} className="border border-indigo-200 px-2 py-1 text-left text-[7px] text-indigo-700 dark:border-indigo-900 dark:text-indigo-300">1. selected Scene再render commandをコピー</button><button type="button" onClick={() => void copy("reel", queue.nextActions!.renderContinuousReel)} className="border border-violet-200 px-2 py-1 text-left text-[7px] text-violet-700 dark:border-violet-900 dark:text-violet-300">2. continuous reel再render commandをコピー</button><button type="button" onClick={() => void copy("fresh", queue.nextActions!.initFreshHumanReview)} className="border border-rose-200 px-2 py-1 text-left text-[7px] text-rose-700 dark:border-rose-900 dark:text-rose-300">3. fresh Human review init commandをコピー</button></div> : null}
        </div>
      ) : null}

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">このOperatorはHuman review JSONの編集とCorrection Queueのナビゲーションだけを行います。CLI verifierがsource SHA/currentnessを最終判定します。NOT_RUNをFAIL/PASSへ自動変換せず、Remotion Studio / Palmier / Mac DaVinci GUI ActualはNOT_RUN、productionReady=falseのままです。</p>
    </section>
  );
}
