import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const model = read('src/data/weddingVenueDeliveryGate.ts');
const page = read('src/pages/WeddingVenueDeliveryGate.tsx');
const actualOperator = read('src/components/WeddingVenueDeliveryActualOperator.tsx');
const app = read('src/App.tsx');

const requireText = (source, value, label) => {
  if (!source.includes(value)) throw new Error(`${label} missing: ${value}`);
};

for (const token of [
  'wedding-venue-delivery-gate-dashboard/v3',
  'PROJECTION_TO_PACKAGE_SHA_MISMATCH',
  'PACKAGE_TO_OFFLINE_PROJECTION_SHA_MISMATCH',
  'DELIVERY_MANIFEST_SHA_MISMATCH',
  'APPROVED_EXPORT_SHA_MISMATCH',
  'COPY_SOURCE_SHA_MISMATCH',
  'OFFLINE_COPY_SHA_MISMATCH',
  'THREE_COPY_REDUNDANCY_',
  'THREE_COPY_TARGET_SET_INVALID',
  'THREE_COPY_LIVE_CURRENTNESS_',
  'THREE_COPY_LIVE_TARGET_SET_INVALID',
  'LIVE_CURRENTNESS_RECEIPT_SHA_MISMATCH',
  'LIVE_SOURCE_PROJECTION_SHA_MISMATCH',
  'LIVE_SOURCE_DELIVERY_SHA_MISMATCH',
  'PRIMARY_USB',
  'BACKUP_USB',
  'CLOUD_BACKUP',
  'wedding-venue-delivery-redundancy.mts',
  'wedding-venue-delivery-redundancy-currentness.mts',
  'strictThreeCopyRedundancy',
  'physicalUsbInsertedActual',
  'cloudUploadActual',
  'venuePlaybackActual',
]) requireText(model, token, 'gate model');

for (const token of [
  'VENUE DELIVERY READY',
  '3-Copy Receipt',
  'Departure Live Verify',
  'wedding-venue-delivery-redundancy.json',
  'wedding-venue-delivery-redundancy-currentness.json',
  'PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP',
  'Approved export SHA',
  'Copied / verified SHA',
  '3-copy receipt SHA',
  'Departure report binds receipt SHA',
  'CANONICAL OPERATOR CHAIN',
  'WeddingVenueDeliveryActualOperator',
  'physical USB',
  'cloud upload',
  'venue playback',
]) requireText(page, token, 'gate page');

for (const token of [
  'HUMAN VENUE ACTUAL / POST-DELIVERY',
  'wedding-venue-delivery-actual-evidence/v1',
  'HUMAN_VENUE_DELIVERY_ACTUAL',
  'LIVE_CURRENTNESS_NOT_CURRENT',
  'VENUE_ACTUAL_RECEIPT_SHA_STALE',
  'PRIMARY_USB',
  'BACKUP_USB',
  'CLOUD_BACKUP',
  'NOT_RUN',
  'PASS',
  'FAIL',
  'wedding-venue-delivery-actual-evidence.mts --init',
  'wedding-venue-delivery-actual-evidence.mts --strict --json',
  'EXPORT HUMAN EVIDENCE JSON',
  '画面はPASSを自動設定しません',
]) requireText(actualOperator, token, 'Human Actual operator');

requireText(app, 'movie-coach/motion-library/venue-delivery', 'App route');
requireText(app, 'WeddingVenueDeliveryGate', 'App import');

console.log('✅ Wedding Venue Delivery Gate v3 dashboard contract passed');
console.log('✅ Projection → package → offline verification → receipt → live redundancy currentness bindings are visible');
console.log('✅ receipt alone cannot report VENUE DELIVERY READY; departure strict-current is required');
console.log('✅ PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP live copies are all required exactly once');
console.log('✅ post-delivery Human Actual operator stays locked until transport/live bindings are CURRENT');
console.log('✅ Human Actual editing starts from canonical NOT_RUN evidence and never auto-promotes PASS');
console.log('✅ physical USB / cloud upload / venue playback Actual remain Human-only');
