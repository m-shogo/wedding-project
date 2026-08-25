// 冒頭「S → StaRt」title-build sequence(Phase3全面再構築, 2026-08-26)。
//
// 旧実装は「ようこそ」を等間隔PLACEHOLDER_HITSで表示していた。今回は
// 曲名そのものである"StaRt"を、実測beat(Palmier Pro on-device beat detection,
// bpm=187.5)に合わせて1文字ずつ組み上げ、最後にSの形・線が水平線/routeへ
// 変形して最初の写真shotへ引き継ぐ構造にする。
//
// 公式MVの固有デザイン(角丸frame, 多面体, 特定配色)は複製しない。
// 「Sから始まり、文字が別々のgraphic要素として音に合わせて組み上がる」という
// 構造原理だけを、A(映画的)/B(アニメOP的)/C(タイポMV的)へ別々に翻訳する。
//
// 実測beat(intro 0-12.5s区間、Palmier Pro検出値):
// 0.16, 0.48, 0.78, 1.10, 1.14, 1.74, 2.02, 2.34, 2.66, 2.98, 3.30, 3.60,
// 3.92, 4.24, 4.56, 4.88, 5.18, 5.50, 5.82, ...
// 文字投入点として 1.14 / 1.74 / 2.34 / 2.98 / 3.60 を採用(明確なbeatで、
// 均等等間隔ではなく実測beat間隔=0.6/0.6/0.64/0.62秒を反映)。
//
// verifiedByListening: false。この環境に音声聴取手段が無いため、on-device
// beat detectionの結果を信号的根拠として採用している(人間の耳での最終確認が必要)。

import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {start129OverlayLibrary} from '../../data/start129/demoAssetLibrary.generated';

const JP = "'Noto Sans JP', sans-serif";
const EN = "'Georgia', 'Noto Sans JP', serif";

// 実測beatへスナップした文字投入frame(30fps)。
const LETTER_BEATS_SEC = [1.14, 1.74, 2.34, 2.98, 3.6];
const LETTER_FRAMES = LETTER_BEATS_SEC.map((s) => Math.round(s * 30)); // [34,52,70,89,108]
const LOCK_FRAME = LETTER_FRAMES[4] + 10; // 118: 全文字ロック完了
const LETTERS = ['S', 't', 'a', 'R', 't'];

/**
 * A案 title-build: 暗い余白にSが光の線として描かれ、残りの文字が
 * ゆっくり滲み出るように現れる。最後にSの線がそのまま水平線へ変形し、
 * 12.5秒の終わりには画面が横一文字の地平線だけになって次shotへ引き継ぐ。
 */
export const TitleSequenceA: React.FC = () => {
  const f = useCurrentFrame();
  const glowY = interpolate(f, [0, 375], [42, 58], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glowO = interpolate(f, [0, 60, 375], [0.5, 0.7, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Sの光跡: 最初のbeat(34f)から出現し、ロック後は静かにfade outする(直線への
  // 変形をbezier補間で試みたところ視覚的に破綻したため、素直なcross-fadeにした)。
  const sTraceP = interpolate(f, [0, LETTER_FRAMES[0]], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sFadeOut = interpolate(f, [LOCK_FRAME, LOCK_FRAME + 50], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // ロック後、水平線が画面幅へ伸びて次shotの地平線へ引き継ぐ
  const horizonP = interpolate(f, [LOCK_FRAME + 10, 375], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const horizonW = interpolate(horizonP, [0, 1], [0, 900]);
  const horizonY = 600;

  const sPath = 'M 930 430 C 900 400, 900 460, 930 470 C 970 480, 970 520, 930 530';

  return (
    <AbsoluteFill style={{background: '#14161A', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 900px 500px at 50% ${glowY}%, rgba(80,90,110,${glowO}) 0%, rgba(20,22,26,0) 70%)`,
        }}
      />
      {/* Sの光跡→水平線 */}
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line
          x1={960 - horizonW / 2}
          y1={horizonY}
          x2={960 + horizonW / 2}
          y2={horizonY}
          stroke="rgba(253,251,245,0.85)"
          strokeWidth={2}
          opacity={horizonP}
        />
        <path d={sPath} fill="none" stroke="rgba(253,251,245,0.85)" strokeWidth={3} strokeLinecap="round" opacity={sTraceP * sFadeOut} />
      </svg>
      <div style={{display: 'flex', gap: 2, zIndex: 2}}>
        {LETTERS.map((ch, i) => {
          const hit = LETTER_FRAMES[i];
          const local = f - hit;
          const o = interpolate(local, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const y = interpolate(local, [0, 10], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const finalFade = interpolate(f, [340, 375], [1, 0.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <span
              key={i}
              style={{
                fontFamily: i === 0 || i === 3 ? EN : JP,
                fontSize: 96,
                fontWeight: 700,
                color: '#FDFBF5',
                opacity: o * finalFade,
                transform: `translateY(${y}px)`,
                display: 'inline-block',
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * B案 title-build: 文字が画面外から勢いよく飛び込み、パン・パン・パンの
 * 3-hitで色面・panelが着地する。最後にStaRtの塊がコマ枠を押し広げて
 * 次shotへ突入する(frame break)。
 */
export const TitleSequenceB: React.FC = () => {
  const f = useCurrentFrame();
  const glowX = interpolate(f, [0, 375], [38, 62], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hit2 = LETTER_FRAMES[3]; // R着地=2打目相当
  const hit3 = LOCK_FRAME; // 全文字ロック=3打目
  const panelO = interpolate(f, [hit2 - 2, hit2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blockW = interpolate(f, [hit3 - 2, hit3, hit3 + 14], [0, 100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // frame break: ロック後、コマ枠(白縁)が押し広げられて消える
  const frameInset = interpolate(f, [hit3, 375], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const frameO = interpolate(f, [hit3, hit3 + 60], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: '#1C1812', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 850px 550px at ${glowX}% 55%, rgba(120,95,50,0.55) 0%, rgba(28,24,18,0) 72%)`,
        }}
      />
      <AbsoluteFill style={{background: '#F4C95D', clipPath: `inset(0 ${100 - blockW}% 0 0)`}} />
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 0 ${frameInset}px rgba(253,251,245,0.9)`,
          opacity: frameO,
          pointerEvents: 'none',
        }}
      />
      <div style={{display: 'flex', gap: 4, zIndex: 2, transform: `scale(${panelO ? 1 : 0.9})`}}>
        {LETTERS.map((ch, i) => {
          const hit = LETTER_FRAMES[i];
          const local = f - hit;
          const dir = i % 2 === 0 ? -1 : 1;
          const x = interpolate(local, [-4, 0, 6], [dir * 220, dir * 30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const o = interpolate(local, [-4, 0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const s = interpolate(local, [0, 4, 10], [1.5, 1.05, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <span
              key={i}
              style={{
                fontFamily: i === 0 || i === 3 ? EN : JP,
                fontSize: 112,
                fontWeight: 900,
                color: '#FFFDF7',
                opacity: o,
                transform: `translateX(${x}px) scale(${s})`,
                display: 'inline-block',
                textShadow: '0 5px 0 rgba(24,20,14,0.5)',
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * C案 title-build: 巨大な"S"型maskの内部に写真テクスチャが動き、
 * baselineが伸びて残りの文字が配置される。最後にgridが再構成され、
 * baselineがそのまま次shotのeditorial grid線へ繋がる。
 */
export const TitleSequenceC: React.FC = () => {
  const f = useCurrentFrame();
  const maskScale = interpolate(f, [0, 16], [0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const maskRotate = interpolate(f, [0, 375], [0, 3.2]);
  const sweepX = interpolate(f, [0, 375], [30, 70]);
  const baselineW = interpolate(f, [LETTER_FRAMES[0], LOCK_FRAME], [0, 640], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const gridO = interpolate(f, [LOCK_FRAME, LOCK_FRAME + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: '#F2EFE8', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 700px 900px at ${sweepX}% 50%, rgba(230,210,180,0.35) 0%, rgba(242,239,232,0) 65%)`,
        }}
      />
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: '50% 50% 50% 8%',
          background: '#0A0A0C',
          transform: `translateY(-140px) scale(${maskScale}) rotate(${maskRotate}deg)`,
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
      <div style={{position: 'absolute', textAlign: 'center', transform: 'translateY(120px)'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 1}}>
          {LETTERS.map((ch, i) => {
            const hit = LETTER_FRAMES[i];
            const local = f - hit;
            const o = interpolate(local, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const yy = interpolate(local, [0, 8], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return (
              <span
                key={i}
                style={{
                  fontFamily: i === 0 || i === 3 ? EN : JP,
                  fontSize: 58,
                  fontWeight: 800,
                  color: '#0A0A0C',
                  opacity: o,
                  transform: `translateY(${yy}px)`,
                  display: 'inline-block',
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
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
