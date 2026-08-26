// pnpm check:motion
// 旧短尺テンプレート群(openingProject / sceneRegistry / Root.tsx)の整合性を検証する。
// 現行60秒Opening V1の正本ではない。Opening V1は専用Composition / sound / visual QAで検証する。

import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {openingProject} from '../src/data/openingProject.ts';
import {openingProjectSchema} from '../src/data/openingProject.schema.ts';
import {templates} from '../src/data/sceneRegistry.ts';
import {assets} from '../src/data/assets.ts';
import {resolveHandoffSidecarSchema} from '../src/data/resolveHandoff.schema.ts';
import {resolve21AlphaHandoffPolicy} from '../src/data/resolveHandoffPolicy.ts';
import {generatedAssetProvenanceSchema} from '../src/data/generatedAsset.schema.ts';
import {generatedVideoProvenancePolicy} from '../src/data/generatedAssetPolicy.ts';

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

info('LEGACY CHECK: openingProject / sceneRegistry / Root.tsx。現行Opening V1は別系統で検証');

// ---- 0. cross-tool handoff / generated-asset contracts ----
const handoffParsed = resolveHandoffSidecarSchema.safeParse(resolve21AlphaHandoffPolicy);
if (!handoffParsed.success) {
  for (const issue of handoffParsed.error.issues) {
    err(`Resolve handoff contract: ${issue.path.join('.')} → ${issue.message}`);
  }
} else {
  ok('Resolve 21 handoff sidecar policy: runtime parse OK');
}

const generatedAssetParsed = generatedAssetProvenanceSchema.safeParse(generatedVideoProvenancePolicy);
if (!generatedAssetParsed.success) {
  for (const issue of generatedAssetParsed.error.issues) {
    err(`generated asset provenance: ${issue.path.join('.')} → ${issue.message}`);
  }
} else {
  ok('generated asset provenance policy: runtime parse OK');
}

// ---- 1. legacy openingProject schema ----
const parsed = openingProjectSchema.safeParse(openingProject);
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    err(`legacy openingProject: ${issue.path.join('.')} → ${issue.message}`);
  }
} else {
  ok('legacy openingProject: スキーマ検証OK');
}

// ---- 2. legacy registry ----
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

// ---- 3. legacy Root.tsx ↔ registry ----
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
    err(`registryにあるがRoot.tsxに無い: ${t.id}`);
  } else if (rootComps.get(t.id) !== t.durationInFrames) {
    err(
      `尺の不整合: ${t.id} → Root.tsx=${rootComps.get(t.id)}f / registry=${t.durationInFrames}f`,
    );
  }
}
for (const [id] of rootComps) {
  if (!templates.some((t) => t.id === id)) {
    err(`Root.tsxにあるがregistryに無い: ${id}`);
  }
}
if (errors === 0) {
  ok(`legacy Root.tsx ↔ registry: ${rootComps.size}テンプレートの整合OK`);
}

// ---- 4. legacy sequence ----
let totalSec = 0;
for (const scene of openingProject.scenes) {
  totalSec += scene.durationSec;
  const t = templates.find((x) => x.id === scene.template);
  if (!t) {
    err(`legacy scene "${scene.id}": template "${scene.template}" がregistryに存在しない`);
    continue;
  }
  const templateSec = t.durationInFrames / openingProject.fps;
  if (scene.durationSec > templateSec + 0.01) {
    warn(`legacy scene "${scene.id}": 使用尺${scene.durationSec}s > テンプレ尺${templateSec}s`);
  }
  for (const assetId of scene.assets) {
    if (!assets[assetId]) {
      err(`legacy scene "${scene.id}": 素材ID "${assetId}" がassets.tsに存在しない`);
    }
  }
}

const sceneIds = openingProject.scenes.map((s) => s.id);
for (const d of new Set(sceneIds.filter((id, i) => sceneIds.indexOf(id) !== i))) {
  err(`legacy openingProject: scene idが重複: ${d}`);
}

const fullPreview = templates.find((t) => t.id === '開幕-全体確認');
const expectedPreviewFrames = Math.round(totalSec * openingProject.fps);
if (fullPreview && fullPreview.durationInFrames !== expectedPreviewFrames) {
  err(
    `legacy 開幕-全体確認の尺がシーン合計と不一致: registry=${fullPreview.durationInFrames}f / ` +
      `scenes合計=${expectedPreviewFrames}f`,
  );
}

// 82s/105sは旧CapCut制作系の情報。現行60s Opening V1の目標値ではない。
if (totalSec > openingProject.capcutTargetSec) {
  warn(
    `LEGACY: 短尺素材合計${totalSec}s が旧CapCut目標${openingProject.capcutTargetSec}sを超過`,
  );
} else {
  info(
    `LEGACY ONLY: 短尺素材合計 ${totalSec}s / 旧CapCut目標 ${openingProject.capcutTargetSec}s。` +
      '現行Opening V1は60s Remotion正本のため、この差分で完成尺を判断しない',
  );
}

console.log('');
if (errors > 0) {
  console.error(`check:motion 失敗 — エラー${errors}件 / 警告${warnings}件`);
  process.exit(1);
}
console.log(`check:motion 成功 — 警告${warnings}件`);
