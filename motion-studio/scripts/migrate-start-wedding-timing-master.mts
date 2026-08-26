// 既存7ファイル(structure/phrase/word-accent/beat/transition-map +
// start-wedding-edit.local.json + word-accent-map.manual-overrides.local.json)から
// local/start-wedding-timing-master.local.json(唯一の正本)を生成する。
//
// 重要な訂正(コードレビュー指摘対応): このscriptは通常のdev/render/QAからは
// 実行しない。通常導線は sync-start-wedding-timing-master.mts(masterを読むだけ、
// 書き換えない)。このscriptは「初回のlegacy import」または「明示的な再取り込み」
// でのみ人間が実行する。package.jsonでは既定でdry-run(import:legacy-timing-master)、
// 実際に書き込む場合は import:legacy-timing-master:apply を明示的に叩く。
//
// 安全性の要件(元ファイルを壊さない):
//   - 元ファイルを上書き・削除しない(読むだけ)
//   - manual値(manual-overrides由来)を必ず最優先する
//   - 既存masterが既にある場合、その中のverifiedByListening=true/timingSource='manual'な
//     値を新しい派生値で上書きしない(再実行しても人間の確認結果を消さない)
//   - --dry-run で書き込まず差分だけ表示できる(既定)
//   - revisionはcanonical content hashが変わった場合だけ増やす(timestamp等の
//     揮発フィールドは対象外。同じ入力で再実行してもrevisionは増えない)
//   - 実際に書き込む場合、実行のたびにtimestamp付きbackupを local/_backups/ へ残す
//
// 使い方:
//   node --no-warnings scripts/migrate-start-wedding-timing-master.mts --dry-run (既定)
//   node --no-warnings scripts/migrate-start-wedding-timing-master.mts --apply

import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {CoupleProfile} from '../src/data/startWeddingEdit/coupleProfile.ts';
import {parseCoupleProfile, EMPTY_COUPLE_PROFILE} from '../src/data/startWeddingEdit/coupleProfile.ts';
import type {
  EditorialBlock,
  LetterCue,
  MusicCue,
  MusicGrid,
  SectionKind,
  TimingMaster,
  TimingPhrase,
  TimingSection,
  VocalCue,
} from '../src/data/startWeddingEdit/timingMaster.ts';
import {TIMING_MASTER_SCHEMA_VERSION, canonicalMasterPayloadForHash, countVerification, nearestBeatMs, secToMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
// 既定はdry-run。書き込むには明示的に--applyを渡す(--dry-runも受け付けるが冗長)。
const isApply = process.argv.includes('--apply');
const isDryRun = !isApply;

const readJson = <T,>(name: string): T | null => {
  const p = join(localDir, name);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, 'utf8')) as T;
};

let hadError = false;
const fail = (msg: string) => {
  console.error(`[migrate-timing-master] ❌ ${msg}`);
  hadError = true;
};
const warn = (msg: string) => console.warn(`[migrate-timing-master] ⚠️  ${msg}`);
const info = (msg: string) => console.log(`[migrate-timing-master] ${msg}`);

if (isDryRun) info('--dry-run(既定)。書き込むには --apply を付けてください。');

// --- 1. 入力読み込み -------------------------------------------------------
type EditRangeRaw = {
  sourceStartSec: number;
  sourceEndSec: number;
  fadeOutStartSec: number;
  fadeOutDurationSec: number;
  verifiedByListening: boolean;
};
const editRange = readJson<EditRangeRaw>('start-wedding-edit.local.json');
if (!editRange) {
  fail('local/start-wedding-edit.local.json が無い。migration不可。');
  process.exit(1);
}

type LyricPhraseRaw = {
  phraseId: string;
  lineNumber: number;
  sectionId: string;
  text: string;
  startSec: number;
  endSec: number;
  threeHitFrameSecs?: number[] | null;
  rhythmType?: string | null;
  semanticType?: string | null;
  selectedAnimation?: string | null;
  transitionIntent?: string | null;
  holdSec?: number | null;
  exitSec?: number | null;
  confidence?: 'high' | 'medium' | 'low';
};
const lyrics = readJson<{phrases: LyricPhraseRaw[]}>('lyrics-wedding-edit.local.json');
if (!lyrics) {
  fail('local/lyrics-wedding-edit.local.json が無い。migration不可。');
  process.exit(1);
}

const structureMap = readJson<{sections: Array<{id: string; startSec: number; endSec: number; role: string; note?: string}>}>(
  'structure-map.local.json',
);
const phraseMap = readJson<{
  phrases: Array<{phraseId: string; selectedAnimation?: string; transitionIntent?: string; confidence?: string; holdSec?: number; exitSec?: number}>;
}>('phrase-map.local.json');
const wordAccentMap = readJson<{words: Array<{word: string; phraseId: string; accentSec: number}>}>('word-accent-map.local.json');
const beatMap = readJson<{beats: number[]; downbeats?: number[]; bpm?: number}>('beat-map.local.json');
const transitionMap = readJson<{transitions: Record<string, string>}>('transition-map.local.json');
type ManualOverride = {
  phraseId: string;
  word: string | null;
  manualAccentSec: number | null;
  manualOffsetFrames: number | null;
  manualStartSec?: number | null;
  manualEndSec?: number | null;
  verifiedByListening: boolean;
  reviewComment: string;
  updatedAt: string;
};
const manualOverrides = readJson<ManualOverride[]>('word-accent-map.manual-overrides.local.json') ?? [];

if (!structureMap) warn('structure-map.local.json が無い。sectionはlyrics由来のsectionIdだけで最小構成にする。');
if (!phraseMap) warn('phrase-map.local.json が無い。selectedAnimation/transitionIntent補完なし。phrase-onsetはestimated扱いになる。');
if (!wordAccentMap) warn('word-accent-map.local.json が無い。importantWords無しのphraseが増える。');
if (!beatMap) warn('beat-map.local.json が無い。beat-snap/musicGrid不可。');
if (!transitionMap) warn('transition-map.local.json が無い。transitionIntent補完なし。');

const audioCandidates = ['StaRt.m4a', 'start-wedding-edit.m4a', 'start-edit.m4a'];
const audioDir = join(localDir, 'audio');
let audioPath: string | null = null;
let audioFileName = '';
for (const name of audioCandidates) {
  const p = join(audioDir, name);
  if (existsSync(p)) {
    audioPath = p;
    audioFileName = name;
    break;
  }
}
if (!audioPath) {
  fail('音源が見つからない(local/audio/StaRt.m4a等)。sha256計算不可のため停止。');
  process.exit(1);
}
const audioSha256 = createHash('sha256').update(readFileSync(audioPath)).digest('hex');

// --- 1b. 音源メタデータをffprobeで実測する(重要な訂正: 以前はdurationMs=0/
// sampleRate=nullのまま放置していた)。 -------------------------------------
type AudioMeta = {durationMs: number; sampleRate: number | null; channels: number | null; codec: string | null};
const probeAudio = (path: string): AudioMeta => {
  try {
    const out = execFileSync(
      'ffprobe',
      ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=sample_rate,channels,codec_name:format=duration', '-of', 'json', path],
      {encoding: 'utf-8'},
    );
    const parsed = JSON.parse(out) as {streams?: Array<{sample_rate?: string; channels?: number; codec_name?: string}>; format?: {duration?: string}};
    const stream = parsed.streams?.[0];
    return {
      durationMs: parsed.format?.duration ? Math.round(Number(parsed.format.duration) * 1000) : 0,
      sampleRate: stream?.sample_rate ? Number(stream.sample_rate) : null,
      channels: stream?.channels ?? null,
      codec: stream?.codec_name ?? null,
    };
  } catch (e) {
    warn(`ffprobe失敗: ${(e as Error).message}。durationMs/sampleRate/channels/codecは0/nullのまま。`);
    return {durationMs: 0, sampleRate: null, channels: null, codec: null};
  }
};
const audioMeta = probeAudio(audioPath);
info(
  `音源: ${audioFileName} sha256=${audioSha256.slice(0, 12)}... duration=${audioMeta.durationMs}ms sampleRate=${audioMeta.sampleRate}Hz channels=${audioMeta.channels} codec=${audioMeta.codec}`,
);
if (audioMeta.durationMs === 0) fail('音源のdurationMsが0(ffprobe失敗)。masterへ書き込めません。');
if (secToMs(editRange.sourceEndSec) > audioMeta.durationMs) fail(`candidateEndMs(${secToMs(editRange.sourceEndSec)}ms)が音源全長(${audioMeta.durationMs}ms)を超えている。`);

// --- 2. 既存master(あれば)を読み、manual/verified値を保護する -------------
const existingMaster = existsSync(masterPath) ? (JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster) : null;
const existingCueById = new Map<string, VocalCue>();
if (existingMaster) {
  for (const p of existingMaster.phrases) for (const c of p.cues) existingCueById.set(c.cueId, c);
}
const preserveCueIfBetter = (fresh: VocalCue): VocalCue => {
  const prev = existingCueById.get(fresh.cueId);
  if (!prev) return fresh;
  // manualまたはverified-listeningな既存値は絶対に上書きしない。
  if (prev.timingSource === 'manual' || prev.verifiedByListening) return prev;
  return fresh;
};

// --- 3. sections構築 --------------------------------------------------------
const roleToKind = (role: string): SectionKind => {
  if (role === 'intro') return 'intro';
  if (role === 'verse') return 'verse';
  if (role === 'prechorus') return 'prechorus';
  if (role === 'chorus') return 'chorus';
  if (role.startsWith('interlude')) return 'interlude';
  return 'outro';
};

const sections: TimingSection[] = (structureMap?.sections ?? []).map((s) => {
  const isChorus = s.role === 'chorus';
  const isVerse = s.role === 'verse';
  return {
    sectionId: s.id,
    labelJa: s.id,
    kind: roleToKind(s.role),
    startMs: secToMs(s.startSec),
    endMs: secToMs(s.endSec),
    energyStart: isChorus ? 3 : 2,
    energyPeak: isChorus ? 5 : isVerse ? 3 : 2,
    energyEnd: isChorus ? 4 : 2,
    energyCurve: [
      {timeMs: secToMs(s.startSec), value: (isChorus ? 3 : 2) as 1 | 2 | 3 | 4 | 5},
      {timeMs: secToMs(s.endSec), value: (isChorus ? 4 : 2) as 1 | 2 | 3 | 4 | 5},
    ],
    mood: [],
    // structure-map.local.jsonの各section confidence(medium/high)は、その
    // ファイル自身がffmpeg RMS/spectrogram解析+Palmier Pro beat detectionの
    // 結果と明記しているため、ここは実際に解析由来と言える(audio-analysis)。
    // legacy importでのみ真である前提を明示するため、narrativeRoleに残す。
    narrativeRole: s.note ?? s.role,
    visualDensity: isChorus ? 'high' : 'medium',
    cameraEnergy: isChorus ? 'high' : 'medium',
    typographyEnergy: isChorus ? 'high' : 'medium',
    recommendedPhotoRoles: [],
    transitionIntent: '',
    verifiedByListening: false,
  };
});

// --- 3b. musicGrid(beat-map.local.jsonを正式にmasterへ取り込む) ------------
// 重要な訂正: 以前のsync scriptがbeats/downbeats/bpmを空配列/0で出力しており、
// 「StaRt文字は実測beat同期」という説明が事実と異なっていた。ここでmasterへ
// 正式に格納し、sync scriptがそのまま出力することで解消する。
const musicGrid: MusicGrid = {
  bpm: beatMap?.bpm ?? null,
  beatsMs: (beatMap?.beats ?? []).map(secToMs),
  downbeatsMs: (beatMap?.downbeats ?? []).map(secToMs),
  source: beatMap ? 'legacy-import' : 'manual',
  verifiedByListening: false,
};

// --- 4. phrases + cues構築 ---------------------------------------------------
const phraseMapById = new Map((phraseMap?.phrases ?? []).map((p) => [p.phraseId, p]));
const wordsByPhraseId = new Map<string, Array<{word: string; accentSec: number}>>();
for (const w of wordAccentMap?.words ?? []) {
  const arr = wordsByPhraseId.get(w.phraseId) ?? [];
  arr.push({word: w.word, accentSec: w.accentSec});
  wordsByPhraseId.set(w.phraseId, arr);
}

// 重要な訂正: legacy manual overrideは`${phraseId}::${word}`というキーで
// 保存されているため、同一phrase内に同じ語が複数回出現する場合
// (「パッ」「チャプ」「ララ」等)、どのoccurrenceへ適用すべきか一意に決まらない。
// 以前は問答無用で全occurrenceへ同じoverrideをコピーしていたが、これは
// 新しいcueId制度(occurrence個別追跡)の利点を壊す。ここでは、対象語が
// そのphrase内で1回しか出現しない場合だけ自動適用し、複数回出現する場合は
// ambiguousとして報告するだけに留める(自動コピーしない)。
const manualWordOverrides = manualOverrides.filter((o) => o.word !== null && o.manualAccentSec != null);
const manualPhraseById = new Map(
  manualOverrides
    .filter((o) => o.word === null && (o.manualStartSec != null || o.manualEndSec != null || o.verifiedByListening))
    .map((o) => [o.phraseId, o]),
);
const ambiguousLegacyOverrides: string[] = [];
const manualWordByKey = new Map<string, ManualOverride>();
for (const o of manualWordOverrides) {
  const words = wordsByPhraseId.get(o.phraseId) ?? [];
  const occurrences = words.filter((w) => w.word === o.word);
  if (occurrences.length > 1) {
    ambiguousLegacyOverrides.push(`${o.phraseId}::${o.word}(${occurrences.length}箇所出現、自動適用せず)`);
    continue;
  }
  manualWordByKey.set(`${o.phraseId}::${o.word}`, o);
}
if (ambiguousLegacyOverrides.length > 0) {
  warn(`ambiguous legacy override(反復語のため自動適用しない): ${ambiguousLegacyOverrides.join(', ')}`);
  warn('  → DashboardからcueId単位(occurrenceIndex明示)で個別に手動確定してください。');
}

const beatsMs = musicGrid.beatsMs;

// --- 4a. 実ボーカル解析結果(あれば)を読み込む -------------------------------
// scripts/analyze_start_wedding_vocals.py(htdemucsでボーカル分離→librosaで
// onset検出)の出力。存在しない場合は解析なしとして扱い、audio-analysisを
// 自称しない(estimatedのまま)。
type AlignmentCandidates = {
  runId: string;
  audioSha256: string;
  tool: string;
  toolVersion: Record<string, string>;
  model: string | null;
  generatedAt: string;
  stemAlignmentOffsetMs: number;
  stemAlignmentVerified: boolean;
  vocalOnsetCandidatesMs: number[];
};
const alignmentCandidates = readJson<AlignmentCandidates>('analysis/start-wedding/alignment-candidates.local.json');
if (alignmentCandidates && alignmentCandidates.audioSha256 !== audioSha256) {
  warn(
    `alignment-candidates.local.jsonのaudioSha256が現在の音源と不一致(解析時=${alignmentCandidates.audioSha256.slice(0, 12)}... 現在=${audioSha256.slice(0, 12)}...)。この解析結果は使用しない。`,
  );
}
const vocalOnsetsMs =
  alignmentCandidates && alignmentCandidates.audioSha256 === audioSha256 ? alignmentCandidates.vocalOnsetCandidatesMs : [];
const ANALYSIS_METHOD = 'vocal-stem-onset-detection(htdemucs+librosa)';
const ANALYSIS_SNAP_WINDOW_MS = 250;
/** 実vocal onset解析結果から、指定時刻へ最も近い候補を探す(window内のみ)。
 * 見つかった場合だけaudio-analysisとして採用し、見つからない場合は呼び出し元の
 * 既存ロジック(beat-snap/estimated)へfallbackする(解析していない値を
 * audio-analysisと自称しないため)。 */
const snapToVocalOnset = (approxMs: number): number | null => {
  if (vocalOnsetsMs.length === 0) return null;
  let best = vocalOnsetsMs[0];
  let bestDiff = Math.abs(vocalOnsetsMs[0] - approxMs);
  for (const o of vocalOnsetsMs) {
    const d = Math.abs(o - approxMs);
    if (d < bestDiff) {
      best = o;
      bestDiff = d;
    }
  }
  return bestDiff <= ANALYSIS_SNAP_WINDOW_MS ? best : null;
};
if (vocalOnsetsMs.length > 0) {
  info(`実ボーカル解析結果を検出: onset候補${vocalOnsetsMs.length}件(stemAlignmentOffsetMs=${alignmentCandidates!.stemAlignmentOffsetMs}ms)。±${ANALYSIS_SNAP_WINDOW_MS}ms以内の候補があるcueをaudio-analysisへ格上げする。`);
} else {
  warn('実ボーカル解析結果が無い(local/analysis/start-wedding/alignment-candidates.local.json)。phrase-onset等は従来通りlegacy値/estimatedのまま。');
}
let snappedCount = 0;

const phrases: TimingPhrase[] = lyrics.phrases.map((p) => {
  const pm = phraseMapById.get(p.phraseId);
  const tmTransition = transitionMap?.transitions[p.phraseId];
  if (pm?.selectedAnimation && p.selectedAnimation && pm.selectedAnimation !== p.selectedAnimation) {
    fail(`${p.phraseId}: selectedAnimation不一致 lyrics="${p.selectedAnimation}" phrase-map="${pm.selectedAnimation}"`);
  }
  if (tmTransition && p.transitionIntent && tmTransition !== p.transitionIntent) {
    fail(`${p.phraseId}: transitionIntent不一致 lyrics="${p.transitionIntent}" transition-map="${tmTransition}"`);
  }

  const phraseOverride = manualPhraseById.get(p.phraseId);
  const startSec = phraseOverride?.manualStartSec ?? p.startSec;
  const endSec = phraseOverride?.manualEndSec ?? p.endSec;

  const cues: VocalCue[] = [];
  // phrase-onset cue(必ず1つ)。
  // 重要な訂正: 以前は根拠を問わず一律'audio-analysis'にしていた。
  // 今は実際にhtdemucs+librosaでボーカル分離・onset検出した結果
  // (vocalOnsetsMs)が±250ms以内にあるcueだけを'audio-analysis'とし、
  // 無ければphrase-map.local.jsonの自己申告根拠があるかどうかで
  // audio-analysis/estimatedを判定する(根拠の無い過大表示をしない)。
  const onsetApprox = secToMs(startSec);
  const onsetSnap = phraseOverride?.manualStartSec == null ? snapToVocalOnset(onsetApprox) : null;
  if (onsetSnap != null) snappedCount++;
  cues.push(
    preserveCueIfBetter({
      cueId: `${p.phraseId}-ONSET`,
      phraseId: p.phraseId,
      kind: 'phrase-onset',
      text: p.text,
      occurrenceIndex: 0,
      timeMs: onsetSnap ?? onsetApprox,
      timingSource: phraseOverride?.manualStartSec != null ? 'manual' : onsetSnap != null ? 'audio-analysis' : pm ? 'audio-analysis' : 'estimated',
      verifiedByListening: phraseOverride?.verifiedByListening ?? false,
      confidence: (pm?.confidence as VocalCue['confidence']) ?? 'medium',
      reviewComment: phraseOverride?.reviewComment ?? '',
      analysisMethod: onsetSnap != null ? ANALYSIS_METHOD : null,
    }),
  );
  // word-accent cue(反復語も含め、出現順で安定ID: W01, W02, ...)
  const words = wordsByPhraseId.get(p.phraseId) ?? [];
  words.forEach((w, i) => {
    const override = manualWordByKey.get(`${p.phraseId}::${w.word}`);
    const accentSec = override?.manualAccentSec ?? w.accentSec;
    const approxMs = secToMs(accentSec);
    const snap = override?.manualAccentSec == null ? snapToVocalOnset(approxMs) : null;
    if (snap != null) snappedCount++;
    cues.push(
      preserveCueIfBetter({
        cueId: `${p.phraseId}-W${String(i + 1).padStart(2, '0')}`,
        phraseId: p.phraseId,
        kind: 'word-accent',
        text: w.word,
        occurrenceIndex: i,
        timeMs: snap ?? approxMs,
        timingSource: override?.manualAccentSec != null ? 'manual' : snap != null ? 'audio-analysis' : nearestBeatMs(approxMs, beatsMs) != null ? 'beat-snap' : 'estimated',
        verifiedByListening: override?.verifiedByListening ?? false,
        confidence: 'medium',
        reviewComment: override?.reviewComment ?? '',
        analysisMethod: snap != null ? ANALYSIS_METHOD : null,
      }),
    );
  });
  // 3-hit(syllable-hit)cue: 「パッ」「チャプ」等の反復onomatopoeiaを個別確認できるように
  // H01/H02/H03という安定IDを振る。textには反復onomatopoeia全体ではなく、
  // その1発の実際の表示語(例:「パッ」)を入れる(phrase全文を入れない)。
  const hitWord = p.text.match(/^((?:パッ|チャプ|ラ){1,2})/)?.[1] ?? p.text.slice(0, 2);
  (p.threeHitFrameSecs ?? []).forEach((sec, i) => {
    const approxMs = secToMs(sec);
    const snap = snapToVocalOnset(approxMs);
    if (snap != null) snappedCount++;
    cues.push(
      preserveCueIfBetter({
        cueId: `${p.phraseId}-H${String(i + 1).padStart(2, '0')}`,
        phraseId: p.phraseId,
        kind: 'syllable-hit',
        text: hitWord,
        occurrenceIndex: i,
        timeMs: snap ?? approxMs,
        timingSource: snap != null ? 'audio-analysis' : nearestBeatMs(approxMs, beatsMs) != null ? 'beat-snap' : 'estimated',
        verifiedByListening: false,
        confidence: 'medium',
        reviewComment: '',
        analysisMethod: snap != null ? ANALYSIS_METHOD : null,
      }),
    );
  });

  return {
    phraseId: p.phraseId,
    lineNumber: p.lineNumber,
    sectionId: p.sectionId,
    text: p.text,
    startMs: secToMs(startSec),
    endMs: secToMs(endSec),
    holdMs: pm?.holdSec != null ? secToMs(pm.holdSec) : p.holdSec != null ? secToMs(p.holdSec) : null,
    exitMs: pm?.exitSec != null ? secToMs(pm.exitSec) : p.exitSec != null ? secToMs(p.exitSec) : null,
    rhythmType: p.rhythmType ?? null,
    semanticType: p.semanticType ?? null,
    selectedAnimation: pm?.selectedAnimation ?? p.selectedAnimation ?? null,
    transitionIntent: tmTransition ?? p.transitionIntent ?? null,
    confidence: (pm?.confidence as TimingPhrase['confidence']) ?? p.confidence ?? 'medium',
    cues,
    humanReviewRequired: !(phraseOverride?.verifiedByListening ?? false),
  };
});

// --- 5. musicCues(section境界を最小限のtransition cueとして記録) -----------
// structure-map.local.json自身が「ffmpeg RMS/spectrogram解析」を明記しているため、
// ここのaudio-analysisは自己申告根拠のある分類(estimatedへの格下げは不要)。
const musicCues: MusicCue[] = (structureMap?.sections ?? []).map((s, i) => ({
  cueId: `SECTION-${s.id}-START`,
  timeMs: secToMs(s.startSec),
  type: i === 0 ? 'silence' : s.role === 'chorus' ? 'chorus-entry' : 'transition',
  strength: (s.role === 'chorus' ? 4 : 2) as 1 | 2 | 3 | 4 | 5,
  description: `${s.id}開始(structure-map由来: ffmpeg RMS/spectrogram解析。beat-map bpm=${beatMap?.bpm ?? '不明'})`,
  timingSource: 'audio-analysis',
  verifiedByListening: false,
}));

// --- 6. editorialBlocks(冒頭ウェルカム/新郎新婦紹介/S/StaRt) -----------------
const firstVocalMs = secToMs(lyrics.phrases[0]?.startSec ?? 12.5);
const coupleProfileRaw = readJson<Record<string, unknown>>('couple-profile.local.json');
const coupleProfileParsed = coupleProfileRaw ? parseCoupleProfile(coupleProfileRaw) : null;
const coupleProfile: CoupleProfile = coupleProfileParsed?.ok ? coupleProfileParsed.data : EMPTY_COUPLE_PROFILE;

const snap = (ms: number) => nearestBeatMs(ms, beatsMs) ?? ms;
const introShowsProfiles = coupleProfile.showIntroduction && coupleProfile.groom.name !== '' && coupleProfile.bride.name !== '';

const introWeights = introShowsProfiles
  ? [{key: 'welcome', w: 2.2}, {key: 'tagline', w: 2.6}, {key: 'groom', w: 1.5}, {key: 'bride', w: 1.5}, {key: 'merge', w: 1.0}, {key: 's', w: 1.4}, {key: 'starttitle', w: 1.8}]
  : [{key: 'welcome', w: 2.4}, {key: 'tagline', w: 2.8}, {key: 's', w: 1.6}, {key: 'starttitle', w: 2.2}];
const totalWeight = introWeights.reduce((a, b) => a + b.w, 0);
let cursorMs = 0;
const introSlots: Record<string, {startMs: number; endMs: number}> = {};
introWeights.forEach(({key, w}) => {
  const dur = (firstVocalMs * w) / totalWeight;
  const startMs = snap(cursorMs);
  cursorMs += dur;
  const endMs = key === introWeights[introWeights.length - 1].key ? firstVocalMs : snap(cursorMs);
  introSlots[key] = {startMs, endMs};
});

// StaRt titleの5文字を、そのblock区間内の実測beatへ個別cueとして割り当てる。
// beatが5個未満の場合は均等fallbackにし、timingSourceを'estimated'にする
// (「実測beat同期」と虚偽表示しないため)。
const buildStartLetterCues = (blockStartMs: number, blockEndMs: number): LetterCue[] => {
  const letters = ['S', 't', 'a', 'R', 't'];
  const ids = ['S', 'T1', 'A', 'R', 'T2'];
  const beatsInRange = beatsMs.filter((b) => b >= blockStartMs && b <= blockEndMs);
  const useReal = beatsInRange.length >= letters.length;
  return letters.map((ch, i) => {
    const timeMs = useReal
      ? beatsInRange[Math.round((i * (beatsInRange.length - 1)) / (letters.length - 1))]
      : Math.round(blockStartMs + ((blockEndMs - blockStartMs) * i) / letters.length);
    return {
      cueId: `INTRO-START-${ids[i]}`,
      text: ch,
      timeMs,
      timingSource: useReal ? ('beat-snap' as const) : ('estimated' as const),
      verifiedByListening: false,
    };
  });
};

const editorialBlocks: EditorialBlock[] = [];
editorialBlocks.push({
  blockId: 'intro-welcome',
  type: 'welcome',
  startMs: introSlots.welcome.startMs,
  endMs: introSlots.welcome.endMs,
  linkedMusicCueIds: ['SECTION-intro-START'].filter((id) => musicCues.some((m) => m.cueId === id)),
  energy: 2,
  textLines: coupleProfile.welcomeLines,
  photoRoles: [],
  verifiedByListening: false,
});
editorialBlocks.push({
  blockId: 'intro-tagline',
  type: 'welcome',
  startMs: introSlots.tagline.startMs,
  endMs: introSlots.tagline.endMs,
  linkedMusicCueIds: [],
  energy: 2,
  textLines: coupleProfile.taglineLines,
  photoRoles: [],
  verifiedByListening: false,
});
if (introShowsProfiles) {
  editorialBlocks.push({
    blockId: 'intro-groom',
    type: 'couple-profile',
    startMs: introSlots.groom.startMs,
    endMs: introSlots.groom.endMs,
    linkedMusicCueIds: [],
    energy: 2,
    textLines: [coupleProfile.groom.label, coupleProfile.groom.name, coupleProfile.groom.oneLine].filter(Boolean),
    photoRoles: [coupleProfile.groom.photoRole],
    verifiedByListening: false,
  });
  editorialBlocks.push({
    blockId: 'intro-bride',
    type: 'couple-profile',
    startMs: introSlots.bride.startMs,
    endMs: introSlots.bride.endMs,
    linkedMusicCueIds: [],
    energy: 2,
    textLines: [coupleProfile.bride.label, coupleProfile.bride.name, coupleProfile.bride.oneLine].filter(Boolean),
    photoRoles: [coupleProfile.bride.photoRole],
    verifiedByListening: false,
  });
  editorialBlocks.push({
    blockId: 'intro-merge',
    type: 'couple-profile',
    startMs: introSlots.merge.startMs,
    endMs: introSlots.merge.endMs,
    linkedMusicCueIds: [],
    energy: 3,
    textLines: [],
    photoRoles: [coupleProfile.couple.photoRole],
    verifiedByListening: false,
  });
}
editorialBlocks.push({
  blockId: 'intro-s-line',
  type: 'title',
  startMs: introSlots.s.startMs,
  endMs: introSlots.s.endMs,
  linkedMusicCueIds: [],
  energy: 3,
  textLines: ['S'],
  photoRoles: [],
  verifiedByListening: false,
});
editorialBlocks.push({
  blockId: 'intro-start-title',
  type: 'title',
  startMs: introSlots.starttitle.startMs,
  endMs: introSlots.starttitle.endMs,
  linkedMusicCueIds: [],
  energy: 4,
  textLines: ['StaRt'],
  photoRoles: [],
  verifiedByListening: false,
  letterCues: buildStartLetterCues(introSlots.starttitle.startMs, introSlots.starttitle.endMs),
});

if (hadError) {
  console.error('[migrate-timing-master] cross-reference検証に失敗。master書き込みを中止。');
  process.exit(1);
}

// --- 7. master組み立て + canonical content hashでrevision判定 ----------------
const now = new Date().toISOString();
const audio = {
  fileName: audioFileName,
  sha256: audioSha256,
  durationMs: audioMeta.durationMs,
  sampleRate: audioMeta.sampleRate,
  channels: audioMeta.channels,
  codec: audioMeta.codec,
  sourceStartMs: secToMs(editRange.sourceStartSec),
  candidateEndMs: secToMs(editRange.sourceEndSec),
  confirmedEndMs: existingMaster?.audio.confirmedEndMs ?? null,
  fadeOutStartMs: secToMs(editRange.fadeOutStartSec),
  fadeOutDurationMs: secToMs(editRange.fadeOutDurationSec),
  globalContentOffsetMs: existingMaster?.audio.globalContentOffsetMs ?? 0,
  previewLatencyOffsetMs: existingMaster?.audio.previewLatencyOffsetMs ?? 0,
  renderPipelineOffsetMs: existingMaster?.audio.renderPipelineOffsetMs ?? null,
  renderPipelineOffsetVerified: existingMaster?.audio.renderPipelineOffsetVerified ?? false,
  verifiedByListening: existingMaster?.audio.verifiedByListening ?? false,
};

const analysisRun =
  alignmentCandidates && alignmentCandidates.audioSha256 === audioSha256
    ? {
        runId: alignmentCandidates.runId,
        audioSha256: alignmentCandidates.audioSha256,
        tool: alignmentCandidates.tool,
        toolVersion: alignmentCandidates.toolVersion,
        model: alignmentCandidates.model,
        generatedAt: alignmentCandidates.generatedAt,
        stemAlignmentOffsetMs: alignmentCandidates.stemAlignmentOffsetMs,
        stemAlignmentVerified: alignmentCandidates.stemAlignmentVerified,
        vocalOnsetCandidateCount: alignmentCandidates.vocalOnsetCandidatesMs.length,
      }
    : existingMaster?.analysisRun ?? null;

const candidatePayload = {
  schemaVersion: TIMING_MASTER_SCHEMA_VERSION,
  masterId: existingMaster?.masterId ?? 'start-wedding-edit-master',
  status: existingMaster?.status ?? ('MASTER_MIGRATED' as const),
  audio,
  musicGrid,
  sections,
  phrases,
  musicCues,
  editorialBlocks,
  analysisRun,
};
const newContentHash = createHash('sha256').update(JSON.stringify(canonicalMasterPayloadForHash(candidatePayload))).digest('hex');
const contentChanged = existingMaster?.contentHash !== newContentHash;
const nextRevision = existingMaster ? (contentChanged ? existingMaster.revision + 1 : existingMaster.revision) : 1;

const master: TimingMaster = {
  ...candidatePayload,
  revision: nextRevision,
  contentHash: newContentHash,
  verification: {
    ...countVerification({phrases, musicCues}),
    verifiedBy: existingMaster?.verification.verifiedBy ?? null,
    verifiedAt: existingMaster?.verification.verifiedAt ?? null,
  },
  provenance: {
    migratedFrom: [
      'start-wedding-edit.local.json',
      'lyrics-wedding-edit.local.json',
      'structure-map.local.json',
      'phrase-map.local.json',
      'word-accent-map.local.json',
      'beat-map.local.json',
      'transition-map.local.json',
      'word-accent-map.manual-overrides.local.json',
      'couple-profile.local.json',
    ],
    createdAt: existingMaster?.provenance.createdAt ?? now,
    updatedAt: contentChanged || !existingMaster ? now : existingMaster.provenance.updatedAt,
  },
};

const v = master.verification;
info(
  `sections=${master.sections.length} phrases=${master.phrases.length} cues=${v.totalVocalCues}(verified=${v.verifiedVocalCues}) musicCues=${v.totalMusicCues} editorialBlocks=${master.editorialBlocks.length} musicGrid.beats=${musicGrid.beatsMs.length}`,
);
info(`実ボーカル解析でaudio-analysisへ格上げされたcue: ${snappedCount}件(±${ANALYSIS_SNAP_WINDOW_MS}ms以内の実onsetが見つかったもの)`);
info(`revision: ${existingMaster?.revision ?? '(新規)'} → ${nextRevision} (contentHash ${contentChanged ? '変化あり' : '変化なし'})`);
info(`intro editorial blocks(0-${firstVocalMs}ms、${introShowsProfiles ? '7' : '4'}ブロック構成):`);
for (const b of master.editorialBlocks) info(`  ${b.blockId}: ${b.startMs}ms-${b.endMs}ms (${(b.endMs - b.startMs) / 1000}s) "${b.textLines.join(' / ')}"`);
const startBlock = master.editorialBlocks.find((b) => b.blockId === 'intro-start-title');
if (startBlock?.letterCues) {
  const usesReal = startBlock.letterCues.every((c) => c.timingSource === 'beat-snap');
  info(`  StaRt letterCues(${usesReal ? '実測beat使用' : 'ESTIMATED_FALLBACK: beat不足のため均等間隔'}):`);
  for (const c of startBlock.letterCues) info(`    ${c.cueId}: "${c.text}" @ ${c.timeMs}ms (${c.timingSource})`);
}

if (isDryRun) {
  info('--dry-run: ファイルは書き込みません。書き込むには --apply を付けて再実行してください。');
  process.exit(0);
}

if (!contentChanged && existingMaster) {
  info('内容に実質変化なし。revisionは維持されます(既存ファイルへの再書き込みも行いません)。');
  process.exit(0);
}

if (existsSync(masterPath)) {
  const backupDir = join(localDir, '_backups');
  mkdirSync(backupDir, {recursive: true});
  const stamp = now.replace(/[:.]/g, '-');
  writeFileSync(join(backupDir, `start-wedding-timing-master.${stamp}.json`), readFileSync(masterPath));
  info(`既存masterをbackup: local/_backups/start-wedding-timing-master.${stamp}.json`);
}
writeFileSync(masterPath, JSON.stringify(master, null, 2) + '\n');
info(`書き込み完了: local/start-wedding-timing-master.local.json (revision=${master.revision}, contentHash=${master.contentHash.slice(0, 12)}...)`);
