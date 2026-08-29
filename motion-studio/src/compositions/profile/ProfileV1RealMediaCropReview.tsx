import {loadFont} from '@remotion/google-fonts/NotoSansJP';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {profileV1RuntimeMedia} from '../../data/profileV1RuntimeMedia.generated';

const {fontFamily: profileJapaneseFontFamily} = loadFont('normal', {
  weights: ['400', '700', '800'],
  ignoreTooManyRequestsWarning: true,
});

const videoExtensions = new Set(['.mp4', '.mov', '.m4v', '.webm']);
const secondsPerSlot = 2;

type RuntimeSlot = (typeof profileV1RuntimeMedia.slots)[number];

type Fit = 'cover' | 'contain';

const MissingSurface = ({slot}: {slot: RuntimeSlot}) => (
  <AbsoluteFill
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      background: '#101923',
      border: '2px dashed rgba(255,255,255,0.26)',
      color: '#fff',
      textAlign: 'center',
    }}
  >
    <div style={{fontSize: 24, fontWeight: 800}}>{slot.label}</div>
    <div style={{marginTop: 10, fontSize: 14, letterSpacing: '0.12em', opacity: 0.58}}>REAL MEDIA MISSING</div>
    <div style={{marginTop: 8, fontSize: 13, opacity: 0.42}}>{slot.canonicalStem}</div>
  </AbsoluteFill>
);

const MediaSurface = ({slot, fit}: {slot: RuntimeSlot; fit: Fit}) => {
  if (!slot.resolved || !slot.staticFilePath || !slot.extension) {
    return <MissingSurface slot={slot} />;
  }

  const src = staticFile(slot.staticFilePath);
  const style = {
    width: '100%',
    height: '100%',
    objectFit: fit,
    objectPosition: '50% 50%',
    background: '#09111a',
  } as const;

  if (videoExtensions.has(slot.extension)) {
    return <OffthreadVideo src={src} muted style={style} />;
  }

  return <Img src={src} style={style} />;
};

const ComparisonPane = ({slot, fit}: {slot: RuntimeSlot; fit: Fit}) => (
  <div
    style={{
      position: 'relative',
      flex: 1,
      height: '100%',
      overflow: 'hidden',
      background: '#09111a',
      border: '1px solid rgba(255,255,255,0.14)',
    }}
  >
    <MediaSurface slot={slot} fit={fit} />
    <div
      style={{
        position: 'absolute',
        top: 18,
        left: 18,
        padding: '9px 12px',
        background: 'rgba(4,10,16,0.76)',
        border: '1px solid rgba(255,255,255,0.26)',
        color: '#fff',
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: '0.12em',
      }}
    >
      {fit.toUpperCase()}
    </div>
    <div
      style={{
        position: 'absolute',
        inset: '8%',
        border: '1px dashed rgba(255,255,255,0.38)',
        pointerEvents: 'none',
      }}
    />
  </div>
);

/**
 * Human crop/focus decision surface for Profile V1 real media.
 *
 * Every canonical slot is shown as COVER vs CONTAIN with an 8% safe-area guide.
 * This composition is review input only: it never promotes crop/focus QA,
 * BGM rights, Mac/Studio Actual, DaVinci Actual, or productionReady.
 */
export const ProfileV1RealMediaCropReview = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slotFrames = secondsPerSlot * fps;
  const slotIndex = Math.min(profileV1RuntimeMedia.slots.length - 1, Math.floor(frame / slotFrames));
  const slot = profileV1RuntimeMedia.slots[slotIndex];

  return (
    <AbsoluteFill
      style={{
        background: '#050b12',
        color: '#fff',
        fontFamily: `${profileJapaneseFontFamily}, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif`,
        padding: 44,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 28}}>
        <div>
          <div style={{fontSize: 14, letterSpacing: '0.18em', opacity: 0.58}}>PROFILE MOVIE V1 / HUMAN CROP REVIEW INPUT</div>
          <div style={{marginTop: 10, fontSize: 36, fontWeight: 800}}>{slot.label}</div>
          <div style={{marginTop: 7, fontSize: 14, opacity: 0.58}}>{slot.id} · chapter {slot.chapterId}</div>
        </div>
        <div style={{textAlign: 'right', fontSize: 14, lineHeight: 1.65, opacity: 0.66}}>
          SLOT {slotIndex + 1} / {profileV1RuntimeMedia.slots.length}<br />
          crop/focus QA: NOT_RUN · Mac/Studio/DaVinci Actual: NOT_RUN
        </div>
      </div>

      <div style={{display: 'flex', gap: 22, flex: 1, minHeight: 0, marginTop: 28}}>
        <ComparisonPane slot={slot} fit="cover" />
        <ComparisonPane slot={slot} fit="contain" />
      </div>

      <div style={{marginTop: 18, fontSize: 13, lineHeight: 1.55, opacity: 0.58}}>
        Compare subject loss, faces, hands, captions, and edge detail. The dashed rectangle is an 8% review-safe guide, not an automatic approval boundary.
      </div>
    </AbsoluteFill>
  );
};
