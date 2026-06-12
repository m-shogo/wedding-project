import {Composition, Folder} from 'remotion';
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
import {CloudSea, cloudSeaSchema} from './compositions/opening/CloudSea';
import {
  AirplaneWindow,
  airplaneWindowSchema,
} from './compositions/opening/AirplaneWindow';
import {DoorLight, doorLightSchema} from './compositions/opening/DoorLight';
import {ManualScene} from './compositions/common/ManualScene';
import {GenericTitle, genericTitleSchema} from './compositions/common/GenericTitle';
import {ChapterTitle, chapterTitleSchema} from './compositions/profile/ChapterTitle';
import {TimelineScene, timelineSchema} from './compositions/profile/TimelineScene';
import {SinglePhoto, singlePhotoSchema} from './compositions/profile/SinglePhoto';
import {IntroCard, introCardSchema} from './compositions/profile/IntroCard';

const base = {
  width: video.width,
  height: video.height,
  fps: video.fps,
} as const;

// 注意1: defaultPropsはRemotion Studioの「Save defaults」でソースに書き戻せるよう、
// このファイル内にオブジェクトリテラルで直接書く(変数参照やspreadにしない)。
// 注意2: コンポジションIDとフォルダ名は漢字+英数字+ハイフンのみ使える
// (Remotionの仕様でひらがな・カタカナは不可)。出力ファイル名は英語のまま。

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="00-動作確認">
        <Composition
          id="透過確認-押印"
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
          id="透過確認-紙背景"
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
      </Folder>

      <Folder name="10-開幕素材">
        <Composition
          id="搭乗券"
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
          id="地図-成田-沖縄"
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
          id="地図-沖縄-韓国"
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
          id="地図-韓国-Hawaii"
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
          id="地図-Hawaii-横浜"
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
          id="押印-沖縄"
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
          id="押印-韓国"
          component={StampScene}
          durationInFrames={60}
          {...base}
          schema={stampSchema}
          defaultProps={{
            text: 'SEOUL',
            subText: 'MEMORY 02',
            centerText: 'SS1024',
            size: 620,
            rotationDeg: 6,
            color: '#A8666F',
            inkRoughness: 7,
            pressDelayFrames: 8,
            seed: 'stamp-seoul-01',
            background: 'transparent' as const,
          }}
        />
        <Composition
          id="押印-Hawaii-求婚"
          component={StampScene}
          durationInFrames={60}
          {...base}
          schema={stampSchema}
          defaultProps={{
            text: 'HAWAII',
            subText: 'PROPOSAL',
            centerText: 'SS1024',
            size: 620,
            rotationDeg: -6,
            color: '#A8666F',
            inkRoughness: 7,
            pressDelayFrames: 8,
            seed: 'stamp-hawaii-01',
            background: 'transparent' as const,
          }}
        />
        <Composition
          id="押印-横浜"
          component={StampScene}
          durationInFrames={60}
          {...base}
          schema={stampSchema}
          defaultProps={{
            text: 'YOKOHAMA',
            subText: 'FINAL DESTINATION',
            centerText: 'SS1024',
            size: 620,
            rotationDeg: -8,
            color: '#A8666F',
            inkRoughness: 7,
            pressDelayFrames: 8,
            seed: 'stamp-yokohama-01',
            background: 'transparent' as const,
          }}
        />
        <Composition
          id="押印連打-全路線"
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
        <Composition
          id="雲-透過"
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
          id="入場前-秒読"
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
          id="雲海"
          component={CloudSea}
          durationInFrames={300}
          {...base}
          schema={cloudSeaSchema}
          defaultProps={{
            timeOfDay: 'morning' as const,
            speed: 1.4,
            cloudOpacity: 0.85,
            zoomTo: 1.05,
          }}
        />
        <Composition
          id="飛行機窓"
          component={AirplaneWindow}
          durationInFrames={300}
          {...base}
          schema={airplaneWindowSchema}
          defaultProps={{
            timeOfDay: 'morning' as const,
            driftSpeed: 1.6,
            cloudOpacity: 0.8,
            zoomTo: 1.05,
            showReflection: true,
          }}
        />
        <Composition
          id="扉-光"
          component={DoorLight}
          durationInFrames={360}
          {...base}
          schema={doorLightSchema}
          defaultProps={{
            lightColor: '#F2E2BC',
            openStartFrame: 30,
            maxOpenWidth: 300,
            glowStrength: 0.6,
            particleCount: 36,
          }}
        />
        <Composition
          id="題字-汎用"
          component={GenericTitle}
          durationInFrames={240}
          {...base}
          schema={genericTitleSchema}
          defaultProps={{
            mainText: 'Ladies and gentlemen,\nour journey is about to begin.',
            subText: '',
            background: 'transparent' as const,
            mainSize: 64,
            italic: true,
            fadeInFrames: 24,
            fadeOutFrames: 24,
            showCinematicBars: false,
          }}
        />
        <Composition
          id="写真-沖縄"
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
          id="写真-韓国"
          component={PhotoCardScene}
          durationInFrames={300}
          {...base}
          schema={photoCardSchema}
          defaultProps={{
            label: 'MEMORY 02',
            title: 'Seoul',
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
          id="写真-Hawaii"
          component={PhotoCardScene}
          durationInFrames={300}
          {...base}
          schema={photoCardSchema}
          defaultProps={{
            label: 'MEMORY 03',
            title: 'Hawaii',
            photos: [null, null, null],
            background: 'beige' as const,
            maxRotationDeg: 2,
            cardRadius: 8,
            shadowStrength: 1,
            staggerFrames: 18,
            zoomTo: 1.04,
          }}
        />
      </Folder>

      <Folder name="20-Profile素材">
        <Composition
          id="章題"
          component={ChapterTitle}
          durationInFrames={180}
          {...base}
          schema={chapterTitleSchema}
          defaultProps={{
            chapterLabel: 'CHAPTER 1',
            titleEn: 'Departure',
            titleJa: '出発',
            background: 'beige' as const,
          }}
        />
        <Composition
          id="年表"
          component={TimelineScene}
          durationInFrames={360}
          {...base}
          schema={timelineSchema}
          defaultProps={{
            title: 'SHOGO',
            events: [
              {year: '1995', label: '誕生'},
              {year: '2001', label: '小学校'},
              {year: '2014', label: '大学'},
              {year: '2018', label: '社会人'},
              {year: '2026', label: '結婚'},
            ],
            background: 'beige' as const,
            travelStartFrame: 30,
          }}
        />
        <Composition
          id="写真一枚"
          component={SinglePhoto}
          durationInFrames={240}
          {...base}
          schema={singlePhotoSchema}
          defaultProps={{
            photo: null,
            caption: 'はじめての旅行',
            subCaption: 'OKINAWA, 2021',
            zoomDirection: 'in' as const,
            background: 'beige' as const,
            cardWidth: 1240,
            cardHeight: 820,
          }}
        />
        <Composition
          id="紹介札"
          component={IntroCard}
          durationInFrames={240}
          {...base}
          schema={introCardSchema}
          defaultProps={{
            name: 'COOKIE',
            relation: 'FAMILY / DOG',
            comment: 'いつも一緒に旅をしてきた\n大切な家族',
            photo: null,
            background: 'beige' as const,
          }}
        />
      </Folder>

      <Folder name="90-全体確認">
        <Composition
          id="開幕-全体確認"
          component={OpeningFullPreview}
          durationInFrames={2460}
          {...base}
        />
      </Folder>

      <Folder name="99-説明書">
        <Composition
          id="取扱説明"
          component={ManualScene}
          durationInFrames={150}
          {...base}
        />
      </Folder>
    </>
  );
};
