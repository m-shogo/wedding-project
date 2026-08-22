import type {ReactNode} from 'react';
import {AbsoluteFill, Series, useVideoConfig} from 'remotion';
import {openingProject} from '../../data/openingProject';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {BoardingPassIntro, boardingPassDefaults} from './BoardingPassIntro';
import {FlightMapRoute, flightMapNaritaOkinawaDefaults} from './FlightMapRoute';
import {StampRushFullRoute} from './StampRushFullRoute';
import {CloudSea} from './CloudSea';
import {DoorLight} from './DoorLight';
import {Countdown, countdownDefaults} from './Countdown';
import {PhotoCardScene} from '../common/PhotoCardScene';

// openingProject.tsのscenesをそのまま並べる通し確認用。
// シーン構成を変えるとここも自動で変わる(尺の合計はcheck:motionが検証)。
// ここのpropsはプレビュー用の代表値。本番の調整値はRoot.tsx(Save defaults)が正。

const renderers: Record<string, () => ReactNode> = {
  搭乗券: () => <BoardingPassIntro {...boardingPassDefaults} />,
  雲海: () => (
    <CloudSea timeOfDay="morning" speed={1.4} cloudOpacity={0.85} zoomTo={1.05} softness={18} />
  ),
  '押印連打-全路線': () => (
    <StampRushFullRoute
      lineColor={colors.roseGold}
      lineWidth={6}
      planeColor={colors.navy}
      planeSize={30}
      stampColor={colors.roseGold}
      stampSize={240}
      zoomTo={1.05}
      showHeader
      headerText="MEMORY FLIGHT 1024"
      showFinalText
      finalText="FINAL DESTINATION — YOKOHAMA"
      stamps={[
        {text: 'OKINAWA', subText: 'MEMORY 01', x: 760, y: 700, rotationDeg: -9},
        {text: 'SEOUL', subText: 'MEMORY 02', x: 560, y: 380, rotationDeg: 7},
        {text: 'HAWAII', subText: 'PROPOSAL', x: 1620, y: 440, rotationDeg: -6},
      ]}
    />
  ),
  '写真-Hawaii': () => (
    <PhotoCardScene
      label="MEMORY 03"
      title="Hawaii"
      photos={[null, null, null]}
      background="beige"
      maxRotationDeg={2}
      cardRadius={8}
      shadowStrength={1}
      staggerFrames={18}
      zoomTo={1.04}
    />
  ),
  '地図-Hawaii-横浜': () => (
    <FlightMapRoute {...flightMapNaritaOkinawaDefaults} routeId="hawaiiToYokohama" />
  ),
  '扉-光': () => (
    <DoorLight
      lightColor="#F2E2BC"
      openStartFrame={30}
      maxOpenWidth={300}
      glowStrength={0.6}
      particleCount={36}
    />
  ),
  '入場前-秒読': () => <Countdown {...countdownDefaults} />,
};

// rendererが未定義のテンプレートはスレートで知らせる(クラッシュさせない)
const FallbackSlate = ({template}: {template: string}) => (
  <AbsoluteFill
    style={{
      backgroundColor: colors.navyDeep,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: serifFamily,
      color: colors.goldLight,
      fontSize: 48,
      letterSpacing: '0.2em',
    }}
  >
    {`${template} (renderer未定義)`}
  </AbsoluteFill>
);

export const OpeningFullPreview = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Series>
        {openingProject.scenes.map((scene) => {
          const render = renderers[scene.template];
          return (
            <Series.Sequence
              key={scene.id}
              durationInFrames={Math.round(scene.durationSec * fps)}
            >
              {render ? render() : <FallbackSlate template={scene.template} />}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
