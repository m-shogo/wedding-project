import {useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {startCreativeIdeas} from "../data/startCreativeIdeas";
import {readHumanReviewDecisions} from "../data/startHumanReview";
import {getStartMaterialAssetAdvice, getStartRegistrationAdvice} from "../data/startMaterialAdvice";
import {
  START_PRODUCTION_WORKSPACE_STORAGE_KEY,
  buildStartFirstRoughPrompt,
  buildStartRevisionPrompt,
  defaultStartProductionWorkspaceState,
  getComparisonRecipe,
  getDefaultComparison,
  getSelectedIdeasWithFeasibility,
  getStartCompletionPhases,
  getStartMaterialDiagnostics,
  getStartOpeningMediaAssets,
  readStartProductionWorkspaceState,
  saveStartProductionWorkspaceState,
  startMaterialCategoryLabels,
  startReviewCommentTypeLabels,
  type StartMaterialCategory,
  type StartProductionWorkspaceState,
  type StartReviewCommentType,
} from "../data/startProductionWorkspace";
import {startExtendedSections, type StartExtendedSectionId} from "../data/startExtendedRhythmMap";
import {buildStartCodexPrompt, readStartSelectionState, sectionRecipeOptions} from "../data/startSelectionMode";
import {generateId} from "../lib/ids";
import {useProduction} from "../store/productionStore";
import type {Asset, PhotoOrientation} from "../types/movie";

type WorkspaceStage = "materials" | "assign" | "diagnose" | "compare" | "review" | "handoff";

interface SyncedStartMaterial {
  id: string;
  type: "own_photo" | "own_video";
  title: string;
  originalPath: string;
  relativePath: string;
  previewUrl: string;
}

interface SyncedStartRender {
  title: string;
  originalPath: string;
  previewUrl: string;
  updatedAt: string;
  fileSizeBytes: number;
}

const stageLabels: Record<WorkspaceStage, string> = {
  materials: "1. 素材を選ぶ",
  assign: "2. 区間へ置く",
  diagnose: "3. 不足を直す",
  compare: "4. A/Bで決める",
  review: "5. Renderを直す",
  handoff: "6. Codexへ渡す",
};

const gateLabels: Record<keyof StartProductionWorkspaceState["gates"], string> = {
  roughRendered: "Roughを書き出して再生した",
  reviewConfirmed: "修正コメントを人間が見直した",
  finalPlaybackChecked: "本番動画を全画面で最後まで再生した",
  finalAudioChecked: "音量・ノイズ・終了音を確認した",
  finalVenueChecked: "会場の再生条件・解像度・音源条件を確認した",
};

function mediaKind(asset: Asset) {
  return asset.type === "own_video" ? "動画" : "写真";
}

function isImagePath(path: string) {
  return /\.(jpe?g|png|webp|gif)$/i.test(path);
}

function isVideoPath(path: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(path);
}

function formatTime(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function StartProductionWorkspace() {
  const {data, addAsset} = useProduction();
  const [workspace, setWorkspace] = useState<StartProductionWorkspaceState>(readStartProductionWorkspaceState);
  const [selection] = useState(readStartSelectionState);
  const [activeStage, setActiveStage] = useState<WorkspaceStage>("materials");
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [materialFilter, setMaterialFilter] = useState<StartMaterialCategory | "all">("all");
  const [ideaFilter, setIdeaFilter] = useState<"all" | "ready" | "needs-media" | "wait-audio">("all");
  const [compareSectionId, setCompareSectionId] = useState<StartExtendedSectionId>("opening-pickup");
  const [reviewSectionId, setReviewSectionId] = useState<StartExtendedSectionId>("opening-pickup");
  const [reviewType, setReviewType] = useState<StartReviewCommentType>("timing");
  const [reviewText, setReviewText] = useState("");
  const [copied, setCopied] = useState<"initial" | "revision" | "json" | null>(null);
  const [syncCopied, setSyncCopied] = useState(false);
  const [renderSyncCopied, setRenderSyncCopied] = useState(false);
  const [syncedMaterials, setSyncedMaterials] = useState<SyncedStartMaterial[]>([]);
  const [syncedRender, setSyncedRender] = useState<SyncedStartRender | null>(null);
  const [newAsset, setNewAsset] = useState({title: "", path: "", type: "own_photo" as "own_photo" | "own_video", orientation: "landscape" as PhotoOrientation, category: "travel" as StartMaterialCategory});
  const videoRef = useRef<HTMLVideoElement>(null);
  const decisions = useMemo(readHumanReviewDecisions, []);

  useEffect(() => {
    void fetch("/local-start-materials/manifest.json", {cache: "no-store"})
      .then((response) => response.ok ? response.json() as Promise<{materials?: SyncedStartMaterial[]}> : Promise.reject())
      .then((manifest) => setSyncedMaterials(manifest.materials ?? []))
      .catch(() => setSyncedMaterials([]));
  }, []);

  useEffect(() => {
    void fetch("/local-start-render/manifest.json", {cache: "no-store"})
      .then((response) => response.ok ? response.json() as Promise<{render?: SyncedStartRender | null}> : Promise.reject())
      .then((manifest) => {
        const render = manifest.render ?? null;
        setSyncedRender(render);
        if (render && (!workspace.renderPath || workspace.renderPath.startsWith("/local-start-render/"))) {
          update((current) => ({...current, renderPath: render.previewUrl}));
        }
      })
      .catch(() => setSyncedRender(null));
  }, []);

  const mediaAssets = useMemo(() => getStartOpeningMediaAssets(data.assets), [data.assets]);
  const filteredAssets = mediaAssets.filter((asset) => materialFilter === "all" || workspace.materialMetaByAsset[asset.assetId]?.category === materialFilter);
  const diagnostics = useMemo(() => getStartMaterialDiagnostics(workspace, data.assets, selection), [workspace, data.assets, selection]);
  const phases = useMemo(() => getStartCompletionPhases(workspace, data.assets, selection), [workspace, data.assets, selection]);
  const ideaFeasibility = useMemo(() => getSelectedIdeasWithFeasibility(workspace, selection, data.assets), [workspace, selection, data.assets]);
  const visibleIdeas = ideaFeasibility.filter(({feasibility}) => ideaFilter === "all" || feasibility.status === ideaFilter);
  const selectionPrompt = useMemo(() => buildStartCodexPrompt(selection, decisions), [selection, decisions]);
  const initialPrompt = useMemo(() => buildStartFirstRoughPrompt(workspace, selection, data.assets, selectionPrompt), [workspace, selection, data.assets, selectionPrompt]);
  const revisionPrompt = useMemo(() => buildStartRevisionPrompt(workspace, selection, data.assets), [workspace, selection, data.assets]);
  const blockers = diagnostics.filter((item) => item.level === "blocker");
  const registrationAdvice = getStartRegistrationAdvice(newAsset.category, newAsset.type === "own_photo" ? newAsset.orientation : undefined);
  const nextStage: WorkspaceStage = blockers.some((item) => item.id === "no-media" || item.id === "hero-shortage") ? "materials"
    : blockers.some((item) => item.id === "section-shortage") ? "assign"
      : !workspace.gates.roughRendered ? "handoff"
        : workspace.renderComments.some((comment) => !comment.resolved) ? "review"
          : phases.find((phase) => !phase.done)?.id === "final" ? "review" : "diagnose";

  function update(updater: (current: StartProductionWorkspaceState) => StartProductionWorkspaceState) {
    setWorkspace((current) => {
      const next = updater(current);
      saveStartProductionWorkspaceState(next);
      return next;
    });
  }

  function copy(text: string, kind: "initial" | "revision" | "json") {
    void navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied((current) => current === kind ? null : current), 1600);
  }

  function ensureMeta(assetId: string) {
    return workspace.materialMetaByAsset[assetId] ?? {category: "travel" as const, isHero: false, hasTextSpace: false};
  }

  function patchMeta(assetId: string, patch: Partial<ReturnType<typeof ensureMeta>>) {
    update((current) => ({
      ...current,
      materialMetaByAsset: {...current.materialMetaByAsset, [assetId]: {...(current.materialMetaByAsset[assetId] ?? {category: "travel", isHero: false, hasTextSpace: false}), ...patch}},
    }));
  }

  function assignAsset(assetId: string, sectionId: StartExtendedSectionId) {
    update((current) => {
      const currentIds = current.assetIdsBySection[sectionId] ?? [];
      if (currentIds.includes(assetId)) return current;
      return {...current, assetIdsBySection: {...current.assetIdsBySection, [sectionId]: [...currentIds, assetId]}};
    });
  }

  function removeAssignment(assetId: string, sectionId: StartExtendedSectionId) {
    update((current) => ({...current, assetIdsBySection: {...current.assetIdsBySection, [sectionId]: (current.assetIdsBySection[sectionId] ?? []).filter((id) => id !== assetId)}}));
  }

  function registerMaterial() {
    if (!newAsset.title.trim() || !newAsset.path.trim()) return;
    const assetId = generateId("start-media");
    addAsset({
      assetId,
      type: newAsset.type,
      title: newAsset.title.trim(),
      path: newAsset.path.trim(),
      relatedSceneIds: [],
      relatedMovieIds: ["opening"],
      status: "collecting",
      source: "StaRt Production Workspaceから登録",
      usage: "StaRt Extended Opening候補",
      notes: "人間が登録した実素材候補。採用確定ではない。",
      orientation: newAsset.type === "own_photo" ? newAsset.orientation : undefined,
    });
    update((current) => ({...current, materialMetaByAsset: {...current.materialMetaByAsset, [assetId]: {category: newAsset.category, isHero: false, hasTextSpace: false}}}));
    setSelectedAssetId(assetId);
    setNewAsset((current) => ({...current, title: "", path: ""}));
  }

  function categoryFromRelativePath(relativePath: string): StartMaterialCategory {
    const normalized = relativePath.toLowerCase();
    if (normalized.includes("family") || normalized.includes("friend")) return "family-friends";
    if (normalized.includes("venue") || normalized.includes("yokohama")) return "venue";
    if (normalized.includes("couple") || normalized.includes("hero")) return "hero";
    if (normalized.includes("detail") || normalized.includes("food") || normalized.includes("item")) return "detail";
    return "travel";
  }

  function importSyncedMaterials() {
    const existingPaths = new Set(data.assets.map((asset) => asset.path));
    const metaEntries: Record<string, {category: StartMaterialCategory; isHero: boolean; hasTextSpace: boolean}> = {};
    for (const material of syncedMaterials) {
      const category = categoryFromRelativePath(material.relativePath);
      metaEntries[material.id] = {category, isHero: false, hasTextSpace: false};
      if (existingPaths.has(material.originalPath)) continue;
      addAsset({assetId: material.id, type: material.type, title: material.title, path: material.originalPath, relatedSceneIds: [], relatedMovieIds: ["opening"], status: "collecting", source: "sync:start-materials", usage: "StaRt Extended Opening候補", notes: "ローカル素材フォルダから同期。採用確定ではない。"});
    }
    update((current) => ({...current, materialMetaByAsset: {...metaEntries, ...current.materialMetaByAsset}}));
  }

  function copySyncCommand() {
    void navigator.clipboard.writeText("cd /Users/m-shogo/Developer/personal/wedding-project/movie-dashboard && pnpm sync:start-materials && pnpm dev");
    setSyncCopied(true);
    window.setTimeout(() => setSyncCopied(false), 1600);
  }

  function copyRenderSyncCommand() {
    void navigator.clipboard.writeText("cd /Users/m-shogo/Developer/personal/wedding-project/movie-dashboard && pnpm prepare:start-review && pnpm dev");
    setRenderSyncCopied(true);
    window.setTimeout(() => setRenderSyncCopied(false), 1600);
  }

  function comparisonFor(sectionId: StartExtendedSectionId) {
    return workspace.comparisonsBySection[sectionId] ?? getDefaultComparison(sectionId, selection);
  }

  function patchComparison(sectionId: StartExtendedSectionId, patch: Partial<ReturnType<typeof comparisonFor>>) {
    update((current) => ({...current, comparisonsBySection: {...current.comparisonsBySection, [sectionId]: {...(current.comparisonsBySection[sectionId] ?? getDefaultComparison(sectionId, selection)), ...patch}}}));
  }

  function addReviewComment() {
    if (!reviewText.trim()) return;
    update((current) => ({...current, renderComments: [...current.renderComments, {id: generateId("start-review"), sectionId: reviewSectionId, timeSec: videoRef.current && Number.isFinite(videoRef.current.currentTime) ? videoRef.current.currentTime : null, type: reviewType, comment: reviewText.trim(), resolved: false}]}));
    setReviewText("");
  }

  function resetWorkspace() {
    window.localStorage.removeItem(START_PRODUCTION_WORKSPACE_STORAGE_KEY);
    setWorkspace(structuredClone(defaultStartProductionWorkspaceState));
    setSelectedAssetId(null);
  }

  return <div>
    <Header title="StaRt PRODUCTION WORKSPACE" description="素材を選ぶ → 14区間へ置く → 不足を直す → 比較 → Renderレビュー → Codexへ渡す" />

    <section className="mb-6 border-2 border-emerald-500 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-950/20">
      <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-700 dark:text-emerald-300">NEXT ACTION</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">{stageLabels[nextStage]}へ進んでください</h2><p className="mt-1 text-sm text-navy-600 dark:text-navy-300">未完了の中から、完成へ最も効く作業を表示しています。</p></div>
        <button onClick={() => setActiveStage(nextStage)} className="bg-emerald-700 px-4 py-2 text-sm font-bold text-white">この作業を開く</button>
      </div>
    </section>

    <section className="mb-6 grid grid-cols-2 gap-px bg-sand-200 md:grid-cols-6 dark:bg-navy-600">
      {phases.map((phase) => <div key={phase.id} className="bg-white p-3 dark:bg-navy-800"><p className={`text-xs font-bold ${phase.done ? "text-emerald-700 dark:text-emerald-300" : "text-navy-800 dark:text-sand-100"}`}>{phase.done ? "✓" : "○"} {phase.label}</p><p className="mt-1 text-[10px] text-navy-400">{phase.detail}</p></div>)}
    </section>

    <nav className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-6" aria-label="StaRt制作ステップ">
      {(Object.keys(stageLabels) as WorkspaceStage[]).map((stage) => <button key={stage} onClick={() => setActiveStage(stage)} className={`border px-3 py-3 text-xs font-bold ${activeStage === stage ? "border-sky-600 bg-sky-600 text-white" : "border-sand-300 bg-white text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200"}`}>{stageLabels[stage]}</button>)}
    </nav>

    {activeStage === "materials" && <section className="mb-8">
      <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-bold tracking-widest text-sky-700 dark:text-sky-300">MATERIAL BOARD</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">素材選定ボード</h2></div>
      <div className="mt-4 border border-sky-300 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-950/20">
        <h3 className="font-bold text-navy-900 dark:text-sand-100">素材ライブラリへ実写真・実動画を登録</h3>
        <p className="mt-1 text-xs text-navy-600 dark:text-navy-300">原本は移動・上書きしません。タイトルと保存パスを記録するだけです。ブラウザから読めるURLならサムネイルも表示します。</p>
        <Link to="/assets" className="mt-2 inline-block text-[10px] font-bold text-sky-700 underline dark:text-sky-300">登録後のタイトル・パス編集や削除は素材ライブラリで行う →</Link>
        <div className="mt-3 grid gap-2 border border-sky-200 bg-white p-3 sm:grid-cols-2 dark:border-sky-900 dark:bg-navy-800">
          <div><p className="text-xs font-bold text-navy-900 dark:text-sand-100">おすすめ：フォルダを一括読込</p><p className="mt-1 text-[10px] leading-5 text-navy-500 dark:text-navy-300">原本を動かさず、ローカル専用サムネイル一覧を作ります。コマンド実行後にこの画面を再読み込みしてください。</p></div>
          <div className="flex flex-col gap-2 sm:items-end"><button onClick={copySyncCommand} className="border border-sky-600 px-3 py-2 text-xs font-bold text-sky-800 dark:text-sky-200">{syncCopied ? "コマンドをコピーしました ✓" : "一括読込コマンドをコピー"}</button>{syncedMaterials.length > 0 ? <button onClick={importSyncedMaterials} className="bg-emerald-700 px-3 py-2 text-xs font-bold text-white">同期済み{syncedMaterials.length}件をボードへ追加</button> : <span className="text-[10px] text-navy-400">同期データはまだありません</span>}</div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-6">
          <input value={newAsset.title} onChange={(event) => setNewAsset((current) => ({...current, title: event.target.value}))} placeholder="素材名" className="border border-sky-300 bg-white px-3 py-2 text-sm md:col-span-2 dark:bg-navy-900" />
          <input value={newAsset.path} onChange={(event) => setNewAsset((current) => ({...current, path: event.target.value}))} placeholder="/05_photos/opening/..." className="border border-sky-300 bg-white px-3 py-2 text-sm md:col-span-2 dark:bg-navy-900" />
          <select value={newAsset.type} onChange={(event) => setNewAsset((current) => ({...current, type: event.target.value as "own_photo" | "own_video"}))} className="border border-sky-300 bg-white px-2 py-2 text-sm dark:bg-navy-900"><option value="own_photo">写真</option><option value="own_video">動画</option></select>
          <button onClick={registerMaterial} disabled={!newAsset.title.trim() || !newAsset.path.trim()} className="bg-sky-700 px-3 py-2 text-sm font-bold text-white disabled:opacity-40">登録</button>
          <select value={newAsset.category} onChange={(event) => setNewAsset((current) => ({...current, category: event.target.value as StartMaterialCategory}))} className="border border-sky-300 bg-white px-2 py-2 text-xs dark:bg-navy-900">{(Object.keys(startMaterialCategoryLabels) as StartMaterialCategory[]).map((category) => <option key={category} value={category}>{startMaterialCategoryLabels[category]}</option>)}</select>
          {newAsset.type === "own_photo" && <select value={newAsset.orientation} onChange={(event) => setNewAsset((current) => ({...current, orientation: event.target.value as PhotoOrientation}))} className="border border-sky-300 bg-white px-2 py-2 text-xs dark:bg-navy-900"><option value="landscape">横</option><option value="portrait">縦</option><option value="square">正方形</option></select>}
        </div>
        <div className="mt-3 border-l-4 border-fuchsia-500 bg-fuchsia-50 p-4 dark:bg-fuchsia-950/20">
          <p className="text-[10px] font-bold tracking-widest text-fuchsia-700 dark:text-fuchsia-300">IMAGE ADVISOR — {startMaterialCategoryLabels[newAsset.category]}</p>
          <h4 className="mt-1 font-bold text-navy-900 dark:text-sand-100">おすすめ：{registrationAdvice.categoryAdvice.headline}</h4>
          <p className="mt-2 text-xs font-bold text-fuchsia-800 dark:text-fuchsia-200">自分に聞く：{registrationAdvice.categoryAdvice.selectionQuestion}</p>
          <div className="mt-3 grid gap-3 text-xs leading-5 lg:grid-cols-2"><div><strong className="text-emerald-700 dark:text-emerald-300">こういう画像が良い</strong><ul className="mt-1">{registrationAdvice.categoryAdvice.lookFor.map((item) => <li key={item}>・{item}</li>)}</ul></div><div><strong className="text-red-700 dark:text-red-300">避けたい画像</strong><ul className="mt-1">{registrationAdvice.categoryAdvice.avoid.map((item) => <li key={item}>・{item}</li>)}</ul></div></div>
          <p className="mt-3 text-xs text-navy-600 dark:text-navy-300"><strong>向く区間：</strong>{registrationAdvice.categoryAdvice.bestSections}</p>
          {newAsset.type === "own_photo" && <p className="mt-1 text-xs text-navy-600 dark:text-navy-300"><strong>向きのヒント：</strong>{registrationAdvice.orientationNote}</p>}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2"><button onClick={() => setMaterialFilter("all")} className={`border px-3 py-1 text-xs ${materialFilter === "all" ? "bg-navy-900 text-white" : "bg-white dark:bg-navy-800"}`}>すべて ({mediaAssets.length})</button>{(Object.keys(startMaterialCategoryLabels) as StartMaterialCategory[]).map((category) => <button key={category} onClick={() => setMaterialFilter(category)} className={`border px-3 py-1 text-xs ${materialFilter === category ? "bg-navy-900 text-white" : "bg-white dark:bg-navy-800"}`}>{startMaterialCategoryLabels[category]}</button>)}</div>
      {filteredAssets.length === 0 ? <div className="mt-4 border-2 border-dashed border-sand-300 p-8 text-center text-sm text-navy-500 dark:border-navy-600 dark:text-navy-300">表示できる素材がありません。上のフォームで原本のパスを登録してください。</div> : <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{filteredAssets.map((asset) => {
        const meta = ensureMeta(asset.assetId);
        const selected = selectedAssetId === asset.assetId;
        const previewPath = syncedMaterials.find((material) => material.originalPath === asset.path)?.previewUrl ?? asset.path;
        const assetAdvice = getStartMaterialAssetAdvice(asset, meta);
        return <article key={asset.assetId} draggable onDragStart={(event) => event.dataTransfer.setData("text/start-asset-id", asset.assetId)} onClick={() => setSelectedAssetId(asset.assetId)} className={`cursor-grab border-2 bg-white p-3 dark:bg-navy-800 ${selected ? "border-sky-500" : "border-sand-200 dark:border-navy-600"}`}>
          <div className="relative flex h-32 items-center justify-center overflow-hidden bg-sand-100 text-4xl dark:bg-navy-900">{asset.type === "own_video" ? "🎬" : "📷"}{previewPath && isImagePath(previewPath) && <img src={previewPath} alt={asset.title} className="absolute inset-0 h-full w-full object-cover" onError={(event) => {event.currentTarget.style.display = "none";}} />}</div>
          <div className="mt-3 flex items-start justify-between gap-2"><div><h3 className="text-sm font-bold text-navy-900 dark:text-sand-100">{asset.title}</h3><p className="text-[10px] text-navy-400">{mediaKind(asset)} · {asset.orientation ?? "向き未設定"}</p></div>{meta.isHero && <span className="bg-amber-200 px-2 py-1 text-[9px] font-bold text-amber-900">HERO</span>}</div>
          <code className="mt-2 block truncate text-[9px] text-navy-400">{asset.path || "パス未設定"}</code>
          <select value={meta.category} onClick={(event) => event.stopPropagation()} onChange={(event) => patchMeta(asset.assetId, {category: event.target.value as StartMaterialCategory})} className="mt-3 w-full border border-sand-300 bg-white px-2 py-1 text-xs dark:bg-navy-900">{(Object.keys(startMaterialCategoryLabels) as StartMaterialCategory[]).map((category) => <option key={category} value={category}>{startMaterialCategoryLabels[category]}</option>)}</select>
          <div className="mt-2 grid grid-cols-2 gap-2"><label className="flex items-center gap-2 text-[10px]"><input type="checkbox" checked={meta.isHero} onChange={() => patchMeta(asset.assetId, {isHero: !meta.isHero})} />Hero候補</label><label className="flex items-center gap-2 text-[10px]"><input type="checkbox" checked={meta.hasTextSpace} onChange={() => patchMeta(asset.assetId, {hasTextSpace: !meta.hasTextSpace})} />文字余白あり</label></div>
          <details className="mt-3 border-t border-fuchsia-200 pt-2 dark:border-fuchsia-900"><summary className="cursor-pointer text-[10px] font-bold text-fuchsia-700 dark:text-fuchsia-300">この画像へのアドバイス</summary><p className="mt-2 text-[10px] font-bold text-navy-700 dark:text-navy-200">{assetAdvice.nextAction}</p>{assetAdvice.strengths.map((item) => <p key={item} className="mt-1 text-[10px] text-emerald-700 dark:text-emerald-300">✓ {item}</p>)}{assetAdvice.checks.map((item) => <p key={item} className="mt-1 text-[10px] text-amber-700 dark:text-amber-300">確認：{item}</p>)}</details>
        </article>;
      })}</div>}
      <div className="mt-4 flex justify-end"><button onClick={() => setActiveStage("assign")} className="bg-navy-900 px-5 py-3 text-sm font-bold text-white dark:bg-sand-100 dark:text-navy-900">次：14区間へ置く →</button></div>
    </section>}

    {activeStage === "assign" && <section className="mb-8">
      <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-bold tracking-widest text-sky-700 dark:text-sky-300">DRAG & ASSIGN</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">素材を14区間へ割り当てる</h2></div>
      <p className="mt-3 text-sm text-navy-600 dark:text-navy-300">上の素材ボードからカードをドラッグします。ドラッグが難しい場合は、素材ボードでカードを選び、各区間の「選択中素材を追加」を押してください。</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">{startExtendedSections.map((section, index) => {
        const ids = workspace.assetIdsBySection[section.id] ?? [];
        return <article key={section.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => {event.preventDefault(); const id = event.dataTransfer.getData("text/start-asset-id"); if (id) assignAsset(id, section.id);}} className={`border-2 border-dashed p-4 ${ids.length > 0 ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20" : "border-sand-300 bg-white dark:border-navy-600 dark:bg-navy-800"}`}>
          <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-mono text-navy-400">{index + 1} · {section.referenceStartSec}–{section.referenceEndSec}s 仮</p><h3 className="font-bold text-navy-900 dark:text-sand-100">{section.label}</h3><p className="mt-1 text-xs text-navy-500 dark:text-navy-300">{section.weddingDirection}</p></div><span className="shrink-0 text-xs font-bold text-emerald-700">{ids.length}素材</span></div>
          <div className="mt-3 flex min-h-14 flex-wrap gap-2">{ids.length === 0 && <span className="text-xs text-navy-400">ここへ素材カードをドロップ</span>}{ids.map((id) => {const asset = mediaAssets.find((item) => item.assetId === id); return <span key={id} className="flex items-center gap-2 border border-emerald-300 bg-white px-2 py-1 text-xs dark:bg-navy-900"><span>{asset?.type === "own_video" ? "🎬" : "📷"} {asset?.title ?? id}</span><button onClick={() => removeAssignment(id, section.id)} className="text-red-600" aria-label={`${asset?.title ?? id}を${section.label}から外す`}>×</button></span>;})}</div>
          <button disabled={!selectedAssetId} onClick={() => selectedAssetId && assignAsset(selectedAssetId, section.id)} className="mt-3 border border-navy-500 px-3 py-1 text-[10px] disabled:opacity-30">選択中素材を追加</button>
        </article>;
      })}</div>
      <div className="mt-4 flex justify-end"><button onClick={() => setActiveStage("diagnose")} className="bg-navy-900 px-5 py-3 text-sm font-bold text-white dark:bg-sand-100 dark:text-navy-900">次：不足を診断 →</button></div>
    </section>}

    {activeStage === "diagnose" && <section className="mb-8">
      <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-bold tracking-widest text-amber-700 dark:text-amber-300">MATERIAL DIAGNOSTICS</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">素材不足とCreative Idea実現可否</h2></div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">{diagnostics.map((item) => <article key={item.id} className={`border p-4 ${item.level === "blocker" ? "border-red-400 bg-red-50 dark:bg-red-950/20" : item.level === "warning" ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20" : "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"}`}><p className="text-xs font-bold">{item.level === "blocker" ? "要対応" : item.level === "warning" ? "確認推奨" : "準備OK"}</p><h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{item.title}</h3><p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">次：{item.action}</p></article>)}</div>
      <div className="mt-7 flex flex-wrap items-end justify-between gap-3 border-b border-sand-300 pb-3 dark:border-navy-600"><div><p className="text-[10px] font-bold tracking-widest text-fuchsia-700 dark:text-fuchsia-300">IDEA RECOMMENDER</p><h3 className="font-bold text-navy-900 dark:text-sand-100">選んだCreative Ideasを素材で絞る</h3></div><div className="flex gap-2">{(["all", "ready", "needs-media", "wait-audio"] as const).map((filter) => <button key={filter} onClick={() => setIdeaFilter(filter)} className={`border px-2 py-1 text-[10px] ${ideaFilter === filter ? "bg-fuchsia-600 text-white" : "bg-white dark:bg-navy-800"}`}>{filter === "all" ? "すべて" : filter === "ready" ? "試せる" : filter === "needs-media" ? "素材が必要" : "音源確認後"}</button>)}</div></div>
      {selection.selectedCreativeIdeaIds.length === 0 ? <div className="mt-4 border border-fuchsia-300 p-5 text-sm"><Link to="/movie-coach/start-selection" className="font-bold text-fuchsia-700 underline">Selection Mode</Link>で使いたいCreative Ideaを追加すると、ここに実現可否が表示されます。</div> : <div className="mt-4 grid gap-3 lg:grid-cols-2">{visibleIdeas.map(({idea, feasibility}) => <article key={idea.id} className="border border-fuchsia-300 bg-white p-4 dark:border-fuchsia-800 dark:bg-navy-800"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] text-navy-400">{startExtendedSections.find((section) => section.id === idea.sectionId)?.label}</p><h3 className="font-bold text-navy-900 dark:text-sand-100">{idea.title}</h3></div><span className={`shrink-0 px-2 py-1 text-[10px] font-bold ${feasibility.status === "ready" ? "bg-emerald-100 text-emerald-800" : feasibility.status === "wait-audio" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"}`}>{feasibility.label}</span></div><p className="mt-2 text-xs text-navy-600 dark:text-navy-300">{feasibility.reason}</p></article>)}</div>}
    </section>}

    {activeStage === "compare" && <section className="mb-8">
      <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-bold tracking-widest text-violet-700 dark:text-violet-300">A/B COMPARE</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">同じ区間の演出を横並びで決める</h2></div>
      <label className="mt-4 block text-[10px] font-bold tracking-widest text-navy-400">比較する区間<select value={compareSectionId} onChange={(event) => setCompareSectionId(event.target.value as StartExtendedSectionId)} className="mt-1 block w-full max-w-md border border-violet-300 bg-white px-3 py-2 text-sm dark:bg-navy-900">{startExtendedSections.map((section, index) => <option key={section.id} value={section.id}>{index + 1}. {section.label}</option>)}</select></label>
      {(() => {const comparison = comparisonFor(compareSectionId); const recipeA = getComparisonRecipe(comparison.optionARecipeId); const recipeB = getComparisonRecipe(comparison.optionBRecipeId); const options = sectionRecipeOptions(compareSectionId); return <div className="mt-4">
        <div className="grid gap-4 lg:grid-cols-2">{([{key: "a" as const, recipe: recipeA, recipeId: comparison.optionARecipeId}, {key: "b" as const, recipe: recipeB, recipeId: comparison.optionBRecipeId}]).map((option) => <article key={option.key} className={`border-2 p-5 ${comparison.decision === option.key ? "border-violet-600 bg-violet-50 dark:bg-violet-950/20" : "border-sand-300 bg-white dark:border-navy-600 dark:bg-navy-800"}`}><p className="text-xs font-bold text-violet-700">OPTION {option.key.toUpperCase()}</p><select value={option.recipeId} onChange={(event) => patchComparison(compareSectionId, option.key === "a" ? {optionARecipeId: event.target.value, decision: "undecided"} : {optionBRecipeId: event.target.value, decision: "undecided"})} className="mt-2 w-full border border-violet-300 bg-white px-3 py-2 text-sm dark:bg-navy-900">{options.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.label}</option>)}</select><h3 className="mt-4 font-bold text-navy-900 dark:text-sand-100">{option.recipe?.label ?? option.recipeId}</h3><p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{option.recipe?.purpose}</p><p className="mt-2 text-xs text-red-600">避ける：{option.recipe?.avoid}</p><button onClick={() => patchComparison(compareSectionId, {decision: option.key})} className="mt-4 w-full bg-violet-600 px-3 py-2 text-xs font-bold text-white">{comparison.decision === option.key ? "✓ この案を採用候補に選択中" : "この案を採用候補にする"}</button></article>)}</div>
        <label className="mt-4 block text-[10px] font-bold tracking-widest text-navy-400">比較メモ<textarea value={comparison.note} onChange={(event) => patchComparison(compareSectionId, {note: event.target.value})} placeholder="例：Aは写真が読みやすい。Bはサビだけ試したい" className="mt-1 min-h-20 w-full border border-violet-300 bg-white p-3 text-sm dark:bg-navy-900" /></label>
      </div>;})()}
    </section>}

    {activeStage === "review" && <section className="mb-8">
      <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-bold tracking-widest text-rose-700 dark:text-rose-300">RENDER REVIEW</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">動画を見ながら修正コメントを残す</h2></div>
      <div className={`mt-4 border-2 p-4 ${syncedRender ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20" : "border-amber-400 bg-amber-50 dark:bg-amber-950/20"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold tracking-widest text-emerald-700 dark:text-emerald-300">ROUGH PREVIEW SYNC</p><h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{syncedRender ? `最新Roughを検出：${syncedRender.title}` : "最新Roughがまだ接続されていません"}</h3>{syncedRender && <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">更新：{new Date(syncedRender.updatedAt).toLocaleString("ja-JP")} · {(syncedRender.fileSizeBytes / 1024 / 1024).toFixed(1)} MB · {workspace.renderPath === syncedRender.previewUrl ? "自動接続済み" : "接続待ち"}</p>}</div><div className="flex flex-col gap-2"><button onClick={copyRenderSyncCommand} className="border border-emerald-600 px-3 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-200">{renderSyncCopied ? "コマンドをコピーしました ✓" : "Rough作成＋接続コマンドをコピー"}</button>{syncedRender && workspace.renderPath !== syncedRender.previewUrl && <button onClick={() => update((current) => ({...current, renderPath: syncedRender.previewUrl}))} className="bg-emerald-700 px-3 py-2 text-xs font-bold text-white">最新Roughへ接続</button>}</div></div>
        <p className="mt-2 text-xs text-navy-600 dark:text-navy-300">コマンドはRemotionで低解像度Roughを作成し、原本を動かさずレビュー画面用のローカルリンクへ接続します。画面を再読み込みすると自動再生欄へ入ります。</p>
      </div>
      <div className="mt-4 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div><label className="text-[10px] font-bold tracking-widest text-navy-400">RENDER URL / PATH<input value={workspace.renderPath} onChange={(event) => update((current) => ({...current, renderPath: event.target.value}))} placeholder="ブラウザから再生できるMP4/WebM URL" className="mt-1 block w-full border border-rose-300 bg-white px-3 py-2 text-sm dark:bg-navy-900" /></label><div className="mt-3 flex aspect-video items-center justify-center overflow-hidden bg-black">{workspace.renderPath && isVideoPath(workspace.renderPath) ? <video ref={videoRef} controls src={workspace.renderPath} className="h-full w-full" /> : <div className="p-6 text-center text-sm text-white"><p>RenderのURLまたはブラウザから読めるパスを入力してください。</p><p className="mt-2 text-xs text-sand-300">再生できないローカルパスでも、コメントは区間指定で記録できます。</p></div>}</div></div>
        <div className="border border-rose-300 bg-rose-50 p-4 dark:border-rose-800 dark:bg-rose-950/20"><h3 className="font-bold text-navy-900 dark:text-sand-100">現在位置へコメント</h3><p className="mt-1 text-xs text-navy-500 dark:text-navy-300">動画が再生できる場合は、現在の再生位置を自動記録します。</p><select value={reviewSectionId} onChange={(event) => setReviewSectionId(event.target.value as StartExtendedSectionId)} className="mt-3 w-full border border-rose-300 bg-white px-3 py-2 text-sm dark:bg-navy-900">{startExtendedSections.map((section) => <option key={section.id} value={section.id}>{section.label}</option>)}</select><select value={reviewType} onChange={(event) => setReviewType(event.target.value as StartReviewCommentType)} className="mt-2 w-full border border-rose-300 bg-white px-3 py-2 text-sm dark:bg-navy-900">{(Object.keys(startReviewCommentTypeLabels) as StartReviewCommentType[]).map((type) => <option key={type} value={type}>{startReviewCommentTypeLabels[type]}</option>)}</select><textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="例：写真をもう少し長く見せたい" className="mt-2 min-h-28 w-full border border-rose-300 bg-white p-3 text-sm dark:bg-navy-900" /><button onClick={addReviewComment} disabled={!reviewText.trim()} className="mt-2 w-full bg-rose-700 px-3 py-2 text-sm font-bold text-white disabled:opacity-40">現在位置へ追加</button></div>
      </div>
      <div className="mt-5 space-y-2">{workspace.renderComments.length === 0 && <p className="border border-dashed border-sand-300 p-5 text-center text-sm text-navy-400">レビューコメントはまだありません。</p>}{workspace.renderComments.map((comment) => {const section = startExtendedSections.find((item) => item.id === comment.sectionId); return <article key={comment.id} className={`flex flex-col gap-3 border p-3 sm:flex-row sm:items-center ${comment.resolved ? "border-emerald-300 bg-emerald-50 opacity-70 dark:bg-emerald-950/20" : "border-rose-300 bg-white dark:bg-navy-800"}`}><button onClick={() => update((current) => ({...current, renderComments: current.renderComments.map((item) => item.id === comment.id ? {...item, resolved: !item.resolved} : item)}))} className="shrink-0 text-left text-xs font-bold text-emerald-700">{comment.resolved ? "✓ 解決済み" : "○ 未解決"}</button><div className="min-w-0 flex-1"><p className="text-[10px] text-navy-400">{section?.label} · {comment.timeSec === null ? "時刻なし" : formatTime(comment.timeSec)} · {startReviewCommentTypeLabels[comment.type]}</p><p className="text-sm text-navy-800 dark:text-sand-100">{comment.comment}</p></div><button onClick={() => update((current) => ({...current, renderComments: current.renderComments.filter((item) => item.id !== comment.id)}))} className="shrink-0 text-xs text-red-600">削除</button></article>;})}</div>
      <div className="mt-5 grid gap-2 md:grid-cols-5">{(Object.keys(gateLabels) as (keyof StartProductionWorkspaceState["gates"])[]).map((key) => <label key={key} className="flex items-start gap-2 border border-sand-300 bg-white p-3 text-xs dark:border-navy-600 dark:bg-navy-800"><input type="checkbox" checked={workspace.gates[key]} onChange={() => update((current) => ({...current, gates: {...current.gates, [key]: !current.gates[key]}}))} />{gateLabels[key]}</label>)}</div>
    </section>}

    {activeStage === "handoff" && <section className="mb-8">
      <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-bold tracking-widest text-emerald-700 dark:text-emerald-300">CODEX HANDOFF</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">初回制作と第2修正を、迷わず依頼する</h2></div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2"><article className="border-2 border-sky-400 bg-sky-50 p-5 dark:bg-sky-950/20"><p className="text-[10px] font-bold tracking-widest text-sky-700">FIRST ROUGH</p><h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">初回制作プロンプト</h3><p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">Selection Modeの方向・Idea・14区間・コメントを渡します。最初の実素材Roughを作るときに使用します。</p><button onClick={() => copy(initialPrompt, "initial")} className="mt-4 w-full bg-sky-700 px-4 py-3 text-sm font-bold text-white">{copied === "initial" ? "コピーしました ✓" : "初回制作プロンプトをコピー"}</button></article><article className="border-2 border-rose-400 bg-rose-50 p-5 dark:bg-rose-950/20"><p className="text-[10px] font-bold tracking-widest text-rose-700">REVISION ROUND</p><h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">第2修正プロンプト</h3><p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">素材割り当て・A/B結果・Renderコメント・解決状態をまとめます。Roughを見た後はこちらを使用します。</p><button onClick={() => copy(revisionPrompt, "revision")} className="mt-4 w-full bg-rose-700 px-4 py-3 text-sm font-bold text-white">{copied === "revision" ? "コピーしました ✓" : "第2修正プロンプトをコピー"}</button></article></div>
      <button onClick={() => copy(JSON.stringify({schemaVersion: 1, workspace, phases, diagnostics, selectedIdeas: selection.selectedCreativeIdeaIds.map((id) => startCreativeIdeas.find((idea) => idea.id === id)).filter(Boolean)}, null, 2), "json")} className="mt-3 w-full border border-navy-700 px-4 py-3 text-sm font-bold dark:border-sand-300">{copied === "json" ? "JSONをコピーしました ✓" : "制作ワークスペースJSONをコピー"}</button>
      <details className="mt-4 border border-sand-300 p-4 dark:border-navy-600"><summary className="cursor-pointer text-xs font-bold">第2修正プロンプトを確認</summary><pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap bg-sand-50 p-3 text-xs leading-5 dark:bg-navy-900">{revisionPrompt}</pre></details>
    </section>}

    <footer className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-sand-300 p-4 dark:border-navy-600"><p className="text-xs text-navy-500 dark:text-navy-300">すべてブラウザへ自動保存されます。素材原本は削除・移動されません。</p><div className="flex gap-2"><Link to="/movie-coach/start-selection" className="border border-navy-700 px-3 py-2 text-xs dark:border-sand-300">Selectionへ戻る</Link><button onClick={resetWorkspace} className="border border-red-300 px-3 py-2 text-xs text-red-600">制作ワークスペースを初期化</button></div></footer>
  </div>;
}
