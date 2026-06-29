import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PromptForm } from "../components/forms/PromptForm";
import {
  promptStatusLabel, promptStatusColor,
  promptTargetLabel, promptTargetColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import type { Prompt, PromptStatus, PromptTarget } from "../types/movie";

export function PromptBank() {
  const {
    selectedMovieId,
    moviePrompts,
    data,
    addPrompt,
    updatePrompt,
    deletePrompt,
    duplicatePrompt,
  } = useProduction();

  const [filterTarget, setFilterTarget] = useState<PromptTarget | "all">("all");
  const [filterStatus, setFilterStatus] = useState<PromptStatus | "all">("all");
  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const filtered = prompts
    .filter((p) => filterTarget === "all" || p.target === filterTarget)
    .filter((p) => filterStatus === "all" || p.status === filterStatus);

  function copyPrompt(text: string, promptId: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(promptId);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div>
      <Header title="プロンプト管理" description="生成プロンプトの登録・シーン紐付け・コピーを行います" showMovieSelector />

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterTarget("all")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium ${filterTarget === "all" ? "bg-navy-700 text-white" : "bg-sand-100 text-navy-600 hover:bg-sand-200"}`}>
            すべて ({prompts.length})
          </button>
          {(Object.keys(promptTargetLabel) as PromptTarget[]).map((t) => {
            const count = prompts.filter((p) => p.target === t).length;
            if (count === 0) return null;
            return (
              <button key={t} onClick={() => setFilterTarget(t)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium ${filterTarget === t ? "bg-navy-700 text-white" : "bg-sand-100 text-navy-600 hover:bg-sand-200"}`}>
                {promptTargetLabel[t]} ({count})
              </button>
            );
          })}
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 shrink-0">
          + プロンプト追加
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-navy-400 self-center mr-1">状態:</span>
        {(Object.keys(promptStatusLabel) as PromptStatus[]).map((s) => (
          <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
            className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === s ? "bg-navy-600 text-white" : "bg-sand-50 text-navy-500 hover:bg-sand-100"}`}>
            {promptStatusLabel[s]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((p) => {
          const isExpanded = expandedId === p.promptId;
          return (
            <div key={p.promptId} className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : p.promptId)}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-navy-400">{p.promptId}</span>
                  <h3 className="font-bold text-navy-800 truncate">{p.title}</h3>
                  <Badge label={promptTargetLabel[p.target]} colorClass={promptTargetColor[p.target]} />
                  <Badge label={promptStatusLabel[p.status]} colorClass={promptStatusColor[p.status]} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-navy-400">{p.tool}</span>
                  <span className="text-navy-400">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-4 text-xs text-navy-500">
                    <span>シーン: {p.relatedSceneIds.join(", ") || "—"}</span>
                    {p.resultAssetIds.length > 0 && <span>生成結果素材:{p.resultAssetIds.join(", ")}</span>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-navy-400 tracking-wider">ポジティブプロンプト</p>
                      <button onClick={() => copyPrompt(p.prompt, p.promptId + "-pos")} className="text-xs text-navy-500 hover:text-navy-700">
                        {copiedId === p.promptId + "-pos" ? "✓ コピー済み" : "コピー"}
                      </button>
                    </div>
                    <pre className="text-sm text-navy-700 bg-sand-50 rounded-lg p-4 whitespace-pre-wrap break-words font-mono leading-relaxed select-all">
                      {p.prompt}
                    </pre>
                  </div>

                  {p.negativePrompt && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-navy-400 tracking-wider">ネガティブプロンプト</p>
                        <button onClick={() => copyPrompt(p.negativePrompt, p.promptId + "-neg")} className="text-xs text-navy-500 hover:text-navy-700">
                          {copiedId === p.promptId + "-neg" ? "✓ コピー済み" : "コピー"}
                        </button>
                      </div>
                      <pre className="text-sm text-red-700 bg-red-50 rounded-lg p-4 whitespace-pre-wrap break-words font-mono leading-relaxed select-all">
                        {p.negativePrompt}
                      </pre>
                    </div>
                  )}

                  {p.notes && (
                    <div>
                      <p className="text-xs font-semibold text-navy-400 tracking-wider mb-2">メモ</p>
                      <p className="text-sm text-navy-500">{p.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-sand-100">
                    <button onClick={() => setEditPrompt(p)} className="text-xs text-navy-500 hover:text-navy-700">✏️ 編集</button>
                    <button onClick={() => duplicatePrompt(p.promptId)} className="text-xs text-navy-500 hover:text-navy-700">📋 複製</button>
                    <button onClick={() => setDeleteId(p.promptId)} className="text-xs text-red-400 hover:text-red-600">🗑 削除</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-navy-400 text-center py-8">該当するプロンプトがありません</p>}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="プロンプト追加" wide>
        <PromptForm selectedMovieId={selectedMovieId} onSave={(p) => { addPrompt(p); setShowAdd(false); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editPrompt} onClose={() => setEditPrompt(null)} title="プロンプト編集" wide>
        {editPrompt && <PromptForm prompt={editPrompt} selectedMovieId={selectedMovieId} onSave={(p) => { updatePrompt(p); setEditPrompt(null); }} onCancel={() => setEditPrompt(null)} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="プロンプト削除"
        message="このプロンプトを削除しますか？"
        onConfirm={() => { if (deleteId) deletePrompt(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </div>
  );
}
