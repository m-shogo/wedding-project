import {Composition} from 'remotion';
import {video} from './data/theme';
import {StampScene, stampSchema} from './compositions/common/StampScene';
import {
  BoardingPassIntro,
  boardingPassSchema,
} from './compositions/opening/BoardingPassIntro';
import {
  FlightMapRoute,
  flightMapSchema,
} from './compositions/opening/FlightMapRoute';
import {
  CloudOverlayScene,
  cloudOverlaySchema,
} from './compositions/common/CloudOverlayScene';
import {Countdown, countdownSchema} from './compositions/opening/Countdown';
import {
  PhotoCardScene,
  photoCardSchema,
} from './compositions/common/PhotoCardScene';
import {OpeningFullPreview} from './compositions/opening/OpeningFullPreview';
import {
  StampRushFullRoute,
  stampRushSchema,
} from './compositions/opening/StampRushFullRoute';

const base = {
  width: video.width,
  height: video.height,
  fps: video.fps,
} as const;

// 注意: defaultPropsはRemotion Studioの「Save defaults」でソースに書き戻せるよう、
// このファイル内にオブジェクトリテラルで直接書く(変数参照やspreadにしない)。

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
        defaultProps={{
          text: 'OKINAWA',
          subText: 'MEMORY FLIGHT',
          centerText: 'SS1024',
          size: 620,
          rotationDeg: -8,
          color: '#A8666F',
          inkRoughness: 7,
          pressDelayFrames: 8,
          seed: 'stamp-test-01',
          background: 'transparent' as const,
        }}
      />
      <Composition
        id="StampTestPreview"
        component={StampScene}
        durationInFrames={60}
        {...base}
        schema={stampSchema}
        defaultProps={{
          text: 'OKINAWA',
          subText: 'MEMORY FLIGHT',
          centerText: 'SS1024',
          size: 620,
          rotationDeg: -8,
          color: '#A8666F',
          inkRoughness: 7,
          pressDelayFrames: 8,
          seed: 'stamp-test-01',
          background: 'paper' as const,
        }}
      />

      {/* Opening MVP */}
      <Composition
        id="BoardingPassIntro"
        component={BoardingPassIntro}
        durationInFrames={240}
        {...base}
        schema={boardingPassSchema}
        defaultProps={{
          variant: 'ivory' as const,
          title: 'MEMORY FLIGHT 1024',
          flightNumber: 'SS1024',
          date: 'OCT 24 2026',
          seat: '10-24',
          gate: '24',
          passenger: 'DEAR GUESTS',
          departureCode: 'NRT',
          departureName: 'NARITA',
          arrivalCode: 'YKH',
          arrivalName: 'YOKOHAMA',
          zoomTo: 1.045,
          showCinematicBars: true,
        }}
      />
      <Composition
        id="FlightMapNaritaToOkinawa"
        component={FlightMapRoute}
        durationInFrames={240}
        {...base}
        schema={flightMapSchema}
        defaultProps={{
          routeId: 'naritaToOkinawa' as const,
          lineColor: '#A8666F',
          lineWidth: 6,
          planeColor: '#1C2A44',
          planeSize: 30,
          zoomTo: 1.06,
          travelStartFrame: 30,
          travelEndHoldFrames: 50,
          showHeader: true,
          headerText: 'MEMORY FLIGHT 1024',
          fitRoute: true,
        }}
      />
      <Composition
        id="FlightMapOkinawaToSeoul"
        component={FlightMapRoute}
        durationInFrames={240}
        {...base}
        schema={flightMapSchema}
        defaultProps={{
          routeId: 'okinawaToSeoul' as const,
          lineColor: '#A8666F',
          lineWidth: 6,
          planeColor: '#1C2A44',
          planeSize: 30,
          zoomTo: 1.06,
          travelStartFrame: 30,
          travelEndHoldFrames: 50,
          showHeader: true,
          headerText: 'MEMORY FLIGHT 1024',
          fitRoute: true,
        }}
      />
      <Composition
        id="FlightMapSeoulToHawaii"
        component={FlightMapRoute}
        durationInFrames={240}
        {...base}
        schema={flightMapSchema}
        defaultProps={{
          routeId: 'seoulToHawaii' as const,
          lineColor: '#A8666F',
          lineWidth: 6,
          planeColor: '#1C2A44',
          planeSize: 30,
          zoomTo: 1.06,
          travelStartFrame: 30,
          travelEndHoldFrames: 50,
          showHeader: true,
          headerText: 'MEMORY FLIGHT 1024',
          fitRoute: true,
        }}
      />
      <Composition
        id="FlightMapHawaiiToYokohama"
        component={FlightMapRoute}
        durationInFrames={240}
        {...base}
        schema={flightMapSchema}
        defaultProps={{
          routeId: 'hawaiiToYokohama' as const,
          lineColor: '#A8666F',
          lineWidth: 6,
          planeColor: '#1C2A44',
          planeSize: 30,
          zoomTo: 1.06,
          travelStartFrame: 30,
          travelEndHoldFrames: 50,
          showHeader: true,
          headerText: 'MEMORY FLIGHT 1024',
          fitRoute: true,
        }}
      />
      <Composition
        id="PassportStampOkinawa"
        component={StampScene}
        durationInFrames={60}
        {...base}
        schema={stampSchema}
        defaultProps={{
          text: 'OKINAWA',
          subText: 'MEMORY 01',
          centerText: 'SS1024',
          size: 620,
          rotationDeg: -8,
          color: '#A8666F',
          inkRoughness: 7,
          pressDelayFrames: 8,
          seed: 'stamp-okinawa-01',
          background: 'transparent' as const,
        }}
      />
      <Composition
        id="CloudOverlay"
        component={CloudOverlayScene}
        durationInFrames={540}
        {...base}
        schema={cloudOverlaySchema}
        defaultProps={{
          cloudOpacity: 0.5,
          speed: 1.6,
        }}
      />
      <Composition
        id="Countdown"
        component={Countdown}
        durationInFrames={480}
        {...base}
        schema={countdownSchema}
        defaultProps={{
          countdownFrom: 10,
          introText: 'Doors opening in...',
          finalTop: 'Please welcome',
          finalName: 'SHOGO & SHIORI',
          numberSize: 360,
          glowStrength: 0.5,
          showIntro: true,
          showCinematicBars: true,
        }}
      />
      <Composition
        id="PhotoCardOkinawa"
        component={PhotoCardScene}
        durationInFrames={300}
        {...base}
        schema={photoCardSchema}
        defaultProps={{
          label: 'MEMORY 01',
          title: 'Okinawa',
          photos: [null, null, null],
          background: 'beige' as const,
          maxRotationDeg: 3,
          cardRadius: 8,
          shadowStrength: 1,
          staggerFrames: 14,
          zoomTo: 1.05,
        }}
      />

      <Composition
        id="StampRushFullRoute"
        component={StampRushFullRoute}
        durationInFrames={660}
        {...base}
        schema={stampRushSchema}
        defaultProps={{
          lineColor: '#A8666F',
          lineWidth: 6,
          planeColor: '#1C2A44',
          planeSize: 30,
          stampColor: '#A8666F',
          stampSize: 240,
          zoomTo: 1.05,
          showHeader: true,
          headerText: 'MEMORY FLIGHT 1024',
          showFinalText: true,
          finalText: 'FINAL DESTINATION — YOKOHAMA',
          stamps: [
            {text: 'OKINAWA', subText: 'MEMORY 01', x: 760, y: 700, rotationDeg: -9},
            {text: 'SEOUL', subText: 'MEMORY 02', x: 560, y: 380, rotationDeg: 7},
            {text: 'HAWAII', subText: 'PROPOSAL', x: 1620, y: 440, rotationDeg: -6},
          ],
        }}
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
