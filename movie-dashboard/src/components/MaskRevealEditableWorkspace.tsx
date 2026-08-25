import { useMemo, useState } from "react";
import { MaskRevealSceneHandoffCard } from "./MaskRevealSceneHandoffCard";
import {
  applyHumanSelection,
  createDefaultMaskRevealEditableIntent,
  getEditableDecisionState,
  resolveEditableValue,
  resolveMaskRevealEditableIntent,
  retargetMaskRevealSection,
  setEditableFieldLock,
  type EditableValue,
  type MaskRevealDirection,
  type MaskRevealEditableFieldKey,
  type MaskRevealEditableFields,
  type MaskRevealIntensity,
  type MaskRevealSection,
  type PositionPreset,
} from "../data/humanEditableMotionIntent";
import { buildMaskRevealEditableProductionOutputs } from "../data/maskRevealEditableProduction";
import { buildMaskRevealExecutionOutputs } from "../data/maskRevealHandoff";
import {
  buildMaskRevealDaVinciValueBridge,
  detectLayerDelayPreset,
  detectPositionPreset,
  layerDelayPresetOptions,
  positionPresetOptions,
  resolveLayerDelayPreset,
  resolvePositionPreset,
  type LayerDelayPreset,
} from "../data/maskRevealPresetBridge";
import {
  adoptMaskRevealScene,
  adoptSceneInstance,
  computeMaskRevealSceneDuration,
  loadMotionZukanComposerState,
  removeSceneInstance,
  retargetSceneInstanceSection,
  saveMotionZukanComposerState,
  updateSceneInstanceField,
  updateSceneInstanceFieldLock,
  type MaskRevealSceneInstance,
  type MotionZukanComposerState,
} from "../data/visualSceneComposer";

const positionLabels: Record<PositionPreset, string> = Object.fromEntries(positionPresetOptions.map((item) => [item.id, item.label])) as Record<PositionPreset, string>;

const directionLabels: Record<MaskRevealDirection, string> = {
  UP: "下からスッと",
  DOWN: "上からスッと",
  LEFT: "右からスッと",
  RIGHT: "左からスッと",
};

const intensityLabels: Record<MaskRevealIntensity, string> = { S: "弱", M: "中", L: "強" };

type Level = "EASY" | "DETAIL" | "DAVINCI";

export function MaskRevealEditableWorkspace() {
  const [intent, setIntent] = useState(() => createDefaultMaskRevealEditableIntent("OPENING_INTRO"));
  const [level, setLevel] = useState<Level>("EASY");
  const [copied, setCopied] = useState("");
  const [outputRevision, setOutputRevision] = useState(0);
  const [composerState, setComposerState] = useState<MotionZukanComposerState>(() => loadMotionZukanComposerState());
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const outputs = useMemo(() => buildMaskRevealEditableProductionOutputs(intent), [intent, outputRevision]);
  const resolved = resolveMaskRevealEditableIntent(intent);
  const timing = computeMaskRevealSceneDuration(intent);
  const davinciBridge = buildMaskRevealDaVinciValueBridge(intent);
  const layerDelayPreset = detectLayerDelayPreset(intent);
  const positionPreset = detectPositionPreset(intent);
  const executionOutputs = buildMaskRevealExecutionOutputs({
    text: resolved.text,
    mediaLabel: resolved.mediaLabel,
    section: intent.section,
    intensity: resolved.intensity,
    durationSeconds: resolved.enterDurationSeconds,
  });

  function updateComposer(updater: (current: MotionZukanComposerState) => MotionZukanComposerState) {
    setComposerState((current) => {
      const next = updater(current);
      saveMotionZukanComposerState(next);
      return next;
    });
  }

  function select<K extends MaskRevealEditableFieldKey>(key: K, value: MaskRevealEditableFields[K]["defaultValue"]) {
    setIntent((current) => applyHumanSelection(current, key, value));
    if (editingSceneId) updateComposer((current) => updateSceneInstanceField(current, editingSceneId, key, value));
  }

  function lock(key: MaskRevealEditableFieldKey, locked: boolean) {
    setIntent((current) => setEditableFieldLock(current, key, locked));
    if (editingSceneId) updateComposer((current) => updateSceneInstanceFieldLock(current, editingSceneId, key, locked));
  }

  function changeSection(section: MaskRevealSection) {
    setIntent((current) => retargetMaskRevealSection(current, section));
    if (editingSceneId) updateComposer((current) => retargetSceneInstanceSection(current, editingSceneId, section));
  }

  function chooseLayerDelayPreset(preset: LayerDelayPreset) {
    select("layerDelaySeconds", resolveLayerDelayPreset(preset, intent.section));
  }

  function choosePositionPreset(preset: PositionPreset) {
    const value = resolvePositionPreset(preset);
    select("positionPreset", preset);
    select("positionXPercent", value.xPercent);
    select("positionYPercent", value.yPercent);
  }

  function lockPositionGroup(locked: boolean) {
    lock("positionPreset", locked);
    lock("positionXPercent", locked);
    lock("positionYPercent", locked);
  }

  function adoptCurrentScene() {
    const scene = adoptMaskRevealScene(intent);
    updateComposer((current) => adoptSceneInstance(current, scene));
    setEditingSceneId(scene.sceneId);
  }

  function adoptAsAnotherScene() {
    const scene = adoptMaskRevealScene(intent);
    updateComposer((current) => adoptSceneInstance(current, scene));
    setEditingSceneId(scene.sceneId);
  }

  function editScene(scene: MaskRevealSceneInstance) {
    setIntent(structuredClone(scene.editableIntent));
    setEditingSceneId(scene.sceneId);
    setLevel("EASY");
  }

  function deleteScene(sceneId: string) {
    updateComposer((current) => removeSceneInstance(current, sceneId));
    if (editingSceneId === sceneId) setEditingSceneId(null);
  }

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <section className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800">
      <div className="p-5 border-b border-sand-200 dark:border-navy-600">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">モーション図鑑 / HUMAN MASTER</p>
            <h3 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">選ぶだけで成立し、必要なら数字まで降りられるScene</h3>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">Preset First → Accordion Detail → DaVinci Final Precision。AIは提案者で、HUMAN_SELECTED / LOCKEDは人間が変更しない限り保持します。</p>
          </div>
          <div className="flex border border-sand-300 dark:border-navy-600">
            <LevelButton active={level === "EASY"} onClick={() => setLevel("EASY")}>かんたん</LevelButton>
            <LevelButton active={level === "DETAIL"} onClick={() => setLevel("DETAIL")}>詳細</LevelButton>
            <LevelButton active={level === "DAVINCI"} onClick={() => setLevel("DAVINCI")}>DaVinci</LevelButton>
          </div>
        </div>
      </div>

      <div className="p-5">
        {level === "EASY" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleField label="使う場所">
                <select value={intent.section} onChange={(event) => changeSection(event.target.value as MaskRevealSection)} className={controlClass}>
                  <option value="OPENING_INTRO">Opening Intro</option>
                  <option value="OPENING_CHORUS">Opening Chorus</option>
                  <option value="PROFILE_CHAPTER">Profile Chapter</option>
                  <option value="PROFILE_COUPLE_STORY">Profile Couple Story</option>
                </select>
              </SimpleField>
              <EditableControl label="文字" field={intent.fields.text} onLock={(value) => lock("text", value)}>
                <input value={resolveEditableValue(intent.fields.text)} maxLength={24} onChange={(event) => select("text", event.target.value)} className={controlClass} />
              </EditableControl>
              <EditableControl label="写真 / 動画" field={intent.fields.mediaLabel} onLock={(value) => lock("mediaLabel", value)}>
                <input value={resolveEditableValue(intent.fields.mediaLabel)} onChange={(event) => select("mediaLabel", event.target.value)} className={controlClass} />
              </EditableControl>
            </div>

            <PresetChoiceGroup
              label="文字を出すタイミング"
              state={getEditableDecisionState(intent.fields.layerDelaySeconds)}
              selected={layerDelayPreset}
              choices={layerDelayPresetOptions}
              custom={layerDelayPreset === "CUSTOM"}
              aiSuggested={intent.fields.layerDelaySeconds.aiSuggestedValue !== null ? `${intent.fields.layerDelaySeconds.aiSuggestedValue}秒` : null}
              reason={intent.fields.layerDelaySeconds.aiReason}
              humanSelected={intent.fields.layerDelaySeconds.humanSelectedValue !== null ? `${intent.fields.layerDelaySeconds.humanSelectedValue}秒` : null}
              locked={intent.fields.layerDelaySeconds.locked}
              onLock={(value) => lock("layerDelaySeconds", value)}
              onSelect={(value) => chooseLayerDelayPreset(value as LayerDelayPreset)}
            />

            <PresetChoiceGroup
              label="位置"
              state={getEditableDecisionState(intent.fields.positionPreset)}
              selected={positionPreset}
              choices={positionPresetOptions}
              custom={positionPreset === "CUSTOM"}
              aiSuggested={null}
              reason={null}
              humanSelected={intent.fields.positionPreset.humanSelectedValue ? positionLabels[intent.fields.positionPreset.humanSelectedValue] : null}
              locked={intent.fields.positionPreset.locked || intent.fields.positionXPercent.locked || intent.fields.positionYPercent.locked}
              onLock={lockPositionGroup}
              onSelect={(value) => choosePositionPreset(value as PositionPreset)}
            />

            <PresetChoiceGroup
              label="文字の登場"
              state={getEditableDecisionState(intent.fields.direction)}
              selected={resolved.direction}
              choices={(Object.entries(directionLabels) as Array<[MaskRevealDirection, string]>).map(([id, label]) => ({ id, label }))}
              custom={false}
              aiSuggested={intent.fields.direction.aiSuggestedValue ? directionLabels[intent.fields.direction.aiSuggestedValue] : null}
              reason={intent.fields.direction.aiReason}
              humanSelected={intent.fields.direction.humanSelectedValue ? directionLabels[intent.fields.direction.humanSelectedValue] : null}
              locked={intent.fields.direction.locked}
              onLock={(value) => lock("direction", value)}
              onSelect={(value) => select("direction", value as MaskRevealDirection)}
            />

            <PresetChoiceGroup
              label="強さ"
              state={getEditableDecisionState(intent.fields.intensity)}
              selected={resolved.intensity}
              choices={(Object.entries(intensityLabels) as Array<[MaskRevealIntensity, string]>).map(([id, label]) => ({ id, label }))}
              custom={false}
              aiSuggested={intent.fields.intensity.aiSuggestedValue ? intensityLabels[intent.fields.intensity.aiSuggestedValue] : null}
              reason={intent.fields.intensity.aiReason}
              humanSelected={intent.fields.intensity.humanSelectedValue ? intensityLabels[intent.fields.intensity.humanSelectedValue] : null}
              locked={intent.fields.intensity.locked}
              onLock={(value) => lock("intensity", value)}
              onSelect={(value) => select("intensity", value as MaskRevealIntensity)}
            />

            <button type="button" onClick={() => setLevel("DETAIL")} className="text-xs font-semibold text-sky-700 dark:text-sky-300">詳細設定を見る →</button>
          </div>
        )}

        {level === "DETAIL" && (
          <details open className="border border-sand-200 dark:border-navy-600">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-navy-900 dark:text-sand-100">詳細設定 / 現在の実数値</summary>
            <div className="border-t border-sand-200 dark:border-navy-600 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <NumberControl label="Scene Duration" suffix="秒" field={intent.fields.sceneDurationSeconds} onChange={(value) => select("sceneDurationSeconds", value)} onLock={(value) => lock("sceneDurationSeconds", value)} />
              <NumberControl label="Layer Delay" suffix="秒" field={intent.fields.layerDelaySeconds} onChange={(value) => select("layerDelaySeconds", value)} onLock={(value) => lock("layerDelaySeconds", value)} />
              <NumberControl label="Motion Delay" suffix="秒" field={intent.fields.motionDelaySeconds} onChange={(value) => select("motionDelaySeconds", value)} onLock={(value) => lock("motionDelaySeconds", value)} />
              <NumberControl label="Motion Duration" suffix="秒" field={intent.fields.enterDurationSeconds} onChange={(value) => select("enterDurationSeconds", value)} onLock={(value) => lock("enterDurationSeconds", value)} />
              <NumberControl label="Hold" suffix="秒" field={intent.fields.holdDurationSeconds} onChange={(value) => select("holdDurationSeconds", value)} onLock={(value) => lock("holdDurationSeconds", value)} />
              <NumberControl label="Exit Duration" suffix="秒" field={intent.fields.exitDurationSeconds} onChange={(value) => select("exitDurationSeconds", value)} onLock={(value) => lock("exitDurationSeconds", value)} />
              <NumberControl label="Stagger Delay" suffix="秒" field={intent.fields.staggerDelaySeconds} onChange={(value) => select("staggerDelaySeconds", value)} onLock={(value) => lock("staggerDelaySeconds", value)} />
              <NumberControl label="X" suffix="%" field={intent.fields.positionXPercent} onChange={(value) => select("positionXPercent", value)} onLock={(value) => lock("positionXPercent", value)} />
              <NumberControl label="Y" suffix="%" field={intent.fields.positionYPercent} onChange={(value) => select("positionYPercent", value)} onLock={(value) => lock("positionYPercent", value)} />
              <NumberControl label="Offset X" suffix="%" field={intent.fields.positionOffsetXPercent} onChange={(value) => select("positionOffsetXPercent", value)} onLock={(value) => lock("positionOffsetXPercent", value)} />
              <NumberControl label="Offset Y" suffix="%" field={intent.fields.positionOffsetYPercent} onChange={(value) => select("positionOffsetYPercent", value)} onLock={(value) => lock("positionOffsetYPercent", value)} />
              <NumberControl label="Distance" suffix="%" field={intent.fields.distancePercent} onChange={(value) => select("distancePercent", value)} onLock={(value) => lock("distancePercent", value)} />
              <NumberControl label="Scale From" suffix="%" field={intent.fields.scaleFromPercent} onChange={(value) => select("scaleFromPercent", value)} onLock={(value) => lock("scaleFromPercent", value)} />
              <NumberControl label="Scale To" suffix="%" field={intent.fields.scaleToPercent} onChange={(value) => select("scaleToPercent", value)} onLock={(value) => lock("scaleToPercent", value)} />
              <EditableControl label="Crop / Focus" field={intent.fields.cropFocus} onLock={(value) => lock("cropFocus", value)}>
                <select value={resolveEditableValue(intent.fields.cropFocus)} onChange={(event) => select("cropFocus", event.target.value as "CENTER" | "SUBJECT_SAFE")} className={controlClass}>
                  <option value="SUBJECT_SAFE">人物を安全に見せる</option>
                  <option value="CENTER">中央</option>
                </select>
              </EditableControl>
            </div>
          </details>
        )}

        {level === "DAVINCI" && (
          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-5">
            <div className="border border-sand-200 dark:border-navy-600 p-4">
              <p className="text-[10px] tracking-[0.18em] font-semibold text-amber-700 dark:text-amber-300">DERIVED / NOT HUMAN MASTER</p>
              <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">Canonical → DaVinci Value Bridge</p>
              <p className="mt-1 text-[11px] text-navy-500 dark:text-navy-300">Project Context: {davinciBridge.projectContext.width}×{davinciBridge.projectContext.height} / {davinciBridge.projectContext.fps}fps（Mask Reveal Vertical Slice）</p>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-navy-600 dark:text-navy-300">
                <BridgeRow label="Layer Delay" value={`${davinciBridge.timing.layerDelay.seconds}秒 → ${davinciBridge.timing.layerDelay.resolvedFrames} frames`} />
                <BridgeRow label="Motion Delay" value={`${davinciBridge.timing.motionDelay.seconds}秒 → ${davinciBridge.timing.motionDelay.resolvedFrames} frames`} />
                <BridgeRow label="Motion Duration" value={`${davinciBridge.timing.enterDuration.seconds}秒 → ${davinciBridge.timing.enterDuration.resolvedFrames} frames`} />
                <BridgeRow label="Hold" value={`${davinciBridge.timing.holdDuration.seconds}秒 → ${davinciBridge.timing.holdDuration.resolvedFrames} frames`} />
                <BridgeRow label="Position" value={`X ${davinciBridge.position.xNormalized.toFixed(2)} / Y ${davinciBridge.position.yNormalized.toFixed(2)}`} />
                <BridgeRow label="Distance" value={davinciBridge.motion.distanceNormalized.toFixed(3)} />
                <BridgeRow label="Scale" value={`${davinciBridge.scale.from.toFixed(2)} → ${davinciBridge.scale.to.toFixed(2)}`} />
                <BridgeRow label="Direction" value={davinciBridge.motion.direction} />
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">{davinciBridge.tools.map((tool) => <span key={tool} className="px-2 py-1 text-[10px] border border-sand-300 dark:border-navy-600">{tool}</span>)}</div>
              <p className="mt-4 text-[11px] leading-5 text-navy-500 dark:text-navy-300">人間の秒・位置・距離を正本として保持し、Project FPS / resolutionを通してDaVinci実装値を導出します。frame数だけを正本にしません。</p>
            </div>
            <OutputCard label="DaVinci Finish Manifest" value={outputs.davinciFinishManifest} copied={copied} onCopy={copy} />
          </div>
        )}

        <div className="mt-6 border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-300">SCENE INSTANCE</p>
              <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">Target {timing.targetDurationSeconds.toFixed(1)}秒 / Computed {timing.computedDurationSeconds.toFixed(1)}秒</p>
              <p className="mt-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">{timing.durationDeltaSeconds > 0 ? `Text timingがTargetより ${timing.durationDeltaSeconds.toFixed(1)}秒長い状態です。人間の値を勝手に縮めず差分を表示しています。` : "Targetと構造上のScene尺は一致しています。"}</p>
              {editingSceneId && <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">採用済みSceneを編集中。変更はfield単位で自動保存されます。</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {!editingSceneId ? <button type="button" onClick={adoptCurrentScene} className="bg-emerald-700 text-white px-4 py-2 text-xs font-semibold">このSceneを採用</button> : <button type="button" onClick={adoptAsAnotherScene} className="border border-emerald-600 text-emerald-700 dark:text-emerald-300 px-4 py-2 text-xs font-semibold">別Sceneとして採用</button>}
              <button type="button" onClick={() => setOutputRevision((current) => current + 1)} className="bg-navy-900 dark:bg-sand-100 text-white dark:text-navy-900 px-4 py-2 text-xs font-semibold">AI指示を作る</button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-navy-400">Palmierからは実timelineのNLE XMLを書き出し、Human Master Scene値をserializationしたMotion Handoff JSONをsidecarとしてDaVinciへ渡します。JSON / XML自体はHuman Masterではなく、XMLをこのアプリ側で捏造しません。</p>
      </div>

      <ProjectTimelinePanel state={composerState} editingSceneId={editingSceneId} onEdit={editScene} onDelete={deleteScene} />

      <div className="border-t border-sand-200 dark:border-navy-600 p-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <OutputCard label="Human Brief" value={outputs.humanBrief} copied={copied} onCopy={copy} />
        <OutputCard label="Claude Creative Instruction" value={outputs.claudeCreativeInstruction} copied={copied} onCopy={copy} />
        <OutputCard label="Palmier Instruction" value={outputs.palmierInstruction} copied={copied} onCopy={copy} />
        <OutputCard label="NLE XML Handoff" value={executionOutputs.nleXmlHandoff} copied={copied} onCopy={copy} />
        <OutputCard label="DaVinci Finish Manifest" value={outputs.davinciFinishManifest} copied={copied} onCopy={copy} />
        <OutputCard label="Verification Checklist" value={executionOutputs.verificationChecklist} copied={copied} onCopy={copy} />
        <OutputCard label="Editable Scene Serialization (JSON)" value={outputs.editableSourceOfTruthJson} copied={copied} onCopy={copy} />
        <OutputCard label="Motion Handoff Manifest JSON" value={outputs.motionHandoffJson} copied={copied} onCopy={copy} />
        <OutputCard label="Machine JSON" value={outputs.machineJson} copied={copied} onCopy={copy} />
      </div>
    </section>
  );
}

function ProjectTimelinePanel({ state, editingSceneId, onEdit, onDelete }: { state: MotionZukanComposerState; editingSceneId: string | null; onEdit: (scene: MaskRevealSceneInstance) => void; onDelete: (sceneId: string) => void }) {
  return (
    <section className="border-t border-sand-200 dark:border-navy-600 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">PROJECT TIMELINE / STRUCTURED AUTHORITY</p>
          <h4 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">採用したSceneを積み上げる</h4>
          <p className="mt-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">Legacy Storyboardは壊さず、将来sceneIdで連携できるComposer SceneInstanceとして別保存します。Recipeは採用時のprovenanceで、後からSceneを上書きしません。</p>
        </div>
        <p className="text-[10px] text-navy-400">{state.scenes.length} SceneInstance</p>
      </div>
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
        {(["opening", "profile"] as const).map((projectId) => {
          const timeline = state.timelines.find((item) => item.projectId === projectId);
          const scenes = (timeline?.sceneIds ?? []).map((id) => state.scenes.find((scene) => scene.sceneId === id)).filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
          return (
            <div key={projectId} className="border border-sand-200 dark:border-navy-600 p-4">
              <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold text-navy-900 dark:text-sand-100">{projectId === "opening" ? "Opening" : "Profile"}</p><p className="text-xs font-mono text-navy-500 dark:text-navy-300">{(timeline?.totalComputedDurationSeconds ?? 0).toFixed(1)}秒</p></div>
              {scenes.length === 0 ? <p className="mt-3 text-[11px] text-navy-400">まだ採用Sceneはありません。</p> : (
                <ol className="mt-3 space-y-2">{scenes.map((scene, index) => {
                  const resolvedScene = resolveMaskRevealEditableIntent(scene.editableIntent);
                  const placement = timeline?.placements.find((item) => item.sceneId === scene.sceneId);
                  return (
                    <li key={scene.sceneId} className={`border p-3 ${editingSceneId === scene.sceneId ? "border-sky-400 bg-sky-50/60 dark:bg-sky-950/20" : "border-sand-200 dark:border-navy-600"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] text-navy-400">#{index + 1} · {scene.editableIntent.section} · {scene.recipeProvenance.recipeId}</p>
                          <p className="mt-1 text-xs font-semibold text-navy-800 dark:text-sand-100 truncate">{resolvedScene.text} / Mask Reveal</p>
                          <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">{positionLabels[resolvedScene.positionPreset]} / {directionLabels[resolvedScene.direction]} / {scene.computedDurationSeconds.toFixed(1)}秒 / {scene.status}</p>
                          {placement && <p className="mt-1 text-[10px] font-mono text-navy-400">{placement.startSeconds.toFixed(1)}s → {placement.endSeconds.toFixed(1)}s</p>}
                          {scene.durationDeltaSeconds > 0 && <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-300">Targetとの差 +{scene.durationDeltaSeconds.toFixed(1)}秒</p>}
                          <p className="mt-1 text-[10px] text-navy-400">HUMAN_SELECTED {scene.humanSelectedFields.length} / LOCKED {scene.lockedFields.length}</p>
                        </div>
                        <div className="flex gap-2 shrink-0"><button type="button" onClick={() => onEdit(scene)} className="text-[10px] text-sky-700 dark:text-sky-300">編集</button><button type="button" onClick={() => onDelete(scene.sceneId)} className="text-[10px] text-red-500">削除</button></div>
                      </div>
                      <MaskRevealSceneHandoffCard scene={scene} />
                    </li>
                  );
                })}</ol>
              )}
              {(timeline?.edges.length ?? 0) > 0 && <p className="mt-3 text-[10px] text-navy-400">SceneEdge: {timeline?.edges.length} / default HARD CUT</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const controlClass = "w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100";

function LevelButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`px-3 py-2 text-xs ${active ? "bg-navy-900 text-white dark:bg-sand-100 dark:text-navy-900" : "text-navy-500 dark:text-navy-300"}`}>{children}</button>;
}

function SimpleField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">{label}</span><div className="mt-1">{children}</div></label>;
}

function EditableControl<T>({ label, field, onLock, children }: { label: string; field: EditableValue<T>; onLock: (locked: boolean) => void; children: React.ReactNode }) {
  const state = getEditableDecisionState(field);
  return (
    <div className="border border-sand-200 dark:border-navy-600 p-3">
      <div className="flex items-center justify-between gap-3"><span className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">{label}</span><button type="button" onClick={() => onLock(!field.locked)} className={`text-[10px] ${field.locked ? "text-amber-700 dark:text-amber-300 font-bold" : "text-navy-400"}`}>{field.locked ? "LOCKED 🔒" : "LOCK"}</button></div>
      <div className="mt-2">{children}</div>
      <p className="mt-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{state}</p>
      {field.aiSuggestedValue !== null && <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">AI Suggested: {String(field.aiSuggestedValue)}</p>}
      {field.aiReason && <p className="mt-1 text-[10px] leading-4 text-navy-400">Reason: {field.aiReason}</p>}
      {field.humanSelectedValue !== null && <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">Human Selected: {String(field.humanSelectedValue)}</p>}
    </div>
  );
}

function PresetChoiceGroup({ label, state, selected, choices, custom, aiSuggested, reason, humanSelected, locked, onLock, onSelect }: { label: string; state: string; selected: string; choices: ReadonlyArray<{ id: string; label: string }>; custom: boolean; aiSuggested: string | null; reason: string | null; humanSelected: string | null; locked: boolean; onLock: (locked: boolean) => void; onSelect: (value: string) => void }) {
  return (
    <div className="border border-sand-200 dark:border-navy-600 p-3">
      <div className="flex items-center justify-between gap-3"><span className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">{label}</span><button type="button" onClick={() => onLock(!locked)} className={`text-[10px] ${locked ? "text-amber-700 dark:text-amber-300 font-bold" : "text-navy-400"}`}>{locked ? "LOCKED 🔒" : "LOCK"}</button></div>
      <div className="mt-3 flex flex-wrap gap-2">
        {choices.map((choice) => <ChoiceButton key={choice.id} selected={!custom && selected === choice.id} onClick={() => onSelect(choice.id)}>{choice.label}</ChoiceButton>)}
        {custom && <ChoiceButton selected onClick={() => undefined}>カスタム</ChoiceButton>}
      </div>
      <p className="mt-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{state}</p>
      {aiSuggested && <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">AI Suggested: {aiSuggested}</p>}
      {reason && <p className="mt-1 text-[10px] leading-4 text-navy-400">Reason: {reason}</p>}
      {humanSelected && <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">Human Selected: {humanSelected}</p>}
    </div>
  );
}

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`px-3 py-2 text-xs border ${selected ? "border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/30 dark:text-sky-200" : "border-sand-300 dark:border-navy-600 text-navy-600 dark:text-navy-300"}`}>{selected ? "● " : "○ "}{children}</button>;
}

function NumberControl({ label, suffix, field, onChange, onLock }: { label: string; suffix: string; field: EditableValue<number>; onChange: (value: number) => void; onLock: (locked: boolean) => void }) {
  return <EditableControl label={label} field={field} onLock={onLock}><div className="flex items-center gap-2"><input type="number" step="0.1" value={resolveEditableValue(field)} onChange={(event) => onChange(Number(event.target.value))} className={controlClass} /><span className="text-xs text-navy-400">{suffix}</span></div></EditableControl>;
}

function BridgeRow({ label, value }: { label: string; value: string }) {
  return <div><dt className="font-semibold text-navy-800 dark:text-sand-100">{label}</dt><dd className="mt-1 font-mono">{value}</dd></div>;
}

function OutputCard({ label, value, copied, onCopy }: { label: string; value: string; copied: string; onCopy: (label: string, value: string) => Promise<void> }) {
  return (
    <section className="border border-sand-300 dark:border-navy-600 min-w-0">
      <div className="px-3 py-2 border-b border-sand-200 dark:border-navy-600 flex items-center justify-between gap-3"><h4 className="text-xs font-semibold text-navy-800 dark:text-sand-100">{label}</h4><button type="button" onClick={() => void onCopy(label, value)} className="text-[10px] text-sky-700 dark:text-sky-300">{copied === label ? "COPIED ✓" : "COPY"}</button></div>
      <pre className="p-3 text-[11px] leading-5 whitespace-pre-wrap overflow-x-auto text-navy-600 dark:text-navy-300">{value}</pre>
    </section>
  );
}
