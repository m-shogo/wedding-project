import type { Prompt } from "../types/movie";

export type ModelEvidenceSignal = "promote" | "neutral" | "caution" | "insufficient";

export interface VideoModelEvidence {
  key: string;
  tool: string;
  preset: string;
  reviewed: number;
  adopted: number;
  rejected: number;
  passRate: number;
  signal: ModelEvidenceSignal;
  summary: string;
}

function noteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function reviewedOutcome(prompt: Prompt) {
  if (prompt.status === "adopted" && prompt.notes.includes("video-review=passed")) return "adopted" as const;
  if (prompt.status === "rejected" && prompt.notes.includes("video-review=rejected")) return "rejected" as const;
  return undefined;
}

export function buildVideoModelEvidence(prompts: Prompt[]): VideoModelEvidence[] {
  const groups = new Map<string, { tool: string; preset: string; adopted: number; rejected: number }>();

  for (const prompt of prompts) {
    if (prompt.target !== "video") continue;
    const outcome = reviewedOutcome(prompt);
    if (!outcome) continue;
    const tool = prompt.tool || "unknown-model";
    const preset = noteValue(prompt.notes, "preset") || "no-preset";
    const key = `${tool}::${preset}`;
    const current = groups.get(key) ?? { tool, preset, adopted: 0, rejected: 0 };
    current[outcome] += 1;
    groups.set(key, current);
  }

  return Array.from(groups.entries()).map(([key, group]) => {
    const reviewed = group.adopted + group.rejected;
    const passRate = reviewed > 0 ? group.adopted / reviewed : 0;
    let signal: ModelEvidenceSignal = "insufficient";
    if (reviewed >= 3 && passRate >= 2 / 3) signal = "promote";
    else if (reviewed >= 3 && passRate <= 1 / 3) signal = "caution";
    else if (reviewed >= 3) signal = "neutral";

    const pct = Math.round(passRate * 100);
    const summary = signal === "promote"
      ? `実績 ${reviewed}本・採用率${pct}% — このpresetでは優先候補。`
      : signal === "caution"
        ? `実績 ${reviewed}本・採用率${pct}% — 同条件の追加課金前にモデル/入力条件を見直す。`
        : signal === "neutral"
          ? `実績 ${reviewed}本・採用率${pct}% — 明確な優位差なし。`
          : `実績 ${reviewed}本 — 3本未満なのでモデル優劣を断定しない。`;

    return {
      key,
      tool: group.tool,
      preset: group.preset,
      reviewed,
      adopted: group.adopted,
      rejected: group.rejected,
      passRate,
      signal,
      summary,
    };
  }).sort((a, b) => {
    const rank: Record<ModelEvidenceSignal, number> = { promote: 0, caution: 1, neutral: 2, insufficient: 3 };
    return rank[a.signal] - rank[b.signal] || b.reviewed - a.reviewed || a.tool.localeCompare(b.tool);
  });
}

export function bestObservedModelForPreset(evidence: VideoModelEvidence[], preset: string) {
  const candidates = evidence.filter((item) => item.preset === preset && item.reviewed >= 3);
  return candidates.sort((a, b) => b.passRate - a.passRate || b.reviewed - a.reviewed)[0];
}
