import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lyricPath = join(studioRoot, 'local/lyrics-wedding-edit.local.json');
const audioDiskPath = join(studioRoot, 'public/local-start-wedding-edit/audio/start-wedding-edit.m4a');
const propsPath = join(studioRoot, 'out/opening/japanese-friends-opening-start-sync.props.json');
const outputPath = join(studioRoot, 'out/opening/japanese_friends_opening_start_sync_v1.mp4');

if (!existsSync(lyricPath) || !existsSync(audioDiskPath)) {
  throw new Error('Local StaRt audio/lyrics are missing. Run the local StaRt preparation workflow before rendering.');
}

const lyricDocument = JSON.parse(readFileSync(lyricPath, 'utf8')) as {phrases?: unknown[]};
if (!Array.isArray(lyricDocument.phrases) || lyricDocument.phrases.length !== 30) {
  throw new Error(`Expected 30 local timed lyric phrases, found ${lyricDocument.phrases?.length ?? 0}.`);
}
const measuredThreeHits = lyricDocument.phrases.filter((entry) => {
  const phrase = entry as {threeHitFrameSecs?: unknown};
  return Array.isArray(phrase.threeHitFrameSecs) && phrase.threeHitFrameSecs.length === 3;
});
if (measuredThreeHits.length !== 4) {
  throw new Error(`Expected four measured three-hit phrases, found ${measuredThreeHits.length}.`);
}

mkdirSync(dirname(propsPath), {recursive: true});
writeFileSync(propsPath, JSON.stringify({
  audioPath: 'local-start-wedding-edit/audio/start-wedding-edit.m4a',
  lyricPhrases: lyricDocument.phrases,
}, null, 2));

if (process.argv.includes('--prepare-only')) {
  console.log(`Validated local StaRt inputs and wrote ${propsPath}`);
  process.exit(0);
}

const render = spawnSync('pnpm', [
  'exec',
  'remotion',
  'render',
  'src/index-start-motion-kit.ts',
  'JapaneseFriendsOpeningStartSyncV1',
  outputPath,
  '--props',
  propsPath,
], {cwd: studioRoot, stdio: 'inherit'});
if (render.status !== 0) process.exit(render.status ?? 1);

const publish = spawnSync('pnpm', ['publish:japanese-friends-opening-start-sync'], {
  cwd: studioRoot,
  stdio: 'inherit',
});
process.exit(publish.status ?? 1);
