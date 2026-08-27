import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import type {ProfileV1ChapterId} from '../../data/profileV1ProductionPlan';
import {TransitionWipeEngine} from '../../motion-kit/engines';
import {DoorLight} from '../opening/DoorLight';

export const profileV1GeneratedAccentImplementations = [
  {
    slotId: 'departure-boarding-title',
    chapterId: 'departure',
    implementation: 'PROFILE_BOARDING_TITLE_CARD',
    canonicalReuse: 'COMPOSITION_SPECIFIC_GRAPHIC',
  },
  {
    slotId: 'intersection-route',
    chapterId: 'intersection',
    implementation: 'MOTION_ZUKAN_ROUTE_LINE',
    canonicalReuse: 'TransitionWipeEngine/route-line',
  },
  {
    slotId: 'arrival-door-light',
    chapterId: 'arrival',
    implementation: 'OPENING_DOOR_LIGHT_REUSE',
    canonicalReuse: 'DoorLight',
  },
] as const;

const BoardingTitleAccent = ({title, chapterIndex, duration}: {title: string; chapterIndex: number; duration: number}) => {
  const frame = useCurrentFrame();
  const visibleUntil = Math.min(duration - 1, 48);
  const enter = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(frame, [Math.max(13, visibleUntil - 10), visibleUntil], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const opacity = Math.min(enter, exit);

  return (
    <div
      style={{
        position: 'absolute',
        top: 58,
        right: 64,
        width: 360,
        padding: '18px 24px',
        border: '1px solid rgba(255,255,255,0.72)',
        borderRadius: 5,
        background: 'rgba(7,19,31,0.58)',
        backdropFilter: 'blur(8px)',
        boxSizing: 'border-box',
        opacity,
        transform: `translateY(${(1 - enter) * -20}px) rotate(-1.5deg)`,
      }}
    >
      <div style={{fontSize: 12, letterSpacing: '0.22em', opacity: 0.66}}>CHAPTER {chapterIndex + 1} / 5</div>
      <div style={{marginTop: 7, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20}}>
        <div style={{fontSize: 30, fontWeight: 800, letterSpacing: '0.04em'}}>{title}</div>
        <div style={{fontSize: 11, letterSpacing: '0.14em', opacity: 0.52}}>BOARDING</div>
      </div>
      <div style={{marginTop: 13, borderTop: '1px dashed rgba(255,255,255,0.42)'}} />
    </div>
  );
};

export function ProfileV1GeneratedAccents({
  chapterId,
  chapterTitle,
  chapterIndex,
  duration,
}: {
  chapterId: ProfileV1ChapterId;
  chapterTitle: string;
  chapterIndex: number;
  duration: number;
}) {
  if (chapterId === 'departure') {
    return <BoardingTitleAccent title={chapterTitle} chapterIndex={chapterIndex} duration={duration} />;
  }

  if (chapterId === 'intersection') {
    return (
      <AbsoluteFill style={{pointerEvents: 'none', opacity: 0.72}}>
        <TransitionWipeEngine variant="route-line" direction="right" intensity="S" transparent />
      </AbsoluteFill>
    );
  }

  if (chapterId === 'arrival') {
    const accentDuration = Math.min(48, duration);
    return (
      <Sequence from={Math.max(0, duration - accentDuration)} durationInFrames={accentDuration} layout="none">
        <AbsoluteFill style={{pointerEvents: 'none'}}>
          <DoorLight
            lightColor="#f4dfaa"
            openStartFrame={0}
            maxOpenWidth={430}
            glowStrength={0.58}
            particleCount={22}
            durationInFramesOverride={accentDuration}
          />
        </AbsoluteFill>
      </Sequence>
    );
  }

  return null;
}
