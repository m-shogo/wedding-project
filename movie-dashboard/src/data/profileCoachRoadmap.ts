export interface ProfileCoachPhase {
  phaseId: string;
  order: number;
  title: string;
  sceneIds: string[];
  productionOutcome: string;
  learn: string[];
  davinci: string[];
  practiceMinutes: number;
  apply: string[];
  done: string[];
  avoid: string[];
  why: string;
}

export const profileCoachPhases: ProfileCoachPhase[] = [
  {
    phaseId: "profile-story-map",
    order: 1,
    title: "Story Map / 最終尺を決める",
    sceneIds: ["pr-01", "pr-02", "pr-03", "pr-04", "pr-05", "pr-06", "pr-07", "pr-08", "pr-09", "pr-10"],
    productionOutcome: "10sceneそれぞれの役割と、最終尺・BGM構造を決める",
    learn: ["Narrative Arc", "Chapter Purpose", "Long-form Pacing", "Emotion Curve"],
    davinci: ["Timeline", "Marker", "Basic Trim"],
    practiceMinutes: 15,
    apply: [
      "10sceneを仮素材のままTimelineへ並べる",
      "各sceneを『誰の何を伝える時間か』1文で定義する",
      "BGM候補の大きなフレーズ・サビ・終端へMarkerを置く",
      "現在のscene合計とproject targetの差を確認し、増減する理由を決める",
    ],
    done: [
      "全sceneの役割が1文で説明できる",
      "最終尺の目標に理由がある",
      "BGM構成とChapter境界が仮決定している",
    ],
    avoid: ["target 6分だから100秒を演出で埋める", "先にTransitionを選ぶ", "写真の枚数だけでscene尺を決める"],
    why: "プロフィールムービーは長尺なので、1cutの技法より先に物語と時間配分を決めないと全体が散らかる。",
  },
  {
    phaseId: "profile-groom-arc",
    order: 2,
    title: "新郎編 / Childhood → Student → Adult",
    sceneIds: ["pr-02", "pr-03", "pr-04"],
    productionOutcome: "新郎の3sceneを『写真一覧』ではなく1本の人物紹介としてつなぐ",
    learn: ["Photo Sequencing", "Caption Economy", "Pacing Variation", "Continuity"],
    davinci: ["Trim", "Ripple", "Text", "Transform"],
    practiceMinutes: 15,
    apply: [
      "各写真へ『この1枚で何が分かるか』を1つ付ける",
      "似た役割の写真が続く場合は片方を外す候補にする",
      "幼少期は読む時間を長め、学生時代は少しテンポを上げて比較する",
      "Captionは写真から分からない情報だけを書く",
    ],
    done: ["3sceneのテンポが同じではない", "Captionが写真の説明文になっていない", "新郎の人柄が30秒単位ではなく全体で伝わる"],
    avoid: ["全写真Slow Zoom", "全写真同じ秒数", "写真に写っていることをCaptionで繰り返す"],
    why: "生い立ちは年代順に並べるだけではStoryにならず、変化と人柄が見える写真順が必要。",
  },
  {
    phaseId: "profile-bride-arc",
    order: 3,
    title: "新婦編 / Childhood → Student → Adult",
    sceneIds: ["pr-05", "pr-06", "pr-07"],
    productionOutcome: "新婦編を新郎編のテンプレコピーにせず、写真内容に合わせた別のリズムで作る",
    learn: ["Editorial Rhythm", "Photo Sequencing", "Visual Variety", "Caption Readability"],
    davinci: ["Trim", "Ripple", "Text", "Transform"],
    practiceMinutes: 15,
    apply: [
      "新郎編で使ったmotion presetを一旦外して写真そのものを見る",
      "表情・集合写真・行事写真の並びを変えてリズムを作る",
      "写真の向きや情報量に合わせてStatic / Pushを選ぶ",
      "新郎編と同じ章尺にする必要があるか比較する",
    ],
    done: ["新郎編と見た目がコピーになっていない", "新婦写真の内容に合うPacingになっている", "両者の紹介量に大きな不公平感がない"],
    avoid: ["新郎編の設定を全コピー", "人物ごとに別デザインテーマを作る", "動きの種類を増やして差を出す"],
    why: "統一感は同じpresetからではなく、同じ編集原則を異なる素材へ適用することで作る。",
  },
  {
    phaseId: "profile-meeting-turn",
    order: 4,
    title: "出会い / 2本のStoryを1本に切り替える",
    sceneIds: ["pr-08"],
    productionOutcome: "新郎・新婦の別々の時間から、ふたりのStoryへ明確に転換する",
    learn: ["Narrative Turn", "Match / Hard Cut", "Music Lift", "J-cut / L-cut"],
    davinci: ["Marker", "Trim", "J/L-cut", "Audio Level"],
    practiceMinutes: 12,
    apply: [
      "新婦編末尾 → 出会い冒頭をHard Cutだけで一度作る",
      "BGMの変化を画より少し先に入れる案を比較する",
      "初期ツーショットを最初の強い視覚情報として置く",
      "地図/航路graphicはStoryが分かりにくい時だけ補助にする",
    ],
    done: ["ここから『ふたり』になったと一目で分かる", "音と画の転換理由が説明できる", "旅行graphicが主役になっていない"],
    avoid: ["派手なTransitionで出会いを表現", "地図Animationを長く見せる", "無意味な英語Chapter title"],
    why: "プロフィールムービー最大の構造変化なので、装飾ではなくStoryと音で転換を感じさせる。",
  },
  {
    phaseId: "profile-couple-climax",
    order: 5,
    title: "ふたりの思い出 / Emotional Climax",
    sceneIds: ["pr-09"],
    productionOutcome: "旅行・日常・犬の写真を、単なるベストショット集ではなく感情の山にする",
    learn: ["Emotion Curve", "Beat Emphasis", "Photo Contrast", "Color Consistency"],
    davinci: ["Marker", "Trim", "Color", "Transform"],
    practiceMinutes: 15,
    apply: [
      "最も強い写真を先に決め、そこへ向かう順番を作る",
      "旅行→日常→家族写真のコントラストを試す",
      "BGMの大きな山へ強い写真を1〜2枚だけ合わせる",
      "旅行ごとのWB/Exposure差を前後比較で整える",
    ],
    done: ["一番見せたい写真が明確", "サビで全写真を高速化していない", "旅行写真だけのCMにならず日常の関係性も残っている"],
    avoid: ["サビ=高速montage", "犬や人物をAI化", "旅行感のためにSaturationを上げる", "全写真にTransition"],
    why: "感情の山は演出量ではなく、写真の強弱と前後関係で作る方が二人らしさが残る。",
  },
  {
    phaseId: "profile-ending",
    order: 6,
    title: "Ending / 感謝を読ませて余韻を作る",
    sceneIds: ["pr-10"],
    productionOutcome: "写真・メッセージ・BGM終端を競合させず、ゲストが読める締めを作る",
    learn: ["Caption Readability", "Stillness", "Audio Resolution", "Ending Pace"],
    davinci: ["Text", "Audio Fade", "Trim"],
    practiceMinutes: 10,
    apply: [
      "メッセージを実時間15秒で読み、長ければ削る",
      "背景写真をStaticで成立させる案を基準にする",
      "BGMのfadeと文字の消えるタイミングを別々に調整する",
      "最後の1秒を埋める必要があるか比較する",
    ],
    done: ["止めずにメッセージを読める", "写真と文字の優先順位が明確", "終端が急停止せず、長すぎる余韻でもない"],
    avoid: ["長文を小さい文字で詰める", "最後までSlow Zoom", "Fadeを重ねて何秒もぼかす"],
    why: "最後に必要なのは新しい演出ではなく、ゲストが内容を受け取る時間。",
  },
  {
    phaseId: "profile-full-pass",
    order: 7,
    title: "Full Pass / 4〜6分を1本としてレビューする",
    sceneIds: ["pr-01", "pr-02", "pr-03", "pr-04", "pr-05", "pr-06", "pr-07", "pr-08", "pr-09", "pr-10"],
    productionOutcome: "scene単体の完成をやめ、全体の重複・偏り・感情曲線を削って整える",
    learn: ["Long-form Pacing", "Narrative Balance", "Audio Continuity", "Color Continuity"],
    davinci: ["Timeline", "Ripple", "Markers", "Fairlight", "Color"],
    practiceMinutes: 20,
    apply: [
      "最初から最後まで止めずに1回見る",
      "退屈した時刻・読めなかった時刻・強かった時刻をMarkerで記録する",
      "足す前に重複写真・重複Caption・過剰Transitionを削る",
      "新郎/新婦/ふたりの時間配分と、家族・友人・日常の偏りを見る",
    ],
    done: ["全体を止めずに見てもStoryが分かる", "長い理由を説明できない区間がない", "音量・色・文字の急な違いがない", "会場向けreviewへ進める"],
    avoid: ["弱い区間へEffectを足す", "scene単位の完成度だけで判断", "target尺へ機械的に合わせる"],
    why: "長尺作品の弱点は局所ではなく、重複と全体配分に現れるから。",
  },
];
