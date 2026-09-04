// 最終MP4のA/V同期を機械測定するための専用テストComposition。
//
// 目的: TimingMaster上の時刻が正しくても、trim・AAC re-encode・Remotion render・
// MP4 muxの過程でズレる可能性がある(P0指摘)。「データ上の同期」ではなく
// 「完成MP4での同期」を検証するため、既知の設計時刻(designTimeSec)へ
// audio click + visual flash + cueId表示を同時に置き、render後のMP4を
// 再度decode/解析してclickのsample位置とflashのframe位置を実測する。
//
// 重要: これはTimingMaster上のcueが「音楽的に正しい」かどうかの検証では
// ない(それは別途、実ボーカルonsetとの比較で検証済み)。ここで検証するのは
// 「Remotion+ffmpegのrender/encode pipeline自体が、指定した時刻へ正確に
// audio/videoを配置できているか」という、pipeline自体の忠実度。
// QA用clickはClean/Final成果物へ絶対に混入させない(このcomposition専用)。

import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';

const FPS = 30;
const secToFrame = (s: number) => Math.round(s * FPS);

/** 前回(v1)は1〜23秒の12点のみで、そこから145.6秒地点の誤差を線形回帰で
 * 「予測」していた(外挿であり実測ではない)。今回(v2)は実曲の全長145.6秒を
 * 実際にカバーするtest slotへ拡張し、intro/verse/chorus/middle/final-chorus/
 * endingに相当する位置で本当に計測する(外挿ではなく実測でconstant-offset/
 * driftを判定するため)。 */
export const AV_SYNC_TEST_POINTS: Array<{cueId: string; designTimeSec: number}> = [
  {cueId: 'ANCHOR-INTRO', designTimeSec: 2.0},
  {cueId: 'ANCHOR-VERSE1', designTimeSec: 16.0},
  {cueId: 'ANCHOR-PRECHORUS1', designTimeSec: 30.0},
  {cueId: 'ANCHOR-CHORUS1', designTimeSec: 45.0},
  {cueId: 'ANCHOR-VERSE2', designTimeSec: 60.0},
  {cueId: 'ANCHOR-MIDDLE', designTimeSec: 75.0},
  {cueId: 'ANCHOR-PRECHORUS2', designTimeSec: 90.0},
  {cueId: 'ANCHOR-CHORUS2A', designTimeSec: 105.0},
  {cueId: 'ANCHOR-CHORUS2B', designTimeSec: 120.0},
  {cueId: 'ANCHOR-INTERLUDE', designTimeSec: 135.0},
  {cueId: 'ANCHOR-ENDING', designTimeSec: 144.0},
];

export const AV_SYNC_TEST_DURATION_SEC = 146;
export const avSyncTestDurationInFrames = secToFrame(AV_SYNC_TEST_DURATION_SEC);

const FlashAndClick: React.FC<{cueId: string}> = ({cueId}) => (
  <>
    <Audio src={staticFile('av-sync-test/click.wav')} />
    <AbsoluteFill style={{background: '#FFFFFF'}} />
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: 'monospace', fontSize: 40, fontWeight: 700, color: '#000000'}}>{cueId}</div>
    </AbsoluteFill>
  </>
);

export const AVSyncTestComposition: React.FC = () => (
  <AbsoluteFill style={{background: '#0A0A0C'}}>
    {AV_SYNC_TEST_POINTS.map((p) => (
      <Sequence key={p.cueId} from={secToFrame(p.designTimeSec)} durationInFrames={4} name={p.cueId}>
        <FlashAndClick cueId={p.cueId} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
