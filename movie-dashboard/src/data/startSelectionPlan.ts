import type { StartExtendedSectionId } from "./startExtendedRhythmMap";

export type StartMotionFamilyId =
  | "hero-still"
  | "editorial-photo"
  | "typography-accent"
  | "travel-route"
  | "panel-recap"
  | "rhythm-three-hit";

export interface StartMotionFamily {
  id: StartMotionFamilyId;
  label: string;
  role: string;
  beginnerRule: string;
  avoid: string;
  recipeIds: string[];
}

export const startMotionFamilies: StartMotionFamily[] = [
  {id: "hero-still", label: "Hero Still", role: "一番強い写真を止めて見せる", beginnerRule: "サビ頭と冒頭は、動かす前にまず写真を読ませる。", avoid: "常時ズーム、派手なトランジション", recipeIds: ["cam-locked-frame", "start-curtain-open", "start-chorus-hero-lift", "start-second-chorus-hero-b"]},
  {id: "editorial-photo", label: "Editorial Photo", role: "写真を雑誌のように整理する", beginnerRule: "被写体を隠さず、1枚ごとの役割を明確にする。", avoid: "小さすぎる写真、情報の詰め込み", recipeIds: ["start-1a-photo-read", "photo-editorial-crop", "start-verse2-playful-crop"]},
  {id: "typography-accent", label: "Typography Accent", role: "短い文字で区切りと期待を作る", beginnerRule: "全文を追わず、見出し・一語・名前と日付だけ。", avoid: "カラオケ表示、文字エフェクトの重ね掛け", recipeIds: ["start-1b-anticipation-build", "typo-word-punch", "start-final-name-date"]},
  {id: "travel-route", label: "Travel Route", role: "旅の始まりと場所の移動を伝える", beginnerRule: "搭乗券・線・点は場面転換にだけ使う。", avoid: "旅行UIの常設、説明しすぎ", recipeIds: ["start-intro-ticket-lift", "start-interlude-breath", "start-rising-toward-yokohama"]},
  {id: "panel-recap", label: "Panel Recap", role: "複数の思い出を整理して振り返る", beginnerRule: "後半のまとめで使い、主役写真と競合させない。", avoid: "冒頭やサビ頭での大量写真", recipeIds: ["start-verse2-panel-update", "start-travel-recap"]},
  {id: "rhythm-three-hit", label: "Rhythm Three-Hit", role: "同じ写真の上で3回だけリズムを打つ", beginnerRule: "stamp → line → dot。写真自体は3回切り替えない。", avoid: "全画面flash・shake・cutの3連打", recipeIds: ["start-triple-hit", "start-second-triple-hit"]},
];

export interface StartStarterSectionPlan {
  sectionId: StartExtendedSectionId;
  familyId: StartMotionFamilyId;
  recipeId: string;
  mediaRole: string;
  beginnerGoal: string;
}

export const startStarterSectionPlan: StartStarterSectionPlan[] = [
  {sectionId: "opening-pickup", familyId: "hero-still", recipeId: "start-curtain-open", mediaRole: "WELCOME用Hero写真 1枚", beginnerGoal: "静かな開幕を作る"},
  {sectionId: "intro", familyId: "travel-route", recipeId: "start-intro-ticket-lift", mediaRole: "空港・旅立ち写真 1〜2枚", beginnerGoal: "出発を伝える"},
  {sectionId: "verse-1-a", familyId: "editorial-photo", recipeId: "start-1a-photo-read", mediaRole: "沖縄など序盤の写真 3〜5枚", beginnerGoal: "1枚ずつ読ませる"},
  {sectionId: "verse-1-b", familyId: "typography-accent", recipeId: "start-1b-anticipation-build", mediaRole: "Seoul/Hawaii写真 3〜5枚", beginnerGoal: "サビ前の期待を作る"},
  {sectionId: "chorus-1-a", familyId: "hero-still", recipeId: "start-chorus-hero-lift", mediaRole: "最強Hero写真 1枚", beginnerGoal: "最初のサビを大きく見せる"},
  {sectionId: "chorus-1-b", familyId: "rhythm-three-hit", recipeId: "start-triple-hit", mediaRole: "同じHero写真 1枚", beginnerGoal: "3-hitを一度だけ見せる"},
  {sectionId: "interlude-1", familyId: "travel-route", recipeId: "start-interlude-breath", mediaRole: "窓・地図・移動写真 1〜2枚", beginnerGoal: "一度呼吸する"},
  {sectionId: "verse-2-a", familyId: "panel-recap", recipeId: "start-verse2-panel-update", mediaRole: "友人・家族写真 4〜6枚", beginnerGoal: "人物を整理して紹介する"},
  {sectionId: "verse-2-b", familyId: "editorial-photo", recipeId: "start-verse2-playful-crop", mediaRole: "遊びのある写真 3〜5枚", beginnerGoal: "二度目の期待を作る"},
  {sectionId: "chorus-2-a", familyId: "hero-still", recipeId: "start-second-chorus-hero-b", mediaRole: "別のHero写真 1枚", beginnerGoal: "1回目より強くする"},
  {sectionId: "chorus-2-b", familyId: "rhythm-three-hit", recipeId: "start-second-triple-hit", mediaRole: "同じHero写真 1枚", beginnerGoal: "3-hitを再登場させる"},
  {sectionId: "post-chorus-interlude-a", familyId: "panel-recap", recipeId: "start-travel-recap", mediaRole: "旅・家族・友人写真 5〜8枚", beginnerGoal: "感情を落ち着かせて振り返る"},
  {sectionId: "post-chorus-interlude-b", familyId: "travel-route", recipeId: "start-rising-toward-yokohama", mediaRole: "横浜へ向かう写真 2〜4枚", beginnerGoal: "会場へ着地する"},
  {sectionId: "end-before-c-section", familyId: "typography-accent", recipeId: "start-final-name-date", mediaRole: "締めHero写真 1枚", beginnerGoal: "名前・日付で明確に終える"},
];
