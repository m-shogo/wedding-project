// A案: CINEMATIC EMOTIONAL / 旅の記録映画
//
// 映像文法: push-in・parallax・dissolve・light leak・余白・長めのhold。
// 静かでも「光・奥行き・視線・余白・前後shotの関係」で演出する。
// storyboard.ts の A_SECTIONS が唯一の設計source。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, lyricSlotWindowsForSection, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {entryOverlapFrames, placeShots, sectionDesign} from '../../data/start129/storyboard';
import {ShotRenderer} from '../../motion-kit/start129/shotEngine';
import {DemoLyricBadge, LyricA} from '../../motion-kit/start129/lyricLayer';
import {SectionBadge, MiniGuideCard} from './StartGuideOverlay';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import {HeartOutlineIcon, PinIcon, useIconReveal} from '../../motion-kit/start129/iconPrimitives';
import {SparkleOverlay} from './SparkleOverlay';

const JP = "'Noto Sans JP', sans-serif";
const techniques = start129TechniquesForShowcase('A');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

/** 来場感謝。A案は余白へ静かに置き、光を短く添える。 */
const WelcomeA: React.FC = () => {
  const f = useCurrentFrame();
  const icon = useIconReveal(f, 14, 26);
  const o = interpolate(f, [14, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [14, 44], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 48%)'}} />
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 92px 88px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: o, transform: `translateY(${y}px)`}}>
          <PinIcon size={26} progress={icon} />
          <div style={{fontFamily: JP, color: '#FDFBF5', fontSize: 40, fontWeight: 400, letterSpacing: '0.04em', textShadow: '0 2px 18px rgba(0,0,0,0.6)'}}>
            本日はお越しいただき、誠にありがとうございます。
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** End。名前と日付を静かに。3秒静止でも成立させる。 */
const EndA: React.FC = () => {
  const f = useCurrentFrame();
  const icon = useIconReveal(f, 8, 20);
  const o = interpolate(f, [6, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const track = interpolate(f, [6, 46], [0.34, 0.12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dateO = interpolate(f, [26, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <SparkleOverlay kind="dust" opacity={0.16} />
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%)'}} />
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 86px 88px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: o}}>
          <HeartOutlineIcon size={22} progress={icon} />
          <div style={{fontFamily: JP, color: '#FDFBF5', fontSize: 40, fontWeight: 300, letterSpacing: `${track}em`}}>
            SHOGO &amp; SHIORI
          </div>
        </div>
        <div style={{fontFamily: JP, color: '#FDFBF5', fontSize: 20, fontWeight: 300, letterSpacing: '0.2em', marginTop: 12, marginLeft: 34, opacity: dateO}}>
          2026.10.24 &nbsp;YOKOHAMA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const StartShowcaseA: React.FC<{reviewMode: boolean; lyricSlots: ResolvedLyricSlot[]}> = ({
  reviewMode,
  lyricSlots,
}) => {
  const frame = useCurrentFrame();
  const seconds = frame / START_129_FPS;
  const hasRealLyrics = lyricSlots.some((s) => !s.isPlaceholder);

  return (
    <AbsoluteFill style={{background: '#08090B'}}>
      {START_129_SECTIONS.map((section) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const design = sectionDesign('A', section.id);
        const shots = placeShots(design);
        const lyricWindows = lyricSlotWindowsForSection(section);
        const emphasis = section.id.startsWith('chorus');

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
            {lyricWindows.map((w, i) => (
              <Sequence key={w.slotIndex} from={w.localFrom} durationInFrames={w.durationInFrames} name={`lyric-${w.slotIndex}`}>
                <LyricA
                  slot={lyricSlots[w.slotIndex - 1]}
                  durationInFrames={w.durationInFrames}
                  indexInSection={i}
                  emphasis={emphasis}
                />
              </Sequence>
            ))}
            {section.id === 'interlude-2b' ? <WelcomeA /> : null}
            {section.id === 'end' ? <EndA /> : null}
            {reviewMode ? <SectionBadge section={section} secondsElapsed={seconds} /> : null}
            {reviewMode && section.id === 'chorus-1a' ? (
              <MiniGuideCard technique={findTechnique('a-restrained-push')} showFrom={from} />
            ) : null}
            {reviewMode && section.id === 'opening-pickup' ? (
              <MiniGuideCard technique={findTechnique('a-static-hold')} showFrom={from} />
            ) : null}
          </Sequence>
        );
      })}
      {!hasRealLyrics ? <DemoLyricBadge /> : null}
    </AbsoluteFill>
  );
};
