import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  japaneseFriendsOpeningStory,
  type JapaneseOpeningScene,
} from '../../data/japaneseFriendsOpeningStory';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const font = '"Avenir Next", "Noto Sans JP", sans-serif';

const imagePath = (asset: JapaneseOpeningScene['asset']) =>
  staticFile(`demo-assets/japanese-opening-ai-v1/${asset}.jpg`);

function Photo({scene}: {scene: JapaneseOpeningScene}) {
  const frame = useCurrentFrame();
  const durationInFrames = scene.durationSeconds * 30;
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], clamp);
  const direction = japaneseFriendsOpeningStory.findIndex((item) => item.id === scene.id) % 2 === 0 ? 1 : -1;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#071b2a'}}>
      <Img
        src={imagePath(scene.asset)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translateX(${direction * interpolate(progress, [0, 1], [-24, 24])}px) scale(${interpolate(progress, [0, 1], [1.04, 1.14])})`,
        }}
      />
    </AbsoluteFill>
  );
}

function Confetti({accent}: {accent: string}) {
  const frame = useCurrentFrame();
  const colors = [accent, '#52d9ff', '#ffd33d', '#ff7eae', '#ffffff'];
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {Array.from({length: 34}, (_, index) => {
        const x = (index * 137) % 1940 - 10;
        const fall = (frame * (5 + (index % 5)) + index * 47) % 1240 - 120;
        return <div key={index} style={{position: 'absolute', left: x, top: fall, width: 8 + (index % 3) * 5, height: 18, borderRadius: 4, background: colors[index % colors.length], transform: `rotate(${frame * 4 + index * 31}deg)`, opacity: 0.85}} />;
      })}
    </AbsoluteFill>
  );
}

function CornerChrome({scene, index}: {scene: JapaneseOpeningScene; index: number}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 24], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <>
      <div style={{position: 'absolute', left: 50, top: 38, display: 'flex', alignItems: 'center', gap: 14, fontFamily: font, color: '#fff', fontSize: 14, letterSpacing: '0.17em', fontWeight: 800}}>
        <div style={{width: 40 * progress, height: 4, background: scene.accent}} />
        DUMMY WEDDING OPENING
      </div>
      <div style={{position: 'absolute', right: 48, top: 34, padding: '8px 12px', border: `2px solid ${scene.accent}`, color: scene.accent, fontFamily: font, fontSize: 12, fontWeight: 900, letterSpacing: '0.13em'}}>FICTIONAL CAST / DEMO</div>
      <div style={{position: 'absolute', right: 48, bottom: 36, color: 'rgba(255,255,255,0.72)', fontFamily: font, fontSize: 15, fontWeight: 800}}>{String(index + 1).padStart(2, '0')} / {japaneseFriendsOpeningStory.length}</div>
    </>
  );
}

function KineticTitle({scene, large = false}: {scene: JapaneseOpeningScene; large?: boolean}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 6, fps, config: {damping: 13, stiffness: 145, mass: 0.75}});
  const underline = interpolate(frame, [18, 42], [0, large ? 520 : 260], clamp);
  const titleSize = large ? (scene.title.length > 12 ? 78 : 118) : 82;
  return (
    <div style={{position: 'absolute', left: 82, bottom: 92, maxWidth: 1450, fontFamily: font, color: '#fff', textShadow: '0 4px 28px rgba(0,0,0,0.62)'}}>
      <div style={{display: 'inline-flex', padding: '8px 15px', marginBottom: 15, background: scene.accent, color: '#071b2a', fontSize: 18, letterSpacing: '0.16em', fontWeight: 900, transform: `translateX(${(1 - enter) * -80}px) rotate(-1deg)`, opacity: enter}}>{scene.kicker}</div>
      <div style={{fontSize: titleSize, lineHeight: 0.98, letterSpacing: '-0.045em', fontWeight: 1000, transform: `translateY(${(1 - enter) * 90}px) scale(${0.82 + enter * 0.18})`, opacity: enter}}>{scene.title}</div>
      <div style={{width: underline, height: 8, marginTop: 19, background: scene.accent}} />
      <div style={{fontSize: 24, marginTop: 18, fontWeight: 700, letterSpacing: '0.045em', opacity: interpolate(frame, [24, 42], [0, 1], clamp)}}>{scene.sub}</div>
    </div>
  );
}

function SplitCards({scene}: {scene: JapaneseOpeningScene}) {
  const frame = useCurrentFrame();
  const assets: JapaneseOpeningScene['asset'][] = scene.id === 'groom'
    ? ['groom-friends', 'couple-arrival', 'friends-picnic']
    : ['bride-friends', 'couple-arrival', 'friends-picnic'];
  return (
    <AbsoluteFill style={{display: 'flex', gap: 14, padding: '90px 42px 120px', background: '#071b2a'}}>
      {assets.map((asset, index) => {
        const enter = spring({frame: frame - index * 7, fps: 30, config: {damping: 15, stiffness: 170}});
        return <div key={asset} style={{flex: index === 1 ? 1.15 : 0.92, overflow: 'hidden', borderRadius: 6, border: `7px solid ${index === 1 ? scene.accent : '#fff'}`, transform: `translateY(${(1 - enter) * (index % 2 ? -130 : 130)}px) rotate(${(index - 1) * 2.5}deg)`, boxShadow: '0 24px 55px rgba(0,0,0,0.35)'}}><Img src={imagePath(asset)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>;
      })}
    </AbsoluteFill>
  );
}

function VerticalSocialCards({scene}: {scene: JapaneseOpeningScene}) {
  const frame = useCurrentFrame();
  const cards = [scene.asset, scene.id === 'groom-team' ? 'friends-picnic' : 'couple-arrival', scene.asset] as JapaneseOpeningScene['asset'][];
  return (
    <AbsoluteFill style={{background: '#f7f1e8', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, overflow: 'hidden'}}>
      {cards.map((asset, index) => <div key={`${asset}-${index}`} style={{width: 430, height: 770, padding: 14, background: '#fff', boxShadow: '0 22px 50px rgba(0,0,0,0.25)', transform: `translateY(${Math.sin((frame + index * 18) / 18) * 22}px) rotate(${(index - 1) * 4}deg)`}}><Img src={imagePath(asset)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>)}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,19,31,0.05), rgba(5,19,31,0.78))'}} />
    </AbsoluteFill>
  );
}

function RequestWords({scene}: {scene: JapaneseOpeningScene}) {
  const frame = useCurrentFrame();
  const beat = interpolate(frame % 18, [0, 4, 18], [1, 1.08, 1], clamp);
  return (
    <>
      <Photo scene={scene} />
      <AbsoluteFill style={{background: 'rgba(4,20,32,0.42)'}} />
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: font, color: '#fff', textAlign: 'center'}}>
        <div style={{transform: `scale(${beat}) rotate(-2deg)`}}>
          <div style={{fontSize: 25, letterSpacing: '0.22em', fontWeight: 900, color: scene.accent}}>{scene.kicker}</div>
          <div style={{fontSize: 142, lineHeight: 1, fontWeight: 1000, letterSpacing: '-0.07em', WebkitTextStroke: '2px rgba(4,20,32,0.24)'}}>{scene.title}</div>
          <div style={{display: 'inline-block', marginTop: 18, padding: '10px 22px', background: '#fff', color: '#071b2a', fontSize: 24, fontWeight: 900}}>{scene.sub}</div>
        </div>
      </div>
      <Confetti accent={scene.accent} />
    </>
  );
}

function CountdownScene({scene}: {scene: JapaneseOpeningScene}) {
  const frame = useCurrentFrame();
  const number = Math.max(1, 5 - Math.floor(frame / 30));
  const scale = interpolate(frame % 30, [0, 5, 29], [0.55, 1.18, 0.95], clamp);
  return (
    <>
      <Photo scene={scene} />
      <AbsoluteFill style={{background: 'rgba(3,17,29,0.48)'}} />
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: font, textAlign: 'center'}}>
        <div>
          <div style={{fontSize: 22, letterSpacing: '0.3em', fontWeight: 900, color: scene.accent}}>{scene.kicker}</div>
          <div style={{fontSize: 330, lineHeight: 0.86, fontWeight: 1000, transform: `scale(${scale})`, textShadow: `12px 12px 0 ${scene.accent}`}}>{number}</div>
          <div style={{fontSize: 54, fontWeight: 1000}}>{scene.title}</div>
        </div>
      </div>
    </>
  );
}

function EntranceScene({scene, final}: {scene: JapaneseOpeningScene; final: boolean}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = spring({frame: frame % fps, fps, config: {damping: 9, stiffness: 180}});
  const countdown = Math.max(1, 5 - Math.floor(frame / 30));
  return (
    <>
      <Photo scene={scene} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(4,18,30,0.8), rgba(4,18,30,0.12), rgba(4,18,30,0.7))'}} />
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: font, color: '#fff', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.94 + pulse * 0.06})`}}>
          <div style={{fontSize: 20, letterSpacing: '0.28em', color: scene.accent, fontWeight: 900}}>{scene.kicker}</div>
          <div style={{fontSize: final ? 260 : 90, lineHeight: 1, fontWeight: 1000, textShadow: '0 8px 30px rgba(0,0,0,0.6)'}}>{final ? countdown : scene.title}</div>
          <div style={{marginTop: 16, fontSize: 30, fontWeight: 800}}>{scene.sub}</div>
        </div>
      </div>
      <Confetti accent={scene.accent} />
    </>
  );
}

function SceneView({scene, index}: {scene: JapaneseOpeningScene; index: number}) {
  const frame = useCurrentFrame();
  const durationInFrames = scene.durationSeconds * 30;
  const exit = interpolate(frame, [durationInFrames - 9, durationInFrames - 1], [1, 0], clamp);
  let content: React.ReactNode;
  if (scene.kind === 'countdown') content = <CountdownScene scene={scene} />;
  else if (scene.kind === 'profile') content = <><SplitCards scene={scene} /><KineticTitle scene={scene} /></>;
  else if (scene.kind === 'friends') content = <><VerticalSocialCards scene={scene} /><KineticTitle scene={scene} /></>;
  else if (scene.kind === 'request') content = <RequestWords scene={scene} />;
  else if (scene.kind === 'entrance' || scene.kind === 'final') content = <EntranceScene scene={scene} final={scene.kind === 'final'} />;
  else content = <><Photo scene={scene} /><AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(3,17,29,0.05), rgba(3,17,29,0.82))'}} /><KineticTitle scene={scene} large={scene.kind === 'title' || scene.kind === 'message'} />{scene.kind === 'collage' && <Confetti accent={scene.accent} />}</>;
  return <AbsoluteFill style={{opacity: exit, overflow: 'hidden'}}>{content}<CornerChrome scene={scene} index={index} /></AbsoluteFill>;
}

export function JapaneseFriendsOpening() {
  const frame = useCurrentFrame();
  const totalFrames = japaneseFriendsOpeningStory.reduce((sum, scene) => sum + scene.durationSeconds * 30, 0);
  let cursor = 0;
  return (
    <AbsoluteFill style={{background: '#071b2a'}}>
      {japaneseFriendsOpeningStory.map((scene, index) => {
        const from = cursor;
        const duration = scene.durationSeconds * 30;
        cursor += duration;
        return <Sequence key={scene.id} from={from} durationInFrames={duration}><SceneView scene={scene} index={index} /></Sequence>;
      })}
      <Audio src={staticFile('demo-assets/bgm-candidates/pixabay-simple-upbeat-158080.mp3')} volume={interpolate(frame, [0, 24, totalFrames - 90, totalFrames - 1], [0, 0.86, 0.86, 0], clamp)} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 7, background: 'rgba(255,255,255,0.18)'}}><div style={{height: '100%', width: `${interpolate(frame, [0, totalFrames - 1], [0, 100], clamp)}%`, background: '#ffd33d'}} /></div>
    </AbsoluteFill>
  );
}
