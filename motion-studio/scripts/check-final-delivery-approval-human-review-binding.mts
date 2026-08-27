import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const opening = readFileSync(join(root, 'scripts/opening-v1-final-delivery-approval.mts'), 'utf8');
const profile = readFileSync(join(root, 'scripts/profile-v1-final-delivery-approval.mts'), 'utf8');
const errors: string[] = [];

const requireToken = (source: string, token: string, label: string) => {
  if (!source.includes(token)) errors.push(`${label} missing ${token}`);
};

for (const [label, source, prefix, reviewPath, staleToken] of [
  ['opening', opening, 'FINAL_DELIVERY_', 'opening-v1-final-render-review.json', 'STALE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_SHA'],
  ['profile', profile, 'PROFILE_FINAL_DELIVERY_', 'profile-v1-final-render-review.json', 'STALE_PROFILE_FINAL_RENDER_REVIEW'],
] as const) {
  for (const token of [
    reviewPath,
    'HUMAN_FINAL_RENDER_REVIEW',
    'humanFinalRenderReview:{path:string;sha256:string}',
    "['--strict']",
    'review.overall',
    'review.reviewer',
    'finalRender.path',
    'finalRender.sha256',
    'productionReady:false',
  ]) requireToken(source.replaceAll(' ', ''), token.replaceAll(' ', ''), label);
  requireToken(source, staleToken, label);
  requireToken(source, `${prefix}FINAL_RENDER_REVIEW`, label);
  if (source.includes('productionReady:true')) errors.push(`${label} final approval source must not hardcode productionReady=true`);
}

if (!opening.includes("macDaVinciActual !== 'NOT_RUN'")) errors.push('opening must preserve final-render review separation from Mac Actual');
if (!profile.includes("macDaVinciActual!=='NOT_RUN'")) errors.push('profile must preserve final-render review separation from Mac Actual');
if (!opening.includes('approval.humanFinalRenderReview.sha256 !== current.finalRenderReviewSha256')) errors.push('opening approval must invalidate when Human final-render review bytes change');
if (!profile.includes('a.humanFinalRenderReview.sha256!==c.finalRenderReviewSha')) errors.push('profile approval must invalidate when Human final-render review bytes change');

if (errors.length) {
  console.error(`Final delivery approval Human-review binding contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Final delivery approval Human-review binding contracts OK: Opening/Profile approvals bind the current Human final-MP4 review path+SHA directly, re-run its strict verifier, preserve NOT_RUN Mac Actual separation upstream, and invalidate when the review artifact changes.');
