import {z} from 'zod';

// オープニングムービー計画(openingProject.ts)の検証スキーマ。
// pnpm check:motion がこれで検証する。remotionには依存しない純粋データ。

export const sceneStatusSchema = z.enum(['todo', 'draft', 'approved', 'final']);

export const sceneSchema = z.object({
  // タイムライン上のシーンID。英小文字・数字・ハイフンのみ
  id: z.string().regex(/^[a-z0-9-]+$/, 'scene idは英小文字・数字・ハイフンのみ'),
  title: z.string().min(1),
  // 使うテンプレート = sceneRegistry.tsのcomposition ID(漢字)
  template: z.string().min(1),
  durationSec: z.number().positive('durationSecは0より大きくする'),
  // 必要素材のID(assets.tsのキー)。AI背景やBGM待ちも含めて書く
  assets: z.array(z.string()),
  status: sceneStatusSchema,
  notes: z.string().optional(),
});

export const openingProjectSchema = z.object({
  groom: z.string().min(1),
  bride: z.string().min(1),
  coupleDisplay: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'dateはYYYY-MM-DD'),
  dateDisplay: z.string().min(1),
  venue: z.string().min(1),
  venueDisplay: z.string().min(1),
  tone: z.string().min(1),
  fps: z.number().int().positive(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  // CapCutで仕上げる上映尺の目標(秒)。BGMと間(ま)込みの最終尺
  // Remotion素材の合計尺(remotionBaseSec)はscenesから自動算出され、
  // capcutTargetSecとの差はCapCutの間・トランジションで埋める前提
  capcutTargetSec: z.number().positive(),
  scenes: z.array(sceneSchema).min(1),
});

export type Scene = z.infer<typeof sceneSchema>;
export type SceneStatus = z.infer<typeof sceneStatusSchema>;
export type OpeningProject = z.infer<typeof openingProjectSchema>;
