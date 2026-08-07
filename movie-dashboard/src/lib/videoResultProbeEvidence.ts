export interface VideoResultProbeEvidence {
  probedAt: string;
  previewFrameCount: number;
  sampleFingerprint?: string;
  sampledBytes?: number;
}

export const MIN_REVIEW_PREVIEW_FRAMES = 3;

function safeSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function formatVideoResultProbeEvidence(evidence: VideoResultProbeEvidence) {
  const probedAt = safeSingleLine(evidence.probedAt);
  const previewFrameCount = Math.max(0, Math.floor(evidence.previewFrameCount));
  const sampleFingerprint = safeSingleLine(evidence.sampleFingerprint ?? "");
  const sampledBytes = evidence.sampledBytes && evidence.sampledBytes > 0 ? Math.floor(evidence.sampledBytes) : undefined;
  if (!probedAt) return "";
  return [
    "local-media-probe=completed",
    `probedAt=${probedAt}`,
    `preview-frames=${previewFrameCount}`,
    sampleFingerprint ? `sample-fingerprint=${sampleFingerprint}` : "",
    sampledBytes ? `sampled-bytes=${sampledBytes}` : "",
  ].filter(Boolean).join(" / ");
}

export function upsertVideoResultProbeEvidence(notes: string, evidence: VideoResultProbeEvidence) {
  const line = formatVideoResultProbeEvidence(evidence);
  if (!line) return notes;
  const retained = notes.split("\n").filter((item) => !item.startsWith("local-media-probe=completed"));
  return [...retained, line].filter((item) => item.trim()).join("\n");
}

export function parseVideoResultProbeEvidence(notes: string): VideoResultProbeEvidence | undefined {
  const lines = notes.split("\n").filter((line) => line.startsWith("local-media-probe=completed"));
  const line = lines[lines.length - 1];
  if (!line) return undefined;
  const probedAt = line.match(/probedAt=([^\s/]+)/)?.[1] ?? "";
  const previewFrameCount = Number(line.match(/preview-frames=(\d+)/)?.[1] ?? 0);
  const sampleFingerprint = line.match(/sample-fingerprint=([^\s/]+)/)?.[1] ?? "";
  const sampledBytes = Number(line.match(/sampled-bytes=(\d+)/)?.[1] ?? 0);
  if (!probedAt) return undefined;
  const normalizedPreviewFrameCount = Number.isFinite(previewFrameCount) ? previewFrameCount : 0;
  const reviewReadyFingerprint = normalizedPreviewFrameCount >= MIN_REVIEW_PREVIEW_FRAMES ? sampleFingerprint : "";
  return {
    probedAt,
    previewFrameCount: normalizedPreviewFrameCount,
    sampleFingerprint: reviewReadyFingerprint || undefined,
    sampledBytes: sampledBytes > 0 && Number.isFinite(sampledBytes) ? sampledBytes : undefined,
  };
}
