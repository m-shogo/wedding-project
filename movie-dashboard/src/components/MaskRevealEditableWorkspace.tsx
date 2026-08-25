import { useMemo, useState } from "react";
import {
  applyHumanSelection,
  createDefaultMaskRevealEditableIntent,
  getEditableDecisionState,
  resolveEditableValue,
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
  const outputs = useMemo(() => buildMaskRevealEditableProductionOutputs(intent), [intent]);

  function select<K extends MaskRevealEditableFieldKey>(key: K, value: MaskRevealEditableFields[K]["defaultValue"]) {
    setIntent((current) => applyHumanSelection(current, key, value));
  }

  function lock(key: MaskRevealEditableFieldKey, locked: boolean) {
    setIntent((current) => setEditableFieldLock(current, key, locked));
  }

  function changeSection(section: MaskRevealSection) {
    setIntent((current) => retargetMaskRevealSection(current, section));
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
            <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">HUMAN MASTER / EDITABLE SOURCE OF TRUTH</p>
            <h3 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">人間が理解して、1項目ずつ直せる正本</h3>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">AIは提案者。HUMAN_SELECTED / LOCKEDはClaude・Codex・Palmier・自動処理より上位です。</p>
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
      </div>

      <div className="border-t border-sand-200 dark:border-navy-600 p-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <OutputCard label="Human Brief" value={outputs.humanBrief} copied={copied} onCopy={copy} />
        <OutputCard label="Claude Creative Instruction" value={outputs.claudeCreativeInstruction} copied={copied} onCopy={copy} />
        <OutputCard label="Palmier Instruction" value={outputs.palmierInstruction} copied={copied} onCopy={copy} />
        <OutputCard label="Editable Source of Truth JSON" value={outputs.editableSourceOfTruthJson} copied={copied} onCopy={copy} />
        <OutputCard label="Motion Handoff Manifest JSON" value={outputs.motionHandoffJson} copied={copied} onCopy={copy} />
        <OutputCard label="Machine JSON" value={outputs.machineJson} copied={copied} onCopy={copy} />
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
