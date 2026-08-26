// local/start-wedding-timing-master.local.json(唯一の正本)から
// generated.ts(既存consumer互換の形)とpublic/local-start-wedding-edit/(音源trim)を
// 生成する。旧sync-start-wedding-edit-local.mtsが読んでいた7ファイルへ直接依存する
// consumerは今後増やさない: 新しい演出はすべてこのmasterを経由する。
//
// 音源sha256チェック: master.audio.sha256が実ファイルと一致しない場合、
// 古いタイミングを別音源へ流用する事故を防ぐため、renderを停止する
// (--allow-hash-mismatchで明示的に無視できるが、既定では停止)。

import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {msToSec} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const publicDir = join(studioRoot, 'public/local-start-wedding-edit');
const audioOutDir = join(publicDir, 'audio');
const allowHashMismatch = process.argv.includes('--allow-hash-mismatch');

if (!existsSync(masterPath)) {
  console.error('[sync-timing-master] ❌ local/start-wedding-timing-master.local.json が無い。');
  console.error('   先に node --no-warnings scripts/migrate-start-wedding-timing-master.mts を実行してください。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;

const audioDir = join(localDir, 'audio');
const audioPath = join(audioDir, master.audio.fileName);
if (!existsSync(audioPath)) {
  console.error(`[sync-timing-master] ❌ 音源が見つからない: local/audio/${master.audio.fileName}`);
  process.exit(1);
}
const actualSha256 = createHash('sha256').update(readFileSync(audioPath)).digest('hex');
if (actualSha256 !== master.audio.sha256) {
  const msg = `音源が変更されています。master.audio.sha256=${master.audio.sha256.slice(0, 12)}... 実ファイル=${actualSha256.slice(0, 12)}... タイミング再確認が必要(migrate-start-wedding-timing-masterを再実行してください)。`;
  if (allowHashMismatch) {
    console.warn(`[sync-timing-master] ⚠️  ${msg} (--allow-hash-mismatchのため続行)`);
  } else {
    console.error(`[sync-timing-master] ❌ ${msg}`);
    console.error('   render/syncを停止します。意図的に無視する場合のみ --allow-hash-mismatch を付けてください。');
    process.exit(1);
  }
}

mkdirSync(publicDir, {recursive: true});
mkdirSync(audioOutDir, {recursive: true});

// 音源をcandidateEndMs(またはconfirmedEndMsがあればそちら)でtrimする。
const effectiveEndMs = master.audio.confirmedEndMs ?? master.audio.candidateEndMs;
const sourceStartSec = msToSec(master.audio.sourceStartMs);
const sourceEndSec = msToSec(effectiveEndMs);
const fadeOutStartSec = master.audio.fadeOutStartMs != null ? msToSec(master.audio.fadeOutStartMs) : sourceEndSec - 0.5;
const fadeOutDurationSec = master.audio.fadeOutDurationMs != null ? msToSec(master.audio.fadeOutDurationMs) : 0.5;
const outAudioPath = join(audioOutDir, 'start-wedding-edit.m4a');
try {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-ss', String(sourceStartSec),
      '-to', String(sourceEndSec),
      '-i', audioPath,
      '-af', `afade=t=out:st=${fadeOutStartSec}:d=${fadeOutDurationSec}`,
      '-c:a', 'aac',
      '-b:a', '256k',
      outAudioPath,
    ],
    {stdio: 'pipe'},
  );
} catch (e) {
  console.error(`[sync-timing-master] ❌ ffmpeg trim失敗: ${(e as Error).message}`);
  process.exit(1);
}
const audioRelativePath = 'local-start-wedding-edit/audio/start-wedding-edit.m4a';

// --- generated.tsを既存consumer互換の形で書き出す ---------------------------
// EnrichedLyricPhrase.importantWords形状は既存consumer(weddingLyricLine.tsx等)が
// 前提にしているため、cue(kind='word-accent'|'syllable-hit')から同じ形へ変換する。
type ImportantWordOut = {
  word: string;
  accentSec: number;
  beatSec: number | null;
  timingSource: 'manual' | 'beat-snap';
  verifiedByListening: boolean;
  reviewComment: string | null;
};

const enrichedPhrases = master.phrases.map((p) => {
  const wordCues = p.cues.filter((c) => c.kind === 'word-accent');
  const importantWords: ImportantWordOut[] = wordCues.map((c) => ({
    word: c.text,
    accentSec: msToSec(c.timeMs),
    beatSec: null,
    // 既存EnrichedLyricPhrase.importantWords.timingSourceは'manual'|'beat-snap'の2値。
    // master側の5値(manual/verified-vocal/audio-analysis/beat-snap/estimated)のうち
    // manual以外はすべて'beat-snap'として扱う(既存consumerの型を壊さないための
    // 意図的な単純化。真のtimingSourceはmasterの方に残っている)。
    timingSource: c.timingSource === 'manual' ? 'manual' : 'beat-snap',
    verifiedByListening: c.verifiedByListening,
    reviewComment: c.reviewComment || null,
  }));
  const hitCues = p.cues.filter((c) => c.kind === 'syllable-hit').sort((a, b) => a.timeMs - b.timeMs);
  return {
    phraseId: p.phraseId,
    lineNumber: p.lineNumber,
    sectionId: p.sectionId,
    text: p.text,
    startSec: msToSec(p.startMs),
    endSec: msToSec(p.endMs),
    emphasisWord: null as string | null,
    threeHitFrameSecs: hitCues.length > 0 ? hitCues.map((c) => msToSec(c.timeMs)) : null,
    rhythmType: p.rhythmType,
    semanticType: p.semanticType,
    selectedAnimation: p.selectedAnimation,
    transitionIntent: p.transitionIntent,
    holdSec: p.holdMs != null ? msToSec(p.holdMs) : null,
    exitSec: p.exitMs != null ? msToSec(p.exitMs) : null,
    confidence: p.confidence,
    humanReviewRequired: p.humanReviewRequired,
    importantWords,
    mapStatus: 'MATCHED' as const,
  };
});

const durationInFrames = Math.ceil(sourceEndSec * 30);

const generatedOut = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');
writeFileSync(
  generatedOut,
  `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:timing-master (旧: sync:start-wedding-edit-local。移行済み)
//
// v5(2026-08-26): timing正本をStaRtタイミングマスター
// (local/start-wedding-timing-master.local.json)へ一本化。旧7ファイル
// (structure/phrase/word-accent/beat/transition-map + start-wedding-edit.local.json
// + word-accent-map.manual-overrides.local.json)はmigrate-start-wedding-timing-master.mts
// が読む「入力資料」へ降格し、このgenerated.tsはmasterから機械的に導出される
// view専用ファイルになった。masterId=${JSON.stringify(master.masterId)}
// revision=${master.revision}

import type {LyricPhrase} from './localLyricsWeddingEdit.ts';
import type {LocalEditRange} from './localEditRange.ts';

export type ImportantWord = {
  word: string;
  accentSec: number;
  beatSec: number | null;
  timingSource: 'manual' | 'beat-snap';
  verifiedByListening: boolean;
  reviewComment: string | null;
};
export type EnrichedLyricPhrase = LyricPhrase & {
  importantWords: ImportantWord[];
  mapStatus: 'MATCHED' | 'FALLBACK_NO_MAP_ENTRY';
};

export const weddingEditAudioPath: string | null = ${JSON.stringify(audioRelativePath)};
export const weddingEditDurationInFrames: number = ${durationInFrames};
export const weddingEditFps = 30;
export const weddingEditRange: LocalEditRange = ${JSON.stringify(
    {
      sourceStartSec,
      lastIncludedLyric: '',
      lastIncludedLyricEndSec: sourceEndSec,
      interludeStartSec: sourceEndSec,
      interludeEndSec: sourceEndSec,
      nextExcludedLyricStartSec: sourceEndSec,
      sourceEndSec,
      fadeOutStartSec,
      fadeOutDurationSec,
      reasonJa: `StaRtタイミングマスター(revision=${master.revision})由来。candidateEndMs=${master.audio.candidateEndMs}ms、confirmedEndMs=${master.audio.confirmedEndMs}。confirmedEndMsがnullの間、この値は候補でありfinalではない。`,
      verifiedByListening: master.audio.confirmedEndMs != null && master.audio.verifiedByListening,
      verificationMethod: 'start-wedding-timing-master',
      verificationNote: master.audio.confirmedEndMs == null ? 'candidateEndMsのまま。Dashboardの終了位置確認UIで人間が確定するまでfinal扱いしない。' : '人間がDashboardで確定済み。',
    },
    null,
    2,
  )};
export const weddingEditLyricPhrases: EnrichedLyricPhrase[] = ${JSON.stringify(enrichedPhrases, null, 2)};
export const weddingEditBeatMap: {beats: number[]; downbeats: number[]; bpm: number} = {beats: [], downbeats: [], bpm: 0};
export const weddingEditMapsUsed = {structureMap: true, phraseMap: true, wordAccentMap: true, beatMap: true, transitionMap: true};

// --- v5追加: masterからの直接派生(editorialBlocks/timing masterの生値) -------
// 既存EnrichedLyricPhraseと違い、これらは今後の演出(冒頭ウェルカム等)が
// masterのeditorialBlocksへ直接アクセスするための素の値(秒変換済み)。
export type GeneratedEditorialBlock = {
  blockId: string;
  type: string;
  startSec: number;
  endSec: number;
  textLines: string[];
  photoRoles: string[];
};
export const weddingEditEditorialBlocks: GeneratedEditorialBlock[] = ${JSON.stringify(
    master.editorialBlocks.map((b) => ({
      blockId: b.blockId,
      type: b.type,
      startSec: msToSec(b.startMs),
      endSec: msToSec(b.endMs),
      textLines: b.textLines,
      photoRoles: b.photoRoles,
    })),
    null,
    2,
  )};
export const weddingEditMasterMeta = ${JSON.stringify({masterId: master.masterId, revision: master.revision, audioSha256: master.audio.sha256}, null, 2)};
`,
);

const totalCues = master.phrases.reduce((n, p) => n + p.cues.length, 0);
const verifiedCues = master.phrases.reduce((n, p) => n + p.cues.filter((c) => c.verifiedByListening).length, 0);
console.log(
  `[sync-timing-master] generated.ts更新: masterId=${master.masterId} revision=${master.revision} durationInFrames=${durationInFrames}(${sourceEndSec}s) phrases=${enrichedPhrases.length} cues=${totalCues}(verified=${verifiedCues}) editorialBlocks=${master.editorialBlocks.length}`,
);
if (master.audio.confirmedEndMs == null) {
  console.warn('[sync-timing-master] ⚠️  終了位置は未確定(candidateEndMsのまま)。145.6秒相当をfinalとして扱っていません。');
}
if (verifiedCues === 0) {
  console.warn('[sync-timing-master] ⚠️  聴取確認済みcueが0件。全timingは推定/beat-snap/audio-analysisのまま。');
}

// --- render metadata(staleness判定用) ---------------------------------------
writeFileSync(
  join(studioRoot, 'src/data/startWeddingEdit/generated.meta.json'),
  JSON.stringify(
    {
      masterId: master.masterId,
      masterRevision: master.revision,
      audioSha256: master.audio.sha256,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  ) + '\n',
);
