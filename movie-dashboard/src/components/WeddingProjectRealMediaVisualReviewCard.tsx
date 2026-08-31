import {useEffect, useMemo, useState} from "react";
import {
  buildTypographyProjectDeliveryBatch,
} from "../data/typographyProjectDeliveryBatch";
import {listTypographyProductionRoleContexts} from "../data/typographyProductionRoleContextStore";
import {listTypographyProductionSelections} from "../data/typographyProductionSelectionStore";
import {loadMotionZukanComposerState, type SceneProjectId} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

type Verdict = "NOT_RUN" | "PASS" | "FAIL";
type SceneAxis = "CROP_SUBJECT_SAFE" | "TITLE_READABLE" | "TEXT_MEDIA_CONTRAST" | "NO_UNINTENDED_EDGE_CLIP" | "VISUAL_TEMPO_FEELS_INTENTIONAL";
type TransitionAxis = "TRANSITION_VISUALLY_CLEAN" | "NO_FLASH_OR_UNINTENDED_BLACK_FRAME" | "SUBJECT_CONTINUITY_ACCEPTABLE";
const SCENE_AXES: SceneAxis[] = ["CROP_SUBJECT_SAFE", "TITLE_READABLE", "TEXT_MEDIA_CONTRAST", "NO_UNINTENDED_EDGE_CLIP", "VISUAL_TEMPO_FEELS_INTENTIONAL"];
const TRANSITION_AXES: TransitionAxis[] = ["TRANSITION_VISUALLY_CLEAN", "NO_FLASH_OR_UNINTENDED_BLACK_FRAME", "SUBJECT_CONTINUITY_ACCEPTABLE"];

type Still = {kind: string; sceneId: string; sourceRevision: string; patternId: string; productionRole: string; frame: number; seconds: number; path: string; sha256: string; width: number; height: number};
type TransitionStill = {kind: string; fromSceneId: string; toSceneId: string; durationFrames: number; frame: number; seconds: number; path: string; sha256: string; width: number; height: number};
type StillsManifest = {
  schemaVersion: "wedding-movie-real-media-preview-qa-stills/v1";
  authority: "DERIVED_VISUAL_QA_ARTIFACTS_FROM_CURRENT_REAL_MEDIA_PREVIEW";
  projectId: SceneProjectId;
  source: {previewSha256: string; identitySha256: string | null};
  stills: Still[];
  transitionStills: TransitionStill[];
  summary: {sourceCurrentVerified: true; humanVisualQa: "NOT_RUN"; productionReady: false};
  evidenceBoundary: {visualQa: "NOT_RUN"; remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};

type SceneReview = {sceneId: string; axes: Record<SceneAxis, Verdict>; notes: string};
type TransitionReview = {fromSceneId: string; toSceneId: string; axes: Record<TransitionAxis, Verdict>; notes: string};
type ReviewEvidence = {
  schemaVersion: "wedding-movie-real-media-preview-human-visual-review/v1";
  authority: "HUMAN_REVIEW_ONLY";
  projectId: SceneProjectId;
  source: {stillsManifestPath: string; stillsManifestSha256: string; previewPath: string; previewSha256: string; previewIdentitySha256: string | null};
  scenes: SceneReview[];
  transitions: TransitionReview[];
  review: {overall: Verdict; reviewer: string | null; reviewedAt: string | null; notes: string};
  evidenceBoundary: {humanVisualQa: Verdict; remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};

function baseName(path: string) { return path.split(/[\\/]/).pop() ?? path; }
function emptySceneAxes(): Record<SceneAxis, Verdict> { return Object.fromEntries(SCENE_AXES.map((axis) => [axis, "NOT_RUN"])) as Record<SceneAxis, Verdict>; }
function emptyTransitionAxes(): Record<TransitionAxis, Verdict> { return Object.fromEntries(TRANSITION_AXES.map((axis) => [axis, "NOT_RUN"])) as Record<TransitionAxis, Verdict>; }
async function sha256Bytes(buffer: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}
async function sha256Text(text: string) { return sha256Bytes(new TextEncoder().encode(text).buffer); }

export function WeddingProjectRealMediaVisualReviewCard({projectId}: {projectId: SceneProjectId}) {
  const [manifest, setManifest] = useState<StillsManifest | null>(null);
  const [manifestSha, setManifestSha] = useState<string | null>(null);
  const [manifestFileName, setManifestFileName] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewEvidence | null>(null);
  const [reviewer, setReviewer] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const [images, setImages] = useState<Record<string, {url: string; state: "CURRENT" | "SHA_MISMATCH"}>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => Object.values(images).forEach((item) => URL.revokeObjectURL(item.url)), [images]);

  const liveCurrentness = useMemo(() => {
    if (!manifest) return {state: "NOT_RUN" as const, mismatches: [] as string[]};
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return {state: "STALE" as const, mismatches: ["PROJECT_TIMELINE_MISSING"]};
    const batch = buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, listTypographyProductionSelections(), listTypographyProductionRoleContexts());
    const mismatches: string[] = [];
    const identities = new Map<string, Still>();
    for (const still of manifest.stills) if (!identities.has(still.sceneId)) identities.set(still.sceneId, still);
    for (const scene of batch.scenes) {
      const carried = identities.get(scene.sceneId);
      if (!carried) { mismatches.push(`SCENE_MISSING:${scene.sceneId}`); continue; }
      if (carried.sourceRevision !== scene.sourceRevision) mismatches.push(`REVISION:${scene.sceneId}`);
      if (carried.patternId !== scene.selectedPatternId) mismatches.push(`PATTERN:${scene.sceneId}`);
      if (carried.productionRole !== scene.productionRole) mismatches.push(`ROLE:${scene.sceneId}`);
      if (scene.status !== "CURRENT_PACKAGE_READY") mismatches.push(`ROUTE:${scene.sceneId}`);
      if (scene.roleContextStatus !== "CURRENT_ROLE_CONTEXT") mismatches.push(`ROLE_CONTEXT:${scene.sceneId}`);
    }
    if (batch.summary.staleTransitions > 0) mismatches.push("TRANSITION_AUTHORITY_STALE");
    return {state: mismatches.length === 0 ? "CURRENT" as const : "STALE" as const, mismatches};
  }, [manifest, projectId]);

  const expectedFiles = useMemo(() => manifest ? [...manifest.stills, ...manifest.transitionStills] : [], [manifest]);
  const filesCurrent = expectedFiles.length > 0 && expectedFiles.every((still) => images[baseName(still.path)]?.state === "CURRENT");
  const editable = Boolean(manifest && review && manifestSha && review.source.stillsManifestSha256 === manifestSha && liveCurrentness.state === "CURRENT" && filesCurrent);

  const computedOverall = useMemo<Verdict>(() => {
    if (!review) return "NOT_RUN";
    const verdicts = [...review.scenes.flatMap((scene) => Object.values(scene.axes)), ...review.transitions.flatMap((edge) => Object.values(edge.axes))];
    if (verdicts.some((value) => value === "NOT_RUN")) return "NOT_RUN";
    return verdicts.some((value) => value === "FAIL") ? "FAIL" : "PASS";
  }, [review]);

  async function loadManifest(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const text = await file.text();
      const value = JSON.parse(text) as StillsManifest;
      if (value.schemaVersion !== "wedding-movie-real-media-preview-qa-stills/v1" || value.authority !== "DERIVED_VISUAL_QA_ARTIFACTS_FROM_CURRENT_REAL_MEDIA_PREVIEW" || value.projectId !== projectId) throw new Error("stills manifest schema/project mismatch");
      if (value.summary?.sourceCurrentVerified !== true || value.summary?.humanVisualQa !== "NOT_RUN" || value.summary?.productionReady !== false || value.evidenceBoundary?.visualQa !== "NOT_RUN") throw new Error("stills manifest evidence boundary invalid");
      const digest = await sha256Text(text);
      Object.values(images).forEach((item) => URL.revokeObjectURL(item.url));
      setImages({});
      setManifest(value);
      setManifestSha(digest);
      setManifestFileName(file.name);
      const sceneIds = [...new Set(value.stills.map((still) => still.sceneId))];
      setReview({
        schemaVersion: "wedding-movie-real-media-preview-human-visual-review/v1",
        authority: "HUMAN_REVIEW_ONLY",
        projectId,
        source: {stillsManifestPath: file.name, stillsManifestSha256: digest, previewPath: "", previewSha256: value.source.previewSha256, previewIdentitySha256: value.source.identitySha256 ?? null},
        scenes: sceneIds.map((sceneId) => ({sceneId, axes: emptySceneAxes(), notes: ""})),
        transitions: value.transitionStills.map((still) => ({fromSceneId: still.fromSceneId, toSceneId: still.toSceneId, axes: emptyTransitionAxes(), notes: ""})),
        review: {overall: "NOT_RUN", reviewer: null, reviewedAt: null, notes: ""},
        evidenceBoundary: {humanVisualQa: "NOT_RUN", remotionStudioGuiActual: "NOT_RUN", palmierGuiActual: "NOT_RUN", macDaVinciGuiActual: "NOT_RUN", productionReady: false},
      });
    } catch (cause) {
      setManifest(null); setReview(null); setManifestSha(null); setManifestFileName(null);
      setError(cause instanceof Error ? cause.message : "manifest invalid");
    }
  }

  async function loadStillFiles(fileList: FileList | null) {
    if (!fileList || !manifest) return;
    const expected = new Map(expectedFiles.map((still) => [baseName(still.path), still]));
    const next: Record<string, {url: string; state: "CURRENT" | "SHA_MISMATCH"}> = {...images};
    for (const file of Array.from(fileList)) {
      const target = expected.get(file.name);
      if (!target) continue;
      const digest = await sha256Bytes(await file.arrayBuffer());
      if (next[file.name]) URL.revokeObjectURL(next[file.name].url);
      next[file.name] = {url: URL.createObjectURL(file), state: digest === target.sha256 ? "CURRENT" : "SHA_MISMATCH"};
    }
    setImages(next);
  }

  function sceneVerdict(sceneId: string, axis: SceneAxis, verdict: Verdict) {
    if (!editable) return;
    setReview((current) => current ? {...current, scenes: current.scenes.map((scene) => scene.sceneId === sceneId ? {...scene, axes: {...scene.axes, [axis]: verdict}} : scene)} : current);
  }
  function transitionVerdict(fromSceneId: string, toSceneId: string, axis: TransitionAxis, verdict: Verdict) {
    if (!editable) return;
    setReview((current) => current ? {...current, transitions: current.transitions.map((edge) => edge.fromSceneId === fromSceneId && edge.toSceneId === toSceneId ? {...edge, axes: {...edge.axes, [axis]: verdict}} : edge)} : current);
  }

  function exportEvidence() {
    if (!review || !editable || !reviewer.trim() || computedOverall === "NOT_RUN") return;
    const output: ReviewEvidence = {...review, review: {overall: computedOverall, reviewer: reviewer.trim(), reviewedAt: new Date().toISOString(), notes: reviewNotes}, evidenceBoundary: {...review.evidenceBoundary, humanVisualQa: computedOverall}};
    downloadText(`${JSON.stringify(output, null, 2)}\n`, `${projectId}-human-visual-review.json`);
  }

  const finalizeCommand = `node --no-warnings motion-studio/scripts/wedding-project-real-media-preview-human-review.mts --stills-manifest="$HOME/Downloads/${manifestFileName ?? `${projectId}-real-media-preview-qa-stills-manifest.json`}" --evidence="$HOME/Downloads/${projectId}-human-visual-review.json" --output="$HOME/Downloads/${projectId}-human-visual-review-result.json" --correction-queue="$HOME/Downloads/${projectId}-human-visual-correction-queue.json"`;

  return (
    <section className="mt-3 border-2 border-fuchsia-300 p-3 dark:border-fuchsia-800" data-real-media-visual-review={projectId} data-live-currentness={liveCurrentness.state} data-files-current={filesCurrent ? "CURRENT" : "NOT_CURRENT"}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div><p className="text-[8px] font-semibold tracking-[0.14em] text-fuchsia-700 dark:text-fuchsia-300">REAL PREVIEW HUMAN VISUAL REVIEW / {projectId.toUpperCase()}</p><p className="mt-1 text-[11px] font-semibold">Still-based crop / readability / transition QA</p><p className="mt-1 text-[7px] text-navy-400">Humanがstillを見てPASS/FAIL。自動判定はしません。</p></div>
        <span className="border border-fuchsia-300 px-2 py-1 font-mono text-[8px] dark:border-fuchsia-800">{computedOverall}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-[8px]">
        <label className="cursor-pointer border px-2 py-1">1. Stills manifest<input className="hidden" type="file" accept="application/json,.json" onChange={(event) => void loadManifest(event.target.files?.[0] ?? null)} /></label>
        <label className={`cursor-pointer border px-2 py-1 ${manifest ? "" : "pointer-events-none opacity-40"}`}>2. PNG stills<input className="hidden" type="file" accept="image/png" multiple disabled={!manifest} onChange={(event) => void loadStillFiles(event.target.files)} /></label>
        <span className="border px-2 py-1">Authority {liveCurrentness.state}</span><span className="border px-2 py-1">Files {filesCurrent ? `${expectedFiles.length}/${expectedFiles.length} CURRENT` : `${Object.values(images).filter((item) => item.state === "CURRENT").length}/${expectedFiles.length}`}</span>
      </div>
      {error ? <p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">{error}</p> : null}
      {liveCurrentness.state === "STALE" ? <p className="mt-2 border border-amber-300 p-2 text-[8px]">STALE: {liveCurrentness.mismatches.join(" / ")}</p> : null}
      {expectedFiles.some((still) => images[baseName(still.path)]?.state === "SHA_MISMATCH") ? <p className="mt-2 border border-rose-300 p-2 text-[8px]">STILL_SHA_MISMATCH: 古い/別PNGが含まれています。</p> : null}

      {manifest && review ? <div className="mt-3 space-y-3">
        {review.scenes.map((scene) => {
          const samples = manifest.stills.filter((still) => still.sceneId === scene.sceneId);
          return <div key={scene.sceneId} className="border p-2" data-human-review-scene={scene.sceneId}>
            <p className="text-[9px] font-semibold">{scene.sceneId} / {samples[0]?.patternId} / {samples[0]?.productionRole}</p>
            <div className="mt-2 grid grid-cols-3 gap-1">{samples.map((still) => { const image=images[baseName(still.path)]; return <div key={`${still.sceneId}:${still.kind}`} className="border p-1 text-[6px]"><div className="aspect-video bg-navy-950">{image?.state === "CURRENT" ? <img src={image.url} alt={`${still.sceneId} ${still.kind}`} className="h-full w-full object-contain" /> : null}</div><p className="mt-1">{still.kind} / f{still.frame} / {image?.state ?? "NOT_LOADED"}</p></div>; })}</div>
            <div className="mt-2 grid gap-1 sm:grid-cols-2">{SCENE_AXES.map((axis) => <div key={axis} className="flex items-center justify-between gap-1 border px-1 py-1 text-[6px]"><span>{axis}</span><select disabled={!editable} value={scene.axes[axis]} onChange={(event) => sceneVerdict(scene.sceneId, axis, event.target.value as Verdict)}><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select></div>)}</div>
            <textarea disabled={!editable} value={scene.notes} onChange={(event) => setReview((current) => current ? {...current, scenes: current.scenes.map((item) => item.sceneId === scene.sceneId ? {...item, notes: event.target.value} : item)} : current)} placeholder="Human notes" className="mt-2 min-h-12 w-full border bg-transparent p-1 text-[7px]" />
          </div>;
        })}
        {review.transitions.map((edge) => { const still=manifest.transitionStills.find((item) => item.fromSceneId===edge.fromSceneId&&item.toSceneId===edge.toSceneId); const image=still ? images[baseName(still.path)] : null; return <div key={`${edge.fromSceneId}->${edge.toSceneId}`} className="border p-2" data-human-review-transition={`${edge.fromSceneId}->${edge.toSceneId}`}><p className="text-[9px] font-semibold">Transition {edge.fromSceneId} → {edge.toSceneId}</p>{still ? <div className="mt-2 max-w-sm border p-1 text-[6px]"><div className="aspect-video bg-navy-950">{image?.state === "CURRENT" ? <img src={image.url} alt="transition midpoint" className="h-full w-full object-contain" /> : null}</div><p>mid / f{still.frame} / {still.durationFrames}f</p></div> : null}<div className="mt-2 grid gap-1 sm:grid-cols-2">{TRANSITION_AXES.map((axis) => <div key={axis} className="flex items-center justify-between gap-1 border px-1 py-1 text-[6px]"><span>{axis}</span><select disabled={!editable} value={edge.axes[axis]} onChange={(event) => transitionVerdict(edge.fromSceneId, edge.toSceneId, axis, event.target.value as Verdict)}><option>NOT_RUN</option><option>PASS</option><option>FAIL</option></select></div>)}</div><textarea disabled={!editable} value={edge.notes} onChange={(event) => setReview((current) => current ? {...current, transitions: current.transitions.map((item) => item.fromSceneId===edge.fromSceneId&&item.toSceneId===edge.toSceneId ? {...item, notes:event.target.value}:item)}:current)} placeholder="Transition notes" className="mt-2 min-h-12 w-full border bg-transparent p-1 text-[7px]" /></div>; })}
      </div> : null}

      {review ? <div className="mt-3 border-t pt-2 text-[7px]"><div className="flex flex-wrap gap-2"><input value={reviewer} onChange={(event)=>setReviewer(event.target.value)} disabled={!editable} placeholder="Reviewer name" className="border bg-transparent px-2 py-1" /><input value={reviewNotes} onChange={(event)=>setReviewNotes(event.target.value)} disabled={!editable} placeholder="Overall notes" className="min-w-64 flex-1 border bg-transparent px-2 py-1" /><button type="button" disabled={!editable||!reviewer.trim()||computedOverall==="NOT_RUN"} onClick={exportEvidence} className="border px-2 py-1 disabled:opacity-40">Human evidence JSON export</button></div><code className="mt-2 block overflow-x-auto whitespace-nowrap">{finalizeCommand}</code><button type="button" onClick={()=>void navigator.clipboard.writeText(finalizeCommand)} className="mt-1 border px-2 py-1">finalize + correction queue commandをコピー</button></div> : null}
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] text-amber-800 dark:text-amber-200">Human still QA PASS/FAIL ≠ Remotion Studio GUI Actual PASS ≠ Palmier GUI Actual PASS ≠ Mac DaVinci GUI Actual PASS。productionReadyはfalseのままです。</p>
    </section>
  );
}
