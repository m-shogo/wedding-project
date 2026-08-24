export type ShortcutMappingPolicy = "known_core" | "verify_current_map";

export interface ShortcutAction {
  actionId: string;
  label: string;
  purpose: string;
  defaultBinding: string | null;
  mappingPolicy: ShortcutMappingPolicy;
  weddingUse: string;
  avoid: string;
}

export interface ShortcutDrill {
  drillId: string;
  title: string;
  minutes: number;
  actionIds: string[];
  practice: string[];
  done: string;
  weddingOutcomeIds: string[];
}

export const shortcutActions: ShortcutAction[] = [
  {
    actionId: "play-stop",
    label: "Play / Stop",
    purpose: "再生と停止をマウスへ戻らず繰り返す。",
    defaultBinding: "Space",
    mappingPolicy: "known_core",
    weddingUse: "10秒preview、Full Pass、Color/Audio比較のすべて。",
    avoid: "再生ボタンへ毎回マウスを移動する。",
  },
  {
    actionId: "play-reverse",
    label: "Play Reverse",
    purpose: "直前の編集点を逆再生で素早く確認する。",
    defaultBinding: "J",
    mappingPolicy: "known_core",
    weddingUse: "Cut前後、J/L-cut、Transition比較。",
    avoid: "Timelineを大きくスクロールして戻る。",
  },
  {
    actionId: "stop-jkl",
    label: "JKL Stop",
    purpose: "JKL操作中に再生を止める。",
    defaultBinding: "K",
    mappingPolicy: "known_core",
    weddingUse: "写真の切替点や音の入り位置を探す。",
    avoid: "JKLを速度競争として使い、写真を読まない。",
  },
  {
    actionId: "play-forward",
    label: "Play Forward",
    purpose: "再生と速度変更を左手のまま行う。",
    defaultBinding: "L",
    mappingPolicy: "known_core",
    weddingUse: "長尺Profileの素材確認、Cut点探索。",
    avoid: "速く見ること自体を目的にする。",
  },
  {
    actionId: "marker",
    label: "Add Marker",
    purpose: "Beat・修正時刻・Story転換候補をその場で記録する。",
    defaultBinding: "M",
    mappingPolicy: "known_core",
    weddingUse: "Opening Beat、Profile Full Pass、AI Review Findingの時刻。",
    avoid: "全BeatへMarkerを置いてTimelineを埋める。",
  },
  {
    actionId: "mark-in",
    label: "Mark In",
    purpose: "使いたい範囲の開始を指定する。",
    defaultBinding: "I",
    mappingPolicy: "verify_current_map",
    weddingUse: "スマホ動画から必要な瞬間だけ抜き出す。",
    avoid: "素材全体をTimelineへ置いて後から探す。",
  },
  {
    actionId: "mark-out",
    label: "Mark Out",
    purpose: "使いたい範囲の終了を指定する。",
    defaultBinding: "O",
    mappingPolicy: "verify_current_map",
    weddingUse: "スマホ動画、B-roll、音素材の必要区間。",
    avoid: "In/Outを秒数合わせだけに使う。",
  },
  {
    actionId: "step-back",
    label: "Previous Frame",
    purpose: "1frame単位で編集点を前へ確認する。",
    defaultBinding: "←",
    mappingPolicy: "known_core",
    weddingUse: "Hard Cut、BGM終端、黒frame確認。",
    avoid: "細かく見る必要がない写真cutまでframe単位で悩む。",
  },
  {
    actionId: "step-forward",
    label: "Next Frame",
    purpose: "1frame単位で編集点を後ろへ確認する。",
    defaultBinding: "→",
    mappingPolicy: "known_core",
    weddingUse: "Cut前後やTitle表示開始の確認。",
    avoid: "frame精度がStory判断より重要だと思う。",
  },
  {
    actionId: "previous-edit",
    label: "Previous Edit",
    purpose: "前の編集点へ移動する。",
    defaultBinding: "↑",
    mappingPolicy: "verify_current_map",
    weddingUse: "Opening 60秒、Profile長尺のCut巡回。",
    avoid: "毎回Timelineをズームして編集点をクリックする。",
  },
  {
    actionId: "next-edit",
    label: "Next Edit",
    purpose: "次の編集点へ移動する。",
    defaultBinding: "↓",
    mappingPolicy: "verify_current_map",
    weddingUse: "写真切替を順番にQAする。",
    avoid: "編集点の移動と再生確認を混同する。",
  },
  {
    actionId: "add-edit",
    label: "Add Edit",
    purpose: "Playhead位置でclipへ編集点を追加する。",
    defaultBinding: null,
    mappingPolicy: "verify_current_map",
    weddingUse: "長い動画、BGM、ラフカットを素早く区切る。",
    avoid: "現在のKeyboard Mappingを確認せず、別presetのキーを暗記する。",
  },
  {
    actionId: "ripple-delete",
    label: "Ripple Delete",
    purpose: "不要区間を削除して後ろを詰める。",
    defaultBinding: null,
    mappingPolicy: "verify_current_map",
    weddingUse: "Profile長尺の重複写真や間延び区間を削る。",
    avoid: "通常Deleteとの違いを理解せずTimelineをずらす。",
  },
  {
    actionId: "trim-start-playhead",
    label: "Trim Start to Playhead",
    purpose: "clip頭をPlayheadまで詰める。",
    defaultBinding: null,
    mappingPolicy: "verify_current_map",
    weddingUse: "スマホ動画の頭、Profile写真の表示尺調整。",
    avoid: "キー名だけ覚え、Rippleの影響をpreviewしない。",
  },
  {
    actionId: "trim-end-playhead",
    label: "Trim End to Playhead",
    purpose: "clip末尾をPlayheadまで詰める。",
    defaultBinding: null,
    mappingPolicy: "verify_current_map",
    weddingUse: "BGMフレーズ終端、写真表示尺の短縮。",
    avoid: "後続clipへの影響を確認せず使う。",
  },
];

export const shortcutDrills: ShortcutDrill[] = [
  {
    drillId: "shortcut-review-loop",
    title: "5分 / Preview + Marker",
    minutes: 5,
    actionIds: ["play-stop", "play-reverse", "stop-jkl", "play-forward", "marker"],
    practice: [
      "Openingの10秒区間を選ぶ",
      "SpaceとJKLだけで3回previewする",
      "気になった時刻へMでMarkerを1〜2個だけ置く",
      "マウスで再生・停止しなかったか確認する",
    ],
    done: "3回連続で再生・停止・逆再生・Markerを迷わず実行できる。",
    weddingOutcomeIds: ["opening-v1-okinawa", "opening-v1-seoul"],
  },
  {
    drillId: "shortcut-source-range",
    title: "7分 / 素材から必要区間を取る",
    minutes: 7,
    actionIds: ["play-stop", "play-forward", "mark-in", "mark-out", "step-back", "step-forward"],
    practice: [
      "練習用動画を1本開く",
      "JKLで使いたい瞬間を探す",
      "現在MappingのIn/Outを確認して範囲指定する",
      "左右Arrowで境界を1frame確認する",
    ],
    done: "マウスでrange端をドラッグせず、3回連続で必要区間を指定できる。",
    weddingOutcomeIds: ["profile-photo-selection"],
  },
  {
    drillId: "shortcut-cut-trim",
    title: "10分 / Cut + Ripple Trim",
    minutes: 10,
    actionIds: ["previous-edit", "next-edit", "add-edit", "ripple-delete", "trim-start-playhead", "trim-end-playhead"],
    practice: [
      "DaVinci Resolve > Keyboard Customizationで現在Mappingを確認する",
      "各actionへ現在のkeyをこの画面へ登録する",
      "練習TimelineでAdd Edit → Ripple Deleteを3回行う",
      "前後のeditへ移動し、Trim Start/Endを1回ずつ試す",
      "Undoを使える練習素材だけでRippleの影響を確認する",
    ],
    done: "現在のMappingでCut/Trim系を3回連続実行し、Rippleで何が動くか説明できる。",
    weddingOutcomeIds: ["opening-v1-okinawa", "profile-groom-arc", "profile-full-pass"],
  },
];

export const shortcutPrinciples = [
  "Shortcutは操作速度ではなく、視線を映像から離さないために覚える。",
  "現在のKeyboard Mappingを正本にし、他人のキー一覧を丸暗記しない。",
  "Weddingで週に何度も使う操作から覚える。",
  "3回連続で迷わず使えたら十分。ゲームのScoreやStreakを目的にしない。",
  "Ripple系は練習Timelineで影響を理解してから本番へ使う。",
];
