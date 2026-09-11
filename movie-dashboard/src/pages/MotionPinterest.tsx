import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { externalMotionAtlas } from "../data/externalMotionAtlasRuntime";
import type {
  ExternalMotionAtlasItem,
  ExternalMotionGenre,
  ExternalMotionMediaType,
} from "../data/externalMotionAtlas";

type Genre = "ALL" | ExternalMotionGenre;
type Media = "ALL" | ExternalMotionMediaType;

const genres: Array<[Genre, string]> = [
  ["ALL", "全部"],
  ["IMAGE", "画像"],
  ["TEXT", "テキスト"],
  ["EFFECT", "エフェクト"],
  ["IMAGE_TEXT", "画像＋テキスト"],
];

const mediaFilters: Array<[Media, string]> = [
  ["ALL", "全部"],
  ["GIF", "GIF"],
  ["YOUTUBE", "YouTube"],
  ["VIDEO_PAGE", "動画ページ"],
  ["IMAGE", "画像"],
];

function genreLabel(value: ExternalMotionGenre) {
  return value === "IMAGE" ? "画像" : value === "TEXT" ? "テキスト" : value === "EFFECT" ? "エフェクト" : "画像＋テキスト";
}

function mediaLabel(value: ExternalMotionMediaType) {
  return value === "GIF" ? "GIF" : value === "YOUTUBE" ? "YouTube" : value === "IMAGE" ? "画像" : "動画ページ";
}

function difficulty(value: 1 | 2 | 3) {
  return `${"★".repeat(value)}${"☆".repeat(3 - value)}`;
}

function Preview({ item, large = false }: { item: ExternalMotionAtlasItem; large?: boolean }) {
  if (item.mediaType === "YOUTUBE" && item.youtubeId) {
    return (
      <iframe
        title={item.titleOriginal}
        src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }

  if ((item.mediaType === "GIF" || item.mediaType === "IMAGE") && item.previewUrl) {
    return (
      <img
        src={item.previewUrl}
        alt={item.titleJa}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`h-full w-full ${large ? "object-contain" : "object-cover"}`}
      />
    );
  }

  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="flex h-full w-full flex-col items-center justify-center bg-navy-900 px-4 text-center text-white hover:bg-navy-800"
    >
      <span className="text-[10px] font-bold tracking-[0.12em] text-sand-300">{item.sourceName}</span>
      <span className="mt-2 text-sm font-black">実動画を見る ↗</span>
      <span className="mt-1 text-[9px] text-white/60">外部の実在ページ</span>
    </a>
  );
}

export function MotionPinterest() {
  const [genre, setGenre] = useState<Genre>("ALL");
  const [media, setMedia] = useState<Media>("ALL");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const result: Record<ExternalMotionGenre, number> = { IMAGE: 0, TEXT: 0, EFFECT: 0, IMAGE_TEXT: 0 };
    for (const item of externalMotionAtlas) result[item.genre] += 1;
    return result;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return externalMotionAtlas.filter((item) => {
      if (genre !== "ALL" && item.genre !== genre) return false;
      if (media !== "ALL" && item.mediaType !== media) return false;
      if (!q) return true;
      return [item.titleJa, item.titleOriginal, item.sourceName, item.descriptionJa, ...item.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [genre, media, query]);

  const selected = selectedId ? externalMotionAtlas.find((item) => item.id === selectedId) ?? null : null;
  const resetFilters = () => {
    setGenre("ALL");
    setMedia("ALL");
    setQuery("");
  };

  return (
    <div>
      <Header
        title="映像Pinterest / 外部実例図鑑"
        description="実在する GIF・YouTube・動画・画像だけ。画像 / テキスト / エフェクト / 画像＋テキストで見比べる。"
      />

      <section className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {genres.map(([value, label]) => {
          const count = value === "ALL" ? externalMotionAtlas.length : counts[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => setGenre(value)}
              className={`rounded-xl border p-3 text-left ${genre === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-200 bg-white text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-sand-100"} ${value === "IMAGE_TEXT" ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-black">{label}</span>
                <span className="text-[10px] opacity-60">{count}</span>
              </div>
            </button>
          );
        })}
      </section>

      <section className="sticky top-0 z-20 -mx-4 mb-5 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:rounded-xl md:border">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例：旅行 / 地名 / コラージュ / 紙 / グリッチ / パララックス"
          className="w-full rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
        />
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {mediaFilters.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMedia(value)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold ${media === value ? "border-sky-700 bg-sky-700 text-white" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-[10px] text-navy-400">表示 {filtered.length} / 外部実例 {externalMotionAtlas.length}件 · 自作モーション 0件</p>
          {(genre !== "ALL" || media !== "ALL" || query) && (
            <button type="button" onClick={resetFilters} className="shrink-0 text-[10px] font-bold text-sky-700 dark:text-sky-300">絞り込み解除</button>
          )}
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-sand-300 bg-white px-5 py-10 text-center dark:border-navy-700 dark:bg-navy-900">
          <p className="text-sm font-black text-navy-900 dark:text-sand-100">この条件では実例が見つかりません</p>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">検索語を短くするか、分類・媒体の絞り込みを外すと候補を広げられます。</p>
          <button type="button" onClick={resetFilters} className="mt-4 rounded-full bg-sky-700 px-4 py-2 text-xs font-black text-white">全部の実例へ戻す</button>
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-x-2.5 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6">
          {filtered.map((item) => (
            <article key={item.id} className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-sand-200 dark:bg-navy-800 dark:ring-navy-700">
              <div className="relative aspect-video overflow-hidden bg-navy-950">
                <Preview item={item} />
                <div className="pointer-events-none absolute left-2 top-2 flex gap-1">
                  <span className="rounded-full bg-white/95 px-2 py-1 text-[9px] font-black text-navy-950">{genreLabel(item.genre)}</span>
                  <span className="rounded-full bg-black/70 px-2 py-1 text-[9px] font-bold text-white">{mediaLabel(item.mediaType)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2.5 py-1.5 text-[9px] font-black text-navy-950 shadow-sm backdrop-blur hover:bg-white"
                  aria-label={`${item.titleJa}の詳細を見る`}
                >
                  詳しく
                </button>
              </div>
              <div className="p-3">
                <button type="button" onClick={() => setSelectedId(item.id)} className="block w-full text-left">
                  <h2 className="line-clamp-2 text-[12px] font-black leading-[1.5] text-navy-900 dark:text-sand-100 sm:text-[13px]">{item.titleJa}</h2>
                  <p className="mt-1 line-clamp-1 text-[9px] text-navy-400">{item.titleOriginal}</p>
                  <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-navy-600 dark:text-navy-300">{item.descriptionJa}</p>
                </button>
                <div className="mt-3 flex items-end justify-between gap-2 border-t border-sand-100 pt-2 dark:border-navy-700">
                  <div>
                    <p className="text-[9px] text-navy-400">難易度</p>
                    <p className="text-[11px] font-bold text-amber-600 dark:text-amber-300">{difficulty(item.difficulty)}</p>
                  </div>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-full border border-sand-300 px-2.5 py-1.5 text-[9px] font-bold text-navy-700 dark:border-navy-600 dark:text-navy-200">元URL ↗</a>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 md:items-center md:p-6" onClick={() => setSelectedId(null)}>
          <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-navy-900 md:max-w-5xl md:rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3 dark:border-navy-700">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-navy-900 dark:text-sand-100">{selected.titleJa}</p>
                <p className="truncate text-[10px] text-navy-400">{selected.sourceName} · {mediaLabel(selected.mediaType)}</p>
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="ml-3 rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>
            <div className="grid md:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
              <div className="aspect-video bg-black"><Preview item={selected} large /></div>
              <div className="p-4 md:p-5">
                <p className="text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.descriptionJa}</p>
                <p className="mt-4 text-sm font-black text-amber-600 dark:text-amber-300">難易度 {difficulty(selected.difficulty)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-sand-200 px-2 py-1 text-[10px] text-navy-500 dark:border-navy-700 dark:text-navy-300">#{tag}</span>)}
                </div>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-sky-700 px-4 py-3 text-sm font-black text-white">元の実例を開く ↗</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
