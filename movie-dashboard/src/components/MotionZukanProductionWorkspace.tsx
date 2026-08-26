import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { resolveMaskRevealEditableIntent } from "../data/humanEditableMotionIntent";
import {
  addMediaAsset,
  addMusicMarker,
  getAssetUsage,
  getDuplicateAssetUsage,
  getFinalChecks,
  loadMotionZukanProductionWorkspaceState,
  removeMediaAsset,
  removeMusicMarker,
  restoreWorkspaceFromVersion,
  saveMotionZukanProductionWorkspaceState,
  saveProjectVersion,
  sceneMetaFor,
  toggleSceneAssetAssignment,
  updateMediaAsset,
  updateProjectDesignSettings,
  updateSceneProductionMeta,
  type AssetKind,
  type AssetSuitability,
  type MotionZukanProductionWorkspaceState,
  type MusicMarkerKind,
  type SceneWorkflowStatus,
} from "../data/motionZukanProductionWorkspace";
import {
  duplicateSceneInstance,
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  reorderProjectTimelineScenes,
  saveMotionZukanComposerState,
  type MaskRevealSceneInstance,
  type MotionZukanComposerState,
  type SceneProjectId,
} from "../data/visualSceneComposer";

type AssetFilter = "ALL" | "UNUSED" | "USED" | "FAVORITE" | "OPENING" | "PROFILE";

type HistoryEntry = {
  composer: MotionZukanComposerState;
  workspace: MotionZukanProductionWorkspaceState;
};

const statusOptions: Array<{ id: SceneWorkflowStatus; label: string }> = [
  { id: "NOT_STARTED", label: "未着手" },
  { id: "IN_PROGRESS", label: "作業中" },
  { id: "ALMOST_DONE", label: "ほぼ完成" },
  { id: "DONE", label: "完成" },
];

const markerKinds: Array<{ id: MusicMarkerKind; label: string }> = [
  { id: "INTRO", label: "イントロ" },
  { id: "VERSE", label: "A/Bメロ" },
  { id: "BUILD", label: "盛り上がり" },
  { id: "CHORUS", label: "サビ" },
  { id: "BREAK", label: "間奏" },
  { id: "ENDING", label: "ラスト" },
  { id: "CUSTOM", label: "自由" },
];

function cloneHistoryEntry(composer: MotionZukanComposerState, workspace: MotionZukanProductionWorkspaceState): HistoryEntry {
  return { composer: structuredClone(composer), workspace: structuredClone(workspace) };
}

function sceneName(scene: MaskRevealSceneInstance) {
  const resolved = resolveMaskRevealEditableIntent(scene.editableIntent);
  return resolved.text || scene.recipeProvenance.label;
}

function statusLabel(status: SceneWorkflowStatus) {
  return statusOptions.find((item) => item.id === status)?.label ?? status;
}

function SortableSceneCard({
  scene,
  selected,
  status,
  assetCount,
  onSelect,
}: {
  scene: MaskRevealSceneInstance;
  selected: boolean;
  status: SceneWorkflowStatus;
  assetCount: number;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: scene.sceneId });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`min-w-[180px] border p-3 bg-white dark:bg-navy-900 ${selected ? "border-sky-500 ring-1 ring-sky-300" : "border-sand-300 dark:border-navy-600"} ${isDragging ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
          <p className="truncate text-xs font-semibold text-navy-900 dark:text-sand-100">{sceneName(scene)}</p>
          <p className="mt-1 text-[10px] text-navy-400">{scene.computedDurationSeconds.toFixed(1)}秒 · {statusLabel(status)} · 素材{assetCount}</p>
        </button>
        <button
          type="button"
          aria-label="Sceneを並び替え"
          className="cursor-grab px-2 py-1 text-sm text-navy-400 active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          ⠿
        </button>
      </div>
    </div>
  );
}

export function MotionZukanProductionWorkspace() {
  const [composer, setComposer] = useState<MotionZukanComposerState>(() => loadMotionZukanComposerState());
  const [workspace, setWorkspace] = useState<MotionZukanProductionWorkspaceState>(() => loadMotionZukanProductionWorkspaceState());
  const [projectId, setProjectId] = useState<SceneProjectId>("opening");
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [assetFilter, setAssetFilter] = useState<AssetFilter>("ALL");
  const [assetLabel, setAssetLabel] = useState("");
  const [assetSourceRef, setAssetSourceRef] = useState("");
  const [assetKind, setAssetKind] = useState<AssetKind>("IMAGE");
  const [assetPlaceholder, setAssetPlaceholder] = useState(false);
  const [markerLabel, setMarkerLabel] = useState("");
  const [markerSeconds, setMarkerSeconds] = useState("0");
  const [markerKind, setMarkerKind] = useState<MusicMarkerKind>("CUSTOM");
  const [versionLabel, setVersionLabel] = useState("");
  const [historyRevision, setHistoryRevision] = useState(0);

  const composerRef = useRef(composer);
  const workspaceRef = useRef(workspace);
  const undoRef = useRef<HistoryEntry[]>([]);
  const redoRef = useRef<HistoryEntry[]>([]);
  const suppressComposerEventRef = useRef(false);

  useEffect(() => {
    composerRef.current = composer;
  }, [composer]);

  useEffect(() => {
    workspaceRef.current = workspace;
  }, [workspace]);

  useEffect(() => {
    function onComposerChanged(event: Event) {
      if (suppressComposerEventRef.current) return;
      const next = (event as CustomEvent<MotionZukanComposerState>).detail;
      if (!next || JSON.stringify(next) === JSON.stringify(composerRef.current)) return;
      undoRef.current = [...undoRef.current, cloneHistoryEntry(composerRef.current, workspaceRef.current)].slice(-40);
      redoRef.current = [];
      setComposer(next);
      setHistoryRevision((value) => value + 1);
    }
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, onComposerChanged);
    return () => window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, onComposerChanged);
  }, []);

  const projectScenes = useMemo(() => {
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    const ids = timeline?.sceneIds ?? [];
    const ordered = ids
      .map((id) => composer.scenes.find((scene) => scene.sceneId === id && scene.projectId === projectId))
      .filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
    const extras = composer.scenes.filter((scene) => scene.projectId === projectId && !ids.includes(scene.sceneId));
    return [...ordered, ...extras];
  }, [composer, projectId]);

  useEffect(() => {
    if (selectedSceneId && projectScenes.some((scene) => scene.sceneId === selectedSceneId)) return;
    setSelectedSceneId(projectScenes[0]?.sceneId ?? null);
  }, [projectScenes, selectedSceneId]);

  const selectedScene = projectScenes.find((scene) => scene.sceneId === selectedSceneId) ?? null;
  const selectedMeta = selectedScene ? sceneMetaFor(workspace, selectedScene.sceneId) : null;
  const usage = useMemo(() => getAssetUsage(workspace), [workspace]);
  const duplicateUsage = useMemo(() => getDuplicateAssetUsage(workspace), [workspace]);
  const usageMap = useMemo(() => new Map(usage.map((item) => [item.assetId, item])), [usage]);
  const projectSuitability: AssetSuitability = projectId === "opening" ? "OPENING" : "PROFILE";
  const projectTimeline = composer.timelines.find((item) => item.projectId === projectId);
  const totalDuration = Math.max(projectTimeline?.totalComputedDurationSeconds ?? 0, 1);
  const projectMarkers = workspace.musicMarkers.filter((marker) => marker.projectId === projectId);
  const projectDesign = workspace.designSettings.find((item) => item.projectId === projectId);
  const projectVersions = workspace.versions.filter((version) => version.projectId === projectId);
  const finalChecks = getFinalChecks(composer, workspace, projectId);

  const filteredAssets = workspace.assets.filter((asset) => {
    const count = usageMap.get(asset.assetId)?.count ?? 0;
    if (assetFilter === "UNUSED") return count === 0;
    if (assetFilter === "USED") return count > 0;
    if (assetFilter === "FAVORITE") return asset.favorite;
    if (assetFilter === "OPENING") return asset.suitability.includes("OPENING");
    if (assetFilter === "PROFILE") return asset.suitability.includes("PROFILE");
    return true;
  });

  function pushHistory() {
    undoRef.current = [...undoRef.current, cloneHistoryEntry(composerRef.current, workspaceRef.current)].slice(-40);
    redoRef.current = [];
    setHistoryRevision((value) => value + 1);
  }

  function persistComposer(next: MotionZukanComposerState) {
    suppressComposerEventRef.current = true;
    setComposer(next);
    saveMotionZukanComposerState(next);
    // saveMotionZukanComposerState now defers its event dispatch to a macrotask (see its
    // definition), so the suppress flag must be reset via a macrotask too, queued after it,
    // otherwise it flips back to false before the deferred dispatch this call caused arrives.
    setTimeout(() => {
      suppressComposerEventRef.current = false;
    }, 0);
  }

  function persistWorkspace(next: MotionZukanProductionWorkspaceState) {
    setWorkspace(next);
    saveMotionZukanProductionWorkspaceState(next);
  }

  function commit(nextComposer: MotionZukanComposerState, nextWorkspace: MotionZukanProductionWorkspaceState) {
    pushHistory();
    persistComposer(nextComposer);
    persistWorkspace(nextWorkspace);
  }

  function commitWorkspace(nextWorkspace: MotionZukanProductionWorkspaceState) {
    pushHistory();
    persistWorkspace(nextWorkspace);
  }

  function undo() {
    const previous = undoRef.current[undoRef.current.length - 1];
    if (!previous) return;
    undoRef.current = undoRef.current.slice(0, -1);
    redoRef.current = [...redoRef.current, cloneHistoryEntry(composerRef.current, workspaceRef.current)].slice(-40);
    persistComposer(structuredClone(previous.composer));
    persistWorkspace(structuredClone(previous.workspace));
    setHistoryRevision((value) => value + 1);
  }

  function redo() {
    const next = redoRef.current[redoRef.current.length - 1];
    if (!next) return;
    redoRef.current = redoRef.current.slice(0, -1);
    undoRef.current = [...undoRef.current, cloneHistoryEntry(composerRef.current, workspaceRef.current)].slice(-40);
    persistComposer(structuredClone(next.composer));
    persistWorkspace(structuredClone(next.workspace));
    setHistoryRevision((value) => value + 1);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over || event.active.id === event.over.id) return;
    const ids = projectScenes.map((scene) => scene.sceneId);
    const oldIndex = ids.indexOf(String(event.active.id));
    const newIndex = ids.indexOf(String(event.over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(ids, oldIndex, newIndex);
    const nextComposer = reorderProjectTimelineScenes(composer, projectId, reordered);
    commit(nextComposer, workspace);
  }

  function addAsset(event: FormEvent) {
    event.preventDefault();
    if (!assetLabel.trim()) return;
    const next = addMediaAsset(workspace, {
      label: assetLabel,
      kind: assetKind,
      sourceRef: assetSourceRef,
      placeholder: assetPlaceholder,
      suitability: [projectSuitability],
    });
    commitWorkspace(next);
    setAssetLabel("");
    setAssetSourceRef("");
    setAssetPlaceholder(false);
  }

  function duplicateSelectedScene() {
    if (!selectedScene) return;
    const nextComposer = duplicateSceneInstance(composer, selectedScene.sceneId);
    const nextScene = nextComposer.scenes.find((scene) => !composer.scenes.some((current) => current.sceneId === scene.sceneId));
    if (!nextScene) return;
    const sourceMeta = sceneMetaFor(workspace, selectedScene.sceneId);
    const nextWorkspace = updateSceneProductionMeta(workspace, nextScene.sceneId, {
      note: sourceMeta.note,
      status: "IN_PROGRESS",
      assetIds: [...sourceMeta.assetIds],
    });
    commit(nextComposer, nextWorkspace);
    setSelectedSceneId(nextScene.sceneId);
  }

  function addMarker(event: FormEvent) {
    event.preventDefault();
    const seconds = Number(markerSeconds);
    if (!Number.isFinite(seconds)) return;
    const next = addMusicMarker(workspace, { projectId, label: markerLabel, kind: markerKind, timeSeconds: seconds });
    commitWorkspace(next);
    setMarkerLabel("");
  }

  function saveVersion(event: FormEvent) {
    event.preventDefault();
    const next = saveProjectVersion(workspace, composer, projectId, versionLabel);
    commitWorkspace(next);
    setVersionLabel("");
  }

  function restoreVersion(versionId: string) {
    const version = workspace.versions.find((item) => item.versionId === versionId);
    if (!version) return;
    const nextWorkspace = restoreWorkspaceFromVersion(workspace, versionId);
    commit(structuredClone(version.composerState), nextWorkspace);
  }

  const canUndo = historyRevision >= 0 && undoRef.current.length > 0;
  const canRedo = historyRevision >= 0 && redoRef.current.length > 0;

  return (
    <section className="mb-10 border border-sand-300 dark:border-navy-600 bg-sand-50/60 dark:bg-navy-900/40">
      <div className="p-5 border-b border-sand-200 dark:border-navy-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">PRODUCTION WORKSPACE / HUMAN CONTROL</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">素材・Scene・曲・完成確認をここでまとめる</h2>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">AI採点なし。Scene本体のHUMAN_SELECTED / LOCKEDを勝手に変更しません。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setProjectId("opening")} className={`px-3 py-2 text-xs border ${projectId === "opening" ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}>Opening</button>
          <button type="button" onClick={() => setProjectId("profile")} className={`px-3 py-2 text-xs border ${projectId === "profile" ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}>Profile</button>
          <button type="button" disabled={!canUndo} onClick={undo} className="px-3 py-2 text-xs border border-sand-300 dark:border-navy-600 disabled:opacity-30">↶ Undo</button>
          <button type="button" disabled={!canRedo} onClick={redo} className="px-3 py-2 text-xs border border-sand-300 dark:border-navy-600 disabled:opacity-30">↷ Redo</button>
        </div>
      </div>

      <div className="p-5 space-y-8">
        <section>
          <div className="flex items-end justify-between gap-4 mb-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SCENE TIMELINE</p>
              <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">Scene単位で並び替え・複製</h3>
            </div>
            <span className="text-xs font-mono text-navy-400">{projectTimeline?.totalComputedDurationSeconds.toFixed(1) ?? "0.0"} sec</span>
          </div>
          {projectScenes.length === 0 ? (
            <p className="border border-dashed border-sand-300 dark:border-navy-600 p-4 text-xs text-navy-500">まだ採用Sceneがありません。下のMask Reveal ComposerからSceneを採用するとここに出ます。</p>
          ) : (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={projectScenes.map((scene) => scene.sceneId)} strategy={horizontalListSortingStrategy}>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {projectScenes.map((scene) => {
                    const meta = sceneMetaFor(workspace, scene.sceneId);
                    return (
                      <SortableSceneCard
                        key={scene.sceneId}
                        scene={scene}
                        selected={scene.sceneId === selectedSceneId}
                        status={meta.status}
                        assetCount={meta.assetIds.length}
                        onSelect={() => setSelectedSceneId(scene.sceneId)}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {selectedScene && selectedMeta && (
            <div className="mt-4 grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-4 border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">SELECTED SCENE</p>
                <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{sceneName(selectedScene)}</p>
                <p className="mt-1 text-[10px] font-mono text-navy-400 break-all">{selectedScene.sceneId}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={duplicateSelectedScene} className="px-3 py-2 text-xs border border-sand-300 dark:border-navy-600">Sceneを複製</button>
                  <span className="px-3 py-2 text-xs border border-sand-200 dark:border-navy-600 text-navy-500">HUMAN_SELECTED {selectedScene.humanSelectedFields.length}</span>
                  <span className="px-3 py-2 text-xs border border-sand-200 dark:border-navy-600 text-navy-500">LOCKED {selectedScene.lockedFields.length}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3">
                <label className="text-xs text-navy-600 dark:text-navy-300">
                  完成状態
                  <select
                    value={selectedMeta.status}
                    onChange={(event) => commitWorkspace(updateSceneProductionMeta(workspace, selectedScene.sceneId, { status: event.target.value as SceneWorkflowStatus }))}
                    className="mt-1 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm"
                  >
                    {statusOptions.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                </label>
                <label className="text-xs text-navy-600 dark:text-navy-300">
                  Sceneメモ
                  <textarea
                    value={selectedMeta.note}
                    onChange={(event) => commitWorkspace(updateSceneProductionMeta(workspace, selectedScene.sceneId, { note: event.target.value }))}
                    placeholder="例: この写真は母に確認 / 最後に動画へ差し替え"
                    className="mt-1 min-h-20 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm"
                  />
                </label>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">素材BOX</p>
              <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">素材本体ではなく参照先と使用状態を管理</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {(["ALL", "UNUSED", "USED", "FAVORITE", "OPENING", "PROFILE"] as AssetFilter[]).map((filter) => (
                <button key={filter} type="button" onClick={() => setAssetFilter(filter)} className={`px-2 py-1 text-[10px] border ${assetFilter === filter ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}>{filter}</button>
              ))}
            </div>
          </div>

          <form onSubmit={addAsset} className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_120px_auto] gap-2 mb-4">
            <input value={assetLabel} onChange={(event) => setAssetLabel(event.target.value)} placeholder="素材名 例: Hawaii 海辺2人" className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm" />
            <input value={assetSourceRef} onChange={(event) => setAssetSourceRef(event.target.value)} placeholder="canonical path / Drive / local reference" className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm" />
            <select value={assetKind} onChange={(event) => setAssetKind(event.target.value as AssetKind)} className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm">
              <option value="IMAGE">写真</option><option value="VIDEO">動画</option>
            </select>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 px-2 text-xs"><input type="checkbox" checked={assetPlaceholder} onChange={(event) => setAssetPlaceholder(event.target.checked)} />仮</label>
              <button type="submit" className="px-3 py-2 text-xs font-semibold border border-emerald-500 text-emerald-700 dark:text-emerald-300">追加</button>
            </div>
          </form>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredAssets.map((asset) => {
              const assetUsage = usageMap.get(asset.assetId);
              const assigned = selectedMeta?.assetIds.includes(asset.assetId) ?? false;
              return (
                <article key={asset.assetId} className={`border p-3 bg-white dark:bg-navy-800 ${asset.placeholder ? "border-amber-400" : "border-sand-200 dark:border-navy-600"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-navy-900 dark:text-sand-100">{asset.favorite ? "★ " : ""}{asset.label}</p>
                      <p className="mt-1 text-[10px] font-mono text-navy-400 break-all">{asset.sourceRef || "参照先未設定"}</p>
                      <p className="mt-2 text-[10px] text-navy-500">{asset.kind === "IMAGE" ? "写真" : "動画"} · {asset.placeholder ? "仮素材" : "本素材"} · 使用 {assetUsage?.count ?? 0} Scene</p>
                      {(assetUsage?.count ?? 0) > 0 && <p className="mt-1 text-[10px] text-navy-400 break-all">使用先: {assetUsage?.sceneIds.join(" / ")}</p>}
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button type="button" onClick={() => commitWorkspace(updateMediaAsset(workspace, asset.assetId, { favorite: !asset.favorite }))} className="px-2 py-1 text-xs border border-sand-300 dark:border-navy-600">{asset.favorite ? "★" : "☆"}</button>
                      {selectedScene && <button type="button" onClick={() => commitWorkspace(toggleSceneAssetAssignment(workspace, selectedScene.sceneId, asset.assetId))} className={`px-2 py-1 text-[10px] border ${assigned ? "border-emerald-500 text-emerald-700 dark:text-emerald-300" : "border-sand-300 dark:border-navy-600"}`}>{assigned ? "割当済" : "Sceneへ"}</button>}
                      <button type="button" onClick={() => commitWorkspace(removeMediaAsset(workspace, asset.assetId))} className="px-2 py-1 text-[10px] border border-red-200 text-red-600">削除</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {duplicateUsage.length > 0 && (
            <div className="mt-3 border border-amber-300 bg-amber-50/70 dark:bg-amber-950/20 p-3">
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">同じ素材を複数Sceneで使用中</p>
              {duplicateUsage.map((item) => {
                const asset = workspace.assets.find((candidate) => candidate.assetId === item.assetId);
                return <p key={item.assetId} className="mt-1 text-[10px] text-amber-700 dark:text-amber-300">{asset?.label ?? item.assetId}: {item.count}回</p>;
              })}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">曲の構成ガイド</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">曲の地図だけ置く。自動編集はしない</h3>
            <div className="mt-3 relative h-14 border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 overflow-hidden">
              {projectMarkers.map((marker) => (
                <button
                  key={marker.markerId}
                  type="button"
                  title={`${marker.timeSeconds.toFixed(1)}s ${marker.label}`}
                  onClick={() => commitWorkspace(removeMusicMarker(workspace, marker.markerId))}
                  className="absolute top-0 bottom-0 border-l border-sky-500 text-[9px] text-sky-700 dark:text-sky-300"
                  style={{ left: `${Math.min(100, (marker.timeSeconds / totalDuration) * 100)}%` }}
                >
                  <span className="ml-1 whitespace-nowrap">{marker.label}</span>
                </button>
              ))}
            </div>
            <form onSubmit={addMarker} className="mt-2 grid grid-cols-[1fr_110px_110px_auto] gap-2">
              <input value={markerLabel} onChange={(event) => setMarkerLabel(event.target.value)} placeholder="例: サビ" className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-xs" />
              <input value={markerSeconds} onChange={(event) => setMarkerSeconds(event.target.value)} inputMode="decimal" placeholder="秒" className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-xs" />
              <select value={markerKind} onChange={(event) => setMarkerKind(event.target.value as MusicMarkerKind)} className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-xs">
                {markerKinds.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
              <button type="submit" className="px-3 py-2 text-xs border border-sand-300 dark:border-navy-600">追加</button>
            </form>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">全体デザイン設定</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">Project default。Scene側の個別指定を上書きしない</h3>
            {projectDesign && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                <label className="text-[10px] text-navy-500">基本フォント<input value={projectDesign.fontFamily} onChange={(event) => commitWorkspace(updateProjectDesignSettings(workspace, projectId, { fontFamily: event.target.value }))} className="mt-1 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-xs" /></label>
                <label className="text-[10px] text-navy-500">基本文字色<input type="color" value={projectDesign.textColor} onChange={(event) => commitWorkspace(updateProjectDesignSettings(workspace, projectId, { textColor: event.target.value }))} className="mt-1 h-9 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800" /></label>
                <label className="text-[10px] text-navy-500">Safe Area %<input type="number" min="0" max="25" step="1" value={projectDesign.safeAreaPercent} onChange={(event) => commitWorkspace(updateProjectDesignSettings(workspace, projectId, { safeAreaPercent: Number(event.target.value) }))} className="mt-1 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-xs" /></label>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PROJECT VERSION</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">大きく変える前に状態を保存</h3>
            <form onSubmit={saveVersion} className="mt-3 flex gap-2">
              <input value={versionLabel} onChange={(event) => setVersionLabel(event.target.value)} placeholder="例: Opening テンポ速め前" className="min-w-0 flex-1 border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-xs" />
              <button type="submit" className="px-3 py-2 text-xs border border-sand-300 dark:border-navy-600">Version保存</button>
            </form>
            <div className="mt-2 space-y-2 max-h-48 overflow-auto">
              {projectVersions.map((version) => (
                <div key={version.versionId} className="flex items-center justify-between gap-3 border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-2">
                  <div><p className="text-xs font-semibold">{version.label}</p><p className="text-[9px] text-navy-400">{new Date(version.createdAt).toLocaleString("ja-JP")}</p></div>
                  <button type="button" onClick={() => restoreVersion(version.versionId)} className="px-2 py-1 text-[10px] border border-sand-300 dark:border-navy-600">この状態へ戻す</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">FINAL CHECK</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">書き出し前の単純チェック</h3>
            <div className="mt-3 divide-y divide-sand-200 dark:divide-navy-600 border-y border-sand-200 dark:border-navy-600">
              {finalChecks.map((check) => (
                <div key={check.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                  <span className={check.ok ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>{check.ok ? "✓" : "△"} {check.label}</span>
                  <span className="text-[10px] text-navy-400">{check.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
