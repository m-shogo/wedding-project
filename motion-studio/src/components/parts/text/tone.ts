// textパーツ共通の色トーン解決。色は必ず theme.ts から取る(直書き禁止)。
import {colors} from '../../../data/theme';

export type TextTone = 'ivory' | 'navy' | 'gold';

// 本文・主役文字の色
export const toneColor = (tone: TextTone): string => {
  switch (tone) {
    case 'navy':
      return colors.navy;
    case 'gold':
      return colors.goldLight;
    case 'ivory':
    default:
      return colors.ivory;
  }
};

// サブ文字・細線・小装飾のアクセント色
export const toneAccent = (tone: TextTone): string => {
  switch (tone) {
    case 'navy':
      return colors.gold;
    case 'gold':
      return colors.gold;
    case 'ivory':
    default:
      return colors.goldLight;
  }
};

// 暗背景に重ねる前提のとき読みやすさのため付ける影。
// navyトーン(=明背景に置く濃い文字)のときは影を弱める。
export const toneShadow = (tone: TextTone): string =>
  tone === 'navy' ? '0 1px 4px rgba(0,0,0,0.18)' : '0 2px 14px rgba(0,0,0,0.45)';
