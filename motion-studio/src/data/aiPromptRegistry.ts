// AI画像・動画のプロンプト履歴を素材IDに紐づけて管理する。
// 「どのプロンプトでどの素材ができて、いま採用段階がどこか」を残すのが目的。
// 検証: pnpm check:assets (assetId存在・status整合・resultPath矛盾を見る)
//
// 運用ルール:
//   - 生成を実行したら1レコード追加する(後からまとめて書かない)
//   - prompt未確定の構想段階は status: 'idea' / prompt: 'TODO' でよい。捏造しない
//   - candidate以上への昇格は人間の確認が必須。AIが勝手にapproved/finalにしない
//   - 実プロンプトの正は docs/templates/ai-shot-list.csv や i2v-generation-log.csv
//     にもあるため、移行する場合はそこからコピーする
//   - 新規ショットのプロンプト設計は movie-dashboard の「動画プロンプト」を入口にする

export type AiPromptStatus =
  | 'idea'
  | 'prompt_ready'
  | 'generated_preview'
  | 'candidate'
  | 'approved'
  | 'rejected'
  | 'final';

export type AiPromptTool =
  | 'ComfyUI'
  | 'Seedance 2.0 Mini'
  | 'Seedance 2.0'
  | 'Seedance 2.5 (preview)'
  | 'Veo 3.1'
  | 'Runway Gen-4.5'
  | 'Kling'
  | 'Hailuo'
  | 'PixVerse'
  | 'Luma'
  | 'Other';

export type AiPromptRecord = {
  id: string;
  // assets.tsに存在するIDであること(check:assetsが検証)
  assetId: string;
  // openingProject.scenesのid(任意)
  sceneId?: string;
  tool: AiPromptTool;
  mode: 't2i' | 'i2v' | 't2v' | 'upscale' | 'other';
  sourceImage?: string;
  prompt: string;
  negativePrompt?: string;
  resultPath?: string;
  status: AiPromptStatus;
  note?: string;
  createdAt?: string;
};

export const aiPromptRecords: AiPromptRecord[] = [
  {
    id: 'ai-cloud-sea-01-i2v-01',
    assetId: 'ai-cloud-sea-01',
    sceneId: 'opening-cloud-sea',
    tool: 'ComfyUI',
    mode: 'i2v',
    prompt: 'TODO: op_16系の実プロンプトを 02_opening-movie/i2v-generation-log.csv から転記',
    status: 'generated_preview',
    note: '雲海のI2V試作。採点未了。Remotion版「雲海」と比較して採否を決める',
    createdAt: '2026-06-11',
  },
  {
    id: 'ai-door-light-01-idea-01',
    assetId: 'ai-door-light-01',
    sceneId: 'opening-door-light',
    tool: 'ComfyUI',
    mode: 'i2v',
    prompt: 'TODO: 扉の光の静止画→I2Vプロンプトは未確定',
    status: 'idea',
    note: 'Remotion版「扉-光」が先にあるため、AI版は必要になったら作る',
    createdAt: '2026-06-12',
  },
];
