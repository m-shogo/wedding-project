// StaRt 129秒・3案ショーケース 共通14区間定義。
//
// A案(旅の記録映画) / B案(冒険アニメOP) / C案(リズム・タイポMV) は
// この区間・秒数・歌詞slot範囲を共有する。演出だけを案ごとに変える。
//
// Final timingではない。docs/opening-authority.md の方針どおり、
// 正規ローカル音源の波形とMarkerが揃うまでは研究比較用の秒数(研究値)。
//
// fps=30, 129秒 = 3870 frames。

export const START_129_FPS = 30;
export const START_129_DURATION_SECONDS = 129;
export const START_129_DURATION_FRAMES = START_129_DURATION_SECONDS * START_129_FPS;

export type Start129SectionId =
  | 'opening-pickup'
  | 'intro'
  | 'verse-1a'
  | 'verse-1b'
  | 'chorus-1a'
  | 'chorus-1b'
  | 'interlude-1'
  | 'verse-2a'
  | 'verse-2b'
  | 'chorus-2a'
  | 'chorus-2b'
  | 'interlude-2a'
  | 'interlude-2b'
  | 'end';

export type Start129Section = {
  id: Start129SectionId;
  order: number;
  labelJa: string;
  startSec: number;
  endSec: number;
  /** この区間で使う歌詞slot ID範囲(閉区間)。無い区間はnull。 */
  lyricSlotRange: [number, number] | null;
  /** 台本上この区間が担う役割(すべて日本語)。演出の免許ではなく制約。 */
  roleJa: string;
};

const raw: Array<Omit<Start129Section, 'order'>> = [
  {
    id: 'opening-pickup',
    labelJa: 'Opening pickup',
    startSec: 0,
    endSec: 7,
    lyricSlotRange: null,
    roleJa: '最初の1枚と挨拶。騒がせない',
  },
  {
    id: 'intro',
    labelJa: 'Intro',
    startSec: 7,
    endSec: 17,
    lyricSlotRange: null,
    roleJa: '旅の始まり。期待を積む',
  },
  {
    id: 'verse-1a',
    labelJa: '1A',
    startSec: 17,
    endSec: 28,
    lyricSlotRange: [1, 4],
    roleJa: '最初の旅の記憶',
  },
  {
    id: 'verse-1b',
    labelJa: '1B',
    startSec: 28,
    endSec: 38,
    lyricSlotRange: [5, 8],
    roleJa: '遊びとサビ前の溜め',
  },
  {
    id: 'chorus-1a',
    labelJa: '1サビA',
    startSec: 38,
    endSec: 48,
    lyricSlotRange: [9, 12],
    roleJa: '最初のHero peak',
  },
  {
    id: 'chorus-1b',
    labelJa: '1サビB',
    startSec: 48,
    endSec: 58,
    lyricSlotRange: [13, 16],
    roleJa: '3-hit。ただしHero保持',
  },
  {
    id: 'interlude-1',
    labelJa: '間奏1',
    startSec: 58,
    endSec: 68,
    lyricSlotRange: null,
    roleJa: '文法を一度変え、2番へ再出発',
  },
  {
    id: 'verse-2a',
    labelJa: '2A',
    startSec: 68,
    endSec: 78,
    lyricSlotRange: [17, 20],
    roleJa: '1番と異なる画角・素材',
  },
  {
    id: 'verse-2b',
    labelJa: '2B',
    startSec: 78,
    endSec: 88,
    lyricSlotRange: [21, 24],
    roleJa: '遊びを増やし、次の溜め',
  },
  {
    id: 'chorus-2a',
    labelJa: '2サビA',
    startSec: 88,
    endSec: 98,
    lyricSlotRange: [25, 28],
    roleJa: '最大Hero peak',
  },
  {
    id: 'chorus-2b',
    labelJa: '2サビB',
    startSec: 98,
    endSec: 108,
    lyricSlotRange: [29, 32],
    roleJa: '2回目の3-hit',
  },
  {
    id: 'interlude-2a',
    labelJa: '間奏2A',
    startSec: 108,
    endSec: 118,
    lyricSlotRange: null,
    roleJa: '旅の総集編。熱を逃がす',
  },
  {
    id: 'interlude-2b',
    labelJa: '間奏2B',
    startSec: 118,
    endSec: 126,
    lyricSlotRange: null,
    roleJa: '横浜・会場・現在へ収束',
  },
  {
    id: 'end',
    labelJa: 'End',
    startSec: 126,
    endSec: 129,
    lyricSlotRange: null,
    roleJa: '名前・日付・歓迎。Cメロ前に着地',
  },
];

export const START_129_SECTIONS: Start129Section[] = raw.map((section, index) => ({
  ...section,
  order: index,
}));

export const start129SectionFrames = (section: Start129Section) => ({
  from: Math.round(section.startSec * START_129_FPS),
  durationInFrames: Math.round((section.endSec - section.startSec) * START_129_FPS),
});

export const findStart129SectionAtSecond = (sec: number): Start129Section => {
  const found = START_129_SECTIONS.find((s) => sec >= s.startSec && sec < s.endSec);
  return found ?? START_129_SECTIONS[START_129_SECTIONS.length - 1];
};

export const START_129_QA_STILL_SECONDS = [
  0, 7, 17, 28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 126, 128,
] as const;
