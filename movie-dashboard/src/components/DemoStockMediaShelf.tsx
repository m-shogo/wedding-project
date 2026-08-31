import { useEffect, useState } from "react";
import {
  buildDemoStockMediaPack,
  demoStockMediaCatalog,
  MOTION_ZUKAN_DEMO_STOCK_PACK_APPLY_EVENT,
  type DemoBgmGenre,
} from "../data/demoStockMediaCatalog";

const roleLabel = {
  WEDDING_COUPLE: "COUPLE",
  WEDDING_DETAILS: "DETAILS",
  FAMILY_EVENT: "FAMILY / EVENT",
} as const;

type ProductionManifestState =
  | { status: "LOADING" }
  | { status: "VALID"; sha256: string; generatedAt: string }
  | { status: "INVALID" };

export function DemoStockMediaShelf() {
  const [selectedGenre, setSelectedGenre] = useState<DemoBgmGenre>("CINEMATIC");
  const [feedback, setFeedback] = useState("");
  const [productionManifest, setProductionManifest] = useState<ProductionManifestState>({ status: "LOADING" });
  const [friendsOpeningManifest, setFriendsOpeningManifest] = useState<ProductionManifestState>({ status: "LOADING" });
  const [startSyncManifest, setStartSyncManifest] = useState<ProductionManifestState>({ status: "LOADING" });

  useEffect(() => {
    const controller = new AbortController();
    void fetch(demoStockMediaCatalog.productionSimulation.manifestPath, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`manifest HTTP ${response.status}`);
        return response.json() as Promise<Record<string, unknown>>;
      })
      .then((manifest) => {
        const artifact = manifest.artifact as Record<string, unknown> | undefined;
        const qa = manifest.qa as Record<string, unknown> | undefined;
        if (
          manifest.schemaVersion !== "opening-v1-dummy-render-manifest/v1" ||
          manifest.authority !== "DUMMY_PRODUCTION_SIMULATION" ||
          manifest.publicationApproved !== false ||
          qa?.status !== "PASSED" ||
          typeof artifact?.sha256 !== "string" ||
          typeof manifest.generatedAt !== "string"
        ) {
          throw new Error("manifest guard mismatch");
        }
        setProductionManifest({ status: "VALID", sha256: artifact.sha256, generatedAt: manifest.generatedAt });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setProductionManifest({ status: "INVALID" });
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetch(demoStockMediaCatalog.japaneseFriendsOpeningStartSync.manifestPath, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`manifest HTTP ${response.status}`);
        return response.json() as Promise<Record<string, unknown>>;
      })
      .then((manifest) => {
        const artifact = manifest.artifact as Record<string, unknown> | undefined;
        const qa = manifest.qa as Record<string, unknown> | undefined;
        if (
          manifest.schemaVersion !== "japanese-friends-opening-start-sync-manifest/v1" ||
          manifest.authority !== "PRIVATE_START_SYNC_DEMO" ||
          manifest.publicationApproved !== false ||
          manifest.rightsStatus !== "MUSIC_AND_LYRICS_NOT_CLEARED" ||
          qa?.status !== "AUTOMATED_PASSED" ||
          typeof artifact?.sha256 !== "string" ||
          typeof manifest.generatedAt !== "string"
        ) throw new Error("manifest guard mismatch");
        setStartSyncManifest({ status: "VALID", sha256: artifact.sha256, generatedAt: manifest.generatedAt });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStartSyncManifest({ status: "INVALID" });
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetch(demoStockMediaCatalog.japaneseFriendsOpening.manifestPath, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`manifest HTTP ${response.status}`);
        return response.json() as Promise<Record<string, unknown>>;
      })
      .then((manifest) => {
        const artifact = manifest.artifact as Record<string, unknown> | undefined;
        const qa = manifest.qa as Record<string, unknown> | undefined;
        if (
          manifest.schemaVersion !== "japanese-friends-opening-demo-manifest/v1" ||
          manifest.authority !== "FICTIONAL_CAST_DEMO" ||
          manifest.publicationApproved !== false ||
          qa?.status !== "PASSED" ||
          typeof artifact?.sha256 !== "string" ||
          typeof manifest.generatedAt !== "string"
        ) throw new Error("manifest guard mismatch");
        setFriendsOpeningManifest({ status: "VALID", sha256: artifact.sha256, generatedAt: manifest.generatedAt });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFriendsOpeningManifest({ status: "INVALID" });
      });
    return () => controller.abort();
  }, []);

  function applyDemoPack() {
    const pack = buildDemoStockMediaPack(selectedGenre);
    window.dispatchEvent(new CustomEvent(MOTION_ZUKAN_DEMO_STOCK_PACK_APPLY_EVENT, { detail: pack }));
    setFeedback(`11枚と${selectedGenre}候補を素材BOXへ反映しました（すべて仮素材）`);
    requestAnimationFrame(() => {
      document.getElementById("motion-zukan-production-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function copyDemoPack() {
    const pack = buildDemoStockMediaPack(selectedGenre);
    try {
      await navigator.clipboard.writeText(JSON.stringify(pack, null, 2));
      setFeedback(`${selectedGenre}デモパックJSONをコピーしました`);
    } catch {
      setFeedback("コピーできませんでした。ブラウザのクリップボード許可を確認してください。");
    }
  }

  return (
    <section className="mb-8 border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10 p-5">
      <p className="text-[10px] tracking-[0.2em] font-semibold text-amber-700 dark:text-amber-300">STOCK DEMO / NOT YOUR PHOTOS</p>
      <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">画像サンプルとジャンル別BGM候補</h2>
      <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">{demoStockMediaCatalog.notice}</p>

      <article className="mt-5 overflow-hidden border-2 border-amber-400 dark:border-amber-700 bg-white dark:bg-navy-800">
        <div className="p-3 border-b border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-amber-800 dark:text-amber-200">DUMMY PRODUCTION SIMULATION / 60-SECOND FULL RENDER</p>
          <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">{demoStockMediaCatalog.productionSimulation.title}</h3>
          <p className="mt-1 text-[10px] leading-4 text-amber-800 dark:text-amber-200">canonical写真11枠＋BGM候補で本番レンダー経路を完走。本人写真・実公開承認を示すものではありません。</p>
        </div>
        <video
          controls
          preload="metadata"
          playsInline
          src={demoStockMediaCatalog.productionSimulation.localPath}
          aria-label="Opening V1 60秒ダミー本番版"
          className="aspect-video w-full bg-black object-contain"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-[10px] text-navy-500 dark:text-navy-300">
          <div>
            <p>60秒 · 1920×1080 · 30fps · H.264/AAC</p>
            <p className="mt-1 font-semibold text-amber-700 dark:text-amber-300">DUMMY READY · 最終公開は未承認</p>
            {productionManifest.status === "VALID" ? (
              <p role="status" className="mt-1 font-mono text-emerald-700 dark:text-emerald-300">QA PASSED · SHA-256 {productionManifest.sha256.slice(0, 12)}…</p>
            ) : productionManifest.status === "INVALID" ? (
              <p role="alert" className="mt-1 font-semibold text-red-700 dark:text-red-300">QA manifestを検証できません</p>
            ) : (
              <p role="status" className="mt-1 text-navy-400">QA manifest確認中…</p>
            )}
            <a href={demoStockMediaCatalog.productionSimulation.manifestPath} target="_blank" rel="noreferrer" className="mt-1 inline-block underline text-sky-700 dark:text-sky-300">QA manifest JSONを開く</a>
          </div>
          <a
            href={demoStockMediaCatalog.productionSimulation.localPath}
            download="opening-v1-dummy-production.mp4"
            className="border border-navy-700 bg-navy-800 px-3 py-2 font-semibold text-white dark:border-sand-200 dark:bg-sand-100 dark:text-navy-900"
          >
            60秒MP4をダウンロード
          </a>
        </div>
      </article>

      <article className="mt-5 overflow-hidden border-2 border-sky-400 dark:border-sky-700 bg-white dark:bg-navy-800">
        <div className="p-3 border-b border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/20">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-sky-800 dark:text-sky-200">JAPANESE WEDDING OPENING / FICTIONAL CAST DEMO</p>
          <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">{demoStockMediaCatalog.japaneseFriendsOpening.title}</h3>
          <p className="mt-1 text-[10px] leading-4 text-sky-800 dark:text-sky-200">カウントダウン、新郎新婦紹介、友人チーム、ゲストへのお願い、入場直前までを王道構成で制作。人物・文言はすべて架空です。</p>
        </div>
        <video controls preload="metadata" playsInline src={demoStockMediaCatalog.japaneseFriendsOpening.localPath} aria-label="日本の王道・友人と盛り上がる105秒オープニングムービー" className="aspect-video w-full bg-black object-contain" />
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-[10px] text-navy-500 dark:text-navy-300">
          <div>
            <p>105秒 · 1920×1080 · 30fps · H.264/AAC</p>
            <p className="mt-1 font-semibold text-sky-700 dark:text-sky-300">FICTIONAL CAST · AI生成ダミー写真5枚 · 最終公開は未承認</p>
            {friendsOpeningManifest.status === "VALID" ? <p role="status" className="mt-1 font-mono text-emerald-700 dark:text-emerald-300">QA PASSED · SHA-256 {friendsOpeningManifest.sha256.slice(0, 12)}…</p> : friendsOpeningManifest.status === "INVALID" ? <p role="alert" className="mt-1 font-semibold text-red-700 dark:text-red-300">QA manifestを検証できません</p> : <p role="status" className="mt-1 text-navy-400">QA manifest確認中…</p>}
            <a href={demoStockMediaCatalog.japaneseFriendsOpening.manifestPath} target="_blank" rel="noreferrer" className="mt-1 inline-block underline text-sky-700 dark:text-sky-300">QA manifest JSONを開く</a>
          </div>
          <a href={demoStockMediaCatalog.japaneseFriendsOpening.localPath} download="japanese-friends-opening-demo-v1.mp4" className="border border-sky-700 bg-sky-700 px-3 py-2 font-semibold text-white">105秒MP4をダウンロード</a>
        </div>
      </article>

      <article className="mt-5 overflow-hidden border-2 border-fuchsia-500 dark:border-fuchsia-700 bg-white dark:bg-navy-800">
        <div className="p-3 border-b border-fuchsia-300 dark:border-fuchsia-800 bg-fuchsia-50 dark:bg-fuchsia-950/20">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-fuchsia-800 dark:text-fuchsia-200">START SYNC / PRIVATE WEDDING SCREENING ONLY</p>
          <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">{demoStockMediaCatalog.japaneseFriendsOpeningStartSync.title}</h3>
          <p className="mt-1 text-[10px] leading-4 text-fuchsia-800 dark:text-fuchsia-200">187.5 BPM、歌詞30フレーズ、実測3-hit 4か所へ同期。音源・歌詞の利用権は未確認のため、私的確認専用です。</p>
        </div>
        <video controls preload="metadata" playsInline src={demoStockMediaCatalog.japaneseFriendsOpeningStartSync.localPath} aria-label="StaRt歌詞・ビート同期145.6秒オープニングムービー" className="aspect-video w-full bg-black object-contain" />
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-[10px] text-navy-500 dark:text-navy-300">
          <div>
            <p>145.6秒 · 1920×1080 · 30fps · H.264/AAC · 187.5 BPM</p>
            <p className="mt-1 font-semibold text-red-700 dark:text-red-300">MUSIC / LYRICS RIGHTS NOT CLEARED · 最終公開は未承認</p>
            {startSyncManifest.status === "VALID" ? <p role="status" className="mt-1 font-mono text-emerald-700 dark:text-emerald-300">QA PASSED · SHA-256 {startSyncManifest.sha256.slice(0, 12)}…</p> : startSyncManifest.status === "INVALID" ? <p role="alert" className="mt-1 font-semibold text-red-700 dark:text-red-300">QA manifestを検証できません</p> : <p role="status" className="mt-1 text-navy-400">QA manifest確認中…</p>}
            <a href={demoStockMediaCatalog.japaneseFriendsOpeningStartSync.manifestPath} target="_blank" rel="noreferrer" className="mt-1 inline-block underline text-fuchsia-700 dark:text-fuchsia-300">権利・QA manifest JSONを開く</a>
          </div>
          <a href={demoStockMediaCatalog.japaneseFriendsOpeningStartSync.localPath} download="japanese-friends-opening-start-sync-v1.mp4" className="border border-fuchsia-700 bg-fuchsia-700 px-3 py-2 font-semibold text-white">145.6秒MP4をダウンロード</a>
        </div>
      </article>

      <div className="mt-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] tracking-[0.18em] font-semibold text-sky-700 dark:text-sky-300">20-SECOND RENDERED DEMOS</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">ジャンル別・音声入り完成デモ</h3>
          </div>
          <p className="text-[10px] text-amber-700 dark:text-amber-300">DEMO RENDER ONLY · 最終公開は未承認</p>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoStockMediaCatalog.renders.map((render) => (
            <article key={render.id} className="overflow-hidden border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800">
              <video
                controls
                preload="metadata"
                playsInline
                src={render.localPath}
                aria-label={`${render.genre} ジャンルの20秒ストック完成デモ`}
                className="aspect-video w-full bg-black object-contain"
              />
              <div className="flex items-start justify-between gap-3 p-3">
                <div>
                  <p className="text-[10px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">{render.genre}</p>
                  <h4 className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{render.title}</h4>
                </div>
                <p className="shrink-0 text-right text-[9px] leading-4 text-navy-500 dark:text-navy-300">20秒 · 1280×720<br />映像＋BGM</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 border border-amber-300 dark:border-amber-800 bg-white/80 dark:bg-navy-900/70 p-4">
        <p className="text-[10px] tracking-[0.18em] font-semibold text-amber-700 dark:text-amber-300">DEMO PACK / SAFE IMPORT</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {demoStockMediaCatalog.bgmCandidates.map((bgm) => (
            <button
              key={bgm.id}
              type="button"
              aria-pressed={selectedGenre === bgm.genre}
              onClick={() => setSelectedGenre(bgm.genre)}
              className={`px-3 py-2 text-xs border ${selectedGenre === bgm.genre ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}
            >
              {bgm.genre}
            </button>
          ))}
          <button type="button" onClick={applyDemoPack} className="px-3 py-2 text-xs font-semibold border border-emerald-500 text-emerald-700 dark:text-emerald-300">11枚＋選択BGMを素材BOXへ</button>
          <button type="button" onClick={copyDemoPack} className="px-3 py-2 text-xs border border-sand-300 dark:border-navy-600">デモパックJSONをコピー</button>
        </div>
        <p className="mt-2 text-[10px] leading-4 text-navy-500 dark:text-navy-300">写真は仮素材として追加し、BGMは候補としてのみ保存します。Opening本番ゲートや最終公開承認は変更しません。</p>
        {feedback && <p role="status" className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{feedback}</p>}
      </div>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {demoStockMediaCatalog.photos.map((photo) => (
          <a key={photo.id} href={photo.source.pageUrl} target="_blank" rel="noreferrer" className="group border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800">
            <img src={photo.localPath} alt={`${photo.title} — demo stock by ${photo.source.creator}`} loading="lazy" className="aspect-video w-full object-cover" />
            <div className="p-2">
              <p className="text-[9px] font-semibold text-amber-700 dark:text-amber-300">{roleLabel[photo.role]} · DEMO ONLY</p>
              <p className="mt-1 truncate text-[10px] text-navy-600 dark:text-navy-300">{photo.source.creator} / Pexels</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {demoStockMediaCatalog.bgmCandidates.map((bgm) => (
          <article key={bgm.id} className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-3">
            <p className="text-[10px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">{bgm.genre}</p>
            <h3 className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{bgm.title}</h3>
            <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">{bgm.source.creator} / Pixabay · CANDIDATE</p>
            <audio controls preload="none" src={bgm.localPath} className="mt-3 h-9 w-full" />
            <p className="mt-2 text-[9px] leading-4 text-amber-700 dark:text-amber-300">Content ID登録済み。試聴・編集候補のみ／最終公開は未承認。</p>
            <a href={bgm.source.pageUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[10px] underline text-sky-700 dark:text-sky-300">配布元・ライセンス確認</a>
          </article>
        ))}
      </div>
    </section>
  );
}
