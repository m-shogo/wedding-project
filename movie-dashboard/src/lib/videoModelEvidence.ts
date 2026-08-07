import type { Prompt } from "../types/movie";

export type ModelEvidenceSignal = "promote" | "neutral" | "caution" | "insufficient";

export interface VideoModelEvidence {
  key: string;
  tool: string;
  preset: string;
  reviewed: number;
  adopted: number;
  rejected: number;
  independentRoots: number;
  passRate: number;
  confidenceLow: number;
  confidenceHigh: number;
  signal: ModelEvidenceSignal;
  summary: string;
}

const MIN_REVIEWED = 3;
const MIN_INDEPENDENT_ROOTS = 2;
const PROMOTE_RATE = 2 / 3;
const CAUTION_RATE = 1 / 3;
const PROMOTE_CONFIDENCE_LOW = 0.4;
const CAUTION_CONFIDENCE_HIGH = 0.6;
const WILSON_Z = 1.96;

function noteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function reviewedOutcome(prompt: Prompt) {
  if (prompt.status === "adopted" && prompt.notes.includes("video-review=passed")) return "adopted" as const;
  if (prompt.status === "rejected" && prompt.notes.includes("video-review=rejected")) return "rejected" as const;
  return undefined;
}

function evidenceRoot(prompt: Prompt) {
  return noteValue(prompt.notes, "retry-root") || prompt.promptId;
}

function retryAttempt(prompt: Prompt) {
  return Number(noteValue(prompt.notes, "retry-attempt") || 0);
}

function wilsonInterval(successes: number, total: number) {
  if (total <= 0) return { low: 0, high: 1 };
  const p = successes / total;
  const z2 = WILSON_Z * WILSON_Z;
  const denominator = 1 + z2 / total;
  const center = (p + z2 / (2 * total)) / denominator;
  const margin = (WILSON_Z * Math.sqrt((p * (1 - p) + z2 / (4 * total)) / total)) / denominator;
  return {
    low: Math.max(0, center - margin),
    high: Math.min(1, center + margin),
  };
}

export function buildVideoModelEvidence(prompts: Prompt[]): VideoModelEvidence[] {
  const latestByLineage = new Map<string, { prompt: Prompt; outcome: "adopted" | "rejected"; attempt: number; order: number }>();

  prompts.forEach((prompt, order) => {
    if (prompt.target !== "video") return;
    const outcome = reviewedOutcome(prompt);
    if (!outcome) return;

    const tool = prompt.tool || "unknown-model";
    const preset = noteValue(prompt.notes, "preset") || "no-preset";
    const root = evidenceRoot(prompt);
    const lineageKey = `${tool}::${preset}::${root}`;
    const attempt = retryAttempt(prompt);
    const current = latestByLineage.get(lineageKey);

    if (!current || attempt > current.attempt || (attempt === current.attempt && order > current.order)) {
      latestByLineage.set(lineageKey, { prompt, outcome, attempt, order });
    }
  });

  const groups = new Map<string, { tool: string; preset: string; adopted: number; rejected: number; roots: Set<string> }>();

  for (const { prompt, outcome } of latestByLineage.values()) {
    const tool = prompt.tool || "unknown-model";
    const preset = noteValue(prompt.notes, "preset") || "no-preset";
    const root = evidenceRoot(prompt);
    const key = `${tool}::${preset}`;
    const current = groups.get(key) ?? { tool, preset, adopted: 0, rejected: 0, roots: new Set<string>() };
    current[outcome] += 1;
    current.roots.add(root);
    groups.set(key, current);
  }

  return Array.from(groups.entries()).map(([key, group]) => {
    const reviewed = group.adopted + group.rejected;
    const passRate = reviewed > 0 ? group.adopted / reviewed : 0;
    const independentRoots = group.roots.size;
    const confidence = wilsonInterval(group.adopted, reviewed);
    const enoughDiversity = independentRoots >= MIN_INDEPENDENT_ROOTS;
    let signal: ModelEvidenceSignal = "insufficient";

    if (reviewed >= MIN_REVIEWED && enoughDiversity) {
      if (passRate >= PROMOTE_RATE && confidence.low >= PROMOTE_CONFIDENCE_LOW) signal = "promote";
      else if (passRate <= CAUTION_RATE && confidence.high <= CAUTION_CONFIDENCE_HIGH) signal = "caution";
      else signal = "neutral";
    }

    const pct = Math.round(passRate * 100);
    const lowPct = Math.round(confidence.low * 100);
    const highPct = Math.round(confidence.high * 100);
    const base = `実績 ${reviewed}系統・独立系統${independentRoots}・採用率${pct}%・95%区間${lowPct}–${highPct}%`;
    const summary = signal === "promote"
      ? `${base} — このpresetでは優先候補。`
      : signal === "caution"
        ? `${base} — 同条件の追加課金前にモデル/入力条件を見直す。`
        : signal === "neutral"
          ? `${base} — まだ明確な優位差なし。`
          : `${base} — QA済みlineage数または独立lineageが不足しているためモデル優劣を断定しない。`;

    return {
      key,
      tool: group.tool,
      preset: group.preset,
      reviewed,
      adopted: group.adopted,
      rejected: group.rejected,
      independentRoots,
      passRate,
      confidenceLow: confidence.low,
      confidenceHigh: confidence.high,
      signal,
      summary,
    };
  }).sort((a, b) => {
    const rank: Record<ModelEvidenceSignal, number> = { promote: 0, caution: 1, neutral: 2, insufficient: 3 };
    return rank[a.signal] - rank[b.signal] || b.reviewed - a.reviewed || a.tool.localeCompare(b.tool);
  });
}

export function bestObservedModelForPreset(evidence: VideoModelEvidence[], preset: string) {
  const candidates = evidence.filter((item) => item.preset === preset && item.reviewed >= MIN_REVIEWED && item.independentRoots >= MIN_INDEPENDENT_ROOTS);
  return candidates.sort((a, b) => b.passRate - a.passRate || b.reviewed - a.reviewed)[0];
}

export function promotedObservedModelForPreset(evidence: VideoModelEvidence[], preset: string) {
  const candidates = evidence.filter((item) => item.preset === preset && item.signal === "promote");
  return candidates.sort((a, b) => b.confidenceLow - a.confidenceLow || b.passRate - a.passRate || b.reviewed - a.reviewed)[0];
}

export function observedEvidenceForToolPreset(evidence: VideoModelEvidence[], tool: string, preset: string) {
  return evidence.find((item) => item.tool === tool && item.preset === preset);
}
