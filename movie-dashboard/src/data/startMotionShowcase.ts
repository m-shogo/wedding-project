import type {MotionEnergy, MotionIntensity} from "./startMotionKit";
import { startMotionPresets } from "./startMotionKit";

export type StartShowcaseSection =
  | "intro"
  | "verse-1"
  | "chorus-1"
  | "instrumental-1"
  | "verse-2"
  | "chorus-2"
  | "post-chorus-instrumental"
  | "end";

export type ShowcasePlacement =
  | "full-frame"
  | "center-overlay"
  | "lower-third"
  | "edge-overlay"
  | "full-frame-graphic";

export interface StartShowcaseSlot {
  slotId: string;
  section: StartShowcaseSection;
  markerAnchor: string;
  phraseSlot: `LYRIC_${string}` | null;
  sourceSlot: string;
  motionPresetId: string;
  energy: MotionEnergy;
  intensity: MotionIntensity;
  placement: ShowcasePlacement;
  expectedDuration: string;
  purpose: string;
  avoidWhen: string;
  status: "planned";
}

export const startShowcaseAuthority = {
  timingState: "blocked-until-cleared-local-audio" as const,
  exactEndMarker: null,
  timingRule: "正規/local音源をPalmierまたはDaVinciへ読み込み、波形とMarkerでsection境界と終了点を確定する。Web推測秒はGit正本にしない。",
  lyricRule: "GitにはLYRIC_### slotだけを保存し、歌詞本文は保存しない。権利確認済みテキストはlocal-onlyで扱う。",
  mediaRule: "人物・家族・友人・犬は実写真・実動画を使い、AIで本人性を生成・変形しない。",
  finalRule: "これはMotion Showcaseの研究用roughでありFinalではない。Finalは4〜8程度のmotion familyへ削る。",
};

export const startShowcaseSections: StartShowcaseSection[] = [
  "intro",
  "verse-1",
  "chorus-1",
  "instrumental-1",
  "verse-2",
  "chorus-2",
  "post-chorus-instrumental",
  "end",
];

export const startShowcaseSlots: StartShowcaseSlot[] = [
  { slotId: "SHOW_001", section: "intro", markerAnchor: "INTRO_HEAD", phraseSlot: null, sourceSlot: "GRAPHIC_WEDDING_GREETING", motionPresetId: "type-quiet-caption", energy: "quiet", intensity: "S", placement: "center-overlay", expectedDuration: "2〜4 half-time beats / markerで調整", purpose: "WELCOME / THANK YOU FOR COMING系のWedding greetingを静かに読ませる。", avoidWhen: "冒頭から全画面flashや高速cutを入れる時。", status: "planned" },
  { slotId: "SHOW_002", section: "intro", markerAnchor: "INTRO_DEPARTURE_CUE", phraseSlot: null, sourceSlot: "GRAPHIC_NAMES_DATE", motionPresetId: "type-mask-slide", energy: "build", intensity: "S", placement: "center-overlay", expectedDuration: "2 half-time beats / markerで調整", purpose: "SHOGO & SHIORI / 2026.10.24から旅行の出発へつなぐ。", avoidWhen: "文字が実写真より主役になり続ける時。", status: "planned" },
  { slotId: "SHOW_003", section: "verse-1", markerAnchor: "VERSE_1_PHRASE_A", phraseSlot: "LYRIC_001", sourceSlot: "PHOTO_TRAVEL_OKINAWA_HERO", motionPresetId: "photo-static-hero", energy: "quiet", intensity: "S", placement: "full-frame", expectedDuration: "4 half-time beats / 写真を読む時間優先", purpose: "最初の実写真Heroを動かしすぎず、Wedding storyを主役へ戻す。", avoidWhen: "全写真へ同じ静止holdを連続適用する時。", status: "planned" },
  { slotId: "SHOW_004", section: "verse-1", markerAnchor: "VERSE_1_PHRASE_B", phraseSlot: "LYRIC_002", sourceSlot: "PHOTO_TRAVEL_SEOUL", motionPresetId: "photo-small-push", energy: "build", intensity: "S", placement: "full-frame", expectedDuration: "2〜4 half-time beats / 写真の構図で調整", purpose: "1.03〜1.05程度の小さいpushで写真の読みやすさを維持する。", avoidWhen: "全shotを常時zoomさせる時。", status: "planned" },
  { slotId: "SHOW_005", section: "chorus-1", markerAnchor: "CHORUS_1_HEAD", phraseSlot: "LYRIC_003", sourceSlot: "PHOTO_HERO_A", motionPresetId: "type-word-punch", energy: "hit", intensity: "M", placement: "center-overlay", expectedDuration: "1〜2 half-time beats / chorus head marker優先", purpose: "Hero写真を維持し、短いphraseだけを瞬間的に強調する。", avoidWhen: "長文全文をpunchして写真を隠す時。", status: "planned" },
  { slotId: "SHOW_006", section: "chorus-1", markerAnchor: "CHORUS_1_THREE_HIT", phraseSlot: "LYRIC_004", sourceSlot: "PHOTO_HERO_A", motionPresetId: "accent-stamp-triplet", energy: "peak", intensity: "M", placement: "edge-overlay", expectedDuration: "3 hit only / 同一Hero写真を維持", purpose: "写真を3回切らず、stamp → line → route dot系のmicro graphicで3-hitを拾う。", avoidWhen: "3hitごとにfull-screen flash/shakeする時。", status: "planned" },
  { slotId: "SHOW_007", section: "instrumental-1", markerAnchor: "INSTRUMENTAL_1_SHIFT", phraseSlot: null, sourceSlot: "GRAPHIC_ROUTE_SHIFT", motionPresetId: "wipe-route-line", energy: "build", intensity: "M", placement: "full-frame-graphic", expectedDuration: "1〜2 half-time beats / section transition marker", purpose: "間奏でroute lineを使い、写真主体からAnime-OP graphic grammarへ一度変化させる。", avoidWhen: "移動文脈がないのにroute graphicを使う時。", status: "planned" },
  { slotId: "SHOW_008", section: "verse-2", markerAnchor: "VERSE_2_PHRASE_A", phraseSlot: "LYRIC_005", sourceSlot: "PHOTO_TRAVEL_HAWAII", motionPresetId: "type-char-stagger", energy: "build", intensity: "M", placement: "lower-third", expectedDuration: "2〜4 half-time beats / phrase読了優先", purpose: "2番で文字motionの種類を変え、1番との差を作る。", avoidWhen: "全文を細かく分解しすぎてカラオケ表示になる時。", status: "planned" },
  { slotId: "SHOW_009", section: "verse-2", markerAnchor: "VERSE_2_MONTAGE", phraseSlot: "LYRIC_006", sourceSlot: "PHOTO_VIDEO_TRAVEL_MIX", motionPresetId: "photo-split-panel", energy: "build", intensity: "M", placement: "full-frame", expectedDuration: "2〜4 half-time beats / source readability優先", purpose: "2〜3panelで実写真・実動画の同時性を試す。", avoidWhen: "4分割以上で固定UIのようになる時。", status: "planned" },
  { slotId: "SHOW_010", section: "chorus-2", markerAnchor: "CHORUS_2_HEAD", phraseSlot: "LYRIC_007", sourceSlot: "PHOTO_HERO_B", motionPresetId: "photo-static-hero", energy: "peak", intensity: "S", placement: "full-frame", expectedDuration: "4 half-time beats / strongest photo readability優先", purpose: "2番サビheadは強い実写真を静止させ、周囲のmotionとの落差で最大peakを作る。", avoidWhen: "peakだからという理由だけで写真自体を激しく動かす時。", status: "planned" },
  { slotId: "SHOW_011", section: "chorus-2", markerAnchor: "CHORUS_2_ACCELERATION", phraseSlot: "LYRIC_008", sourceSlot: "PHOTO_HERO_B", motionPresetId: "accent-speed-lines", energy: "peak", intensity: "M", placement: "edge-overlay", expectedDuration: "single accent / 12frames超の常設禁止", purpose: "Hero写真は維持し、短いspeed lineだけで加速感を追加する。", avoidWhen: "写真全体を常時Anime加工する時。", status: "planned" },
  { slotId: "SHOW_012", section: "chorus-2", markerAnchor: "CHORUS_2_THREE_HIT", phraseSlot: "LYRIC_009", sourceSlot: "PHOTO_HERO_B", motionPresetId: "accent-stamp-triplet", energy: "peak", intensity: "L", placement: "edge-overlay", expectedDuration: "3 hit only / markerで各hit確定", purpose: "2番サビの3-hitをWedding旅行モチーフのstampで比較する。", avoidWhen: "3-hitがない位置へ機械的に適用する時。", status: "planned" },
  { slotId: "SHOW_013", section: "post-chorus-instrumental", markerAnchor: "POST_CHORUS_RELEASE", phraseSlot: null, sourceSlot: "GRAPHIC_COLOR_FIELD", motionPresetId: "color-field-release", energy: "release", intensity: "S", placement: "full-frame-graphic", expectedDuration: "2 half-time beats / release marker優先", purpose: "最大peak直後に情報量を落とし、ENDへ呼吸を作る。", avoidWhen: "サビ最中に長く実写真を隠す時。", status: "planned" },
  { slotId: "SHOW_014", section: "post-chorus-instrumental", markerAnchor: "POST_CHORUS_ROUTE_HOME", phraseSlot: null, sourceSlot: "GRAPHIC_HAWAII_TO_YOKOHAMA", motionPresetId: "wipe-route-line", energy: "release", intensity: "S", placement: "full-frame-graphic", expectedDuration: "2 half-time beats / Bridge boundary前に収める", purpose: "HAWAII → YOKOHAMAの旅行テーマでWedding会場へ戻す。", avoidWhen: "Bridgeへ入った後までShowcase終了を引き延ばす時。", status: "planned" },
  { slotId: "SHOW_015", section: "end", markerAnchor: "EXTENDED_END_BEFORE_BRIDGE", phraseSlot: null, sourceSlot: "GRAPHIC_NAMES_DATE_END", motionPresetId: "type-tracking-burst", energy: "release", intensity: "S", placement: "center-overlay", expectedDuration: "終了Markerまで / exact secondsはlocal音源で確定", purpose: "2026.10.24 / SHOGO & SHIORIを見せ、Bridgeへ入る前に着地する。", avoidWhen: "Web推測秒で終了点を固定する時。", status: "planned" },
];

export function buildStartShowcasePalmierHandoff(slots = startShowcaseSlots) {
  const lines = [
    "# StaRt Motion Showcase — Palmier Rough Handoff",
    "",
    "STATUS: RESEARCH SHOWCASE / NOT FINAL",
    `TIMING: ${startShowcaseAuthority.timingState}`,
    `Timing rule: ${startShowcaseAuthority.timingRule}`,
    `Lyric rule: ${startShowcaseAuthority.lyricRule}`,
    `Media rule: ${startShowcaseAuthority.mediaRule}`,
    `Final rule: ${startShowcaseAuthority.finalRule}`,
    "",
    "Use a cleared local audio file. Create section/phrase markers from the waveform before locking any seconds.",
    "Do not let Claude Code and Codex edit the same active Palmier timeline. Keep A/B timelines isolated.",
    "",
  ];

  for (const slot of slots) {
    const preset = startMotionPresets.find((item) => item.id === slot.motionPresetId);
    lines.push(
      `## ${slot.slotId} / ${slot.section}`,
      `marker: ${slot.markerAnchor}`,
      `phrase: ${slot.phraseSlot ?? "NONE"}`,
      `source: ${slot.sourceSlot}`,
      `motionPresetId: ${slot.motionPresetId}${preset ? ` / ${preset.label}` : ""}`,
      `energy: ${slot.energy}`,
      `intensity: ${slot.intensity}`,
      `placement: ${slot.placement}`,
      `expectedDuration: ${slot.expectedDuration}`,
      `purpose: ${slot.purpose}`,
      `avoid: ${slot.avoidWhen}`,
      "status: planned — never auto-approve",
      "",
    );
  }

  return lines.join("\n");
}
