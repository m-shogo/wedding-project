import {
  getWeddingProductionTypographyUses,
  weddingProductionTypographyUses,
  weddingTypographyElementIds,
} from '../src/data/weddingProductionTypographyElements.ts';
import {remotionElementCandidates} from '../../movie-dashboard/src/data/remotionElementCandidates.ts';

const allowed = new Set(weddingTypographyElementIds);
const motionZukanIds = new Set(remotionElementCandidates.map((candidate) => candidate.patternId));
const seenPairs = new Set<string>();

for (const id of weddingTypographyElementIds) {
  if (!motionZukanIds.has(id)) {
    throw new Error(`production typography id is not a Motion Zukan canonical candidate: ${id}`);
  }
}

for (const use of weddingProductionTypographyUses) {
  const pair = `${use.movieId}:${use.role}`;
  if (seenPairs.has(pair)) throw new Error(`duplicate production typography role: ${pair}`);
  seenPairs.add(pair);

  if (!allowed.has(use.primary)) throw new Error(`${pair}: unknown primary element ${use.primary}`);
  if (use.fallbacks.includes(use.primary)) throw new Error(`${pair}: primary repeated as fallback`);
  if (new Set(use.fallbacks).size !== use.fallbacks.length) throw new Error(`${pair}: duplicate fallback element`);
  for (const fallback of use.fallbacks) {
    if (!allowed.has(fallback)) throw new Error(`${pair}: unknown fallback element ${fallback}`);
  }
  if (use.studioActual !== 'NOT_RUN') throw new Error(`${pair}: Studio Actual must remain NOT_RUN until GUI evidence exists`);
  if (use.davinciActual !== 'NOT_RUN') throw new Error(`${pair}: DaVinci Actual must remain NOT_RUN until GUI evidence exists`);
}

for (const movieId of ['opening', 'profile'] as const) {
  const uses = getWeddingProductionTypographyUses(movieId);
  if (uses.length < 3) throw new Error(`${movieId}: expected at least three production typography roles`);
  const primaries = new Set(uses.map((use) => use.primary));
  if (primaries.size !== uses.length) throw new Error(`${movieId}: production roles must not mechanically reuse one primary Element`);
}

const covered = new Set(
  weddingProductionTypographyUses.flatMap((use) => [use.primary, ...use.fallbacks]),
);
const uncovered = weddingTypographyElementIds.filter((id) => !covered.has(id));
if (uncovered.length > 0) throw new Error(`typography Element candidates are not represented in production mapping: ${uncovered.join(', ')}`);

console.log(`Wedding production typography Element mapping: PASS (${weddingProductionTypographyUses.length} roles, ${covered.size} candidates covered, Motion Zukan IDs aligned)`);
