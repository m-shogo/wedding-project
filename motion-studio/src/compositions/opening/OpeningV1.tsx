import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {openingV1Scenes} from '../../data/openingV1';
import {CloudSea} from './CloudSea';

const sansFamily = fonts.sans;

const fadeForScene = (frame: number, durationFrames: number) => {
  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationFrames - 12), durationFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return fadeOut;
};

const EditorialBase = ({children, dark = false}: {children: ReactNode; dark?: boolean}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? colors.navyDeep : colors.ivory,
      color: dark ? colors.ivory : colors.navy,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 34,
        border: `1px solid ${dark ? 'rgba(201,178,124,0.28)' : 'rgba(28,42,68,0.16)'}`,
        pointerEvents: 'none',
      }}
    />
    {children}
  </AbsoluteFill>
);

const SmallLabel = ({children, dark = false}: {children: ReactNode; dark?: boolean}) => (
  <div
    style={{
      fontFamily: sansFamily,
      fontSize: 22,
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: dark ? colors.goldLight : colors.gold,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

const DepartureTitle = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = fadeForScene(frame, durationFrames);
  const y = interpolate(frame, [0, 30], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <EditorialBase dark>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <SmallLabel dark>Welcome aboard</SmallLabel>
        <div
          style={{
            marginTop: 28,
            fontFamily: serifFamily,
            fontSize: 108,
            letterSpacing: '0.08em',
            fontWeight: 500,
          }}
        >
          SHOGO & SHIORI
        </div>
        <div
          style={{
            marginTop: 34,
            display: 'flex',
            gap: 42,
            alignItems: 'center',
            fontFamily: sansFamily,
            fontSize: 23,
            letterSpacing: '0.22em',
            color: colors.beigeDark,
          }}
        >
          <span>24 OCT 2026</span>
          <span style={{width: 72, height: 1, backgroundColor: colors.gold}} />
          <span>YOKOHAMA</span>
        </div>
      </AbsoluteFill>
    </EditorialBase>
  );
};

// 雲は角丸のplaceholderではなく、本番と同じ CloudSea を背景に使う。
// 対応表(docs/opening-v1-motion-map.md)のセクション2 = drift / rec-03。
// timeOfDay=morning はStyle Bibleの「朝日・やわらかい空色」に合わせている。
const CloudTransition = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = fadeForScene(frame, durationFrames);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <CloudSea timeOfDay="morning" speed={0.9} cloudOpacity={0.85} zoomTo={1.06} softness={18} />
      {/* 他セクションと同じ内枠。EditorialBaseは不透明な下地を敷くのでここでは枠だけ描く */}
      <div
        style={{
          position: 'absolute',
          inset: 34,
          border: '1px solid rgba(255,255,255,0.34)',
          pointerEvents: 'none',
        }}
      />
      <div style={{position: 'absolute', left: 150, bottom: 120, color: colors.navy}}>
        <SmallLabel>Altitude</SmallLabel>
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 62,
            letterSpacing: '0.06em',
            marginTop: 10,
            // 雲の白に負けないよう、薄く影を敷いて可読性を確保する
            textShadow: '0 2px 18px rgba(255,255,255,0.55)',
          }}
        >
          The journey begins.
        </div>
      </div>
    </AbsoluteFill>
  );
};

type PhotoSlotProps = {
  slot: string;
  index: number;
  width: number;
  height: number;
};

const PhotoSlot = ({slot, index, width, height}: PhotoSlotProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: frame - index * 8,
    fps,
    config: {damping: 180, stiffness: 75, mass: 0.9},
  });
  const y = interpolate(enter, [0, 1], [70, 0]);
  const opacity = interpolate(enter, [0, 0.35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: colors.beige,
        border: '12px solid #fffdf8',
        boxShadow: '0 28px 70px rgba(16,25,44,0.15)',
        transform: `translateY(${y}px) rotate(${(index - 1) * 1.2}deg)`,
        opacity,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '84%',
          height: '76%',
          border: `1px solid rgba(28,42,68,0.12)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.cloud,
        }}
      >
        <div style={{textAlign: 'center'}}>
          <div
            style={{
              fontFamily: sansFamily,
              fontSize: 18,
              letterSpacing: '0.24em',
              color: colors.gold,
            }}
          >
            REAL PHOTO SLOT
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: serifFamily,
              fontSize: 38,
              color: colors.navy,
              letterSpacing: '0.06em',
            }}
          >
            {slot}
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotoTrio = ({
  durationFrames,
  label,
  title,
  slots,
}: {
  durationFrames: number;
  label: string;
  title: string;
  slots: [string, string, string];
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeForScene(frame, durationFrames);
  const scale = interpolate(frame, [0, durationFrames], [1, 1.018]);

  return (
    <EditorialBase>
      <AbsoluteFill style={{opacity, transform: `scale(${scale})`}}>
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 150,
            right: 150,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <SmallLabel>{label}</SmallLabel>
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 58,
              letterSpacing: '0.08em',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            inset: '220px 120px 110px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 54,
          }}
        >
          {slots.map((slot, index) => (
            <PhotoSlot key={slot} slot={slot} index={index} width={470} height={620} />
          ))}
        </div>
      </AbsoluteFill>
    </EditorialBase>
  );
};

const HeroPhoto = ({
  durationFrames,
  slot,
  caption,
  index,
}: {
  durationFrames: number;
  slot: string;
  caption: string;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeForScene(frame, durationFrames);
  const zoom = interpolate(frame, [0, durationFrames], [1, 1.035]);

  return (
    <EditorialBase dark={index % 2 === 1}>
      <AbsoluteFill style={{opacity}}>
        <div
          style={{
            position: 'absolute',
            left: 180,
            right: 180,
            top: 95,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <SmallLabel dark={index % 2 === 1}>Our journey</SmallLabel>
          <SmallLabel dark={index % 2 === 1}>{String(index + 1).padStart(2, '0')}</SmallLabel>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 245,
            right: 245,
            top: 190,
            bottom: 175,
            backgroundColor: colors.cloud,
            border: '14px solid #fffdf8',
            boxShadow: index % 2 === 1 ? '0 28px 80px rgba(0,0,0,0.28)' : '0 28px 80px rgba(16,25,44,0.16)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${zoom})`,
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div
              style={{
                fontFamily: sansFamily,
                fontSize: 19,
                letterSpacing: '0.28em',
                color: colors.gold,
              }}
            >
              REAL PHOTO SLOT
            </div>
            <div
              style={{
                fontFamily: serifFamily,
                fontSize: 64,
                letterSpacing: '0.08em',
                color: colors.navy,
                marginTop: 18,
              }}
            >
              {slot}
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 86,
            textAlign: 'center',
            fontFamily: serifFamily,
            fontSize: 44,
            letterSpacing: '0.08em',
          }}
        >
          {caption}
        </div>
      </AbsoluteFill>
    </EditorialBase>
  );
};

const ArrivalRoute = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = fadeForScene(frame, durationFrames);
  const progress = interpolate(frame, [4, Math.max(5, durationFrames - 6)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <EditorialBase>
      <AbsoluteFill style={{opacity, justifyContent: 'center', alignItems: 'center'}}>
        <SmallLabel>Final destination</SmallLabel>
        <div style={{marginTop: 70, width: 1120, position: 'relative', height: 170}}>
          <div
            style={{
              position: 'absolute',
              top: 76,
              left: 70,
              width: 980,
              height: 2,
              backgroundColor: colors.beigeDark,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 74,
              left: 70,
              width: 980 * progress,
              height: 5,
              backgroundColor: colors.roseGold,
            }}
          />
          <div style={{position: 'absolute', left: 0, top: 24, fontFamily: serifFamily, fontSize: 44}}>HAWAII</div>
          <div style={{position: 'absolute', right: 0, top: 24, fontFamily: serifFamily, fontSize: 44}}>YOKOHAMA</div>
        </div>
      </AbsoluteFill>
    </EditorialBase>
  );
};

const EndingTitle = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = fadeForScene(frame, durationFrames);
  const y = interpolate(frame, [0, 28], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <EditorialBase dark>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <SmallLabel dark>Welcome aboard</SmallLabel>
        <div
          style={{
            marginTop: 24,
            fontFamily: serifFamily,
            fontSize: 92,
            letterSpacing: '0.07em',
            textAlign: 'center',
          }}
        >
          OUR WEDDING JOURNEY
          <br />
          BEGINS
        </div>
        <div
          style={{
            marginTop: 34,
            fontFamily: sansFamily,
            fontSize: 22,
            letterSpacing: '0.25em',
            color: colors.goldLight,
          }}
        >
          SHOGO & SHIORI · 2026.10.24
        </div>
      </AbsoluteFill>
    </EditorialBase>
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
        return <CloudTransition durationFrames={durationFrames} />;
      case 'v1-photos-okinawa':
        return (
          <PhotoTrio
            durationFrames={durationFrames}
            label="MEMORY 01"
            title="Okinawa"
            slots={['OKINAWA 01', 'OKINAWA 02', 'OKINAWA 03']}
          />
        );
      case 'v1-photos-seoul':
        return (
          <PhotoTrio
            durationFrames={durationFrames}
            label="MEMORY 02"
            title="Seoul"
            slots={['SEOUL 01', 'SEOUL 02', 'SEOUL 03']}
          />
        );
      case 'v1-photos-hawaii':
        return (
          <PhotoTrio
            durationFrames={durationFrames}
            label="MEMORY 03"
            title="Hawaii"
            slots={['HAWAII 01', 'HAWAII 02', 'HAWAII 03']}
          />
        );
      case 'v1-photo-hero-a':
        return (
          <HeroPhoto
            durationFrames={durationFrames}
            slot="COUPLE HERO 01"
            caption="The places we found together."
            index={0}
          />
        );
      case 'v1-photo-hero-b':
        return (
          <HeroPhoto
            durationFrames={durationFrames}
            slot="COUPLE HERO 02"
            caption="And the destination we chose together."
            index={1}
          />
        );
      case 'v1-arrival-route':
        return <ArrivalRoute durationFrames={durationFrames} />;
      case 'v1-ending-title':
        return <EndingTitle durationFrames={durationFrames} />;
      default:
        return <EditorialBase dark>{null}</EditorialBase>;
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
