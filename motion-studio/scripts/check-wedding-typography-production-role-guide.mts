import {
  weddingProductionTypographyUses,
  weddingTypographyElementIds,
} from '../src/data/weddingProductionTypographyElements.ts';
import {remotionElementCandidates} from '../../movie-dashboard/src/data/remotionElementCandidates.ts';
import {
  getWeddingTypographyProductionRoleGuide,
  weddingTypographyProductionRoleGuide,
} from '../../movie-dashboard/src/data/weddingTypographyProductionRoleGuide.generated.ts';

const canonicalIds = new Set(remotionElementCandidates.map((candidate) => candidate.patternId));
const sourceByKey = new Map(
  weddingProductionTypographyUses.map((item) => [`${item.movieId}:${item.role}`, item] as const),
);

if (weddingTypographyProductionRoleGuide.length !== weddingProductionTypographyUses.length) {
  throw new Error(
    `role guide count drift: ${weddingTypographyProductionRoleGuide.length} !== ${weddingProductionTypographyUses.length}`,
  );
}

for (const guide of weddingTypographyProductionRoleGuide) {
  const key = `${guide.movieId}:${guide.role}`;
  const source = sourceByKey.get(key);
  if (!source) throw new Error(`${key}: role guide has no production source`);

  if (guide.primaryPatternId !== source.primary) {
    throw new Error(`${key}: primary drift (${guide.primaryPatternId} !== ${source.primary})`);
  }
  if (guide.fallbackPatternIds.join('|') !== source.fallbacks.join('|')) {
    throw new Error(`${key}: fallback drift`);
  }
  if (guide.reason !== source.reason) {
    throw new Error(`${key}: production reason drift`);
  }
  if (guide.remotionStudioActual !== 'NOT_RUN' || guide.davinciResolveActual !== 'NOT_RUN') {
    throw new Error(`${key}: role guide must not synthesize GUI Actual evidence`);
  }

  for (const patternId of [guide.primaryPatternId, ...guide.fallbackPatternIds]) {
    if (!canonicalIds.has(patternId)) throw new Error(`${key}: unknown Motion Zukan canonical pattern ${patternId}`);
  }
}

for (const movieId of ['opening', 'profile'] as const) {
  const guide = getWeddingTypographyProductionRoleGuide(movieId);
  const source = weddingProductionTypographyUses.filter((item) => item.movieId === movieId);
  if (guide.length !== source.length) throw new Error(`${movieId}: filtered role guide count drift`);
  if (guide.length !== 3) throw new Error(`${movieId}: expected exactly three current production roles`);
}

const sourceIds = new Set(weddingTypographyElementIds);
for (const candidate of remotionElementCandidates) {
  if (sourceIds.has(candidate.patternId as (typeof weddingTypographyElementIds)[number])) continue;
  // Other Motion Zukan candidates are allowed; this guard only requires all production IDs to exist canonically.
}

console.log('Wedding Motion Zukan typography production role guide: PASS (6 roles, source parity + canonical IDs + NOT_RUN Actual)');
