// B案: JOYFUL ANIME OPENING / 冒険アニメOP
//
// 映像文法: panel・whip・color block・scale pop・halftone・speed line。
// サビでも写真を消さない。3-hitは短いaccentで、hit後すぐ次shotへ展開する。
// storyboard.ts の B_SECTIONS が唯一の設計source。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, lyricSlotWindowsForSection, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {entryOverlapFrames, placeShots, sectionDesign} from '../../data/start129/storyboard';
import {ShotRenderer} from '../../motion-kit/start129/shotEngine';
import {DemoLyricBadge, LyricB} from '../../motion-kit/start129/lyricLayer';
import {SectionBadge, MiniGuideCard} from './StartGuideOverlay';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import {HandDrawnUnderline} from '../../motion-kit/start129/handDrawnPrimitives';
import {HeartOutlineIcon, PlaneTrailIcon, useIconReveal} from '../../motion-kit/start129/iconPrimitives';
import {SparkleOverlay} from './SparkleOverlay';

const JP = "'Noto Sans JP', sans-serif";
const techniques = start129TechniquesForShowcase('B');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

/** B案の恒常signature。写真の上に薄いコマ枠を置き、A/C案と一目で区別する。 */
const PanelFrame: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      boxShadow: 'inset 0 0 0 4px rgba(253,251,245,0.16), inset 0 0 0 14px rgba(18,16,13,0.5)',
    }}
  />
);

/** サビのhit語。写真を消さず、下1/3のshape帯の上に出す。 */
const ChorusHitWord: React.FC<{word: string; hitFrame: number}> = ({word, hitFrame}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [hitFrame - 3, hitFrame, hitFrame + 20, hitFrame + 28], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s = interpolate(f, [hitFrame - 3, hitFrame + 2, hitFrame + 10], [1.3, 1.06, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const skew = interpolate(f, [hitFrame - 3, hitFrame + 8], [-7, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', opacity: o}}>
      <div style={{transform: `scale(${s}) skewX(${skew}deg)`, textAlign: 'center'}}>
        <div
          style={{
            fontFamily: JP,
            fontSize: 104,
            fontWeight: 900,
            color: '#FFFDF7',
            letterSpacing: '0.02em',
            textShadow: '0 5px 0 rgba(24,20,14,0.55), 0 0 40px rgba(0,0,0,0.5)',
            WebkitTextStroke: '2px rgba(24,20,14,0.35)',
          }}
        >
          {word}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: -4}}>
          <HandDrawnUnderline progressFrom={hitFrame - 2} progressDurationInFrames={14} width={440} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const WelcomeB: React.FC = () => {
  const f = useCurrentFrame();
  const icon = useIconReveal(f, 6, 20);
  const s = interpolate(f, [0, 12, 20], [0.8, 1.1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sub = interpolate(f, [22, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
      <SparkleOverlay kind="dust" opacity={0.2} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 80%)'}} />
      <div style={{display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${s})`, zIndex: 2}}>
        <PlaneTrailIcon size={46} progress={icon} />
        <div style={{fontFamily: JP, fontSize: 86, fontWeight: 900, color: '#FFFDF7', textShadow: '0 5px 0 rgba(24,20,14,0.5)'}}>
          ようこそ
        </div>
      </div>
      <div style={{zIndex: 2, marginTop: 2}}>
        <HandDrawnUnderline progressFrom={10} progressDurationInFrames={18} width={320} />
      </div>
      <div
        style={{
          zIndex: 2,
          marginTop: 22,
          fontFamily: JP,
          fontSize: 30,
          fontWeight: 500,
          color: '#FFFDF7',
          opacity: sub,
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
        }}
      >
        本日はお越しいただき、誠にありがとうございます。
      </div>
    </AbsoluteFill>
  );
};

const EndB: React.FC = () => {
  const f = useCurrentFrame();
  const icon = useIconReveal(f, 10, 16);
  const s = interpolate(f, [0, 10, 18], [0.86, 1.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sub = interpolate(f, [20, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
      <SparkleOverlay kind="sparks" opacity={interpolate(f, [0, 8, 26], [0.34, 0.24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 72%)'}} />
      <div style={{fontFamily: JP, color: '#FFFDF7', fontSize: 62, fontWeight: 900, transform: `scale(${s})`, zIndex: 2, textShadow: '0 5px 0 rgba(24,20,14,0.5)'}}>
        SHOGO &amp; SHIORI
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, opacity: sub, zIndex: 2}}>
        <HeartOutlineIcon size={20} progress={icon} />
        <div style={{fontFamily: JP, color: '#FFFDF7', fontSize: 24, fontWeight: 600, letterSpacing: '0.1em'}}>
          2026.10.24 YOKOHAMA
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const StartShowcaseB: React.FC<{reviewMode: boolean; lyricSlots: ResolvedLyricSlot[]}> = ({
  reviewMode,
  lyricSlots,
}) => {
  const frame = useCurrentFrame();
  const seconds = frame / START_129_FPS;
  const hasRealLyrics = lyricSlots.some((s) => !s.isPlaceholder);

  return (
    <AbsoluteFill style={{background: '#100E0A'}}>
      {START_129_SECTIONS.map((section) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const design = sectionDesign('B', section.id);
        const shots = placeShots(design);
        const lyricWindows = lyricSlotWindowsForSection(section);
        const isChorus = section.id.startsWith('chorus');

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            {shots.map((shot, shotIdx) => (
              <Sequence
                key={shot.index}
                from={shot.localFrom}
                /* 次shotのentry中も前shotを表示し続け、transition中の暗転を防ぐ */
                durationInFrames={
                  shot.durationInFrames +
                  (shots[shotIdx + 1] ? entryOverlapFrames(shots[shotIdx + 1].entry) : 0)
                }
                name={`shot${shot.index + 1}:${shot.role}`}
                premountFor={12}
              >
                <ShotRenderer shot={shot} />
              </Sequence>
            ))}
            {/* サビの3-hit。写真の上に短く出して、すぐ抜ける */}
            {isChorus
              ? [0.12, 0.42, 0.72].map((t, i) => (
                  <ChorusHitWord
                    key={i}
                    word={i === 1 ? 'StaRt!' : i === 0 ? '再スタート' : 'いこう'}
                    hitFrame={Math.round(durationInFrames * t)}
                  />
                ))
              : null}
            {lyricWindows.map((w, i) => (
              <Sequence key={w.slotIndex} from={w.localFrom} durationInFrames={w.durationInFrames} name={`lyric-${w.slotIndex}`}>
                <LyricB
                  slot={lyricSlots[w.slotIndex - 1]}
                  durationInFrames={w.durationInFrames}
                  indexInSection={i}
                  emphasis={isChorus}
                />
              </Sequence>
            ))}
            {section.id === 'interlude-2b' ? <WelcomeB /> : null}
            {section.id === 'end' ? <EndB /> : null}
            {reviewMode ? <SectionBadge section={section} secondsElapsed={seconds} /> : null}
            {reviewMode && (section.id === 'verse-1b' || section.id === 'verse-2b') ? (
              <MiniGuideCard technique={findTechnique('b-panel-grid-reveal')} showFrom={from} anchor="bottom-right" />
            ) : null}
            {reviewMode && isChorus ? (
              <MiniGuideCard technique={findTechnique('b-speed-line-burst')} showFrom={from} anchor="bottom-right" />
            ) : null}
          </Sequence>
        );
      })}
      <PanelFrame />
      {!hasRealLyrics ? <DemoLyricBadge /> : null}
    </AbsoluteFill>
  );
};
