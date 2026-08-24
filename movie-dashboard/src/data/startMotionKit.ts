export type MotionFamily = "TYPO" | "PHOTO" | "TRANSITION" | "ANIME_ACCENT";
export type MotionEnergy = "quiet" | "build" | "hit" | "peak" | "release";
export type MotionInput = "lyric-slot" | "caption" | "photo" | "video" | "shape";
export type MotionEngine = "remotion" | "palmier-native" | "davinci-edit" | "davinci-fusion";
export type MotionStatus = "planned" | "prototype" | "ready";

export interface StartMotionPreset {
  motionId: string;
  family: MotionFamily;
  label: string;
  input: MotionInput[];
  energy: MotionEnergy[];
  engine: MotionEngine;
  durationFrames: [number, number];
  beatBehavior: "hold" | "single-hit" | "triplet" | "stagger" | "sweep" | "release";
  safeForStillPhoto: boolean;
  recommendedSections: string[];
  learn: string[];
  purpose: string;
  avoidWhen: string;
  status: MotionStatus;
}

const p = (
  motionId: string,
  family: MotionFamily,
  label: string,
  input: MotionInput[],
  energy: MotionEnergy[],
  engine: MotionEngine,
  durationFrames: [number, number],
  beatBehavior: StartMotionPreset["beatBehavior"],
  safeForStillPhoto: boolean,
  recommendedSections: string[],
  learn: string[],
  purpose: string,
  avoidWhen: string,
): StartMotionPreset => ({
  motionId,
  family,
  label,
  input,
  energy,
  engine,
  durationFrames,
  beatBehavior,
  safeForStillPhoto,
  recommendedSections,
  learn,
  purpose,
  avoidWhen,
  status: "planned",
});

export const startMotionPresets: StartMotionPreset[] = [
  p("type-mask-slide", "TYPO", "Mask Slide", ["lyric-slot", "caption"], ["build", "hit"], "remotion", [8, 18], "sweep", true, ["verse", "location-title"], ["davinci-text", "concept-framing"], "固定文字を形の境界から見せる。", "写真の主役へ被る長文。"),
  p("type-char-stagger", "TYPO", "Character Stagger", ["lyric-slot"], ["build", "peak"], "remotion", [8, 24], "stagger", true, ["pre-chorus", "chorus"], ["davinci-text", "davinci-keyframe"], "文字ごとの時間差でフレーズを立ち上げる。", "一文が長く読了時間が足りない時。"),
  p("type-word-punch", "TYPO", "Word Punch", ["lyric-slot", "caption"], ["hit", "peak"], "remotion", [4, 10], "single-hit", true, ["chorus", "accent"], ["davinci-keyframe", "concept-rhythm"], "重要語1つだけを瞬間的に強調。", "連続する全単語へ適用。"),
  p("type-tracking-burst", "TYPO", "Tracking Burst", ["lyric-slot", "caption"], ["build", "release"], "remotion", [10, 24], "release", true, ["intro", "ending"], ["davinci-easing", "concept-typography"], "字間が開いて呼吸するように着地。", "小さい文字や長文。"),
  p("type-outline-fill", "TYPO", "Outline to Fill", ["lyric-slot", "caption"], ["build", "hit"], "remotion", [8, 20], "single-hit", true, ["location-title", "chorus"], ["concept-typography"], "線から面へ変わり、タイトルの確定感を出す。", "細い日本語本文。"),
  p("type-baseline-hop", "TYPO", "Baseline Hop", ["lyric-slot"], ["hit"], "remotion", [4, 12], "triplet", true, ["three-hit", "chorus"], ["concept-rhythm", "davinci-keyframe"], "3hitなどで文字列の一部だけ軽く跳ねる。", "感情的なHero写真上。"),
  p("type-vertical-wipe", "TYPO", "Vertical Wipe", ["lyric-slot", "caption"], ["build"], "remotion", [8, 20], "sweep", true, ["verse", "chapter"], ["concept-typography", "concept-framing"], "縦方向の余白を使って文字をreveal。", "横長の英字を無理に縦配置する時。"),
  p("type-type-on-rhythm", "TYPO", "Rhythm Type On", ["lyric-slot"], ["build", "hit"], "remotion", [8, 30], "stagger", true, ["verse", "pre-chorus"], ["davinci-marker", "concept-rhythm"], "音の区切り候補に合わせて語単位で現す。", "歌の全音節へ追従してカラオケ化する時。"),
  p("type-triplet", "TYPO", "Triplet Type", ["lyric-slot", "caption"], ["hit", "peak"], "remotion", [6, 16], "triplet", true, ["three-hit", "chorus-2"], ["davinci-marker", "davinci-text"], "3連アクセントを3つの短い文字/記号で拾う。", "3連音が存在しない場所。"),
  p("type-counter-scroll", "TYPO", "Counter Scroll", ["lyric-slot", "caption"], ["build"], "remotion", [12, 30], "sweep", true, ["travel-montage"], ["concept-framing", "davinci-transform"], "背景の移動と逆向きに文字を流し速度差を作る。", "背景が完全staticで方向根拠がない時。"),
  p("type-frame-lock", "TYPO", "Frame Lock", ["caption", "lyric-slot"], ["peak"], "remotion", [8, 30], "hold", true, ["chorus", "anime-shift"], ["concept-typography", "concept-framing"], "大きい文字の一部を画面外へ切り、poster的な強さを作る。", "顔や重要な場所情報を覆う時。"),
  p("type-quiet-caption", "TYPO", "Quiet Caption", ["caption", "lyric-slot"], ["quiet", "release"], "davinci-edit", [12, 36], "hold", true, ["hero", "ending"], ["davinci-text", "concept-stillness"], "動かさない/最小fadeで読む時間を守る。", "勢いだけを求めている短いhit。"),

  p("photo-static-hero", "PHOTO", "Static Hero", ["photo"], ["quiet", "peak"], "davinci-edit", [24, 180], "hold", true, ["chorus", "hero"], ["concept-stillness", "concept-framing"], "強い写真を動かさず見せる。", "写真自体に視線の中心がない時。"),
  p("photo-small-push", "PHOTO", "Small Push", ["photo"], ["build", "peak"], "davinci-edit", [24, 150], "release", true, ["hero", "chorus"], ["davinci-transform", "davinci-keyframe", "davinci-easing"], "1.00→1.03〜1.05程度の小さな寄り。", "全写真へ同じpresetを敷く時。"),
  p("photo-slow-pull", "PHOTO", "Slow Pull", ["photo"], ["release"], "davinci-edit", [30, 180], "release", true, ["arrival", "ending"], ["davinci-transform", "davinci-easing"], "少し引いて景色/余白を開き着地する。", "顔が小さくなりすぎる縦写真。"),
  p("photo-directional-pan", "PHOTO", "Directional Pan", ["photo"], ["build"], "davinci-edit", [30, 120], "sweep", true, ["travel", "verse"], ["davinci-transform", "concept-framing"], "写真内の視線/移動方向に沿ってpan。", "方向根拠のない中央人物写真。"),
  p("photo-2p5d-parallax", "PHOTO", "2.5D Parallax", ["photo"], ["build", "peak"], "remotion", [24, 90], "sweep", true, ["anime-shift", "hero-alt"], ["concept-framing", "davinci-fusion-node"], "前景/背景を分けて奥行きを感じさせる。", "切り抜き品質が低い写真や全カット。"),
  p("photo-freeze-cutout", "PHOTO", "Freeze Cutout", ["photo", "video"], ["hit", "peak"], "remotion", [8, 36], "single-hit", true, ["anime-shift", "travel-montage"], ["concept-framing", "davinci-text"], "人物/物の実素材cutout + graphic labelでOP的な一瞬を作る。", "AIで人物を再生成する必要がある時。"),
  p("photo-contact-sheet-snap", "PHOTO", "Contact Sheet Snap", ["photo"], ["build", "peak"], "remotion", [12, 48], "stagger", true, ["instrumental", "montage"], ["concept-rhythm", "concept-story"], "複数写真をcontact sheetのように短く並べる。", "重要写真を小さくしすぎる時。"),
  p("photo-split-panel", "PHOTO", "Split Panel", ["photo", "video"], ["build", "peak"], "remotion", [12, 60], "stagger", true, ["anime-shift", "chorus-2"], ["concept-framing", "concept-rhythm"], "2〜3panelで同時性と速度感を作る。", "4分割以上でスマホUIのようになる時。"),

  p("cut-hard-accent", "TRANSITION", "Hard Cut Accent", ["photo", "video"], ["hit", "peak"], "palmier-native", [1, 2], "single-hit", true, ["all"], ["concept-rhythm", "concept-continuity"], "Effectを足さずcut位置だけで強さを作る。", "時間経過や余韻を明確に表したい時。"),
  p("cut-match-shape", "TRANSITION", "Shape Match Cut", ["photo", "video"], ["build", "hit"], "palmier-native", [1, 6], "single-hit", true, ["travel", "instrumental"], ["concept-continuity", "concept-framing"], "形/方向/明度の似た素材を直接つなぐ。", "共通形状がないのに無理やりcropする時。"),
  p("wipe-directional-shape", "TRANSITION", "Directional Shape Wipe", ["shape", "photo", "video"], ["build"], "remotion", [6, 16], "sweep", true, ["chapter", "instrumental"], ["concept-continuity", "davinci-keyframe"], "1枚のshapeが画面を横切り次shotをreveaI。", "全章で同じwipeを繰り返す時。"),
  p("wipe-paper-edge", "TRANSITION", "Paper Edge Wipe", ["shape", "photo"], ["build", "release"], "remotion", [8, 20], "sweep", true, ["travel-book", "instrumental"], ["concept-continuity"], "紙/チケットのedgeで画面を切り替える。", "紙の物理ロジックが見えない浮遊カード。"),
  p("wipe-route-line", "TRANSITION", "Route Line Wipe", ["shape", "photo", "video"], ["build"], "remotion", [10, 24], "sweep", true, ["travel", "arrival"], ["concept-continuity", "davinci-keyframe"], "route lineの進行方向を次cutへ接続する。", "地図/移動文脈がない場面。"),
  p("flash-one-frame-soft", "TRANSITION", "Soft Impact Frame", ["shape", "photo", "video"], ["hit", "peak"], "remotion", [1, 3], "single-hit", true, ["chorus-peak"], ["concept-rhythm"], "1〜2frameの淡いimpactで大きな音だけ拾う。", "光過敏・連打・常用。"),
  p("whip-source-matched", "TRANSITION", "Source-matched Whip", ["video"], ["hit", "peak"], "davinci-edit", [6, 16], "sweep", false, ["moving-broll"], ["davinci-transform", "davinci-easing", "concept-continuity"], "実動画のcamera directionが一致する時だけwhipで接続。", "静止画や方向が逆の素材。"),
  p("color-field-release", "TRANSITION", "Color Field Release", ["shape", "caption"], ["release", "quiet"], "remotion", [8, 24], "release", true, ["arrival", "ending"], ["concept-color-consistency", "concept-stillness"], "情報量を一度color fieldへ落として次章へ呼吸を作る。", "サビの最中に長く画を隠す時。"),

  p("accent-speed-lines", "ANIME_ACCENT", "Speed Lines", ["shape", "photo", "video"], ["hit", "peak"], "remotion", [4, 12], "sweep", true, ["anime-shift", "chorus"], ["concept-rhythm", "concept-framing"], "短い線群で方向と加速感を補助。", "12frame超の常設背景。"),
  p("accent-impact-frame", "ANIME_ACCENT", "Impact Frame", ["shape", "photo", "video"], ["peak"], "remotion", [1, 3], "single-hit", true, ["major-peak"], ["concept-rhythm"], "最大peakだけ色/明度を1〜2frame反転。", "3秒に1回のような乱用。"),
  p("accent-halftone-burst", "ANIME_ACCENT", "Halftone Burst", ["shape", "photo"], ["hit", "peak"], "remotion", [6, 16], "single-hit", true, ["anime-shift", "triplet"], ["concept-framing", "concept-color-consistency"], "halftoneを一瞬だけ展開しflat graphic感を出す。", "写真全体を長時間漫画加工する時。"),
  p("accent-scribble-underline", "ANIME_ACCENT", "Scribble Underline", ["shape", "caption", "lyric-slot"], ["hit", "build"], "remotion", [5, 14], "sweep", true, ["verse", "caption-hit"], ["concept-typography", "concept-rhythm"], "一語/短いcaptionを手描き線で拾う。", "長文全体を囲む時。"),
  p("accent-stamp-triplet", "ANIME_ACCENT", "Stamp Triplet", ["shape", "caption"], ["hit", "peak"], "remotion", [6, 18], "triplet", true, ["three-hit", "chorus-2"], ["davinci-marker", "concept-rhythm"], "passport/date/route dotを3hitだけ打つ。", "意味のないstamp装飾を増殖させる時。"),
  p("accent-panel-grid", "ANIME_ACCENT", "Panel Grid", ["photo", "video", "shape"], ["build", "peak"], "remotion", [12, 36], "stagger", true, ["instrumental", "anime-shift"], ["concept-framing", "concept-rhythm"], "2〜3panelを一瞬組み替えてOP的な展開を作る。", "固定UIカードのように長く残す時。"),
  p("accent-cel-shadow-sweep", "ANIME_ACCENT", "Cel Shadow Sweep", ["shape", "photo"], ["build", "hit"], "remotion", [6, 16], "sweep", true, ["anime-shift", "location-title"], ["concept-color-consistency", "davinci-keyframe"], "flatな影shapeが横切りsection colorを変える。", "顔の上に濃い影を長く置く時。"),
  p("accent-micro-rgb-split", "ANIME_ACCENT", "Micro RGB Split", ["photo", "video", "caption"], ["hit", "peak"], "remotion", [2, 6], "single-hit", true, ["major-hit"], ["concept-rhythm"], "2〜4frameだけRGB edgeをずらしimpactを補助。", "glitch aestheticを常時使う時。"),
];

export const motionFamilies: MotionFamily[] = ["TYPO", "PHOTO", "TRANSITION", "ANIME_ACCENT"];
export const motionEnergies: MotionEnergy[] = ["quiet", "build", "hit", "peak", "release"];
export const motionInputs: MotionInput[] = ["lyric-slot", "caption", "photo", "video", "shape"];

export function buildPalmierMotionHandoff(preset: StartMotionPreset) {
  return [
    `Use motion preset: ${preset.motionId} / ${preset.label}.`,
    `Purpose: ${preset.purpose}`,
    `Energy: ${preset.energy.join(", ")}. Beat behavior: ${preset.beatBehavior}.`,
    `Target duration: ${preset.durationFrames[0]}-${preset.durationFrames[1]} frames at 30fps unless the source timing requires otherwise.`,
    `Primary engine: ${preset.engine}. Inputs: ${preset.input.join(", ")}.`,
    `Wedding sections: ${preset.recommendedSections.join(", ")}.`,
    `Do not use when: ${preset.avoidWhen}`,
    `Keep real bride/groom/dog imagery unchanged; do not generate or transform their identity.`,
    `Return a subtle S, editorial M, and peak L variant, then keep none automatically. Record timing and parameters for A/B review.`,
  ].join("\n");
}
