// 冒頭「S → StaRt」title-build sequence(v3, 2026-08-26)。
//
// v2までの実装は「Sの光跡(svg path)」と「文字のS(span)」が同時に画面へ出る
// 二重S状態になっていた(A案)。C案の黒い丸型divは誰が見てもS判定できる形では
// なかった。さらにLOCK_FRAME(118frame=3.6秒付近)以降375frame(12.5秒)まで、
// 単調zoom(TitleOpenA_B_C.tsxのwithSlowZoomHold)以外に画面が発展せず、
// 「情報量が増えない静止」としてQAで指摘された。
//
// v3で行った修正:
// - A: Sの光跡を「文字のSが出る直前で完成し、文字が出た瞬間に消える」前触れ
//   flourishへ変更(同時共存を廃止)。LOCK_FRAME以降は文字群が実測beatに
//   合わせて脈動しながら水平線へ収束し、次shotの地平線と同じY座標へ連続する。
// - B: frame break後、実測beatでpanelがpulseし続け、375f直前に色面が画面外へ
//   スライドして退場する(次shotへの明示的な受け渡し)。
// - C: 黒い丸型blobを実際の"S"字SVG pathへ置き換え、誰が見てもSと判別できる
//   形にした。LOCK_FRAME以降はbaselineが画面幅まで伸び切り、gridが editorial
//   な分割線として残り続けることで次shotのgrid overlayへ連続する。
//
// 実測beat(Palmier Pro on-device beat detection, bpm=187.5, verifiedByListening=false):
// 文字投入点として 1.14 / 1.74 / 2.34 / 2.98 / 3.60 を採用(実測beat)。
// LOCK_FRAME以降のpulseにも同じ実測beat配列(weddingEditBeatMap)を使い、
// 均等な捏造timingを避けている。

import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {start129OverlayLibrary} from '../../data/start129/demoAssetLibrary.generated';
import {weddingEditBeatMap} from '../../data/startWeddingEdit/generated';

const JP = "'Noto Sans JP', sans-serif";
const EN = "'Georgia', 'Noto Sans JP', serif";

const FPS = 30;
const INTRO_END_SEC = 12.5;

// 実測beatへスナップした文字投入frame(30fps)。
const LETTER_BEATS_SEC = [1.14, 1.74, 2.34, 2.98, 3.6];
const LETTER_FRAMES = LETTER_BEATS_SEC.map((s) => Math.round(s * FPS)); // [34,52,70,89,108]
const LOCK_FRAME = LETTER_FRAMES[4] + 10; // 118: 全文字ロック完了
const LETTERS = ['S', 't', 'a', 'R', 't'];

/** LOCK_FRAME(3.6秒台)から12.5秒までの実測beatをframe配列にする。
 * 均等割りではなく、weddingEditBeatMap.beatsの実測値をそのまま使う。 */
const HOLD_BEAT_FRAMES = weddingEditBeatMap.beats
  .filter((s) => s > LOCK_FRAME / FPS && s <= INTRO_END_SEC)
  .map((s) => Math.round(s * FPS));

/** 直近の実測beatからの経過フレームに応じて0→1→0のpulseを返す(heartbeat状)。
 * 均等LFOではなく実beat列駆動なので、音楽的根拠のある「静止しない」動きになる。 */
const useBeatPulse = (frame: number, beatFrames: number[], decay = 10): number => {
  let nearest = -1;
  for (const b of beatFrames) {
    if (b <= frame) nearest = b;
  }
  if (nearest < 0) return 0;
  const local = frame - nearest;
  return interpolate(local, [0, 2, decay], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

/**
 * A案 title-build: 光跡がSの輪郭を一度だけ描き、文字のSが現れた瞬間に消える
 * (二重S解消)。ロック後は文字群が実測beatでわずかに脈動しながら、
 * 地平線(次shotのhorizonと同じY座標)へゆっくり収束し、水平線がそのまま
 * 次shotの構図へ連続する。
 */
export const TitleSequenceA: React.FC = () => {
  const f = useCurrentFrame();
  const glowY = interpolate(f, [0, 375], [42, 58], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glowO = interpolate(f, [0, 60, 375], [0.5, 0.7, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Sの光跡: 文字のSが出る直前(LETTER_FRAMES[0]-4)までに完成し、文字が現れると
  // 同時にfade outする。文字と光跡が同時に見える区間を作らない。
  const sTraceIn = interpolate(f, [0, LETTER_FRAMES[0] - 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sTraceOut = interpolate(f, [LETTER_FRAMES[0] - 4, LETTER_FRAMES[0] + 4], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sTraceOpacity = Math.min(sTraceIn, sTraceOut);
  // ロック後、水平線が画面幅へ伸びて次shotの地平線へ引き継ぐ(開始を早め、停滞区間を縮める)
  const horizonP = interpolate(f, [LOCK_FRAME + 4, 375], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const horizonW = interpolate(horizonP, [0, 1], [0, 900]);
  const horizonY = 600;
  // 実測beatによる脈動(文字群のy位置がわずかに地平線側へ寄せられる)
  const pulse = useBeatPulse(f, HOLD_BEAT_FRAMES, 12);
  const lettersY = interpolate(f, [LOCK_FRAME, 375], [0, 46], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) + pulse * 3;
  const lettersFade = interpolate(f, [LOCK_FRAME + 40, 375], [1, 0.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

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
          y1={horizonY + pulse * 2}
          x2={960 + horizonW / 2}
          y2={horizonY + pulse * 2}
          stroke="rgba(253,251,245,0.85)"
          strokeWidth={2}
          opacity={horizonP}
        />
        <path d={sPath} fill="none" stroke="rgba(253,251,245,0.85)" strokeWidth={3} strokeLinecap="round" opacity={sTraceOpacity} />
      </svg>
      <div style={{display: 'flex', gap: 2, zIndex: 2, transform: `translateY(${lettersY}px)`}}>
        {LETTERS.map((ch, i) => {
          const hit = LETTER_FRAMES[i];
          const local = f - hit;
          const o = interpolate(local, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const y = interpolate(local, [0, 10], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <span
              key={i}
              style={{
                fontFamily: i === 0 || i === 3 ? EN : JP,
                fontSize: 96,
                fontWeight: 700,
                color: '#FDFBF5',
                opacity: o * lettersFade,
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
 * 3-hitで色面・panelが着地する。ロック後は実測beatでpanelが脈動し続け、
 * 375f直前に色面が画面右外へスライドして退場する(次shotへ明示的に受け渡す)。
 */
export const TitleSequenceB: React.FC = () => {
  const f = useCurrentFrame();
  const glowX = interpolate(f, [0, 375], [38, 62], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hit2 = LETTER_FRAMES[3]; // R着地=2打目相当
  const hit3 = LOCK_FRAME; // 全文字ロック=3打目
  const panelO = interpolate(f, [hit2 - 2, hit2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blockW = interpolate(f, [hit3 - 2, hit3, hit3 + 14], [0, 100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // frame break: ロック後、コマ枠(白縁)が押し広げられて消える
  const frameInset = interpolate(f, [hit3, hit3 + 40], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const frameO = interpolate(f, [hit3, hit3 + 40], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // 実測beatでpanelを脈動させ続ける(ロック後の停滞を解消)
  const pulse = useBeatPulse(f, HOLD_BEAT_FRAMES, 8);
  const pulseScale = 1 + pulse * 0.035;
  // 375f直前(EXIT_START〜375)で色面が右外へスライドして退場、次shotへの受け渡しを明示する
  const EXIT_START = 340;
  const exitX = interpolate(f, [EXIT_START, 375], [0, 640], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const exitO = interpolate(f, [EXIT_START, 375], [1, 0.2], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

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
      <div
        style={{
          display: 'flex',
          gap: 4,
          zIndex: 2,
          transform: `scale(${(panelO ? 1 : 0.9) * pulseScale}) translateX(${exitX}px)`,
          opacity: exitO,
        }}
      >
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
 * C案 title-build: 実際に"S"と判別できるSVG字形の内部に写真テクスチャが
 * 動き、baselineが伸びて残りの文字が配置される。ロック後はbaselineが
 * 画面幅まで伸び切り、gridが editorial な分割線として残ることで
 * 次shotのgrid overlayへ連続する(黒い丸型blobは廃止)。
 */
export const TitleSequenceC: React.FC = () => {
  const f = useCurrentFrame();
  const maskScale = interpolate(f, [0, 16], [0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sweepX = interpolate(f, [0, 375], [30, 70]);
  const baselineW = interpolate(f, [LETTER_FRAMES[0], LOCK_FRAME], [0, 640], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // ロック後、baselineが画面幅まで伸び切る(停滞区間へ明確な発展を追加)
  const baselineWFull = interpolate(f, [LOCK_FRAME, 375], [640, 1400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalBaselineW = f < LOCK_FRAME ? baselineW : baselineWFull;
  const gridO = interpolate(f, [LOCK_FRAME, LOCK_FRAME + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // 実測beatでS字と文字群にわずかな脈動を足す(完全な静止を避ける)
  const pulse = useBeatPulse(f, HOLD_BEAT_FRAMES, 10);

  // 実際に"S"と読める字形のSVG path(太めのsigmoidカーブ2本)。
  const sGlyphPath =
    'M 118 18 C 68 18 30 42 30 78 C 30 112 62 126 100 132 C 138 138 170 150 170 184 C 170 220 132 244 82 244 C 48 244 20 232 4 210';

  return (
    <AbsoluteFill style={{background: '#F2EFE8', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 700px 900px at ${sweepX}% 50%, rgba(230,210,180,0.35) 0%, rgba(242,239,232,0) 65%)`,
        }}
      />
      <div style={{transform: `translateY(-140px) scale(${maskScale * (1 + pulse * 0.02)})`}}>
        <svg width={200} height={264} viewBox="0 0 200 264" style={{overflow: 'visible'}}>
          <path d={sGlyphPath} fill="none" stroke="#0A0A0C" strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
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
        <div style={{height: 2, width: finalBaselineW, background: '#0A0A0C', margin: '10px auto 0'}} />
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
