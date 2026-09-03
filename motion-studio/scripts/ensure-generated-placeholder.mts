// src/data/startWeddingEdit/generated.ts は歌詞本文を含むため意図的にGit管理外
// (.gitignore)。そのため、権利確認済みlocal音源・歌詞(local/*.local.json、
// local/audio/StaRt.m4a)を持たないCI環境やクリーンチェックアウトでは、
// generated.tsをimportするファイルがtypecheckできず失敗する
// (`Cannot find module './generated'`)。
//
// これはCIが壊れているのではなく、「著作権音源・歌詞をリポジトリに含めない」
// という既存方針(このrepo全体の一貫した運用)の直接の帰結。
//
// このscriptは、実データからsync済みのgenerated.tsが既に存在する場合は
// 一切手を加えない(実データを絶対に上書きしない)。存在しない場合だけ、
// 型を満たす最小限のplaceholder(全フィールド空/0)を書き込み、typecheckが
// 通るようにする。placeholder生成時は、実際のOpening V1のQA gate
// (`check:opening-sound:strict`が「クリーンチェックアウトでは失敗すべき」を
// 明示的に検証しているのと同じ考え方で)本番render時には別途
// `pnpm sync:start-wedding-edit-local`で実データへ置き換わることを前提とする。

import {existsSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const generatedPath = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');

if (existsSync(generatedPath)) {
  console.log('[ensure-generated-placeholder] generated.tsは既に存在する(実データ)。変更しない。');
  process.exit(0);
}

writeFileSync(
  generatedPath,
  `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:timing-master
//
// PLACEHOLDER: local音源・歌詞(local/*.local.json、local/audio/StaRt.m4a)が
// 存在しない環境(CI等)向けの、型だけを満たす空データ。著作権音源・歌詞を
// リポジトリに含めない方針のため、実データはGit管理外。実際のrender/確認は
// 実データを配置した上で pnpm sync:start-wedding-edit-local を実行すること。

import type {LyricPhrase} from './localLyricsWeddingEdit.ts';
import type {LocalEditRange} from './localEditRange.ts';

export type ImportantWord = {
  cueId: string;
  word: string;
  accentSec: number;
  beatSec: number | null;
  timingSource: 'manual' | 'verified-vocal' | 'audio-analysis' | 'beat-snap' | 'estimated';
  verifiedByListening: boolean;
  reviewComment: string | null;
};
export type EnrichedLyricPhrase = LyricPhrase & {
  importantWords: ImportantWord[];
  mapStatus: 'MATCHED' | 'FALLBACK_NO_MAP_ENTRY';
  threeHitCueIds: [string, string, string] | null;
};

export const weddingEditAudioPath: string | null = null;
export const weddingEditDurationInFrames: number = 1;
export const weddingEditFps = 30;
export const weddingEditRange: LocalEditRange = {
  sourceStartSec: 0,
  lastIncludedLyric: '',
  lastIncludedLyricEndSec: 0,
  interludeStartSec: 0,
  interludeEndSec: 0,
  nextExcludedLyricStartSec: 0,
  sourceEndSec: 0,
  fadeOutStartSec: 0,
  fadeOutDurationSec: 0,
  reasonJa: 'PLACEHOLDER(local音源・歌詞が無い環境向け)',
  verifiedByListening: false,
  verificationMethod: 'placeholder',
  verificationNote: 'CI等、local/*.local.jsonとlocal/audio/StaRt.m4aが無い環境向けのplaceholder。',
};
export const weddingEditLyricPhrases: EnrichedLyricPhrase[] = [];
export const weddingEditBeatMap: {beats: number[]; downbeats: number[]; bpm: number} = {beats: [], downbeats: [], bpm: 0};
export const weddingEditMusicGridSource: 'manual' | 'audio-analysis' | 'legacy-import' = 'manual';
export const weddingEditMapsUsed = {structureMap: false, phraseMap: false, wordAccentMap: false, beatMap: false, transitionMap: false};

export type GeneratedLetterCue = {
  cueId: string;
  text: string;
  timeSec: number;
  timingSource: 'manual' | 'verified-vocal' | 'audio-analysis' | 'beat-snap' | 'estimated';
  verifiedByListening: boolean;
};
export type GeneratedEditorialBlock = {
  blockId: string;
  type: string;
  startSec: number;
  endSec: number;
  textLines: string[];
  photoRoles: string[];
  linkedMusicCueIds: string[];
  letterCues?: GeneratedLetterCue[];
};
export const weddingEditEditorialBlocks: GeneratedEditorialBlock[] = [];
export const weddingEditMasterMeta = {masterId: 'placeholder', revision: 0, contentHash: '', audioSha256: ''};
`,
);
console.log('[ensure-generated-placeholder] local音源・歌詞が無いためplaceholder generated.tsを作成した(CI/クリーンチェックアウト向け)。');
