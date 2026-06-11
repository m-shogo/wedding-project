import {Composition} from 'remotion';
import {video} from './data/theme';
import {
  StampScene,
  stampSchema,
  stampTestDefaults,
  stampOkinawaDefaults,
} from './compositions/common/StampScene';
import {
  BoardingPassIntro,
  boardingPassSchema,
  boardingPassDefaults,
} from './compositions/opening/BoardingPassIntro';
import {
  FlightMapRoute,
  flightMapSchema,
  flightMapNaritaOkinawaDefaults,
} from './compositions/opening/FlightMapRoute';
import {
  CloudOverlayScene,
  cloudOverlaySchema,
  cloudOverlayDefaults,
} from './compositions/common/CloudOverlayScene';
import {
  Countdown,
  countdownSchema,
  countdownDefaults,
} from './compositions/opening/Countdown';
import {
  PhotoCardScene,
  photoCardSchema,
  photoCardOkinawaDefaults,
} from './compositions/common/PhotoCardScene';
import {OpeningFullPreview} from './compositions/opening/OpeningFullPreview';

const base = {
  width: video.width,
  height: video.height,
  fps: video.fps,
} as const;

export const RemotionRoot = () => {
  return (
    <>
      {/* Phase 0: 透過書き出しテスト */}
      <Composition
        id="StampTest"
        component={StampScene}
        durationInFrames={60}
        {...base}
        schema={stampSchema}
        defaultProps={stampTestDefaults}
      />
      <Composition
        id="StampTestPreview"
        component={StampScene}
        durationInFrames={60}
        {...base}
        schema={stampSchema}
        defaultProps={{...stampTestDefaults, background: 'paper' as const}}
      />

      {/* Opening MVP */}
      <Composition
        id="BoardingPassIntro"
        component={BoardingPassIntro}
        durationInFrames={240}
        {...base}
        schema={boardingPassSchema}
        defaultProps={boardingPassDefaults}
      />
      <Composition
        id="FlightMapNaritaToOkinawa"
        component={FlightMapRoute}
        durationInFrames={240}
        {...base}
        schema={flightMapSchema}
        defaultProps={flightMapNaritaOkinawaDefaults}
      />
      <Composition
        id="PassportStampOkinawa"
        component={StampScene}
        durationInFrames={60}
        {...base}
        schema={stampSchema}
        defaultProps={stampOkinawaDefaults}
      />
      <Composition
        id="CloudOverlay"
        component={CloudOverlayScene}
        durationInFrames={540}
        {...base}
        schema={cloudOverlaySchema}
        defaultProps={cloudOverlayDefaults}
      />
      <Composition
        id="Countdown"
        component={Countdown}
        durationInFrames={480}
        {...base}
        schema={countdownSchema}
        defaultProps={countdownDefaults}
      />
      <Composition
        id="PhotoCardOkinawa"
        component={PhotoCardScene}
        durationInFrames={300}
        {...base}
        schema={photoCardSchema}
        defaultProps={photoCardOkinawaDefaults}
      />

      {/* 通し確認用(書き出しは任意) */}
      <Composition
        id="OpeningFullPreview"
        component={OpeningFullPreview}
        durationInFrames={1320}
        {...base}
      />
    </>
  );
};
