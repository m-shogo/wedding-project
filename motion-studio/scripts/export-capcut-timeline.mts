// pnpm export:capcut
// openingProject.tsを単一情報源として、CapCut作業用ファイルを生成する。
//
// 出力:
//   exports/capcut/opening-timeline.csv       CapCut作業表(表計算で開く用)
//   exports/capcut/opening-timeline.md        同・Markdown版(目視用)
//   exports/capcut/opening-missing-assets.md  本番に使えない素材の一覧
//
// 生成物の方針: CSV/MD/HTMLはGit管理してよい。動画・画像はexports/に置かない。

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {openingProject} from '../src/data/openingProject.ts';
import {assets} from '../src/data/assets.ts';
import type {AssetStatus} from '../src/data/assets.ts';
import {templateById} from '../src/data/sceneRegistry.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'exports/capcut');
mkdirSync(outDir, {recursive: true});

const mmss = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const csvEscape = (v: string): string =>
  /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;

// 本番使用してはいけない(または使えない)status。
// external は「repo外管理」であり採用段階ではないため本番未確定扱いにする。
const NOT_PRODUCTION_READY: AssetStatus[] = [
  'missing',
  'idea',
  'prompt_ready',
  'generated_preview',
  'external',
];

type Row = {
  scene_id: string;
  start: string;
  end: string;
  duration_sec: string;
  template: string;
  render_output_path: string;
  render_kind: string;
  render_command: string;
  visual: string;
  caption: string;
  bgm_note: string;
  se_note: string;
  asset_ids: string;
  asset_statuses: string;
  asset_paths: string;
  scene_status: string;
  notes: string;
};

const rows: Row[] = [];
let cursor = 0;

for (const scene of openingProject.scenes) {
  const start = cursor;
  const end = cursor + scene.durationSec;
  cursor = end;

  const sceneAssets = scene.assets.map((id) => assets[id]).filter(Boolean);
  const cautionAssets = sceneAssets.filter((a) =>
    NOT_PRODUCTION_READY.includes(a.status),
  );
  const autoNotes =
    cautionAssets.length > 0
      ? `【注意】本番未確定素材あり: ${cautionAssets
          .map((a) => `${a.id}(${a.status})`)
          .join(', ')}`
      : '';
  const t = templateById(scene.template);

  // render出力パスをsceneRegistryのkindとoutputから導出する
  let renderOutputPath = '';
  let renderKind = '';
  let renderCommand = '';
  if (t && t.kind !== 'preview-only' && t.output) {
    const ext = t.kind === 'alpha' ? '.webm' : '.mp4';
    renderOutputPath = `out/${t.output}${ext}`;
    renderKind = t.kind;
    renderCommand = `pnpm render ${t.id} final`;
  } else if (t?.kind === 'preview-only') {
    renderKind = 'preview-only';
  }

  rows.push({
    scene_id: scene.id,
    start: mmss(start),
    end: mmss(end),
    duration_sec: String(scene.durationSec),
    template: scene.template,
    render_output_path: renderOutputPath,
    render_kind: renderKind,
    render_command: renderCommand,
    visual: `${scene.title}${t ? ` — ${t.description}` : ''}`,
    caption: scene.caption ?? '',
    bgm_note: scene.bgmNote ?? '',
    se_note: scene.seNote ?? '',
    asset_ids: scene.assets.join(' / '),
    asset_statuses: sceneAssets.map((a) => a.status).join(' / '),
    asset_paths: sceneAssets.map((a) => a.path).join(' / '),
    scene_status: scene.status,
    notes: [scene.notes, autoNotes].filter(Boolean).join(' '),
  });
}

// ---- CSV ----
const header = [
  'scene_id',
  'start',
  'end',
  'duration_sec',
  'template',
  'render_output_path',
  'render_kind',
  'render_command',
  'visual',
  'caption',
  'bgm_note',
  'se_note',
  'asset_ids',
  'asset_statuses',
  'asset_paths',
  'scene_status',
  'notes',
] as const;

const csv = [
  header.join(','),
  ...rows.map((r) => header.map((h) => csvEscape(r[h])).join(',')),
].join('\n');
writeFileSync(join(outDir, 'opening-timeline.csv'), `${csv}\n`);

// ---- Markdown ----
const totalSec = openingProject.scenes.reduce((s, x) => s + x.durationSec, 0);
const md = `# オープニング CapCut作業表

自動生成: \`pnpm export:capcut\`(単一情報源は \`src/data/openingProject.ts\`。このファイルを直接編集しない)

- Remotion素材合計: ${totalSec}s / CapCut目標尺: ${openingProject.capcutTargetSec}s(差はCapCutの間で演出)
- 上映日: ${openingProject.date} / ${openingProject.venueDisplay}

| # | 時間 | シーン | テンプレ | scene status | テロップ | BGMメモ | SEメモ | 素材(status) | 注意 |
|---|------|--------|----------|--------------|----------|---------|--------|--------------|------|
${rows
  .map(
    (r, i) =>
      `| ${i + 1} | ${r.start}–${r.end} | ${r.scene_id} | ${r.template} | ${r.scene_status} | ${r.caption || '-'} | ${r.bgm_note || '-'} | ${r.se_note || '-'} | ${
        r.asset_ids
          ? r.asset_ids
              .split(' / ')
              .map((id, j) => `${id}(${r.asset_statuses.split(' / ')[j] ?? '?'})`)
              .join('<br>')
          : '-'
      } | ${r.notes || '-'} |`,
  )
  .join('\n')}
`;
writeFileSync(join(outDir, 'opening-timeline.md'), md);

// ---- missing assets ----
const statusOrder: AssetStatus[] = [
  'missing',
  'idea',
  'prompt_ready',
  'generated_preview',
  'candidate',
  'external',
];

// scene.assetsから直接参照されているasset → 使用シーンマップ
const usedBy = new Map<string, string[]>();
for (const scene of openingProject.scenes) {
  for (const id of scene.assets) {
    usedBy.set(id, [...(usedBy.get(id) ?? []), scene.id]);
  }
}

// render素材のregenerateCommandからテンプレートIDを抽出する
// 例: "pnpm render 搭乗券 final" → "搭乗券"
const templateIdFromRenderCommand = (cmd: string | undefined): string | undefined => {
  if (!cmd) return undefined;
  const m = cmd.match(/^pnpm render (.+?) (?:final|draft|preview|prores)/);
  return m?.[1];
};

// テンプレートIDからシーンIDへのマップ(render素材のシーン推定用)
const templateToSceneIds = new Map<string, string[]>();
for (const scene of openingProject.scenes) {
  const arr = templateToSceneIds.get(scene.template) ?? [];
  arr.push(scene.id);
  templateToSceneIds.set(scene.template, arr);
}

// render素材の使用シーンを推定する(scene.assetsに直接入っていないrender素材向け)
const inferSceneIds = (assetId: string, asset: {type: string; regenerateCommand?: string}): string[] => {
  const direct = usedBy.get(assetId);
  if (direct && direct.length > 0) return direct;
  if (asset.type === 'render') {
    const templateId = templateIdFromRenderCommand(asset.regenerateCommand);
    if (templateId) {
      const inferred = templateToSceneIds.get(templateId);
      if (inferred && inferred.length > 0) return inferred;
    }
  }
  return [];
};

const sections = statusOrder
  .map((status) => {
    const list = Object.values(assets).filter((a) => a.status === status);
    if (list.length === 0) {
      return '';
    }
    const items = list
      .map((a) => {
        const sceneIds = inferSceneIds(a.id, a);
        return [
          `- **${a.id}** — ${a.usage}`,
          `  - path: \`${a.path}\``,
          `  - 使用シーン: ${sceneIds.length > 0 ? sceneIds.join(', ') : '(シーンから未参照)'}`,
          a.regenerateCommand ? `  - 再生成: \`${a.regenerateCommand}\`` : null,
          a.recoveryNote ? `  - 確認/復旧メモ: ${a.recoveryNote}` : null,
          a.note ? `  - メモ: ${a.note}` : null,
        ]
          .filter(Boolean)
          .join('\n');
      })
      .join('\n');
    return `## ${status} (${list.length}件)\n\n${items}\n`;
  })
  .filter(Boolean)
  .join('\n');

const missingMd = `# 本番未確定素材の一覧

自動生成: \`pnpm export:capcut\`。CapCutで本編を確定する前に、この表を空にする
(全素材を approved / final / external にする)のがゴール。

**ルール: candidate以上への昇格は人間の確認が必須。AIが勝手に昇格させない。**

${sections || '(本番未確定素材なし)'}
`;
writeFileSync(join(outDir, 'opening-missing-assets.md'), missingMd);

console.log(`✅ exports/capcut/opening-timeline.csv (${rows.length}シーン)`);
console.log('✅ exports/capcut/opening-timeline.md');
console.log('✅ exports/capcut/opening-missing-assets.md');
