import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {weddingNeutralAlphaMotionLottieFixture} from '../src/data/resolveLottieFixture.ts';
import {resolveLottieFixtureManifestSchema} from '../src/data/resolveLottieFixture.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(motionRoot, '..');
const dryRun = process.argv.includes('--dry-run');

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

function ensureDir(path: string) {
  if (!dryRun) mkdirSync(path, {recursive: true});
}

function writeJson(path: string, value: unknown) {
  if (dryRun) return;
  ensureDir(dirname(path));
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function requireSourceContract(manifestSource: unknown, animationSource: unknown) {
  if (!manifestSource || typeof manifestSource !== 'object') throw new Error('dotLottie manifest source must be an object.');
  if (!animationSource || typeof animationSource !== 'object') throw new Error('Lottie animation source must be an object.');

  const manifest = manifestSource as Record<string, unknown>;
  const animation = animationSource as Record<string, unknown>;
  const spec = weddingNeutralAlphaMotionLottieFixture;

  if (manifest.version !== spec.dotLottieSpecVersion) throw new Error(`Expected dotLottie v${spec.dotLottieSpecVersion} manifest.`);
  if (manifest.activeAnimationId !== spec.animationId) throw new Error('dotLottie activeAnimationId mismatch.');
  const animations = manifest.animations;
  if (!Array.isArray(animations) || animations.length !== 1 || (animations[0] as Record<string, unknown>)?.id !== spec.animationId) {
    throw new Error('dotLottie manifest must contain exactly the neutral canary animation ID.');
  }
  const custom = manifest.custom as Record<string, unknown> | undefined;
  if (custom?.source !== 'SELF_AUTHORED_SYNTHETIC' || custom?.copyrightedContent !== false) {
    throw new Error('Neutral dotLottie manifest must retain self-authored/non-copyrighted provenance metadata.');
  }
  if (!Array.isArray(custom?.thirdPartyAssets) || custom.thirdPartyAssets.length !== 0) {
    throw new Error('Neutral dotLottie manifest must not declare third-party assets.');
  }

  for (const [field, expected] of [
    ['fr', spec.timing.fps],
    ['ip', spec.timing.inFrame],
    ['op', spec.timing.outFrame],
    ['w', spec.timing.width],
    ['h', spec.timing.height],
  ] as const) {
    if (animation[field] !== expected) throw new Error(`Lottie ${field} mismatch: expected=${expected} actual=${String(animation[field])}`);
  }
  if (!Array.isArray(animation.assets) || animation.assets.length !== 0) {
    throw new Error('Neutral Lottie animation must not contain external/image assets.');
  }
  const layers = animation.layers;
  if (!Array.isArray(layers) || layers.length !== 1) throw new Error('Neutral Lottie animation must contain exactly one shape layer.');
  const layer = layers[0] as Record<string, unknown>;
  if (layer.ty !== 4) throw new Error('Neutral Lottie animation layer must be a shape layer (ty=4).');
  const position = ((layer.ks as Record<string, unknown>)?.p ?? null) as Record<string, unknown> | null;
  if (!position || position.a !== 1 || !Array.isArray(position.k) || position.k.length < 2) {
    throw new Error('Neutral Lottie animation must retain obvious animated position keyframes.');
  }

  const sourceText = `${JSON.stringify(manifest)}\n${JSON.stringify(animation)}`;
  for (const forbidden of ['http://', 'https://', 'data:image', 'fonts/', 'images/']) {
    if (sourceText.includes(forbidden)) throw new Error(`Neutral Lottie source contains forbidden external dependency token: ${forbidden}`);
  }
}

try {
  const spec = weddingNeutralAlphaMotionLottieFixture;
  const manifestSourcePath = join(motionRoot, spec.manifestSourcePath);
  const animationSourcePath = join(motionRoot, spec.animationSourcePath);
  const outputPath = join(motionRoot, spec.outputPath);
  const outputDir = dirname(outputPath);
  const reportPath = join(outputDir, 'WeddingNeutralAlphaMotion.pack-report.json');
  const fixtureManifestPath = join(outputDir, 'WeddingNeutralAlphaMotion.fixture.json');
  const canaryManifestPath = join(motionRoot, 'out', 'canary-inputs', 'manifests', `${spec.canaryId}.json`);

  for (const sourcePath of [manifestSourcePath, animationSourcePath]) {
    if (!existsSync(sourcePath)) throw new Error(`Neutral Lottie source missing: ${toMotionRelative(sourcePath)}`);
  }
  const manifestSource = JSON.parse(readFileSync(manifestSourcePath, 'utf8')) as unknown;
  const animationSource = JSON.parse(readFileSync(animationSourcePath, 'utf8')) as unknown;
  requireSourceContract(manifestSource, animationSource);

  console.log(`# ${spec.canaryId} neutral dotLottie fixture`);
  console.log(`manifest=${spec.manifestSourcePath}`);
  console.log(`animation=${spec.animationSourcePath}`);
  console.log(`output=${spec.outputPath}`);
  console.log(`dotLottieSpecVersion=${spec.dotLottieSpecVersion}`);
  console.log('source=SELF_AUTHORED_SYNTHETIC');
  console.log('transparentCanvasIntent=YES');
  console.log('runtimeState=PENDING_RUNTIME');

  if (dryRun) {
    console.log('DRY RUN: deterministic .lottie + fixture manifest + Canary input manifest would be generated.');
    process.exit(0);
  }

  ensureDir(outputDir);
  const packerPath = join(repoRoot, 'scripts', 'davinci', 'deterministic-dotlottie-pack.py');
  const pack = spawnSync('python3', [
    packerPath,
    '--output', outputPath,
    '--file', `${manifestSourcePath}=${spec.archiveManifestPath}`,
    '--file', `${animationSourcePath}=${spec.archiveAnimationPath}`,
    '--report', reportPath,
  ], {cwd: repoRoot, encoding: 'utf8'});
  if (pack.status !== 0) throw new Error(`dotLottie packer failed: ${pack.stderr || pack.stdout || 'unknown error'}`);
  if (!existsSync(outputPath) || !existsSync(reportPath)) throw new Error('Expected dotLottie pack outputs are missing.');

  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as {
    schemaVersion: string;
    dotLottieSpecVersion: string;
    fixedTimestamp: string;
    entries: Array<{path: string; byteLength: number; dateTime: number[]; sha256: string}>;
  };
  if (report.schemaVersion !== 'deterministic-dotlottie-pack-report/v1') throw new Error('Unexpected dotLottie pack report schema.');
  if (report.dotLottieSpecVersion !== '1') throw new Error('Unexpected dotLottie pack spec version.');
  if (report.fixedTimestamp !== '1980-01-01T00:00:00') throw new Error('dotLottie archive timestamp policy is not deterministic.');
  const expectedPaths = [spec.archiveAnimationPath, spec.archiveManifestPath].sort();
  if (JSON.stringify(report.entries.map((entry) => entry.path)) !== JSON.stringify(expectedPaths)) {
    throw new Error(`Unexpected dotLottie archive entries: ${JSON.stringify(report.entries)}`);
  }
  for (const entry of report.entries) {
    if (entry.dateTime.join('-') !== '1980-1-1-0-0-0') throw new Error(`Unexpected dotLottie entry timestamp: ${entry.path}`);
  }

  const sourceHashes = {
    manifest: sha256(manifestSourcePath),
    animation: sha256(animationSourcePath),
  };
  const generatedAt = new Date().toISOString();
  const fixtureManifest = resolveLottieFixtureManifestSchema.parse({
    schemaVersion: 'resolve-lottie-fixture-manifest/v1',
    generatedAt,
    fixtureId: spec.fixtureId,
    canaryId: spec.canaryId,
    dotLottieSpecVersion: spec.dotLottieSpecVersion,
    animationId: spec.animationId,
    lottiePath: spec.outputPath,
    lottieSha256: sha256(outputPath),
    sourceFiles: [
      {role: 'DOTLOTTIE_MANIFEST', path: spec.manifestSourcePath, sha256: sourceHashes.manifest},
      {role: 'LOTTIE_ANIMATION', path: spec.animationSourcePath, sha256: sourceHashes.animation},
    ],
    archiveEntries: report.entries.map((entry) => ({
      path: entry.path,
      sha256: entry.sha256,
      byteLength: entry.byteLength,
      timestampPolicy: 'FIXED_1980_01_01_00_00_00' as const,
    })),
    timing: spec.timing,
    visualIntent: spec.visualIntent,
    sourcePolicy: spec.sourcePolicy,
    packagingVerification: {
      zipReadable: true,
      expectedHierarchyOnly: true,
      noPathTraversal: true,
      deterministicArchiveExpected: true,
    },
    expectedImportBehavior: spec.expectedImportBehavior,
    runtimeState: 'PENDING_RUNTIME',
    guardrails: spec.guardrails,
  });
  writeJson(fixtureManifestPath, fixtureManifest);

  const canaryManifest = resolveCanaryInputManifestSchema.parse({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId: spec.canaryId,
    generatedAt,
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-lottie-fixture.mts',
      mode: 'lottie',
    },
    files: [
      {
        id: 'neutral-lottie',
        role: 'Self-authored deterministic dotLottie v1 native-import candidate',
        path: spec.outputPath,
        sha256: fixtureManifest.lottieSha256,
        metadata: {
          fixtureId: spec.fixtureId,
          dotLottieSpecVersion: spec.dotLottieSpecVersion,
          source: 'SELF_AUTHORED_SYNTHETIC',
          copyrightedContent: false,
          transparentCanvasIntent: true,
          runtimeState: spec.runtimeState,
        },
      },
      {
        id: 'lottie-fixture-manifest',
        role: 'Source provenance, timing, archive inventory and expected import behavior',
        path: toMotionRelative(fixtureManifestPath),
        sha256: sha256(fixtureManifestPath),
        metadata: {
          schemaVersion: fixtureManifest.schemaVersion,
          runtimeState: fixtureManifest.runtimeState,
        },
      },
    ],
    expectedInventory: {
      displayName: spec.displayName,
      dotLottieSpecVersion: spec.dotLottieSpecVersion,
      animationId: spec.animationId,
      timing: spec.timing,
      visualIntent: spec.visualIntent,
      sourcePolicy: spec.sourcePolicy,
      expectedImportBehavior: spec.expectedImportBehavior,
    },
    nextAction: 'Prepare DV21-LOTTIE-OGRAF-01 Session, import the generated .lottie into disposable Resolve 21 on macOS/Windows, verify alpha, duration/trim/reposition, save/reopen, and separately inspect internal editability/OGrafLoader behavior.',
    guardrails: spec.guardrails,
  });
  writeJson(canaryManifestPath, canaryManifest);

  console.log(`✅ dotLottie fixture generated: ${spec.outputPath}`);
  console.log(`   lottieSha256=${fixtureManifest.lottieSha256}`);
  console.log(`   manifest=${toMotionRelative(canaryManifestPath)}`);
  console.log('   resolveImported=NO');
  console.log('   alphaRuntimeVerified=NO');
  console.log('   internalEditabilityVerified=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
