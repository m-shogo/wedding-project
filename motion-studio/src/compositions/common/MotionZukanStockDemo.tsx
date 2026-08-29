import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';

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

function DemoShot({src, index, genre}: {src: string; index: number; genre: MotionZukanDemoGenre}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const opacity = interpolate(frame, [0, 7, 53, 60], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
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
