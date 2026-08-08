export interface VideoResultProbeEvidence {
  probedAt: string;
  previewFrameCount: number;
  previewFrameTimesSec?: number[];
  sampleFingerprint?: string;
  sampledBytes?: number;
}

export const MIN_REVIEW_PREVIEW_FRAMES = 3;

function safeSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function normalizedPreviewTimes(values: number[] | undefined) {
  if (!values) return [];
  return values
    .filter((value) => Number.isFinite(value) && value >= 0)
    .map((value) => Math.round(value * 100) / 100);
}

export function formatVideoResultProbeEvidence(evidence: VideoResultProbeEvidence) {
  const probedAt = safeSingleLine(evidence.probedAt);
  const previewFrameCount = Math.max(0, Math.floor(evidence.previewFrameCount));
  const previewFrameTimesSec = normalizedPreviewTimes(evidence.previewFrameTimesSec);
  const sampleFingerprint = safeSingleLine(evidence.sampleFingerprint ?? "");
  const sampledBytes = evidence.sampledBytes && evidence.sampledBytes > 0 ? Math.floor(evidence.sampledBytes) : undefined;
  if (!probedAt) return "";
  return [
    "local-media-probe=completed",
    `probedAt=${probedAt}`,
    `preview-frames=${previewFrameCount}`,
    previewFrameTimesSec.length > 0 ? `preview-times=${previewFrameTimesSec.join(",")}` : "",
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
  const previewTimesRaw = line.match(/preview-times=([^\s/]+)/)?.[1] ?? "";
  const previewFrameTimesSec = previewTimesRaw
    ? normalizedPreviewTimes(previewTimesRaw.split(",").map((value) => Number(value)))
    : [];
  const sampleFingerprint = line.match(/sample-fingerprint=([^\s/]+)/)?.[1] ?? "";
  const sampledBytes = Number(line.match(/sampled-bytes=(\d+)/)?.[1] ?? 0);
  if (!probedAt) return undefined;
  const normalizedPreviewFrameCount = Number.isFinite(previewFrameCount) ? previewFrameCount : 0;
  const reviewReadyFingerprint = normalizedPreviewFrameCount >= MIN_REVIEW_PREVIEW_FRAMES ? sampleFingerprint : "";
  return {
    probedAt,
    previewFrameCount: normalizedPreviewFrameCount,
    previewFrameTimesSec: previewFrameTimesSec.length > 0 ? previewFrameTimesSec : undefined,
    sampleFingerprint: reviewReadyFingerprint || undefined,
    sampledBytes: sampledBytes > 0 && Number.isFinite(sampledBytes) ? sampledBytes : undefined,
  };
}
