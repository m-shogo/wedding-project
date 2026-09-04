import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {
  type JapaneseFriendsOpeningStartSyncProps,
  type StartWeddingCoupleNames,
  type StartWeddingIntroProfile,
  type StartWeddingLyricPhrase,
  defaultBrideProfile,
  defaultCoupleNames,
  defaultGroomProfile,
  startWeddingEditDurationInFrames,
  startWeddingEditRange,
} from '../../data/startWeddingEditPublic';
import {
  buildCubicBezierArcLengthLut,
  cubicBezierPointAtArcProgress,
  routeControlPoints,
  routePathD,
} from '../../motion-kit/routeLineMath';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const font = '"Avenir Next", "Noto Sans JP", sans-serif';
const bpm = 187.5;
const beatSeconds = 60 / bpm;
const beatOriginSeconds = 0.16;
const routePoints = routeControlPoints('right');
const routeLut = buildCubicBezierArcLengthLut(routePoints);
const assets = ['couple-arrival', 'friends-picnic', 'bride-friends', 'groom-friends', 'venue-entrance'] as const;
const sections = [
  {id: 'intro', start: 0, end: 12.5},
  {id: 'verse-1a', start: 12.5, end: 22},
  {id: 'verse-1b', start: 22, end: 30},
  {id: 'prechorus-1', start: 30, end: 33},
  {id: 'chorus-1', start: 33, end: 63},
  {id: 'verse-2a', start: 63, end: 73},
  {id: 'verse-2b', start: 73, end: 80},
  {id: 'prechorus-2', start: 80, end: 82},
  {id: 'chorus-2', start: 82, end: 114},
  {id: 'interlude-montage', start: 114, end: 124},
  {id: 'interlude-route', start: 124, end: 132},
  {id: 'interlude-welcome', start: 132, end: 138},
  {id: 'interlude-names', start: 138, end: 142},
  {id: 'interlude-end', start: 142, end: 145.6},
] as const;

const imagePath = (asset: (typeof assets)[number]) => staticFile(`demo-assets/japanese-opening-ai-v1/${asset}.jpg`);
const sectionAt = (seconds: number) => sections.find((section) => seconds >= section.start && seconds < section.end) ?? sections.at(-1)!;

function useBeat(seconds: number, intensity = 1) {
  const beatPosition = Math.max(0, seconds - beatOriginSeconds) / beatSeconds;
  const beatIndex = Math.floor(beatPosition);
  const phase = beatPosition - beatIndex;
  return {beatIndex, pulse: interpolate(phase, [0, 0.18, 1], [1, 0.2, 0], clamp) * intensity};
}

function HitFlash({seconds, hits}: {seconds: number; hits: number[] | null | undefined}) {
  if (!hits || !hits.length) return null;
  const nearest = Math.min(...hits.map((hit) => Math.abs(seconds - hit)));
  const opacity = interpolate(nearest, [0, 0.045, 0.11], [0.82, 0.22, 0], clamp);
  if (opacity <= 0) return null;
  return <AbsoluteFill style={{background: '#fff', opacity, pointerEvents: 'none', mixBlendMode: 'screen'}} />;
}

function PhotoBackdrop({seconds, sectionIndex, intensity = 1}: {seconds: number; sectionIndex: number; intensity?: number}) {
  const {pulse, beatIndex} = useBeat(seconds, intensity);
  const cut = Math.floor(beatIndex / 4);
  const layout = (cut + sectionIndex) % 4;
  const primary = assets[(sectionIndex + cut) % assets.length];
  const secondary = assets[(sectionIndex + cut + 2) % assets.length];
  const tertiary = assets[(sectionIndex + cut + 4) % assets.length];
  const punch = 1 + pulse * 0.026;
  const photo = (asset: (typeof assets)[number], position = '50% 50%') => (
    <Img src={imagePath(asset)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, filter: `saturate(${1.08 + pulse * 0.18}) contrast(1.06)`, transform: `scale(${punch})`}} />
  );
  if (layout === 1) {
    return <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 12, padding: 12, background: '#52d9ff', overflow: 'hidden'}}><div style={{overflow: 'hidden', clipPath: 'polygon(0 0, 100% 0, 91% 100%, 0 100%)'}}>{photo(primary)}</div><div style={{overflow: 'hidden', clipPath: 'polygon(9% 0, 100% 0, 100% 100%, 0 100%)'}}>{photo(secondary)}</div><AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 35%, rgba(3,14,25,.72))'}} /></AbsoluteFill>;
  }
  if (layout === 2) {
    return <AbsoluteFill style={{background: '#ff6b5f', overflow: 'hidden'}}><div style={{position: 'absolute', inset: '-120px -80px', color: 'rgba(7,27,42,.16)', fontFamily: font, fontSize: 250, lineHeight: .78, fontWeight: 1000, transform: `rotate(-8deg) translateX(${(beatIndex % 4) * -22}px)`}}>LET&apos;S START LET&apos;S START LET&apos;S START</div><div style={{position: 'absolute', left: 170, top: 95, width: 1220, height: 860, overflow: 'hidden', border: '14px solid #fff', boxShadow: '35px 35px 0 #071b2a', transform: `rotate(-3deg) scale(${punch})`}}>{photo(primary)}</div><div style={{position: 'absolute', right: 95, bottom: 90, width: 480, height: 360, overflow: 'hidden', border: '10px solid #ffd33d', transform: `rotate(6deg) translateY(${-pulse * 16}px)`}}>{photo(secondary)}</div><AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 45%, rgba(3,14,25,.7))'}} /></AbsoluteFill>;
  }
  if (layout === 3) {
    return <AbsoluteFill style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: '#071b2a', gap: 9, padding: '48px 20px 72px', overflow: 'hidden'}}>{[primary, secondary, tertiary].map((asset, index) => <div key={`${asset}-${index}`} style={{overflow: 'hidden', transform: `translateY(${(index - 1) * (34 + pulse * 18)}px) skewY(${(index - 1) * 2}deg)`, borderTop: `12px solid ${['#ffd33d', '#fff', '#52d9ff'][index]}`}}>{photo(asset, `${35 + index * 15}% 50%`)}</div>)}<AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 40%, rgba(3,14,25,.72))'}} /></AbsoluteFill>;
  }
  return <AbsoluteFill style={{overflow: 'hidden', background: '#061827'}}>{photo(primary)}<div style={{position: 'absolute', inset: 24, border: `${8 + pulse * 8}px solid #ffd33d`, transform: `scale(${1 - pulse * .008})`}} /><AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(3,14,25,.06), rgba(3,14,25,.78))'}} /></AbsoluteFill>;
}

function ChorusQuadGrid({seconds, sectionIndex, pulse, beatIndex}: {seconds: number; sectionIndex: number; pulse: number; beatIndex: number}) {
  return (
    <AbsoluteFill style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 10, padding: '54px 28px 74px', background: '#071b2a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -40, top: 250, zIndex: 2, color: 'rgba(255,211,61,.22)', fontFamily: font, fontSize: 260, lineHeight: .75, fontWeight: 1000, whiteSpace: 'nowrap', transform: `translateX(${-(beatIndex % 8) * 20}px) rotate(-4deg)`}}>GO! GO! PARTY!</div>
      {[0, 1, 2, 3].map((panel) => {
        const asset = assets[(sectionIndex + panel + Math.floor(beatIndex / 4)) % assets.length];
        const lift = (panel % 2 ? 1 : -1) * pulse * 18;
        return (
          <div key={panel} style={{overflow: 'hidden', border: `${6 + pulse * 5}px solid ${panel % 3 === 0 ? '#ffd33d' : panel % 3 === 1 ? '#52d9ff' : '#fff'}`, transform: `translateY(${lift}px) rotate(${(panel % 2 ? 1 : -1) * 1.2}deg) scale(${1 + pulse * 0.018})`, boxShadow: '0 20px 45px rgba(0,0,0,0.34)'}}>
            <Img src={imagePath(asset)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.08 + pulse * .04}) translateX(${(panel % 2 ? 1 : -1) * pulse * 10}px)`, filter: 'saturate(1.18) contrast(1.05)'}} />
          </div>
        );
      })}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(4,17,28,0.02), rgba(4,17,28,0.72))'}} />
    </AbsoluteFill>
  );
}

function ChorusHeroSplit({sectionIndex, pulse, beatIndex}: {sectionIndex: number; pulse: number; beatIndex: number}) {
  const hero = assets[(sectionIndex + Math.floor(beatIndex / 4)) % assets.length];
  const side1 = assets[(sectionIndex + Math.floor(beatIndex / 4) + 1) % assets.length];
  const side2 = assets[(sectionIndex + Math.floor(beatIndex / 4) + 3) % assets.length];
  return (
    <AbsoluteFill style={{background: '#ff6b5f', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: '-60px -40px', color: 'rgba(7,27,42,.18)', fontFamily: font, fontSize: 220, lineHeight: .78, fontWeight: 1000, transform: `rotate(6deg) translateX(${(beatIndex % 8) * 16}px)`}}>PARTY PARTY PARTY</div>
      <div style={{position: 'absolute', left: 96, top: 60, width: 1220, height: 960, overflow: 'hidden', border: '14px solid #fff', boxShadow: '0 30px 60px rgba(0,0,0,.38)', transform: `scale(${1 + pulse * .02}) rotate(-1.5deg)`}}>
        <Img src={imagePath(hero)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.1 + pulse * .04})`, filter: 'saturate(1.15) contrast(1.05)'}} />
      </div>
      <div style={{position: 'absolute', right: 70, top: 90, width: 430, height: 330, overflow: 'hidden', border: '10px solid #ffd33d', transform: `rotate(4deg) translateY(${-pulse * 14}px)`}}><Img src={imagePath(side1)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
      <div style={{position: 'absolute', right: 70, bottom: 96, width: 430, height: 330, overflow: 'hidden', border: '10px solid #52d9ff', transform: `rotate(-3deg) translateY(${pulse * 14}px)`}}><Img src={imagePath(side2)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 45%, rgba(3,14,25,.68))'}} />
    </AbsoluteFill>
  );
}

function ChorusDiagonalStack({sectionIndex, pulse, beatIndex}: {sectionIndex: number; pulse: number; beatIndex: number}) {
  const base = sectionIndex + Math.floor(beatIndex / 4);
  return (
    <AbsoluteFill style={{background: '#ffd33d', overflow: 'hidden'}}>
      {[0, 1, 2].map((index) => {
        const asset = assets[(base + index * 2) % assets.length];
        return (
          <div key={index} style={{position: 'absolute', left: 60 + index * 560, top: 40 + (index % 2) * 90, width: 620, height: 940, overflow: 'hidden', border: '12px solid #071b2a', transform: `rotate(${(index - 1) * 7}deg) translateY(${(index % 2 ? 1 : -1) * pulse * 16}px) scale(${1 + pulse * .02})`, boxShadow: '0 22px 46px rgba(0,0,0,.3)'}}>
            <Img src={imagePath(asset)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.2) contrast(1.06)'}} />
          </div>
        );
      })}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 40%, rgba(3,14,25,.72))'}} />
    </AbsoluteFill>
  );
}

function ChorusPanels({seconds, sectionIndex, intensity = 1}: {seconds: number; sectionIndex: number; intensity?: number}) {
  const {pulse, beatIndex} = useBeat(seconds, intensity);
  const layout = Math.floor(beatIndex / 16) % 3;
  if (layout === 1) return <ChorusHeroSplit sectionIndex={sectionIndex} pulse={pulse} beatIndex={beatIndex} />;
  if (layout === 2) return <ChorusDiagonalStack sectionIndex={sectionIndex} pulse={pulse} beatIndex={beatIndex} />;
  return <ChorusQuadGrid seconds={seconds} sectionIndex={sectionIndex} pulse={pulse} beatIndex={beatIndex} />;
}

function Confetti({seconds}: {seconds: number}) {
  const colors = ['#ffd33d', '#52d9ff', '#ff6b5f', '#ff7eae', '#fff'];
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {Array.from({length: 38}, (_, index) => {
        const top = (seconds * (150 + index % 5 * 22) + index * 79) % 1260 - 140;
        return <div key={index} style={{position: 'absolute', left: (index * 149) % 1940 - 10, top, width: 8 + index % 3 * 4, height: 17, borderRadius: 3, background: colors[index % colors.length], transform: `rotate(${seconds * 210 + index * 31}deg)`, opacity: 0.86}} />;
      })}
    </AbsoluteFill>
  );
}

function ThreeHitLyric({phrase, seconds}: {phrase: StartWeddingLyricPhrase; seconds: number}) {
  const emphasis = phrase.emphasisWord ?? '';
  const glyphs = Array.from(emphasis);
  const unitSize = Math.max(1, Math.floor(glyphs.length / 3));
  const units = [0, 1, 2].map((index) => glyphs.slice(index * unitSize, index === 2 ? glyphs.length : (index + 1) * unitSize).join(''));
  const hits = phrase.threeHitFrameSecs ?? [phrase.startSec, phrase.startSec + beatSeconds, phrase.startSec + beatSeconds * 2];
  const suffix = phrase.text.replace(emphasis, '').trim();
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'center', gap: 26}}>
        {units.map((unit, index) => {
          const hit = spring({frame: (seconds - hits[index]) * 30, fps: 30, config: {damping: 8, stiffness: 230, mass: 0.55}});
          return <span key={`${unit}-${index}`} style={{fontSize: 155, lineHeight: 0.9, fontWeight: 1000, color: ['#ffd33d', '#52d9ff', '#ff6b5f'][index], transform: `translateY(${(1 - hit) * -110}px) rotate(${(index - 1) * 7}deg) scale(${0.55 + hit * 0.45})`, opacity: hit, WebkitTextStroke: '2px rgba(4,20,32,0.22)'}}>{unit}</span>;
        })}
      </div>
      <div style={{marginTop: 22, fontSize: 58, fontWeight: 1000, letterSpacing: '-0.035em'}}>{suffix}</div>
    </div>
  );
}

function CharacterBurst({text, seconds, startSec}: {text: string; seconds: number; startSec: number}) {
  const glyphs = Array.from(text);
  return <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1580, gap: '0 .015em'}}>{glyphs.map((glyph, index) => {
    const hit = spring({frame: (seconds - startSec) * 30 - index * 1.15, fps: 30, config: {damping: 9, stiffness: 260, mass: .45}});
    return <span key={`${glyph}-${index}`} style={{display: 'inline-block', minWidth: glyph.trim() ? undefined : '.3em', fontSize: glyphs.length > 20 ? 66 : 94, fontWeight: 1000, color: index % 5 === 0 ? '#ffd33d' : '#fff', transform: `translateY(${(1 - hit) * (index % 2 ? 130 : -130)}px) rotate(${(1 - hit) * (index % 2 ? 14 : -14)}deg) scale(${.35 + hit * .65})`, opacity: hit, textShadow: '7px 7px 0 rgba(255,107,95,.76)'}}>{glyph}</span>;
  })}</div>;
}

function WordTiles({text, seconds, startSec}: {text: string; seconds: number; startSec: number}) {
  const glyphs = Array.from(text.replace(/\s+/g, ''));
  const chunk = Math.max(2, Math.ceil(glyphs.length / 3));
  const tiles = [glyphs.slice(0, chunk), glyphs.slice(chunk, chunk * 2), glyphs.slice(chunk * 2)].filter((part) => part.length).map((part) => part.join(''));
  return <div style={{display: 'grid', gap: 12, justifyItems: 'center'}}>{tiles.map((tile, index) => {
    const hit = spring({frame: (seconds - startSec) * 30 - index * 3, fps: 30, config: {damping: 10, stiffness: 240}});
    return <div key={`${tile}-${index}`} style={{padding: '5px 24px 10px', background: ['#ffd33d', '#52d9ff', '#ff6b5f'][index % 3], color: '#071b2a', fontSize: tiles.length === 1 ? 100 : 70, lineHeight: 1, fontWeight: 1000, boxShadow: '12px 12px 0 rgba(7,27,42,.85)', transform: `translateX(${(1 - hit) * (index % 2 ? 900 : -900)}px) rotate(${(index - 1) * 2.5}deg) scale(${.8 + hit * .2})`}}>{tile}</div>;
  })}</div>;
}

function StretchLyric({text, enter, pulse}: {text: string; enter: number; pulse: number}) {
  return <div style={{position: 'relative', width: 1660, textAlign: 'center', transform: `scaleX(${.55 + enter * .45}) scaleY(${1 + pulse * .05})`}}><div style={{position: 'absolute', inset: 0, color: 'transparent', fontSize: text.length > 18 ? 67 : 96, lineHeight: 1.02, fontWeight: 1000, WebkitTextStroke: '9px #ff6b5f', transform: `translate(${12 + pulse * 8}px, ${12 + pulse * 8}px)`}}>{text}</div><div style={{position: 'relative', color: '#fff', fontSize: text.length > 18 ? 67 : 96, lineHeight: 1.02, fontWeight: 1000}}>{text}</div></div>;
}

function LyricTypography({seconds, lyricPhrases}: {seconds: number; lyricPhrases: StartWeddingLyricPhrase[]}) {
  const phrase = lyricPhrases.find((item) => seconds >= item.startSec && seconds < item.endSec);
  if (!phrase) return null;
  const {pulse} = useBeat(seconds);
  const enter = interpolate(seconds, [phrase.startSec, phrase.startSec + 0.16], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.8))});
  const exit = interpolate(seconds, [phrase.exitSec, phrase.endSec], [1, 0], clamp);
  const opacity = Math.min(enter, exit);
  const isQuiet = phrase.selectedAnimation === 'whisper-reveal' || phrase.rhythmType === 'quiet';
  const isImpact = phrase.selectedAnimation === 'impact-word' || phrase.selectedAnimation === 'word-hit';
  const isCall = phrase.selectedAnimation === 'call-and-response-layout';
  const isCharacter = phrase.selectedAnimation === 'character-build';
  const isStretch = phrase.selectedAnimation === 'held-note-stretch';
  const isQuestion = phrase.selectedAnimation === 'question-pause';
  const isTravel = phrase.selectedAnimation === 'baseline-travel';
  return (
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: isQuiet ? 'end center' : 'center', padding: isQuiet ? '0 80px 108px' : '100px 100px 130px', color: '#fff', fontFamily: font, opacity, textShadow: '0 6px 30px rgba(0,0,0,0.74)'}}>
      {phrase.rhythmType === 'three-hit' ? <ThreeHitLyric phrase={phrase} seconds={seconds} /> : isCall ? (
        <div style={{display: 'grid', gap: 18, textAlign: 'center'}}>
          {phrase.text.split(/[　 ]+/).filter(Boolean).map((part, index) => <span key={`${part}-${index}`} style={{padding: '2px 22px 8px', background: index % 2 ? '#ffd33d' : '#ff6b5f', fontSize: index === 1 ? 104 : 62, lineHeight: 1, fontWeight: 1000, color: index % 2 ? '#071b2a' : '#fff', boxShadow: '10px 10px 0 rgba(7,27,42,.72)', transform: `translateX(${(1 - enter) * (index % 2 ? 700 : -700)}px) rotate(${index % 2 ? 3 : -3}deg) scale(${1 + pulse * .025})`}}>{part}</span>)}
        </div>
      ) : isCharacter ? <CharacterBurst text={phrase.text} seconds={seconds} startSec={phrase.startSec} />
      : isTravel ? <WordTiles text={phrase.text} seconds={seconds} startSec={phrase.startSec} />
      : isStretch ? <StretchLyric text={phrase.text} enter={enter} pulse={pulse} />
      : isQuestion ? (<div style={{position: 'relative', textAlign: 'center', transform: `scale(${.7 + enter * .3})`}}><div style={{position: 'absolute', left: -190, top: -210, color: '#ffd33d', fontSize: 420, lineHeight: 1, fontWeight: 1000, opacity: .8, transform: `rotate(${-12 + pulse * 5}deg)`}}>?</div><div style={{position: 'relative', maxWidth: 1450, padding: '28px 44px', border: '10px solid #fff', background: '#071b2a', color: '#fff', fontSize: 78, lineHeight: 1.05, fontWeight: 1000, boxShadow: '18px 18px 0 #52d9ff'}}>{phrase.text}</div></div>
      ) : (
        <div style={{maxWidth: 1580, textAlign: 'center', transform: `translateY(${(1 - enter) * 90}px) scale(${isImpact ? 0.55 + enter * 0.5 + pulse * .035 : 0.9 + enter * 0.1}) rotate(${isImpact ? (1 - enter) * -7 : 0}deg)`}}>
          <div style={{display: 'inline-block', marginBottom: 18, padding: '7px 14px', background: isQuiet ? 'rgba(7,27,42,0.82)' : '#ffd33d', color: isQuiet ? '#fff' : '#071b2a', fontSize: 14, fontWeight: 900, letterSpacing: '0.18em'}}>SING ALONG · ON THE BEAT</div>
          <div style={{fontSize: isQuiet ? 58 : isImpact ? 132 : phrase.text.length > 18 ? 67 : 90, lineHeight: 1.08, fontWeight: isQuiet ? 760 : 1000, letterSpacing: '-0.045em', WebkitTextStroke: isImpact ? '2px #071b2a' : undefined}}>{phrase.text}</div>
          {phrase.emphasisWord && phrase.rhythmType !== 'three-hit' ? <div style={{marginTop: 15, fontSize: 25, color: '#ffd33d', fontWeight: 900, letterSpacing: '0.12em'}}>{phrase.emphasisWord}</div> : null}
        </div>
      )}
    </div>
  );
}

function Intro({seconds, groomProfile, brideProfile, coupleNames}: {seconds: number; groomProfile: StartWeddingIntroProfile; brideProfile: StartWeddingIntroProfile; coupleNames: StartWeddingCoupleNames}) {
  const {pulse, beatIndex} = useBeat(seconds);
  const phaseStart = seconds < 1.6 ? 0 : seconds < 4.5 ? 1.6 : seconds < 7.4 ? 4.5 : seconds < 9.4 ? 7.4 : 9.4;
  const enter = spring({frame: Math.max(0, (seconds - phaseStart) * 30), fps: 30, config: {damping: 10, stiffness: 230, mass: .55}});
  const profile = seconds < 4.5 ? groomProfile : brideProfile;
  if (seconds < 1.6) {
    return <AbsoluteFill style={{background: '#ffd33d', color: '#071b2a', fontFamily: font, overflow: 'hidden'}}><div style={{position: 'absolute', left: -40, top: -25, fontSize: 310, lineHeight: .75, fontWeight: 1000, color: '#ff6b5f', transform: `translateX(${(1 - enter) * -600}px)`}}>START!</div><div style={{position: 'absolute', right: 80, bottom: 150, textAlign: 'right', transform: `translateX(${(1 - enter) * 600}px)`}}><div style={{fontSize: 26, fontWeight: 1000, letterSpacing: '.24em'}}>WELCOME TO OUR WEDDING</div><div style={{fontSize: 105, lineHeight: .9, fontWeight: 1000}}>{coupleNames.display}</div></div></AbsoluteFill>;
  }
  if (seconds < 7.4) {
    const imageOnLeft = profile.role === 'GROOM';
    return <AbsoluteFill style={{background: profile.color, color: '#071b2a', fontFamily: font, overflow: 'hidden'}}><div style={{position: 'absolute', left: imageOnLeft ? 40 : 1080, top: 55, width: 800, height: 970, overflow: 'hidden', border: '12px solid #fff', boxShadow: `${imageOnLeft ? 28 : -28}px 28px 0 #071b2a`, transform: `translateX(${(1 - enter) * (imageOnLeft ? -850 : 850)}px) rotate(${imageOnLeft ? -2 : 2}deg)`}}><Img src={imagePath(profile.asset as (typeof assets)[number])} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: imageOnLeft ? '65% 50%' : '35% 50%', transform: `scale(${1.08 + pulse * .025})`}} /></div><div style={{position: 'absolute', left: imageOnLeft ? 920 : 85, right: imageOnLeft ? 70 : 970, top: 150, transform: `translateX(${(1 - enter) * (imageOnLeft ? 800 : -800)}px)`}}><div style={{display: 'inline-block', padding: '7px 16px', background: '#071b2a', color: '#fff', fontSize: 24, fontWeight: 1000, letterSpacing: '.22em'}}>{profile.role} PROFILE</div><div style={{marginTop: 24, fontSize: 142, lineHeight: .82, fontWeight: 1000, color: '#fff', textShadow: '10px 10px 0 #071b2a'}}>{profile.name}</div><div style={{marginTop: 24, fontSize: 41, fontWeight: 1000}}>{profile.jp}</div><div style={{marginTop: 40, display: 'grid', gap: 15}}>{profile.facts.map((fact, index) => <div key={fact} style={{padding: '11px 16px', background: index === 2 ? '#ffd33d' : 'rgba(255,255,255,.86)', fontSize: index === 2 ? 25 : 20, fontWeight: 900, transform: `translateX(${(1 - enter) * (index + 1) * 90}px) rotate(${index % 2 ? 1 : -1}deg)`}}>{String(index + 1).padStart(2, '0')} / {fact}</div>)}</div></div></AbsoluteFill>;
  }
  if (seconds < 9.4) {
    const [firstName, secondName] = coupleNames.display.split(' & ');
    return <AbsoluteFill style={{background: '#071b2a', fontFamily: font, overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, top: 0, width: '52%', height: '100%', overflow: 'hidden', clipPath: 'polygon(0 0,100% 0,88% 100%,0 100%)', transform: `translateX(${(1 - enter) * -1000}px)`}}><Img src={imagePath(groomProfile.asset as (typeof assets)[number])} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div><div style={{position: 'absolute', right: 0, top: 0, width: '52%', height: '100%', overflow: 'hidden', clipPath: 'polygon(12% 0,100% 0,100% 100%,0 100%)', transform: `translateX(${(1 - enter) * 1000}px)`}}><Img src={imagePath(brideProfile.asset as (typeof assets)[number])} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div><div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', textAlign: 'center', transform: `scale(${.55 + enter * .45 + pulse * .025})`}}><div><div style={{display: 'inline-block', padding: '5px 18px', background: '#ffd33d', color: '#071b2a', fontSize: 23, fontWeight: 1000, letterSpacing: '.2em'}}>WE ARE GETTING MARRIED</div><div style={{fontSize: 150, lineHeight: .85, fontWeight: 1000, textShadow: '10px 10px 0 #ff6b5f'}}>{firstName ?? coupleNames.display}<br />{secondName ? `& ${secondName}` : ''}</div></div></div></AbsoluteFill>;
  }
  const count = Math.max(1, 3 - Math.floor((seconds - 9.4) / ((12.5 - 9.4) / 3)));
  return (
    <AbsoluteFill style={{background: ['#ff6b5f', '#52d9ff', '#ffd33d'][count - 1], color: '#071b2a', fontFamily: font, display: 'grid', placeItems: 'center', textAlign: 'center', overflow: 'hidden'}}><div style={{position: 'absolute', fontSize: 900, lineHeight: 1, fontWeight: 1000, color: 'rgba(255,255,255,.22)', transform: `scale(${1 + pulse * .08})`}}>{count}</div><div style={{position: 'relative', transform: `scale(${.4 + enter * .6 + pulse * .07}) rotate(${(beatIndex % 2 ? 1 : -1) * pulse * 4}deg)`}}><div style={{fontSize: 27, letterSpacing: '.28em', fontWeight: 1000}}>ARE YOU READY?</div><div style={{fontSize: 390, lineHeight: .78, fontWeight: 1000, color: '#fff', textShadow: '18px 18px 0 #071b2a'}}>{count}</div></div></AbsoluteFill>
  );
}

function BeatGraphics({seconds, intensity = 1}: {seconds: number; intensity?: number}) {
  const {pulse, beatIndex} = useBeat(seconds, intensity);
  const downbeat = beatIndex % 4 === 0;
  return <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}><div style={{position: 'absolute', inset: 0, border: `${downbeat ? 10 + pulse * 16 : 0}px solid ${['#ffd33d', '#52d9ff', '#ff6b5f'][Math.floor(beatIndex / 4) % 3]}`, opacity: downbeat ? .8 : 0}} />{[0, 1, 2, 3].map((index) => <div key={index} style={{position: 'absolute', left: 85 + index * 560, top: 100 + (index % 2) * 720, color: index % 2 ? '#ffd33d' : '#fff', fontFamily: font, fontSize: 42, lineHeight: 1, fontWeight: 1000, opacity: .34 + pulse * .35, transform: `rotate(${seconds * (index % 2 ? 90 : -90)}deg) scale(${1 + pulse * .35})`}}>＋</div>)}</AbsoluteFill>;
}

function Interlude({seconds, coupleNames}: {seconds: number; coupleNames: StartWeddingCoupleNames}) {
  const section = sectionAt(seconds);
  const {pulse, beatIndex} = useBeat(seconds);
  if (section.id === 'interlude-montage') {
    return <><ChorusPanels seconds={seconds} sectionIndex={9} /><div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: font, textAlign: 'center'}}><div style={{transform: `scale(${1 + pulse * 0.05})`}}><div style={{fontSize: 18, letterSpacing: '0.25em', color: '#ffd33d', fontWeight: 900}}>OUR FAVORITE PEOPLE</div><div style={{fontSize: 88, fontWeight: 1000}}>みんながいるから今日がある</div></div></div><Confetti seconds={seconds} /></>;
  }
  if (section.id === 'interlude-route') {
    const routeProgress = interpolate(seconds, [124, 132], [0, 1], clamp);
    const dot = cubicBezierPointAtArcProgress(routePoints, routeProgress, routeLut);
    return <><PhotoBackdrop seconds={seconds} sectionIndex={10} /><svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}><path d={routePathD(routePoints)} pathLength={1} fill="none" stroke="#ffd33d" strokeWidth="11" strokeDasharray={1} strokeDashoffset={1 - routeProgress} /><circle cx={dot.x} cy={dot.y} r={25 + pulse * 10} fill="#fff" stroke="#ff6b5f" strokeWidth="9" /></svg><div style={{position: 'absolute', left: 90, bottom: 90, color: '#fff', fontFamily: font}}><div style={{fontSize: 20, color: '#ffd33d', letterSpacing: '0.2em', fontWeight: 900}}>OUR STORY CONTINUES</div><div style={{fontSize: 82, fontWeight: 1000}}>次の景色も、一緒に。</div></div></>;
  }
  const content = section.id === 'interlude-welcome' ? ['PLEASE GET READY', 'まもなく入場です', '拍手の準備はできていますか？'] : section.id === 'interlude-names' ? ['TODAY’S HEROES', coupleNames.display, coupleNames.dateLabel] : ['LET THE PARTY BEGIN', 'さあ、最高の一日を。', 'THANK YOU FOR COMING'];
  return <><PhotoBackdrop seconds={seconds} sectionIndex={section.id === 'interlude-welcome' ? 11 : 12} /><div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: font, textAlign: 'center'}}><div style={{transform: `scale(${1 + pulse * 0.035}) rotate(${Math.sin(beatIndex) * 0.4}deg)`}}><div style={{fontSize: 20, color: '#ffd33d', letterSpacing: '0.28em', fontWeight: 900}}>{content[0]}</div><div style={{fontSize: content[1].length > 15 ? 82 : 118, lineHeight: 1, fontWeight: 1000}}>{content[1]}</div><div style={{marginTop: 22, fontSize: 27, fontWeight: 800}}>{content[2]}</div></div></div><Confetti seconds={seconds} /></>;
}

function FrameChrome({seconds}: {seconds: number}) {
  const section = sectionAt(seconds);
  const progress = seconds / startWeddingEditRange.sourceEndSec;
  return (
    <>
      <div style={{position: 'absolute', left: 42, top: 34, display: 'flex', gap: 13, alignItems: 'center', color: '#fff', fontFamily: font, fontSize: 13, fontWeight: 900, letterSpacing: '0.16em'}}><span style={{width: 34, height: 4, background: '#ffd33d'}} />START SYNC · PRIVATE SCREENING</div>
      <div style={{position: 'absolute', right: 40, top: 30, padding: '7px 11px', border: '2px solid #ff6b5f', color: '#ff9b94', fontFamily: font, fontSize: 11, fontWeight: 900, letterSpacing: '0.12em'}}>MUSIC / LYRICS RIGHTS NOT CLEARED</div>
      <div style={{position: 'absolute', left: 42, right: 42, bottom: 28, display: 'flex', alignItems: 'center', gap: 15}}><div style={{color: '#fff', fontFamily: 'monospace', fontSize: 12, width: 146}}>{section.id.toUpperCase()}</div><div style={{flex: 1, height: 6, background: 'rgba(255,255,255,0.22)'}}><div style={{width: `${progress * 100}%`, height: '100%', background: '#ffd33d'}} /></div><div style={{color: '#fff', fontFamily: 'monospace', fontSize: 12}}>{seconds.toFixed(1)} / 145.6</div></div>
    </>
  );
}

export function JapaneseFriendsOpeningStartSync({audioPath = null, lyricPhrases = [], groomProfile = defaultGroomProfile, brideProfile = defaultBrideProfile, coupleNames = defaultCoupleNames}: JapaneseFriendsOpeningStartSyncProps) {
  const frame = useCurrentFrame();
  const seconds = frame / 30;
  const section = sectionAt(seconds);
  const sectionIndex = sections.findIndex((item) => item.id === section.id);
  const isChorus = section.id === 'chorus-1' || section.id === 'chorus-2';
  const isInterlude = section.id.startsWith('interlude-');
  const activePhrase = lyricPhrases.find((item) => seconds >= item.startSec && seconds < item.endSec);
  const isQuietMoment = activePhrase?.rhythmType === 'quiet' || activePhrase?.selectedAnimation === 'whisper-reveal';
  const intensity = isQuietMoment ? 0.4 : 1;
  const fadeOut = interpolate(seconds, [startWeddingEditRange.fadeOutStartSec, startWeddingEditRange.sourceEndSec], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#061827', opacity: fadeOut}}>
      {section.id === 'intro' ? <Intro seconds={seconds} groomProfile={groomProfile} brideProfile={brideProfile} coupleNames={coupleNames} /> : isInterlude ? <Interlude seconds={seconds} coupleNames={coupleNames} /> : <>{isChorus ? <ChorusPanels seconds={seconds} sectionIndex={sectionIndex} /> : <PhotoBackdrop seconds={seconds} sectionIndex={sectionIndex} intensity={intensity} />}{isChorus ? <Confetti seconds={seconds} /> : null}<LyricTypography seconds={seconds} lyricPhrases={lyricPhrases} /></>}
      <BeatGraphics seconds={seconds} intensity={intensity} />
      <HitFlash seconds={seconds} hits={activePhrase?.threeHitFrameSecs} />
      <FrameChrome seconds={seconds} />
      {audioPath ? <Audio src={staticFile(audioPath)} endAt={startWeddingEditDurationInFrames} volume={interpolate(seconds, [0, 0.7, startWeddingEditRange.fadeOutStartSec, startWeddingEditRange.sourceEndSec], [0, 1, 1, 0], clamp)} /> : null}
    </AbsoluteFill>
  );
}
