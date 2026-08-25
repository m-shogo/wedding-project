import { getDirectorRecipeById } from "./directorRecipeCatalog";
import type { HumanReviewDecision } from "./startHumanReview";
import { startExtendedAuthority, startExtendedSections, type StartExtendedSectionId } from "./startExtendedRhythmMap";
import { getSectionRecipeMapping } from "./startSectionRecipeMap";
export {startMotionFamilies, startStarterSectionPlan} from "./startSelectionPlan";
import {startMotionFamilies, startStarterSectionPlan, type StartMotionFamilyId} from "./startSelectionPlan";
export type {StartMotionFamilyId, StartMotionFamily, StartStarterSectionPlan} from "./startSelectionPlan";

export interface StartSelectionState {
  selectedFamilyIds: StartMotionFamilyId[];
  recipeBySection: Record<StartExtendedSectionId, string>;
  commentsBySection: Partial<Record<StartExtendedSectionId, string>>;
  globalComment: string;
  readiness: {
    photosInventoried: boolean;
    videosInventoried: boolean;
    heroChosen: boolean;
    clearedLocalAudio: boolean;
    waveformReviewed: boolean;
    markersConfirmed: boolean;
  };
}

export const START_SELECTION_STORAGE_KEY = "start-extended-selection-mode-v1";

export const defaultStartSelectionState: StartSelectionState = {
  selectedFamilyIds: startMotionFamilies.map((family) => family.id),
  recipeBySection: Object.fromEntries(startStarterSectionPlan.map((item) => [item.sectionId, item.recipeId])) as Record<StartExtendedSectionId, string>,
  commentsBySection: {},
  globalComment: "",
  readiness: {photosInventoried: false, videosInventoried: false, heroChosen: false, clearedLocalAudio: false, waveformReviewed: false, markersConfirmed: false},
};

export function sectionRecipeOptions(sectionId: StartExtendedSectionId) {
  const mapping = getSectionRecipeMapping(sectionId);
  if (!mapping) return [];
  return [...mapping.primaryRecipeIds, ...mapping.alternateRecipeIds]
    .map((id) => getDirectorRecipeById(id))
    .filter((recipe) => recipe !== undefined);
}

export function readStartSelectionState(): StartSelectionState {
  try {
    const saved = window.localStorage.getItem(START_SELECTION_STORAGE_KEY);
    if (!saved) return defaultStartSelectionState;
    const parsed = JSON.parse(saved) as Partial<StartSelectionState>;
    return {
      ...defaultStartSelectionState,
      ...parsed,
      recipeBySection: {...defaultStartSelectionState.recipeBySection, ...parsed.recipeBySection},
      commentsBySection: parsed.commentsBySection ?? {},
      readiness: {...defaultStartSelectionState.readiness, ...parsed.readiness},
    };
  } catch {
    return defaultStartSelectionState;
  }
}

export function getStartNextAction(state: StartSelectionState) {
  if (state.selectedFamilyIds.length < 4 || state.selectedFamilyIds.length > 8) return "STEP 1：Motion Familyを4〜8個にしてください";
  if (startExtendedSections.some((section) => !state.recipeBySection[section.id])) return "STEP 2：未選択のセクションを埋めてください";
  if (!state.readiness.photosInventoried || !state.readiness.heroChosen) return "STEP 3：写真を棚卸ししてHero写真を選んでください";
  if (!state.readiness.clearedLocalAudio || !state.readiness.waveformReviewed || !state.readiness.markersConfirmed) return "STEP 3：正規ローカル音源を確認し、波形とMarkerを固定してください";
  return "STEP 4：一括プロンプトをコピーしてCodexへ渡し、実素材版Roughを更新してください";
}

export function buildStartShortlistExport(state: StartSelectionState, decisions: Record<string, HumanReviewDecision>) {
  return {
    schemaVersion: 1,
    authority: {audio: startExtendedAuthority.audioState, timing: startExtendedAuthority.timingState, media: "MEDIA_BLOCKED"},
    selectedFamilies: state.selectedFamilyIds.map((id) => startMotionFamilies.find((family) => family.id === id)).filter(Boolean),
    sections: startExtendedSections.map((section) => ({
      id: section.id,
      label: section.label,
      referenceRange: `${section.referenceStartSec}-${section.referenceEndSec}s (仮)`,
      recipeId: state.recipeBySection[section.id],
      decision: decisions[state.recipeBySection[section.id]] ?? "unreviewed",
      comment: state.commentsBySection[section.id] ?? "",
    })),
    review: {
      favorites: Object.entries(decisions).filter(([, value]) => value === "favorite").map(([id]) => id),
      maybes: Object.entries(decisions).filter(([, value]) => value === "maybe").map(([id]) => id),
      rejects: Object.entries(decisions).filter(([, value]) => value === "reject").map(([id]) => id),
    },
    readiness: state.readiness,
    globalComment: state.globalComment,
  };
}

export function buildStartCodexPrompt(state: StartSelectionState, decisions: Record<string, HumanReviewDecision>) {
  const shortlist = buildStartShortlistExport(state, decisions);
  const sectionLines = shortlist.sections.map((section, index) =>
    `${index + 1}. ${section.label} (${section.referenceRange}) / ${section.recipeId} / human: ${section.decision}${section.comment ? ` / コメント: ${section.comment}` : ""}`,
  ).join("\n");
  const blockers = [
    !state.readiness.photosInventoried && "写真棚卸し未完了",
    !state.readiness.heroChosen && "Hero写真未選定",
    !state.readiness.clearedLocalAudio && "正規ローカル音源未確認",
    !state.readiness.waveformReviewed && "波形未確認",
    !state.readiness.markersConfirmed && "Marker未確定",
  ].filter(Boolean).join("、") || "なし";

  return `# StaRt Extended Opening 制作依頼\n\n` +
    `このリポジトリをpullして最新mainから作業してください。V1は今回の対象外です。\n` +
    `StartExtendedOpeningRoughV1を下記選定に合わせて更新し、初心者が次の操作を判断できるUIも維持してください。\n\n` +
    `## 絶対条件\n- 現在はAUDIO_BLOCKED / MEDIA_BLOCKEDです。仮秒数をFinal扱いしないでください。\n- 正規ローカル音源の波形・Marker確認前に音ハメを確定しないでください。\n- 本人・家族・友人・犬をAI生成または変形しないでください。実素材未投入部分は明示的なplaceholderにしてください。\n- Favorite / Maybe / Rejectは人間の判断です。AIがapprovedへ昇格させないでください。\n- 新しいCatalogを増やすより、この14セクションのRoughと実素材差し替えを優先してください。\n\n` +
    `## 選定Motion Family (${state.selectedFamilyIds.length})\n${state.selectedFamilyIds.map((id) => `- ${startMotionFamilies.find((family) => family.id === id)?.label ?? id}`).join("\n")}\n\n` +
    `## 14セクション選定\n${sectionLines}\n\n` +
    `## 全体コメント\n${state.globalComment || "なし"}\n\n` +
    `## 現在のブロッカー\n${blockers}\n\n` +
    `## 完了条件\n- 選定内容を壊さず実装\n- typecheck / contract check / buildを実行\n- StartExtendedOpeningRoughV1を低解像度でrenderし、映像尺とcompositionを確認\n- 完了・未完了・人間確認が必要な項目を分けて日本語で報告`;
}
