type Props = {
  opacity?: number;
  seed?: number;
  id?: string;
};

// 紙のような微細なグレインを画面全体に乗せる。
export const PaperTexture = ({opacity = 0.05, seed = 7, id = 'paper'}: Props) => {
  const filterId = `${id}-${seed}`;
  return (
    <svg
      width="100%"
      height="100%"
      style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={2}
          seed={seed}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity={opacity} />
    </svg>
  );
};
