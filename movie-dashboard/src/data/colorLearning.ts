export type ColorStageId =
  | "original"
  | "white-balance"
  | "exposure"
  | "contrast"
  | "saturation"
  | "shot-match"
  | "final";

export interface ColorLearningStage {
  stageId: ColorStageId;
  order: number;
  title: string;
  davinci: string;
  question: string;
  action: string;
  evidence: string;
  commonMistake: string;
}

export const colorLearningStages: ColorLearningStage[] = [
  {
    stageId: "original",
    order: 1,
    title: "Original / まず見る",
    davinci: "Color page / Viewer + Scopes",
    question: "何が本当に違和感なのか。色温度、明るさ、コントラスト、彩度のどれか？",
    action: "補正前に隣のshotと交互に見て、直したい差を1〜2個だけ言葉にする。",
    evidence: "『暖かすぎる』『顔だけ暗い』など、補正前の問題を説明できる。",
    commonMistake: "何も観察せずLUTやPresetを先に当てる。",
  },
  {
    stageId: "white-balance",
    order: 2,
    title: "White Balance / 色かぶり",
    davinci: "Primaries / Temp / Tint",
    question: "白・肌・中立色が不自然に青い、黄い、緑、マゼンタへ寄っていないか？",
    action: "Temp / Tintを小さく動かし、隣shotと比べて色かぶりだけを減らす。",
    evidence: "WB補正前後で『何色の偏りを直したか』を説明できる。",
    commonMistake: "旅行先の暖かさや夕方の色まで完全な中立へ消す。",
  },
  {
    stageId: "exposure",
    order: 3,
    title: "Exposure / 明るさ",
    davinci: "Primaries / Lift / Gamma / Gain / Offset + Waveform",
    question: "顔や主役が暗すぎる・明るすぎる、白飛び・黒つぶれがないか？",
    action: "まず全体の明るさを合わせ、必要ならLift/Gamma/Gainで領域ごとの差を整える。",
    evidence: "WaveformとViewerの両方で、隣shotとの明るさ差が小さくなっている。",
    commonMistake: "Viewerの印象だけで明るくし続け、ハイライトを飛ばす。",
  },
  {
    stageId: "contrast",
    order: 4,
    title: "Contrast / 立体感",
    davinci: "Primaries / Contrast / Pivot",
    question: "眠い、硬すぎる、黒が重いなど、明暗差の強さが隣shotと合っているか？",
    action: "Contrastを少量調整し、黒・肌・ハイライトのバランスを崩さない。",
    evidence: "写真ごとの撮影条件差が減りつつ、元の雰囲気は残っている。",
    commonMistake: "Cinematicに見せるためContrastを強くし、Wedding写真の柔らかさを消す。",
  },
  {
    stageId: "saturation",
    order: 5,
    title: "Saturation / 色の量",
    davinci: "Primaries / Saturation + Vectorscope",
    question: "特定shotだけ派手・薄い、肌や空だけ不自然に強くなっていないか？",
    action: "WB・Exposure・Contrastの後で必要な時だけSaturationを少量調整する。",
    evidence: "旅行先が変わっても急にCMのような派手色へ跳ねない。",
    commonMistake: "Hawaii・海・旅行感を出すためにSaturationを上げる。",
  },
  {
    stageId: "shot-match",
    order: 6,
    title: "Shot Match / 前後で合わせる",
    davinci: "Gallery Still / Split Screen / Scopes",
    question: "単体では綺麗でも、前後へ切り替えた瞬間に違和感が出ていないか？",
    action: "代表shotを基準にして前後を交互比較し、WB・Exposure・Contrastの大差だけを揃える。",
    evidence: "3〜5shotを連続再生しても『色が変わった』よりStoryへ目が行く。",
    commonMistake: "全写真を完全に同じ色へコピーし、場所や時間帯の個性を消す。",
  },
  {
    stageId: "final",
    order: 7,
    title: "Final / 全体で見る",
    davinci: "Timeline playback / Bypass Color Grades",
    question: "補正が目立っていないか。OriginalよりWedding Movieとして自然につながっているか？",
    action: "Grade ON/OFFと全体再生を行い、直す必要のない補正は戻す。",
    evidence: "『綺麗にした』ではなく『違和感を減らした』と言える状態。",
    commonMistake: "最後にFilm Look / LUT / Glowを足して、整えた統一感を壊す。",
  },
];

export const colorWeddingExercises = [
  {
    exerciseId: "opening-hawaii-match",
    title: "Opening Hawaii 3枚を揃える",
    source: "opening-v1-hawaii",
    minutes: 12,
    steps: [
      "3枚を補正なしで連続再生し、一番中立に見える1枚を基準候補にする",
      "各shotのWB差を先に整える",
      "顔・空・海のExposure差を整える",
      "Saturationは最後まで触らず比較する",
      "3枚を11秒で再生し、色より写真内容へ目が行くか確認する",
    ],
    done: "3枚が同じ色ではなく、同じ作品の中に自然に存在している。",
  },
  {
    exerciseId: "profile-couple-match",
    title: "Profile ふたりの思い出を旅行CMにしない",
    source: "profile-couple-climax",
    minutes: 15,
    steps: [
      "旅行・日常・家族写真を混ぜて5枚選ぶ",
      "一番派手な写真ではなく、肌と明るさが自然な写真を基準にする",
      "旅行写真だけ強いSaturationになっていないか確認する",
      "場所ごとの空気感は残しつつ、Exposureの急変だけ減らす",
      "5枚を止めずに見て感情の山が色補正より先に伝わるか確認する",
    ],
    done: "旅行先の違いは残りつつ、色の派手さではなく写真の強弱で感情が動く。",
  },
];

export const colorDecisionRules = [
  "LUTより先に White Balance → Exposure → Contrast → Saturation。",
  "単体で綺麗より、前後shotで自然を優先。",
  "場所・時間帯の違いは消さない。違和感になる差だけ減らす。",
  "肌・顔・実写真の記憶を守り、AI的な均一化を目指さない。",
];
