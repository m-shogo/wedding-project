import { emptyBookManifest, learningSkills, productionOutcomes } from "../data/movieCoach";
import { profileLearningSkills, profileProductionOutcomes } from "../data/profileCoachLearning";
import type {
  CoachProgressState,
  LearningEvidence,
  LearningSkill,
  LearningState,
  ProductionOutcome,
} from "../types/learning";

export const MOVIE_COACH_STORAGE_KEY = "wedding-movie-coach-progress-v1";

export const allLearningSkills: LearningSkill[] = [
  ...learningSkills,
  ...profileLearningSkills,
];

export const allProductionOutcomes: ProductionOutcome[] = [
  ...productionOutcomes,
  ...profileProductionOutcomes,
];

export const learningStateOrder: LearningState[] = [
  "not_started",
  "learned",
  "practiced",
  "used_in_wedding",
  "comfortable",
  "automated",
];

export const learningStateLabel: Record<LearningState, string> = {
  not_started: "未着手",
  learned: "理解した",
  practiced: "練習した",
  used_in_wedding: "本番で使った",
  comfortable: "自力で使える",
  automated: "自動化済み",
};

export const defaultCoachProgress: CoachProgressState = {
  evidence: [],
  outcomeChecklist: {},
  book: emptyBookManifest,
};

export function loadCoachProgress(): CoachProgressState {
  if (typeof window === "undefined") return defaultCoachProgress;

  const raw = window.localStorage.getItem(MOVIE_COACH_STORAGE_KEY);
  if (!raw) return defaultCoachProgress;

  try {
    const parsed = JSON.parse(raw) as Partial<CoachProgressState>;
    return {
      evidence: Array.isArray(parsed.evidence) ? parsed.evidence : [],
      outcomeChecklist:
        parsed.outcomeChecklist && typeof parsed.outcomeChecklist === "object"
          ? parsed.outcomeChecklist
          : {},
      book: parsed.book
        ? {
            ...emptyBookManifest,
            ...parsed.book,
            chapters: Array.isArray(parsed.book.chapters) ? parsed.book.chapters : [],
          }
        : emptyBookManifest,
    };
  } catch {
    return defaultCoachProgress;
  }
}

export function saveCoachProgress(progress: CoachProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MOVIE_COACH_STORAGE_KEY, JSON.stringify(progress));
}

export function getSkill(skillId: string): LearningSkill | undefined {
  return allLearningSkills.find((skill) => skill.skillId === skillId);
}

export function getSkillState(
  skillId: string,
  evidence: LearningEvidence[],
): LearningState {
  let bestIndex = 0;
  const weddingOutcomes = new Set<string>();

  for (const item of evidence) {
    if (item.skillId !== skillId) continue;
    const index = learningStateOrder.indexOf(item.state);
    if (index > bestIndex) bestIndex = index;
    if (item.state === "used_in_wedding" && item.outcomeId) {
      weddingOutcomes.add(item.outcomeId);
    }
  }

  if (weddingOutcomes.size >= 2) {
    bestIndex = Math.max(bestIndex, learningStateOrder.indexOf("comfortable"));
  }

  return learningStateOrder[bestIndex] ?? "not_started";
}

export function hasEvidence(
  skillId: string,
  state: Exclude<LearningState, "not_started">,
  outcomeId: string,
  evidence: LearningEvidence[],
): boolean {
  return evidence.some(
    (item) =>
      item.skillId === skillId &&
      item.state === state &&
      item.outcomeId === outcomeId,
  );
}

export function hasEvidenceAtLeast(
  skillId: string,
  state: LearningState,
  evidence: LearningEvidence[],
): boolean {
  return learningStateOrder.indexOf(getSkillState(skillId, evidence)) >= learningStateOrder.indexOf(state);
}

export function getOutcomeCompletion(
  outcome: ProductionOutcome,
  checklistByOutcome: Record<string, string[]>,
): { done: number; total: number; percent: number; complete: boolean } {
  const checked = new Set(checklistByOutcome[outcome.outcomeId] ?? []);
  const total = outcome.checklist.length;
  const done = outcome.checklist.filter((item) => checked.has(item.itemId)).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return { done, total, percent, complete: total > 0 && done === total };
}

export function toggleOutcomeChecklistProgress(
  progress: CoachProgressState,
  outcome: ProductionOutcome,
  itemId: string,
): CoachProgressState {
  const currentItems = new Set(progress.outcomeChecklist[outcome.outcomeId] ?? []);
  if (currentItems.has(itemId)) currentItems.delete(itemId);
  else currentItems.add(itemId);

  const outcomeComplete = outcome.checklist.every((item) => currentItems.has(item.itemId));
  let evidence = progress.evidence;

  if (outcomeComplete) {
    const skillIds = [...outcome.conceptSkillIds, ...outcome.davinciSkillIds];
    const additions: LearningEvidence[] = skillIds
      .filter(
        (skillId) =>
          !hasEvidence(
            skillId,
            "used_in_wedding",
            outcome.outcomeId,
            progress.evidence,
          ),
      )
      .map((skillId) => ({
        evidenceId: `${skillId}-used_in_wedding-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        skillId,
        state: "used_in_wedding" as const,
        outcomeId: outcome.outcomeId,
        createdAt: new Date().toISOString(),
        note: `Outcome completion: ${outcome.title}`,
      }));
    evidence = [...progress.evidence, ...additions];
  }

  return {
    ...progress,
    evidence,
    outcomeChecklist: {
      ...progress.outcomeChecklist,
      [outcome.outcomeId]: Array.from(currentItems),
    },
  };
}

function skillGapScore(outcome: ProductionOutcome, evidence: LearningEvidence[]): number {
  const skillIds = [...outcome.conceptSkillIds, ...outcome.davinciSkillIds];
  const gaps = skillIds.filter((skillId) => {
    const state = getSkillState(skillId, evidence);
    return learningStateOrder.indexOf(state) < learningStateOrder.indexOf("used_in_wedding");
  }).length;

  return gaps * 4;
}

export function scoreOutcome(
  outcome: ProductionOutcome,
  progress: CoachProgressState,
): number {
  const completion = getOutcomeCompletion(outcome, progress.outcomeChecklist);
  if (completion.complete) return Number.NEGATIVE_INFINITY;

  const completionGap = 100 - completion.percent;
  const learningGap = skillGapScore(outcome, progress.evidence);
  const shortPracticeBonus = outcome.practiceMinutes <= 15 ? 10 : 0;

  return outcome.priority + completionGap * 0.4 + learningGap + shortPracticeBonus;
}

export function selectTodayOutcome(
  progress: CoachProgressState,
): ProductionOutcome | null {
  const ranked = allProductionOutcomes
    .map((outcome) => ({ outcome, score: scoreOutcome(outcome, progress) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.outcome ?? null;
}

export function getMovieCoachProgress(
  movieId: "opening" | "profile",
  progress: CoachProgressState,
): { done: number; total: number; percent: number } {
  const outcomes = allProductionOutcomes.filter((outcome) => outcome.movieId === movieId);
  const done = outcomes.filter(
    (outcome) => getOutcomeCompletion(outcome, progress.outcomeChecklist).complete,
  ).length;
  const total = outcomes.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return { done, total, percent };
}

export function getBookChapterForSkill(skillId: string, progress: CoachProgressState) {
  return progress.book.chapters.find((chapter) => chapter.skillIds.includes(skillId));
}
