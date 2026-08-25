// C案: EDITORIAL TYPOGRAPHY / リズム・タイポMV
//
// 映像文法: editorial grid・slat wipe・split・strip・大小type contrast。
// containの黒帯は使わない。文字位置を毎回変え、写真と文字が対話する。
// storyboard.ts の C_SECTIONS が唯一の設計source。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, lyricSlotWindowsForSection, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {entryOverlapFrames, placeShots, sectionDesign} from '../../data/start129/storyboard';
import {ShotRenderer} from '../../motion-kit/start129/shotEngine';
import {DemoLyricBadge, LyricC} from '../../motion-kit/start129/lyricLayer';
import {SectionBadge, MiniGuideCard} from './StartGuideOverlay';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import {HeartOutlineIcon, useIconReveal} from '../../motion-kit/start129/iconPrimitives';
import {SparkleOverlay} from './SparkleOverlay';

const JP = "'Noto Sans JP', sans-serif";
const techniques = start129TechniquesForShowcase('C');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

/**
 * C案の恒常signature: editorialのマージン罫線とページ番号的な小さいindex。
 * 常に同じ位置に薄く出ることで、A/B案と白黒でも区別できる。
 */
const EditorialRules: React.FC<{sectionIndex: number}> = ({sectionIndex}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', left: 64, top: 56, bottom: 56, width: 1, background: 'rgba(253,251,245,0.22)'}} />
    <div style={{position: 'absolute', right: 64, top: 56, bottom: 56, width: 1, background: 'rgba(253,251,245,0.22)'}} />
    <div style={{position: 'absolute', left: 64, right: 64, top: 56, height: 1, background: 'rgba(253,251,245,0.16)'}} />
    <div
      style={{
        position: 'absolute',
        left: 64,
        top: 22,
        fontFamily: JP,
        fontSize: 13,
        letterSpacing: '0.3em',
        color: 'rgba(253,251,245,0.55)',
      }}
    >
      STA<span style={{fontWeight: 700}}>R</span>T — {String(sectionIndex + 1).padStart(2, '0')} / 14
    </div>
  </AbsoluteFill>
);

const WelcomeC: React.FC = () => {
  const f = useCurrentFrame();
  const scan = interpolate(f, [8, 46], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = interpolate(f, [8, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const track = interpolate(f, [8, 50], [0.34, 0.06], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sub = interpolate(f, [34, 58], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <SparkleOverlay kind="dust" opacity={0.18} />
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 52%)'}} />
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 108px 96px'}}>
        <div style={{position: 'relative', opacity: o}}>
          <div style={{fontFamily: JP, fontSize: 20, fontWeight: 300, letterSpacing: '0.5em', color: 'rgba(253,251,245,0.8)', marginBottom: 14}}>
            WELCOME
          </div>
          <div style={{fontFamily: JP, fontSize: 46, color: '#FDFBF5', letterSpacing: `${track}em`, lineHeight: 1.4}}>
            <span style={{fontWeight: 700}}>本日</span>
            <span style={{fontWeight: 300, fontSize: 38}}>はお越しいただき、</span>
            <br />
            <span style={{fontWeight: 300, fontSize: 38}}>誠にありがとうございます。</span>
          </div>
          <div style={{position: 'absolute', left: 0, bottom: -14, height: 2, width: `${scan}%`, background: '#FDFBF5', opacity: 0.85}} />
        </div>
        <div style={{fontFamily: JP, fontSize: 15, letterSpacing: '0.3em', color: 'rgba(253,251,245,0.7)', marginTop: 26, opacity: sub}}>
          2026.10.24 &nbsp;YOKOHAMA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const EndC: React.FC = () => {
  const f = useCurrentFrame();
  const icon = useIconReveal(f, 10, 18);
  const o = interpolate(f, [4, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const track = interpolate(f, [4, 50], [0.5, 0.16], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rule = interpolate(f, [16, 50], [0, 260], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dateO = interpolate(f, [30, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 75%)'}} />
      <div style={{textAlign: 'center', opacity: o, zIndex: 2}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}>
          <HeartOutlineIcon size={18} progress={icon} />
          <div style={{fontFamily: JP, fontSize: 44, fontWeight: 300, color: '#FDFBF5', letterSpacing: `${track}em`}}>
            SHOGO &amp; SHIORI
          </div>
        </div>
        <div style={{height: 1, width: rule, background: 'rgba(253,251,245,0.7)', margin: '18px auto 0'}} />
        <div style={{fontFamily: JP, fontSize: 16, fontWeight: 300, letterSpacing: '0.44em', color: '#FDFBF5', marginTop: 16, opacity: dateO}}>
          2026.10.24
        </div>
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
  const hasRealLyrics = lyricSlots.some((s) => !s.isPlaceholder);

  return (
    <AbsoluteFill style={{background: '#0A0A0C'}}>
      {START_129_SECTIONS.map((section, sectionIndex) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const design = sectionDesign('C', section.id);
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
                <ShotRenderer shot={shot} editorialRules />
              </Sequence>
            ))}
            <EditorialRules sectionIndex={sectionIndex} />
            {lyricWindows.map((w, i) => (
              <Sequence key={w.slotIndex} from={w.localFrom} durationInFrames={w.durationInFrames} name={`lyric-${w.slotIndex}`}>
                <LyricC
                  slot={lyricSlots[w.slotIndex - 1]}
                  durationInFrames={w.durationInFrames}
                  indexInSection={i}
                  emphasis={emphasis}
                />
              </Sequence>
            ))}
            {section.id === 'interlude-2b' ? <WelcomeC /> : null}
            {section.id === 'end' ? <EndC /> : null}
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
      {!hasRealLyrics ? <DemoLyricBadge /> : null}
    </AbsoluteFill>
  );
};
