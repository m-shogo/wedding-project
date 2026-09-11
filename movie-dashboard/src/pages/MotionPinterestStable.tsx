import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  getPatternPreview,
  searchMotionPatterns,
  type MotionPatternRecord,
} from "../data/visualMotionLibrary";
import { directorRecipeCatalog, type DirectorRecipe } from "../data/directorRecipeCatalog";

type Genre = "ALL" | "IMAGE" | "TEXT" | "EFFECT" | "IMAGE_TEXT";
type Item =
  | { kind: "pattern"; key: string; genre: Exclude<Genre, "ALL">; pattern: MotionPatternRecord }
  | { kind: "recipe"; key: string; genre: "IMAGE_TEXT"; recipe: DirectorRecipe };

const genreMeta: Array<[Genre, string, string]> = [
  ["ALL", "全部", "4ジャンルをまとめて見る"],
  ["IMAGE", "画像", "写真・動画の動きと配置"],
  ["TEXT", "テキスト", "文字そのものの動き"],
  ["EFFECT", "エフェクト", "光・切替・線・スタンプなど"],
  ["IMAGE_TEXT", "画像＋テキスト", "写真・動画と文字を一体で見せる"],
];

const openingSPicks = new Set([
  "type-mask-reveal",
  "photo-small-push",
  "photo-directional-pan",
  "cut-match-shape",
  "whip-source-matched",
  "type-char-stagger",
]);

function openingRank(value: string) {
  return ({ "◎": 4, "○": 3, "△": 2, "×": 1 } as Record<string, number>)[value] ?? 0;
}

function stars(value: string) {
  if (value === "◎") return "★★★★★";
  if (value === "○") return "★★★★☆";
  if (value === "△") return "★★★☆☆";
  return "★☆☆☆☆";
}

function patternGenre(pattern: MotionPatternRecord): "IMAGE" | "TEXT" | "EFFECT" {
  if (pattern.id.startsWith("type-")) return "TEXT";
  if (pattern.id.startsWith("photo-")) return "IMAGE";
  return "EFFECT";
}

function isCompositeRecipe(recipe: DirectorRecipe) {
  const hasText = recipe.motionPresetIds.some((id) => id.startsWith("type-"));
  const hasImageOrEffect = recipe.motionPresetIds.some((id) =>
    id.startsWith("photo-") ||
    id.startsWith("cut-") ||
    id.startsWith("wipe-") ||
    id.startsWith("flash-") ||
    id.startsWith("whip-") ||
    id.startsWith("color-field-") ||
    id.startsWith("accent-"),
  );
  return hasText && hasImageOrEffect;
}

function normalizePresetId(id: string) {
  return id === "type-mask-slide" ? "type-mask-reveal" : id;
}

function safePreview(pattern: MotionPatternRecord) {
  try {
    return getPatternPreview(pattern);
  } catch {
    return null;
  }
}

function PatternPreview({ pattern, hover = true }: { pattern: MotionPatternRecord; hover?: boolean }) {
  const preview = safePreview(pattern);
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
      onMouseEnter={hover ? (event) => void event.currentTarget.play().catch(() => undefined) : undefined}
      onMouseLeave={hover ? (event) => {
        event.currentTarget.pause();
        event.currentTarget.currentTime = 0;
      } : undefined}
      className="h-full w-full object-cover"
    />
  );
}

function RecipePreview({ recipe, patterns }: { recipe: DirectorRecipe; patterns: MotionPatternRecord[] }) {
  const representative = recipe.motionPresetIds
    .map(normalizePresetId)
    .map((id) => patterns.find((pattern) => pattern.id === id))
    .find((pattern): pattern is MotionPatternRecord => Boolean(pattern && safePreview(pattern)?.assetPath));

  if (!representative) {
    return <div className="flex h-full items-center justify-center px-3 text-center text-[10px] leading-4 text-navy-300">画像＋テキスト<br />実render未配置</div>;
  }

  return (
    <div className="relative h-full w-full">
      <PatternPreview pattern={representative} />
      <div className="absolute inset-x-0 bottom-0 bg-black/75 px-2 py-1 text-[8px] font-semibold leading-3 text-white">
        構成要素プレビュー<br />複合完成画ではありません
      </div>
    </div>
  );
}

function itemSearchText(item: Item) {
  if (item.kind === "pattern") {
    return [item.pattern.japaneseName, item.pattern.commonName, item.pattern.looksLike, ...item.pattern.aliases].join(" ").toLowerCase();
  }
  return [item.recipe.label, item.recipe.subCategory, item.recipe.purpose, item.recipe.whyItWorks, ...item.recipe.motionPresetIds].join(" ").toLowerCase();
}

export function MotionPinterest() {
  const [genre, setGenre] = useState<Genre>("ALL");
  const [query, setQuery] = useState("");
  const [sOnly, setSOnly] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const patterns = useMemo(() => {
    try {
      return searchMotionPatterns("");
    } catch {
      return [];
    }
  }, []);

  const items = useMemo<Item[]>(() => {
    const basics: Item[] = patterns.map((pattern) => ({
      kind: "pattern",
      key: pattern.id,
      genre: patternGenre(pattern),
      pattern,
    }));
    const composites: Item[] = directorRecipeCatalog
      .filter(isCompositeRecipe)
      .map((recipe) => ({ kind: "recipe", key: `recipe:${recipe.id}`, genre: "IMAGE_TEXT", recipe }));
    return [...basics, ...composites];
  }, [patterns]);

  const counts = useMemo(() => {
    const result = { IMAGE: 0, TEXT: 0, EFFECT: 0, IMAGE_TEXT: 0 };
    for (const item of items) result[item.genre] += 1;
    return result;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((item) => genre === "ALL" || item.genre === genre)
      .filter((item) => !sOnly || (item.kind === "pattern" && openingSPicks.has(item.pattern.id)))
      .filter((item) => !q || itemSearchText(item).includes(q))
      .sort((a, b) => {
        const aS = a.kind === "pattern" && openingSPicks.has(a.pattern.id) ? 1 : 0;
        const bS = b.kind === "pattern" && openingSPicks.has(b.pattern.id) ? 1 : 0;
        if (aS !== bS) return bS - aS;
        const genreRank = { IMAGE_TEXT: 4, IMAGE: 3, TEXT: 2, EFFECT: 1 };
        if (a.genre !== b.genre) return genreRank[b.genre] - genreRank[a.genre];
        if (a.kind === "pattern" && b.kind === "pattern") return openingRank(b.pattern.openingFit) - openingRank(a.pattern.openingFit);
        return 0;
      });
  }, [items, genre, query, sOnly]);

  const selected = selectedKey ? items.find((item) => item.key === selectedKey) ?? null : null;

  return (
    <div>
      <Header
        title="映像Pinterest"
        description="画像 / テキスト / エフェクト / 画像＋テキスト。説明より先に、実例を見て選ぶ。"
      />

      <section className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {genreMeta.map(([value, label, description]) => {
          const count = value === "ALL" ? items.length : counts[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setGenre(value);
                if (value === "IMAGE_TEXT") setSOnly(false);
              }}
              className={`rounded-xl border p-3 text-left ${genre === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-200 bg-white text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-sand-100"} ${value === "IMAGE_TEXT" ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-black">{label}</span>
                <span className="text-[10px] opacity-60">{count}</span>
              </div>
              <p className="mt-1 text-[9px] leading-4 opacity-65">{description}</p>
            </button>
          );
        })}
      </section>

      <section className="sticky top-0 z-20 -mx-4 mb-4 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:border">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：ズーム / 文字 / スタンプ / 地名"
            className="min-w-0 flex-1 rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
          />
          <button
            type="button"
            disabled={genre === "IMAGE_TEXT"}
            onClick={() => setSOnly((value) => !value)}
            className={`shrink-0 rounded-full border px-3 py-2.5 text-xs font-black ${sOnly ? "border-amber-400 bg-amber-400 text-navy-950" : "border-amber-300 bg-white text-amber-700 dark:border-amber-700 dark:bg-navy-900 dark:text-amber-300"} disabled:opacity-35`}
          >
            Sのみ
          </button>
          <Link to="/movie-coach/motion-library" className="hidden shrink-0 rounded-full border border-sand-300 bg-white px-3 py-2.5 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200 sm:inline-flex">
            選定一覧
          </Link>
        </div>
        <p className="mt-2 text-[10px] text-navy-400">表示 {filtered.length} / 全{items.length}</p>
      </section>

      {items.length === 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-800 dark:border-red-900 dark:bg-red-950/20 dark:text-red-200">
          図鑑データを読み込めませんでした。ページ全体を白画面にはせず、このエラーを表示する設計に変更済みです。
        </div>
      )}

      <section className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6">
        {filtered.map((item) => {
          const isS = item.kind === "pattern" && openingSPicks.has(item.pattern.id);
          return (
            <article key={item.key} className="min-w-0">
              <button
                type="button"
                onClick={() => setSelectedKey(item.key)}
                className="group block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-sand-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-navy-800 dark:ring-navy-700"
              >
                <div className="relative aspect-video overflow-hidden bg-navy-950">
                  {item.kind === "pattern" ? <PatternPreview pattern={item.pattern} /> : <RecipePreview recipe={item.recipe} patterns={patterns} />}
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-navy-950">
                    {item.genre === "IMAGE" ? "画像" : item.genre === "TEXT" ? "テキスト" : item.genre === "EFFECT" ? "エフェクト" : "画像＋テキスト"}
                  </span>
                  {isS && <span className="absolute left-2 top-8 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-black text-navy-950">S</span>}
                </div>
                <div className="px-2.5 pb-3 pt-2.5 sm:px-3">
                  <h2 className="line-clamp-2 text-[12px] font-bold leading-[1.45] text-navy-900 dark:text-sand-100 sm:text-[13px]">
                    {item.kind === "pattern" ? item.pattern.japaneseName : item.recipe.purpose}
                  </h2>
                  {item.kind === "pattern" ? (
                    <p className="mt-1 text-[10px] font-semibold text-amber-600 dark:text-amber-300">{stars(item.pattern.openingFit)}</p>
                  ) : (
                    <p className="mt-1 line-clamp-1 text-[9px] font-semibold text-sky-700 dark:text-sky-300">{item.recipe.label}</p>
                  )}
                </div>
              </button>
            </article>
          );
        })}
      </section>

      {filtered.length === 0 && items.length > 0 && (
        <div className="py-16 text-center text-sm text-navy-400">条件に合う演出がありません。検索またはジャンルを戻してください。</div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 md:items-center md:p-6" onClick={() => setSelectedKey(null)}>
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-navy-900 md:max-w-4xl md:rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3 dark:border-navy-700">
              <p className="text-sm font-bold text-navy-900 dark:text-sand-100">
                {selected.kind === "pattern" ? selected.pattern.japaneseName : selected.recipe.label}
              </p>
              <button type="button" onClick={() => setSelectedKey(null)} className="rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>
            <div className="grid md:grid-cols-[1.35fr_0.85fr]">
              <div className="aspect-video bg-black">
                {selected.kind === "pattern" ? <PatternPreview pattern={selected.pattern} hover={false} /> : <RecipePreview recipe={selected.recipe} patterns={patterns} />}
              </div>
              <div className="p-4 md:p-5">
                {selected.kind === "pattern" ? (
                  <>
                    <p className="text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.pattern.naturalDescription}</p>
                    <p className="mt-3 text-xs text-navy-500 dark:text-navy-300">検索名: {[selected.pattern.commonName, ...selected.pattern.aliases].slice(0, 7).join(" / ")}</p>
                  </>
                ) : (
                  <>
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-black text-sky-900 dark:bg-sky-950 dark:text-sky-100">画像＋テキスト</span>
                    <p className="mt-3 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.recipe.purpose}</p>
                    <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">{selected.recipe.whyItWorks}</p>
                    <p className="mt-4 text-[10px] text-navy-400">構成: {selected.recipe.motionPresetIds.map(normalizePresetId).join(" / ")}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
