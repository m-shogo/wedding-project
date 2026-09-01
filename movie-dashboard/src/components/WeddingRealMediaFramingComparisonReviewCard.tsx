import {useEffect, useMemo, useState} from "react";
import {createHash} from "../lib/browserHash";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type SceneProjectId,
} from "../data/visualSceneComposer";

type Fit = "COVER" | "CONTAIN";
type Framing = {fit: Fit; focusX: number; focusY: number; scale: number; revision?: string};
type Still = {kind: string; frame: number; sha256: string; path: string};
type ComparisonScene = {
  sceneId: string;
  sourceRevision: string;
  mediaSha256: string;
  patternId?: string;
  productionRole?: string;
  framingChanged: boolean;
  before: {framingRevision: string; framing: Framing; previewSha256?: string; stills: Still[]};
  after: {framingRevision: string; framing: Framing; previewSha256?: string; stills: Still[]};
};
type ComparisonReceipt = {
  schemaVersion: "wedding-movie-real-media-framing-qa-comparison/v1";
  authority: "DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS";
  projectId: SceneProjectId;
  scenes: ComparisonScene[];
  summary: {sceneCount: number; framingChangedScenes: number; sameSceneAndMediaAuthorityVerified: boolean; humanVisualQa: "NOT_RUN"; productionReady: false};
  evidenceBoundary: {humanVisualReviewPerformed: false; remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};
type MediaManifest = {
  schemaVersion: "wedding-movie-production-media-input/v1";
  projectId: SceneProjectId;
  scenes: Array<{sceneId: string; sourceRevision: string; sha256: string; framing?: Framing & {revision: string}}>; 
};
type LoadedImage = {name: string; sha256: string; url: string};

const SAMPLE_KINDS = ["SCENE_START_SAFE", "SCENE_MID", "SCENE_END_SAFE"] as const;

function isComparison(value: unknown, projectId: SceneProjectId): value is ComparisonReceipt {
  if (!value || typeof value !== "object") return false;
  const receipt = value as Partial<ComparisonReceipt>;
  return receipt.schemaVersion === "wedding-movie-real-media-framing-qa-comparison/v1"
    && receipt.authority === "DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS"
    && receipt.projectId === projectId
    && Array.isArray(receipt.scenes)
    && receipt.summary?.sameSceneAndMediaAuthorityVerified === true
    && receipt.summary?.humanVisualQa === "NOT_RUN"
    && receipt.summary?.productionReady === false
    && receipt.evidenceBoundary?.humanVisualReviewPerformed === false
    && receipt.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN"
    && receipt.evidenceBoundary?.palmierGuiActual === "NOT_RUN"
    && receipt.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN"
    && receipt.evidenceBoundary?.productionReady === false;
}

function isMediaManifest(value: unknown, projectId: SceneProjectId): value is MediaManifest {
  if (!value || typeof value !== "object") return false;
  const manifest = value as Partial<MediaManifest>;
  return manifest.schemaVersion === "wedding-movie-production-media-input/v1"
    && manifest.projectId === projectId
    && Array.isArray(manifest.scenes);
}

function basename(path: string) { return path.split(/[\\/]/).pop() ?? path; }
function framingLabel(value: Framing) { return `${value.fit} · X ${value.focusX}% · Y ${value.focusY}% · scale ${value.scale.toFixed(2)}`; }
function stillKey(sceneId: string, side: "before" | "after", kind: string) { return `${sceneId}::${side}::${kind}`; }

export function WeddingRealMediaFramingComparisonReviewCard({projectId}: {projectId: SceneProjectId}) {
  const [receipt, setReceipt] = useState<ComparisonReceipt | null>(null);
  const [media, setMedia] = useState<MediaManifest | null>(null);
  const [images, setImages] = useState<Map<string, LoadedImage>>(new Map());
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<(typeof SAMPLE_KINDS)[number]>("SCENE_MID");
  const [error, setError] = useState<string | null>(null);
  const [composerTick, setComposerTick] = useState(0);

  useEffect(() => {
    const refresh = () => setComposerTick((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
  }, []);

  const liveSceneRevisions = useMemo(() => {
    void composerTick;
    return new Map(loadMotionZukanComposerState().scenes.filter((scene) => scene.projectId === projectId).map((scene) => [scene.sceneId, scene.updatedAt]));
  }, [projectId, composerTick]);

  async function loadReceipt(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const value = JSON.parse(await file.text());
      if (!isComparison(value, projectId)) throw new Error("comparison receipt schema / authority / evidence boundary mismatch");
      setReceipt(value);
      setSelectedSceneId(value.scenes.find((scene) => scene.framingChanged)?.sceneId ?? value.scenes[0]?.sceneId ?? null);
      setImages(new Map());
    } catch (reason) {
      setReceipt(null);
      setSelectedSceneId(null);
      setImages(new Map());
      setError(reason instanceof Error ? reason.message : "invalid comparison receipt");
    }
  }

  async function loadMedia(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const value = JSON.parse(await file.text());
      if (!isMediaManifest(value, projectId)) throw new Error("production media manifest schema / project mismatch");
      setMedia(value);
    } catch (reason) {
      setMedia(null);
      setError(reason instanceof Error ? reason.message : "invalid production media manifest");
    }
  }

  async function loadStillFiles(files: FileList | null) {
    if (!files || !receipt) return;
    setError(null);
    const expected = new Map<string, {sceneId: string; side: "before" | "after"; kind: string; sha256: string; path: string}>();
    for (const scene of receipt.scenes) {
      for (const side of ["before", "after"] as const) {
        for (const still of scene[side].stills) expected.set(basename(still.path), {sceneId: scene.sceneId, side, kind: still.kind, sha256: still.sha256, path: still.path});
      }
    }
    const next = new Map(images);
    for (const file of Array.from(files)) {
      const target = expected.get(file.name);
      if (!target) continue;
      const buffer = await file.arrayBuffer();
      const sha256 = await createHash(buffer);
      if (sha256 !== target.sha256) {
        setError(`STILL_SHA_MISMATCH: ${file.name}`);
        continue;
      }
      const key = stillKey(target.sceneId, target.side, target.kind);
      const previous = next.get(key);
      if (previous) URL.revokeObjectURL(previous.url);
      next.set(key, {name: file.name, sha256, url: URL.createObjectURL(file)});
    }
    setImages(next);
  }

  const binding = useMemo(() => {
    if (!receipt) return {state: "NOT_RUN" as const, stale: [] as string[]};
    if (!media) return {state: "WAITING_MEDIA" as const, stale: [] as string[]};
    const mediaByScene = new Map(media.scenes.map((scene) => [scene.sceneId, scene]));
    const stale: string[] = [];
    for (const scene of receipt.scenes) {
      const currentMedia = mediaByScene.get(scene.sceneId);
      const liveRevision = liveSceneRevisions.get(scene.sceneId);
      if (!currentMedia || !liveRevision || liveRevision !== scene.sourceRevision || currentMedia.sourceRevision !== scene.sourceRevision || currentMedia.sha256 !== scene.mediaSha256) {
        stale.push(scene.sceneId);
        continue;
      }
      const revision = currentMedia.framing?.revision ?? "DEFAULT_CENTER_COVER";
      if (revision !== scene.after.framingRevision) stale.push(scene.sceneId);
    }
    return {state: stale.length === 0 ? "CURRENT" as const : "STALE" as const, stale};
  }, [receipt, media, liveSceneRevisions]);

  const selected = receipt?.scenes.find((scene) => scene.sceneId === selectedSceneId) ?? null;
  const beforeStill = selected?.before.stills.find((still) => still.kind === selectedKind) ?? null;
  const afterStill = selected?.after.stills.find((still) => still.kind === selectedKind) ?? null;
  const beforeImage = selected && beforeStill ? images.get(stillKey(selected.sceneId, "before", beforeStill.kind)) : null;
  const afterImage = selected && afterStill ? images.get(stillKey(selected.sceneId, "after", afterStill.kind)) : null;
  const changedScenes = receipt?.scenes.filter((scene) => scene.framingChanged) ?? [];
  const loadedExpectedCount = receipt ? receipt.scenes.reduce((total, scene) => total + scene.before.stills.length + scene.after.stills.length, 0) : 0;
  const canReview = binding.state === "CURRENT" && Boolean(selected?.framingChanged) && Boolean(beforeImage && afterImage);

  return (
    <section className="mt-3 border-2 border-violet-300 p-3 dark:border-violet-800" data-real-media-framing-comparison-review={projectId} data-comparison-current={binding.state} data-human-visual-qa="NOT_RUN">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div><p className="text-[8px] font-semibold tracking-[0.14em] text-violet-700 dark:text-violet-300">FRAMING BEFORE / AFTER VISUAL REVIEW / {projectId.toUpperCase()}</p><p className="mt-1 text-[11px] font-semibold">同一Scene・同一mediaのcrop修正だけを実stillで比較</p><p className="mt-1 text-[8px] opacity-70">comparison receipt + 現在のproduction media + SHA一致stillを読み込みます。どちらが良いかのHuman判定は自動生成しません。</p></div>
        <span className="border border-violet-300 px-2 py-1 font-mono text-[8px]">{binding.state}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[8px]">
        <label className="cursor-pointer border border-violet-300 px-2 py-1">Comparison receipt<input className="hidden" type="file" accept="application/json,.json" onChange={(event) => void loadReceipt(event.target.files?.[0] ?? null)} /></label>
        <label className="cursor-pointer border border-violet-300 px-2 py-1">Current Media JSON<input className="hidden" type="file" accept="application/json,.json" onChange={(event) => void loadMedia(event.target.files?.[0] ?? null)} /></label>
        <label className={`cursor-pointer border px-2 py-1 ${receipt ? "border-violet-300" : "border-slate-300 opacity-50"}`}>Before/After stills<input className="hidden" type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={!receipt} onChange={(event) => void loadStillFiles(event.target.files)} /></label>
      </div>

      {error ? <p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">{error}</p> : null}
      {binding.state === "WAITING_MEDIA" ? <p className="mt-2 border border-amber-300 p-2 text-[8px] text-amber-800">CURRENTNESS未確定: comparison receiptだけではlive production stateを保証しません。現在のproduction media manifestを読み込んでください。</p> : null}
      {binding.state === "STALE" ? <p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700" data-comparison-stale-scenes={binding.stale.join(",")}>STALE_FRAMING_COMPARISON: {binding.stale.join(" / ")}。Scene revision / media SHA / current framing revisionのどれかがcomparison後に変わっています。古い比較で再reviewしません。</p> : null}

      {receipt ? <div className="mt-3 grid gap-2 sm:grid-cols-3 text-[8px]"><div className="border p-2"><p className="font-semibold">Scenes</p><p className="font-mono">{receipt.summary.sceneCount}</p></div><div className="border p-2"><p className="font-semibold">Framing changed</p><p className="font-mono">{receipt.summary.framingChangedScenes}</p></div><div className="border p-2"><p className="font-semibold">Verified stills loaded</p><p className="font-mono">{images.size}/{loadedExpectedCount}</p></div></div> : null}

      {receipt ? <div className="mt-3 flex flex-wrap gap-1">{changedScenes.map((scene) => <button key={scene.sceneId} type="button" onClick={() => setSelectedSceneId(scene.sceneId)} className={`border px-2 py-1 text-[8px] ${selectedSceneId === scene.sceneId ? "border-violet-500 font-semibold" : "border-slate-300"}`} data-framing-comparison-scene={scene.sceneId}>{scene.sceneId}</button>)}</div> : null}
      {selected ? <>
        <div className="mt-3 grid gap-2 lg:grid-cols-2">
          {(["before", "after"] as const).map((side) => <div key={side} className="border p-2" data-framing-comparison-side={side}>
            <div className="flex items-center justify-between gap-2 text-[8px]"><span className="font-semibold uppercase">{side}</span><code className="max-w-[70%] break-all text-[6px]">{selected[side].framingRevision}</code></div>
            <p className="mt-1 text-[8px]">{framingLabel(selected[side].framing)}</p>
          </div>)}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">{SAMPLE_KINDS.map((kind) => <button key={kind} type="button" onClick={() => setSelectedKind(kind)} className={`border px-2 py-1 text-[7px] ${selectedKind === kind ? "border-violet-500 font-semibold" : "border-slate-300"}`}>{kind}</button>)}</div>
        <div className="mt-3 grid gap-3 lg:grid-cols-2" data-framing-comparison-image-pair={selected.sceneId}>
          <figure className="border p-2"><figcaption className="mb-2 text-[8px] font-semibold">BEFORE · {selectedKind}</figcaption>{beforeImage ? <img src={beforeImage.url} alt={`${selected.sceneId} before ${selectedKind}`} className="aspect-video w-full object-contain bg-black" /> : <div className="flex aspect-video items-center justify-center border border-dashed text-[8px] opacity-60">SHA一致before still未読込 · {beforeStill ? basename(beforeStill.path) : "missing receipt sample"}</div>}{beforeStill ? <code className="mt-2 block break-all text-[6px]">frame {beforeStill.frame} · {beforeStill.sha256}</code> : null}</figure>
          <figure className="border p-2"><figcaption className="mb-2 text-[8px] font-semibold">AFTER · {selectedKind}</figcaption>{afterImage ? <img src={afterImage.url} alt={`${selected.sceneId} after ${selectedKind}`} className="aspect-video w-full object-contain bg-black" /> : <div className="flex aspect-video items-center justify-center border border-dashed text-[8px] opacity-60">SHA一致after still未読込 · {afterStill ? basename(afterStill.path) : "missing receipt sample"}</div>}{afterStill ? <code className="mt-2 block break-all text-[6px]">frame {afterStill.frame} · {afterStill.sha256}</code> : null}</figure>
        </div>
        <p className={`mt-3 border-2 p-2 text-[8px] ${canReview ? "border-emerald-400 text-emerald-800 dark:text-emerald-200" : "border-amber-300 text-amber-800 dark:text-amber-200"}`} data-framing-comparison-review-ready={canReview ? "true" : "false"}>{canReview ? "HUMAN REVIEW READY — live authority CURRENT + before/after still SHA VERIFIED。ここでは画像比較のみ行い、PASSは既存fresh Human Visual Review OperatorでNOT_RUNから入力してください。" : "HUMAN REVIEW BLOCKED — live currentnessと選択sampleのbefore/after SHA verificationが揃うまで再判定しません。"}</p>
      </> : null}

      <div className="mt-3 border border-slate-300 p-2 text-[7px] leading-3"><p className="font-semibold">Canonical comparison receipt</p><code className="mt-1 block break-all">node --no-warnings motion-studio/scripts/compare-wedding-project-real-media-framing-qa-stills.mts --before-manifest=/ABS/PATH/before.json --after-manifest=/ABS/PATH/after.json --require-framing-change --output=out/qa/project-real-media-preview/{projectId}/{projectId}-framing-before-after.json</code></div>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">Evidence boundary: comparison receiptとSHA一致stillはcrop修正前後を並べるためのderived evidenceです。Human visual QA PASS、Remotion Studio GUI Actual、Palmier GUI Actual、Mac DaVinci GUI Actual、productionReadyを自動生成しません。</p>
    </section>
  );
}
