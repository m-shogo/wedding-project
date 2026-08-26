// StaRt Wedding Edit: タイミングマスター(唯一の正本)の型定義。
//
// これまでtiming情報は7つのファイル(structure/phrase/word-accent/beat/
// transition-map + start-wedding-edit.local.json + manual-overrides)へ分散し、
// どれが正本か初心者には分かりにくかった。このファイルが定義するTimingMasterが
// 唯一の正本となり、上記7ファイルは「入力資料」または「migration元」へ降格する
// (削除はしない。migrate-start-wedding-timing-master.mtsが読み続ける)。
//
// 実データ(歌詞本文・音源ファイル名等を含む)はlocal/start-wedding-timing-master.local.json
// に置き、Git管理外にする。このファイル自体(型・helper関数)はGit管理する。
//
// 時刻の正本はframeではなくミリ秒(timeMs, 整数)にする。理由:
//   - fpsを変更してもタイミング値が変わらない
//   - DashboardとRemotionで同じ整数値をやり取りできる
//   - 浮動小数秒の丸め誤差を避けられる
// frameは下記のaudioTimeMsToCompositionFrame()等の共通関数から必ず派生させ、
// animation component内で秒/frameを独自に再計算しない。

export const TIMING_MASTER_SCHEMA_VERSION = 1;

export type TimingMasterStatus =
  | 'MASTER_MISSING'
  | 'MASTER_MIGRATED'
  | 'MASTER_DRAFT'
  | 'MASTER_PARTIALLY_VERIFIED'
  | 'TIMING_MASTER_VERIFIED';

export type RenderStatus = 'RENDER_CURRENT' | 'RENDER_STALE' | 'HUMAN_AUDIO_REVIEW_REQUIRED' | 'FINAL_CANDIDATE' | 'FINAL_APPROVED';

export type TimingSourceKind = 'manual' | 'verified-vocal' | 'audio-analysis' | 'beat-snap' | 'estimated';

export type VocalCueKind =
  | 'phrase-onset'
  | 'word-accent'
  | 'syllable-hit'
  | 'held-note-start'
  | 'held-note-end'
  | 'vocal-release';

/** 1つの発音(語・音節・保持音の開始/終了等)を独立に確認できる最小単位。
 * 文字列キー(`${phraseId}::${word}`)による衝突(「パッ」「チャプ」等の反復語が
 * 区別できない問題)を避けるため、必ずcueIdという安定した固有IDを持つ。 */
export type VocalCue = {
  cueId: string;
  phraseId: string;
  kind: VocalCueKind;
  text: string;
  /** 同じtextが同一phrase内に複数回出る場合の出現順(0始まり)。cueIdの一意性の
   * 根拠を人間が読んで分かるようにするための補助情報(cueId自体はこれに依存しない
   * 固定文字列にする)。 */
  occurrenceIndex: number;
  timeMs: number;
  timingSource: TimingSourceKind;
  verifiedByListening: boolean;
  confidence: 'high' | 'medium' | 'low';
  reviewComment: string;
};

export type TimingPhrase = {
  phraseId: string;
  lineNumber: number;
  sectionId: string;
  text: string;
  startMs: number;
  endMs: number;
  holdMs: number | null;
  exitMs: number | null;
  rhythmType: string | null;
  semanticType: string | null;
  selectedAnimation: string | null;
  transitionIntent: string | null;
  confidence: 'high' | 'medium' | 'low';
  cues: VocalCue[];
  /** phrase全体をverified扱いにできるのは、下のverification.totalPhrases集計で
   * 必須cueがすべてverifiedByListening=trueになった場合だけ。この値はUIの
   * 補助表示用であり、単独でtrueにしても他レイヤーの動作は変わらない
   * (各consumerは必ずcues[].verifiedByListeningを個別に見る)。 */
  humanReviewRequired: boolean;
};

export type SectionKind = 'intro' | 'welcome' | 'couple-intro' | 'verse' | 'prechorus' | 'chorus' | 'interlude' | 'outro';

export type TimingSection = {
  sectionId: string;
  labelJa: string;
  kind: SectionKind;
  startMs: number;
  endMs: number;
  energyStart: 1 | 2 | 3 | 4 | 5;
  energyPeak: 1 | 2 | 3 | 4 | 5;
  energyEnd: 1 | 2 | 3 | 4 | 5;
  energyCurve: Array<{timeMs: number; value: 1 | 2 | 3 | 4 | 5}>;
  mood: string[];
  narrativeRole: string;
  visualDensity: 'low' | 'medium' | 'high';
  cameraEnergy: 'still' | 'low' | 'medium' | 'high';
  typographyEnergy: 'still' | 'low' | 'medium' | 'high';
  recommendedPhotoRoles: string[];
  transitionIntent: string;
  verifiedByListening: boolean;
};

export type MusicCueType =
  | 'downbeat'
  | 'instrument-impact'
  | 'drum-fill'
  | 'cymbal'
  | 'break'
  | 'silence'
  | 'instrument-enter'
  | 'instrument-exit'
  | 'chord-change'
  | 'chorus-entry'
  | 'transition'
  | 'ending-candidate';

export type MusicCue = {
  cueId: string;
  timeMs: number;
  type: MusicCueType;
  strength: 1 | 2 | 3 | 4 | 5;
  description: string;
  timingSource: 'manual' | 'audio-analysis' | 'estimated';
  verifiedByListening: boolean;
};

export type EditorialBlockType = 'welcome' | 'couple-profile' | 'title' | 'thank-you' | 'end-card';

/** 歌詞ではない演出block(ウェルカム・新郎新婦紹介・タイトル等)。 */
export type EditorialBlock = {
  blockId: string;
  type: EditorialBlockType;
  startMs: number;
  endMs: number;
  linkedMusicCueIds: string[];
  energy: 1 | 2 | 3 | 4 | 5;
  textLines: string[];
  photoRoles: string[];
  verifiedByListening: boolean;
};

export type TimingMaster = {
  schemaVersion: number;
  masterId: string;
  revision: number;
  status: TimingMasterStatus;

  audio: {
    fileName: string;
    sha256: string;
    durationMs: number;
    sampleRate: number | null;
    sourceStartMs: number;
    candidateEndMs: number;
    confirmedEndMs: number | null;
    fadeOutStartMs: number | null;
    fadeOutDurationMs: number | null;
    globalContentOffsetMs: number;
    previewLatencyOffsetMs: number;
    verifiedByListening: boolean;
  };

  sections: TimingSection[];
  phrases: TimingPhrase[];
  musicCues: MusicCue[];
  editorialBlocks: EditorialBlock[];

  verification: {
    totalPhrases: number;
    verifiedPhrases: number;
    totalVocalCues: number;
    verifiedVocalCues: number;
    totalMusicCues: number;
    verifiedMusicCues: number;
    verifiedBy: string | null;
    verifiedAt: string | null;
  };

  provenance: {
    migratedFrom: string[];
    createdAt: string;
    updatedAt: string;
  };
};

// ---------------------------------------------------------------------------
// 時間変換の共通関数。animation component内で秒/frameを独自に再計算しない。
// ---------------------------------------------------------------------------

export const secToMs = (sec: number): number => Math.round(sec * 1000);
export const msToSec = (ms: number): number => ms / 1000;

/** 音源上の絶対時刻(ms)を、Composition(=sourceStartMsを0とした編集後の
 * timeline)上のframeへ変換する。fpsはCompositionごとに変わりうるため引数で渡す。 */
export const audioTimeMsToCompositionFrame = (audioTimeMs: number, sourceStartMs: number, fps: number): number =>
  Math.round(((audioTimeMs - sourceStartMs) / 1000) * fps);

/** Composition frameから音源上の絶対時刻(ms)へ戻す(逆変換)。 */
export const compositionFrameToAudioTimeMs = (frame: number, sourceStartMs: number, fps: number): number =>
  Math.round((frame / fps) * 1000) + sourceStartMs;

/** 音源の絶対時刻(ms)を、trim後の編集時間(0始まり、ms)へ変換する。 */
export const sourceTimeMsToEditTimeMs = (sourceTimeMs: number, sourceStartMs: number): number => sourceTimeMs - sourceStartMs;

/** trim後の編集時間(ms)を、音源の絶対時刻(ms)へ戻す。 */
export const editTimeMsToSourceTimeMs = (editTimeMs: number, sourceStartMs: number): number => editTimeMs + sourceStartMs;

/** 優先順位: manual > verified-vocal > audio-analysis > beat-snap > estimated。
 * 複数のtimingSource候補から実際に使う1つを選ぶ共通ルール。 */
const TIMING_SOURCE_PRIORITY: Record<TimingSourceKind, number> = {
  manual: 0,
  'verified-vocal': 1,
  'audio-analysis': 2,
  'beat-snap': 3,
  estimated: 4,
};

export const pickHigherPriorityTimingSource = (a: TimingSourceKind, b: TimingSourceKind): TimingSourceKind =>
  TIMING_SOURCE_PRIORITY[a] <= TIMING_SOURCE_PRIORITY[b] ? a : b;

/** ある配列のbeat(ms)から、指定時刻(ms)に最も近いbeatを返す。 */
export const nearestBeatMs = (targetMs: number, beatsMs: number[]): number | null => {
  if (beatsMs.length === 0) return null;
  let best = beatsMs[0];
  let bestDiff = Math.abs(beatsMs[0] - targetMs);
  for (const b of beatsMs) {
    const d = Math.abs(b - targetMs);
    if (d < bestDiff) {
      best = b;
      bestDiff = d;
    }
  }
  return best;
};

/** phraseが「確認済み」と呼べるのは、そのphrase内の必須cue(phrase-onsetと、
 * word-accent/syllable-hit等の主要cue)がすべてverifiedByListening=trueの場合だけ。
 * 1発目だけ確認して2/3発目が未確認のphraseをverified扱いにしないための共通判定。 */
export const isPhraseFullyVerified = (phrase: TimingPhrase): boolean =>
  phrase.cues.length > 0 && phrase.cues.every((c) => c.verifiedByListening);

export const countVerification = (master: Pick<TimingMaster, 'phrases' | 'musicCues'>) => {
  const allCues = master.phrases.flatMap((p) => p.cues);
  return {
    totalPhrases: master.phrases.length,
    verifiedPhrases: master.phrases.filter(isPhraseFullyVerified).length,
    totalVocalCues: allCues.length,
    verifiedVocalCues: allCues.filter((c) => c.verifiedByListening).length,
    totalMusicCues: master.musicCues.length,
    verifiedMusicCues: master.musicCues.filter((c) => c.verifiedByListening).length,
  };
};

/** TIMING_MASTER_VERIFIEDを名乗れるかどうかの共通判定(念のためスクリプト側だけで
 * 判断せずここでも定義し、DashboardとQAスクリプトで同じ基準を使えるようにする)。 */
export const canBeTimingMasterVerified = (master: TimingMaster): {ok: true} | {ok: false; reasons: string[]} => {
  const reasons: string[] = [];
  const v = countVerification(master);
  if (v.verifiedPhrases < v.totalPhrases) reasons.push(`未確認phraseが${v.totalPhrases - v.verifiedPhrases}件`);
  if (v.verifiedVocalCues < v.totalVocalCues) reasons.push(`未確認vocal cueが${v.totalVocalCues - v.verifiedVocalCues}件`);
  if (master.audio.confirmedEndMs == null) reasons.push('終了位置(confirmedEndMs)が未確認');
  if (!master.audio.verifiedByListening) reasons.push('audio.verifiedByListeningがfalse');
  const hasEstimated = master.phrases.some((p) => p.cues.some((c) => c.timingSource === 'estimated'));
  if (hasEstimated) reasons.push('timingSource=estimatedのcueが残存');
  return reasons.length === 0 ? {ok: true} : {ok: false, reasons};
};
