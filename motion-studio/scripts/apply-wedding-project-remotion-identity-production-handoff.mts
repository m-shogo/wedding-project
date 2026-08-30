import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {basename, dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {resolveHandoffSidecarSchema} from '../src/data/resolveHandoff.schema.ts';
import {resolve21AlphaHandoffPolicy} from '../src/data/resolveHandoffPolicy.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(root, '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/apply-wedding-project-remotion-identity-production-handoff.mts --movie=opening|profile');
  process.exit(1);
}
const movieId = movieArg;
const outDir = join(root, 'out/handoff', movieId === 'opening' ? 'opening-v1' : 'profile-v1');
const config = {
  batch: join(repoRoot, `movie-dashboard/out/typography-project-delivery/${movieId}-typography-production-batch.json`),
  manifest: join(repoRoot, `movie-dashboard/out/project-role-handoff/${movieId}-production-role-handoff-manifest.json`),
  receipt: join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`),
  bundle: join(outDir, `${movieId}-v1-production-bundle.json`),
  projectMotionSidecar: join(outDir, `${movieId}-v1-resolve-project-motion-handoff.json`),
  resolveIdentitySidecar: join(outDir, `${movieId}-v1-resolve-remotion-identity-handoff.json`),
  recovery: join(outDir, `${movieId}-v1-davinci-production-recovery.json`),
};
const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const block = (code: string): never => {
  console.error(`BLOCK / ${code}`);
  console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
  console.error('Mac DaVinci Actual remains NOT_RUN.');
  process.exit(2);
};
const run = (script: string, args: string[]) => spawnSync(
  process.execPath,
  ['--no-warnings', script, ...args],
  {cwd: root, encoding: 'utf8', stdio: 'pipe'},
);
const forward = (result: ReturnType<typeof run>) => {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
};

const applicability = {
  batch: existsSync(config.batch),
  manifest: existsSync(config.manifest),
  receipt: existsSync(config.receipt),
};
const anyProjectIdentityArtifact = Object.values(applicability).some(Boolean);
if (!anyProjectIdentityArtifact) {
  console.log('projectRemotionIdentityProductionHandoff=NOT_APPLICABLE');
  console.log(`movieId=${movieId}`);
  console.log('reason=no-project-typography-batch-manifest-or-receipt');
  console.log('remotionStudioGuiActual=NOT_RUN');
  console.log('macDaVinciActual=NOT_RUN');
  console.log('productionReady=NO');
  process.exit(0);
}
if (!applicability.batch) block('PROJECT_REMOTION_IDENTITY_SOURCE_BATCH_MISSING');
if (!applicability.manifest) block('PROJECT_REMOTION_IDENTITY_ROLE_HANDOFF_MANIFEST_MISSING');
if (!applicability.receipt) block('PROJECT_REMOTION_IDENTITY_RECEIPT_MISSING');
if (!existsSync(config.bundle)) block('PROJECT_REMOTION_IDENTITY_PRODUCTION_BUNDLE_MISSING');
if (!existsSync(config.recovery)) block('PROJECT_REMOTION_IDENTITY_DAVINCI_RECOVERY_MISSING');

const verify = run('scripts/verify-wedding-project-remotion-identity-handoff.mts', [
  `--movie=${movieId}`,
  `--manifest=${config.manifest}`,
  `--receipt=${config.receipt}`,
]);
forward(verify);
if (verify.status !== 0) block('PROJECT_REMOTION_IDENTITY_PRE_HANDOFF_VERIFICATION_FAILED');

let baseline: any;
if (existsSync(config.projectMotionSidecar)) {
  try {
    baseline = JSON.parse(readFileSync(config.projectMotionSidecar, 'utf8'));
  } catch {
    block('PROJECT_REMOTION_IDENTITY_PROJECT_MOTION_SIDECAR_INVALID_JSON');
  }
} else {
  let bundle: any;
  try {
    bundle = JSON.parse(readFileSync(config.bundle, 'utf8'));
  } catch {
    block('PROJECT_REMOTION_IDENTITY_PRODUCTION_BUNDLE_INVALID_JSON');
  }
  const handoffAsset = bundle?.davinci?.handoffAsset;
  if (typeof handoffAsset !== 'string' || handoffAsset.length === 0) block('PROJECT_REMOTION_IDENTITY_DAVINCI_HANDOFF_ASSET_MISSING');
  const handoffAssetPath = join(root, handoffAsset);
  if (!existsSync(handoffAssetPath)) block('PROJECT_REMOTION_IDENTITY_DAVINCI_HANDOFF_ASSET_FILE_MISSING');
  const actualAssetSha = sha256(readFileSync(handoffAssetPath));
  if (bundle?.davinci?.expectedSha256 !== actualAssetSha) block('PROJECT_REMOTION_IDENTITY_DAVINCI_HANDOFF_ASSET_SHA_STALE');
  if (bundle?.davinci?.macActualState !== 'NOT_RUN' || bundle?.davinci?.productionReady !== false) {
    block('PROJECT_REMOTION_IDENTITY_DAVINCI_EVIDENCE_BOUNDARY_INVALID');
  }
  baseline = resolveHandoffSidecarSchema.parse({
    ...resolve21AlphaHandoffPolicy,
    artifactId: `${movieId}-v1-final-render-remotion-identity-handoff`,
    generatedAt: new Date().toISOString(),
    source: {
      ...resolve21AlphaHandoffPolicy.source,
      projectRef: `wedding-${movieId}-v1`,
      compositionOrTimeline: `${movieId}-v1-production-handoff`,
    },
    artifact: {
      kind: 'MEDIA',
      path: handoffAsset,
      codec: 'production-final-render',
      container: handoffAsset.toLowerCase().endsWith('.mp4') ? 'MP4' : undefined,
    },
    notes: [
      ...resolve21AlphaHandoffPolicy.notes,
      'Baseline Resolve sidecar synthesized for Project Remotion Element identity binding because Project Motion is not applicable.',
      'Generated sidecar does not prove Remotion Studio GUI Actual, DaVinci GUI Actual, or production readiness.',
    ],
  });
}
mkdirSync(dirname(config.resolveIdentitySidecar), {recursive: true});
writeFileSync(config.resolveIdentitySidecar, `${JSON.stringify(baseline, null, 2)}\n`);

const bind = run('scripts/bind-wedding-project-remotion-identity-to-resolve-sidecar.mts', [
  `--movie=${movieId}`,
  `--sidecar=${config.resolveIdentitySidecar}`,
  `--output=${config.resolveIdentitySidecar}`,
  `--receipt=${config.receipt}`,
]);
forward(bind);
if (bind.status !== 0) block('PROJECT_REMOTION_IDENTITY_RESOLVE_BINDING_FAILED');

let enrichedSidecar: any;
let recovery: any;
try {
  enrichedSidecar = JSON.parse(readFileSync(config.resolveIdentitySidecar, 'utf8'));
  recovery = JSON.parse(readFileSync(config.recovery, 'utf8'));
} catch {
  block('PROJECT_REMOTION_IDENTITY_OUTPUT_INVALID_JSON');
}
const receiptBinding = enrichedSidecar?.projectRemotionIdentityReceipt;
if (!receiptBinding || receiptBinding.state !== 'CURRENT' || receiptBinding.projectId !== movieId) {
  block('PROJECT_REMOTION_IDENTITY_RESOLVE_BINDING_NOT_CURRENT');
}
const sidecarSha256 = sha256(readFileSync(config.resolveIdentitySidecar));
recovery.projectRemotionIdentity = {
  authority: 'RESOLVE_PROJECT_REMOTION_IDENTITY_HANDOFF',
  movieId,
  state: 'CURRENT',
  resolveSidecar: {
    path: basename(config.resolveIdentitySidecar),
    sha256: sidecarSha256,
  },
  receipt: receiptBinding,
  remotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionReady: false,
  guardrails: [
    'PROJECT_REMOTION_IDENTITY_CURRENT != REMOTION_STUDIO_GUI_ACTUAL',
    'PROJECT_REMOTION_IDENTITY_CURRENT != MAC_DAVINCI_GUI_ACTUAL',
    'PROJECT_REMOTION_IDENTITY_CURRENT != PRODUCTION_READY',
  ],
};
writeFileSync(config.recovery, `${JSON.stringify(recovery, null, 2)}\n`);

console.log('projectRemotionIdentityProductionHandoff=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`resolveIdentitySidecar=${rel(config.resolveIdentitySidecar)}`);
console.log(`resolveIdentitySidecarSha256=${sidecarSha256}`);
console.log(`receiptSha256=${receiptBinding.sha256}`);
console.log(`verifiedSceneBindings=${receiptBinding.verifiedSceneBindingCount}`);
console.log('remotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciActual=NOT_RUN');
console.log('productionReady=NO');
