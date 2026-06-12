// pnpm export:review
// openingProject.tsからレビュー用HTML(シーン一覧+品質チェックリスト)を生成する。
// まだstill画像の自動生成はしない。一覧と確認観点を1枚のHTMLにする最小土台。
//
// 出力: exports/review-gallery/opening/review.html (Git管理可。動画・画像は置かない)
// チェック観点は docs/10_quality-gates.md のGate 1-4を本ページ用に具体化したもの。

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {openingProject} from '../src/data/openingProject.ts';
import {assets} from '../src/data/assets.ts';
import type {AssetStatus} from '../src/data/assets.ts';
import {templateById} from '../src/data/sceneRegistry.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'exports/review-gallery/opening');
mkdirSync(outDir, {recursive: true});

const mmss = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// external は採用段階ではなく置き場所なので本番未確定として扱う
const NOT_PRODUCTION_READY: AssetStatus[] = [
  'missing',
  'idea',
  'prompt_ready',
  'generated_preview',
  'external',
];

const statusColor: Record<string, string> = {
  missing: '#9a3d3d',
  idea: '#8a6d3b',
  prompt_ready: '#8a6d3b',
  generated_preview: '#8a6d3b',
  candidate: '#3b6d8a',
  approved: '#2e7d4f',
  final: '#1b5e20',
  external: '#666',
  todo: '#9a3d3d',
  draft: '#8a6d3b',
};

const badge = (label: string): string =>
  `<span class="badge" style="background:${statusColor[label] ?? '#666'}">${esc(label)}</span>`;

const qualityGateItems = [
  '写真が切れていないか(被写体のフレーミング)',
  '顔・犬・重要背景が切れていないか',
  '文字が読めるか(会場スクリーン距離を想定)',
  '白文字が背景に被って消えていないか',
  'テンプレ演出が重複してくどくないか',
  '旅行テーマが残っているか',
  '結婚式として寒くないか(内輪すぎ・ネタ過剰)',
  'AI臭・ネタ感が強すぎないか(AI作品に見えない)',
  'placeholder / generated_preview が混入していないか',
  'final扱いしてよい素材だけになっているか(昇格は人間承認済みか)',
  'BGMの山とシーン切替が合っているか',
  '最後が入場につながる余韻になっているか',
];

let cursor = 0;
const sceneCards = openingProject.scenes
  .map((scene, i) => {
    const start = cursor;
    const end = cursor + scene.durationSec;
    cursor = end;
    const t = templateById(scene.template);
    const sceneAssets = scene.assets.map((id) => assets[id]).filter(Boolean);
    const cautions = sceneAssets.filter((a) => NOT_PRODUCTION_READY.includes(a.status));

    const assetRows =
      sceneAssets.length === 0
        ? '<li class="muted">素材参照なし(テンプレのみ)</li>'
        : sceneAssets
            .map(
              (a) =>
                `<li><code>${esc(a.id)}</code> ${badge(a.status)} <span class="muted">${esc(a.path)}</span></li>`,
            )
            .join('');

    const cautionHtml =
      cautions.length > 0
        ? `<p class="caution">⚠ 本番未確定素材: ${cautions
            .map((a) => `${esc(a.id)}(${a.status})`)
            .join(', ')} — このシーンはまだ確定扱いにしない</p>`
        : '';

    // render出力パスをsceneRegistryから導出
    let renderInfo = '';
    if (t && t.kind !== 'preview-only' && t.output) {
      const ext = t.kind === 'alpha' ? '.webm' : '.mp4';
      const renderPath = `out/${t.output}${ext}`;
      renderInfo = `<p class="muted">CapCut素材: <code>${esc(renderPath)}</code> <span class="badge" style="background:#4a6080">${esc(t.kind)}</span> — <code>pnpm render ${esc(t.id)} final</code></p>`;
    }

    return `
    <section class="scene">
      <h2>${i + 1}. ${esc(scene.title)} <span class="time">${mmss(start)}–${mmss(end)} (${scene.durationSec}s)</span></h2>
      <p>テンプレ: <strong>${esc(scene.template)}</strong>${t ? ` — ${esc(t.description)}` : ''} / scene status: ${badge(scene.status)}</p>
      ${renderInfo}
      ${scene.caption ? `<p>テロップ: <em>${esc(scene.caption)}</em></p>` : ''}
      ${scene.bgmNote ? `<p class="muted">BGM: ${esc(scene.bgmNote)}</p>` : ''}
      ${scene.notes ? `<p class="muted">メモ: ${esc(scene.notes)}</p>` : ''}
      <ul>${assetRows}</ul>
      ${cautionHtml}
    </section>`;
  })
  .join('\n');

const totalSec = openingProject.scenes.reduce((s, x) => s + x.durationSec, 0);

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>オープニング レビュー — ${esc(openingProject.coupleDisplay)}</title>
<style>
  body { font-family: 'Hiragino Mincho ProN', 'Yu Mincho', serif; background: #F2EBDC; color: #1C2A44; margin: 0; padding: 32px 20px; }
  .wrap { max-width: 880px; margin: 0 auto; }
  h1 { letter-spacing: 0.12em; font-size: 26px; border-bottom: 2px solid #B89B5E; padding-bottom: 12px; }
  h2 { font-size: 19px; margin: 0 0 8px; }
  .meta { color: #6b5d3f; font-size: 14px; }
  .scene { background: #FAF6EC; border: 1px solid #DDD2BA; border-radius: 8px; padding: 18px 22px; margin: 18px 0; }
  .time { color: #8C7A4F; font-size: 14px; font-weight: normal; margin-left: 10px; }
  .badge { color: #fff; font-size: 12px; padding: 2px 10px; border-radius: 10px; }
  .muted { color: #7a6f57; font-size: 13px; }
  .caution { background: #F7E8E0; border-left: 4px solid #A8666F; padding: 8px 12px; font-size: 14px; }
  ul { margin: 8px 0; padding-left: 20px; }
  li { margin: 4px 0; font-size: 14px; }
  code { background: #EDE5D4; padding: 1px 6px; border-radius: 4px; font-size: 13px; }
  .gates { background: #1C2A44; color: #F7F2E9; border-radius: 8px; padding: 22px 26px; margin-top: 28px; }
  .gates h2 { color: #C9B27C; }
  .gates label { display: block; margin: 9px 0; font-size: 15px; cursor: pointer; }
  .gates input { margin-right: 10px; transform: scale(1.2); }
  .gates .ref { color: #9aa7c4; font-size: 13px; margin-top: 14px; }
</style>
</head>
<body>
<div class="wrap">
  <h1>オープニングムービー レビュー</h1>
  <p class="meta">
    ${esc(openingProject.coupleDisplay)} / ${esc(openingProject.date)} / ${esc(openingProject.venueDisplay)}<br>
    Remotion素材合計 ${totalSec}s / CapCut目標尺 ${openingProject.capcutTargetSec}s /
    自動生成: <code>pnpm export:review</code>(単一情報源: src/data/openingProject.ts)
  </p>

  ${sceneCards}

  <div class="gates">
    <h2>品質ゲート チェックリスト</h2>
    ${qualityGateItems.map((q) => `<label><input type="checkbox">${esc(q)}</label>`).join('\n    ')}
    <p class="ref">詳細な観点: docs/10_quality-gates.md(Gate 1: 10秒試作 / Gate 2: 30秒 / Gate 3: 本編ラフ / Gate 4: 上映前)。
    指摘は docs/templates/review-notes.csv に記録する。チェック状態はこのページを閉じると消える(記録はCSVへ)。</p>
  </div>
</div>
</body>
</html>
`;

writeFileSync(join(outDir, 'review.html'), html);
console.log('✅ exports/review-gallery/opening/review.html');
