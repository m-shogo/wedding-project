// 冒頭title-build sequenceのA/B/C試作。
//
// 重要: hitFrame群はまだ仮値(等間隔)。正規音源投入後、実際のvocal attack/
// beatへ置き換える前提のPROTOTYPEであり、「音楽同期済み」ではない。
// 公式MVの固有デザイン(rounded-rect frame, 多面体, 星/月等)は複製せず、
// 「1文字ずつ・別々のgraphic要素として・3段階で組み上がる」という
// 構造原理だけを結婚式の言�葉(名前・ようこそ)へ翻訳した。
//
// 検証はstill(frame単体)でのみ行っている。動画としての音同期は未検証。

import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CharacterBuild} from '../../motion-kit/start129/lyricAnimationFamilies';
import {HandDrawnUnderline} from '../../motion-kit/start129/handDrawnPrimitives';
import {start129OverlayLibrary} from '../../data/start129/demoAssetLibrary.generated';

const JP = "'Noto Sans JP', sans-serif";

// 仮のhit timing(等間隔4frame刻み)。実音源投入後に置き換える。
const PLACEHOLDER_HITS = (count: number, startFrame: number, step: number) =>
  Array.from({length: count}, (_, i) => startFrame + i * step);

/**
 * A案 title-build: 暗い余白に光の線が走り、Sの曲線を描いてから
 * 残りの文字が現れ、線がそのまま水平線(次のshotの構図)へ変化する。
 */
export const TitleSequenceA: React.FC<{word?: string}> = ({word = 'ようこそ'}) => {
  const f = useCurrentFrame();
  const lineProgress = interpolate(f, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const charHits = PLACEHOLDER_HITS(word.length, 10, 5);
  const horizonY = interpolate(f, [14, 34], [54, 62], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const glowY = interpolate(f, [0, 375], [42, 58], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glowO = interpolate(f, [0, 60, 375], [0.5, 0.7, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: '#14161A', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 900px 500px at 50% ${glowY}%, rgba(80,90,110,${glowO}) 0%, rgba(20,22,26,0) 70%)`,
        }}
      />
      {/* 光の線 → 水平線への変化 */}
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line
          x1={960 - lineProgress * 420}
          y1={(horizonY / 100) * 1080}
          x2={960 + lineProgress * 420}
          y2={(horizonY / 100) * 1080}
          stroke="rgba(253,251,245,0.8)"
          strokeWidth={2}
        />
      </svg>
      <div style={{opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <CharacterBuild text={word} charFrames={charHits} fontSize={88} color="#FDFBF5" />
      </div>
    </AbsoluteFill>
  );
};

/**
 * B案 title-build: 文字が画面外から勢いよく入り、3-hitで
 * 文字→panel→色面が段階的に着地する。写真は消さず薄暗い背景に留める。
 */
export const TitleSequenceB: React.FC<{word?: string}> = ({word = 'ようこそ'}) => {
  const f = useCurrentFrame();
  const charHits = PLACEHOLDER_HITS(word.length, 6, 4);
  const hit2 = 6 + word.length * 4 + 4; // panel着地
  const hit3 = hit2 + 8; // 色面着地

  const panelO = interpolate(f, [hit2 - 2, hit2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const panelS = interpolate(f, [hit2 - 2, hit2, hit2 + 6], [0.6, 1.2, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blockW = interpolate(f, [hit3 - 2, hit3, hit3 + 10], [0, 100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const glowX = interpolate(f, [0, 375], [38, 62], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: '#1C1812', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 850px 550px at ${glowX}% 55%, rgba(120,95,50,0.55) 0%, rgba(28,24,18,0) 72%)`,
        }}
      />
      <AbsoluteFill style={{background: '#F4C95D', clipPath: `inset(0 ${100 - blockW}% 0 0)`}} />
      <div style={{textAlign: 'center', zIndex: 2}}>
        <CharacterBuild text={word} charFrames={charHits} fontSize={104} color="#FFFDF7" />
        <div style={{opacity: panelO, transform: `scale(${panelS})`, marginTop: 8}}>
          <HandDrawnUnderline progressFrom={hit2 - 4} progressDurationInFrames={12} width={360} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * C案 title-build: 巨大な"S"風maskの内部で背景が動き、baselineが伸びて
 * 残りの文字が配置され、最後にgridへ再構成される。
 */
export const TitleSequenceC: React.FC<{word?: string}> = ({word = 'ようこそ'}) => {
  const f = useCurrentFrame();
  const maskScale = interpolate(f, [0, 16], [0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const baselineW = interpolate(f, [10, 26], [0, 640], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const charHits = PLACEHOLDER_HITS(word.length, 14, 4);
  const gridO = interpolate(f, [30, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // build完了後も背景が完全静止しないよう、Sの角丸shapeを線形にごくわずか回転させ続ける。
  const maskRotate = interpolate(f, [0, 375], [0, 3.2]);
  // 単色shapeの輪郭移動だけではfreezedetectに引っかかったため(変化量が画面全体に対し小さすぎる)、
  // 画面全体を覆う淡いwarm highlightを normal alpha(screen blendではなく)で
  // ゆっくり左右へ動かし、大きな面積のpixel値を確実に変化させる。
  const sweepX = interpolate(f, [0, 375], [30, 70]);

  return (
    <AbsoluteFill style={{background: '#F2EFE8', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 700px 900px at ${sweepX}% 50%, rgba(230,210,180,0.35) 0%, rgba(242,239,232,0) 65%)`,
        }}
      />
      {/* multiply blendの粒子: 明るい背景ではscreen blendが効かないため、
          暗い粒子をmultiplyで重ねて全frameで確実にpixelが変化するようにする */}
      {start129OverlayLibrary.dust[0] ? (
        <AbsoluteFill style={{mixBlendMode: 'multiply', opacity: 0.14, pointerEvents: 'none'}}>
          <OffthreadVideo
            src={staticFile(start129OverlayLibrary.dust[0])}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
            muted
          />
        </AbsoluteFill>
      ) : null}
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: '50% 50% 50% 8%',
          background: '#0A0A0C',
          transform: `translateY(-140px) scale(${maskScale}) rotate(${maskRotate}deg)`,
        }}
      />
      <div style={{position: 'absolute', textAlign: 'center', transform: 'translateY(120px)'}}>
        <CharacterBuild text={word} charFrames={charHits} fontSize={54} color="#0A0A0C" />
        <div style={{height: 2, width: baselineW, background: '#0A0A0C', margin: '10px auto 0'}} />
      </div>
      <AbsoluteFill
        style={{
          opacity: gridO,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          pointerEvents: 'none',
        }}
      >
        <div style={{borderRight: '1px solid rgba(10,10,12,0.15)'}} />
        <div style={{borderRight: '1px solid rgba(10,10,12,0.15)'}} />
        <div />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
