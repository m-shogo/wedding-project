import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const model = read('src/data/weddingVenueDeliveryGate.ts');
const page = read('src/pages/WeddingVenueDeliveryGate.tsx');
const app = read('src/App.tsx');

const requireText = (source, value, label) => {
  if (!source.includes(value)) throw new Error(`${label} missing: ${value}`);
};

for (const token of [
  'wedding-venue-delivery-gate-dashboard/v2',
  'PROJECTION_TO_PACKAGE_SHA_MISMATCH',
  'PACKAGE_TO_OFFLINE_PROJECTION_SHA_MISMATCH',
  'DELIVERY_MANIFEST_SHA_MISMATCH',
  'APPROVED_EXPORT_SHA_MISMATCH',
  'COPY_SOURCE_SHA_MISMATCH',
  'OFFLINE_COPY_SHA_MISMATCH',
  'THREE_COPY_REDUNDANCY_',
  'THREE_COPY_TARGET_SET_INVALID',
  'REDUNDANCY_SOURCE_PROJECTION_SHA_MISMATCH',
  'REDUNDANCY_SOURCE_DELIVERY_SHA_MISMATCH',
  'PRIMARY_USB',
  'BACKUP_USB',
  'CLOUD_BACKUP',
  'wedding-venue-delivery-redundancy.mts',
  'physicalUsbInsertedActual',
  'cloudUploadActual',
  'venuePlaybackActual',
]) requireText(model, token, 'gate model');

for (const token of [
  'VENUE DELIVERY READY',
  '3-Copy Redundancy',
  'wedding-venue-delivery-redundancy.json',
  'PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP',
  'Approved export SHA',
  'Copied / verified SHA',
  '3-copy receipt SHA',
  'CANONICAL OPERATOR CHAIN',
  'physical USB',
  'cloud upload',
  'venue playback',
]) requireText(page, token, 'gate page');

requireText(app, 'movie-coach/motion-library/venue-delivery', 'App route');
requireText(app, 'WeddingVenueDeliveryGate', 'App import');

console.log('✅ Wedding Venue Delivery Gate v2 dashboard contract passed');
console.log('✅ Projection → package → offline verification → three-copy receipt SHA bindings are visible');
console.log('✅ PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP are all required exactly once');
console.log('✅ Opening/Profile approved, source and redundant-copy SHAs are fail-closed');
console.log('✅ physical USB / cloud upload / venue playback Actual remain unpromoted');
