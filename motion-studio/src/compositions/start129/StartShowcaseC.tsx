// C案: リズム・タイポMV(kinetic typography × negative space)
// 歌詞の意味・attackから出現を決める。カラオケ字幕にはしない。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {StartDemoBackdrop} from './StartDemoBackdrop';
import {SectionBadge, MiniGuideCard} from './StartGuideOverlay';
import {BaselineScanText} from '../../motion-kit/start129/typographyPrimitives';
import {HeartOutlineIcon, PlaneTrailIcon, useIconReveal} from '../../motion-kit/start129/iconPrimitives';
import {SparkleOverlay} from './SparkleOverlay';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import type {Start129AssetRole} from '../../data/start129/assetRoles';

const techniques = start129TechniquesForShowcase('C');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

const sectionRoleMap: Record<string, Start129AssetRole> = {
  'opening-pickup': 'NEGATIVE_SPACE',
  intro: 'DEPARTURE',
  'verse-1a': 'OKINAWA_WIDE',
  'verse-1b': 'SEOUL_STREET',
  'chorus-1a': 'NEGATIVE_SPACE',
  'chorus-1b': 'HAWAII_WARM',
  'interlude-1': 'BROLL_TEXTURE',
  'verse-2a': 'MOVEMENT_LEFT_TO_RIGHT',
  'verse-2b': 'DETAIL_HAND',
  'chorus-2a': 'NEGATIVE_SPACE',
  'chorus-2b': 'VERTICAL_PORTRAIT',
  'interlude-2a': 'BROLL_WALK',
  'interlude-2b': 'ARRIVAL_YOKOHAMA',
  end: 'END_BREATH',
};

const NegativeSpaceCaption: React.FC<{
  lyric: ResolvedLyricSlot;
  localFrom: number;
  big: boolean;
}> = ({lyric, localFrom, big}) => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: 60}}>
    <BaselineScanText
      text={lyric.text}
      startFrame={localFrom}
      durationInFrames={24}
      fontSize={big ? 88 : 48}
      color={lyric.isPlaceholder ? 'rgba(253,251,245,0.4)' : '#FDFBF5'}
    />
  </AbsoluteFill>
);

const WelcomeCaption: React.FC<{localFrame: number}> = ({localFrame}) => {
  const iconProgress = useIconReveal(localFrame, 8, 20);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: 60}}>
      <SparkleOverlay kind="dust" opacity={0.28} />
      <BaselineScanText
        text="本日はお越しいただき、誠にありがとうございます。"
        startFrame={0}
        durationInFrames={40}
        fontSize={40}
        color="#FDFBF5"
      />
      <div style={{marginTop: 14}}>
        <PlaneTrailIcon size={26} progress={iconProgress} />
      </div>
    </AbsoluteFill>
  );
};

const EndCaption: React.FC<{localFrame: number}> = ({localFrame}) => {
  const iconProgress = useIconReveal(localFrame, 4, 14);
  const dateOpacity = interpolate(localFrame, [18, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <SparkleOverlay kind="dust" opacity={0.14} />
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <HeartOutlineIcon size={20} progress={iconProgress} />
        <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 32}}>
          SHOGO &amp; SHIORI
        </div>
      </div>
      <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 20, marginTop: 8, opacity: dateOpacity}}>
        2026.10.24 Yokohama
      </div>
    </AbsoluteFill>
  );
};

export const StartShowcaseC: React.FC<{reviewMode: boolean; lyricSlots: ResolvedLyricSlot[]}> = ({
  reviewMode,
  lyricSlots,
}) => {
  const frame = useCurrentFrame();
  const seconds = frame / START_129_FPS;

  return (
    <AbsoluteFill style={{background: '#0A0A0C'}}>
      {START_129_SECTIONS.map((section) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const role = sectionRoleMap[section.id];
        const isChorus = section.id.startsWith('chorus');
        const lyricForSection = section.lyricSlotRange ? lyricSlots[section.lyricSlotRange[0] - 1] : null;

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            <StartDemoBackdrop role={role} fit={isChorus ? 'cover' : 'contain'} />
            {lyricForSection ? (
              <NegativeSpaceCaption lyric={lyricForSection} localFrom={0} big={isChorus} />
            ) : null}
            {section.id === 'interlude-2b' ? <WelcomeCaption localFrame={frame - from} /> : null}
            {section.id === 'end' ? <EndCaption localFrame={frame - from} /> : null}
            {reviewMode ? <SectionBadge section={section} secondsElapsed={seconds} /> : null}
            {reviewMode && section.id === 'verse-1a' ? (
              <MiniGuideCard technique={findTechnique('c-baseline-scan')} showFrom={from} anchor="top-right" />
            ) : null}
            {reviewMode && section.id === 'chorus-1a' ? (
              <MiniGuideCard technique={findTechnique('c-negative-space-caption')} showFrom={from} anchor="top-right" />
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
