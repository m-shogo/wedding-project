import {
  weddingProductionRecoverySchema,
  type WeddingProductionRecovery,
} from './resolveHandoff.schema.ts';

// Fail-closed reference fixture for Wedding production handoff.
// This is deliberately NOT_RUN: a sidecar or command export is not evidence that Resolve GUI Actual occurred.
export const resolveWeddingProductionRecoveryPolicy: WeddingProductionRecovery =
  weddingProductionRecoverySchema.parse({
    authority: 'MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY',
    movieId: 'opening',
    productionReady: false,
    stage: 'assembly',
    artifactPath: 'out/opening/opening_v1.mp4',
    blockerCodes: ['PHOTO_MISSING', 'BGM_NOT_READY'],
    blockerActions: [
      {
        id: 'opening-media-intake',
        kind: 'ROUTE',
        label: 'Opening photo intake',
        purpose: 'Resolve the canonical Opening photo input lane before preview/final work.',
        route: '/opening-photo-intake',
      },
      {
        id: 'opening-prepare',
        kind: 'COMMAND',
        label: 'Prepare Opening V1',
        purpose: 'Re-run canonical assembly preflight after current intake receipts exist.',
        command: 'pnpm prepare:opening-v1',
      },
      {
        id: 'opening-human-review',
        kind: 'HUMAN',
        label: 'Human visual/audio review',
        purpose: 'Human review remains required after a current real-media render exists.',
      },
    ],
    canonicalRecovery: [
      'Complete canonical media/BGM intake and receipt verification.',
      'Re-render before Human QA when the source fingerprint changes.',
    ],
    bridge: {
      state: 'MAC_DAVINCI_ACTUAL_NOT_VERIFIED',
      palmierCurrent: true,
      davinciHandoffCurrent: true,
      macDaVinciActualVerified: false,
      finalDeliveryApproved: false,
      palmierContractVersion: 'fixture-palmier/v1',
      davinciContractVersion: 'fixture-davinci/v1',
    },
    actual: {
      state: 'NOT_RUN',
      evidencePath: 'out/qa/opening-v1-davinci-actual.json',
      commands: {
        init: 'pnpm opening:davinci-actual:init',
        status: 'pnpm opening:davinci-actual:status',
        strict: 'pnpm opening:davinci-actual:strict',
      },
    },
    guardrails: [
      'DAVINCI_RECOVERY_EXPORTED != RECOVERY_EXECUTED',
      'DAVINCI_ACTUAL_COMMAND_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
      'MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT',
    ],
  });
