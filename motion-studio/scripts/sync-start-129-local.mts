// motion-studio/local/{lyrics,rights}.local.json を検証し、
// Remotion(staticFile)から読めるよう public/local-start-129/ へコピーする。
//
// どちらも無くてもエラーにしない(placeholderでrender可能)。
// あるが不正な形式の場合はエラーで止める(壊れたローカルデータで無音のまま進めない)。

import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseLocalLyricsJson} from '../src/data/start129/localLyrics.ts';
import {parseLocalRightsJson} from '../src/data/start129/localRights.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const publicDir = join(studioRoot, 'public/local-start-129');

mkdirSync(publicDir, {recursive: true});

let hadError = false;

const syncOne = <T,>(
  filename: string,
  parse: (raw: unknown) => {ok: true; data: T} | {ok: false; error: string},
  label: string,
) => {
  const srcPath = join(localDir, filename);
  const destPath = join(publicDir, filename);
  if (!existsSync(srcPath)) {
    console.log(`[start-129] ${label}: 未配置 (${filename})。placeholderでrenderします。`);
    return;
  }
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(srcPath, 'utf8'));
  } catch (e) {
    console.error(`[start-129] ${label}: JSON parse失敗 (${filename}): ${(e as Error).message}`);
    hadError = true;
    return;
  }
  const result = parse(raw);
  if (!result.ok) {
    console.error(`[start-129] ${label}: スキーマ不正 (${filename}): ${result.error}`);
    hadError = true;
    return;
  }
  writeFileSync(destPath, JSON.stringify(result.data, null, 2), 'utf8');
  console.log(`[start-129] ${label}: OK → public/local-start-129/${filename}`);
};

syncOne('lyrics.local.json', parseLocalLyricsJson, '歌詞');
syncOne('rights.local.json', parseLocalRightsJson, '権利メモ');

// 音源: motion-studio/local/audio/start-129.<ext> があればそのままコピーする。
// 権利判断はここでは行わない(localRights.tsのscreeningClearedByUserは人間の申告)。
const audioExts = ['.mp3', '.wav', '.m4a', '.aac'];
const audioDir = join(localDir, 'audio');
let audioRelativePath: string | null = null;
if (existsSync(audioDir)) {
  for (const ext of audioExts) {
    const src = join(audioDir, `start-129${ext}`);
    if (existsSync(src)) {
      mkdirSync(join(publicDir, 'audio'), {recursive: true});
      copyFileSync(src, join(publicDir, 'audio', `start-129${ext}`));
      audioRelativePath = `local-start-129/audio/start-129${ext}`;
      console.log(`[start-129] 音源: OK → public/${audioRelativePath}`);
      break;
    }
  }
}
if (!audioRelativePath) {
  console.log('[start-129] 音源: 未配置 (local/audio/start-129.mp3 等)。無音でrenderします。');
}

const audioManifestOut = join(studioRoot, 'src/data/start129/localAudioManifest.generated.ts');
writeFileSync(
  audioManifestOut,
  `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:start-129-local
export const start129LocalAudioPath: string | null = ${audioRelativePath ? JSON.stringify(audioRelativePath) : 'null'};
`,
);

if (hadError) {
  console.error('[start-129] ローカルデータの検証に失敗しました。修正してから再実行してください。');
  process.exit(1);
}
