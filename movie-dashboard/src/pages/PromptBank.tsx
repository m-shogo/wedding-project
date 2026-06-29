import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PromptForm } from "../components/forms/PromptForm";
import {
  promptStatusLabel, promptStatusColor,
  promptTargetLabel, promptTargetColor,
  assetStatusLabel, assetStatusColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
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
  const { addToast } = useToast();

  const [filterTarget, setFilterTarget] = useState<PromptTarget | "all">("all");
  const [filterStatus, setFilterStatus] = useState<PromptStatus | "all">("all");
  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [linkAssetPromptId, setLinkAssetPromptId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<[string, string] | null>(null);
  const [comparePickFirst, setComparePickFirst] = useState<string | null>(null);

  const prompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const filtered = prompts
    .filter((p) => filterTarget === "all" || p.target === filterTarget)
    .filter((p) => filterStatus === "all" || p.status === filterStatus)
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return [p.title, p.prompt, p.negativePrompt, p.notes, p.tool].some((f) => f.toLowerCase().includes(q));
    });

  function copyPrompt(text: string, promptId: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(promptId);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function linkResultAsset(promptId: string, assetId: string) {
    const prompt = data.prompts.find((p) => p.promptId === promptId);
    if (!prompt) return;
    if (prompt.resultAssetIds.includes(assetId)) return;
    updatePrompt({ ...prompt, resultAssetIds: [...prompt.resultAssetIds, assetId] });
    addToast("結果素材を紐付けました", "success");
    setLinkAssetPromptId(null);
  }

  function unlinkResultAsset(promptId: string, assetId: string) {
    const prompt = data.prompts.find((p) => p.promptId === promptId);
    if (!prompt) return;
    updatePrompt({ ...prompt, resultAssetIds: prompt.resultAssetIds.filter((id) => id !== assetId) });
  }

  function handleCompareClick(promptId: string) {
    if (!comparePickFirst) {
      setComparePickFirst(promptId);
      addToast("比較する2つ目のプロンプトを選んでください", "info");
    } else if (comparePickFirst === promptId) {
      setComparePickFirst(null);
    } else {
      setCompareIds([comparePickFirst, promptId]);
      setComparePickFirst(null);
    }
  }

  const comparePrompts = compareIds
    ? [data.prompts.find((p) => p.promptId === compareIds[0]), data.prompts.find((p) => p.promptId === compareIds[1])]
    : null;

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
        <div className="flex items-center gap-2">
          {comparePickFirst && (
            <button onClick={() => setComparePickFirst(null)} className="px-3 py-1.5 text-xs rounded-lg border border-amber-300 text-amber-700 bg-amber-50">
              比較選択中… (キャンセル)
            </button>
          )}
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 shrink-0">
            + プロンプト追加
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-navy-400 self-center mr-1">状態:</span>
          {(Object.keys(promptStatusLabel) as PromptStatus[]).map((s) => (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
              className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === s ? "bg-navy-600 text-white" : "bg-sand-50 text-navy-500 hover:bg-sand-100"}`}>
              {promptStatusLabel[s]}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="検索…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input w-48 text-sm ml-auto"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((p) => {
          const isExpanded = expandedId === p.promptId;
          const resultAssets = data.assets.filter((a) => p.resultAssetIds.includes(a.assetId));
          return (
            <div key={p.promptId} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${comparePickFirst === p.promptId ? "border-amber-400 ring-2 ring-amber-200" : "border-sand-200"}`}>
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

                  {/* Result assets */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-navy-400 tracking-wider">生成結果素材 ({resultAssets.length})</p>
                      <button onClick={(e) => { e.stopPropagation(); setLinkAssetPromptId(p.promptId); }} className="text-xs text-navy-500 hover:text-navy-700">+ 紐付け</button>
                    </div>
                    {resultAssets.length > 0 ? (
                      <div className="space-y-1.5">
                        {resultAssets.map((a) => (
                          <div key={a.assetId} className="flex items-center gap-2 text-sm">
                            <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                            <span className="text-navy-700 truncate flex-1">{a.title}</span>
                            {a.path && <code className="text-xs text-navy-400 truncate max-w-[150px]">{a.path}</code>}
                            <button onClick={() => unlinkResultAsset(p.promptId, a.assetId)} className="text-xs text-red-400 hover:text-red-600 shrink-0">解除</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-navy-300">なし</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-sand-100">
                    <button onClick={() => setEditPrompt(p)} className="text-xs text-navy-500 hover:text-navy-700">✏️ 編集</button>
                    <button onClick={() => duplicatePrompt(p.promptId)} className="text-xs text-navy-500 hover:text-navy-700">📋 複製</button>
                    <button onClick={() => handleCompareClick(p.promptId)} className={`text-xs hover:text-navy-700 ${comparePickFirst === p.promptId ? "text-amber-600 font-medium" : "text-navy-500"}`}>⚖️ 比較</button>
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
        <PromptForm selectedMovieId={selectedMovieId} onSave={(p) => { addPrompt(p); setShowAdd(false); addToast("プロンプトを追加しました", "success"); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editPrompt} onClose={() => setEditPrompt(null)} title="プロンプト編集" wide>
        {editPrompt && <PromptForm prompt={editPrompt} selectedMovieId={selectedMovieId} onSave={(p) => { updatePrompt(p); setEditPrompt(null); }} onCancel={() => setEditPrompt(null)} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="プロンプト削除"
        message="このプロンプトを削除しますか？"
        onConfirm={() => { if (deleteId) deletePrompt(deleteId); setDeleteId(null); addToast("プロンプトを削除しました", "info"); }}
        onCancel={() => setDeleteId(null)}
        danger
      />

      {/* Link result asset modal */}
      <Modal open={!!linkAssetPromptId} onClose={() => setLinkAssetPromptId(null)} title="生成結果素材を紐付け">
        {linkAssetPromptId && (() => {
          const prompt = data.prompts.find((p) => p.promptId === linkAssetPromptId);
          const available = data.assets.filter((a) => !prompt?.resultAssetIds.includes(a.assetId));
          return available.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-auto">
              {available.map((a) => (
                <button key={a.assetId} onClick={() => linkResultAsset(linkAssetPromptId, a.assetId)}
                  className="w-full text-left p-3 rounded-lg border border-sand-200 hover:bg-sand-50 flex items-center gap-3">
                  <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                  <span className="text-sm text-navy-700">{a.title}</span>
                  <span className="text-xs text-navy-400 ml-auto font-mono">{a.assetId}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-navy-400">紐付け可能な素材がありません</p>
          );
        })()}
      </Modal>

      {/* Comparison modal */}
      <Modal open={!!compareIds} onClose={() => setCompareIds(null)} title="プロンプト比較" wide>
        {comparePrompts && comparePrompts[0] && comparePrompts[1] && (
          <div className="grid grid-cols-2 gap-6">
            {comparePrompts.map((cp) => cp && (
              <div key={cp.promptId} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge label={promptTargetLabel[cp.target]} colorClass={promptTargetColor[cp.target]} />
                  <Badge label={promptStatusLabel[cp.status]} colorClass={promptStatusColor[cp.status]} />
                </div>
                <h4 className="font-bold text-navy-800 text-sm">{cp.title}</h4>
                <p className="text-xs text-navy-400">{cp.tool} &middot; {cp.promptId}</p>
                <div>
                  <p className="text-xs font-semibold text-navy-400 mb-1">Positive</p>
                  <pre className="text-xs text-navy-700 bg-sand-50 rounded p-3 whitespace-pre-wrap break-words font-mono select-all">{cp.prompt}</pre>
                </div>
                {cp.negativePrompt && (
                  <div>
                    <p className="text-xs font-semibold text-navy-400 mb-1">Negative</p>
                    <pre className="text-xs text-red-700 bg-red-50 rounded p-3 whitespace-pre-wrap break-words font-mono select-all">{cp.negativePrompt}</pre>
                  </div>
                )}
                {cp.notes && <p className="text-xs text-navy-500">{cp.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
