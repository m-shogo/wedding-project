import type { VideoFailureCategoryId } from "./videoFailureTaxonomy";

export interface VideoReviewDraftEntry {
  checks: Record<string, boolean>;
  reason: string;
  failureCategoryId?: VideoFailureCategoryId;
  selectedResultAssetId: string;
  selectedResultAuthorityKey?: string;
  updatedAt: string;
}

export type VideoReviewDraftState = Record<string, VideoReviewDraftEntry>;

const STORAGE_KEY = "memory-flight:ai-video-review-drafts:v1";
let lastKnownState: VideoReviewDraftState = {};

function cloneVideoReviewDraftState(state: VideoReviewDraftState): VideoReviewDraftState {
  return Object.fromEntries(Object.entries(state).map(([promptId, draft]) => [
    promptId,
    {
      ...draft,
      checks: { ...(draft.checks ?? {}) },
    },
  ]));
}

export function resetReviewDraftEvidenceOnAuthorityChange(previous: VideoReviewDraftState, next: VideoReviewDraftState) {
  return Object.fromEntries(Object.entries(next).map(([promptId, draft]) => {
    const previousDraft = previous[promptId];
    if (!previousDraft) return [promptId, draft];

    const variantChanged = previousDraft.selectedResultAssetId !== draft.selectedResultAssetId;
    const authorityChanged = (previousDraft.selectedResultAuthorityKey ?? "") !== (draft.selectedResultAuthorityKey ?? "");
    if (!variantChanged && !authorityChanged) return [promptId, draft];

    return [promptId, {
      ...draft,
      checks: {},
      reason: "",
      failureCategoryId: undefined,
    }];
  })) as VideoReviewDraftState;
}

function replaceStateInPlace(target: VideoReviewDraftState, source: VideoReviewDraftState) {
  for (const promptId of Object.keys(target)) delete target[promptId];
  Object.assign(target, source);
}

export function loadVideoReviewDrafts(): VideoReviewDraftState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      lastKnownState = {};
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      lastKnownState = {};
      return {};
    }
    const loaded = parsed as VideoReviewDraftState;
    lastKnownState = cloneVideoReviewDraftState(loaded);
    return cloneVideoReviewDraftState(loaded);
  } catch {
    lastKnownState = {};
    return {};
  }
}

export function saveVideoReviewDrafts(state: VideoReviewDraftState) {
  const normalized = resetReviewDraftEvidenceOnAuthorityChange(lastKnownState, state);
  // VideoResultReview returns the same `state` object after calling this function.
  // Replace it in-place so a variant/media authority switch clears stale checks
  // immediately in the current React session as well as in localStorage.
  replaceStateInPlace(state, normalized);
  lastKnownState = cloneVideoReviewDraftState(normalized);

  try {
    const entries = Object.entries(normalized).filter(([, draft]) => {
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
    // even when storage is blocked, full or unavailable. The in-memory authority
    // transition guard above still protects the current review session.
  }
}

export function pruneVideoReviewDrafts(state: VideoReviewDraftState, activePromptIds: Set<string>) {
  return Object.fromEntries(Object.entries(state).filter(([promptId]) => activePromptIds.has(promptId)));
}
