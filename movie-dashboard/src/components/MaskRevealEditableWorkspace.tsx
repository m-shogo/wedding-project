import { useEffect, useMemo, useState } from "react";
import { MaskRevealSceneHandoffCard } from "./MaskRevealSceneHandoffCard";
import {
  applyHumanSelection,
  createDefaultMaskRevealEditableIntent,
  getEditableDecisionState,
  MASK_REVEAL_PATTERN_INFO,
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
import { addScenePreset, loadScenePresets, removeScenePreset, updateScenePreset, type ScenePreset } from "../data/scenePresetLibrary";
import { composableImagePatterns, composableTextPatterns } from "../data/visualMotionLibrary";
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
  buildMaskRevealSceneExport,
  computeMaskRevealSceneDuration,
  duplicateSceneInstance,
  loadMotionZukanComposerState,
  removeSceneInstance,
  retargetSceneInstanceSection,
  saveMotionZukanComposerState,
  updateSceneInstanceField,
  updateSceneInstanceFieldLock,
  type MaskRevealSceneInstance,
  type MotionZukanComposerState,
  type SceneProjectId,
} from "../data/visualSceneComposer";

const positionLabels: Record<PositionPreset, string> = Object.fromEntries(positionPresetOptions.map((item) => [item.id, item.label])) as Record<PositionPreset, string>;

const directionLabels: Record<MaskRevealDirection, string> = {
  UP: "下からスッと",
  DOWN: "上からスッと",
  LEFT: "右からスッと",
  RIGHT: "左からスッと",
};

const intensityLabels: Record<MaskRevealIntensity, string> = { S: "弱", M: "中", L: "強" };

type BroadcastFieldId =
  | "intensity"
  | "direction"
  | "position"
  | "layerDelaySeconds"
  | "sceneTiming"
  | "motionTiming"
  | "imageMotionDurationSeconds"
  | "positionDetail"
  | "cropFocus";

// Each broadcastable "group" touches one or more MaskRevealEditableFieldKey values together
// (position bundles preset+X+Y, matching how choosePositionPreset already sets them as one
// unit). Kept as data so the bulk-apply button loop doesn't need one hand-written case per field.
// `enterMotion`/`holdMotion`/`exitMotion` are deliberately excluded — they're pattern-identity
// labels with no dedicated editor control, not independently tunable values.
const BROADCAST_FIELD_GROUPS: Array<{ id: BroadcastFieldId; label: string; keys: MaskRevealEditableFieldKey[] }> = [
  { id: "intensity", label: "強さ", keys: ["intensity"] },
  { id: "direction", label: "文字の登場方向", keys: ["direction"] },
  { id: "position", label: "位置", keys: ["positionPreset", "positionXPercent", "positionYPercent"] },
  { id: "layerDelaySeconds", label: "文字を出すタイミング", keys: ["layerDelaySeconds"] },
  { id: "sceneTiming", label: "Scene Duration / Hold / Exit", keys: ["sceneDurationSeconds", "holdDurationSeconds", "exitDurationSeconds"] },
  { id: "motionTiming", label: "文字の動く速さ(Delay/Duration/Stagger)", keys: ["motionDelaySeconds", "enterDurationSeconds", "staggerDelaySeconds"] },
  { id: "imageMotionDurationSeconds", label: "画像の動きの長さ", keys: ["imageMotionDurationSeconds"] },
  { id: "positionDetail", label: "位置の微調整・距離・スケール", keys: ["positionOffsetXPercent", "positionOffsetYPercent", "distancePercent", "scaleFromPercent", "scaleToPercent"] },
  { id: "cropFocus", label: "Crop / Focus", keys: ["cropFocus"] },
];

type Level = "EASY" | "DETAIL" | "DAVINCI";

export function MaskRevealEditableWorkspace() {
  const patterns = useMemo(() => {
    const list = composableTextPatterns();
    // Mask Reveal stays first and always present even if its data-driven entry is momentarily
    // missing, since it's the one pattern with a fully hand-verified Composer -> DaVinci loop.
    return list.some((item) => item.patternId === MASK_REVEAL_PATTERN_INFO.patternId) ? list : [MASK_REVEAL_PATTERN_INFO, ...list];
  }, []);
  const imagePatterns = useMemo(() => composableImagePatterns(), []);
  const [intent, setIntent] = useState(() => createDefaultMaskRevealEditableIntent("OPENING_INTRO"));
  const [level, setLevel] = useState<Level>("EASY");
  const [copied, setCopied] = useState("");
  const [outputRevision, setOutputRevision] = useState(0);
  const [composerState, setComposerState] = useState<MotionZukanComposerState>(() => loadMotionZukanComposerState());
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [presets, setPresets] = useState<ScenePreset[]>(() => loadScenePresets());
  const [presetNameDraft, setPresetNameDraft] = useState<string | null>(null);
  const [broadcastFields, setBroadcastFields] = useState<Record<BroadcastFieldId, boolean>>({
    intensity: true,
    direction: false,
    position: false,
    layerDelaySeconds: false,
    sceneTiming: false,
    motionTiming: false,
    imageMotionDurationSeconds: false,
    positionDetail: false,
    cropFocus: false,
  });
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
    patternId: intent.patternId,
    implementationId: intent.davinciImplementation.implementationId,
  });

  // saveMotionZukanComposerState dispatches MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, which other
  // components (e.g. MotionZukanProductionWorkspace) listen to and call setState from. Doing
  // that synchronously inside the setComposerState updater fires it while this component is
  // still rendering, which React warns about ("Cannot update a component while rendering a
  // different component"). Persist as a side effect after the state actually changes instead.
  function updateComposer(updater: (current: MotionZukanComposerState) => MotionZukanComposerState) {
    setComposerState((current) => updater(current));
  }

  useEffect(() => {
    saveMotionZukanComposerState(composerState);
  }, [composerState]);

  function select<K extends MaskRevealEditableFieldKey>(key: K, value: MaskRevealEditableFields[K]["defaultValue"]) {
    setIntent((current) => applyHumanSelection(current, key, value));
    if (editingSceneId) updateComposer((current) => updateSceneInstanceField(current, editingSceneId, key, value));
  }

  function lock(key: MaskRevealEditableFieldKey, locked: boolean) {
    setIntent((current) => setEditableFieldLock(current, key, locked));
    if (editingSceneId) updateComposer((current) => updateSceneInstanceFieldLock(current, editingSceneId, key, locked));
  }

  function currentImagePattern() {
    return imagePatterns.find((item) => item.patternId === resolved.imagePatternId) ?? null;
  }

  function changeSection(section: MaskRevealSection) {
    const pattern = patterns.find((item) => item.patternId === intent.patternId) ?? MASK_REVEAL_PATTERN_INFO;
    const imagePattern = currentImagePattern();
    setIntent((current) => retargetMaskRevealSection(current, section, pattern, imagePattern));
    if (editingSceneId) updateComposer((current) => retargetSceneInstanceSection(current, editingSceneId, section));
  }

  function changePattern(patternId: string) {
    const pattern = patterns.find((item) => item.patternId === patternId);
    if (!pattern) return;
    // A fresh default intent for the newly chosen TEXT pattern, kept on the same section AND the
    // same image-layer selection (the two layers are independent — switching the text motion
    // should not silently drop an already-chosen image motion).
    setIntent(createDefaultMaskRevealEditableIntent(intent.section, pattern, currentImagePattern()));
    setEditingSceneId(null);
  }

  function changeImagePattern(patternId: string) {
    const pattern = imagePatterns.find((item) => item.patternId === patternId) ?? null;
    setIntent((current) => {
      const withPatternId = applyHumanSelection(current, "imagePatternId", pattern?.patternId ?? "");
      // Seed a sensible default duration the first time an image pattern is chosen; leave it
      // alone (still human-editable afterward) on subsequent switches.
      const withDuration = pattern && current.fields.imageMotionDurationSeconds.humanSelectedValue === null
        ? applyHumanSelection(withPatternId, "imageMotionDurationSeconds", resolveEditableValue(current.fields.sceneDurationSeconds))
        : withPatternId;
      return {
        ...withDuration,
        imageImplementation: pattern && { implementationId: pattern.implementationId, easyLabel: pattern.easyLabel, detailLabel: pattern.detailLabel, tools: pattern.tools },
      };
    });
    // imageImplementation lives outside `fields`, so a granular per-field composer update can't
    // carry it. Same as changePattern: stop editing the adopted Scene so "このSceneを採用" writes
    // the whole updated intent back atomically instead of leaving a stale imageImplementation.
    setEditingSceneId(null);
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

  function applyBroadcast() {
    const projectId = intent.section.startsWith("PROFILE_") ? "profile" : "opening";
    const activeKeys = BROADCAST_FIELD_GROUPS.filter((group) => broadcastFields[group.id]).flatMap((group) => group.keys);
    if (activeKeys.length === 0) return;
    updateComposer((current) => {
      let next = current;
      for (const scene of current.scenes) {
        if (scene.projectId !== projectId || scene.sceneId === editingSceneId) continue;
        for (const key of activeKeys) {
          // Respect LOCKED per-scene, per-field — a bulk change never overrides a field someone
          // deliberately pinned on one specific Scene.
          if (scene.editableIntent.fields[key].locked) continue;
          next = updateSceneInstanceField(next, scene.sceneId, key, resolved[key] as never);
        }
      }
      return next;
    });
  }

  function broadcastTargetCount() {
    const projectId = intent.section.startsWith("PROFILE_") ? "profile" : "opening";
    return composerState.scenes.filter((scene) => scene.projectId === projectId && scene.sceneId !== editingSceneId).length;
  }

  function defaultPresetName() {
    const textLabel = patterns.find((item) => item.patternId === intent.patternId)?.detailLabel ?? intent.patternId;
    const imageLabel = resolved.imagePatternId ? imagePatterns.find((item) => item.patternId === resolved.imagePatternId)?.detailLabel ?? "" : "";
    return imageLabel ? `${textLabel} + ${imageLabel}` : textLabel;
  }

  // Every structural (non-content) value a preset can carry, snapshotted from the currently
  // resolved intent. Shared by "save as new" and "overwrite existing" so the two never drift.
  function presetValuesFromCurrent(): Omit<ScenePreset, "schemaVersion" | "id" | "name" | "createdAt"> {
    return {
      patternId: intent.patternId,
      imagePatternId: resolved.imagePatternId,
      sceneDurationSeconds: resolved.sceneDurationSeconds,
      layerDelaySeconds: resolved.layerDelaySeconds,
      motionDelaySeconds: resolved.motionDelaySeconds,
      enterDurationSeconds: resolved.enterDurationSeconds,
      holdDurationSeconds: resolved.holdDurationSeconds,
      exitDurationSeconds: resolved.exitDurationSeconds,
      staggerDelaySeconds: resolved.staggerDelaySeconds,
      imageMotionDurationSeconds: resolved.imageMotionDurationSeconds,
      positionPreset: resolved.positionPreset,
      positionXPercent: resolved.positionXPercent,
      positionYPercent: resolved.positionYPercent,
      positionOffsetXPercent: resolved.positionOffsetXPercent,
      positionOffsetYPercent: resolved.positionOffsetYPercent,
      direction: resolved.direction,
      distancePercent: resolved.distancePercent,
      scaleFromPercent: resolved.scaleFromPercent,
      scaleToPercent: resolved.scaleToPercent,
      cropFocus: resolved.cropFocus,
      intensity: resolved.intensity,
    };
  }

  function startSavePreset() {
    setPresetNameDraft(defaultPresetName());
  }

  function confirmSavePreset() {
    const name = (presetNameDraft ?? "").trim();
    if (!name) return;
    setPresets(addScenePreset({ name, ...presetValuesFromCurrent() }));
    setPresetNameDraft(null);
  }

  function overwritePreset(id: string) {
    setPresets(updateScenePreset(id, presetValuesFromCurrent()));
  }

  function cancelSavePreset() {
    setPresetNameDraft(null);
  }

  function applyPreset(preset: ScenePreset) {
    const pattern = patterns.find((item) => item.patternId === preset.patternId) ?? MASK_REVEAL_PATTERN_INFO;
    const imagePattern = preset.imagePatternId ? imagePatterns.find((item) => item.patternId === preset.imagePatternId) ?? null : null;
    // Starts a fresh intent from the preset's pattern pair (same rule as changePattern: a
    // structural change is "start this Scene over"), then layers every preset value on top.
    // Text/Media are intentionally left at their pattern defaults — presets never carry
    // scene-specific content. Fields absent on an older-shape stored preset (`undefined`) are
    // left at that fresh default rather than overwritten, so a preset saved before this field
    // set expanded still applies cleanly instead of writing `undefined` into the intent.
    let next = createDefaultMaskRevealEditableIntent(intent.section, pattern, imagePattern);
    const apply = <K extends MaskRevealEditableFieldKey>(key: K, value: MaskRevealEditableFields[K]["defaultValue"] | undefined) => {
      if (value === undefined) return;
      next = applyHumanSelection(next, key, value);
    };
    apply("positionPreset", preset.positionPreset);
    apply("positionXPercent", preset.positionXPercent);
    apply("positionYPercent", preset.positionYPercent);
    apply("positionOffsetXPercent", preset.positionOffsetXPercent);
    apply("positionOffsetYPercent", preset.positionOffsetYPercent);
    apply("direction", preset.direction);
    apply("intensity", preset.intensity);
    apply("layerDelaySeconds", preset.layerDelaySeconds);
    apply("sceneDurationSeconds", preset.sceneDurationSeconds);
    apply("motionDelaySeconds", preset.motionDelaySeconds);
    apply("enterDurationSeconds", preset.enterDurationSeconds);
    apply("holdDurationSeconds", preset.holdDurationSeconds);
    apply("exitDurationSeconds", preset.exitDurationSeconds);
    apply("staggerDelaySeconds", preset.staggerDelaySeconds);
    apply("distancePercent", preset.distancePercent);
    apply("scaleFromPercent", preset.scaleFromPercent);
    apply("scaleToPercent", preset.scaleToPercent);
    apply("cropFocus", preset.cropFocus);
    if (imagePattern) apply("imageMotionDurationSeconds", preset.imageMotionDurationSeconds);
    setIntent(next);
    setEditingSceneId(null);
  }

  function deletePreset(id: string) {
    setPresets(removeScenePreset(id));
  }

  function duplicateScene(sceneId: string) {
    // For the "same combination, next section" workflow: keep the pattern/timing/position
    // choices, land on the duplicate immediately so only Text/Media need retyping.
    const before = new Set(composerState.scenes.map((scene) => scene.sceneId));
    const next = duplicateSceneInstance(composerState, sceneId);
    const duplicate = next.scenes.find((scene) => !before.has(scene.sceneId));
    setComposerState(next);
    if (duplicate) editScene(duplicate);
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
        <div className="mb-5 border border-sand-200 dark:border-navy-600 p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">よく使う組み合わせ</p>
              <p className="mt-1 text-[10px] leading-4 text-navy-400">文字パターン・画像パターン・位置・強さ・タイミングを名前で保存/呼び出し。文字と写真の中身は毎回入力する。</p>
            </div>
            {presetNameDraft === null ? (
              <button type="button" onClick={startSavePreset} className="border border-sky-600 text-sky-700 dark:text-sky-300 px-3 py-1.5 text-[10px] font-semibold shrink-0">今の組み合わせを保存</button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  autoFocus
                  value={presetNameDraft}
                  onChange={(event) => setPresetNameDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") confirmSavePreset();
                    if (event.key === "Escape") cancelSavePreset();
                  }}
                  placeholder="この組み合わせの名前"
                  className="border border-sky-600 bg-white dark:bg-navy-900 text-navy-900 dark:text-sand-100 px-2 py-1.5 text-[10px] w-56"
                />
                <button type="button" onClick={confirmSavePreset} disabled={!presetNameDraft.trim()} className="bg-sky-700 disabled:opacity-40 text-white px-3 py-1.5 text-[10px] font-semibold">保存</button>
                <button type="button" onClick={cancelSavePreset} className="border border-sand-300 dark:border-navy-600 px-3 py-1.5 text-[10px]">キャンセル</button>
              </div>
            )}
          </div>
          {presets.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <div key={preset.id} className="flex items-center gap-1 border border-sand-300 dark:border-navy-600">
                  <button type="button" onClick={() => applyPreset(preset)} className="px-2 py-1.5 text-[10px] text-navy-700 dark:text-sand-100">{preset.name}</button>
                  <button type="button" onClick={() => overwritePreset(preset.id)} className="px-2 py-1.5 text-[10px] text-sky-600" title="今の値でこのプリセットを上書き保存">⟳</button>
                  <button type="button" onClick={() => deletePreset(preset.id)} className="px-2 py-1.5 text-[10px] text-red-500" title="このプリセットを削除">×</button>
                </div>
              ))}
            </div>
          )}
        </div>
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
              <div />
              <SimpleField label={`文字の動き(${patterns.length}件から選択)`}>
                <select value={intent.patternId} onChange={(event) => changePattern(event.target.value)} className={controlClass}>
                  {patterns.map((pattern) => <option key={pattern.patternId} value={pattern.patternId}>{pattern.detailLabel}</option>)}
                </select>
                <p className="mt-1 text-[10px] leading-4 text-navy-400">{patterns.find((item) => item.patternId === intent.patternId)?.easyLabel}</p>
              </SimpleField>
              <EditableControl label="文字" field={intent.fields.text} onLock={(value) => lock("text", value)}>
                <input value={resolveEditableValue(intent.fields.text)} maxLength={24} onChange={(event) => select("text", event.target.value)} className={controlClass} />
              </EditableControl>
              <SimpleField label={`画像の動き(${imagePatterns.length}件から選択・任意)`}>
                <select value={resolved.imagePatternId} onChange={(event) => changeImagePattern(event.target.value)} className={controlClass}>
                  <option value="">なし(静止したまま背景に使う)</option>
                  {imagePatterns.map((pattern) => <option key={pattern.patternId} value={pattern.patternId}>{pattern.detailLabel}</option>)}
                </select>
                <p className="mt-1 text-[10px] leading-4 text-navy-400">{resolved.imagePatternId ? imagePatterns.find((item) => item.patternId === resolved.imagePatternId)?.easyLabel : "文字の背景としてのみ写真を使う場合はここは「なし」のままでよい。"}</p>
              </SimpleField>
              <EditableControl label="写真 / 動画" field={intent.fields.mediaLabel} onLock={(value) => lock("mediaLabel", value)}>
                <input value={resolveEditableValue(intent.fields.mediaLabel)} onChange={(event) => select("mediaLabel", event.target.value)} className={controlClass} />
              </EditableControl>
              {resolved.imagePatternId && (
                <EditableControl label="画像の動きの長さ" field={intent.fields.imageMotionDurationSeconds} onLock={(value) => lock("imageMotionDurationSeconds", value)}>
                  <div className="flex items-center gap-2">
                    <input type="number" step="0.1" min="0.5" value={resolveEditableValue(intent.fields.imageMotionDurationSeconds)} onChange={(event) => select("imageMotionDurationSeconds", Number(event.target.value))} className={controlClass} />
                    <span className="text-xs text-navy-400">秒</span>
                  </div>
                </EditableControl>
              )}
            </div>
            {resolved.imagePatternId && (
              <p className="text-[11px] leading-5 text-navy-500 dark:text-navy-300 border border-sand-200 dark:border-navy-600 p-3">
                文字と画像は別レイヤーとして独立に動きます。Scene全体の長さは、文字側({timing.textStructuralEndSeconds.toFixed(1)}秒)と画像側({timing.imageStructuralEndSeconds.toFixed(1)}秒)の長い方({timing.longerLayer === "IMAGE" ? "画像" : timing.longerLayer === "TEXT" ? "文字" : "-"}が基準)に自動的に合わせられます。
              </p>
            )}

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
              <p className="mt-1 text-[11px] text-navy-500 dark:text-navy-300">Project Context: {davinciBridge.projectContext.width}×{davinciBridge.projectContext.height} / {davinciBridge.projectContext.fps}fps（{intent.davinciImplementation.detailLabel}）</p>
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

        <div className="mt-4 border border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/10 p-4">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-amber-700 dark:text-amber-300">BROADCAST / 一括反映</p>
          <p className="mt-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">今の{intent.section.startsWith("PROFILE_") ? "Profile" : "Opening"}の値を、他の採用済みSceneへチェックした項目だけ反映する。LOCKEDなSceneのfieldは変更しない。対象: {broadcastTargetCount()}件。</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {BROADCAST_FIELD_GROUPS.map((group) => (
              <label key={group.id} className="flex items-center gap-1.5 text-[11px] text-navy-600 dark:text-navy-300">
                <input type="checkbox" checked={broadcastFields[group.id]} onChange={(event) => setBroadcastFields((current) => ({ ...current, [group.id]: event.target.checked }))} />
                {group.label}
              </label>
            ))}
          </div>
          <button type="button" onClick={applyBroadcast} disabled={broadcastTargetCount() === 0} className="mt-3 bg-amber-700 disabled:opacity-40 text-white px-4 py-2 text-xs font-semibold">チェックした項目を他のSceneへ反映</button>
        </div>
      </div>

      <ProjectTimelinePanel state={composerState} editingSceneId={editingSceneId} onEdit={editScene} onDelete={deleteScene} onDuplicate={duplicateScene} copied={copied} onCopy={copy} />

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

function ProjectTimelinePanel({ state, editingSceneId, onEdit, onDelete, onDuplicate, copied, onCopy }: { state: MotionZukanComposerState; editingSceneId: string | null; onEdit: (scene: MaskRevealSceneInstance) => void; onDelete: (sceneId: string) => void; onDuplicate: (sceneId: string) => void; copied: string; onCopy: (label: string, value: string) => Promise<void> }) {
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
                  const hasImageLayer = scene.editableIntent.imageImplementation !== null && resolvedScene.imagePatternId !== "";
                  return (
                    <li key={scene.sceneId} className={`border p-3 ${editingSceneId === scene.sceneId ? "border-sky-400 bg-sky-50/60 dark:bg-sky-950/20" : "border-sand-200 dark:border-navy-600"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] text-navy-400">#{index + 1} · {scene.editableIntent.section} · {scene.recipeProvenance.recipeId}</p>
                          <p className="mt-1 text-xs font-semibold text-navy-800 dark:text-sand-100 truncate">{resolvedScene.text} / {scene.editableIntent.davinciImplementation.detailLabel}</p>
                          {hasImageLayer && <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300 truncate">画像: {resolvedScene.mediaLabel} / {scene.editableIntent.imageImplementation!.detailLabel} / {resolvedScene.imageMotionDurationSeconds.toFixed(1)}秒</p>}
                          <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">{positionLabels[resolvedScene.positionPreset]} / {directionLabels[resolvedScene.direction]} / {scene.computedDurationSeconds.toFixed(1)}秒 / {scene.status}</p>
                          {placement && <p className="mt-1 text-[10px] font-mono text-navy-400">{placement.startSeconds.toFixed(1)}s → {placement.endSeconds.toFixed(1)}s</p>}
                          {scene.durationDeltaSeconds > 0 && <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-300">Targetとの差 +{scene.durationDeltaSeconds.toFixed(1)}秒</p>}
                          <p className="mt-1 text-[10px] text-navy-400">HUMAN_SELECTED {scene.humanSelectedFields.length} / LOCKED {scene.lockedFields.length}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button type="button" onClick={() => onDuplicate(scene.sceneId)} className="text-[10px] text-emerald-700 dark:text-emerald-300" title="同じ組み合わせ(パターン/位置/強さ)を保ったまま次のSceneを作る">複製</button>
                          <button type="button" onClick={() => onEdit(scene)} className="text-[10px] text-sky-700 dark:text-sky-300">編集</button>
                          <button type="button" onClick={() => onDelete(scene.sceneId)} className="text-[10px] text-red-500">削除</button>
                        </div>
                      </div>
                      <MaskRevealSceneHandoffCard scene={scene} />
                    </li>
                  );
                })}</ol>
              )}
              {(timeline?.edges.length ?? 0) > 0 && <p className="mt-3 text-[10px] text-navy-400">SceneEdge: {timeline?.edges.length} / default HARD CUT</p>}
              {scenes.length > 0 && <ProjectBundleExport projectId={projectId} scenes={scenes} timeline={timeline} copied={copied} onCopy={onCopy} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Bundles every adopted Scene in one project (in timeline order) into one document, so a 14-Scene
// Opening doesn't mean copy-pasting 14 separate Human Brief / Palmier / DaVinci cards one at a
// time. Same per-Scene outputs as the single-Scene cards below, just concatenated with placement.
function ProjectBundleExport({ projectId, scenes, timeline, copied, onCopy }: { projectId: SceneProjectId; scenes: MaskRevealSceneInstance[]; timeline: MotionZukanComposerState["timelines"][number] | undefined; copied: string; onCopy: (label: string, value: string) => Promise<void> }) {
  const bundle = useMemo(() => {
    const sections = scenes.map((scene, index) => {
      const placement = timeline?.placements.find((item) => item.sceneId === scene.sceneId);
      const outputs = buildMaskRevealEditableProductionOutputs(scene.editableIntent);
      const placementLine = placement ? `Placement: ${placement.startSeconds.toFixed(1)}s → ${placement.endSeconds.toFixed(1)}s` : "Placement: (not yet in a rebuilt timeline)";
      return [
        `=== Scene ${index + 1}/${scenes.length} · ${scene.sceneId} ===`,
        placementLine,
        "",
        "--- Human Brief ---",
        outputs.humanBrief,
        "",
        "--- Palmier Instruction ---",
        outputs.palmierInstruction,
        "",
        "--- DaVinci Finish Manifest ---",
        outputs.davinciFinishManifest,
      ].join("\n");
    });
    return [
      `${projectId.toUpperCase()} PROJECT BUNDLE / ${scenes.length} Scenes / ${(timeline?.totalComputedDurationSeconds ?? 0).toFixed(1)} sec total`,
      "Scenes are in current Project Timeline order. Each Scene keeps its own HUMAN_SELECTED/LOCKED values; adopting a bundle export does not merge or reorder Scenes.",
      "",
      ...sections,
    ].join("\n\n");
  }, [scenes, timeline, projectId]);

  const bundleJson = useMemo(() => JSON.stringify({
    schemaVersion: "scene-project-bundle/v1",
    projectId,
    totalComputedDurationSeconds: timeline?.totalComputedDurationSeconds ?? 0,
    scenes: scenes.map((scene) => buildMaskRevealSceneExport(scene)),
  }, null, 2), [scenes, timeline, projectId]);

  return (
    <div className="mt-4 border-t border-sand-200 dark:border-navy-600 pt-3">
      <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">{scenes.length}件まとめて書き出す</p>
      <p className="mt-1 text-[10px] leading-4 text-navy-400">Palmier/DaVinciへ1件ずつコピーする代わりに、この{projectId === "opening" ? "Opening" : "Profile"}の全Sceneを順番通り1つの文書にまとめます。</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={() => void onCopy(`${projectId}-bundle-text`, bundle)} className="border border-emerald-600 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 text-[10px] font-semibold">{copied === `${projectId}-bundle-text` ? "COPIED ✓" : `${scenes.length}件を1つのテキストとしてコピー`}</button>
        <button type="button" onClick={() => void onCopy(`${projectId}-bundle-json`, bundleJson)} className="border border-sand-300 dark:border-navy-600 text-navy-600 dark:text-navy-300 px-3 py-1.5 text-[10px] font-semibold">{copied === `${projectId}-bundle-json` ? "COPIED ✓" : "JSONとしてコピー"}</button>
      </div>
    </div>
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
