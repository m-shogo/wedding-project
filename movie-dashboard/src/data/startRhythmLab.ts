export type StartReferenceKind = "official-audio" | "official-training" | "official-guide" | "tutorial" | "wedding-reference";

export interface StartReference {
  id: string;
  title: string;
  kind: StartReferenceKind;
  url: string;
  study: string;
  usage: "stream-reference" | "download-official-resource";
}

export interface StartSectionCue {
  label: string;
  songStartSec: number;
  songEndSec: number;
  purpose: string;
}

export interface StartOpeningScenePlan {
  sceneId: string;
  timelineStartSec: number;
  timelineEndSec: number;
  songStartSec: number;
  songEndSec: number;
  musicalRole: string;
  visualDirection: string;
  davinci: string[];
  avoid: string;
}

export interface StartDavinciDrill {
  id: string;
  title: string;
  minutes: number;
  skillIds: string[];
  task: string;
  doneWhen: string;
  weddingApply: string;
}

export const startSongFacts = {
  title: "StaRt",
  artist: "Mrs. GREEN APPLE",
  bpm: 190,
  halfTimeBpm: 95,
  beatSec: 60 / 190,
  halfTimeBeatSec: 60 / 95,
  barSec: (60 / 190) * 4,
  candidateOffsetSec: 3,
  candidateDurationSec: 60,
  note: "190 BPMを毎拍cutすると写真が読めない。95 BPMのハーフタイムを主編集grid、190 BPMを小さなaccent用に使う。",
} as const;

export const startSectionCues: StartSectionCue[] = [
  { label: "Intro", songStartSec: 7, songEndSec: 17, purpose: "旅の出発・世界観を立ち上げる" },
  { label: "A", songStartSec: 17, songEndSec: 28, purpose: "写真を読ませながら前へ進む" },
  { label: "B", songStartSec: 28, songEndSec: 38, purpose: "サビ前の期待を上げる" },
  { label: "Chorus 1", songStartSec: 38, songEndSec: 48, purpose: "Hero写真を最も強く見せる" },
  { label: "Chorus 2", songStartSec: 48, songEndSec: 58, purpose: "3-hit accentと2枚目Heroを使う" },
  { label: "Interlude", songStartSec: 58, songEndSec: 68, purpose: "横浜到着・end cardへ着地する" },
];

// Candidate A: Opening V1 60秒を原曲の約3秒地点から始める。
// 現行35秒Hero Aが原曲0:38のサビ頭へ一致するため、最初にA/Bする価値が高い。
export const startOpeningScenePlan: StartOpeningScenePlan[] = [
  {
    sceneId: "v1-photo-cold-open",
    timelineStartSec: 0,
    timelineEndSec: 2,
    songStartSec: 3,
    songEndSec: 5,
    musicalRole: "pre-intro / first attention",
    visualDirection: "Hero 01を即表示。大きなtitleを挟まず、1回だけ小さなscale-inまたは完全staticをA/B。",
    davinci: ["Inspector Transform", "Keyframe Tray", "Marker"],
    avoid: "開始からflash・glitch・whipを重ねて曲より先に騒ぐ。",
  },
  {
    sceneId: "v1-photos-okinawa",
    timelineStartSec: 2,
    timelineEndSec: 13,
    songStartSec: 5,
    songEndSec: 16,
    musicalRole: "intro build",
    visualDirection: "3枚を均等3分割せず、入口→体験→余韻で長短を付ける。0:07付近の立ち上がりを最初の明確な旅reveal候補にする。",
    davinci: ["Show Music Beats", "Timeline Marker", "Trim", "Transform"],
    avoid: "190 BPMの全拍で写真を切り替える。",
  },
  {
    sceneId: "v1-photos-seoul",
    timelineStartSec: 13,
    timelineEndSec: 24,
    songStartSec: 16,
    songEndSec: 27,
    musicalRole: "A section",
    visualDirection: "歌が始まる0:17付近を章切替として使い、街→体験→2人らしさの順で読ませる。Hard Cut主体。",
    davinci: ["Marker", "Ripple Trim", "Inspector Crop", "Hard Cut"],
    avoid: "歌詞1フレーズごとに文字やtransitionを追加する。",
  },
  {
    sceneId: "v1-photos-hawaii",
    timelineStartSec: 24,
    timelineEndSec: 35,
    songStartSec: 27,
    songEndSec: 38,
    musicalRole: "B build to chorus",
    visualDirection: "0:28からサビ前へ密度を少し上げる。Hawaii 03は0:35–0:38の上昇を使い、Hero Aへ視線とエネルギーを渡す。",
    davinci: ["Marker", "Trim", "Small Push", "Ease In/Out"],
    avoid: "サビ前だからとspeed ramp・zoom・blurを全部同時に足す。",
  },
  {
    sceneId: "v1-photo-hero-a",
    timelineStartSec: 35,
    timelineEndSec: 44,
    songStartSec: 38,
    songEndSec: 47,
    musicalRole: "chorus 1",
    visualDirection: "サビ頭でHero 01を最大化。最初の0.5–1秒は動かさず見せ、その後1.00→1.03〜1.05程度の小さなpushを比較。",
    davinci: ["Transform Zoom", "Keyframe Tray", "Ease", "Before/After"],
    avoid: "9秒ずっと一定速度で寄り続け、写真よりmotionを目立たせる。",
  },
  {
    sceneId: "v1-photo-hero-b",
    timelineStartSec: 44,
    timelineEndSec: 53,
    songStartSec: 47,
    songEndSec: 56,
    musicalRole: "chorus 2 / triple accents",
    visualDirection: "Hero 02は基本static寄り。0:48と0:50付近の3連アクセントは写真cutではなく、小さなpassport stamp・route dot・date tickなど3hit graphicで拾う案を比較。",
    davinci: ["Marker", "Text/Text+", "Opacity", "Transform", "Compound Clip optional"],
    avoid: "3連音すべてで画面全体をflash・shakeさせる。",
  },
  {
    sceneId: "v1-arrival-route",
    timelineStartSec: 53,
    timelineEndSec: 57,
    songStartSec: 56,
    songEndSec: 60,
    musicalRole: "chorus release to interlude",
    visualDirection: "Hawaii→Yokohamaのrouteを音の抜けに合わせて短く描き、0:58の間奏入りで情報量を落とす。",
    davinci: ["Marker", "Opacity", "Audio Fade", "J/L Cut optional"],
    avoid: "到着routeを長い地図アニメにして曲の勢いを止める。",
  },
  {
    sceneId: "v1-ending-title",
    timelineStartSec: 57,
    timelineEndSec: 60,
    songStartSec: 60,
    songEndSec: 63,
    musicalRole: "interlude landing",
    visualDirection: "YOKOHAMA / 2026.10.24だけを静かに残す。終端は原曲を雑に切らず、会場用の音源編集可否を確認した上でfade/reverb tail候補をA/B。",
    davinci: ["Fairlight Fade", "Audio Keyframe", "Text", "Deliver"],
    avoid: "最後だけ豪華なロゴanimationにして写真主体の文法を壊す。",
  },
];

export const startAccentIdeas = [
  "190 BPMの毎拍は『cut』ではなく、1〜2pxのline、stamp、route dot、caption emphasisなどmicro accentへ回す。",
  "写真cutは95 BPM基準の1beat=約0.632秒より長くし、通常は2〜4beat単位で読ませる。",
  "章替わりはbeatより曲構造を優先。0:17 / 0:28 / 0:38 / 0:48 / 0:58を最初にMarker化する。",
  "サビ頭0:38は一番強い写真を置く。transitionを強くするのではなく、写真そのものを強くする。",
  "0:48以降の3連アクセントは、同一Hero写真を保ったまま3つの小さなgraphic変化で取る案を優先する。",
  "Speed Rampは静止画には使わない。実動画/B-rollで被写体運動があるcutに限定する。",
  "Whip Panはカメラ方向が一致する2素材がある時だけ。方向の根拠が無ければHard Cut。",
  "Zoom transitionよりMatch Cutを優先。海→海、窓→窓、丸い皿→太陽など形・方向・明度でつなぐ。",
  "章タイトルは拍ごとに出さず、場所が切り替わった最初の1回だけ。",
  "高密度区間の次はstaticを置く。曲が速いほど、映像まで常時速くしない。",
  "サビ前0:35–0:38は『溜め』を作り、最後のHawaii写真を少し長く保つ案も比較する。",
  "End Cardへ入る直前に1〜2frameのflashではなく、音の抜けと画面情報量減少で到着感を作る。",
] as const;

export const startDavinciDrills: StartDavinciDrill[] = [
  {
    id: "start-drill-01-markers",
    title: "StaRtをMarkerで分解する",
    minutes: 15,
    skillIds: ["concept-rhythm", "davinci-marker"],
    task: "合法に用意した音源をTimelineへ置き、0:17 / 0:28 / 0:38 / 0:48 / 0:58へsection marker。Show Music BeatsもON/OFF比較する。",
    doneWhen: "曲構造Markerとbeat表示の違いを説明できる。",
    weddingApply: "Opening V1 scene boundaryがsection markerへどう重なるか確認する。",
  },
  {
    id: "start-drill-02-trim",
    title: "Okinawa 11秒を曲に合わせて3枚へ割る",
    minutes: 20,
    skillIds: ["concept-rhythm", "davinci-trim", "davinci-ripple"],
    task: "3枚を均等割りせず、入口/体験/余韻の役割でdurationを変え、95 BPM gridを参考にTrimする。",
    doneWhen: "均等3分割版とStory優先版をA/Bして後者を選ぶ理由を言える。",
    weddingApply: "v1-photos-okinawa",
  },
  {
    id: "start-drill-03-hero-motion",
    title: "Hero AのStatic vs Small Push",
    minutes: 15,
    skillIds: ["concept-stillness", "davinci-transform", "davinci-keyframe", "davinci-easing"],
    task: "サビ頭のHero写真でStatic / 1.03 / 1.05 pushを3案作り、Keyframe TrayでEaseを調整する。",
    doneWhen: "写真より動きが勝っていない案を選び、開始/終了値をEvidenceへ残す。",
    weddingApply: "v1-photo-hero-a",
  },
  {
    id: "start-drill-04-three-hits",
    title: "3-hit accentを写真cutなしで作る",
    minutes: 20,
    skillIds: ["concept-rhythm", "davinci-marker", "davinci-text", "davinci-keyframe"],
    task: "0:48以降の3連アクセントに、小さなstamp/line/dotを3hitだけ置く。写真本体は固定する。",
    doneWhen: "全画面flash版より主役写真が読みやすいことを比較できる。",
    weddingApply: "v1-photo-hero-b",
  },
  {
    id: "start-drill-05-end-audio",
    title: "60秒終端を不自然に切らない",
    minutes: 15,
    skillIds: ["concept-audio-continuity", "davinci-audio-fade", "davinci-jl-cut"],
    task: "60秒終端をstraight cut / short fade / room-like tailの3案で比較する。権利・会場仕様で加工可否も確認する。",
    doneWhen: "入場直前の空気を壊さず終わる案を選べる。",
    weddingApply: "v1-ending-title",
  },
];

export const startReferences: StartReference[] = [
  {
    id: "start-ref-official-audio",
    title: "Mrs. GREEN APPLE - StaRt / official artist audio",
    kind: "official-audio",
    url: "https://www.youtube.com/watch?v=NUFfRHk1Qcs",
    study: "曲構造、音の密度、0:38サビ頭、0:48以降のアクセントを耳で確認する。",
    usage: "stream-reference",
  },
  {
    id: "start-ref-blackmagic-training",
    title: "Blackmagic Design DaVinci Resolve Training",
    kind: "official-training",
    url: "https://www.blackmagicdesign.com/jp/products/davinciresolve/training",
    study: "Edit Part 1/2を優先。Trim、audio mix、effects、titlesをWedding実作業へ接続する。",
    usage: "download-official-resource",
  },
  {
    id: "start-ref-resolve21-guide",
    title: "DaVinci Resolve 21 New Features Guide",
    kind: "official-guide",
    url: "https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf",
    study: "Edit PageのKeyframe/Ease改善とShow Music Beatsを現行UI確認用に使う。",
    usage: "download-official-resource",
  },
  {
    id: "start-ref-speed-ramp-2026",
    title: "DaVinci Resolve Speed Ramp Tutorial",
    kind: "tutorial",
    url: "https://www.youtube.com/watch?v=XFYgfsENQa4",
    study: "Retime Controls / Retime Curve / smooth ramp。Openingでは実動画に限定して採否判断する。",
    usage: "stream-reference",
  },
  {
    id: "start-ref-easing-2026",
    title: "Ease In / Out Keyframes in DaVinci Resolve",
    kind: "tutorial",
    url: "https://www.youtube.com/watch?v=bSJhXCGyYJc",
    study: "Hero写真のsmall pushでLinearとEaseの差だけを学ぶ。",
    usage: "stream-reference",
  },
  {
    id: "start-ref-edit-keyframes",
    title: "DaVinci Resolve Edit Page Keyframes / Curve reference",
    kind: "tutorial",
    url: "https://www.youtube.com/watch?v=IHV4UVRzz5c",
    study: "基本animationをFusionへ逃げずEdit Page Keyframe Trayで作る考え方を学ぶ。",
    usage: "stream-reference",
  },
  {
    id: "start-ref-fusion-motion",
    title: "Basic Motion Graphics Animations in Fusion",
    kind: "tutorial",
    url: "https://dvresolve.com/tutorial/motion-graphics-animations-fusion/",
    study: "Mask reveal / Transform / Spline。Editで足りない演出だけFusionへ移す基準作り。",
    usage: "stream-reference",
  },
  {
    id: "start-ref-wedding-fast",
    title: "Wedding Opening START / fast-paced commercial reference",
    kind: "wedding-reference",
    url: "https://www.loveyou.jp/openingmovies/p_openingmovie_009",
    study: "スピード感のあるWedding構成を観察。ただしtemplateの見た目はコピーせず、尺・写真密度・情報量だけ分解する。",
    usage: "stream-reference",
  },
  {
    id: "start-ref-cinematic-wedding-travel",
    title: "OneLog wedding / travel film works",
    kind: "wedding-reference",
    url: "https://www.onelog-film.com/works",
    study: "WeddingとTravel PVを横断し、Hard Cut・余韻・景色→人物の順序を観察する。",
    usage: "stream-reference",
  },
];

export const startStudyPrinciples = [
  "曲が速い = 映像を常時速くする、ではない。速い曲ほど静止区間を意図的に残す。",
  "Beatは命令ではなく候補。写真の読了時間とStoryがbeatより優先される場面を認める。",
  "DaVinci機能名を覚える前に、なぜそのcut/motion/audio処理が必要かを言語化する。",
  "Tutorialは完成見本をコピーせず、操作単位へ分解してWedding素材で再実験する。",
  "YouTube等の著作物動画は参照URLとtimecodeだけを保存し、repoへ無断ミラーしない。公式が配布するPDF/lesson filesは学習資料として取得可。",
] as const;
