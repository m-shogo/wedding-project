import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {weddingNeutralSolidDrfxFixture} from '../src/data/resolveDrfxFixture.ts';
import {resolveDrfxFixtureManifestSchema} from '../src/data/resolveDrfxFixture.schema.ts';

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

function requireSettingContract(source: string) {
  const requiredTokens = [
    'WeddingNeutralSolid = GroupOperator',
    'Inputs = ordered()',
    'InstanceInput',
    'SourceOp = "NeutralBackground"',
    'Name = "Color"',
    'ControlGroup = 4',
    'MainOutput1 = InstanceOutput',
    'NeutralBackground = Background',
    'UseFrameFormatSettings = Input { Value = 1',
    'ActiveTool = "WeddingNeutralSolid"',
  ];
  for (const token of requiredTokens) {
    if (!source.includes(token)) throw new Error(`Neutral .setting contract missing token: ${token}`);
  }

  const forbiddenTokens = [
    'Loader {',
    'Fuse.',
    'ofx.',
    'Font =',
    'LUT',
    'SxSFilename',
    'C:\\',
    '/Users/',
    '/home/',
  ];
  for (const token of forbiddenTokens) {
    if (source.includes(token)) throw new Error(`Neutral .setting unexpectedly contains external/runtime-specific dependency token: ${token}`);
  }

  const instanceInputCount = (source.match(/InstanceInput\s*\{/g) ?? []).length;
  if (instanceInputCount !== weddingNeutralSolidDrfxFixture.exposedControls.length) {
    throw new Error(`Exposed control count mismatch: setting=${instanceInputCount} spec=${weddingNeutralSolidDrfxFixture.exposedControls.length}`);
  }
}

try {
  const spec = weddingNeutralSolidDrfxFixture;
  const settingPath = join(motionRoot, spec.settingSourcePath);
  const outputPath = join(motionRoot, spec.outputPath);
  const drfxDir = dirname(outputPath);
  const reportPath = join(drfxDir, 'WeddingNeutralSolid.pack-report.json');
  const fixtureManifestPath = join(drfxDir, 'WeddingNeutralSolid.manifest.json');
  const canaryManifestPath = join(motionRoot, 'out', 'canary-inputs', 'manifests', `${spec.canaryId}.json`);

  if (!existsSync(settingPath)) throw new Error(`Neutral .setting source missing: ${spec.settingSourcePath}`);
  const settingSource = readFileSync(settingPath, 'utf8');
  requireSettingContract(settingSource);

  console.log(`# ${spec.canaryId} neutral DRFX fixture`);
  console.log(`setting=${spec.settingSourcePath}`);
  console.log(`archivePath=${spec.archiveSettingPath}`);
  console.log(`output=${spec.outputPath}`);
  console.log(`humanAdjustabilityCandidate=${spec.expectedHumanAdjustability}`);
  console.log('runtimeState=PENDING_RUNTIME');

  if (dryRun) {
    console.log('DRY RUN: deterministic .drfx + fixture manifest + Canary input manifest would be generated.');
    process.exit(0);
  }

  ensureDir(drfxDir);
  const packerPath = join(repoRoot, 'scripts', 'davinci', 'deterministic-drfx-pack.py');
  const pack = spawnSync('python3', [
    packerPath,
    '--output', outputPath,
    '--file', `${settingPath}=${spec.archiveSettingPath}`,
    '--report', reportPath,
  ], {cwd: repoRoot, encoding: 'utf8'});
  if (pack.status !== 0) {
    throw new Error(`DRFX packer failed: ${pack.stderr || pack.stdout || 'unknown error'}`);
  }

  for (const requiredPath of [outputPath, reportPath]) {
    if (!existsSync(requiredPath)) throw new Error(`DRFX pack output missing: ${toMotionRelative(requiredPath)}`);
  }

  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as {
    schemaVersion: string;
    fixedTimestamp: string;
    entries: Array<{path: string; byteLength: number; dateTime: number[]}>;
  };
  if (report.schemaVersion !== 'deterministic-drfx-pack-report/v1') throw new Error('Unexpected DRFX pack report schema.');
  if (report.fixedTimestamp !== '1980-01-01T00:00:00') throw new Error('DRFX archive timestamp policy is not deterministic.');
  if (report.entries.length !== 1 || report.entries[0]?.path !== spec.archiveSettingPath) {
    throw new Error(`Unexpected DRFX archive entries: ${JSON.stringify(report.entries)}`);
  }
  if (report.entries[0]?.dateTime.join('-') !== '1980-1-1-0-0-0') {
    throw new Error(`Unexpected DRFX archive entry timestamp: ${report.entries[0]?.dateTime.join('-')}`);
  }

  const settingHash = sha256(settingPath);
  const drfxHash = sha256(outputPath);
  const generatedAt = new Date().toISOString();
  const fixtureManifest = resolveDrfxFixtureManifestSchema.parse({
    schemaVersion: 'resolve-drfx-fixture-manifest/v1',
    generatedAt,
    fixtureId: spec.fixtureId,
    canaryId: spec.canaryId,
    category: spec.category,
    drfxPath: spec.outputPath,
    drfxSha256: drfxHash,
    settingSourcePath: spec.settingSourcePath,
    settingSourceSha256: settingHash,
    archiveEntries: [
      {
        path: spec.archiveSettingPath,
        sha256: settingHash,
        byteLength: report.entries[0]!.byteLength,
        timestampPolicy: 'FIXED_1980_01_01_00_00_00',
      },
    ],
    dependencies: spec.dependencies,
    exposedControls: spec.exposedControls,
    packagingVerification: {
      zipReadable: true,
      expectedHierarchyOnly: true,
      noPathTraversal: true,
      deterministicArchiveExpected: true,
    },
    runtimeState: 'PENDING_RUNTIME',
    guardrails: spec.guardrails,
  });
  writeJson(fixtureManifestPath, fixtureManifest);

  const fixtureManifestHash = sha256(fixtureManifestPath);
  const canaryManifest = resolveCanaryInputManifestSchema.parse({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId: spec.canaryId,
    generatedAt,
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-drfx-fixture.mts',
      mode: 'drfx',
    },
    files: [
      {
        id: 'neutral-drfx',
        role: 'Deterministic neutral Resolve template bundle candidate',
        path: spec.outputPath,
        sha256: drfxHash,
        metadata: {
          category: spec.category,
          fixtureId: spec.fixtureId,
          expectedHumanAdjustability: spec.expectedHumanAdjustability,
          runtimeState: spec.runtimeState,
        },
      },
      {
        id: 'drfx-fixture-manifest',
        role: 'Bundle structure, dependency and exposed-control support record',
        path: toMotionRelative(fixtureManifestPath),
        sha256: fixtureManifestHash,
        metadata: {
          schemaVersion: fixtureManifest.schemaVersion,
          runtimeState: fixtureManifest.runtimeState,
        },
      },
    ],
    expectedInventory: {
      displayName: spec.displayName,
      category: spec.category,
      archiveSettingPath: spec.archiveSettingPath,
      dependencies: spec.dependencies,
      exposedControls: spec.exposedControls,
      expectedHumanAdjustability: spec.expectedHumanAdjustability,
    },
    nextAction: 'Prepare DV21-DRFX-FREE-01 Session, install the generated .drfx manually in disposable Resolve 21, verify Effects Library visibility, Inspector controls, save/reopen, render, and uninstall. Packaging success is not runtime proof.',
    guardrails: spec.guardrails,
  });
  writeJson(canaryManifestPath, canaryManifest);

  console.log(`✅ DRFX fixture generated: ${spec.outputPath}`);
  console.log(`   drfxSha256=${drfxHash}`);
  console.log(`   manifest=${toMotionRelative(canaryManifestPath)}`);
  console.log('   resolveInstalled=NO');
  console.log('   runtimeVerified=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
