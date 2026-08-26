// StaRt Wedding Edit(曲の先頭〜2番サビ後の間奏まで)の shot storyboard。
//
// 129秒固定・14 section固定(旧Start129)のsection一覧とは別物。
// WEDDING_EDIT_SECTIONS(sections.ts)を唯一のsection正本として使う。
// Shot型・entry/motion/layout/effectの語彙とShotRenderer実装は
// start129/storyboard.ts・start129/shotEngine.tsxのものをそのまま再利用する
// (frame数学とrender方法は音源の長さに依存しない汎用部品のため)。

import type {Start129AssetRole} from '../start129/assetRoles';
import type {Shot, ShotEffect, ShotEntry, ShotLayout, ShotMotion} from '../start129/storyboard';
import {entryOverlapFrames} from '../start129/storyboard';
import {START_WEDDING_EDIT_FPS, WEDDING_EDIT_SECTIONS, type WeddingEditSection} from './sections';

export {entryOverlapFrames};
export type {Shot, ShotEntry};

export type WeddingVariant = 'A' | 'B' | 'C';

export type SectionDesign = {
  sectionId: string;
  narrativeJa: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  shots: Shot[];
};

export type PlacedShot = Shot & {localFrom: number; durationInFrames: number; index: number};

export const placeShots = (design: SectionDesign, section: WeddingEditSection): PlacedShot[] => {
  const total = Math.round((section.endSec - section.startSec) * START_WEDDING_EDIT_FPS);
  const raw = design.shots.map((s) => Math.max(1, Math.round(s.sec * START_WEDDING_EDIT_FPS)));
  const sum = raw.reduce((a, b) => a + b, 0);
  const placed: PlacedShot[] = [];
  let cursor = 0;
  design.shots.forEach((shot, i) => {
    const isLast = i === design.shots.length - 1;
    let dur = raw[i];
    if (isLast) dur = total - cursor;
    else if (sum !== total) dur = Math.max(1, Math.round((raw[i] / sum) * total));
    placed.push({...shot, localFrom: cursor, durationInFrames: dur, index: i});
    cursor += dur;
  });
  const last = placed[placed.length - 1];
  if (last) last.durationInFrames = total - last.localFrom;
  return placed;
};

const r = (role: Start129AssetRole, variantIndex: number) => ({role, variantIndex});

// ---- motion/entry/layout/effect helper(型の完全なobject shapeをここで一元管理) ----
const stat = (): ShotMotion => ({kind: 'static'});
const push = (from: number, to: number): ShotMotion => ({kind: 'push-in', from, to});
const pull = (from: number, to: number): ShotMotion => ({kind: 'pull-out', from, to});
const pan = (dx: number): ShotMotion => ({kind: 'pan', dx});
const drift = (dx: number, dy: number, scale = 1.01): ShotMotion => ({kind: 'drift', dx, dy, scale});

const fade = (frames: number): ShotEntry => ({kind: 'fade', frames});
const dissolve = (frames: number): ShotEntry => ({kind: 'dissolve', frames});
const wipe = (frames: number, dir: 'left' | 'right' | 'up' | 'down'): ShotEntry => ({kind: 'wipe', frames, dir});
const iris = (frames: number): ShotEntry => ({kind: 'iris', frames});
const whip = (frames: number, dir: 'left' | 'right'): ShotEntry => ({kind: 'whip', frames, dir});
const colorBlock = (frames: number, color: string, dir: 'left' | 'right' = 'left'): ShotEntry => ({
  kind: 'color-block',
  frames,
  color,
  dir,
});
const scalePop = (frames: number): ShotEntry => ({kind: 'scale-pop', frames});
const slat = (frames: number, count: number): ShotEntry => ({kind: 'slat', frames, count});

const grain = (opacity = 0.2): ShotEffect => ({kind: 'grain', opacity});
const lightLeak = (opacity = 0.25, side: 'left' | 'right' = 'left'): ShotEffect => ({kind: 'light-leak', opacity, side});
const vignette = (strength = 0.3): ShotEffect => ({kind: 'vignette', strength});
const glint = (x = 50, y = 50): ShotEffect => ({kind: 'glint', x, y});
const halftone = (opacity = 0.35): ShotEffect => ({kind: 'halftone', opacity});
const speedLines = (intensity = 0.5): ShotEffect => ({kind: 'speed-lines', intensity});

const split2: ShotLayout = {kind: 'split-2'};
const strip3: ShotLayout = {kind: 'strip-3'};
const panel4: ShotLayout = {kind: 'panel-4'};
const gridEditorial: ShotLayout = {kind: 'grid-editorial'};

// ---- A案: 旅の記録映画 / CINEMATIC EMOTIONAL ----
// push-in・dissolve・light leak・余白。静かでも光と奥行きで演出する。
const A_SHOTS: Record<string, Shot[]> = {
  'verse-1a': [
    {role: 'DEPARTURE', variantIndex: 1, sec: 2.4, motion: stat(), entry: fade(10), effects: [grain()], noteJa: '幕開け。静かな出発点'},
    {role: 'DEPARTURE', variantIndex: 2, sec: 2.4, motion: push(1.0, 1.03), entry: dissolve(14), noteJa: '寄って集って、の集まる感覚'},
    {role: 'OKINAWA_WIDE', variantIndex: 1, sec: 2.3, motion: drift(14.0, 0.0, 1.01), entry: dissolve(14), effects: [lightLeak()], noteJa: 'スタートライン=水平線'},
    {role: 'HERO_WIDE', variantIndex: 1, sec: 2.4, motion: stat(), entry: fade(10), focus: {x: 50, y: 60}, noteJa: '登場、二人の始まり'},
  ],
  'verse-1b': [
    {role: 'BROLL_TEXTURE', variantIndex: 1, sec: 1.9, motion: drift(10.0, 6.0, 1.01), entry: dissolve(12), noteJa: '遊び心の質感'},
    {role: 'SEOUL_STREET', variantIndex: 1, sec: 2.0, motion: pan(-18), entry: dissolve(12), noteJa: '策略=街の駆け引き感'},
    {role: 'BROLL_WALK', variantIndex: 1, sec: 2.0, motion: push(1.0, 1.025), entry: dissolve(12), noteJa: 'マヌケ=気取らない足取り'},
    {role: 'HERO_CLOSE', variantIndex: 1, sec: 1.9, motion: stat(), entry: fade(10), noteJa: '正すこと=手元の誠実さ'},
  ],
  'prechorus-1': [
    {role: 'NEGATIVE_SPACE', variantIndex: 1, sec: 1.5, motion: stat(), entry: fade(10), effects: [vignette()], noteJa: '幸せな時間、の間'},
    {role: 'HERO_WIDE', variantIndex: 2, sec: 1.5, motion: push(1.0, 1.02), entry: dissolve(10), noteJa: '試されよう、で溜め'},
  ],
  'chorus-1': [
    {role: 'HAWAII_WARM', variantIndex: 1, sec: 5.0, motion: drift(30.0, 5.0, 1.03), entry: dissolve(16), effects: [lightLeak()], noteJa: '晴れた町に=解放の光'},
    {role: 'SEOUL_STREET', variantIndex: 2, sec: 5.0, motion: drift(-27.5, 0.0, 1.028), entry: dissolve(16), effects: [grain()], noteJa: '雨の心=対比の質感'},
    {role: 'HERO_WIDE', variantIndex: 3, sec: 6.0, motion: drift(36.0, 5.0, 1.03), entry: dissolve(16), noteJa: '独りじゃない、二人の画'},
    {role: 'HERO_CLOSE', variantIndex: 2, sec: 6.0, motion: drift(33.0, 4.0, 1.028), entry: fade(14), effects: [glint(52, 46)], noteJa: '探すんだ、へ向かう眼差し'},
    {role: 'OKINAWA_WIDE', variantIndex: 2, sec: 4.0, motion: pull(1.05, 1.0), entry: dissolve(16), noteJa: '広がる海、開放の残響'},
    {role: 'BROLL_TEXTURE', variantIndex: 2, sec: 4.0, motion: drift(8.0, 8.0, 1.01), entry: dissolve(16), effects: [grain()], noteJa: '余韻。次章への静かな接続'},
  ],
  'verse-2a': [
    {role: 'NEGATIVE_SPACE', variantIndex: 2, sec: 2.5, motion: stat(), entry: fade(10), noteJa: 'P016静寂ビート(1名negative space)'},
    {role: 'BROLL_TEXTURE', variantIndex: 3, sec: 2.5, motion: drift(12.0, 0.0, 1.01), entry: dissolve(12), noteJa: '俄然負けん気'},
    {role: 'SEOUL_STREET', variantIndex: 3, sec: 2.5, motion: pan(16), entry: dissolve(12), noteJa: 'スタート合図'},
    {role: 'HERO_CLOSE', variantIndex: 3, sec: 2.5, motion: stat(), entry: fade(10), noteJa: '苦悩と煩と悩は上等'},
  ],
  'verse-2b': [
    {role: 'DETAIL_HAND', variantIndex: 1, sec: 1.75, motion: push(1.0, 1.02), entry: dissolve(10), noteJa: '時既に戦の場'},
    {role: 'BROLL_WALK', variantIndex: 2, sec: 1.75, motion: drift(-10.0, 0.0, 1.01), entry: dissolve(10), noteJa: 'ナニヶ原'},
    {role: 'HAWAII_WARM', variantIndex: 2, sec: 1.75, motion: stat(), entry: fade(10), noteJa: 'なで肩が泣く'},
    {role: 'HERO_WIDE', variantIndex: 4, sec: 1.75, motion: push(1.0, 1.02), entry: dissolve(10), noteJa: 'なで肩ブーム、軽い笑い'},
  ],
  'prechorus-2': [
    {role: 'NEGATIVE_SPACE', variantIndex: 3, sec: 1.0, motion: stat(), entry: fade(8), noteJa: '忘れたくないなぁ'},
    {role: 'HERO_CLOSE', variantIndex: 4, sec: 1.0, motion: push(1.0, 1.02), entry: dissolve(8), noteJa: 'P026冒頭Sモチーフ回想'},
  ],
  'chorus-2': [
    {role: 'HAWAII_WARM', variantIndex: 3, sec: 5.0, motion: drift(30.0, 5.0, 1.03), entry: dissolve(16), effects: [lightLeak()], noteJa: '晴れた町に(2回目)'},
    {role: 'SEOUL_STREET', variantIndex: 4, sec: 5.0, motion: drift(-27.5, 0.0, 1.028), entry: dissolve(16), effects: [grain()], noteJa: '雨の心(2回目)'},
    {role: 'HERO_WIDE', variantIndex: 5, sec: 7.0, motion: drift(42.0, 5.0, 1.03), entry: dissolve(18), noteJa: '否定してくれる貴方を=最も個人的な一行'},
    {role: 'HERO_CLOSE', variantIndex: 5, sec: 7.0, motion: drift(38.5, 4.0, 1.028), entry: fade(16), effects: [glint(50, 48)], noteJa: '貴方を、寄りで感情のhold'},
    {role: 'HERO_WIDE', variantIndex: 6, sec: 8.0, motion: drift(-48.0, 5.0, 1.03), entry: dissolve(18), effects: [lightLeak()], noteJa: 'P015/P030 サビ着地Hero'},
  ],
  'interlude-montage': [
    {role: 'OKINAWA_WIDE', variantIndex: 3, sec: 2.5, motion: pull(1.04, 1.0), entry: dissolve(12), noteJa: '旅の総集編: 沖縄wide'},
    {role: 'HERO_CLOSE', variantIndex: 6, sec: 2.5, motion: push(1.0, 1.03), entry: dissolve(12), noteJa: 'close-up'},
    {role: 'HAWAII_WARM', variantIndex: 4, sec: 2.5, motion: drift(12.0, 0.0, 1.01), entry: dissolve(12), noteJa: 'ハワイwide'},
    {role: 'HERO_WIDE', variantIndex: 7, sec: 2.5, motion: pull(1.03, 1.0), entry: dissolve(12), noteJa: 'wideで締める'},
  ],
  'interlude-route': [
    {role: 'ARRIVAL_YOKOHAMA', variantIndex: 1, sec: 4.0, motion: drift(10.0, 0.0, 1.01), entry: dissolve(14), effects: [lightLeak()], noteJa: 'Sの光跡→横浜へのroute'},
    {role: 'ARRIVAL_YOKOHAMA', variantIndex: 2, sec: 4.0, motion: push(1.0, 1.03), entry: dissolve(14), noteJa: '到着'},
  ],
  'interlude-welcome': [
    {role: 'NEGATIVE_SPACE', variantIndex: 4, sec: 6.0, motion: drift(33.0, 4.0, 1.028), entry: fade(14), effects: [vignette()], noteJa: 'Welcomeメッセージの背景'},
  ],
  'interlude-names': [
    {role: 'HERO_WIDE', variantIndex: 8, sec: 4.0, motion: drift(6.0, 4.0, 1.007), entry: fade(12), noteJa: '名前・日付の背景'},
  ],
  'interlude-end': [
    {role: 'END_BREATH', variantIndex: 1, sec: 3.6, motion: push(1.0, 1.02), entry: fade(14), effects: [glint(50, 52)], noteJa: 'StaRt callback→End lockup'},
  ],
};

// ---- B案: 冒険アニメOP / JOYFUL ANIME OPENING ----
// panel・whip・color block・3-hit・speed line。写真は常に主役。
const B_SHOTS: Record<string, Shot[]> = {
  'verse-1a': [
    {role: 'DEPARTURE', variantIndex: 1, sec: 2.4, motion: stat(), entry: scalePop(8), effects: [speedLines()], noteJa: '幕開け、popで景気よく'},
    {role: 'DEPARTURE', variantIndex: 3, sec: 2.4, motion: push(1.0, 1.04), entry: whip(8, 'right'), layout: split2, extraRoles: [r('BROLL_WALK', 1)], noteJa: 'お手を拝借=2分割で仲間感'},
    {role: 'OKINAWA_WIDE', variantIndex: 4, sec: 2.3, motion: drift(18.0, 0.0, 1.01), entry: wipe(8, 'right'), noteJa: 'スタートライン'},
    {role: 'HERO_WIDE', variantIndex: 9, sec: 2.4, motion: stat(), entry: colorBlock(8, '#F4C95D'), effects: [halftone()], noteJa: '登場！を色面で強調'},
  ],
  'verse-1b': [
    {role: 'BROLL_TEXTURE', variantIndex: 4, sec: 1.9, motion: drift(10.0, 6.0, 1.01), entry: wipe(8, 'up'), noteJa: '遊び心'},
    {role: 'SEOUL_STREET', variantIndex: 5, sec: 2.0, motion: pan(-20), entry: whip(8, 'left'), effects: [speedLines()], noteJa: '策略のスピード感'},
    {role: 'BROLL_WALK', variantIndex: 3, sec: 2.0, motion: push(1.0, 1.03), entry: scalePop(8), noteJa: 'マヌケ、コミカルに'},
    {role: 'HERO_CLOSE', variantIndex: 3, sec: 1.9, motion: stat(), entry: colorBlock(8, '#5B7FDE'), noteJa: '正すこと'},
  ],
  'prechorus-1': [
    {role: 'NEGATIVE_SPACE', variantIndex: 5, sec: 1.5, motion: stat(), entry: wipe(6, 'left'), noteJa: '幸せな時間、で一瞬静止'},
    {role: 'HERO_WIDE', variantIndex: 10, sec: 1.5, motion: push(1.0, 1.03), entry: scalePop(6), effects: [speedLines()], noteJa: '試されよう、で溜めて加速'},
  ],
  'chorus-1': [
    {role: 'HAWAII_WARM', variantIndex: 5, sec: 2.2, motion: stat(), entry: colorBlock(6, '#F4C95D'), effects: [halftone()], noteJa: '3-hit 1/3: パッ'},
    {role: 'HAWAII_WARM', variantIndex: 6, sec: 2.2, motion: push(1.0, 1.05), entry: scalePop(6), layout: strip3, extraRoles: [r('OKINAWA_WIDE', 3), r('SEOUL_STREET', 6)], noteJa: '3-hit 2/3: 晴れた町に、panel化'},
    {role: 'HERO_WIDE', variantIndex: 11, sec: 2.6, motion: pull(1.06, 1.0), entry: wipe(8, 'right'), effects: [speedLines()], noteJa: '3-hit 3/3: Hero着地'},
    {role: 'SEOUL_STREET', variantIndex: 7, sec: 5.0, motion: drift(-27.5, 0.0, 1.028), entry: whip(8, 'left'), effects: [grain()], noteJa: 'チャプチャプチャプ雨の心'},
    {role: 'HERO_CLOSE', variantIndex: 4, sec: 6.0, motion: drift(33.0, 4.0, 1.028), entry: colorBlock(8, '#5B7FDE'), noteJa: 'P014 統合Hero'},
    {role: 'HERO_WIDE', variantIndex: 12, sec: 12.0, motion: drift(72.0, 5.0, 1.03), entry: scalePop(10), effects: [halftone(), speedLines()], noteJa: 'P015/P030 Hero burst→hold'},
  ],
  'verse-2a': [
    {role: 'NEGATIVE_SPACE', variantIndex: 6, sec: 2.5, motion: stat(), entry: wipe(6, 'down'), noteJa: 'P016静寂ビート(1名negative space)'},
    {role: 'BROLL_TEXTURE', variantIndex: 5, sec: 2.5, motion: drift(14.0, 0.0, 1.01), entry: whip(6, 'left'), noteJa: '俄然負けん気'},
    {role: 'SEOUL_STREET', variantIndex: 8, sec: 2.5, motion: pan(18), entry: scalePop(6), noteJa: 'スタート合図'},
    {role: 'HERO_CLOSE', variantIndex: 5, sec: 2.5, motion: stat(), entry: colorBlock(6, '#E5615B'), noteJa: '苦悩と煩と悩は上等'},
  ],
  'verse-2b': [
    {role: 'DETAIL_HAND', variantIndex: 2, sec: 1.75, motion: push(1.0, 1.03), entry: wipe(6, 'left'), noteJa: '時既に戦の場'},
    {role: 'BROLL_WALK', variantIndex: 4, sec: 1.75, motion: drift(-12.0, 0.0, 1.01), entry: whip(6, 'right'), noteJa: 'ナニヶ原'},
    {role: 'HAWAII_WARM', variantIndex: 7, sec: 1.75, motion: stat(), entry: scalePop(6), noteJa: 'なで肩が泣く'},
    {role: 'HERO_WIDE', variantIndex: 13, sec: 1.75, motion: push(1.0, 1.03), entry: colorBlock(6, '#F4C95D'), noteJa: 'なで肩ブーム'},
  ],
  'prechorus-2': [
    {role: 'NEGATIVE_SPACE', variantIndex: 7, sec: 1.0, motion: stat(), entry: wipe(6, 'up'), noteJa: '忘れたくないなぁ'},
    {role: 'HERO_CLOSE', variantIndex: 6, sec: 1.0, motion: push(1.0, 1.03), entry: scalePop(6), noteJa: 'P026冒頭Sモチーフ回想'},
  ],
  'chorus-2': [
    {role: 'HAWAII_WARM', variantIndex: 8, sec: 2.2, motion: stat(), entry: colorBlock(6, '#F4C95D'), effects: [halftone()], noteJa: '3-hit 1/3(2回目)'},
    {role: 'HAWAII_WARM', variantIndex: 9, sec: 2.2, motion: push(1.0, 1.05), entry: scalePop(6), layout: strip3, extraRoles: [r('OKINAWA_WIDE', 5), r('SEOUL_STREET', 9)], noteJa: '3-hit 2/3(2回目)'},
    {role: 'HERO_WIDE', variantIndex: 14, sec: 2.6, motion: pull(1.06, 1.0), entry: wipe(8, 'right'), effects: [speedLines()], noteJa: '3-hit 3/3(2回目)'},
    {role: 'SEOUL_STREET', variantIndex: 10, sec: 5.0, motion: drift(-27.5, 0.0, 1.028), entry: whip(8, 'left'), noteJa: '雨の心(2回目)'},
    {role: 'HERO_CLOSE', variantIndex: 7, sec: 7.0, motion: drift(38.5, 4.0, 1.028), entry: colorBlock(8, '#5B7FDE'), noteJa: '否定してくれる貴方を'},
    {role: 'HERO_WIDE', variantIndex: 15, sec: 13.0, motion: drift(78.0, 5.0, 1.03), entry: scalePop(10), effects: [halftone(), speedLines()], layout: panel4, extraRoles: [r('OKINAWA_WIDE', 6), r('HAWAII_WARM', 10), r('SEOUL_STREET', 11)], noteJa: 'P015/P030 panel-4でHero burst'},
  ],
  'interlude-montage': [
    {role: 'OKINAWA_WIDE', variantIndex: 7, sec: 2.5, motion: pull(1.05, 1.0), entry: whip(8, 'left'), noteJa: 'パン・パン・パンcallback: 沖縄'},
    {role: 'HERO_CLOSE', variantIndex: 8, sec: 2.5, motion: push(1.0, 1.04), entry: scalePop(8), noteJa: 'close-up'},
    {role: 'HAWAII_WARM', variantIndex: 11, sec: 2.5, motion: drift(14.0, 0.0, 1.01), entry: wipe(8, 'down'), noteJa: 'ハワイ'},
    {role: 'HERO_WIDE', variantIndex: 16, sec: 2.5, motion: pull(1.04, 1.0), entry: colorBlock(8, '#F4C95D'), noteJa: '締め'},
  ],
  'interlude-route': [
    {role: 'ARRIVAL_YOKOHAMA', variantIndex: 3, sec: 4.0, motion: drift(12.0, 0.0, 1.01), entry: whip(8, 'right'), effects: [speedLines()], noteJa: '手描きroute→横浜'},
    {role: 'ARRIVAL_YOKOHAMA', variantIndex: 4, sec: 4.0, motion: push(1.0, 1.04), entry: scalePop(8), noteJa: '到着、色面で着地'},
  ],
  'interlude-welcome': [
    {role: 'NEGATIVE_SPACE', variantIndex: 8, sec: 6.0, motion: drift(33.0, 4.0, 1.028), entry: colorBlock(10, '#12100D'), noteJa: 'ようこそ'},
  ],
  'interlude-names': [
    {role: 'HERO_WIDE', variantIndex: 17, sec: 4.0, motion: drift(6.0, 4.0, 1.007), entry: scalePop(8), noteJa: '名前・日付'},
  ],
  'interlude-end': [
    {role: 'END_BREATH', variantIndex: 2, sec: 3.6, motion: push(1.0, 1.03), entry: colorBlock(10, '#F4C95D'), effects: [halftone()], noteJa: 'StaRt title再登場→frame完成'},
  ],
};

// ---- C案: リズム・タイポMV / EDITORIAL TYPOGRAPHY ----
// type mask・grid・baseline・photo strip・editorial composition。
const C_SHOTS: Record<string, Shot[]> = {
  'verse-1a': [
    {role: 'DEPARTURE', variantIndex: 1, sec: 2.4, motion: stat(), entry: slat(10, 4), noteJa: '幕開け、slatで開く'},
    {role: 'DEPARTURE', variantIndex: 4, sec: 2.4, motion: push(1.0, 1.02), entry: iris(10), layout: gridEditorial, noteJa: 'お手を拝借、gridへ'},
    {role: 'OKINAWA_WIDE', variantIndex: 5, sec: 2.3, motion: drift(10.0, 0.0, 1.01), entry: slat(10, 4), noteJa: 'スタートライン=baseline'},
    {role: 'HERO_WIDE', variantIndex: 18, sec: 2.4, motion: stat(), entry: iris(10), noteJa: '登場'},
  ],
  'verse-1b': [
    {role: 'BROLL_TEXTURE', variantIndex: 6, sec: 1.9, motion: drift(8.0, 6.0, 1.01), entry: slat(8, 3), noteJa: '遊び心'},
    {role: 'SEOUL_STREET', variantIndex: 12, sec: 2.0, motion: pan(-14), entry: iris(8), layout: strip3, extraRoles: [r('BROLL_WALK', 5), r('DETAIL_HAND', 3)], noteJa: '策略=photo strip'},
    {role: 'BROLL_WALK', variantIndex: 6, sec: 2.0, motion: push(1.0, 1.02), entry: slat(8, 3), noteJa: 'マヌケ'},
    {role: 'HERO_CLOSE', variantIndex: 9, sec: 1.9, motion: stat(), entry: iris(8), noteJa: '正すこと'},
  ],
  'prechorus-1': [
    {role: 'NEGATIVE_SPACE', variantIndex: 9, sec: 1.5, motion: stat(), entry: slat(8, 3), noteJa: '幸せな時間、余白'},
    {role: 'HERO_WIDE', variantIndex: 19, sec: 1.5, motion: push(1.0, 1.02), entry: iris(8), noteJa: '試されよう'},
  ],
  'chorus-1': [
    {role: 'HAWAII_WARM', variantIndex: 12, sec: 2.2, motion: stat(), entry: slat(6, 3), layout: gridEditorial, noteJa: '3-hit 1/3: type mask'},
    {role: 'HAWAII_WARM', variantIndex: 13, sec: 2.2, motion: push(1.0, 1.03), entry: iris(6), noteJa: '3-hit 2/3'},
    {role: 'HERO_WIDE', variantIndex: 20, sec: 2.6, motion: pull(1.04, 1.0), entry: slat(8, 4), noteJa: '3-hit 3/3'},
    {role: 'SEOUL_STREET', variantIndex: 13, sec: 5.0, motion: drift(-27.5, 0.0, 1.028), entry: iris(8), layout: split2, extraRoles: [r('OKINAWA_WIDE', 4)], noteJa: 'チャプチャプチャプ雨の心'},
    {role: 'HERO_CLOSE', variantIndex: 10, sec: 6.0, motion: drift(33.0, 4.0, 1.028), entry: slat(10, 4), noteJa: 'P014 統合Hero'},
    {role: 'HERO_WIDE', variantIndex: 21, sec: 12.0, motion: drift(72.0, 5.0, 1.03), entry: iris(10), layout: gridEditorial, noteJa: 'P015/P030 gridで着地'},
  ],
  'verse-2a': [
    {role: 'NEGATIVE_SPACE', variantIndex: 10, sec: 2.5, motion: stat(), entry: slat(6, 3), noteJa: 'P016静寂ビート(1名negative space)'},
    {role: 'BROLL_TEXTURE', variantIndex: 7, sec: 2.5, motion: drift(10.0, 0.0, 1.01), entry: iris(6), noteJa: '俄然負けん気'},
    {role: 'SEOUL_STREET', variantIndex: 14, sec: 2.5, motion: pan(12), entry: slat(6, 3), noteJa: 'スタート合図'},
    {role: 'HERO_CLOSE', variantIndex: 11, sec: 2.5, motion: stat(), entry: iris(6), noteJa: '苦悩と煩と悩は上等'},
  ],
  'verse-2b': [
    {role: 'DETAIL_HAND', variantIndex: 4, sec: 1.75, motion: push(1.0, 1.02), entry: slat(6, 3), noteJa: '時既に戦の場'},
    {role: 'BROLL_WALK', variantIndex: 7, sec: 1.75, motion: drift(-10.0, 0.0, 1.01), entry: iris(6), noteJa: 'ナニヶ原'},
    {role: 'HAWAII_WARM', variantIndex: 14, sec: 1.75, motion: stat(), entry: slat(6, 3), noteJa: 'なで肩が泣く'},
    {role: 'HERO_WIDE', variantIndex: 22, sec: 1.75, motion: push(1.0, 1.02), entry: iris(6), noteJa: 'なで肩ブーム'},
  ],
  'prechorus-2': [
    {role: 'NEGATIVE_SPACE', variantIndex: 11, sec: 1.0, motion: stat(), entry: slat(6, 3), noteJa: '忘れたくないなぁ'},
    {role: 'HERO_CLOSE', variantIndex: 12, sec: 1.0, motion: push(1.0, 1.02), entry: iris(6), noteJa: 'P026冒頭Sモチーフ回想'},
  ],
  'chorus-2': [
    {role: 'HAWAII_WARM', variantIndex: 15, sec: 2.2, motion: stat(), entry: slat(6, 3), layout: gridEditorial, noteJa: '3-hit 1/3(2回目)'},
    {role: 'HAWAII_WARM', variantIndex: 16, sec: 2.2, motion: push(1.0, 1.03), entry: iris(6), noteJa: '3-hit 2/3(2回目)'},
    {role: 'HERO_WIDE', variantIndex: 23, sec: 2.6, motion: pull(1.04, 1.0), entry: slat(8, 4), noteJa: '3-hit 3/3(2回目)'},
    {role: 'SEOUL_STREET', variantIndex: 15, sec: 5.0, motion: drift(-27.5, 0.0, 1.028), entry: iris(8), noteJa: '雨の心(2回目)'},
    {role: 'HERO_CLOSE', variantIndex: 13, sec: 7.0, motion: drift(38.5, 4.0, 1.028), entry: slat(10, 4), layout: split2, extraRoles: [r('HERO_WIDE', 24)], noteJa: '否定してくれる貴方を'},
    {role: 'HERO_WIDE', variantIndex: 25, sec: 13.0, motion: drift(78.0, 5.0, 1.03), entry: iris(10), layout: gridEditorial, noteJa: 'P015/P030 gridで着地'},
  ],
  'interlude-montage': [
    {role: 'OKINAWA_WIDE', variantIndex: 8, sec: 2.5, motion: pull(1.03, 1.0), entry: slat(8, 4), layout: strip3, extraRoles: [r('HAWAII_WARM', 17), r('SEOUL_STREET', 16)], noteJa: 'baseline再登場: photo strip総集編'},
    {role: 'HERO_CLOSE', variantIndex: 14, sec: 2.5, motion: push(1.0, 1.03), entry: iris(8), noteJa: 'close-up'},
    {role: 'HAWAII_WARM', variantIndex: 18, sec: 2.5, motion: drift(10.0, 0.0, 1.01), entry: slat(8, 4), noteJa: 'ハワイ'},
    {role: 'HERO_WIDE', variantIndex: 26, sec: 2.5, motion: pull(1.03, 1.0), entry: iris(8), noteJa: '締め'},
  ],
  'interlude-route': [
    {role: 'ARRIVAL_YOKOHAMA', variantIndex: 5, sec: 4.0, motion: drift(8.0, 0.0, 1.01), entry: slat(10, 4), layout: gridEditorial, noteJa: 'gridが会場案内へ変形'},
    {role: 'ARRIVAL_YOKOHAMA', variantIndex: 6, sec: 4.0, motion: push(1.0, 1.02), entry: iris(10), noteJa: '到着'},
  ],
  'interlude-welcome': [
    {role: 'NEGATIVE_SPACE', variantIndex: 12, sec: 6.0, motion: drift(33.0, 4.0, 1.028), entry: slat(12, 4), noteJa: '感謝メッセージ、editorialに組む'},
  ],
  'interlude-names': [
    {role: 'HERO_WIDE', variantIndex: 27, sec: 4.0, motion: drift(6.0, 4.0, 1.007), entry: iris(10), layout: gridEditorial, noteJa: '名前・日付'},
  ],
  'interlude-end': [
    {role: 'END_BREATH', variantIndex: 3, sec: 3.6, motion: push(1.0, 1.02), entry: slat(14, 5), effects: [glint(50, 50)], noteJa: '巨大なSまたはStaRt lockupへ戻る'},
  ],
};

const INTRO_SHOTS: Record<WeddingVariant, Shot[]> = {
  A: [],
  B: [],
  C: [],
};

const SHOTS_BY_VARIANT: Record<WeddingVariant, Record<string, Shot[]>> = {A: A_SHOTS, B: B_SHOTS, C: C_SHOTS};

const NARRATIVE_JA: Record<string, string> = {
  intro: '冒頭Sアニメーション → StaRt完成 → 最初の写真へ',
  'verse-1a': '出発。二人の旅の始まり',
  'verse-1b': '遊び心、旅の軽やかさ',
  'prechorus-1': '溜め。再決意の手前',
  'chorus-1': '1回目の解放。晴れと雨、そして二人',
  'verse-2a': '静けさ、少し内省的な1対1',
  'verse-2b': '葛藤を軽く笑いに変える',
  'prechorus-2': '再決意',
  'chorus-2': '最大のサビ。「貴方を」がこの曲の核',
  'interlude-montage': '旅の記録を映画的montageで振り返る',
  'interlude-route': 'Sの光跡が横浜/会場へのrouteになる',
  'interlude-welcome': '来場者へのWelcome',
  'interlude-names': '新郎新婦名・日付',
  'interlude-end': 'StaRt motifのcallbackで着地',
};

const INTENSITY: Record<string, 1 | 2 | 3 | 4 | 5> = {
  intro: 2,
  'verse-1a': 2,
  'verse-1b': 2,
  'prechorus-1': 2,
  'chorus-1': 4,
  'verse-2a': 2,
  'verse-2b': 2,
  'prechorus-2': 3,
  'chorus-2': 5,
  'interlude-montage': 3,
  'interlude-route': 3,
  'interlude-welcome': 2,
  'interlude-names': 2,
  'interlude-end': 3,
};

export const weddingSectionDesign = (variant: WeddingVariant, sectionId: string): SectionDesign => {
  const shots = sectionId === 'intro' ? INTRO_SHOTS[variant] : SHOTS_BY_VARIANT[variant][sectionId];
  if (!shots) throw new Error(`未定義のsection shot: ${variant}/${sectionId}`);
  return {
    sectionId,
    narrativeJa: NARRATIVE_JA[sectionId] ?? '',
    intensity: INTENSITY[sectionId] ?? 2,
    shots,
  };
};

export const weddingSections = WEDDING_EDIT_SECTIONS;

export const totalShotCount = (variant: WeddingVariant): number =>
  WEDDING_EDIT_SECTIONS.filter((s) => s.id !== 'intro').reduce(
    (sum, s) => sum + (SHOTS_BY_VARIANT[variant][s.id]?.length ?? 0),
    0,
  );
