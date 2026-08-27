// role指定だけで「実素材があれば実素材、無ければ抽象placeholder」を出す共通背景。
// 3案(A/B/C)すべてがこれ経由で写真・動画を参照する。
// Math.random()は使わない(role文字列からdeterministicに色相を出す)。

import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile} from 'remotion';
import {start129AssetRoleSpec, type Start129AssetRole} from '../../data/start129/assetRoles';
import {resolveDemoAsset} from '../../data/start129/resolveDemoAsset';

const hashHue = (input: string): number => {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) % 360;
  }
  return h;
};

/** role+variantIndexから実際のasset(path/kind)を解決する関数の型。
 * 既定はresolveDemoAsset(このファイル下部)。呼び出し元(例: StaRt Wedding Edit)
 * が独自のresolver(real → demo → placeholderのfallback chain等)を注入
 * できるようにするための共通契約。sourceTypeは任意(debug表示用、TASK9)。 */
export type StartDemoAssetResolution = {path?: string; kind: 'photo' | 'video'; sourceType?: 'real' | 'demo' | 'placeholder'};
export type StartDemoAssetResolver = (role: Start129AssetRole, variantIndex: number) => StartDemoAssetResolution;

export type StartDemoBackdropProps = {
  role: Start129AssetRole;
  /** 同一role内で何番目の候補を使うか(複数登録時)。既定0。 */
  variantIndex?: number;
  /**
   * 'cover': 画面いっぱいに敷き詰める(黒帯無し、周辺crop)。
   * 'contain': 全体を収める(縦横比が画面と違うと黒帯が出る)。
   * 'blurred-extend': 縦写真等、画面と縦横比が異なる素材向け。
   *   背後にぼかしたcover拡張を敷き、前面へcontain画像を重ねることで
   *   黒帯を出さずに元の構図を保持する(編集で一般的な手法)。
   */
  fit?: 'cover' | 'contain' | 'blurred-extend';
  /** cover時の注視点。顔や主役が切れないようにshot側から指定する */
  objectPosition?: string;
  /** 省略時はresolveDemoAsset(既存動作)。呼び出し元がreal media resolver等を
   * 注入する場合だけ指定する(Start129/Director Recipe等、既存の呼び出し元は
   * 一切変更不要でこれまで通りdemo assetを使い続ける)。 */
  assetResolver?: StartDemoAssetResolver;
  /** trueの場合、右上に解決元(REAL/DEMO/PLACEHOLDER)を小さく表示する
   * (TASK9、debug/guide表示専用。既定false、本番Cleanでは使わない)。 */
  showSourceBadge?: boolean;
  children?: React.ReactNode;
};

/**
 * 実素材が無いroleに出す抽象placeholder。
 * 「AI高級テンプレ」に寄せないよう、gradientは1色相のみ・粒子やglowは足さない。
 * 役割名と、なぜplaceholderかを薄く表示し、レビュー時に取り違えない。
 */
const AbstractPlaceholder: React.FC<{role: Start129AssetRole}> = ({role}) => {
  const spec = start129AssetRoleSpec(role);
  const hue = hashHue(role);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 22% 16%) 0%, hsl(${hue} 30% 9%) 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          padding: 32,
        }}
      >
        <div
          style={{
            fontFamily: 'sans-serif',
            color: 'hsl(0 0% 100% / 0.4)',
            fontSize: 16,
            letterSpacing: 1,
            textAlign: 'right',
          }}
        >
          {spec.labelJa} / 実素材未配置
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const StartDemoBackdrop: React.FC<StartDemoBackdropProps> = ({
  role,
  variantIndex = 0,
  fit = 'cover',
  objectPosition,
  assetResolver,
  showSourceBadge = false,
  children,
}) => {
  const resolve: StartDemoAssetResolver = assetResolver ?? resolveDemoAsset;
  const {path, kind, sourceType} = resolve(role, variantIndex);

  const renderMedia = (mediaFit: 'cover' | 'contain', extraStyle?: React.CSSProperties) =>
    kind === 'video' ? (
      <OffthreadVideo
        src={staticFile(path!)}
        style={{width: '100%', height: '100%', objectFit: mediaFit, objectPosition, ...extraStyle}}
        muted
      />
    ) : (
      <Img
        src={staticFile(path!)}
        style={{width: '100%', height: '100%', objectFit: mediaFit, objectPosition, ...extraStyle}}
      />
    );

  return (
    <AbsoluteFill>
      {path ? (
        fit === 'blurred-extend' ? (
          <>
            <AbsoluteFill style={{filter: 'blur(40px) brightness(0.55)', transform: 'scale(1.15)'}}>
              {renderMedia('cover')}
            </AbsoluteFill>
            <AbsoluteFill>{renderMedia('contain')}</AbsoluteFill>
          </>
        ) : (
          renderMedia(fit)
        )
      ) : (
        <AbstractPlaceholder role={role} />
      )}
      {showSourceBadge ? (
        <div
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 700,
            color: sourceType === 'real' ? '#7CF29A' : sourceType === 'demo' ? '#8CA0FF' : '#FFD84A',
            background: 'rgba(0,0,0,0.55)',
            padding: '1px 5px',
            pointerEvents: 'none',
          }}
        >
          {(sourceType ?? (path ? 'demo' : 'placeholder')).toUpperCase()}
        </div>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};
