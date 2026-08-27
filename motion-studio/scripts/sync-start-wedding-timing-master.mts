// local/start-wedding-timing-master.local.json(唯一の正本)から
// generated.ts(既存consumer互換の形)とpublic/local-start-wedding-edit/(音源trim)を
// 生成する。旧sync-start-wedding-edit-local.mtsが読んでいた7ファイルへ直接依存する
// consumerは今後増やさない: 新しい演出はすべてこのmasterを経由する。
//
// 重要: このscriptはmasterを読むだけで、一切書き換えない。legacy 7ファイルからの
// migrationは別script(migrate-start-wedding-timing-master.mts、通常dev/render/QAの
// 導線には含まれない)でのみ行う。
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
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const publicDir = join(studioRoot, 'public/local-start-wedding-edit');
const audioOutDir = join(publicDir, 'audio');
const allowHashMismatch = process.argv.includes('--allow-hash-mismatch');

if (!existsSync(masterPath)) {
  console.error('[sync-timing-master] ❌ local/start-wedding-timing-master.local.json が無い。');
  console.error('   初回のみ: pnpm import:legacy-timing-master:apply を実行してください。');
  console.error('   (このsync scriptはmasterを読むだけで、旧ファイルからの再生成は行いません)');
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
  const msg = `音源が変更されています。master.audio.sha256=${master.audio.sha256.slice(0, 12)}... 実ファイル=${actualSha256.slice(0, 12)}... タイミング再確認が必要(pnpm import:legacy-timing-master:apply を再実行してください)。`;
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

// --- 時間変換: sourceStartMs != 0 でも正しくなるよう、すべての絶対時刻(ms)を
// 「trim後の編集timeline上の秒(0始まり)」へ変換する共通関数を使う。
// globalContentOffsetMsもここで一括適用する(previewLatencyOffsetMsは
// ブラウザ再生専用でrenderへは混ぜない)。 ------------------------------------
const {sourceStartMs, globalContentOffsetMs} = master.audio;
const effectiveEndMs = master.audio.confirmedEndMs ?? master.audio.candidateEndMs;
const toEditSec = (absoluteMs: number): number => (absoluteMs + globalContentOffsetMs - sourceStartMs) / 1000;

// 重要: cue単体の時刻は、上のtoEditSec()(globalContentOffsetMsのみ適用)ではなく、
// resolveEffectiveCueTimeMs()(global+phrase+cue offsetを二重適用なく合成する
// 唯一の正本関数)を経由して変換する。resolveEffectiveCueTimeMs()の戻り値は
// globalContentOffsetMs適用後の絶対msなので、ここではsourceStartMsの控除だけ行う
// (toEditSec()を再度通すとglobalContentOffsetMsが二重に加算されてしまう)。
const toEditSecForCue = (cue: Pick<TimingMaster['phrases'][number]['cues'][number], 'timeMs' | 'cueOffsetMs'>, phrase: Pick<TimingMaster['phrases'][number], 'phraseOffsetMs'>): number =>
  (resolveEffectiveCueTimeMs(cue, phrase, master.audio) - sourceStartMs) / 1000;

const sourceStartSec = sourceStartMs / 1000;
const sourceEndSec = effectiveEndMs / 1000;
const fadeOutStartSec = master.audio.fadeOutStartMs != null ? toEditSec(master.audio.fadeOutStartMs) : (effectiveEndMs - sourceStartMs) / 1000 - 0.5;
const fadeOutDurationSec = master.audio.fadeOutDurationMs != null ? master.audio.fadeOutDurationMs / 1000 : 0.5;
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
// 重要な訂正: 以前はtimingSourceを'manual'|'beat-snap'の2値へ潰していたため、
// verified-vocal/audio-analysis/estimatedが区別できなかった。ここでmaster側の
// 5値をそのまま出力する(ImportantWord.timingSourceの型を拡張)。
type TimingSourceOut = 'manual' | 'verified-vocal' | 'audio-analysis' | 'beat-snap' | 'estimated';
type ImportantWordOut = {
  cueId: string;
  word: string;
  accentSec: number;
  beatSec: number | null;
  timingSource: TimingSourceOut;
  verifiedByListening: boolean;
  reviewComment: string | null;
};

const nearestBeatSec = (sec: number): number | null => {
  const beats = master.musicGrid.beatsMs;
  if (beats.length === 0) return null;
  let best = beats[0];
  let bestDiff = Math.abs(beats[0] - sec * 1000);
  for (const b of beats) {
    const d = Math.abs(b - sec * 1000);
    if (d < bestDiff) {
      best = b;
      bestDiff = d;
    }
  }
  return toEditSec(best);
};

const enrichedPhrases = master.phrases.map((p) => {
  const wordCues = p.cues.filter((c) => c.kind === 'word-accent');
  const importantWords: ImportantWordOut[] = wordCues.map((c) => ({
    cueId: c.cueId,
    word: c.text,
    accentSec: toEditSecForCue(c, p),
    beatSec: nearestBeatSec(toEditSecForCue(c, p)),
    timingSource: c.timingSource,
    verifiedByListening: c.verifiedByListening,
    reviewComment: c.reviewComment || null,
  }));
  const hitCues = p.cues.filter((c) => c.kind === 'syllable-hit').sort((a, b) => a.timeMs - b.timeMs);
  return {
    phraseId: p.phraseId,
    lineNumber: p.lineNumber,
    sectionId: p.sectionId,
    text: p.text,
    startSec: toEditSec(p.startMs),
    endSec: toEditSec(p.endMs),
    emphasisWord: null as string | null,
    threeHitFrameSecs: hitCues.length > 0 ? hitCues.map((c) => toEditSecForCue(c, p)) : null,
    // P0-4(2026-08-27、Render Truth再監査): threeHitFrameSecsは基底LyricPhrase
    // schema(zod tuple)のため型を変更できないが、これだけではcue identity
    // (どのcueIdがどのindexか)が失われ、post60-regression等でcueId厳密照合が
    // できない。同じ並び順(timeMs昇順)でthreeHitCueIdsを別fieldとして
    // 追加し、index対応でcueIdを引けるようにする。
    threeHitCueIds: hitCues.length > 0 ? hitCues.map((c) => c.cueId) : null,
    rhythmType: p.rhythmType,
    semanticType: p.semanticType,
    selectedAnimation: p.selectedAnimation,
    transitionIntent: p.transitionIntent,
    holdSec: p.holdMs != null ? toEditSec(p.holdMs) : null,
    exitSec: p.exitMs != null ? toEditSec(p.exitMs) : null,
    confidence: p.confidence,
    humanReviewRequired: p.humanReviewRequired,
    importantWords,
    mapStatus: 'MATCHED' as const,
  };
});

// 重要な訂正: sourceStartMs != 0 の場合、durationInFramesは
// `sourceEndSec(絶対秒) * fps` ではなく、trim後の実尺
// `(effectiveEndMs - sourceStartMs) / 1000 * fps` でなければならない。
const editDurationSec = (effectiveEndMs - sourceStartMs) / 1000;
const durationInFrames = Math.ceil(editDurationSec * 30);

// 重要な訂正: 以前はbeats/downbeats/bpmを空配列/0で出力しており、
// 「StaRt文字は実測beat同期」という説明が事実と異なっていた。
// masterのmusicGridをそのまま(編集timelineの秒へ変換して)出力する。
const beatsOut = master.musicGrid.beatsMs.map(toEditSec).filter((s) => s >= 0 && s <= editDurationSec);
const downbeatsOut = master.musicGrid.downbeatsMs.map(toEditSec).filter((s) => s >= 0 && s <= editDurationSec);

const generatedOut = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');
writeFileSync(
  generatedOut,
  `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:timing-master (masterを読むだけ。旧7ファイルからの再migrationはしない)
//
// v7(2026-08-26、offset architecture分離): masterId=${JSON.stringify(master.masterId)}
// revision=${master.revision} contentHash=${JSON.stringify(master.contentHash.slice(0, 16))}
// - timingSourceを5値(manual/verified-vocal/audio-analysis/beat-snap/estimated)へ復元
// - musicGrid(beats/downbeats/bpm)をmasterから正しく出力(以前は空配列/0だった)
// - globalContentOffsetMs・sourceStartMsを正しく時間変換へ反映
// - cue単体の時刻はresolveEffectiveCueTimeMs()経由でphraseOffsetMs/cueOffsetMsも合成
//   (二重適用防止のため、cue.timeMsへ個別にoffsetを足し込む処理は他に存在しない)

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
  /** threeHitFrameSecs(基底LyricPhrase由来のnumber tuple)と同じ並び順
   * (timeMs昇順)のcueId列。post60-regression等でのcueId厳密照合に使う。 */
  threeHitCueIds: [string, string, string] | null;
};

export const weddingEditAudioPath: string | null = ${JSON.stringify(audioRelativePath)};
export const weddingEditDurationInFrames: number = ${durationInFrames};
export const weddingEditFps = 30;
export const weddingEditRange: LocalEditRange = ${JSON.stringify(
    {
      sourceStartSec,
      lastIncludedLyric: '',
      lastIncludedLyricEndSec: editDurationSec,
      interludeStartSec: editDurationSec,
      interludeEndSec: editDurationSec,
      nextExcludedLyricStartSec: editDurationSec,
      sourceEndSec: editDurationSec,
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
export const weddingEditBeatMap: {beats: number[]; downbeats: number[]; bpm: number} = ${JSON.stringify({
    beats: beatsOut,
    downbeats: downbeatsOut,
    bpm: master.musicGrid.bpm ?? 0,
  })};
export const weddingEditMusicGridSource: 'manual' | 'audio-analysis' | 'legacy-import' = ${JSON.stringify(master.musicGrid.source)};
export const weddingEditMapsUsed = {structureMap: true, phraseMap: true, wordAccentMap: true, beatMap: true, transitionMap: true};

// --- masterからの直接派生(editorialBlocks) -----------------------------------
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
export const weddingEditEditorialBlocks: GeneratedEditorialBlock[] = ${JSON.stringify(
    master.editorialBlocks.map((b) => ({
      blockId: b.blockId,
      type: b.type,
      startSec: toEditSec(b.startMs),
      endSec: toEditSec(b.endMs),
      textLines: b.textLines,
      photoRoles: b.photoRoles,
      linkedMusicCueIds: b.linkedMusicCueIds,
      letterCues: b.letterCues?.map((c) => ({
        cueId: c.cueId,
        text: c.text,
        timeSec: toEditSec(c.timeMs),
        timingSource: c.timingSource,
        verifiedByListening: c.verifiedByListening,
      })),
    })),
    null,
    2,
  )};
export const weddingEditMasterMeta = ${JSON.stringify(
    {masterId: master.masterId, revision: master.revision, contentHash: master.contentHash, audioSha256: master.audio.sha256},
    null,
    2,
  )};
`,
);

const totalCues = master.phrases.reduce((n, p) => n + p.cues.length, 0);
const verifiedCues = master.phrases.reduce((n, p) => n + p.cues.filter((c) => c.verifiedByListening).length, 0);
console.log(
  `[sync-timing-master] generated.ts更新: masterId=${master.masterId} revision=${master.revision} durationInFrames=${durationInFrames}(${editDurationSec}s) phrases=${enrichedPhrases.length} cues=${totalCues}(verified=${verifiedCues}) editorialBlocks=${master.editorialBlocks.length} musicGrid.beats=${beatsOut.length}(source=${master.musicGrid.source})`,
);
if (master.audio.confirmedEndMs == null) {
  console.warn('[sync-timing-master] ⚠️  終了位置は未確定(candidateEndMsのまま)。145.6秒相当をfinalとして扱っていません。');
}
if (verifiedCues === 0) {
  console.warn('[sync-timing-master] ⚠️  聴取確認済みcueが0件。全timingは推定/beat-snap/audio-analysisのまま。');
}
if (beatsOut.length === 0) {
  console.warn('[sync-timing-master] ⚠️  musicGrid.beatsMsが空。StaRt文字等は均等fallback(estimated)になります。');
}

// --- render metadata(staleness判定用) ---------------------------------------
writeFileSync(
  join(studioRoot, 'src/data/startWeddingEdit/generated.meta.json'),
  JSON.stringify(
    {
      masterId: master.masterId,
      masterRevision: master.revision,
      masterContentHash: master.contentHash,
      audioSha256: master.audio.sha256,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  ) + '\n',
);
