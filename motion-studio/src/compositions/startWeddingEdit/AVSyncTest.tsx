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

/** 実TimingMasterの重要cueのうち代表12件を、2秒間隔の設計時刻へ再配置した
 * test slot。実際の曲内での時刻ではなく、pipeline検証用の圧縮タイムライン。 */
export const AV_SYNC_TEST_POINTS: Array<{cueId: string; designTimeSec: number}> = [
  {cueId: 'P001-ONSET', designTimeSec: 1.0},
  {cueId: 'P004-W01(武装)', designTimeSec: 3.0},
  {cueId: 'P004-W02(創)', designTimeSec: 5.0},
  {cueId: 'P004-W03(造)', designTimeSec: 7.0},
  {cueId: 'P004-W04(登場)', designTimeSec: 9.0},
  {cueId: 'P012-H01(パッ1)', designTimeSec: 11.0},
  {cueId: 'P012-H02(パッ2)', designTimeSec: 13.0},
  {cueId: 'P012-H03(パッ3)', designTimeSec: 15.0},
  {cueId: 'P013-H01(チャプ1)', designTimeSec: 17.0},
  {cueId: 'P013-H02(チャプ2)', designTimeSec: 19.0},
  {cueId: 'P013-H03(チャプ3)', designTimeSec: 21.0},
  {cueId: 'INTRO-START-S', designTimeSec: 23.0},
];

export const AV_SYNC_TEST_DURATION_SEC = 25;
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
