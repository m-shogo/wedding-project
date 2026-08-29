import {copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {openingV1Authority} from '../src/data/openingV1Authority.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(studioRoot, '..');
const source = join(studioRoot, 'out/opening/opening_v1.mp4');
const destination = join(repoRoot, 'movie-dashboard/public/demo-renders/opening-v1-dummy-production.mp4');
const manifestDestination = join(repoRoot, 'movie-dashboard/public/demo-renders/opening-v1-dummy-production.manifest.json');

if (openingV1Authority.mode !== 'DUMMY_PRODUCTION_SIMULATION' || openingV1Authority.publicationApproved !== false) {
  throw new Error('Dummy render publication requires explicit DUMMY_PRODUCTION_SIMULATION authority with publicationApproved=false.');
}
if (!existsSync(source)) {
  throw new Error(`Opening render not found: ${source}`);
}

const qa = spawnSync(process.execPath, ['--no-warnings', join(studioRoot, 'scripts/check-opening-render.mts'), source], {
  cwd: studioRoot,
  encoding: 'utf8',
});
process.stdout.write(qa.stdout);
process.stderr.write(qa.stderr);
if (qa.status !== 0) {
  throw new Error('Opening render failed strict QA and was not published.');
}

mkdirSync(dirname(destination), {recursive: true});
copyFileSync(source, destination);

const videoProbe = spawnSync(
  'ffprobe',
  ['-v', 'error', '-select_streams', 'v:0', '-count_frames', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,nb_read_frames', '-show_entries', 'format=duration', '-of', 'json', destination],
  {encoding: 'utf8'},
);
const audioProbe = spawnSync(
  'ffprobe',
  ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=codec_name,sample_rate,channels', '-of', 'json', destination],
  {encoding: 'utf8'},
);
if (videoProbe.status !== 0 || audioProbe.status !== 0) {
  throw new Error('Published render could not be probed; integrity manifest was not written.');
}
const videoResult = JSON.parse(videoProbe.stdout) as {streams?: Array<Record<string, unknown>>; format?: {duration?: string}};
const audioResult = JSON.parse(audioProbe.stdout) as {streams?: Array<Record<string, unknown>>};
const sha256 = createHash('sha256').update(readFileSync(destination)).digest('hex');
const manifest = {
  schemaVersion: 'opening-v1-dummy-render-manifest/v1',
  authority: openingV1Authority.mode,
  publicationApproved: false,
  generatedAt: new Date().toISOString(),
  artifact: {
    file: 'opening-v1-dummy-production.mp4',
    sha256,
    byteSize: statSync(destination).size,
  },
  video: {
    codec: videoResult.streams?.[0]?.codec_name,
    width: videoResult.streams?.[0]?.width,
    height: videoResult.streams?.[0]?.height,
    fps: videoResult.streams?.[0]?.r_frame_rate,
    frames: videoResult.streams?.[0]?.nb_read_frames,
    durationSeconds: Number(videoResult.format?.duration),
  },
  audio: {
    codec: audioResult.streams?.[0]?.codec_name,
    sampleRate: audioResult.streams?.[0]?.sample_rate,
    channels: audioResult.streams?.[0]?.channels,
  },
  qa: {
    status: 'PASSED',
    command: 'pnpm check:opening-render',
    checks: ['resolution', 'fps', 'duration', 'audio-format', 'near-black', 'mean-volume', 'peak-volume', 'silence'],
  },
} as const;
writeFileSync(manifestDestination, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`✅ Published QA-passed dummy production render: ${destination}`);
console.log(`✅ Wrote integrity manifest: ${manifestDestination}`);
