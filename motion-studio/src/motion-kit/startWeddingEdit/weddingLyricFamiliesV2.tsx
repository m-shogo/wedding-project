// Phase4/v3の歌詞animation family。
//
// v3(2026-08-26)での変更点:
// - WordSequenceBuild: importantWords(word-accent-map由来)を段階的に表示する汎用component。
//   P001/P004/P011/P019など「複数語を別accentで出す」要求に対応する。
// - LyricToTransition: 小さい親div内に閉じていたwipeを、真の全画面AbsoluteFillへ分離。
// - Type Mask: 固定写真のまま(実shot非連動、既知の限界として明記)だが、
//   背景backplate+outlineでA/B/Cどの背景でも読める安全策を追加。
// - Foreground Reveal: 実際の前景/背景レイヤー分離が無いダミー素材環境のため、
//   SVGシルエットを疑似前景として重ね、「文字が前景の後ろを通る」ことを実装する
//   (実写真の人物セグメンテーションではない。既知の限界として明記)。

import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';

const JP = "'Noto Sans JP', sans-serif";

export type ImportantWord = {word: string; accentSec: number; beatSec: number | null};

/** 複数語を別々のaccent frameで段階表示する汎用component。
 * P001(やっとこさ/幕開けだ)、P004(武装/創/造/登場)、P011(さあ/試されよう)、
 * P019(苦悩/煩/悩/上等)で使う。stageIndexに応じてsizeUp(最終語だけ大きく)を選べる。 */
export const WordSequenceBuild: React.FC<{
  words: string[];
  frames: number[]; // 各wordのlocal frame(phrase開始からの相対値)
  color: string;
  fontSize?: number;
  finalWordScaleUp?: boolean;
  layout?: 'inline' | 'stack';
}> = ({words, frames, color, fontSize = 44, finalWordScaleUp = true, layout = 'inline'}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', flexDirection: layout === 'stack' ? 'column' : 'row', gap: layout === 'stack' ? 2 : 10}}>
      {words.map((w, i) => {
        const hit = frames[i] ?? frames[frames.length - 1] + i * 8;
        const local = f - hit;
        const isLast = i === words.length - 1;
        const o = interpolate(local, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const scaleTarget = isLast && finalWordScaleUp ? 1.25 : 1;
        const s = interpolate(local, [0, 4, 10], [0.6, scaleTarget * 1.1, scaleTarget], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        if (o <= 0.001) return null;
        return (
          <span
            key={i}
            style={{
              fontFamily: JP,
              fontSize: isLast && finalWordScaleUp ? fontSize * 1.2 : fontSize,
              fontWeight: isLast ? 900 : 600,
              color,
              opacity: o,
              transform: `scale(${s})`,
              display: 'inline-block',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** 10. Baseline Travel: 横線が画面を横断しながら文字が乗る。線がそのまま次shotのroute/水平線を予告する。
 * importantWordsが2語ある場合(例: P001)は2段階目で「開く」印象を追加する。 */
export const BaselineTravel: React.FC<{
  words: string[];
  frames: number[];
  color: string;
  fontSize?: number;
}> = ({words, frames, color, fontSize = 40}) => {
  const f = useCurrentFrame();
  const firstHit = frames[0] ?? 0;
  const lineW = interpolate(f, [firstHit, firstHit + 16], [0, 640], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // 2語目(例: 幕開けだ)で画面がわずかに開く(明るさが増す)印象を足す
  const secondHit = frames[1];
  const openGlow = secondHit != null ? interpolate(f, [secondHit, secondHit + 14], [0, 0.35], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <div style={{position: 'relative'}}>
      {openGlow > 0 ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 20% 80%, rgba(255,250,230,${openGlow}) 0%, rgba(255,250,230,0) 60%)`,
            pointerEvents: 'none',
          }}
        />
      ) : null}
      <div style={{height: 2, width: lineW, background: color, opacity: 0.85}} />
      <div style={{marginTop: 8}}>
        <WordSequenceBuild words={words} frames={frames} color={color} fontSize={fontSize} finalWordScaleUp={false} />
      </div>
    </div>
  );
};

/** 12. Foreground Reveal: 疑似前景(SVGシルエット)の後ろから文字が現れる。
 * 実写真の人物セグメンテーションではなく、抽象shapeを前景代わりに使う近似実装
 * (既知の限界。docs記載)。 */
export const ForegroundReveal: React.FC<{text: string; color: string; fontSize?: number}> = ({
  text,
  color,
  fontSize = 46,
}) => {
  const f = useCurrentFrame();
  const reveal = interpolate(f, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const silhouetteX = interpolate(f, [0, 40], [-6, 6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'relative', width: 520, height: 140}}>
      {/* 文字(背面) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 10,
          fontFamily: JP,
          fontSize,
          fontWeight: 700,
          color,
          opacity: reveal,
        }}
      >
        {text}
      </div>
      {/* 疑似前景シルエット(2つの人影が寄り添う抽象shape。「独りじゃない」の視覚化) */}
      <svg
        width={520}
        height={140}
        style={{position: 'absolute', left: 0, top: 0, transform: `translateX(${silhouetteX}px)`, pointerEvents: 'none'}}
      >
        <ellipse cx={90} cy={70} rx={46} ry={70} fill="#0A0A0C" opacity={0.92} />
        <ellipse cx={150} cy={75} rx={42} ry={65} fill="#0A0A0C" opacity={0.92} />
      </svg>
    </div>
  );
};

/** 11. Type Mask: 文字の内側に写真が見える。既知の限界: 実shot非連動の固定写真。
 * 背景の明暗に関わらず読めるよう、暗backplate+反対色outlineで安全策を取る。
 * variantごとに別写真を割り当てて単調さを避ける。 */
const TYPE_MASK_PHOTOS: Record<string, string> = {
  A: 'demo/start-129/HERO_CLOSE/pexels-10638717.jpg',
  B: 'demo/start-129/HERO_WIDE/pexels-15716670.jpg',
  C: 'demo/start-129/HERO_CLOSE/pexels-10638717.jpg',
};

/** TypeMaskTextの1segment(prefix/suffix)を描画する。outline+photo-clipの2層は
 * 常に同じ構造にして、suffixだけ個別のscale/glowを掛けられるようにする。 */
const MaskSegment: React.FC<{
  text: string;
  fontSize: number;
  photo: string;
  outline: string;
  zoom: number;
  scale: number;
  glow: number;
}> = ({text, fontSize, photo, outline, zoom, scale, glow}) => (
  <span style={{position: 'relative', display: 'inline-block', transform: `scale(${scale})`, transformOrigin: 'left center'}}>
    {glow > 0 ? (
      <span
        style={{
          position: 'absolute',
          inset: -22,
          background: `radial-gradient(ellipse at center, rgba(244,201,93,${glow * 0.6}) 0%, rgba(244,201,93,0) 70%)`,
          pointerEvents: 'none',
        }}
      />
    ) : null}
    {/* outline層: text-strokeで文字の形自体を常に視認可能にする */}
    <span
      style={{
        position: 'absolute',
        inset: 0,
        fontFamily: JP,
        fontSize,
        fontWeight: 900,
        lineHeight: 1.15,
        color: 'transparent',
        WebkitTextStroke: `2px ${outline}`,
      }}
    >
      {text}
    </span>
    <span
      style={{
        fontFamily: JP,
        fontSize,
        fontWeight: 900,
        lineHeight: 1.15,
        display: 'inline-block',
        backgroundImage: `url(${staticFile(photo)})`,
        backgroundSize: `${zoom}% auto`,
        backgroundPosition: 'center',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </span>
  </span>
);

export const TypeMaskText: React.FC<{
  text: string;
  variant: 'A' | 'B' | 'C';
  fontSize?: number;
  /** 実accentSecの瞬間にscale-up+glowさせるためのlocal frame(呼び出し側のSequence基準)。 */
  emphasisFrame?: number;
  /** P029「貴方を」のように、textの末尾の一部だけを強調したい場合の部分文字列。
   * text.endsWith(emphasisSuffix)でない場合は無視され、whole textにfallbackする。 */
  emphasisSuffix?: string;
}> = ({text, variant, fontSize = 72, emphasisFrame, emphasisSuffix}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const zoom = interpolate(f, [0, 220], [100, 118], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const photo = TYPE_MASK_PHOTOS[variant];
  const outline = variant === 'C' ? '#0A0A0C' : '#FFFDF7';

  const hasWordEmphasis = emphasisFrame != null && !!emphasisSuffix && text.endsWith(emphasisSuffix) && emphasisSuffix.length < text.length;
  const prefix = hasWordEmphasis ? text.slice(0, text.length - emphasisSuffix!.length) : text;
  const suffix = hasWordEmphasis ? emphasisSuffix! : '';

  // emphasisSuffixが無い(または末尾一致しない)場合は、従来通りwhole textをpulseさせる。
  const wholeTextEmphasis = emphasisFrame != null && !hasWordEmphasis;
  const scaleAt = (frame: number | undefined) =>
    frame != null
      ? interpolate(f, [frame - 4, frame + 6, frame + 24], [1, 1.16, 1.04], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : 1;
  const glowAt = (frame: number | undefined) =>
    frame != null
      ? interpolate(f, [frame - 4, frame + 4, frame + 30], [0, 0.9, 0.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : 0;

  return (
    <div
      style={{
        position: 'relative',
        opacity: o,
        display: 'inline-block',
        transform: wholeTextEmphasis ? `scale(${scaleAt(emphasisFrame)})` : undefined,
      }}
    >
      {wholeTextEmphasis && glowAt(emphasisFrame) > 0 ? (
        <div
          style={{
            position: 'absolute',
            inset: -30,
            background: `radial-gradient(ellipse at center, rgba(244,201,93,${glowAt(emphasisFrame) * 0.6}) 0%, rgba(244,201,93,0) 70%)`,
            pointerEvents: 'none',
          }}
        />
      ) : null}
      {/* 安全策のbackplate: 写真自体が暗い/明るいどちらでも文字の輪郭を保証する */}
      <div
        style={{
          position: 'absolute',
          inset: -14,
          background: variant === 'C' ? 'rgba(242,239,232,0.85)' : 'rgba(10,10,12,0.55)',
          borderRadius: 4,
        }}
      />
      <div style={{position: 'relative'}}>
        <MaskSegment text={prefix} fontSize={fontSize} photo={photo} outline={outline} zoom={zoom} scale={1} glow={0} />
        {hasWordEmphasis ? (
          <MaskSegment
            text={suffix}
            fontSize={fontSize}
            photo={photo}
            outline={outline}
            zoom={zoom}
            scale={scaleAt(emphasisFrame)}
            glow={glowAt(emphasisFrame)}
          />
        ) : null}
      </div>
    </div>
  );
};

/** 15. Call-and-Response Layout: A/B/Cで応答の来る方向を変える。
 * A: 左右の呼応(余白を使う) / B: 画面両側から衝突 / C: grid別セルからの応答。 */
export const CallAndResponseLayout: React.FC<{
  call: string;
  response: string;
  callFrame: number;
  responseFrame: number;
  color: string;
  variant: 'A' | 'B' | 'C';
  fontSize?: number;
}> = ({call, response, callFrame, responseFrame, color, variant, fontSize = 42}) => {
  const f = useCurrentFrame();
  const callO = interpolate(f, [callFrame, callFrame + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const respO = interpolate(f, [responseFrame, responseFrame + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const respS = interpolate(f, [responseFrame, responseFrame + 4, responseFrame + 10], [1.3, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (variant === 'B') {
    // 画面両側から衝突するように、call=左から/response=右から
    const callX = interpolate(f, [callFrame, callFrame + 8], [-160, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const respX = interpolate(f, [responseFrame, responseFrame + 8], [160, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return (
      <div style={{display: 'flex', gap: 14, alignItems: 'baseline'}}>
        <span style={{fontFamily: JP, fontSize, fontWeight: 700, color, opacity: callO, transform: `translateX(${callX}px)`}}>{call}</span>
        <span
          style={{
            fontFamily: JP,
            fontSize: fontSize * 1.2,
            fontWeight: 900,
            color,
            opacity: respO,
            transform: `translateX(${respX}px) scale(${respS})`,
          }}
        >
          {response}
        </span>
      </div>
    );
  }

  if (variant === 'C') {
    // gridの別セルからの応答: callは上段左、responseは下段右のイメージでオフセット
    return (
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24}}>
        <span style={{fontFamily: JP, fontSize, fontWeight: 600, color, opacity: callO}}>{call}</span>
        <span
          style={{
            fontFamily: JP,
            fontSize: fontSize * 1.15,
            fontWeight: 900,
            color,
            opacity: respO,
            transform: `scale(${respS})`,
            justifySelf: 'end',
          }}
        >
          {response}
        </span>
      </div>
    );
  }

  // A: 左右の呼応、余白を使う(縦に少しずらして配置)
  const callX = interpolate(f, [callFrame, callFrame + 8], [-24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const respX = interpolate(f, [responseFrame, responseFrame + 8], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div>
      <div style={{fontFamily: JP, fontSize, fontWeight: 500, color, opacity: callO, transform: `translateX(${callX}px)`}}>{call}</div>
      <div
        style={{
          fontFamily: JP,
          fontSize: fontSize * 1.1,
          fontWeight: 700,
          color,
          opacity: respO,
          transform: `translateX(${respX}px) scale(${respS})`,
          marginTop: 10,
          marginLeft: 40,
        }}
      >
        {response}
      </div>
    </div>
  );
};

/** 14. Lyric-to-Transition: テキスト自体(sizeに追従する小要素)と、
 * 全画面wipe(呼び出し側でAbsoluteFill直下に別途配置する)を分離する。 */
export const LyricToTransitionText: React.FC<{text: string; color: string; fontSize?: number; exitFrame: number}> = ({
  text,
  color,
  fontSize = 42,
  exitFrame,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textFade = interpolate(f, [exitFrame, exitFrame + 4], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lineW = interpolate(f, [exitFrame - 10, exitFrame], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div>
      <div style={{fontFamily: JP, fontSize, fontWeight: 700, color, opacity: o * textFade}}>{text}</div>
      <div style={{height: 2, width: `${lineW}%`, background: color, opacity: 0.8, marginTop: 6}} />
    </div>
  );
};

/** Lyric-to-Transitionの全画面wipe本体。呼び出し側(WeddingLyricA/B/C)が
 * placementの外側、AbsoluteFillの直接の子として配置すること。 */
export const LyricToTransitionWipe: React.FC<{exitFrame: number; color: string; variant: 'A' | 'B' | 'C'}> = ({
  exitFrame,
  color,
  variant,
}) => {
  const f = useCurrentFrame();
  const wipe = interpolate(f, [exitFrame, exitFrame + 12], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fadeBack = interpolate(f, [exitFrame + 12, exitFrame + 20], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (wipe <= 0) return null;
  const clip =
    variant === 'C'
      ? `inset(0 0 ${100 - wipe}% 0)` // Cは下から上(gridを組む印象)
      : `inset(0 ${100 - wipe}% 0 0)`; // A/Bは左から右
  return (
    <AbsoluteFill
      style={{
        background: color,
        clipPath: clip,
        opacity: fadeBack,
        pointerEvents: 'none',
      }}
    />
  );
};

/** Chorus Burst: 3-hit最終段で画面全体に一瞬だけ光が開くeffect layer。写真自体は隠さない。 */
export const ChorusBurstFlash: React.FC<{hitFrame: number; color?: string}> = ({hitFrame, color = '#FFFFFF'}) => {
  const f = useCurrentFrame();
  const local = f - hitFrame;
  const o = interpolate(local, [-2, 0, 10], [0, 0.35, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${color} 0%, rgba(255,255,255,0) 70%)`,
        opacity: o,
        pointerEvents: 'none',
      }}
    />
  );
};
