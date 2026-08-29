import {
  formatWeddingTypographyProductionHandoff,
  getWeddingTypographyProductionHandoff,
  weddingTypographyHandoffContractVersion,
} from '../src/data/weddingProductionTypographyHandoff.ts';
import {
  getWeddingProductionTypographyUses,
  type WeddingMovieId,
} from '../src/data/weddingProductionTypographyElements.ts';

const movieIds: readonly WeddingMovieId[] = ['opening', 'profile'];

for (const movieId of movieIds) {
  const source = getWeddingProductionTypographyUses(movieId);
  const handoff = getWeddingTypographyProductionHandoff(movieId);

  if (handoff.contract !== 'wedding-production-typography') {
    throw new Error(`${movieId}: unexpected contract ${handoff.contract}`);
  }
  if (handoff.contractVersion !== weddingTypographyHandoffContractVersion) {
    throw new Error(`${movieId}: contract version drift`);
  }
  if (handoff.producerSurface !== 'PALMIER_TO_DAVINCI') {
    throw new Error(`${movieId}: handoff must target PALMIER_TO_DAVINCI`);
  }
  if (handoff.selectionPolicy !== 'PRIMARY_THEN_FALLBACK') {
    throw new Error(`${movieId}: production selection must remain primary-first`);
  }
  if (handoff.evidencePolicy !== 'FAIL_CLOSED_ACTUAL') {
    throw new Error(`${movieId}: Actual evidence policy must fail closed`);
  }
  if (handoff.roles.length !== source.length) {
    throw new Error(`${movieId}: handoff role count drift (${handoff.roles.length} !== ${source.length})`);
  }

  const markdown = formatWeddingTypographyProductionHandoff(movieId);
  for (const [index, role] of handoff.roles.entries()) {
    const sourceRole = source[index];
    if (!sourceRole || role.role !== sourceRole.role) {
      throw new Error(`${movieId}: role ordering drift at index ${index}`);
    }
    if (role.primaryElementId !== sourceRole.primary) {
      throw new Error(`${movieId}:${role.role}: primary Element drift`);
    }
    if (role.fallbackElementIds.join('|') !== sourceRole.fallbacks.join('|')) {
      throw new Error(`${movieId}:${role.role}: fallback Element drift`);
    }
    if (role.remotionStudioActual !== 'NOT_RUN' || role.davinciResolveActual !== 'NOT_RUN') {
      throw new Error(`${movieId}:${role.role}: GUI Actual must remain NOT_RUN without real evidence`);
    }
    if (!markdown.includes(`## ${role.role}`)) {
      throw new Error(`${movieId}:${role.role}: formatted handoff missing role heading`);
    }
    if (!markdown.includes(`Primary: ${role.primaryElementId}`)) {
      throw new Error(`${movieId}:${role.role}: formatted handoff missing primary Element`);
    }
  }

  const serialized = JSON.stringify(handoff);
  const parsed = JSON.parse(serialized) as typeof handoff;
  if (parsed.roles.length !== handoff.roles.length) {
    throw new Error(`${movieId}: handoff is not serialization-stable`);
  }
}

console.log('Wedding production typography Palmier→DaVinci handoff: PASS (2 movie contracts)');
