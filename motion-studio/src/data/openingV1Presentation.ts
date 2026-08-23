export type OpeningPhotoMotion = 'static' | 'push' | 'drift-left' | 'drift-right';
export type OpeningPhotoFit = 'cover' | 'contain';
export type OpeningMemoryLayout = 'full' | 'left' | 'right' | 'wide';
export type OpeningMemoryPattern = 'okinawa' | 'seoul' | 'hawaii';

export type OpeningPhotoFocus = {
  x: number;
  y: number;
};

export type OpeningMemoryPresentation = {
  layout: OpeningMemoryLayout;
  motion: OpeningPhotoMotion;
  focus: OpeningPhotoFocus;
};

export type OpeningHeroPresentation = {
  fit: OpeningPhotoFit;
  motion: OpeningPhotoMotion;
  focus: OpeningPhotoFocus;
};

const center: OpeningPhotoFocus = {x: 50, y: 50};

// 実写真を入れた後のcrop/focus/motion調整は、まずこのファイルだけを触る。
// JSXへ写真ごとの例外を増やさない。
// focusはCSS object-positionの百分率。0〜100の範囲で指定する。
export const openingV1Presentation = {
  coldOpen: {
    fit: 'contain',
    motion: 'static',
    focus: center,
  },
  memories: {
    okinawa: [
      {layout: 'full', motion: 'static', focus: center},
      {layout: 'left', motion: 'drift-left', focus: center},
      {layout: 'wide', motion: 'static', focus: center},
    ],
    seoul: [
      {layout: 'right', motion: 'static', focus: center},
      {layout: 'full', motion: 'drift-right', focus: center},
      {layout: 'left', motion: 'static', focus: center},
    ],
    hawaii: [
      {layout: 'full', motion: 'static', focus: center},
      {layout: 'wide', motion: 'push', focus: center},
      {layout: 'right', motion: 'static', focus: center},
    ],
  },
  heroes: {
    a: {
      fit: 'contain',
      motion: 'push',
      focus: center,
    },
    b: {
      fit: 'contain',
      motion: 'static',
      focus: center,
    },
  },
} satisfies {
  coldOpen: OpeningHeroPresentation;
  memories: Record<
    OpeningMemoryPattern,
    readonly [OpeningMemoryPresentation, OpeningMemoryPresentation, OpeningMemoryPresentation]
  >;
  heroes: {
    a: OpeningHeroPresentation;
    b: OpeningHeroPresentation;
  };
};

export const focusToObjectPosition = (focus: OpeningPhotoFocus): string => {
  if (
    !Number.isFinite(focus.x) ||
    !Number.isFinite(focus.y) ||
    focus.x < 0 ||
    focus.x > 100 ||
    focus.y < 0 ||
    focus.y > 100
  ) {
    throw new Error(`Opening V1 focus must stay within 0-100: ${focus.x}, ${focus.y}`);
  }

  return `${focus.x}% ${focus.y}%`;
};
