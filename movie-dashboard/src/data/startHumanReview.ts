export type HumanReviewDecision = "favorite" | "maybe" | "reject";

export const HUMAN_REVIEW_STORAGE_KEY = "start-director-human-decisions-v1";

export function readHumanReviewDecisions(): Record<string, HumanReviewDecision> {
  try {
    const saved = window.localStorage.getItem(HUMAN_REVIEW_STORAGE_KEY);
    return saved ? JSON.parse(saved) as Record<string, HumanReviewDecision> : {};
  } catch {
    return {};
  }
}

export function writeHumanReviewDecisions(decisions: Record<string, HumanReviewDecision>) {
  try {
    window.localStorage.setItem(HUMAN_REVIEW_STORAGE_KEY, JSON.stringify(decisions));
  } catch {
    // Keep the in-memory UI usable when browser storage is unavailable or full.
  }
}
