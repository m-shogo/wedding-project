import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const opening = readFileSync(join(root, 'scripts/opening-v1-final-delivery-approval.mts'), 'utf8');
const profile = readFileSync(join(root, 'scripts/profile-v1-final-delivery-approval.mts'), 'utf8');
const errors: string[] = [];
const requireToken = (source: string, token: string, label: string) => {
  if (!source.includes(token)) errors.push(`${label} missing ${token}`);
};

for (const [label, source, reviewPath, staleToken] of [
  ['opening', opening, 'opening-v1-final-render-review.json', 'STALE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_SHA'],
  ['profile', profile, 'profile-v1-final-render-review.json', 'STALE_PROFILE_FINAL_RENDER_REVIEW'],
] as const) {
  for (const token of [
    reviewPath,
    'HUMAN_FINAL_RENDER_REVIEW',
    'humanFinalRenderReview',
    "['--strict']",
    'review.overall',
    'review.reviewer',
    'finalRender.path',
    'finalRender.sha256',
    'productionReady:false',
  ]) requireToken(source.replaceAll(' ', ''), token.replaceAll(' ', ''), label);
  requireToken(source, staleToken, label);
  if (source.includes('productionReady:true')) errors.push(`${label} final approval source must not hardcode productionReady=true`);
}

if (!opening.includes("macDaVinciActual !== 'NOT_RUN'")) errors.push('opening must preserve final-render review separation from Mac Actual');
if (!profile.includes("macDaVinciActual!=='NOT_RUN'")) errors.push('profile must preserve final-render review separation from Mac Actual');
if (!opening.includes('approval.humanFinalRenderReview.sha256 !== current.finalRenderReviewSha256')) errors.push('opening approval must invalidate when Human final-render review bytes change');
if (!profile.includes('a.humanFinalRenderReview.sha256!==c.finalRenderReviewSha')) errors.push('profile approval must invalidate when Human final-render review bytes change');
if (!opening.includes('finalReview.finalRender.path !== bundle.finalRender.path') || !opening.includes('finalReview.finalRender.sha256 !== bundle.finalRender.sha256')) errors.push('opening must bind Human final review to bundle final render');
if (!profile.includes('finalReview.finalRender.path!==bundle.finalRender.path') || !profile.includes('finalReview.finalRender.sha256!==bundle.finalRender.sha256')) errors.push('profile must bind Human final review to bundle final render');

if (errors.length) {
  console.error(`Final delivery approval Human-review binding contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Final delivery approval Human-review binding contracts OK: Opening/Profile approvals bind current Human final-MP4 review path+SHA directly and invalidate on review or render drift.');
