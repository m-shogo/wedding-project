// StaRt 129秒ショーケース用、ローカル権利メモの検証スキーマ。
// motion-studio/local/rights.local.json (gitignore済み)に人間が書く。
// これは法的判断の正本ではなく、制作側が「上映用途で使用可と申告した」
// という制作記録。Claudeが権利状態を拡張・保証しない。

import {z} from 'zod';

export const LocalRightsFileSchema = z.object({
  audioSource: z.string().min(1),
  lyricsSource: z.string().min(1),
  usage: z.literal('private-wedding-screening'),
  screeningClearedByUser: z.literal(true),
  notes: z.string().optional(),
});

export type LocalRightsFile = z.infer<typeof LocalRightsFileSchema>;

export const parseLocalRightsJson = (
  raw: unknown,
): {ok: true; data: LocalRightsFile} | {ok: false; error: string} => {
  const result = LocalRightsFileSchema.safeParse(raw);
  if (!result.success) {
    return {ok: false, error: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' / ')};
  }
  return {ok: true, data: result.data};
};
