import type {ReactNode} from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {colors} from '../../data/theme';
import {openingV1Scenes} from '../../data/openingV1';
import {openingV1PhotoSlots} from '../../data/openingV1Media';
import {HeroPhoto, MemoryChapter, PhotoColdOpen} from './OpeningV1PhotoScenes';
import {ArrivalRoute, DocumentaryEndCard} from './OpeningV1UtilityScenes';

export const OpeningV1 = () => {
  const {fps} = useVideoConfig();
  const sceneFrames = openingV1Scenes.map((scene) => Math.round(scene.durationSec * fps));
  const starts = sceneFrames.map((_, index) =>
    sceneFrames.slice(0, index).reduce((sum, value) => sum + value, 0),
  );

  const renderScene = (sceneId: string, durationFrames: number): ReactNode => {
    switch (sceneId) {
      case 'v1-photo-cold-open':
        return (
          <PhotoColdOpen
            durationFrames={durationFrames}
            photo={openingV1PhotoSlots.heroes[0]}
          />
        );
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
            role="a"
          />
        );
      case 'v1-photo-hero-b':
        return (
          <HeroPhoto
            durationFrames={durationFrames}
            photo={openingV1PhotoSlots.heroes[1]}
            label="COUPLE HERO 02"
            role="b"
          />
        );
      case 'v1-arrival-route':
        return <ArrivalRoute durationFrames={durationFrames} />;
      case 'v1-ending-title':
        return <DocumentaryEndCard durationFrames={durationFrames} />;
      default:
        return null;
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
