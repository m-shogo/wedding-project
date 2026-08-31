import {useEffect, useRef, useState} from "react";
import {
  listTypographyProductionRoleContexts,
  TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT,
} from "../data/typographyProductionRoleContextStore";
import {
  listTypographyProductionSelections,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import type {SceneProjectId} from "../data/visualSceneComposer";

type SelectedSceneManifest = {
  schemaVersion: "wedding-movie-selected-scene-render-manifest/v1";
  authority: "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH";
  projectId: SceneProjectId;
  scenes: Array<{
    order: number;
    sceneId: string;
    sourceRevision: string;
    patternId: string;
    productionRole: string;
    selectionClass: string | null;
    timeline: {startSeconds: number; endSeconds: number; durationSeconds: number; frames: number; fps: number};
    output: string;
    render: {state: "PLANNED" | "RENDERED"; sha256: string | null; bytes: number | null};
  }>;
  summary: {totalScenes: number; renderedScenes: number; allSelectionsCurrent: true; productionReady: false};
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"};
};

type PreviewReelManifest = {
  schemaVersion: "wedding-movie-project-typography-preview-reel/v1";
  authority: "DERIVED_FROM_CURRENT_SELECTED_SCENE_RENDER_MANIFEST";
  projectId: SceneProjectId;
  fps: number;
  timeline: {
    totalFrames: number;
    durationSeconds: number;
    boundaries: Array<{
      order: number;
      sceneId: string;
      sourceRevision: string;
      patternId: string;
      productionRole: string;
      startFrame: number;
      endFrameExclusive: number;
      durationFrames: number;
      startSeconds: number;
      endSeconds: number;
      gapFromPreviousFrames: number;
    }>;
  };
  output: string;
  render: {state: "PLANNED" | "RENDERED"; sha256: string | null; bytes: number | null};
  summary: {totalScenes: number; frameBoundariesVerified: true; selectionsCurrent: true; productionReady: false};
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"};
};

type LocalVideo = {name: string; url: string};

function fileName(path: string) {
  return path.split(/[\\/]/).pop() ?? path;
}

function manifestMatchesCurrentHumanRouting(manifest: SelectedSceneManifest) {
  const selections = listTypographyProductionSelections();
  const roleContexts = listTypographyProductionRoleContexts();
  if (manifest.scenes.length === 0) return false;
  return manifest.scenes.every((scene) => {
    const selection = selections.find((item) => item.sceneId === scene.sceneId);
    const role = roleContexts.find((item) => item.sceneId === scene.sceneId);
    return Boolean(
      selection
      && role
      && selection.sourceRevision === scene.sourceRevision
      && selection.patternId === scene.patternId
      && role.projectId === manifest.projectId
      && role.sourceRevision === scene.sourceRevision
      && role.patternId === scene.patternId
      && role.productionRole === scene.productionRole
      && role.routeSelectedAt === selection.selectedAt,
    );
  });
}

function reelMatchesSelectedManifest(reel: PreviewReelManifest, selected: SelectedSceneManifest) {
  if (reel.projectId !== selected.projectId || reel.timeline.boundaries.length !== selected.scenes.length) return false;
  return reel.timeline.boundaries.every((boundary, index) => {
    const scene = selected.scenes[index];
    return Boolean(
      scene
      && boundary.sceneId === scene.sceneId
      && boundary.sourceRevision === scene.sourceRevision
      && boundary.patternId === scene.patternId
      && boundary.productionRole === scene.productionRole,
    );
  });
}

export function SelectedSceneRenderProjectCard({projectId, batchReady}: {projectId: SceneProjectId; batchReady: boolean}) {
  const [copied, setCopied] = useState(false);
  const [reelCopied, setReelCopied] = useState(false);
  const [manifest, setManifest] = useState<SelectedSceneManifest | null>(null);
  const [manifestError, setManifestError] = useState<string | null>(null);
  const [videos, setVideos] = useState<Record<string, LocalVideo>>({});
  const [reelManifest, setReelManifest] = useState<PreviewReelManifest | null>(null);
  const [reelError, setReelError] = useState<string | null>(null);
  const [reelVideo, setReelVideo] = useState<LocalVideo | null>(null);
  const [routingRevision, setRoutingRevision] = useState(0);
  const objectUrls = useRef<Set<string>>(new Set());
  const reelPlayer = useRef<HTMLVideoElement | null>(null);
  const command = `node --no-warnings motion-studio/scripts/render-selected-wedding-typography-scenes.mts --batch="$HOME/Downloads/${projectId}-typography-production-batch.json" --render`;
  const reelCommand = `node --no-warnings motion-studio/scripts/render-wedding-project-typography-preview-reel.mts --selected-manifest="$HOME/Downloads/${projectId}-selected-scene-render-manifest.json" --render`;

  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.current.clear();
  }, []);

  useEffect(() => {
    const refreshRouting = () => {
      reelPlayer.current?.pause();
      setRoutingRevision((value) => value + 1);
    };
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refreshRouting);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refreshRouting);
    return () => {
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refreshRouting);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refreshRouting);
    };
  }, []);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  async function copyReelCommand() {
    await navigator.clipboard.writeText(reelCommand);
    setReelCopied(true);
    window.setTimeout(() => setReelCopied(false), 1400);
  }

  async function loadManifest(file: File | null) {
    if (!file) return;
    setManifestError(null);
    try {
      const parsed = JSON.parse(await file.text()) as SelectedSceneManifest;
      if (
        parsed.schemaVersion !== "wedding-movie-selected-scene-render-manifest/v1" ||
        parsed.authority !== "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH" ||
        parsed.projectId !== projectId ||
        parsed.summary?.productionReady !== false ||
        parsed.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" ||
        parsed.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" ||
        parsed.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN"
      ) {
        throw new Error("manifest identity/evidence boundary mismatch");
      }
      if (!manifestMatchesCurrentHumanRouting(parsed)) {
        throw new Error("manifest is stale against current Human-selected route / Role context");
      }
      setManifest(parsed);
    } catch (error) {
      setManifest(null);
      setManifestError(error instanceof Error ? error.message : "manifest parse failed");
    }
  }

  async function loadReelManifest(file: File | null) {
    if (!file) return;
    setReelError(null);
    try {
      const parsed = JSON.parse(await file.text()) as PreviewReelManifest;
      if (
        parsed.schemaVersion !== "wedding-movie-project-typography-preview-reel/v1" ||
        parsed.authority !== "DERIVED_FROM_CURRENT_SELECTED_SCENE_RENDER_MANIFEST" ||
        parsed.projectId !== projectId ||
        parsed.summary?.frameBoundariesVerified !== true ||
        parsed.summary?.selectionsCurrent !== true ||
        parsed.summary?.productionReady !== false ||
        parsed.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" ||
        parsed.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" ||
        parsed.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN"
      ) {
        throw new Error("preview reel identity/evidence boundary mismatch");
      }
      if (!manifest || !manifestMatchesCurrentHumanRouting(manifest) || !reelMatchesSelectedManifest(parsed, manifest)) {
        throw new Error("preview reel is stale against current selected Scene manifest / Human routing");
      }
      setReelManifest(parsed);
    } catch (error) {
      setReelManifest(null);
      setReelError(error instanceof Error ? error.message : "preview reel manifest parse failed");
    }
  }

  function loadVideos(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files);
    setVideos((current) => {
      Object.values(current).forEach((video) => {
        URL.revokeObjectURL(video.url);
        objectUrls.current.delete(video.url);
      });
      const next: Record<string, LocalVideo> = {};
      incoming.forEach((file) => {
        const url = URL.createObjectURL(file);
        objectUrls.current.add(url);
        next[file.name] = {name: file.name, url};
      });
      return next;
    });
  }

  function loadReelVideo(file: File | null) {
    if (!file) return;
    setReelVideo((current) => {
      if (current) {
        URL.revokeObjectURL(current.url);
        objectUrls.current.delete(current.url);
      }
      const url = URL.createObjectURL(file);
      objectUrls.current.add(url);
      return {name: file.name, url};
    });
  }

  function seekReel(seconds: number) {
    if (!reelPlayer.current) return;
    reelPlayer.current.currentTime = Math.max(0, seconds - 0.25);
    void reelPlayer.current.play().catch(() => undefined);
  }

  const routingCurrent = Boolean(manifest && manifestMatchesCurrentHumanRouting(manifest));
  const currentManifest = manifest?.projectId === projectId && routingCurrent ? manifest : null;
  const reelCurrent = Boolean(currentManifest && reelManifest && reelMatchesSelectedManifest(reelManifest, currentManifest));
  const currentReel = reelManifest?.projectId === projectId && reelCurrent ? reelManifest : null;
  const matched = currentManifest?.scenes.filter((scene) => Boolean(videos[fileName(scene.output)])).length ?? 0;
  const reelFileMatches = Boolean(currentReel && reelVideo && fileName(currentReel.output) === reelVideo.name);
  void routingRevision;

  return (
    <div className="mt-2 border-2 border-indigo-300 dark:border-indigo-800 p-2.5" data-selected-scene-render-project={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-indigo-700 dark:text-indigo-300">SELECTED SCENE REMOTION RENDER / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Human-selected route + Role + current Scene revisionをProject Batchから読み、timeline順の実制作用visual referenceを一括renderします。stale Sceneはskipせずfail-closeします。</p>
        </div>
        <button type="button" disabled={!batchReady} onClick={() => void copyCommand()} className="border border-indigo-300 dark:border-indigo-800 px-2 py-1.5 text-[8px] font-semibold text-indigo-700 dark:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40">{copied ? "RENDER COMMAND COPIED ✓" : "選択済みSceneを全部render"}</button>
      </div>

      <code className="mt-2 block max-w-full overflow-x-auto whitespace-nowrap border-l-2 border-indigo-300 pl-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">{command}</code>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <label className="cursor-pointer border border-sky-300 dark:border-sky-800 px-2 py-1 text-[7px] font-semibold text-sky-700 dark:text-sky-300">render manifestを読み込む<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void loadManifest(event.currentTarget.files?.[0] ?? null)} /></label>
        <label className="cursor-pointer border border-sky-300 dark:border-sky-800 px-2 py-1 text-[7px] font-semibold text-sky-700 dark:text-sky-300">selected MP4を読み込む<input type="file" multiple accept="video/mp4,.mp4" className="sr-only" onChange={(event) => loadVideos(event.currentTarget.files)} /></label>
        {currentManifest ? <span className="px-2 py-1 font-mono text-[7px] text-indigo-600 dark:text-indigo-300">MANIFEST CURRENT / {currentManifest.summary.renderedScenes}/{currentManifest.summary.totalScenes} rendered / LOCAL VIDEO {matched}/{currentManifest.scenes.length}</span> : null}
      </div>

      {manifest && !routingCurrent ? <p className="mt-2 border-2 border-amber-300 px-2 py-1.5 text-[7px] font-semibold text-amber-800 dark:border-amber-800 dark:text-amber-200" data-selected-scene-routing-stale={projectId}>HUMAN ROUTE / ROLE CHANGED — loaded selected Scene manifestとcontinuous reelはSTALEです。最新Typography packageを書き出し → selected Scene再render → reel再renderしてください。</p> : null}
      {manifestError ? <p className="mt-2 border border-rose-300 px-2 py-1 text-[7px] text-rose-700 dark:border-rose-800 dark:text-rose-300">INVALID / {manifestError}</p> : null}

      {currentManifest ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {currentManifest.scenes.map((scene) => {
            const localVideo = videos[fileName(scene.output)];
            return (
              <article key={`${scene.sceneId}@${scene.sourceRevision}`} className="border border-indigo-100 dark:border-indigo-900 p-2" data-selected-scene-visual-reference={scene.sceneId}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{scene.order}. {scene.sceneId}</p>
                    <p className="mt-0.5 font-mono text-[7px] text-navy-400">{scene.productionRole} / {scene.patternId} / {scene.selectionClass ?? "CUSTOM"}</p>
                  </div>
                  <span className="font-mono text-[7px] text-indigo-600 dark:text-indigo-300">{scene.timeline.startSeconds.toFixed(2)}–{scene.timeline.endSeconds.toFixed(2)}s / {scene.timeline.frames}f</span>
                </div>
                <div className="mt-2 aspect-video bg-navy-950/5 dark:bg-black/20">
                  {localVideo ? <video className="h-full w-full object-cover" src={localVideo.url} controls muted loop playsInline preload="metadata" /> : <div className="flex h-full items-center justify-center px-3 text-center text-[8px] text-navy-400">{fileName(scene.output)} を読み込むとPalmier配置前のselected visual referenceを確認できます。</div>}
                </div>
                <p className="mt-1 break-all font-mono text-[6px] leading-3 text-navy-400">revision {scene.sourceRevision} / render {scene.render.state} / sha {scene.render.sha256 ?? "NOT_RENDERED"}</p>
              </article>
            );
          })}
        </div>
      ) : null}

      <div className="mt-3 border-2 border-violet-300 dark:border-violet-800 p-2.5" data-project-typography-preview-reel={projectId}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[8px] font-semibold tracking-[0.14em] text-violet-700 dark:text-violet-300">CONTINUOUS PROJECT PREVIEW REEL</p>
            <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">選択済みSceneをexact 30fps timelineへ並べ、1本のRemotion previewとしてrenderします。Scene単体では見えないpattern切替・尺・テンポ・前後のつながりをPalmier前に確認します。</p>
          </div>
          <button type="button" disabled={!currentManifest} onClick={() => void copyReelCommand()} className="border border-violet-300 dark:border-violet-800 px-2 py-1.5 text-[8px] font-semibold text-violet-700 dark:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40">{reelCopied ? "REEL COMMAND COPIED ✓" : "全Sceneを1本でrender"}</button>
        </div>
        <code className="mt-2 block max-w-full overflow-x-auto whitespace-nowrap border-l-2 border-violet-300 pl-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">{reelCommand}</code>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <label className="cursor-pointer border border-violet-300 dark:border-violet-800 px-2 py-1 text-[7px] font-semibold text-violet-700 dark:text-violet-300">reel manifestを読み込む<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void loadReelManifest(event.currentTarget.files?.[0] ?? null)} /></label>
          <label className="cursor-pointer border border-violet-300 dark:border-violet-800 px-2 py-1 text-[7px] font-semibold text-violet-700 dark:text-violet-300">continuous MP4を読み込む<input type="file" accept="video/mp4,.mp4" className="sr-only" onChange={(event) => loadReelVideo(event.currentTarget.files?.[0] ?? null)} /></label>
          {currentReel ? <span className="px-2 py-1 font-mono text-[7px] text-violet-600 dark:text-violet-300">REEL CURRENT / {currentReel.summary.totalScenes} Scenes / {currentReel.timeline.totalFrames}f / {currentReel.timeline.durationSeconds.toFixed(2)}s / FRAME BOUNDARY VERIFIED</span> : null}
        </div>
        {reelManifest && !reelCurrent ? <p className="mt-2 border border-amber-300 px-2 py-1 text-[7px] text-amber-800 dark:border-amber-800 dark:text-amber-200">REEL STALE / current Human route・Roleまたはselected Scene manifestと一致しません。旧reelはHuman rhythm evidenceに使わないでください。</p> : null}
        {reelError ? <p className="mt-2 border border-rose-300 px-2 py-1 text-[7px] text-rose-700 dark:border-rose-800 dark:text-rose-300">INVALID / {reelError}</p> : null}
        {currentReel ? (
          <>
            <div className="mt-2 aspect-video bg-navy-950/5 dark:bg-black/20">
              {reelVideo && reelFileMatches ? <video ref={reelPlayer} className="h-full w-full object-contain" src={reelVideo.url} controls playsInline preload="metadata" /> : <div className="flex h-full items-center justify-center px-3 text-center text-[8px] text-navy-400">{fileName(currentReel.output)} を読み込むと、全Sceneのcontinuous rhythm previewを確認できます。</div>}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {currentReel.timeline.boundaries.map((boundary) => (
                <button key={`${boundary.sceneId}@${boundary.startFrame}`} type="button" disabled={!reelFileMatches} onClick={() => seekReel(boundary.startSeconds)} className="border border-violet-200 dark:border-violet-900 px-2 py-1 text-left text-[7px] text-violet-700 dark:text-violet-300 disabled:opacity-40" data-preview-reel-scene={boundary.sceneId}>
                  {boundary.order}. {boundary.sceneId} · {boundary.startSeconds.toFixed(2)}s · {boundary.durationFrames}f{boundary.gapFromPreviousFrames !== 0 ? ` · GAP ${boundary.gapFromPreviousFrames}f` : ""}
                </button>
              ))}
            </div>
            <p className="mt-2 break-all font-mono text-[6px] leading-3 text-navy-400">render={currentReel.render.state} / sha={currentReel.render.sha256 ?? "NOT_RENDERED"} / local={reelFileMatches ? "MATCHED" : "NOT_LOADED"}</p>
          </>
        ) : null}
        <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">Continuous reelはHuman rhythm reviewを助けるCLI visual referenceです。再生・seek・frame boundary verifyだけではHuman approval / Remotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI Actual / productionReadyを昇格しません。</p>
      </div>

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">CLI render + SHA manifest + LOCAL playbackはPalmier配置用visual referenceです。Human route / Role変更後の旧manifest・旧reelはfail-closeでCURRENTから外します。Remotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI ActualはすべてNOT_RUNのまま。productionReadyへ自動昇格しません。</p>
    </div>
  );
}
