// キラキラ/粒子オーバーレイ。無料素材(Pexels)由来のdust/sparks/gold動画を
// screen blendで重ねる。素材が無ければ何も描画しない(自作CGパーティクルへは逃げない)。
//
// ユーザー指示: 「無理に作らず素材とかはダウンロードして使ってキラキラエフェクトとかたくさん」
// 一方でStyle Bible(docs/02_style-bible.md)は「粒子・glowの重ね過ぎ」を戒めているため、
// 使用箇所はEnd/Welcome等の感情が高まる区間に限定し、opacityも抑える。

import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {start129OverlayLibrary} from '../../data/start129/demoAssetLibrary.generated';

export type SparkleKind = 'dust' | 'sparks' | 'gold';

export const SparkleOverlay: React.FC<{
  kind: SparkleKind;
  opacity?: number;
  startFromSeconds?: number;
}> = ({kind, opacity = 0.35, startFromSeconds = 0}) => {
  const candidates = start129OverlayLibrary[kind] ?? [];
  const path = candidates[0];
  if (!path) return null;

  return (
    <AbsoluteFill style={{mixBlendMode: 'screen', opacity, pointerEvents: 'none'}}>
      <OffthreadVideo
        src={staticFile(path)}
        startFrom={Math.round(startFromSeconds * 30)}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
        muted
      />
    </AbsoluteFill>
  );
};
