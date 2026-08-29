import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {profileV1Chapters} from '../../data/profileV1ProductionPlan';

const chapterDurationSec = 6;

const chapterPalette = [
  ['#07131f', '#173a5e'],
  ['#12192a', '#33425f'],
  ['#111b28', '#274c5e'],
  ['#171523', '#5b3553'],
  ['#0f1922', '#35546a'],
] as const;

/**
 * Profile V1全5章のneutral structure preview。
 * 実写真・BGM・人間QA・Mac Actualを捏造せず、章順・必要素材役割・編集リズムだけを30秒で確認する。
 */
export const ProfileV1FullStructurePreview = () => {
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
      {profileV1Chapters.map((chapter, index) => {
        const startSec = index * chapterDurationSec;
        const endSec = startSec + chapterDurationSec;
        const start = startSec * fps;
        const end = endSec * fps;
        const enter = interpolate(frame, [start, start + 12], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        const leave = interpolate(frame, [end - 12, end], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        });
        const active = seconds >= startSec && seconds < endSec;
        const opacity = active ? Math.min(enter, leave) : 0;
        const requiredSlots = chapter.mediaSlots.filter((slot) => slot.required);
        const palette = chapterPalette[index];

        return (
          <AbsoluteFill
            key={chapter.id}
            style={{
              opacity,
              background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 58%, ${palette[0]} 100%)`,
            }}
          >
            <div style={{position: 'absolute', left: 82, top: 58, fontSize: 17, letterSpacing: '0.22em', opacity: 0.56}}>
              PROFILE MOVIE V1 / FULL STRUCTURE PREVIEW ONLY
            </div>

            <div
              style={{
                position: 'absolute',
                left: 82,
                top: 145,
                width: 500,
                transform: `translateX(${(1 - enter) * -46}px)`,
              }}
            >
              <div style={{fontSize: 20, letterSpacing: '0.18em', opacity: 0.58}}>CHAPTER {index + 1} / 5</div>
              <div style={{marginTop: 12, fontSize: 68, fontWeight: 800, letterSpacing: '0.03em'}}>{chapter.title}</div>
              <div style={{marginTop: 20, fontSize: 24, lineHeight: 1.6, opacity: 0.76}}>{chapter.role}</div>
              <div style={{marginTop: 34, fontSize: 18, lineHeight: 1.7, opacity: 0.58}}>
                {chapter.editIntent.map((intent) => (
                  <div key={intent}>• {intent}</div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                right: 82,
                top: 138,
                width: 590,
                display: 'grid',
                gridTemplateColumns: requiredSlots.length >= 4 ? '1fr 1fr' : '1fr',
                gap: 14,
                transform: `translateX(${(1 - enter) * 52}px)`,
              }}
            >
              {requiredSlots.map((slot, slotIndex) => (
                <div
                  key={slot.id}
                  style={{
                    minHeight: requiredSlots.length >= 4 ? 142 : 115,
                    border: '1px solid rgba(255,255,255,0.24)',
                    background: 'rgba(4,12,22,0.38)',
                    padding: '20px 22px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{fontSize: 14, letterSpacing: '0.16em', opacity: 0.48}}>REAL MEDIA SLOT {slotIndex + 1}/{requiredSlots.length}</div>
                  <div style={{marginTop: 9, fontSize: 25, fontWeight: 700}}>{slot.label}</div>
                  <div style={{marginTop: 8, fontSize: 14, opacity: 0.5}}>{slot.canonicalStem}</div>
                  <div style={{marginTop: 10, fontSize: 13, letterSpacing: '0.05em', opacity: 0.36}}>PLACEHOLDER — REAL MEDIA NOT CLAIMED</div>
                </div>
              ))}
            </div>

            <div style={{position: 'absolute', left: 82, bottom: 88, fontSize: 16, lineHeight: 1.55, opacity: 0.48}}>
              BGM RIGHTS: NOT CLAIMED HERE<br />
              REAL MEDIA QA: NOT_RUN / MAC DAVINCI ACTUAL: NOT_RUN
            </div>
          </AbsoluteFill>
        );
      })}

      <div style={{position: 'absolute', left: 82, right: 82, bottom: 44, height: 3, background: 'rgba(255,255,255,0.12)'}}>
        <div style={{height: '100%', width: `${Math.min(1, frame / Math.max(1, durationInFrames - 1)) * 100}%`, background: 'rgba(255,255,255,0.72)'}} />
      </div>
    </AbsoluteFill>
  );
};
