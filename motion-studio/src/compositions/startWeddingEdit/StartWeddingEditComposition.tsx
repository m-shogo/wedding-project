import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {weddingEditAudioPath, weddingEditLyricPhrases} from '../../data/startWeddingEdit/generated';
import {WEDDING_EDIT_SECTIONS, weddingEditSectionFrames} from '../../data/startWeddingEdit/sections';
import {entryOverlapFrames, placeShots, weddingSectionDesign, type WeddingVariant} from '../../data/startWeddingEdit/storyboard';
import {ShotRenderer} from '../../motion-kit/start129/shotEngine';
import {WeddingLyricTrack, weddingLyricFallbackByPhraseId} from '../../motion-kit/startWeddingEdit/weddingLyricLine';
import {TitleSequenceA, TitleSequenceB, TitleSequenceC} from './TitleOpenA_B_C';
import {InterludeOverlay} from './InterludeOverlay';

export type StartWeddingEditCompositionProps = {
  variant: WeddingVariant;
  reviewMode: boolean;
};

export const startWeddingEditDefaultProps: StartWeddingEditCompositionProps = {
  variant: 'A',
  reviewMode: false,
};

/** Guide専用のphrase debug card。weddingLyricFallbackByPhraseIdは
 * WeddingLyricTrack(このcomponentより前にJSX上で描画される)が同一render passで
 * 更新するmodule-scope mapで、固定fraction fallbackが実際に使われた場合だけ
 * FALLBACK表示を出す(Guide限定。Cleanには一切出さない)。 */
const GuideDebugCard: React.FC<{phraseId: string; wordsLine: string; children: React.ReactNode}> = ({phraseId, children}) => {
  const isFallback = weddingLyricFallbackByPhraseId.get(phraseId) === true;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          color: isFallback ? '#FFD84A' : '#0F0',
          background: 'rgba(0,0,0,0.55)',
          padding: '4px 10px',
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.5,
          textAlign: 'right',
        }}
      >
        {children}
        {isFallback ? <div style={{color: '#FFD84A', fontWeight: 700}}>FALLBACK</div> : null}
      </div>
    </AbsoluteFill>
  );
};

const TITLE_BY_VARIANT: Record<WeddingVariant, React.FC> = {
  A: TitleSequenceA,
  B: TitleSequenceB,
  C: TitleSequenceC,
};

export const StartWeddingEditComposition: React.FC<StartWeddingEditCompositionProps> = ({variant, reviewMode}) => {
  const Title = TITLE_BY_VARIANT[variant];

  return (
    <AbsoluteFill style={{background: '#0A0A0C'}}>
      {weddingEditAudioPath ? <Audio src={staticFile(weddingEditAudioPath)} /> : null}

      {WEDDING_EDIT_SECTIONS.map((section) => {
        const {from, durationInFrames} = weddingEditSectionFrames(section);

        if (section.id === 'intro') {
          return (
            <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
              <Title />
            </Sequence>
          );
        }

        const design = weddingSectionDesign(variant, section.id);
        const shots = placeShots(design, section);
        const isInterlude = section.id.startsWith('interlude');

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            {shots.map((shot, i) => (
              <Sequence
                key={shot.index}
                from={shot.localFrom}
                durationInFrames={shot.durationInFrames + (shots[i + 1] ? entryOverlapFrames(shots[i + 1].entry) : 0)}
                name={`shot${shot.index + 1}:${shot.role}`}
                premountFor={12}
              >
                <ShotRenderer shot={shot} />
              </Sequence>
            ))}
            {isInterlude ? <InterludeOverlay sectionId={section.id} variant={variant} /> : null}
            {reviewMode ? (
              <AbsoluteFill style={{pointerEvents: 'none'}}>
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    color: '#FFF',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '6px 12px',
                    fontFamily: 'monospace',
                    fontSize: 16,
                  }}
                >
                  {section.labelJa} ({section.startSec.toFixed(1)}s-{section.endSec.toFixed(1)}s)
                </div>
              </AbsoluteFill>
            ) : null}
          </Sequence>
        );
      })}

      <WeddingLyricTrack phrases={weddingEditLyricPhrases} variant={variant} />

      {reviewMode
        ? weddingEditLyricPhrases.map((p) => {
            const from = Math.round(p.startSec * 30);
            const dur = Math.max(1, Math.round(p.endSec * 30) - from);
            const wordsLine =
              p.importantWords && p.importantWords.length > 0
                ? p.importantWords.map((w) => `${w.word}@${w.accentSec.toFixed(2)}s`).join(' / ')
                : '(no accent marker)';
            return (
              <Sequence key={`guide-${p.phraseId}`} from={from} durationInFrames={dur} name={`guide-${p.phraseId}`}>
                <GuideDebugCard phraseId={p.phraseId} wordsLine={wordsLine}>
                  <div>
                    {p.phraseId} {p.startSec.toFixed(2)}s-{p.endSec.toFixed(2)}s
                  </div>
                  <div>{p.selectedAnimation ?? 'character-build'}</div>
                  <div>{wordsLine}</div>
                  <div>transition:{p.transitionIntent ?? '?'}</div>
                  <div>conf:{p.confidence ?? '?'}</div>
                  {p.humanReviewRequired ? <div style={{color: '#FF6B4A'}}>HUMAN REVIEW</div> : null}
                </GuideDebugCard>
              </Sequence>
            );
          })
        : null}
    </AbsoluteFill>
  );
};
