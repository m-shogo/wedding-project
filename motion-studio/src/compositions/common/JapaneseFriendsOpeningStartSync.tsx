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
  useVideoConfig,
} from 'remotion';
import {
  type JapaneseFriendsOpeningStartSyncProps,
  type StartWeddingLyricPhrase,
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

function useBeat(seconds: number) {
  const beatPosition = Math.max(0, seconds - beatOriginSeconds) / beatSeconds;
  const beatIndex = Math.floor(beatPosition);
  const phase = beatPosition - beatIndex;
  return {beatIndex, pulse: interpolate(phase, [0, 0.18, 1], [1, 0.2, 0], clamp)};
}

function PhotoBackdrop({seconds, sectionIndex}: {seconds: number; sectionIndex: number}) {
  const {pulse, beatIndex} = useBeat(seconds);
  const asset = assets[(sectionIndex + Math.floor(beatIndex / 8)) % assets.length];
  const direction = sectionIndex % 2 === 0 ? 1 : -1;
  const progress = (seconds - sections[sectionIndex].start) / Math.max(0.01, sections[sectionIndex].end - sections[sectionIndex].start);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#061827'}}>
      <Img
        src={imagePath(asset)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: `saturate(${1.04 + pulse * 0.16}) contrast(1.03)`,
          transform: `translateX(${direction * interpolate(progress, [0, 1], [-34, 34])}px) scale(${1.05 + progress * 0.08 + pulse * 0.012})`,
        }}
      />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(3,14,25,0.12), rgba(3,14,25,0.82))'}} />
    </AbsoluteFill>
  );
}

function ChorusPanels({seconds, sectionIndex}: {seconds: number; sectionIndex: number}) {
  const {pulse, beatIndex} = useBeat(seconds);
  return (
    <AbsoluteFill style={{display: 'flex', gap: 12, padding: '64px 34px 80px', background: '#071b2a', overflow: 'hidden'}}>
      {[0, 1, 2].map((panel) => {
        const asset = assets[(sectionIndex + panel + Math.floor(beatIndex / 16)) % assets.length];
        const lift = Math.sin((seconds * 2.5) + panel * 1.7) * 16;
        return (
          <div key={panel} style={{flex: panel === 1 ? 1.18 : 0.92, overflow: 'hidden', border: `${6 + pulse * 5}px solid ${panel === 1 ? '#ffd33d' : '#fff'}`, transform: `translateY(${lift}px) rotate(${(panel - 1) * 2.4}deg) scale(${1 + pulse * 0.012})`, boxShadow: '0 25px 60px rgba(0,0,0,0.38)'}}>
            <Img src={imagePath(asset)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        );
      })}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(4,17,28,0.02), rgba(4,17,28,0.72))'}} />
    </AbsoluteFill>
  );
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

function LyricTypography({seconds, lyricPhrases}: {seconds: number; lyricPhrases: StartWeddingLyricPhrase[]}) {
  const phrase = lyricPhrases.find((item) => seconds >= item.startSec && seconds < item.endSec);
  if (!phrase) return null;
  const enter = interpolate(seconds, [phrase.startSec, phrase.startSec + 0.24], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.5))});
  const exit = interpolate(seconds, [phrase.exitSec, phrase.endSec], [1, 0], clamp);
  const opacity = Math.min(enter, exit);
  const progress = interpolate(seconds, [phrase.startSec, phrase.holdSec], [0, 1], clamp);
  const chars = Array.from(phrase.text);
  const visibleChars = Math.ceil(chars.length * progress);
  const isQuiet = phrase.selectedAnimation === 'whisper-reveal' || phrase.rhythmType === 'quiet';
  const isImpact = phrase.selectedAnimation === 'impact-word' || phrase.selectedAnimation === 'word-hit';
  const isCall = phrase.selectedAnimation === 'call-and-response-layout';
  const shownText = phrase.selectedAnimation === 'character-build' ? chars.slice(0, visibleChars).join('') : phrase.text;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: isQuiet ? 'end center' : 'center', padding: isQuiet ? '0 80px 108px' : '100px 100px 130px', color: '#fff', fontFamily: font, opacity, textShadow: '0 6px 30px rgba(0,0,0,0.74)'}}>
      {phrase.rhythmType === 'three-hit' ? <ThreeHitLyric phrase={phrase} seconds={seconds} /> : isCall ? (
        <div style={{display: 'grid', gap: 18, textAlign: 'center'}}>
          {phrase.text.split(/[　 ]+/).filter(Boolean).map((part, index) => <span key={`${part}-${index}`} style={{fontSize: index === 1 ? 104 : 56, fontWeight: 1000, color: index % 2 ? '#ffd33d' : '#fff', transform: `translateX(${(1 - enter) * (index % 2 ? 180 : -180)}px) rotate(${index % 2 ? 2 : -2}deg)`}}>{part}</span>)}
        </div>
      ) : (
        <div style={{maxWidth: 1580, textAlign: 'center', transform: `translateY(${(1 - enter) * 75}px) scale(${isImpact ? 0.72 + enter * 0.34 : 0.9 + enter * 0.1}) rotate(${isImpact ? (1 - enter) * -5 : 0}deg)`}}>
          <div style={{display: 'inline-block', marginBottom: 18, padding: '7px 14px', background: isQuiet ? 'rgba(7,27,42,0.82)' : '#ffd33d', color: isQuiet ? '#fff' : '#071b2a', fontSize: 14, fontWeight: 900, letterSpacing: '0.18em'}}>{phrase.sectionId.toUpperCase()} · {phrase.phraseId}</div>
          <div style={{fontSize: isQuiet ? 58 : isImpact ? 126 : phrase.text.length > 18 ? 67 : 90, lineHeight: 1.08, fontWeight: isQuiet ? 760 : 1000, letterSpacing: '-0.045em'}}>{shownText}</div>
          {phrase.emphasisWord && phrase.rhythmType !== 'three-hit' ? <div style={{marginTop: 15, fontSize: 25, color: '#ffd33d', fontWeight: 900, letterSpacing: '0.12em'}}>{phrase.emphasisWord}</div> : null}
        </div>
      )}
    </div>
  );
}

function Intro({seconds}: {seconds: number}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = spring({frame: frame - 18, fps, config: {damping: 12, stiffness: 125}});
  const count = seconds < 8 ? null : Math.max(1, 5 - Math.floor(seconds - 8));
  return (
    <>
      <PhotoBackdrop seconds={seconds} sectionIndex={0} />
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: font, textAlign: 'center'}}>
        {count === null ? <div style={{transform: `translateY(${(1 - title) * 90}px) scale(${0.76 + title * 0.24})`, opacity: title}}><div style={{fontSize: 18, letterSpacing: '0.28em', color: '#ffd33d', fontWeight: 900}}>PRIVATE WEDDING OPENING</div><div style={{fontSize: 142, lineHeight: 0.9, fontWeight: 1000}}>HARUTO <span style={{color: '#ffd33d'}}>&</span> AOI</div><div style={{marginTop: 24, fontSize: 28, fontWeight: 800}}>友達と始める、最高の一日。</div></div> : <div><div style={{fontSize: 22, letterSpacing: '0.26em', color: '#ffd33d', fontWeight: 900}}>ARE YOU READY?</div><div style={{fontSize: 300, lineHeight: 0.9, fontWeight: 1000, textShadow: '11px 11px 0 #ff6b5f'}}>{count}</div></div>}
      </div>
    </>
  );
}

function Interlude({seconds}: {seconds: number}) {
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
  const content = section.id === 'interlude-welcome' ? ['PLEASE GET READY', 'まもなく入場です', '拍手の準備はできていますか？'] : section.id === 'interlude-names' ? ['TODAY’S HEROES', 'HARUTO & AOI', '2026.10.24 · YOKOHAMA'] : ['LET THE PARTY BEGIN', 'さあ、最高の一日を。', 'THANK YOU FOR COMING'];
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

export function JapaneseFriendsOpeningStartSync({audioPath = null, lyricPhrases = []}: JapaneseFriendsOpeningStartSyncProps) {
  const frame = useCurrentFrame();
  const seconds = frame / 30;
  const section = sectionAt(seconds);
  const sectionIndex = sections.findIndex((item) => item.id === section.id);
  const isChorus = section.id === 'chorus-1' || section.id === 'chorus-2';
  const isInterlude = section.id.startsWith('interlude-');
  const fadeOut = interpolate(seconds, [startWeddingEditRange.fadeOutStartSec, startWeddingEditRange.sourceEndSec], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#061827', opacity: fadeOut}}>
      {section.id === 'intro' ? <Intro seconds={seconds} /> : isInterlude ? <Interlude seconds={seconds} /> : <>{isChorus ? <ChorusPanels seconds={seconds} sectionIndex={sectionIndex} /> : <PhotoBackdrop seconds={seconds} sectionIndex={sectionIndex} />}{isChorus ? <Confetti seconds={seconds} /> : null}<LyricTypography seconds={seconds} lyricPhrases={lyricPhrases} /></>}
      <FrameChrome seconds={seconds} />
      {audioPath ? <Audio src={staticFile(audioPath)} endAt={startWeddingEditDurationInFrames} volume={interpolate(seconds, [0, 0.7, startWeddingEditRange.fadeOutStartSec, startWeddingEditRange.sourceEndSec], [0, 1, 1, 0], clamp)} /> : null}
    </AbsoluteFill>
  );
}
