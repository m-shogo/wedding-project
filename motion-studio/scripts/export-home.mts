// pnpm export:home
// 制作コックピット(確認入口ページ)を生成する。編集UIではない。
// 状態保存・検索・フィルター・カンバンは作らない。1ファイルHTML・外部CDNなし・JSなし。
//
// 出力: exports/index.html
// データ源: openingProject / assets / sceneRegistry / partRegistry / aiPromptRegistry

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {openingProject, remotionBaseSec} from '../src/data/openingProject.ts';
import {assets} from '../src/data/assets.ts';
import type {Asset, AssetStatus} from '../src/data/assets.ts';
import {templates, templateById} from '../src/data/sceneRegistry.ts';
import {parts} from '../src/data/partRegistry.ts';
import {aiPromptRecords} from '../src/data/aiPromptRegistry.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'exports');
mkdirSync(outDir, {recursive: true});

// ---------------------------------------------------------------- helpers

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const mmss = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const allAssets = Object.values(assets) as Asset[];
const byStatus = (status: AssetStatus): Asset[] =>
  allAssets.filter((a) => a.status === status);

// assetId → 使用シーンID(scenes直書き + render素材はregenerateCommandのテンプレIDから逆引き)
const templateIdFromRenderCommand = (cmd: string | undefined): string | undefined => {
  if (!cmd) return undefined;
  const m = cmd.match(/^pnpm render (.+?) (?:final|draft|preview|prores)/);
  return m?.[1];
};

const usedByDirect = new Map<string, string[]>();
const templateToSceneIds = new Map<string, string[]>();
for (const scene of openingProject.scenes) {
  for (const assetId of scene.assets) {
    const arr = usedByDirect.get(assetId) ?? [];
    arr.push(scene.id);
    usedByDirect.set(assetId, arr);
  }
  const arr = templateToSceneIds.get(scene.template) ?? [];
  arr.push(scene.id);
  templateToSceneIds.set(scene.template, arr);
}

const usedScenes = (asset: Asset): string[] => {
  const direct = usedByDirect.get(asset.id);
  if (direct && direct.length > 0) return direct;
  if (asset.type === 'render') {
    const tid = templateIdFromRenderCommand(asset.regenerateCommand);
    if (tid) return templateToSceneIds.get(tid) ?? [];
  }
  return [];
};

// scene.template → render出力パス/コマンド(export:capcutと同じ導出)
const renderInfo = (
  templateId: string,
): {path: string; kind: string; command: string} | undefined => {
  const t = templateById(templateId);
  if (!t) return undefined;
  if (t.kind === 'preview-only' || !t.output) {
    return {path: '', kind: 'preview-only', command: ''};
  }
  const ext = t.kind === 'alpha' ? '.webm' : '.mp4';
  return {
    path: `out/${t.output}${ext}`,
    kind: t.kind,
    command: `pnpm render ${t.id} final`,
  };
};

// ---------------------------------------------------------------- バッジ・色

const statusColor: Record<string, string> = {
  missing: '#9a3d3d',
  idea: '#8a6d3b',
  prompt_ready: '#8a6d3b',
  generated_preview: '#8a6d3b',
  candidate: '#3b6d8a',
  approved: '#2e7d4f',
  final: '#1b5e20',
  external: '#666666',
  todo: '#9a3d3d',
  draft: '#8a6d3b',
};

const badge = (label: string): string =>
  `<span class="badge" style="background:${statusColor[label] ?? '#666'}">${esc(label)}</span>`;

const prioBadge = (p: 'HIGH' | 'MEDIUM' | 'LOW'): string => {
  const color = p === 'HIGH' ? '#9a3d3d' : p === 'MEDIUM' ? '#8a6d3b' : '#5b6b7a';
  return `<span class="prio" style="background:${color}">${p}</span>`;
};

// ---------------------------------------------------------------- C. 全体サマリー

const baseSec = remotionBaseSec(openingProject);
const sceneCount = openingProject.scenes.length;
const todoScenes = openingProject.scenes.filter((s) => s.status === 'todo');
const draftScenes = openingProject.scenes.filter((s) => s.status === 'draft');
const aiAssets = allAssets.filter((a) => a.type === 'ai-video');
const textParts = parts.filter((p) => p.category === 'text');
const previewOnlyTemplates = templates.filter((t) => t.kind === 'preview-only');

const summaryCards: Array<[string, string, string]> = [
  // [値, ラベル, 補足]
  [String(sceneCount), 'シーン数', 'openingProject.ts'],
  [`${baseSec}秒`, 'Remotion素材合計', `目標${openingProject.capcutTargetSec}秒との差はCapCutの間`],
  [`${openingProject.capcutTargetSec}秒`, 'CapCut目標尺', '上映尺'],
  [String(byStatus('missing').length), 'missing(未入手)', '写真・BGMなど'],
  [String(byStatus('idea').length), 'idea(アイデア)', 'AI素材の構想段階'],
  [String(byStatus('prompt_ready').length), 'prompt_ready', '生成準備済み'],
  [String(byStatus('generated_preview').length), 'generated_preview', '試作。本番使用不可'],
  [String(byStatus('candidate').length), 'candidate', '人間承認待ち'],
  [String(byStatus('approved').length + byStatus('final').length), 'approved / final', '本番確定素材'],
  [String(todoScenes.length), 'todoシーン', '構成未確定'],
  [String(draftScenes.length), 'draftシーン', '見た目確認待ち'],
  [String(aiAssets.length), 'AI素材', 'ComfyUI等'],
  [String(textParts.length), 'textパーツ', 'parts/text'],
  [String(previewOnlyTemplates.length), 'preview-onlyテンプレ', '書き出し対象外'],
];

const summaryHtml = summaryCards
  .map(
    ([value, label, hint]) => `<div class="stat">
      <div class="stat-value">${esc(value)}</div>
      <div class="stat-label">${esc(label)}</div>
      <div class="stat-hint">${esc(hint)}</div>
    </div>`,
  )
  .join('\n');

// ---------------------------------------------------------------- D. 今日やること

type TodoItem = {
  prio: 'HIGH' | 'MEDIUM' | 'LOW';
  order: number;
  action: string;
  ref: string; // assetId / sceneId
  scenes: string[];
  detail?: string;
};

const todos: TodoItem[] = [];

for (const a of byStatus('missing')) {
  const action =
    a.type === 'audio'
      ? `BGM候補を決める(会場上映の利用条件確認も)`
      : a.type === 'photo'
        ? `実写真を選んで ${a.path} に置く`
        : `素材を入手する(${a.usage})`;
  todos.push({
    prio: 'HIGH',
    order: a.type === 'photo' ? 1 : a.type === 'audio' ? 2 : 3,
    action,
    ref: a.id,
    scenes: usedScenes(a),
    detail: a.note,
  });
}

for (const a of [...byStatus('idea'), ...byStatus('prompt_ready')]) {
  todos.push({
    prio: 'MEDIUM',
    order: 4,
    action:
      a.type === 'ai-video'
        ? `生成するか、Remotion版だけで進めるか決める`
        : `生成準備を進める(${a.usage})`,
    ref: a.id,
    scenes: usedScenes(a),
    detail: a.note,
  });
}

for (const a of byStatus('generated_preview')) {
  if (a.type === 'ai-video') {
    todos.push({
      prio: 'MEDIUM',
      order: 5,
      action: `試作を採点する(scorecard基準。採用ならcandidateへ=人間確認)`,
      ref: a.id,
      scenes: usedScenes(a),
      detail: a.recoveryNote ?? a.note,
    });
  } else {
    todos.push({
      prio: 'LOW',
      order: 7,
      action: `試作を確認し、本番候補(candidate)にするか決める`,
      ref: a.id,
      scenes: usedScenes(a),
      detail: a.note,
    });
  }
}

for (const a of byStatus('candidate')) {
  todos.push({
    prio: 'MEDIUM',
    order: 6,
    action: `採用候補を人間が承認する(approvedへの昇格は人間のみ)`,
    ref: a.id,
    scenes: usedScenes(a),
    detail: a.note,
  });
}

for (const s of todoScenes) {
  todos.push({
    prio: 'MEDIUM',
    order: 6,
    action: `シーン構成を確定する(まだtodo)`,
    ref: s.id,
    scenes: [s.id],
    detail: s.notes,
  });
}

for (const s of draftScenes) {
  todos.push({
    prio: 'LOW',
    order: 8,
    action: `Studioで見た目を確認する(draft)`,
    ref: s.id,
    scenes: [s.id],
    detail: s.notes,
  });
}

for (const a of byStatus('external')) {
  todos.push({
    prio: 'LOW',
    order: 9,
    action: `repo外素材の現物を確認する`,
    ref: a.id,
    scenes: usedScenes(a),
    detail: a.note,
  });
}

todos.sort((x, y) => x.order - y.order);

const todoHtml = todos
  .map(
    (t) => `<li class="todo-item">
      ${prioBadge(t.prio)} ${esc(t.action)} <code>${esc(t.ref)}</code>${
        t.scenes.length > 0 && t.scenes[0] !== t.ref
          ? ` <span class="muted">/ 使用シーン: ${t.scenes.map((s) => `<code>${esc(s)}</code>`).join(' ')}</span>`
          : ''
      }${t.detail ? `<br><span class="muted indent">${esc(t.detail)}</span>` : ''}
    </li>`,
  )
  .join('\n');

// ---------------------------------------------------------------- E. シーン別カード

let cursor = 0;
const sceneCards = openingProject.scenes
  .map((scene, i) => {
    const start = cursor;
    const end = cursor + scene.durationSec;
    cursor = end;
    const r = renderInfo(scene.template);

    const sceneAssets = scene.assets.map((id) => assets[id]).filter(Boolean) as Asset[];
    // template由来のrender素材も「必要素材」に含める
    const renderAssets = allAssets.filter(
      (a) => a.type === 'render' && templateIdFromRenderCommand(a.regenerateCommand) === scene.template,
    );
    const combined = [...sceneAssets, ...renderAssets.filter((ra) => !sceneAssets.some((sa) => sa.id === ra.id))];

    const assetRows =
      combined.length === 0
        ? '<p class="muted">登録素材なし(テンプレ内蔵描画のみ)</p>'
        : `<table class="mini">${combined
            .map(
              (a) =>
                `<tr><td><code>${esc(a.id)}</code></td><td>${badge(a.status)}</td><td><code>${esc(a.path)}</code>${
                  a.note ? `<br><span class="muted">${esc(a.note)}</span>` : ''
                }</td></tr>`,
            )
            .join('\n')}</table>`;

    // このシーンで見ること
    const watch: string[] = [];
    if (sceneAssets.some((a) => a.status === 'missing')) watch.push('素材待ち(missingあり)');
    if (combined.some((a) => a.status === 'generated_preview')) watch.push('採点 / 見た目確認(試作あり)');
    if (scene.caption) watch.push('文字の読みやすさ確認(caption予定あり)');
    if (scene.bgmNote) watch.push('音との同期確認(BGMメモあり)');
    if (scene.status === 'todo') watch.push('まだ構成未確定(todo)');
    if (scene.status === 'draft') watch.push('見た目確認待ち(draft)');

    return `<details class="scene" ${scene.status === 'todo' ? 'open' : ''}>
  <summary><span class="scene-no">${i + 1}</span> ${mmss(start)}–${mmss(end)} <strong>${esc(scene.title)}</strong> ${badge(scene.status)} <span class="muted">${esc(scene.id)}</span></summary>
  <div class="scene-body">
    <table class="mini">
      <tr><td>テンプレ / Studioで見るComposition</td><td><code>${esc(scene.template)}</code></td></tr>
      ${scene.notes ? `<tr><td>メモ</td><td>${esc(scene.notes)}</td></tr>` : ''}
      ${scene.caption ? `<tr><td>caption(CapCutで乗せる)</td><td>${esc(scene.caption)}</td></tr>` : ''}
      ${scene.bgmNote ? `<tr><td>BGMメモ</td><td>${esc(scene.bgmNote)}</td></tr>` : ''}
      ${scene.seNote ? `<tr><td>SEメモ</td><td>${esc(scene.seNote)}</td></tr>` : ''}
      ${
        r && r.kind !== 'preview-only'
          ? `<tr><td>CapCut素材(render出力)</td><td><code>${esc(r.path)}</code>(${esc(r.kind)})<br>再生成: <code>${esc(r.command)}</code></td></tr>`
          : ''
      }
    </table>
    <h4>必要素材</h4>
    ${assetRows}
    <h4>このシーンで見ること</h4>
    ${watch.length > 0 ? `<ul>${watch.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>` : '<p class="muted">特になし</p>'}
  </div>
</details>`;
  })
  .join('\n');

// ---------------------------------------------------------------- F. Compositionを見る順番

type CompoGuide = {
  id: string;
  purpose: string;
  points: string[];
  okProps: string;
  ngProps: string;
  still: string;
};

const compoOrder: CompoGuide[] = [
  {
    id: '文字部品-確認',
    purpose: 'TextPart 3種(FadeUpCaption / MaskRevealTitle / ElegantLowerThird)の確認',
    points: ['文字サイズが会場スクリーンで読めるか', '派手すぎないか', 'フェード速度'],
    okProps: 'propsなし(見るだけ)',
    ngProps: '—',
    still: 'pnpm exec remotion still 文字部品-確認 /tmp/text-parts-preview.png --frame=90',
  },
  {
    id: '写真-Hawaii',
    purpose: 'Hawaii写真カード(MEMORY 03)の確認',
    points: ['写真の切れ・傾き', 'ズームの上品さ', 'プレースホルダのままか'],
    okProps: 'background / maxRotationDeg / cardRadius / shadowStrength / staggerFrames / zoomTo',
    ngProps: 'photosのパス手書き(assets.ts経由にする)',
    still: 'pnpm exec remotion still 写真-Hawaii /tmp/photo-hawaii.png --frame=120',
  },
  {
    id: '搭乗券',
    purpose: 'オープニング冒頭のBOARDING PASS確認',
    points: ['ivory/navyどちらにするか(人間の決定待ち)', '文言', '黒帯の有無'],
    okProps: 'variant / zoomTo / showCinematicBars',
    ngProps: '文言の確定はopeningProject.ts側で行う',
    still: 'pnpm exec remotion still 搭乗券 /tmp/boarding.png --frame=120',
  },
  {
    id: '雲海',
    purpose: 'Remotion版雲海。AI生成版(op_16系)と比較して採用を決める',
    points: ['AI版と並べてどちらが上品か', 'テロップ余白', 'ループ感'],
    okProps: '時間帯系props(朝/昼/夕)',
    ngProps: '—',
    still: 'pnpm exec remotion still 雲海 /tmp/cloud-sea.png --frame=150',
  },
  {
    id: '扉-光',
    purpose: '入場直前の余韻。テロップ「Cabin crew...」はCapCutで乗せる',
    points: ['光の強さが文字を邪魔しないか', '余韻の長さ'],
    okProps: '光量・タイミング系props',
    ngProps: '—',
    still: 'pnpm exec remotion still 扉-光 /tmp/door-light.png --frame=180',
  },
  {
    id: '開幕-全体確認',
    purpose: 'openingProject.ts連動の全体テンポ確認(順番・尺のみ)',
    points: ['シーンの順番', 'テンポ', '長すぎる/短すぎるシーン'],
    okProps: 'なし(見るだけ)',
    ngProps: 'propsは代表値。ここで細かい編集をしない。順番・尺はopeningProject.ts',
    still: '(通し確認はStudio再生で行う)',
  },
];

const compoHtml = compoOrder
  .map(
    (c, i) => `<details class="compo">
  <summary><span class="scene-no">${i + 1}</span> <code>${esc(c.id)}</code> — ${esc(c.purpose)}</summary>
  <div class="scene-body">
    <table class="mini">
      <tr><td>見るポイント</td><td>${c.points.map(esc).join(' / ')}</td></tr>
      <tr><td>触ってよいprops</td><td>${esc(c.okProps)}</td></tr>
      <tr><td>触らない方がよい</td><td>${esc(c.ngProps)}</td></tr>
      <tr><td>still確認</td><td><code>${esc(c.still)}</code></td></tr>
    </table>
  </div>
</details>`,
  )
  .join('\n');

// ---------------------------------------------------------------- H. statusの意味

const statusDescriptions: Array<[string, string]> = [
  ['missing', '未入手。写真・BGMなどの現物待ち'],
  ['idea', 'アイデア段階。まだ生成していない'],
  ['prompt_ready', '生成準備済み(プロンプト確定)'],
  ['generated_preview', '試作。本番使用不可。final扱い禁止'],
  ['candidate', '採用候補。人間の確認待ち'],
  ['approved', '採用決定(ファイル欠損はcheckエラー)'],
  ['final', '本番OK(ファイル欠損はcheckエラー)'],
  ['external', 'repo外管理。本番未確定扱い'],
];

const statusDescHtml = statusDescriptions
  .map(([s, d]) => `<tr><td>${badge(s)}</td><td>${esc(d)}</td></tr>`)
  .join('\n');

// ---------------------------------------------------------------- I. 素材一覧(status別 details)

const ASSET_LIST_ORDER: AssetStatus[] = [
  'missing',
  'idea',
  'prompt_ready',
  'generated_preview',
  'candidate',
  'external',
  'approved',
  'final',
];

const assetListHtml = ASSET_LIST_ORDER.map((status) => {
  const list = byStatus(status);
  const rows = list
    .map((a) => {
      const scenes = usedScenes(a);
      const extras = [
        a.note ? `note: ${esc(a.note)}` : '',
        a.recoveryNote ? `確認/復旧メモ: ${esc(a.recoveryNote)}` : '',
        a.regenerateCommand ? `再生成: <code>${esc(a.regenerateCommand)}</code>` : '',
        scenes.length > 0 ? `使用シーン: ${scenes.map((s) => `<code>${esc(s)}</code>`).join(' ')}` : '使用シーン: なし',
      ]
        .filter(Boolean)
        .join('<br>');
      return `<tr><td><code>${esc(a.id)}</code><br><span class="muted">${esc(a.type)}</span></td><td>${esc(a.usage)}<br><code>${esc(a.path)}</code><br><span class="muted">${extras}</span></td></tr>`;
    })
    .join('\n');
  return `<details>
  <summary>${badge(status)} <strong>${list.length}件</strong></summary>
  ${list.length === 0 ? '<p class="muted">なし</p>' : `<table class="mini">${rows}</table>`}
</details>`;
}).join('\n');

// ---------------------------------------------------------------- J. パーツカタログ

const partsHtml = parts
  .map(
    (p) => `<tr>
    <td><code>${esc(p.id)}</code><br><strong>${esc(p.name)}</strong></td>
    <td>${badge(p.status)}<br><span class="muted">${esc(p.category)}</span></td>
    <td>${esc(p.usage)}<br><span class="muted">使える場所: ${p.allowedIn.join(' / ')}</span></td>
  </tr>`,
  )
  .join('\n');

// ---------------------------------------------------------------- K. AIプロンプト履歴

const aiHtml = aiPromptRecords
  .map((r) => {
    const promptTodo = r.prompt.startsWith('TODO');
    return `<tr>
    <td><code>${esc(r.assetId)}</code>${r.sceneId ? `<br><span class="muted">${esc(r.sceneId)}</span>` : ''}</td>
    <td>${esc(r.tool)} / ${esc(r.mode)}<br>${badge(r.status)}</td>
    <td>${
      promptTodo
        ? `<span class="prompt-todo">${esc(r.prompt)}</span>`
        : `<span class="muted">${esc(r.prompt.length > 90 ? r.prompt.slice(0, 90) + '…' : r.prompt)}</span>`
    }${r.resultPath ? `<br><code>${esc(r.resultPath)}</code>` : ''}${r.note ? `<br><span class="muted">${esc(r.note)}</span>` : ''}</td>
  </tr>`;
  })
  .join('\n');

// ---------------------------------------------------------------- L. コマンド集

const commands: Array<[string, string]> = [
  ['pnpm dev', 'Remotion Studioを開く(見た目確認・props微調整)'],
  ['pnpm check', 'コード・素材・パーツの整合チェック(コミット前に必ず)'],
  ['pnpm export', 'CapCut作業表 + review.html + このページを再生成'],
  ['pnpm export:capcut', 'CapCut作業表CSV/MDのみ再生成'],
  ['pnpm export:review', 'レビューHTMLのみ再生成'],
  ['pnpm export:home', 'このページのみ再生成'],
  ['pnpm render:photo:hawaii', 'Hawaii写真カードを書き出す'],
  ['pnpm render:preview', '開幕の通しプレビューを書き出す'],
  [
    'pnpm exec remotion still 文字部品-確認 /tmp/text-parts-preview.png --frame=90',
    '文字パーツの静止画確認',
  ],
  [
    'pnpm exec remotion still 写真-Hawaii /tmp/photo-hawaii.png --frame=120',
    'Hawaii写真カードの静止画確認',
  ],
  ['git diff', '変更内容の確認(Save defaults後は特に)'],
  ['git status', '変更ファイルの確認'],
];

const commandRows = commands
  .map(([cmd, desc]) => `<tr><td><code>${esc(cmd)}</code></td><td>${esc(desc)}</td></tr>`)
  .join('\n');

// ---------------------------------------------------------------- M. Fable作業後チェック

const fableChecks = [
  'pnpm typecheck は通ったか',
  'pnpm check は通ったか',
  'pnpm export は通ったか',
  'exports/index.html は更新されたか(生成日時を見る)',
  'missing素材は増えていないか',
  'generated_preview を final 扱いしていないか',
  'approved / final に勝手に昇格していないか',
  '既存テンプレの見た目を壊していないか(stillで比較)',
  'Root.tsx の defaultProps が意図せず変わっていないか(git diff)',
  'CapCut作業表(opening-timeline.csv/md)が更新されているか',
];

const fableHtml = fableChecks.map((c) => `<li>${esc(c)}</li>`).join('\n');

// ---------------------------------------------------------------- HTML組み立て

const generatedAt = new Date().toISOString().slice(0, 16).replace('T', ' ');

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>結婚式ムービー制作コックピット</title>
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
    padding: 32px 24px 24px;
    border-bottom: 3px solid var(--gold);
  }
  .header-inner { max-width: 960px; margin: 0 auto; }
  header h1 { margin: 0; font-size: 24px; letter-spacing: 0.16em; font-weight: 600; }
  header .couple { margin-top: 6px; font-size: 15px; letter-spacing: 0.3em; color: var(--gold-light); }
  header p { margin: 6px 0 0; opacity: 0.75; font-size: 12px; letter-spacing: 0.06em; }
  header code { background: rgba(255,255,255,0.12); color: #f4eee3; }
  main { max-width: 960px; margin: 0 auto; padding: 28px 20px 64px; }
  section {
    background: #fff;
    border: 1px solid #e2dac9;
    border-radius: 10px;
    padding: 22px 26px;
    margin-bottom: 26px;
    box-shadow: 0 2px 10px rgba(29,42,68,0.06);
  }
  h2 {
    margin: 0 0 14px;
    font-size: 17px;
    letter-spacing: 0.14em;
    color: var(--navy);
    border-bottom: 1px solid var(--gold);
    padding-bottom: 8px;
  }
  h3 { margin: 16px 0 6px; font-size: 14px; color: var(--navy); }
  h4 { margin: 14px 0 4px; font-size: 13px; color: var(--navy); letter-spacing: 0.06em; }
  ul { margin: 6px 0; padding-left: 22px; }
  li { margin: 5px 0; }
  a { color: #3b5a8a; }
  code {
    font-family: "SF Mono", Menlo, monospace;
    font-size: 12.5px;
    background: #f0ebe0;
    padding: 1px 6px;
    border-radius: 4px;
    word-break: break-all;
  }
  table { border-collapse: collapse; width: 100%; }
  td { padding: 7px 10px; border-bottom: 1px solid #ece5d6; vertical-align: top; font-size: 13.5px; }
  table.mini td:first-child { white-space: normal; min-width: 120px; color: #6d614b; }
  .muted { color: #8a8273; font-size: 12.5px; }
  .indent { margin-left: 76px; display: inline-block; }
  .badge {
    display: inline-block; color: #fff; font-size: 11px; letter-spacing: 0.06em;
    padding: 1px 9px; border-radius: 9px; font-family: Menlo, monospace; vertical-align: middle;
  }
  .prio {
    display: inline-block; color: #fff; font-size: 11px; font-weight: bold;
    padding: 1px 9px; border-radius: 4px; font-family: Menlo, monospace;
    min-width: 58px; text-align: center; margin-right: 6px;
  }
  .prompt-todo { color: #9a3d3d; font-weight: bold; }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
  .card {
    border: 1px solid #e2dac9; border-radius: 8px; padding: 12px 16px;
    background: #fdfbf6; font-size: 13.5px;
  }
  .card strong { color: var(--navy); }
  .stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
  .stat {
    border: 1px solid #e2dac9; border-radius: 8px; padding: 10px 12px;
    background: #fdfbf6; text-align: center;
  }
  .stat-value { font-size: 22px; color: var(--navy); font-weight: 600; }
  .stat-label { font-size: 12px; color: #6d614b; margin-top: 2px; }
  .stat-hint { font-size: 10.5px; color: #a89e8a; margin-top: 2px; }
  details { margin: 8px 0; }
  summary {
    cursor: pointer; padding: 8px 10px; background: #faf6ec;
    border: 1px solid #e8e0cd; border-radius: 6px; font-size: 14px;
  }
  summary:hover { background: #f4edda; }
  .scene-body { padding: 12px 14px; border: 1px solid #ece5d6; border-top: none; border-radius: 0 0 6px 6px; }
  .scene-no {
    display: inline-block; background: var(--gold); color: #fff;
    width: 22px; height: 22px; line-height: 22px; text-align: center;
    border-radius: 50%; font-size: 12px; font-family: Menlo, monospace; margin-right: 4px;
  }
  .note {
    background: #faf6ec; border-left: 3px solid var(--gold);
    padding: 10px 16px; font-size: 13px; color: #6d614b; margin-top: 12px;
  }
  .todo-item { list-style: none; margin: 9px 0; }
  section > ul.todos { padding-left: 0; }
  @media (max-width: 600px) {
    main { padding: 16px 10px 48px; }
    section { padding: 16px 14px; }
    .indent { margin-left: 0; }
  }
</style>
</head>
<body>

<header>
  <div class="header-inner">
    <h1>結婚式ムービー制作コックピット</h1>
    <div class="couple">${esc(openingProject.coupleDisplay)} — ${esc(openingProject.dateDisplay)} / ${esc(openingProject.venueDisplay)}</div>
    <p>生成: ${generatedAt} — このページは<strong>編集ページではなく確認入口</strong>。状態は保存されない。更新は <code>pnpm export</code></p>
    <p>最初にやる: <code>pnpm dev</code>(Studio) / <code>pnpm export</code>(このページ更新) / <code>pnpm check</code>(整合確認)</p>
  </div>
</header>

<main>

<section>
  <h2>重要リンク</h2>
  <div class="cards">
    <div class="card"><strong>Remotion Studio</strong><br>ターミナルで <code>pnpm dev</code><br><span class="muted">見た目確認・props微調整</span></div>
    <div class="card"><strong>Studio操作ガイド</strong><br><a href="../docs/remotion-studio-guide.md">docs/remotion-studio-guide.md</a><br><span class="muted">.mdはVS Code / Finderで開くと読みやすい</span></div>
    <div class="card"><strong>レビューHTML</strong><br><a href="./review-gallery/opening/review.html">review.html</a><br><span class="muted">シーン×素材×品質チェック</span></div>
    <div class="card"><strong>CapCut作業表(MD)</strong><br><a href="./capcut/opening-timeline.md">opening-timeline.md</a><br><span class="muted">VS Codeで開く前提</span></div>
    <div class="card"><strong>CapCut作業表(CSV)</strong><br><a href="./capcut/opening-timeline.csv">opening-timeline.csv</a><br><span class="muted">Numbers / Excelで開ける</span></div>
    <div class="card"><strong>本番未確定素材一覧</strong><br><a href="./capcut/opening-missing-assets.md">opening-missing-assets.md</a><br><span class="muted">これを空にするのがゴール</span></div>
  </div>
</section>

<section>
  <h2>全体サマリー</h2>
  <div class="stats">
${summaryHtml}
  </div>
</section>

<section>
  <h2>今日やること(優先度つき)</h2>
  <ul class="todos">
${todoHtml}
  </ul>
  <p class="note">candidate以上への昇格は人間(新郎新婦)の確認が必須。AIが勝手に上げない。</p>
</section>

<section>
  <h2>シーン別の状態(${sceneCount}シーン / Remotion素材${baseSec}秒)</h2>
  <p class="muted">todoのシーンは開いた状態で表示。クリックで開閉。</p>
${sceneCards}
</section>

<section>
  <h2>Compositionを見る順番</h2>
  <p class="muted">Remotion Studio(<code>pnpm dev</code>)で迷ったらこの順に見る。</p>
${compoHtml}
</section>

<section>
  <h2>Studio操作ミニガイド</h2>
  <ul>
    <li>左のComposition一覧から選ぶ → 中央でスペースキー再生 → 右のpropsで一時調整</li>
    <li>propsは<strong>変えただけでは保存されない</strong>(リロードで元に戻る)</li>
    <li><strong>Save defaultsはRoot.tsxを書き換える</strong>。保存前後に <code>git diff motion-studio/src/Root.tsx</code></li>
    <li>迷ったら保存しない。意図しない保存は <code>git checkout -- motion-studio/src/Root.tsx</code> で戻す</li>
    <li>シーン順・尺はStudioではなく <code>openingProject.ts</code> で変える(変更後 <code>pnpm check</code>)</li>
  </ul>
  <p class="muted">詳しくは <a href="../docs/remotion-studio-guide.md">docs/remotion-studio-guide.md</a></p>
</section>

<section>
  <h2>素材ステータスの意味</h2>
  <table class="mini">
${statusDescHtml}
  </table>
  <p class="note">candidate以上はAIが勝手に上げない / approved・finalはファイル欠損でcheckエラー / generated_previewは本番素材ではない</p>
</section>

<section>
  <h2>素材一覧(status別)</h2>
${assetListHtml}
</section>

<section>
  <h2>再利用パーツ(parts/)</h2>
  <p class="muted">確認Composition: <code>文字部品-確認</code>(30-部品確認)</p>
  <table class="mini">
${partsHtml}
  </table>
</section>

<section>
  <h2>AIプロンプト履歴(${aiPromptRecords.length}件)</h2>
  <p class="muted">AI素材の出どころ。promptが<span class="prompt-todo">TODO</span>のものは実プロンプト転記待ち。</p>
  <table class="mini">
${aiHtml}
  </table>
</section>

<section>
  <h2>コマンド集</h2>
  <table class="mini">
${commandRows}
  </table>
</section>

<section>
  <h2>Fable / Codex 作業後の確認観点</h2>
  <ul>
${fableHtml}
  </ul>
</section>

</main>
</body>
</html>
`;

const outPath = join(outDir, 'index.html');
writeFileSync(outPath, html);
console.log(
  `✅ exports/index.html (シーン${sceneCount} / 素材${allAssets.length} / TODO${todos.length}件 / パーツ${parts.length} / AIプロンプト${aiPromptRecords.length})`,
);
