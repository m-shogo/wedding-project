export interface VideoResultProbeEvidence {
  probedAt: string;
  previewFrameCount: number;
}

function safeSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function formatVideoResultProbeEvidence(evidence: VideoResultProbeEvidence) {
  const probedAt = safeSingleLine(evidence.probedAt);
  const previewFrameCount = Math.max(0, Math.floor(evidence.previewFrameCount));
  if (!probedAt) return "";
  return `local-media-probe=completed / probedAt=${probedAt} / preview-frames=${previewFrameCount}`;
}

export function parseVideoResultProbeEvidence(notes: string): VideoResultProbeEvidence | undefined {
  const lines = notes.split("\n").filter((line) => line.startsWith("local-media-probe=completed"));
  const line = lines[lines.length - 1];
  if (!line) return undefined;
  const probedAt = line.match(/probedAt=([^\s/]+)/)?.[1] ?? "";
  const previewFrameCount = Number(line.match(/preview-frames=(\d+)/)?.[1] ?? 0);
  if (!probedAt) return undefined;
  return {
    probedAt,
    previewFrameCount: Number.isFinite(previewFrameCount) ? previewFrameCount : 0,
  };
}
