export interface VideoResultReproMetadata {
  generationId: string;
  seed: string;
  actualDurationSec?: number;
  resolution: string;
  fps?: number;
}

function safeSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function normalizeVideoResolution(value: string) {
  const singleLine = safeSingleLine(value);
  const dimensions = singleLine.match(/^(\d{1,5})\s*[xX×]\s*(\d{1,5})$/);
  if (!dimensions) return singleLine;
  const width = Number(dimensions[1]);
  const height = Number(dimensions[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return singleLine;
  return `${width}x${height}`;
}

export function formatVideoResultReproMetadata(metadata: VideoResultReproMetadata) {
  const generationId = safeSingleLine(metadata.generationId);
  const seed = safeSingleLine(metadata.seed);
  const resolution = normalizeVideoResolution(metadata.resolution);
  return [
    generationId ? `provider-generation-id=${generationId}` : "",
    seed ? `seed=${seed}` : "",
    metadata.actualDurationSec && metadata.actualDurationSec > 0 ? `actual-duration=${metadata.actualDurationSec}s` : "",
    resolution ? `resolution=${resolution}` : "",
    metadata.fps && metadata.fps > 0 ? `fps=${metadata.fps}` : "",
  ].filter(Boolean);
}

function noteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function lineValue(notes: string, key: string) {
  const prefix = `${key}=`;
  const lines = notes.split("\n");
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (line.startsWith(prefix)) return line.slice(prefix.length).trim();
  }
  return "";
}

export function parseVideoResultReproMetadata(notes: string): VideoResultReproMetadata {
  const duration = noteValue(notes, "actual-duration").replace(/s$/, "");
  const fps = noteValue(notes, "fps");
  return {
    generationId: noteValue(notes, "provider-generation-id"),
    seed: noteValue(notes, "seed"),
    actualDurationSec: duration ? Number(duration) || undefined : undefined,
    resolution: normalizeVideoResolution(lineValue(notes, "resolution") || noteValue(notes, "resolution")),
    fps: fps ? Number(fps) || undefined : undefined,
  };
}
