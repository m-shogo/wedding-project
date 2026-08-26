import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  alphaCanaryFixture,
  audioRecoveryHumanMaster,
  palmierFcpxmlSyntheticSceneSpec,
  resolveCanaryInputManifestSchema,
  type ResolveCanaryInputManifest,
} from '../src/data/resolveCanaryInputFixtures.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = join(root, 'out', 'canary-inputs');
const manifestDir = join(outRoot, 'manifests');

const args = process.argv.slice(2);
const mode = args.find((arg) => !arg.startsWith('--')) ?? '--list';
const dryRun = args.includes('--dry-run');
const reuseExisting = args.includes('--reuse-existing');

function usage() {
  console.log('Resolve Canary Input Preparation');
  console.log('');
  console.log('Modes:');
  console.log('  alpha    Render/reuse neutral Remotion ProRes 4444 and write hash/ffprobe manifest');
  console.log('  audio    Generate a copyright-free synthetic WAV + Human Master target manifest');
  console.log('  palmier  Write the synthetic Palmier scene specification only; real FCPXML still requires Palmier');
  console.log('  drfx     Build deterministic neutral Edit/Generators .drfx candidate + manifests');
  console.log('  lottie   Build deterministic self-authored dotLottie v1 native-import candidate + manifests');
  console.log('  all      Prepare alpha + audio + Palmier scene spec + neutral DRFX + neutral Lottie candidates');
  console.log('');
  console.log('Options:');
  console.log('  --dry-run         Print planned commands/outputs without creating files');
  console.log('  --reuse-existing  For alpha, reuse an existing render instead of rerendering');
}

if (mode === '--list' || mode === 'list') {
  usage();
  process.exit(0);
}

if (!['alpha', 'audio', 'palmier', 'drfx', 'lottie', 'all'].includes(mode)) {
  console.error(`Unknown mode: ${mode}`);
  usage();
  process.exit(1);
}

function toRepoRelative(path: string) {
  return relative(root, path).replaceAll('\\', '/');
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function ensureDir(path: string) {
  if (!dryRun) mkdirSync(path, {recursive: true});
}

function requireCommand(command: string) {
  const result = spawnSync(command, ['-version'], {encoding: 'utf8'});
  if (result.status !== 0) {
    throw new Error(`${command} is required for this preparation mode.`);
  }
}

function run(command: string, commandArgs: string[], cwd = root) {
  console.log(`▶ ${command} ${commandArgs.join(' ')}`);
  if (dryRun) return;
  const result = spawnSync(command, commandArgs, {cwd, stdio: 'inherit'});
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status ?? 'unknown'}): ${command} ${commandArgs.join(' ')}`);
  }
}

function ffprobe(path: string): Record<string, unknown> {
  requireCommand('ffprobe');
  const result = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', path],
    {encoding: 'utf8'},
  );
  if (result.status !== 0) {
    throw new Error(`ffprobe failed for ${path}: ${result.stderr || 'unknown error'}`);
  }
  return JSON.parse(result.stdout) as Record<string, unknown>;
}

function writeJson(path: string, value: unknown) {
  const content = `${JSON.stringify(value, null, 2)}\n`;
  console.log(`→ ${toRepoRelative(path)}`);
  if (!dryRun) {
    ensureDir(dirname(path));
    writeFileSync(path, content, 'utf8');
  }
}

function writeManifest(manifest: ResolveCanaryInputManifest) {
  const parsed = resolveCanaryInputManifestSchema.parse(manifest);
  writeJson(join(manifestDir, `${manifest.canaryId}.json`), parsed);
}

function prepareAlpha() {
  console.log('\n# DV21-REMOTION-ALPHA-01 input');
  const output = join(root, alphaCanaryFixture.outputPath);
  console.log(`Expected render: ${alphaCanaryFixture.outputPath}`);

  if (!reuseExisting || !existsSync(output)) {
    run('pnpm', ['render:stamp-test:prores']);
  } else {
    console.log('↺ reusing existing alpha render by explicit --reuse-existing request');
  }

  if (dryRun) {
    console.log('DRY RUN: hash/ffprobe manifest would be written after render.');
    return;
  }
  if (!existsSync(output)) throw new Error(`Expected alpha render missing: ${output}`);

  const metadata = ffprobe(output);
  writeManifest({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId: alphaCanaryFixture.canaryId,
    generatedAt: new Date().toISOString(),
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-canary-inputs.mts',
      mode: 'alpha',
    },
    files: [
      {
        id: 'remotion-alpha-prores',
        role: 'Resolve import source',
        path: toRepoRelative(output),
        sha256: sha256(output),
        metadata,
      },
    ],
    expectedInventory: {
      compositionId: alphaCanaryFixture.compositionId,
      expected: alphaCanaryFixture.expected,
    },
    nextAction: 'Execute DV21-REMOTION-ALPHA-01 in a disposable Resolve project. Source metadata is not proof that Resolve preserves alpha.',
    guardrails: [...alphaCanaryFixture.guardrails],
  });
}

function prepareAudio() {
  console.log('\n# DV21-AUDIO-RECOVERY-01 inputs');
  const audioDir = join(outRoot, 'audio');
  const wavPath = join(audioDir, 'synthetic-tone-440hz-6s-48k-stereo.wav');
  const targetPath = join(audioDir, 'audio-human-master.json');
  ensureDir(audioDir);

  run('ffmpeg', [
    '-hide_banner',
    '-loglevel', 'error',
    '-f', 'lavfi',
    '-i', 'sine=frequency=440:duration=6:sample_rate=48000',
    '-ac', '2',
    '-c:a', 'pcm_s24le',
    '-y',
    wavPath,
  ]);

  if (dryRun) {
    console.log(`DRY RUN: would write ${toRepoRelative(targetPath)} and hash/ffprobe manifest.`);
    return;
  }
  if (!existsSync(wavPath)) throw new Error(`Expected synthetic WAV missing: ${wavPath}`);

  writeJson(targetPath, audioRecoveryHumanMaster);
  const metadata = ffprobe(wavPath);
  writeManifest({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId: 'DV21-AUDIO-RECOVERY-01',
    generatedAt: new Date().toISOString(),
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-canary-inputs.mts',
      mode: 'audio',
    },
    files: [
      {
        id: 'synthetic-audio',
        role: 'Copyright-free audio source',
        path: toRepoRelative(wavPath),
        sha256: sha256(wavPath),
        metadata,
      },
      {
        id: 'audio-human-master',
        role: 'Target dB/timing values; not runtime evidence',
        path: toRepoRelative(targetPath),
        sha256: sha256(targetPath),
        metadata: {
          schemaVersion: audioRecoveryHumanMaster.schemaVersion,
          targetEnvelope: audioRecoveryHumanMaster.targetEnvelope,
        },
      },
    ],
    humanMaster: audioRecoveryHumanMaster,
    nextAction: 'Execute DV21-AUDIO-RECOVERY-01. Rebuild the envelope with native UI first, then test scripting write capability separately.',
    guardrails: [...audioRecoveryHumanMaster.guardrails],
  });
}

function preparePalmierSpec() {
  console.log('\n# DV21-PALMIER-FCPXML-01 scene specification');
  const palmierDir = join(outRoot, 'palmier');
  const specPath = join(palmierDir, 'palmier-fcpxml-synthetic-scene-spec.json');
  ensureDir(palmierDir);

  if (dryRun) {
    console.log(`DRY RUN: would write ${toRepoRelative(specPath)} only. No FCPXML will be synthesized.`);
    return;
  }

  writeJson(specPath, palmierFcpxmlSyntheticSceneSpec);
  writeManifest({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId: 'DV21-PALMIER-FCPXML-01',
    generatedAt: new Date().toISOString(),
    status: 'BLOCKED_REAL_TOOL_EXPORT_REQUIRED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-canary-inputs.mts',
      mode: 'palmier',
    },
    files: [
      {
        id: 'palmier-scene-spec',
        role: 'Human-readable build specification; explicitly not FCPXML',
        path: toRepoRelative(specPath),
        sha256: sha256(specPath),
        metadata: {
          schemaVersion: palmierFcpxmlSyntheticSceneSpec.schemaVersion,
          realPalmierExportRequired: true,
        },
      },
    ],
    expectedInventory: palmierFcpxmlSyntheticSceneSpec,
    nextAction: 'Build this neutral scene in Palmier and export it using Palmier’s real DaVinci/Resolve FCPXML target. Then hash the actual FCPXML and attach it to the canary evidence locally.',
    guardrails: [...palmierFcpxmlSyntheticSceneSpec.guardrails],
  });
}

function runChildFixture(script: string, label: string) {
  const childArgs = ['--no-warnings', script];
  if (dryRun) childArgs.push('--dry-run');
  const result = spawnSync(process.execPath, childArgs, {cwd: root, stdio: 'inherit'});
  if (result.status !== 0) throw new Error(`${label} preparation failed (${result.status ?? 'unknown'}).`);
}

function prepareDrfx() {
  console.log('\n# DV21-DRFX-FREE-01 neutral template bundle');
  runChildFixture('scripts/prepare-resolve-drfx-fixture.mts', 'Neutral DRFX fixture');
}

function prepareLottie() {
  console.log('\n# DV21-LOTTIE-OGRAF-01 neutral dotLottie fixture');
  runChildFixture('scripts/prepare-resolve-lottie-fixture.mts', 'Neutral Lottie fixture');
}

try {
  ensureDir(manifestDir);
  if (mode === 'alpha' || mode === 'all') prepareAlpha();
  if (mode === 'audio' || mode === 'all') prepareAudio();
  if (mode === 'palmier' || mode === 'all') preparePalmierSpec();
  if (mode === 'drfx' || mode === 'all') prepareDrfx();
  if (mode === 'lottie' || mode === 'all') prepareLottie();
  console.log('\nDone. Generated files live under motion-studio/out/canary-inputs or the existing neutral alpha output path and should not be committed as binary evidence by default.');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
