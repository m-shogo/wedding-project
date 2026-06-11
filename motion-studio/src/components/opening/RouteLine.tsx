import {evolvePath} from '@remotion/paths';

type Props = {
  d: string;
  progress: number;
  color: string;
  strokeWidth: number;
  idSuffix?: string;
};

// 点線の航路がprogressに合わせて先端から描かれていくライン。
// 点線パターンとdraw-onを両立するため、実線のevolvePathをマスクに使う。
export const RouteLine = ({d, progress, color, strokeWidth, idSuffix = 'a'}: Props) => {
  const evolution = evolvePath(progress, d);
  const maskId = `route-mask-${idSuffix}`;
  return (
    <>
      <mask id={maskId}>
        <path
          d={d}
          fill="none"
          stroke="#fff"
          strokeWidth={strokeWidth * 4}
          strokeDasharray={evolution.strokeDasharray}
          strokeDashoffset={evolution.strokeDashoffset}
          strokeLinecap="round"
        />
      </mask>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`0.5 ${strokeWidth * 3.2}`}
        strokeLinecap="round"
        mask={`url(#${maskId})`}
      />
    </>
  );
};
