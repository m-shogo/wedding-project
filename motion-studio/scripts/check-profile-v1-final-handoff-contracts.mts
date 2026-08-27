import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const root = process.cwd();
const review = readFileSync(join(root, 'scripts/profile-v1-final-render-review.mts'), 'utf8');
const bundle = readFileSync(join(root, 'scripts/export-profile-v1-production-bundle.mts'), 'utf8');
const status = readFileSync(join(root, 'scripts/profile-v1-production-status.mts'), 'utf8');
const errors: string[] = [];
const need = (source: string, token: string, where: string) => { if (!source.includes(token)) errors.push(`${where} missing ${token}`); };
for (const token of ['HUMAN_FINAL_RENDER_REVIEW', 'profile-v1-final-render-review/v1', 'STALE_FINAL_RENDER', 'macDaVinciActual', 'productionReady: false', 'bgmRightsApprovalSha256', 'realMediaReviewSha256']) need(review, token, 'review');
for (const token of ['profile-v1-production-bundle/v1', 'FINAL_RENDER_BOUND_HANDOFF', 'profile-v1-final-render-review.mts', 'profileV1RuntimeMedia.slots', 'REFERENCE_TIMELINE_AND_FINAL_RENDER', "macActualState: 'NOT_RUN'", 'productionReady: false']) need(bundle, token, 'bundle');
for (const token of ['profile-v1-production-status/v1', 'FINAL_RENDER_REQUIRED', 'FINAL_RENDER_REVIEW_INIT_REQUIRED', 'PRODUCTION_BUNDLE_REQUIRED', 'AWAITING_DAVINCI_ACTUAL', "macDaVinciActual: 'NOT_RUN'", 'productionReady: false']) need(status, token, 'status');
for (const source of [review, bundle, status]) if (source.includes('productionReady: true')) errors.push('final handoff code must not fabricate productionReady=true');
if (errors.length) { console.error(`Profile V1 final handoff contracts FAILED (${errors.length})`); for (const e of errors) console.error(`- ${e}`); process.exit(1); }
console.log('Profile V1 final handoff contracts OK: Human final review and bundle are SHA-bound, status is fail-closed, Mac Actual/production remain separate.');
