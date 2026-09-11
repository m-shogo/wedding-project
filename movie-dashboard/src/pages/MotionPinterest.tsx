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
import { directorRecipeCatalog, type DirectorRecipe } from "../data/directorRecipeCatalog";
import { getDirectorRecipeVisualAudit } from "../data/directorRecipeVisualFidelity";

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

type PrimaryGenre = "ALL" | "IMAGE" | "TEXT" | "EFFECT" | "IMAGE_TEXT";
type IntentFilter = "ALL" | "PHOTO" | "TEXT" | "TRAVEL" | "TEMPO" | "EMOTION";
type DecisionValue = "NONE" | "FAVORITE" | "MAYBE" | "REJECT";

type PinterestItem =
  | { kind: "pattern"; key: string; genre: Exclude<PrimaryGenre, "ALL">; pattern: MotionPatternRecord }
  | { kind: "recipe"; key: string; genre: "IMAGE_TEXT"; recipe: DirectorRecipe };

const decisionStorageKey = "motion-zukan-opening-decisions-v1";

const openingSPicks = new Set([
  "type-mask-reveal",
  "photo-small-push",
  "photo-directional-pan",
  "cut-match-shape",
  "whip-source-matched",
  "type-char-stagger",
]);

const genreOptions: Array<[PrimaryGenre, string, string]> = [
  ["ALL", "全部", "4ジャンルをまとめて見る"],
  ["IMAGE", "画像", "写真・動画そのものを動かす/並べる"],
  ["TEXT", "テキスト", "文字そのものを見せる"],
  ["EFFECT", "エフェクト", "光・切替・線・スタンプなど"],
  ["IMAGE_TEXT", "画像＋テキスト", "写真/動画と文字を一体で見せる"],
];

const intentOptions: Array<[IntentFilter, string]> = [
  ["ALL", "目的指定なし"],
  ["PHOTO", "写真をかっこよく"],
  ["TEXT", "文字を印象的に"],
  ["TRAVEL", "旅行感"],
  ["TEMPO", "テンポ"],
  ["EMOTION", "感動"],
];

function openingRank(openingFit: string) {
  return ({ "◎": 4, "○": 3, "△": 2, "×": 1 } as Record<string, number>)[openingFit] ?? 0;
}

function recommendationStars(openingFit: string) {
  if (openingFit === "◎") return "★★★★★";
  if (openingFit === "○") return "★★★★☆";
  if (openingFit === "△") return "★★★☆☆";
  return "★☆☆☆☆";
}

function primaryGenreForPattern(pattern: MotionPatternRecord): Exclude<PrimaryGenre, "ALL"> {
  if (pattern.id.startsWith("type-")) return "TEXT";
  if (pattern.id.startsWith("photo-")) return "IMAGE";
  if (
    pattern.id.startsWith("cut-") ||
    pattern.id.startsWith("wipe-") ||
    pattern.id.startsWith("flash-") ||
    pattern.id.startsWith("whip-") ||
    pattern.id.startsWith("color-field-") ||
    pattern.id.startsWith("accent-")
  ) return "EFFECT";

  const hasText = pattern.inputSlots.some((slot) => slot.kind === "TEXT");
  const hasMedia = pattern.inputSlots.some((slot) => slot.kind === "MEDIA");
  if (hasText && hasMedia) return "IMAGE_TEXT";
  if (hasText || pattern.categories.includes("TYPOGRAPHY")) return "TEXT";
  if (hasMedia || pattern.categories.some((value) => ["PHOTO", "CAMERA", "LAYOUT"].includes(value))) return "IMAGE";
  return "EFFECT";
}

function isImageTextRecipe(recipe: DirectorRecipe) {
  const hasTypographyPreset = recipe.motionPresetIds.some((id) => id.startsWith("type-"));
  if (!hasTypographyPreset) return false;
  if (recipe.category === "TYPOGRAPHY") return false;
  return getDirectorRecipeVisualAudit(recipe).fidelity !== "placeholder";
}

function matchesIntentForPattern(pattern: MotionPatternRecord, intent: IntentFilter) {
  if (intent === "ALL") return true;
  if (intent === "PHOTO") return pattern.categories.some((value) => ["PHOTO", "CAMERA", "LAYOUT"].includes(value));
  if (intent === "TEXT") return pattern.categories.some((value) => ["TYPOGRAPHY", "EDITORIAL"].includes(value));
  if (intent === "TRAVEL") return pattern.categories.some((value) => ["TRAVEL", "EDITORIAL", "CAMERA"].includes(value));
  if (intent === "TEMPO") return pattern.categories.some((value) => ["RHYTHM", "TRANSITION", "CAMERA"].includes(value));
  return pattern.categories.some((value) => ["EMOTIONAL", "PHOTO", "CAMERA"].includes(value));
}

function matchesIntentForRecipe(recipe: DirectorRecipe, intent: IntentFilter) {
  if (intent === "ALL") return true;
  if (intent === "PHOTO") return ["PHOTO_PRESENTATION", "CINEMATIC_CAMERA", "EDITORIAL_CM"].includes(recipe.category);
  if (intent === "TEXT") return recipe.motionPresetIds.some((id) => id.startsWith("type-"));
  if (intent === "TRAVEL") return recipe.category === "TRAVEL" || /旅|travel/i.test(`${recipe.purpose} ${recipe.whyItWorks}`);
  if (intent === "TEMPO") return ["CUT_TRANSITION", "RHYTHM_MUSIC_HIT", "START_SPECIFIC"].includes(recipe.category);
  return recipe.category === "WEDDING_EMOTION" || /感情|余韻|emotion/i.test(`${recipe.purpose} ${recipe.whyItWorks}`);
}

function recipeMatchesSubCategory(recipe: DirectorRecipe, category: MotionPatternCategory) {
  if (category === "TYPOGRAPHY") return recipe.motionPresetIds.some((id) => id.startsWith("type-"));
  if (category === "PHOTO") return recipe.sourceType === "photo-safe" || recipe.sourceType === "both";
  if (category === "CAMERA") return recipe.category === "CINEMATIC_CAMERA";
  if (category === "LAYOUT") return recipe.category === "PHOTO_PRESENTATION" || recipe.category === "EDITORIAL_CM";
  if (category === "TRANSITION") return recipe.category === "CUT_TRANSITION";
  if (category === "RHYTHM") return recipe.category === "RHYTHM_MUSIC_HIT" || recipe.category === "START_SPECIFIC";
  if (category === "GRAPHIC") return recipe.category === "ANIME_OP_GRAMMAR";
  if (category === "EDITORIAL") return recipe.category === "EDITORIAL_CM";
  if (category === "TRAVEL") return recipe.category === "TRAVEL";
  return recipe.category === "WEDDING_EMOTION";
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

function genreLabel(genre: Exclude<PrimaryGenre, "ALL">) {
  if (genre === "IMAGE") return "画像";
  if (genre === "TEXT") return "テキスト";
  if (genre === "EFFECT") return "エフェクト";
  return "画像＋テキスト";
}

function normalizePresetId(id: string) {
  return id === "type-mask-slide" ? "type-mask-reveal" : id;
}

function recipePatternNames(recipe: DirectorRecipe, patterns: MotionPatternRecord[]) {
  return recipe.motionPresetIds.map(normalizePresetId).map((id) => patterns.find((pattern) => pattern.id === id)?.japaneseName ?? id);
}

function itemSearchText(item: PinterestItem) {
  if (item.kind === "pattern") {
    return [item.pattern.japaneseName, item.pattern.commonName, item.pattern.looksLike, ...item.pattern.aliases].join(" ").toLowerCase();
  }
  return [item.recipe.label, item.recipe.subCategory, item.recipe.purpose, item.recipe.whyItWorks, ...item.recipe.motionPresetIds].join(" ").toLowerCase();
}

function relatedItemsFor(selected: PinterestItem, allItems: PinterestItem[]) {
  if (selected.kind === "pattern") {
    return allItems
      .filter((item) => item.key !== selected.key && item.genre === selected.genre)
      .map((item) => {
        const shared = item.kind === "pattern"
          ? item.pattern.categories.filter((category) => selected.pattern.categories.includes(category)).length
          : 0;
        return { item, score: shared + (item.kind === "pattern" ? openingRank(item.pattern.openingFit) / 10 : 0) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ item }) => item);
  }

  return allItems
    .filter((item) => item.key !== selected.key && item.kind === "recipe")
    .map((item) => ({
      item,
      score:
        (item.kind === "recipe" && item.recipe.category === selected.recipe.category ? 3 : 0) +
        (item.kind === "recipe" ? item.recipe.motionPresetIds.filter((id) => selected.recipe.motionPresetIds.includes(id)).length : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
}

function PreviewMedia({ pattern, compact = false }: { pattern: MotionPatternRecord; compact?: boolean }) {
  const preview = getPatternPreview(pattern);
  if (!preview?.assetPath) {
    return <div className="flex h-full items-center justify-center px-3 text-center text-[10px] text-navy-300">実物プレビューなし</div>;
  }
  return (
    <video
      src={preview.assetPath}
      poster={preview.posterPath ?? undefined}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseEnter={compact ? (event) => void event.currentTarget.play() : undefined}
      onMouseLeave={compact ? (event) => {
        event.currentTarget.pause();
        event.currentTarget.currentTime = 0;
      } : undefined}
      className="h-full w-full object-cover"
    />
  );
}

function RecipeElementPreview({ recipe, patterns }: { recipe: DirectorRecipe; patterns: MotionPatternRecord[] }) {
  const representative = recipe.motionPresetIds
    .map(normalizePresetId)
    .map((id) => patterns.find((pattern) => pattern.id === id))
    .find((pattern): pattern is MotionPatternRecord => Boolean(pattern && getPatternPreview(pattern)?.assetPath));

  if (!representative) {
    return <div className="flex h-full items-center justify-center px-3 text-center text-[10px] leading-4 text-navy-300">複合レシピ<br />実render未配置</div>;
  }

  return (
    <div className="relative h-full w-full">
      <PreviewMedia pattern={representative} compact />
      <div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1 text-[8px] font-semibold text-white">構成要素プレビュー（複合完成画ではありません）</div>
    </div>
  );
}

function RelatedPreview({ item, patterns }: { item: PinterestItem; patterns: MotionPatternRecord[] }) {
  return item.kind === "pattern" ? <PreviewMedia pattern={item.pattern} /> : <RecipeElementPreview recipe={item.recipe} patterns={patterns} />;
}

export function MotionPinterest() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<PrimaryGenre>("ALL");
  const [intent, setIntent] = useState<IntentFilter>("ALL");
  const [subCategory, setSubCategory] = useState<"ALL" | MotionPatternCategory>("ALL");
  const [sOnly, setSOnly] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
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
    if (!selectedKey) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelectedKey(null);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedKey]);

  const allPatterns = useMemo(() => searchMotionPatterns(""), []);
  const compositeRecipes = useMemo(() => directorRecipeCatalog.filter(isImageTextRecipe), []);

  const allItems = useMemo<PinterestItem[]>(() => [
    ...allPatterns.map((pattern) => ({ kind: "pattern" as const, key: pattern.id, genre: primaryGenreForPattern(pattern), pattern })),
    ...compositeRecipes.map((recipe) => ({ kind: "recipe" as const, key: `recipe:${recipe.id}`, genre: "IMAGE_TEXT" as const, recipe })),
  ], [allPatterns, compositeRecipes]);

  const genreCounts = useMemo(() => {
    const counts: Record<Exclude<PrimaryGenre, "ALL">, number> = { IMAGE: 0, TEXT: 0, EFFECT: 0, IMAGE_TEXT: 0 };
    allItems.forEach((item) => { counts[item.genre] += 1; });
    return counts;
  }, [allItems]);

  const subCategories = useMemo(() => {
    const values = new Set<MotionPatternCategory>();
    allPatterns.forEach((pattern) => pattern.categories.forEach((value) => values.add(value)));
    return Array.from(values);
  }, [allPatterns]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems
      .filter((item) => genre === "ALL" || item.genre === genre)
      .filter((item) => item.kind === "pattern" ? matchesIntentForPattern(item.pattern, intent) : matchesIntentForRecipe(item.recipe, intent))
      .filter((item) => {
        if (subCategory === "ALL") return true;
        return item.kind === "pattern" ? item.pattern.categories.includes(subCategory) : recipeMatchesSubCategory(item.recipe, subCategory);
      })
      .filter((item) => !sOnly || (item.kind === "pattern" && openingSPicks.has(item.pattern.id)))
      .filter((item) => !q || itemSearchText(item).includes(q))
      .sort((a, b) => {
        const aS = a.kind === "pattern" && openingSPicks.has(a.pattern.id) ? 1 : 0;
        const bS = b.kind === "pattern" && openingSPicks.has(b.pattern.id) ? 1 : 0;
        if (aS !== bS) return bS - aS;
        if (a.genre !== b.genre) {
          const rank: Record<Exclude<PrimaryGenre, "ALL">, number> = { IMAGE_TEXT: 4, IMAGE: 3, TEXT: 2, EFFECT: 1 };
          return rank[b.genre] - rank[a.genre];
        }
        if (a.kind === "pattern" && b.kind === "pattern") return openingRank(b.pattern.openingFit) - openingRank(a.pattern.openingFit);
        return 0;
      });
  }, [allItems, genre, intent, subCategory, sOnly, query]);

  const selected = selectedKey ? allItems.find((item) => item.key === selectedKey) ?? null : null;
  const selectedDecision = selected ? decisions[selected.key] ?? (selected.kind === "pattern" ? selected.pattern.humanDecision : "NONE") : "NONE";
  const adoptedCount = allItems.filter((item) => (decisions[item.key] ?? (item.kind === "pattern" ? item.pattern.humanDecision : "NONE")) === "FAVORITE").length;
  const related = selected ? relatedItemsFor(selected, allItems) : [];

  function selectDecision(key: string, value: DecisionValue) {
    setDecisions((current) => ({ ...current, [key]: value }));
  }

  return (
    <div>
      <Header title="映像Pinterest" description="画像 / テキスト / エフェクト / 画像＋テキスト。まず実例を見て、気になったものだけ開く。" />

      <section className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="4大ジャンル">
        {genreOptions.map(([value, label, description]) => {
          const count = value === "ALL" ? allItems.length : genreCounts[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setGenre(value);
                setSubCategory("ALL");
                if (value !== "ALL") setSOnly(false);
              }}
              className={`rounded-xl border p-3 text-left transition ${genre === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-200 bg-white text-navy-800 hover:border-navy-400 dark:border-navy-700 dark:bg-navy-800 dark:text-sand-100"} ${value === "IMAGE_TEXT" ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between gap-2"><span className="text-sm font-black">{label}</span><span className="text-[10px] opacity-60">{count}</span></div>
              <p className="mt-1 line-clamp-2 text-[9px] leading-4 opacity-65">{description}</p>
            </button>
          );
        })}
      </section>

      <section className="sticky top-0 z-20 -mx-4 mb-4 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:border">
        <div className="flex items-center gap-2">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：写真 ズーム / 文字 シュッ / スタンプ / 地名" className="min-w-0 flex-1 rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-500 dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100" />
          <button type="button" disabled={genre === "IMAGE_TEXT"} onClick={() => setSOnly((value) => !value)} className={`shrink-0 rounded-full border px-3 py-2.5 text-xs font-black ${sOnly ? "border-amber-400 bg-amber-400 text-navy-950" : "border-amber-300 bg-white text-amber-700 dark:border-amber-700 dark:bg-navy-900 dark:text-amber-300"} disabled:cursor-not-allowed disabled:opacity-35`}>Sのみ</button>
          <Link to="/movie-coach/motion-library" className="hidden shrink-0 rounded-full border border-sand-300 bg-white px-3 py-2.5 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200 sm:inline-flex">選定一覧</Link>
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1" aria-label="やりたいことから探す">
          {intentOptions.map(([value, label]) => <button key={value} type="button" onClick={() => setIntent(value)} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${intent === value ? "border-sky-700 bg-sky-700 text-white" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"}`}>{label}</button>)}
        </div>

        <details className="mt-2">
          <summary className="cursor-pointer text-[10px] font-semibold text-navy-400">細かいタグで絞る（4大ジャンルの下位タグ）</summary>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            <button type="button" onClick={() => setSubCategory("ALL")} className={`shrink-0 text-[10px] font-semibold ${subCategory === "ALL" ? "text-navy-900 underline underline-offset-4 dark:text-sand-100" : "text-navy-400"}`}>すべて</button>
            {subCategories.map((value) => <button key={value} type="button" onClick={() => setSubCategory(value)} className={`shrink-0 text-[10px] font-semibold ${subCategory === value ? "text-navy-900 underline underline-offset-4 dark:text-sand-100" : "text-navy-400"}`}>{categoryLabels[value]}</button>)}
          </div>
        </details>

        <p className="mt-2 text-[10px] text-navy-400">表示 {filteredItems.length} / 全{allItems.length} · 画像＋テキストは97件の既存Director Recipeから実在する組み合わせだけを抽出</p>
      </section>

      <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900 dark:bg-amber-950/20">
        <p className="text-xs text-navy-700 dark:text-navy-200"><span className="font-bold">採用候補 {adoptedCount}件</span> <span className="text-navy-400">/ 目安4〜8</span></p>
        <Link to="/movie-coach/motion-library" className="text-[10px] font-semibold text-amber-800 underline underline-offset-2 dark:text-amber-200">基礎モーション選定を見る</Link>
      </div>

      <section className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6" aria-label="映像演出グリッド">
        {filteredItems.map((item) => {
          const isS = item.kind === "pattern" && openingSPicks.has(item.pattern.id);
          const currentDecision = decisions[item.key] ?? (item.kind === "pattern" ? item.pattern.humanDecision : "NONE");
          return (
            <article key={item.key} className="min-w-0">
              <button type="button" onClick={() => setSelectedKey(item.key)} className="group block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-sand-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-navy-800 dark:ring-navy-700">
                <div className="relative aspect-video overflow-hidden bg-navy-950">
                  <div className="h-full w-full transition duration-300 group-hover:scale-[1.02]">
                    {item.kind === "pattern" ? <PreviewMedia pattern={item.pattern} compact /> : <RecipeElementPreview recipe={item.recipe} patterns={allPatterns} />}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5 opacity-80" />
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-navy-950 shadow-sm">{genreLabel(item.genre)}</span>
                  {isS && <span className="absolute left-2 top-8 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-black text-navy-950 shadow-sm">S</span>}
                  {currentDecision !== "NONE" && <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[9px] font-bold text-white backdrop-blur">{decisionLabel(currentDecision)}</span>}
                </div>
                <div className="px-2.5 pb-3 pt-2.5 sm:px-3">
                  <h2 className="line-clamp-2 text-[12px] font-bold leading-[1.45] text-navy-900 dark:text-sand-100 sm:text-[13px]">{item.kind === "pattern" ? item.pattern.japaneseName : item.recipe.purpose}</h2>
                  {item.kind === "pattern" ? (
                    <><p className="mt-1 text-[10px] font-semibold tracking-tight text-amber-600 dark:text-amber-300">{recommendationStars(item.pattern.openingFit)}</p><p className="mt-1 line-clamp-2 text-[10px] leading-4 text-navy-500 dark:text-navy-300">{item.pattern.looksLike}</p></>
                  ) : (
                    <><p className="mt-1 line-clamp-1 text-[9px] font-semibold text-sky-700 dark:text-sky-300">{item.recipe.label}</p><p className="mt-1 text-[9px] text-navy-400">複合レシピ · {getDirectorRecipeVisualAudit(item.recipe).fidelity}</p></>
                  )}
                </div>
              </button>
            </article>
          );
        })}
      </section>

      {filteredItems.length === 0 && <div className="py-16 text-center text-sm text-navy-400">条件に合う演出がありません。ジャンルかフィルタを戻してください。</div>}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={() => setSelectedKey(null)}>
          <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-navy-900 md:max-w-5xl md:rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-900/95">
              <div className="min-w-0"><p className="truncate text-sm font-bold text-navy-900 dark:text-sand-100">{selected.kind === "pattern" ? selected.pattern.japaneseName : selected.recipe.purpose}</p><p className="text-[10px] text-navy-400">{genreLabel(selected.genre)}</p></div>
              <button type="button" onClick={() => setSelectedKey(null)} className="ml-3 rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>

            {selected.kind === "pattern" ? (
              <div className="grid md:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)]">
                <div className="bg-black"><div className="aspect-video"><PreviewMedia pattern={selected.pattern} /></div></div>
                <div className="p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-sand-300 px-2.5 py-1 text-[10px] font-black text-navy-700 dark:border-navy-600 dark:text-navy-200">{genreLabel(selected.genre)}</span>{openingSPicks.has(selected.pattern.id) && <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-navy-950">S · 今回のOP推し</span>}<span className="text-xs font-semibold text-amber-600 dark:text-amber-300">{recommendationStars(selected.pattern.openingFit)}</span></div>
                  {openingSPicks.has(selected.pattern.id) && <div className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100"><span className="font-bold">Sの理由：</span>{sReason(selected.pattern.id, selected.pattern.categories)}</div>}
                  <p className="mt-4 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.pattern.naturalDescription}</p>
                  <div className="mt-4"><p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">今回のOPならここ</p><div className="mt-2 flex flex-wrap gap-1.5">{sectionLabels(selected.pattern.openingSections).map((label) => <span key={label} className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-800 dark:border-sky-900 dark:bg-sky-950/20 dark:text-sky-200">{label}</span>)}</div></div>
                  <DecisionButtons value={selectedDecision} onSelect={(value) => selectDecision(selected.key, value)} />
                  <RelatedItems items={related} patterns={allPatterns} onSelect={setSelectedKey} />
                  <details className="mt-5 border-t border-sand-200 pt-4 dark:border-navy-700"><summary className="cursor-pointer text-xs font-bold text-navy-700 dark:text-navy-200">名前・検索語・DaVinci情報を見る</summary><div className="mt-3 space-y-3 text-xs leading-5 text-navy-600 dark:text-navy-300"><p><span className="font-bold">検索：</span>{[selected.pattern.commonName, ...selected.pattern.aliases].slice(0, 8).join(" / ")}</p><p><span className="font-bold">用途：</span>{selected.pattern.goodFor.join(" / ")}</p><p><span className="font-bold">DaVinci：</span>{(() => { const implementation = getPatternImplementation(selected.pattern); return implementation ? `${implementation.kind} · ${implementation.status} · ${implementation.method}` : "未整理"; })()}</p></div></details>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.9fr)]">
                <div className="bg-navy-950"><div className="aspect-video"><RecipeElementPreview recipe={selected.recipe} patterns={allPatterns} /></div></div>
                <div className="p-4 md:p-5">
                  <div className="flex flex-wrap gap-2"><span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-black text-sky-900 dark:bg-sky-950 dark:text-sky-100">画像＋テキスト</span><span className="rounded-full border border-sand-300 px-2.5 py-1 text-[10px] text-navy-600 dark:border-navy-600 dark:text-navy-300">visual {getDirectorRecipeVisualAudit(selected.recipe).fidelity}</span></div>
                  <p className="mt-3 text-[11px] font-semibold text-navy-400">{selected.recipe.label}</p>
                  <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.recipe.purpose}</p>
                  <div className="mt-4 rounded-xl bg-sand-50 p-3 text-xs leading-5 text-navy-700 dark:bg-navy-800 dark:text-navy-200"><span className="font-bold">なぜ効く？</span><br />{selected.recipe.whyItWorks}</div>
                  <div className="mt-4"><p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">組み合わせている演出</p><div className="mt-2 flex flex-wrap gap-1.5">{recipePatternNames(selected.recipe, allPatterns).map((name) => <span key={name} className="rounded-full border border-sand-200 px-2 py-1 text-[10px] text-navy-600 dark:border-navy-700 dark:text-navy-300">{name}</span>)}</div></div>
                  <DecisionButtons value={selectedDecision} onSelect={(value) => selectDecision(selected.key, value)} />
                  <RelatedItems items={related} patterns={allPatterns} onSelect={setSelectedKey} />
                  <details className="mt-5 border-t border-sand-200 pt-4 dark:border-navy-700"><summary className="cursor-pointer text-xs font-bold text-navy-700 dark:text-navy-200">制作情報を見る</summary><div className="mt-3 space-y-3 text-xs leading-5 text-navy-600 dark:text-navy-300"><p><span className="font-bold">避ける時：</span>{selected.recipe.avoidWhen}</p><p><span className="font-bold">DaVinci：</span>{selected.recipe.davinciSkills.join(" / ")}</p><p><span className="font-bold">render：</span><code>pnpm render:director-recipe {selected.recipe.id}</code></p><Link to="/movie-coach/director-recipes" className="inline-block font-semibold text-sky-700 underline dark:text-sky-300">97件の演出レシピ詳細を開く</Link></div></details>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DecisionButtons({ value, onSelect }: { value: DecisionValue; onSelect: (value: DecisionValue) => void }) {
  return (
    <div className="mt-5">
      <p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">これどうする？</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {(["FAVORITE", "MAYBE", "REJECT"] as const).map((option) => <button key={option} type="button" onClick={() => onSelect(option)} className={`rounded-lg border px-2 py-2.5 text-[11px] font-bold ${value === option ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}>{option === "FAVORITE" ? "✅ 採用候補" : option === "MAYBE" ? "🤔 保留" : "× 使わない"}</button>)}
      </div>
    </div>
  );
}

function RelatedItems({ items, patterns, onSelect }: { items: PinterestItem[]; patterns: MotionPatternRecord[]; onSelect: (key: string) => void }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-5 border-t border-sand-200 pt-4 dark:border-navy-700">
      <p className="text-[10px] font-bold tracking-[0.14em] text-navy-400">似ている演出</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {items.map((item) => (
          <button key={item.key} type="button" onClick={() => onSelect(item.key)} className="overflow-hidden rounded-lg border border-sand-200 bg-white text-left dark:border-navy-700 dark:bg-navy-800">
            <div className="aspect-video bg-navy-950"><RelatedPreview item={item} patterns={patterns} /></div>
            <p className="line-clamp-2 px-2 py-1.5 text-[9px] font-semibold leading-3.5 text-navy-700 dark:text-navy-200">{item.kind === "pattern" ? item.pattern.japaneseName : item.recipe.purpose}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
