import {buildWeddingProductionNextGate, deriveProjectNextGate, classifyNextAction} from './wedding-production-next-gate.mts';

if (classifyNextAction('pnpm render:opening-v1:preview') !== 'COMMAND') throw new Error('pnpm command classification failed');
if (classifyNextAction('Mac DaVinci Resolveで実Actualを実施') !== 'HUMAN') throw new Error('Human classification failed');

const opening = deriveProjectNextGate('opening', {
  schemaVersion: 'opening-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'PREVIEW_RENDER_REQUIRED',
  nextActions: ['pnpm render:opening-v1:preview', 'pnpm opening:production-status'], readiness: {productionReady: false},
  stages: {media: {state: 'PASS'}, previewRender: {state: 'MISSING', blockerCodes: ['OPENING_PREVIEW_MISSING']}},
});
if (opening.nextAutomationSafeCommand !== 'pnpm render:opening-v1:preview') throw new Error('machine-safe Opening next action missing');
if (opening.humanRequiredBeforeFurtherAutomation) throw new Error('machine-safe Opening action incorrectly marked Human-first');

const profile = deriveProjectNextGate('profile', {
  schemaVersion: 'profile-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'HUMAN_FINAL_RENDER_REVIEW_REQUIRED_OR_STALE',
  nextActions: ['current final renderに対するHuman reviewを完了', 'pnpm profile:final-render-review:strict'], readiness: {productionReady: false},
  stages: {finalRenderReview: {state: 'BLOCKED', blockerCodes: ['PROFILE_FINAL_REVIEW_REQUIRED']}},
});
if (profile.nextAutomationSafeCommand !== null) throw new Error('command after Human gate must not be automation-safe');
if (!profile.humanRequiredBeforeFurtherAutomation) throw new Error('Human-first Profile gate not detected');

const report = buildWeddingProductionNextGate({
  opening: {
    schemaVersion: 'opening-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'PREVIEW_RENDER_REQUIRED',
    nextActions: ['pnpm render:opening-v1:preview'], readiness: {productionReady: false}, stages: {},
  },
  profile: {
    schemaVersion: 'profile-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState: 'ASSEMBLY_REQUIRED',
    nextActions: ['実素材17枠を投入', 'pnpm prepare:profile-v1'], readiness: {productionReady: false}, stages: {},
  },
});
if (report.selectedNextTarget?.movieId !== 'opening' || report.selectedNextTarget.kind !== 'COMMAND') throw new Error('safe executable target should outrank Human-blocked target');
if (report.projects.some((project) => project.evidenceBoundary.macDaVinciGuiActual !== 'NOT_RUN')) throw new Error('report promoted Mac DaVinci Actual');
if (report.projects.some((project) => project.evidenceBoundary.macRemotionStudioGuiActual !== 'NOT_RUN')) throw new Error('report promoted Studio Actual');
if (report.productionReady) throw new Error('synthetic incomplete projects must not be production ready');

console.log('Wedding production next-gate contracts OK: status schema validation, COMMAND/HUMAN boundary, Human-before-command fail-close, automation-safe target selection, and GUI Actual NOT_RUN boundary verified.');
