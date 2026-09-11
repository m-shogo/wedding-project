import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  getPatternImplementation,
  getPatternPreview,
  searchMotionPatterns,
  type MotionPatternCategory,
  type MotionPatternRecord,
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

const openingSPicks = new Set([
  "type-mask-reveal",
  "photo-small-push",
  "photo-directional-pan",
  "cut-match-shape",
  "whip-source-matched",
  "type-char-stagger",
]);

const intentOptions = [
  ["ALL", "全部"],
  ["PHOTO", "写真をかっこよく"],
  ["TEXT", "文字を印象的に"],
  ["TRAVEL", "旅行感"],
  ["TEMPO", "テンポ"],
  ["EMOTION", "感動"],
] as const;

type IntentFilter = (typeof intentOptions)[number][0];
type DecisionValue = "NONE" | "FAVORITE" | "MAYBE" | "REJECT";

const decisionStorageKey = "motion-zukan-opening-decisions-v1";

function openingRank(openingFit: string) {
  return ({ "◎": 4, "○": 3, "△": 2, "×": 1 } as Record<string, number>)[openingFit] ?? 0;
}

function recommendationStars(openingFit: string) {
  if (openingFit === "◎") return "★★★★★";
  if (openingFit === "○") return "★★★★☆";
  if (openingFit === "△") return "★★★☆☆";
  return "★☆☆☆☆";
}

function matchesIntent(categories: MotionPatternCategory[], intent: IntentFilter) {
  if (intent === "ALL") return true;
  if (intent === "PHOTO") return categories.some((value) => ["PHOTO", "CAMERA", "LAYOUT"].includes(value));
  if (intent === "TEXT") return categories.some((value) => ["TYPOGRAPHY", "EDITORIAL"].includes(value));
  if (intent === "TRAVEL") return categories.some((value) => ["TRAVEL", "EDITORIAL", "CAMERA"].includes(value));
  if (intent === "TEMPO") return categories.some((value) => ["RHYTHM", "TRANSITION", "CAMERA"].includes(value));
  return categories.some((value) => ["EMOTIONAL", "PHOTO", "CAMERA"].includes(value));
}

function sReason(patternId: string, categories: MotionPatternCategory[]) {
  if (patternId === "cut-match-shape") return "実写のまま気持ちよく繋げられ、StaRtのアクセントにも合わせやすい。";
  if (patternId === "whip-source-matched") return "旅行映像の移動感を保ったままテンポを上げやすい。";
  if (patternId === "type-mask-reveal") return "旅行先名や章タイトルを上品に出せて、写真の主役感を壊しにくい。";
  if (patternId === "type-char-stagger") return "StaRtの細かいリズムに合わせて短い文字を楽しく見せやすい。";
  if (patternId === "photo-directional-pan") return "地図・移動・旅行写真と相性が良く、画面に進行方向を作れる。";
  if (patternId === "photo-small-push") return "実写真を主役にしたまま、止まって見えるのを自然に防げる。";
  if (categories.includes("TRAVEL")) return "旅行テーマと自然につながり、今回のOPへ入れやすい。";
  return "今回の実写中心・travel/editorial方向と相性が良い。";
}

function sectionLabels(sections: string[]) {
  const map: Record<string, string> = {
    INTRO: "冒頭",
    BUILD: "導入",
    VERSE: "旅行・思い出",
    PRECHORUS: "盛り上がり前",
    CHORUS: "サビ",
    TRAVEL: "旅行パート",
    ENDING: "横浜〜END",
  };
  return Array.from(new Set(sections.map((section) => map[section] ?? section.replaceAll("_", " ")))).slice(0, 5);
}

function decisionLabel(value: DecisionValue) {
  if (value === "FAVORITE") return "採用候補";
  if (value === "MAYBE") return "保留";
  if (value === "REJECT") return "使わない";
  return "未選択";
}

function similarPatterns(pattern: MotionPatternRecord, all: MotionPatternRecord[]) {
  return all
    .filter((candidate) => candidate.id !== pattern.id)
    .map((candidate) => ({
      candidate,
      shared: candidate.categories.filter((category) => pattern.categories.includes(category)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || openingRank(b.candidate.openingFit) - openingRank(a.candidate.openingFit))
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export function MotionPinterest() {
  const [query, setQuery] = useState("");
  const [intent, setIntent] = useState<IntentFilter>("ALL");
  const [category, setCategory] = useState<"ALL" | MotionPatternCategory>("ALL");
  const [sOnly, setSOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, DecisionValue>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem(decisionStorageKey) ?? "{}") as Record<string, DecisionValue>;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(decisionStorageKey, JSON.stringify(decisions));
  }, [decisions]);

  useEffect(() => {
    if (!selectedId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedId]);

  const all = useMemo(() => searchMotionPatterns(""), []);
  const categories = useMemo(() => {
    const values = new Set<MotionPatternCategory>();
    all.forEach((pattern) => pattern.categories.forEach((value) => values.add(value)));
    return Array.from(values);
  }, [all]);

  const patterns = useMemo(() => {
    return searchMotionPatterns(query)
      .filter((pattern) => {
        if (!matchesIntent(pattern.categories, intent)) return false;
        if (category !== "ALL" && !pattern.categories.includes(category)) return false;
        if (sOnly && !openingSPicks.has(pattern.id)) return false;
        return true;
      })
      .sort((a, b) => {
        const sDiff = Number(openingSPicks.has(b.id)) - Number(openingSPicks.has(a.id));
        if (sDiff !== 0) return sDiff;
        return openingRank(b.openingFit) - openingRank(a.openingFit);
      });
  }, [query, intent, category, sOnly]);

  const selected = selectedId ? all.find((pattern) => pattern.id === selectedId) ?? null : null;
  const selectedPreview = selected ? getPatternPreview(selected) : null;
  const selectedImplementation = selected ? getPatternImplementation(selected) : null;
  const selectedDecision = selected ? decisions[selected.id] ?? selected.humanDecision : "NONE";
  const adoptedCount = all.filter((pattern) => (decisions[pattern.id] ?? pattern.humanDecision) === "FAVORITE").length;
  const related = selected ? similarPatterns(selected, all) : [];

  function selectDecision(patternId: string, value: DecisionValue) {
    setDecisions((current) => ({ ...current, [patternId]: value }));
  }

  return (
    <div>
      <Header
        title="映像Pinterest"
        description="説明より先に、動きを見る。気になった演出だけ開いて選ぶ。"
      />

      <section className="sticky top-0 z-20 -mx-4 mb-4 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:border">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="写真 / 文字 / ズーム / 地図 / パッ…"
            className="min-w-0 flex-1 rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-500 dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
          />
          <button
            type="button"
            onClick={() => setSOnly((value) => !value)}
            className={`shrink-0 rounded-full border px-3 py-2.5 text-xs font-black ${sOnly ? "border-amber-400 bg-amber-400 text-navy-950" : "border-amber-300 bg-white text-amber-700 dark:border-amber-700 dark:bg-navy-900 dark:text-amber-300"}`}
          >
            Sのみ
          </button>
          <Link to="/movie-coach/motion-library" className="hidden shrink-0 rounded-full border border-sand-300 bg-white px-3 py-2.5 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200 sm:inline-flex">
            一覧版
          </Link>
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1" aria-label="やりたいことから探す">
          {intentOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setIntent(value)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${intent === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => setCategory("ALL")} className={`shrink-0 text-[10px] font-semibold ${category === "ALL" ? "text-navy-900 underline underline-offset-4 dark:text-sand-100" : "text-navy-400"}`}>すべて</button>
          {categories.map((value) => (
            <button key={value} type="button" onClick={() => setCategory(value)} className={`shrink-0 text-[10px] font-semibold ${category === value ? "text-navy-900 underline underline-offset-4 dark:text-sand-100" : "text-navy-400"}`}>{categoryLabels[value]}</button>
          ))}
          <span className="ml-auto shrink-0 text-[10px] text-navy-400">{patterns.length}件</span>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900 dark:bg-amber-950/20">
        <p className="text-xs text-navy-700 dark:text-navy-200"><span className="font-bold">採用候補 {adoptedCount}件</span> <span className="text-navy-400">/ 目安4〜8</span></p>
        <Link to="/movie-coach/motion-library" className="text-[10px] font-semibold text-amber-800 underline underline-offset-2 dark:text-amber-200">選定一覧を見る</Link>
      </div>

      <section className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6" aria-label="映像演出グリッド">
        {patterns.map((pattern) => {
          const preview = getPatternPreview(pattern);
          const isS = openingSPicks.has(pattern.id);
          const currentDecision = decisions[pattern.id] ?? pattern.humanDecision;
          return (
            <article key={pattern.id} className="min-w-0">
              <button
                type="button"
                onClick={() => setSelectedId(pattern.id)}
                className="group block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-sand-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-navy-800 dark:ring-navy-700"
              >
                <div className="relative aspect-video overflow-hidden bg-navy-950">
                  {preview?.assetPath ? (
                    <video
                      src={preview.assetPath}
                      poster={preview.posterPath ?? undefined}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(event) => void event.currentTarget.play()}
                      onMouseLeave={(event) => {
                        event.currentTarget.pause();
                        event.currentTarget.currentTime = 0;
                      }}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-3 text-center text-[10px] text-navy-300">実物プレビューなし</div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5 opacity-80" />
                  {isS && <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-black text-navy-950 shadow-sm">S</span>}
                  {currentDecision !== "NONE" && (
                    <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[9px] font-bold text-white backdrop-blur">{decisionLabel(currentDecision)}</span>
                  )}
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur">▶ 見る</span>
                </div>
                <div className="px-2.5 pb-3 pt-2.5 sm:px-3">
                  <h2 className="line-clamp-2 text-[12px] font-bold leading-[1.45] text-navy-900 dark:text-sand-100 sm:text-[13px]">{pattern.japaneseName}</h2>
                  <p className="mt-1 text-[10px] font-semibold tracking-tight text-amber-600 dark:text-amber-300">{recommendationStars(pattern.openingFit)}</p>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-navy-500 dark:text-navy-300">{pattern.looksLike}</p>
                </div>
              </button>
            </article>
          );
        })}
      </section>

      {patterns.length === 0 && (
        <div className="py-16 text-center text-sm text-navy-400">条件に合う演出がありません。フィルタを戻してください。</div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={() => setSelectedId(null)}>
          <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-navy-900 md:max-w-5xl md:rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-900/95">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy-900 dark:text-sand-100">{selected.japaneseName}</p>
                <p className="text-[10px] text-navy-400">{selected.commonName}</p>
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="ml-3 rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>

            <div className="grid md:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)]">
              <div className="bg-black">
                {selectedPreview?.assetPath ? (
                  <video src={selectedPreview.assetPath} poster={selectedPreview.posterPath ?? undefined} controls autoPlay loop muted playsInline className="aspect-video h-full max-h-[66vh] w-full object-contain" />
                ) : (
                  <div className="flex aspect-video items-center justify-center text-sm text-navy-300">実物プレビューはまだありません</div>
                )}
              </div>

              <div className="p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {openingSPicks.has(selected.id) && <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-navy-950">S · 今回のOP推し</span>}
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-300">{recommendationStars(selected.openingFit)}</span>
                </div>

                {openingSPicks.has(selected.id) && (
                  <div className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                    <span className="font-bold">Sの理由：</span>{sReason(selected.id, selected.categories)}
                  </div>
                )}

                <p className="mt-4 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.naturalDescription}</p>

                <div className="mt-4">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">今回のOPならここ</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {sectionLabels(selected.openingSections).map((label) => <span key={label} className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-800 dark:border-sky-900 dark:bg-sky-950/20 dark:text-sky-200">{label}</span>)}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">これどうする？</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(["FAVORITE", "MAYBE", "REJECT"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => selectDecision(selected.id, value)}
                        className={`rounded-lg border px-2 py-2.5 text-[11px] font-bold ${selectedDecision === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}
                      >
                        {value === "FAVORITE" ? "✅ 採用候補" : value === "MAYBE" ? "🤔 保留" : "× 使わない"}
                      </button>
                    ))}
                  </div>
                </div>

                {related.length > 0 && (
                  <div className="mt-5 border-t border-sand-200 pt-4 dark:border-navy-700">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">似ている演出</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {related.map((pattern) => {
                        const preview = getPatternPreview(pattern);
                        return (
                          <button key={pattern.id} type="button" onClick={() => setSelectedId(pattern.id)} className="overflow-hidden rounded-lg border border-sand-200 bg-white text-left dark:border-navy-700 dark:bg-navy-800">
                            <div className="aspect-video bg-navy-950">
                              {preview?.posterPath || preview?.assetPath ? <img src={preview.posterPath ?? preview.assetPath ?? ""} alt="" className="h-full w-full object-cover" /> : null}
                            </div>
                            <p className="line-clamp-2 px-2 py-1.5 text-[9px] font-semibold leading-3.5 text-navy-700 dark:text-navy-200">{pattern.japaneseName}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <details className="mt-5 border-t border-sand-200 pt-4 dark:border-navy-700">
                  <summary className="cursor-pointer text-xs font-bold text-navy-700 dark:text-navy-200">名前・検索語・DaVinci情報を見る</summary>
                  <div className="mt-3 space-y-3 text-xs leading-5 text-navy-600 dark:text-navy-300">
                    <p><span className="font-bold">検索：</span>{[selected.commonName, ...selected.aliases].slice(0, 8).join(" / ")}</p>
                    <p><span className="font-bold">用途：</span>{selected.goodFor.join(" / ")}</p>
                    <p><span className="font-bold">DaVinci：</span>{selectedImplementation ? `${selectedImplementation.kind} · ${selectedImplementation.status} · ${selectedImplementation.method}` : "未整理"}</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
