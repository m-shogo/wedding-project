import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {weddingEditAudioPath, weddingEditLyricPhrases} from '../../data/startWeddingEdit/generated';
import {WEDDING_EDIT_SECTIONS, weddingEditSectionFrames} from '../../data/startWeddingEdit/sections';
import {entryOverlapFrames, placeShots, weddingSectionDesign, type WeddingVariant} from '../../data/startWeddingEdit/storyboard';
import {ShotRenderer} from '../../motion-kit/start129/shotEngine';
import {WeddingLyricTrack, weddingLyricFallbackByPhraseId} from '../../motion-kit/startWeddingEdit/weddingLyricLine';
import {CHOREOGRAPHED_PHRASE_IDS, ChoreographedMomentRenderer} from '../../motion-kit/startWeddingEdit/choreographedMoments';
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

  // TypeMaskText等が「今その瞬間に実際に流れているshotの写真」を参照できるよう、
  // sectionId→{shots, sectionStartSec}のmapを作る(phrase.sectionIdで引ける)。
  // 固定写真1枚のハードコードを廃止するための最小限の追加(重い処理ではない)。
  const sectionShots: Record<string, {shots: ReturnType<typeof placeShots>; sectionStartSec: number}> = {};
  for (const section of WEDDING_EDIT_SECTIONS) {
    if (section.id === 'intro') continue;
    const design = weddingSectionDesign(variant, section.id);
    sectionShots[section.id] = {shots: placeShots(design, section), sectionStartSec: section.startSec};
  }

  // 「パッパッパッ」等のthreeHitFrameSecsを、文字だけでなく写真/カメラも同じ瞬間に
  // 反応させるためのsection-local frameへ変換する(audit項目7: 歌詞と映像が別々に
  // 動いている、への対応)。sectionId→そのsection内で発生するimpact frame一覧。
  const sectionImpactFrames: Record<string, number[]> = {};
  for (const p of weddingEditLyricPhrases) {
    if (!p.threeHitFrameSecs) continue;
    const section = WEDDING_EDIT_SECTIONS.find((s) => s.id === p.sectionId);
    if (!section) continue;
    const frames = p.threeHitFrameSecs.map((s) => Math.round((s - section.startSec) * 30));
    sectionImpactFrames[p.sectionId] = [...(sectionImpactFrames[p.sectionId] ?? []), ...frames];
  }

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

        const shots = sectionShots[section.id].shots;
        const isInterlude = section.id.startsWith('interlude');

        const impactFramesInSection = sectionImpactFrames[section.id] ?? [];

        return (
          <Sequence key={section.id} from={from} durationInFrames={durationInFrames} name={section.labelJa}>
            {shots.map((shot, i) => {
              const shotImpactFrames = impactFramesInSection
                .map((f) => f - shot.localFrom)
                .filter((lf) => lf >= 0 && lf < shot.durationInFrames);
              return (
                <Sequence
                  key={shot.index}
                  from={shot.localFrom}
                  durationInFrames={shot.durationInFrames + (shots[i + 1] ? entryOverlapFrames(shots[i + 1].entry) : 0)}
                  name={`shot${shot.index + 1}:${shot.role}`}
                  premountFor={12}
                >
                  <ShotRenderer shot={shot} impactFrames={shotImpactFrames} />
                </Sequence>
              );
            })}
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

      {/* ChoreographyEventで文字・写真・カメラを同時制御するmoment(武装創造/
          チャプチャプチャプ/独りじゃない)。通常のshot/lyricレイヤーより上に描画し、
          その区間だけ画面全体を差し替える。 */}
      {weddingEditLyricPhrases
        .filter((p) => (CHOREOGRAPHED_PHRASE_IDS as readonly string[]).includes(p.phraseId))
        .map((p) => {
          const from = Math.round(p.startSec * 30);
          const dur = Math.max(1, Math.round(p.endSec * 30) - from);
          return (
            <Sequence key={`choreo-${p.phraseId}`} from={from} durationInFrames={dur} name={`choreo-${p.phraseId}`}>
              <ChoreographedMomentRenderer phrase={p} variant={variant} />
            </Sequence>
          );
        })}

      <WeddingLyricTrack phrases={weddingEditLyricPhrases} variant={variant} sectionShots={sectionShots} />

      {reviewMode
        ? weddingEditLyricPhrases.map((p) => {
            const from = Math.round(p.startSec * 30);
            const dur = Math.max(1, Math.round(p.endSec * 30) - from);
            const wordsLine =
              p.importantWords && p.importantWords.length > 0
                ? p.importantWords
                    .map((w) => `${w.word}@${w.accentSec.toFixed(2)}s${w.timingSource === 'manual' ? '✓manual' : '(beat-snap)'}`)
                    .join(' / ')
                : '(no accent marker)';
            const anyManual = p.importantWords?.some((w) => w.timingSource === 'manual') ?? false;
            const anyVerified = p.importantWords?.some((w) => w.verifiedByListening) ?? false;
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
                  {!anyManual && p.importantWords && p.importantWords.length > 0 ? (
                    <div style={{color: '#8CA0FF'}}>timing:beat-snap(未検証)</div>
                  ) : null}
                  {anyVerified ? <div style={{color: '#7CF29A'}}>聴取確認済み語あり</div> : null}
                  {p.humanReviewRequired ? <div style={{color: '#FF6B4A'}}>HUMAN REVIEW</div> : null}
                </GuideDebugCard>
              </Sequence>
            );
          })
        : null}
    </AbsoluteFill>
  );
};
