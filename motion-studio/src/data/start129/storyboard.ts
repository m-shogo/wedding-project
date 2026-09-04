// StaRt 129秒 A/B/C案 演出表(storyboard)。
//
// これは「129秒の器」ではなく、各区間で何が・いつ・どう動くかを
// コードから参照できる形で定義した設計データ。
// 以前の実装は「1区間 = 背景素材1枚 + 歌詞1個」だったため映像が静止して見えた。
// その反省として、区間ごとに複数shot・entry/motion/transition/effectを持たせる。
//
// 参照: docs/decisions/2026-08-25-start-129-rebuild-root-cause.md

import {START_129_FPS, START_129_SECTIONS, type Start129SectionId} from './sections.ts';
import type {Start129AssetRole} from './assetRoles.ts';

export type Start129Variant = 'A' | 'B' | 'C';

/** shotの中でmediaがどう動くか。 */
export type ShotMotion =
  | {kind: 'static'}
  /** ゆっくり寄る。fromScale→toScale。originはtransform-origin(%) */
  | {kind: 'push-in'; from: number; to: number; originX?: number; originY?: number}
  | {kind: 'pull-out'; from: number; to: number; originX?: number; originY?: number}
  /** 横パン。dxは画面幅に対する%移動量(scaleは自動で余白を吸収) */
  | {kind: 'pan'; dx: number; scale?: number}
  | {kind: 'tilt'; dy: number; scale?: number}
  /** 前景/背景を別speedで動かす擬似2.5D */
  | {kind: 'parallax'; dx: number; depth: number}
  /** 微細な漂い。静止に見せたいがdead frameにしたくない場合 */
  | {kind: 'drift'; dx: number; dy: number; scale: number};

/** shotの入り方。前のshotからどう切り替わるか。 */
export type ShotEntry =
  | {kind: 'cut'}
  | {kind: 'fade'; frames: number}
  | {kind: 'dissolve'; frames: number}
  | {kind: 'blur-in'; frames: number}
  /** 方向つきmask wipe */
  | {kind: 'wipe'; dir: 'left' | 'right' | 'up' | 'down'; frames: number}
  /** 円形mask reveal */
  | {kind: 'iris'; frames: number}
  /** 短いwhip pan(B案向け) */
  | {kind: 'whip'; frames: number; dir: 'left' | 'right'}
  /** 色面が横切ってから次画面(B案向け) */
  | {kind: 'color-block'; frames: number; color: string; dir: 'left' | 'right'}
  /** scaleがpopして着地(B案向け) */
  | {kind: 'scale-pop'; frames: number}
  /** 帯状に開く(C案 editorial向け) */
  | {kind: 'slat'; frames: number; count: number};

/** 画面構成。複数mediaを同時に見せる場合に使う。 */
export type ShotLayout =
  | {kind: 'full'}
  /** 左右2分割。roles[1]が右 */
  | {kind: 'split-2'; ratio?: number}
  /** 3分割縦ストリップ */
  | {kind: 'strip-3'}
  /** 2x2 panel */
  | {kind: 'panel-4'}
  /** 大1 + 小2のeditorial grid */
  | {kind: 'grid-editorial'}
  /** 全画面の上に小さいinset写真 */
  | {kind: 'inset'; x: number; y: number; w: number}
  /** 写真を重ねてstackし、1枚ずつ落とす */
  | {kind: 'stack'; count: number};

/** shot中に乗る前景effect。 */
export type ShotEffect =
  | {kind: 'none'}
  | {kind: 'dust'; opacity: number}
  | {kind: 'sparks'; opacity: number}
  | {kind: 'light-leak'; opacity: number; side: 'left' | 'right'}
  | {kind: 'prism'; opacity: number}
  | {kind: 'glint'; x: number; y: number}
  | {kind: 'halftone'; opacity: number}
  | {kind: 'speed-lines'; intensity: number}
  | {kind: 'grain'; opacity: number}
  | {kind: 'vignette'; strength: number}
  | {kind: 'flash'; frames: number};

export type Shot = {
  /** 使う素材role */
  role: Start129AssetRole;
  /** role内の何番目の素材か。同じ写真の連続使用を避けるために明示する */
  variantIndex: number;
  /** このshotの長さ(秒) */
  sec: number;
  motion: ShotMotion;
  entry: ShotEntry;
  layout?: ShotLayout;
  /** split/panel/gridで使う追加素材 */
  extraRoles?: Array<{role: Start129AssetRole; variantIndex: number}>;
  effects?: ShotEffect[];
  /** cover時の注視点(%)。顔や主役が切れないように */
  focus?: {x: number; y: number};
  /** なぜこのshotなのか。QA時に説明できるようにする */
  noteJa: string;
  /**
   * 人間可読/編集可能契約(docs/contracts/human-readable-editable-movie-contract.md)。
   * 未指定はAI_SUGGESTED相当として扱う。HUMAN_SELECTED/LOCKEDはClaude/Codex/Palmier/
   * 自動処理が無断で上書きしてはいけない。現状の全shotは人間未選定(AI_SUGGESTED)。
   */
  status?: 'DEFAULT' | 'AI_SUGGESTED' | 'HUMAN_SELECTED' | 'LOCKED';
};

export type SectionDesign = {
  sectionId: Start129SectionId;
  /** 物語上の意味 */
  narrativeJa: string;
  /** 感情強度 1(静)〜5(最大) */
  intensity: 1 | 2 | 3 | 4 | 5;
  shots: Shot[];
  /** この区間の歌詞の扱い */
  lyricTreatmentJa: string;
};

export type VariantStoryboard = {
  variant: Start129Variant;
  nameJa: string;
  grammarJa: string;
  sections: SectionDesign[];
};

// ---------------------------------------------------------------------------
// A案: CINEMATIC EMOTIONAL
// 静かでも「光・奥行き・視線・余白・前後shotの関係」で演出する。
// 長めのholdを許すが、必ずpush/parallax/driftなど意味のある変化を持たせる。
// ---------------------------------------------------------------------------
const A_SECTIONS: SectionDesign[] = [
  {
    sectionId: 'opening-pickup',
    narrativeJa: '期待。まだ何も始まっていない静けさから、二人の気配へ',
    intensity: 1,
    lyricTreatmentJa: '歌詞なし。名前も出さず、画だけで期待を作る',
    shots: [
      {role: 'NEGATIVE_SPACE', variantIndex: 0, sec: 3.0, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'fade', frames: 20}, effects: [{kind: 'grain', opacity: 0.05}, {kind: 'vignette', strength: 0.3}], noteJa: '空/余白から始める。まだ人を見せない'},
      {role: 'HERO_WIDE', variantIndex: 3, sec: 4.0, motion: {kind: 'push-in', from: 1.02, to: 1.08, originY: 40}, entry: {kind: 'dissolve', frames: 24}, effects: [{kind: 'light-leak', opacity: 0.18, side: 'left'}, {kind: 'grain', opacity: 0.05}], noteJa: '二人の後ろ姿シルエットへdissolve。顔は見せず期待を残す'},
    ],
  },
  {
    sectionId: 'intro',
    narrativeJa: '出発。移動が始まる',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし。場所と時間だけを小さく置く',
    shots: [
      {role: 'DEPARTURE', variantIndex: 2, sec: 2.6, motion: {kind: 'pan', dx: 5, scale: 1.12}, entry: {kind: 'cut'}, effects: [{kind: 'grain', opacity: 0.05}], noteJa: '空港の窓。横パンで移動の予感'},
      {role: 'DEPARTURE', variantIndex: 5, sec: 2.4, motion: {kind: 'push-in', from: 1.0, to: 1.06}, entry: {kind: 'dissolve', frames: 14}, noteJa: '別アングルの出発へmatch dissolve'},
      {role: 'BROLL_WALK', variantIndex: 0, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, noteJa: '歩き出す足元の実動画。時間が動き始める'},
      {role: 'DEPARTURE', variantIndex: 7, sec: 2.5, motion: {kind: 'pull-out', from: 1.1, to: 1.0}, entry: {kind: 'blur-in', frames: 12}, effects: [{kind: 'light-leak', opacity: 0.15, side: 'right'}], noteJa: '窓の外へ引く。世界が広がる合図'},
    ],
  },
  {
    sectionId: 'verse-1a',
    narrativeJa: '二人の世界。最初の旅の記憶',
    intensity: 2,
    lyricTreatmentJa: '写真の余白へfade。読む時間を確保する',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 3, sec: 3.0, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'cut'}, effects: [{kind: 'grain', opacity: 0.04}], noteJa: '海の水平線。歌詞1枠目の背景として余白が広い'},
      {role: 'OKINAWA_WIDE', variantIndex: 6, sec: 2.7, motion: {kind: 'pan', dx: -4, scale: 1.1}, entry: {kind: 'dissolve', frames: 16}, noteJa: '水平線matchで別の海へ。視線を左へ送る'},
      {role: 'HERO_CLOSE', variantIndex: 2, sec: 2.8, motion: {kind: 'push-in', from: 1.04, to: 1.0}, entry: {kind: 'blur-in', frames: 14}, focus: {x: 50, y: 45}, effects: [{kind: 'glint', x: 62, y: 44}], noteJa: 'wideからcloseへ。手をつなぐ寄りで親密さを出す'},
      {role: 'OKINAWA_WIDE', variantIndex: 8, sec: 2.5, motion: {kind: 'drift', dx: 1.5, dy: 0.8, scale: 1.06}, entry: {kind: 'dissolve', frames: 18}, noteJa: 'また風景へ戻り、区間を閉じる'},
    ],
  },
  {
    sectionId: 'verse-1b',
    narrativeJa: '旅の広がり。街へ',
    intensity: 3,
    lyricTreatmentJa: 'fadeに加え、強調語をわずかに大きく',
    shots: [
      {role: 'SEOUL_STREET', variantIndex: 1, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.06}, entry: {kind: 'cut'}, noteJa: '夜の街。海から街へ場面が変わる'},
      {role: 'SEOUL_STREET', variantIndex: 4, sec: 2.5, motion: {kind: 'pan', dx: 6, scale: 1.14}, entry: {kind: 'wipe', dir: 'left', frames: 12}, effects: [{kind: 'light-leak', opacity: 0.2, side: 'right'}], noteJa: '街の光を横に流す。wipeで移動感'},
      {role: 'DETAIL_HAND', variantIndex: 4, sec: 2.5, motion: {kind: 'push-in', from: 1.05, to: 1.0}, entry: {kind: 'iris', frames: 16}, noteJa: '手元のディテールへ。旅の道具で生活感を出す'},
      {role: 'MOVEMENT_LEFT_TO_RIGHT', variantIndex: 0, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, noteJa: '実動画で移動。次のサビへ向かう助走'},
    ],
  },
  {
    sectionId: 'chorus-1a',
    narrativeJa: '1回目の開放。感情の第一ピーク',
    intensity: 4,
    lyricTreatmentJa: '大きめ。写真の余白へ置き、顔と競合させない',
    shots: [
      {role: 'HERO_WIDE', variantIndex: 1, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.07, originY: 45}, entry: {kind: 'fade', frames: 8}, effects: [{kind: 'dust', opacity: 0.16}, {kind: 'light-leak', opacity: 0.22, side: 'left'}], noteJa: 'サビ頭のHero。夕陽の二人。粒子を短く重ねて到達点を作る'},
      {role: 'HAWAII_WARM', variantIndex: 7, sec: 3.3, motion: {kind: 'pull-out', from: 1.12, to: 1.02}, entry: {kind: 'dissolve', frames: 20}, effects: [{kind: 'glint', x: 48, y: 46}], noteJa: '夕陽へpull out。空が広がる開放感'},
      {role: 'HERO_CLOSE', variantIndex: 3, sec: 3.3, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'blur-in', frames: 16}, focus: {x: 50, y: 50}, effects: [{kind: 'dust', opacity: 0.12}], noteJa: '寄りで感情を確定させてサビAを閉じる'},
    ],
  },
  {
    sectionId: 'chorus-1b',
    narrativeJa: 'ピークの持続。まだ落とさない',
    intensity: 4,
    lyricTreatmentJa: '同上。ただし位置を変えて単調さを避ける',
    shots: [
      {role: 'HAWAII_WARM', variantIndex: 3, sec: 3.4, motion: {kind: 'pan', dx: -5, scale: 1.12}, entry: {kind: 'cut'}, effects: [{kind: 'light-leak', opacity: 0.2, side: 'right'}], noteJa: '夕陽の海を横に流す'},
      {role: 'HERO_WIDE', variantIndex: 5, sec: 3.3, motion: {kind: 'parallax', dx: 4, depth: 1.1}, entry: {kind: 'dissolve', frames: 18}, effects: [{kind: 'dust', opacity: 0.14}], noteJa: '奥行き分離で二人を立たせる'},
      {role: 'HAWAII_WARM', variantIndex: 8, sec: 3.3, motion: {kind: 'push-in', from: 1.0, to: 1.06}, entry: {kind: 'dissolve', frames: 20}, effects: [{kind: 'grain', opacity: 0.05}], noteJa: '空へ。次の間奏へ息を渡す'},
    ],
  },
  {
    sectionId: 'interlude-1',
    narrativeJa: '一度落ち着く。呼吸を戻す',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし。画と光だけ',
    shots: [
      {role: 'BROLL_TEXTURE', variantIndex: 0, sec: 3.4, motion: {kind: 'static'}, entry: {kind: 'dissolve', frames: 24}, effects: [{kind: 'vignette', strength: 0.35}], noteJa: '水面の実動画。人を出さず休符を作る'},
      {role: 'NEGATIVE_SPACE', variantIndex: 4, sec: 3.3, motion: {kind: 'drift', dx: 1.2, dy: 0.6, scale: 1.05}, entry: {kind: 'dissolve', frames: 22}, noteJa: '空の余白。感情を平らに戻す'},
      {role: 'BROLL_TEXTURE', variantIndex: 2, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'blur-in', frames: 16}, noteJa: '再び水面。2番へ入る前の間'},
    ],
  },
  {
    sectionId: 'verse-2a',
    narrativeJa: '再出発。1番と違う画角で世界を見せる',
    intensity: 3,
    lyricTreatmentJa: '1番と位置を変える。同じlayoutにしない',
    shots: [
      {role: 'MOVEMENT_RIGHT_TO_LEFT', variantIndex: 0, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, noteJa: '1番と逆方向の移動。同じ道を戻らない意味'},
      {role: 'OKINAWA_WIDE', variantIndex: 1, sec: 2.5, motion: {kind: 'tilt', dy: 4, scale: 1.1}, entry: {kind: 'wipe', dir: 'up', frames: 12}, noteJa: '上へtilt。1番のpanと動きを変える'},
      {role: 'DETAIL_HAND', variantIndex: 7, sec: 2.5, motion: {kind: 'push-in', from: 1.06, to: 1.0}, entry: {kind: 'iris', frames: 14}, noteJa: '地図/カメラのdetail。記録している感覚'},
      {role: 'HERO_WIDE', variantIndex: 6, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'dissolve', frames: 16}, noteJa: '二人へ戻る'},
    ],
  },
  {
    sectionId: 'verse-2b',
    narrativeJa: '関係性。積み重ねてきた時間',
    intensity: 3,
    lyricTreatmentJa: '強調語のweightを上げる',
    shots: [
      {role: 'HERO_CLOSE', variantIndex: 0, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'cut'}, focus: {x: 50, y: 48}, noteJa: '手のclose。関係性を言葉でなく画で示す'},
      {role: 'SEOUL_STREET', variantIndex: 5, sec: 2.5, motion: {kind: 'pan', dx: -5, scale: 1.12}, entry: {kind: 'dissolve', frames: 14}, noteJa: '街の記憶'},
      {role: 'HERO_CLOSE', variantIndex: 4, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'blur-in', frames: 12}, effects: [{kind: 'glint', x: 55, y: 50}], noteJa: '指輪の光る一点。glintを一度だけ'},
      {role: 'DEPARTURE', variantIndex: 9, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.07}, entry: {kind: 'dissolve', frames: 16}, noteJa: '再び移動へ。最大サビへの助走'},
    ],
  },
  {
    sectionId: 'chorus-2a',
    narrativeJa: '最大のサビ。129秒で一番強い場所',
    intensity: 5,
    lyricTreatmentJa: '最大サイズ。ただし顔にかけない',
    shots: [
      {role: 'HERO_WIDE', variantIndex: 2, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.08, originY: 45}, entry: {kind: 'fade', frames: 6}, effects: [{kind: 'dust', opacity: 0.2}, {kind: 'light-leak', opacity: 0.25, side: 'left'}], noteJa: '最大Hero。粒子と光を最も強くする(それでも全画面白飛びはしない)'},
      {role: 'HAWAII_WARM', variantIndex: 4, sec: 3.3, motion: {kind: 'parallax', dx: 5, depth: 1.14}, entry: {kind: 'dissolve', frames: 16}, effects: [{kind: 'prism', opacity: 0.16}], noteJa: '奥行き+prismで最高潮'},
      {role: 'HERO_WIDE', variantIndex: 7, sec: 3.3, motion: {kind: 'pull-out', from: 1.14, to: 1.0}, entry: {kind: 'blur-in', frames: 14}, effects: [{kind: 'dust', opacity: 0.16}], noteJa: 'pull outで世界の広さを見せてサビAを閉じる'},
    ],
  },
  {
    sectionId: 'chorus-2b',
    narrativeJa: '2回目の開放の締め。ここから会場へ降りていく',
    intensity: 4,
    lyricTreatmentJa: '最後の歌詞4枠。徐々に落ち着かせる',
    shots: [
      {role: 'HAWAII_WARM', variantIndex: 6, sec: 3.4, motion: {kind: 'pan', dx: 4, scale: 1.1}, entry: {kind: 'cut'}, effects: [{kind: 'light-leak', opacity: 0.18, side: 'right'}], noteJa: '夕景を横に流す'},
      {role: 'OKINAWA_WIDE', variantIndex: 4, sec: 3.3, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'dissolve', frames: 18}, noteJa: '海へ戻り旅を総括'},
      {role: 'HERO_CLOSE', variantIndex: 5, sec: 3.3, motion: {kind: 'push-in', from: 1.03, to: 1.0}, entry: {kind: 'dissolve', frames: 20}, effects: [{kind: 'dust', opacity: 0.1}], noteJa: '寄りで静かに着地させる'},
    ],
  },
  {
    sectionId: 'interlude-2a',
    narrativeJa: '旅の総集編。熱を逃がす',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'BROLL_WALK', variantIndex: 2, sec: 3.4, motion: {kind: 'static'}, entry: {kind: 'dissolve', frames: 22}, noteJa: '歩き続ける実動画。旅が続いていた時間'},
      {role: 'OKINAWA_WIDE', variantIndex: 9, sec: 3.3, motion: {kind: 'drift', dx: 1.4, dy: 0.7, scale: 1.05}, entry: {kind: 'dissolve', frames: 20}, effects: [{kind: 'grain', opacity: 0.05}], noteJa: '静かな海。呼吸を戻す'},
      {role: 'BROLL_TEXTURE', variantIndex: 1, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'blur-in', frames: 18}, noteJa: '水面。現在へ橋渡し'},
    ],
  },
  {
    sectionId: 'interlude-2b',
    narrativeJa: '会場への到着。ゲストへ意味が切り替わる',
    intensity: 3,
    lyricTreatmentJa: '歌詞なし。代わりに来場感謝メッセージ',
    shots: [
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 6, sec: 4.0, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'dissolve', frames: 24}, effects: [{kind: 'grain', opacity: 0.05}], noteJa: '横浜の街。旅の終点=今日の会場'},
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 9, sec: 4.0, motion: {kind: 'pan', dx: -3, scale: 1.08}, entry: {kind: 'dissolve', frames: 20}, effects: [{kind: 'dust', opacity: 0.14}], noteJa: '感謝メッセージを重ねる背景。動きは最小限'},
    ],
  },
  {
    sectionId: 'end',
    narrativeJa: '名前と日付。余韻',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし。名前と日付のみ',
    shots: [
      {role: 'END_BREATH', variantIndex: 2, sec: 3.0, motion: {kind: 'push-in', from: 1.0, to: 1.03}, entry: {kind: 'dissolve', frames: 24}, effects: [{kind: 'dust', opacity: 0.14}, {kind: 'vignette', strength: 0.3}], noteJa: '静かな水平線。3秒静止でも成立する画で終わる'},
    ],
  },
];

// ---------------------------------------------------------------------------
// B案: JOYFUL ANIME OPENING
// 明るくテンポがある。ただし写真が主役。サビでも写真を消さない。
// A案と同じ素材indexを使わず、cut数を増やし、graphic文法で差をつける。
// ---------------------------------------------------------------------------
const B_SECTIONS: SectionDesign[] = [
  {
    sectionId: 'opening-pickup',
    narrativeJa: '期待。panelが開いて世界が始まる',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 2, sec: 1.6, motion: {kind: 'push-in', from: 1.1, to: 1.0}, entry: {kind: 'iris', frames: 14}, effects: [{kind: 'halftone', opacity: 0.1}], noteJa: 'irisで開幕。A案の静かなfadeと対比'},
      {role: 'HERO_WIDE', variantIndex: 0, sec: 1.7, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'scale-pop', frames: 10}, layout: {kind: 'full'}, noteJa: 'popで二人が飛び込む'},
      {role: 'DEPARTURE', variantIndex: 4, sec: 1.8, motion: {kind: 'pan', dx: 8, scale: 1.16}, entry: {kind: 'whip', frames: 6, dir: 'left'}, effects: [{kind: 'speed-lines', intensity: 0.5}], noteJa: 'whipで一気に出発へ'},
      {role: 'HAWAII_WARM', variantIndex: 0, sec: 1.9, motion: {kind: 'push-in', from: 1.0, to: 1.08}, entry: {kind: 'color-block', frames: 8, color: '#F4C95D', dir: 'right'}, noteJa: '黄色の色面が横切ってから次画面。B案固有のtransition'},
    ],
  },
  {
    sectionId: 'intro',
    narrativeJa: '出発。コマ割りで一気に情報を出す',
    intensity: 3,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'DEPARTURE', variantIndex: 1, sec: 2.4, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'panel-4'}, extraRoles: [{role: 'DEPARTURE', variantIndex: 3}, {role: 'DEPARTURE', variantIndex: 6}, {role: 'DEPARTURE', variantIndex: 8}], effects: [{kind: 'halftone', opacity: 0.12}], noteJa: '4分割コマ割り。A案の1枚ずつと真逆の情報密度'},
      {role: 'DEPARTURE', variantIndex: 0, sec: 2.0, motion: {kind: 'push-in', from: 1.0, to: 1.1}, entry: {kind: 'scale-pop', frames: 8}, noteJa: 'panelから1枚へ解放'},
      {role: 'MOVEMENT_LEFT_TO_RIGHT', variantIndex: 1, sec: 2.6, motion: {kind: 'static'}, entry: {kind: 'whip', frames: 6, dir: 'right'}, effects: [{kind: 'speed-lines', intensity: 0.35}], noteJa: '実動画+speed lineで加速'},
      {role: 'OKINAWA_WIDE', variantIndex: 5, sec: 3.0, motion: {kind: 'pull-out', from: 1.15, to: 1.0}, entry: {kind: 'color-block', frames: 8, color: '#5AC8E8', dir: 'left'}, noteJa: '青の色面から海へ。色で場所転換を示す'},
    ],
  },
  {
    sectionId: 'verse-1a',
    narrativeJa: '二人の世界。テンポよく記憶を並べる',
    intensity: 3,
    lyricTreatmentJa: '文字を1字ずつstaggerで出す',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 0, sec: 2.7, motion: {kind: 'push-in', from: 1.0, to: 1.07}, entry: {kind: 'cut'}, noteJa: '海。A案が使わないindexで画を変える'},
      {role: 'HERO_CLOSE', variantIndex: 1, sec: 2.7, motion: {kind: 'push-in', from: 1.0, to: 1.03}, entry: {kind: 'wipe', dir: 'right', frames: 10}, layout: {kind: 'split-2'}, extraRoles: [{role: 'OKINAWA_WIDE', variantIndex: 7}], noteJa: '左右split。手のcloseと海を同時に見せる'},
      {role: 'OKINAWA_WIDE', variantIndex: 4, sec: 2.8, motion: {kind: 'pan', dx: 7, scale: 1.14}, entry: {kind: 'whip', frames: 6, dir: 'left'}, noteJa: 'whipで横に飛ぶ'},
      {role: 'DETAIL_HAND', variantIndex: 2, sec: 2.8, motion: {kind: 'push-in', from: 1.08, to: 1.0}, entry: {kind: 'scale-pop', frames: 8}, effects: [{kind: 'halftone', opacity: 0.1}], noteJa: 'detailをpopで見せる'},
    ],
  },
  {
    sectionId: 'verse-1b',
    narrativeJa: '旅の広がり。遊びを増やす',
    intensity: 4,
    lyricTreatmentJa: 'stagger + 強調語だけscale hit',
    shots: [
      {role: 'SEOUL_STREET', variantIndex: 0, sec: 2.4, motion: {kind: 'push-in', from: 1.0, to: 1.08}, entry: {kind: 'cut'}, noteJa: '夜の街へ'},
      {role: 'SEOUL_STREET', variantIndex: 2, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'strip-3'}, extraRoles: [{role: 'SEOUL_STREET', variantIndex: 3}, {role: 'SEOUL_STREET', variantIndex: 6}], effects: [{kind: 'halftone', opacity: 0.14}], noteJa: '3分割strip。街の多面性'},
      {role: 'DETAIL_HAND', variantIndex: 8, sec: 2.5, motion: {kind: 'pan', dx: -6, scale: 1.12}, entry: {kind: 'color-block', frames: 8, color: '#E8674A', dir: 'right'}, noteJa: 'オレンジ色面。3色目で単調さを避ける'},
      {role: 'MOVEMENT_RIGHT_TO_LEFT', variantIndex: 1, sec: 2.6, motion: {kind: 'static'}, entry: {kind: 'whip', frames: 6, dir: 'right'}, effects: [{kind: 'speed-lines', intensity: 0.45}], noteJa: 'サビ直前の加速'},
    ],
  },
  {
    sectionId: 'chorus-1a',
    narrativeJa: '1回目の開放。写真を消さずにhitを作る',
    intensity: 5,
    lyricTreatmentJa: '大きくrhythmic scale。写真の上へshape背景つきで置く',
    shots: [
      {role: 'HERO_WIDE', variantIndex: 4, sec: 2.4, motion: {kind: 'push-in', from: 1.06, to: 1.0}, entry: {kind: 'scale-pop', frames: 8}, effects: [{kind: 'sparks', opacity: 0.42}, {kind: 'speed-lines', intensity: 0.5}], noteJa: 'サビ頭の3-hit。写真は常に見えている'},
      {role: 'HAWAII_WARM', variantIndex: 2, sec: 2.5, motion: {kind: 'pan', dx: 6, scale: 1.14}, entry: {kind: 'whip', frames: 6, dir: 'left'}, effects: [{kind: 'halftone', opacity: 0.12}], noteJa: 'hit後すぐ次shotへ展開する'},
      {role: 'HERO_CLOSE', variantIndex: 5, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'scale-pop', frames: 7}, effects: [{kind: 'sparks', opacity: 0.3}], noteJa: '2発目のhit。寄りで表情'},
      {role: 'HAWAII_WARM', variantIndex: 9, sec: 2.6, motion: {kind: 'pull-out', from: 1.14, to: 1.0}, entry: {kind: 'color-block', frames: 7, color: '#F4C95D', dir: 'left'}, effects: [{kind: 'sparks', opacity: 0.35}], noteJa: '3発目。色面+pull outで開放して区間を閉じる'},
    ],
  },
  {
    sectionId: 'chorus-1b',
    narrativeJa: 'ピーク持続。コマ割りで畳み掛ける',
    intensity: 5,
    lyricTreatmentJa: '同上。位置を変える',
    shots: [
      {role: 'HAWAII_WARM', variantIndex: 5, sec: 2.4, motion: {kind: 'push-in', from: 1.0, to: 1.08}, entry: {kind: 'cut'}, effects: [{kind: 'halftone', opacity: 0.12}], noteJa: '夕景のwide。サビの熱を保ちつつ画を変える'},
      {role: 'HERO_WIDE', variantIndex: 8, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'panel-4'}, extraRoles: [{role: 'HAWAII_WARM', variantIndex: 1}, {role: 'HERO_CLOSE', variantIndex: 0}, {role: 'OKINAWA_WIDE', variantIndex: 8}], effects: [{kind: 'sparks', opacity: 0.28}], noteJa: '4分割で旅を一気に見せる。B案の見せ場'},
      {role: 'HERO_WIDE', variantIndex: 6, sec: 2.5, motion: {kind: 'push-in', from: 1.1, to: 1.0}, entry: {kind: 'scale-pop', frames: 8}, effects: [{kind: 'sparks', opacity: 0.4}, {kind: 'speed-lines', intensity: 0.45}], noteJa: 'panelから1枚へ解放。最大hit'},
      {role: 'HAWAII_WARM', variantIndex: 8, sec: 2.6, motion: {kind: 'pan', dx: -5, scale: 1.12}, entry: {kind: 'whip', frames: 6, dir: 'right'}, noteJa: '間奏へ渡す'},
    ],
  },
  {
    sectionId: 'interlude-1',
    narrativeJa: '一度落ち着く。B案でも呼吸を作る',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'BROLL_TEXTURE', variantIndex: 1, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'dissolve', frames: 18}, effects: [{kind: 'halftone', opacity: 0.08}], noteJa: '水面。B案でもここは静める'},
      {role: 'NEGATIVE_SPACE', variantIndex: 7, sec: 3.3, motion: {kind: 'drift', dx: 1.5, dy: 0.7, scale: 1.05}, entry: {kind: 'wipe', dir: 'up', frames: 12}, noteJa: '空の余白。次の高揚のために低密度へ落とす'},
      {role: 'BROLL_WALK', variantIndex: 1, sec: 3.4, motion: {kind: 'static'}, entry: {kind: 'color-block', frames: 8, color: '#5AC8E8', dir: 'left'}, noteJa: '歩行で2番へ再出発'},
    ],
  },
  {
    sectionId: 'verse-2a',
    narrativeJa: '再出発。1番と違うcut順',
    intensity: 3,
    lyricTreatmentJa: 'stagger。1番と行位置を変える',
    shots: [
      {role: 'DETAIL_HAND', variantIndex: 5, sec: 2.4, motion: {kind: 'push-in', from: 1.06, to: 1.0}, entry: {kind: 'cut'}, noteJa: '1番はwideから入ったが2番はdetailから入る'},
      {role: 'OKINAWA_WIDE', variantIndex: 6, sec: 2.5, motion: {kind: 'tilt', dy: 5, scale: 1.12}, entry: {kind: 'whip', frames: 6, dir: 'left'}, noteJa: 'tiltで縦方向。1番のpanと変える'},
      {role: 'SEOUL_STREET', variantIndex: 1, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'split-2'}, extraRoles: [{role: 'HERO_CLOSE', variantIndex: 3}], effects: [{kind: 'halftone', opacity: 0.1}], noteJa: 'splitで街と二人を並べる'},
      {role: 'HERO_WIDE', variantIndex: 3, sec: 2.6, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'scale-pop', frames: 8}, noteJa: '二人へpopで戻る'},
    ],
  },
  {
    sectionId: 'verse-2b',
    narrativeJa: '関係性。遊びを最大化して最大サビへ',
    intensity: 4,
    lyricTreatmentJa: 'word hitを増やす',
    shots: [
      {role: 'HERO_CLOSE', variantIndex: 2, sec: 2.4, motion: {kind: 'push-in', from: 1.0, to: 1.07}, entry: {kind: 'cut'}, noteJa: '手の寄り。関係性を言葉でなく画で示す'},
      {role: 'DETAIL_HAND', variantIndex: 0, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'panel-4'}, extraRoles: [{role: 'DETAIL_HAND', variantIndex: 3}, {role: 'DETAIL_HAND', variantIndex: 6}, {role: 'DETAIL_HAND', variantIndex: 9}], effects: [{kind: 'halftone', opacity: 0.14}], noteJa: 'detailのcontact sheet的panel'},
      {role: 'SEOUL_STREET', variantIndex: 4, sec: 2.5, motion: {kind: 'pan', dx: 7, scale: 1.14}, entry: {kind: 'color-block', frames: 7, color: '#E8674A', dir: 'right'}, noteJa: '色面transition'},
      {role: 'DEPARTURE', variantIndex: 2, sec: 2.6, motion: {kind: 'push-in', from: 1.0, to: 1.1}, entry: {kind: 'whip', frames: 6, dir: 'left'}, effects: [{kind: 'speed-lines', intensity: 0.5}], noteJa: '最大サビへの助走。speed lineを強く'},
    ],
  },
  {
    sectionId: 'chorus-2a',
    narrativeJa: '最大のサビ。B案の最高密度',
    intensity: 5,
    lyricTreatmentJa: '最大。shape背景つきで写真の上へ',
    shots: [
      {role: 'HERO_WIDE', variantIndex: 1, sec: 2.4, motion: {kind: 'push-in', from: 1.08, to: 1.0}, entry: {kind: 'scale-pop', frames: 7}, effects: [{kind: 'sparks', opacity: 0.5}, {kind: 'speed-lines', intensity: 0.55}, {kind: 'flash', frames: 2}], noteJa: '最大hit。flashは2frameのみ(1秒3回超えない)'},
      {role: 'HAWAII_WARM', variantIndex: 4, sec: 2.5, motion: {kind: 'pan', dx: -7, scale: 1.15}, entry: {kind: 'whip', frames: 5, dir: 'right'}, effects: [{kind: 'sparks', opacity: 0.34}], noteJa: 'whipで横へ飛び、hit後すぐ次の画へ展開する'},
      {role: 'HERO_CLOSE', variantIndex: 4, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'scale-pop', frames: 7}, effects: [{kind: 'sparks', opacity: 0.4}], noteJa: '2発目のhit。寄りで表情を見せる'},
      {role: 'HERO_WIDE', variantIndex: 7, sec: 2.6, motion: {kind: 'pull-out', from: 1.16, to: 1.0}, entry: {kind: 'color-block', frames: 7, color: '#F4C95D', dir: 'left'}, effects: [{kind: 'sparks', opacity: 0.45}], noteJa: '3発目。pull outで最大の開放'},
    ],
  },
  {
    sectionId: 'chorus-2b',
    narrativeJa: 'ピークを降ろし始める',
    intensity: 4,
    lyricTreatmentJa: '最後の4枠。徐々にscaleを落とす',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 3, sec: 2.4, motion: {kind: 'push-in', from: 1.0, to: 1.07}, entry: {kind: 'cut'}, effects: [{kind: 'halftone', opacity: 0.1}], noteJa: '海へ戻して旅全体を回想させる'},
      {role: 'HAWAII_WARM', variantIndex: 6, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'strip-3'}, extraRoles: [{role: 'OKINAWA_WIDE', variantIndex: 1}, {role: 'HERO_WIDE', variantIndex: 5}], noteJa: 'stripで旅を総括'},
      {role: 'HERO_WIDE', variantIndex: 0, sec: 2.5, motion: {kind: 'push-in', from: 1.05, to: 1.0}, entry: {kind: 'scale-pop', frames: 8}, effects: [{kind: 'sparks', opacity: 0.28}], noteJa: '最後のhit。ここから静かにする'},
      {role: 'END_BREATH', variantIndex: 4, sec: 2.6, motion: {kind: 'pull-out', from: 1.1, to: 1.0}, entry: {kind: 'dissolve', frames: 16}, noteJa: '間奏へ渡す。effectを外す'},
    ],
  },
  {
    sectionId: 'interlude-2a',
    narrativeJa: '熱を逃がす。graphicを外していく',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'BROLL_WALK', variantIndex: 0, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'dissolve', frames: 20}, noteJa: '歩行。B案でもここでhalftoneを外す'},
      {role: 'BROLL_TEXTURE', variantIndex: 2, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'dissolve', frames: 18}, noteJa: '水面の実動画。人を出さず休符を作る'},
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 2, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'wipe', dir: 'left', frames: 14}, noteJa: '会場の街が見えてくる'},
    ],
  },
  {
    sectionId: 'interlude-2b',
    narrativeJa: '来場者への感謝',
    intensity: 3,
    lyricTreatmentJa: '歌詞なし。来場感謝メッセージ',
    shots: [
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 8, sec: 4.0, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'iris', frames: 18}, effects: [{kind: 'sparks', opacity: 0.22}], noteJa: 'irisで開いて「ようこそ」へ'},
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 4, sec: 4.0, motion: {kind: 'pan', dx: -3, scale: 1.08}, entry: {kind: 'dissolve', frames: 18}, effects: [{kind: 'dust', opacity: 0.18}], noteJa: '感謝メッセージ背景。動きは抑える'},
    ],
  },
  {
    sectionId: 'end',
    narrativeJa: '名前と日付。元気に、しかし品よく着地',
    intensity: 3,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'END_BREATH', variantIndex: 0, sec: 3.0, motion: {kind: 'push-in', from: 1.0, to: 1.04}, entry: {kind: 'scale-pop', frames: 10}, effects: [{kind: 'sparks', opacity: 0.24}], noteJa: 'popで名前が出るが、背景は静かな水平線'},
    ],
  },
];

// ---------------------------------------------------------------------------
// C案: EDITORIAL TYPOGRAPHY
// 雑誌のgrid。写真と文字が対話する。containの黒帯は使わない。
// split/panel/crop/余白を使い分け、文字位置を毎回変える。
// ---------------------------------------------------------------------------
const C_SECTIONS: SectionDesign[] = [
  {
    sectionId: 'opening-pickup',
    narrativeJa: '期待。白い余白とgridから始まる',
    intensity: 1,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'NEGATIVE_SPACE', variantIndex: 5, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.04}, entry: {kind: 'slat', frames: 20, count: 6}, noteJa: '帯状に開くslat entry。A/B案には無いeditorial固有の入り'},
      {role: 'HERO_WIDE', variantIndex: 4, sec: 3.6, motion: {kind: 'push-in', from: 1.0, to: 1.03}, entry: {kind: 'wipe', dir: 'right', frames: 18}, layout: {kind: 'grid-editorial'}, extraRoles: [{role: 'NEGATIVE_SPACE', variantIndex: 2}, {role: 'OKINAWA_WIDE', variantIndex: 5}], noteJa: '大1+小2のeditorial grid。雑誌の見開き'},
    ],
  },
  {
    sectionId: 'intro',
    narrativeJa: '出発。gridが動いて情報が入れ替わる',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'DEPARTURE', variantIndex: 3, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'split-2', ratio: 0.62}, extraRoles: [{role: 'NEGATIVE_SPACE', variantIndex: 8}], noteJa: '62:38のsplit。黄金比寄りのeditorial分割'},
      {role: 'DEPARTURE', variantIndex: 5, sec: 2.5, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'slat', frames: 14, count: 4}, noteJa: 'slatで切り替え'},
      {role: 'DEPARTURE', variantIndex: 9, sec: 2.5, motion: {kind: 'pan', dx: 4, scale: 1.1}, entry: {kind: 'wipe', dir: 'left', frames: 14}, noteJa: '横移動のpan。slatと動きの種類を変える'},
      {role: 'BROLL_WALK', variantIndex: 2, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'cut'}, layout: {kind: 'inset', x: 58, y: 52, w: 34}, extraRoles: [{role: 'NEGATIVE_SPACE', variantIndex: 3}], noteJa: '余白の中に小さくinset。雑誌の図版レイアウト'},
    ],
  },
  {
    sectionId: 'verse-1a',
    narrativeJa: '二人の世界。文字が写真の余白へ入る',
    intensity: 2,
    lyricTreatmentJa: '大小コントラスト。写真のnegative spaceへ配置',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 9, sec: 2.7, motion: {kind: 'push-in', from: 1.0, to: 1.04}, entry: {kind: 'cut'}, noteJa: '海。歌詞1枠目'},
      {role: 'OKINAWA_WIDE', variantIndex: 2, sec: 2.7, motion: {kind: 'drift', dx: 0.8, dy: 0.4, scale: 1.03}, entry: {kind: 'slat', frames: 12, count: 5}, layout: {kind: 'split-2', ratio: 0.45}, extraRoles: [{role: 'HERO_CLOSE', variantIndex: 5}], noteJa: '45:55 split。1枠目とlayoutを変える'},
      {role: 'HERO_CLOSE', variantIndex: 1, sec: 2.8, motion: {kind: 'push-in', from: 1.05, to: 1.0}, entry: {kind: 'wipe', dir: 'down', frames: 14}, noteJa: '寄り。文字は上へ移す'},
      {role: 'OKINAWA_WIDE', variantIndex: 7, sec: 2.8, motion: {kind: 'pan', dx: -4, scale: 1.1}, entry: {kind: 'cut'}, noteJa: '海へ戻して区間を閉じる'},
    ],
  },
  {
    sectionId: 'verse-1b',
    narrativeJa: '旅の広がり。photo stripで時間を見せる',
    intensity: 3,
    lyricTreatmentJa: 'weightを変えて強調語を作る',
    shots: [
      {role: 'SEOUL_STREET', variantIndex: 6, sec: 2.4, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'cut'}, noteJa: '夜の街。海から街へ場所が変わる'},
      {role: 'SEOUL_STREET', variantIndex: 0, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'slat', frames: 14, count: 3}, layout: {kind: 'strip-3'}, extraRoles: [{role: 'SEOUL_STREET', variantIndex: 3}, {role: 'DETAIL_HAND', variantIndex: 1}], noteJa: 'photo strip。雑誌の連続写真'},
      {role: 'DETAIL_HAND', variantIndex: 6, sec: 2.5, motion: {kind: 'push-in', from: 1.06, to: 1.0}, entry: {kind: 'wipe', dir: 'right', frames: 14}, noteJa: '手元のdetail。旅の道具で生活感を出す'},
      {role: 'SEOUL_STREET', variantIndex: 2, sec: 2.6, motion: {kind: 'pan', dx: 5, scale: 1.12}, entry: {kind: 'cut'}, noteJa: '街を横に流してサビへの助走をつける'},
    ],
  },
  {
    sectionId: 'chorus-1a',
    narrativeJa: '1回目の開放。大きな文字と写真の対話',
    intensity: 4,
    lyricTreatmentJa: '最大級のtype。写真の余白へ大きく置く',
    shots: [
      {role: 'NEGATIVE_SPACE', variantIndex: 1, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'slat', frames: 16, count: 6}, effects: [{kind: 'glint', x: 70, y: 30}], noteJa: '余白の多い画。ここで文字を最大にできる'},
      {role: 'HERO_WIDE', variantIndex: 2, sec: 3.3, motion: {kind: 'push-in', from: 1.0, to: 1.035}, entry: {kind: 'wipe', dir: 'left', frames: 16}, layout: {kind: 'split-2', ratio: 0.55}, extraRoles: [{role: 'HAWAII_WARM', variantIndex: 3}], noteJa: 'splitで二人と夕景を並べる'},
      {role: 'HAWAII_WARM', variantIndex: 7, sec: 3.3, motion: {kind: 'pull-out', from: 1.1, to: 1.0}, entry: {kind: 'slat', frames: 14, count: 4}, effects: [{kind: 'dust', opacity: 0.12}], noteJa: 'pull outで開放'},
    ],
  },
  {
    sectionId: 'chorus-1b',
    narrativeJa: 'ピーク持続。type maskで写真を文字の中に入れる',
    intensity: 4,
    lyricTreatmentJa: 'type maskを1回だけ使う',
    shots: [
      {role: 'HAWAII_WARM', variantIndex: 1, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.06}, entry: {kind: 'cut'}, noteJa: '夕景のwide。サビの熱を保ちつつ画を変える'},
      {role: 'OKINAWA_WIDE', variantIndex: 0, sec: 3.3, motion: {kind: 'pan', dx: -5, scale: 1.12}, entry: {kind: 'slat', frames: 14, count: 5}, noteJa: '海を横に流して視線を送る'},
      {role: 'HERO_WIDE', variantIndex: 6, sec: 3.3, motion: {kind: 'push-in', from: 1.04, to: 1.0}, entry: {kind: 'wipe', dir: 'up', frames: 16}, effects: [{kind: 'glint', x: 45, y: 55}], noteJa: '二人のwideで区間を閉じる'},
    ],
  },
  {
    sectionId: 'interlude-1',
    narrativeJa: '落ち着く。白い余白へ戻る',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'NEGATIVE_SPACE', variantIndex: 6, sec: 3.3, motion: {kind: 'drift', dx: 1.2, dy: 0.5, scale: 1.04}, entry: {kind: 'slat', frames: 20, count: 8}, noteJa: '余白。editorialの「白いページ」'},
      {role: 'BROLL_TEXTURE', variantIndex: 0, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'wipe', dir: 'right', frames: 16}, noteJa: '水面の実動画。人を出さず休符を作る'},
      {role: 'NEGATIVE_SPACE', variantIndex: 0, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.04}, entry: {kind: 'cut'}, noteJa: '2番へ渡す'},
    ],
  },
  {
    sectionId: 'verse-2a',
    narrativeJa: '再出発。gridの分割比を変える',
    intensity: 3,
    lyricTreatmentJa: '縦書きを1回だけ挟む',
    shots: [
      {role: 'MOVEMENT_LEFT_TO_RIGHT', variantIndex: 1, sec: 2.4, motion: {kind: 'static'}, entry: {kind: 'cut'}, noteJa: '移動の実動画。2番の再出発を示す'},
      {role: 'OKINAWA_WIDE', variantIndex: 8, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'slat', frames: 14, count: 4}, layout: {kind: 'grid-editorial'}, extraRoles: [{role: 'DETAIL_HAND', variantIndex: 4}, {role: 'SEOUL_STREET', variantIndex: 5}], noteJa: '1番と違うgrid。大1+小2'},
      {role: 'DETAIL_HAND', variantIndex: 9, sec: 2.5, motion: {kind: 'push-in', from: 1.06, to: 1.0}, entry: {kind: 'wipe', dir: 'left', frames: 14}, noteJa: '手元のdetail。旅の道具で生活感を出す'},
      {role: 'HERO_WIDE', variantIndex: 8, sec: 2.6, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'cut'}, noteJa: '二人のwideへ戻り、区間を人物で閉じる'},
    ],
  },
  {
    sectionId: 'verse-2b',
    narrativeJa: '関係性。crop revealで主役を切り替える',
    intensity: 3,
    lyricTreatmentJa: 'tracking animationで間隔を開く',
    shots: [
      {role: 'HERO_CLOSE', variantIndex: 0, sec: 2.4, motion: {kind: 'push-in', from: 1.05, to: 1.0}, entry: {kind: 'cut'}, noteJa: '手の寄り。関係性を言葉でなく画で示す'},
      {role: 'DETAIL_HAND', variantIndex: 3, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'slat', frames: 12, count: 6}, layout: {kind: 'split-2', ratio: 0.38}, extraRoles: [{role: 'NEGATIVE_SPACE', variantIndex: 4}], noteJa: '38:62。余白を広く取って文字を置く'},
      {role: 'HERO_CLOSE', variantIndex: 4, sec: 2.5, motion: {kind: 'static'}, entry: {kind: 'wipe', dir: 'down', frames: 14}, effects: [{kind: 'glint', x: 52, y: 48}], noteJa: '指輪の一点だけglintで光らせる'},
      {role: 'DEPARTURE', variantIndex: 6, sec: 2.6, motion: {kind: 'push-in', from: 1.0, to: 1.07}, entry: {kind: 'cut'}, noteJa: '移動の画で最大サビへの助走をつける'},
    ],
  },
  {
    sectionId: 'chorus-2a',
    narrativeJa: '最大のサビ。typeが最も大きい',
    intensity: 5,
    lyricTreatmentJa: '最大type。写真面積も最大',
    shots: [
      {role: 'HERO_WIDE', variantIndex: 3, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.07}, entry: {kind: 'slat', frames: 12, count: 8}, effects: [{kind: 'dust', opacity: 0.16}, {kind: 'glint', x: 58, y: 42}], noteJa: '最大Hero。slatを細かくして勢いを出す'},
      {role: 'HAWAII_WARM', variantIndex: 0, sec: 3.3, motion: {kind: 'pan', dx: 5, scale: 1.12}, entry: {kind: 'wipe', dir: 'right', frames: 14}, effects: [{kind: 'prism', opacity: 0.14}], noteJa: '夕景を横に流し、サビの余韻を伸ばす'},
      {role: 'HERO_WIDE', variantIndex: 9, sec: 3.3, motion: {kind: 'pull-out', from: 1.12, to: 1.0}, entry: {kind: 'slat', frames: 14, count: 5}, effects: [{kind: 'dust', opacity: 0.14}], noteJa: 'pull outで最大の開放'},
    ],
  },
  {
    sectionId: 'chorus-2b',
    narrativeJa: '降ろし始める。gridを静かに戻す',
    intensity: 3,
    lyricTreatmentJa: '最後の4枠。typeを小さくしていく',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 4, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.04}, entry: {kind: 'cut'}, noteJa: '海のwide。旅の起点へ視線を戻す'},
      {role: 'END_BREATH', variantIndex: 3, sec: 3.3, motion: {kind: 'drift', dx: 0.7, dy: 0.4, scale: 1.03}, entry: {kind: 'slat', frames: 16, count: 4}, layout: {kind: 'split-2', ratio: 0.5}, extraRoles: [{role: 'HAWAII_WARM', variantIndex: 5}], noteJa: '50:50。均衡へ戻す'},
      {role: 'END_BREATH', variantIndex: 5, sec: 3.3, motion: {kind: 'push-in', from: 1.03, to: 1.0}, entry: {kind: 'wipe', dir: 'up', frames: 18}, noteJa: '水平線へ静かに着地し、間奏へ渡す'},
    ],
  },
  {
    sectionId: 'interlude-2a',
    narrativeJa: '総集編。contact sheet的に旅を並べる',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'OKINAWA_WIDE', variantIndex: 1, sec: 3.4, motion: {kind: 'push-in', from: 1.0, to: 1.028}, entry: {kind: 'slat', frames: 18, count: 4}, layout: {kind: 'panel-4'}, extraRoles: [{role: 'SEOUL_STREET', variantIndex: 4}, {role: 'HAWAII_WARM', variantIndex: 2}, {role: 'DETAIL_HAND', variantIndex: 5}], noteJa: '4分割で旅の総集編。C案では罫線つきgridとして見せる'},
      {role: 'BROLL_WALK', variantIndex: 1, sec: 3.3, motion: {kind: 'static'}, entry: {kind: 'wipe', dir: 'left', frames: 16}, noteJa: '歩行の実動画。旅が続いていた時間を示す'},
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 5, sec: 3.3, motion: {kind: 'push-in', from: 1.0, to: 1.05}, entry: {kind: 'slat', frames: 16, count: 5}, noteJa: '会場のある街へ。旅の終点が見えてくる'},
    ],
  },
  {
    sectionId: 'interlude-2b',
    narrativeJa: '来場者への感謝',
    intensity: 3,
    lyricTreatmentJa: '歌詞なし。感謝メッセージをeditorialに組む',
    shots: [
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 3, sec: 4.0, motion: {kind: 'push-in', from: 1.0, to: 1.04}, entry: {kind: 'slat', frames: 20, count: 6}, noteJa: '横浜。文字を組むための余白を確保'},
      {role: 'ARRIVAL_YOKOHAMA', variantIndex: 7, sec: 4.0, motion: {kind: 'pan', dx: -3, scale: 1.07}, entry: {kind: 'wipe', dir: 'right', frames: 18}, effects: [{kind: 'dust', opacity: 0.14}], noteJa: '感謝メッセージ背景'},
    ],
  },
  {
    sectionId: 'end',
    narrativeJa: '名前と日付。clean lockup',
    intensity: 2,
    lyricTreatmentJa: '歌詞なし',
    shots: [
      {role: 'END_BREATH', variantIndex: 1, sec: 3.0, motion: {kind: 'push-in', from: 1.0, to: 1.03}, entry: {kind: 'slat', frames: 20, count: 5}, effects: [{kind: 'glint', x: 50, y: 52}], noteJa: 'slatで開いてclean lockup。雑誌の奥付のように静かに終わる'},
    ],
  },
];

export const START_129_STORYBOARDS: Record<Start129Variant, VariantStoryboard> = {
  A: {
    variant: 'A',
    nameJa: '旅の記録映画 / CINEMATIC EMOTIONAL',
    grammarJa: 'push-in・parallax・dissolve・light leak・余白。静かでも光と奥行きで演出する',
    sections: A_SECTIONS,
  },
  B: {
    variant: 'B',
    nameJa: '冒険アニメOP / JOYFUL ANIME OPENING',
    grammarJa: 'panel・whip・color block・scale pop・halftone・speed line。写真は常に主役',
    sections: B_SECTIONS,
  },
  C: {
    variant: 'C',
    nameJa: 'リズム・タイポMV / EDITORIAL TYPOGRAPHY',
    grammarJa: 'editorial grid・slat wipe・split・strip・大小type contrast。黒帯を使わない',
    sections: C_SECTIONS,
  },
};

/** shot列をsection内のframe windowへ展開する(秒指定→frame、端数はlast shotが吸収)。 */
export type PlacedShot = Shot & {localFrom: number; durationInFrames: number; index: number};

export const placeShots = (design: SectionDesign): PlacedShot[] => {
  const section = START_129_SECTIONS.find((s) => s.id === design.sectionId);
  if (!section) throw new Error(`未知のsection: ${design.sectionId}`);
  const total = Math.round((section.endSec - section.startSec) * START_129_FPS);
  const raw = design.shots.map((s) => Math.max(1, Math.round(s.sec * START_129_FPS)));
  const sum = raw.reduce((a, b) => a + b, 0);
  // 合計がsection長と一致しない場合は最後のshotで吸収する(gap/overlapを作らない)
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
  // 端数で最後がずれた場合の最終補正
  const last = placed[placed.length - 1];
  if (last) last.durationInFrames = total - last.localFrom;
  return placed;
};

/**
 * entryが「前の画に重なって入る」種類の場合、その所要frame数を返す。
 *
 * Sequenceは連続配置されるため、そのままだと次shotのwipe/dissolve中に
 * 前shotが既に消えており、背景色(ほぼ黒)が透けて一瞬暗くなる。
 * 前shotの表示を次shotのentry分だけ延長して重ねるために使う。
 */
export const entryOverlapFrames = (entry: ShotEntry): number => {
  switch (entry.kind) {
    case 'cut':
      return 0;
    case 'fade':
    case 'dissolve':
    case 'blur-in':
    case 'wipe':
    case 'iris':
    case 'whip':
    case 'scale-pop':
    case 'slat':
      return entry.frames;
    case 'color-block':
      // 色面が画面を覆うので前shotを見せる必要は薄いが、頭の数frameだけ重ねる
      return Math.ceil(entry.frames / 2);
  }
};

export const storyboardFor = (variant: Start129Variant) => START_129_STORYBOARDS[variant];

export const sectionDesign = (variant: Start129Variant, sectionId: Start129SectionId): SectionDesign => {
  const d = START_129_STORYBOARDS[variant].sections.find((s) => s.sectionId === sectionId);
  if (!d) throw new Error(`${variant}案に${sectionId}の設計がない`);
  return d;
};

/** 全variantの総shot数(QA報告用)。 */
export const totalShotCount = (variant: Start129Variant) =>
  START_129_STORYBOARDS[variant].sections.reduce((n, s) => n + s.shots.length, 0);
