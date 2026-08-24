export type TimelineTrackId = "V3" | "V2" | "V1" | "A1" | "A2" | "A3";

export interface TimelineTrackLesson {
  trackId: TimelineTrackId;
  kind: "video" | "audio";
  role: string;
  plainName: string;
  contains: string[];
  whySeparate: string;
  rule: string;
  commonMistake: string;
}

export interface TimelinePractice {
  practiceId: string;
  title: string;
  outcomeId: string;
  minutes: number;
  tracks: TimelineTrackId[];
  steps: string[];
  done: string;
}

export const timelineTrackLessons: TimelineTrackLesson[] = [
  {
    trackId: "V3",
    kind: "video",
    role: "Titles",
    plainName: "文字・タイトル",
    contains: ["名前", "場所", "日付", "Caption", "End Card text"],
    whySeparate: "写真を差し替えても文字を独立して直せ、可読性だけをMute/比較できる。",
    rule: "変更可能な文字は画像へ焼き込まず、可能な限り独立したTitleとして扱う。",
    commonMistake: "写真と文字を1枚にflattenして、直前修正を危険にする。",
  },
  {
    trackId: "V2",
    kind: "video",
    role: "Graphics",
    plainName: "補助グラフィック",
    contains: ["Route", "Mask補助", "Frame", "必要なOverlay", "人物なし補助素材"],
    whySeparate: "実写真・実動画と補助演出の責任を分け、Graphicだけを外して比較できる。",
    rule: "V2を消してもStoryが成立する量に抑える。",
    commonMistake: "空いているからGraphicを足し、V1より演出が主役になる。",
  },
  {
    trackId: "V1",
    kind: "video",
    role: "Photos / Video",
    plainName: "主役の実素材",
    contains: ["実写真", "実動画", "Hero photo", "Childhood photo", "Couple memories"],
    whySeparate: "Wedding Movieの正本となる実素材を一番読みやすいTrackへ集約し、差し替え・Trimを安全にする。",
    rule: "まずV1だけでStoryを成立させ、V2/V3は後から必要量だけ足す。",
    commonMistake: "写真・Graphic・Titleを細かく別Trackへ散らし、どれが主役か分からなくする。",
  },
  {
    trackId: "A1",
    kind: "audio",
    role: "BGM",
    plainName: "作品の音楽",
    contains: ["Opening BGM", "Profile BGM", "曲構造Markerの基準"],
    whySeparate: "作品全体のテンポと感情曲線を1本の基準として読みやすくする。",
    rule: "BGMを細切れにしすぎず、大きな曲構造を先に決める。",
    commonMistake: "映像cutに合わせてBGMを細かく切り、曲の流れを壊す。",
  },
  {
    trackId: "A2",
    kind: "audio",
    role: "Ambience / SFX",
    plainName: "空気・短い合図",
    contains: ["実在する環境音", "必要な短いSFX", "章転換の補助"],
    whySeparate: "BGMと分けてMute比較でき、補助音が多すぎないか判断しやすい。",
    rule: "A2をMuteしてもStoryが成立する。ONで少し伝わりやすくなる程度にする。",
    commonMistake: "旅行感を作るため空港音・波音・カメラ音を重ね続ける。",
  },
  {
    trackId: "A3",
    kind: "audio",
    role: "Dialogue / Original Audio",
    plainName: "実際の声・元音",
    contains: ["会話", "スマホ動画の元音", "本人の声", "必要な実音"],
    whySeparate: "実際の声をBGM/SFXから独立して守り、音量やNoise処理を必要な素材だけに適用できる。",
    rule: "声がある瞬間は内容を優先し、必要ならBGMを下げる。",
    commonMistake: "BGMを常に同じ大きさで流し、実際の声を埋もれさせる。",
  },
];

export const timelineCoreConcepts = [
  {
    title: "Track = 同じ時間を走る役割別のレーン",
    body: "縦に積むのは時間を増やすためではなく、同じ時刻に存在する写真・文字・音を役割ごとに分けるため。",
  },
  {
    title: "Videoは上のTrackが見た目に影響する",
    body: "V3/V2が透明部分を持てばV1が見える。全面を覆えば下の写真は隠れる。だからTitle/Graphicの面積にも意味がある。",
  },
  {
    title: "Audioは上書きではなくMixされる",
    body: "A1/A2/A3は同時に鳴る。Trackを分けるとMute/Solo/Level調整で役割ごとに比較できる。",
  },
  {
    title: "番号より役割が正本",
    body: "実案件でTrack数が増減してもよい。V1だから写真、ではなく『このTrackは何の責任を持つか』を一貫させる。",
  },
];

export const timelinePractices: TimelinePractice[] = [
  {
    practiceId: "timeline-opening-first-13",
    title: "Opening 0–13秒を6Trackで整理する",
    outcomeId: "opening-v1-cold-open",
    minutes: 10,
    tracks: ["V3", "V2", "V1", "A1", "A2"],
    steps: [
      "Cold Open + Okinawa 0–13秒だけを練習Timelineへ置く",
      "実写真をV1へ集める",
      "名前・場所など必要な文字だけV3へ分離する",
      "Route/補助Graphicがある場合だけV2へ置き、Mute比較する",
      "BGMをA1、必要な補助音だけA2へ置いて0–13秒を通す",
    ],
    done: "各clipを見て、なぜそのTrackにあるのか説明でき、V2をMuteしてもOpeningのStoryが成立する。",
  },
  {
    practiceId: "timeline-profile-meeting",
    title: "Profile 出会いChapterを役割別に整理する",
    outcomeId: "profile-meeting-turn",
    minutes: 12,
    tracks: ["V3", "V2", "V1", "A1", "A2", "A3"],
    steps: [
      "出会いsceneの実写真/実動画をV1へ置く",
      "Captionが必要ならV3へ置き、写真から分かる文は削る",
      "Route Graphicは必要性を確認してV2へ置く",
      "BGMをA1、補助音をA2、実動画の声/元音をA3へ分ける",
      "V2/A2をMuteしても『ここからふたり』が伝わるか確認する",
    ],
    done: "実素材とStoryがV1/A1/A3で成立し、V2/A2は補助として外して比較できる。",
  },
];

export const timelineAvoid = [
  "Track数が多いほどプロっぽいと思って増やす",
  "1clipごとに新しいTrackを作る",
  "V1/V2/V3の番号だけ覚えて役割を説明できない",
  "変更可能なCaptionを画像へ焼き込む",
  "BGM・SFX・実音を同じAudio Trackへ混ぜて後から直せなくする",
];
