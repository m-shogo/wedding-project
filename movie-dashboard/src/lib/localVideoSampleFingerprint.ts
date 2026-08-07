export interface LocalVideoSampleFingerprint {
  version: "sha256-sampled-v1";
  digest: string;
  sampledBytes: number;
  fileSize: number;
}

const SAMPLE_BYTES = 64 * 1024;

function uniqueSorted(values: number[]) {
  return Array.from(new Set(values.map((value) => Math.max(0, Math.floor(value))))).sort((a, b) => a - b);
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

export async function fingerprintLocalVideoSample(file: File): Promise<LocalVideoSampleFingerprint> {
  if (!globalThis.crypto?.subtle) throw new Error("このブラウザではsample fingerprintを作成できません");
  if (file.size <= 0) throw new Error("空の動画ファイルはfingerprintできません");

  const maxStart = Math.max(0, file.size - SAMPLE_BYTES);
  const starts = uniqueSorted([
    0,
    Math.max(0, Math.floor((file.size - SAMPLE_BYTES) / 2)),
    maxStart,
  ]);
  const chunks = await Promise.all(starts.map(async (start) => {
    const end = Math.min(file.size, start + SAMPLE_BYTES);
    return new Uint8Array(await file.slice(start, end).arrayBuffer());
  }));

  const header = new TextEncoder().encode(`sha256-sampled-v1|size=${file.size}|starts=${starts.join(",")}|`);
  const sampledBytes = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const payload = new Uint8Array(header.byteLength + sampledBytes);
  payload.set(header, 0);
  let offset = header.byteLength;
  for (const chunk of chunks) {
    payload.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const digest = await globalThis.crypto.subtle.digest("SHA-256", payload);
  return {
    version: "sha256-sampled-v1",
    digest: toHex(new Uint8Array(digest)),
    sampledBytes,
    fileSize: file.size,
  };
}
