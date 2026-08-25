import {getDirectorRecipeById} from "./directorRecipeCatalog";
import {getStartCreativeIdea, startCreativeIdeas, type StartCreativeIdea} from "./startCreativeIdeas";
import {startExtendedSections, type StartExtendedSectionId} from "./startExtendedRhythmMap";
import {sectionRecipeOptions, type StartSelectionState} from "./startSelectionMode";
import type {Asset} from "../types/movie";

export type StartMaterialCategory = "hero" | "travel" | "family-friends" | "venue" | "detail";
export type StartComparisonDecision = "undecided" | "a" | "b";
export type StartReviewCommentType = "timing" | "text" | "crop" | "motion" | "audio" | "other";

export interface StartMaterialMeta {
  category: StartMaterialCategory;
  isHero: boolean;
  hasTextSpace: boolean;
}

export interface StartABComparison {
  optionARecipeId: string;
  optionBRecipeId: string;
  decision: StartComparisonDecision;
  note: string;
}

export interface StartRenderReviewComment {
  id: string;
  sectionId: StartExtendedSectionId;
  timeSec: number | null;
  type: StartReviewCommentType;
  comment: string;
  resolved: boolean;
}

export interface StartProductionWorkspaceState {
  materialMetaByAsset: Record<string, StartMaterialMeta>;
  assetIdsBySection: Partial<Record<StartExtendedSectionId, string[]>>;
  comparisonsBySection: Partial<Record<StartExtendedSectionId, StartABComparison>>;
  renderPath: string;
  renderComments: StartRenderReviewComment[];
  gates: {
    roughRendered: boolean;
    reviewConfirmed: boolean;
    finalPlaybackChecked: boolean;
    finalAudioChecked: boolean;
    finalVenueChecked: boolean;
  };
}

export interface StartMaterialDiagnostic {
  id: string;
  level: "blocker" | "warning" | "ready";
  title: string;
  action: string;
}

export interface StartIdeaFeasibility {
  status: "ready" | "needs-media" | "wait-audio";
  label: string;
  reason: string;
}

export const START_PRODUCTION_WORKSPACE_STORAGE_KEY = "start-production-workspace-v1";

export const startMaterialCategoryLabels: Record<StartMaterialCategory, string> = {
  hero: "Hero",
  travel: "旅",
  "family-friends": "家族・友人",
  venue: "会場",
  detail: "小物・Detail",
};

export const startReviewCommentTypeLabels: Record<StartReviewCommentType, string> = {
  timing: "長さ・タイミング",
  text: "文字",
  crop: "Crop・構図",
  motion: "動き",
  audio: "音",
  other: "その他",
};

export const defaultStartProductionWorkspaceState: StartProductionWorkspaceState = {
  materialMetaByAsset: {},
  assetIdsBySection: {},
  comparisonsBySection: {},
  renderPath: "",
  renderComments: [],
  gates: {roughRendered: false, reviewConfirmed: false, finalPlaybackChecked: false, finalAudioChecked: false, finalVenueChecked: false},
};

export function readStartProductionWorkspaceState(): StartProductionWorkspaceState {
  try {
    const saved = window.localStorage.getItem(START_PRODUCTION_WORKSPACE_STORAGE_KEY);
    if (!saved) return defaultStartProductionWorkspaceState;
    const parsed = JSON.parse(saved) as Partial<StartProductionWorkspaceState>;
    return {
      ...defaultStartProductionWorkspaceState,
      ...parsed,
      materialMetaByAsset: parsed.materialMetaByAsset ?? {},
      assetIdsBySection: parsed.assetIdsBySection ?? {},
      comparisonsBySection: parsed.comparisonsBySection ?? {},
      renderComments: parsed.renderComments ?? [],
      gates: {...defaultStartProductionWorkspaceState.gates, ...parsed.gates},
    };
  } catch {
    return defaultStartProductionWorkspaceState;
  }
}

export function saveStartProductionWorkspaceState(state: StartProductionWorkspaceState) {
  try {
    window.localStorage.setItem(START_PRODUCTION_WORKSPACE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The workspace remains usable when browser storage is unavailable.
  }
}

export function getStartOpeningMediaAssets(assets: Asset[]) {
  return assets.filter((asset) => asset.relatedMovieIds.includes("opening") && asset.path.trim().length > 0 && (asset.type === "own_photo" || asset.type === "own_video"));
}

export function getStartMaterialDiagnostics(state: StartProductionWorkspaceState, assets: Asset[], selection: StartSelectionState): StartMaterialDiagnostic[] {
  const media = getStartOpeningMediaAssets(assets);
  const assignedIds = new Set(Object.values(state.assetIdsBySection).flatMap((ids) => ids ?? []));
  const assigned = media.filter((asset) => assignedIds.has(asset.assetId));
  const meta = (assetId: string) => state.materialMetaByAsset[assetId];
  const heroCount = media.filter((asset) => meta(asset.assetId)?.isHero).length;
  const landscapeCount = media.filter((asset) => asset.orientation === "landscape").length;
  const venueCount = media.filter((asset) => meta(asset.assetId)?.category === "venue").length;
  const endAssets = state.assetIdsBySection["end-before-c-section"] ?? [];
  const endTextSpaceCount = endAssets.filter((id) => meta(id)?.hasTextSpace).length;
  const unassignedSections = startExtendedSections.filter((section) => (state.assetIdsBySection[section.id] ?? []).length === 0);
  const diagnostics: StartMaterialDiagnostic[] = [];

  diagnostics.push(media.length === 0
    ? {id: "no-media", level: "blocker", title: "StaRt用の実写真・実動画が未登録", action: "素材ボードから実素材を登録してください。"}
    : {id: "media-present", level: "ready", title: `実素材を${media.length}件確認`, action: "分類と区間割り当てへ進めます。"});
  diagnostics.push(heroCount < 2
    ? {id: "hero-shortage", level: "blocker", title: "サビHeroが不足", action: "Hero候補を2件以上選んでください。"}
    : {id: "hero-ready", level: "ready", title: "サビHero候補を確保", action: "1回目と2回目で異なるHeroを比較してください。"});
  diagnostics.push(landscapeCount === 0
    ? {id: "landscape-shortage", level: "warning", title: "横写真を確認できません", action: "orientationを横へ設定した素材を用意してください。"}
    : {id: "landscape-ready", level: "ready", title: "横写真あり", action: "full-frameと文字余白を確認できます。"});
  diagnostics.push(venueCount === 0
    ? {id: "venue-shortage", level: "warning", title: "会場素材が未分類", action: "横浜・会場外観・入口などを会場へ分類してください。"}
    : {id: "venue-ready", level: "ready", title: "会場素材あり", action: "終盤の到着感に利用できます。"});
  diagnostics.push(endTextSpaceCount === 0
    ? {id: "end-space-shortage", level: "warning", title: "END用の文字余白写真が未確定", action: "END WINDOWへ割り当てた写真で「文字余白あり」をONにしてください。"}
    : {id: "end-space-ready", level: "ready", title: "END用文字余白あり", action: "名前・日付との重なりをRoughで確認してください。"});
  diagnostics.push(unassignedSections.length > 0
    ? {id: "section-shortage", level: "blocker", title: `素材未割り当てが${unassignedSections.length}区間`, action: unassignedSections.map((section) => section.label).join(" / ")}
    : {id: "sections-ready", level: "ready", title: "全14区間へ素材割り当て済み", action: "Rough作成へ進めます。"});
  if (!selection.readiness.clearedLocalAudio) diagnostics.push({id: "audio-blocked", level: "blocker", title: "正規ローカル音源が未確認", action: "音を使う演出とFinal timingは確定しないでください。"});
  if (assigned.length === 0 && media.length > 0) diagnostics.push({id: "assignment-start", level: "warning", title: "登録素材が区間へ未配置", action: "カードを下の14区間へドラッグしてください。"});
  return diagnostics;
}

export function getStartIdeaFeasibility(idea: StartCreativeIdea, state: StartProductionWorkspaceState, assets: Asset[], selection: StartSelectionState): StartIdeaFeasibility {
  if (idea.category === "sound" && !selection.readiness.clearedLocalAudio) return {status: "wait-audio", label: "音源確認後", reason: "正規ローカル音源または利用可能な実音声の確認が必要です。"};
  const assignedIds = state.assetIdsBySection[idea.sectionId] ?? [];
  const assigned = assets.filter((asset) => assignedIds.includes(asset.assetId));
  if (assigned.length === 0 && idea.category !== "typography") return {status: "needs-media", label: "素材が必要", reason: "この区間へ写真または動画を割り当ててください。"};
  if (idea.id.includes("hero") && !assigned.some((asset) => state.materialMetaByAsset[asset.assetId]?.isHero)) return {status: "needs-media", label: "Heroが必要", reason: "この区間へHero候補を割り当ててください。"};
  if ((idea.id.includes("venue") || idea.id.includes("yokohama")) && !assigned.some((asset) => state.materialMetaByAsset[asset.assetId]?.category === "venue")) return {status: "needs-media", label: "会場素材が必要", reason: "会場・横浜に分類した素材を割り当ててください。"};
  if (idea.id.includes("video") && !assigned.some((asset) => asset.type === "own_video")) return {status: "needs-media", label: "動画が必要", reason: "実動画をこの区間へ割り当ててください。"};
  if (idea.category === "typography" && assigned.length > 0 && !assigned.some((asset) => state.materialMetaByAsset[asset.assetId]?.hasTextSpace)) return {status: "needs-media", label: "文字余白を確認", reason: "割り当て素材の「文字余白あり」を確認してください。"};
  return {status: "ready", label: "この素材で試せる", reason: "Roughで見え方を比較できます。"};
}

export function getStartCompletionPhases(state: StartProductionWorkspaceState, assets: Asset[], selection: StartSelectionState) {
  const media = getStartOpeningMediaAssets(assets);
  const assignedSections = startExtendedSections.filter((section) => (state.assetIdsBySection[section.id] ?? []).length > 0).length;
  const heroCount = media.filter((asset) => state.materialMetaByAsset[asset.assetId]?.isHero).length;
  const resolvedComments = state.renderComments.filter((comment) => comment.resolved).length;
  return [
    {id: "selection", label: "選定", done: selection.selectedFamilyIds.length >= 4 && startExtendedSections.every((section) => Boolean(selection.recipeBySection[section.id])), detail: `${selection.selectedFamilyIds.length} family / ${selection.selectedCreativeIdeaIds.length} idea`},
    {id: "materials", label: "素材", done: media.length > 0 && heroCount >= 2 && assignedSections === startExtendedSections.length, detail: `${media.length}素材 / ${assignedSections}区間`},
    {id: "audio", label: "音源", done: selection.readiness.clearedLocalAudio && selection.readiness.waveformReviewed && selection.readiness.markersConfirmed, detail: `${[selection.readiness.clearedLocalAudio, selection.readiness.waveformReviewed, selection.readiness.markersConfirmed].filter(Boolean).length} / 3`},
    {id: "rough", label: "Rough", done: state.gates.roughRendered, detail: state.gates.roughRendered ? "目視開始可" : "未確認"},
    {id: "review", label: "修正", done: state.gates.reviewConfirmed && state.renderComments.every((comment) => comment.resolved), detail: `${resolvedComments} / ${state.renderComments.length} resolved`},
    {id: "final", label: "Final", done: state.gates.finalPlaybackChecked && state.gates.finalAudioChecked && state.gates.finalVenueChecked, detail: `${[state.gates.finalPlaybackChecked, state.gates.finalAudioChecked, state.gates.finalVenueChecked].filter(Boolean).length} / 3`},
  ] as const;
}

function buildWorkspaceAssignmentLines(state: StartProductionWorkspaceState, assets: Asset[]) {
  const assetById = new Map(assets.map((asset) => [asset.assetId, asset]));
  return startExtendedSections.map((section, index) => {
    const assigned = (state.assetIdsBySection[section.id] ?? []).map((id) => assetById.get(id)).filter((asset) => asset !== undefined);
    return `${index + 1}. ${section.label}: ${assigned.length > 0 ? assigned.map((asset) => `${asset.title} (${asset.path || asset.assetId})`).join(" / ") : "未割り当て"}`;
  }).join("\n");
}

function buildWorkspaceComparisonLines(state: StartProductionWorkspaceState) {
  return Object.entries(state.comparisonsBySection).map(([sectionId, comparison]) => {
    if (!comparison) return "";
    const section = startExtendedSections.find((item) => item.id === sectionId);
    const selected = comparison.decision === "a" ? comparison.optionARecipeId : comparison.decision === "b" ? comparison.optionBRecipeId : "未決定";
    return `- ${section?.label ?? sectionId}: A=${comparison.optionARecipeId} / B=${comparison.optionBRecipeId} / 採用=${selected}${comparison.note ? ` / ${comparison.note}` : ""}`;
  }).filter(Boolean).join("\n") || "なし";
}

export function buildStartFirstRoughPrompt(state: StartProductionWorkspaceState, selection: StartSelectionState, assets: Asset[], basePrompt: string) {
  const assignmentLines = buildWorkspaceAssignmentLines(state, assets);
  const comparisonLines = buildWorkspaceComparisonLines(state);
  const ideaLines = selection.selectedCreativeIdeaIds.map(getStartCreativeIdea).filter((idea) => idea !== undefined).map((idea) => `- ${idea.title}: ${getStartIdeaFeasibility(idea, state, assets, selection).label}`).join("\n") || "なし";
  const workspaceContext = `## 制作ワークスペースの素材割り当て\n${assignmentLines}\n\n` +
    `## Creative Ideasの実現可否\n${ideaLines}\n\n` +
    `## A/B比較結果\n${comparisonLines}\n\n`;
  return basePrompt.replace("## 完了条件", `${workspaceContext}## 完了条件`);
}

export function buildStartRevisionPrompt(state: StartProductionWorkspaceState, selection: StartSelectionState, assets: Asset[]) {
  const assignmentLines = buildWorkspaceAssignmentLines(state, assets);
  const comparisonLines = buildWorkspaceComparisonLines(state);
  const commentLines = state.renderComments.map((comment) => {
    const section = startExtendedSections.find((item) => item.id === comment.sectionId);
    return `- [${comment.resolved ? "解決済み" : "未解決"}] ${section?.label ?? comment.sectionId}${comment.timeSec === null ? "" : ` @ ${comment.timeSec.toFixed(1)}s`} / ${startReviewCommentTypeLabels[comment.type]}: ${comment.comment}`;
  }).join("\n") || "なし";
  const selectedIdeaLines = selection.selectedCreativeIdeaIds.map(getStartCreativeIdea).filter((idea) => idea !== undefined).map((idea) => `- ${idea.title}: ${getStartIdeaFeasibility(idea, state, assets, selection).label}`).join("\n") || "なし";
  const unresolved = state.renderComments.filter((comment) => !comment.resolved).length;

  return `# StaRt Extended Opening 第2修正依頼\n\n` +
    `このリポジトリをpullして最新mainから作業してください。V1は対象外です。既存Roughを壊さず、未解決コメントを優先して更新してください。\n\n` +
    `## 絶対条件\n- AUDIO_BLOCKED / MEDIA_BLOCKEDを人間確認なしで解除しない\n- 本人・家族・友人・犬をAI生成・変形しない\n- 解決済みコメントを再発させない\n- A/Bが未決定の区間をAI判断で確定しない\n\n` +
    `## 素材割り当て\n${assignmentLines}\n\n` +
    `## Creative Ideasの実現可否\n${selectedIdeaLines}\n\n` +
    `## A/B比較結果\n${comparisonLines}\n\n` +
    `## Renderレビューコメント（未解決 ${unresolved}件）\n${commentLines}\n\n` +
    `## 完了条件\n- 未解決コメントを反映\n- typecheck / contract check / buildを実行\n- 低解像度renderを更新\n- 反映済み・未反映・人間判断待ちを分けて日本語で報告`;
}

export function getDefaultComparison(sectionId: StartExtendedSectionId, selection: StartSelectionState): StartABComparison {
  const options = sectionRecipeOptions(sectionId);
  const selected = selection.recipeBySection[sectionId];
  const alternate = options.find((option) => option.id !== selected)?.id ?? selected;
  return {optionARecipeId: selected, optionBRecipeId: alternate, decision: "undecided", note: ""};
}

export function getComparisonRecipe(recipeId: string) {
  const recipe = getDirectorRecipeById(recipeId);
  return recipe ? {...recipe, avoid: recipe.avoidWhen} : undefined;
}

export function getSelectedIdeasWithFeasibility(state: StartProductionWorkspaceState, selection: StartSelectionState, assets: Asset[]) {
  return startCreativeIdeas
    .filter((idea) => selection.selectedCreativeIdeaIds.includes(idea.id))
    .map((idea) => ({idea, feasibility: getStartIdeaFeasibility(idea, state, assets, selection)}));
}
