import type {MotionEnergy} from "./startMotionKit";

export type StartExtendedSectionId =
  | "opening-pickup"
  | "intro"
  | "verse-1-a"
  | "verse-1-b"
  | "chorus-1-a"
  | "chorus-1-b"
  | "interlude-1"
  | "verse-2-a"
  | "verse-2-b"
  | "chorus-2-a"
  | "chorus-2-b"
  | "post-chorus-interlude-a"
  | "post-chorus-interlude-b"
  | "end-before-c-section";

export type StartEditDensity = "low" | "medium" | "high" | "peak";
export type StartCutPolicy = "hold" | "half-time-cut" | "section-cut" | "micro-accent-only" | "graphic-transition";

export interface StartExtendedSection {
  id: StartExtendedSectionId;
  label: string;
  referenceStartSec: number;
  referenceEndSec: number;
  energy: MotionEnergy;
  density: StartEditDensity;
  cutPolicy: StartCutPolicy;
  lyricSlots: `LYRIC_${string}`[];
  musicalRead: string;
  weddingDirection: string;
  recommendedMotion: string[];
  avoid: string;
}

export interface StartLyricTimingSlot {
  id: `LYRIC_${string}`;
  section: StartExtendedSectionId;
  referenceSec: number;
  localOrder: number;
  role: "phrase-head" | "continuation" | "hit" | "three-hit-zone";
  visualSuggestion: string;
}

export const startExtendedAuthority = {
  title: "StaRt Extended Rhythm Map",
  audioState: "AUDIO_BLOCKED" as const,
  timingState: "researched-reference-not-final" as const,
  finalTimingAuthority: "cleared-local-audio-waveform-and-markers" as const,
  exactEndMarker: null,
  referenceEndSec: 129,
  referenceEndLabel: "約2:09 / Cメロ開始直前",
  endToleranceNote: "外部解析には約2:07開始の例もある。CD/配信/動画の頭出し差を吸収するため、Final ENDは正規/local音源の波形とMarkerで固定する。",
  lyricRule: "GitにはLYRIC_###と順番・reference timingのみ保存し、歌詞本文は保存しない。",
  mediaRule: "人物・家族・友人・犬は実写真・実動画を主役にし、AIで本人性を生成・変形しない。",
  editRule: "190 BPMを全cutへ使わない。95 BPM half-timeを写真の主grid、190 BPMはmicro accentと瞬間hitへ使う。",
  finalRule: "曲の楽しさはcut数ではなく、遊び心・期待・静止・3-hit・サビlift・releaseの落差で作る。",
} as const;

export const startExtendedResearchHypotheses = {
  bpm: 190,
  halfTimeBpm: 95,
  timeSignature: "4/4",
  key: "B major",
  quarterBeatSec: 60 / 190,
  halfTimeBeatSec: 60 / 95,
  musicalBarSec: (60 / 190) * 4,
  twoBarPhotoUnitSec: (60 / 95) * 4,
  normalPhotoHold: "2〜4 half-time beats（約1.26〜2.53秒）",
  heroPhotoHold: "4〜8 half-time beats（約2.53〜5.05秒）",
  microAccent: "190 BPMの1拍またはvocal attack。画面全体ではなく線・stamp・dot・caption emphasisへ使う。",
} as const;

export const startExtendedResearchSources = [
  {
    id: "official-mv",
    label: "Mrs. GREEN APPLE - StaRt / Official Artist Channel",
    url: "https://www.youtube.com/watch?v=OTUtF7ZxRN8",
    use: "原曲の構成・テンション・公式MV基準の確認",
  },
  {
    id: "timed-chord-map",
    label: "コード進行メモ倉庫 / StaRt",
    url: "https://music-chord.com/songs/StaRt-Mrs.%20GREEN%20APPLE/",
    use: "公式動画に沿ったsection/phrase reference timingとコード変化の照合",
  },
  {
    id: "brutus-arrangement-study",
    label: "BRUTUS / Mrs. GREEN APPLE アレンジ・メロディ分析",
    url: "https://brutus.jp/post-490310/",
    use: "StaRtの明るさ、サビ頭のシンプルな上昇メロディ、ポップ設計の理解",
  },
] as const;

export const startExtendedSections: StartExtendedSection[] = [
  {
    id: "opening-pickup", label: "OPENING PICKUP", referenceStartSec: 0, referenceEndSec: 7,
    energy: "quiet", density: "low", cutPolicy: "hold", lyricSlots: [],
    musicalRead: "歌が始まる前の期待。曲より先に映像を騒がせない。",
    weddingDirection: "WELCOME / THANK YOU FOR COMING / SHOGO & SHIORIを映画予告のように静かに提示。",
    recommendedMotion: ["locked hero", "quiet caption", "tiny tracking reveal"],
    avoid: "冒頭からflash・glitch・whip・高速montageを重ねる。",
  },
  {
    id: "intro", label: "INTRO", referenceStartSec: 7, referenceEndSec: 17,
    energy: "build", density: "medium", cutPolicy: "half-time-cut", lyricSlots: [],
    musicalRead: "明るい幕開け。進行に少し不安定さが混ざり、前へ進む推進感がある。",
    weddingDirection: "空港・搭乗券・旅の始まり。場所を説明しすぎず、出発の期待を作る。",
    recommendedMotion: ["route line", "ticket edge reveal", "small push", "hard cut"],
    avoid: "全拍で写真を替える。旅行UIを常設する。",
  },
  {
    id: "verse-1-a", label: "1A", referenceStartSec: 17, referenceEndSec: 28,
    energy: "build", density: "medium", cutPolicy: "half-time-cut", lyricSlots: ["LYRIC_001", "LYRIC_002", "LYRIC_003", "LYRIC_004"],
    musicalRead: "言葉遊びと勢いが始まる。歌詞の一語一語ではなくフレーズ単位で進める。",
    weddingDirection: "沖縄など最初の旅。2〜4 half-time beatsを基本に写真を読ませる。",
    recommendedMotion: ["static photo", "small push", "editorial crop", "location caption"],
    avoid: "歌詞全文をカラオケのように追従表示する。",
  },
  {
    id: "verse-1-b", label: "1B", referenceStartSec: 28, referenceEndSec: 38,
    energy: "build", density: "high", cutPolicy: "section-cut", lyricSlots: ["LYRIC_005", "LYRIC_006", "LYRIC_007", "LYRIC_008"],
    musicalRead: "遊び心が強まり、サビへ期待を積む区間。",
    weddingDirection: "Seoul/Hawaiiへ展開。写真の長短と文字の遊びを少し増やし、35〜38秒付近は溜める。",
    recommendedMotion: ["char stagger", "mask slide", "match cut", "one playful graphic accent"],
    avoid: "サビ前だからzoom・blur・speed linesを全部足す。",
  },
  {
    id: "chorus-1-a", label: "1 CHORUS A", referenceStartSec: 38, referenceEndSec: 48,
    energy: "hit", density: "high", cutPolicy: "hold", lyricSlots: ["LYRIC_009", "LYRIC_010", "LYRIC_011", "LYRIC_012"],
    musicalRead: "サビ頭。シンプルな上昇メロディの強さを映像でも素直に受ける。",
    weddingDirection: "最強Hero写真を大きく。最初の0.5〜1秒は完全staticも比較し、文字は短く。",
    recommendedMotion: ["locked hero", "word punch", "small push after hold", "clean full bleed"],
    avoid: "サビ頭をtransitionの派手さで潰す。",
  },
  {
    id: "chorus-1-b", label: "1 CHORUS B / THREE-HIT", referenceStartSec: 48, referenceEndSec: 58,
    energy: "peak", density: "peak", cutPolicy: "micro-accent-only", lyricSlots: ["LYRIC_013", "LYRIC_014", "LYRIC_015", "LYRIC_016"],
    musicalRead: "擬音とリズムの遊びが最も映像化しやすい区間。",
    weddingDirection: "写真を3回切らず、同一Hero上でstamp → line → route dotの3-hit。",
    recommendedMotion: ["stamp triplet", "route dot", "micro line", "speed-line single accent"],
    avoid: "3-hitごとにfull-screen flash/shake/cutを行う。",
  },
  {
    id: "interlude-1", label: "INTERLUDE 1", referenceStartSec: 58, referenceEndSec: 68,
    energy: "release", density: "medium", cutPolicy: "graphic-transition", lyricSlots: [],
    musicalRead: "1番のピークから一度呼吸し、2番へ再スタートする。",
    weddingDirection: "Route / map / plane-windowなど、実写真とは違う文法を一度だけ挟む。",
    recommendedMotion: ["route wipe", "color field release", "travel contact sheet"],
    avoid: "10秒全部を地図アニメにして人物写真を消す。",
  },
  {
    id: "verse-2-a", label: "2A", referenceStartSec: 68, referenceEndSec: 78,
    energy: "build", density: "medium", cutPolicy: "half-time-cut", lyricSlots: ["LYRIC_017", "LYRIC_018", "LYRIC_019", "LYRIC_020"],
    musicalRead: "1番のコピーではなく、少し違う表情で戻る。",
    weddingDirection: "Hawaiiなど後半旅。Split panelや動画B-rollを限定的に入れ、画面文法を更新。",
    recommendedMotion: ["2-panel", "foreground pass", "video insert", "lower-third type"],
    avoid: "1番と全く同じ写真枚数・同じtransitionで繰り返す。",
  },
  {
    id: "verse-2-b", label: "2B", referenceStartSec: 78, referenceEndSec: 88,
    energy: "build", density: "high", cutPolicy: "section-cut", lyricSlots: ["LYRIC_021", "LYRIC_022", "LYRIC_023", "LYRIC_024"],
    musicalRead: "ユーモアが強く、次のサビへ再び跳ねる。",
    weddingDirection: "少し大胆なcrop・panel・一瞬のgraphic jokeを許可。ただしWeddingの品は維持。",
    recommendedMotion: ["oversized word", "editorial crop", "panel burst", "hard cut"],
    avoid: "ネタ演出を長く引っ張り、2人より演出が主役になる。",
  },
  {
    id: "chorus-2-a", label: "2 CHORUS A", referenceStartSec: 88, referenceEndSec: 98,
    energy: "peak", density: "high", cutPolicy: "hold", lyricSlots: ["LYRIC_025", "LYRIC_026", "LYRIC_027", "LYRIC_028"],
    musicalRead: "1サビより細部の音が増え、同じメロディでも高揚が一段上がる。",
    weddingDirection: "2人の最強写真。1サビより『派手なeffect』ではなく、写真選び・サイズ・余白・graphic密度で格上げ。",
    recommendedMotion: ["strongest hero", "static first", "edge typography", "one frame accent optional"],
    avoid: "1サビより激しいzoomを入れるだけで差を作る。",
  },
  {
    id: "chorus-2-b", label: "2 CHORUS B / THREE-HIT", referenceStartSec: 98, referenceEndSec: 108,
    energy: "peak", density: "peak", cutPolicy: "micro-accent-only", lyricSlots: ["LYRIC_029", "LYRIC_030", "LYRIC_031", "LYRIC_032"],
    musicalRead: "2番のリズムピーク。細かい音の増加をmicro graphicで拾う。",
    weddingDirection: "1回目の3-hitより少しだけ強いstamp/line/dot。Heroは保持して『また来た！』感を作る。",
    recommendedMotion: ["stamp triplet L", "speed-line single", "route dot", "date tick"],
    avoid: "音が増えた分だけcut数も増やして写真を読めなくする。",
  },
  {
    id: "post-chorus-interlude-a", label: "2nd INTERLUDE A", referenceStartSec: 108, referenceEndSec: 118,
    energy: "release", density: "medium", cutPolicy: "graphic-transition", lyricSlots: [],
    musicalRead: "2番サビの熱を一度逃がしながら、まだ前へ進み続ける。",
    weddingDirection: "旅の総集編。沖縄→Seoul→Hawaii→Yokohamaを写真2〜4枚＋routeで繋ぐ。",
    recommendedMotion: ["contact sheet", "route line", "match cut", "color field breath"],
    avoid: "サビ終了直後からEND CARDを10秒以上固定する。",
  },
  {
    id: "post-chorus-interlude-b", label: "2nd INTERLUDE B / RISING", referenceStartSec: 118, referenceEndSec: 126,
    energy: "build", density: "high", cutPolicy: "section-cut", lyricSlots: [],
    musicalRead: "ベース/和声が上方向へ進み、次の大きな展開を予感させる。",
    weddingDirection: "横浜・会場・2人の後ろ姿などへ収束。cutを速くしすぎず、1枚ずつスケールを大きくする。",
    recommendedMotion: ["progressive scale hierarchy", "match-on-direction", "route home", "hero return"],
    avoid: "上昇感をliteralな常時zoomだけで表現する。",
  },
  {
    id: "end-before-c-section", label: "END WINDOW", referenceStartSec: 126, referenceEndSec: 129,
    energy: "hit", density: "low", cutPolicy: "hold", lyricSlots: [],
    musicalRead: "次の転調/Cメロへ飛び込む直前の短い助走。ここをWedding Openingの着地点にする。",
    weddingDirection: "SHOGO & SHIORI / 2026.10.24 / LET'S START など最小情報。最後の音に合わせて静止→入場へ。",
    recommendedMotion: ["title lock", "tiny tracking settle", "clean cut or venue-approved audio tail"],
    avoid: "Cメロへ入ってから無理に切る。最後だけ豪華ロゴanimationを追加する。",
  },
];

export const startLyricTimingSlots: StartLyricTimingSlot[] = [
  {id: "LYRIC_001", section: "verse-1-a", referenceSec: 17, localOrder: 1, role: "phrase-head", visualSuggestion: "最初の歌い出し。旅Heroを素直に出す。"},
  {id: "LYRIC_002", section: "verse-1-a", referenceSec: 20, localOrder: 2, role: "hit", visualSuggestion: "短い文字hitまたは写真cut 1回。"},
  {id: "LYRIC_003", section: "verse-1-a", referenceSec: 22, localOrder: 3, role: "phrase-head", visualSuggestion: "次の旅行写真。small push可。"},
  {id: "LYRIC_004", section: "verse-1-a", referenceSec: 25, localOrder: 4, role: "hit", visualSuggestion: "登場感のあるgraphic accentを1回。"},
  {id: "LYRIC_005", section: "verse-1-b", referenceSec: 28, localOrder: 5, role: "phrase-head", visualSuggestion: "章替わり。場所captionかeditorial crop。"},
  {id: "LYRIC_006", section: "verse-1-b", referenceSec: 30, localOrder: 6, role: "continuation", visualSuggestion: "文字遊びは短く、写真を残す。"},
  {id: "LYRIC_007", section: "verse-1-b", referenceSec: 33, localOrder: 7, role: "phrase-head", visualSuggestion: "写真変更。リズム密度を少し上げる。"},
  {id: "LYRIC_008", section: "verse-1-b", referenceSec: 35, localOrder: 8, role: "hit", visualSuggestion: "サビ直前の溜め。最後の写真を長めに保持。"},
  {id: "LYRIC_009", section: "chorus-1-a", referenceSec: 38, localOrder: 9, role: "phrase-head", visualSuggestion: "1サビHero。まずstatic。"},
  {id: "LYRIC_010", section: "chorus-1-a", referenceSec: 40, localOrder: 10, role: "continuation", visualSuggestion: "Hero維持。小さいpush程度。"},
  {id: "LYRIC_011", section: "chorus-1-a", referenceSec: 43, localOrder: 11, role: "phrase-head", visualSuggestion: "短いcaptionまたは2枚目Hero。"},
  {id: "LYRIC_012", section: "chorus-1-a", referenceSec: 45, localOrder: 12, role: "hit", visualSuggestion: "48秒の3-hitへ期待を作る。"},
  {id: "LYRIC_013", section: "chorus-1-b", referenceSec: 48, localOrder: 13, role: "three-hit-zone", visualSuggestion: "stamp→line→dot。写真は切らない。"},
  {id: "LYRIC_014", section: "chorus-1-b", referenceSec: 50, localOrder: 14, role: "three-hit-zone", visualSuggestion: "別motifの3-hit。強度はM。"},
  {id: "LYRIC_015", section: "chorus-1-b", referenceSec: 53, localOrder: 15, role: "phrase-head", visualSuggestion: "Heroの表情を読ませる。"},
  {id: "LYRIC_016", section: "chorus-1-b", referenceSec: 55, localOrder: 16, role: "continuation", visualSuggestion: "58秒間奏へ情報量を落とす。"},
  {id: "LYRIC_017", section: "verse-2-a", referenceSec: 68, localOrder: 17, role: "phrase-head", visualSuggestion: "2番再スタート。画角/素材タイプを変える。"},
  {id: "LYRIC_018", section: "verse-2-a", referenceSec: 70, localOrder: 18, role: "hit", visualSuggestion: "短いcaption hit。"},
  {id: "LYRIC_019", section: "verse-2-a", referenceSec: 73, localOrder: 19, role: "phrase-head", visualSuggestion: "動画B-rollまたは2-panel候補。"},
  {id: "LYRIC_020", section: "verse-2-a", referenceSec: 76, localOrder: 20, role: "hit", visualSuggestion: "Bメロへhard cut。"},
  {id: "LYRIC_021", section: "verse-2-b", referenceSec: 78, localOrder: 21, role: "phrase-head", visualSuggestion: "遊び心のあるgraphicを1つ許可。"},
  {id: "LYRIC_022", section: "verse-2-b", referenceSec: 81, localOrder: 22, role: "continuation", visualSuggestion: "oversized wordか変則crop。"},
  {id: "LYRIC_023", section: "verse-2-b", referenceSec: 83, localOrder: 23, role: "phrase-head", visualSuggestion: "写真へ戻し主役を維持。"},
  {id: "LYRIC_024", section: "verse-2-b", referenceSec: 86, localOrder: 24, role: "hit", visualSuggestion: "2サビ前の溜め。"},
  {id: "LYRIC_025", section: "chorus-2-a", referenceSec: 88, localOrder: 25, role: "phrase-head", visualSuggestion: "最強Hero B。1サビより大きく見せる。"},
  {id: "LYRIC_026", section: "chorus-2-a", referenceSec: 91, localOrder: 26, role: "continuation", visualSuggestion: "写真維持。edge typographyのみ。"},
  {id: "LYRIC_027", section: "chorus-2-a", referenceSec: 93, localOrder: 27, role: "phrase-head", visualSuggestion: "2枚目Heroまたは同一Hero継続。"},
  {id: "LYRIC_028", section: "chorus-2-a", referenceSec: 96, localOrder: 28, role: "hit", visualSuggestion: "98秒の3-hitへ助走。"},
  {id: "LYRIC_029", section: "chorus-2-b", referenceSec: 98, localOrder: 29, role: "three-hit-zone", visualSuggestion: "3-hit再登場。1回目より10〜20%だけ強く。"},
  {id: "LYRIC_030", section: "chorus-2-b", referenceSec: 101, localOrder: 30, role: "three-hit-zone", visualSuggestion: "line/dot/stampを別順序で比較。"},
  {id: "LYRIC_031", section: "chorus-2-b", referenceSec: 103, localOrder: 31, role: "phrase-head", visualSuggestion: "Heroを読む時間を戻す。"},
  {id: "LYRIC_032", section: "chorus-2-b", referenceSec: 106, localOrder: 32, role: "continuation", visualSuggestion: "108秒からの間奏へrelease。"},
];

export const startExtendedEditGrammar = [
  "MACRO: section境界を最優先。0:17 / 0:28 / 0:38 / 0:48 / 0:58 / 1:08 / 1:18 / 1:28 / 1:38 / 1:48 / 1:58 / 2:06 / 2:09をreference marker候補にする。",
  "MESO: 写真cutは95 BPM half-timeの2〜4beatを基本にし、Heroは4〜8beatまで許容する。",
  "MICRO: 190 BPMは全画面cutではなく、線・stamp・route dot・caption・1〜2frame accentへ使う。",
  "THREE-HIT: vocal attackへ合わせ、同一Hero写真の上でmicro graphicを3回打つ。generic BPMだけで位置を決めない。",
  "CONTRAST: 高密度の後はstatic/holdを置く。曲が速いほど映像まで常時速くしない。",
  "FUN: StaRtの楽しさは『遊び心＋シンプルな強いサビ＋少し意外な和声＋再スタート感』。effectの種類数で代用しない。",
  "ENDING: 1:48〜2:09を総集編→横浜→ENDに使い、Cメロへ入る直前をFinal候補とする。",
] as const;
