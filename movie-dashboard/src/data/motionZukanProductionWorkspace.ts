import type { MotionZukanComposerState, SceneProjectId } from "./visualSceneComposer";
import type { DemoStockMediaPack } from "./demoStockMediaCatalog";

export type AssetKind = "IMAGE" | "VIDEO";
export type AssetSuitability = "OPENING" | "PROFILE";
export type SceneWorkflowStatus = "NOT_STARTED" | "IN_PROGRESS" | "ALMOST_DONE" | "DONE";
export type MusicMarkerKind = "INTRO" | "VERSE" | "BUILD" | "CHORUS" | "BREAK" | "ENDING" | "CUSTOM";

export interface MotionZukanMediaAsset {
  assetId: string;
  label: string;
  kind: AssetKind;
  sourceRef: string;
  favorite: boolean;
  placeholder: boolean;
  suitability: AssetSuitability[];
  createdAt: string;
  updatedAt: string;
}

export interface SceneProductionMeta {
  sceneId: string;
  note: string;
  status: SceneWorkflowStatus;
  assetIds: string[];
  updatedAt: string;
}

export interface MusicStructureMarker {
  markerId: string;
  projectId: SceneProjectId;
  label: string;
  kind: MusicMarkerKind;
  timeSeconds: number;
  createdAt: string;
}

export interface ProjectDesignSettings {
  projectId: SceneProjectId;
  fontFamily: string;
  textColor: string;
  safeAreaPercent: number;
  updatedAt: string;
}

export interface WorkspaceSnapshotData {
  assets: MotionZukanMediaAsset[];
  sceneMeta: SceneProductionMeta[];
  musicMarkers: MusicStructureMarker[];
  designSettings: ProjectDesignSettings[];
  demoBgmSelection: DemoBgmWorkspaceSelection | null;
}

export interface DemoBgmWorkspaceSelection {
  authority: "BGM_CANDIDATE";
  candidateId: string;
  genre: string;
  title: string;
  sourceRef: string;
  sourcePageUrl: string;
  contentIdRegistered: true;
  finalPublicationApproved: false;
  selectedAt: string;
}

export interface ProjectVersionSnapshot {
  versionId: string;
  projectId: SceneProjectId;
  label: string;
  createdAt: string;
  composerState: MotionZukanComposerState;
  workspace: WorkspaceSnapshotData;
}

export interface MotionZukanProductionWorkspaceState extends WorkspaceSnapshotData {
  schemaVersion: "motion-zukan-production-workspace/v1";
  versions: ProjectVersionSnapshot[];
}

export interface AssetUsageDetail {
  assetId: string;
  count: number;
  sceneIds: string[];
}

export interface FinalCheckItem {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
}

export interface MotionZukanProductionHandoff {
  schemaVersion: "motion-zukan-production-handoff/v1";
  authority: "HUMAN_MASTER_WORKSPACE";
  projectId: SceneProjectId;
  exportedAt: string;
  workspaceChecksPassed: boolean;
  workspaceBlockers: FinalCheckItem[];
  guards: {
    externalProductionGateEvaluated: false;
    demoAssetsAreProduction: false;
    bgmCandidateApproved: false;
  };
  composer: MotionZukanComposerState;
  workspace: MotionZukanProductionWorkspaceState;
}

export type MotionZukanProductionHandoffParseResult =
  | { ok: true; handoff: MotionZukanProductionHandoff }
  | { ok: false; error: string };

export const MOTION_ZUKAN_PRODUCTION_WORKSPACE_STORAGE_KEY = "motion-zukan-production-workspace-v1";
export const MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT = "motion-zukan-production-workspace-changed";

function nowIso() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function defaultDesign(projectId: SceneProjectId): ProjectDesignSettings {
  return {
    projectId,
    fontFamily: "Noto Sans JP",
    textColor: "#FFFFFF",
    safeAreaPercent: 8,
    updatedAt: nowIso(),
  };
}

export function emptyMotionZukanProductionWorkspaceState(): MotionZukanProductionWorkspaceState {
  return {
    schemaVersion: "motion-zukan-production-workspace/v1",
    assets: [],
    sceneMeta: [],
    musicMarkers: [],
    designSettings: [defaultDesign("opening"), defaultDesign("profile")],
    demoBgmSelection: null,
    versions: [],
  };
}

export function loadMotionZukanProductionWorkspaceState(): MotionZukanProductionWorkspaceState {
  if (typeof localStorage === "undefined") return emptyMotionZukanProductionWorkspaceState();
  try {
    const raw = localStorage.getItem(MOTION_ZUKAN_PRODUCTION_WORKSPACE_STORAGE_KEY);
    if (!raw) return emptyMotionZukanProductionWorkspaceState();
    const parsed = JSON.parse(raw) as MotionZukanProductionWorkspaceState;
    if (
      parsed.schemaVersion !== "motion-zukan-production-workspace/v1" ||
      !Array.isArray(parsed.assets) ||
      !Array.isArray(parsed.sceneMeta) ||
      !Array.isArray(parsed.musicMarkers) ||
      !Array.isArray(parsed.designSettings) ||
      !Array.isArray(parsed.versions)
    ) {
      return emptyMotionZukanProductionWorkspaceState();
    }
    const designSettings = ["opening", "profile"].map((projectId) => {
      const existing = parsed.designSettings.find((item) => item.projectId === projectId);
      return existing ?? defaultDesign(projectId as SceneProjectId);
    });
    return { ...parsed, designSettings, demoBgmSelection: parsed.demoBgmSelection ?? null };
  } catch {
    return emptyMotionZukanProductionWorkspaceState();
  }
}

export function saveMotionZukanProductionWorkspaceState(state: MotionZukanProductionWorkspaceState) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(MOTION_ZUKAN_PRODUCTION_WORKSPACE_STORAGE_KEY, JSON.stringify(state));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT, { detail: state }));
  }
}

export function addMediaAsset(
  state: MotionZukanProductionWorkspaceState,
  input: {
    label: string;
    kind: AssetKind;
    sourceRef: string;
    favorite?: boolean;
    placeholder?: boolean;
    suitability?: AssetSuitability[];
  },
): MotionZukanProductionWorkspaceState {
  const createdAt = nowIso();
  const asset: MotionZukanMediaAsset = {
    assetId: createId("mz-asset"),
    label: input.label.trim() || "名称未設定素材",
    kind: input.kind,
    sourceRef: input.sourceRef.trim(),
    favorite: input.favorite ?? false,
    placeholder: input.placeholder ?? false,
    suitability: input.suitability ?? [],
    createdAt,
    updatedAt: createdAt,
  };
  return { ...state, assets: [asset, ...state.assets] };
}

export function applyDemoStockMediaPack(
  state: MotionZukanProductionWorkspaceState,
  pack: DemoStockMediaPack,
): MotionZukanProductionWorkspaceState {
  if (
    pack.schemaVersion !== "motion-zukan-demo-stock-pack/v1" ||
    pack.authority !== "DEMO_ONLY_NOT_PRODUCTION" ||
    pack.guards.userMediaApproved !== false ||
    pack.guards.finalPublicationApproved !== false
  ) {
    return state;
  }

  const selectedAt = nowIso();
  const existingSourceRefs = new Set(state.assets.map((asset) => asset.sourceRef));
  const importedAssets: MotionZukanMediaAsset[] = pack.photos
    .filter((photo) => photo.authority === "DEMO_ONLY_NOT_USER_MEDIA" && !existingSourceRefs.has(photo.localPath))
    .map((photo) => ({
      assetId: `mz-demo-${photo.id}`,
      label: `[DEMO] ${photo.title}`,
      kind: "IMAGE",
      sourceRef: photo.localPath,
      favorite: false,
      placeholder: true,
      suitability: ["OPENING", "PROFILE"],
      createdAt: selectedAt,
      updatedAt: selectedAt,
    }));

  return {
    ...state,
    assets: [...importedAssets, ...state.assets],
    demoBgmSelection: {
      authority: "BGM_CANDIDATE",
      candidateId: pack.bgmCandidate.id,
      genre: pack.bgmCandidate.genre,
      title: pack.bgmCandidate.title,
      sourceRef: pack.bgmCandidate.localPath,
      sourcePageUrl: pack.bgmCandidate.source.pageUrl,
      contentIdRegistered: true,
      finalPublicationApproved: false,
      selectedAt,
    },
  };
}

export function assignDemoAssetsToEmptyScenes(
  state: MotionZukanProductionWorkspaceState,
  sceneIds: string[],
  suitability: AssetSuitability,
): MotionZukanProductionWorkspaceState {
  const assignedAssetIds = new Set(state.sceneMeta.flatMap((meta) => meta.assetIds));
  const availableDemoAssets = state.assets.filter(
    (asset) =>
      asset.placeholder &&
      asset.assetId.startsWith("mz-demo-") &&
      asset.sourceRef.startsWith("/demo-assets/stock-photos/") &&
      asset.suitability.includes(suitability) &&
      !assignedAssetIds.has(asset.assetId),
  );
  const emptySceneIds = sceneIds.filter((sceneId) => sceneMetaFor(state, sceneId).assetIds.length === 0);
  if (availableDemoAssets.length === 0 || emptySceneIds.length === 0) return state;

  return emptySceneIds.slice(0, availableDemoAssets.length).reduce(
    (next, sceneId, index) => updateSceneProductionMeta(next, sceneId, { assetIds: [availableDemoAssets[index].assetId] }),
    state,
  );
}

export function removeDemoStockMediaPack(state: MotionZukanProductionWorkspaceState): MotionZukanProductionWorkspaceState {
  const demoAssetIds = new Set(
    state.assets
      .filter(
        (asset) =>
          asset.placeholder &&
          asset.assetId.startsWith("mz-demo-") &&
          asset.sourceRef.startsWith("/demo-assets/stock-photos/"),
      )
      .map((asset) => asset.assetId),
  );
  if (demoAssetIds.size === 0 && !state.demoBgmSelection) return state;
  const removedAt = nowIso();

  return {
    ...state,
    assets: state.assets.filter((asset) => !demoAssetIds.has(asset.assetId)),
    sceneMeta: state.sceneMeta.map((meta) => {
      const assetIds = meta.assetIds.filter((assetId) => !demoAssetIds.has(assetId));
      return assetIds.length === meta.assetIds.length ? meta : { ...meta, assetIds, updatedAt: removedAt };
    }),
    demoBgmSelection: null,
  };
}

export function updateMediaAsset(
  state: MotionZukanProductionWorkspaceState,
  assetId: string,
  patch: Partial<Pick<MotionZukanMediaAsset, "label" | "sourceRef" | "favorite" | "placeholder" | "suitability">>,
): MotionZukanProductionWorkspaceState {
  return {
    ...state,
    assets: state.assets.map((asset) =>
      asset.assetId === assetId ? { ...asset, ...patch, updatedAt: nowIso() } : asset,
    ),
  };
}

export function removeMediaAsset(state: MotionZukanProductionWorkspaceState, assetId: string): MotionZukanProductionWorkspaceState {
  return {
    ...state,
    assets: state.assets.filter((asset) => asset.assetId !== assetId),
    sceneMeta: state.sceneMeta.map((meta) => ({ ...meta, assetIds: meta.assetIds.filter((id) => id !== assetId) })),
  };
}

export function sceneMetaFor(state: MotionZukanProductionWorkspaceState, sceneId: string): SceneProductionMeta {
  return (
    state.sceneMeta.find((meta) => meta.sceneId === sceneId) ?? {
      sceneId,
      note: "",
      status: "NOT_STARTED",
      assetIds: [],
      updatedAt: nowIso(),
    }
  );
}

export function updateSceneProductionMeta(
  state: MotionZukanProductionWorkspaceState,
  sceneId: string,
  patch: Partial<Pick<SceneProductionMeta, "note" | "status" | "assetIds">>,
): MotionZukanProductionWorkspaceState {
  const current = sceneMetaFor(state, sceneId);
  const next: SceneProductionMeta = { ...current, ...patch, updatedAt: nowIso() };
  const exists = state.sceneMeta.some((meta) => meta.sceneId === sceneId);
  return {
    ...state,
    sceneMeta: exists ? state.sceneMeta.map((meta) => (meta.sceneId === sceneId ? next : meta)) : [...state.sceneMeta, next],
  };
}

export function toggleSceneAssetAssignment(
  state: MotionZukanProductionWorkspaceState,
  sceneId: string,
  assetId: string,
): MotionZukanProductionWorkspaceState {
  const current = sceneMetaFor(state, sceneId);
  const assigned = current.assetIds.includes(assetId);
  return updateSceneProductionMeta(state, sceneId, {
    assetIds: assigned ? current.assetIds.filter((id) => id !== assetId) : [...current.assetIds, assetId],
  });
}

export function getAssetUsage(state: MotionZukanProductionWorkspaceState): AssetUsageDetail[] {
  return state.assets.map((asset) => {
    const sceneIds = state.sceneMeta.filter((meta) => meta.assetIds.includes(asset.assetId)).map((meta) => meta.sceneId);
    return { assetId: asset.assetId, count: sceneIds.length, sceneIds };
  });
}

export function getDuplicateAssetUsage(state: MotionZukanProductionWorkspaceState): AssetUsageDetail[] {
  return getAssetUsage(state).filter((item) => item.count > 1);
}

export function addMusicMarker(
  state: MotionZukanProductionWorkspaceState,
  input: { projectId: SceneProjectId; label: string; kind: MusicMarkerKind; timeSeconds: number },
): MotionZukanProductionWorkspaceState {
  const marker: MusicStructureMarker = {
    markerId: createId("mz-marker"),
    projectId: input.projectId,
    label: input.label.trim() || "Marker",
    kind: input.kind,
    timeSeconds: Number(Math.max(0, input.timeSeconds).toFixed(3)),
    createdAt: nowIso(),
  };
  return {
    ...state,
    musicMarkers: [...state.musicMarkers, marker].sort((a, b) => a.timeSeconds - b.timeSeconds),
  };
}

export function removeMusicMarker(state: MotionZukanProductionWorkspaceState, markerId: string): MotionZukanProductionWorkspaceState {
  return { ...state, musicMarkers: state.musicMarkers.filter((marker) => marker.markerId !== markerId) };
}

export function updateProjectDesignSettings(
  state: MotionZukanProductionWorkspaceState,
  projectId: SceneProjectId,
  patch: Partial<Omit<ProjectDesignSettings, "projectId" | "updatedAt">>,
): MotionZukanProductionWorkspaceState {
  const current = state.designSettings.find((item) => item.projectId === projectId) ?? defaultDesign(projectId);
  const next = { ...current, ...patch, updatedAt: nowIso() };
  const exists = state.designSettings.some((item) => item.projectId === projectId);
  return {
    ...state,
    designSettings: exists
      ? state.designSettings.map((item) => (item.projectId === projectId ? next : item))
      : [...state.designSettings, next],
  };
}

function snapshotWorkspace(state: MotionZukanProductionWorkspaceState): WorkspaceSnapshotData {
  return {
    assets: structuredClone(state.assets),
    sceneMeta: structuredClone(state.sceneMeta),
    musicMarkers: structuredClone(state.musicMarkers),
    designSettings: structuredClone(state.designSettings),
    demoBgmSelection: structuredClone(state.demoBgmSelection),
  };
}

export function saveProjectVersion(
  state: MotionZukanProductionWorkspaceState,
  composerState: MotionZukanComposerState,
  projectId: SceneProjectId,
  label: string,
): MotionZukanProductionWorkspaceState {
  const snapshot: ProjectVersionSnapshot = {
    versionId: createId("mz-version"),
    projectId,
    label: label.trim() || `${projectId === "opening" ? "Opening" : "Profile"} version`,
    createdAt: nowIso(),
    composerState: structuredClone(composerState),
    workspace: snapshotWorkspace(state),
  };
  return { ...state, versions: [snapshot, ...state.versions].slice(0, 20) };
}

export function restoreWorkspaceFromVersion(
  state: MotionZukanProductionWorkspaceState,
  versionId: string,
): MotionZukanProductionWorkspaceState {
  const version = state.versions.find((item) => item.versionId === versionId);
  if (!version) return state;
  return {
    ...state,
    assets: structuredClone(version.workspace.assets),
    sceneMeta: structuredClone(version.workspace.sceneMeta),
    musicMarkers: structuredClone(version.workspace.musicMarkers),
    designSettings: structuredClone(version.workspace.designSettings),
    demoBgmSelection: structuredClone(version.workspace.demoBgmSelection ?? null),
  };
}

export function getFinalChecks(
  composerState: MotionZukanComposerState,
  workspaceState: MotionZukanProductionWorkspaceState,
  projectId: SceneProjectId,
): FinalCheckItem[] {
  const scenes = composerState.scenes.filter((scene) => scene.projectId === projectId);
  const sceneMetas = scenes.map((scene) => sceneMetaFor(workspaceState, scene.sceneId));
  const assignedIds = new Set(sceneMetas.flatMap((meta) => meta.assetIds));
  const assignedAssets = workspaceState.assets.filter((asset) => assignedIds.has(asset.assetId));
  const placeholderAssets = assignedAssets.filter((asset) => asset.placeholder);
  const missingSceneAssets = scenes.filter((scene) => sceneMetaFor(workspaceState, scene.sceneId).assetIds.length === 0);
  const unfinishedScenes = scenes.filter((scene) => sceneMetaFor(workspaceState, scene.sceneId).status !== "DONE");
  const duplicateUsage = getDuplicateAssetUsage(workspaceState).filter((usage) =>
    usage.sceneIds.some((sceneId) => scenes.some((scene) => scene.sceneId === sceneId)),
  );

  return [
    {
      id: "scenes-exist",
      label: "Sceneがある",
      ok: scenes.length > 0,
      detail: scenes.length > 0 ? `${scenes.length} Scene` : "Sceneがまだありません",
    },
    {
      id: "materials-assigned",
      label: "全Sceneに素材が割り当て済み",
      ok: missingSceneAssets.length === 0,
      detail: missingSceneAssets.length === 0 ? "OK" : `${missingSceneAssets.length} Sceneで素材未設定`,
    },
    {
      id: "no-placeholder",
      label: "仮素材が残っていない",
      ok: placeholderAssets.length === 0,
      detail: placeholderAssets.length === 0 ? "OK" : `${placeholderAssets.length}件の仮素材あり`,
    },
    {
      id: "all-scenes-done",
      label: "全Sceneが完成扱い",
      ok: unfinishedScenes.length === 0,
      detail: unfinishedScenes.length === 0 ? "OK" : `${unfinishedScenes.length} Sceneが未完成`,
    },
    {
      id: "duplicate-usage-reviewed",
      label: "素材重複を確認",
      ok: duplicateUsage.length === 0,
      detail: duplicateUsage.length === 0 ? "重複なし" : `${duplicateUsage.length}素材が複数Sceneで使用中`,
    },
  ];
}

export function buildMotionZukanProductionHandoff(
  composerState: MotionZukanComposerState,
  workspaceState: MotionZukanProductionWorkspaceState,
  projectId: SceneProjectId,
): MotionZukanProductionHandoff {
  const checks = getFinalChecks(composerState, workspaceState, projectId);
  return {
    schemaVersion: "motion-zukan-production-handoff/v1",
    authority: "HUMAN_MASTER_WORKSPACE",
    projectId,
    exportedAt: nowIso(),
    workspaceChecksPassed: checks.every((check) => check.ok),
    workspaceBlockers: checks.filter((check) => !check.ok),
    guards: {
      externalProductionGateEvaluated: false,
      demoAssetsAreProduction: false,
      bgmCandidateApproved: false,
    },
    composer: structuredClone(composerState),
    workspace: structuredClone(workspaceState),
  };
}

export function parseMotionZukanProductionHandoff(raw: string): MotionZukanProductionHandoffParseResult {
  let candidate: unknown;
  try {
    candidate = JSON.parse(raw);
  } catch {
    return { ok: false, error: "JSONとして読み取れません" };
  }
  if (!candidate || typeof candidate !== "object") return { ok: false, error: "handoff objectがありません" };

  const handoff = candidate as Partial<MotionZukanProductionHandoff>;
  if (handoff.schemaVersion !== "motion-zukan-production-handoff/v1" || handoff.authority !== "HUMAN_MASTER_WORKSPACE") {
    return { ok: false, error: "対応していないhandoff schemaまたはauthorityです" };
  }
  if (handoff.projectId !== "opening" && handoff.projectId !== "profile") {
    return { ok: false, error: "projectIdが不正です" };
  }
  if (
    !handoff.guards ||
    handoff.guards.externalProductionGateEvaluated !== false ||
    handoff.guards.demoAssetsAreProduction !== false ||
    handoff.guards.bgmCandidateApproved !== false
  ) {
    return { ok: false, error: "Production権限ガードが不正です" };
  }
  if (
    !handoff.composer ||
    handoff.composer.schemaVersion !== "motion-zukan-composer-state/v1" ||
    !Array.isArray(handoff.composer.scenes) ||
    !Array.isArray(handoff.composer.timelines)
  ) {
    return { ok: false, error: "composer stateが不正です" };
  }
  if (
    !handoff.workspace ||
    handoff.workspace.schemaVersion !== "motion-zukan-production-workspace/v1" ||
    !Array.isArray(handoff.workspace.assets) ||
    !Array.isArray(handoff.workspace.sceneMeta) ||
    !Array.isArray(handoff.workspace.musicMarkers) ||
    !Array.isArray(handoff.workspace.designSettings) ||
    !Array.isArray(handoff.workspace.versions)
  ) {
    return { ok: false, error: "production workspace stateが不正です" };
  }

  return {
    ok: true,
    handoff: structuredClone({
      ...handoff,
      workspace: { ...handoff.workspace, demoBgmSelection: handoff.workspace.demoBgmSelection ?? null },
    } as MotionZukanProductionHandoff),
  };
}
