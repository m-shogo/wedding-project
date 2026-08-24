export type AutomationTool = "Codex" | "Claude Code" | "Remotion" | "Palmier" | "Script";

export interface AutomationCandidate {
  candidateId: string;
  skillId: string;
  label: string;
  tools: AutomationTool[];
  automate: string;
  keepHuman: string;
  evidenceToKeep: string;
  handoff: string;
}

export const automationCandidates: AutomationCandidate[] = [
  {
    candidateId: "auto-timeline-inspection",
    skillId: "davinci-timeline",
    label: "Timeline構造の点検・レポート",
    tools: ["Codex", "Claude Code", "Script"],
    automate: "Track構成、尺、clip数、空白区間、marker位置など機械的に確認できる情報を一覧化する。",
    keepHuman: "どの写真を残すか、どの章が長いかというStory判断。",
    evidenceToKeep: "検査結果 + 人間が採用した修正理由。",
    handoff: "Wedding MovieのTimeline構造を読み、尺・track役割・空白・重複候補を報告してください。Story上の削除判断は実行せず、人間確認項目として分離してください。",
  },
  {
    candidateId: "auto-trim-suggestions",
    skillId: "davinci-trim",
    label: "Trim候補の算出",
    tools: ["Codex", "Claude Code", "Palmier", "Script"],
    automate: "Markerや目標尺を基準に開始/終了候補を計算し、差分案を作る。",
    keepHuman: "写真を読む時間、表情の余韻、思い出として残したい瞬間。",
    evidenceToKeep: "before/after timecode + 採用理由。",
    handoff: "現在のcutとmarkerを基準にTrim候補を提示してください。各候補はbefore/after timecodeと変更秒数を出し、写真を読む時間の最終判断は人間に残してください。",
  },
  {
    candidateId: "auto-ripple-apply",
    skillId: "davinci-ripple",
    label: "承認済みRipple変更の適用",
    tools: ["Palmier", "Script"],
    automate: "人間が承認した尺変更をTimeline全体へ機械的に反映する。",
    keepHuman: "Rippleで後続sceneを詰めてよいか、章全体のテンポ判断。",
    evidenceToKeep: "変更前後のscene durationとpreview確認。",
    handoff: "承認済みのTrim差分だけをRipple適用してください。対象外sceneの尺・marker・audio syncは変更せず、適用後のduration差分を報告してください。",
  },
  {
    candidateId: "auto-marker-generation",
    skillId: "davinci-marker",
    label: "Marker候補生成",
    tools: ["Codex", "Claude Code", "Remotion", "Script"],
    automate: "BGM cue、scene boundary、Review finding timecodeからmarker候補を生成する。",
    keepHuman: "拍に切るか、あえて外すかというRhythm判断。",
    evidenceToKeep: "marker候補と採用/却下理由。",
    handoff: "BGM cueとscene boundaryからmarker候補を生成してください。Beatはcut命令ではなく候補として扱い、写真の読了時間と競合する点を明示してください。",
  },
  {
    candidateId: "auto-transform-apply",
    skillId: "davinci-transform",
    label: "承認済みCrop / Transformの適用",
    tools: ["Palmier", "Remotion", "Script"],
    automate: "focus point、Zoom、Positionなど承認済みparameterを素材へ適用する。",
    keepHuman: "顔・手・場所の文脈をどこまで残すかというFraming判断。",
    evidenceToKeep: "focus/crop parameter + QA still。",
    handoff: "承認済みfocus pointとTransform値だけを対象shotへ適用してください。人物の新規生成・変形は行わず、crop結果をQA stillで確認できる形にしてください。",
  },
  {
    candidateId: "auto-text-apply",
    skillId: "davinci-text",
    label: "承認済みTitle / Captionの配置",
    tools: ["Palmier", "Remotion", "Script"],
    automate: "確定文言・font・size・position・durationを再現性高く配置する。",
    keepHuman: "何を書くか、何を削るか、写真との情報優先順位。",
    evidenceToKeep: "確定文言 + typography設定 + readability QA。",
    handoff: "確定済み文言とTypography設定をそのまま配置してください。文章の追加・意味変更はせず、表示時間とsafe areaをQAしてください。",
  },
  {
    candidateId: "auto-keyframe-apply",
    skillId: "davinci-keyframe",
    label: "承認済みMotion parameterの適用",
    tools: ["Palmier", "Remotion", "Script"],
    automate: "A/B比較で採用した開始/終了値とframe範囲をkeyframe化する。",
    keepHuman: "StaticかMotionか、動きが写真より強くないかという判断。",
    evidenceToKeep: "A/B decision + frame range + parameter。",
    handoff: "Before/After Labで採用済みのmotionだけをkeyframeとして適用してください。未承認shotへ同じpresetを横展開しないでください。",
  },
  {
    candidateId: "auto-easing-apply",
    skillId: "davinci-easing",
    label: "承認済みEasingの再適用",
    tools: ["Palmier", "Remotion", "Script"],
    automate: "採用済みEase設定を同じ意図のshotへ再現する。",
    keepHuman: "動きの存在感・写真の強さとのバランス。",
    evidenceToKeep: "curve/ease設定 + preview review。",
    handoff: "採用済みEasing設定を指定shotへだけ適用してください。開始/終了frameを保持し、別shotへの一括preset化はしないでください。",
  },
  {
    candidateId: "auto-color-measure",
    skillId: "davinci-color-balance",
    label: "Shot間Color差の計測・候補提示",
    tools: ["Codex", "Claude Code", "Script"],
    automate: "WB・Exposure・Contrast等の差を検出し、調整候補を提示する。",
    keepHuman: "肌・場所・時間帯らしさをどこまで残すか、Final look判断。",
    evidenceToKeep: "Original / corrected比較 + adjacent-shot review。",
    handoff: "隣接shotのWB・Exposure・Contrast差を分析し、基本補正候補を提示してください。LUT追加やlook決定は行わず、Originalとの差を保持してください。",
  },
  {
    candidateId: "auto-audio-level-fade",
    skillId: "davinci-audio-fade",
    label: "Audio level / Fadeの機械的調整",
    tools: ["Palmier", "Script"],
    automate: "承認済み音量基準とfade pointを適用し、急なレベル差を検査する。",
    keepHuman: "余韻、曲の終わり方、会場での聴感。",
    evidenceToKeep: "level/fade parameter + full-pass listening review。",
    handoff: "承認済みlevel/fade設定を適用し、急な音量差を検査してください。感情的な終端の長さは変更せず、人間review項目として残してください。",
  },
  {
    candidateId: "auto-jl-cut-apply",
    skillId: "davinci-jl-cut",
    label: "承認済みJ/L-cutの適用",
    tools: ["Palmier", "Script"],
    automate: "人間が採用したaudio lead/overlapのtimecodeを再現する。",
    keepHuman: "音を先行させることでStoryが本当に分かりやすくなるか。",
    evidenceToKeep: "A/B audio decision + timecode。",
    handoff: "採用済みJ/L-cutのtimecodeだけを適用してください。未指定章へ自動展開せず、映像cut pointとの差分を報告してください。",
  },
  {
    candidateId: "auto-deliver-qa",
    skillId: "davinci-deliver",
    label: "Render / Deliver technical QA",
    tools: ["Codex", "Claude Code", "Remotion", "Script"],
    automate: "resolution、fps、codec、duration、audio stream、black frame等を検査する。",
    keepHuman: "Creative final approvalと会場固有納品条件の最終確認。",
    evidenceToKeep: "ffprobe / QA report / final file hash。",
    handoff: "Final renderのresolution・fps・codec・duration・audio stream・black frameを検査してください。Creative approvalとは分離し、技術NGだけを明確に報告してください。",
  },
];
