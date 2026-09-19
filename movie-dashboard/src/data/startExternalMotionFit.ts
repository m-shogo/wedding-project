import { startExtendedSections, type StartExtendedSectionId } from "./startExtendedRhythmMap";
import type { ExternalMotionAtlasItem } from "./externalMotionAtlas";

// 映像Pinterest（外部実例図鑑）の各実例が、StaRt Extended 14 sectionのどこに合いそうかを
// タグから機械的に推測するAI_SUGGESTEDレイヤー。歌詞本文は一切扱わない
// （Gitに歌詞本文を保存しないルールに従い、LYRIC_###とweddingDirection/musicalReadという
// 人間が読める短い意味づけだけを使う）。
//
// ここでの割当はあくまで提案。Favorite/Maybe/Rejectのような人間の最終決定ではなく、
// startSectionRecipeMap.tsの正式なsection⇄recipe割当を置き換えるものでもない。
// 「見て選ぶ」を早めるための絞り込みヒントとして扱う。

// StaRt Extended各sectionの短い日本語ラベル（カード表示用）。
export const startSectionShortLabel: Record<StartExtendedSectionId, string> = {
  "opening-pickup": "冒頭",
  intro: "イントロ",
  "verse-1-a": "1番A",
  "verse-1-b": "1番B",
  "chorus-1-a": "1サビ頭",
  "chorus-1-b": "1サビ・3点バースト",
  "interlude-1": "間奏1",
  "verse-2-a": "2番A",
  "verse-2-b": "2番B",
  "chorus-2-a": "2サビ頭",
  "chorus-2-b": "2サビ・3点バースト",
  "post-chorus-interlude-a": "間奏2A",
  "post-chorus-interlude-b": "間奏2B・上昇",
  "end-before-c-section": "ラスト",
};

// タグ → 合いそうなsectionの機械的対応表。複数タグに一致した場合は重複を除いてまとめる。
const TAG_TO_SECTIONS: Array<[string, StartExtendedSectionId[]]> = [
  ["3点バースト候補", ["chorus-1-b", "chorus-2-b"]],
  ["ウェディング", ["end-before-c-section", "chorus-2-a", "opening-pickup"]],
  ["旅行", ["intro", "verse-1-a", "verse-1-b", "verse-2-a", "verse-2-b"]],
  ["写真の見せ方", ["chorus-1-a", "chorus-2-a"]],
  ["地名ラベル", ["intro", "verse-1-a", "verse-2-a"]],
  ["筆記体", ["end-before-c-section", "opening-pickup"]],
  ["マッチカット", ["interlude-1", "post-chorus-interlude-a"]],
  ["シネマグラフ", ["post-chorus-interlude-a", "post-chorus-interlude-b"]],
  ["インク", ["interlude-1", "post-chorus-interlude-a"]],
  ["トランジション", ["interlude-1", "post-chorus-interlude-a", "verse-1-b", "verse-2-b"]],
  ["プリズム", ["post-chorus-interlude-b"]],
];

export function suggestStartSections(item: ExternalMotionAtlasItem): StartExtendedSectionId[] {
  const hit = new Set<StartExtendedSectionId>();
  for (const [tag, sections] of TAG_TO_SECTIONS) {
    if (item.tags.includes(tag)) for (const section of sections) hit.add(section);
  }
  // 元のcatalog順(曲の時間順)で安定させる。
  return startExtendedSections.map((section) => section.id).filter((id) => hit.has(id));
}

export function startSectionWeddingDirection(id: StartExtendedSectionId): string {
  return startExtendedSections.find((section) => section.id === id)?.weddingDirection ?? "";
}

export { startExtendedSections, type StartExtendedSectionId };
