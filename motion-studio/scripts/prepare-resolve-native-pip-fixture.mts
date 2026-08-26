import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {nativePIPHumanMaster, resolveNativePIPCanary} from '../src/data/resolveNativePIP.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(motionRoot, 'out', 'canary-inputs', 'native-pip');
const manifestDir = join(motionRoot, 'out', 'canary-inputs', 'manifests');
const topPath = join(outDir, 'native-pip-top-test-pattern.mp4');
const backgroundPath = join(outDir, 'native-pip-background.mp4');
const humanMasterPath = join(outDir, 'native-pip-human-master.json');
const manifestPath = join(manifestDir, `${resolveNativePIPCanary.id}.json`);
const dryRun = process.argv.includes('--dry-run');

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function requireCommand(command: string) {
  const result = spawnSync(command, ['-version'], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(`${command} is required for the native PiP fixture.`);
}

function run(command: string, args: string[]) {
  console.log(`▶ ${command} ${args.join(' ')}`);
  if (dryRun) return;
  const result = spawnSync(command, args, {cwd: motionRoot, stdio: 'inherit'});
  if (result.status !== 0) throw new Error(`Command failed (${result.status ?? 'unknown'}): ${command} ${args.join(' ')}`);
}

function ffprobe(path: string): Record<string, unknown> {
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', path], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(`ffprobe failed for ${path}: ${result.stderr || 'unknown error'}`);
  return JSON.parse(result.stdout) as Record<string, unknown>;
}

function writeJson(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

try {
  console.log('# Resolve native Picture in Picture neutral fixture');
  console.log(`Canary: ${resolveNativePIPCanary.id}`);
  console.log('Synthetic/non-private media only. No Resolve runtime is launched.');

  if (dryRun) {
    console.log(`Would generate: ${toMotionRelative(topPath)}`);
    console.log(`Would generate: ${toMotionRelative(backgroundPath)}`);
    console.log(`Would write: ${toMotionRelative(humanMasterPath)}`);
    console.log(`Would write: ${toMotionRelative(manifestPath)}`);
    console.log('DRY RUN: no fixture files or manifests were written.');
    process.exit(0);
  }

  requireCommand('ffmpeg');
  requireCommand('ffprobe');
  mkdirSync(outDir, {recursive: true});
  mkdirSync(manifestDir, {recursive: true});

  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error',
    '-f', 'lavfi', '-i', 'testsrc2=size=640x360:rate=30:duration=6',
    '-vf', 'format=yuv420p',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18',
    '-movflags', '+faststart', '-y', topPath,
  ]);

  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error',
    '-f', 'lavfi', '-i', 'color=c=0xE7E1D8:size=1920x1080:rate=30:duration=6',
    '-vf', 'format=yuv420p',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18',
    '-movflags', '+faststart', '-y', backgroundPath,
  ]);

  if (!existsSync(topPath) || !existsSync(backgroundPath)) throw new Error('Expected native PiP fixture media was not generated.');

  writeJson(humanMasterPath, nativePIPHumanMaster);

  const manifest = resolveCanaryInputManifestSchema.parse({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId: resolveNativePIPCanary.id,
    generatedAt: new Date().toISOString(),
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-native-pip-fixture.mts',
      mode: 'native-pip',
    },
    files: [
      {
        id: 'native-pip-top-source',
        role: 'Synthetic moving source for V2 / Picture in Picture',
        path: toMotionRelative(topPath),
        sha256: sha256(topPath),
        metadata: ffprobe(topPath),
      },
      {
        id: 'native-pip-background',
        role: 'Synthetic neutral full-frame background for V1',
        path: toMotionRelative(backgroundPath),
        sha256: sha256(backgroundPath),
        metadata: ffprobe(backgroundPath),
      },
      {
        id: 'native-pip-human-master',
        role: 'Required control inventory, target intent and human late-edit tasks; not runtime evidence',
        path: toMotionRelative(humanMasterPath),
        sha256: sha256(humanMasterPath),
        metadata: {
          schemaVersion: nativePIPHumanMaster.schemaVersion,
          fixtureId: nativePIPHumanMaster.fixtureId,
        },
      },
    ],
    humanMaster: nativePIPHumanMaster,
    expectedInventory: {
      timeline: nativePIPHumanMaster.timeline,
      requiredControlGroups: resolveNativePIPControlGroupSummary(),
      exactKnownTarget: {rounding: nativePIPHumanMaster.targetIntent.rounding.target},
      animationRequiredForCorePass: nativePIPHumanMaster.animationProbe.requiredForCorePass,
    },
    nextAction: 'Execute DV21-NATIVE-PIP-01 in a disposable Resolve 21 project. Record exact edition availability and actual Inspector values; fixture generation is not effect/runtime proof.',
    guardrails: [...nativePIPHumanMaster.guardrails],
  });

  writeJson(manifestPath, manifest);
  console.log('✅ Native PiP fixture prepared.');
  console.log(`   top=${toMotionRelative(topPath)} sha256=${sha256(topPath)}`);
  console.log(`   background=${toMotionRelative(backgroundPath)} sha256=${sha256(backgroundPath)}`);
  console.log(`   humanMaster=${toMotionRelative(humanMasterPath)} sha256=${sha256(humanMasterPath)}`);
  console.log(`   manifest=${toMotionRelative(manifestPath)}`);
  console.log('   resolveRuntimeVerified=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}

function resolveNativePIPControlGroupSummary() {
  return [
    {group: 'CONTENT', requiredControls: ['Zoom', 'Pan', 'Tilt']},
    {group: 'POSITION', requiredControls: ['Position X', 'Position Y', 'Width', 'Height']},
    {group: 'STYLE_CORE', requiredControls: ['Rounding', 'Rotation', 'Opacity', 'Border', 'Drop Shadow', 'Use Alpha']},
  ];
}
