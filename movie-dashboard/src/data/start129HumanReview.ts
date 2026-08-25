// StaRt 129秒 3案ショーケース用の人間レビュー記録(localStorage)。
// startHumanReview.ts(Director Recipe用)と同じ設計を、別storage keyで独立させる。

export type Start129ReviewDecision = "favorite" | "maybe" | "reject";

export const START_129_REVIEW_STORAGE_KEY = "start-129-showcase-human-decisions-v1";
export const START_129_COMMENT_STORAGE_KEY = "start-129-showcase-comments-v1";

export function readStart129ReviewDecisions(): Record<string, Start129ReviewDecision> {
  try {
    const saved = window.localStorage.getItem(START_129_REVIEW_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Record<string, Start129ReviewDecision>) : {};
  } catch {
    return {};
  }
}

export function writeStart129ReviewDecisions(decisions: Record<string, Start129ReviewDecision>) {
  try {
    window.localStorage.setItem(START_129_REVIEW_STORAGE_KEY, JSON.stringify(decisions));
  } catch {
    // Keep the in-memory UI usable when browser storage is unavailable or full.
  }
}

export type Start129Comment = {
  id: string;
  targetId: string;
  text: string;
  createdAt: string;
};

export function readStart129Comments(): Start129Comment[] {
  try {
    const saved = window.localStorage.getItem(START_129_COMMENT_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Start129Comment[]) : [];
  } catch {
    return [];
  }
}

export function writeStart129Comments(comments: Start129Comment[]) {
  try {
    window.localStorage.setItem(START_129_COMMENT_STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // ignore
  }
}
