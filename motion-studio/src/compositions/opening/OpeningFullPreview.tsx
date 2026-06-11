import {AbsoluteFill, Sequence, Series} from 'remotion';
import {BoardingPassIntro, boardingPassDefaults} from './BoardingPassIntro';
import {FlightMapRoute, flightMapNaritaOkinawaDefaults} from './FlightMapRoute';
import {StampScene, stampOkinawaDefaults} from '../common/StampScene';
import {CloudOverlayScene, cloudOverlayDefaults} from '../common/CloudOverlayScene';
import {PhotoCardScene, photoCardOkinawaDefaults} from '../common/PhotoCardScene';
import {Countdown, countdownDefaults} from './Countdown';

// CapCutに行く前の通し確認用。秒割りのテンポだけを見る(BGMなし)。
// 本番の合成・間の調整はCapCutで行う。
export const OpeningFullPreview = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Series>
        <Series.Sequence durationInFrames={240}>
          <BoardingPassIntro {...boardingPassDefaults} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
          <AbsoluteFill>
            <FlightMapRoute {...flightMapNaritaOkinawaDefaults} />
            <Sequence from={40}>
              <CloudOverlayScene {...cloudOverlayDefaults} cloudOpacity={0.22} />
            </Sequence>
            <Sequence from={230}>
              <StampScene {...stampOkinawaDefaults} size={430} />
            </Sequence>
          </AbsoluteFill>
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
          <PhotoCardScene {...photoCardOkinawaDefaults} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={480}>
          <Countdown {...countdownDefaults} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
