import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { LocalVideoProbePicker } from "../components/LocalVideoProbePicker";
import { Modal } from "../components/Modal";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { generateId } from "../lib/ids";
import { runVideoPreflight, type VideoPreflightIssue } from "../lib/videoPreflight";
import { suggestVideoResultNaming } from "../lib/videoResultNaming";
import { formatVideoResultReproMetadata } from "../lib/videoResultMetadata";
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

function isExecutionHold(issue: VideoPreflightIssue) {
  return issue.severity === "block" || issue.id.endsWith(":routing-stale");
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
  const [resultGenerationId, setResultGenerationId] = useState("");
  const [resultSeed, setResultSeed] = useState("");
  const [resultActualDuration, setResultActualDuration] = useState("");
  const [resultResolution, setResultResolution] = useState("");
  const [resultFps, setResultFps] = useState("");

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const videoPrompts = sourcePrompts.filter((prompt) => prompt.target === "video");
  const preflightIssues = useMemo(() => runVideoPreflight(data, videoPrompts), [data, videoPrompts]);
  const issuesByPrompt = useMemo(() => {
    const map = new Map<string, VideoPreflightIssue[]>();
    for (const issue of preflightIssues) {
      if (!issue.promptId) continue;
      const items = map.get(issue.promptId) ?? [];
      items.push(issue);
      map.set(issue.promptId, items);
    }
    return map;
  }, [preflightIssues]);

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

  function executionHoldIssues(prompt: Prompt) {
    return (issuesByPrompt.get(prompt.promptId) ?? []).filter(isExecutionHold);
  }

  const pendingCount = videoPrompts.filter((prompt) => prompt.status === "draft" || prompt.status === "testing").length;
  const unlinkedCount = videoPrompts.filter((prompt) => prompt.relatedSceneIds.length === 0).length;
  const withResultCount = videoPrompts.filter((prompt) => prompt.resultAssetIds.length > 0).length;
  const executionHoldCount = videoPrompts.filter((prompt) => prompt.status === "draft" && executionHoldIssues(prompt).length > 0).length;
  const resultPrompt = data.prompts.find((prompt) => prompt.promptId === resultPromptId);
  const resultNaming = resultPrompt ? suggestVideoResultNaming(resultPrompt, data.assets) : undefined;

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
    const holds = executionHoldIssues(prompt);
    if (moveToTesting && holds.length > 0) {
      addToast(`実行保留 ${holds.length}件があります。プリフライトを直してからテスト中へ進めてください`, "error");
      return;
    }
    await navigator.clipboard.writeText(packet(prompt));
    setCopiedId(prompt.promptId);
    window.setTimeout(() => setCopiedId(""), 1500);
    if (moveToTesting && prompt.status === "draft") {
      updatePrompt({ ...prompt, status: "testing" });
      addToast("生成パックをコピーしてテスト中へ移動しました", "success");
    } else addToast("生成パックをコピーしました", "success");
  }

  async function copyGroup(tool: string, prompts: Prompt[]) {
    const runnable = prompts.filter((prompt) => executionHoldIssues(prompt).length === 0);
    const skipped = prompts.length - runnable.length;
    if (runnable.length === 0) {
      addToast(`${tool} は全件実行保留です。プリフライトを先に修正してください`, "error");
      return;
    }
    await navigator.clipboard.writeText(runnable.map(packet).join("\n\n---\n\n"));
    setCopiedId(`group:${tool}`);
    window.setTimeout(() => setCopiedId(""), 1500);
    addToast(skipped > 0 ? `${tool}: 実行可能${runnable.length}件をコピー、保留${skipped}件は除外しました` : `${tool} の生成パックをまとめてコピーしました`, "success");
  }

  function resetResultMetadata() {
    setResultGenerationId("");
    setResultSeed("");
    setResultActualDuration("");
    setResultResolution("");
    setResultFps("");
  }

  function openResultIntake(prompt: Prompt) {
    const naming = suggestVideoResultNaming(prompt, data.assets);
    setResultPromptId(prompt.promptId);
    setResultTitle(naming.title);
    setResultPath("");
    setResultNote("");
    resetResultMetadata();
  }

  function closeResultIntake() {
    setResultPromptId("");
    setResultTitle("");
    setResultPath("");
    setResultNote("");
    resetResultMetadata();
  }

  function saveResultAsset() {
    const prompt = data.prompts.find((item) => item.promptId === resultPromptId);
    const path = resultPath.trim();
    const title = resultTitle.trim();
    if (!prompt) { addToast("元Promptが見つかりません", "error"); return; }
    if (!title || !path) { addToast("結果タイトルと実際の保存パスを入力してください", "error"); return; }

    const naming = suggestVideoResultNaming(prompt, data.assets);
    const reproLines = formatVideoResultReproMetadata({
      generationId: resultGenerationId,
      seed: resultSeed,
      actualDurationSec: resultActualDuration ? Number(resultActualDuration) || undefined : undefined,
      resolution: resultResolution,
      fps: resultFps ? Number(resultFps) || undefined : undefined,
    });
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
        `variant=${naming.variant}`,
        `result-intake=movie-dashboard`,
        ...reproLines,
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
    <Header title="動画生成キュー" description="生成待ちプロンプトをモデル別にまとめ、プリフライトを通ったものだけ実行へ進めます" showMovieSelector />

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">生成待ち / テスト中</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{pendingCount}</p></div>
      <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">結果素材あり</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{withResultCount}</p></div>
      <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">シーン未紐付け</p><p className={`text-2xl font-bold ${unlinkedCount > 0 ? "text-amber-700 dark:text-amber-300" : "text-navy-800 dark:text-sand-100"}`}>{unlinkedCount}</p></div>
      <div className={`rounded-xl border p-4 ${executionHoldCount > 0 ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" : "border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800"}`}><p className={executionHoldCount > 0 ? "text-xs text-red-500" : "text-xs text-navy-400"}>実行保留</p><p className={`text-2xl font-bold ${executionHoldCount > 0 ? "text-red-700 dark:text-red-300" : "text-navy-800 dark:text-sand-100"}`}>{executionHoldCount}</p></div>
    </div>

    <div className="flex flex-wrap items-center gap-3 mb-6">
      <select value={filter} onChange={(e) => setFilter(e.target.value as QueueFilter)} className="form-input w-auto min-w-[160px]"><option value="pending">生成待ち + テスト中</option><option value="draft">下書き</option><option value="testing">テスト中</option><option value="adopted">採用</option><option value="rejected">不採用</option><option value="all">すべて</option></select>
      <span className="text-xs text-navy-400">表示 {filteredPrompts.length}件 / 動画Prompt {videoPrompts.length}件</span>
      <Link to="/video-preflight" className={`px-3 py-2 text-xs rounded-lg border ${executionHoldCount > 0 ? "border-red-200 text-red-700 dark:border-red-800 dark:text-red-300" : "border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200"}`}>プリフライト {executionHoldCount > 0 ? `(${executionHoldCount}保留)` : "✓"}</Link>
      <div className="ml-auto flex flex-wrap gap-2"><button onClick={exportMarkdown} disabled={filteredPrompts.length === 0} className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">Markdown</button><button onClick={exportJson} disabled={filteredPrompts.length === 0} className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">JSON</button><Link to="/video-prompt-builder" className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">+ 動画プロンプト作成</Link></div>
    </div>

    {groups.length === 0 ? <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">この条件の動画プロンプトはありません。</div> : <div className="space-y-7">{groups.map(([tool, prompts]) => {
      const runnableCount = prompts.filter((prompt) => executionHoldIssues(prompt).length === 0).length;
      return <section key={tool} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-sand-100 dark:border-navy-600 flex flex-wrap items-center gap-3"><div><p className="text-xs text-navy-400">MODEL / TOOL</p><h2 className="font-bold text-navy-800 dark:text-sand-100">{tool}</h2></div><span className="text-xs text-navy-400">{prompts.length} shots · 実行可能 {runnableCount}</span><button onClick={() => void copyGroup(tool, prompts)} disabled={runnableCount === 0} className="ml-auto px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700 disabled:opacity-40">{copiedId === `group:${tool}` ? "✓ コピー済み" : runnableCount === prompts.length ? "このモデル分をまとめてコピー" : `実行可能${runnableCount}件をコピー`}</button></div>
        <div className="divide-y divide-sand-100 dark:divide-navy-600">{prompts.map((prompt) => {
          const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
          const preset = parseNoteValue(prompt.notes, "preset"); const finishCandidate = parseNoteValue(prompt.notes, "finish-candidate");
          const promptIssues = issuesByPrompt.get(prompt.promptId) ?? [];
          const holds = promptIssues.filter(isExecutionHold);
          const blocking = holds.filter((issue) => issue.severity === "block");
          return <article key={prompt.promptId} className="p-5"><div className="flex flex-wrap items-start gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 mb-1"><h3 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h3><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusClasses[prompt.status]}`}>{statusLabels[prompt.status]}</span>{preset && <span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-500 dark:text-navy-300">{preset}</span>}{holds.length > 0 && <span className={`px-2 py-0.5 rounded-full text-[11px] ${blocking.length > 0 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}`}>実行保留 {holds.length}</span>}</div><p className="text-xs text-navy-400">シーン: {sceneText(prompt)}</p>{finishCandidate && <p className="text-xs text-navy-400 mt-0.5">仕上げ候補: {finishCandidate}</p>}</div><div className="flex flex-wrap gap-2"><button onClick={() => void copyPrompt(prompt, false)} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700">{copiedId === prompt.promptId ? "✓ コピー済み" : "確認用コピー"}</button>{prompt.status === "draft" && <button onClick={() => void copyPrompt(prompt, true)} disabled={holds.length > 0} className="px-3 py-1.5 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed">コピー + テスト中</button>}<button onClick={() => openResultIntake(prompt)} className="px-3 py-1.5 text-xs rounded-lg bg-emerald-700 text-white hover:bg-emerald-800">+ 結果を登録</button></div></div>
          {holds.length > 0 && <div className={`mt-4 rounded-lg border p-3 ${blocking.length > 0 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20" : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"}`}><div className="flex flex-wrap items-start gap-3"><div className="min-w-0 flex-1"><p className={`text-xs font-bold ${blocking.length > 0 ? "text-red-800 dark:text-red-300" : "text-amber-800 dark:text-amber-300"}`}>実行前に確認</p><ul className={`mt-1 space-y-1 text-xs ${blocking.length > 0 ? "text-red-700 dark:text-red-300" : "text-amber-700 dark:text-amber-300"}`}>{holds.slice(0, 3).map((issue) => <li key={issue.id}>• {issue.title} — {issue.action}</li>)}</ul></div><Link to="/video-preflight" className="text-xs font-medium underline">プリフライトへ →</Link></div></div>}
          <details className="mt-4"><summary className="cursor-pointer text-xs font-medium text-navy-500 dark:text-navy-300">プロンプトを確認</summary><div className="mt-3 space-y-3"><pre className="text-xs text-navy-700 dark:text-navy-200 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.prompt}</pre>{prompt.negativePrompt && <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.negativePrompt}</pre>}</div></details>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs"><span className="text-navy-400">結果素材:</span>{resultAssets.length === 0 ? <span className="text-amber-600 dark:text-amber-300">未登録</span> : resultAssets.map((asset) => <span key={asset.assetId} className="px-2 py-1 rounded bg-sand-50 dark:bg-navy-700 text-navy-600 dark:text-navy-200">{asset.title} · {asset.status}</span>)}{resultAssets.length > 0 && <Link to="/video-result-review" className="ml-auto font-medium text-emerald-700 dark:text-emerald-300 hover:underline">結果レビューへ →</Link>}</div>
        </article>;
        })}</div>
      </section>;
    })}</div>}

    <Modal open={!!resultPromptId} onClose={closeResultIntake} title="生成結果を登録" wide>
      {resultPrompt && <div className="space-y-4">
        <div className="rounded-lg bg-sand-50 dark:bg-navy-700 p-3 text-sm"><p className="font-medium text-navy-800 dark:text-sand-100">{resultPrompt.title}</p><p className="text-xs text-navy-400 mt-1">{resultPrompt.tool} · {sceneText(resultPrompt)}</p></div>
        <div><label className="form-label">結果タイトル</label><input value={resultTitle} onChange={(e) => setResultTitle(e.target.value)} className="form-input" placeholder="例: 雲海 Seedance Mini v01" /></div>
        {resultNaming && <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-3"><div className="flex flex-wrap items-center gap-2"><div className="min-w-0 flex-1"><p className="text-xs font-bold text-sky-800 dark:text-sky-300">保存名候補 {resultNaming.variant}</p><code className="block mt-1 text-xs text-sky-700 dark:text-sky-200 break-all">{resultNaming.suggestedPath}</code></div><button type="button" onClick={() => setResultPath(resultNaming.suggestedPath)} className="px-3 py-1.5 text-xs rounded-lg bg-white/70 dark:bg-navy-800/60 border border-sky-200 dark:border-sky-700 text-sky-800 dark:text-sky-200">候補を入力欄へ</button></div><p className="mt-2 text-[11px] text-sky-700 dark:text-sky-300">scene / preset / model / 既存variant数から作った命名候補です。実ファイルの存在は確認していないため、自動保存はしません。</p></div>}
        <div><label className="form-label">実際の保存パス</label><input value={resultPath} onChange={(e) => setResultPath(e.target.value)} className="form-input font-mono" placeholder="実際に保存した動画ファイルのパスを入力" /><p className="text-xs text-navy-400 mt-1">動画本体はGitへ入れず、ローカル/Drive等の実際の保存パスだけ登録します。上の候補を使う場合もファイル配置と一致しているか確認してください。</p></div>
        <LocalVideoProbePicker onMetadata={({ durationSec, resolution }) => { if (durationSec !== undefined) setResultActualDuration(String(durationSec)); if (resolution) setResultResolution(resolution); }} />
        <details className="rounded-lg border border-sand-200 dark:border-navy-600 p-3"><summary className="cursor-pointer text-sm font-medium text-navy-700 dark:text-navy-200">再現用メタデータ（任意）</summary><div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="form-label">Provider generation ID</label><input value={resultGenerationId} onChange={(e) => setResultGenerationId(e.target.value)} className="form-input font-mono" placeholder="生成サービスのjob / generation ID" /></div><div><label className="form-label">Seed</label><input value={resultSeed} onChange={(e) => setResultSeed(e.target.value)} className="form-input font-mono" placeholder="取得できる場合のみ" /></div><div><label className="form-label">実際の尺（秒）</label><input type="number" min="0" step="0.1" value={resultActualDuration} onChange={(e) => setResultActualDuration(e.target.value)} className="form-input" placeholder="例: 5.0" /></div><div><label className="form-label">解像度</label><input value={resultResolution} onChange={(e) => setResultResolution(e.target.value)} className="form-input font-mono" placeholder="例: 1920x1080" /></div><div><label className="form-label">FPS</label><input type="number" min="0" step="1" value={resultFps} onChange={(e) => setResultFps(e.target.value)} className="form-input" placeholder="例: 24" /></div></div><p className="mt-3 text-xs text-navy-400">分かる項目だけでOKです。生成サービスから取得できない値を推測して埋めません。</p></details>
        <div><label className="form-label">生成メモ（任意）</label><textarea value={resultNote} onChange={(e) => setResultNote(e.target.value)} className="form-input" rows={3} placeholder="motion strength / referenceの使い方 / 気づいた点など" /></div>
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3 text-xs text-emerald-800 dark:text-emerald-300">保存すると `ai_video / ready` Assetを作り、元Promptと全sceneへ接続します。draftならtestingへ進め、結果レビュー待ちに載せられる状態にします。</div>
        <div className="flex justify-end gap-3"><button type="button" onClick={closeResultIntake} className="px-4 py-2 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">キャンセル</button><button type="button" onClick={saveResultAsset} className="px-4 py-2 text-sm rounded-lg bg-emerald-700 text-white hover:bg-emerald-800">Asset作成 + Prompt/シーンへ紐付け</button></div>
      </div>}
    </Modal>
  </div>;
}