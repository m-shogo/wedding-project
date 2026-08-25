// motion-studio/local/*.local.json (7ファイル)を検証・相互突合し、
// 実音源をsourceEndSecでtrimして public/local-start-wedding-edit/ へコピーする。
//
// 129秒固定・32 slot固定・14 section固定は無効(旧Start129仕様)。
// sourceEndSecが唯一のComposition時間の正本。durationInFramesはここで算出し、
// generated.tsへ焼き込む(Remotion Root登録時に同期的に必要なため)。
//
// 2026-08-26追記(v3): 5つの音楽マップ(structure/phrase/word-accent/beat/
// transition-map.local.json)を「作っただけの資料」にしないため、ここで
// phraseIdをキーに相互突合・統合し、importantWords(word+accentSec+beatSec)を
// 各phraseへ焼き込む。selectedAnimation/transitionIntentが複数ファイル間で
// 矛盾する場合はエラーで停止する(正本の曖昧さを許さない)。
//
// 音源・歌詞本文はGitへ入れない。generated.tsには歌詞本文が含まれるため、
// このファイル自体もgitignore対象(public/local-start-wedding-edit/*と
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
  console.error(`[start-wedding-edit] ❌ ${msg}`);
  hadError = true;
};
const warn = (msg: string) => {
  console.warn(`[start-wedding-edit] ⚠️  ${msg}`);
};

const readJsonIfExists = (name: string): unknown | null => {
  const p = join(localDir, name);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch (e) {
    fail(`${name}: JSON parse失敗: ${(e as Error).message}`);
    return null;
  }
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

// 2. 歌詞データ(base: text / section / timing / selectedAnimation)
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

// 3. 5つの音楽マップを読み込む(存在しない場合はHUMAN_REVIEW_REQUIREDのまま進める)
type PhraseMapEntry = {
  phraseId: string;
  selectedAnimation?: string;
  transitionIntent?: string;
  confidence?: string;
  humanReviewRequired?: boolean;
  holdSec?: number;
  exitSec?: number;
};
type WordAccentEntry = {word: string; phraseId: string; accentSec: number};

const structureMap = readJsonIfExists('structure-map.local.json') as {sections?: unknown[]} | null;
const phraseMap = readJsonIfExists('phrase-map.local.json') as {phrases?: PhraseMapEntry[]} | null;
const wordAccentMap = readJsonIfExists('word-accent-map.local.json') as {words?: WordAccentEntry[]} | null;
const beatMap = readJsonIfExists('beat-map.local.json') as {beats?: number[]; downbeats?: number[]; bpm?: number} | null;
const transitionMap = readJsonIfExists('transition-map.local.json') as {transitions?: Record<string, string>} | null;

const mapsPresent = {
  structureMap: structureMap !== null,
  phraseMap: phraseMap !== null,
  wordAccentMap: wordAccentMap !== null,
  beatMap: beatMap !== null,
  transitionMap: transitionMap !== null,
};
for (const [name, present] of Object.entries(mapsPresent)) {
  if (!present) warn(`${name}が見つからない。該当phraseはhumanReviewRequired=trueのまま、fallback値を使う。`);
}

const phraseMapById = new Map((phraseMap?.phrases ?? []).map((p) => [p.phraseId, p]));
const transitionsById = transitionMap?.transitions ?? {};
const wordsByPhraseId = new Map<string, WordAccentEntry[]>();
for (const w of wordAccentMap?.words ?? []) {
  const arr = wordsByPhraseId.get(w.phraseId) ?? [];
  arr.push(w);
  wordsByPhraseId.set(w.phraseId, arr);
}

const nearestBeat = (t: number): number | null => {
  const beats = beatMap?.beats;
  if (!beats || beats.length === 0) return null;
  let best = beats[0];
  let bestDiff = Math.abs(beats[0] - t);
  for (const b of beats) {
    const d = Math.abs(b - t);
    if (d < bestDiff) {
      best = b;
      bestDiff = d;
    }
  }
  return best;
};

// 4. phraseIdをキーに相互突合し、importantWords/beatSecを統合する
type EnrichedPhrase = (typeof lyrics.phrases)[number] & {
  importantWords: Array<{word: string; accentSec: number; beatSec: number | null}>;
  mapStatus: 'MATCHED' | 'FALLBACK_NO_MAP_ENTRY';
};

const enrichedPhrases: EnrichedPhrase[] = lyrics.phrases.map((p) => {
  const pm = phraseMapById.get(p.phraseId);
  if (phraseMap && !pm) {
    fail(`${p.phraseId}: phrase-map.local.jsonに対応entryが無い`);
  }
  if (pm?.selectedAnimation && p.selectedAnimation && pm.selectedAnimation !== p.selectedAnimation) {
    fail(
      `${p.phraseId}: selectedAnimation不一致 lyrics="${p.selectedAnimation}" phrase-map="${pm.selectedAnimation}"`,
    );
  }
  const tmTransition = transitionsById[p.phraseId];
  if (tmTransition && p.transitionIntent && tmTransition !== p.transitionIntent) {
    fail(`${p.phraseId}: transitionIntent不一致 lyrics="${p.transitionIntent}" transition-map="${tmTransition}"`);
  }

  const words = wordsByPhraseId.get(p.phraseId) ?? [];
  const importantWords = words.map((w) => {
    if (w.accentSec < p.startSec - 0.3 || w.accentSec > p.endSec + 0.3) {
      warn(
        `${p.phraseId}: word-accent-map "${w.word}" accentSec=${w.accentSec}がphrase範囲[${p.startSec},${p.endSec}]から外れている`,
      );
    }
    return {word: w.word, accentSec: w.accentSec, beatSec: nearestBeat(w.accentSec)};
  });

  return {
    ...p,
    transitionIntent: tmTransition ?? p.transitionIntent,
    holdSec: pm?.holdSec ?? p.holdSec,
    exitSec: pm?.exitSec ?? p.exitSec,
    confidence: pm?.confidence ?? p.confidence,
    humanReviewRequired: pm?.humanReviewRequired ?? p.humanReviewRequired ?? true,
    importantWords,
    mapStatus: pm ? 'MATCHED' : 'FALLBACK_NO_MAP_ENTRY',
  };
});

// 5. 音源: local/audio/StaRt.m4a (または start-edit.m4a / start-wedding-edit.m4a) を
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
  console.error('[start-wedding-edit] ローカルデータの検証・音源準備・マップ突合に失敗しました。');
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
//
// v3(2026-08-26): structure/phrase/word-accent/beat/transition-map.local.jsonを
// phraseIdで相互突合・統合済み。importantWords(word+accentSec+beatSec)は
// word-accent-map由来。selectedAnimation/transitionIntentの矛盾はsync時に
// エラーとして検出済み(このファイルが生成できている時点で矛盾なし)。

import type {LyricPhrase} from './localLyricsWeddingEdit.ts';
import type {LocalEditRange} from './localEditRange.ts';

export type ImportantWord = {word: string; accentSec: number; beatSec: number | null};
export type EnrichedLyricPhrase = LyricPhrase & {
  importantWords: ImportantWord[];
  mapStatus: 'MATCHED' | 'FALLBACK_NO_MAP_ENTRY';
};

export const weddingEditAudioPath: string | null = ${audioRelativePath ? JSON.stringify(audioRelativePath) : 'null'};
export const weddingEditDurationInFrames: number = ${durationInFrames};
export const weddingEditFps = 30;
export const weddingEditRange: LocalEditRange = ${JSON.stringify(editRange, null, 2)};
export const weddingEditLyricPhrases: EnrichedLyricPhrase[] = ${JSON.stringify(enrichedPhrases, null, 2)};
export const weddingEditBeatMap: {beats: number[]; downbeats: number[]; bpm: number} = ${JSON.stringify({
    beats: beatMap?.beats ?? [],
    downbeats: beatMap?.downbeats ?? [],
    bpm: beatMap?.bpm ?? 0,
  })};
export const weddingEditMapsUsed = ${JSON.stringify(mapsPresent)};
`,
);
const matchedCount = enrichedPhrases.filter((p) => p.mapStatus === 'MATCHED').length;
console.log(
  `[start-wedding-edit] generated.ts 更新: durationInFrames=${durationInFrames} (${editRange.sourceEndSec}s @ 30fps), phrases=${lyrics.phrases.length}, phrase-map突合=${matchedCount}/${lyrics.phrases.length}, importantWords付きphrase=${enrichedPhrases.filter((p) => p.importantWords.length > 0).length}`,
);
