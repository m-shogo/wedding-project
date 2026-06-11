import {random} from 'remotion';
import {serifFamily} from '../../data/fonts';
import {PaperPlane} from '../common/PaperPlane';

type Props = {
  text: string;
  subText: string;
  centerText: string;
  size: number;
  color: string;
  inkRoughness: number;
  seed: string;
  idSuffix?: string;
};

// パスポートのハンコ風マーク。アニメーションは持たず、見た目だけを描く。
// 押すアニメーションは呼び出し側(composition)で scale / opacity を制御する。
export const PassportStampMark = ({
  text,
  subText,
  centerText,
  size,
  color,
  inkRoughness,
  seed,
  idSuffix = 'a',
}: Props) => {
  const filterId = `ink-${idSuffix}`;
  const topArcId = `arc-top-${idSuffix}`;
  const bottomArcId = `arc-bottom-${idSuffix}`;
  const turbSeed = Math.floor(random(seed) * 1000);
  const c = 300;
  const textR = 234;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      style={{display: 'block', overflow: 'visible'}}
    >
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves={2}
            seed={turbSeed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={inkRoughness}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <path
          id={topArcId}
          d={`M ${c - textR} ${c} A ${textR} ${textR} 0 0 1 ${c + textR} ${c}`}
          fill="none"
        />
        <path
          id={bottomArcId}
          d={`M ${c - textR} ${c} A ${textR} ${textR} 0 0 0 ${c + textR} ${c}`}
          fill="none"
        />
      </defs>
      <g filter={`url(#${filterId})`} opacity={0.94}>
        <circle cx={c} cy={c} r={272} fill="none" stroke={color} strokeWidth={9} />
        <circle cx={c} cy={c} r={200} fill="none" stroke={color} strokeWidth={2.5} />
        <text
          fontFamily={serifFamily}
          fontSize={46}
          fontWeight={600}
          letterSpacing="0.32em"
          fill={color}
        >
          <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
        <text
          fontFamily={serifFamily}
          fontSize={30}
          fontWeight={500}
          letterSpacing="0.4em"
          fill={color}
        >
          <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
            {subText}
          </textPath>
        </text>
        <circle cx={c - 226} cy={c} r={5} fill={color} />
        <circle cx={c + 226} cy={c} r={5} fill={color} />
        <g transform={`translate(${c}, ${c - 52})`}>
          <PaperPlane size={34} color={color} angleDeg={-18} />
        </g>
        <text
          x={c}
          y={c + 46}
          fontFamily={serifFamily}
          fontSize={54}
          fontWeight={600}
          letterSpacing="0.18em"
          fill={color}
          textAnchor="middle"
        >
          {centerText}
        </text>
        <line
          x1={c - 110}
          y1={c + 86}
          x2={c + 110}
          y2={c + 86}
          stroke={color}
          strokeWidth={2.5}
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
