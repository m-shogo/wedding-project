import {useEffect, useMemo, useState} from "react";
import {downloadText} from "../lib/exporters";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type SceneProjectId,
} from "../data/visualSceneComposer";

type Fit = "COVER" | "CONTAIN";
type MediaScene = {
  sceneId: string;
  sourceRevision: string;
  kind: "IMAGE" | "VIDEO";
  path: string;
  sha256: string;
  humanApproved: boolean;
  framing?: {
    fit: Fit;
    focusX: number;
    focusY: number;
    scale: number;
    revision: string;
    sourceRevision?: string;
  };
};
type MediaManifest = {
  schemaVersion: "wedding-movie-production-media-input/v1";
  projectId: SceneProjectId;
  scenes: MediaScene[];
};

function isManifest(value: unknown, projectId: SceneProjectId): value is MediaManifest {
  if (!value || typeof value !== "object") return false;
  const manifest = value as Partial<MediaManifest>;
  return manifest.schemaVersion === "wedding-movie-production-media-input/v1"
    && manifest.projectId === projectId
    && Array.isArray(manifest.scenes)
    && manifest.scenes.every((scene) => Boolean(scene?.sceneId && scene?.sourceRevision && scene?.path && scene?.sha256)
      && (scene.kind === "IMAGE" || scene.kind === "VIDEO")
      && typeof scene.humanApproved === "boolean");
}

function normalizeNumber(value: number) {
  return Number(value.toFixed(2));
}

function revisionFor(scene: MediaScene, fit: Fit, focusX: number, focusY: number, scale: number) {
  return `${scene.sourceRevision}__${fit.toLowerCase()}__x${normalizeNumber(focusX)}__y${normalizeNumber(focusY)}__s${normalizeNumber(scale)}`;
}

function currentFraming(scene: MediaScene) {
  return scene.framing ?? {
    fit: "COVER" as const,
    focusX: 50,
    focusY: 50,
    scale: 1,
    revision: "DEFAULT_CENTER_COVER",
    sourceRevision: scene.sourceRevision,
  };
}

export function WeddingRealMediaFramingOperatorCard({projectId}: {projectId: SceneProjectId}) {
  const [manifest, setManifest] = useState<MediaManifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [composerRevision, setComposerRevision] = useState(0);

  const currentSceneRevisions = useMemo(() => {
    void composerRevision;
    const state = loadMotionZukanComposerState();
    return new Map(state.scenes.filter((scene) => scene.projectId === projectId).map((scene) => [scene.id, scene.sourceRevision]));
  }, [projectId, composerRevision]);

  useEffect(() => {
    const refresh = () => setComposerRevision((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
  }, []);

  async function loadFile(file: File | null) {
    if (!file) return;
    setError(null);
    try {
      const value = JSON.parse(await file.text());
      if (!isManifest(value, projectId)) throw new Error("schema / project / media binding mismatch");
      setManifest(value);
    } catch (reason) {
      setManifest(null);
      setError(reason instanceof Error ? reason.message : "invalid production media manifest");
    }
  }

  function updateFraming(sceneId: string, patch: Partial<{fit: Fit; focusX: number; focusY: number; scale: number}>) {
    setManifest((current) => {
      if (!current) return current;
      return {
        ...current,
        scenes: current.scenes.map((scene) => {
          if (scene.sceneId !== sceneId) return scene;
          const liveRevision = currentSceneRevisions.get(scene.sceneId);
          if (!liveRevision || liveRevision !== scene.sourceRevision) return scene;
          const framing = currentFraming(scene);
          const fit = patch.fit ?? framing.fit;
          const focusX = Math.max(0, Math.min(100, patch.focusX ?? framing.focusX));
          const focusY = Math.max(0, Math.min(100, patch.focusY ?? framing.focusY));
          const scale = Math.max(1, Math.min(2, patch.scale ?? framing.scale));
          return {
            ...scene,
            framing: {
              fit,
              focusX: normalizeNumber(focusX),
              focusY: normalizeNumber(focusY),
              scale: normalizeNumber(scale),
              revision: revisionFor(scene, fit, focusX, focusY, scale),
              sourceRevision: scene.sourceRevision,
            },
          };
        }),
      };
    });
  }

  const staleSceneIds = manifest?.scenes.filter((scene) => currentSceneRevisions.get(scene.sceneId) !== scene.sourceRevision).map((scene) => scene.sceneId) ?? [];
  const canExport = Boolean(manifest) && staleSceneIds.length === 0;

  return (
    <section className="mt-3 border-2 border-cyan-300 dark:border-cyan-800 p-3" data-real-media-framing-operator={projectId} data-framing-current={canExport ? "CURRENT" : manifest ? "STALE" : "NOT_RUN"}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-cyan-700 dark:text-cyan-300">REAL MEDIA FRAMING OPERATOR / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold">Human crop / focusをproduction media manifestへ保存</p>
          <p className="mt-1 text-[8px] opacity-70">COVER / CONTAIN、focus X/Y、scaleを変更するとframing revisionも更新。Scene revision drift時は編集・exportをfail-closeします。</p>
        </div>
        <label className="cursor-pointer border border-cyan-300 px-2.5 py-1.5 text-[8px] font-semibold">
          Media JSON読込
          <input className="hidden" type="file" accept="application/json,.json" onChange={(event) => void loadFile(event.target.files?.[0] ?? null)} />
        </label>
      </div>

      {error ? <p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">MEDIA_MANIFEST_INVALID: {error}</p> : null}
      {staleSceneIds.length > 0 ? <p className="mt-2 border border-amber-300 p-2 text-[8px] text-amber-800">STALE_REAL_MEDIA_FRAMING_BINDING: {staleSceneIds.join(" / ")}。現在のScene revisionへsilent rebaseしません。</p> : null}

      {manifest ? <div className="mt-2 space-y-2">
        {manifest.scenes.map((scene) => {
          const framing = currentFraming(scene);
          const stale = currentSceneRevisions.get(scene.sceneId) !== scene.sourceRevision;
          return <div key={scene.sceneId} className="border p-2 text-[8px]" data-real-media-framing-scene={scene.sceneId} data-source-revision={scene.sourceRevision} data-framing-revision={framing.revision}>
            <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold">{scene.sceneId} / {scene.kind}</span><span className="font-mono">{stale ? "STALE" : scene.humanApproved ? "MEDIA APPROVED / EDITABLE" : "MEDIA NOT APPROVED"}</span></div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
              <label>Fit<select disabled={stale} value={framing.fit} onChange={(event) => updateFraming(scene.sceneId, {fit: event.target.value as Fit})} className="block w-full border bg-transparent p-1"><option value="COVER">COVER</option><option value="CONTAIN">CONTAIN</option></select></label>
              <label>Focus X<input disabled={stale} type="range" min="0" max="100" step="1" value={framing.focusX} onChange={(event) => updateFraming(scene.sceneId, {focusX: Number(event.target.value)})} className="block w-full" /><span className="font-mono">{framing.focusX}%</span></label>
              <label>Focus Y<input disabled={stale} type="range" min="0" max="100" step="1" value={framing.focusY} onChange={(event) => updateFraming(scene.sceneId, {focusY: Number(event.target.value)})} className="block w-full" /><span className="font-mono">{framing.focusY}%</span></label>
              <label>Scale<input disabled={stale} type="range" min="1" max="2" step="0.01" value={framing.scale} onChange={(event) => updateFraming(scene.sceneId, {scale: Number(event.target.value)})} className="block w-full" /><span className="font-mono">{framing.scale.toFixed(2)}</span></label>
              <div><span>Revision</span><code className="mt-1 block break-all text-[6px]">{framing.revision}</code></div>
            </div>
          </div>;
        })}
      </div> : <p className="mt-2 text-[8px] opacity-70">`wedding-movie-production-media-input/v1` を読み込むとScene framingを編集できます。</p>}

      <button type="button" disabled={!canExport} onClick={() => manifest && downloadText(`${JSON.stringify(manifest, null, 2)}\n`, `${projectId}-production-media-input.json`)} className="mt-3 border border-cyan-400 px-3 py-1.5 text-[8px] font-semibold disabled:cursor-not-allowed disabled:opacity-40">Framing反映Media JSONを書き出す</button>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">このoperatorは既存media approvalを保持してcrop/focus production stateを編集するだけです。Human visual QA PASS、Remotion Studio GUI Actual、Palmier GUI Actual、Mac DaVinci GUI Actualを自動生成しません。変更後はreadiness audit → canonical fresh visual QA refreshを再実行してください。</p>
    </section>
  );
}
