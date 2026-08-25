// role指定だけで「実素材があれば実素材、無ければ抽象placeholder」を出す共通背景。
// 3案(A/B/C)すべてがこれ経由で写真・動画を参照する。
// Math.random()は使わない(role文字列からdeterministicに色相を出す)。

import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile} from 'remotion';
import {start129DemoAssetLibrary} from '../../data/start129/demoAssetLibrary.generated';
import {start129AssetRoleSpec, type Start129AssetRole} from '../../data/start129/assetRoles';

const hashHue = (input: string): number => {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) % 360;
  }
  return h;
};

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
  children,
}) => {
  const candidates = start129DemoAssetLibrary[role] ?? [];
  const path = candidates[variantIndex % Math.max(candidates.length, 1)];
  const spec = start129AssetRoleSpec(role);

  const renderMedia = (mediaFit: 'cover' | 'contain', extraStyle?: React.CSSProperties) =>
    spec.kind === 'video' ? (
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
      {children}
    </AbsoluteFill>
  );
};
