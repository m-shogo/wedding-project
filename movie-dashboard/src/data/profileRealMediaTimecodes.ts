export type ProfileRealMediaTimeRange = {
  slot: string;
  chapterId: string;
  startSec: number;
  endSec: number;
  seekSec: number;
};

export type ProfileRealMediaChapterRange = {
  chapterId: string;
  startSec: number;
  endSec: number;
  seekSec: number;
};

export const PROFILE_REAL_MEDIA_CHAPTER_DURATION_SEC = 6;
export const PROFILE_REAL_MEDIA_PRE_ROLL_SEC = 0.5;

/**
 * Mirrors ProfileV1RealMediaPreview timing:
 * - chapters are sequential, six seconds each
 * - resolved review slots in a chapter divide those six seconds evenly
 *
 * This is an operator navigation aid only. It does not create Human QA evidence,
 * alter the preview, or promote production readiness.
 */
export function buildProfileRealMediaTimecodes(
  media: ReadonlyArray<{slot: string | null; chapterId: string | null}>,
  chapters: ReadonlyArray<{chapterId: string | null}>,
) {
  const chapterRanges: ProfileRealMediaChapterRange[] = [];
  const mediaRanges: ProfileRealMediaTimeRange[] = [];

  chapters.forEach((chapter, chapterIndex) => {
    if (!chapter.chapterId) return;
    const startSec = chapterIndex * PROFILE_REAL_MEDIA_CHAPTER_DURATION_SEC;
    const endSec = startSec + PROFILE_REAL_MEDIA_CHAPTER_DURATION_SEC;
    chapterRanges.push({
      chapterId: chapter.chapterId,
      startSec,
      endSec,
      seekSec: Math.max(0, startSec - PROFILE_REAL_MEDIA_PRE_ROLL_SEC),
    });

    const chapterMedia = media.filter((item) => item.chapterId === chapter.chapterId && item.slot);
    const slotDurationSec = PROFILE_REAL_MEDIA_CHAPTER_DURATION_SEC / Math.max(1, chapterMedia.length);
    chapterMedia.forEach((item, slotIndex) => {
      if (!item.slot) return;
      const slotStartSec = startSec + slotIndex * slotDurationSec;
      const slotEndSec = slotStartSec + slotDurationSec;
      mediaRanges.push({
        slot: item.slot,
        chapterId: chapter.chapterId!,
        startSec: slotStartSec,
        endSec: slotEndSec,
        seekSec: Math.max(0, slotStartSec - PROFILE_REAL_MEDIA_PRE_ROLL_SEC),
      });
    });
  });

  return {chapterRanges, mediaRanges};
}

export function formatProfileReviewTimecode(seconds: number) {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const remainder = clamped - minutes * 60;
  return `${String(minutes).padStart(2, "0")}:${remainder.toFixed(1).padStart(4, "0")}`;
}
