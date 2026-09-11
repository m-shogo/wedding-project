import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  getPatternImplementation,
  getPatternPreview,
  searchMotionPatterns,
  type MotionPatternCategory,
} from "../data/visualMotionLibrary";

const categoryLabels: Record<MotionPatternCategory, string> = {
  TYPOGRAPHY: "文字",
  PHOTO: "写真",
  CAMERA: "カメラ",
  LAYOUT: "レイアウト",
  TRANSITION: "切替",
  RHYTHM: "リズム",
  GRAPHIC: "グラフィック",
  EDITORIAL: "雑誌風",
  TRAVEL: "旅行",
  EMOTIONAL: "感情",
};

export function VisualMotionLibraryList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"ALL" | MotionPatternCategory>("ALL");
  const [openingOnly, setOpeningOnly] = useState(true);

  const all = useMemo(() => searchMotionPatterns(""), []);
  const patterns = useMemo(() => {
    return searchMotionPatterns(query).filter((pattern) => {
      if (category !== "ALL" && !pattern.categories.includes(category)) return false;
      if (openingOnly && pattern.openingFit !== "◎" && pattern.openingFit !== "○") return false;
      return true;
    });
  }, [query, category, openingOnly]);

  const categories = useMemo(() => {
    const values = new Set<MotionPatternCategory>();
    all.forEach((pattern) => pattern.categories.forEach((value) => values.add(value)));
    return Array.from(values);
  }, [all]);

  return (
    <div>
      <Header
        title="モーション図鑑"
        description="まず一覧で見て選ぶ。名前が分からなくても、見た目から演出を探せます。"
      />

      <section className="sticky top-0 z-20 -mx-4 mb-5 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:rounded-sm md:border">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例: 写真 ズーム / 文字 シュッ / 旅行 地図"
            className="min-w-0 flex-1 border border-sand-300 bg-white px-3 py-2.5 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
          />
          <Link
            to="/movie-coach/motion-library/advanced"
            className="shrink-0 border border-sand-300 px-3 py-2.5 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:text-navy-200"
          >
            詳細版
          </Link>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setOpeningOnly((value) => !value)}
            className={`shrink-0 border px-3 py-2 text-xs font-semibold ${openingOnly ? "border-emerald-600 bg-emerald-600 text-white" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"}`}
          >
            結婚式OP向け
          </button>
          <button
            type="button"
            onClick={() => setCategory("ALL")}
            className={`shrink-0 border px-3 py-2 text-xs font-semibold ${category === "ALL" ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"}`}
          >
            すべて
          </button>
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              className={`shrink-0 border px-3 py-2 text-xs font-semibold ${category === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"}`}
            >
              {categoryLabels[value]}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-navy-500 dark:text-navy-300">表示中 {patterns.length} / {all.length}件</p>
      </section>

      <section className="overflow-hidden border border-sand-200 bg-white dark:border-navy-700 dark:bg-navy-800" aria-label="演出一覧">
        <div className="hidden grid-cols-[132px_minmax(220px,1.4fr)_90px_110px_minmax(180px,1fr)] gap-3 border-b border-sand-200 bg-sand-50 px-3 py-2 text-[10px] font-semibold tracking-wide text-navy-500 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300 md:grid">
          <span>プレビュー</span>
          <span>演出</span>
          <span>OP相性</span>
          <span>実装</span>
          <span>向いている場面</span>
        </div>

        {patterns.map((pattern) => {
          const preview = getPatternPreview(pattern);
          const implementation = getPatternImplementation(pattern);
          return (
            <details key={pattern.id} className="group border-b border-sand-200 last:border-b-0 dark:border-navy-700">
              <summary className="list-none cursor-pointer px-3 py-3 hover:bg-sand-50 dark:hover:bg-navy-900/60">
                <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 md:grid-cols-[132px_minmax(220px,1.4fr)_90px_110px_minmax(180px,1fr)] md:items-center">
                  <div className="aspect-video overflow-hidden bg-navy-950">
                    {preview?.assetPath ? (
                      <video
                        src={preview.assetPath}
                        poster={preview.posterPath ?? undefined}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-2 text-center text-[9px] text-navy-300">NO PREVIEW</div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-sm font-bold text-navy-900 dark:text-sand-100 md:text-[15px]">{pattern.japaneseName}</h2>
                      <span className="shrink-0 text-[10px] text-navy-400 group-open:hidden">▼</span>
                      <span className="hidden shrink-0 text-[10px] text-navy-400 group-open:inline">▲</span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-navy-500 dark:text-navy-300">{pattern.commonName} · {pattern.looksLike}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1 md:hidden">
                      {pattern.categories.slice(0, 3).map((value) => (
                        <span key={value} className="border border-sand-200 px-1.5 py-0.5 text-[9px] text-navy-500 dark:border-navy-600 dark:text-navy-300">{categoryLabels[value]}</span>
                      ))}
                      <span className="border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:border-emerald-900 dark:text-emerald-300">OP {pattern.openingFit}</span>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <span className={`inline-flex min-w-10 justify-center border px-2 py-1 text-xs font-bold ${pattern.openingFit === "◎" ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300" : "border-sand-200 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}>{pattern.openingFit}</span>
                  </div>
                  <div className="hidden text-[11px] text-navy-600 dark:text-navy-300 md:block">{implementation?.status ?? "未確認"}</div>
                  <div className="hidden truncate text-[11px] text-navy-600 dark:text-navy-300 md:block">{pattern.goodFor.slice(0, 2).join(" / ")}</div>
                </div>
              </summary>

              <div className="grid gap-4 border-t border-sand-100 bg-sand-50/70 px-3 py-4 dark:border-navy-700 dark:bg-navy-900/40 md:grid-cols-[minmax(0,1.4fr)_minmax(260px,1fr)]">
                <div>
                  {preview?.assetPath ? (
                    <video src={preview.assetPath} poster={preview.posterPath ?? undefined} controls loop muted playsInline className="w-full max-h-[420px] bg-black object-contain" />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-navy-950 p-6 text-center text-sm text-navy-300">実物プレビューはまだありません</div>
                  )}
                </div>
                <div>
                  <p className="text-sm leading-6 text-navy-700 dark:text-navy-200">{pattern.naturalDescription}</p>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">向いている場面</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{pattern.goodFor.join(" / ")}</p>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">検索ワード</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{[pattern.commonName, ...pattern.aliases].slice(0, 8).join(" / ")}</p>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">DaVinci実装</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{implementation ? `${implementation.kind} · ${implementation.status} · ${implementation.method}` : "未整理"}</p>
                </div>
              </div>
            </details>
          );
        })}
      </section>
    </div>
  );
}
