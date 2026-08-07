export interface LocalVideoProbeResult {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  durationSec?: number;
  resolution: string;
}

function roundedDuration(value: number) {
  return Math.round(value * 100) / 100;
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

export function probeLocalVideoFile(file: File): Promise<LocalVideoProbeResult> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    let settled = false;

    function cleanup() {
      URL.revokeObjectURL(url);
      video.removeAttribute("src");
      video.load();
    }

    function fail(message: string) {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(message));
    }

    video.preload = "metadata";
    video.muted = true;
    video.onloadedmetadata = () => {
      if (settled) return;
      settled = true;
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? roundedDuration(video.duration) : undefined;
      const resolution = video.videoWidth > 0 && video.videoHeight > 0 ? `${video.videoWidth}x${video.videoHeight}` : "";
      const result: LocalVideoProbeResult = {
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        durationSec: duration,
        resolution,
      };
      cleanup();
      resolve(result);
    };
    video.onerror = () => fail("動画メタデータを読み取れませんでした");
    video.src = url;
  });
}
