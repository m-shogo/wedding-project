import {useEffect, useMemo, useState} from "react";
import {
  MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT,
  type MotionZukanSceneFocusRequest,
} from "../data/motionZukanSceneFocus";
import {
  createProjectSceneTransitionSelection,
  listProjectSceneTransitionSelections,
  MAX_CROSS_DISSOLVE_FRAMES,
  MIN_CROSS_DISSOLVE_FRAMES,
  PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT,
  resolveProjectSceneTransitions,
  saveProjectSceneTransitionSelection,
  type ProjectSceneTransitionKind,
} from "../data/projectSceneTransitionSelectionStore";
import {loadMotionZukanComposerState, type MaskRevealSceneInstance} from "../data/visualSceneComposer";

export function RhythmSceneTransitionCorrectionCard({scene}: {scene: MaskRevealSceneInstance}) {
  const [transition, setTransition] = useState<ProjectSceneTransitionKind>("HARD_CUT");
  const [durationFrames, setDurationFrames] = useState(12);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [transitionRevision, setTransitionRevision] = useState(0);
  const snapshot = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === scene.projectId);
    if (!timeline) return null;
    const index = timeline.sceneIds.indexOf(scene.sceneId);
    if (index < 0) return null;
    const fromSceneId = index > 0 ? timeline.sceneIds[index - 1] : timeline.sceneIds[index] ?? null;
    const toSceneId = index > 0 ? scene.sceneId : timeline.sceneIds[index + 1] ?? null;
    if (!fromSceneId || !toSceneId || fromSceneId === toSceneId) return null;
    const fromScene = composer.scenes.find((item) => item.sceneId === fromSceneId && item.projectId === scene.projectId);
    const toScene = composer.scenes.find((item) => item.sceneId === toSceneId && item.projectId === scene.projectId);
    if (!fromScene || !toScene) return null;
    const resolved = resolveProjectSceneTransitions(scene.projectId, composer.scenes, timeline, listProjectSceneTransitionSelections(scene.projectId))
      .find((item) => item.fromSceneId === fromSceneId && item.toSceneId === toSceneId) ?? null;
    return {composer, timeline, fromScene, toScene, resolved};
  }, [scene.projectId, scene.sceneId, scene.updatedAt, transitionRevision]);

  useEffect(() => {
    const refresh = () => setTransitionRevision((value) => value + 1);
    window.addEventListener(PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT, refresh);
  }, []);

  useEffect(() => {
    if (!snapshot?.resolved) return;
    setTransition(snapshot.resolved.transition);
    if (snapshot.resolved.durationFrames > 0) setDurationFrames(snapshot.resolved.durationFrames);
  }, [snapshot?.resolved?.fromSceneId, snapshot?.resolved?.toSceneId, snapshot?.resolved?.transition, snapshot?.resolved?.durationFrames]);

  useEffect(() => {
    function onFocusResolved(event: Event) {
      const request = (event as CustomEvent<MotionZukanSceneFocusRequest>).detail;
      if (!request || request.projectId !== scene.projectId || request.sceneId !== scene.sceneId || request.axis !== "TRANSITION") return;
      setFocused(true);
      window.setTimeout(() => {
        document.querySelector<HTMLElement>(`[data-rhythm-transition-correction="${scene.sceneId.replace(/"/g, "\\\"")}"]`)?.scrollIntoView({behavior: "smooth", block: "center"});
      }, 0);
    }
    window.addEventListener(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT, onFocusResolved);
    return () => window.removeEventListener(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT, onFocusResolved);
  }, [scene.projectId, scene.sceneId]);

  if (!snapshot) return null;
  const activeSnapshot = snapshot;
  const current = activeSnapshot.resolved;
  const stale = current?.status === "STALE_HUMAN_SELECTION";

  function applyTransition() {
    setFeedback(null);
    const composer = loadMotionZukanComposerState();
    const currentFrom = composer.scenes.find((item) => item.sceneId === activeSnapshot.fromScene.sceneId && item.projectId === scene.projectId);
    const currentTo = composer.scenes.find((item) => item.sceneId === activeSnapshot.toScene.sceneId && item.projectId === scene.projectId);
    const timeline = composer.timelines.find((item) => item.projectId === scene.projectId);
    if (!currentFrom || !currentTo || !timeline) {
      setFeedback("現在のScene edgeを再解決できないため更新を拒否しました");
      return;
    }
    const fromIndex = timeline.sceneIds.indexOf(currentFrom.sceneId);
    if (fromIndex < 0 || timeline.sceneIds[fromIndex + 1] !== currentTo.sceneId) {
      setFeedback("Scene順が更新済みです。古い境界からのtransition変更を拒否しました");
      return;
    }
    if (currentFrom.updatedAt !== activeSnapshot.fromScene.updatedAt || currentTo.updatedAt !== activeSnapshot.toScene.updatedAt) {
      setFeedback("Scene revisionが更新済みです。古い境界からのtransition変更を拒否しました");
      return;
    }
    const saved = saveProjectSceneTransitionSelection(createProjectSceneTransitionSelection(
      scene.projectId,
      currentFrom,
      currentTo,
      transition,
      transition === "HARD_CUT" ? 0 : durationFrames,
    ));
    setFeedback(`Human transition保存: ${saved.fromSceneId} → ${saved.toSceneId} / ${saved.transition} / ${saved.durationFrames}f。次のTypography batch / selected render / continuous reelはfresh exportが必要です。`);
    setFocused(false);
  }

  return (
    <section
      className={`mt-2 border-2 p-2.5 ${focused ? "border-fuchsia-400 ring-2 ring-fuchsia-200 dark:border-fuchsia-700 dark:ring-fuchsia-950" : "border-violet-200 dark:border-violet-800"}`}
      data-rhythm-transition-correction={scene.sceneId}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-violet-700 dark:text-violet-300">HUMAN SCENE EDGE TRANSITION</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Rhythm QAのTRANSITION修正用。隣接Scene revisionにbindingしてHARD CUT / CROSS DISSOLVEだけをHuman選択します。</p>
        </div>
        {focused ? <span className="border border-fuchsia-300 px-2 py-1 text-[7px] font-semibold text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300">RHYTHM FAIL / TRANSITION</span> : null}
      </div>

      <div className="mt-2 grid gap-1 sm:grid-cols-3 text-[8px]">
        <div className="border border-sand-200 p-2 dark:border-navy-700"><span className="text-navy-400">Edge</span><strong className="ml-2 font-mono">{activeSnapshot.fromScene.sceneId} → {activeSnapshot.toScene.sceneId}</strong></div>
        <div className="border border-sand-200 p-2 dark:border-navy-700"><span className="text-navy-400">Current</span><strong className="ml-2 font-mono">{current?.transition ?? "HARD_CUT"} / {current?.durationFrames ?? 0}f</strong></div>
        <div className={`border p-2 ${stale ? "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200" : "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"}`}><span>Status</span><strong className="ml-2 font-mono">{current?.status ?? "DEFAULT_HARD_CUT"}</strong></div>
      </div>

      <div className="mt-2 flex flex-wrap items-end gap-2">
        <label className="text-[8px] text-navy-500 dark:text-navy-300">Transition
          <select value={transition} onChange={(event) => setTransition(event.currentTarget.value as ProjectSceneTransitionKind)} className="mt-1 block border border-sand-300 bg-transparent px-2 py-1.5 text-[9px] dark:border-navy-600">
            <option value="HARD_CUT">HARD CUT</option>
            <option value="CROSS_DISSOLVE">CROSS DISSOLVE</option>
          </select>
        </label>
        <label className="text-[8px] text-navy-500 dark:text-navy-300">Dissolve frames
          <input type="number" min={MIN_CROSS_DISSOLVE_FRAMES} max={MAX_CROSS_DISSOLVE_FRAMES} step="1" disabled={transition === "HARD_CUT"} value={durationFrames} onChange={(event) => setDurationFrames(Number(event.currentTarget.value))} className="mt-1 block w-24 border border-sand-300 bg-transparent px-2 py-1.5 font-mono text-[9px] disabled:opacity-40 dark:border-navy-600" />
        </label>
        <button type="button" onClick={applyTransition} className="border border-violet-400 px-3 py-1.5 text-[8px] font-semibold text-violet-700 dark:border-violet-700 dark:text-violet-300">Human transitionを保存</button>
      </div>

      {stale ? <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">保存済みtransitionはfrom/to Scene revisionのどちらかが変わったためSTALEです。silent rebaseせず、この境界をHumanが再確認してください。</p> : null}
      {feedback ? <p role="status" className={`mt-2 border px-2 py-1.5 text-[7px] leading-3 ${feedback.includes("保存") ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200"}`}>{feedback}</p> : null}
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">transition選択はHuman rhythm intentです。保存・CLI render・CI GREENはRemotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI Actualを昇格せず、productionReady=falseのままです。</p>
    </section>
  );
}
