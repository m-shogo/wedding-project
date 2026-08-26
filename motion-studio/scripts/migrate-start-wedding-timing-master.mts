// 既存7ファイル(structure/phrase/word-accent/beat/transition-map +
// start-wedding-edit.local.json + word-accent-map.manual-overrides.local.json)から
// local/start-wedding-timing-master.local.json(唯一の正本)を生成する。
//
// 安全性の要件(元ファイルを壊さない):
//   - 元ファイルを上書き・削除しない(読むだけ)
//   - manual値(manual-overrides由来)を必ず最優先する
//   - 既存masterが既にある場合、その中のverifiedByListening=true/timingSource='manual'な
//     値を新しい派生値で上書きしない(再実行しても人間の確認結果を消さない)
//   - --dry-run で書き込まず差分だけ表示できる
//   - 実行のたびにtimestamp付きbackupを local/_backups/ へ残す
//
// 使い方:
//   node --no-warnings scripts/migrate-start-wedding-timing-master.mts --dry-run
//   node --no-warnings scripts/migrate-start-wedding-timing-master.mts

import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {
  CoupleProfile,
} from '../src/data/startWeddingEdit/coupleProfile.ts';
import {parseCoupleProfile, EMPTY_COUPLE_PROFILE} from '../src/data/startWeddingEdit/coupleProfile.ts';
import type {
  EditorialBlock,
  MusicCue,
  SectionKind,
  TimingMaster,
  TimingPhrase,
  TimingSection,
  VocalCue,
} from '../src/data/startWeddingEdit/timingMaster.ts';
import {TIMING_MASTER_SCHEMA_VERSION, countVerification, nearestBeatMs, secToMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const isDryRun = process.argv.includes('--dry-run');

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
const beatMap = readJson<{beats: number[]; bpm?: number}>('beat-map.local.json');
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
if (!phraseMap) warn('phrase-map.local.json が無い。selectedAnimation/transitionIntent補完なし。');
if (!wordAccentMap) warn('word-accent-map.local.json が無い。importantWords無しのphraseが増える。');
if (!beatMap) warn('beat-map.local.json が無い。beat-snap不可。');
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
info(`音源: ${audioFileName} sha256=${audioSha256.slice(0, 12)}...`);

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
    narrativeRole: s.note ?? s.role,
    visualDensity: isChorus ? 'high' : 'medium',
    cameraEnergy: isChorus ? 'high' : 'medium',
    typographyEnergy: isChorus ? 'high' : 'medium',
    recommendedPhotoRoles: [],
    transitionIntent: '',
    verifiedByListening: false,
  };
});

// --- 4. phrases + cues構築 ---------------------------------------------------
const phraseMapById = new Map((phraseMap?.phrases ?? []).map((p) => [p.phraseId, p]));
const wordsByPhraseId = new Map<string, Array<{word: string; accentSec: number}>>();
for (const w of wordAccentMap?.words ?? []) {
  const arr = wordsByPhraseId.get(w.phraseId) ?? [];
  arr.push({word: w.word, accentSec: w.accentSec});
  wordsByPhraseId.set(w.phraseId, arr);
}
const manualWordByKey = new Map(
  manualOverrides.filter((o) => o.word !== null && o.manualAccentSec != null).map((o) => [`${o.phraseId}::${o.word}`, o]),
);
const manualPhraseById = new Map(
  manualOverrides
    .filter((o) => o.word === null && (o.manualStartSec != null || o.manualEndSec != null || o.verifiedByListening))
    .map((o) => [o.phraseId, o]),
);
const beatsMs = (beatMap?.beats ?? []).map(secToMs);

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
  // phrase-onset cue(必ず1つ)
  cues.push(
    preserveCueIfBetter({
      cueId: `${p.phraseId}-ONSET`,
      phraseId: p.phraseId,
      kind: 'phrase-onset',
      text: p.text,
      occurrenceIndex: 0,
      timeMs: secToMs(startSec),
      timingSource: phraseOverride?.manualStartSec != null ? 'manual' : 'audio-analysis',
      verifiedByListening: phraseOverride?.verifiedByListening ?? false,
      confidence: (pm?.confidence as VocalCue['confidence']) ?? 'medium',
      reviewComment: phraseOverride?.reviewComment ?? '',
    }),
  );
  // word-accent cue(反復語も含め、出現順で安定ID: W01, W02, ...)
  const words = wordsByPhraseId.get(p.phraseId) ?? [];
  words.forEach((w, i) => {
    const override = manualWordByKey.get(`${p.phraseId}::${w.word}`);
    const accentSec = override?.manualAccentSec ?? w.accentSec;
    cues.push(
      preserveCueIfBetter({
        cueId: `${p.phraseId}-W${String(i + 1).padStart(2, '0')}`,
        phraseId: p.phraseId,
        kind: 'word-accent',
        text: w.word,
        occurrenceIndex: i,
        timeMs: secToMs(accentSec),
        timingSource: override?.manualAccentSec != null ? 'manual' : nearestBeatMs(secToMs(accentSec), beatsMs) != null ? 'beat-snap' : 'estimated',
        verifiedByListening: override?.verifiedByListening ?? false,
        confidence: 'medium',
        reviewComment: override?.reviewComment ?? '',
      }),
    );
  });
  // 3-hit(syllable-hit)cue: 「パッ」「チャプ」等の反復onomatopoeiaを個別確認できるように
  // H01/H02/H03という安定IDを振る(文字列キーでは反復語を区別できない問題への対応)。
  (p.threeHitFrameSecs ?? []).forEach((sec, i) => {
    cues.push(
      preserveCueIfBetter({
        cueId: `${p.phraseId}-H${String(i + 1).padStart(2, '0')}`,
        phraseId: p.phraseId,
        kind: 'syllable-hit',
        text: p.text,
        occurrenceIndex: i,
        timeMs: secToMs(sec),
        timingSource: nearestBeatMs(secToMs(sec), beatsMs) != null ? 'beat-snap' : 'estimated',
        verifiedByListening: false,
        confidence: 'medium',
        reviewComment: '',
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
const musicCues: MusicCue[] = (structureMap?.sections ?? []).map((s, i) => ({
  cueId: `SECTION-${s.id}-START`,
  timeMs: secToMs(s.startSec),
  type: i === 0 ? 'silence' : s.role === 'chorus' ? 'chorus-entry' : 'transition',
  strength: (s.role === 'chorus' ? 4 : 2) as 1 | 2 | 3 | 4 | 5,
  description: `${s.id}開始(structure-map由来、beat-map bpm=${beatMap?.bpm ?? '不明'})`,
  timingSource: 'audio-analysis',
  verifiedByListening: false,
}));

// --- 6. editorialBlocks(冒頭ウェルカム/新郎新婦紹介/S/StaRt) -----------------
// 実音源で最初の歌声(P001 onset)が始まる時刻を、intro全体の終端として使う。
// これより前(0〜firstVocalMs)の範囲内に、ようこそ→タグライン→新郎→新婦→合流→
// S→StaRtの7段階を、beat-mapのbeatへスナップしながら比例配置する。
// 秒数を先に決め打ちせず、実際に使える長さから逆算する(過剰な推測をしない)。
const firstVocalMs = secToMs(lyrics.phrases[0]?.startSec ?? 12.5);
const coupleProfileRaw = readJson<Record<string, unknown>>('couple-profile.local.json');
const coupleProfileParsed = coupleProfileRaw ? parseCoupleProfile(coupleProfileRaw) : null;
const coupleProfile: CoupleProfile = coupleProfileParsed?.ok ? coupleProfileParsed.data : EMPTY_COUPLE_PROFILE;

const snap = (ms: number) => nearestBeatMs(ms, beatsMs) ?? ms;
const introShowsProfiles = coupleProfile.showIntroduction && coupleProfile.groom.name !== '' && coupleProfile.bride.name !== '';

// 7段階を比例配分する重み(ようこそ/タグラインを長め、紹介は短く、S/StaRtへ収束)。
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

const editorialBlocks: EditorialBlock[] = [];
editorialBlocks.push({
  blockId: 'intro-welcome',
  type: 'welcome',
  startMs: introSlots.welcome.startMs,
  endMs: introSlots.welcome.endMs,
  linkedMusicCueIds: [],
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
});

if (hadError) {
  console.error('[migrate-timing-master] cross-reference検証に失敗。master書き込みを中止。');
  process.exit(1);
}

// --- 7. master組み立て -------------------------------------------------------
const now = new Date().toISOString();
const master: TimingMaster = {
  schemaVersion: TIMING_MASTER_SCHEMA_VERSION,
  masterId: existingMaster?.masterId ?? 'start-wedding-edit-master',
  revision: (existingMaster?.revision ?? 0) + 1,
  status: existingMaster?.status ?? 'MASTER_MIGRATED',
  audio: {
    fileName: audioFileName,
    sha256: audioSha256,
    durationMs: existingMaster?.audio.durationMs ?? 0,
    sampleRate: existingMaster?.audio.sampleRate ?? null,
    sourceStartMs: secToMs(editRange.sourceStartSec),
    candidateEndMs: secToMs(editRange.sourceEndSec),
    confirmedEndMs: existingMaster?.audio.confirmedEndMs ?? null,
    fadeOutStartMs: secToMs(editRange.fadeOutStartSec),
    fadeOutDurationMs: secToMs(editRange.fadeOutDurationSec),
    globalContentOffsetMs: existingMaster?.audio.globalContentOffsetMs ?? 0,
    previewLatencyOffsetMs: existingMaster?.audio.previewLatencyOffsetMs ?? 0,
    verifiedByListening: existingMaster?.audio.verifiedByListening ?? false,
  },
  sections,
  phrases,
  musicCues,
  editorialBlocks,
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
    updatedAt: now,
  },
};

const v = master.verification;
info(
  `sections=${master.sections.length} phrases=${master.phrases.length} cues=${v.totalVocalCues}(verified=${v.verifiedVocalCues}) musicCues=${v.totalMusicCues} editorialBlocks=${master.editorialBlocks.length}`,
);
info(`intro editorial blocks(0-${firstVocalMs}ms、7段階${introShowsProfiles ? '全部' : '紹介省略(showIntroduction=false)'}):`);
for (const b of master.editorialBlocks) info(`  ${b.blockId}: ${b.startMs}ms-${b.endMs}ms (${(b.endMs - b.startMs) / 1000}s) "${b.textLines.join(' / ')}"`);

if (isDryRun) {
  info('--dry-run: ファイルは書き込みません。');
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
info(`書き込み完了: local/start-wedding-timing-master.local.json (revision=${master.revision})`);
