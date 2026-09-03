// StaRt Wedding Edit: 曲の先頭 〜 2番サビ後の間奏が終わる地点までの区間設計。
//
// 129秒固定・14 section固定は無効化された旧仕様(docs/decisions/2026-08-25-
// start-wedding-edit-scope-change.md 参照)。ここでは実測(ffmpeg解析)の
// 音楽構造がsource of truth。durationInFramesはgenerated.tsのsourceEndSecから算出する。

export const START_WEDDING_EDIT_FPS = 30;

export type WeddingEditSection = {
  id: string;
  labelJa: string;
  startSec: number;
  endSec: number;
  role: 'intro' | 'verse' | 'prechorus' | 'chorus' | 'interlude-beat';
};

// 0-114.0sはlyrics-wedding-edit.local.jsonのsectionIdと一致させる。
// 114.0-145.6s(間奏)はビート単位の演出区間として細分する(section 6の指示: montage/Welcome/名前/StaRt callback/End)。
export const WEDDING_EDIT_SECTIONS: WeddingEditSection[] = [
  {id: 'intro', labelJa: '冒頭 S Animation', startSec: 0, endSec: 12.5, role: 'intro'},
  {id: 'verse-1a', labelJa: '1番a', startSec: 12.5, endSec: 22.0, role: 'verse'},
  {id: 'verse-1b', labelJa: '1番b', startSec: 22.0, endSec: 30.0, role: 'verse'},
  {id: 'prechorus-1', labelJa: '1番プリコーラス', startSec: 30.0, endSec: 33.0, role: 'prechorus'},
  {id: 'chorus-1', labelJa: '1番サビ', startSec: 33.0, endSec: 63.0, role: 'chorus'},
  {id: 'verse-2a', labelJa: '2番a', startSec: 63.0, endSec: 73.0, role: 'verse'},
  {id: 'verse-2b', labelJa: '2番b', startSec: 73.0, endSec: 80.0, role: 'verse'},
  {id: 'prechorus-2', labelJa: '2番プリコーラス', startSec: 80.0, endSec: 82.0, role: 'prechorus'},
  {id: 'chorus-2', labelJa: '2番サビ', startSec: 82.0, endSec: 114.0, role: 'chorus'},
  {id: 'interlude-montage', labelJa: '間奏: 旅の総集編montage', startSec: 114.0, endSec: 124.0, role: 'interlude-beat'},
  {id: 'interlude-route', labelJa: '間奏: Sの光跡 → route callback', startSec: 124.0, endSec: 132.0, role: 'interlude-beat'},
  {id: 'interlude-welcome', labelJa: '間奏: Welcomeメッセージ', startSec: 132.0, endSec: 138.0, role: 'interlude-beat'},
  {id: 'interlude-names', labelJa: '間奏: 新郎新婦名・日付', startSec: 138.0, endSec: 142.0, role: 'interlude-beat'},
  {id: 'interlude-end', labelJa: '間奏: StaRt motif callback → End lockup', startSec: 142.0, endSec: 145.6, role: 'interlude-beat'},
];

export const secToFrame = (sec: number): number => Math.round(sec * START_WEDDING_EDIT_FPS);

export const weddingEditSectionFrames = (
  section: WeddingEditSection,
): {from: number; durationInFrames: number} => {
  const from = secToFrame(section.startSec);
  const to = secToFrame(section.endSec);
  return {from, durationInFrames: Math.max(1, to - from)};
};
