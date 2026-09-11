import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Genre = "ALL" | "IMAGE" | "TEXT" | "EFFECT" | "IMAGE_TEXT";

type Pattern = {
  id: string;
  japaneseName: string;
  commonName: string;
  aliases: string[];
  looksLike: string;
  naturalDescription: string;
  openingFit: "◎" | "○" | "△" | "×";
  previewIds: string[];
};

type Preview = {
  id: string;
  patternId: string;
  assetPath: string | null;
  posterPath: string | null;
};

type Recipe = {
  id: string;
  label: string;
  purpose: string;
  whyItWorks: string;
  motionPresetIds: string[];
};

type Item =
  | { kind: "pattern"; key: string; genre: "IMAGE" | "TEXT" | "EFFECT"; pattern: Pattern }
  | { kind: "recipe"; key: string; genre: "IMAGE_TEXT"; recipe: Recipe };

const openingSPicks = new Set([
  "type-mask-reveal",
  "photo-small-push",
  "photo-directional-pan",
  "cut-match-shape",
  "whip-source-matched",
  "type-char-stagger",
]);

const genres: Array<[Genre, string, string]> = [
  ["ALL", "全部", "4ジャンルをまとめて見る"],
  ["IMAGE", "画像", "写真・動画の動きと配置"],
  ["TEXT", "テキスト", "文字そのものの動き"],
  ["EFFECT", "エフェクト", "光・切替・線・スタンプなど"],
  ["IMAGE_TEXT", "画像＋テキスト", "写真・動画と文字を一体で見せる"],
];

function patternGenre(id: string): "IMAGE" | "TEXT" | "EFFECT" {
  if (id.startsWith("type-")) return "TEXT";
  if (id.startsWith("photo-")) return "IMAGE";
  return "EFFECT";
}

function normalizePresetId(id: string) {
  return id === "type-mask-slide" ? "type-mask-reveal" : id;
}

function isCompositeRecipe(recipe: Recipe) {
  const ids = recipe.motionPresetIds.map(normalizePresetId);
  const hasText = ids.some((id) => id.startsWith("type-"));
  const hasVisual = ids.some((id) => !id.startsWith("type-"));
  return hasText && hasVisual;
}

function stars(value: Pattern["openingFit"]) {
  if (value === "◎") return "★★★★★";
  if (value === "○") return "★★★★☆";
  if (value === "△") return "★★★☆☆";
  return "★☆☆☆☆";
}

function rank(value: Pattern["openingFit"]) {
  return value === "◎" ? 4 : value === "○" ? 3 : value === "△" ? 2 : 1;
}

function previewFor(pattern: Pattern, previews: Preview[]) {
  return previews.find((preview) => pattern.previewIds.includes(preview.id))
    ?? previews.find((preview) => preview.patternId === pattern.id)
    ?? null;
}

function PatternMedia({ pattern, previews }: { pattern: Pattern; previews: Preview[] }) {
  const preview = previewFor(pattern, previews);
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
      onMouseEnter={(event) => void event.currentTarget.play().catch(() => undefined)}
      onMouseLeave={(event) => {
        event.currentTarget.pause();
        event.currentTarget.currentTime = 0;
      }}
      className="h-full w-full object-cover"
    />
  );
}

export function MotionPinterest() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [basicError, setBasicError] = useState<string | null>(null);
  const [recipeError, setRecipeError] = useState<string | null>(null);
  const [genre, setGenre] = useState<Genre>("ALL");
  const [query, setQuery] = useState("");
  const [sOnly, setSOnly] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      const [motionResult, recipeResult] = await Promise.allSettled([
        import("../data/visualMotionLibrary"),
        import("../data/directorRecipeCatalog"),
      ]);

      if (!alive) return;

      if (motionResult.status === "fulfilled") {
        setPatterns(motionResult.value.motionPatterns as Pattern[]);
        setPreviews(motionResult.value.motionPreviews as Preview[]);
      } else {
        setBasicError(String(motionResult.reason));
      }

      if (recipeResult.status === "fulfilled") {
        setRecipes((recipeResult.value.directorRecipeCatalog as Recipe[]).filter(isCompositeRecipe));
      } else {
        setRecipeError(String(recipeResult.reason));
      }

      setLoading(false);
    }

    void load();
    return () => {
      alive = false;
    };
  }, []);

  const items = useMemo<Item[]>(() => [
    ...patterns.map((pattern) => ({
      kind: "pattern" as const,
      key: pattern.id,
      genre: patternGenre(pattern.id),
      pattern,
    })),
    ...recipes.map((recipe) => ({
      kind: "recipe" as const,
      key: `recipe:${recipe.id}`,
      genre: "IMAGE_TEXT" as const,
      recipe,
    })),
  ], [patterns, recipes]);

  const counts = useMemo(() => {
    const result = { IMAGE: 0, TEXT: 0, EFFECT: 0, IMAGE_TEXT: 0 };
    for (const item of items) result[item.genre] += 1;
    return result;
  }, [items]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items
      .filter((item) => genre === "ALL" || item.genre === genre)
      .filter((item) => !sOnly || (item.kind === "pattern" && openingSPicks.has(item.pattern.id)))
      .filter((item) => {
        if (!normalized) return true;
        const text = item.kind === "pattern"
          ? [item.pattern.japaneseName, item.pattern.commonName, item.pattern.looksLike, ...item.pattern.aliases].join(" ")
          : [item.recipe.label, item.recipe.purpose, item.recipe.whyItWorks, ...item.recipe.motionPresetIds].join(" ");
        return text.toLowerCase().includes(normalized);
      })
      .sort((a, b) => {
        const aS = a.kind === "pattern" && openingSPicks.has(a.pattern.id) ? 1 : 0;
        const bS = b.kind === "pattern" && openingSPicks.has(b.pattern.id) ? 1 : 0;
        if (aS !== bS) return bS - aS;
        if (a.kind === "pattern" && b.kind === "pattern") return rank(b.pattern.openingFit) - rank(a.pattern.openingFit);
        return 0;
      });
  }, [items, genre, query, sOnly]);

  const selected = selectedKey ? items.find((item) => item.key === selectedKey) ?? null : null;

  return (
    <div>
      <div className="mb-5 border-b border-sand-200 pb-4 dark:border-navy-700">
        <p className="text-[10px] font-black tracking-[0.2em] text-sky-600 dark:text-sky-300">MOTION ZUKAN</p>
        <h1 className="mt-1 text-2xl font-black text-navy-900 dark:text-sand-100">映像Pinterest</h1>
        <p className="mt-1 text-xs leading-5 text-navy-500 dark:text-navy-300">画像 / テキスト / エフェクト / 画像＋テキスト。説明より先に実例を見て選ぶ。</p>
      </div>

      <section className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {genres.map(([value, label, description]) => {
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
              <p className="mt-1 text-[9px] leading-4 opacity-70">{description}</p>
            </button>
          );
        })}
      </section>

      <section className="mb-4 rounded-xl border border-sand-200 bg-white p-3 dark:border-navy-700 dark:bg-navy-800">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：ズーム / 文字 / スタンプ / 地名"
            className="min-w-0 flex-1 rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100"
          />
          <button
            type="button"
            disabled={genre === "IMAGE_TEXT"}
            onClick={() => setSOnly((value) => !value)}
            className={`shrink-0 rounded-full border px-3 py-2.5 text-xs font-black ${sOnly ? "border-amber-400 bg-amber-400 text-navy-950" : "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300"} disabled:opacity-30`}
          >
            Sのみ
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-navy-400">
          <span>{loading ? "図鑑データを読み込み中…" : `表示 ${filtered.length} / 全${items.length}`}</span>
          <Link to="/movie-coach/motion-library" className="font-semibold underline underline-offset-2">選定一覧</Link>
        </div>
      </section>

      {basicError && (
        <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-4 text-xs leading-5 text-red-800 dark:border-red-900 dark:bg-red-950/20 dark:text-red-200">
          <p className="font-black">基礎モーションの読み込みに失敗しました</p>
          <pre className="mt-2 whitespace-pre-wrap break-words">{basicError}</pre>
        </div>
      )}

      {recipeError && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-200">
          <p className="font-black">画像＋テキストの追加レシピだけ読み込めませんでした</p>
          <pre className="mt-2 whitespace-pre-wrap break-words">{recipeError}</pre>
        </div>
      )}

      {loading && items.length === 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-sand-200 bg-white dark:border-navy-700 dark:bg-navy-800">
              <div className="aspect-video animate-pulse bg-navy-100 dark:bg-navy-700" />
              <div className="space-y-2 p-3"><div className="h-3 animate-pulse rounded bg-navy-100 dark:bg-navy-700" /><div className="h-2 w-2/3 animate-pulse rounded bg-navy-100 dark:bg-navy-700" /></div>
            </div>
          ))}
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6">
          {filtered.map((item) => {
            const isS = item.kind === "pattern" && openingSPicks.has(item.pattern.id);
            return (
              <article key={item.key} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setSelectedKey(item.key)}
                  className="block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-sand-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-navy-800 dark:ring-navy-700"
                >
                  <div className="relative aspect-video overflow-hidden bg-navy-900">
                    {item.kind === "pattern" ? (
                      <PatternMedia pattern={item.pattern} previews={previews} />
                    ) : (
                      <div className="flex h-full items-center justify-center px-4 text-center text-[10px] leading-4 text-navy-200">
                        画像＋テキスト<br />複合レシピ
                      </div>
                    )}
                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-navy-950">
                      {item.genre === "IMAGE" ? "画像" : item.genre === "TEXT" ? "テキスト" : item.genre === "EFFECT" ? "エフェクト" : "画像＋テキスト"}
                    </span>
                    {isS && <span className="absolute left-2 top-8 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-black text-navy-950">S</span>}
                  </div>
                  <div className="px-2.5 pb-3 pt-2.5">
                    <h2 className="line-clamp-2 text-[12px] font-bold leading-[1.45] text-navy-900 dark:text-sand-100">
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
      )}

      {!loading && filtered.length === 0 && !basicError && (
        <div className="py-16 text-center text-sm text-navy-400">条件に合う演出がありません。</div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 md:items-center md:p-6" onClick={() => setSelectedKey(null)}>
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-xl dark:bg-navy-900 md:max-w-3xl md:rounded-2xl md:p-5" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black text-sky-600 dark:text-sky-300">{selected.genre === "IMAGE" ? "画像" : selected.genre === "TEXT" ? "テキスト" : selected.genre === "EFFECT" ? "エフェクト" : "画像＋テキスト"}</p>
                <h2 className="mt-1 text-lg font-black text-navy-900 dark:text-sand-100">{selected.kind === "pattern" ? selected.pattern.japaneseName : selected.recipe.label}</h2>
              </div>
              <button type="button" onClick={() => setSelectedKey(null)} className="rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>
            <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-navy-950">
              {selected.kind === "pattern" ? <PatternMedia pattern={selected.pattern} previews={previews} /> : <div className="flex h-full items-center justify-center text-sm text-navy-200">複合完成renderは未配置</div>}
            </div>
            <p className="mt-4 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.kind === "pattern" ? selected.pattern.naturalDescription : selected.recipe.purpose}</p>
            {selected.kind === "recipe" && <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">{selected.recipe.whyItWorks}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
