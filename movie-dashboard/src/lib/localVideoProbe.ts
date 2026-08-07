export interface LocalVideoProbeResult {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  durationSec?: number;
  resolution: string;
}

export interface LocalVideoPreviewFrame {
  label: "冒頭" | "中間" | "終端";
  timeSec: number;
  dataUrl: string;
}

const MEDIA_EVENT_TIMEOUT_MS = 12_000;

function roundedDuration(value: number) {
  return Math.round(value * 100) / 100;
}

function waitForMediaEvent(video: HTMLVideoElement, eventName: "loadedmetadata" | "seeked") {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error(eventName === "seeked" ? "動画フレームの読み取りがタイムアウトしました" : "動画メタデータの読み取りがタイムアウトしました"));
    }, MEDIA_EVENT_TIMEOUT_MS);
    const onSuccess = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("動画フレームを読み取れませんでした"));
    };
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener(eventName, onSuccess);
      video.removeEventListener("error", onError);
    };
    video.addEventListener(eventName, onSuccess, { once: true });
    video.addEventListener("error", onError, { once: true });
  });
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
    const timeoutId = window.setTimeout(() => fail("動画メタデータの読み取りがタイムアウトしました"), MEDIA_EVENT_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeoutId);
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

export async function captureLocalVideoPreviewFrames(file: File): Promise<LocalVideoPreviewFrame[]> {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;

  try {
    video.src = url;
    await waitForMediaEvent(video, "loadedmetadata");
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    if (duration <= 0 || video.videoWidth <= 0 || video.videoHeight <= 0) {
      throw new Error("動画の尺または解像度を取得できませんでした");
    }

    const edgeMargin = Math.min(0.15, Math.max(0.03, duration * 0.05));
    const points: Array<{ label: LocalVideoPreviewFrame["label"]; timeSec: number }> = [
      { label: "冒頭", timeSec: Math.min(duration, edgeMargin) },
      { label: "中間", timeSec: duration / 2 },
      { label: "終端", timeSec: Math.max(0, duration - edgeMargin) },
    ];

    const maxWidth = 320;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("フレーム描画用Canvasを作成できませんでした");

    const frames: LocalVideoPreviewFrame[] = [];
    for (const point of points) {
      const targetTime = Math.min(Math.max(point.timeSec, 0), Math.max(0, duration - 0.001));
      const seeked = waitForMediaEvent(video, "seeked");
      video.currentTime = targetTime;
      await seeked;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      frames.push({
        label: point.label,
        timeSec: roundedDuration(targetTime),
        dataUrl: canvas.toDataURL("image/jpeg", 0.78),
      });
    }
    return frames;
  } finally {
    URL.revokeObjectURL(url);
    video.removeAttribute("src");
    video.load();
  }
}
