// StaRt Wedding Edit用の歌詞phraseスキーマ。
//
// 旧 localLyrics.ts の「32 slot固定 + 歌詞スロットNN placeholder」は
// このEditでは無効。歌詞本文の境界で可変長のphrase配列を持つ。
//
// 配置: motion-studio/local/lyrics-wedding-edit.local.json (gitignore済み)

import {z} from 'zod';

export const SemanticTypeSchema = z.enum([
  'start',
  'anticipation',
  'play',
  'question',
  'irony',
  'conflict',
  'loneliness',
  'repetition',
  'decision',
  'affection',
  'liberation',
  'gratitude',
  'welcome',
  'ending',
]);

export const RhythmTypeSchema = z.enum([
  'single-hit',
  'three-hit',
  'rapid',
  'rising',
  'sustained',
  'stop-and-go',
  'call-and-response',
  'quiet',
  'chorus',
  'ending',
]);

export const LyricPhraseSchema = z.object({
  phraseId: z.string().regex(/^P\d{3}$/),
  lineNumber: z.number().int().min(1),
  sectionId: z.string().min(1),
  text: z.string().min(1),
  startSec: z.number().min(0),
  endSec: z.number().min(0),
  emphasisWord: z.string().nullable(),
  threeHitFrameSecs: z.tuple([z.number(), z.number(), z.number()]).nullable(),
  rhythmType: RhythmTypeSchema,
  semanticType: SemanticTypeSchema,
  /**
   * 人間可読/編集可能契約(docs/contracts/human-readable-editable-movie-contract.md)。
   * 未指定はAI_SUGGESTED相当。HUMAN_SELECTED/LOCKEDはAIが無断で上書きしない。
   * 現状の全phraseはffmpeg解析による人間未選定のAI_SUGGESTED。
   */
  status: z.enum(['DEFAULT', 'AI_SUGGESTED', 'HUMAN_SELECTED', 'LOCKED']).optional(),
});

export const LyricsWeddingEditFileSchema = z.object({
  source: z.string().min(1),
  usage: z.literal('private-wedding-screening'),
  methodologyJa: z.string().min(1),
  verifiedByListening: z.boolean(),
  excludedFromThisEdit: z.string().min(1),
  phrases: z.array(LyricPhraseSchema).min(1),
});

export type LyricPhrase = z.infer<typeof LyricPhraseSchema>;
export type LyricsWeddingEditFile = z.infer<typeof LyricsWeddingEditFileSchema>;

export const parseLyricsWeddingEditJson = (
  raw: unknown,
): {ok: true; data: LyricsWeddingEditFile} | {ok: false; error: string} => {
  const result = LyricsWeddingEditFileSchema.safeParse(raw);
  if (!result.success) {
    return {ok: false, error: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' / ')};
  }
  return {ok: true, data: result.data};
};
