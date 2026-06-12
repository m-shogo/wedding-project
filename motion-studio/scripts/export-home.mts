// pnpm export:home
// 制作ホーム(入口ページ)を生成する。編集用ダッシュボードではない。
// 「まず見るもの」「今日やること(素材状況)」「よく使うコマンド」だけを1枚のHTMLに出す。
//
// 出力: exports/index.html (1ファイル・外部CDNなし・状態保存なし)

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import type {Asset, AssetStatus} from '../src/data/assets.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'exports');
mkdirSync(outDir, {recursive: true});

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 「今日やること」に出す段階(人間/AIの次アクションがある段階のみ)
const TODO_STATUSES: AssetStatus[] = ['missing', 'idea', 'generated_preview', 'candidate'];

const statusLabel: Record<string, string> = {
  missing: 'missing — 入手待ち',
  idea: 'idea — アイデア段階',
  generated_preview: 'generated_preview — 試作済み(人間の審査待ち)',
  candidate: 'candidate — 採用候補(承認待ち)',
};

const statusColor: Record<string, string> = {
  missing: '#9a3d3d',
  idea: '#8a6d3b',
  generated_preview: '#8a6d3b',
  candidate: '#3b6d8a',
};

const allAssets = Object.values(assets) as Asset[];
const byStatus = (status: AssetStatus): Asset[] =>
  allAssets.filter((a) => a.status === status);

const todoSections = TODO_STATUSES.map((status) => {
  const list = byStatus(status);
  if (list.length === 0) {
    return `<div class="todo-group">
      <h3><span class="dot" style="background:${statusColor[status]}"></span>${esc(statusLabel[status] ?? status)} <span class="count">0件</span></h3>
      <p class="muted">なし</p>
    </div>`;
  }
  const items = list
    .map(
      (a) =>
        `<li><code>${esc(a.id)}</code> — ${esc(a.usage)}${
          a.note ? `<br><span class="muted">${esc(a.note)}</span>` : ''
        }</li>`,
    )
    .join('\n');
  return `<div class="todo-group">
    <h3><span class="dot" style="background:${statusColor[status]}"></span>${esc(statusLabel[status] ?? status)} <span class="count">${list.length}件</span></h3>
    <ul>${items}</ul>
  </div>`;
}).join('\n');

const commands: Array<[string, string]> = [
  ['pnpm dev', 'Remotion Studioを開く(見た目確認・props微調整)'],
  ['pnpm check', 'コード・素材・パーツの整合チェック(コミット前に必ず)'],
  ['pnpm export', 'CapCut作業表・review.html・このページを再生成'],
  ['pnpm render:photo:hawaii', 'Hawaii写真カードを書き出す'],
  ['pnpm render:preview', '開幕の通しプレビューを書き出す'],
  [
    'pnpm exec remotion still 文字部品-確認 /tmp/text-parts-preview.png --frame=90',
    '文字パーツの静止画確認',
  ],
];

const commandRows = commands
  .map(([cmd, desc]) => `<tr><td><code>${esc(cmd)}</code></td><td>${esc(desc)}</td></tr>`)
  .join('\n');

const generatedAt = new Date().toISOString().slice(0, 16).replace('T', ' ');

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>結婚式ムービー制作ホーム</title>
<style>
  :root {
    --navy: #1d2a44;
    --navy-deep: #141d31;
    --beige: #f4eee3;
    --gold: #b89a5a;
    --gold-light: #d9c18a;
    --ink: #2c2c2c;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Hiragino Mincho ProN", "Yu Mincho", serif;
    background: var(--beige);
    color: var(--ink);
    line-height: 1.7;
  }
  header {
    background: var(--navy);
    color: #f4eee3;
    padding: 36px 48px 28px;
    border-bottom: 3px solid var(--gold);
  }
  header h1 { margin: 0; font-size: 26px; letter-spacing: 0.18em; font-weight: 600; }
  header p { margin: 8px 0 0; opacity: 0.75; font-size: 13px; letter-spacing: 0.08em; }
  main { max-width: 880px; margin: 0 auto; padding: 32px 24px 64px; }
  section {
    background: #fff;
    border: 1px solid #e2dac9;
    border-radius: 10px;
    padding: 24px 28px;
    margin-bottom: 28px;
    box-shadow: 0 2px 10px rgba(29,42,68,0.06);
  }
  h2 {
    margin: 0 0 16px;
    font-size: 18px;
    letter-spacing: 0.14em;
    color: var(--navy);
    border-bottom: 1px solid var(--gold);
    padding-bottom: 8px;
  }
  h3 { margin: 18px 0 6px; font-size: 15px; color: var(--navy); }
  ul { margin: 6px 0; padding-left: 22px; }
  li { margin: 4px 0; }
  a { color: #3b5a8a; }
  code {
    font-family: "SF Mono", Menlo, monospace;
    font-size: 13px;
    background: #f0ebe0;
    padding: 1px 6px;
    border-radius: 4px;
  }
  table { border-collapse: collapse; width: 100%; }
  td { padding: 7px 10px; border-bottom: 1px solid #ece5d6; vertical-align: top; font-size: 14px; }
  .muted { color: #8a8273; font-size: 13px; }
  .count { font-size: 12px; color: #8a8273; font-weight: normal; margin-left: 6px; }
  .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }
  .todo-group { margin-bottom: 8px; }
  .note {
    background: #faf6ec;
    border-left: 3px solid var(--gold);
    padding: 10px 16px;
    font-size: 13px;
    color: #6d614b;
  }
</style>
</head>
<body>
<header>
  <h1>結婚式ムービー制作ホーム</h1>
  <p>motion-studio 入口ページ — 生成: ${generatedAt}(pnpm export で更新)</p>
</header>
<main>

<section>
  <h2>まず見るもの</h2>
  <ul>
    <li><strong>Remotion Studio</strong> — <code>pnpm dev</code>(見た目確認・props微調整)</li>
    <li><strong>Studio操作ガイド</strong> — <a href="../docs/remotion-studio-guide.md">docs/remotion-studio-guide.md</a></li>
    <li><strong>レビュー一覧</strong> — <a href="./review-gallery/opening/review.html">review.html</a>(シーン×素材×品質チェック)</li>
    <li><strong>CapCut作業表</strong> — <a href="./capcut/opening-timeline.md">opening-timeline.md</a></li>
    <li><strong>本番未確定素材一覧</strong> — <a href="./capcut/opening-missing-assets.md">opening-missing-assets.md</a></li>
  </ul>
</section>

<section>
  <h2>今日やること(素材状況)</h2>
${todoSections}
  <p class="note">candidate以上への昇格は人間(新郎新婦)の確認が必須。AIが勝手に上げない。</p>
</section>

<section>
  <h2>よく使うコマンド</h2>
  <table>
${commandRows}
  </table>
</section>

</main>
</body>
</html>
`;

const outPath = join(outDir, 'index.html');
writeFileSync(outPath, html);
console.log(`✅ exports/index.html (素材${allAssets.length}件中、要対応${TODO_STATUSES.reduce((n, s) => n + byStatus(s).length, 0)}件)`);
