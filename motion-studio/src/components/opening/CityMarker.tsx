import {serifFamily} from '../../data/fonts';

type Props = {
  x: number;
  y: number;
  label: string;
  ringColor: string;
  dotColor: string;
  textColor: string;
  labelPosition?: 'above' | 'below';
  opacity?: number;
};

// 地図上の都市マーカー。二重円+レタースペースの広いラベル。
export const CityMarker = ({
  x,
  y,
  label,
  ringColor,
  dotColor,
  textColor,
  labelPosition = 'below',
  opacity = 1,
}: Props) => {
  const labelY = labelPosition === 'below' ? y + 52 : y - 36;
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={16} fill="none" stroke={ringColor} strokeWidth={2.5} />
      <circle cx={x} cy={y} r={7} fill={dotColor} />
      <text
        x={x}
        y={labelY}
        fontFamily={serifFamily}
        fontSize={30}
        fontWeight={600}
        letterSpacing="0.3em"
        fill={textColor}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
};
