import { useMemo } from "react";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { buildVideoModelEvidence } from "../lib/videoModelEvidence";

const signalMeta = {
  promote: { label: "優先候補", icon: "✅", classes: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" },
  caution: { label: "要見直し", icon: "⚠️", classes: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300" },
  neutral: { label: "差なし", icon: "↔️", classes: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-300" },
  insufficient: { label: "データ不足", icon: "🧪", classes: "border-sand-200 bg-sand-50 text-navy-600 dark:border-navy-600 dark:bg-navy-700 dark:text-navy-200" },
} as const;

export function VideoModelEvidence() {
  const { selectedMovieId, data, moviePrompts } = useProduction();
  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const evidence = useMemo(() => buildVideoModelEvidence(sourcePrompts), [sourcePrompts]);
  const reviewed = evidence.reduce((sum, item) => sum + item.reviewed, 0);
  const promoted = evidence.filter((item) => item.signal === "promote").length;
  const cautions = evidence.filter((item) => item.signal === "caution").length;

  return (
    <div>
      <Header
        title="AI動画 モデル実績"
        description="外部ランキングではなく、このプロジェクトで実際にQAした採用・不採用からモデル選定を学習します"
        showMovieSelector
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">QA済み生成</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{reviewed}</p></div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-emerald-600">優先候補</p><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{promoted}</p></div>
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-amber-600">要見直し</p><p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{cautions}</p></div>
      </div>

      <div className="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-4 mb-6 text-sm text-sky-900 dark:text-sky-200">
        <p className="font-bold mb-1">判定ルール — 少数サンプルで自動学習しすぎない</p>
        <p>同じ <strong>モデル + preset</strong> でQA済み3本以上かつ独立したretry lineageが2系統以上ある時だけ判定対象にします。採用率に加えて95% Wilson信頼区間を使い、優先候補は採用率67%以上かつ信頼区間下限40%以上、要見直しは採用率33%以下かつ上限60%以下に限定します。たとえば同じshotをretry 3回しただけでは自動昇格しません。これはprovider公式性能ではなく、このプロジェクト内の観測実績です。</p>
      </div>

      {evidence.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">まだQA済みの採用・不採用データがありません。結果レビューを使うと自動で蓄積されます。</div>
      ) : (
        <div className="space-y-3">
          {evidence.map((item) => {
            const meta = signalMeta[item.signal];
            return (
              <article key={item.key} className={`rounded-xl border p-4 ${meta.classes}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{item.tool}</h2><span className="text-xs opacity-70">preset: {item.preset}</span><span className="text-[11px] px-2 py-0.5 rounded-full bg-white/50 dark:bg-navy-800/40">{meta.icon} {meta.label}</span></div>
                    <p className="text-sm mt-1">{item.summary}</p>
                  </div>
                  <div className="text-right text-sm shrink-0"><p className="font-bold text-lg">{Math.round(item.passRate * 100)}%</p><p className="text-xs opacity-70">採用 {item.adopted} / 不採用 {item.rejected}</p><p className="text-xs opacity-70">独立系統 {item.independentRoots} · 95% {Math.round(item.confidenceLow * 100)}–{Math.round(item.confidenceHigh * 100)}%</p></div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
