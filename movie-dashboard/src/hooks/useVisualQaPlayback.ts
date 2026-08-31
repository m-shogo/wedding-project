import {useEffect, useRef, useState} from "react";

export type VisualQaPlaybackRange = {
  startSec: number;
  endSec: number;
  seekSec: number;
};

/**
 * Browser-session-only review playback helper.
 * It never writes evidence and cannot promote Human QA / GUI Actual / production readiness.
 */
export function useVisualQaPlayback() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [activeRange, setActiveRange] = useState<VisualQaPlaybackRange | null>(null);
  const [loopRange, setLoopRange] = useState(true);

  useEffect(() => () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }, [objectUrl]);

  function loadFile(file: File | null) {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setActiveRange(null);
    if (!file) {
      setObjectUrl(null);
      setFilename(null);
      return;
    }
    setObjectUrl(URL.createObjectURL(file));
    setFilename(file.name);
  }

  function playRange(range: VisualQaPlaybackRange | undefined) {
    const video = videoRef.current;
    if (!video || !range) return;
    setActiveRange(range);
    const target = Math.max(0, range.seekSec);
    video.currentTime = Number.isFinite(video.duration) ? Math.min(target, video.duration) : target;
    void video.play().catch(() => undefined);
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !activeRange || video.currentTime < activeRange.endSec) return;
    if (loopRange) {
      video.currentTime = activeRange.startSec;
      void video.play().catch(() => undefined);
      return;
    }
    video.pause();
  }

  function clearRange() {
    setActiveRange(null);
  }

  return {
    videoRef,
    objectUrl,
    filename,
    activeRange,
    loopRange,
    setLoopRange,
    loadFile,
    playRange,
    handleTimeUpdate,
    clearRange,
  };
}
