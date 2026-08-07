import type { VideoFailureCategoryId } from "./videoFailureTaxonomy";

export interface VideoReviewDraftEntry {
  checks: Record<string, boolean>;
  reason: string;
  failureCategoryId?: VideoFailureCategoryId;
  selectedResultAssetId: string;
  updatedAt: string;
}

export type VideoReviewDraftState = Record<string, VideoReviewDraftEntry>;

const STORAGE_KEY = "memory-flight:ai-video-review-drafts:v1";

export function loadVideoReviewDrafts(): VideoReviewDraftState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as VideoReviewDraftState;
  } catch {
    return {};
  }
}

export function saveVideoReviewDrafts(state: VideoReviewDraftState) {
  try {
    const entries = Object.entries(state).filter(([, draft]) => {
      const hasChecks = Object.values(draft.checks ?? {}).some(Boolean);
      return hasChecks || Boolean(draft.reason?.trim()) || Boolean(draft.failureCategoryId) || Boolean(draft.selectedResultAssetId);
    });
    if (entries.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    // Review persistence is a convenience layer. Production data must keep working
    // even when storage is blocked, full or unavailable.
  }
}

export function pruneVideoReviewDrafts(state: VideoReviewDraftState, activePromptIds: Set<string>) {
  return Object.fromEntries(Object.entries(state).filter(([promptId]) => activePromptIds.has(promptId)));
}
