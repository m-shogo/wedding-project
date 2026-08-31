import {useEffect, useRef, useState} from "react";
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

type LocalVideo = {name: string; url: string};

function fileName(path: string) {
  return path.split(/[\\/]/).pop() ?? path;
}

export function SelectedSceneRenderProjectCard({projectId, batchReady}: {projectId: SceneProjectId; batchReady: boolean}) {
  const [copied, setCopied] = useState(false);
  const [manifest, setManifest] = useState<SelectedSceneManifest | null>(null);
  const [manifestError, setManifestError] = useState<string | null>(null);
  const [videos, setVideos] = useState<Record<string, LocalVideo>>({});
  const objectUrls = useRef<Set<string>>(new Set());
  const command = `node --no-warnings motion-studio/scripts/render-selected-wedding-typography-scenes.mts --batch="$HOME/Downloads/${projectId}-typography-production-batch.json" --render`;

  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.current.clear();
  }, []);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
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
      setManifest(parsed);
    } catch (error) {
      setManifest(null);
      setManifestError(error instanceof Error ? error.message : "manifest parse failed");
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

  const currentManifest = manifest?.projectId === projectId ? manifest : null;
  const matched = currentManifest?.scenes.filter((scene) => Boolean(videos[fileName(scene.output)])).length ?? 0;

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
        {currentManifest ? <span className="px-2 py-1 font-mono text-[7px] text-indigo-600 dark:text-indigo-300">MANIFEST {currentManifest.summary.renderedScenes}/{currentManifest.summary.totalScenes} rendered / LOCAL VIDEO {matched}/{currentManifest.scenes.length}</span> : null}
      </div>

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

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">CLI render + SHA manifest + LOCAL playbackはPalmier配置用visual referenceです。Remotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI ActualはすべてNOT_RUNのまま。productionReadyへ自動昇格しません。</p>
    </div>
  );
}
