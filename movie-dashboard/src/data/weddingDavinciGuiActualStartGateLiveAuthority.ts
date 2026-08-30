import {
  defaultWeddingDavinciGuiActualStartGateAudits,
  type WeddingDavinciGuiActualStartGateAudit,
  type WeddingMovieId,
} from "./weddingDavinciGuiActualStartGateAudit";

export type WeddingDavinciGuiActualStartGateAuditMap = Record<
  WeddingMovieId,
  WeddingDavinciGuiActualStartGateAudit
>;

let currentAudits: WeddingDavinciGuiActualStartGateAuditMap = {
  opening: defaultWeddingDavinciGuiActualStartGateAudits.opening,
  profile: defaultWeddingDavinciGuiActualStartGateAudits.profile,
};

const listeners = new Set<() => void>();

export function getWeddingDavinciGuiActualStartGateAuditSnapshot() {
  return currentAudits;
}

export function subscribeWeddingDavinciGuiActualStartGateAudit(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function publishWeddingDavinciGuiActualStartGateAudit(
  movieId: WeddingMovieId,
  audit: WeddingDavinciGuiActualStartGateAudit,
) {
  if (currentAudits[movieId] === audit) return;
  currentAudits = {...currentAudits, [movieId]: audit};
  for (const listener of listeners) listener();
}

export function resetWeddingDavinciGuiActualStartGateAuditAuthority() {
  currentAudits = {
    opening: defaultWeddingDavinciGuiActualStartGateAudits.opening,
    profile: defaultWeddingDavinciGuiActualStartGateAudits.profile,
  };
  for (const listener of listeners) listener();
}
