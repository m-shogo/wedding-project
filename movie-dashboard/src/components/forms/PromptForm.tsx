import { useState } from "react";
import type { Prompt, PromptStatus, PromptTarget } from "../../types/movie";
import { PROMPT_TOOLS } from "../../types/movie";
import { promptStatusLabel, promptTargetLabel } from "../../lib/labels";
import { generateId } from "../../lib/ids";

interface PromptFormProps {
  prompt?: Prompt;
  selectedMovieId: string;
  onSave: (prompt: Prompt) => void;
  onCancel: () => void;
}

const targetKeys = Object.keys(promptTargetLabel) as PromptTarget[];
const statusKeys = Object.keys(promptStatusLabel) as PromptStatus[];

export function PromptForm({ prompt, selectedMovieId, onSave, onCancel }: PromptFormProps) {
  const isEdit = !!prompt;

  const [title, setTitle] = useState(prompt?.title ?? "");
  const [target, setTarget] = useState<PromptTarget>(prompt?.target ?? "image");
  const [tool, setTool] = useState(prompt?.tool ?? PROMPT_TOOLS[0]);
  const [promptText, setPromptText] = useState(prompt?.prompt ?? "");
  const [negativePrompt, setNegativePrompt] = useState(prompt?.negativePrompt ?? "");
  const [status, setStatus] = useState<PromptStatus>(prompt?.status ?? "draft");
  const [notes, setNotes] = useState(prompt?.notes ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result: Prompt = {
      promptId: prompt?.promptId ?? generateId("prompt"),
      title,
      target,
      tool,
      prompt: promptText,
      negativePrompt,
      relatedSceneIds: prompt?.relatedSceneIds ?? [],
      relatedMovieIds: prompt?.relatedMovieIds ?? (selectedMovieId !== "all" ? [selectedMovieId] : []),
      status,
      resultAssetIds: prompt?.resultAssetIds ?? [],
      notes,
    };
    onSave(result);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="form-label">タイトル</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
        </div>
        <div>
          <label className="form-label">ターゲット</label>
          <select value={target} onChange={(e) => setTarget(e.target.value as PromptTarget)} className="form-input">
            {targetKeys.map((k) => (
              <option key={k} value={k}>{promptTargetLabel[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">ツール</label>
          <select value={tool} onChange={(e) => setTool(e.target.value)} className="form-input">
            {PROMPT_TOOLS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="form-label">プロンプト</label>
          <textarea value={promptText} onChange={(e) => setPromptText(e.target.value)} className="form-input" rows={4} />
        </div>
        <div className="col-span-2">
          <label className="form-label">ネガティブプロンプト</label>
          <textarea value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} className="form-input" rows={2} />
        </div>
        <div>
          <label className="form-label">ステータス</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as PromptStatus)} className="form-input">
            {statusKeys.map((k) => (
              <option key={k} value={k}>{promptStatusLabel[k]}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="form-label">メモ</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="form-input" rows={2} />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50">
          キャンセル
        </button>
        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
          {isEdit ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
