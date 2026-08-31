import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const dashboardRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const fail = (message) => { throw new Error(message); };

const sync = spawnSync(process.execPath, ['scripts/sync-wedding-final-delivery-evidence-manifest-readiness.mjs'], {cwd: dashboardRoot, encoding: 'utf8'});
if (sync.status !== 0) fail(sync.stderr || sync.stdout || 'Final evidence manifest dashboard sync failed');

const generatedSource = readFileSync(resolve(dashboardRoot, 'src/data/weddingFinalDeliveryEvidenceManifestReadiness.generated.ts'), 'utf8');
for (const token of [
  'wedding-final-delivery-evidence-manifest-dashboard/v1',
  'MOTION_STUDIO_DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST_READINESS',
  'wedding-final-delivery-evidence-manifest.mts --write',
  'wedding-final-delivery-evidence-manifest-currentness.mts --strict-current',
  'GENERATED_DASHBOARD_SNAPSHOT != LIVE_MAC_DAVINCI_GUI_ACTUAL',
  'CURRENT_REQUIRES_CANONICAL_CLI_STRICT_CURRENT',
  'HUMAN_FINAL_APPROVAL_NOT_PROMOTED_BY_DASHBOARD',
]) if (!generatedSource.includes(token)) fail(`Generated final evidence manifest readiness missing ${token}`);

const preflightSource = readFileSync(resolve(dashboardRoot, 'src/data/weddingDavinciFinalDeliveryPreflight.ts'), 'utf8');
for (const token of [
  'weddingFinalDeliveryEvidenceManifestReadiness',
  'FINAL_DELIVERY_EVIDENCE_MANIFEST_REQUIRED',
  'FINAL_DELIVERY_EVIDENCE_MANIFEST_STALE',
  'FINAL_DELIVERY_EVIDENCE_MANIFEST_INVALID',
  'FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS_INVALID',
  'snapshot.current && live.strictDeliveryEligible && finalEvidenceManifest.current',
  'WRITE_FINAL_DELIVERY_EVIDENCE_MANIFEST',
  'STRICT_FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS',
  'Final Evidence Manifest生成',
  'Final Evidence Manifest strict-current',
  'manifestSha256: finalEvidenceManifest.manifestSha256',
  'openingEvidenceChainSha256: finalEvidenceManifest.openingEvidenceChainSha256',
  'profileEvidenceChainSha256: finalEvidenceManifest.profileEvidenceChainSha256',
  'FINAL_EVIDENCE_MANIFEST_CURRENT_REQUIRED_BEFORE_FINAL_DELIVERY_READY',
  'FINAL_EVIDENCE_MANIFEST_CURRENT != LIVE_MAC_DAVINCI_GUI_ACTUAL',
]) if (!preflightSource.includes(token)) fail(`Final delivery preflight missing manifest gate token ${token}`);

const readinessCardSource = readFileSync(resolve(dashboardRoot, 'src/components/WeddingDavinciDeliveryReadinessCard.tsx'), 'utf8');
for (const token of ['CURRENT BLOCKERS','preflight.blockerCodes.map','preflight.commands.map']) {
  if (!readinessCardSource.includes(token)) fail(`Existing Motion Zukan readiness card does not expose preflight ${token}`);
}

const zukanSource = readFileSync(resolve(dashboardRoot, 'src/pages/VisualMotionLibrary.tsx'), 'utf8');
if (!zukanSource.includes('WeddingDavinciDeliveryReadinessCard')) fail('Motion Zukan must mount Wedding DaVinci final delivery readiness card');

const build = spawnSync('pnpm', ['run', 'build'], {cwd: dashboardRoot, encoding: 'utf8'});
if (build.status !== 0) fail(build.stderr || build.stdout || 'Movie Dashboard build failed');

console.log('Wedding final evidence manifest Dashboard gate OK: Motion Zukan final preflight exposes NOT_RUN/STALE blocker codes and canonical write/strict-current commands; final eligibility requires CURRENT manifest; GUI Actual/Human approval not promoted');
