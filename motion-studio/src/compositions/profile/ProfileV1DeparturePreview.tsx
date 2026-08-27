import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const panels = [
  {label: 'AIRPORT', sub: '空港 / 出発ロビー', fromSec: 0, toSec: 3.3},
  {label: 'RUNWAY', sub: '滑走路 / 離陸', fromSec: 3.3, toSec: 6.6},
  {label: 'WINDOW', sub: '飛行機窓 / 雲', fromSec: 6.6, toSec: 10},
] as const;

const cardStyle = {
  width: 620,
  height: 350,
  border: '2px solid rgba(255,255,255,0.34)',
  background: 'linear-gradient(145deg, rgba(26,54,82,0.92), rgba(8,20,34,0.96))',
  boxShadow: '0 34px 90px rgba(0,0,0,0.35)',
} as const;

/**
 * Chapter 1「出発」の10秒構造試作。
 * 01_profile-movie/chapter-plan.md の「最初に作る試作: 10秒」を正本にする。
 * 実写真/BGMの存在や権利を捏造しないため、このcompositionは意図的にneutral placeholderのみ。
 */
export const ProfileV1DeparturePreview = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #07131f 0%, #102a43 52%, #07131f 100%)',
        color: '#fff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 86, top: 64, fontSize: 18, letterSpacing: '0.24em', opacity: 0.6}}>
        PROFILE MOVIE V1 / STRUCTURE PREVIEW ONLY
      </div>

      {panels.map((panel, index) => {
        const start = panel.fromSec * fps;
        const end = panel.toSec * fps;
        const enter = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        const leave = interpolate(frame, [Math.max(start + 11, end - 8), end], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        });
        const active = seconds >= panel.fromSec && seconds < panel.toSec;
        const opacity = active ? Math.min(enter, leave) : 0;
        const x = (1 - enter) * 90 - (1 - leave) * 60;
        const scale = 0.96 + enter * 0.04;

        return (
          <div
            key={panel.label}
            style={{
              ...cardStyle,
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -310,
              marginTop: -175,
              opacity,
              transform: `translateX(${x}px) scale(${scale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{fontSize: 22, letterSpacing: '0.18em', opacity: 0.64}}>REAL MEDIA SLOT {index + 1}/3</div>
            <div style={{marginTop: 14, fontSize: 78, fontWeight: 800, letterSpacing: '0.06em'}}>{panel.label}</div>
            <div style={{marginTop: 12, fontSize: 28, opacity: 0.76}}>{panel.sub}</div>
            <div style={{marginTop: 34, fontSize: 17, letterSpacing: '0.08em', opacity: 0.46}}>PLACEHOLDER — REAL MEDIA NOT CLAIMED</div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 86,
          right: 86,
          bottom: 74,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{fontSize: 20, letterSpacing: '0.2em', opacity: 0.58}}>CHAPTER 1 / 出発</div>
          <div style={{marginTop: 8, fontSize: 34, fontWeight: 700}}>旅のはじまりへ</div>
        </div>
        <div style={{textAlign: 'right', fontSize: 16, lineHeight: 1.5, opacity: 0.52}}>
          BGM RIGHTS: NOT CLAIMED HERE<br />
          HUMAN PREVIEW QA: NOT_RUN
        </div>
      </div>

      <div style={{position: 'absolute', left: 86, right: 86, bottom: 40, height: 3, background: 'rgba(255,255,255,0.12)'}}>
        <div style={{height: '100%', width: `${Math.min(1, seconds / 10) * 100}%`, background: 'rgba(255,255,255,0.72)'}} />
      </div>
    </AbsoluteFill>
  );
};
