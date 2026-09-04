// public/local-start-129/lyrics.local.json (sync-start-129-local.mtsが配置)を
// Remotion Studio/render中にfetchし、無ければplaceholder slotへフォールバックする。

import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';
import {
  parseLocalLyricsJson,
  resolveLyricSlots,
  type LocalLyricsFile,
  type ResolvedLyricSlot,
} from '../../data/start129/localLyrics';

export const useLocalLyrics = (): ResolvedLyricSlot[] => {
  const [slots, setSlots] = useState<ResolvedLyricSlot[]>(() => resolveLyricSlots(null));

  useEffect(() => {
    const handle = delayRender('start-129: local lyrics取得');
    fetch(staticFile('local-start-129/lyrics.local.json'))
      .then((res) => (res.ok ? res.json() : null))
      .then((raw) => {
        if (!raw) {
          setSlots(resolveLyricSlots(null));
          return;
        }
        const parsed = parseLocalLyricsJson(raw);
        setSlots(resolveLyricSlots(parsed.ok ? (parsed.data as LocalLyricsFile) : null));
      })
      .catch(() => setSlots(resolveLyricSlots(null)))
      .finally(() => continueRender(handle));
  }, []);

  return slots;
};
