import {useEffect, useMemo, useState} from "react";
import {
  MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT,
  type MotionZukanSceneFocusRequest,
} from "../data/motionZukanSceneFocus";
import {
  loadMotionZukanComposerState,
  saveMotionZukanComposerState,
  updateSceneInstanceField,
  type MaskRevealSceneInstance,
} from "../data/visualSceneComposer";

const MIN_DURATION_SECONDS = 0.5;
const MAX_DURATION_SECONDS = 30;

export function RhythmSceneTimingCorrectionCard({scene}: {scene: MaskRevealSceneInstance}) {
  const [durationInput, setDurationInput] = useState(String(scene.targetDurationSeconds));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [rhythmFocus, setRhythmFocus] = useState<"DURATION" | "PACING" | null>(null);
  const structuralOverrun = scene.durationDeltaSeconds > 0;
  const resolvedDuration = useMemo(() => Number(durationInput), [durationInput]);
  const validDuration = Number.isFinite(resolvedDuration)
    && resolvedDuration >= MIN_DURATION_SECONDS
    && resolvedDuration <= MAX_DURATION_SECONDS;

  useEffect(() => {
    setDurationInput(String(scene.targetDurationSeconds));
    setFeedback(null);
  }, [scene.sceneId, scene.updatedAt, scene.targetDurationSeconds]);

  useEffect(() => {
    function onFocusResolved(event: Event) {
      const request = (event as CustomEvent<MotionZukanSceneFocusRequest>).detail;
      if (!request || request.sceneId !== scene.sceneId || request.projectId !== scene.projectId) return;
      if (request.axis !== "DURATION" && request.axis !== "PACING") return;
      setRhythmFocus(request.axis);
      window.setTimeout(() => {
        document.querySelector<HTMLElement>(`[data-rhythm-scene-timing-correction="${scene.sceneId.replace(/"/g, "\\\"")}"]`)?.scrollIntoView({behavior: "smooth", block: "center"});
      }, 0);
    }
    window.addEventListener(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT, onFocusResolved);
    return () => window.removeEventListener(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT, onFocusResolved);
  }, [scene.projectId, scene.sceneId]);

  function applyDurationCorrection() {
    setFeedback(null);
    if (!validDuration) {
      setFeedback(`尺は${MIN_DURATION_SECONDS}–${MAX_DURATION_SECONDS}秒で入力してください`);
      return;
    }
    const composer = loadMotionZukanComposerState();
    const currentScene = composer.scenes.find((item) => item.sceneId === scene.sceneId && item.projectId === scene.projectId);
    if (!currentScene) {
      setFeedback("Sceneが現在のcomposer stateに存在しないため更新を拒否しました");
      return;
    }
    if (currentScene.updatedAt !== scene.updatedAt) {
      setFeedback("Scene revisionが更新済みです。古い画面からの尺変更を拒否しました");
      return;
    }
    const next = updateSceneInstanceField(composer, scene.sceneId, "sceneDurationSeconds", Number(resolvedDuration.toFixed(3)));
    const nextScene = next.scenes.find((item) => item.sceneId === scene.sceneId);
    if (!nextScene || nextScene.updatedAt === scene.updatedAt) {
      setFeedback("Scene duration updateが反映されなかったため保存しませんでした");
      return;
    }
    saveMotionZukanComposerState(next);
    setFeedback(`Human尺変更を保存: ${scene.targetDurationSeconds.toFixed(3)}s → ${nextScene.targetDurationSeconds.toFixed(3)}s。Scene revision更新により旧route / Role / render / reelはstaleになります。`);
    setRhythmFocus(null);
  }

  return (
    <section
      className={`mt-2 border-2 p-2.5 ${rhythmFocus ? "border-fuchsia-400 ring-2 ring-fuchsia-200 dark:border-fuchsia-700 dark:ring-fuchsia-950" : "border-sky-200 dark:border-sky-800"}`}
      data-rhythm-scene-timing-correction={scene.sceneId}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-sky-700 dark:text-sky-300">HUMAN SCENE TIMING CORRECTION</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Rhythm QAのDURATION / PACING修正用。Human Masterの`sceneDurationSeconds`だけを変更し、timelineを正規再計算します。</p>
        </div>
        {rhythmFocus ? <span className="border border-fuchsia-300 px-2 py-1 text-[7px] font-semibold text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300">RHYTHM FAIL / {rhythmFocus}</span> : null}
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_1fr_1fr] text-[8px]">
        <div className="border border-sand-200 p-2 dark:border-navy-700"><span className="text-navy-400">Human target</span><strong className="ml-2 font-mono text-navy-700 dark:text-sand-100">{scene.targetDurationSeconds.toFixed(3)}s</strong></div>
        <div className="border border-sand-200 p-2 dark:border-navy-700"><span className="text-navy-400">Computed</span><strong className="ml-2 font-mono text-navy-700 dark:text-sand-100">{scene.computedDurationSeconds.toFixed(3)}s</strong></div>
        <div className={`border p-2 ${structuralOverrun ? "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200" : "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"}`}><span>Structural delta</span><strong className="ml-2 font-mono">{scene.durationDeltaSeconds.toFixed(3)}s</strong></div>
      </div>

      {structuralOverrun ? <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">Text timing構造がHuman targetより長いため、targetを短くしてもcomputed durationは構造終端より短くなりません。無理なtruncateはしません。</p> : null}

      <div className="mt-2 flex flex-wrap items-end gap-2">
        <label className="text-[8px] text-navy-500 dark:text-navy-300">新しいHuman target秒
          <input type="number" min={MIN_DURATION_SECONDS} max={MAX_DURATION_SECONDS} step="0.1" value={durationInput} onChange={(event) => setDurationInput(event.currentTarget.value)} className="mt-1 block w-32 border border-sand-300 bg-transparent px-2 py-1.5 font-mono text-[9px] dark:border-navy-600" />
        </label>
        <button type="button" disabled={!validDuration || resolvedDuration === scene.targetDurationSeconds} onClick={applyDurationCorrection} className="border border-sky-400 px-3 py-1.5 text-[8px] font-semibold text-sky-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-sky-700 dark:text-sky-300">Human尺を更新</button>
        <span className="font-mono text-[7px] text-navy-400">current revision {scene.updatedAt}</span>
      </div>

      {feedback ? <p role="status" className={`mt-2 border px-2 py-1.5 text-[7px] leading-3 ${feedback.includes("保存") ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200"}`}>{feedback}</p> : null}

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">尺変更は新しいScene revisionを作ります。旧Human route / Role context / selected Scene render / continuous reel / Rhythm reviewをsilent rebaseしません。Remotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI ActualはNOT_RUN、productionReady=falseのままです。</p>
    </section>
  );
}
