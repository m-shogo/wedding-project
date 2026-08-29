import {buildWeddingProductionInputPlan} from './wedding-production-input-plan.mts';

const opening = buildWeddingProductionInputPlan({
  movieId: 'opening',
  mediaSource: '/Users/example/Wedding/Opening/Selected',
  bgmSource: '/Users/example/Wedding/Music/start.m4a',
});
if (opening.schemaVersion !== 'wedding-production-input-plan/v1') throw new Error('schema mismatch');
if (opening.executionState !== 'NOT_RUN') throw new Error('plan must never claim execution');
if (opening.commands.length !== 7) throw new Error(`Opening command count mismatch: ${opening.commands.length}`);
if (!opening.commands[0]?.includes('--project opening')) throw new Error('Opening media intake command missing');
if (!opening.commands[4]?.includes('intake-production-bgm.mts')) throw new Error('Opening BGM intake command missing');
if (opening.evidenceBoundary.remotionStudioGuiActual !== 'NOT_RUN') throw new Error('Studio Actual fabricated');
if (opening.evidenceBoundary.macDaVinciGuiActual !== 'NOT_RUN') throw new Error('DaVinci Actual fabricated');
if (opening.evidenceBoundary.finalDeliveryApproved !== false) throw new Error('Final approval fabricated');

const profile = buildWeddingProductionInputPlan({
  movieId: 'profile',
  mediaSource: '/Users/example/Wedding/Profile/Selected',
});
if (profile.commands.length !== 4) throw new Error(`Profile no-BGM command count mismatch: ${profile.commands.length}`);
if (!profile.commands.at(-1)?.includes('prepare:profile-v1')) throw new Error('Profile prepare command missing');

for (const invalid of [
  {movieId: 'opening' as const, mediaSource: 'relative/path'},
  {movieId: 'opening' as const, mediaSource: '/ABS/PATH/TO/opening-media'},
  {movieId: 'profile' as const, mediaSource: '<PROFILE_MEDIA>'},
]) {
  let rejected = false;
  try { buildWeddingProductionInputPlan(invalid); }
  catch { rejected = true; }
  if (!rejected) throw new Error(`Invalid input path was accepted: ${invalid.mediaSource}`);
}

console.log('Wedding production input plan contracts OK: absolute user paths become ordered dry-run/apply/verify/prepare commands, placeholder/relative paths fail closed, and GUI Actual remains NOT_RUN.');
