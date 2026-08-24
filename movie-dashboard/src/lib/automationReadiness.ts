import type { LearningEvidence, LearningSkill, LearningState } from "../types/learning";
import { getSkillState, learningStateOrder } from "./movieCoach";

export type AutomationReadinessStatus =
  | "human_only"
  | "needs_learning"
  | "needs_practice"
  | "needs_wedding_use"
  | "ready"
  | "automated";

export interface AutomationReadinessResult {
  status: AutomationReadinessStatus;
  state: LearningState;
  label: string;
  next: string;
}

const stateIndex = (state: LearningState) => learningStateOrder.indexOf(state);

export function getAutomationReadiness(
  skill: LearningSkill,
  evidence: LearningEvidence[],
): AutomationReadinessResult {
  const state = getSkillState(skill.skillId, evidence);

  if (state === "automated") {
    return { status: "automated", state, label: "自動化済み", next: "自動化結果をQAし、必要なら人間判断へ戻す" };
  }

  if (skill.automationPolicy === "never") {
    return { status: "human_only", state, label: "人間判断を残す", next: "AIは比較材料・QAだけ補助する" };
  }

  if (skill.automationPolicy === "safe_anytime") {
    return { status: "ready", state, label: "補助自動化OK", next: "技術作業を自動化し、結果Evidenceを残す" };
  }

  if (stateIndex(state) < stateIndex("learned")) {
    return { status: "needs_learning", state, label: "まず理解", next: "操作の意味と失敗時の影響を理解する" };
  }

  if (skill.automationPolicy === "after_practice") {
    if (stateIndex(state) < stateIndex("practiced")) {
      return { status: "needs_practice", state, label: "練習してから", next: "自分で一度操作し、結果を説明できるようにする" };
    }
    return { status: "ready", state, label: "自動化候補", next: "承認済み条件だけAI/Scriptへ渡す" };
  }

  if (stateIndex(state) < stateIndex("practiced")) {
    return { status: "needs_practice", state, label: "練習してから", next: "まず練習素材で操作する" };
  }
  if (stateIndex(state) < stateIndex("used_in_wedding")) {
    return { status: "needs_wedding_use", state, label: "Weddingで1回使う", next: "本番素材へ自分で適用し、判断基準を残す" };
  }

  return { status: "ready", state, label: "自動化候補", next: "A/BやReviewで承認済みの値だけ自動適用する" };
}

export function hasAutomatedEvidence(skillId: string, evidence: LearningEvidence[]) {
  return evidence.some((item) => item.skillId === skillId && item.state === "automated");
}

export function createAutomatedEvidence(skill: LearningSkill): LearningEvidence {
  return {
    evidenceId: `${skill.skillId}-automated-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    skillId: skill.skillId,
    state: "automated",
    outcomeId: null,
    createdAt: new Date().toISOString(),
    note: "Automation Readiness: automation implemented and reviewed",
  };
}
