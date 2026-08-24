export type MotionFamily = "TYPO" | "PHOTO" | "TRANSITION" | "ANIME_ACCENT";
export type MotionEnergy = "quiet" | "build" | "hit" | "peak" | "release";
export type MotionSource = "lyric" | "caption" | "photo" | "video" | "shape";
export type MotionEngine = "remotion" | "palmier-native" | "davinci-edit" | "mixed";
export type MotionStatus = "planned" | "renderable" | "reviewed" | "approved";
export type MotionIntensity = "S" | "M" | "L";
export type SharedMotionEngine = "typography-reveal" | "camera-transform" | "transition-wipe" | "graphic-hit" | "native-cut";

export interface StartMotionPreset {
  id: string;
  label: string;
  category: MotionFamily;
  energy: MotionEnergy[];
  beatBehavior: "hold" | "single-hit" | "triplet" | "stagger" | "sweep" | "release";
  durationFrames: [number, number];
  intensity: MotionIntensity[];
  safeForStillPhoto: boolean;
  source: MotionSource[];
  useCases: string[];
  engine: MotionEngine;
  sharedEngine: SharedMotionEngine;
  skillIds: string[];
  purpose: string;
  avoidWhen: string;
  status: MotionStatus;
}

const p = (
  id: string,
  category: MotionFamily,
  label: string,
  source: MotionSource[],
  energy: MotionEnergy[],
  engine: MotionEngine,
  sharedEngine: SharedMotionEngine,
  durationFrames: [number, number],
  beatBehavior: StartMotionPreset["beatBehavior"],
  safeForStillPhoto: boolean,
  useCases: string[],
  skillIds: string[],
  purpose: string,
  avoidWhen: string,
): StartMotionPreset => ({
  id,
  category,
  label,
  source,
  energy,
  engine,
  sharedEngine,
  durationFrames,
  beatBehavior,
  safeForStillPhoto,
  useCases,
  skillIds,
  purpose,
  avoidWhen,
  intensity: ["S", "M", "L"],
  status: "planned",
});

export const startMotionPresets: StartMotionPreset[] = [
  p("type-mask-slide", "TYPO", "Mask Slide", ["lyric", "caption"], ["build", "hit"], "remotion", "typography-reveal", [8, 18], "sweep", true, ["lyric", "location-title"], ["davinci-text", "concept-framing"], "固定文字を形の境界から見せる。", "写真の主役へ被る長文。"),
  p("type-char-stagger", "TYPO", "Character Stagger", ["lyric"], ["build", "peak"], "remotion", "typography-reveal", [8, 24], "stagger", true, ["lyric", "chorus"], ["davinci-text", "davinci-keyframe"], "文字ごとの時間差でフレーズを立ち上げる。", "一文が長く読了時間が足りない時。"),
  p("type-word-punch", "TYPO", "Word Punch", ["lyric", "caption"], ["hit", "peak"], "remotion", "typography-reveal", [4, 10], "single-hit", true, ["lyric", "accent"], ["davinci-keyframe", "concept-rhythm"], "重要語1つだけを瞬間的に強調する。", "連続する全単語へ適用する時。"),
  p("type-tracking-burst", "TYPO", "Tracking Burst", ["lyric", "caption"], ["build", "release"], "remotion", "typography-reveal", [10, 24], "release", true, ["lyric", "ending"], ["davinci-easing", "concept-typography"], "字間を開いて呼吸するように着地する。", "小さい文字や長文。"),
  p("type-outline-fill", "TYPO", "Outline to Fill", ["lyric", "caption"], ["build", "hit"], "remotion", "typography-reveal", [8, 20], "single-hit", true, ["lyric", "location-title"], ["davinci-text", "concept-typography"], "線から面へ変わりタイトルの確定感を出す。", "細い日本語本文。"),
  p("type-baseline-hop", "TYPO", "Baseline Hop", ["lyric"], ["hit"], "remotion", "typography-reveal", [4, 12], "triplet", true, ["lyric", "3-hit"], ["davinci-keyframe", "concept-rhythm"], "3-hitで文字列の一部だけ軽く跳ねる。", "感情的なHero写真を邪魔する時。"),
  p("type-vertical-wipe", "TYPO", "Vertical Wipe", ["lyric", "caption"], ["build"], "remotion", "typography-reveal", [8, 20], "sweep", true, ["lyric", "chapter"], ["davinci-text", "concept-framing"], "縦方向の余白を使って文字をrevealする。", "横長の英字を無理に縦配置する時。"),
  p("type-type-on-rhythm", "TYPO", "Rhythm Type On", ["lyric"], ["build", "hit"], "remotion", "typography-reveal", [8, 30], "stagger", true, ["lyric", "rhythm"], ["davinci-marker", "davinci-text"], "音の区切り候補に合わせて語単位で現す。", "全音節へ追従してカラオケ化する時。"),
  p("type-triplet", "TYPO", "Triplet Type", ["lyric", "caption"], ["hit", "peak"], "remotion", "typography-reveal", [6, 16], "triplet", true, ["lyric", "3-hit"], ["davinci-marker", "davinci-text"], "3連アクセントを3つの短い文字や記号で拾う。", "3連音が存在しない場所。"),
  p("type-counter-scroll", "TYPO", "Counter Scroll", ["lyric", "caption"], ["build"], "remotion", "typography-reveal", [12, 30], "sweep", true, ["lyric", "travel"], ["davinci-transform", "concept-framing"], "背景の移動と逆向きに文字を流し速度差を作る。", "背景が完全staticで方向根拠がない時。"),
  p("type-frame-lock", "TYPO", "Frame Lock", ["caption", "lyric"], ["peak"], "remotion", "typography-reveal", [8, 30], "hold", true, ["lyric", "hero"], ["davinci-text", "concept-framing"], "大きい文字の一部を画面外へ切りposter的な強さを作る。", "顔や重要情報を覆う時。"),
  p("type-quiet-caption", "TYPO", "Quiet Caption", ["caption", "lyric"], ["quiet", "release"], "davinci-edit", "typography-reveal", [12, 36], "hold", true, ["lyric", "wedding-greeting"], ["davinci-text", "concept-stillness"], "動かさないか最小fadeで読む時間を守る。", "勢いだけを求める短いhit。"),

  p("photo-static-hero", "PHOTO", "Static Hero", ["photo"], ["quiet", "peak"], "davinci-edit", "camera-transform", [24, 180], "hold", true, ["photo", "hero"], ["davinci-transform", "concept-stillness"], "強い実写真を動かさず見せる。", "写真自体に視線の中心がない時。"),
  p("photo-small-push", "PHOTO", "Small Push", ["photo"], ["build", "peak"], "davinci-edit", "camera-transform", [24, 150], "release", true, ["photo", "hero"], ["davinci-transform", "davinci-keyframe", "davinci-easing"], "1.00→1.03〜1.05程度の小さな寄り。", "全写真へ同じpresetを敷く時。"),
  p("photo-slow-pull", "PHOTO", "Slow Pull", ["photo"], ["release"], "davinci-edit", "camera-transform", [30, 180], "release", true, ["photo", "release"], ["davinci-transform", "davinci-easing"], "少し引いて景色や余白を開き着地する。", "顔が小さくなりすぎる縦写真。"),
  p("photo-directional-pan", "PHOTO", "Directional Pan", ["photo"], ["build"], "davinci-edit", "camera-transform", [30, 120], "sweep", true, ["photo", "travel"], ["davinci-transform", "concept-framing"], "写真内の視線や移動方向に沿ってpanする。", "方向根拠のない中央人物写真。"),
  p("photo-2p5d-parallax", "PHOTO", "2.5D Parallax", ["photo"], ["build", "peak"], "mixed", "camera-transform", [24, 90], "sweep", true, ["photo", "anime-op"], ["davinci-fusion-node", "concept-framing"], "実写真の前景と背景を分け奥行きを感じさせる。", "切り抜き品質が低い写真や全カット。"),
  p("photo-freeze-cutout", "PHOTO", "Freeze Cutout", ["photo", "video"], ["hit", "peak"], "remotion", "camera-transform", [8, 36], "single-hit", true, ["photo", "video", "anime-op"], ["davinci-text", "concept-framing"], "実素材cutoutとgraphic labelでOP的な一瞬を作る。", "人物や犬をAI再生成する必要がある時。"),
  p("photo-contact-sheet-snap", "PHOTO", "Contact Sheet Snap", ["photo"], ["build", "peak"], "remotion", "camera-transform", [12, 48], "stagger", true, ["photo", "montage"], ["concept-rhythm", "concept-story"], "複数の実写真をcontact sheetのように短く並べる。", "重要写真を小さくしすぎる時。"),
  p("photo-split-panel", "PHOTO", "Split Panel", ["photo", "video"], ["build", "peak"], "remotion", "camera-transform", [12, 60], "stagger", true, ["photo", "video", "anime-op"], ["concept-framing", "concept-rhythm"], "2〜3panelで同時性と速度感を作る。", "4分割以上で固定UIのようになる時。"),

  p("cut-hard-accent", "TRANSITION", "Hard Cut Accent", ["photo", "video"], ["hit", "peak"], "palmier-native", "native-cut", [1, 2], "single-hit", true, ["photo", "video", "rhythm"], ["davinci-trim", "concept-rhythm"], "Effectを足さずcut位置だけで強さを作る。", "時間経過や余韻を明確に表したい時。"),
  p("cut-match-shape", "TRANSITION", "Shape Match Cut", ["photo", "video"], ["build", "hit"], "palmier-native", "native-cut", [1, 6], "single-hit", true, ["photo", "video", "travel"], ["davinci-trim", "concept-continuity"], "形や方向の似た実素材を直接つなぐ。", "共通形状がないのに無理やりcropする時。"),
  p("wipe-directional-shape", "TRANSITION", "Directional Shape Wipe", ["shape", "photo", "video"], ["build"], "remotion", "transition-wipe", [6, 16], "sweep", true, ["photo", "video", "chapter"], ["davinci-keyframe", "concept-continuity"], "1枚のshapeが画面を横切り次shotをrevealする。", "全章で同じwipeを繰り返す時。"),
  p("wipe-paper-edge", "TRANSITION", "Paper Edge Wipe", ["shape", "photo"], ["build", "release"], "remotion", "transition-wipe", [8, 20], "sweep", true, ["photo", "travel"], ["davinci-keyframe", "concept-continuity"], "紙やチケットのedgeで画面を切り替える。", "紙の物理ロジックがない浮遊カード。"),
  p("wipe-route-line", "TRANSITION", "Route Line Wipe", ["shape", "photo", "video"], ["build"], "remotion", "transition-wipe", [10, 24], "sweep", true, ["photo", "video", "travel"], ["davinci-keyframe", "concept-continuity"], "route lineの進行方向を次cutへ接続する。", "地図や移動文脈がない場面。"),
  p("flash-one-frame-soft", "TRANSITION", "Soft Impact Frame", ["shape", "photo", "video"], ["hit", "peak"], "remotion", "transition-wipe", [1, 3], "single-hit", true, ["photo", "video", "3-hit"], ["davinci-marker", "concept-rhythm"], "1〜2frameの淡いimpactで大きな音だけ拾う。", "光過敏リスク、連打、常用。"),
  p("whip-source-matched", "TRANSITION", "Source-matched Whip", ["video"], ["hit", "peak"], "davinci-edit", "transition-wipe", [6, 16], "sweep", false, ["video", "moving-broll"], ["davinci-transform", "davinci-easing", "concept-continuity"], "実動画のcamera directionが一致する時だけwhipで接続する。", "静止画や方向が逆の素材。"),
  p("color-field-release", "TRANSITION", "Color Field Release", ["shape", "caption"], ["release", "quiet"], "remotion", "transition-wipe", [8, 24], "release", true, ["caption", "release"], ["concept-color-consistency", "concept-stillness"], "情報量を一度color fieldへ落として次章へ呼吸を作る。", "サビの最中に長く画を隠す時。"),

  p("accent-speed-lines", "ANIME_ACCENT", "Speed Lines", ["shape", "photo", "video"], ["hit", "peak"], "remotion", "graphic-hit", [4, 12], "sweep", true, ["photo", "video", "anime-op"], ["davinci-keyframe", "concept-rhythm"], "短い線群で方向と加速感を補助する。", "長時間の常設背景。"),
  p("accent-impact-frame", "ANIME_ACCENT", "Impact Frame", ["shape", "photo", "video"], ["peak"], "remotion", "graphic-hit", [1, 3], "single-hit", true, ["photo", "video", "peak"], ["davinci-marker", "concept-rhythm"], "最大peakだけ色や明度を1〜2frame変化させる。", "数秒おきに乱用する時。"),
  p("accent-halftone-burst", "ANIME_ACCENT", "Halftone Burst", ["shape", "photo"], ["hit", "peak"], "remotion", "graphic-hit", [6, 16], "single-hit", true, ["photo", "anime-op"], ["concept-framing", "concept-color-consistency"], "halftoneを一瞬だけ展開しflat graphic感を出す。", "写真全体を長時間漫画加工する時。"),
  p("accent-scribble-underline", "ANIME_ACCENT", "Scribble Underline", ["shape", "caption", "lyric"], ["hit", "build"], "remotion", "graphic-hit", [5, 14], "sweep", true, ["lyric", "caption", "anime-op"], ["davinci-text", "concept-rhythm"], "一語や短いcaptionを手描き線で拾う。", "長文全体を囲む時。"),
  p("accent-stamp-triplet", "ANIME_ACCENT", "Stamp Triplet", ["shape", "caption"], ["hit", "peak"], "remotion", "graphic-hit", [6, 18], "triplet", true, ["caption", "3-hit", "travel"], ["davinci-marker", "concept-rhythm"], "passport、date、route dotを3hitだけ打つ。", "意味のないstamp装飾を増殖させる時。"),
  p("accent-panel-grid", "ANIME_ACCENT", "Panel Grid", ["photo", "video", "shape"], ["build", "peak"], "remotion", "graphic-hit", [12, 36], "stagger", true, ["photo", "video", "anime-op"], ["concept-framing", "concept-rhythm"], "2〜3panelを一瞬組み替えてOP的な展開を作る。", "固定UIカードのように長く残す時。"),
  p("accent-cel-shadow-sweep", "ANIME_ACCENT", "Cel Shadow Sweep", ["shape", "photo"], ["build", "hit"], "remotion", "graphic-hit", [6, 16], "sweep", true, ["photo", "anime-op"], ["davinci-keyframe", "concept-color-consistency"], "flatな影shapeが横切りsection colorを変える。", "顔の上に濃い影を長く置く時。"),
  p("accent-micro-rgb-split", "ANIME_ACCENT", "Micro RGB Split", ["photo", "video", "caption"], ["hit", "peak"], "remotion", "graphic-hit", [2, 6], "single-hit", true, ["photo", "video", "peak"], ["davinci-keyframe", "concept-rhythm"], "2〜4frameだけRGB edgeをずらしimpactを補助する。", "glitch aestheticを常時使う時。"),
];

export const motionFamilies: MotionFamily[] = ["TYPO", "PHOTO", "TRANSITION", "ANIME_ACCENT"];
export const motionEnergies: MotionEnergy[] = ["quiet", "build", "hit", "peak", "release"];
export const motionSources: MotionSource[] = ["lyric", "caption", "photo", "video", "shape"];
export const motionStatuses: MotionStatus[] = ["planned", "renderable", "reviewed", "approved"];
export const motionUseCases = ["lyric", "photo", "video", "3-hit", "travel", "anime-op", "hero", "release"] as const;

const davinciQueryBySkill: Record<string, string> = {
  "davinci-marker": "Marker",
  "davinci-trim": "Trim Ripple",
  "davinci-transform": "Transform crop",
  "davinci-keyframe": "Keyframe",
  "davinci-easing": "Ease",
  "davinci-text": "Text Text+",
  "davinci-fusion-node": "Fusion node",
};

export function buildDavinciLearningHref(preset: StartMotionPreset) {
  const skill = preset.skillIds.find((id) => id.startsWith("davinci-"));
  const query = skill ? davinciQueryBySkill[skill] ?? skill.replace("davinci-", "") : preset.label;
  return `/movie-coach/dictionary?q=${encodeURIComponent(query)}`;
}

export function buildPalmierMotionHandoff(preset: StartMotionPreset) {
  return [
    `Motion preset: ${preset.id} / ${preset.label}`,
    `Purpose: ${preset.purpose}`,
    `Energy: ${preset.energy.join(", ")} / beat: ${preset.beatBehavior}`,
    `Duration: ${preset.durationFrames[0]}-${preset.durationFrames[1]} frames @30fps as a starting range`,
    `Intensity variants: ${preset.intensity.join(" / ")}`,
    `Source: ${preset.source.join(", ")} / engine: ${preset.engine} / shared engine: ${preset.sharedEngine}`,
    `Use cases: ${preset.useCases.join(", ")}`,
    `Avoid when: ${preset.avoidWhen}`,
    "Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.",
    "Try S/M/L variants in an isolated timeline. Do not auto-approve; record the artifact for review.",
  ].join("\n");
}
