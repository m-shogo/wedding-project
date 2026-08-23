import type { LearningSkill, ProductionOutcome } from "../types/learning";
import { profileCoachPhases } from "./profileCoachRoadmap";

export const profileLearningSkills: LearningSkill[] = [
  {
    skillId: "concept-narrative-arc",
    kind: "concept",
    category: "Story",
    label: "Narrative Arc / 物語の流れ",
    summary: "sceneを年代順に並べるだけでなく、導入・変化・転換・感情の山・余韻として役割を持たせる。",
    whyItMatters: "4〜6分のProfile Movieを写真一覧ではなく、ゲストが追える1本のStoryにするため。",
    prerequisiteIds: ["concept-continuity"],
    automationPolicy: "never",
  },
  {
    skillId: "concept-longform-pacing",
    kind: "concept",
    category: "Editing",
    label: "Long-form Pacing / 長尺の緩急",
    summary: "数秒のcutだけでなく、30秒単位の章と4〜6分全体で速い・遅い・休む時間を設計する。",
    whyItMatters: "全sceneが同じテンポだと長尺では単調になり、Effect追加では根本解決しないため。",
    prerequisiteIds: ["concept-rhythm"],
    automationPolicy: "never",
  },
  {
    skillId: "concept-photo-sequencing",
    kind: "concept",
    category: "Story",
    label: "Photo Sequencing / 写真の順番",
    summary: "年代だけでなく、表情・人物数・距離・出来事・情報量の差を使って写真同士に前後関係を作る。",
    whyItMatters: "同じような集合写真や説明的な写真が連続するのを避け、人柄と変化を自然に見せるため。",
    prerequisiteIds: ["concept-framing", "concept-rhythm"],
    automationPolicy: "never",
  },
  {
    skillId: "concept-caption-economy",
    kind: "concept",
    category: "Typography",
    label: "Caption Economy / 書きすぎない",
    summary: "写真から分かることを文章で繰り返さず、写真だけでは伝わらない情報だけを短く足す。",
    whyItMatters: "ゲストが写真と文字を同時に読む負荷を減らし、写真を主役に保つため。",
    prerequisiteIds: ["concept-typography"],
    automationPolicy: "never",
  },
  {
    skillId: "concept-emotion-curve",
    kind: "concept",
    category: "Story",
    label: "Emotion Curve / 感情の山",
    summary: "強い写真やBGMの山を全部同時に使わず、前後の静けさとの対比で感情のピークを作る。",
    whyItMatters: "旅行写真やサビを派手に連打せず、ふたりらしい瞬間を一番強く見せるため。",
    prerequisiteIds: ["concept-rhythm", "concept-narrative-arc"],
    automationPolicy: "never",
  },
];

export const profileProductionOutcomes: ProductionOutcome[] = profileCoachPhases.map((phase, index) => ({
  outcomeId: phase.phaseId,
  movieId: "profile",
  title: phase.productionOutcome,
  shortLabel: phase.title.split(" / ")[0],
  durationSec: null,
  productionRef: `movie-dashboard/src/data/profileCoachRoadmap.ts#${phase.phaseId}`,
  authorityLabel: "Profile Coach Roadmap / existing profile scenes",
  priority: phase.priority,
  practiceMinutes: phase.practiceMinutes,
  conceptSkillIds: phase.conceptSkillIds,
  davinciSkillIds: phase.davinciSkillIds,
  recipeIds: phase.recipeIds,
  prerequisiteOutcomeIds:
    index === 0
      ? ["profile-photo-selection"]
      : [profileCoachPhases[index - 1].phaseId],
  checklist: phase.done.map((label, checklistIndex) => ({
    itemId: `done-${checklistIndex + 1}`,
    label,
  })),
  whyToday: phase.why,
}));
