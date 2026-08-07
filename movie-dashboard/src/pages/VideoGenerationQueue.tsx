import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { generateId } from "../lib/ids";
import type { Prompt, PromptStatus } from "../types/movie";

const statusLabels: Record<PromptStatus, string> = { draft: "下書き", testing: "テスト中", adopted: "採用", rejected: "不採用" };
const statusClasses: Record<PromptStatus, string> = {
  draft: "bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200",
  testing: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  adopted: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

type QueueFilter = "pending" | "all" | PromptStatus;

function parseNoteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function VideoGenerationQueue() {
  const {
    selectedMovieId,
    data,
    moviePrompts,
    addAsset,
    linkAssetToScene,
    updatePrompt,
  } = useProduction();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<QueueFilter>("pending");
  const [copiedId, setCopiedId] = useState("");
  const [resultPromptId, setResultPromptId] = useState("");
  const [resultTitle, setResultTitle] = useState("");
  const [resultPath, setResultPath] = useState("");
  const [resultNote, setResultNote] = useState("");

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const videoPrompts = sourcePrompts.filter((prompt) => prompt.target === "video");
  const filteredPrompts = videoPrompts.filter((prompt) => {
    if (filter === "all") return true;
    if (filter === "pending") return prompt.status === "draft" || prompt.status === "testing";
    return prompt.status === filter;
  });

  const groups = useMemo(() => {
    const byTool = new Map<string, Prompt[]>();
    for (const prompt of filteredPrompts) {
      const tool = prompt.tool || "未指定";
      const items = byTool.get(tool) ?? [];
      items.push(prompt);
      byTool.set(tool, items);
    }
    return Array.from(byTool.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredPrompts]);

  const pendingCount = videoPrompts.filter((prompt) => prompt.status === "draft" || prompt.status === "testing").length;
  const unlinkedCount = videoPrompts.filter((prompt) => prompt.relatedSceneIds.length === 0).length;
  const withResultCount = videoPrompts.filter((prompt) => prompt.resultAssetIds.length > 0).length;
  const resultPrompt = data.prompts.find((prompt) => prompt.promptId === resultPromptId);

  function sceneText(prompt: Prompt) {
    const names = prompt.relatedSceneIds.map((sceneId) => {
      const scene = data.scenes.find((item) => item.sceneId === sceneId);
      if (!scene) return sceneId;
      const movie = data.movies.find((item) => item.movieId === scene.movieId);
      return selectedMovieId === "all" ? `${movie?.title ?? scene.movieId} / ${scene.title}` : scene.title;
    });
    return names.join(" / ") || "未紐付け";
  }

  function packet(prompt: Prompt) {
    const preset = parseNoteValue(prompt.notes, "preset");
    const finishCandidate = parseNoteValue(prompt.notes, "finish-candidate");
    return [
      `[MODEL] ${prompt.tool || "未指定"}`,
      `[SHOT] ${prompt.title}`,
      `[SCENE] ${sceneText(prompt)}`,
      preset ? `[PRESET] ${preset}` : "",
      finishCandidate ? `[FINISH CANDIDATE] ${finishCandidate}` : "",
      "", "[PROMPT]", prompt.prompt, "",
      prompt.negativePrompt ? `[AVOID]\n${prompt.negativePrompt}` : "",
      "", prompt.notes ? `[NOTES]\n${prompt.notes}` : "",
    ].filter(Boolean).join("\n");
  }

  async function copyPrompt(prompt: Prompt, moveToTesting: boolean) {
    await navigator.clipboard.writeText(packet(prompt));
    setCopiedId(prompt.promptId);
    window.setTimeout(() => setCopiedId(""), 1500);
    if (moveToTesting && prompt.status === "draft") {
      updatePrompt({ ...prompt, status: "testing" });
      addToast("生成パックをコピーしてテスト中へ移動しました", "success");
    } else addToast("生成パックをコピーしました", "success");
  }

  async function copyGroup(tool: string, prompts: Prompt[]) {
    await navigator.clipboard.writeText(prompts.map(packet).join("\n\n---\n\n"));
    setCopiedId(`group:${tool}`);
    window.setTimeout(() => setCopiedId(""), 1500);
    addToast(`${tool} の生成パックをまとめてコピーしました`, "success");
  }

  function openResultIntake(prompt: Prompt) {
    setResultPromptId(prompt.promptId);
    setResultTitle(`${prompt.title} / generated result`);
    setResultPath("");
    setResultNote("");
  }

  function closeResultIntake() {
    setResultPromptId("");
    setResultTitle("");
    setResultPath("");
    setResultNote("");
  }

  function saveResultAsset() {
    const prompt = data.prompts.find((item) => item.promptId === resultPromptId);
    const path = resultPath.trim();
    const title = resultTitle.trim();
    if (!prompt) { addToast("元Promptが見つかりません", "error"); return; }
    if (!title || !path) { addToast("結果タイトルと保存パスを入力してください", "error"); return; }

    const assetId = generateId("asset");
    addAsset({
      assetId,
      type: "ai_video",
      title,
      path,
      relatedSceneIds: [],
      relatedMovieIds: prompt.relatedMovieIds,
      status: "ready",
      source: prompt.tool,
      usage: `Generated result for ${prompt.promptId}`,
      notes: [
        `promptId=${prompt.promptId}`,
        `registeredAt=${new Date().toISOString()}`,
        resultNote.trim(),
      ].filter(Boolean).join("\n"),
    });

    for (const sceneId of prompt.relatedSceneIds) linkAssetToScene(assetId, sceneId);
    updatePrompt({
      ...prompt,
      status: prompt.status === "draft" ? "testing" : prompt.status,
      resultAssetIds: prompt.resultAssetIds.includes(assetId) ? prompt.resultAssetIds : [...prompt.resultAssetIds, assetId],
    });
    closeResultIntake();
    addToast("結果Assetを作成し、Promptとシーンへ紐付けました", "success");
  }

  function exportMarkdown() {
    const body = groups.map(([tool, prompts]) => [`## ${tool}`, "", ...prompts.map((prompt) => `### ${prompt.title}\n\n\`\`\`text\n${packet(prompt)}\n\`\`\``)].join("\n\n")).join("\n\n");
    downloadText("video-generation-queue.md", `# Video Generation Queue\n\nExported: ${new Date().toISOString()}\nMovie: ${selectedMovieId}\nCount: ${filteredPrompts.length}\n\n${body}\n`, "text/markdown;charset=utf-8");
    addToast("Markdownを書き出しました", "success");
  }

  function exportJson() {
    const payload = { exportedAt: new Date().toISOString(), selectedMovieId, count: filteredPrompts.length, prompts: filteredPrompts.map((prompt) => ({ promptId: prompt.promptId, title: prompt.title, tool: prompt.tool, status: prompt.status, sceneIds: prompt.relatedSceneIds, scene: sceneText(prompt), prompt: prompt.prompt, negativePrompt: prompt.negativePrompt, notes: prompt.notes, resultAssetIds: prompt.resultAssetIds })) };
    downloadText("video-generation-queue.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    addToast("JSONを書き出しました", "success");
  }

  return <div>
    <Header title="動画生成キュー" description="生成待ちプロンプトをモデル別にまとめ、生成後の結果登録まで一画面で進めます" showMovieSelector />

    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">生成待ち / テスト中</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{pendingCount}</p></div>
      <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">結果素材あり</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{withResultCount}</p></div>
      <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">シーン未紐付け</p><p className={`text-2xl font-bold ${unlinkedCount > 0 ? "text-amber-700 dark:text-amber-300" : "text-navy-800 dark:text-sand-100"}`}>{unlinkedCount}</p></div>
    </div>

    <div className="flex flex-wrap items-center gap-3 mb-6">
      <select value={filter} onChange={(e) => setFilter(e.target.value as QueueFilter)} className="form-input w-auto min-w-[160px]"><option value="pending">生成待ち + テスト中</option><option value="draft">下書き</option><option value="testing">テスト中</option><option value="adopted">採用</option><option value="rejected">不採用</option><option value="all">すべて</option></select>
      <span className="text-xs text-navy-400">表示 {filteredPrompts.length}件 / 動画Prompt {videoPrompts.length}件</span>
      <div className="ml-auto flex flex-wrap gap-2"><button onClick={exportMarkdown} disabled={filteredPrompts.length === 0} className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">Markdown</button><button onClick={exportJson} disabled={filteredPrompts.length === 0} className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">JSON</button><Link to="/video-prompt-builder" className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">+ 動画プロンプト作成</Link></div>
    </div>

    {groups.length === 0 ? <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">この条件の動画プロンプトはありません。</div> : <div className="space-y-7">{groups.map(([tool, prompts]) => <section key={tool} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-sand-100 dark:border-navy-600 flex flex-wrap items-center gap-3"><div><p className="text-xs text-navy-400">MODEL / TOOL</p><h2 className="font-bold text-navy-800 dark:text-sand-100">{tool}</h2></div><span className="text-xs text-navy-400">{prompts.length} shots</span><button onClick={() => void copyGroup(tool, prompts)} className="ml-auto px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700">{copiedId === `group:${tool}` ? "✓ コピー済み" : "このモデル分をまとめてコピー"}</button></div>
      <div className="divide-y divide-sand-100 dark:divide-navy-600">{prompts.map((prompt) => {
        const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
        const preset = parseNoteValue(prompt.notes, "preset"); const finishCandidate = parseNoteValue(prompt.notes, "finish-candidate");
        return <article key={prompt.promptId} className="p-5"><div className="flex flex-wrap items-start gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 mb-1"><h3 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h3><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusClasses[prompt.status]}`}>{statusLabels[prompt.status]}</span>{preset && <span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-500 dark:text-navy-300">{preset}</span>}</div><p className="text-xs text-navy-400">シーン: {sceneText(prompt)}</p>{finishCandidate && <p className="text-xs text-navy-400 mt-0.5">仕上げ候補: {finishCandidate}</p>}</div><div className="flex flex-wrap gap-2"><button onClick={() => void copyPrompt(prompt, false)} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700">{copiedId === prompt.promptId ? "✓ コピー済み" : "コピー"}</button>{prompt.status === "draft" && <button onClick={() => void copyPrompt(prompt, true)} className="px-3 py-1.5 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">コピー + テスト中</button>}<button onClick={() => openResultIntake(prompt)} className="px-3 py-1.5 text-xs rounded-lg bg-emerald-700 text-white hover:bg-emerald-800">+ 結果を登録</button></div></div>
          <details className="mt-4"><summary className="cursor-pointer text-xs font-medium text-navy-500 dark:text-navy-300">プロンプトを確認</summary><div className="mt-3 space-y-3"><pre className="text-xs text-navy-700 dark:text-navy-200 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.prompt}</pre>{prompt.negativePrompt && <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.negativePrompt}</pre>}</div></details>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs"><span className="text-navy-400">結果素材:</span>{resultAssets.length === 0 ? <span className="text-amber-600 dark:text-amber-300">未登録</span> : resultAssets.map((asset) => <span key={asset.assetId} className="px-2 py-1 rounded bg-sand-50 dark:bg-navy-700 text-navy-600 dark:text-navy-200">{asset.title} · {asset.status}</span>)}{resultAssets.length > 0 && <Link to="/video-result-review" className="ml-auto font-medium text-emerald-700 dark:text-emerald-300 hover:underline">結果レビューへ →</Link>}</div>
        </article>;
      })}</div>
    </section>)}</div>}

    <Modal open={!!resultPromptId} onClose={closeResultIntake} title="生成結果を登録" wide>
      {resultPrompt && <div className="space-y-4">
        <div className="rounded-lg bg-sand-50 dark:bg-navy-700 p-3 text-sm"><p className="font-medium text-navy-800 dark:text-sand-100">{resultPrompt.title}</p><p className="text-xs text-navy-400 mt-1">{resultPrompt.tool} · {sceneText(resultPrompt)}</p></div>
        <div><label className="form-label">結果タイトル</label><input value={resultTitle} onChange={(e) => setResultTitle(e.target.value)} className="form-input" placeholder="例: 雲海 Seedance Mini v01" /></div>
        <div><label className="form-label">保存パス</label><input value={resultPath} onChange={(e) => setResultPath(e.target.value)} className="form-input font-mono" placeholder="例: /04_ai-video-assets/ai-videos/cloud-sea-v01.mp4" /><p className="text-xs text-navy-400 mt-1">動画本体はGitへ入れず、ローカル/Drive等の保存パスだけ登録します。</p></div>
        <div><label className="form-label">生成メモ（任意）</label><textarea value={resultNote} onChange={(e) => setResultNote(e.target.value)} className="form-input" rows={3} placeholder="seed / variant / provider側設定 / 気づいた点など" /></div>
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3 text-xs text-emerald-800 dark:text-emerald-300">保存すると `ai_video / ready` Assetを作り、元Promptと全sceneへ接続します。draftならtestingへ進め、結果レビュー待ちに載せられる状態にします。</div>
        <div className="flex justify-end gap-3"><button type="button" onClick={closeResultIntake} className="px-4 py-2 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">キャンセル</button><button type="button" onClick={saveResultAsset} className="px-4 py-2 text-sm rounded-lg bg-emerald-700 text-white hover:bg-emerald-800">Asset作成 + Prompt/シーンへ紐付け</button></div>
      </div>}
    </Modal>
  </div>;
}
