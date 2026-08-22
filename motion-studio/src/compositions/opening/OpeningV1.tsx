import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {openingV1Scenes} from '../../data/openingV1';
import {openingV1PhotoSlots} from '../../data/openingV1Media';
import {CloudSea} from './CloudSea';

const sansFamily = fonts.sans;

type PhotoMotion = 'static' | 'push' | 'drift-left' | 'drift-right';
type PhotoFit = 'cover' | 'contain';
type MemoryLayout = 'full' | 'left' | 'right' | 'wide';
type MemoryPattern = 'okinawa' | 'seoul' | 'hawaii';

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
        fontSize: 18,
        letterSpacing: '0.18em',
        color: dark ? colors.goldLight : colors.beigeDark,
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
  motion = 'static',
  fit = 'cover',
  objectPosition = '50% 50%',
}: {
  photo: string | null;
  label: string;
  frame: number;
  durationFrames: number;
  motion?: PhotoMotion;
  fit?: PhotoFit;
  objectPosition?: string;
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
    return <Placeholder label={label} />;
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

const DepartureTitle = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationFrames - 10), durationFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <SceneBase dark>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: Math.min(fadeIn, fadeOut),
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 104,
            letterSpacing: '0.035em',
            fontWeight: 500,
          }}
        >
          SHOGO & SHIORI
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: sansFamily,
            fontSize: 22,
            letterSpacing: '0.16em',
            color: colors.beigeDark,
          }}
        >
          24 OCT 2026 · YOKOHAMA
        </div>
      </AbsoluteFill>
    </SceneBase>
  );
};

const CloudTransition = () => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    <CloudSea timeOfDay="morning" speed={0.62} cloudOpacity={0.78} zoomTo={1.025} softness={14} />
  </AbsoluteFill>
);

const memoryPlans: Record<
  MemoryPattern,
  Array<{layout: MemoryLayout; motion: PhotoMotion; objectPosition?: string}>
> = {
  okinawa: [
    {layout: 'full', motion: 'static'},
    {layout: 'left', motion: 'drift-left'},
    {layout: 'wide', motion: 'static'},
  ],
  seoul: [
    {layout: 'right', motion: 'static'},
    {layout: 'full', motion: 'drift-right'},
    {layout: 'left', motion: 'static'},
  ],
  hawaii: [
    {layout: 'full', motion: 'static'},
    {layout: 'wide', motion: 'push'},
    {layout: 'right', motion: 'static'},
  ],
};

const PlaceLabel = ({place, light}: {place: string; light: boolean}) => (
  <div
    style={{
      position: 'absolute',
      left: 72,
      bottom: 58,
      fontFamily: sansFamily,
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '0.14em',
      color: light ? colors.ivory : colors.navy,
      textShadow: light ? '0 1px 16px rgba(0,0,0,0.32)' : undefined,
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
  frame,
  durationFrames,
  showPlace,
  objectPosition,
}: {
  photo: string | null;
  label: string;
  place: string;
  layout: MemoryLayout;
  motion: PhotoMotion;
  frame: number;
  durationFrames: number;
  showPlace: boolean;
  objectPosition?: string;
}) => {
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
            fontFamily: serifFamily,
            fontSize: 48,
            letterSpacing: '0.02em',
            color: colors.navy,
          }}
        >
          {place}
        </div>
      ) : null}
    </SceneBase>
  );
};

const MemoryChapter = ({
  durationFrames,
  place,
  pattern,
  photos,
}: {
  durationFrames: number;
  place: string;
  pattern: MemoryPattern;
  photos: readonly [string | null, string | null, string | null];
}) => {
  const frame = useCurrentFrame();
  const firstCut = Math.round(durationFrames * 0.29);
  const secondCut = Math.round(durationFrames * 0.59);
  const starts = [0, firstCut, secondCut];
  const ends = [firstCut, secondCut, durationFrames];
  const beatIndex = frame < firstCut ? 0 : frame < secondCut ? 1 : 2;
  const beatFrame = frame - starts[beatIndex];
  const beatDuration = ends[beatIndex] - starts[beatIndex];
  const plan = memoryPlans[pattern][beatIndex];

  return (
    <MemoryBeat
      photo={photos[beatIndex]}
      label={`${place.toUpperCase()} ${String(beatIndex + 1).padStart(2, '0')}`}
      place={place}
      layout={plan.layout}
      motion={plan.motion}
      frame={beatFrame}
      durationFrames={beatDuration}
      showPlace={beatIndex === 0}
      objectPosition={plan.objectPosition}
    />
  );
};

const HeroPhoto = ({
  durationFrames,
  photo,
  label,
  index,
}: {
  durationFrames: number;
  photo: string | null;
  label: string;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const motion: PhotoMotion = index === 0 ? 'push' : 'static';

  return (
    <SceneBase dark>
      <div style={{position: 'absolute', inset: '54px 76px', overflow: 'hidden'}}>
        <PhotoSurface
          photo={photo}
          label={label}
          frame={frame}
          durationFrames={durationFrames}
          motion={motion}
          fit="contain"
        />
      </div>
    </SceneBase>
  );
};

const ArrivalRoute = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [4, Math.max(5, durationFrames - 6)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBase>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: 1180, position: 'relative', height: 150}}>
          <div
            style={{
              position: 'absolute',
              top: 74,
              left: 70,
              width: 1040,
              height: 1,
              backgroundColor: colors.beigeDark,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 72,
              left: 70,
              width: 1040 * progress,
              height: 4,
              backgroundColor: colors.roseGold,
            }}
          />
          <div style={{position: 'absolute', left: 0, top: 17, fontFamily: sansFamily, fontSize: 24, letterSpacing: '0.12em'}}>
            HAWAII
          </div>
          <div style={{position: 'absolute', right: 0, top: 17, fontFamily: sansFamily, fontSize: 24, letterSpacing: '0.12em'}}>
            YOKOHAMA
          </div>
        </div>
      </AbsoluteFill>
    </SceneBase>
  );
};

const EndingTitle = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 14, Math.max(15, durationFrames - 18), durationFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <SceneBase dark>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity}}>
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 96,
            letterSpacing: '0.035em',
          }}
        >
          SHOGO & SHIORI
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: sansFamily,
            fontSize: 21,
            letterSpacing: '0.16em',
            color: colors.goldLight,
          }}
        >
          24 OCT 2026 · YOKOHAMA
        </div>
      </AbsoluteFill>
    </SceneBase>
  );
};

export const OpeningV1 = () => {
  const {fps} = useVideoConfig();
  const sceneFrames = openingV1Scenes.map((scene) => Math.round(scene.durationSec * fps));
  const starts = sceneFrames.map((_, index) =>
    sceneFrames.slice(0, index).reduce((sum, value) => sum + value, 0),
  );

  const renderScene = (sceneId: string, durationFrames: number): ReactNode => {
    switch (sceneId) {
      case 'v1-departure-title':
        return <DepartureTitle durationFrames={durationFrames} />;
      case 'v1-cloud-transition':
        return <CloudTransition />;
      case 'v1-photos-okinawa':
        return (
          <MemoryChapter
            durationFrames={durationFrames}
            place="Okinawa"
            pattern="okinawa"
            photos={openingV1PhotoSlots.okinawa}
          />
        );
      case 'v1-photos-seoul':
        return (
          <MemoryChapter
            durationFrames={durationFrames}
            place="Seoul"
            pattern="seoul"
            photos={openingV1PhotoSlots.seoul}
          />
        );
      case 'v1-photos-hawaii':
        return (
          <MemoryChapter
            durationFrames={durationFrames}
            place="Hawaii"
            pattern="hawaii"
            photos={openingV1PhotoSlots.hawaii}
          />
        );
      case 'v1-photo-hero-a':
        return (
          <HeroPhoto
            durationFrames={durationFrames}
            photo={openingV1PhotoSlots.heroes[0]}
            label="COUPLE HERO 01"
            index={0}
          />
        );
      case 'v1-photo-hero-b':
        return (
          <HeroPhoto
            durationFrames={durationFrames}
            photo={openingV1PhotoSlots.heroes[1]}
            label="COUPLE HERO 02"
            index={1}
          />
        );
      case 'v1-arrival-route':
        return <ArrivalRoute durationFrames={durationFrames} />;
      case 'v1-ending-title':
        return <EndingTitle durationFrames={durationFrames} />;
      default:
        return <SceneBase dark>{null}</SceneBase>;
    }
  };

  return (
    <AbsoluteFill style={{backgroundColor: colors.navyDeep}}>
      {openingV1Scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={starts[index]}
          durationInFrames={sceneFrames[index]}
          name={scene.title}
        >
          {renderScene(scene.id, sceneFrames[index])}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
