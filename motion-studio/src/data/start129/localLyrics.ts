// StaRt 129秒ショーケース用、ローカル歌詞の読み込みと検証。
//
// 歌詞本文はGitへ入れない(docs/opening-authority.md / CLAUDE.md方針)。
// motion-studio/local/lyrics.local.json に、権利確認済みの正規テキストから
// ユーザー自身が32句を書き写して置く。このファイルはgitignore済み。
//
// ローカルファイルが無い/不正な場合は例外を投げず、
// 日本語placeholder(歌詞スロットNN)へフォールバックする。
// 「歌詞全文版が完成した」とは、このローダーがplaceholderを1つも
// 返していない状態を指す(checkStart129Lyrics.mtsで機械検証する)。

import {z} from 'zod';

export const LocalLyricPhraseSchema = z.object({
  slotId: z.string().regex(/^LYRIC_\d{3}$/),
  text: z.string().min(1),
  startSec: z.number().min(0),
  endSec: z.number().min(0),
});

export const LocalLyricsFileSchema = z.object({
  source: z.string().min(1),
  usage: z.literal('private-wedding-screening'),
  phrases: z.array(LocalLyricPhraseSchema).min(1),
});

export type LocalLyricPhrase = z.infer<typeof LocalLyricPhraseSchema>;
export type LocalLyricsFile = z.infer<typeof LocalLyricsFileSchema>;

export const LYRIC_SLOT_COUNT = 32;

export const lyricSlotId = (index: number): string => `LYRIC_${String(index).padStart(3, '0')}`;

export const placeholderLyricText = (index: number): string => `歌詞スロット${String(index).padStart(2, '0')}`;

/**
 * Node script(check-start-129-*.mts)側で使う、ファイルパスからの読み込み。
 * Remotion browser bundle側では importedLocalLyrics.ts の staticFile 経由を使う。
 */
export const parseLocalLyricsJson = (
  raw: unknown,
):
  | {ok: true; data: LocalLyricsFile}
  | {ok: false; error: string} => {
  const result = LocalLyricsFileSchema.safeParse(raw);
  if (!result.success) {
    return {ok: false, error: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' / ')};
  }
  return {ok: true, data: result.data};
};

export type ResolvedLyricSlot = {
  index: number;
  slotId: string;
  text: string;
  startSec: number | null;
  endSec: number | null;
  isPlaceholder: boolean;
};

export const resolveLyricSlots = (file: LocalLyricsFile | null): ResolvedLyricSlot[] => {
  const bySlot = new Map((file?.phrases ?? []).map((p) => [p.slotId, p]));
  return Array.from({length: LYRIC_SLOT_COUNT}, (_, i) => {
    const index = i + 1;
    const slotId = lyricSlotId(index);
    const phrase = bySlot.get(slotId);
    if (phrase) {
      return {
        index,
        slotId,
        text: phrase.text,
        startSec: phrase.startSec,
        endSec: phrase.endSec,
        isPlaceholder: false,
      };
    }
    return {
      index,
      slotId,
      text: placeholderLyricText(index),
      startSec: null,
      endSec: null,
      isPlaceholder: true,
    };
  });
};
