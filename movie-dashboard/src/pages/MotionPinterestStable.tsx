import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import {
  externalMotionAtlas,
  type ExternalMotionAtlasItem,
  type ExternalMotionGenre,
  type ExternalMotionMediaType,
} from "../data/externalMotionAtlas";

type GenreFilter = "ALL" | ExternalMotionGenre;
type MediaFilter = "ALL" | ExternalMotionMediaType;

const genreMeta: Array<[GenreFilter, string, string]> = [
  ["ALL", "全部", "外部実例をまとめて見る"],
  ["IMAGE", "画像", "写真・動画そのものの動き"],
  ["TEXT", "テキスト", "文字だけで成立する演出"],
  ["EFFECT", "エフェクト", "光・ノイズ・切替など"],
  ["IMAGE_TEXT", "画像＋テキスト", "写真/動画と文字を一体で見せる"],
];

const mediaMeta: Array<[MediaFilter, string]> = [
  ["ALL", "すべての形式"],
  ["GIF", "GIF"],
  ["YOUTUBE", "YouTube"],
  ["VIDEO_PAGE", "動画ページ"],
  ["IMAGE", "画像"],
];

function genreLabel(genre: ExternalMotionGenre) {
  if (genre === "IMAGE") return "画像";
  if (genre === "TEXT") return "テキスト";
  if (genre === "EFFECT") return "エフェクト";
  return "画像＋テキスト";
}

function mediaLabel(mediaType: ExternalMotionMediaType) {
  if (mediaType === "YOUTUBE") return "YouTube";
  if (mediaType === "GIF") return "GIF";
  if (mediaType === "IMAGE") return "画像";
  return "動画ページ";
}

function difficultyStars(level: 1 | 2 | 3) {
  return `${"★".repeat(level)}${"☆".repeat(3 - level)}`;
}

function Preview({ item, large = false }: { item: ExternalMotionAtlasItem; large?: boolean }) {
  if (item.mediaType === "YOUTUBE" && item.youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
        title={item.titleOriginal}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
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
      className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700 px-4 text-center text-white transition hover:from-navy-800 hover:to-navy-600"
    >
      <span className="text-[10px] font-bold tracking-[0.16em] text-sand-300">{item.sourceName}</span>
      <span className="mt-2 text-sm font-black">実動画を見る ↗</span>
      <span className="mt-1 text-[9px] text-white/70">外部の実在する動画ページ</span>
    </a>
  );
}

export function MotionPinterest() {
  const [genre, setGenre] = useState<GenreFilter>("ALL");
  const [media, setMedia] = useState<MediaFilter>("ALL");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const result: Record<ExternalMotionGenre, number> = {
      IMAGE: 0,
      TEXT: 0,
      EFFECT: 0,
      IMAGE_TEXT: 0,
    };
    externalMotionAtlas.forEach((item) => { result[item.genre] += 1; });
    return result;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return externalMotionAtlas.filter((item) => {
      if (genre !== "ALL" && item.genre !== genre) return false;
      if (media !== "ALL" && item.mediaType !== media) return false;
      if (!q) return true;
      const haystack = [
        item.titleJa,
        item.titleOriginal,
        item.sourceName,
        item.descriptionJa,
        ...item.tags,
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [genre, media, query]);

  const selected = selectedId ? externalMotionAtlas.find((item) => item.id === selectedId) ?? null : null;

  return (
    <div>
      <Header
        title="映像のPinterest / 外部実例図鑑"
        description="この世に実在する GIF・YouTube・動画・画像だけを、画像 / テキスト / エフェクト / 画像＋テキストで集める。自作サンプルは入れない。"
      />

      <section className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="4大ジャンル">
        {genreMeta.map(([value, label, description]) => {
          const count = value === "ALL" ? externalMotionAtlas.length : counts[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => setGenre(value)}
              className={`rounded-xl border p-3 text-left transition ${genre === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-950" : "border-sand-200 bg-white text-navy-800 hover:border-navy-400 dark:border-navy-700 dark:bg-navy-800 dark:text-sand-100"} ${value === "IMAGE_TEXT" ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-black">{label}</span>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-bold dark:bg-white/10">{count}</span>
              </div>
              <p className="mt-1 text-[9px] leading-4 opacity-65">{description}</p>
            </button>
          );
        })}
      </section>

      <section className="sticky top-0 z-20 -mx-4 mb-5 border-y border-sand-200 bg-sand-50/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95 md:mx-0 md:rounded-xl md:border">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：パララックス / コラージュ / 地名 / グリッチ / 紙"
            className="min-w-0 flex-1 rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-500 dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {mediaMeta.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMedia(value)}
                className={`shrink-0 rounded-full border px-3 py-2 text-[10px] font-bold ${media === value ? "border-sky-700 bg-sky-700 text-white" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-[10px] text-navy-400">表示 {filtered.length} / 外部実例 {externalMotionAtlas.length}件 · 自作モーション 0件</p>
      </section>

      <section className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6" aria-label="外部演出図鑑">
        {filtered.map((item) => (
          <article key={item.id} className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-sand-200 dark:bg-navy-800 dark:ring-navy-700">
            <div className="relative aspect-video overflow-hidden bg-navy-950">
              <Preview item={item} />
              <div className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-1">
                <span className="rounded-full bg-white/95 px-2 py-1 text-[9px] font-black text-navy-950 shadow-sm">{genreLabel(item.genre)}</span>
                <span className="rounded-full bg-black/70 px-2 py-1 text-[9px] font-bold text-white backdrop-blur">{mediaLabel(item.mediaType)}</span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3">
              <button type="button" onClick={() => setSelectedId(item.id)} className="block w-full rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
                <h2 className="line-clamp-2 text-[12px] font-black leading-[1.45] text-navy-900 hover:underline dark:text-sand-100 sm:text-[13px]">{item.titleJa}</h2>
                <p className="mt-1 line-clamp-1 text-[9px] text-navy-400">{item.titleOriginal}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold tracking-tight text-amber-600 dark:text-amber-300" aria-label={`難易度 ${item.difficulty} / 3`}>
                    {difficultyStars(item.difficulty)}
                  </span>
                  <span className="rounded-full bg-sand-100 px-2 py-1 text-[9px] font-black text-navy-700 dark:bg-navy-700 dark:text-navy-100">詳しく見る</span>
                </div>
              </button>

              <div className="mt-2 border-t border-sand-100 pt-2 dark:border-navy-700">
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-8 w-full items-center justify-center rounded-full border border-sand-300 px-2.5 py-1.5 text-[9px] font-bold text-navy-700 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-700">
                  元URL ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-navy-400">条件に合う外部実例がありません。検索か絞り込みを戻してください。</div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={() => setSelectedId(null)}>
          <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-navy-900 md:max-w-5xl md:rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-navy-700 dark:bg-navy-900/95">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-navy-900 dark:text-sand-100">{selected.titleJa}</p>
                <p className="truncate text-[10px] text-navy-400">{selected.sourceName} · {mediaLabel(selected.mediaType)}</p>
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="ml-3 rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>

            <div className="grid md:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
              <div className="aspect-video bg-black"><Preview item={selected} large /></div>
              <div className="p-4 md:p-5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-black text-white dark:bg-sand-100 dark:text-navy-950">{genreLabel(selected.genre)}</span>
                  <span className="rounded-full border border-sand-300 px-2.5 py-1 text-[10px] font-bold text-navy-600 dark:border-navy-600 dark:text-navy-300">{mediaLabel(selected.mediaType)}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.descriptionJa}</p>
                <div className="mt-4 rounded-xl bg-sand-50 p-3 dark:bg-navy-800">
                  <p className="text-[10px] font-bold text-navy-400">難易度</p>
                  <p className="mt-1 text-sm font-black text-amber-600 dark:text-amber-300">{difficultyStars(selected.difficulty)}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-sand-200 px-2 py-1 text-[10px] text-navy-500 dark:border-navy-700 dark:text-navy-300">#{tag}</span>)}
                </div>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-sky-700 px-4 py-3 text-sm font-black text-white hover:bg-sky-600">
                  元の実例を開く ↗
                </a>
                <p className="mt-2 break-all text-[9px] leading-4 text-navy-400">{selected.sourceUrl}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
