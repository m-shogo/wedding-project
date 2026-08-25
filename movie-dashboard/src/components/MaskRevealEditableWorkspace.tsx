import { useMemo, useState } from "react";
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
    if (editingSceneId) {
      updateComposer((current) => updateSceneInstanceField(current, editingSceneId, key, value));
    }
  }

  function lock(key: MaskRevealEditableFieldKey, locked: boolean) {
    setIntent((current) => setEditableFieldLock(current, key, locked));
    if (editingSceneId) {
      updateComposer((current) => updateSceneInstanceFieldLock(current, editingSceneId, key, locked));
    }
  }

  function changeSection(section: MaskRevealSection) {
    setIntent((current) => retargetMaskRevealSection(current, section));
    if (editingSceneId) {
      updateComposer((current) => retargetSceneInstanceSection(current, editingSceneId, section));
    }
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
            <h3 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">人間が理解して、1項目ずつ直せるScene</h3>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">AIは提案者。採用したSceneInstanceではHUMAN_SELECTED / LOCKEDがマスターです。採用後の編集は変更したfieldだけを保存します。</p>
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
            <EditableControl label="位置" field={intent.fields.positionPreset} onLock={(value) => lock("positionPreset", value)}>
              <select value={resolveEditableValue(intent.fields.positionPreset)} onChange={(event) => select("positionPreset", event.target.value as PositionPreset)} className={controlClass}>
                {Object.entries(positionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </EditableControl>
            <EditableControl label="文字の登場" field={intent.fields.direction} onLock={(value) => lock("direction", value)}>
              <select value={resolveEditableValue(intent.fields.direction)} onChange={(event) => select("direction", event.target.value as MaskRevealDirection)} className={controlClass}>
                {Object.entries(directionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </EditableControl>
            <EditableControl label="強さ" field={intent.fields.intensity} onLock={(value) => lock("intensity", value)}>
              <select value={resolveEditableValue(intent.fields.intensity)} onChange={(event) => select("intensity", event.target.value as MaskRevealIntensity)} className={controlClass}>
                {Object.entries(intensityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </EditableControl>
          </div>
        )}

        {level === "DETAIL" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <NumberControl label="Scene Duration" suffix="秒" field={intent.fields.sceneDurationSeconds} onChange={(value) => select("sceneDurationSeconds", value)} onLock={(value) => lock("sceneDurationSeconds", value)} />
            <NumberControl label="Layer Delay" suffix="秒" field={intent.fields.layerDelaySeconds} onChange={(value) => select("layerDelaySeconds", value)} onLock={(value) => lock("layerDelaySeconds", value)} />
            <NumberControl label="Motion Delay" suffix="秒" field={intent.fields.motionDelaySeconds} onChange={(value) => select("motionDelaySeconds", value)} onLock={(value) => lock("motionDelaySeconds", value)} />
            <NumberControl label="Motion Duration" suffix="秒" field={intent.fields.enterDurationSeconds} onChange={(value) => select("enterDurationSeconds", value)} onLock={(value) => lock("enterDurationSeconds", value)} />
            <NumberControl label="Hold" suffix="秒" field={intent.fields.holdDurationSeconds} onChange={(value) => select("holdDurationSeconds", value)} onLock={(value) => lock("holdDurationSeconds", value)} />
            <NumberControl label="Stagger Delay" suffix="秒" field={intent.fields.staggerDelaySeconds} onChange={(value) => select("staggerDelaySeconds", value)} onLock={(value) => lock("staggerDelaySeconds", value)} />
            <NumberControl label="X" suffix="%" field={intent.fields.positionXPercent} onChange={(value) => select("positionXPercent", value)} onLock={(value) => lock("positionXPercent", value)} />
            <NumberControl label="Y" suffix="%" field={intent.fields.positionYPercent} onChange={(value) => select("positionYPercent", value)} onLock={(value) => lock("positionYPercent", value)} />
            <NumberControl label="Offset X" suffix="%" field={intent.fields.positionOffsetXPercent} onChange={(value) => select("positionOffsetXPercent", value)} onLock={(value) => lock("positionOffsetXPercent", value)} />
            <NumberControl label="Offset Y" suffix="%" field={intent.fields.positionOffsetYPercent} onChange={(value) => select("positionOffsetYPercent", value)} onLock={(value) => lock("positionOffsetYPercent", value)} />
            <NumberControl label="Distance" suffix="%" field={intent.fields.distancePercent} onChange={(value) => select("distancePercent", value)} onLock={(value) => lock("distancePercent", value)} />
            <NumberControl label="Scale From" suffix="%" field={intent.fields.scaleFromPercent} onChange={(value) => select("scaleFromPercent", value)} onLock={(value) => lock("scaleFromPercent", value)} />
            <NumberControl label="Scale To" suffix="%" field={intent.fields.scaleToPercent} onChange={(value) => select("scaleToPercent", value)} onLock={(value) => lock("scaleToPercent", value)} />
          </div>
        )}

        {level === "DAVINCI" && (
          <div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] gap-5">
            <div className="border border-sand-200 dark:border-navy-600 p-4">
              <p className="text-xs font-bold text-navy-900 dark:text-sand-100">{intent.davinciImplementation.easyLabel}</p>
              <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">{intent.davinciImplementation.detailLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {intent.davinciImplementation.tools.map((tool) => <span key={tool} className="px-2 py-1 text-[10px] border border-sand-300 dark:border-navy-600">{tool}</span>)}
              </div>
              <p className="mt-4 text-[11px] leading-5 text-navy-500 dark:text-navy-300">DaVinciの専門用語は最終精密調整のためにだけ表示します。人間の正本は上の意味が分かる値です。</p>
            </div>
            <OutputCard label="DaVinci Finish Manifest" value={outputs.davinciFinishManifest} copied={copied} onCopy={copy} />
          </div>
        )}

        <div className="mt-6 border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-300">SCENE INSTANCE</p>
              <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">Target {timing.targetDurationSeconds.toFixed(1)}秒 / Computed {timing.computedDurationSeconds.toFixed(1)}秒</p>
              <p className="mt-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
                {timing.durationDeltaSeconds > 0
                  ? `Text timingがTargetより ${timing.durationDeltaSeconds.toFixed(1)}秒長い状態です。人間の値を勝手に縮めず差分を表示しています。`
                  : "Targetと構造上のScene尺は一致しています。"}
              </p>
              {editingSceneId && <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">採用済みSceneを編集中。変更はfield単位で自動保存されます。</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {!editingSceneId ? (
                <button type="button" onClick={adoptCurrentScene} className="bg-emerald-700 text-white px-4 py-2 text-xs font-semibold">このSceneを採用</button>
              ) : (
                <button type="button" onClick={adoptAsAnotherScene} className="border border-emerald-600 text-emerald-700 dark:text-emerald-300 px-4 py-2 text-xs font-semibold">別Sceneとして採用</button>
              )}
              <button type="button" onClick={() => setOutputRevision((current) => current + 1)} className="bg-navy-900 dark:bg-sand-100 text-white dark:text-navy-900 px-4 py-2 text-xs font-semibold">AI指示を作る</button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-navy-400">Palmierからは実timelineのNLE XMLを書き出し、このHuman MasterのMotion Handoff Manifest JSONをsidecarとしてDaVinciへ渡します。XMLをこのアプリ側で捏造しません。</p>
      </div>

      <ProjectTimelinePanel state={composerState} editingSceneId={editingSceneId} onEdit={editScene} onDelete={deleteScene} />

      <div className="border-t border-sand-200 dark:border-navy-600 p-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <OutputCard label="Human Brief" value={outputs.humanBrief} copied={copied} onCopy={copy} />
        <OutputCard label="Claude Creative Instruction" value={outputs.claudeCreativeInstruction} copied={copied} onCopy={copy} />
        <OutputCard label="Palmier Instruction" value={outputs.palmierInstruction} copied={copied} onCopy={copy} />
        <OutputCard label="NLE XML Handoff" value={executionOutputs.nleXmlHandoff} copied={copied} onCopy={copy} />
        <OutputCard label="DaVinci Finish Manifest" value={outputs.davinciFinishManifest} copied={copied} onCopy={copy} />
        <OutputCard label="Verification Checklist" value={executionOutputs.verificationChecklist} copied={copied} onCopy={copy} />
        <OutputCard label="Editable Source of Truth JSON" value={outputs.editableSourceOfTruthJson} copied={copied} onCopy={copy} />
        <OutputCard label="Motion Handoff Manifest JSON" value={outputs.motionHandoffJson} copied={copied} onCopy={copy} />
        <OutputCard label="Machine JSON" value={outputs.machineJson} copied={copied} onCopy={copy} />
      </div>
    </section>
  );
}

function ProjectTimelinePanel({ state, editingSceneId, onEdit, onDelete }: {
  state: MotionZukanComposerState;
  editingSceneId: string | null;
  onEdit: (scene: MaskRevealSceneInstance) => void;
  onDelete: (sceneId: string) => void;
}) {
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
          const scenes = (timeline?.sceneIds ?? [])
            .map((id) => state.scenes.find((scene) => scene.sceneId === id))
            .filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
          return (
            <div key={projectId} className="border border-sand-200 dark:border-navy-600 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold text-navy-900 dark:text-sand-100">{projectId === "opening" ? "Opening" : "Profile"}</p>
                <p className="text-xs font-mono text-navy-500 dark:text-navy-300">{(timeline?.totalComputedDurationSeconds ?? 0).toFixed(1)}秒</p>
              </div>
              {scenes.length === 0 ? (
                <p className="mt-3 text-[11px] text-navy-400">まだ採用Sceneはありません。</p>
              ) : (
                <ol className="mt-3 space-y-2">
                  {scenes.map((scene, index) => {
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
                          <div className="flex gap-2 shrink-0">
                            <button type="button" onClick={() => onEdit(scene)} className="text-[10px] text-sky-700 dark:text-sky-300">編集</button>
                            <button type="button" onClick={() => onDelete(scene.sceneId)} className="text-[10px] text-red-500">削除</button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
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
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">{label}</span>
        <button type="button" onClick={() => onLock(!field.locked)} className={`text-[10px] ${field.locked ? "text-amber-700 dark:text-amber-300 font-bold" : "text-navy-400"}`}>{field.locked ? "LOCKED 🔒" : "LOCK"}</button>
      </div>
      <div className="mt-2">{children}</div>
      <p className="mt-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{state}</p>
      {field.aiSuggestedValue !== null && <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">AI Suggested: {String(field.aiSuggestedValue)}</p>}
      {field.aiReason && <p className="mt-1 text-[10px] leading-4 text-navy-400">Reason: {field.aiReason}</p>}
      {field.humanSelectedValue !== null && <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">Human Selected: {String(field.humanSelectedValue)}</p>}
    </div>
  );
}

function NumberControl({ label, suffix, field, onChange, onLock }: { label: string; suffix: string; field: EditableValue<number>; onChange: (value: number) => void; onLock: (locked: boolean) => void }) {
  return (
    <EditableControl label={label} field={field} onLock={onLock}>
      <div className="flex items-center gap-2">
        <input type="number" step="0.1" value={resolveEditableValue(field)} onChange={(event) => onChange(Number(event.target.value))} className={controlClass} />
        <span className="text-xs text-navy-400">{suffix}</span>
      </div>
    </EditableControl>
  );
}

function OutputCard({ label, value, copied, onCopy }: { label: string; value: string; copied: string; onCopy: (label: string, value: string) => Promise<void> }) {
  return (
    <section className="border border-sand-300 dark:border-navy-600 min-w-0">
      <div className="px-3 py-2 border-b border-sand-200 dark:border-navy-600 flex items-center justify-between gap-3">
        <h4 className="text-xs font-semibold text-navy-800 dark:text-sand-100">{label}</h4>
        <button type="button" onClick={() => void onCopy(label, value)} className="text-[10px] text-sky-700 dark:text-sky-300">{copied === label ? "COPIED ✓" : "COPY"}</button>
      </div>
      <pre className="p-3 text-[11px] leading-5 whitespace-pre-wrap overflow-x-auto text-navy-600 dark:text-navy-300">{value}</pre>
    </section>
  );
}
