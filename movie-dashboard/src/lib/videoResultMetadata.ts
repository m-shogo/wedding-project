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

export function formatVideoResultReproMetadata(metadata: VideoResultReproMetadata) {
  const generationId = safeSingleLine(metadata.generationId);
  const seed = safeSingleLine(metadata.seed);
  const resolution = safeSingleLine(metadata.resolution);
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

export function parseVideoResultReproMetadata(notes: string): VideoResultReproMetadata {
  const duration = noteValue(notes, "actual-duration").replace(/s$/, "");
  const fps = noteValue(notes, "fps");
  return {
    generationId: noteValue(notes, "provider-generation-id"),
    seed: noteValue(notes, "seed"),
    actualDurationSec: duration ? Number(duration) || undefined : undefined,
    resolution: noteValue(notes, "resolution"),
    fps: fps ? Number(fps) || undefined : undefined,
  };
}
