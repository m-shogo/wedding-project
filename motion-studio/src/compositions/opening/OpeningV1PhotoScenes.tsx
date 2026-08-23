import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import type {ReactNode} from 'react';
import {colors, fonts} from '../../data/theme';
import {
  focusToObjectPosition,
  openingV1Presentation,
  type OpeningMemoryLayout,
  type OpeningMemoryPattern,
  type OpeningPhotoFit,
  type OpeningPhotoMotion,
} from '../../data/openingV1Presentation';

const sansFamily = fonts.sans;

const SceneBase = ({children, dark = false}: {children: ReactNode; dark?: boolean}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? colors.navyDeep : colors.ivory,
      color: dark ? colors.ivory : colors.navy,
      overflow: 'hidden',
    }}
  >
    {children}
  </AbsoluteFill>
);

const Placeholder = ({label, dark = false}: {label: string; dark?: boolean}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? colors.navy : colors.cloud,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        fontFamily: sansFamily,
        fontSize: 16,
        letterSpacing: '0.14em',
        color: colors.beigeDark,
      }}
    >
      {label}
    </div>
  </AbsoluteFill>
);

const PhotoSurface = ({
  photo,
  label,
  frame,
  durationFrames,
  motion,
  fit,
  objectPosition,
  placeholderDark = false,
}: {
  photo: string | null;
  label: string;
  frame: number;
  durationFrames: number;
  motion: OpeningPhotoMotion;
  fit: OpeningPhotoFit;
  objectPosition: string;
  placeholderDark?: boolean;
}) => {
  const safeDuration = Math.max(1, durationFrames - 1);
  const scale =
    motion === 'push'
      ? interpolate(frame, [0, safeDuration], [1, 1.024], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;
  const x =
    motion === 'drift-left'
      ? interpolate(frame, [0, safeDuration], [10, -10], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : motion === 'drift-right'
        ? interpolate(frame, [0, safeDuration], [-10, 10], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : 0;

  if (!photo) {
    return <Placeholder label={label} dark={placeholderDark} />;
  }

  return (
    <Img
      src={staticFile(`photos/${photo}`)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: fit,
        objectPosition,
        transform: `translateX(${x}px) scale(${scale})`,
      }}
    />
  );
};

export const PhotoColdOpen = ({
  durationFrames,
  photo,
}: {
  durationFrames: number;
  photo: string | null;
}) => {
  const frame = useCurrentFrame();
  const plan = openingV1Presentation.coldOpen;
  const copyOpacity = interpolate(frame, [2, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBase dark>
      <PhotoSurface
        photo={photo}
        label="HERO 01 · COLD OPEN"
        frame={frame}
        durationFrames={durationFrames}
        motion={plan.motion}
        fit={plan.fit}
        objectPosition={focusToObjectPosition(plan.focus)}
        placeholderDark
      />
      <div
        style={{
          position: 'absolute',
          left: 68,
          bottom: 58,
          opacity: copyOpacity,
          color: colors.ivory,
          textShadow: '0 1px 14px rgba(0,0,0,0.38)',
        }}
      >
        <div
          style={{
            fontFamily: sansFamily,
            fontSize: 42,
            fontWeight: 650,
            letterSpacing: '0.015em',
          }}
        >
          SHOGO + SHIORI
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: sansFamily,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '0.13em',
          }}
        >
          2026.10.24 · YOKOHAMA
        </div>
      </div>
    </SceneBase>
  );
};

const PlaceLabel = ({place, light}: {place: string; light: boolean}) => (
  <div
    style={{
      position: 'absolute',
      left: 72,
      bottom: 58,
      fontFamily: sansFamily,
      fontSize: 19,
      fontWeight: 650,
      letterSpacing: '0.11em',
      color: light ? colors.ivory : colors.navy,
      textShadow: light ? '0 1px 14px rgba(0,0,0,0.36)' : undefined,
    }}
  >
    {place.toUpperCase()}
  </div>
);

const MemoryBeat = ({
  photo,
  label,
  place,
  layout,
  motion,
  focus,
  frame,
  durationFrames,
  showPlace,
}: {
  photo: string | null;
  label: string;
  place: string;
  layout: OpeningMemoryLayout;
  motion: OpeningPhotoMotion;
  focus: {x: number; y: number};
  frame: number;
  durationFrames: number;
  showPlace: boolean;
}) => {
  const objectPosition = focusToObjectPosition(focus);

  if (layout === 'full') {
    return (
      <SceneBase dark>
        <PhotoSurface
          photo={photo}
          label={label}
          frame={frame}
          durationFrames={durationFrames}
          motion={motion}
          fit="cover"
          objectPosition={objectPosition}
          placeholderDark
        />
        {showPlace ? <PlaceLabel place={place} light /> : null}
      </SceneBase>
    );
  }

  if (layout === 'wide') {
    return (
      <SceneBase>
        <div style={{position: 'absolute', inset: '96px 132px', overflow: 'hidden'}}>
          <PhotoSurface
            photo={photo}
            label={label}
            frame={frame}
            durationFrames={durationFrames}
            motion={motion}
            fit="contain"
            objectPosition={objectPosition}
          />
        </div>
        {showPlace ? <PlaceLabel place={place} light={false} /> : null}
      </SceneBase>
    );
  }

  const left = layout === 'left';
  return (
    <SceneBase>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: left ? 0 : '34%',
          width: '66%',
          overflow: 'hidden',
        }}
      >
        <PhotoSurface
          photo={photo}
          label={label}
          frame={frame}
          durationFrames={durationFrames}
          motion={motion}
          fit="cover"
          objectPosition={objectPosition}
        />
      </div>
      {showPlace ? (
        <div
          style={{
            position: 'absolute',
            left: left ? '72%' : 72,
            bottom: 80,
            fontFamily: sansFamily,
            fontSize: 34,
            fontWeight: 650,
            letterSpacing: '0.015em',
            color: colors.navy,
          }}
        >
          {place}
        </div>
      ) : null}
    </SceneBase>
  );
};

export const MemoryChapter = ({
  durationFrames,
  place,
  pattern,
  photos,
}: {
  durationFrames: number;
  place: string;
  pattern: OpeningMemoryPattern;
  photos: readonly [string | null, string | null, string | null];
}) => {
  const frame = useCurrentFrame();
  const firstCut = Math.round(durationFrames * 0.29);
  const secondCut = Math.round(durationFrames * 0.59);
  const starts = [0, firstCut, secondCut];
  const ends = [firstCut, secondCut, durationFrames];
  const beatIndex = frame < firstCut ? 0 : frame < secondCut ? 1 : 2;
  const plan = openingV1Presentation.memories[pattern][beatIndex];

  return (
    <MemoryBeat
      photo={photos[beatIndex]}
      label={`${place.toUpperCase()} ${String(beatIndex + 1).padStart(2, '0')}`}
      place={place}
      layout={plan.layout}
      motion={plan.motion}
      focus={plan.focus}
      frame={frame - starts[beatIndex]}
      durationFrames={ends[beatIndex] - starts[beatIndex]}
      showPlace={beatIndex === 0}
    />
  );
};

export const HeroPhoto = ({
  durationFrames,
  photo,
  label,
  role,
}: {
  durationFrames: number;
  photo: string | null;
  label: string;
  role: 'a' | 'b';
}) => {
  const frame = useCurrentFrame();
  const plan = openingV1Presentation.heroes[role];

  return (
    <SceneBase dark>
      <div style={{position: 'absolute', inset: '54px 76px', overflow: 'hidden'}}>
        <PhotoSurface
          photo={photo}
          label={label}
          frame={frame}
          durationFrames={durationFrames}
          motion={plan.motion}
          fit={plan.fit}
          objectPosition={focusToObjectPosition(plan.focus)}
          placeholderDark
        />
      </div>
    </SceneBase>
  );
};
