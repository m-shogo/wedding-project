import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const args = process.argv.slice(2);

const valueArg = (name: string, fallback: string): string => {
  const prefix = `--${name}=`;
  const hit = args.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : fallback;
};

const positional = args.find((arg) => !arg.startsWith('--'));
const target = resolve(positional ?? 'out/opening/opening_v1.mp4');
const expectedWidth = Number(valueArg('width', '1920'));
const expectedHeight = Number(valueArg('height', '1080'));
const expectedFps = Number(valueArg('fps', '30'));
const expectedDuration = Number(valueArg('duration', '60'));
const durationTolerance = Number(valueArg('duration-tolerance', '0.15'));
const blackMinDuration = Number(valueArg('black-duration', '0.08'));

let errors = 0;
const fail = (message: string) => {
  errors++;
  console.error(`❌ ${message}`);
};
const ok = (message: string) => console.log(`✅ ${message}`);
const info = (message: string) => console.log(`ℹ️  ${message}`);

const commandExists = (command: string): boolean => {
  const result = spawnSync(command, ['-version'], {encoding: 'utf-8'});
  return result.status === 0;
};

const rationalToNumber = (value: string | undefined): number => {
  if (!value) return Number.NaN;
  if (!value.includes('/')) return Number(value);
  const [numerator, denominator] = value.split('/').map(Number);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return Number.NaN;
  }
  return numerator / denominator;
};

if (!existsSync(target)) {
  fail(`render file not found: ${target}`);
}
if (!commandExists('ffprobe')) {
  fail('ffprobe not found. Install ffmpeg/ffprobe before final QA.');
}
if (!commandExists('ffmpeg')) {
  fail('ffmpeg not found. Install ffmpeg before final QA.');
}

if (errors > 0) {
  process.exit(1);
}

const probe = spawnSync(
  'ffprobe',
  [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=codec_name,width,height,r_frame_rate,avg_frame_rate,pix_fmt',
    '-show_entries',
    'format=duration',
    '-of',
    'json',
    target,
  ],
  {encoding: 'utf-8'},
);

if (probe.status !== 0) {
  fail(`ffprobe failed:\n${(probe.stderr || probe.stdout).trim()}`);
  process.exit(1);
}

type ProbeData = {
  streams?: Array<{
    codec_name?: string;
    width?: number;
    height?: number;
    r_frame_rate?: string;
    avg_frame_rate?: string;
    pix_fmt?: string;
  }>;
  format?: {duration?: string};
};

let data: ProbeData;
try {
  data = JSON.parse(probe.stdout) as ProbeData;
} catch (error) {
  fail(`ffprobe JSON parse failed: ${String(error)}`);
  process.exit(1);
}

const video = data.streams?.[0];
if (!video) {
  fail('video stream not found');
} else {
  if (video.width !== expectedWidth || video.height !== expectedHeight) {
    fail(
      `resolution mismatch: ${video.width ?? '?'}x${video.height ?? '?'} ` +
        `(expected ${expectedWidth}x${expectedHeight})`,
    );
  } else {
    ok(`resolution ${video.width}x${video.height}`);
  }

  const fps = rationalToNumber(video.avg_frame_rate ?? video.r_frame_rate);
  if (!Number.isFinite(fps) || Math.abs(fps - expectedFps) > 0.01) {
    fail(`fps mismatch: ${Number.isFinite(fps) ? fps.toFixed(3) : 'unknown'} (expected ${expectedFps})`);
  } else {
    ok(`fps ${fps.toFixed(3)}`);
  }

  info(`video codec=${video.codec_name ?? 'unknown'} pix_fmt=${video.pix_fmt ?? 'unknown'}`);
}

const duration = Number(data.format?.duration);
if (!Number.isFinite(duration)) {
  fail('duration could not be read');
} else if (Math.abs(duration - expectedDuration) > durationTolerance) {
  fail(
    `duration mismatch: ${duration.toFixed(3)}s ` +
      `(expected ${expectedDuration.toFixed(3)}s ±${durationTolerance.toFixed(3)}s)`,
  );
} else {
  ok(`duration ${duration.toFixed(3)}s`);
}

// Detect only near-pure-black frames. pix_th=0.02 is intentionally stricter than
// ffmpeg's default so the Opening's intentional navy backgrounds do not count as black.
const black = spawnSync(
  'ffmpeg',
  [
    '-hide_banner',
    '-nostats',
    '-i',
    target,
    '-vf',
    `blackdetect=d=${blackMinDuration}:pic_th=0.995:pix_th=0.02`,
    '-an',
    '-f',
    'null',
    '-',
  ],
  {encoding: 'utf-8'},
);

if (black.status !== 0) {
  fail(`blackdetect failed:\n${(black.stderr || black.stdout).trim().split('\n').slice(-8).join('\n')}`);
} else {
  const output = `${black.stdout}\n${black.stderr}`;
  const blackSegments = [...output.matchAll(/black_start:([0-9.]+)\s+black_end:([0-9.]+)\s+black_duration:([0-9.]+)/g)];

  if (blackSegments.length > 0) {
    for (const match of blackSegments) {
      fail(`near-black segment: ${match[1]}s → ${match[2]}s (${match[3]}s)`);
    }
  } else {
    ok(`near-black segments: 0 (min ${blackMinDuration}s)`);
  }
}

console.log('');
if (errors > 0) {
  console.error(`Opening V1 render QA failed: ${errors} error(s)`);
  process.exit(1);
}

console.log('✅ Opening V1 render QA passed');
