export type AudioStageId =
  | "role"
  | "bgm-structure"
  | "level"
  | "fade"
  | "jl-cut"
  | "ambience-sfx"
  | "eq-noise"
  | "full-pass";

export interface AudioLearningStage {
  stageId: AudioStageId;
  order: number;
  title: string;
  davinci: string;
  question: string;
  action: string;
  evidence: string;
  commonMistake: string;
}

export const audioLearningStages: AudioLearningStage[] = [
  {
    stageId: "role",
    order: 1,
    title: "Role / 音の役割",
    davinci: "Edit / Fairlight / Track layout",
    question: "この音はBGM・Dialogue・Ambience・SFXのどれで、何を伝えるためにある？",
    action: "音を足す前に役割を1つ決め、同じ役割の音を重ねすぎない。",
    evidence: "各Audio Trackを『何のための音か』1文で説明できる。",
    commonMistake: "寂しいからSFXや環境音を足し、情報量だけ増やす。",
  },
  {
    stageId: "bgm-structure",
    order: 2,
    title: "BGM Structure / 曲の地図",
    davinci: "Edit / Waveform / Marker",
    question: "Intro・Verse・Lift・サビ・終端のどこをWedding sceneへ使う？",
    action: "細かいBeat全部ではなく、大きなフレーズ変化へMarkerを置く。",
    evidence: "章転換・Hero・Endingを曲構造のどこへ置くか理由を説明できる。",
    commonMistake: "全BeatへMarkerを置き、写真を曲へ従わせる。",
  },
  {
    stageId: "level",
    order: 3,
    title: "Level / 音量",
    davinci: "Fairlight / Clip Gain / Mixer / Meters",
    question: "前後で急に大きい・小さい音はないか。BGMが写真の感情を押しつぶしていないか？",
    action: "まずClip Gain / Levelで大差を減らし、細かい処理は後にする。",
    evidence: "音量変更そのものへ注意が向かず、映像を自然に見続けられる。",
    commonMistake: "全部を大きくして迫力を出す、またはMixerだけで原因を隠す。",
  },
  {
    stageId: "fade",
    order: 4,
    title: "Fade / 入りと終わり",
    davinci: "Edit / Fairlight / Audio Fade",
    question: "音の開始・終了が急停止していないか。逆にFadeが長すぎてテンポを失っていないか？",
    action: "必要最小限のFadeを付け、映像のFadeと同じ長さに固定しない。",
    evidence: "音の終わりを意識せず次のsceneへ進める。",
    commonMistake: "すべての音へ長いFadeを入れて『丁寧』に見せる。",
  },
  {
    stageId: "jl-cut",
    order: 5,
    title: "J-cut / L-cut / 音でつなぐ",
    davinci: "Edit / Linked Selection / Audio Trim",
    question: "画が切り替わる前後に、次の場面を音で先に感じさせる・前の余韻を残す意味がある？",
    action: "同時Cut版を基準にし、J-cut / L-cutで意味が増える時だけ編集点をずらす。",
    evidence: "Transitionを足さなくても章のつながりが自然になる。",
    commonMistake: "J/L-cutをプロっぽい技として全sceneへ使う。",
  },
  {
    stageId: "ambience-sfx",
    order: 6,
    title: "Ambience / SFX / 空気と合図",
    davinci: "Fairlight / Audio Tracks / Clip Gain",
    question: "環境音やSFXがStoryを補助しているか、それとも映像にない情報を捏造していないか？",
    action: "実音があるなら優先し、必要な合図だけ短く使う。人物・場所の現実感を作り直さない。",
    evidence: "音をMuteしてもStoryは成立し、ONにすると空気や転換だけが少し伝わりやすくなる。",
    commonMistake: "旅行感のため空港音・波音・カメラ音を大量に重ねる。",
  },
  {
    stageId: "eq-noise",
    order: 7,
    title: "EQ / Noise / 聞きやすさ",
    davinci: "Fairlight / EQ / Noise Reduction",
    question: "会話や実動画の音に、視聴を邪魔する低域・高域・Noiseが本当にある？",
    action: "問題がある素材だけ最小限に処理し、声や空気感の質感を残す。",
    evidence: "処理前より聞きやすいが、声が薄い・人工的・無音空間になっていない。",
    commonMistake: "Noiseをゼロにしようとして声の質感まで削る。",
  },
  {
    stageId: "full-pass",
    order: 8,
    title: "Full Pass / 画面を見ずに聴く",
    davinci: "Fairlight / Timeline playback / Meters",
    question: "最初から最後まで、音量・切れ目・不自然なSFX・急な無音に気を取られないか？",
    action: "一度画面から視線を外して全体を聴き、気になった時刻だけMarkerへ残す。",
    evidence: "音が演出として目立つのではなく、Wedding Movieを自然に支えている。",
    commonMistake: "scene単体の音だけ確認し、全体での音量差や曲構造を見ない。",
  },
];

export const audioTrackAnatomy = [
  { track: "A1", role: "BGM", rule: "作品全体の感情と時間構造。まずここを正本にする。" },
  { track: "A2", role: "Ambience / SFX", rule: "空気・転換の補助。なくてもStoryが成立する量に抑える。" },
  { track: "A3", role: "Dialogue / Original Audio", rule: "実動画の声・会話。存在する場合はBGMより内容を優先する。" },
];

export const audioWeddingExercises = [
  {
    exerciseId: "opening-ending-audio",
    title: "Opening Ending 57–60秒の余韻を作る",
    source: "opening-v1-ending",
    minutes: 10,
    steps: [
      "53–60秒をBGMだけで再生し、終端の位置を確認する",
      "End Card表示とBGM Fadeを同じ時刻に固定せず別々に調整する",
      "Fadeなし / 短いFade / 長いFadeを比較する",
      "最後の1秒へSFXを足さなくても成立するか確認する",
      "57–60秒を画面を見ずに聴いて急停止感がないか確認する",
    ],
    done: "End Cardを読み終えた時にBGMが自然に解決し、音の処理自体は意識されない。",
  },
  {
    exerciseId: "profile-meeting-audio",
    title: "Profile 出会いを音で転換する",
    source: "profile-meeting-turn",
    minutes: 12,
    steps: [
      "新婦編末尾 → 出会い冒頭を映像・音とも同時Hard Cutで作る",
      "BGMの次フレーズだけ少し先行する案を比較する",
      "必要なら前sceneの音を短く残すL-cutも比較する",
      "派手なTransitionなしで『ここからふたり』と感じる案を選ぶ",
      "採用理由を『J-cutだから』ではなくStoryの変化で説明する",
    ],
    done: "画面効果を足さなくても、音の変化でStoryがふたり編へ切り替わる。",
  },
  {
    exerciseId: "profile-full-audio",
    title: "Profile 4〜6分を音だけでFull Pass",
    source: "profile-full-pass",
    minutes: 15,
    steps: [
      "最初から最後まで画面を見ずに再生する",
      "音量差が気になった時刻だけMarkerする",
      "長すぎるFade・不自然な無音・不要SFXをMarkerする",
      "修正は一度に1種類ずつ行う",
      "再度Full Passし、映像を見る前に音だけで違和感が減ったか確認する",
    ],
    done: "4〜6分を聴き続けても編集点の音処理に注意を奪われない。",
  },
];

export const audioDecisionRules = [
  "音を足す前に役割を決める。",
  "Beatは候補点であり、写真を読む時間より常に優先しない。",
  "J/L-cutは意味が増える時だけ。技法を使うことを目的にしない。",
  "実音・声の質感を守り、Noiseをゼロにすることを目標にしない。",
  "Finalは画面を見ずに一度聴く。",
];
