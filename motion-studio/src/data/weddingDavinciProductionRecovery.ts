import {
  weddingProductionRecoverySchema,
  type WeddingProductionRecovery,
} from './resolveHandoff.schema.ts';

export type WeddingMovieId = 'opening' | 'profile';

const config = {
  opening: {
    artifactPath: 'out/opening/opening_v1.mp4',
    palmierContractVersion: 'opening-v1-palmier-handoff/v2',
    davinciContractVersion: 'opening-v1-davinci-handoff/v1',
    evidencePath: 'out/qa/opening-v1-davinci-finishing-evidence.json',
    commands: {
      init: 'pnpm opening:davinci-finishing:init',
      status: 'pnpm opening:davinci-finishing',
      strict: 'pnpm opening:davinci-finishing:strict',
    },
  },
  profile: {
    artifactPath: 'out/profile/profile_v1.mp4',
    palmierContractVersion: 'profile-v1-palmier-handoff/v1',
    davinciContractVersion: 'profile-v1-davinci-handoff/v1',
    evidencePath: 'out/qa/profile-v1-davinci-finishing-evidence.json',
    commands: {
      init: 'pnpm profile:davinci-finishing:init',
      status: 'pnpm profile:davinci-finishing',
      strict: 'pnpm profile:davinci-finishing:strict',
    },
  },
} as const;

export function buildWeddingDavinciProductionRecovery(movieId: WeddingMovieId): WeddingProductionRecovery {
  const movie = config[movieId];
  return weddingProductionRecoverySchema.parse({
    authority: 'MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY',
    movieId,
    productionReady: false,
    stage: 'davinciFinishing',
    artifactPath: movie.artifactPath,
    blockerCodes: ['MAC_DAVINCI_ACTUAL_NOT_VERIFIED'],
    blockerActions: [
      {
        id: `${movieId}-davinci-actual-init`,
        kind: 'COMMAND',
        label: 'Initialize Mac DaVinci Actual evidence',
        purpose: 'Create the evidence template only; this does not verify Resolve GUI Actual.',
        command: movie.commands.init,
      },
      {
        id: `${movieId}-davinci-actual-status`,
        kind: 'COMMAND',
        label: 'Inspect Mac DaVinci Actual evidence',
        purpose: 'Read current evidence without promoting it.',
        command: movie.commands.status,
      },
      {
        id: `${movieId}-davinci-actual-strict`,
        kind: 'COMMAND',
        label: 'Strictly verify Mac DaVinci Actual',
        purpose: 'Pass only after real Resolve GUI checks/export are recorded in current evidence.',
        command: movie.commands.strict,
      },
      {
        id: `${movieId}-davinci-human-actual`,
        kind: 'HUMAN',
        label: 'Perform Resolve GUI finishing and playback/export QA',
        purpose: 'A Human must perform the actual Resolve checks; CI/export cannot substitute for this evidence.',
      },
    ],
    canonicalRecovery: [
      `Run ${movie.commands.init} only to initialize the evidence template.`,
      'Perform the required finishing, playback, watched-with-sound, and export validation in the real Mac DaVinci Resolve GUI.',
      `Record current evidence at ${movie.evidencePath}, then run ${movie.commands.strict}.`,
      'Only after Mac DaVinci Actual is verified may final delivery approval be performed.',
    ],
    bridge: {
      state: 'MAC_DAVINCI_ACTUAL_NOT_VERIFIED',
      palmierCurrent: true,
      davinciHandoffCurrent: true,
      macDaVinciActualVerified: false,
      finalDeliveryApproved: false,
      palmierContractVersion: movie.palmierContractVersion,
      davinciContractVersion: movie.davinciContractVersion,
    },
    actual: {
      state: 'NOT_RUN',
      evidencePath: movie.evidencePath,
      commands: {...movie.commands},
    },
    guardrails: [
      'PRODUCTION_BUNDLE_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
      'DAVINCI_RECOVERY_EXPORTED != RECOVERY_EXECUTED',
      'DAVINCI_ACTUAL_EVIDENCE_TEMPLATE != MAC_DAVINCI_ACTUAL_VERIFIED',
      'MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT',
      'MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
    ],
  });
}
