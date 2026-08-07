import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import {
  failureCategoryForPrompt,
  failureLearningKey,
  latestRejectedReason,
  retryAttempt,
  VIDEO_FAILURE_CATEGORIES,
} from "../lib/videoFailureTaxonomy";

export function VideoFailureLab() {
  const { selectedMovieId, data, moviePrompts } = useProduction();
  const { addToast } = useToast();
  const [copied, setCopied] = useState("");

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const rejected = useMemo(() => sourcePrompts
    .filter((prompt) => prompt.target === "video" && prompt.status === "rejected")
    .map((prompt) => {
      const reason = latestRejectedReason(prompt.notes);
      const category = failureCategoryForPrompt(prompt);
      return {
        prompt,
        reason,
        category,
        key: failureLearningKey(prompt, category.id),
        retry: retryAttempt(prompt),
      };
    }), [sourcePrompts]);

  const categoryCounts = useMemo(() => VIDEO_FAILURE_CATEGORIES
    .map((category) => ({
      category,
      count: rejected.filter((item) => item.category.id === category.id).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count), [rejected]);

  const repeatedKeys = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of rejected) counts.set(item.key, (counts.get(item.key) ?? 0) + 1);
    return counts;
  }, [rejected]);

  const repeatedCount = Array.from(repeatedKeys.values()).filter((count) => count >= 2).length;
  const stoppedCount = rejected.filter((item) => item.retry >= 3).length;
  const topCategory = categoryCounts[0];

  async function copyCorrection(promptId: string, correction: string) {
    await navigator.clipboard.writeText(correction);
    setCopied(promptId);
    window.setTimeout(() => setCopied(""), 1500);
    addToast("次回用の肯定文補正をコピーしました", "success");
  }

  return (
    <div>
      <Header
        title="AI動画 失敗学習"
        description="レビューで記録した失敗カテゴリを優先し、古い自由記述ログだけキーワード推定して次アクションへ変換します"
        showMovieSelector
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">不採用ログ</p>
          <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{rejected.length}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">最多失敗カテゴリ</p>
          <p className="text-sm mt-1 font-bold text-navy-800 dark:text-sand-100">{topCategory ? `${topCategory.category.icon} ${topCategory.category.label} ×${topCategory.count}` : "—"}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">同モデル+プリセットで再発</p>
          <p className={`text-2xl font-bold ${repeatedCount > 0 ? "text-amber-700 dark:text-amber-300" : "text-navy-800 dark:text-sand-100"}`}>{repeatedCount}</p>
        </div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
          <p className="text-xs text-navy-400">retry上限到達</p>
          <p className={`text-2xl font-bold ${stoppedCount > 0 ? "text-red-700 dark:text-red-300" : "text-navy-800 dark:text-sand-100"}`}>{stoppedCount}</p>
        </div>
      </div>

      {categoryCounts.length > 0 && (
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-5 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h2 className="font-bold text-navy-800 dark:text-sand-100">失敗カテゴリ分布</h2>
            <span className="text-xs text-navy-400">多い順。Promptの文章量ではなく原因側を直すための集計です。</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryCounts.map(({ category, count }) => (
              <span key={category.id} className="px-3 py-2 rounded-lg bg-sand-50 dark:bg-navy-700 text-sm text-navy-700 dark:text-navy-200">
                {category.icon} {category.label} <strong>×{count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-4 text-sm text-sky-900 dark:text-sky-200">
        <p className="font-bold mb-1">学習ルール</p>
        <p>同じ「モデル + プリセット + 失敗カテゴリ」が2回以上なら、3回目はPrompt追記より <strong>静止画 / 参照 / カメラ / モデル</strong> のどれかを変える。retry 3/3では同系統生成を止める。</p>
      </div>

      {rejected.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">
          まだ不採用ログがありません。結果レビューでカテゴリを選ぶと、ここへ自動で蓄積されます。
        </div>
      ) : (
        <div className="space-y-4">
          {rejected.map(({ prompt, reason, category, key, retry }) => {
            const recurrence = repeatedKeys.get(key) ?? 1;
            const preset = prompt.notes.match(/preset=([^\s/]+)/)?.[1] ?? "—";
            return (
              <article key={prompt.promptId} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-5">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-200">{prompt.tool}</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">{category.icon} {category.label}</span>
                      {retry > 0 && <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">retry {retry}/3</span>}
                      {recurrence >= 2 && <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">同条件で{recurrence}回再発</span>}
                    </div>
                    <p className="text-xs text-navy-400">preset: {preset}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void copyCorrection(prompt.promptId, category.correction)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700"
                  >
                    {copied === prompt.promptId ? "✓ コピー済み" : "肯定文の補正をコピー"}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3">
                    <p className="text-[11px] font-bold text-red-600 dark:text-red-300 mb-1">VERIFIED FAILURE</p>
                    <p className="text-sm text-red-800 dark:text-red-200">{reason || category.label}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3">
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">NEXT CHANGE</p>
                    <p className="text-sm text-emerald-900 dark:text-emerald-200">{category.nextAction}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-sand-50 dark:bg-navy-700 p-3">
                  <p className="text-[11px] font-bold text-navy-400 mb-1">POSITIVE CORRECTION</p>
                  <code className="text-xs text-navy-700 dark:text-navy-200 whitespace-pre-wrap">{category.correction}</code>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/video-result-review" className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">結果レビューへ</Link>
        <Link to="/video-generation-queue" className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">生成キューへ</Link>
        <Link to="/video-prompt-builder" className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">Promptを作り直す</Link>
      </div>
    </div>
  );
}
