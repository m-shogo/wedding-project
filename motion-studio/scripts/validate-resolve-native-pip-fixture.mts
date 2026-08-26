import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {nativePIPHumanMaster, resolveNativePIPCanary} from '../src/data/resolveNativePIP.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultManifest = join(motionRoot, 'out', 'canary-inputs', 'manifests', `${resolveNativePIPCanary.id}.json`);
const manifestPath = resolve(process.argv[2] ?? defaultManifest);

function fail(message: string): never {
  throw new Error(message);
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function actualPath(path: string) {
  return resolve(motionRoot, path);
}

function probe(path: string) {
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', path], {encoding: 'utf8'});
  if (result.status !== 0) fail(`ffprobe failed for ${path}: ${result.stderr || 'unknown error'}`);
  return JSON.parse(result.stdout) as {
    streams?: Array<Record<string, unknown>>;
    format?: Record<string, unknown>;
  };
}

function validateVideo(path: string, expected: {width: number; height: number; fps: number; duration: number}, label: string) {
  const metadata = probe(path);
  const stream = metadata.streams?.find((item) => item.codec_type === 'video');
  if (!stream) fail(`${label}: video stream missing.`);
  if (stream.width !== expected.width || stream.height !== expected.height) {
    fail(`${label}: dimensions mismatch. expected=${expected.width}x${expected.height} actual=${stream.width}x${stream.height}`);
  }
  const fpsRaw = String(stream.avg_frame_rate ?? stream.r_frame_rate ?? '0/1');
  const [num, den] = fpsRaw.split('/').map(Number);
  const fps = den ? num / den : Number(fpsRaw);
  if (Math.abs(fps - expected.fps) > 0.001) fail(`${label}: fps mismatch. expected=${expected.fps} actual=${fps}`);
  const duration = Number(stream.duration ?? metadata.format?.duration ?? NaN);
  if (!Number.isFinite(duration) || Math.abs(duration - expected.duration) > 0.05) {
    fail(`${label}: duration mismatch. expected≈${expected.duration}s actual=${duration}`);
  }
  if (stream.codec_name !== 'h264') fail(`${label}: expected h264 neutral MP4, got ${String(stream.codec_name)}`);
}

try {
  if (!existsSync(manifestPath)) fail(`Native PiP manifest not found: ${manifestPath}`);
  const manifest = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
  if (manifest.canaryId !== resolveNativePIPCanary.id) fail(`Wrong canaryId: ${manifest.canaryId}`);
  if (manifest.status !== 'PREPARED') fail(`Native PiP manifest must be PREPARED, got ${manifest.status}`);
  if (manifest.generator.mode !== 'native-pip') fail(`Unexpected generator mode: ${manifest.generator.mode}`);

  const expectedIds = ['native-pip-top-source', 'native-pip-background', 'native-pip-human-master'].sort();
  const actualIds = manifest.files.map((file) => file.id).sort();
  if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) {
    fail(`Fixture file IDs mismatch. expected=${expectedIds.join(',')} actual=${actualIds.join(',')}`);
  }

  for (const file of manifest.files) {
    const path = actualPath(file.path);
    if (!existsSync(path)) fail(`Fixture file missing: ${file.id} -> ${path}`);
    const actualHash = sha256(path);
    if (!file.sha256 || file.sha256 !== actualHash) fail(`SHA-256 mismatch for ${file.id}`);
  }

  const top = manifest.files.find((file) => file.id === 'native-pip-top-source');
  const background = manifest.files.find((file) => file.id === 'native-pip-background');
  const human = manifest.files.find((file) => file.id === 'native-pip-human-master');
  if (!top || !background || !human) fail('Required native PiP files missing after ID validation.');

  validateVideo(actualPath(top.path), {width: 640, height: 360, fps: 30, duration: 6}, 'top source');
  validateVideo(actualPath(background.path), {width: 1920, height: 1080, fps: 30, duration: 6}, 'background');

  const humanMaster = JSON.parse(readFileSync(actualPath(human.path), 'utf8')) as Record<string, any>;
  if (humanMaster.schemaVersion !== nativePIPHumanMaster.schemaVersion) fail('Human Master schemaVersion mismatch.');
  if (humanMaster.canaryId !== resolveNativePIPCanary.id) fail('Human Master canaryId mismatch.');
  if (humanMaster.fixtureId !== nativePIPHumanMaster.fixtureId) fail('Human Master fixtureId mismatch.');
  if (humanMaster.targetIntent?.rounding?.target !== 0.35) fail('Known Rounding target must remain 0.35.');
  if (!String(humanMaster.targetIntent?.rounding?.authority ?? '').includes('0 right-angle to 1 circle')) {
    fail('Rounding target must retain its documented 0..1 authority note.');
  }
  if (humanMaster.animationProbe?.requiredForCorePass !== false) {
    fail('Animation probe must remain separate/non-required for the static core PASS.');
  }
  if (!humanMaster.guardrails?.includes('OPAQUE_SOURCE_USE_ALPHA_CONTROL != ALPHA_PRESERVATION_PROOF')) {
    fail('Opaque-source alpha guardrail missing from Human Master.');
  }
  if (!humanMaster.guardrails?.includes('PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE')) {
    fail('Human adjustability guardrail missing from Human Master.');
  }

  if (JSON.stringify(manifest).includes('RUNTIME_VERIFIED')) {
    fail('Prepared fixture manifest must not claim runtime verification.');
  }

  console.log('✅ Resolve native PiP fixture validation passed.');
  console.log(`   canary=${resolveNativePIPCanary.id}`);
  console.log('   top=640x360@30fps/6s h264');
  console.log('   background=1920x1080@30fps/6s h264');
  console.log('   roundingTarget=0.35');
  console.log('   animationRequiredForCorePass=NO');
  console.log('   runtimeVerified=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
