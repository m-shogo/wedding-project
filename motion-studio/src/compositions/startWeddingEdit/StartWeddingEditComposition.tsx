import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {weddingEditAudioPath, weddingEditLyricPhrases} from '../../data/startWeddingEdit/generated';
import {WEDDING_EDIT_SECTIONS, weddingEditSectionFrames} from '../../data/startWeddingEdit/sections';
import {entryOverlapFrames, placeShots, weddingSectionDesign, type WeddingVariant} from '../../data/startWeddingEdit/storyboard';
import {ShotRenderer} from '../../motion-kit/start129/shotEngine';
import {weddingAssetResolver} from '../../data/startWeddingEdit/realMedia';
import {WeddingLyricTrack, weddingLyricFallbackByPhraseId} from '../../motion-kit/startWeddingEdit/weddingLyricLine';
import {ChoreographedMomentRenderer, isChoreographedForVariant} from '../../motion-kit/startWeddingEdit/choreographedMoments';
import {buildGenericWordImpactEvents} from '../../data/startWeddingEdit/choreography';
import {TitleSequenceA, TitleSequenceC} from './TitleOpenA_B_C';
import {IntroNarrativeB} from './IntroNarrativeB';
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

// B案の冒頭は既知の問題への対応としてIntroNarrativeB(ようこそ→タグライン→
// (紹介)→S→StaRt)へ置き換えた。A/Cは「B完成後」の方針(既知の問題5)により
// 既存のTitleSequenceA/Cのまま変更しない。
const TITLE_BY_VARIANT: Record<WeddingVariant, React.FC> = {
  A: TitleSequenceA,
  B: IntroNarrativeB,
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
  //
  // v2: threeHitFrameSecs以外のphraseにも、ChoreographyEvent
  // (buildGenericWordImpactEvents)由来のcamera punch eventを一般化して適用する。
  // これにより「文字だけが動いていないか」の対象範囲を3-hit限定から広げる。
  // ChoreographedMomentRenderer側で全画面takeoverするP004/P013/P014は、
  // 通常shotの下に重複してpunchを掛けると二重反応になるため除外する。
  const sectionImpactFrames: Record<string, number[]> = {};
  const addImpact = (sectionId: string, sectionStartSec: number, timeSec: number) => {
    const f = Math.round((timeSec - sectionStartSec) * 30);
    sectionImpactFrames[sectionId] = [...(sectionImpactFrames[sectionId] ?? []), f];
  };
  for (const p of weddingEditLyricPhrases) {
    const section = WEDDING_EDIT_SECTIONS.find((s) => s.id === p.sectionId);
    if (!section) continue;
    if (p.threeHitFrameSecs) {
      for (const s of p.threeHitFrameSecs) addImpact(p.sectionId, section.startSec, s);
      continue;
    }
    if (isChoreographedForVariant(p.phraseId, variant)) continue;
    for (const ev of buildGenericWordImpactEvents(p, variant)) addImpact(p.sectionId, section.startSec, ev.timeSec);
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
                  <ShotRenderer shot={shot} impactFrames={shotImpactFrames} assetResolver={weddingAssetResolver} showSourceBadge={reviewMode} />
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
        .filter((p) => isChoreographedForVariant(p.phraseId, variant))
        .map((p) => {
          const from = Math.round(p.startSec * 30);
          const dur = Math.max(1, Math.round(p.endSec * 30) - from);
          return (
            <Sequence key={`choreo-${p.phraseId}`} from={from} durationInFrames={dur} name={`choreo-${p.phraseId}`}>
              <ChoreographedMomentRenderer phrase={p} variant={variant} sectionShots={sectionShots} reviewMode={reviewMode} />
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
