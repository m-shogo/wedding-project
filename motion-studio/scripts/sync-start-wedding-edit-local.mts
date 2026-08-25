// motion-studio/local/{start-wedding-edit,lyrics-wedding-edit}.local.json を検証し、
// 実音源(local/audio/StaRt.m4a)をsourceEndSecでtrimして
// public/local-start-wedding-edit/ へコピーする。
//
// 129秒固定・32 slot固定・14 section固定は無効(旧Start129仕様)。
// sourceEndSecが唯一のComposition時間の正本。durationInFramesはここで算出し、
// generated.tsへ焼き込む(Remotion Root登録時に同期的に必要なため)。
//
// 音源・歌詞本文はGitへ入れない。生成されるgenerated.tsには歌詞本文が
// 含まれるため、このファイル自体もgitignore対象(public/local-start-wedding-edit/*と
// src/data/startWeddingEdit/generated.ts)。

import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseLocalEditRangeJson} from '../src/data/startWeddingEdit/localEditRange.ts';
import {parseLyricsWeddingEditJson} from '../src/data/startWeddingEdit/localLyricsWeddingEdit.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const publicDir = join(studioRoot, 'public/local-start-wedding-edit');
const audioOutDir = join(publicDir, 'audio');
mkdirSync(publicDir, {recursive: true});
mkdirSync(audioOutDir, {recursive: true});

let hadError = false;
const fail = (msg: string) => {
  console.error(`[start-wedding-edit] ${msg}`);
  hadError = true;
};

// 1. 編集範囲データ
const editRangePath = join(localDir, 'start-wedding-edit.local.json');
if (!existsSync(editRangePath)) {
  fail(`必須ファイルが見つかりません: local/start-wedding-edit.local.json`);
  process.exit(1);
}
const editRangeRaw = JSON.parse(readFileSync(editRangePath, 'utf8'));
const editRangeResult = parseLocalEditRangeJson(editRangeRaw);
if (!editRangeResult.ok) {
  fail(`start-wedding-edit.local.json スキーマ不正: ${editRangeResult.error}`);
  process.exit(1);
}
const editRange = editRangeResult.data;
writeFileSync(join(publicDir, 'start-wedding-edit.local.json'), JSON.stringify(editRange, null, 2));

// 2. 歌詞データ
const lyricsPath = join(localDir, 'lyrics-wedding-edit.local.json');
if (!existsSync(lyricsPath)) {
  fail(`必須ファイルが見つかりません: local/lyrics-wedding-edit.local.json`);
  process.exit(1);
}
const lyricsRaw = JSON.parse(readFileSync(lyricsPath, 'utf8'));
const lyricsResult = parseLyricsWeddingEditJson(lyricsRaw);
if (!lyricsResult.ok) {
  fail(`lyrics-wedding-edit.local.json スキーマ不正: ${lyricsResult.error}`);
  process.exit(1);
}
const lyrics = lyricsResult.data;

// 3. 音源: local/audio/StaRt.m4a (または start-edit.m4a / start-wedding-edit.m4a) を
//    sourceStartSec〜sourceEndSecでtrimし、fadeOutを適用してpublicへ書き出す。
const audioCandidates = ['start-wedding-edit.m4a', 'start-edit.m4a', 'StaRt.m4a'];
const audioDir = join(localDir, 'audio');
let sourceAudioPath: string | null = null;
for (const name of audioCandidates) {
  const p = join(audioDir, name);
  if (existsSync(p)) {
    sourceAudioPath = p;
    break;
  }
}
let audioRelativePath: string | null = null;
if (!sourceAudioPath) {
  fail('音源が見つかりません: local/audio/StaRt.m4a (または start-edit.m4a / start-wedding-edit.m4a)。無音でrenderせず停止します。');
} else {
  const outPath = join(audioOutDir, 'start-wedding-edit.m4a');
  const fadeFilter = `afade=t=out:st=${editRange.fadeOutStartSec}:d=${editRange.fadeOutDurationSec}`;
  try {
    execFileSync('ffmpeg', [
      '-y',
      '-ss', String(editRange.sourceStartSec),
      '-to', String(editRange.sourceEndSec),
      '-i', sourceAudioPath,
      '-af', fadeFilter,
      '-c:a', 'aac',
      '-b:a', '256k',
      outPath,
    ], {stdio: 'pipe'});
    audioRelativePath = 'local-start-wedding-edit/audio/start-wedding-edit.m4a';
    console.log(`[start-wedding-edit] 音源: OK (trim 0-${editRange.sourceEndSec}s, fade@${editRange.fadeOutStartSec}s) → public/${audioRelativePath}`);
  } catch (e) {
    fail(`ffmpeg trim失敗: ${(e as Error).message}`);
  }
}

if (hadError) {
  console.error('[start-wedding-edit] ローカルデータの検証・音源準備に失敗しました。');
  process.exit(1);
}

const durationInFrames = Math.ceil(editRange.sourceEndSec * 30);

const generatedOut = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');
writeFileSync(
  generatedOut,
  `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:start-wedding-edit-local
//
// sourceEndSec(=Composition durationの正本)は local/start-wedding-edit.local.json
// から算出。129秒固定・32 slot固定は使わない(docs/decisions/2026-08-25-
// start-wedding-edit-scope-change.md)。

import type {LyricPhrase} from './localLyricsWeddingEdit.ts';
import type {LocalEditRange} from './localEditRange.ts';

export const weddingEditAudioPath: string | null = ${audioRelativePath ? JSON.stringify(audioRelativePath) : 'null'};
export const weddingEditDurationInFrames: number = ${durationInFrames};
export const weddingEditFps = 30;
export const weddingEditRange: LocalEditRange = ${JSON.stringify(editRange, null, 2)};
export const weddingEditLyricPhrases: LyricPhrase[] = ${JSON.stringify(lyrics.phrases, null, 2)};
`,
);
console.log(`[start-wedding-edit] generated.ts 更新: durationInFrames=${durationInFrames} (${editRange.sourceEndSec}s @ 30fps), phrases=${lyrics.phrases.length}`);
