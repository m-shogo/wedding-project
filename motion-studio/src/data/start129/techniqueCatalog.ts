// StaRt 129秒ショーケース Technique Catalog(日本語)。
//
// 「97 recipeが登録されている」ことと「見た目が完成している」ことを混同しない、
// という既存のDirector Recipe運用原則をこの新カタログにも適用する。
// 昇格は人間が行う。AIは自己判断でPRODUCTION_READYへ格上げしない。
//
// status ladder:
//   ISOLATED             単体componentが動くだけ。完成扱いしない
//   CONTEXT_TESTED       写真・歌詞・背景・前後cutを含む8〜12秒文脈で成立
//   FULL_TIMELINE_TESTED 129秒全体の密度・反復を含めて成立
//   VISUALLY_VERIFIED    実render・stillを人間が目視済み
//   PRODUCTION_READY     本番写真差し替え耐性・日本語説明・QA evidence込み

export type Start129TechniqueStatus =
  | 'ISOLATED'
  | 'CONTEXT_TESTED'
  | 'FULL_TIMELINE_TESTED'
  | 'VISUALLY_VERIFIED'
  | 'PRODUCTION_READY';

export type Start129Showcase = 'A' | 'B' | 'C';

export type Start129Technique = {
  id: string;
  nameJa: string;
  showcase: Start129Showcase;
  purposeJa: string;
  goodForJa: string;
  avoidWhenJa: string;
  componentRef: string;
  status: Start129TechniqueStatus;
  /** 現状の証拠(何を確認したか)。無根拠にVISUALLY_VERIFIED等へしない。 */
  evidenceJa: string;
};

export const START_129_TECHNIQUES: Start129Technique[] = [
  {
    id: 'a-static-hold',
    nameJa: '静止先行ホールド',
    showcase: 'A',
    purposeJa: '顔・決定的瞬間を動かさず読ませる',
    goodForJa: 'Hero写真、感情の強い写真',
    avoidWhenJa: '奥行きの薄い風景写真',
    componentRef: 'StartShowcaseA.tsx > StaticHoldShot',
    status: 'CONTEXT_TESTED',
    evidenceJa: '129秒timeline内でsection単位の前後文脈込みでrender確認。stillの人間目視は未実施。',
  },
  {
    id: 'a-restrained-push',
    nameJa: '静止先行プッシュ',
    showcase: 'A',
    purposeJa: 'サビ頭で表情を読ませてから僅かに寄る',
    goodForJa: '奥行きのあるHero写真',
    avoidWhenJa: '被写体が画面いっぱいの寄り写真',
    componentRef: 'StartShowcaseA.tsx > RestrainedPushShot',
    status: 'CONTEXT_TESTED',
    evidenceJa: '1サビ/2サビでのpush量(最大2.4%程度)をコードレビューで確認。目視QA未実施。',
  },
  {
    id: 'a-horizon-match-cut',
    nameJa: '水平線マッチカット',
    showcase: 'A',
    purposeJa: '海・街・会場の水平線位置を揃えてhard cutする',
    goodForJa: '水平線のある写真同士の接続',
    avoidWhenJa: '水平線が無い、または縦構図の写真',
    componentRef: 'StartShowcaseA.tsx > horizonAnchor prop',
    status: 'ISOLATED',
    evidenceJa: 'ダミー素材がplaceholderのため、実際の水平線一致は未検証。仕組みのみ実装。',
  },
  {
    id: 'b-hand-drawn-underline',
    nameJa: '手描きunderline',
    showcase: 'B',
    purposeJa: '3-hitの1つとして単語へ勢いを添える',
    goodForJa: '短い日本語/英語の強調語',
    avoidWhenJa: '長文、複数行の歌詞',
    componentRef: 'motion-kit/start129/handDrawnPrimitives.tsx > HandDrawnUnderline',
    status: 'CONTEXT_TESTED',
    evidenceJa: 'SVG strokeのpath lengthアニメをframe計算で確認。複数variantによるboilは未実装(単一strokeのみ)。',
  },
  {
    id: 'b-speed-line-burst',
    nameJa: '消失点speed line',
    showcase: 'B',
    purposeJa: '3-hitのimpactを2frame程度の短いhitで作る',
    goodForJa: '写真の進行方向がある場合の加速表現',
    avoidWhenJa: '静止画に動機がない場合',
    componentRef: 'motion-kit/start129/handDrawnPrimitives.tsx > SpeedLineBurst',
    status: 'ISOLATED',
    evidenceJa: '固定消失点でのSVG生成のみ確認。写真の進行方向との連動は未実装。',
  },
  {
    id: 'b-panel-grid-reveal',
    nameJa: 'コマ割り展開',
    showcase: 'B',
    purposeJa: '小panelから写真Hero full frameへ解放する',
    goodForJa: '複数写真をテンポよく見せたい区間',
    avoidWhenJa: '1枚をじっくり見せたいHero区間',
    componentRef: 'StartShowcaseB.tsx > PanelGridReveal',
    status: 'CONTEXT_TESTED',
    evidenceJa: '2B/2サビAでの4分割→1枚展開をrender確認。実写真での可読性は未確認。',
  },
  {
    id: 'c-baseline-scan',
    nameJa: 'ベースライン走査',
    showcase: 'C',
    purposeJa: '線通過後に文字が定着することでphrase単位の切り替えを示す',
    goodForJa: '短い日本語phrase',
    avoidWhenJa: '2行以上の長い歌詞',
    componentRef: 'motion-kit/start129/typographyPrimitives.tsx > BaselineScanText',
    status: 'CONTEXT_TESTED',
    evidenceJa: '歌詞32slot全体でのrender成功を確認。日本語禁則・行長QAは未実施。',
  },
  {
    id: 'c-kanji-kana-hierarchy',
    nameJa: '漢字とかなの階層',
    showcase: 'C',
    purposeJa: '意味の核となる漢字と流れを作るかなでweight/速度を変える',
    goodForJa: '漢字とひらがなが混在するphrase',
    avoidWhenJa: 'カタカナ/英語のみのphrase',
    componentRef: 'motion-kit/start129/typographyPrimitives.tsx > KanjiKanaHierarchyText',
    status: 'ISOLATED',
    evidenceJa: '文字種判定と2段階weightの実装のみ。実歌詞での見た目確認は未実施(placeholder表示のため)。',
  },
  {
    id: 'c-negative-space-caption',
    nameJa: '余白固定字幕',
    showcase: 'C',
    purposeJa: '写真のnegative spaceへ文字を固定し、写真だけ切り替える',
    goodForJa: '余白のある写真連続区間',
    avoidWhenJa: '余白の無い密な写真',
    componentRef: 'StartShowcaseC.tsx > NegativeSpaceCaption',
    status: 'CONTEXT_TESTED',
    evidenceJa: 'placeholder背景でのsafe-area配置をrender確認。実写真でのnegative space検証は未実施。',
  },
  {
    id: 'shared-mini-guide',
    nameJa: '映像内ミニガイド',
    showcase: 'A',
    purposeJa: '解説付きモードで新技術の開始時だけ日本語説明を出す',
    goodForJa: '解説付きモード全区間',
    avoidWhenJa: '完成映像モード(常に非表示)',
    componentRef: 'StartGuideOverlay.tsx > MiniGuideCard',
    status: 'CONTEXT_TESTED',
    evidenceJa: '3案共通のGuide overlayとしてrender確認。contrast比の自動測定は未実施(目標値をコードコメントに明記のみ)。',
  },
  {
    id: 'shared-welcome-message',
    nameJa: '来場感謝メッセージ',
    showcase: 'A',
    purposeJa: '間奏2B(横浜到着)で「本日はお越しいただき、誠にありがとうございます」を示し、ゲストへの歓迎に意味を切り替える',
    goodForJa: '間奏2B(118-126秒)、実際の披露宴会場・受付シーン',
    avoidWhenJa: '歌詞が同時に表示される区間(情報過多になる)',
    componentRef: 'StartShowcaseA.tsx > WelcomeMessage / StartShowcaseB.tsx > WelcomeBurst / StartShowcaseC.tsx > WelcomeCaption',
    status: 'VISUALLY_VERIFIED',
    evidenceJa: 'A/B/C全案でPinIcon/PlaneTrailIconのreveal込みでstill render・目視確認(2026-08-25)。3案それぞれの文法(静止余白/bold graphic/typography)に合わせて別実装。',
  },
  {
    id: 'shared-end-card-icon',
    nameJa: 'End cardのicon付き署名',
    showcase: 'A',
    purposeJa: 'End(126-129秒)の名前・日付にHeartOutlineIconを添え、テキストのみのcreditより温度を持たせる',
    goodForJa: 'End区間、氏名+日付のごく短い表示',
    avoidWhenJa: '長い文章、複数行のクレジット',
    componentRef: 'StartShowcaseA.tsx > EndCard / StartShowcaseB.tsx > EndBurst / StartShowcaseC.tsx > EndCaption',
    status: 'VISUALLY_VERIFIED',
    evidenceJa: 'A/B/C全案でicon reveal込みでstill render・目視確認(2026-08-25)。線画iconは1色のみで統一。',
  },
  {
    id: 'shared-sparkle-overlay',
    nameJa: 'キラキラ/粒子オーバーレイ',
    showcase: 'A',
    purposeJa: '感情が高まる区間(来場感謝・3-hit・End)へPexels由来のdust/sparks動画をscreen blendで薄く重ね、質感と特別感を足す',
    goodForJa: '間奏2B・End・B案3-hitの一瞬。dust/sparksは黒背景の粒子でopacity 0.12-0.35程度が目安',
    avoidWhenJa: '密な写真やlyric captionと重なる場合(可読性低下)。gold(密なグリッター質感)は全画面overlayに不向きと判明したため不採用',
    componentRef: 'SparkleOverlay.tsx',
    status: 'VISUALLY_VERIFIED',
    evidenceJa: '2026-08-25、gold clipを0.4→0.12まで下げても質感が重すぎることをstill目視で確認し、dust/sparksへ置き換えて再render・再確認。3案のEnd/Welcome/B案3-hitに適用済み。',
  },
];

export const start129TechniquesForShowcase = (showcase: Start129Showcase) =>
  START_129_TECHNIQUES.filter((t) => t.showcase === showcase);
