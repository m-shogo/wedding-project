import {AbsoluteFill, Easing, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {profileV1Chapters} from '../../data/profileV1ProductionPlan';
import {profileV1RuntimeMedia} from '../../data/profileV1RuntimeMedia.generated';

const chapterDurationSec = 6;
const videoExtensions = new Set(['.mp4', '.mov', '.m4v', '.webm']);

const chapterPalette = [
  ['#07131f', '#173a5e'],
  ['#12192a', '#33425f'],
  ['#111b28', '#274c5e'],
  ['#171523', '#5b3553'],
  ['#0f1922', '#35546a'],
] as const;

const MediaSurface = ({slot}: {slot: (typeof profileV1RuntimeMedia.slots)[number]}) => {
  if (!slot.resolved || !slot.staticFilePath || !slot.extension) {
    return (
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(4,12,22,0.78)',
          border: '2px dashed rgba(255,255,255,0.28)',
        }}
      >
        <div style={{fontSize: 28, fontWeight: 800}}>{slot.label}</div>
        <div style={{marginTop: 12, fontSize: 16, letterSpacing: '0.12em', opacity: 0.56}}>REAL MEDIA MISSING</div>
        <div style={{marginTop: 10, fontSize: 14, opacity: 0.42}}>{slot.canonicalStem}</div>
      </AbsoluteFill>
    );
  }

  const src = staticFile(slot.staticFilePath);
  if (videoExtensions.has(slot.extension)) {
    return <OffthreadVideo src={src} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />;
  }

  return <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />;
};

/**
 * Profile V1のreal-media review input。
 * generated runtime manifestだけを参照し、unrelated mediaへのfallbackは行わない。
 * crop/focus/color/emotional-fit/content/audio/Mac ActualのHuman verdictはこのcomposition自身では宣言しない。
 */
export const ProfileV1RealMediaPreview = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;

  return (
    <AbsoluteFill
      style={{
        background: '#07131f',
        color: '#fff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      {profileV1Chapters.map((chapter, chapterIndex) => {
        const chapterStartSec = chapterIndex * chapterDurationSec;
        const chapterEndSec = chapterStartSec + chapterDurationSec;
        const chapterStart = chapterStartSec * fps;
        const chapterEnd = chapterEndSec * fps;
        const chapterEnter = interpolate(frame, [chapterStart, chapterStart + 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        const chapterLeave = interpolate(frame, [chapterEnd - 10, chapterEnd], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        });
        const active = seconds >= chapterStartSec && seconds < chapterEndSec;
        const chapterOpacity = active ? Math.min(chapterEnter, chapterLeave) : 0;
        const slots = profileV1RuntimeMedia.slots.filter((slot) => slot.chapterId === chapter.id);
        const slotDuration = chapterDurationSec / Math.max(1, slots.length);
        const palette = chapterPalette[chapterIndex];

        return (
          <AbsoluteFill
            key={chapter.id}
            style={{
              opacity: chapterOpacity,
              background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 58%, ${palette[0]} 100%)`,
            }}
          >
            {slots.map((slot, slotIndex) => {
              const slotStartSec = chapterStartSec + slotIndex * slotDuration;
              const slotEndSec = slotStartSec + slotDuration;
              const slotStart = slotStartSec * fps;
              const slotEnd = slotEndSec * fps;
              const slotEnter = interpolate(frame, [slotStart, slotStart + 7], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              const slotLeave = interpolate(frame, [slotEnd - 7, slotEnd], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.in(Easing.cubic),
              });
              const slotActive = seconds >= slotStartSec && seconds < slotEndSec;
              const slotOpacity = slotActive ? Math.min(slotEnter, slotLeave) : 0;

              return (
                <AbsoluteFill key={slot.id} style={{opacity: slotOpacity}}>
                  <MediaSurface slot={slot} />
                  <AbsoluteFill
                    style={{
                      background: 'linear-gradient(90deg, rgba(3,10,18,0.78) 0%, rgba(3,10,18,0.22) 48%, rgba(3,10,18,0.02) 100%)',
                    }}
                  />
                  <div style={{position: 'absolute', left: 72, top: 64, maxWidth: 700}}>
                    <div style={{fontSize: 15, letterSpacing: '0.2em', opacity: 0.62}}>
                      PROFILE MOVIE V1 / REAL-MEDIA PREVIEW INPUT
                    </div>
                    <div style={{marginTop: 20, fontSize: 19, letterSpacing: '0.16em', opacity: 0.7}}>
                      CHAPTER {chapterIndex + 1} / 5 · {chapter.title}
                    </div>
                    <div style={{marginTop: 12, fontSize: 54, fontWeight: 800}}>{slot.label}</div>
                    <div style={{marginTop: 14, fontSize: 17, lineHeight: 1.6, opacity: 0.72}}>{chapter.role}</div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: 54,
                      top: 54,
                      border: '1px solid rgba(255,255,255,0.32)',
                      background: 'rgba(4,12,22,0.52)',
                      padding: '11px 15px',
                      fontSize: 14,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {slot.resolved ? 'RUNTIME MEDIA RESOLVED' : 'RUNTIME MEDIA MISSING'}
                  </div>
                  <div style={{position: 'absolute', left: 72, bottom: 72, fontSize: 14, lineHeight: 1.65, opacity: 0.62}}>
                    crop/focus/color/emotional-fit/content QA: NOT_RUN<br />
                    BGM rights/audio QA: separate gate · Mac DaVinci Actual: NOT_RUN
                  </div>
                </AbsoluteFill>
              );
            })}
          </AbsoluteFill>
        );
      })}

      <div style={{position: 'absolute', left: 72, right: 72, bottom: 38, height: 3, background: 'rgba(255,255,255,0.14)'}}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(1, frame / Math.max(1, durationInFrames - 1)) * 100}%`,
            background: 'rgba(255,255,255,0.78)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
