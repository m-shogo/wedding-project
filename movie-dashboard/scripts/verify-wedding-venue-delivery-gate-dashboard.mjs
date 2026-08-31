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
  'PROJECTION_TO_PACKAGE_SHA_MISMATCH',
  'PACKAGE_TO_OFFLINE_PROJECTION_SHA_MISMATCH',
  'DELIVERY_MANIFEST_SHA_MISMATCH',
  'OPENING_APPROVED_EXPORT_SHA_MISMATCH',
  'PROFILE_APPROVED_EXPORT_SHA_MISMATCH',
  'OPENING_OFFLINE_COPY_SHA_MISMATCH',
  'PROFILE_OFFLINE_COPY_SHA_MISMATCH',
  'NOT_PROMOTED_BY_DASHBOARD_GATE',
]) requireText(model, token, 'gate model');

for (const token of [
  'VENUE DELIVERY READY',
  'wedding-projection-delivery-currentness.json',
  'DELIVERY-MANIFEST.json',
  'OFFLINE VERIFY',
  'Approved export SHA',
  'Copied / verified SHA',
  'wedding-venue-delivery-package.mts --write',
  'wedding-venue-delivery-package-verify.mts',
  'GUI Actual',
]) requireText(page, token, 'gate page');

requireText(app, 'movie-coach/motion-library/venue-delivery', 'App route');
requireText(app, 'WeddingVenueDeliveryGate', 'App import');

console.log('✅ Wedding Venue Delivery Gate dashboard contract passed');
console.log('✅ Projection → package → offline verification SHA bindings are visible');
console.log('✅ Opening/Profile approved export and copied SHA are visible');
console.log('✅ Canonical build/verify commands are exposed');
console.log('✅ GUI Actual remains NOT_PROMOTED');
