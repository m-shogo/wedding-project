// B案: 冒険アニメOP(手描きグラフィック × 3-hit)
// 既存アニメ作品の固有表現はコピーせず、手描き線・panel・speed lineを基礎から組む。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {START_129_FPS, START_129_SECTIONS, lyricSlotWindowsForSection, start129SectionFrames} from '../../data/start129/sections';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';
import {StartDemoBackdrop} from './StartDemoBackdrop';
import {SectionBadge, MiniGuideCard} from './StartGuideOverlay';
import {HandDrawnUnderline, SpeedLineBurst} from '../../motion-kit/start129/handDrawnPrimitives';
import {HeartOutlineIcon, PlaneTrailIcon, useIconReveal} from '../../motion-kit/start129/iconPrimitives';
import {SparkleOverlay} from './SparkleOverlay';
import {start129TechniquesForShowcase} from '../../data/start129/techniqueCatalog';
import type {Start129AssetRole} from '../../data/start129/assetRoles';

const techniques = start129TechniquesForShowcase('B');
const findTechnique = (id: string) => techniques.find((t) => t.id === id)!;

/**
 * B案の恒常的な視覚signature。3-hitの瞬間だけでなく全編を通して、
 * A案(縁なしfull-bleed)/C案(negative space typography)と一目で見分けられるようにする。
 * コマ割り(panel)を思わせる控えめな手描き風frameを四隅へ置くだけで、
 * 常時flash/glow/particleは使わない(Style Bibleの過剰演出回避方針を維持)。
 */
const AnimeFrameVignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      boxShadow: 'inset 0 0 0 3px rgba(244,231,201,0.22), inset 0 0 120px 40px rgba(0,0,0,0.35)',
    }}
  />
);

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

/**
 * Chorus区間の主役ショット。修正前は黒背景+固定語を区間まるごと(約10秒)保持しており、
 * 「写真が主役」という要件に反していた(docs/decisions参照)。
 * 今回は写真/動画を常に背景に置き、3-hitは0.3〜1.0秒程度の短いaccentに絞る。
 * 区間中盤で2枚目の候補写真(variantIndex=1)へcutし、9〜10秒の静止保持を避ける。
 */
const ChorusShot: React.FC<{
  role: Start129AssetRole;
  word: string;
  hitFrame: number;
  localFrame: number;
  durationInFrames: number;
}> = ({role, word, hitFrame, localFrame, durationInFrames}) => {
  const hitWindow = 18; // 0.6秒(30fps)。3-hitは短いaccentであり長時間保持しない。
  const intensity = interpolate(localFrame, [hitFrame - 4, hitFrame, hitFrame + hitWindow], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const midCut = Math.round(durationInFrames * 0.55);
  const showSecondShot = localFrame >= midCut;
  const pushScale = interpolate(localFrame, [0, durationInFrames], [1, 1.03], {extrapolateRight: 'clamp'});
  const wordOpacity = interpolate(localFrame, [hitFrame - 4, hitFrame, hitFrame + hitWindow - 6, hitFrame + hitWindow], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${pushScale})`}}>
        <StartDemoBackdrop role={role} variantIndex={showSecondShot ? 1 : 0} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.28)'}} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* B案は「楽しさ重視」の文法なので、3-hitの瞬間だけ効果を強めに重ねる */}
        <SparkleOverlay kind="sparks" opacity={0.5 * intensity} />
        <SpeedLineBurst vanishX={960} vanishY={540} intensity={intensity} color="rgba(244,231,201,0.55)" />
        <div
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 96,
            fontWeight: 900,
            color: '#FDFBF5',
            opacity: wordOpacity,
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}
        >
          {word}
        </div>
        <div style={{opacity: wordOpacity}}>
          <HandDrawnUnderline progressFrom={hitFrame - 6} progressDurationInFrames={16} width={420} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const WelcomeBurst: React.FC<{localFrame: number}> = ({localFrame}) => {
  const iconProgress = useIconReveal(localFrame, 4, 18);
  const wordScale = interpolate(localFrame, [0, 10, 16], [0.85, 1.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subOpacity = interpolate(localFrame, [16, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.3)'}}>
      <SparkleOverlay kind="dust" opacity={0.16} />
      <div style={{display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${wordScale})`}}>
        <PlaneTrailIcon size={40} progress={iconProgress} />
        <div style={{fontFamily: "'Noto Sans JP', sans-serif", fontSize: 72, fontWeight: 900, color: '#FDFBF5'}}>
          ようこそ
        </div>
      </div>
      <HandDrawnUnderline progressFrom={6} progressDurationInFrames={16} width={260} />
      <div
        style={{
          marginTop: 18,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 26,
          color: '#FDFBF5',
          opacity: subOpacity,
        }}
      >
        本日はお越しいただき、誠にありがとうございます。
      </div>
    </AbsoluteFill>
  );
};

const EndBurst: React.FC<{localFrame: number}> = ({localFrame}) => {
  const iconProgress = useIconReveal(localFrame, 6, 14);
  const subOpacity = interpolate(localFrame, [16, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.35)'}}>
      <SparkleOverlay kind="dust" opacity={0.14} startFromSeconds={4} />
      <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 40, fontWeight: 700}}>
        SHOGO &amp; SHIORI
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, opacity: subOpacity}}>
        <HeartOutlineIcon size={18} progress={iconProgress} />
        <div style={{fontFamily: "'Noto Sans JP', sans-serif", color: '#FDFBF5', fontSize: 18}}>
          ご来場ありがとうございます
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

  return (
    <AbsoluteFill style={{background: '#0F0D0A'}}>
      {START_129_SECTIONS.map((section) => {
        const {from, durationInFrames} = start129SectionFrames(section);
        const role = sectionRoleMap[section.id];
        const isChorus = section.id.startsWith('chorus');
        const isPlayfulB = section.id === 'verse-1b' || section.id === 'verse-2b';
        const lyricWindows = lyricSlotWindowsForSection(section);

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            {isChorus ? (
              <ChorusShot
                role={role}
                word={section.id === 'chorus-1b' || section.id === 'chorus-2b' ? 'StaRt!' : '再スタート'}
                hitFrame={Math.round(durationInFrames * 0.15)}
                localFrame={frame - from}
                durationInFrames={durationInFrames}
              />
            ) : isPlayfulB ? (
              <PanelGridReveal role={role} localFrame={frame - from} durationInFrames={durationInFrames} />
            ) : section.id === 'interlude-2b' ? (
              <>
                <StartDemoBackdrop role={role} />
                <WelcomeBurst localFrame={frame - from} />
              </>
            ) : (
              <StartDemoBackdrop role={role} />
            )}
            {lyricWindows.map((w) => (
              <Sequence
                key={w.slotIndex}
                from={w.localFrom}
                durationInFrames={w.durationInFrames}
                name={`lyric-${w.slotIndex}`}
              >
                <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'flex-end', padding: 40}}>
                  <div
                    style={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      color: '#FDFBF5',
                      fontSize: 22,
                      opacity: lyricSlots[w.slotIndex - 1].isPlaceholder ? 0.4 : 0.9,
                      textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                    }}
                  >
                    {lyricSlots[w.slotIndex - 1].text}
                  </div>
                </AbsoluteFill>
              </Sequence>
            ))}
            {section.id === 'end' ? <EndBurst localFrame={frame - from} /> : null}
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
      <AnimeFrameVignette />
    </AbsoluteFill>
  );
};
