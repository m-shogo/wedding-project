// StaRt 129秒 3案ショーケース(A/B/C)のレビュー用データ。
//
// 実装の単一情報源は motion-studio/src/data/start129/ (Remotion実装)。
// このファイルはその内容をレビューUI用に要約・複製したものであり、
// 独立して増改築しない(演出の追加・変更はmotion-studio側で行う)。
//
// 関連: docs/decisions/start-129-three-showcase-directions.md
//       docs/handoff/start-129-showcase-review-guide.md

export type Start129ShowcaseId = "A" | "B" | "C";

export type Start129Showcase = {
  id: Start129ShowcaseId;
  nameJa: string;
  subtitleJa: string;
  descriptionJa: string;
  keywordsJa: string[];
};

export const START_129_SHOWCASES: Start129Showcase[] = [
  {
    id: "A",
    nameJa: "旅の記録映画",
    subtitleJa: "写真重視",
    descriptionJa:
      "documentary / travel film / editorial film。静止優先・hard cut・抑制したpushで、実写真の魅力と二人らしさを最優先する、本番採用に最も近い基準案。",
    keywordsJa: ["静止優先", "hard cut", "水平線マッチ", "地名・日付は小さく"],
  },
  {
    id: "B",
    nameJa: "冒険アニメOP",
    subtitleJa: "楽しさ重視",
    descriptionJa:
      "手描きグラフィック × 3-hit。StaRtの言葉遊び・再スタート感をWeddingの品を保ちながら最大化する実験案。",
    keywordsJa: ["手描きunderline", "speed line", "panel grid", "\"StaRt!\"/\"再スタート\""],
  },
  {
    id: "C",
    nameJa: "リズム・タイポMV",
    subtitleJa: "歌詞と文字重視",
    descriptionJa:
      "kinetic typography × negative space。歌詞全文と音楽構造の理解を、カラオケ字幕にせず優先する実験案。",
    keywordsJa: ["ベースライン走査", "漢字かな階層", "negative space caption"],
  },
];

export type Start129Section = {
  id: string;
  order: number;
  labelJa: string;
  startSec: number;
  endSec: number;
  lyricSlotRange: [number, number] | null;
  roleJa: string;
};

export const START_129_SECTIONS: Start129Section[] = [
  {id: "opening-pickup", order: 0, labelJa: "Opening pickup", startSec: 0, endSec: 7, lyricSlotRange: null, roleJa: "最初の1枚と挨拶。騒がせない"},
  {id: "intro", order: 1, labelJa: "Intro", startSec: 7, endSec: 17, lyricSlotRange: null, roleJa: "旅の始まり。期待を積む"},
  {id: "verse-1a", order: 2, labelJa: "1A", startSec: 17, endSec: 28, lyricSlotRange: [1, 4], roleJa: "最初の旅の記憶"},
  {id: "verse-1b", order: 3, labelJa: "1B", startSec: 28, endSec: 38, lyricSlotRange: [5, 8], roleJa: "遊びとサビ前の溜め"},
  {id: "chorus-1a", order: 4, labelJa: "1サビA", startSec: 38, endSec: 48, lyricSlotRange: [9, 12], roleJa: "最初のHero peak"},
  {id: "chorus-1b", order: 5, labelJa: "1サビB", startSec: 48, endSec: 58, lyricSlotRange: [13, 16], roleJa: "3-hit。ただしHero保持"},
  {id: "interlude-1", order: 6, labelJa: "間奏1", startSec: 58, endSec: 68, lyricSlotRange: null, roleJa: "文法を一度変え、2番へ再出発"},
  {id: "verse-2a", order: 7, labelJa: "2A", startSec: 68, endSec: 78, lyricSlotRange: [17, 20], roleJa: "1番と異なる画角・素材"},
  {id: "verse-2b", order: 8, labelJa: "2B", startSec: 78, endSec: 88, lyricSlotRange: [21, 24], roleJa: "遊びを増やし、次の溜め"},
  {id: "chorus-2a", order: 9, labelJa: "2サビA", startSec: 88, endSec: 98, lyricSlotRange: [25, 28], roleJa: "最大Hero peak"},
  {id: "chorus-2b", order: 10, labelJa: "2サビB", startSec: 98, endSec: 108, lyricSlotRange: [29, 32], roleJa: "2回目の3-hit"},
  {id: "interlude-2a", order: 11, labelJa: "間奏2A", startSec: 108, endSec: 118, lyricSlotRange: null, roleJa: "旅の総集編。熱を逃がす"},
  {id: "interlude-2b", order: 12, labelJa: "間奏2B", startSec: 118, endSec: 126, lyricSlotRange: null, roleJa: "横浜・会場・現在へ収束"},
  {id: "end", order: 13, labelJa: "End", startSec: 126, endSec: 129, lyricSlotRange: null, roleJa: "名前・日付・歓迎。Cメロ前に着地"},
];

export type Start129TechniqueStatus =
  | "ISOLATED"
  | "CONTEXT_TESTED"
  | "FULL_TIMELINE_TESTED"
  | "VISUALLY_VERIFIED"
  | "PRODUCTION_READY";

export const START_129_TECHNIQUE_STATUS_LABELS: Record<Start129TechniqueStatus, string> = {
  ISOLATED: "ISOLATED（単体のみ）",
  CONTEXT_TESTED: "CONTEXT_TESTED（前後文脈込みで確認）",
  FULL_TIMELINE_TESTED: "FULL_TIMELINE_TESTED（129秒通しで確認）",
  VISUALLY_VERIFIED: "VISUALLY_VERIFIED（人間が目視済み）",
  PRODUCTION_READY: "PRODUCTION_READY（本番投入可）",
};

export type Start129Technique = {
  id: string;
  nameJa: string;
  showcase: Start129ShowcaseId;
  purposeJa: string;
  goodForJa: string;
  avoidWhenJa: string;
  componentRef: string;
  status: Start129TechniqueStatus;
  evidenceJa: string;
};

// motion-studio/src/data/start129/techniqueCatalog.ts と内容を同期させる。
export const START_129_TECHNIQUES: Start129Technique[] = [
  {id: "a-static-hold", nameJa: "静止先行ホールド", showcase: "A", purposeJa: "顔・決定的瞬間を動かさず読ませる", goodForJa: "Hero写真、感情の強い写真", avoidWhenJa: "奥行きの薄い風景写真", componentRef: "StartShowcaseA.tsx > StaticHoldShot", status: "CONTEXT_TESTED", evidenceJa: "129秒timeline内でsection単位の前後文脈込みでrender確認。実写真差し替え後も再render済み。"},
  {id: "a-restrained-push", nameJa: "静止先行プッシュ", showcase: "A", purposeJa: "サビ頭で表情を読ませてから僅かに寄る", goodForJa: "奥行きのあるHero写真", avoidWhenJa: "被写体が画面いっぱいの寄り写真", componentRef: "StartShowcaseA.tsx > RestrainedPushShot", status: "CONTEXT_TESTED", evidenceJa: "1サビ/2サビでのpush量(最大2.4%程度)をコードレビューで確認。"},
  {id: "a-horizon-match-cut", nameJa: "水平線マッチカット", showcase: "A", purposeJa: "海・街・会場の水平線位置を揃えてhard cutする", goodForJa: "水平線のある写真同士の接続", avoidWhenJa: "水平線が無い、または縦構図の写真", componentRef: "StartShowcaseA.tsx > horizonAnchor prop", status: "ISOLATED", evidenceJa: "仕組みのみ実装。ダミー素材での実際の水平線一致は未検証。"},
  {id: "b-hand-drawn-underline", nameJa: "手描きunderline", showcase: "B", purposeJa: "3-hitの1つとして単語へ勢いを添える", goodForJa: "短い日本語/英語の強調語", avoidWhenJa: "長文、複数行の歌詞", componentRef: "handDrawnPrimitives.tsx > HandDrawnUnderline", status: "CONTEXT_TESTED", evidenceJa: "SVG strokeのpath lengthアニメをframe計算で確認。"},
  {id: "b-speed-line-burst", nameJa: "消失点speed line", showcase: "B", purposeJa: "3-hitのimpactを2frame程度の短いhitで作る", goodForJa: "写真の進行方向がある場合の加速表現", avoidWhenJa: "静止画に動機がない場合", componentRef: "handDrawnPrimitives.tsx > SpeedLineBurst", status: "ISOLATED", evidenceJa: "固定消失点でのSVG生成のみ確認。写真の進行方向との連動は未実装。"},
  {id: "b-panel-grid-reveal", nameJa: "コマ割り展開", showcase: "B", purposeJa: "小panelから写真Hero full frameへ解放する", goodForJa: "複数写真をテンポよく見せたい区間", avoidWhenJa: "1枚をじっくり見せたいHero区間", componentRef: "StartShowcaseB.tsx > PanelGridReveal", status: "CONTEXT_TESTED", evidenceJa: "2B/1Bでの4分割→1枚展開を実写真2枚のalternateで確認。"},
  {id: "c-baseline-scan", nameJa: "ベースライン走査", showcase: "C", purposeJa: "線通過後に文字が定着することでphrase単位の切り替えを示す", goodForJa: "短い日本語phrase", avoidWhenJa: "2行以上の長い歌詞", componentRef: "typographyPrimitives.tsx > BaselineScanText", status: "CONTEXT_TESTED", evidenceJa: "歌詞32slot全体でのrender成功を確認。日本語禁則・行長QAは未実施。"},
  {id: "c-kanji-kana-hierarchy", nameJa: "漢字とかなの階層", showcase: "C", purposeJa: "意味の核となる漢字と流れを作るかなでweight/速度を変える", goodForJa: "漢字とひらがなが混在するphrase", avoidWhenJa: "カタカナ/英語のみのphrase", componentRef: "typographyPrimitives.tsx > KanjiKanaHierarchyText", status: "VISUALLY_VERIFIED", evidenceJa: "placeholder歌詞「歌詞スロットNN」で階層(漢字やや大きく/太く)が視認できることをstill目視で確認。"},
  {id: "c-negative-space-caption", nameJa: "余白固定字幕", showcase: "C", purposeJa: "写真のnegative spaceへ文字を固定し、写真だけ切り替える", goodForJa: "余白のある写真連続区間", avoidWhenJa: "余白の無い密な写真", componentRef: "StartShowcaseC.tsx > NegativeSpaceCaption", status: "CONTEXT_TESTED", evidenceJa: "実写真(青い壁・窓)でのsafe-area配置をrender確認。"},
  {id: "shared-mini-guide", nameJa: "映像内ミニガイド", showcase: "A", purposeJa: "解説付きモードで新技術の開始時だけ日本語説明を出す", goodForJa: "解説付きモード全区間", avoidWhenJa: "完成映像モード(常に非表示)", componentRef: "StartGuideOverlay.tsx > MiniGuideCard", status: "CONTEXT_TESTED", evidenceJa: "3案共通のGuide overlayとしてrender確認。contrast比の自動計測は未実施。"},
  {id: "shared-welcome-message", nameJa: "来場感謝メッセージ", showcase: "A", purposeJa: "間奏2B(横浜到着)で「本日はお越しいただき、誠にありがとうございます」を示し、ゲストへの歓迎に意味を切り替える", goodForJa: "間奏2B(118-126秒)、実際の披露宴会場・受付シーン", avoidWhenJa: "歌詞が同時に表示される区間(情報過多になる)", componentRef: "StartShowcaseA.tsx > WelcomeMessage / StartShowcaseB.tsx > WelcomeBurst / StartShowcaseC.tsx > WelcomeCaption", status: "VISUALLY_VERIFIED", evidenceJa: "A/B/C全案でPinIcon/PlaneTrailIconのreveal込みでstill render・目視確認(2026-08-25)。3案それぞれの文法に合わせて別実装。"},
  {id: "shared-end-card-icon", nameJa: "End cardのicon付き署名", showcase: "A", purposeJa: "End(126-129秒)の名前・日付にHeartOutlineIconを添え、テキストのみのcreditより温度を持たせる", goodForJa: "End区間、氏名+日付のごく短い表示", avoidWhenJa: "長い文章、複数行のクレジット", componentRef: "StartShowcaseA.tsx > EndCard / StartShowcaseB.tsx > EndBurst / StartShowcaseC.tsx > EndCaption", status: "VISUALLY_VERIFIED", evidenceJa: "A/B/C全案でicon reveal込みでstill render・目視確認(2026-08-25)。"},
  {id: "shared-sparkle-overlay", nameJa: "キラキラ/粒子オーバーレイ", showcase: "A", purposeJa: "感情が高まる区間(来場感謝・3-hit・End)へPexels由来のdust/sparks動画をscreen blendで薄く重ねる", goodForJa: "間奏2B・End・B案3-hitの一瞬。opacity 0.12-0.35程度が目安", avoidWhenJa: "密な写真やlyric captionと重なる場合。goldクリップ(密なグリッター質感)は全画面overlayに不向き", componentRef: "SparkleOverlay.tsx", status: "VISUALLY_VERIFIED", evidenceJa: "2026-08-25、gold clipの質感が重すぎることをstill目視で確認しdust/sparksへ置き換え、再render・再確認済み。"},
];

export const start129TechniquesForShowcase = (showcase: Start129ShowcaseId) =>
  START_129_TECHNIQUES.filter((t) => t.showcase === showcase);

export const START_129_QA_STILL_SECONDS = [0, 7, 17, 28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 126, 128] as const;

export const START_129_ASSET_NOTE_JA =
  "現在の写真・動画はPexels(無料ストック)由来のダミー素材。新郎新婦本人の写真ではない。正規実写真・音源・歌詞は未投入。";
