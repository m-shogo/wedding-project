// A案: 旅の記録映画(documentary / travel film / editorial film)
// 静止優先、hard cut、抑制したpush、地名・日付は余白へ小さく置く。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, lyricSlotWindowsForSection, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {StartDemoBackdrop} from './StartDemoBackdrop';
import {BottomScrim, MiniGuideCard, SectionBadge} from './StartGuideOverlay';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import type {Start129AssetRole} from '../../data/start129/assetRoles';
import {HeartOutlineIcon, PinIcon, useIconReveal} from '../../motion-kit/start129/iconPrimitives';
import {SparkleOverlay} from './SparkleOverlay';

const techniques = start129TechniquesForShowcase('A');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

const RestrainedPushShot: React.FC<{role: Start129AssetRole; localFrame: number}> = ({role, localFrame}) => {
  const scale = interpolate(localFrame, [0, 300], [1, 1.024], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{transform: `scale(${scale})`}}>
      <StartDemoBackdrop role={role} />
    </AbsoluteFill>
  );
};

const StaticHoldShot: React.FC<{role: Start129AssetRole}> = ({role}) => <StartDemoBackdrop role={role} />;

const WelcomeMessage: React.FC<{localFrame: number}> = ({localFrame}) => {
  const iconProgress = useIconReveal(localFrame, 6, 20);
  const textOpacity = interpolate(localFrame, [6, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: 56}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, opacity: textOpacity}}>
        <PinIcon size={22} progress={iconProgress} />
        <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 30, fontWeight: 500}}>
          本日はお越しいただき、誠にありがとうございます。
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC<{localFrame: number}> = ({localFrame}) => {
  const iconProgress = useIconReveal(localFrame, 4, 16);
  return (
    <>
      {/* A案は静止・抑制が基本文法のため、opacityを低く抑えた控えめな一度きりの粒子のみ */}
      <SparkleOverlay kind="dust" opacity={0.18} />
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: 56}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <HeartOutlineIcon size={20} progress={iconProgress} />
          <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 28}}>
            SHOGO &amp; SHIORI — 2026.10.24 Yokohama
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};

/** slot windowの中でfade in/holdして次slotへ切り替わる、1歌詞slotぶんのcaption。 */
const LyricCaption: React.FC<{lyric: ResolvedLyricSlot; durationInFrames: number; reviewMode: boolean}> = ({
  lyric,
  durationInFrames,
  reviewMode,
}) => {
  const localFrame = useCurrentFrame();
  const fadeIn = 6;
  const fadeOut = 6;
  const opacity = interpolate(
    localFrame,
    [0, fadeIn, Math.max(fadeIn, durationInFrames - fadeOut), durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: 56}}>
      <div
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          color: '#FDFBF5',
          fontSize: 34,
          fontWeight: 500,
          maxWidth: 900,
          opacity: opacity * (lyric.isPlaceholder ? 0.45 : 1),
        }}
      >
        {lyric.text}
      </div>
      {reviewMode ? (
        <div style={{marginTop: 4, fontSize: 12, color: 'rgba(253,251,245,0.5)', fontFamily: 'monospace'}}>
          {lyric.slotId}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const sectionRoleMap: Record<string, Start129AssetRole> = {
  'opening-pickup': 'HERO_WIDE',
  intro: 'DEPARTURE',
  'verse-1a': 'OKINAWA_WIDE',
  'verse-1b': 'SEOUL_STREET',
  'chorus-1a': 'HERO_CLOSE',
  'chorus-1b': 'HAWAII_WARM',
  'interlude-1': 'BROLL_TEXTURE',
  'verse-2a': 'MOVEMENT_LEFT_TO_RIGHT',
  'verse-2b': 'DETAIL_HAND',
  'chorus-2a': 'HERO_WIDE',
  'chorus-2b': 'VERTICAL_PORTRAIT',
  'interlude-2a': 'BROLL_WALK',
  'interlude-2b': 'ARRIVAL_YOKOHAMA',
  end: 'END_BREATH',
};

export const StartShowcaseA: React.FC<{reviewMode: boolean; lyricSlots: ResolvedLyricSlot[]}> = ({
  reviewMode,
  lyricSlots,
}) => {
  const frame = useCurrentFrame();
  const seconds = frame / START_129_FPS;

  return (
    <AbsoluteFill style={{background: '#0B0C0E'}}>
      {START_129_SECTIONS.map((section) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const role = sectionRoleMap[section.id];
        const isPushSection = section.id.startsWith('chorus');
        const lyricWindows = lyricSlotWindowsForSection(section);

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            {isPushSection ? (
              <RestrainedPushShot role={role} localFrame={frame - from} />
            ) : (
              <StaticHoldShot role={role} />
            )}
            <BottomScrim />
            {lyricWindows.map((w) => (
              <Sequence
                key={w.slotIndex}
                from={w.localFrom}
                durationInFrames={w.durationInFrames}
                name={`lyric-${w.slotIndex}`}
              >
                <LyricCaption lyric={lyricSlots[w.slotIndex - 1]} durationInFrames={w.durationInFrames} reviewMode={reviewMode} />
              </Sequence>
            ))}
            {section.id === 'interlude-2b' ? <WelcomeMessage localFrame={frame - from} /> : null}
            {section.id === 'end' ? <EndCard localFrame={frame - from} /> : null}
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
    </AbsoluteFill>
  );
};
