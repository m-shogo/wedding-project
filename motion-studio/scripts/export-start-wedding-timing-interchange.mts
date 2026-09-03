// StaRt Wedding EditのTimingMasterから、歌詞本文・音源実体を含まない
// AI/編集ソフト向けinterchangeを生成する。
//
// 出力はlocal/配下(Git管理外):
// - timing-master.ai.local.json: provenance/補正/信頼度を持つ機械可読JSON
// - timing-master.slots.local.vtt: LYRIC_###だけを表示するWebVTT
// - timing-master.slots.local.srt: LYRIC_###だけを表示するSRT
// - timing-master.interchange-manifest.local.json: 上記3ファイルの同一性を検証するSHA-256 manifest

// 実歌詞との対応は同じ順序のslotId/phraseIdでローカルTimingMasterを参照する。
// Gitへ歌詞本文・音源名・派生音声を出さない既存方針を維持する。

import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs, resolveEffectivePhraseEndMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');
const outDir = join(studioRoot, 'local/analysis/start-wedding/interchange');
const jsonPath = join(outDir, 'timing-master.ai.local.json');
const vttPath = join(outDir, 'timing-master.slots.local.vtt');
const srtPath = join(outDir, 'timing-master.slots.local.srt');
const manifestPath = join(outDir, 'timing-master.interchange-manifest.local.json');

if (!existsSync(masterPath)) {
  console.error('❌ local/start-wedding-timing-master.local.json が無い。');
  process.exit(1);
}

const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const {sourceStartMs, globalContentOffsetMs} = master.audio;
const slotId = (index: number) => `LYRIC_${String(index + 1).padStart(3, '0')}`;
const toEditMs = (effectiveSourceMs: number) => effectiveSourceMs - sourceStartMs;
const roundMs = (value: number) => Math.round(value * 10) / 10;

const rawPhrases = master.phrases.map((phrase, index) => {
  const onset = phrase.cues.find((cue) => cue.kind === 'phrase-onset');
  const effectiveStartSourceMs = onset
    ? resolveEffectiveCueTimeMs(onset, phrase, master.audio)
    : phrase.startMs + globalContentOffsetMs + phrase.phraseOffsetMs;
  const effectiveEndSourceMs = resolveEffectivePhraseEndMs(phrase, master.audio);
  const cues = phrase.cues.map((cue) => {
    const effectiveSourceMs = resolveEffectiveCueTimeMs(cue, phrase, master.audio);
    const totalAdjustmentMs = globalContentOffsetMs + phrase.phraseOffsetMs + cue.cueOffsetMs;
    return {
      cueId: cue.cueId,
      kind: cue.kind,
      occurrenceIndex: cue.occurrenceIndex,
      sourceTimeMs: roundMs(cue.timeMs),
      adjustmentMs: {
        global: roundMs(globalContentOffsetMs),
        phrase: roundMs(phrase.phraseOffsetMs),
        cue: roundMs(cue.cueOffsetMs),
        total: roundMs(totalAdjustmentMs),
      },
      effectiveSourceTimeMs: roundMs(effectiveSourceMs),
      editTimeMs: roundMs(toEditMs(effectiveSourceMs)),
      timingSource: cue.timingSource,
      verifiedByListening: cue.verifiedByListening,
      confidence: cue.confidence,
      confidenceScore: cue.confidenceScore,
      analysis: cue.analysisMethod
        ? {method: cue.analysisMethod, detectedAtMs: cue.detectedAtMs == null ? null : roundMs(cue.detectedAtMs)}
        : null,
      issueCodes: [
        ...(cue.cueOffsetMs !== 0 ? ['TIMING_ADJUSTMENT_APPLIED'] : []),
        ...(!cue.verifiedByListening ? ['HUMAN_LISTENING_REQUIRED'] : []),
      ],
      note:
        cue.cueOffsetMs !== 0
          ? `cue offset ${cue.cueOffsetMs > 0 ? '+' : ''}${roundMs(cue.cueOffsetMs)}ms applied`
          : cue.verifiedByListening
            ? 'human listening verified'
            : 'human listening not yet verified',
    };
  });
  return {
    slotId: slotId(index),
    phraseId: phrase.phraseId,
    order: index + 1,
    lineNumber: phrase.lineNumber,
    sectionId: phrase.sectionId,
    sourceRangeMs: {start: roundMs(effectiveStartSourceMs), end: roundMs(effectiveEndSourceMs)},
    editRangeMs: {start: roundMs(toEditMs(effectiveStartSourceMs)), end: roundMs(toEditMs(effectiveEndSourceMs))},
    endAdjustmentMs: roundMs(phrase.endOffsetMs),
    endVerifiedByListening: phrase.endVerifiedByListening,
    timingStatus: onset?.verifiedByListening ? 'HUMAN_VERIFIED_ONSET' : 'HUMAN_REVIEW_REQUIRED',
    confidence: phrase.confidence,
    motion: {
      rhythmType: phrase.rhythmType,
      semanticType: phrase.semanticType,
      selectedAnimation: phrase.selectedAnimation,
      transitionIntent: phrase.transitionIntent,
    },
    cues,
  };
});

// 原始endは解析/編集の根拠として保持し、字幕表示だけは次phraseの補正済みonsetへ
// クランプする。onsetを早めた際に前後2つの歌詞slotが同時表示されるのを防ぐ。
const phrases = rawPhrases.map((phrase, index) => {
  const next = rawPhrases[index + 1];
  const unclampedEnd = phrase.editRangeMs.end;
  const displayEnd = next ? Math.min(unclampedEnd, next.editRangeMs.start) : unclampedEnd;
  return {
    ...phrase,
    displayRangeMs: {
      start: phrase.editRangeMs.start,
      end: roundMs(Math.max(phrase.editRangeMs.start + 1, displayEnd)),
    },
    displayPolicy: displayEnd < unclampedEnd ? 'END_CLAMPED_TO_NEXT_EFFECTIVE_ONSET' : 'SOURCE_END',
  };
});

const interchange = {
  schemaVersion: 'start-wedding-timing-interchange/v1',
  authority: 'DERIVED_FROM_LOCAL_TIMING_MASTER',
  master: {
    id: master.masterId,
    revision: master.revision,
    contentHash: master.contentHash,
    status: master.status,
  },
  safety: {
    containsLyricText: false,
    containsAudio: false,
    containsAudioFileName: false,
    joinKey: 'slotId + phraseId + order',
    overlapPolicy: 'WebVTT/SRT use displayRangeMs; each end is clamped to the next effective phrase onset',
  },
  audioRef: {
    sha256: master.audio.sha256,
    durationMs: master.audio.durationMs,
    sourceStartMs: master.audio.sourceStartMs,
    candidateEndMs: master.audio.candidateEndMs,
    confirmedEndMs: master.audio.confirmedEndMs,
    verifiedByListening: master.audio.verifiedByListening,
  },
  verification: master.verification,
  provenance: {
    timingMasterUpdatedAt: master.provenance.updatedAt,
    analysisRunId: master.analysisRun?.runId ?? null,
    analysisTool: master.analysisRun?.tool ?? null,
  },
  phrases,
};

const formatVttTime = (ms: number): string => {
  const safeMs = Math.max(0, Math.round(ms));
  const hours = Math.floor(safeMs / 3_600_000);
  const minutes = Math.floor((safeMs % 3_600_000) / 60_000);
  const seconds = Math.floor((safeMs % 60_000) / 1000);
  const millis = safeMs % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
};

const vtt = [
  'WEBVTT',
  '',
  `NOTE masterId=${master.masterId} revision=${master.revision} lyrics=redacted`,
  '',
  ...phrases.flatMap((phrase) => [
    phrase.phraseId,
    `${formatVttTime(phrase.displayRangeMs.start)} --> ${formatVttTime(phrase.displayRangeMs.end)}`,
    `${phrase.slotId} | ${phrase.phraseId} | ${phrase.sectionId} | ${phrase.timingStatus}`,
    '',
  ]),
].join('\n');

const formatSrtTime = (ms: number): string => formatVttTime(ms).replace('.', ',');
const srt = phrases
  .flatMap((phrase, index) => [
    String(index + 1),
    `${formatSrtTime(phrase.displayRangeMs.start)} --> ${formatSrtTime(phrase.displayRangeMs.end)}`,
    `${phrase.slotId} | ${phrase.phraseId} | ${phrase.sectionId} | ${phrase.timingStatus}`,
    '',
  ])
  .join('\n');

const json = JSON.stringify(interchange, null, 2) + '\n';
const vttOutput = vtt + '\n';
const srtOutput = srt + '\n';
// 将来field追加時に本文や音源名が紛れ込んでも出力前に止めるfail-closed検査。
for (const phrase of master.phrases) {
  if (phrase.text.length >= 3 && (json.includes(phrase.text) || vtt.includes(phrase.text) || srt.includes(phrase.text))) {
    throw new Error(`${phrase.phraseId}: 歌詞本文がinterchangeへ混入したため出力を停止`);
  }
}
if (json.includes(master.audio.fileName) || vtt.includes(master.audio.fileName) || srt.includes(master.audio.fileName)) {
  throw new Error('音源ファイル名がinterchangeへ混入したため出力を停止');
}
for (const phrase of phrases) {
  if (phrase.editRangeMs.end <= phrase.editRangeMs.start || phrase.displayRangeMs.end <= phrase.displayRangeMs.start) {
    throw new Error(`${phrase.phraseId}: VTT/JSONの表示範囲が不正`);
  }
}

mkdirSync(outDir, {recursive: true});
writeFileSync(jsonPath, json);
writeFileSync(vttPath, vttOutput);
writeFileSync(srtPath, srtOutput);

const sha256 = (content: string): string => createHash('sha256').update(content).digest('hex');
const manifestFiles = [
  {role: 'AI_TIMING_JSON', fileName: jsonPath.split('/').at(-1)!, content: json},
  {role: 'WEBVTT_SLOT_TIMING', fileName: vttPath.split('/').at(-1)!, content: vttOutput},
  {role: 'SRT_SLOT_TIMING', fileName: srtPath.split('/').at(-1)!, content: srtOutput},
].map(({content, ...file}) => ({
  ...file,
  sha256: sha256(content),
  bytes: Buffer.byteLength(content, 'utf8'),
}));
const manifest = {
  schemaVersion: 'start-wedding-timing-interchange-manifest/v1',
  master: {
    id: master.masterId,
    revision: master.revision,
    contentHash: master.contentHash,
  },
  counts: {
    phrases: phrases.length,
    cues: phrases.reduce((sum, phrase) => sum + phrase.cues.length, 0),
  },
  safety: {
    containsLyricText: false,
    containsAudio: false,
    containsAudioFileName: false,
  },
  files: manifestFiles,
  bundleSha256: sha256(manifestFiles.map((file) => `${file.fileName}:${file.sha256}`).join('\n')),
};
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`[export-timing-interchange] JSON: ${jsonPath}`);
console.log(`[export-timing-interchange] WebVTT: ${vttPath}`);
console.log(`[export-timing-interchange] SRT: ${srtPath}`);
console.log(`[export-timing-interchange] manifest: ${manifestPath}`);
console.log(`[export-timing-interchange] phrases=${phrases.length} cues=${phrases.reduce((sum, phrase) => sum + phrase.cues.length, 0)} lyrics=redacted audio=not-included`);
