// AUTO-GENERATED-STYLE data file. Hand-authored content, emitted deterministically.
// Phase E — StaRt Extended Rhythm Map section ⇄ Director Recipe Catalog mapping.
// See docs/decisions/2026-08-25-start-section-recipe-mapping.md for the design rationale.
//
// Phase A (directorRecipeCatalog.ts) already gives every recipe a loose `recommendedStaRtSections`
// tag. This file goes one level deeper: for each of the 14 StaRt Extended sections it names which
// recipes are the PRIMARY choice, which are viable ALTERNATEs, and which recipes should be AVOIDed
// in that section even though they might be tagged for a neighboring section (with a stated reason).
//
// status is intentionally NOT part of this file. Nothing here is "final". Editorial adoption still
// requires a human to pick a primary/alternate recipe and move the underlying DirectorRecipe.status
// forward in directorRecipeCatalog.ts (Phase A owns that field). AI must never do that promotion.

import type { MotionEnergy } from "./startMotionKit";
import type { StartEditDensity, StartExtendedSectionId } from "./startExtendedRhythmMap";

export interface StartSectionRecipeAvoidance {
  recipeId: string;
  reason: string;
}

export interface StartSectionRecipeMapping {
  sectionId: StartExtendedSectionId;
  /** 2-4 recipes that are the first choice when editing this section. */
  primaryRecipeIds: string[];
  /** 1-3 recipes that are acceptable substitutes when a primary recipe doesn't fit the actual footage. */
  alternateRecipeIds: string[];
  /** Recipes that read as plausible for this section (often via a neighboring recommendedStaRtSections
   * tag) but should specifically NOT be used here, with the editorial reason why. */
  avoidRecipeIds: StartSectionRecipeAvoidance[];
  /** Expected MotionEnergy for this section (mirrors startExtendedSections[].energy). */
  energy: MotionEnergy;
  /** Expected graphic/cut density for this section (mirrors startExtendedSections[].density). */
  density: StartEditDensity;
  /** Photo hold duration guidance, grounded in the 95 BPM half-time grid
   * (startExtendedResearchHypotheses.normalPhotoHold / heroPhotoHold). */
  photoHoldSeconds: string;
  /** How much of the 190 BPM micro-accent grammar (line / stamp / dot / caption emphasis) this
   * section should use. */
  graphicDensityPolicy: string;
  /** How prominent on-screen typography should be in this section. */
  typographyLevel: "none" | "minimal" | "short-caption" | "kicker" | "word-accent" | "title-lock";
  /** Only meaningful for the two THREE-HIT sections (chorus-1-b / chorus-2-b). Null everywhere else. */
  threeHitPolicy: string | null;
  /** Why this combination was chosen, tied back to musicalRead / weddingDirection in
   * startExtendedRhythmMap.ts. */
  notes: string;
}

export const startSectionRecipeMap: StartSectionRecipeMapping[] = [
  {
    sectionId: "opening-pickup",
    primaryRecipeIds: ["cam-locked-frame", "typo-quiet-caption", "start-curtain-open"],
    alternateRecipeIds: ["photo-negative-space", "wedding-welcome-greeting", "editorial-silence-beat"],
    avoidRecipeIds: [
      { recipeId: "rhythm-three-hit", reason: "3-hitはボーカルが入ってからのサビ専用アクセント。歌が始まる前の静かな期待を壊す。" },
      { recipeId: "anime-speed-lines", reason: "曲より先に映像を騒がせない、というOPENING PICKUPのmusicalReadに反する高速グラフィック。" },
      { recipeId: "cut-source-whip", reason: "avoid欄の『冒頭からflash・glitch・whip・高速montageを重ねる』に直接抵触。" },
    ],
    energy: "quiet",
    density: "low",
    photoHoldSeconds: "写真1枚をhold中心。95BPM half-timeのHero枠(4〜8beat=約2.53〜5.05秒)を上限にし、動かさないことを優先する。",
    graphicDensityPolicy: "190BPM micro accent不使用。文字も『quiet caption』1行のみに絞る。",
    typographyLevel: "minimal",
    threeHitPolicy: null,
    notes: "musicalRead『歌が始まる前の期待。曲より先に映像を騒がせない』を最優先。cam-locked-frameで被写体への信頼を示し、start-curtain-openで開幕の儀式感だけ足す。",
  },
  {
    sectionId: "intro",
    primaryRecipeIds: ["start-intro-ticket-lift", "travel-ticket-edge", "cam-directional-pan"],
    alternateRecipeIds: ["travel-window-seat", "typo-mask-reveal", "editorial-cm-beat"],
    avoidRecipeIds: [
      { recipeId: "cam-locked-frame", reason: "INTROのmusicalReadは『前へ進む推進感』。opening-pickupと同じ静止カメラを続けると区間の切り替わりが伝わらない。" },
      { recipeId: "rhythm-three-hit", reason: "3-hitはサビ専用。0:07〜0:17でまだ使うと後半のピークが薄まる。" },
      { recipeId: "photo-contact-sheet", reason: "複数写真の総集編はpost-chorus-interlude-a向け。INTROで先に使うとrecap感が重複する。" },
    ],
    energy: "build",
    density: "medium",
    photoHoldSeconds: "半分速cut基準。2 half-time beat(約1.26秒)を目安にticket edge revealとsmall pushへ配分する。",
    graphicDensityPolicy: "190BPM accentはticket edgeの一瞬のみ。旅行UIを常設しない(avoid欄準拠)。",
    typographyLevel: "kicker",
    threeHitPolicy: null,
    notes: "weddingDirection『空港・搭乗券・旅の始まり』をstart-intro-ticket-lift + travel-ticket-edgeで受ける。avoid欄の『全拍で写真を替える』を避けるためhalf-time-cutに留める。",
  },
  {
    sectionId: "verse-1-a",
    primaryRecipeIds: ["start-1a-photo-read", "cam-restrained-push", "photo-sequence-trio"],
    alternateRecipeIds: ["cam-native-aspect", "photo-asymmetric", "editorial-crop-hierarchy"],
    avoidRecipeIds: [
      { recipeId: "rhythm-three-hit", reason: "1Aはまだフレーズ単位の導入部。3-hitを使うとchorus-1-bの初出が弱まる。" },
      { recipeId: "anime-impact-frame", reason: "avoid欄の『歌詞全文をカラオケのように追従表示する』と同種の勢い過多。フレーズ単位の静かな読みを優先する区間には強すぎる。" },
      { recipeId: "typo-word-punch", reason: "word punchはchorus区間のhit語向け。1Aで先に使うとサビの効果が減る。" },
    ],
    energy: "build",
    density: "medium",
    photoHoldSeconds: "2〜4 half-time beat(約1.26〜2.53秒)。沖縄など最初の旅の写真をフレーズ単位で読ませる。",
    graphicDensityPolicy: "低。location captionのみ、190BPM accentは使わない。",
    typographyLevel: "short-caption",
    threeHitPolicy: null,
    notes: "musicalRead『言葉遊びと勢いが始まる。歌詞の一語一語ではなくフレーズ単位で進める』をcam-restrained-push主体の静かな寄りで支える。",
  },
  {
    sectionId: "verse-1-b",
    primaryRecipeIds: ["start-1b-anticipation-build", "photo-editorial-crop", "typo-vertical-wipe"],
    alternateRecipeIds: ["anime-scribble-underline", "cam-directional-pan", "travel-coastal-light"],
    avoidRecipeIds: [
      { recipeId: "cam-locked-frame", reason: "musicalRead『遊び心が強まり、サビへ期待を積む区間』に対し静止カメラは推進感を止めてしまう。" },
      { recipeId: "rhythm-density-contrast", reason: "density-contrastは間奏(release)専用の緩急設計。サビ直前で使うと逆に勢いを削ぐ。" },
      { recipeId: "wedding-quiet-tears", reason: "感情のトーンが早すぎる。静かな涙の演出はpost-chorus-interlude-a向け。" },
    ],
    energy: "build",
    density: "high",
    photoHoldSeconds: "2〜3 half-time beat。最後の1枚だけ35〜38秒付近の『溜め』としてやや長めに保持する。",
    graphicDensityPolicy: "playful graphic accentは1つまで。avoid欄の『zoom・blur・speed linesを全部足す』を避ける。",
    typographyLevel: "word-accent",
    threeHitPolicy: null,
    notes: "weddingDirection『Seoul/Hawaiiへ展開。写真の長短と文字の遊びを少し増やし、溜める』をtypo-vertical-wipe + anime-scribble-underlineの控えめな1発だけで表現する。",
  },
  {
    sectionId: "chorus-1-a",
    primaryRecipeIds: ["start-chorus-hero-lift", "cam-locked-frame", "photo-full-bleed"],
    alternateRecipeIds: ["cam-25d-parallax", "typo-frame-lock", "wedding-couple-hero-duo"],
    avoidRecipeIds: [
      { recipeId: "cut-source-whip", reason: "avoid欄『サビ頭をtransitionの派手さで潰す』に直接抵触。" },
      { recipeId: "anime-halftone-flash", reason: "halftone flashはchorus-1-bの3-hit専用アクセント。サビ頭で先出しすると本来の3-hitの初出インパクトが減る。" },
      { recipeId: "photo-contact-sheet", reason: "サビ頭は最強Hero写真1枚を大きく見せる区間。複数写真並べは主役をぼやけさせる。" },
    ],
    energy: "hit",
    density: "high",
    photoHoldSeconds: "Hero写真を4〜8 half-time beat(約2.53〜5.05秒)保持。最初の0.5〜1秒は完全staticも比較する。",
    graphicDensityPolicy: "最小。clean full bleedを優先し、graphicで飾らない。",
    typographyLevel: "word-accent",
    threeHitPolicy: null,
    notes: "musicalRead『サビ頭。シンプルな上昇メロディの強さを映像でも素直に受ける』をphoto-full-bleed + cam-locked-frameのstatic-firstで受ける。",
  },
  {
    sectionId: "chorus-1-b",
    primaryRecipeIds: ["start-triple-hit", "rhythm-three-hit", "travel-passport-stamp"],
    alternateRecipeIds: ["travel-route-dot", "anime-micro-rgb", "anime-halftone-flash"],
    avoidRecipeIds: [
      { recipeId: "cam-slow-pull", reason: "slow pullはinterlude-1のrelease向けカメラ。3-hit区間の擬音的な弾みと噛み合わない。" },
      { recipeId: "photo-contact-sheet", reason: "weddingDirection『写真を3回切らず、同一Hero上でstamp→line→route dotの3-hit』と矛盾。複数写真を並べると同一Hero維持の原則が崩れる。" },
      { recipeId: "editorial-establishing-wide", reason: "establishing wideはdensity低のセットアップ文法。density=peakのこの区間には合わない。" },
    ],
    energy: "peak",
    density: "peak",
    photoHoldSeconds: "Hero写真は同一のまま保持。3-hit中は写真自体を切らない(0カット)。",
    graphicDensityPolicy: "190BPM micro accentをstamp/line/route-dotへ3回だけ使う。全画面には使わない。",
    typographyLevel: "none",
    threeHitPolicy: "同一Hero写真を維持したまま stamp → line → route-dot の3-hitで表現する。3-hitごとにfull-screen flash/shake/cutを行わない(既存avoid方針を踏襲)。",
    notes: "musicalRead『擬音とリズムの遊びが最も映像化しやすい区間』をstart-triple-hit + rhythm-three-hitのgraphic hit3連で処理し、写真そのものは動かさない。",
  },
  {
    sectionId: "interlude-1",
    primaryRecipeIds: ["start-interlude-breath", "cut-route-wipe", "travel-route-dot"],
    alternateRecipeIds: ["cam-slow-pull", "cam-exposure-true", "cut-color-field"],
    avoidRecipeIds: [
      { recipeId: "rhythm-three-hit", reason: "この区間はenergy=release。3-hitはpeak専用アクセントで、呼吸を作る目的と逆行する。" },
      { recipeId: "start-chorus-hero-lift", reason: "Hero写真の連続提示はサビの文法。interludeはroute/map文法へ切り替える区間(weddingDirection準拠)。" },
      { recipeId: "anime-impact-frame", reason: "impact frameはhit/peak向けの強いグラフィック。release区間の呼吸感を壊す。" },
    ],
    energy: "release",
    density: "medium",
    photoHoldSeconds: "写真主体ではなくroute/map文法。写真を使う場合でも1回だけ、4〜6秒程度に留める。",
    graphicDensityPolicy: "190BPM accent不使用。cut-route-wipe / cut-color-fieldのgraphic-transitionのみ。",
    typographyLevel: "short-caption",
    threeHitPolicy: null,
    notes: "musicalRead『1番のピークから一度呼吸し、2番へ再スタートする』とweddingDirection『Route/map/plane-windowなど、実写真とは違う文法を一度だけ挟む』をそのまま反映。",
  },
  {
    sectionId: "verse-2-a",
    primaryRecipeIds: ["start-verse2-panel-update", "photo-split-panel-duo", "cam-foreground-pass"],
    alternateRecipeIds: ["cam-handheld-restraint", "photo-video-insert", "editorial-lower-third"],
    avoidRecipeIds: [
      { recipeId: "start-1a-photo-read", reason: "avoid欄『1番と全く同じ写真枚数・同じtransitionで繰り返す』に抵触。1Aの文法をそのまま2Aへ流用しない。" },
      { recipeId: "cam-restrained-push", reason: "1Aのcam-restrained-pushをそのまま繰り返すと『画面文法を更新』というweddingDirectionに反する。" },
      { recipeId: "photo-sequence-trio", reason: "1A専用の連写文法。2Aはsplit panelや動画insertで差別化する方針のため使わない。" },
    ],
    energy: "build",
    density: "medium",
    photoHoldSeconds: "2〜4 half-time beat。split panelは2枚同時evaluate、video insertは1カット分を確保する。",
    graphicDensityPolicy: "low〜medium。lower-third typeのみ限定使用。",
    typographyLevel: "short-caption",
    threeHitPolicy: null,
    notes: "musicalRead『1番のコピーではなく、少し違う表情で戻る』を守るため、1Aで使った主要レシピを意図的にavoidへ回し、split panel/video insert/foreground passで画面文法を更新する。",
  },
  {
    sectionId: "verse-2-b",
    primaryRecipeIds: ["start-verse2-playful-crop", "anime-oversized-word", "photo-editorial-crop"],
    alternateRecipeIds: ["anime-panel-grid", "photo-split-panel-duo", "typo-vertical-wipe"],
    avoidRecipeIds: [
      { recipeId: "wedding-quiet-tears", reason: "musicalRead『ユーモアが強く、次のサビへ再び跳ねる』とトーンが逆。静かな涙の演出はここでは早すぎる。" },
      { recipeId: "cam-locked-frame", reason: "weddingDirection『少し大胆なcrop・panel・一瞬のgraphic jokeを許可』に対し、静止カメラはユーモアの跳ねを止める。" },
      { recipeId: "rhythm-three-hit", reason: "3-hitはサビ専用。2番サビ前でまだ使うとchorus-2-bの再登場インパクトが薄まる。" },
    ],
    energy: "build",
    density: "high",
    photoHoldSeconds: "2〜3 half-time beat。大胆cropは短く、長く引っ張らない。",
    graphicDensityPolicy: "一瞬のgraphic jokeのみ許可。avoid欄『ネタ演出を長く引っ張り、2人より演出が主役になる』を避ける。",
    typographyLevel: "word-accent",
    threeHitPolicy: null,
    notes: "weddingDirection『少し大胆なcrop・panel・一瞬のgraphic jokeを許可。ただしWeddingの品は維持』を、anime-oversized-word 1発 + editorial-cropで表現する。",
  },
  {
    sectionId: "chorus-2-a",
    primaryRecipeIds: ["start-second-chorus-hero-b", "cam-locked-frame", "photo-full-bleed"],
    alternateRecipeIds: ["cam-25d-parallax", "typo-frame-lock", "wedding-couple-hero-duo"],
    avoidRecipeIds: [
      { recipeId: "cut-source-whip", reason: "avoid欄『1サビより激しいzoomを入れるだけで差を作る』の具体例。effectで差別化しない方針に反する。" },
      { recipeId: "anime-speed-lines", reason: "speed linesはchorus-2-bの3-hit専用に予約。ここで先出しすると2回目3-hitの新鮮さが減る。" },
      { recipeId: "photo-contact-sheet", reason: "chorus-1-aと同じ理由。最強Hero写真1枚に絞る方針と矛盾する複数写真並べ。" },
    ],
    energy: "peak",
    density: "high",
    photoHoldSeconds: "最強Hero写真B。static firstを基本に4〜8 half-time beat保持。",
    graphicDensityPolicy: "1サビより増やさない。写真選び・サイズ・余白・graphic密度で格上げする(weddingDirection準拠)。",
    typographyLevel: "word-accent",
    threeHitPolicy: null,
    notes: "musicalRead『1サビより細部の音が増え、同じメロディでも高揚が一段上がる』を、chorus-1-aと同じ骨格(locked frame + full bleed)のまま写真選定だけ格上げして受ける。",
  },
  {
    sectionId: "chorus-2-b",
    primaryRecipeIds: ["start-second-triple-hit", "start-three-hit-motif-rotation", "travel-passport-stamp"],
    alternateRecipeIds: ["travel-route-dot", "anime-speed-lines", "anime-micro-rgb"],
    avoidRecipeIds: [
      { recipeId: "cam-slow-pull", reason: "chorus-1-bと同じ理由。release向けカメラはpeak/peakのリズムピークに合わない。" },
      { recipeId: "editorial-establishing-wide", reason: "density=peak区間にdensity=lowのセットアップ文法を混ぜない。" },
      { recipeId: "photo-contact-sheet", reason: "chorus-1-bと同じ理由。Hero写真の単一維持と矛盾する。" },
    ],
    energy: "peak",
    density: "peak",
    photoHoldSeconds: "Hero写真を保持。1回目3-hitより10〜20%だけ強度を上げるが、写真自体は切らない。",
    graphicDensityPolicy: "stamp triplet L / speed-line single / route dot / date tick。音が増えた分をcut数でなくgraphicで拾う(avoid欄準拠)。",
    typographyLevel: "none",
    threeHitPolicy: "1回目のchorus-1-b 3-hitより10〜20%だけ強いstamp/line/dot。line/dot/stampの順序を変えて『また来た！』という反復と差分を同時に作る。Heroは保持する。",
    notes: "musicalRead『2番のリズムピーク。細かい音の増加をmicro graphicで拾う』を、chorus-1-bと同系統だが強度だけ上げたstart-second-triple-hit + start-three-hit-motif-rotationで処理する。",
  },
  {
    sectionId: "post-chorus-interlude-a",
    primaryRecipeIds: ["start-travel-recap", "photo-contact-sheet", "travel-multileg-recap"],
    alternateRecipeIds: ["anime-contact-sheet-recap", "cut-route-wipe", "wedding-quiet-tears"],
    avoidRecipeIds: [
      { recipeId: "rhythm-three-hit", reason: "2番サビ直後の熱を逃がすenergy=release区間。peak専用の3-hitをここで使うと呼吸が作れない。" },
      { recipeId: "start-chorus-hero-lift", reason: "単一Hero固定の文法ではなく、複数地点recapが目的の区間。Hero lift文法を持ち込むと総集編の役割とずれる。" },
      { recipeId: "cut-source-whip", reason: "release方向へ向かう区間に激しいwhipは不釣り合い。" },
    ],
    energy: "release",
    density: "medium",
    photoHoldSeconds: "沖縄→Seoul→Hawaii→Yokohamaの写真2〜4枚をrouteで繋ぐ。各1.3〜2秒程度(2 half-time beat前後)。",
    graphicDensityPolicy: "190BPM accent最小限。color fieldでbreathを作る。",
    typographyLevel: "short-caption",
    threeHitPolicy: null,
    notes: "weddingDirection『旅の総集編。沖縄→Seoul→Hawaii→Yokohamaを写真2〜4枚＋routeで繋ぐ』をphoto-contact-sheet + travel-multileg-recapで直接受ける。",
  },
  {
    sectionId: "post-chorus-interlude-b",
    primaryRecipeIds: ["start-rising-toward-yokohama", "travel-arrival-home", "rhythm-rising-bar"],
    alternateRecipeIds: ["cam-foreground-pass", "editorial-establishing-wide"],
    avoidRecipeIds: [
      { recipeId: "rhythm-three-hit", reason: "3-hitはchorus区間専用のpeakアクセント。上昇構築中のこの区間で使うとpeakを先取りしてしまう。" },
      { recipeId: "photo-contact-sheet", reason: "収束段階なのでrecapでなく単一スケール拡大を優先する(weddingDirection準拠)。総集編文法はpost-chorus-interlude-aで既に使用済み。" },
      { recipeId: "anime-scribble-underline", reason: "ユーモア系グラフィックはverse-2-b向け。横浜への収束という厳粛なmoodと不一致。" },
    ],
    energy: "build",
    density: "high",
    photoHoldSeconds: "1枚ずつスケールを大きくする。cutを速くしすぎず2〜3 half-time beatを目安にする。",
    graphicDensityPolicy: "上昇感をliteralな常時zoomだけで表現しない(avoid欄準拠)。route home等の意味あるgraphicのみ。",
    typographyLevel: "minimal",
    threeHitPolicy: null,
    notes: "musicalRead『ベース/和声が上方向へ進み、次の大きな展開を予感させる』をrhythm-rising-bar + travel-arrival-homeで受け、venue名等の情報はend-before-c-sectionへ温存する。",
  },
  {
    sectionId: "end-before-c-section",
    primaryRecipeIds: ["start-final-name-date", "cam-slow-pull", "wedding-date-venue-lock"],
    alternateRecipeIds: ["photo-negative-space", "typo-quiet-caption", "wedding-vow-anticipation"],
    avoidRecipeIds: [
      { recipeId: "rhythm-three-hit", reason: "END WINDOWは単発のhit。3連打のアクセントを持ち込むと『最後だけ豪華ロゴanimationを追加する』というavoid欄の失敗と同種になる。" },
      { recipeId: "anime-speed-lines", reason: "avoid欄『最後だけ豪華ロゴanimationを追加する』と同種の過剰演出。静かな着地を壊す。" },
      { recipeId: "cut-source-whip", reason: "Cメロへ入る直前は『無理に切る』のではなく静止→入場への着地が必要(weddingDirection準拠)。" },
    ],
    energy: "hit",
    density: "low",
    photoHoldSeconds: "写真は基本使わないか、既出Hero静止1枚のみ。最小情報表示に絞る。",
    graphicDensityPolicy: "190BPM accent不使用。最後の音に合わせて静止する。",
    typographyLevel: "title-lock",
    threeHitPolicy: null,
    notes: "weddingDirection『SHOGO & SHIORI / 2026.10.24 / LET'S START など最小情報。最後の音に合わせて静止→入場へ』をstart-final-name-date + wedding-date-venue-lockでそのまま実装する。",
  },
];

export function getSectionRecipeMapping(sectionId: StartExtendedSectionId): StartSectionRecipeMapping | undefined {
  return startSectionRecipeMap.find((mapping) => mapping.sectionId === sectionId);
}

export function getAllMappedSectionIds(): StartExtendedSectionId[] {
  return startSectionRecipeMap.map((mapping) => mapping.sectionId);
}
