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
  /** このcue単体だけを補正するoffset(ms)。「パッの2発目だけ早い」といった
   * 局所修正に使う。phraseOffsetMs/globalContentOffsetMsと二重適用しないよう、
   * 必ずresolveEffectiveCueTimeMs()経由で合成する(このfieldへ直接他のoffsetを
   * 足し込まない)。既定0。 */
  cueOffsetMs: number;
  /** timingSource='audio-analysis'の場合、実際に何を解析根拠にしたか
   * (例: 'vocal-stem-onset-detection'。htdemucsでボーカル分離した音源上での
   * librosa onset検出)。根拠不明のまま'audio-analysis'と自称しないための
   * 追跡フィールド。manual/beat-snap/estimatedの場合はnull。 */
  analysisMethod: string | null;
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
  /** このphrase内の全cueへ一律適用するoffset(ms)。「このphraseだけ全体的に
   * 早い/遅い」という補正に使う。cueOffsetMs/globalContentOffsetMsと
   * 二重適用しないよう、必ずresolveEffectiveCueTimeMs()経由で合成する。
   * 既定0。 */
  phraseOffsetMs: number;
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

/** title種別のblock(S/StaRt等)で、1文字ずつ実cueへ同期させるための
 * 個別cue。musicGrid.beatsMsが不足する区間では均等fallbackを使うが、
 * その場合はtimingSource='estimated'を必ず持たせ、Guideへ表示できるようにする。 */
export type LetterCue = {
  cueId: string;
  text: string;
  timeMs: number;
  timingSource: TimingSourceKind;
  verifiedByListening: boolean;
};

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
  /** title種別のみ使用。文字ごとの安定cue(INTRO-START-S等)。 */
  letterCues?: LetterCue[];
};

/** 音楽グリッド(BPM/beat/downbeat)。旧beat-map.local.jsonの内容をmasterへ
 * 正式に取り込み、generated.tsが空配列を出力しないようにするための型。 */
export type MusicGrid = {
  bpm: number | null;
  beatsMs: number[];
  downbeatsMs: number[];
  source: 'manual' | 'audio-analysis' | 'legacy-import';
  verifiedByListening: boolean;
};

export type TimingMaster = {
  schemaVersion: number;
  masterId: string;
  revision: number;
  /** revision管理用: timestamp/revision/provenance.updatedAt等の揮発フィールドを
   * 除いたcanonical contentのhash。同じ内容でmigration/saveを繰り返しても
   * このhashが変わらなければrevisionを増やさない(computeMasterContentHash参照)。 */
  contentHash: string;
  status: TimingMasterStatus;

  audio: {
    fileName: string;
    sha256: string;
    durationMs: number;
    sampleRate: number | null;
    channels: number | null;
    codec: string | null;
    sourceStartMs: number;
    candidateEndMs: number;
    confirmedEndMs: number | null;
    fadeOutStartMs: number | null;
    fadeOutDurationMs: number | null;
    globalContentOffsetMs: number;
    previewLatencyOffsetMs: number;
    /** 実測: AVSyncTest compositionをrender→ffprobe再解析した結果判明した、
     * render pipeline自体(Remotion+ffmpeg AAC encode+MP4 mux)が持つ
     * 恒常的なaudio-video遅延(ms、音声が遅れる方向を正とする)。
     * 2026-08-26の実測では12/12 test pointで42.7ms・分散ゼロ(定数offset、
     * driftではない)。これはTimingMaster側のcue時刻の誤りではなく、
     * render pipeline自体の癖であり、globalContentOffsetMs(音源content側の
     * 補正)とは意味的に別物のため別fieldで持つ。renderPipelineOffsetVerified
     * =falseの間は、この値を自動的にrenderへ適用しない(人間が実際の
     * 最終MP4を試聴して妥当性を確認するまでcandidateのまま)。 */
    renderPipelineOffsetMs: number | null;
    renderPipelineOffsetVerified: boolean;
    verifiedByListening: boolean;
  };

  musicGrid: MusicGrid;
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

  /** 実際に音源へ解析を実行した記録(実行していなければnull)。
   * 「audio-analysis」と自称する値がある場合、必ずこのrunに紐づく根拠が
   * あることを期待する(check-start-wedding-timing-master.mtsで検査)。 */
  analysisRun: {
    runId: string;
    audioSha256: string;
    tool: string;
    toolVersion: Record<string, string>;
    model: string | null;
    generatedAt: string;
    stemAlignmentOffsetMs: number;
    stemAlignmentVerified: boolean;
    vocalOnsetCandidateCount: number;
  } | null;
};

// ---------------------------------------------------------------------------
// 時間変換の共通関数。animation component内で秒/frameを独自に再計算しない。
// ---------------------------------------------------------------------------

export const secToMs = (sec: number): number => Math.round(sec * 1000);
export const msToSec = (ms: number): number => ms / 1000;

/** 音源上の絶対時刻(ms)を、Composition(=sourceStartMsを0とした編集後の
 * timeline)上のframeへ変換する。fpsはCompositionごとに変わりうるため引数で渡す。
 * globalOffsetMs(既定0)はaudio.globalContentOffsetMsを渡す想定で、
 * 全歌詞が同じ方向へズレている場合の一括補正に使う。previewLatencyOffsetMsは
 * ここに混ぜない(ブラウザ再生専用、render frameには影響させない)。 */
export const audioTimeMsToCompositionFrame = (audioTimeMs: number, sourceStartMs: number, fps: number, globalOffsetMs = 0): number =>
  Math.round(((audioTimeMs + globalOffsetMs - sourceStartMs) / 1000) * fps);

/** Composition frameから音源上の絶対時刻(ms)へ戻す(逆変換)。 */
export const compositionFrameToAudioTimeMs = (frame: number, sourceStartMs: number, fps: number, globalOffsetMs = 0): number =>
  Math.round((frame / fps) * 1000) + sourceStartMs - globalOffsetMs;

/** 音源の絶対時刻(ms)を、trim後の編集時間(0始まり、ms)へ変換する。 */
export const sourceTimeMsToEditTimeMs = (sourceTimeMs: number, sourceStartMs: number): number => sourceTimeMs - sourceStartMs;

/** trim後の編集時間(ms)を、音源の絶対時刻(ms)へ戻す。 */
export const editTimeMsToSourceTimeMs = (editTimeMs: number, sourceStartMs: number): number => editTimeMs + sourceStartMs;

/** offsetの正本となる唯一の合成関数(P0要件: 二重適用防止のため、
 * global/phrase/cueのoffset合成をここ以外で行わない)。
 *
 *   effectiveTimeMs = cue.timeMs
 *                    + master.audio.globalContentOffsetMs
 *                    + phrase.phraseOffsetMs
 *                    + cue.cueOffsetMs
 *
 * previewLatencyOffsetMsとrenderPipelineOffsetMsはここに含めない
 * (前者はDashboard再生専用、後者はverified=trueになるまでrenderへ
 * 自動適用しない候補値のため、別途明示的に扱う)。
 * 呼び出し側でcue.timeMsへ個別にoffsetを足し込んではいけない。 */
export const resolveEffectiveCueTimeMs = (
  cue: Pick<VocalCue, 'timeMs' | 'cueOffsetMs'>,
  phrase: Pick<TimingPhrase, 'phraseOffsetMs'>,
  audio: Pick<TimingMaster['audio'], 'globalContentOffsetMs'>,
): number => cue.timeMs + audio.globalContentOffsetMs + phrase.phraseOffsetMs + cue.cueOffsetMs;

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

/** revisionを意味のある変更時だけ増やすための、canonical(=決定的で揮発フィールドを
 * 含まない)payloadを作る。timestamp/revision/contentHash自体/verification集計
 * (常にcues等から再計算できる派生値)を除外することで、「保存し直しただけ」では
 * 中身が変わらない限りhashも変わらないようにする。実際のhash計算(sha256)は
 * Node専用(crypto)なのでスクリプト側(migrate/sync)で行い、ここでは
 * hash対象のpayloadを決定するロジックだけを共有する(ブラウザ環境からも
 * importされうるこのファイルにNode専用importを持ち込まないため)。 */
export const canonicalMasterPayloadForHash = (
  master: Omit<TimingMaster, 'contentHash' | 'revision' | 'verification' | 'provenance'> & {
    verification?: TimingMaster['verification'];
    provenance?: TimingMaster['provenance'];
  },
): unknown => ({
  schemaVersion: master.schemaVersion,
  masterId: master.masterId,
  status: master.status,
  audio: {...master.audio},
  musicGrid: master.musicGrid,
  sections: master.sections,
  phrases: master.phrases,
  musicCues: master.musicCues,
  editorialBlocks: master.editorialBlocks,
  // generatedAtは除外(揮発)。runId/tool/stemAlignmentOffsetMs等は実質的な
  // 解析結果の変化を表すためhash対象に含める。
  analysisRun: master.analysisRun ? {...master.analysisRun, generatedAt: undefined} : null,
});
