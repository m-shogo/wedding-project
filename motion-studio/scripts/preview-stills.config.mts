// プレビューstill(サムネイル)の生成対象定義。
// export-preview-stills.mts(生成)と export-home.mts(表示)が共有する。
// 画像はGit管理しない(exports/**/*.png は.gitignore済み)。

export type PreviewStill = {
  // Composition ID(Root.tsx / sceneRegistry.tsと一致)
  compositionId: string;
  // exports/previews/ 内のファイル名
  file: string;
  // 見やすい代表フレーム
  frame: number;
  // 何を確認するための画像か
  purpose: string;
  // 対応するopeningProjectのシーンID(あれば。シーン別カードに表示する)
  sceneId?: string;
};

export const previewStills: PreviewStill[] = [
  {
    compositionId: '文字部品-確認',
    file: 'text-parts-preview.png',
    frame: 90,
    purpose: 'TextPart 3種の見た目確認(frame90=FadeUpCaption)',
  },
  {
    compositionId: '写真-Hawaii',
    file: 'photo-hawaii.png',
    frame: 120,
    purpose: 'Hawaii写真カードの確認',
    sceneId: 'opening-photo-hawaii',
  },
  {
    compositionId: '搭乗券',
    file: 'boarding.png',
    frame: 120,
    purpose: 'BOARDING PASSイントロの確認',
    sceneId: 'opening-boarding',
  },
  {
    compositionId: '雲海',
    file: 'cloud-sea.png',
    frame: 150,
    purpose: 'Remotion版雲海(AI版op_16系との比較用)',
    sceneId: 'opening-cloud-sea',
  },
  {
    compositionId: '扉-光',
    file: 'door-light.png',
    frame: 180,
    purpose: '入場直前の余韻・光の強さ確認',
    sceneId: 'opening-door-light',
  },
  {
    compositionId: '入場前-秒読',
    file: 'countdown.png',
    frame: 240,
    purpose: 'カウントダウンの数字・読みやすさ確認',
    sceneId: 'opening-countdown',
  },
  {
    compositionId: '開幕-全体確認',
    file: 'opening-full-preview.png',
    frame: 300,
    purpose: '通しの雰囲気確認(順番・尺はStudioで)',
  },
];

export const stillCommand = (p: PreviewStill): string =>
  `pnpm exec remotion still ${p.compositionId} exports/previews/${p.file} --frame=${p.frame}`;
