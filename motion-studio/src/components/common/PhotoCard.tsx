import {Img, staticFile} from 'remotion';
import {serifFamily} from '../../data/fonts';
import {colors} from '../../data/theme';

type Props = {
  photo: string | null;
  width: number;
  height: number;
  rotationDeg: number;
  cardRadius: number;
  shadowStrength: number;
};

// 高級カード風の写真1枚。photoがnullなら上品なプレースホルダーを表示する。
export const PhotoCard = ({
  photo,
  width,
  height,
  rotationDeg,
  cardRadius,
  shadowStrength,
}: Props) => {
  const mat = 18;
  return (
    <div
      style={{
        width,
        height,
        transform: `rotate(${rotationDeg}deg)`,
        background: colors.ivory,
        borderRadius: cardRadius,
        padding: mat,
        boxShadow: `0 ${14 * shadowStrength}px ${70 * shadowStrength}px rgba(16, 25, 44, 0.38)`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: Math.max(cardRadius - 4, 0),
          overflow: 'hidden',
          background: colors.beigeDark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {photo ? (
          <Img
            src={staticFile(`photos/${photo}`)}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <div
            style={{
              width: '88%',
              height: '86%',
              border: `1.5px dashed ${colors.gold}`,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <svg width="44" height="44" viewBox="-16 -16 32 32">
              <path d="M 14 0 L -10.5 7.7 L -4.9 0 L -10.5 -7.7 Z" fill={colors.gold} />
            </svg>
            <span
              style={{
                fontFamily: serifFamily,
                fontSize: 20,
                letterSpacing: '0.36em',
                color: '#8C7A4F',
              }}
            >
              PHOTO
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
