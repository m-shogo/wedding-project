// 冒頭Sアニメーション(intro section, 0-12.5s=375frame)。
// TitleSequenceA/B/C(motion-studio/src/compositions/start129/TitleSequences.tsx)の
// build演出をそのまま使い、build完了後も全区間で単調(周期的でない)なゆっくりとした
// scale変化を掛け続けて完全な静止frameを作らない。
//
// 実装メモ: 当初は正弦波によるbreathingを試したが、sin(t)は周期の端で速度がほぼ0になる
// 区間が生じ、3秒以上のfreezeとしてQAで検出された(shotEngine.tsxのeaseOut cubicが
// shot後半で速度低下しfreezeする問題と同根)。introは375frame固定でループしないため、
// 周期関数ではなく単調な線形zoomにすることで速度が常に一定になり、freezeを避けられる。
//
// 区間末尾はfadeで黒を作らずhard cutで最初の歌詞shotへ繋ぐ(Style Bible優先方針)。

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {TitleSequenceA, TitleSequenceB, TitleSequenceC} from '../start129/TitleSequences';
import {SparkleOverlay} from '../start129/SparkleOverlay';

const INTRO_FRAMES = 375;

const withSlowZoomHold = (Inner: React.FC): React.FC => {
  const Wrapped: React.FC = () => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, INTRO_FRAMES], [1, 1.035]);
    return (
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <Inner />
        {/* CSS transformだけでは大面積の単色領域でfreezedetectに引っかかったため、
            実映像由来のdust textureを重ねて全frameで実際にpixelが変化することを保証する */}
        <SparkleOverlay kind="dust" opacity={0.1} />
      </AbsoluteFill>
    );
  };
  return Wrapped;
};

export const TitleSequenceAOpen = withSlowZoomHold(TitleSequenceA);
export const TitleSequenceBOpen = withSlowZoomHold(TitleSequenceB);
export const TitleSequenceCOpen = withSlowZoomHold(TitleSequenceC);

// composition側から使う名前(既存TitleSequences.tsxのプロトタイプと名前が衝突しないよう別export)
export {TitleSequenceAOpen as TitleSequenceA, TitleSequenceBOpen as TitleSequenceB, TitleSequenceCOpen as TitleSequenceC};
