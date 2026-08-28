import {
  getWeddingProductionTypographyUses,
  type TypographyProductionUse,
  type WeddingMovieId,
  type WeddingTypographyElementId,
} from './weddingProductionTypographyElements.ts';

export const weddingTypographyHandoffContractVersion = 1 as const;

export type WeddingTypographyHandoffRole = {
  role: TypographyProductionUse['role'];
  primaryElementId: WeddingTypographyElementId;
  fallbackElementIds: readonly WeddingTypographyElementId[];
  productionReason: string;
  remotionStudioActual: 'NOT_RUN';
  davinciResolveActual: 'NOT_RUN';
};

export type WeddingTypographyProductionHandoff = {
  contract: 'wedding-production-typography';
  contractVersion: typeof weddingTypographyHandoffContractVersion;
  movieId: WeddingMovieId;
  producerSurface: 'PALMIER_TO_DAVINCI';
  selectionPolicy: 'PRIMARY_THEN_FALLBACK';
  evidencePolicy: 'FAIL_CLOSED_ACTUAL';
  roles: readonly WeddingTypographyHandoffRole[];
};

const toHandoffRole = (use: TypographyProductionUse): WeddingTypographyHandoffRole => ({
  role: use.role,
  primaryElementId: use.primary,
  fallbackElementIds: use.fallbacks,
  productionReason: use.reason,
  remotionStudioActual: use.studioActual,
  davinciResolveActual: use.davinciActual,
});

export function getWeddingTypographyProductionHandoff(
  movieId: WeddingMovieId,
): WeddingTypographyProductionHandoff {
  return {
    contract: 'wedding-production-typography',
    contractVersion: weddingTypographyHandoffContractVersion,
    movieId,
    producerSurface: 'PALMIER_TO_DAVINCI',
    selectionPolicy: 'PRIMARY_THEN_FALLBACK',
    evidencePolicy: 'FAIL_CLOSED_ACTUAL',
    roles: getWeddingProductionTypographyUses(movieId).map(toHandoffRole),
  };
}

export function formatWeddingTypographyProductionHandoff(
  movieId: WeddingMovieId,
): string {
  const handoff = getWeddingTypographyProductionHandoff(movieId);
  const lines = [
    `# ${movieId.toUpperCase()} Typography Production Handoff`,
    '',
    `Contract: ${handoff.contract}@v${handoff.contractVersion}`,
    `Surface: ${handoff.producerSurface}`,
    `Selection: ${handoff.selectionPolicy}`,
    `Evidence: ${handoff.evidencePolicy}`,
    '',
  ];

  for (const role of handoff.roles) {
    lines.push(
      `## ${role.role}`,
      `Primary: ${role.primaryElementId}`,
      `Fallbacks: ${role.fallbackElementIds.join(', ')}`,
      `Why: ${role.productionReason}`,
      `Remotion Studio Actual: ${role.remotionStudioActual}`,
      `DaVinci Resolve Actual: ${role.davinciResolveActual}`,
      '',
    );
  }

  return lines.join('\n').trimEnd() + '\n';
}
