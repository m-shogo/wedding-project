import { useEffect, useMemo, useState } from "react";
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

const openingSPicks = new Set([
  "type-mask-reveal",
  "photo-small-push",
  "photo-directional-pan",
  "cut-match-shape",
  "whip-source-matched",
  "type-char-stagger",
]);

const intentOptions = [
  ["ALL", "全部見る"],
  ["PHOTO", "写真をかっこよく"],
  ["TEXT", "文字を印象的に"],
  ["TRAVEL", "旅行感を出す"],
  ["TEMPO", "テンポを上げる"],
  ["EMOTION", "感動寄りにする"],
] as const;

type IntentFilter = (typeof intentOptions)[number][0];
type DecisionValue = "NONE" | "FAVORITE" | "MAYBE" | "REJECT";

const decisionStorageKey = "motion-zukan-opening-decisions-v1";

function recommendationStars(openingFit: string) {
  if (openingFit === "◎") return "★★★★★";
  if (openingFit === "○") return "★★★★☆";
  if (openingFit === "△") return "★★★☆☆";
  return "★☆☆☆☆";
}

function openingRank(openingFit: string) {
  return ({ "◎": 4, "○": 3, "△": 2, "×": 1 } as Record<string, number>)[openingFit] ?? 0;
}

function difficultyLabel(kind?: string) {
  if (!kind) return "難易度 未整理";
  if (["DAVINCI_EDIT", "DAVINCI_EDIT_NATIVE", "DAVINCI_BUILTIN", "PALMIER_NATIVE_EDIT"].includes(kind)) return "難易度 ★☆☆";
  if (["DAVINCI_TEXT_PLUS", "EXTERNAL_TEMPLATE", "REMOTION_MOTION_KIT"].includes(kind)) return "難易度 ★★☆";
  return "難易度 ★★★";
}

function decisionLabel(decision: DecisionValue) {
  if (decision === "FAVORITE") return "✅ 採用候補";
  if (decision === "MAYBE") return "🤔 保留";
  if (decision === "REJECT") return "× 今回使わない";
  return "未選択";
}

function sReason(patternId: string, categories: MotionPatternCategory[]) {
  if (patternId === "cut-match-shape") return "実写素材のまま気持ちよく繋げられ、StaRtのアクセントにも合わせやすい。";
  if (patternId === "whip-source-matched") return "旅行映像の移動感を保ったままテンポを上げやすい。";
  if (patternId === "type-mask-reveal") return "旅行先名・日付・章タイトルを上品に出せて、写真の主役感を壊しにくい。";
  if (patternId === "type-char-stagger") return "StaRtの細かいリズムに合わせやすく、文字を短く楽しく見せられる。";
  if (patternId === "photo-directional-pan") return "地図・移動・旅行写真との相性が良く、画面に自然な進行方向を作れる。";
  if (patternId === "photo-small-push") return "実写真を主役にしたまま止まって見えるのを防げる。";
  if (categories.includes("TRAVEL")) return "旅行テーマとの接続が強く、今回のOP文脈に自然に入れやすい。";
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
  const labels = sections.map((section) => map[section] ?? section.replaceAll("_", " "));
  return Array.from(new Set(labels)).slice(0, 5);
}

function matchesIntent(categories: MotionPatternCategory[], intent: IntentFilter) {
  if (intent === "ALL") return true;
  if (intent === "PHOTO") return categories.some((value) => ["PHOTO", "CAMERA", "LAYOUT"].includes(value));
  if (intent === "TEXT") return categories.some((value) => ["TYPOGRAPHY", "EDITORIAL"].includes(value));
  if (intent === "TRAVEL") return categories.some((value) => ["TRAVEL", "EDITORIAL", "CAMERA"].includes(value));
  if (intent === "TEMPO") return categories.some((value) => ["RHYTHM", "TRANSITION", "CAMERA"].includes(value));
  return categories.some((value) => ["EMOTIONAL", "PHOTO", "CAMERA"].includes(value));
}

export function VisualMotionLibraryList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"ALL" | MotionPatternCategory>("ALL");
  const [intent, setIntent] = useState<IntentFilter>("ALL");
  const [openingOnly, setOpeningOnly] = useState(true);
  const [sOnly, setSOnly] = useState(false);
  const [decisionFilter, setDecisionFilter] = useState<"ALL" | "FAVORITE" | "MAYBE" | "REJECT">("ALL");
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

  const all = useMemo(() => searchMotionPatterns(""), []);
  const effectiveDecision = (patternId: string, canonical: DecisionValue) => decisions[patternId] ?? canonical;

  const patterns = useMemo(() => {
    return searchMotionPatterns(query)
      .filter((pattern) => {
        if (category !== "ALL" && !pattern.categories.includes(category)) return false;
        if (!matchesIntent(pattern.categories, intent)) return false;
        if (openingOnly && pattern.openingFit !== "◎" && pattern.openingFit !== "○") return false;
        if (sOnly && !openingSPicks.has(pattern.id)) return false;
        const currentDecision = decisions[pattern.id] ?? pattern.humanDecision;
        if (decisionFilter !== "ALL" && currentDecision !== decisionFilter) return false;
        return true;
      })
      .sort((a, b) => {
        const aS = openingSPicks.has(a.id) ? 1 : 0;
        const bS = openingSPicks.has(b.id) ? 1 : 0;
        if (aS !== bS) return bS - aS;
        return openingRank(b.openingFit) - openingRank(a.openingFit);
      });
  }, [query, category, intent, openingOnly, sOnly, decisionFilter, decisions]);

  const categories = useMemo(() => {
    const values = new Set<MotionPatternCategory>();
    all.forEach((pattern) => pattern.categories.forEach((value) => values.add(value)));
    return Array.from(values);
  }, [all]);

  const adopted = useMemo(
    () => all.filter((pattern) => effectiveDecision(pattern.id, pattern.humanDecision) === "FAVORITE"),
    [all, decisions],
  );

  function selectDecision(patternId: string, value: DecisionValue) {
    setDecisions((current) => ({ ...current, [patternId]: value }));
  }

  function showSimilar(patternId: string) {
    setQuery(patternId);
    setCategory("ALL");
    setIntent("ALL");
    setOpeningOnly(false);
    setSOnly(false);
    setDecisionFilter("ALL");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <Header
        title="モーション図鑑"
        description="見る → 気に入る → 名前が分かる → OPの使いどころを決める → DaVinciで作る。"
      />

      <section className="mb-4 border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-amber-700 dark:text-amber-300">OPENING ADOPTION LIST</p>
            <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">採用候補 {adopted.length}件 <span className="font-normal text-navy-500 dark:text-navy-300">/ 目安4〜8演出</span></p>
          </div>
          <button type="button" onClick={() => setDecisionFilter("FAVORITE")} className="border border-amber-400 px-3 py-2 text-xs font-bold text-amber-800 dark:text-amber-200">採用候補だけ見る</button>
        </div>
        {adopted.length > 0 && (
          <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
            {adopted.map((pattern) => (
              <button key={pattern.id} type="button" onClick={() => showSimilar(pattern.id)} className="shrink-0 rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-navy-700 dark:border-amber-900 dark:bg-navy-900 dark:text-sand-100">{pattern.japaneseName}</button>
            ))}
          </div>
        )}
      </section>

      <section className="sticky top-0 z-20 -mx-4 mb-4 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:border">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例: 写真 ズーム / 文字 シュッ / 旅行 地図"
            className="min-w-0 flex-1 border border-sand-300 bg-white px-3 py-2.5 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
          />
          <Link to="/movie-coach/motion-library/advanced" className="shrink-0 border border-sand-300 px-3 py-2.5 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:text-navy-200">詳細版</Link>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="やりたいことから探す">
          {intentOptions.map(([value, label]) => (
            <button key={value} type="button" onClick={() => setIntent(value)} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold ${intent === value ? "border-sky-700 bg-sky-700 text-white" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => setOpeningOnly((value) => !value)} className={`shrink-0 border px-3 py-2 text-xs font-semibold ${openingOnly ? "border-emerald-600 bg-emerald-600 text-white" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"}`}>結婚式OP向け</button>
          <button type="button" onClick={() => setSOnly((value) => !value)} className={`shrink-0 border px-3 py-2 text-xs font-bold ${sOnly ? "border-amber-500 bg-amber-400 text-navy-950" : "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300"}`}>Sのみ</button>
          <button type="button" onClick={() => setCategory("ALL")} className={`shrink-0 border px-3 py-2 text-xs font-semibold ${category === "ALL" ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"}`}>すべて</button>
          {categories.map((value) => (
            <button key={value} type="button" onClick={() => setCategory(value)} className={`shrink-0 border px-3 py-2 text-xs font-semibold ${category === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"}`}>{categoryLabels[value]}</button>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="shrink-0 text-[10px] font-semibold text-navy-400">選定</span>
          {(["ALL", "FAVORITE", "MAYBE", "REJECT"] as const).map((value) => {
            const label = value === "ALL" ? "すべて" : decisionLabel(value);
            return <button key={value} type="button" onClick={() => setDecisionFilter(value)} className={`shrink-0 border px-2.5 py-1.5 text-[11px] ${decisionFilter === value ? "border-navy-800 bg-navy-800 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}>{label}</button>;
          })}
        </div>

        <p className="mt-2 text-[11px] text-navy-500 dark:text-navy-300">表示中 {patterns.length} / {all.length}件 · Sは今回のOPで本当に使いたい候補だけ</p>
      </section>

      <section className="overflow-hidden border-y border-sand-200 bg-white dark:border-navy-700 dark:bg-navy-800 md:border" aria-label="演出一覧">
        <div className="hidden grid-cols-[120px_minmax(250px,1.4fr)_74px_92px_110px_minmax(180px,1fr)] gap-3 border-b border-sand-200 bg-sand-50 px-3 py-2 text-[10px] font-semibold tracking-wide text-navy-500 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300 md:grid">
          <span>プレビュー</span><span>演出</span><span>推し</span><span>難易度</span><span>選定</span><span>今回の使いどころ</span>
        </div>

        {patterns.map((pattern) => {
          const preview = getPatternPreview(pattern);
          const implementation = getPatternImplementation(pattern);
          const isS = openingSPicks.has(pattern.id);
          const currentDecision = effectiveDecision(pattern.id, pattern.humanDecision);
          const sections = sectionLabels(pattern.openingSections);
          const similar = all
            .filter((candidate) => candidate.id !== pattern.id)
            .map((candidate) => ({ candidate, overlap: candidate.categories.filter((value) => pattern.categories.includes(value)).length }))
            .filter(({ overlap }) => overlap > 0)
            .sort((a, b) => b.overlap - a.overlap || openingRank(b.candidate.openingFit) - openingRank(a.candidate.openingFit))
            .slice(0, 3)
            .map(({ candidate }) => candidate);

          return (
            <details key={pattern.id} className="group border-b border-sand-200 last:border-b-0 dark:border-navy-700">
              <summary className="list-none cursor-pointer px-2.5 py-2.5 hover:bg-sand-50 dark:hover:bg-navy-900/60 md:px-3">
                <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 md:grid-cols-[120px_minmax(250px,1.4fr)_74px_92px_110px_minmax(180px,1fr)] md:items-center">
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
                        onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-2 text-center text-[9px] text-navy-300">NO PREVIEW</div>
                    )}
                    {isS && <span className="absolute left-1 top-1 bg-amber-400 px-1.5 py-0.5 text-[9px] font-black text-navy-950">S</span>}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      {isS && <span className="shrink-0 bg-amber-400 px-1.5 py-0.5 text-[9px] font-black text-navy-950 md:hidden">S</span>}
                      <h2 className="truncate text-sm font-bold text-navy-900 dark:text-sand-100 md:text-[14px]">{pattern.japaneseName}</h2>
                      <span className="shrink-0 text-[10px] text-navy-400 group-open:hidden">▼</span>
                      <span className="hidden shrink-0 text-[10px] text-navy-400 group-open:inline">▲</span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-navy-500 dark:text-navy-300 md:text-[11px]">{pattern.looksLike}</p>
                    {isS && <p className="mt-1 line-clamp-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300">S理由: {sReason(pattern.id, pattern.categories)}</p>}
                    <div className="mt-1 flex flex-wrap gap-1 md:hidden">
                      <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-300">{recommendationStars(pattern.openingFit)}</span>
                      <span className="border border-sand-200 px-1.5 py-0.5 text-[9px] text-navy-500 dark:border-navy-600 dark:text-navy-300">{difficultyLabel(implementation?.kind)}</span>
                      {sections.slice(0, 2).map((section) => <span key={section} className="border border-sky-200 px-1.5 py-0.5 text-[9px] text-sky-700 dark:border-sky-900 dark:text-sky-300">{section}</span>)}
                    </div>
                  </div>

                  <div className="hidden text-[11px] font-semibold text-amber-600 dark:text-amber-300 md:block">{recommendationStars(pattern.openingFit)}</div>
                  <div className="hidden text-[11px] text-navy-600 dark:text-navy-300 md:block">{difficultyLabel(implementation?.kind).replace("難易度 ", "")}</div>
                  <div className="hidden text-[11px] text-navy-600 dark:text-navy-300 md:block">{decisionLabel(currentDecision)}</div>
                  <div className="hidden truncate text-[11px] text-navy-600 dark:text-navy-300 md:block">{sections.length ? sections.join(" / ") : pattern.goodFor.slice(0, 2).join(" / ")}</div>
                </div>
              </summary>

              <div className="grid gap-4 border-t border-sand-100 bg-sand-50/70 px-3 py-4 dark:border-navy-700 dark:bg-navy-900/40 md:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
                <div>
                  {preview?.assetPath ? (
                    <video src={preview.assetPath} poster={preview.posterPath ?? undefined} controls autoPlay loop muted playsInline className="w-full max-h-[420px] bg-black object-contain" />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-navy-950 p-6 text-center text-sm text-navy-300">実物プレビューはまだありません</div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {isS && <span className="bg-amber-400 px-2 py-1 text-[10px] font-black text-navy-950">S · 今回のOP推し</span>}
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-300">おすすめ {recommendationStars(pattern.openingFit)}</span>
                    <span className="text-xs text-navy-500 dark:text-navy-300">{difficultyLabel(implementation?.kind)}</span>
                  </div>
                  {isS && <p className="mt-2 border-l-2 border-amber-400 pl-2 text-xs leading-5 text-amber-800 dark:text-amber-200">{sReason(pattern.id, pattern.categories)}</p>}
                  <p className="mt-3 text-sm leading-6 text-navy-700 dark:text-navy-200">{pattern.naturalDescription}</p>

                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">今回のOPならここ</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {sections.length ? sections.map((section) => <span key={section} className="border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">{section}</span>) : <span className="text-xs text-navy-500">未整理</span>}
                  </div>

                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">この演出をどうする？</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                    {(["FAVORITE", "MAYBE", "REJECT"] as const).map((value) => (
                      <button key={value} type="button" onClick={() => selectDecision(pattern.id, value)} className={`border px-2 py-2 text-[10px] font-semibold ${currentDecision === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-300"}`}>{decisionLabel(value)}</button>
                    ))}
                  </div>

                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">似ている演出と比べる</p>
                  <div className="mt-1.5 grid gap-1.5">
                    {similar.map((candidate) => (
                      <button key={candidate.id} type="button" onClick={() => showSimilar(candidate.id)} className="flex items-center justify-between gap-2 border border-sand-200 bg-white px-2.5 py-2 text-left dark:border-navy-700 dark:bg-navy-800">
                        <span className="min-w-0 truncate text-[11px] font-semibold text-navy-700 dark:text-sand-100">{candidate.japaneseName}</span>
                        <span className="shrink-0 text-[10px] text-amber-600 dark:text-amber-300">{recommendationStars(candidate.openingFit)}</span>
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">向いている場面</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{pattern.goodFor.join(" / ")}</p>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-navy-400">検索ワード</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{[pattern.commonName, ...pattern.aliases].slice(0, 8).join(" / ")}</p>

                  <details className="mt-4 border-t border-sand-200 pt-3 dark:border-navy-700">
                    <summary className="cursor-pointer text-xs font-semibold text-navy-700 dark:text-navy-200">DaVinciで作る情報を見る</summary>
                    <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">{implementation ? `${implementation.kind} · ${implementation.status} · ${implementation.method}` : "未整理"}</p>
                  </details>
                </div>
              </div>
            </details>
          );
        })}
      </section>
    </div>
  );
}
