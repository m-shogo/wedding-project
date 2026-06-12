import type {CSSProperties} from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {PaperTexture} from '../../components/common/PaperTexture';
import {TextPart} from '../../components/parts/text';

// parts/text の3パーツを時間差で確認するためのComposition。
// 本番素材ではない(kind=preview-only)。どれがどのパーツか左上の小ラベルで分かる。
// パーツを追加したらこのプレビューにも1セグメント足す。

const SEG = 100; // 各パーツの表示尺(frame)

const labelStyle = (onDark: boolean): CSSProperties => ({
  position: 'absolute',
  top: 40,
  left: 48,
  fontFamily: serifFamily,
  fontSize: 24,
  letterSpacing: '0.16em',
  color: onDark ? colors.goldLight : '#8C7A4F',
  opacity: 0.85,
});

export const TextPartsPreview = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.navyDeep}}>
      {/* 1. FadeUpCaption(暗背景) */}
      <Sequence from={0} durationInFrames={SEG}>
        <AbsoluteFill style={{backgroundColor: colors.navyDeep}}>
          <PaperTexture opacity={0.05} id="parts-prev-1" />
          <div style={labelStyle(true)}>1 / FadeUpCaption (fade-up)</div>
          <TextPart
            variant="fade-up"
            text={'本日はご搭乗ありがとうございます'}
            subText="MEMORY FLIGHT 1024"
            position="bottom"
            startFrame={6}
            durationFrames={SEG - 12}
            tone="ivory"
            size="md"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 2. MaskRevealTitle(明背景) */}
      <Sequence from={SEG} durationInFrames={SEG}>
        <AbsoluteFill style={{backgroundColor: colors.beige}}>
          <PaperTexture opacity={0.05} id="parts-prev-2" />
          <div style={labelStyle(false)}>2 / MaskRevealTitle (mask-reveal)</div>
          <TextPart
            variant="mask-reveal"
            title="CHAPTER 1"
            subtitle="Departure"
            startFrame={6}
            durationFrames={SEG - 12}
            align="center"
            tone="navy"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 3. ElegantLowerThird(暗背景) */}
      <Sequence from={SEG * 2} durationInFrames={SEG}>
        <AbsoluteFill style={{backgroundColor: colors.navyDeep}}>
          <PaperTexture opacity={0.05} id="parts-prev-3" />
          <div style={labelStyle(true)}>3 / ElegantLowerThird (lower-third)</div>
          <TextPart
            variant="lower-third"
            name="COOKIE"
            role="FAMILY / DOG"
            comment={'いつも一緒に旅をしてきた大切な家族'}
            position="right"
            startFrame={6}
            durationFrames={SEG - 12}
            tone="ivory"
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
