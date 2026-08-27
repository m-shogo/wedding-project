import {loadFont} from '@remotion/google-fonts/NotoSansJP';
import {AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {profileV1Chapters} from '../../data/profileV1ProductionPlan';
import {profileV1RuntimeMedia} from '../../data/profileV1RuntimeMedia.generated';
import {ProfileV1GeneratedAccents} from './ProfileV1GeneratedAccents';

const {fontFamily} = loadFont('normal', {weights: ['400', '700', '800'], ignoreTooManyRequestsWarning: true});
const chapterDurationSec = 6;
const videoExtensions = new Set(['.mp4', '.mov', '.m4v', '.webm']);

const Media = ({slot, duration}: {slot: (typeof profileV1RuntimeMedia.slots)[number]; duration: number}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, Math.max(1, duration - 1)], [1.02, 1.075], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad),
  });
  if (!slot.resolved || !slot.staticFilePath || !slot.extension) {
    return <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: '#07131f'}}><div>PROFILE MEDIA REQUIRED / {slot.canonicalStem}</div></AbsoluteFill>;
  }
  const src = staticFile(slot.staticFilePath);
  return <AbsoluteFill style={{transform: `scale(${scale})`}}>{videoExtensions.has(slot.extension)
    ? <OffthreadVideo src={src} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    : <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}</AbsoluteFill>;
};

const Slot = ({slot, title, chapterIndex, duration}: {
  slot: (typeof profileV1RuntimeMedia.slots)[number]; title: string; chapterIndex: number; duration: number;
}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 7, Math.max(8, duration - 7), Math.max(9, duration - 1)], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const reveal = interpolate(frame, [4, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{opacity: fade}}>
    <Media slot={slot} duration={duration} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(3,10,18,0.68), rgba(3,10,18,0.12) 48%, transparent)'}} />
    <div style={{position: 'absolute', left: 74, bottom: 76, opacity: reveal, transform: `translateY(${(1 - reveal) * 18}px)`}}>
      <div style={{fontSize: 15, letterSpacing: '0.18em', opacity: 0.7}}>CHAPTER {chapterIndex + 1} / 5</div>
      <div style={{marginTop: 10, fontSize: 42, fontWeight: 800}}>{title}</div>
    </div>
  </AbsoluteFill>;
};

/** Clean 30s Profile V1 production candidate. Human review/rights gates live outside this composition. */
export const ProfileV1 = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#07131f', color: '#fff', fontFamily: `${fontFamily}, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif`, overflow: 'hidden'}}>
    <Audio src={staticFile('audio/profile/bgm-main.mp3')} volume={0.64} />
    {profileV1Chapters.map((chapter, chapterIndex) => {
      const chapterDuration = chapterDurationSec * fps;
      const slots = profileV1RuntimeMedia.slots.filter((slot) => slot.chapterId === chapter.id);
      const unit = Math.floor(chapterDuration / Math.max(1, slots.length));
      return <Sequence key={chapter.id} from={chapterIndex * chapterDuration} durationInFrames={chapterDuration} layout="none">
        <AbsoluteFill>
          {slots.map((slot, index) => {
            const from = index * unit;
            const duration = index === slots.length - 1 ? chapterDuration - from : unit;
            return <Sequence key={slot.id} from={from} durationInFrames={duration} layout="none">
              <Slot slot={slot} title={chapter.title} chapterIndex={chapterIndex} duration={duration} />
            </Sequence>;
          })}
          <ProfileV1GeneratedAccents
            chapterId={chapter.id}
            chapterTitle={chapter.title}
            chapterIndex={chapterIndex}
            duration={chapterDuration}
          />
        </AbsoluteFill>
      </Sequence>;
    })}
  </AbsoluteFill>;
};
