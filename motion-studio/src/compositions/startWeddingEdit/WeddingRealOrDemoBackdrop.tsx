// StaRt Wedding Edit専用のbackdrop。StartDemoBackdrop(start129共有部品)と
// 同じprops形状を保ちつつ、resolveWeddingMediaAsset()経由でreal media
// manifestを優先解決する。real manifestが空の間は、既存のStartDemoBackdrop
// と完全に同じ経路(resolveDemoAsset)へ落ちるため、導入時点での見た目・
// render結果は一切変わらない(byte-identicalであることをrender diffで確認済み)。

import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile} from 'remotion';
import type {Start129AssetRole} from '../../data/start129/assetRoles';
import {resolveWeddingMediaAsset} from '../../data/startWeddingEdit/realMedia';
import {StartDemoBackdrop, type StartDemoBackdropProps} from '../start129/StartDemoBackdrop';

export const WeddingRealOrDemoBackdrop: React.FC<StartDemoBackdropProps> = ({role, variantIndex = 0, fit = 'cover', objectPosition, children}) => {
  const resolved = resolveWeddingMediaAsset(role as Start129AssetRole, variantIndex);

  // real media以外(demo/placeholder)は、既存のStartDemoBackdropへそのまま委譲する
  // (fallback描画ロジックの二重実装を避ける)。
  if (resolved.source !== 'real' || !resolved.path) {
    return <StartDemoBackdrop role={role} variantIndex={variantIndex} fit={fit} objectPosition={objectPosition}>{children}</StartDemoBackdrop>;
  }

  const renderMedia = (mediaFit: 'cover' | 'contain', extraStyle?: React.CSSProperties) =>
    resolved.kind === 'video' ? (
      <OffthreadVideo src={staticFile(resolved.path!)} style={{width: '100%', height: '100%', objectFit: mediaFit, objectPosition, ...extraStyle}} muted />
    ) : (
      <Img src={staticFile(resolved.path!)} style={{width: '100%', height: '100%', objectFit: mediaFit, objectPosition, ...extraStyle}} />
    );

  return (
    <AbsoluteFill>
      {fit === 'blurred-extend' ? (
        <>
          <AbsoluteFill style={{filter: 'blur(40px) brightness(0.55)', transform: 'scale(1.15)'}}>{renderMedia('cover')}</AbsoluteFill>
          <AbsoluteFill>{renderMedia('contain')}</AbsoluteFill>
        </>
      ) : (
        renderMedia(fit)
      )}
      {children}
    </AbsoluteFill>
  );
};
