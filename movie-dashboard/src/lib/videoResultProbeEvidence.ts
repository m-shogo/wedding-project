export interface VideoResultProbeEvidence {
  probedAt: string;
  previewFrameCount: number;
  sampleFingerprint?: string;
  sampledBytes?: number;
}

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

export function parseVideoResultProbeEvidence(notes: string): VideoResultProbeEvidence | undefined {
  const lines = notes.split("\n").filter((line) => line.startsWith("local-media-probe=completed"));
  const line = lines[lines.length - 1];
  if (!line) return undefined;
  const probedAt = line.match(/probedAt=([^\s/]+)/)?.[1] ?? "";
  const previewFrameCount = Number(line.match(/preview-frames=(\d+)/)?.[1] ?? 0);
  const sampleFingerprint = line.match(/sample-fingerprint=([^\s/]+)/)?.[1] ?? "";
  const sampledBytes = Number(line.match(/sampled-bytes=(\d+)/)?.[1] ?? 0);
  if (!probedAt) return undefined;
  return {
    probedAt,
    previewFrameCount: Number.isFinite(previewFrameCount) ? previewFrameCount : 0,
    sampleFingerprint: sampleFingerprint || undefined,
    sampledBytes: sampledBytes > 0 && Number.isFinite(sampledBytes) ? sampledBytes : undefined,
  };
}
