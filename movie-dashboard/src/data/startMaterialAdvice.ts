import type {StartMaterialCategory, StartMaterialMeta} from "./startProductionWorkspace";
import type {Asset, PhotoOrientation} from "../types/movie";

export interface StartMaterialCategoryAdvice {
  category: StartMaterialCategory;
  headline: string;
  lookFor: string[];
  avoid: string[];
  bestSections: string;
  selectionQuestion: string;
}

export interface StartMaterialAssetAdvice {
  strengths: string[];
  checks: string[];
  nextAction: string;
}

export const startMaterialAdviceByCategory: Record<StartMaterialCategory, StartMaterialCategoryAdvice> = {
  hero: {
    category: "hero",
    headline: "表情・背景・2人らしさが同時に強い写真",
    lookFor: ["2人の表情がはっきり読める", "背景が整理され、人物が小さすぎない", "サビで止めても見続けたい感情がある", "1回目と2回目で構図や場所を変えられる"],
    avoid: ["ピントが甘い・顔が暗い", "大人数の中で2人が見つけにくい", "似た構図の写真だけをHeroにする"],
    bestSections: "OPENING、1 CHORUS A/B、2 CHORUS A/B、END",
    selectionQuestion: "この写真を動かさず大きく見せても、2人らしさが伝わりますか？",
  },
  travel: {
    category: "travel",
    headline: "場所と移動方向がひと目で伝わる写真",
    lookFor: ["空・海・街・窓など場所の特徴がある", "歩く方向や視線が次の写真へつながる", "人物の寄りと景色の引きを混ぜられる", "沖縄・Seoul・Hawaiiなど章の違いが出る"],
    avoid: ["場所が違っても同じ正面記念写真だけ", "背景情報が多すぎて2人が埋もれる", "似た色・似た距離の写真を連続させる"],
    bestSections: "INTRO、1A、1B、INTERLUDE、2A、2B",
    selectionQuestion: "写真だけを見て、どこへ進んでいるか想像できますか？",
  },
  "family-friends": {
    category: "family-friends",
    headline: "誰との思い出か、関係性が伝わる写真",
    lookFor: ["自然な笑顔や会話中の表情がある", "2人と周囲の人の関係が画面内で読める", "集合写真だけでなく距離の近い場面もある", "プライバシー上、上映して問題ない人だけを選ぶ"],
    avoid: ["全員が小さく、表情が読めない", "同じ集合写真を繰り返す", "人間確認なしに名前や関係性を推測する"],
    bestSections: "2A、2 CHORUS A、旅の総集編",
    selectionQuestion: "初めて見るゲストにも、温かい関係が伝わりますか？",
  },
  venue: {
    category: "venue",
    headline: "横浜・会場への到着を感じる写真",
    lookFor: ["外観・入口・窓・照明など会場固有の特徴がある", "終盤の名前や日付を置ける余白がある", "旅の最後としてスケールが上がる", "detailと全景の両方を用意できる"],
    avoid: ["会場紹介の説明写真だけで終わる", "文字を置く場所が顔や看板と重なる", "ENDより前に最強の会場全景を使い切る"],
    bestSections: "2nd INTERLUDE B / RISING、END WINDOW",
    selectionQuestion: "旅の終点として、ここへ到着した感覚を作れますか？",
  },
  detail: {
    category: "detail",
    headline: "物語の手触りを足す手元・小物・食事・看板",
    lookFor: ["搭乗券・荷物・手・料理・靴など意味のある細部", "人物写真の間に入れてリズムを変えられる", "場所や時期を思い出せる固有性がある", "cropしても意味が残る"],
    avoid: ["何の物か分からない寄りすぎた写真", "細部だけが続いて2人が見えなくなる", "個人情報が読める搭乗券や書類"],
    bestSections: "INTRO、1B、INTERLUDE、旅の総集編",
    selectionQuestion: "この小物は2人の記憶を具体的にしてくれますか？",
  },
};

export function getStartMaterialAssetAdvice(asset: Pick<Asset, "type" | "orientation">, meta: StartMaterialMeta): StartMaterialAssetAdvice {
  const category = startMaterialAdviceByCategory[meta.category];
  const strengths: string[] = [];
  const checks: string[] = [];
  if (asset.type === "own_video") strengths.push("実動画は場面の空気・笑い声・自然な動きを残せます");
  if (asset.orientation === "landscape") strengths.push("横構図なのでfull-frameと会場スクリーンに合わせやすいです");
  if (meta.hasTextSpace) strengths.push("文字余白あり：章タイトルや名前・日付の候補になります");
  if (meta.isHero) strengths.push("Hero候補：サビで静止して見せる比較対象になります");
  if (asset.type === "own_photo" && asset.orientation === "portrait") checks.push("縦写真は顔を切らず、左右の余白をどう作るかRoughで確認してください");
  if (asset.type === "own_photo" && !asset.orientation) checks.push("写真の向きが未設定です。素材ライブラリで横・縦・正方形を確認してください");
  if (meta.category === "hero" && !meta.isHero) checks.push("Hero分類ですがHero候補はOFFです。サビ候補ならONにしてください");
  if (meta.isHero && asset.orientation === "portrait") checks.push("縦Heroは会場画面で小さくなりやすいため、横Heroも比較してください");
  if ((meta.category === "venue" || meta.category === "hero") && !meta.hasTextSpace) checks.push("文字を置く可能性があります。顔を避けた余白があるか確認してください");
  return {strengths, checks, nextAction: category.selectionQuestion};
}

export function getStartRegistrationAdvice(category: StartMaterialCategory, orientation: PhotoOrientation | undefined) {
  const categoryAdvice = startMaterialAdviceByCategory[category];
  const orientationNote = orientation === "portrait" ? "縦写真は使えますが、同じ役割の横写真も一緒に入れると選びやすくなります。" : orientation === "square" ? "正方形はpanelやcontact sheet向きです。full-frame用の横写真も用意してください。" : "横写真は会場スクリーンとfull-frameの第一候補です。";
  return {categoryAdvice, orientationNote};
}
