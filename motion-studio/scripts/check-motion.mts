// pnpm check:motion
// openingProject・sceneRegistry・Root.tsxの整合性を検証する。
// 失敗時はexit 1。エラーは ❌、警告は ⚠️、情報は ℹ️ で出す。

import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {openingProject} from '../src/data/openingProject.ts';
import {openingProjectSchema} from '../src/data/openingProject.schema.ts';
import {templates} from '../src/data/sceneRegistry.ts';
import {assets} from '../src/data/assets.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let errors = 0;
let warnings = 0;

const err = (msg: string) => {
  errors++;
  console.error(`❌ ${msg}`);
};
const warn = (msg: string) => {
  warnings++;
  console.warn(`⚠️  ${msg}`);
};
const info = (msg: string) => console.log(`ℹ️  ${msg}`);
const ok = (msg: string) => console.log(`✅ ${msg}`);

// ---- 1. openingProjectのスキーマ検証 ----
const parsed = openingProjectSchema.safeParse(openingProject);
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    err(`openingProject: ${issue.path.join('.')} → ${issue.message}`);
  }
} else {
  ok('openingProject: スキーマ検証OK');
}

// ---- 2. registry自体の健全性 ----
const ids = templates.map((t) => t.id);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
for (const d of new Set(dupIds)) {
  err(`sceneRegistry: テンプレートIDが重複: ${d}`);
}
const outputs = templates.filter((t) => t.output).map((t) => t.output);
const dupOuts = outputs.filter((o, i) => outputs.indexOf(o) !== i);
for (const d of new Set(dupOuts)) {
  err(`sceneRegistry: 出力パスが重複: ${d}`);
}
for (const t of templates) {
  if (t.durationInFrames <= 0) {
    err(`sceneRegistry: ${t.id} のdurationInFramesが0以下`);
  }
  if (t.kind !== 'preview-only' && !t.output) {
    err(`sceneRegistry: ${t.id} は書き出し対象なのにoutputが未設定`);
  }
}

// ---- 3. Root.tsxとregistryの不整合チェック ----
const rootSrc = readFileSync(join(root, 'src/Root.tsx'), 'utf8');
const compRegex = /id="([^"]+)"[\s\S]*?durationInFrames=\{(\d+)\}/g;
const rootComps = new Map<string, number>();
for (const m of rootSrc.matchAll(compRegex)) {
  rootComps.set(m[1], Number(m[2]));
}
if (rootComps.size === 0) {
  err('Root.tsx: Compositionを1つも検出できなかった(パターン変更の可能性)');
}
for (const t of templates) {
  if (!rootComps.has(t.id)) {
    err(`registryにあるがRoot.tsxに無い: ${t.id} → Root.tsxに<Composition>を追加する`);
  } else if (rootComps.get(t.id) !== t.durationInFrames) {
    err(
      `尺の不整合: ${t.id} → Root.tsx=${rootComps.get(t.id)}f / registry=${t.durationInFrames}f`,
    );
  }
}
for (const [id] of rootComps) {
  if (!templates.some((t) => t.id === id)) {
    err(`Root.tsxにあるがregistryに無い: ${id} → sceneRegistry.tsにエントリを追加する`);
  }
}
if (errors === 0) {
  ok(`Root.tsx ↔ registry: ${rootComps.size}テンプレートの整合OK`);
}

// ---- 4. シーン構成の検証 ----
let totalSec = 0;
for (const scene of openingProject.scenes) {
  totalSec += scene.durationSec;
  const t = templates.find((x) => x.id === scene.template);
  if (!t) {
    err(`scene "${scene.id}": template "${scene.template}" がregistryに存在しない`);
    continue;
  }
  const templateSec = t.durationInFrames / openingProject.fps;
  if (scene.durationSec > templateSec + 0.01) {
    warn(
      `scene "${scene.id}": 使用尺${scene.durationSec}s > テンプレ尺${templateSec}s。` +
        `テンプレのdurationInFramesを伸ばすかシーンを短くする`,
    );
  }
  for (const assetId of scene.assets) {
    if (!assets[assetId]) {
      err(`scene "${scene.id}": 素材ID "${assetId}" がassets.tsに存在しない`);
    }
  }
}
const sceneIds = openingProject.scenes.map((s) => s.id);
for (const d of new Set(sceneIds.filter((id, i) => sceneIds.indexOf(id) !== i))) {
  err(`openingProject: scene idが重複: ${d}`);
}

// 開幕-全体確認(openingProject連動)の尺がシーン合計と一致しているか
const fullPreview = templates.find((t) => t.id === '開幕-全体確認');
const expectedPreviewFrames = Math.round(totalSec * openingProject.fps);
if (fullPreview && fullPreview.durationInFrames !== expectedPreviewFrames) {
  err(
    `開幕-全体確認の尺がシーン合計と不一致: registry=${fullPreview.durationInFrames}f / ` +
      `scenes合計=${expectedPreviewFrames}f → Root.tsxとsceneRegistry.tsの両方を${expectedPreviewFrames}に更新する`,
  );
}

const drift = Math.abs(totalSec - openingProject.targetTotalSec);
if (drift > openingProject.targetTotalSec * 0.15) {
  warn(
    `シーン合計${totalSec}s が目標${openingProject.targetTotalSec}s から大きく乖離。` +
      `CapCutの間(ま)で吸収できる範囲か確認する`,
  );
} else {
  info(`シーン合計 ${totalSec}s / 目標 ${openingProject.targetTotalSec}s(CapCutの間で調整)`);
}

// ---- 結果 ----
console.log('');
if (errors > 0) {
  console.error(`check:motion 失敗 — エラー${errors}件 / 警告${warnings}件`);
  process.exit(1);
}
console.log(`check:motion 成功 — 警告${warnings}件`);
