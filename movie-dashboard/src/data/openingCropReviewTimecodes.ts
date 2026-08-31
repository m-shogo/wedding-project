export type OpeningReviewTimeRange = {
  key: string;
  startSec: number;
  endSec: number;
  seekSec: number;
  sceneId: string;
};

const PRE_ROLL_SEC = 0.5;
const MEMORY_DURATION_SEC = 11;
const MEMORY_FIRST_CUT_RATIO = 0.29;
const MEMORY_SECOND_CUT_RATIO = 0.59;
const OPENING_FPS = 30;

const roundToFrame = (seconds: number) => Math.round(seconds * OPENING_FPS) / OPENING_FPS;
const seekWithPreRoll = (startSec: number) => Math.max(0, startSec - PRE_ROLL_SEC);

function memoryRanges(sceneId: string, prefix: string, sceneStartSec: number): OpeningReviewTimeRange[] {
  const durationFrames = Math.round(MEMORY_DURATION_SEC * OPENING_FPS);
  const firstCutFrames = Math.round(durationFrames * MEMORY_FIRST_CUT_RATIO);
  const secondCutFrames = Math.round(durationFrames * MEMORY_SECOND_CUT_RATIO);
  const localCuts = [0, firstCutFrames / OPENING_FPS, secondCutFrames / OPENING_FPS, MEMORY_DURATION_SEC];
  return [0, 1, 2].map((index) => {
    const startSec = roundToFrame(sceneStartSec + localCuts[index]);
    const endSec = roundToFrame(sceneStartSec + localCuts[index + 1]);
    return {
      key: `${prefix}-${String(index + 1).padStart(2, "0")}`,
      startSec,
      endSec,
      seekSec: seekWithPreRoll(startSec),
      sceneId,
    };
  });
}

/**
 * Mirrors the current OpeningV1 timeline at 30fps:
 * cold-open 0-2s, Okinawa 2-13s, Seoul 13-24s, Hawaii 24-35s,
 * hero A 35-44s, hero B 44-53s, then travel UI through 60s.
 * MemoryChapter cuts are exactly the same frame-rounded 29% / 59% cuts used
 * by OpeningV1PhotoScenes.
 *
 * Navigation only: these ranges do not create Human crop evidence or GUI Actual.
 */
export const openingCropReviewTimeRanges: OpeningReviewTimeRange[] = [
  ...memoryRanges("v1-photos-okinawa", "okinawa", 2),
  ...memoryRanges("v1-photos-seoul", "seoul", 13),
  ...memoryRanges("v1-photos-hawaii", "hawaii", 24),
  {key: "hero-01", startSec: 35, endSec: 44, seekSec: 34.5, sceneId: "v1-photo-hero-a"},
  {key: "hero-02", startSec: 44, endSec: 53, seekSec: 43.5, sceneId: "v1-photo-hero-b"},
];

export function openingReviewRangeFor(key: string | null) {
  return key ? openingCropReviewTimeRanges.find((range) => range.key === key) : undefined;
}

export function formatOpeningReviewTimecode(seconds: number) {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const remainder = clamped - minutes * 60;
  return `${String(minutes).padStart(2, "0")}:${remainder.toFixed(1).padStart(4, "0")}`;
}
