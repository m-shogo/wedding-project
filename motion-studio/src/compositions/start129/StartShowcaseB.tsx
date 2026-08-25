// B案: 冒険アニメOP(手描きグラフィック × 3-hit)
// 既存アニメ作品の固有表現はコピーせず、手描き線・panel・speed lineを基礎から組む。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {StartDemoBackdrop} from './StartDemoBackdrop';
import {SectionBadge, MiniGuideCard} from './StartGuideOverlay';
import {HandDrawnUnderline, SpeedLineBurst} from '../../motion-kit/start129/handDrawnPrimitives';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import type {Start129AssetRole} from '../../data/start129/assetRoles';

const techniques = start129TechniquesForShowcase('B');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

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

/** 4分割panelから1枚のfull frameへ解放する。 */
const PanelGridReveal: React.FC<{role: Start129AssetRole; localFrame: number; durationInFrames: number}> = ({
  role,
  localFrame,
  durationInFrames,
}) => {
  const revealAt = Math.round(durationInFrames * 0.55);
  const revealed = localFrame > revealAt;
  const panelScale = interpolate(localFrame, [revealAt, revealAt + 10], [1, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (revealed) {
    return (
      <AbsoluteFill style={{transform: `scale(${panelScale})`}}>
        <StartDemoBackdrop role={role} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4, background: '#12100D'}}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'relative', overflow: 'hidden'}}>
          <StartDemoBackdrop role={role} variantIndex={i} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const ChorusHitWord: React.FC<{word: string; hitFrame: number; localFrame: number}> = ({
  word,
  hitFrame,
  localFrame,
}) => {
  const intensity = interpolate(localFrame, [hitFrame - 4, hitFrame, hitFrame + 8], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <SpeedLineBurst vanishX={960} vanishY={540} intensity={intensity} color="rgba(244,231,201,0.45)" />
      <div style={{fontFamily: "'Noto Sans JP', sans-serif", fontSize: 96, fontWeight: 900, color: '#FDFBF5'}}>
        {word}
      </div>
      <HandDrawnUnderline progressFrom={hitFrame - 6} progressDurationInFrames={16} width={420} />
    </AbsoluteFill>
  );
};

export const StartShowcaseB: React.FC<{reviewMode: boolean; lyricSlots: ResolvedLyricSlot[]}> = ({
  reviewMode,
  lyricSlots,
}) => {
  const frame = useCurrentFrame();
  const seconds = frame / START_129_FPS;

  return (
    <AbsoluteFill style={{background: '#0F0D0A'}}>
      {START_129_SECTIONS.map((section) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const role = sectionRoleMap[section.id];
        const isChorus = section.id.startsWith('chorus');
        const isPlayfulB = section.id === 'verse-1b' || section.id === 'verse-2b';
        const lyricForSection = section.lyricSlotRange ? lyricSlots[section.lyricSlotRange[0] - 1] : null;

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            {isChorus ? (
              <ChorusHitWord
                word={section.id === 'chorus-1b' || section.id === 'chorus-2b' ? 'StaRt!' : '再スタート'}
                hitFrame={Math.round(durationInFrames * 0.15)}
                localFrame={frame - from}
              />
            ) : isPlayfulB ? (
              <PanelGridReveal role={role} localFrame={frame - from} durationInFrames={durationInFrames} />
            ) : (
              <StartDemoBackdrop role={role} />
            )}
            {lyricForSection && !isChorus ? (
              <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'flex-end', padding: 40}}>
                <div
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#FDFBF5',
                    fontSize: 22,
                    opacity: lyricForSection.isPlaceholder ? 0.4 : 0.9,
                  }}
                >
                  {lyricForSection.text}
                </div>
              </AbsoluteFill>
            ) : null}
            {section.id === 'end' ? (
              <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.35)'}}>
                <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 40, fontWeight: 700}}>
                  SHOGO &amp; SHIORI
                </div>
              </AbsoluteFill>
            ) : null}
            {reviewMode ? <SectionBadge section={section} secondsElapsed={seconds} /> : null}
            {reviewMode && isPlayfulB ? (
              <MiniGuideCard technique={findTechnique('b-panel-grid-reveal')} showFrom={from} anchor="bottom-right" />
            ) : null}
            {reviewMode && isChorus ? (
              <MiniGuideCard technique={findTechnique('b-speed-line-burst')} showFrom={from} anchor="bottom-right" />
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
