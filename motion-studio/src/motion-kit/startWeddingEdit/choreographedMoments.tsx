// ChoreographyEventを実際に文字・写真・カメラ・transitionへ同時反映する
// 3つの設計実証moment。
//
// P004(武装・創・造・登場アクセント) / P013(「チャプ」3連打) / P014(「独りじゃない」アクセント)。
// それぞれ別々の映像文法にする(3つとも同じ「文字が動くだけ」にしない)。
//
// 各momentは文字レイヤーとshotレイヤーを別々に描くのではなく、1つのcomponentが
// AbsoluteFillの中でphoto panel・camera reaction・textを同時に描画する。
// これにより「歌詞と映像が別々のclockで動く」問題を、この3箇所については解消する。

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import type {EnrichedLyricPhrase} from '../../data/startWeddingEdit/generated';
import {START_WEDDING_EDIT_FPS} from '../../data/startWeddingEdit/sections';
import type {WeddingVariant} from '../../data/startWeddingEdit/storyboard';
import {
  buildArmorCreationEvents,
  buildRippleThreeHitEvents,
  buildSunburstThreeHitEvents,
  buildSoloUnionEvents,
  type ChoreographyEvent,
} from '../../data/startWeddingEdit/choreography';
import {StartDemoBackdrop} from '../../compositions/start129/StartDemoBackdrop';
import {motionStyle} from '../start129/shotEngine';
import {resolveActiveShot, resolveActiveShotWithLocalFrame, type SectionShotsMap} from './weddingLyricLine';
import type {PlacedShot} from '../../data/startWeddingEdit/storyboard';

const secToFrame = (s: number) => Math.round(s * START_WEDDING_EDIT_FPS);

const VARIANT_TEXT_COLOR: Record<WeddingVariant, string> = {A: '#FDFBF5', B: '#FFFDF7', C: '#0A0A0C'};
const VARIANT_ACCENT: Record<WeddingVariant, string> = {A: '#F4C95D', B: '#F4C95D', C: '#0A0A0C'};

/** P0-5/P0-6(2026-08-27、Visual Impact Peak architecture、最小実装):
 * camera punch(scale)のinterpolate曲線は[0,3,10]で、入力3のところで
 * peak(最大scale)へ到達する設計になっている。event.timeSecをそのまま
 * animation開始(localFrame=0)として使うと、実際に画面上でscaleが
 * 最大になる瞬間はaudio hitの3frame(30fpsで100ms)後になり、
 * 「audio hitに合わせたつもり」が実際には常に100ms遅れて見える構造的な
 * バグになる。visualImpactLeadInFramesは、animation自体をaudio hitより
 * その分だけ早く開始させ、curveのpeak(interpolate入力=leadInFrames)が
 * 正確にaudio hitのframeへ来るようにするための値。
 * 対象を限定した理由: 現時点ではcamera punch/push-openのscale曲線
 * (activeEvent()経由でcurrent.localFrameを使う箇所)にのみ適用する。
 * text label・ripple mask等の他のcurveはこのcommitでは未対応
 * (audio hitちょうどから開始する従来のまま)。全animation familyへの
 * 適用はP0-5の残作業として別途行う。 */
const VISUAL_IMPACT_LEAD_IN_FRAMES = 3;

/** 直近に発生したeventと、そこからのlocal経過frameを返す。1つのcomponentが
 * 複数eventを跨いで連続描画できるようにする最小限のスケジューラ。
 * leadInFramesを渡すと、event発生のleadInFrames前からactiveとして扱い、
 * localFrameがleadInFramesの時点で「真のaudio hit frame」になるよう
 * オフセットする(curveのpeak breakpointをleadInFramesに合わせて呼び出す
 * 前提。audio hit自体[event.timeSec]は一切変更しない、純粋に描画側の
 * 開始frameだけを前倒しする)。 */
const activeEvent = (
  events: ChoreographyEvent[],
  phraseStartSec: number,
  frame: number,
  leadInFrames = 0,
): {event: ChoreographyEvent; localFrame: number; index: number} | null => {
  let bestIdx = -1;
  for (let i = 0; i < events.length; i++) {
    const f = secToFrame(events[i].timeSec) - secToFrame(phraseStartSec);
    if (f - leadInFrames <= frame) bestIdx = i;
  }
  if (bestIdx < 0) return null;
  const f = secToFrame(events[bestIdx].timeSec) - secToFrame(phraseStartSec);
  return {event: events[bestIdx], localFrame: frame - f + leadInFrames, index: bestIdx};
};

// ---------------------------------------------------------------------------
// 1. 武装・創・造・登場 — 3枚の写真panelが異なる方向から衝突し、「登場」で全画面Heroへ開放
// ---------------------------------------------------------------------------
const ARMOR_ROLES = ['DEPARTURE', 'OKINAWA_WIDE', 'HAWAII_WARM'] as const;
const ARMOR_HERO_ROLE = 'HERO_WIDE' as const;

export const ArmorCreationMoment: React.FC<{phrase: EnrichedLyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
  const frame = useCurrentFrame();
  const events = React.useMemo(() => buildArmorCreationEvents(phrase, variant), [phrase, variant]);
  const openEvent = events[3];
  const openLocalFrame = openEvent ? secToFrame(openEvent.timeSec) - secToFrame(phrase.startSec) : Infinity;
  const opened = frame >= openLocalFrame;
  const openProgress = opened
    ? interpolate(frame - openLocalFrame, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 0;

  return (
    <AbsoluteFill style={{background: '#0A0A0C', overflow: 'hidden'}}>
      {/* 3panel: 各panelは自分のeventが来るまで完全に非表示(opacity:0)にし、
          来た瞬間に指定方向から衝突する。以前はcenter panel(dir=0)がtranslateX(0)
          のまま常時表示されており、発音前から見えてしまう不具合があったため、
          left/right/centerそれぞれ別の進入方法(横移動 / scale+回転)にし、
          かつ全panel共通でopacity:0による非表示をarrived判定へ追加した。 */}
      <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, opacity: 1 - openProgress}}>
        {events.slice(0, 3).map((ev, i) => {
          const localFrame = frame - (secToFrame(ev.timeSec) - secToFrame(phrase.startSec));
          const arrived = localFrame >= 0;
          const dir = ev.mediaAction.kind === 'panel-collide' ? ev.mediaAction.fromDir : 0;
          const enter = interpolate(localFrame, [0, 10], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const role = ARMOR_ROLES[i];
          const shakeAmt = ev.cameraAction.kind === 'shake' ? ev.cameraAction.amountPx : 0;
          const shake = arrived && localFrame < 8 ? Math.sin(localFrame * 3) * shakeAmt * (1 - localFrame / 8) : 0;
          // 中央panel(dir===0)はtranslateXでは画面外へ出せないため、scale+回転による
          // 別種の進入にする。左右panelは従来通り画面外からの横移動衝突。
          const transform =
            dir === 0
              ? `scale(${arrived ? interpolate(localFrame, [0, 8, 14], [0.25, 1.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0.25}) rotate(${arrived ? interpolate(localFrame, [0, 10], [-6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : -6}deg) translateX(${shake}%)`
              : `translateX(${(arrived ? dir * enter * 60 : dir * 100) + shake}%)`;
          return (
            <div
              key={i}
              style={{position: 'relative', overflow: 'hidden', opacity: arrived ? 1 : 0, transform}}
            >
              <StartDemoBackdrop role={role} variantIndex={i} />
              {arrived && localFrame < 8 ? (
                <AbsoluteFill style={{background: '#FFFFFF', opacity: (1 - localFrame / 8) * 0.4, mixBlendMode: 'screen'}} />
              ) : null}
              {arrived ? (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 28,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: 900,
                    fontSize: variant === 'B' ? 44 : 34,
                    color: VARIANT_TEXT_COLOR[variant],
                    textShadow: '0 2px 14px rgba(0,0,0,0.7)',
                    opacity: interpolate(localFrame, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
                    transform: `scale(${interpolate(localFrame, [0, 5, 10], [1.3, 1.05, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
                  }}
                >
                  {ev.word}
                </div>
              ) : null}
            </div>
          );
        })}
      </AbsoluteFill>

      {/* 開放: panelが消え、Heroが全画面へpush-openする */}
      {opened ? (
        <AbsoluteFill style={{opacity: openProgress}}>
          <AbsoluteFill
            style={{
              transform: `scale(${interpolate(frame - openLocalFrame, [0, 16], [1.14, openEvent.cameraAction.kind === 'push-open' ? openEvent.cameraAction.toScale : 1.06], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
            }}
          >
            <StartDemoBackdrop role={ARMOR_HERO_ROLE} variantIndex={0} />
          </AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              bottom: 90,
              left: 90,
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 900,
              fontSize: variant === 'B' ? 84 : 64,
              color: VARIANT_ACCENT[variant],
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}
          >
            {openEvent?.word}
          </div>
          <AbsoluteFill
            style={{
              background: '#FFFFFF',
              opacity: interpolate(frame - openLocalFrame, [0, 2, 12], [openEvent.effectAction.kind === 'white-flash' ? openEvent.effectAction.opacity : 0, 0.25, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 2. 「チャプ」3連打 — 各発音で波紋(liquid mask)+写真の縦shift。3打目で次shotへ実接続
// ---------------------------------------------------------------------------

/** SVGのfeTurbulence+feDisplacementMapで水面の波紋を近似する軽量liquid mask。
 * 発音ごとに中心から広がるscaleを変え、3回分の波紋が積み重なる。 */
const RippleMask: React.FC<{frame: number; hitLocalFrames: number[]}> = ({frame, hitLocalFrames}) => {
  const rings = hitLocalFrames
    .map((hf, i) => {
      const local = frame - hf;
      if (local < 0) return null;
      const r = interpolate(local, [0, 26], [0, 46], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const o = interpolate(local, [0, 6, 26], [0, 0.55, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      if (o <= 0.001) return null;
      return {r, o, key: i};
    })
    .filter((v): v is {r: number; o: number; key: number} => v !== null);
  if (rings.length === 0) return null;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen'}}>
      {rings.map((ring) => (
        <circle key={ring.key} cx={960} cy={540} r={`${ring.r}%`} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={3} opacity={ring.o} />
      ))}
    </svg>
  );
};

/** その時点でsectionが実際に表示しているPlacedShotを描画する(role/variantIndex/
 * focusを実shotから取得し、自身のmotion定義もそのまま再生する)。
 * 次shotが解決できない場合だけFALLBACK_ROLEを使い、Guide版ではその旨を明示する。 */
const LiveSectionShot: React.FC<{
  phrase: EnrichedLyricPhrase;
  sectionShots: SectionShotsMap | undefined;
  phraseLocalFrame: number;
  reviewMode?: boolean;
  labelJa: string;
}> = ({phrase, sectionShots, phraseLocalFrame, reviewMode, labelJa}) => {
  const resolved = resolveActiveShotWithLocalFrame(phrase, sectionShots, phraseLocalFrame);
  const fallback = !resolved;
  const role = resolved?.shot.role ?? 'NEGATIVE_SPACE';
  const variantIndex = resolved?.shot.variantIndex ?? 0;
  const focus = resolved?.shot.focus;
  const style = resolved ? motionStyle(resolved.shot.motion, resolved.ownLocalFrame, resolved.shot.durationInFrames) : {};
  return (
    <AbsoluteFill style={style}>
      <StartDemoBackdrop role={role} variantIndex={variantIndex} objectPosition={focus ? `${focus.x}% ${focus.y}%` : undefined} />
      {reviewMode ? (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            fontFamily: 'monospace',
            fontSize: 11,
            color: fallback ? '#FFD84A' : '#7CF29A',
            background: 'rgba(0,0,0,0.55)',
            padding: '2px 6px',
          }}
        >
          {labelJa}:{role}#{variantIndex}
          {fallback ? ' FALLBACK(次shot未解決)' : ''}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const RippleThreeHitMoment: React.FC<{
  phrase: EnrichedLyricPhrase;
  variant: WeddingVariant;
  sectionShots?: SectionShotsMap;
  reviewMode?: boolean;
}> = ({phrase, variant, sectionShots, reviewMode}) => {
  const frame = useCurrentFrame();
  const events = React.useMemo(() => buildRippleThreeHitEvents(phrase, variant), [phrase, variant]);
  const hitLocalFrames = events.map((ev) => secToFrame(ev.timeSec) - secToFrame(phrase.startSec));
  const current = activeEvent(events, phrase.startSec, frame, VISUAL_IMPACT_LEAD_IN_FRAMES);
  const cumulativeShiftPx = events.reduce((acc, ev) => {
    const f = secToFrame(ev.timeSec) - secToFrame(phrase.startSec);
    if (frame < f || ev.mediaAction.kind !== 'shift-vertical') return acc;
    return acc + ev.mediaAction.dyPx;
  }, 0);
  const punchScale = current && current.event.cameraAction.kind === 'punch'
    ? interpolate(current.localFrame, [0, 3, 10], [1, current.event.cameraAction.scale, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;
  const thirdHitLocal = hitLocalFrames[2] ?? Infinity;
  // wipeが実際に次shotへ到達するまでの猶予(既存のlyric-to-transition wipeと同じ
  // +14frameの先読み規約に合わせる)。
  const revealLookaheadFrames = 14;
  const connecting = frame >= thirdHitLocal;
  const wipeProgress = connecting
    ? interpolate(frame - thirdHitLocal, [0, 20], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 0;

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#0A0A0C'}}>
      {/* base: 固定roleではなく、そのsectionが本来この瞬間に表示している実shotを
          そのまま表示する(専用moment内でも実素材のタイムラインから外れない)。 */}
      <AbsoluteFill style={{transform: `scale(${punchScale}) translateY(${-cumulativeShiftPx}px)`}}>
        <LiveSectionShot phrase={phrase} sectionShots={sectionShots} phraseLocalFrame={frame} reviewMode={reviewMode} labelJa="base" />
      </AbsoluteFill>
      <RippleMask frame={frame} hitLocalFrames={hitLocalFrames.slice(0, 3)} />
      {events.slice(0, 3).map((ev, i) => {
        const local = frame - hitLocalFrames[i];
        if (local < 0) return null;
        const o = interpolate(local, [0, 4, 16], [0, 1, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const s = interpolate(local, [0, 4], [1.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 120 + i * 4,
              left: 90,
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 900,
              fontSize: variant === 'B' ? 60 : 46,
              color: VARIANT_TEXT_COLOR[variant],
              opacity: o,
              transform: `scale(${s})`,
              textShadow: '0 2px 16px rgba(0,0,0,0.6)',
            }}
          >
            {'チャプ'.repeat(i + 1)}
          </div>
        );
      })}
      {/* 3打目から次shotへ実際に繋がる縦wipe。以前は色面ですらなくHAWAII_WARM固定
          写真をハードコードしていたが、resolveActiveShotWithLocalFrameで
          このsectionが実際に次に表示するPlacedShotを解決し、そのshot自身の
          motion定義(push/drift等)で描画することで、wipe完了後に通常のshot
          レイヤーへ視覚的に連続させる(固定roleのハードコード廃止)。 */}
      {connecting ? (
        <AbsoluteFill style={{clipPath: `inset(${100 - wipeProgress}% 0 0 0)`}}>
          <LiveSectionShot
            phrase={phrase}
            sectionShots={sectionShots}
            phraseLocalFrame={frame + revealLookaheadFrames}
            reviewMode={reviewMode}
            labelJa="next"
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 2.5. 「パッ」3連打(晴れのイメージ) — RippleThreeHitMomentと同じ3-hit構造だが、
// 「雨」の湿った質感(liquid-mask/縦shift/wipe)ではなく「晴れ」の質感
// (白フラッシュが段々強くなり、3発目で画面が奥へ収束してflash-cut)にする。
// P027(同一歌詞の2回目)でも再利用する。
// ---------------------------------------------------------------------------

export const SunburstThreeHitMoment: React.FC<{
  phrase: EnrichedLyricPhrase;
  variant: WeddingVariant;
  sectionShots?: SectionShotsMap;
  reviewMode?: boolean;
}> = ({phrase, variant, sectionShots, reviewMode}) => {
  const frame = useCurrentFrame();
  const events = React.useMemo(() => buildSunburstThreeHitEvents(phrase, variant), [phrase, variant]);
  const hitLocalFrames = events.map((ev) => secToFrame(ev.timeSec) - secToFrame(phrase.startSec));
  const current = activeEvent(events, phrase.startSec, frame, VISUAL_IMPACT_LEAD_IN_FRAMES);
  const punchScale = current && current.event.cameraAction.kind === 'punch'
    ? interpolate(current.localFrame, [0, 3, 10], [1, current.event.cameraAction.scale, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : current && current.event.cameraAction.kind === 'push-open'
      ? interpolate(current.localFrame, [0, 16], [1, current.event.cameraAction.toScale], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : 1;
  const thirdHitLocal = hitLocalFrames[2] ?? Infinity;
  const converging = frame >= thirdHitLocal;
  // flash-cut: wipeで段々明かすRippleとは逆に、一瞬白く飛んでから次shotへ
  // 硬く切り替わる(晴れやかな瞬間の"眩しさ"を表現)。
  const flashOpacity = converging
    ? interpolate(frame - thirdHitLocal, [0, 3, 9], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 0;
  const cutToNext = converging && frame - thirdHitLocal >= 5;

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#0A0A0C'}}>
      <AbsoluteFill style={{transform: `scale(${punchScale})`}}>
        <LiveSectionShot
          phrase={phrase}
          sectionShots={sectionShots}
          phraseLocalFrame={cutToNext ? frame + 14 : frame}
          reviewMode={reviewMode}
          labelJa={cutToNext ? 'next' : 'base'}
        />
      </AbsoluteFill>
      {/* 段々強くなる暖色の光暈(sunburst)。RippleMaskの水面歪みとは対照的に、
          中心から広がる柔らかい光の輪だけで「晴れ」を表現する(新規asset不要)。 */}
      {events.slice(0, 3).map((ev, i) => {
        const local = frame - hitLocalFrames[i];
        if (local < 0) return null;
        // 直前バージョンはpeak opacityが高すぎ、かつ3発分の光が重なって画面全体が
        // 白飛びした(実render QAで発見・修正)。decay windowを短くして
        // 次の発音が来る前にほぼ消えるようにし、gradientの不透明範囲も
        // 中心付近だけへ絞る。
        const glowOpacity = interpolate(local, [0, 3, 10], [0, ev.effectAction.kind === 'white-flash' ? ev.effectAction.opacity : 0.15, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const glowScale = interpolate(local, [0, 10], [0.5, 1.0 + i * 0.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <AbsoluteFill
            key={`glow-${i}`}
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(circle at 50% 45%, ${VARIANT_ACCENT[variant]}66 0%, transparent 55%)`,
              transform: `scale(${glowScale})`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
      {events.slice(0, 3).map((ev, i) => {
        const local = frame - hitLocalFrames[i];
        if (local < 0) return null;
        const o = interpolate(local, [0, 4, 16], [0, 1, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const s = interpolate(local, [0, 4], [1.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={`label-${i}`}
            style={{
              position: 'absolute',
              bottom: 120 + i * 4,
              left: 90,
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 900,
              fontSize: variant === 'B' ? 60 : 46,
              color: VARIANT_TEXT_COLOR[variant],
              opacity: o,
              transform: `scale(${s})`,
              textShadow: '0 2px 16px rgba(0,0,0,0.6)',
            }}
          >
            {'パッ'.repeat(i + 1)}
          </div>
        );
      })}
      {converging ? <AbsoluteFill style={{background: '#FFFDF7', opacity: flashOpacity}} /> : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 3. 独りじゃない — 分割された写真/文字が「独りじゃない」の発音で1つへ統合される
// ---------------------------------------------------------------------------

/** section内の「もう1枚」を探す。左panelは現在activeなshot、右panelはその次の
 * shot(同一section内、末尾なら先頭へ循環)を使うことで、固定roleのハードコード
 * を廃止しつつ「別々の2枚が1枚へ統合される」という意味を保つ。 */
const resolveOtherSectionShot = (
  phrase: EnrichedLyricPhrase,
  sectionShots: SectionShotsMap | undefined,
  phraseLocalFrame: number,
): PlacedShot | null => {
  const entry = sectionShots?.[phrase.sectionId];
  const active = resolveActiveShot(phrase, sectionShots, phraseLocalFrame);
  if (!entry || !active || entry.shots.length < 2) return active;
  const idx = entry.shots.findIndex((s) => s.index === active.index);
  return entry.shots[(idx + 1) % entry.shots.length] ?? active;
};

export const SoloUnionMoment: React.FC<{
  phrase: EnrichedLyricPhrase;
  variant: WeddingVariant;
  sectionShots?: SectionShotsMap;
  reviewMode?: boolean;
}> = ({phrase, variant, sectionShots, reviewMode}) => {
  const frame = useCurrentFrame();
  const events = React.useMemo(() => buildSoloUnionEvents(phrase, variant), [phrase, variant]);
  const mergeEvent = events[1];
  const mergeLocalFrame = secToFrame(mergeEvent.timeSec) - secToFrame(phrase.startSec);
  const p = interpolate(frame, [0, mergeLocalFrame, mergeLocalFrame + mergeEvent.durationFrames], [0, 0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // pが0→1で、左右に分かれたpanelが中央へ寄って1枚の写真に統合される。
  const leftShift = -50 * (1 - p);
  const rightShift = 50 * (1 - p);
  const gap = 6 * (1 - p);
  const mergedOpacity = p;
  const leftShot = resolveActiveShot(phrase, sectionShots, frame);
  const rightShot = resolveOtherSectionShot(phrase, sectionShots, frame);
  const mergedResolved = resolveActiveShotWithLocalFrame(phrase, sectionShots, frame);
  const mergedStyle = mergedResolved ? motionStyle(mergedResolved.shot.motion, mergedResolved.ownLocalFrame, mergedResolved.shot.durationInFrames) : {};

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#0A0A0C'}}>
      <AbsoluteFill style={{opacity: 1 - mergedOpacity}}>
        <AbsoluteFill style={{display: 'grid', gridTemplateColumns: `calc(50% - ${gap}px) calc(50% - ${gap}px)`, gap: gap * 2}}>
          <div style={{position: 'relative', overflow: 'hidden', transform: `translateX(${leftShift}%)`}}>
            <StartDemoBackdrop role={leftShot?.role ?? 'NEGATIVE_SPACE'} variantIndex={leftShot?.variantIndex ?? 0} />
          </div>
          <div style={{position: 'relative', overflow: 'hidden', transform: `translateX(${rightShift}%)`}}>
            <StartDemoBackdrop role={rightShot?.role ?? 'NEGATIVE_SPACE'} variantIndex={rightShot?.variantIndex ?? 1} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      {/* merge後: 固定HERO_WIDEのハードコードを廃止し、sectionが実際にこの瞬間
          表示するshotとそのmotion定義をそのまま使う(統合後に人物=Heroが主役に
          なる構成は、storyboard側でこの区間にHERO_WIDEを割り当てることで保証する)。 */}
      <AbsoluteFill style={{opacity: mergedOpacity}}>
        <AbsoluteFill style={mergedStyle}>
          <StartDemoBackdrop
            role={mergedResolved?.shot.role ?? 'HERO_WIDE'}
            variantIndex={mergedResolved?.shot.variantIndex ?? 1}
            objectPosition={mergedResolved?.shot.focus ? `${mergedResolved.shot.focus.x}% ${mergedResolved.shot.focus.y}%` : undefined}
          />
        </AbsoluteFill>
      </AbsoluteFill>
      {reviewMode ? (
        <div style={{position: 'absolute', top: 8, left: 8, fontFamily: 'monospace', fontSize: 11, color: '#7CF29A', background: 'rgba(0,0,0,0.55)', padding: '2px 6px'}}>
          left:{leftShot?.role ?? '?'} right:{rightShot?.role ?? '?'} merged:{mergedResolved?.shot.role ?? '?'}
        </div>
      ) : null}
      {frame >= mergeLocalFrame ? (
        <div
          style={{
            position: 'absolute',
            bottom: 110,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 800,
            fontSize: variant === 'B' ? 58 : 46,
            color: VARIANT_TEXT_COLOR[variant],
            textShadow: '0 2px 18px rgba(0,0,0,0.65)',
            opacity: interpolate(frame - mergeLocalFrame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          {Array.from(phrase.text).map((ch, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(frame - mergeLocalFrame - i * 1.2, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      ) : null}
      {/* mergeEvent.effectAction: 統合の瞬間に軽いflash */}
      {mergeEvent.effectAction.kind === 'white-flash' ? (
        <AbsoluteFill
          style={{
            background: '#FFFFFF',
            opacity: interpolate(frame - mergeLocalFrame, [0, 3, 14], [mergeEvent.effectAction.opacity, mergeEvent.effectAction.opacity * 0.4, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/** ChoreographyEventで文字・写真・カメラを同時制御する設計実証moment一覧。
 * このidを持つphraseは、通常のWeddingLyricBody(文字だけ)とは描画しない
 * (weddingLyricLine.tsxで早期returnし、代わりにこのcomponentが
 * 文字・写真・カメラをまとめて描画する)。
 *
 * B専用の暫定措置(既知の問題5): この3momentは冒険アニメOP文法のB案専用に
 * 設計されており、A(記録映画)/C(editorial typography)へ同じ全画面takeover
 * componentをそのまま適用すると差別化が弱まる。B案完成を優先するため、
 * ChoreographedMomentRenderer自体はA/C variantに対して常にnullを返し、
 * weddingLyricLine.tsx側の早期returnもvariant==='B'の時だけ有効にする
 * (isChoreographedForVariantで判定を一元化)。A/Cは壊れず、既存の
 * animation family(WeddingLyricBody通常dispatch)へ自動的にfallbackする。 */
// P012/P027は「パッ」3連打(晴れのイメージ、同一歌詞の1回目/2回目)、
// P013/P028は「チャプ」3連打(雨のイメージ、同一歌詞の1回目/2回目)。
// 歌詞が同じ2回目は、新規bespoke componentを作らず1回目と同じmomentを
// そのまま再利用する(Reuse Before Build。歌詞テキストの重複判定ではなく、
// 事前に確認済みの歌詞構造上の対応関係としてハードコードする)。
export const CHOREOGRAPHED_PHRASE_IDS = ['P004', 'P012', 'P013', 'P014', 'P027', 'P028'] as const;

export const isChoreographedForVariant = (phraseId: string, variant: WeddingVariant): boolean =>
  variant === 'B' && (CHOREOGRAPHED_PHRASE_IDS as readonly string[]).includes(phraseId);

export const ChoreographedMomentRenderer: React.FC<{
  phrase: EnrichedLyricPhrase;
  variant: WeddingVariant;
  sectionShots?: SectionShotsMap;
  reviewMode?: boolean;
}> = ({phrase, variant, sectionShots, reviewMode}) => {
  if (!isChoreographedForVariant(phrase.phraseId, variant)) return null;
  switch (phrase.phraseId) {
    case 'P004':
      return <ArmorCreationMoment phrase={phrase} variant={variant} />;
    case 'P012':
    case 'P027':
      return <SunburstThreeHitMoment phrase={phrase} variant={variant} sectionShots={sectionShots} reviewMode={reviewMode} />;
    case 'P013':
    case 'P028':
      return <RippleThreeHitMoment phrase={phrase} variant={variant} sectionShots={sectionShots} reviewMode={reviewMode} />;
    case 'P014':
      return <SoloUnionMoment phrase={phrase} variant={variant} sectionShots={sectionShots} reviewMode={reviewMode} />;
    default:
      return null;
  }
};
