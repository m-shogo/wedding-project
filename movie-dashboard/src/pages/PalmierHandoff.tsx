import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { buildPalmierAgentHandoff, routeVideoPrompt } from "../lib/videoExecutionRouter";

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

export function PalmierHandoff() {
  const { selectedMovieId, currentMovie, data, moviePrompts } = useProduction();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const videoPrompts = sourcePrompts.filter((prompt) => prompt.target === "video");
  const movieTitle = currentMovie?.title ?? (selectedMovieId === "all" ? "All Movies" : selectedMovieId);

  function sceneName(prompt: (typeof videoPrompts)[number]) {
    const names = prompt.relatedSceneIds.map((sceneId) => {
      const scene = data.scenes.find((item) => item.sceneId === sceneId);
      if (!scene) return sceneId;
      const movie = data.movies.find((item) => item.movieId === scene.movieId);
      return selectedMovieId === "all" ? `${movie?.title ?? scene.movieId} / ${scene.title}` : scene.title;
    });
    return names.join(" / ") || "未紐付け";
  }

  const handoff = useMemo(() => buildPalmierAgentHandoff({
    movieTitle,
    prompts: videoPrompts,
    assets: data.assets,
    sceneName,
  }), [movieTitle, videoPrompts, data.assets]);

  const routeCounts = useMemo(() => {
    const counts = { palmier: 0, review: 0, edit: 0, external: 0, blocked: 0 };
    for (const prompt of videoPrompts) {
      const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
      const route = routeVideoPrompt(prompt, resultAssets);
      if (route.destination === "palmier") counts.palmier += 1;
      else if (route.destination === "review") counts.review += 1;
      else if (route.destination === "edit") counts.edit += 1;
      else if (route.destination === "blocked") counts.blocked += 1;
      else counts.external += 1;
    }
    return counts;
  }, [videoPrompts, data.assets]);

  async function copyHandoff() {
    await navigator.clipboard.writeText(handoff.markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
    addToast("Palmier Agent Handoffをコピーしました", "success");
  }

  function exportMarkdown() {
    downloadText("palmier-agent-handoff.md", handoff.markdown, "text/markdown;charset=utf-8");
    addToast("Palmier Handoff Markdownを書き出しました", "success");
  }

  function exportJson() {
    downloadText("palmier-agent-handoff.json", JSON.stringify({ movieTitle, prompts: handoff.rows }, null, 2), "application/json;charset=utf-8");
    addToast("Palmier Handoff JSONを書き出しました", "success");
  }

  return (
    <div>
      <Header
        title="Palmier 実行Handoff"
        description="動画Promptと採用結果を、Palmier/Claude Codeへそのまま渡せる非破壊の実行パックにします"
        showMovieSelector
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">Palmier first/last</p>
          <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{routeCounts.palmier}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">外部生成/結果待ち</p>
          <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{routeCounts.external}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">結果レビュー</p>
          <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{routeCounts.review}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">編集へ</p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{routeCounts.edit}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">停止/見直し</p>
          <p className={`text-2xl font-bold ${routeCounts.blocked > 0 ? "text-red-700 dark:text-red-300" : "text-navy-800 dark:text-sand-100"}`}>{routeCounts.blocked}</p>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 mb-6">
        <h2 className="font-bold text-amber-900 dark:text-amber-200 mb-1">有料生成の境界</h2>
        <p className="text-sm text-amber-800 dark:text-amber-300">このhandoffは配置・placeholder・参照準備までは自動化対象にしますが、Palmierや外部モデルのgeneration credits消費は明示指示まで発火させません。</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => void copyHandoff()} disabled={videoPrompts.length === 0} className="px-4 py-2.5 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 disabled:opacity-40">
          {copied ? "✓ コピー済み" : "Claude Code / Palmier用Handoffをコピー"}
        </button>
        <button onClick={exportMarkdown} disabled={videoPrompts.length === 0} className="px-4 py-2.5 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">Markdown</button>
        <button onClick={exportJson} disabled={videoPrompts.length === 0} className="px-4 py-2.5 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">JSON</button>
      </div>

      {videoPrompts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">動画Promptがありません。動画プロンプト画面から作成してください。</div>
      ) : (
        <div className="space-y-4">
          {videoPrompts.map((prompt) => {
            const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
            const route = routeVideoPrompt(prompt, resultAssets);
            return (
              <article key={prompt.promptId} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-5">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h3>
                    <p className="text-xs text-navy-400 mt-0.5">{sceneName(prompt)} · {prompt.tool} · {prompt.status}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${route.destination === "blocked" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : route.destination === "edit" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : route.destination === "review" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" : "bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200"}`}>{route.label}</span>
                </div>
                <div className="mt-3 rounded-lg bg-sand-50 dark:bg-navy-700 p-3">
                  <p className="text-xs text-navy-500 dark:text-navy-300"><strong>理由:</strong> {route.reason}</p>
                  <p className="text-sm text-navy-700 dark:text-navy-200 mt-1"><strong>次:</strong> {route.action}</p>
                </div>
                {resultAssets.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {resultAssets.map((asset) => <span key={asset.assetId} className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 text-xs text-emerald-700 dark:text-emerald-300">{asset.title}{asset.path ? ` · ${asset.path}` : " · path missing"}</span>)}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
