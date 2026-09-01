import {useMemo, useState} from "react";
import {createHash} from "../lib/browserHash";
import type {SceneProjectId} from "../data/visualSceneComposer";

type Timing = {
  targetDurationSeconds: number;
  computedDurationSeconds: number;
  durationFrames: number;
  fps: number;
  revision: string;
};

type Still = {kind: string; frame: number; seconds?: number; sha256: string; path: string};
type TimingScene = {
  sceneId: string;
  mediaSha256: string;
  patternId?: string;
  productionRole?: string;
  framingRevision: string;
  timingChanged: boolean;
  before: {sourceRevision: string; timingRevision: string; timing: Timing; previewSha256?: string; stills: Still[]};
  after: {sourceRevision: string; timingRevision: string; timing: Timing; previewSha256?: string; stills: Still[]};
};

type TimingReceipt = {
  schemaVersion: "wedding-movie-real-media-timing-qa-comparison/v1";
  authority: "DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS";
  projectId: SceneProjectId;
  scenes: TimingScene[];
  summary: {
    sceneCount: number;
    timingChangedScenes: number;
    unchangedScenes: number;
    sameSceneMediaFramingAuthorityVerified: boolean;
    humanVisualQa: "NOT_RUN";
    productionReady: false;
  };
  evidenceBoundary: {
    humanVisualReviewPerformed: false;
    remotionStudioGuiActual: "NOT_RUN";
    palmierGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
    productionReady: false;
  };
};

type SelectedManifest = {
  schemaVersion: "wedding-movie-selected-scene-render-manifest/v1";
  authority: "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH";
  projectId: SceneProjectId;
  scenes: Array<{
    sceneId: string;
    sourceRevision: string;
    patternId?: string;
    productionRole?: string;
    timing: Timing;
  }>;
  summary: {allSelectionsCurrent: boolean; timingBoundScenes: number; productionReady: false};
};

type TimingCurrentness = {
  schemaVersion: "wedding-movie-real-media-timing-qa-comparison-currentness/v1";
  authority: "LIVE_REVALIDATION_OF_TIMING_COMPARISON_AGAINST_SOURCE_MANIFESTS_STILLS_AND_CURRENT_SELECTED_SCENES";
  projectId: SceneProjectId;
  state: "CURRENT" | "STALE";
  source: {receiptSha256: string | null; currentSelectedSha256: string | null};
  checks: {
    receiptBoundaryValid: boolean;
    sourceManifestHashesCurrent: boolean;
    stillFilesCurrent: boolean;
    currentSelectedTimingCurrent: boolean;
    receiptManifestBindingCurrent: boolean;
  };
  mismatches: string[];
  evidenceBoundary: {
    humanVisualReviewPerformed: false;
    humanVisualQa: "NOT_RUN";
    remotionStudioGuiActual: "NOT_RUN";
    palmierGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
    productionReady: false;
  };
};

type LoadedImage = {name: string; sha256: string; url: string};
type ExpectedStill = {sceneId: string; side: "before" | "after"; kind: string; sha256: string};
const SAMPLE_KINDS = ["SCENE_START_SAFE", "SCENE_MID", "SCENE_END_SAFE"] as const;

function isReceipt(value: unknown, projectId: SceneProjectId): value is TimingReceipt {
  if (!value || typeof value !== "object") return false;
  const receipt = value as Partial<TimingReceipt>;
  return receipt.schemaVersion === "wedding-movie-real-media-timing-qa-comparison/v1"
    && receipt.authority === "DERIVED_COMPARISON_OF_TWO_CURRENT_REAL_MEDIA_QA_STILL_MANIFESTS"
    && receipt.projectId === projectId
    && Array.isArray(receipt.scenes)
    && receipt.summary?.sameSceneMediaFramingAuthorityVerified === true
    && receipt.summary?.humanVisualQa === "NOT_RUN"
    && receipt.summary?.productionReady === false
    && receipt.evidenceBoundary?.humanVisualReviewPerformed === false
    && receipt.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN"
    && receipt.evidenceBoundary?.palmierGuiActual === "NOT_RUN"
    && receipt.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN"
    && receipt.evidenceBoundary?.productionReady === false;
}

function isSelected(value: unknown, projectId: SceneProjectId): value is SelectedManifest {
  if (!value || typeof value !== "object") return false;
  const selected = value as Partial<SelectedManifest>;
  return selected.schemaVersion === "wedding-movie-selected-scene-render-manifest/v1"
    && selected.authority === "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH"
    && selected.projectId === projectId
    && Array.isArray(selected.scenes)
    && selected.summary?.allSelectionsCurrent === true
    && selected.summary?.timingBoundScenes === selected.scenes.length
    && selected.summary?.productionReady === false;
}

function isCurrentness(value: unknown, projectId: SceneProjectId): value is TimingCurrentness {
  if (!value || typeof value !== "object") return false;
  const currentness = value as Partial<TimingCurrentness>;
  return currentness.schemaVersion === "wedding-movie-real-media-timing-qa-comparison-currentness/v1"
    && currentness.authority === "LIVE_REVALIDATION_OF_TIMING_COMPARISON_AGAINST_SOURCE_MANIFESTS_STILLS_AND_CURRENT_SELECTED_SCENES"
    && currentness.projectId === projectId
    && (currentness.state === "CURRENT" || currentness.state === "STALE")
    && Array.isArray(currentness.mismatches)
    && currentness.evidenceBoundary?.humanVisualReviewPerformed === false
    && currentness.evidenceBoundary?.humanVisualQa === "NOT_RUN"
    && currentness.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN"
    && currentness.evidenceBoundary?.palmierGuiActual === "NOT_RUN"
    && currentness.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN"
    && currentness.evidenceBoundary?.productionReady === false;
}

function stillKey(sceneId: string, side: "before" | "after", kind: string) { return `${sceneId}::${side}::${kind}`; }
function seconds(value: number) { return `${value.toFixed(2)}s`; }

export function WeddingRealMediaTimingComparisonReviewCard({projectId}: {projectId: SceneProjectId}) {
  const [receipt, setReceipt] = useState<TimingReceipt | null>(null);
  const [receiptSha, setReceiptSha] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedManifest | null>(null);
  const [selectedSha, setSelectedSha] = useState<string | null>(null);
  const [currentness, setCurrentness] = useState<TimingCurrentness | null>(null);
  const [images, setImages] = useState<Map<string, LoadedImage>>(new Map());
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<(typeof SAMPLE_KINDS)[number]>("SCENE_MID");
  const [error, setError] = useState<string | null>(null);

  async function loadReceipt(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const value = JSON.parse(new TextDecoder().decode(buffer));
      if (!isReceipt(value, projectId)) throw new Error("timing comparison receipt schema / authority / evidence boundary mismatch");
      setReceipt(value);
      setReceiptSha(await createHash(buffer));
      setCurrentness(null);
      setImages(new Map());
      setSelectedSceneId(value.scenes.find((scene) => scene.timingChanged)?.sceneId ?? value.scenes[0]?.sceneId ?? null);
    } catch (reason) {
      setReceipt(null); setReceiptSha(null); setCurrentness(null); setImages(new Map()); setSelectedSceneId(null);
      setError(reason instanceof Error ? reason.message : "invalid timing comparison receipt");
    }
  }

  async function loadSelected(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const value = JSON.parse(new TextDecoder().decode(buffer));
      if (!isSelected(value, projectId)) throw new Error("current selected Scene manifest schema / authority mismatch");
      setSelected(value);
      setSelectedSha(await createHash(buffer));
      setCurrentness(null);
    } catch (reason) {
      setSelected(null); setSelectedSha(null); setCurrentness(null);
      setError(reason instanceof Error ? reason.message : "invalid selected Scene manifest");
    }
  }

  async function loadCurrentness(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const value = JSON.parse(await file.text());
      if (!isCurrentness(value, projectId)) throw new Error("timing currentness schema / authority / evidence boundary mismatch");
      setCurrentness(value);
    } catch (reason) {
      setCurrentness(null);
      setError(reason instanceof Error ? reason.message : "invalid timing currentness");
    }
  }

  async function loadStillFiles(files: FileList | null) {
    if (!files || !receipt) return;
    setError(null);
    const expectedBySha = new Map<string, ExpectedStill[]>();
    for (const scene of receipt.scenes) for (const side of ["before", "after"] as const) for (const still of scene[side].stills) {
      expectedBySha.set(still.sha256, [...(expectedBySha.get(still.sha256) ?? []), {sceneId: scene.sceneId, side, kind: still.kind, sha256: still.sha256}]);
    }
    const next = new Map(images);
    let matched = 0;
    for (const file of Array.from(files)) {
      const buffer = await file.arrayBuffer();
      const sha256 = await createHash(buffer);
      const targets = expectedBySha.get(sha256) ?? [];
      if (targets.length === 0) { setError(`STILL_SHA_MISMATCH_OR_NOT_IN_RECEIPT: ${file.name}`); continue; }
      for (const target of targets) {
        const key = stillKey(target.sceneId, target.side, target.kind);
        const previous = next.get(key); if (previous) URL.revokeObjectURL(previous.url);
        next.set(key, {name: file.name, sha256, url: URL.createObjectURL(file)}); matched++;
      }
    }
    if (matched === 0 && files.length > 0) setError("STILL_SHA_MISMATCH: no selected file matched the timing comparison receipt");
    setImages(next);
  }

  const browserBinding = useMemo(() => {
    if (!receipt) return {state: "NOT_RUN" as const, stale: [] as string[]};
    if (!selected) return {state: "WAITING_SELECTED" as const, stale: [] as string[]};
    const selectedByScene = new Map(selected.scenes.map((scene) => [scene.sceneId, scene]));
    const stale: string[] = [];
    for (const scene of receipt.scenes) {
      const current = selectedByScene.get(scene.sceneId);
      if (!current
        || current.sourceRevision !== scene.after.sourceRevision
        || current.patternId !== scene.patternId
        || current.productionRole !== scene.productionRole
        || current.timing.revision !== scene.after.timingRevision
        || current.timing.durationFrames !== scene.after.timing.durationFrames
        || current.timing.targetDurationSeconds !== scene.after.timing.targetDurationSeconds) stale.push(scene.sceneId);
    }
    return {state: stale.length === 0 ? "CURRENT" as const : "STALE" as const, stale};
  }, [receipt, selected]);

  const strictBinding = useMemo(() => {
    if (!currentness) return {state: "NOT_RUN" as const, mismatch: "STRICT_CURRENTNESS_NOT_LOADED"};
    if (!receiptSha || !selectedSha) return {state: "NOT_RUN" as const, mismatch: "RECEIPT_OR_SELECTED_SHA_NOT_LOADED"};
    if (currentness.source.receiptSha256 !== receiptSha) return {state: "STALE" as const, mismatch: "CURRENTNESS_RECEIPT_SHA_MISMATCH"};
    if (currentness.source.currentSelectedSha256 !== selectedSha) return {state: "STALE" as const, mismatch: "CURRENTNESS_SELECTED_SHA_MISMATCH"};
    if (currentness.state !== "CURRENT" || currentness.mismatches.length > 0) return {state: "STALE" as const, mismatch: currentness.mismatches.join(" / ") || "STRICT_CURRENTNESS_STALE"};
    if (!Object.values(currentness.checks).every(Boolean)) return {state: "STALE" as const, mismatch: "STRICT_CURRENTNESS_CHECK_FALSE"};
    return {state: "CURRENT" as const, mismatch: null};
  }, [currentness, receiptSha, selectedSha]);

  const selectedComparison = receipt?.scenes.find((scene) => scene.sceneId === selectedSceneId) ?? null;
  const beforeStill = selectedComparison?.before.stills.find((still) => still.kind === selectedKind) ?? null;
  const afterStill = selectedComparison?.after.stills.find((still) => still.kind === selectedKind) ?? null;
  const beforeImage = selectedComparison && beforeStill ? images.get(stillKey(selectedComparison.sceneId, "before", beforeStill.kind)) : null;
  const afterImage = selectedComparison && afterStill ? images.get(stillKey(selectedComparison.sceneId, "after", afterStill.kind)) : null;

  const rhythm = useMemo(() => {
    if (!selected || !receipt) return null;
    const comparisonByScene = new Map(receipt.scenes.map((scene) => [scene.sceneId, scene]));
    let beforeCursor = 0; let afterCursor = 0;
    const rows = selected.scenes.map((scene) => {
      const comparison = comparisonByScene.get(scene.sceneId);
      const afterDuration = scene.timing.computedDurationSeconds;
      const beforeDuration = comparison?.timingChanged ? comparison.before.timing.computedDurationSeconds : afterDuration;
      const row = {sceneId: scene.sceneId, beforeStart: beforeCursor, afterStart: afterCursor, beforeEnd: beforeCursor + beforeDuration, afterEnd: afterCursor + afterDuration};
      beforeCursor += beforeDuration; afterCursor += afterDuration;
      return row;
    });
    return {beforeTotal: beforeCursor, afterTotal: afterCursor, delta: afterCursor - beforeCursor, rows};
  }, [selected, receipt]);

  const changedScenes = receipt?.scenes.filter((scene) => scene.timingChanged) ?? [];
  const canReview = browserBinding.state === "CURRENT"
    && strictBinding.state === "CURRENT"
    && Boolean(selectedComparison?.timingChanged)
    && Boolean(beforeImage && afterImage);
  const receiptPath = `out/qa/project-real-media-preview/${projectId}/${projectId}-timing-before-after.json`;
  const selectedPath = `out/qa/project-selected-scenes/${projectId}/${projectId}-selected-scenes.json`;
  const currentnessPath = `out/qa/project-real-media-preview/${projectId}/${projectId}-timing-before-after-currentness.json`;
  const strictCommand = `node --no-warnings motion-studio/scripts/verify-wedding-project-real-media-timing-qa-comparison-currentness.mts --receipt=${receiptPath} --current-selected=${selectedPath} --strict-current --output=${currentnessPath}`;

  return (
    <section className="mt-3 border-2 border-sky-300 p-3 dark:border-sky-800" data-real-media-timing-comparison-review={projectId} data-timing-comparison-current={browserBinding.state} data-timing-comparison-strict-current={strictBinding.state} data-human-visual-qa="NOT_RUN">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-sky-700 dark:text-sky-300">TIMING BEFORE / AFTER VISUAL REVIEW / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold">同一media・framingのままHuman timing修正だけを実stillと尺で比較</p>
          <p className="mt-1 text-[8px] opacity-70">receipt + current selected Scene + canonical strict-current + SHA一致stillを要求。どちらのテンポが良いかはHumanが再判定するまでNOT_RUNです。</p>
        </div>
        <div className="flex gap-1"><span className="border border-sky-300 px-2 py-1 font-mono text-[8px]">LIVE {browserBinding.state}</span><span className="border border-sky-300 px-2 py-1 font-mono text-[8px]">STRICT {strictBinding.state}</span></div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <label className="border border-sky-200 p-2 text-[8px]">Timing comparison receipt<input className="mt-1 block w-full text-[8px]" type="file" accept="application/json" onChange={(event) => void loadReceipt(event.target.files?.[0] ?? null)} /></label>
        <label className="border border-sky-200 p-2 text-[8px]">Current selected Scene manifest<input className="mt-1 block w-full text-[8px]" type="file" accept="application/json" onChange={(event) => void loadSelected(event.target.files?.[0] ?? null)} /></label>
        <label className="border border-sky-200 p-2 text-[8px]">Strict-current result<input className="mt-1 block w-full text-[8px]" type="file" accept="application/json" onChange={(event) => void loadCurrentness(event.target.files?.[0] ?? null)} /></label>
      </div>
      <label className="mt-2 block border border-sky-200 p-2 text-[8px]">Before / After QA still files<input className="mt-1 block w-full text-[8px]" type="file" accept="image/*" multiple onChange={(event) => void loadStillFiles(event.target.files)} /></label>

      <div className="mt-3 border border-sky-200 p-2 text-[8px] leading-4">
        <p className="font-semibold">Canonical strict-current</p>
        <code className="block max-w-full overflow-x-auto whitespace-nowrap">{strictCommand}</code>
        {strictBinding.mismatch ? <p className="mt-1 text-amber-700 dark:text-amber-300">{strictBinding.mismatch}</p> : null}
        {browserBinding.stale.length > 0 ? <p className="mt-1 text-amber-700 dark:text-amber-300">STALE Scene: {browserBinding.stale.join(", ")}</p> : null}
      </div>

      {rhythm ? <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className="border border-sky-200 p-2 text-[8px]"><p className="opacity-60">BEFORE TOTAL</p><p className="font-mono text-[12px]">{seconds(rhythm.beforeTotal)}</p></div>
        <div className="border border-sky-200 p-2 text-[8px]"><p className="opacity-60">AFTER TOTAL</p><p className="font-mono text-[12px]">{seconds(rhythm.afterTotal)}</p></div>
        <div className="border border-sky-200 p-2 text-[8px]"><p className="opacity-60">MOVIE DELTA</p><p className="font-mono text-[12px]">{rhythm.delta >= 0 ? "+" : ""}{seconds(rhythm.delta)}</p></div>
      </div> : null}

      {receipt ? <div className="mt-3 flex flex-wrap gap-1">{changedScenes.map((scene) => <button key={scene.sceneId} type="button" className={`border px-2 py-1 text-[8px] ${selectedSceneId === scene.sceneId ? "border-sky-600 font-semibold" : "border-sky-200"}`} onClick={() => setSelectedSceneId(scene.sceneId)}>{scene.sceneId}</button>)}</div> : null}

      {selectedComparison ? <div className="mt-3 border border-sky-200 p-2" data-timing-comparison-scene={selectedComparison.sceneId}>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="border border-sky-100 p-2 text-[8px]"><p className="font-semibold">BEFORE</p><p>{seconds(selectedComparison.before.timing.computedDurationSeconds)} / {selectedComparison.before.timing.durationFrames}f @ {selectedComparison.before.timing.fps}fps</p><p className="font-mono break-all">{selectedComparison.before.timingRevision}</p></div>
          <div className="border border-sky-100 p-2 text-[8px]"><p className="font-semibold">AFTER</p><p>{seconds(selectedComparison.after.timing.computedDurationSeconds)} / {selectedComparison.after.timing.durationFrames}f @ {selectedComparison.after.timing.fps}fps</p><p className="font-mono break-all">{selectedComparison.after.timingRevision}</p></div>
        </div>
        {rhythm ? (() => { const row = rhythm.rows.find((item) => item.sceneId === selectedComparison.sceneId); return row ? <p className="mt-2 text-[8px]">隣接transition位置: Scene end BEFORE {seconds(row.beforeEnd)} → AFTER {seconds(row.afterEnd)} / Δ {row.afterEnd - row.beforeEnd >= 0 ? "+" : ""}{seconds(row.afterEnd - row.beforeEnd)}</p> : null; })() : null}

        <div className="mt-2 flex flex-wrap gap-1">{SAMPLE_KINDS.map((kind) => <button type="button" key={kind} className={`border px-2 py-1 text-[8px] ${selectedKind === kind ? "border-sky-600 font-semibold" : "border-sky-200"}`} onClick={() => setSelectedKind(kind)}>{kind}</button>)}</div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="border border-sky-100 p-2"><p className="mb-1 text-[8px] font-semibold">BEFORE / {beforeStill?.frame ?? "-"}f / {beforeStill?.seconds?.toFixed(2) ?? "-"}s</p>{beforeImage ? <img className="w-full" src={beforeImage.url} alt={`Before ${selectedComparison.sceneId} ${selectedKind}`} /> : <div className="grid aspect-video place-items-center bg-black/5 text-[8px]">SHA一致stillを選択</div>}</div>
          <div className="border border-sky-100 p-2"><p className="mb-1 text-[8px] font-semibold">AFTER / {afterStill?.frame ?? "-"}f / {afterStill?.seconds?.toFixed(2) ?? "-"}s</p>{afterImage ? <img className="w-full" src={afterImage.url} alt={`After ${selectedComparison.sceneId} ${selectedKind}`} /> : <div className="grid aspect-video place-items-center bg-black/5 text-[8px]">SHA一致stillを選択</div>}</div>
        </div>
      </div> : null}

      <div className={`mt-3 border-2 p-2 text-[8px] ${canReview ? "border-emerald-400" : "border-amber-300"}`} data-timing-human-review-ready={canReview ? "READY" : "BLOCKED"}>
        <p className="font-semibold">{canReview ? "HUMAN REVIEW READY" : "HUMAN REVIEW BLOCKED"}</p>
        <p className="mt-1">READYは比較証拠がCURRENTで、receipt/selected SHAがstrict-currentと一致し、選択中Before/After stillもSHA一致した場合だけ。Human visual QA自体は引き続きNOT_RUN。</p>
      </div>
      {error ? <p className="mt-2 text-[8px] text-red-700 dark:text-red-300">{error}</p> : null}
    </section>
  );
}
