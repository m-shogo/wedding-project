import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
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

function extractYouTubeId(item: ExternalMotionAtlasItem) {
  if (item.youtubeId) return item.youtubeId;
  const match = item.sourceUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return match?.[1] ?? null;
}

function extractVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] ?? null;
}

function isDirectVideo(url?: string) {
  return Boolean(url && /\.(?:mp4|webm)(?:\?|$)/i.test(url));
}

type ResolvedPreview =
  | { kind: "IMAGE_OR_GIF"; url: string }
  | { kind: "YOUTUBE"; id: string }
  | { kind: "VIMEO"; id: string }
  | { kind: "DIRECT_VIDEO"; url: string; poster?: string }
  | { kind: "POSTER_ONLY"; url: string }
  | { kind: "LINK_ONLY" };

// scripts/verify-external-motion-atlas-contracts.mjs の previewKind と同じ判定順。
function resolvePreview(item: ExternalMotionAtlasItem): ResolvedPreview {
  const youtubeId = extractYouTubeId(item);
  if (youtubeId) return { kind: "YOUTUBE", id: youtubeId };
  const vimeoId = extractVimeoId(item.sourceUrl);
  if (vimeoId) return { kind: "VIMEO", id: vimeoId };
  if (item.previewUrl && isDirectVideo(item.previewUrl)) {
    return { kind: "DIRECT_VIDEO", url: item.previewUrl, poster: item.posterUrl };
  }
  if ((item.mediaType === "GIF" || item.mediaType === "IMAGE") && item.previewUrl) {
    return { kind: "IMAGE_OR_GIF", url: item.previewUrl };
  }
  if (item.posterUrl) return { kind: "POSTER_ONLY", url: item.posterUrl };
  return { kind: "LINK_ONLY" };
}

// 一覧で動きが見えるか。GIFは勝手に動き、埋め込み動画はhover/画面中央で再生される。
function movesInList(item: ExternalMotionAtlasItem) {
  const { kind } = resolvePreview(item);
  if (kind === "IMAGE_OR_GIF") return item.mediaType === "GIF";
  return kind === "YOUTUBE" || kind === "VIMEO" || kind === "DIRECT_VIDEO";
}

// 見てすぐ比較できる順: GIF → 埋め込み動画 → 静止画ポスター → 元ページのみ。
const previewPriority: Record<ResolvedPreview["kind"], number> = {
  IMAGE_OR_GIF: 0,
  YOUTUBE: 1,
  VIMEO: 1,
  DIRECT_VIDEO: 1,
  POSTER_ONLY: 2,
  LINK_ONLY: 3,
};

// よく使う絞り込み。タグ・説明文への部分一致検索なので、データ側のタグ名と揃える。
const quickQueries = ["StaRt向き", "3点バースト候補", "ウェディング", "旅行", "写真の見せ方", "DaVinci Resolveテンプレ", "地名ラベル", "マッチカット", "シネマグラフ", "筆記体", "プリズム", "インク", "トランジション"];

const mediaPriority: Record<ExternalMotionMediaType, number> = {
  GIF: 0,
  YOUTUBE: 1,
  VIDEO_PAGE: 2,
  IMAGE: 3,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// hoverできない端末では、画面の縦中央帯(約16%)に入ったプレビューだけ再生する。
// 2列表示でも同時再生は1行分に収まり、YouTube/Vimeoのiframeを大量に起動しない。
function useInCenterBand(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const [inBand, setInBand] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) {
      setInBand(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInBand(entry.isIntersecting), {
      rootMargin: "-42% 0px -42% 0px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled]);
  return inBand;
}

function PlayBadge({ label, tone = "dark" }: { label: string; tone?: "dark" | "youtube" | "vimeo" }) {
  const toneClass = tone === "youtube" ? "bg-red-600/95" : tone === "vimeo" ? "bg-[#1ab7ea]" : "bg-black/75";
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/10">
      <span className={`rounded-full px-3 py-2 text-[10px] font-black text-white shadow-lg ${toneClass}`}>{label}</span>
    </div>
  );
}

function YouTubePreview({ id, title, large, active, playLabel }: { id: string; title: string; large: boolean; active: boolean; playLabel: string }) {
  if (large) {
    return (
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }

  if (active) {
    return (
      <iframe
        title={`${title} preview`}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&playsinline=1`}
        allow="autoplay; encrypted-media; picture-in-picture"
        className="pointer-events-none h-full w-full border-0"
      />
    );
  }

  return (
    <>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" className="h-full w-full object-cover" />
      <PlayBadge label={`▶ ${playLabel}`} tone="youtube" />
    </>
  );
}

function VimeoPreview({ id, title, large, active, playLabel }: { id: string; title: string; large: boolean; active: boolean; playLabel: string }) {
  if (large) {
    return (
      <iframe
        title={title}
        src={`https://player.vimeo.com/video/${id}?autoplay=0&muted=0&loop=0`}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }

  if (active) {
    return (
      <iframe
        title={`${title} preview`}
        src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`}
        allow="autoplay; fullscreen; picture-in-picture"
        className="pointer-events-none h-full w-full border-0 bg-[#101820]"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1ab7ea]/25 via-navy-900 to-navy-950 px-3 text-center text-white">
      <span className="rounded-full bg-[#1ab7ea] px-3 py-2 text-[10px] font-black shadow-lg">▶ Vimeo · {playLabel}</span>
      <span className="mt-2 line-clamp-2 text-[9px] text-white/70">{title}</span>
    </div>
  );
}

function DirectVideoPreview({ url, poster, title, large, active, playLabel }: { url: string; poster?: string; title: string; large: boolean; active: boolean; playLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || large) return;
    if (active) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active, large]);

  return (
    <>
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        title={title}
        muted={!large}
        loop={!large}
        playsInline
        controls={large}
        autoPlay={large}
        preload={poster && !large ? "none" : "metadata"}
        className={`h-full w-full ${large ? "object-contain" : "object-cover"}`}
      />
      {!large && !active && <PlayBadge label={`▶ ${playLabel}`} />}
    </>
  );
}

function SourceLinkPreview({ item }: { item: ExternalMotionAtlasItem }) {
  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="flex h-full w-full flex-col items-center justify-center bg-navy-900 px-4 text-center text-white hover:bg-navy-800"
    >
      <span className="text-[10px] font-bold tracking-[0.12em] text-sand-300">{item.sourceName}</span>
      <span className="mt-2 text-sm font-black">実動画を見る ↗</span>
      <span className="mt-1 text-[9px] text-white/60">埋め込み不可 / 元ページで再生</span>
    </a>
  );
}

function Preview({ item, large = false, active = false, playLabel = "" }: { item: ExternalMotionAtlasItem; large?: boolean; active?: boolean; playLabel?: string }) {
  const preview = resolvePreview(item);
  switch (preview.kind) {
    case "YOUTUBE":
      return <YouTubePreview id={preview.id} title={item.titleOriginal} large={large} active={active} playLabel={playLabel} />;
    case "VIMEO":
      return <VimeoPreview id={preview.id} title={item.titleOriginal} large={large} active={active} playLabel={playLabel} />;
    case "DIRECT_VIDEO":
      return <DirectVideoPreview url={preview.url} poster={preview.poster} title={item.titleOriginal} large={large} active={active} playLabel={playLabel} />;
    case "IMAGE_OR_GIF":
      return (
        <img
          src={preview.url}
          alt={item.titleJa}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`h-full w-full ${large ? "object-contain" : "object-cover"}`}
        />
      );
    case "POSTER_ONLY":
      return (
        <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="relative block h-full w-full">
          <img
            src={preview.url}
            alt={item.titleJa}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`h-full w-full ${large ? "object-contain" : "object-cover"}`}
          />
          <PlayBadge label="元ページで再生 ↗" />
        </a>
      );
    case "LINK_ONLY":
      return <SourceLinkPreview item={item} />;
  }
}

function AtlasCard({
  item,
  hoverCapable,
  autoplayOnScroll,
  playLabel,
  onOpen,
}: {
  item: ExternalMotionAtlasItem;
  hoverCapable: boolean;
  autoplayOnScroll: boolean;
  playLabel: string;
  onOpen: () => void;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const inCenterBand = useInCenterBand(previewRef, autoplayOnScroll);
  const active = hoverCapable ? hovered : inCenterBand;

  return (
    <article className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-sand-200 dark:bg-navy-800 dark:ring-navy-700">
      <div
        ref={previewRef}
        className="relative aspect-video overflow-hidden bg-navy-950"
        onMouseEnter={hoverCapable ? () => setHovered(true) : undefined}
        onMouseLeave={hoverCapable ? () => setHovered(false) : undefined}
      >
        <Preview item={item} active={active} playLabel={playLabel} />
        <div className="pointer-events-none absolute left-2 top-2 flex gap-1">
          <span className="rounded-full bg-white/95 px-2 py-1 text-[9px] font-black text-[#101820]">{genreLabel(item.genre)}</span>
          <span className="rounded-full bg-black/70 px-2 py-1 text-[9px] font-bold text-white">{mediaLabel(item.mediaType)}</span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-black text-[#101820] shadow-sm hover:bg-white"
          aria-label={`${item.titleJa}の詳細を見る`}
        >
          詳しく
        </button>
      </div>
      <div className="p-2.5 sm:p-3">
        <button
          type="button"
          onClick={onOpen}
          className="block w-full rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <h2 className="line-clamp-2 text-[12px] font-black leading-[1.45] text-navy-900 dark:text-sand-100 sm:text-[13px]">{item.titleJa}</h2>
          <p className="mt-1 line-clamp-1 text-[9px] text-navy-400">{item.titleOriginal}</p>
          <p className="mt-2 hidden text-[10px] leading-4 text-navy-600 dark:text-navy-300 sm:line-clamp-2">{item.descriptionJa}</p>
        </button>
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-sand-100 pt-2 dark:border-navy-700">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-300" aria-label={`難易度 ${item.difficulty} / 3`}>
            <span className="mr-1 text-[9px] font-normal text-navy-400">難易度</span>
            {difficulty(item.difficulty)}
          </span>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-sand-300 px-2.5 py-1.5 text-[9px] font-bold text-navy-700 dark:border-navy-600 dark:text-navy-200"
          >
            元URL ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export function MotionPinterest() {
  const [genre, setGenre] = useState<Genre>("ALL");
  const [media, setMedia] = useState<Media>("ALL");
  const [query, setQuery] = useState("");
  const [movingOnly, setMovingOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const autoplayOnScroll = !hoverCapable && !reducedMotion;
  const playLabel = hoverCapable ? "hoverで再生" : autoplayOnScroll ? "画面中央で再生" : "詳しくで再生";

  const counts = useMemo(() => {
    const result: Record<ExternalMotionGenre, number> = { IMAGE: 0, TEXT: 0, EFFECT: 0, IMAGE_TEXT: 0 };
    for (const item of externalMotionAtlas) result[item.genre] += 1;
    return result;
  }, []);

  const mediaCounts = useMemo(() => {
    const result: Record<ExternalMotionMediaType, number> = { GIF: 0, YOUTUBE: 0, VIDEO_PAGE: 0, IMAGE: 0 };
    for (const item of externalMotionAtlas) result[item.mediaType] += 1;
    return result;
  }, []);

  const movingCount = useMemo(() => externalMotionAtlas.filter(movesInList).length, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return externalMotionAtlas
      .filter((item) => {
        if (genre !== "ALL" && item.genre !== genre) return false;
        if (media !== "ALL" && item.mediaType !== media) return false;
        if (movingOnly && !movesInList(item)) return false;
        if (!q) return true;
        return [item.titleJa, item.titleOriginal, item.sourceName, item.descriptionJa, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort(
        (a, b) =>
          previewPriority[resolvePreview(a).kind] - previewPriority[resolvePreview(b).kind] ||
          mediaPriority[a.mediaType] - mediaPriority[b.mediaType],
      );
  }, [genre, media, query, movingOnly]);

  const selected = selectedId ? externalMotionAtlas.find((item) => item.id === selectedId) ?? null : null;
  const isFiltered = genre !== "ALL" || media !== "ALL" || query !== "" || movingOnly;
  const resetFilters = () => {
    setGenre("ALL");
    setMedia("ALL");
    setQuery("");
    setMovingOnly(false);
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

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
              className={`rounded-xl border p-3 text-left ${genre === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-[#f3efe8] dark:text-[#101820]" : "border-sand-200 bg-white text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-sand-100"} ${value === "IMAGE_TEXT" ? "col-span-2 sm:col-span-1" : ""}`}
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
          placeholder="例：StaRt向き / 3点バースト / 旅行 / 筆記体 / プリズム / コラージュ"
          className="w-full rounded-full border border-sand-300 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
        />
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {quickQueries.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setQuery(query === value ? "" : value)}
              aria-pressed={query === value}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold ${query === value ? "border-pink-600 bg-pink-600 text-white" : "border-pink-300 bg-white text-pink-700 dark:border-pink-500/60 dark:bg-navy-900 dark:text-pink-300"}`}
            >
              # {value}
            </button>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setMovingOnly((value) => !value)}
            aria-pressed={movingOnly}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold ${movingOnly ? "border-amber-600 bg-amber-600 text-white" : "border-amber-300 bg-white text-amber-700 dark:border-amber-500/60 dark:bg-navy-900 dark:text-amber-300"}`}
          >
            ▶ 動くものだけ {movingCount}
          </button>
          {mediaFilters.map(([value, label]) => {
            const count = value === "ALL" ? externalMotionAtlas.length : mediaCounts[value];
            return (
              <button
                key={value}
                type="button"
                onClick={() => setMedia(value)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold ${media === value ? "border-sky-700 bg-sky-700 text-white" : "border-sand-300 bg-white text-navy-600 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"}`}
              >
                {label} {count}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-navy-400">
          <span>
            表示 {filtered.length} / 外部実例 {externalMotionAtlas.length}件 · 一覧で動く {movingCount}件 · 自作モーション 0件
          </span>
          {isFiltered ? (
            <button type="button" onClick={resetFilters} className="shrink-0 font-bold text-sky-700 dark:text-sky-300">
              絞り込み解除
            </button>
          ) : (
            <span>GIFから表示 · 動画は{playLabel}</span>
          )}
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-sand-300 bg-white px-5 py-10 text-center dark:border-navy-700 dark:bg-navy-900">
          <p className="text-sm font-black text-navy-900 dark:text-sand-100">この条件では実例が見つかりません</p>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">検索語を短くするか、分類・媒体の絞り込みを外すと候補を広げられます。</p>
          <button type="button" onClick={resetFilters} className="mt-4 rounded-full bg-sky-700 px-4 py-2 text-xs font-black text-white">
            全部の実例へ戻す
          </button>
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6" aria-label="外部実例図鑑">
          {filtered.map((item) => (
            <AtlasCard
              key={item.id}
              item={item}
              hoverCapable={hoverCapable}
              autoplayOnScroll={autoplayOnScroll}
              playLabel={playLabel}
              onOpen={() => setSelectedId(item.id)}
            />
          ))}
        </section>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 md:items-center md:p-6" onClick={() => setSelectedId(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.titleJa}
            className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-navy-900 md:max-w-5xl md:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3 dark:border-navy-700">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-navy-900 dark:text-sand-100">{selected.titleJa}</p>
                <p className="truncate text-[10px] text-navy-400">{selected.sourceName} · {mediaLabel(selected.mediaType)}</p>
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="ml-3 rounded-full border border-sand-300 px-3 py-1.5 text-xs font-bold text-navy-600 dark:border-navy-600 dark:text-navy-200">閉じる</button>
            </div>
            <div className="grid md:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
              <div className="relative aspect-video bg-black"><Preview item={selected} large /></div>
              <div className="p-4 md:p-5">
                <p className="text-[11px] text-navy-400">{selected.titleOriginal}</p>
                <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.descriptionJa}</p>
                <p className="mt-4 text-sm font-black text-amber-600 dark:text-amber-300">難易度 {difficulty(selected.difficulty)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-sand-200 px-2 py-1 text-[10px] text-navy-500 dark:border-navy-700 dark:text-navy-300">#{tag}</span>)}
                </div>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-sky-700 px-4 py-3 text-sm font-black text-white">元の実例を開く ↗</a>
                <p className="mt-2 text-[9px] leading-4 text-navy-400">YouTube / Vimeo / 公式プレビューMP4は図鑑内で再生。埋め込みを禁止している外部サイトは元ページで再生します。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
