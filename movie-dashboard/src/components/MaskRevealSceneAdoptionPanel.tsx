import { useMemo, useState } from "react";
import {
  resolveEditableValue,
  type MaskRevealEditableIntent,
  type PositionPreset,
} from "../data/humanEditableMotionIntent";
import {
  adoptMaskRevealScene,
  buildMaskRevealSceneExport,
  buildProjectTimeline,
  updateMaskRevealSceneField,
  type MaskRevealSceneInstance,
} from "../data/visualSceneComposer";

const positionLabels: Record<PositionPreset, string> = {
  TOP_LEFT: "左上",
  TOP: "上",
  TOP_RIGHT: "右上",
  LEFT: "左",
  CENTER: "中央",
  RIGHT: "右",
  BOTTOM_LEFT: "左下",
  BOTTOM: "下",
  BOTTOM_RIGHT: "右下",
};

export function MaskRevealSceneAdoptionPanel({ intent }: { intent: MaskRevealEditableIntent }) {
  const [scenes, setScenes] = useState<MaskRevealSceneInstance[]>([]);
  const timeline = useMemo(() => buildProjectTimeline(scenes), [scenes]);

  function adoptCurrentScene() {
    setScenes((current) => [
      ...current,
      adoptMaskRevealScene(intent, `mask-reveal-scene-${String(current.length + 1).padStart(2, "0")}`),
    ]);
  }

  function updateScene(sceneId: string, updater: (scene: MaskRevealSceneInstance) => MaskRevealSceneInstance) {
    setScenes((current) => current.map((scene) => (scene.sceneId === sceneId ? updater(scene) : scene)));
  }

  return (
    <section className="mt-6 border-t border-sand-200 dark:border-navy-600 pt-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">SCENE INSTANCE / HUMAN MASTER</p>
          <h4 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">現在の値をSceneとして採用する</h4>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
            採用時に現在のHuman Master状態をスナップショット化します。後でrecipeやAI提案が変わっても、採用済みSceneは勝手に変わりません。
          </p>
        </div>
        <button type="button" onClick={adoptCurrentScene} className="bg-violet-700 text-white px-4 py-2.5 text-sm font-semibold">
          Sceneとして採用
        </button>
      </div>

      {scenes.length === 0 ? (
        <p className="mt-4 border border-dashed border-sand-300 dark:border-navy-600 p-4 text-xs text-navy-400">
          まだSceneは採用されていません。まず現在のMask Reveal設定を1Sceneとして採用します。
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {scenes.map((scene, index) => {
            const text = resolveEditableValue(scene.editableIntent.fields.text);
            const hold = resolveEditableValue(scene.editableIntent.fields.holdDurationSeconds);
            const position = resolveEditableValue(scene.editableIntent.fields.positionPreset);
            return (
              <article key={scene.sceneId} className="border border-sand-300 dark:border-navy-600 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-navy-400">SCENE {index + 1} · {scene.sceneId}</p>
                    <h5 className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{text}</h5>
                    <p className="mt-1 text-[11px] text-navy-500 dark:text-navy-300">
                      Primary: {scene.primarySubject} · Secondary: {scene.secondarySubject} · {scene.complexity}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-navy-500 dark:text-navy-300">
                    <p>Target: {scene.targetDurationSeconds.toFixed(1)}秒</p>
                    <p>Computed: {scene.computedDurationSeconds.toFixed(1)}秒</p>
                    {scene.durationDeltaSeconds !== 0 && <p className="text-amber-700 dark:text-amber-300">差分: {scene.durationDeltaSeconds > 0 ? "+" : ""}{scene.durationDeltaSeconds.toFixed(1)}秒</p>}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-sand-200 dark:border-navy-600 pt-4">
                  <label className="block">
                    <span className="text-[10px] font-semibold text-navy-400">Holdだけ修正</span>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={hold}
                      onChange={(event) => updateScene(scene.sceneId, (current) => updateMaskRevealSceneField(current, "holdDurationSeconds", Number(event.target.value)))}
                      className={controlClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-semibold text-navy-400">位置だけ修正</span>
                    <select
                      value={position}
                      onChange={(event) => updateScene(scene.sceneId, (current) => updateMaskRevealSceneField(current, "positionPreset", event.target.value as PositionPreset))}
                      className={controlClass}
                    >
                      {Object.entries(positionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <div>
                    <span className="text-[10px] font-semibold text-navy-400">Human state</span>
                    <div className="mt-1 min-h-[38px] border border-sand-300 dark:border-navy-600 px-3 py-2 text-[10px] leading-5 text-navy-500 dark:text-navy-300">
                      HUMAN_SELECTED: {scene.humanSelectedFields.length}<br />LOCKED: {scene.lockedFields.length}
                    </div>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="cursor-pointer text-[10px] text-sky-700 dark:text-sky-300">SceneInstance JSONを見る</summary>
                  <pre className="mt-2 max-h-72 overflow-auto border border-sand-200 dark:border-navy-600 p-3 text-[10px] leading-5 whitespace-pre-wrap text-navy-500 dark:text-navy-300">
                    {JSON.stringify(buildMaskRevealSceneExport(scene), null, 2)}
                  </pre>
                </details>
              </article>
            );
          })}

          <section className="border border-violet-200 dark:border-violet-900 p-4">
            <p className="text-[10px] tracking-[0.18em] font-semibold text-violet-700 dark:text-violet-300">PROJECT TIMELINE</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-navy-600 dark:text-navy-300">
              <span>Scenes: {timeline.sceneIds.length}</span>
              <span>Total: {timeline.totalComputedDurationSeconds.toFixed(1)}秒</span>
              <span>Authority: {timeline.authority}</span>
            </div>
            <div className="mt-3 space-y-1">
              {timeline.placements.map((placement) => (
                <p key={placement.sceneId} className="text-[11px] font-mono text-navy-500 dark:text-navy-300">
                  {placement.sceneId}: {placement.startSeconds.toFixed(1)}s → {placement.endSeconds.toFixed(1)}s
                </p>
              ))}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

const controlClass = "mt-1 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100";
