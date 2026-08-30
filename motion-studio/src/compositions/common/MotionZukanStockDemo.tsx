import {AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  motionZukanDummyStory,
  type DummySceneMotion,
  type DummySceneTransition,
  type DummyStoryScene,
} from '../../data/motionZukanDummyStory';

export type MotionZukanDemoGenre = 'CINEMATIC' | 'ACOUSTIC' | 'UPBEAT' | 'AMBIENT';

export const motionZukanStockDemoDurationFrames = 600;

const photos = [
  'pexels-17630524-1280x720.jpg',
  'pexels-18858568-1280x720.jpg',
  'pexels-27687897-1280x720.jpg',
  'pexels-27954353-1280x720.jpg',
  'pexels-30219174-1280x720.jpg',
  'pexels-33029121-1280x720.jpg',
  'pexels-33741754-1280x720.jpg',
  'pexels-35511825-1280x720.jpg',
  'pexels-36708862-1280x720.jpg',
  'pexels-36807071-1280x720.jpg',
  'pexels-4180047-1280x720.jpg',
] as const;

export const motionZukanDemoSettings = {
  CINEMATIC: {
    title: 'A STORY BEGINS',
    subtitle: 'CINEMATIC / GRAND',
    accent: '#d8aa58',
    audio: 'pixabay-cinematic-wedding-223110.mp3',
  },
  ACOUSTIC: {
    title: 'TOGETHER, ALWAYS',
    subtitle: 'ACOUSTIC / WARM',
    accent: '#d9a982',
    audio: 'pixabay-acoustic-wedding-guitar-359697.mp3',
  },
  UPBEAT: {
    title: 'OUR BEST DAY',
    subtitle: 'UPBEAT / BRIGHT',
    accent: '#f3c84b',
    audio: 'pixabay-simple-upbeat-158080.mp3',
  },
  AMBIENT: {
    title: 'A QUIET PROMISE',
    subtitle: 'AMBIENT / CALM',
    accent: '#9dc7c2',
    audio: 'pixabay-ambient-piano-347950.mp3',
  },
} as const;

function DemoShot({src, index, genre, durationFrames = 60}: {src: string; index: number; genre: MotionZukanDemoGenre; durationFrames?: number}) {
  const frame = useCurrentFrame();
  const fadeFrames = Math.min(12, Math.max(4, Math.round(durationFrames * 0.1)));
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const opacity = interpolate(frame, [0, fadeFrames, durationFrames - fadeFrames, durationFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const direction = index % 4;
  const genreScale = genre === 'UPBEAT' ? 1.075 : genre === 'AMBIENT' ? 1.035 : 1.055;
  const x = direction === 0 ? interpolate(progress, [0, 1], [-18, 18]) : direction === 1 ? interpolate(progress, [0, 1], [18, -18]) : 0;
  const y = direction === 2 ? interpolate(progress, [0, 1], [-12, 12]) : direction === 3 ? interpolate(progress, [0, 1], [12, -12]) : 0;
  const scale = interpolate(progress, [0, 1], [1.015, genreScale]);
  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(4,12,22,0.08) 45%, rgba(4,12,22,0.72) 100%)'}} />
    </AbsoluteFill>
  );
}

export const motionZukanDummyProductionDurationFrames = 1800;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

function cameraTransform(frame: number, durationFrames: number, motion: DummySceneMotion) {
  const progress = interpolate(frame, [0, durationFrames], [0, 1], clamp);
  if (motion === 'pull') return `scale(${interpolate(progress, [0, 1], [1.12, 1.01])})`;
  if (motion === 'pan-left') return `translateX(${interpolate(progress, [0, 1], [38, -38])}px) scale(1.1)`;
  if (motion === 'pan-right') return `translateX(${interpolate(progress, [0, 1], [-38, 38])}px) scale(1.1)`;
  if (motion === 'tilt') return `rotate(${interpolate(progress, [0, 1], [-1.6, 1.2])}deg) scale(1.09)`;
  return `scale(${interpolate(progress, [0, 1], [1.01, 1.12])})`;
}

function StoryPhoto({photoIndex, motion, style}: {photoIndex: number; motion: DummySceneMotion; style?: React.CSSProperties}) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <Img
      src={staticFile(`demo-assets/stock-photos/${photos[photoIndex]}`)}
      style={{width: '100%', height: '100%', objectFit: 'cover', transform: cameraTransform(frame, durationInFrames, motion), ...style}}
    />
  );
}

function SceneLayout({scene}: {scene: DummyStoryScene}) {
  const frame = useCurrentFrame();
  const reveal = spring({frame, fps: 30, config: {damping: 16, stiffness: 115, mass: 0.8}});
  const next = (scene.photoIndex + 1) % photos.length;
  const next2 = (scene.photoIndex + 2) % photos.length;
  const frameStyle: React.CSSProperties = {overflow: 'hidden', border: '1px solid rgba(255,255,255,0.46)', boxShadow: '0 24px 70px rgba(0,0,0,0.42)'};

  if (scene.layout === 'split') {
    return (
      <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: 12, padding: 42, transform: `scale(${0.95 + reveal * 0.05})`}}>
        <div style={frameStyle}><StoryPhoto photoIndex={scene.photoIndex} motion={scene.motion} /></div>
        <div style={{display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12}}>
          <div style={frameStyle}><StoryPhoto photoIndex={next} motion="pull" /></div>
          <div style={{...frameStyle, position: 'relative'}}>
            <StoryPhoto photoIndex={next2} motion="pan-left" />
            <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, transparent 30%, ${scene.accent}55)`}} />
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  if (scene.layout === 'contact-sheet') {
    const offsets = [scene.photoIndex, next, next2];
    return (
      <AbsoluteFill style={{background: '#e9dfcf', padding: '68px 58px 78px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24}}>
        {offsets.map((photoIndex, index) => {
          const cardIn = spring({frame: frame - index * 5, fps: 30, config: {damping: 14, stiffness: 140}});
          return (
            <div key={photoIndex} style={{...frameStyle, padding: 12, background: '#f8f3e9', transform: `translateY(${(1 - cardIn) * 90}px) rotate(${(index - 1) * 2.2}deg)`}}>
              <div style={{height: '88%', overflow: 'hidden'}}><StoryPhoto photoIndex={photoIndex} motion={index === 1 ? scene.motion : 'pull'} /></div>
              <div style={{color: '#19283a', fontSize: 16, marginTop: 13, letterSpacing: '0.12em'}}>FRAME {String(index + 1).padStart(2, '0')}</div>
            </div>
          );
        })}
      </AbsoluteFill>
    );
  }

  if (scene.layout === 'postcard') {
    return (
      <AbsoluteFill style={{background: '#17263a', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: '78%', height: '76%', background: '#f6f0e4', padding: 18, transform: `translateY(${(1 - reveal) * 110}px) rotate(${interpolate(reveal, [0, 1], [-8, -1.8])}deg)`, boxShadow: '0 35px 100px rgba(0,0,0,0.5)'}}>
          <div style={{height: '100%', overflow: 'hidden'}}><StoryPhoto photoIndex={scene.photoIndex} motion={scene.motion} /></div>
          <div style={{position: 'absolute', right: 30, bottom: 22, width: 112, height: 112, borderRadius: '50%', border: `5px double ${scene.accent}`, color: scene.accent, display: 'grid', placeItems: 'center', transform: `rotate(12deg) scale(${reveal})`, fontSize: 17, fontWeight: 900, textAlign: 'center', letterSpacing: '0.08em'}}>MEMORY<br />STAMP</div>
        </div>
      </AbsoluteFill>
    );
  }

  if (scene.layout === 'filmstrip') {
    return (
      <AbsoluteFill style={{background: '#070b10', justifyContent: 'center', overflow: 'hidden'}}>
        <div style={{display: 'flex', gap: 18, width: '118%', marginLeft: '-9%', transform: `translateX(${interpolate(frame, [0, 160], [80, -80], clamp)}px) rotate(-2deg)`}}>
          {[next2, scene.photoIndex, next, scene.photoIndex].map((photoIndex, index) => (
            <div key={`${photoIndex}-${index}`} style={{width: 520, height: 720, flex: '0 0 auto', padding: '28px 14px', background: '#101820', borderTop: '12px dashed #d8c9ad', borderBottom: '12px dashed #d8c9ad'}}>
              <div style={{height: '100%', overflow: 'hidden'}}><StoryPhoto photoIndex={photoIndex} motion={index % 2 ? scene.motion : 'pull'} /></div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  }

  if (scene.layout === 'diagonal') {
    return (
      <AbsoluteFill style={{background: scene.accent}}>
        <div style={{position: 'absolute', inset: 0, clipPath: `polygon(0 0, ${58 + reveal * 12}% 0, ${42 + reveal * 12}% 100%, 0 100%)`, overflow: 'hidden'}}><StoryPhoto photoIndex={scene.photoIndex} motion={scene.motion} /></div>
        <div style={{position: 'absolute', right: 0, top: 0, width: '48%', height: '100%', overflow: 'hidden', clipPath: 'polygon(30% 0,100% 0,100% 100%,0 100%)', filter: 'saturate(0.7) contrast(1.1)'}}><StoryPhoto photoIndex={next} motion="pan-left" /></div>
      </AbsoluteFill>
    );
  }

  if (scene.layout === 'grid') {
    return (
      <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gridTemplateRows: '1fr 1fr', gap: 10, padding: 32, background: '#091624'}}>
        <div style={{...frameStyle, gridRow: '1 / 3'}}><StoryPhoto photoIndex={scene.photoIndex} motion={scene.motion} /></div>
        <div style={frameStyle}><StoryPhoto photoIndex={next} motion="pull" /></div>
        <div style={frameStyle}><StoryPhoto photoIndex={next2} motion="pan-left" /></div>
      </AbsoluteFill>
    );
  }

  return <AbsoluteFill style={{overflow: 'hidden'}}><StoryPhoto photoIndex={scene.photoIndex} motion={scene.motion} /></AbsoluteFill>;
}

function SceneTransition({kind, accent}: {kind: DummySceneTransition; accent: string}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, kind === 'hard' ? 1 : 15], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  if (kind === 'hard') return null;
  if (kind === 'flash') return <AbsoluteFill style={{background: '#fff7e6', opacity: interpolate(frame, [0, 2, 7], [0.92, 0.72, 0], clamp)}} />;
  if (kind === 'shape') return <AbsoluteFill style={{background: accent, transform: `translateX(${interpolate(progress, [0, 1], [0, 110])}%) skewX(-8deg)`, transformOrigin: 'bottom left'}} />;
  if (kind === 'paper') return <AbsoluteFill style={{background: '#f3eadb', clipPath: `polygon(0 0, ${interpolate(progress, [0, 1], [100, 0])}% 0, ${interpolate(progress, [0, 1], [88, 0])}% 100%, 0 100%)`}} />;
  if (kind === 'shutter') {
    return <AbsoluteFill>{[0, 1, 2, 3, 4, 5].map((index) => <div key={index} style={{position: 'absolute', left: 0, right: 0, top: `${index * 16.667}%`, height: '16.8%', background: '#05080d', transform: `translateX(${interpolate(progress, [0, 1], [0, index % 2 ? 105 : -105])}%)`}} />)}</AbsoluteFill>;
  }
  const routeProgress = interpolate(frame, [0, 22], [0, 1], clamp);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity: interpolate(frame, [0, 22, 34], [1, 1, 0], clamp)}}>
      <svg viewBox="0 0 1920 1080" style={{width: '100%', height: '100%'}}>
        <path d="M -80 760 C 420 250, 1100 930, 2010 320" fill="none" stroke="rgba(4,14,25,0.55)" strokeWidth="16" />
        <path d="M -80 760 C 420 250, 1100 930, 2010 320" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - routeProgress} />
      </svg>
      <div style={{position: 'absolute', left: `${interpolate(routeProgress, [0, 1], [-2, 101])}%`, top: `${interpolate(routeProgress, [0, 0.5, 1], [70, 58, 27])}%`, width: 26, height: 26, borderRadius: '50%', background: accent, boxShadow: `0 0 30px ${accent}`}} />
    </AbsoluteFill>
  );
}

function SceneTypography({scene, index}: {scene: DummyStoryScene; index: number}) {
  const frame = useCurrentFrame();
  const titleIn = spring({frame: frame - 12, fps: 30, config: {damping: 14, stiffness: 125}});
  const lineWidth = interpolate(frame, [18, 48], [0, 180], clamp);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 92px 88px', textShadow: '0 4px 24px rgba(0,0,0,0.72)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, opacity: interpolate(frame, [4, 16], [0, 1], clamp)}}>
        <div style={{width: lineWidth, height: 4, background: scene.accent}} />
        <div style={{fontSize: 17, letterSpacing: '0.26em', color: scene.accent, fontWeight: 800}}>{scene.eyebrow}</div>
      </div>
      <div style={{fontSize: 78, lineHeight: 0.95, fontWeight: 900, letterSpacing: `${interpolate(titleIn, [0, 1], [0.2, 0.045])}em`, transform: `translateY(${(1 - titleIn) * 70}px)`, opacity: titleIn}}>{scene.title}</div>
      <div style={{marginTop: 20, fontSize: 21, letterSpacing: '0.08em', opacity: interpolate(frame, [30, 48], [0, 0.9], clamp)}}>{scene.note}</div>
      <div style={{position: 'absolute', right: 72, bottom: 78, fontSize: 76, fontWeight: 200, color: 'rgba(255,255,255,0.32)'}}>{String(index + 1).padStart(2, '0')}</div>
    </AbsoluteFill>
  );
}

function DummyStorySceneView({scene, index, durationFrames}: {scene: DummyStoryScene; index: number; durationFrames: number}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [durationFrames - 12, durationFrames - 1], [1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <SceneLayout scene={scene} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(3,10,18,0.08) 32%, rgba(3,10,18,0.82) 100%)'}} />
      <SceneTypography scene={scene} index={index} />
      <SceneTransition kind={scene.transition} accent={scene.accent} />
    </AbsoluteFill>
  );
}

function GlobalEditorialOverlay() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{boxShadow: 'inset 0 0 150px rgba(0,0,0,0.52)', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 4px)'}} />
      <div style={{position: 'absolute', left: 34, top: 30, fontSize: 13, letterSpacing: '0.2em', fontWeight: 700}}>MEMORY FLIGHT · OPENING FILM</div>
      <div style={{position: 'absolute', left: 34, right: 34, bottom: 28, height: 2, background: 'rgba(255,255,255,0.2)'}}>
        <div style={{height: '100%', width: `${interpolate(frame, [0, 1799], [0, 100], clamp)}%`, background: '#f4c95d'}} />
      </div>
    </AbsoluteFill>
  );
}

export function MotionZukanDummyProduction() {
  const frame = useCurrentFrame();
  const setting = motionZukanDemoSettings.ACOUSTIC;
  const shotFrames = 150;
  const endOpacity = interpolate(frame, [1650, 1690, 1799], [0, 1, 1], clamp);
  const endTitle = spring({frame: frame - 1670, fps: 30, config: {damping: 13, stiffness: 105}});
  return (
    <AbsoluteFill style={{backgroundColor: '#07131f', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif'}}>
      <Audio src={staticFile(`demo-assets/bgm-candidates/${setting.audio}`)} volume={(audioFrame) => interpolate(audioFrame, [0, 36, 1710, 1799], [0, 0.72, 0.72, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
      {motionZukanDummyStory.map((scene, index) => (
        <Sequence key={`${scene.photoIndex}-${scene.title}`} from={index * shotFrames} durationInFrames={shotFrames + 12} premountFor={24}>
          <DummyStorySceneView scene={scene} index={index} durationFrames={shotFrames + 12} />
        </Sequence>
      ))}
      <GlobalEditorialOverlay />
      <div style={{position: 'absolute', right: 24, top: 20, padding: '8px 12px', background: 'rgba(8,18,34,0.78)', border: '1px solid rgba(255,205,96,0.72)', color: '#ffd56a', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em'}}>
        DUMMY PRODUCTION SIMULATION
      </div>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: endOpacity, background: 'radial-gradient(circle at center, rgba(24,57,82,0.92), rgba(4,13,23,0.98) 68%)', textAlign: 'center'}}>
        <div style={{fontSize: 15, letterSpacing: '0.4em', color: setting.accent, opacity: endTitle}}>THE NEXT CHAPTER</div>
        <div style={{marginTop: 18, fontSize: 76, fontWeight: 900, letterSpacing: `${interpolate(endTitle, [0, 1], [0.25, 0.07])}em`, transform: `scale(${0.82 + endTitle * 0.18})`}}>STARTS HERE</div>
        <div style={{marginTop: 24, width: interpolate(endTitle, [0, 1], [0, 300]), height: 3, background: setting.accent}} />
        <div style={{marginTop: 26, fontSize: 19, letterSpacing: '0.18em', opacity: interpolate(frame, [1710, 1740], [0, 0.86], clamp)}}>YOKOHAMA · 2026.10.24</div>
        <div style={{marginTop: 42, fontSize: 12, letterSpacing: '0.2em', opacity: 0.58}}>DEMO STOCK MEDIA · REPLACE WITH YOUR 11 PHOTOS</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export function MotionZukanStockDemo({genre}: {genre: MotionZukanDemoGenre}) {
  const frame = useCurrentFrame();
  const setting = motionZukanDemoSettings[genre];
  const introOpacity = interpolate(frame, [0, 12, 72, 90], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const endOpacity = interpolate(frame, [520, 548, 590], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#07131f', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif'}}>
      <Audio
        src={staticFile(`demo-assets/bgm-candidates/${setting.audio}`)}
        volume={(audioFrame) => interpolate(audioFrame, [0, 24, 555, 599], [0, 0.72, 0.72, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
      {photos.map((photo, index) => (
        <Sequence key={photo} from={index * 54} durationInFrames={60} premountFor={15}>
          <DemoShot src={staticFile(`demo-assets/stock-photos/${photo}`)} index={index} genre={genre} />
        </Sequence>
      ))}

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: introOpacity, textAlign: 'center'}}>
        <div style={{fontSize: 15, letterSpacing: '0.35em', color: setting.accent}}>{setting.subtitle}</div>
        <div style={{marginTop: 14, fontSize: 54, fontWeight: 600, letterSpacing: '0.12em', textShadow: '0 3px 24px rgba(0,0,0,0.55)'}}>{setting.title}</div>
        <div style={{marginTop: 18, width: 84, height: 2, backgroundColor: setting.accent}} />
      </AbsoluteFill>

      <div style={{position: 'absolute', left: 28, top: 24, padding: '7px 10px', background: 'rgba(5,18,31,0.74)', borderLeft: `3px solid ${setting.accent}`, fontSize: 11, letterSpacing: '0.14em'}}>
        MOTION ZUKAN · {genre}
      </div>
      <div style={{position: 'absolute', right: 24, bottom: 20, padding: '6px 9px', background: 'rgba(5,18,31,0.78)', color: '#f0d08d', fontSize: 10, letterSpacing: '0.1em'}}>
        STOCK DEMO / NOT USER MEDIA / BGM CANDIDATE
      </div>

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: endOpacity, backgroundColor: 'rgba(5,18,31,0.72)', textAlign: 'center'}}>
        <div style={{fontSize: 13, letterSpacing: '0.34em', color: setting.accent}}>DEMO COMPLETE</div>
        <div style={{marginTop: 12, fontSize: 34, letterSpacing: '0.1em'}}>REPLACE WITH YOUR PHOTOS</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
