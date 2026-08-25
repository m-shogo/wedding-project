// AUTO-GENERATED-STYLE data file. Hand-authored content, emitted deterministically.
// Phase G — Claude / Codex A/B comparison framework for the StaRt Extended Opening research
// track (Phase A-F already merged to main). This is NOT Opening V1. Opening V1's source of
// truth stays motion-studio/src/data/openingV1.ts / OpeningV1.tsx per ../../CLAUDE.md.
//
// Purpose: let the same 20-30s slice of the StaRt Extended timeline (same source audio, same
// duration, same candidate material, same brief) be produced independently by Claude Code and
// by Codex CLI/agent, then compared on a fixed rubric before a human picks a winner.
//
// Hard contract (read this before touching `winner`):
//   - `winner`, `artifactA`, `artifactB` all start as `null`.
//   - Nothing in this repo may set `winner` to non-null unless the artifact path it points at
//     already exists on disk. `motion-studio/scripts/check-claude-codex-ab.mts` enforces this
//     mechanically (see validateStartAbComparison below for the same rule, importable from
//     movie-dashboard for the same purpose).
//   - AI must never decide a winner. This file only carries the *shape* a human decision fills
//     in later, plus the rubric they should use.

export type StartAbAgent = "claude" | "codex";

export type StartAbAxisId =
  | "excitement"
  | "rhythm"
  | "photoReadability"
  | "typography"
  | "threeHit"
  | "chorusLift"
  | "animeOpFeel"
  | "aiTemplateRisk"
  | "overEditingRisk"
  | "instructionFollowing"
  | "timelineCleanliness"
  | "editability";

/** Whether a higher 1-5 score is better, or lower is better (risk axes). */
export type StartAbScoreDirection = "higher-is-better" | "lower-is-better";

export interface StartAbAxisRubricLevel {
  score: 1 | 2 | 3 | 4 | 5;
  description: string;
}

export interface StartAbAxis {
  id: StartAbAxisId;
  label: string;
  labelJa: string;
  direction: StartAbScoreDirection;
  /** One sentence: what this axis is actually judging. */
  summary: string;
  /** 5-point rubric, always ordered score 1 -> 5 regardless of direction. */
  rubric: StartAbAxisRubricLevel[];
}

// 12 evaluation axes, fixed order. Do not silently reorder — comparison rows reference these by id.
export const startAbAxes: StartAbAxis[] = [
  {
    id: "excitement",
    label: "Excitement",
    labelJa: "ワクワク感",
    direction: "higher-is-better",
    summary: "見て高揚するか。二人の旅の記憶として気持ちが上がるか。",
    rubric: [
      {score: 1, description: "退屈。何も期待感が生まれない。"},
      {score: 2, description: "部分的に良いが全体としては平板。"},
      {score: 3, description: "悪くはないが「もう一度見たい」とまでは思わない。"},
      {score: 4, description: "見ていて気持ちが上がる。次のcutを期待させる。"},
      {score: 5, description: "この区間だけで作品全体の期待値を引き上げる。"},
    ],
  },
  {
    id: "rhythm",
    label: "Rhythm",
    labelJa: "リズム",
    direction: "higher-is-better",
    summary: "カット割り・モーションが95/190BPMのグリッドと噛み合っているか。",
    rubric: [
      {score: 1, description: "曲と映像のリズムが無関係。機械的な等間隔cut。"},
      {score: 2, description: "大まかには合っているが細部でズレる。"},
      {score: 3, description: "beatに沿っているが可もなく不可もない。"},
      {score: 4, description: "beatの緩急(burst/breathe)を意識した構成。"},
      {score: 5, description: "half-time/190bpm両方のgridを使い分け、体感が音楽と一致する。"},
    ],
  },
  {
    id: "photoReadability",
    label: "Photo readability",
    labelJa: "写真の可読性",
    direction: "higher-is-better",
    summary: "Hero写真・旅行写真の主役(顔・構図・瞬間)が読めるか。",
    rubric: [
      {score: 1, description: "crop・motion・graphicで主役が読めない。"},
      {score: 2, description: "読めるが窮屈、または不要なmotionで気が散る。"},
      {score: 3, description: "普通に読める。"},
      {score: 4, description: "構図・余白・holdの選択が写真の強さを引き出している。"},
      {score: 5, description: "写真そのものが主役として最大化されている。static-firstの判断が的確。"},
    ],
  },
  {
    id: "typography",
    label: "Typography",
    labelJa: "タイポグラフィ",
    direction: "higher-is-better",
    summary: "文字の量・タイミング・階層がStyle Bible(必要な情報だけ)に沿っているか。",
    rubric: [
      {score: 1, description: "説明的な英字ラベル(MEMORY 01等)や過剰な文字量。"},
      {score: 2, description: "文字は控えめだがタイミングや階層が雑。"},
      {score: 3, description: "許容範囲。"},
      {score: 4, description: "情報が要る場面だけ、適切な強度で出る。"},
      {score: 5, description: "文字がほぼ無くても成立する画を、必要最小限の文字だけで補強している。"},
    ],
  },
  {
    id: "threeHit",
    label: "3-hit execution",
    labelJa: "3-hit演出",
    direction: "higher-is-better",
    summary: "chorus-1-b/chorus-2-bの3-hit(stamp→line→route-dot等)がHero写真を維持したまま機能しているか。",
    rubric: [
      {score: 1, description: "3-hitのたびに写真を切る、またはfull-screen flash/shakeを使っている(avoid抵触)。"},
      {score: 2, description: "Heroは維持しているがhitのタイミングが音とズレる。"},
      {score: 3, description: "機能はしているが平凡。"},
      {score: 4, description: "Hero維持+正確なタイミングで気持ちよい。"},
      {score: 5, description: "1回目と2回目で意図的な差分(強度/順序)まで設計されている。"},
    ],
  },
  {
    id: "chorusLift",
    label: "Chorus lift",
    labelJa: "サビの持ち上がり",
    direction: "higher-is-better",
    summary: "chorus-1-a→chorus-1-bで音の高揚と映像の高揚が同期しているか。",
    rubric: [
      {score: 1, description: "verseと同じ密度・同じ画角のままサビへ入る。"},
      {score: 2, description: "多少の変化はあるが唐突または弱い。"},
      {score: 3, description: "普通に持ち上がる。"},
      {score: 4, description: "静→動、または密度の変化で明確にサビの到達感が出る。"},
      {score: 5, description: "音楽の上昇と画のスケール/密度変化が完全に一致している。"},
    ],
  },
  {
    id: "animeOpFeel",
    label: "Anime OP feel",
    labelJa: "冒険アニメOP感",
    direction: "higher-is-better",
    summary: "必要な範囲でアニメOP的なキレ(グラフィックhit、typo punch等)が効いているか。過剰ではなく効果的か。",
    rubric: [
      {score: 1, description: "無い、または場違いに過剰。"},
      {score: 2, description: "断片的に入っているが統一感がない。"},
      {score: 3, description: "許容範囲。"},
      {score: 4, description: "3-hit・typo punch等が効果的な瞬間だけに使われている。"},
      {score: 5, description: "documentary/travel filmの土台を壊さずに、狙った瞬間だけキレを出せている。"},
    ],
  },
  {
    id: "aiTemplateRisk",
    label: "AI/template risk",
    labelJa: "AI高級テンプレ感リスク",
    direction: "lower-is-better",
    summary: "docs/02_style-bible.md の「QA — AI/Template感」チェック(2つ以上該当で再設計)に抵触する度合い。",
    rubric: [
      {score: 1, description: "抵触なし。二人の記憶として個別性がある。"},
      {score: 2, description: "軽微な既視感はあるが個別性は保たれている。"},
      {score: 3, description: "チェック項目に1つ該当。"},
      {score: 4, description: "チェック項目に2つ以上該当。再設計対象レベル。"},
      {score: 5, description: "AI生成テンプレそのものに見える。誰のカップルにも使い回せる。"},
    ],
  },
  {
    id: "overEditingRisk",
    label: "Over-editing risk",
    labelJa: "編集過多リスク",
    direction: "lower-is-better",
    summary: "transition/graphic/motionを盛り込みすぎて、写真そのものより演出が主役になっている度合い。",
    rubric: [
      {score: 1, description: "演出は最小限。写真と音が主役。"},
      {score: 2, description: "演出はやや多いが破綻していない。"},
      {score: 3, description: "演出が目につき始める。"},
      {score: 4, description: "演出が写真より記憶に残る。"},
      {score: 5, description: "全カットに何かしらのeffect/transitionが乗っている。style-bible禁止事項に複数抵触。"},
    ],
  },
  {
    id: "instructionFollowing",
    label: "Instruction following",
    labelJa: "指示追従度",
    direction: "higher-is-better",
    summary: "CLAUDE.md / Style Bible / startSectionRecipeMap.ts のprimary/avoidをどれだけ正確に守れているか。",
    rubric: [
      {score: 1, description: "avoid recipeを使っている、または主要な禁止事項に抵触。"},
      {score: 2, description: "指示の趣旨から外れる自己流の解釈が目立つ。"},
      {score: 3, description: "おおむね従っているが細部の逸脱がある。"},
      {score: 4, description: "primary/alternateの範囲内で作られている。"},
      {score: 5, description: "primary recipeの意図(なぜそれが選ばれたか)まで正確に汲んでいる。"},
    ],
  },
  {
    id: "timelineCleanliness",
    label: "Timeline cleanliness",
    labelJa: "タイムラインの整理度",
    direction: "higher-is-better",
    summary: "trackの命名・レイヤー整理・不要clipの有無など、他の人が開いても分かる状態か。",
    rubric: [
      {score: 1, description: "track名が既定値のまま、または不要clipが残っている。"},
      {score: 2, description: "動くが整理されていない。"},
      {score: 3, description: "最低限は整理されている。"},
      {score: 4, description: "track名・グルーピングが分かりやすい。"},
      {score: 5, description: "第三者が引き継いでそのまま拡張できる状態。"},
    ],
  },
  {
    id: "editability",
    label: "Editability",
    labelJa: "編集のしやすさ",
    direction: "higher-is-better",
    summary: "写真差し替え・尺調整・BGM再同期など、後工程での修正が容易な作りか。",
    rubric: [
      {score: 1, description: "ハードコードされた値が多く、差し替えると壊れる。"},
      {score: 2, description: "一部は調整可能だが多くが再構築必要。"},
      {score: 3, description: "普通に編集できる。"},
      {score: 4, description: "写真差し替え・尺調整が明確な手順で可能。"},
      {score: 5, description: "Phase E sectionMapとPhase B/C rendererの契約に完全準拠し、そのまま他sectionへ応用できる。"},
    ],
  },
];

export function getStartAbAxisById(id: StartAbAxisId): StartAbAxis | undefined {
  return startAbAxes.find((a) => a.id === id);
}

/** 1-5 score for one axis, or null if not yet scored. */
export type StartAbAxisScore = number | null;

export interface StartAbCandidate {
  agent: StartAbAgent;
  /** Palmier / export project name for this agent's lane. Must not collide with the other agent's lane. */
  projectName: string;
  /**
   * Path (repo-relative) to the finished, reviewable artifact for this candidate — e.g. a
   * rendered video, a Palmier project export, or a motion-studio out/ file. `null` until the
   * work actually exists on disk. This is what validateStartAbComparison checks for.
   */
   artifactPath: string | null;
  /** Repo-relative path to the handoff pack this candidate was built from (CSV/MD/JSON, Git-tracked). */
  handoffPath: string;
  notes: string;
}

export interface StartAbScoreRow {
  axisId: StartAbAxisId;
  claude: StartAbAxisScore;
  codex: StartAbAxisScore;
  /** Optional short justification, filled in by the human reviewer during scoring. */
  comment: string;
}

export type StartAbWinner = "claude" | "codex" | "tie" | null;

export interface StartAbComparison {
  id: string;
  /** StaRt Extended section ids this comparison covers (see startExtendedRhythmMap.ts). */
  targetSectionIds: string[];
  /** Reference start/end seconds in the StaRt Extended timeline (researched-reference-not-final). */
  targetStartSec: number;
  targetEndSec: number;
  brief: string;
  claudeCandidate: StartAbCandidate;
  codexCandidate: StartAbCandidate;
  scores: StartAbScoreRow[];
  /**
   * Winner contract: MUST stay null until a human has (a) actually reviewed both artifacts and
   * (b) both artifactPath values above resolve to real files. Nothing in this repo may flip this
   * automatically. See validateStartAbComparison() and
   * motion-studio/scripts/check-claude-codex-ab.mts.
   */
  winner: StartAbWinner;
  decidedBy: string | null;
  decidedAt: string | null;
  decisionNotes: string;
}

function emptyScoreRows(): StartAbScoreRow[] {
  return startAbAxes.map((axis) => ({axisId: axis.id, claude: null, codex: null, comment: ""}));
}

// Seed comparison: chorus-1-a + chorus-1-b, 00:38-00:58 (20s), the highest-density peak section
// of the StaRt Extended timeline (sabi + 3-hit). This is the concrete 20-30s slice both lanes
// build against. See docs/handoff/2026-08-25-codex-ab-comparison-handoff.md for the full brief.
export const startAbComparisons: StartAbComparison[] = [
  {
    id: "ab-chorus1-full",
    targetSectionIds: ["chorus-1-a", "chorus-1-b"],
    targetStartSec: 38,
    targetEndSec: 58,
    brief:
      "StaRt Extended 00:38-00:58 (1 CHORUS A + 1 CHORUS B / THREE-HIT, 20秒)を、startSectionRecipeMap.ts の " +
      "primary/alternate/avoidと02_opening-movie/asset-status.mdの人物・犬なしルールに従って作る。同一音源・同一20秒・" +
      "同一brief。Hero写真の提示(chorus-1-a)からHero維持のまま3-hit(chorus-1-b)へ、という構造は崩さない。",
    claudeCandidate: {
      agent: "claude",
      projectName: "START_AB_CLAUDE",
      artifactPath: "motion-studio/exports/ab/claude/chorus1_ab.mp4",
      handoffPath: "motion-studio/exports/palmier-ab/claude/director-recipe-ab-handoff.md",
      notes:
        "Rendered via DirectorRecipeCustomReel (StartAbClaudeChorus1 composition): chorus-1-a -> start-chorus-hero-lift, " +
        "chorus-1-b -> start-triple-hit, each held for its section's real 300-frame/10s reference duration " +
        "(not the 180-frame catalogue reel-safety clamp — see src/data/startAbChorus1Timeline.ts for the documented " +
        "reasoning). 1280x720, h264, 20.05s, 935.7kB. Uses the shared 6-engine renderer only, no new one-off component. " +
        "No real Hero photo yet (MEDIA_BLOCKED) — renders DirectorRecipePreview's existing placeholder/demo backdrop.",
    },
    codexCandidate: {
      agent: "codex",
      projectName: "START_AB_CODEX",
      artifactPath: null,
      handoffPath: "motion-studio/exports/palmier-ab/codex/director-recipe-ab-handoff.md",
      notes:
        "CODEX_BLOCKED: Remotion Chromium could not launch in the macOS sandbox " +
        "(MachPortRendezvousServer bootstrap_check_in permission denied; render exited with SIGTRAP). " +
        "StartAbCodexChorus1 is registered as a 600-frame shared-engine composition, but no artifact was produced.",
    },
    scores: emptyScoreRows(),
    winner: null,
    decidedBy: null,
    decidedAt: null,
    decisionNotes: "",
  },
];

export interface StartAbValidationIssue {
  comparisonId: string;
  message: string;
}

/**
 * Pure data-shape validation (no filesystem access — this file has no fs import so it can be
 * used from browser code in movie-dashboard too). Filesystem existence of artifactPath is
 * checked separately by motion-studio/scripts/check-claude-codex-ab.mts, which is the tool
 * that actually enforces the "winner implies artifact exists on disk" half of the contract.
 */
export function validateStartAbComparisonShape(comparison: StartAbComparison): StartAbValidationIssue[] {
  const issues: StartAbValidationIssue[] = [];
  const push = (message: string) => issues.push({comparisonId: comparison.id, message});

  if (comparison.winner !== null) {
    if (!comparison.decidedBy) push("winner is set but decidedBy is empty — a human must be named.");
    if (!comparison.decidedAt) push("winner is set but decidedAt is empty.");
    if (comparison.winner === "claude" && !comparison.claudeCandidate.artifactPath) {
      push("winner=claude but claudeCandidate.artifactPath is null.");
    }
    if (comparison.winner === "codex" && !comparison.codexCandidate.artifactPath) {
      push("winner=codex but codexCandidate.artifactPath is null.");
    }
    if (comparison.winner === "tie" && (!comparison.claudeCandidate.artifactPath || !comparison.codexCandidate.artifactPath)) {
      push("winner=tie but at least one candidate.artifactPath is null.");
    }
  } else {
    if (comparison.decidedBy || comparison.decidedAt) {
      push("winner is null but decidedBy/decidedAt is set — inconsistent state.");
    }
  }

  const axisIds = new Set(startAbAxes.map((a) => a.id));
  const seenAxisIds = new Set<string>();
  for (const row of comparison.scores) {
    if (!axisIds.has(row.axisId)) push(`score row references unknown axis "${row.axisId}".`);
    if (seenAxisIds.has(row.axisId)) push(`score row for axis "${row.axisId}" appears more than once.`);
    seenAxisIds.add(row.axisId);
    for (const [agent, value] of [["claude", row.claude] as const, ["codex", row.codex] as const]) {
      if (value !== null && (value < 1 || value > 5)) {
        push(`score row "${row.axisId}" ${agent} score ${value} is out of the 1-5 range.`);
      }
    }
  }
  if (seenAxisIds.size !== axisIds.size) {
    push(`comparison has ${seenAxisIds.size} score rows but there are ${axisIds.size} axes — every axis must have a row (nulls allowed).`);
  }

  if (comparison.claudeCandidate.projectName === comparison.codexCandidate.projectName) {
    push("claudeCandidate.projectName and codexCandidate.projectName must not collide.");
  }

  return issues;
}

export function getStartAbComparisonById(id: string): StartAbComparison | undefined {
  return startAbComparisons.find((c) => c.id === id);
}
