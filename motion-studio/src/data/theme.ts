// Style Bible (docs/02_style-bible.md) から落とし込んだデザイントークン。
// 色・フォント・質感はここだけで管理し、各コンポーネントはこれを参照する。

export const colors = {
  navy: '#1C2A44',
  navyDeep: '#10192C',
  ivory: '#F7F2E9',
  beige: '#EDE5D4',
  beigeDark: '#DDD2BA',
  gold: '#B89B5E',
  goldLight: '#C9B27C',
  roseGold: '#A8666F',
  charcoal: '#2B2B2B',
  white: '#FFFFFF',
  cloud: '#F4F1EC',
} as const;

export const fonts = {
  serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

export const video = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const letterSpacing = {
  wide: '0.25em',
  medium: '0.12em',
} as const;
