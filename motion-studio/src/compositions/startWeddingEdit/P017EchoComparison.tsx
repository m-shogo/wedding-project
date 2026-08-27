// TASK 2(2026-08-27): P017(repetition-echo)のecho/caption card重なりについて、
// margin調整では改善しなかったため、人間が選べる複数案を並べて比較する専用
// Composition。本番のweddingLyricLine.tsx(=Variant A "CURRENT")は一切変更せず、
// ここでB/C/Dを試作し、人間がA/B/C(/D)から選んだ後に初めて本番へ反映する
// (AIが勝手にどれかをFinal採用しない)。
//
// 4案とも同一frame clock・同一背景・同一word/rest文字列(generated.tsのP017
// エントリからそのまま参照。歌詞本文をこのファイルへ新規に書き足さない)で
// 揃えることで、演出差だけを比較できるようにする。
//
// Variant A: CURRENT(現状そのまま。RepetitionEcho + CharacterBuild、marginTop=44)
// Variant B: ECHO OUTSIDE CARD(echoをcaption cardの外、上方の独立レイヤーへ出す)
// Variant C: SOFT ECHO(echoのopacity/scaleを抑え、blurを足してpriorityを下げる)
// Variant D: FEWER OCCURRENCES(echoの反復回数を3→2に削減)

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {weddingEditLyricPhrases} from '../../data/startWeddingEdit/generated';
import {CharacterBuild, RepetitionEcho} from '../../motion-kit/start129/lyricAnimationFamilies';
import {StartDemoBackdrop} from '../start129/StartDemoBackdrop';

const phrase = weddingEditLyricPhrases.find((p) => p.phraseId === 'P017');
if (!phrase) throw new Error('P017EchoComparison: generated.tsにP017が見つからない');

const REPEATED_PHRASES = ['お手を拝借', 'スタート'];
const extractRepeatedWord = (text: string): string | null => {
  for (const w of REPEATED_PHRASES) {
    if (text.includes(w)) return w;
  }
  return null;
};
const word = extractRepeatedWord(phrase.text) ?? phrase.text.slice(0, 4);
const rest = phrase.text.replace(word, '');
const charFrames = Array.from(rest).map((_, i) => 20 + i * 2);

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(18,16,13,0.42)',
  borderLeft: '5px solid #F4C95D',
  padding: '10px 22px',
  borderRadius: 4,
  display: 'inline-block',
};

/** Variant A: CURRENT。weddingLyricLine.tsxの'repetition-echo'caseと同一構造。 */
const VariantA: React.FC = () => (
  <div style={CARD_STYLE}>
    <div style={{position: 'relative'}}>
      <RepetitionEcho text={word} occurrences={[0, 8, 16]} fontSize={46} color="#FFFDF7" />
      <div style={{marginTop: 44}}>
        <CharacterBuild text={rest} charFrames={charFrames} fontSize={40} color="#FFFDF7" />
      </div>
    </div>
  </div>
);

/** Variant B: ECHO OUTSIDE CARD。echoをcard外の独立レイヤー(card上方、
 * 背景に直接馴染ませる・cardの半透明背景を持たない)へ出し、cardには
 * CharacterBuildだけを残す。echo感は維持しつつ、card内部の文字競合を無くす。 */
const VariantB: React.FC = () => (
  <>
    <div style={{position: 'absolute', bottom: 210, left: 90}}>
      <RepetitionEcho text={word} occurrences={[0, 8, 16]} fontSize={46} color="#FFFDF7" />
    </div>
    <div style={{position: 'absolute', bottom: 130, left: 90}}>
      <div style={CARD_STYLE}>
        <CharacterBuild text={rest} charFrames={charFrames} fontSize={40} color="#FFFDF7" />
      </div>
    </div>
  </>
);

/** Variant C: SOFT ECHO。構造はVariant Aのままだが、echo側のopacity上限を
 * 下げ、blurを足し、CharacterBuildより明確に視覚優先度を下げる。 */
const SoftRepetitionEcho: React.FC<{text: string; occurrences: number[]}> = ({text, occurrences}) => {
  const f = useCurrentFrame();
  return (
    <>
      {occurrences.map((hitFrame, i) => {
        const local = f - hitFrame;
        // Variant Aの[0,6,40]→[0,0.9-i*0.15,0]に対し、最大opacityを半分程度へ下げ、
        // fade-outも早める(40→28)ことで主文字より確実に控えめにする。
        const o = interpolate(local, [0, 6, 28], [0, (0.9 - i * 0.15) * 0.5, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const scale = 1 + i * 0.1;
        if (o <= 0.001) return null;
        return (
          <span
            key={i}
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 500,
              fontSize: 46,
              color: '#FFFDF7',
              position: 'absolute',
              opacity: o,
              filter: 'blur(1.5px)',
              transform: `scale(${scale}) translateX(${i * 12}px)`,
            }}
          >
            {text}
          </span>
        );
      })}
    </>
  );
};
const VariantC: React.FC = () => (
  <div style={CARD_STYLE}>
    <div style={{position: 'relative'}}>
      <SoftRepetitionEcho text={word} occurrences={[0, 8, 16]} />
      <div style={{marginTop: 44}}>
        <CharacterBuild text={rest} charFrames={charFrames} fontSize={40} color="#FFFDF7" />
      </div>
    </div>
  </div>
);

/** Variant D: FEWER OCCURRENCES。構造・座標はVariant Aのまま、echoの反復回数
 * だけ3→2に削減し、密度そのものを減らす案。 */
const VariantD: React.FC = () => (
  <div style={CARD_STYLE}>
    <div style={{position: 'relative'}}>
      <RepetitionEcho text={word} occurrences={[0, 10]} fontSize={46} color="#FFFDF7" />
      <div style={{marginTop: 44}}>
        <CharacterBuild text={rest} charFrames={charFrames} fontSize={40} color="#FFFDF7" />
      </div>
    </div>
  </div>
);

const QUADRANTS: Array<{label: string; Component: React.FC}> = [
  {label: 'A: CURRENT', Component: VariantA},
  {label: 'B: ECHO OUTSIDE CARD', Component: VariantB},
  {label: 'C: SOFT ECHO', Component: VariantC},
  {label: 'D: FEWER OCCURRENCES(3→2)', Component: VariantD},
];

/** 2x2グリッドで4案を同一frame clockで同時比較する。背景は実際にP017が
 * 使うBROLL_TEXTURE roleを共通で使い、演出差だけを比較できるようにする。 */
export const P017EchoComparison: React.FC = () => (
  <AbsoluteFill style={{background: '#0A0A0C'}}>
    <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr'}}>
      {QUADRANTS.map(({label, Component}) => (
        <div key={label} style={{position: 'relative', overflow: 'hidden', border: '1px solid #333'}}>
          <StartDemoBackdrop role="BROLL_TEXTURE" variantIndex={5} />
          <AbsoluteFill style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 60px 45px'}}>
            <Component />
          </AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontFamily: 'monospace',
              fontSize: 13,
              color: '#FFD84A',
              background: 'rgba(0,0,0,0.6)',
              padding: '2px 8px',
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  </AbsoluteFill>
);
