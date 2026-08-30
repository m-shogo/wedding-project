export type DummySceneLayout = 'hero' | 'split' | 'contact-sheet' | 'postcard' | 'filmstrip' | 'diagonal' | 'grid';
export type DummySceneMotion = 'push' | 'pull' | 'pan-left' | 'pan-right' | 'tilt';
export type DummySceneTransition = 'hard' | 'flash' | 'shape' | 'route' | 'paper' | 'shutter';

export type DummyStoryScene = {
  photoIndex: number;
  eyebrow: string;
  title: string;
  note: string;
  layout: DummySceneLayout;
  motion: DummySceneMotion;
  transition: DummySceneTransition;
  accent: string;
};

// Human-readable dummy timeline authority. Layout / motion / transitionをScene単位で
// 変更でき、11枚の差し替え時に巨大なJSXを触らず演出密度を調整できる。
export const motionZukanDummyStory: readonly DummyStoryScene[] = [
  {photoIndex: 0, eyebrow: 'CHAPTER 01 · THE BEGINNING', title: 'OUR JOURNEY', note: 'Every adventure starts somewhere.', layout: 'hero', motion: 'push', transition: 'hard', accent: '#f4c95d'},
  {photoIndex: 1, eyebrow: 'OKINAWA · 2019', title: 'SUN & SEA', note: 'First destination, countless memories.', layout: 'split', motion: 'pan-right', transition: 'shape', accent: '#66d5df'},
  {photoIndex: 2, eyebrow: 'DETAILS WE KEEP', title: 'LITTLE THINGS', note: 'The smallest moments stay the longest.', layout: 'contact-sheet', motion: 'pull', transition: 'flash', accent: '#f2a65a'},
  {photoIndex: 3, eyebrow: 'CHAPTER 02 · TOGETHER', title: 'FAMILY TIME', note: 'A warm place to return to.', layout: 'postcard', motion: 'tilt', transition: 'paper', accent: '#ff8f70'},
  {photoIndex: 4, eyebrow: 'SEOUL · 2022', title: 'CITY RHYTHM', note: 'New streets. Same two people.', layout: 'filmstrip', motion: 'pan-left', transition: 'shutter', accent: '#ff557f'},
  {photoIndex: 5, eyebrow: 'ROUTE 03 · NEXT STOP', title: 'KEEP MOVING', note: 'The line continues beyond the map.', layout: 'hero', motion: 'push', transition: 'route', accent: '#f4c95d'},
  {photoIndex: 6, eyebrow: 'PROMISE · IN DETAIL', title: 'ONE DAY', note: 'A promise held close.', layout: 'diagonal', motion: 'pull', transition: 'flash', accent: '#c6a0ff'},
  {photoIndex: 7, eyebrow: 'CHAPTER 03 · OUR PEOPLE', title: 'ALL TOGETHER', note: 'Every smile became part of the story.', layout: 'grid', motion: 'pan-right', transition: 'shape', accent: '#79d48c'},
  {photoIndex: 8, eyebrow: 'CELEBRATION · 2026', title: 'BEST NIGHT', note: 'The room filled with laughter.', layout: 'contact-sheet', motion: 'pan-left', transition: 'shutter', accent: '#ffca5c'},
  {photoIndex: 9, eyebrow: 'THE DETAILS · FOREVER', title: 'WITH LOVE', note: 'Made of moments, sealed with a promise.', layout: 'postcard', motion: 'tilt', transition: 'paper', accent: '#ffa5b5'},
  {photoIndex: 10, eyebrow: 'NEXT DESTINATION · YOKOHAMA', title: 'HERE WE GO', note: 'Our greatest adventure begins today.', layout: 'hero', motion: 'push', transition: 'route', accent: '#f4c95d'},
] as const;
