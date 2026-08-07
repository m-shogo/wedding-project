import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { runVideoPreflight, type PreflightSeverity } from "../lib/videoPreflight";

type Filter = "all" | PreflightSeverity;

const severityMeta: Record<PreflightSeverity, { label: string; icon: string; classes: string }> = {
  block: { label: "要修正", icon: "⛔", classes: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300" },
  warning: { label: "注意", icon: "⚠️", classes: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300" },
  info: { label: "次アクション", icon: "ℹ️", classes: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-300" },
};

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function VideoPreflight() {
  const { selectedMovieId, data, moviePrompts } = useProduction();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const videoPrompts = sourcePrompts.filter((prompt) => prompt.target === "video");
  const issues = useMemo(() => runVideoPreflight(data, videoPrompts), [data, videoPrompts]);
  const counts = useMemo(() => ({
    block: issues.filter((issue) => issue.severity === "block").length,
    warning: issues.filter((issue) => issue.severity === "warning").length,
    info: issues.filter((issue) => issue.severity === "info").length,
  }), [issues]);
  const filtered = filter === "all" ? issues : issues.filter((issue) => issue.severity === filter);
  const generationReady = counts.block === 0;

  const reportLines = [
    "# AI Video Preflight",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Movie: ${selectedMovieId}`,
    `Video prompts: ${videoPrompts.length}`,
    `Blocking: ${counts.block}`,
    `Warnings: ${counts.warning}`,
    `Next actions: ${counts.info}`,
    `Generation ready: ${generationReady ? "YES" : "NO"}`,
    "",
  ];
  for (const issue of issues) {
    reportLines.push(
      `## ${severityMeta[issue.severity].icon} ${issue.title}`,
      `- severity: ${issue.severity}`,
    );
    if (issue.promptId) reportLines.push(`- promptId: ${issue.promptId}`);
    reportLines.push(
      `- detail: ${issue.detail}`,
      `- action: ${issue.action}`,
      `- dashboard: ${issue.href}`,
      "",
    );
  }
  const report = reportLines.join("\n");

  async function copyReport() {
    await navigator.clipboard.writeText(report);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
    addToast("プリフライト診断をコピーしました", "success");
  }

  function exportReport() {
    downloadText("ai-video-preflight.md", report);
    addToast("プリフライト診断を書き出しました", "success");
  }

  return (
    <div>
      <Header title="AI動画 プリフライト" description="有料生成・Palmier受け渡し・採用前に、状態矛盾と事故要因をまとめて検査します" showMovieSelector />

      <div className={`rounded-xl border p-5 mb-6 ${generationReady ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"}`}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-3xl" aria-hidden>{generationReady ? "✅" : "⛔"}</div>
          <div className="min-w-0 flex-1">
            <h2 className={`font-bold ${generationReady ? "text-emerald-900 dark:text-emerald-200" : "text-red-900 dark:text-red-200"}`}>
              {generationReady ? "Blocking issue 0 — 実行可能" : `Blocking issue ${counts.block}件 — 先に修正`}
            </h2>
            <p className={`text-sm mt-1 ${generationReady ? "text-emerald-800 dark:text-emerald-300" : "text-red-800 dark:text-red-300"}`}>
              {generationReady ? "警告は確認しつつ、低コスト試作または次の工程へ進めます。" : "有料生成を増やす前に、赤い項目を0へしてください。"}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void copyReport()} className="px-3 py-2 text-xs rounded-lg border border-current/20 bg-white/50 dark:bg-navy-800/50">{copied ? "✓ コピー済み" : "診断をコピー"}</button>
            <button onClick={exportReport} className="px-3 py-2 text-xs rounded-lg border border-current/20 bg-white/50 dark:bg-navy-800/50">Markdown</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <button type="button" onClick={() => setFilter("block")} className={`rounded-xl border p-4 text-left ${filter === "block" ? "ring-2 ring-red-300" : ""} border-red-200 dark:border-red-800 bg-white dark:bg-navy-800`}>
          <p className="text-xs text-red-500">⛔ 要修正</p><p className="text-2xl font-bold text-red-700 dark:text-red-300">{counts.block}</p>
        </button>
        <button type="button" onClick={() => setFilter("warning")} className={`rounded-xl border p-4 text-left ${filter === "warning" ? "ring-2 ring-amber-300" : ""} border-amber-200 dark:border-amber-800 bg-white dark:bg-navy-800`}>
          <p className="text-xs text-amber-500">⚠️ 注意</p><p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{counts.warning}</p>
        </button>
        <button type="button" onClick={() => setFilter("info")} className={`rounded-xl border p-4 text-left ${filter === "info" ? "ring-2 ring-sky-300" : ""} border-sky-200 dark:border-sky-800 bg-white dark:bg-navy-800`}>
          <p className="text-xs text-sky-500">ℹ️ 次アクション</p><p className="text-2xl font-bold text-sky-700 dark:text-sky-300">{counts.info}</p>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} className="form-input w-auto min-w-[160px]">
          <option value="all">すべて</option><option value="block">要修正</option><option value="warning">注意</option><option value="info">次アクション</option>
        </select>
        <span className="text-xs text-navy-400">表示 {filtered.length}件 / 診断 {issues.length}件 / 動画Prompt {videoPrompts.length}件</span>
        {filter !== "all" && <button type="button" onClick={() => setFilter("all")} className="text-xs text-navy-500 hover:underline">全件へ戻す</button>}
      </div>

      {issues.length === 0 ? (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-10 text-center">
          <p className="text-2xl mb-2">✅</p><p className="font-bold text-emerald-900 dark:text-emerald-200">診断項目はありません</p><p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">動画Promptが未作成の場合も0件になります。</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">この重要度の項目はありません。</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((issue) => {
            const meta = severityMeta[issue.severity];
            return <article key={issue.id} className={`rounded-xl border p-4 ${meta.classes}`}>
              <div className="flex flex-wrap items-start gap-3">
                <div className="text-xl" aria-hidden>{meta.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{issue.title}</h3><span className="text-[10px] uppercase tracking-wider opacity-70">{meta.label}</span></div>
                  <p className="text-sm mt-1 opacity-90">{issue.detail}</p>
                  <div className="mt-3 rounded-lg bg-white/60 dark:bg-navy-800/40 p-3 text-sm"><strong>次:</strong> {issue.action}</div>
                </div>
                <Link to={issue.href} className="px-3 py-1.5 text-xs rounded-lg border border-current/20 bg-white/60 dark:bg-navy-800/40 hover:bg-white dark:hover:bg-navy-700">修正画面へ →</Link>
              </div>
            </article>;
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/video-generation-queue" className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">生成キュー</Link>
        <Link to="/palmier-handoff" className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">Palmier Handoff</Link>
        <Link to="/video-failure-lab" className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">失敗学習</Link>
      </div>
    </div>
  );
}
