import {useEffect, useMemo, useRef, useState} from "react";
import type {SceneProjectId} from "../data/visualSceneComposer";

type SelectedSceneManifest = {
  schemaVersion: "wedding-movie-selected-scene-render-manifest/v1";
  authority: "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH";
  projectId: SceneProjectId;
  sourceBatch: {sha256: string};
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
  summary: {totalScenes: number; renderedScenes: number; productionReady: false};
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"};
};

type LocalVideo = {name: string; url: string};

function baseName(path: string) {
  return path.split(/[\\/]/).pop() ?? path;
}

export function PalmierSelectedVisualReferenceCard({projectId}: {projectId: SceneProjectId}) {
  const [manifest, setManifest] = useState<SelectedSceneManifest | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [operatorSyncedSceneId, setOperatorSyncedSceneId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Record<string, LocalVideo>>({});
  const [error, setError] = useState<string | null>(null);
  const objectUrls = useRef<Set<string>>(new Set());

  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.current.clear();
  }, []);

  useEffect(() => {
    const operatorSelector = `[data-palmier-assembly-operator="${projectId}"]`;
    const syncFromOperator = () => {
      const operator = document.querySelector<HTMLElement>(operatorSelector);
      const active = operator?.querySelector<HTMLElement>('[data-palmier-active-scene="true"]');
      if (!active?.id) return;
      const prefix = `palmier-${projectId}-`;
      const revisionKey = active.id.startsWith(prefix) ? active.id.slice(prefix.length) : null;
      const splitIndex = revisionKey?.lastIndexOf("@") ?? -1;
      const sceneId = splitIndex > 0 ? revisionKey!.slice(0, splitIndex) : null;
      if (!sceneId) return;
      setOperatorSyncedSceneId(sceneId);
      setActiveSceneId(sceneId);
    };

    syncFromOperator();
    const observer = new MutationObserver(syncFromOperator);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-palmier-active-scene"],
    });
    return () => observer.disconnect();
  }, [projectId]);

  async function loadManifest(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const parsed = JSON.parse(await file.text()) as SelectedSceneManifest;
      if (
        parsed.schemaVersion !== "wedding-movie-selected-scene-render-manifest/v1" ||
        parsed.authority !== "DERIVED_FROM_CURRENT_PROJECT_TYPOGRAPHY_BATCH" ||
        parsed.projectId !== projectId ||
        parsed.summary?.productionReady !== false ||
        parsed.evidenceBoundary?.remotionStudioGuiActual !== "NOT_RUN" ||
        parsed.evidenceBoundary?.palmierGuiActual !== "NOT_RUN" ||
        parsed.evidenceBoundary?.macDaVinciGuiActual !== "NOT_RUN" ||
        !Array.isArray(parsed.scenes)
      ) throw new Error("manifest identity/evidence boundary mismatch");
      setManifest(parsed);
      const preferred = operatorSyncedSceneId && parsed.scenes.some((scene) => scene.sceneId === operatorSyncedSceneId)
        ? operatorSyncedSceneId
        : parsed.scenes[0]?.sceneId ?? null;
      setActiveSceneId(preferred);
    } catch (cause) {
      setManifest(null);
      setActiveSceneId(null);
      setError(cause instanceof Error ? cause.message : "manifest parse failed");
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

  const activeIndex = useMemo(() => manifest?.scenes.findIndex((scene) => scene.sceneId === activeSceneId) ?? -1, [manifest, activeSceneId]);
  const activeScene = activeIndex >= 0 ? manifest?.scenes[activeIndex] ?? null : null;
  const activeVideo = activeScene ? videos[baseName(activeScene.output)] ?? null : null;
  const matchedCount = manifest?.scenes.filter((scene) => Boolean(videos[baseName(scene.output)])).length ?? 0;
  const followsOperator = Boolean(activeScene && operatorSyncedSceneId === activeScene.sceneId);

  function move(delta: number) {
    if (!manifest || manifest.scenes.length === 0) return;
    const nextIndex = Math.max(0, Math.min(manifest.scenes.length - 1, Math.max(0, activeIndex) + delta));
    setActiveSceneId(manifest.scenes[nextIndex].sceneId);
  }

  return (
    <section className="mt-3 border-2 border-indigo-300 dark:border-indigo-800 p-3" data-palmier-selected-visual-reference={projectId} data-palmier-visual-sync={followsOperator ? "OPERATOR_ACTIVE" : "MANUAL"}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-indigo-700 dark:text-indigo-300">PALMIER SELECTED VISUAL REFERENCE / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">#799のselected Scene render manifestとMP4をそのまま読み込み、Palmier Assembly Operatorの「次の未完Scene」とvisual referenceを自動同期します。</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`border px-2 py-1 font-mono text-[7px] ${followsOperator ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-sand-300 text-navy-400 dark:border-navy-700"}`}>{followsOperator ? "FOLLOWING OPERATOR" : "MANUAL VISUAL"}</span>
          <label className="cursor-pointer border border-indigo-300 dark:border-indigo-800 px-2 py-1 text-[7px] font-semibold text-indigo-700 dark:text-indigo-300">manifest<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void loadManifest(event.currentTarget.files?.[0] ?? null)} /></label>
          <label className="cursor-pointer border border-indigo-300 dark:border-indigo-800 px-2 py-1 text-[7px] font-semibold text-indigo-700 dark:text-indigo-300">selected MP4<input type="file" multiple accept="video/mp4,.mp4" className="sr-only" onChange={(event) => loadVideos(event.currentTarget.files)} /></label>
        </div>
      </div>

      {error ? <p className="mt-2 border border-rose-300 dark:border-rose-800 px-2 py-1 text-[7px] text-rose-700 dark:text-rose-300">INVALID / {error}</p> : null}

      {manifest ? (
        <>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border border-indigo-100 dark:border-indigo-900 p-2">
            <div className="font-mono text-[7px] text-navy-500 dark:text-navy-300">manifest {manifest.summary.renderedScenes}/{manifest.summary.totalScenes} rendered / local MP4 {matchedCount}/{manifest.scenes.length} / batch SHA {manifest.sourceBatch.sha256.slice(0, 12)}…</div>
            <div className="flex gap-1">
              <button type="button" disabled={activeIndex <= 0} onClick={() => move(-1)} className="border border-indigo-300 px-2 py-1 text-[7px] disabled:opacity-30 dark:border-indigo-800">← PREV</button>
              <button type="button" disabled={activeIndex < 0 || activeIndex >= manifest.scenes.length - 1} onClick={() => move(1)} className="border border-indigo-300 px-2 py-1 text-[7px] disabled:opacity-30 dark:border-indigo-800">NEXT →</button>
            </div>
          </div>

          <div className="mt-2 flex gap-1 overflow-x-auto pb-1" data-palmier-visual-scene-strip>
            {manifest.scenes.map((scene) => {
              const loaded = Boolean(videos[baseName(scene.output)]);
              const active = scene.sceneId === activeSceneId;
              return <button key={`${scene.sceneId}@${scene.sourceRevision}`} type="button" onClick={() => setActiveSceneId(scene.sceneId)} className={`shrink-0 border px-2 py-1 text-left text-[7px] ${active ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-sand-200 dark:border-navy-700"}`} data-palmier-visual-scene={scene.sceneId} data-local-render={loaded ? "LOADED" : "MISSING"}><span className="font-semibold">{scene.order}. {scene.sceneId}</span><br/><span className={loaded ? "text-emerald-600 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300"}>{loaded ? "MP4 READY" : "MP4 MISSING"}</span></button>;
            })}
          </div>

          {activeScene ? (
            <article className="mt-2 grid gap-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(230px,0.55fr)]" data-palmier-active-visual-reference={`${activeScene.sceneId}@${activeScene.sourceRevision}`}>
              <div className="aspect-video overflow-hidden border border-indigo-200 bg-navy-950/5 dark:border-indigo-900 dark:bg-black/20">
                {activeVideo ? <video key={activeVideo.url} className="h-full w-full object-cover" src={activeVideo.url} controls muted loop playsInline preload="metadata" /> : <div className="flex h-full items-center justify-center px-4 text-center text-[8px] text-navy-400">{baseName(activeScene.output)} を読み込むと、PalmierでこのSceneを配置する直前にselected visualを確認できます。</div>}
              </div>
              <div className="border border-indigo-100 dark:border-indigo-900 p-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">
                <p className="text-[9px] font-semibold text-navy-800 dark:text-sand-100">{activeScene.order}. {activeScene.sceneId}</p>
                <p className="mt-1 font-mono">revision {activeScene.sourceRevision}</p>
                <p className="mt-1">pattern <strong>{activeScene.patternId}</strong></p>
                <p>role <strong>{activeScene.productionRole}</strong></p>
                <p>class {activeScene.selectionClass ?? "CUSTOM"}</p>
                <p className="mt-1 font-mono">{activeScene.timeline.startSeconds.toFixed(2)}s → {activeScene.timeline.endSeconds.toFixed(2)}s / {activeScene.timeline.durationSeconds.toFixed(2)}s / {activeScene.timeline.frames}f</p>
                <p className="mt-1 break-all font-mono text-[6px]">render SHA {activeScene.render.sha256 ?? "NOT_RENDERED"}</p>
                <p className="mt-2 border-l-2 border-indigo-300 pl-2">{followsOperator ? "Assembly Operatorのactive Sceneと同期中。checklist完了でoperatorが次Sceneへauto-advanceすると、このvisualも同じSceneへ切り替わります。" : "手動Scene選択中。Operatorがactive Sceneを変更すると再び自動同期します。"}</p>
              </div>
            </article>
          ) : null}
        </>
      ) : (
        <p className="mt-2 border border-dashed border-indigo-200 dark:border-indigo-900 p-2 text-[7px] leading-3 text-navy-400">先にProject Deliveryでselected Sceneを一括renderし、そのmanifestとMP4をここへ読み込んでください。Operator active Sceneはmanifest読込前から監視しています。</p>
      )}

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">browser-memory visual reference only。DOM上のOperator active state同期・ファイル読込・再生・Scene切替はPalmier GUI Actual / Remotion Studio GUI Actual / Mac DaVinci GUI Actual / productionReadyを昇格しません。</p>
    </section>
  );
}
