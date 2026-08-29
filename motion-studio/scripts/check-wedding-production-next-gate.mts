import {buildWeddingProductionNextGate, deriveProjectNextGate, classifyNextAction} from './wedding-production-next-gate.mts';

if (classifyNextAction('pnpm render:opening-v1:preview') !== 'COMMAND') throw new Error('pnpm command classification failed');
if (classifyNextAction('node --no-warnings scripts/intake-production-media.mts --project opening --source "/ABS/PATH/TO/opening-media"') !== 'INPUT_REQUIRED') throw new Error('placeholder input command must not be automation-safe');
if (classifyNextAction('Mac DaVinci Resolveで実Actualを実施') !== 'HUMAN') throw new Error('Human classification failed');

const opening = deriveProjectNextGate('opening', {
  schemaVersion: 'opening-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'PREVIEW_RENDER_REQUIRED',
  nextActions: ['pnpm render:opening-v1:preview', 'pnpm opening:production-status'], readiness: {productionReady: false},
  stages: {media: {state: 'PASS'}, previewRender: {state: 'MISSING', blockerCodes: ['OPENING_PREVIEW_MISSING']}},
});
if (opening.nextAutomationSafeCommand !== 'pnpm render:opening-v1:preview') throw new Error('machine-safe Opening next action missing');
if (opening.humanRequiredBeforeFurtherAutomation || opening.inputRequiredBeforeFurtherAutomation) throw new Error('machine-safe Opening action incorrectly marked blocked');

const inputBlocked = deriveProjectNextGate('opening', {
  schemaVersion: 'opening-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'MEDIA_REQUIRED',
  nextActions: [
    'node --no-warnings scripts/intake-production-media.mts --project opening --source "/ABS/PATH/TO/opening-media"',
    'node --no-warnings scripts/verify-production-media-intake-receipt.mts --project opening',
    'pnpm prepare:opening-v1',
  ],
  readiness: {productionReady: false}, stages: {media: {state: 'BLOCKED', blockerCodes: ['PHOTO_MISSING']}},
});
if (!inputBlocked.inputRequiredBeforeFurtherAutomation) throw new Error('external media input barrier not detected');
if (inputBlocked.nextAutomationSafeCommand !== null) throw new Error('commands after unresolved input barrier must not be automation-safe');
if (!inputBlocked.requiredInputCommandTemplate?.includes('/ABS/PATH/TO/opening-media')) throw new Error('required input command template missing');

const profile = deriveProjectNextGate('profile', {
  schemaVersion: 'profile-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'HUMAN_FINAL_RENDER_REVIEW_REQUIRED_OR_STALE',
  nextActions: ['current final renderに対するHuman reviewを完了', 'pnpm profile:final-render-review:strict'], readiness: {productionReady: false},
  stages: {finalRenderReview: {state: 'BLOCKED', blockerCodes: ['PROFILE_FINAL_REVIEW_REQUIRED']}},
});
if (profile.nextAutomationSafeCommand !== null) throw new Error('command after Human gate must not be automation-safe');
if (!profile.humanRequiredBeforeFurtherAutomation) throw new Error('Human-first Profile gate not detected');

const report = buildWeddingProductionNextGate({
  opening: {
    schemaVersion: 'opening-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'MEDIA_REQUIRED',
    nextActions: ['node --no-warnings scripts/intake-production-media.mts --project opening --source "/ABS/PATH/TO/opening-media"'], readiness: {productionReady: false}, stages: {},
  },
  profile: {
    schemaVersion: 'profile-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'ASSEMBLY_REQUIRED',
    nextActions: ['実素材17枠を投入', 'pnpm prepare:profile-v1'], readiness: {productionReady: false}, stages: {},
  },
});
if (report.selectedNextTarget?.movieId !== 'opening' || report.selectedNextTarget.kind !== 'INPUT_REQUIRED') throw new Error('input-required target should be explicit when no safe command precedes barriers');
if (report.projects.some((project) => project.evidenceBoundary.macDaVinciGuiActual !== 'NOT_RUN')) throw new Error('report promoted Mac DaVinci Actual');
if (report.projects.some((project) => project.evidenceBoundary.macRemotionStudioGuiActual !== 'NOT_RUN')) throw new Error('report promoted Studio Actual');
if (report.productionReady) throw new Error('synthetic incomplete projects must not be production ready');

console.log('Wedding production next-gate contracts OK: status schema validation, COMMAND/HUMAN/INPUT_REQUIRED boundary, barrier-prefix fail-close, input-aware target selection, and GUI Actual NOT_RUN boundary verified.');
