// StaRt Wedding Edit(曲の先頭〜2番サビ後の間奏が終わる地点まで)の
// 編集範囲データ。129秒固定・14 section固定・32 slot固定は無効化された
// 旧仕様であり、ここではsourceEndSecが唯一のComposition時間の正本。
//
// 配置: motion-studio/local/start-wedding-edit.local.json (gitignore済み)

import {z} from 'zod';

export const LocalEditRangeSchema = z.object({
  sourceStartSec: z.number().min(0),
  lastIncludedLyric: z.string().min(1),
  lastIncludedLyricEndSec: z.number().min(0),
  interludeStartSec: z.number().min(0),
  interludeEndSec: z.number().min(0),
  nextExcludedLyricStartSec: z.number().min(0),
  sourceEndSec: z.number().min(0),
  fadeOutStartSec: z.number().min(0),
  fadeOutDurationSec: z.number().min(0),
  reasonJa: z.string().min(1),
  verifiedByListening: z.boolean(),
  verificationMethod: z.string().optional(),
  verificationNote: z.string().optional(),
});

export type LocalEditRange = z.infer<typeof LocalEditRangeSchema>;

export const parseLocalEditRangeJson = (
  raw: unknown,
): {ok: true; data: LocalEditRange} | {ok: false; error: string} => {
  const result = LocalEditRangeSchema.safeParse(raw);
  if (!result.success) {
    return {ok: false, error: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' / ')};
  }
  return {ok: true, data: result.data};
};
