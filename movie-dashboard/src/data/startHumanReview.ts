export type HumanReviewDecision = "favorite" | "maybe" | "reject";

export const HUMAN_REVIEW_STORAGE_KEY = "start-director-human-decisions-v1";

// 映像Pinterest（外部実例図鑑）用の別枠。Director Recipe Catalogの選択とは
// 対象idの名前空間が異なるため、保存先も分けて混線を防ぐ。
export const EXTERNAL_MOTION_ATLAS_HUMAN_REVIEW_STORAGE_KEY = "external-motion-atlas-human-decisions-v1";

export function readHumanReviewDecisions(
  storageKey: string = HUMAN_REVIEW_STORAGE_KEY,
): Record<string, HumanReviewDecision> {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) as Record<string, HumanReviewDecision> : {};
  } catch {
    return {};
  }
}

export function writeHumanReviewDecisions(
  decisions: Record<string, HumanReviewDecision>,
  storageKey: string = HUMAN_REVIEW_STORAGE_KEY,
) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(decisions));
  } catch {
    // Keep the in-memory UI usable when browser storage is unavailable or full.
  }
}
