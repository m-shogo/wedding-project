// pnpm check:assets
// 素材の実ファイル存在と「制作段階の混同」を検証する。
//
// パス解決ルール:
//   public/... out/... → motion-studio/ 相対
//   ../...             → リポジトリルート相対
//   ~ or /             → ローカル絶対(external前提。チェック対象外)
//
// status別の存在チェック:
//   final / approved   → 無ければ ❌ エラー(本番確定素材が消えている)
//   candidate          → 無ければ ⚠️ 警告
//   generated_preview  → 無ければ ℹ️ 情報(再生成コマンドを案内)。本番扱いしない
//   prompt_ready/idea/missing → ℹ️ 情報のみ
//   external           → スキップ
//
// シーン×素材の混同チェック:
//   final scene    に missing/idea/prompt_ready/generated_preview/candidate → ❌
//   approved scene に missing/idea/prompt_ready → ❌
//   draft/todo scene は制限なし(情報表示のみ)
//
// out/とpublic/photos/はGit管理外なので、fresh cloneでもこのチェックは通る。

import {existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import type {AssetStatus} from '../src/data/assets.ts';
import {openingProject} from '../src/data/openingProject.ts';
import {aiPromptRecords} from '../src/data/aiPromptRegistry.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
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

const resolvePath = (p: string): string | null => {
  if (p.startsWith('~') || p.startsWith('/')) {
    return null;
  }
  return resolve(studioRoot, p);
};

const fileExists = (p: string): boolean => {
  const abs = resolvePath(p);
  return abs !== null && existsSync(abs);
};

// ---- 1. 素材ごとの存在チェック ----
console.log(`素材レジストリ: ${Object.keys(assets).length}件\n`);

for (const asset of Object.values(assets)) {
  const tag = `[${asset.status}] ${asset.id}`;
  switch (asset.status) {
    case 'external':
      console.log(`ℹ️  ${tag} — repo外管理 (${asset.path})`);
      break;
    case 'missing':
      console.log(`ℹ️  ${tag} — 入手待ち${asset.note ? `: ${asset.note}` : ''}`);
      break;
    case 'idea':
      console.log(`ℹ️  ${tag} — アイデア段階${asset.note ? `: ${asset.note}` : ''}`);
      break;
    case 'prompt_ready':
      console.log(`ℹ️  ${tag} — 生成準備済み${asset.note ? `: ${asset.note}` : ''}`);
      break;
    case 'generated_preview': {
      // regenerateCommand(実行コマンド)か recoveryNote(人間向けメモ)のどちらかが必須。
      // 両方無い場合は手がかりが無いためwarning。
      if (!asset.regenerateCommand && !asset.recoveryNote) {
        warn(
          `${tag} — regenerateCommandもrecoveryNoteも無い(generated_previewは再生成手段または復旧メモを必ず書く)`,
        );
      }
      if (fileExists(asset.path)) {
        console.log(`✅ ${tag} — ${asset.path}(試作。本番使用不可)`);
      } else {
        const lines: string[] = [`ℹ️  ${tag} — 未生成`];
        if (asset.regenerateCommand) {
          lines.push(`   → 再生成: ${asset.regenerateCommand}`);
        }
        if (asset.recoveryNote) {
          lines.push(`   → 確認/復旧メモ: ${asset.recoveryNote}`);
        }
        console.log(lines.join('\n'));
      }
      break;
    }
    case 'candidate': {
      if (asset.type === 'render' && !asset.regenerateCommand) {
        warn(`${tag} — render系candidateにregenerateCommandが無い`);
      }
      if (fileExists(asset.path)) {
        console.log(`✅ ${tag} — ${asset.path}(採用候補。本番確定ではない)`);
      } else {
        warn(`${tag} — 採用候補なのにファイルが無い: ${asset.path}`);
      }
      break;
    }
    case 'approved':
    case 'final': {
      if (fileExists(asset.path)) {
        console.log(`✅ ${tag} — ${asset.path}`);
      } else {
        err(
          `${tag} — 本番系素材のファイルが無い: ${asset.path}` +
            (asset.regenerateCommand ? `\n   → 再生成: ${asset.regenerateCommand}` : ''),
        );
      }
      break;
    }
  }
}

// ---- 2. シーン×素材の制作段階混同チェック ----
console.log('');
const forbidden: Record<string, AssetStatus[]> = {
  final: ['missing', 'idea', 'prompt_ready', 'generated_preview', 'candidate'],
  approved: ['missing', 'idea', 'prompt_ready'],
};

for (const scene of openingProject.scenes) {
  const banned = forbidden[scene.status];
  if (!banned) {
    continue;
  }
  for (const assetId of scene.assets) {
    const asset = assets[assetId];
    if (!asset) {
      continue; // 存在しないIDはcheck:motionが検出する
    }
    if (banned.includes(asset.status)) {
      err(
        `scene "${scene.id}" (${scene.status}) に未承認素材が混入: ` +
          `${assetId} (${asset.status}) → 素材を昇格するかsceneのstatusを下げる`,
      );
    }
  }
}
if (errors === 0) {
  console.log('✅ シーン×素材の制作段階: 混同なし');
}

// ---- 3. aiPromptRegistryの整合チェック ----
const promptIds = aiPromptRecords.map((r) => r.id);
for (const d of new Set(promptIds.filter((id, i) => promptIds.indexOf(id) !== i))) {
  err(`aiPromptRegistry: idが重複: ${d}`);
}
const sceneIds = new Set(openingProject.scenes.map((s) => s.id));
for (const rec of aiPromptRecords) {
  if (!assets[rec.assetId]) {
    err(`aiPromptRegistry "${rec.id}": assetId "${rec.assetId}" がassets.tsに存在しない`);
  }
  if (rec.sceneId && !sceneIds.has(rec.sceneId)) {
    warn(`aiPromptRegistry "${rec.id}": sceneId "${rec.sceneId}" がopeningProjectに存在しない`);
  }
  if (rec.resultPath) {
    const asset = assets[rec.assetId];
    if (asset && asset.status !== 'external' && asset.path !== rec.resultPath) {
      warn(
        `aiPromptRegistry "${rec.id}": resultPath (${rec.resultPath}) が ` +
          `assets.tsのpath (${asset.path}) と一致しない`,
      );
    }
  }
  if ((rec.status === 'approved' || rec.status === 'final') && !rec.resultPath) {
    warn(`aiPromptRegistry "${rec.id}": ${rec.status}なのにresultPathが無い`);
  }
}
console.log(`✅ aiPromptRegistry: ${aiPromptRecords.length}レコード検証`);

// ---- 4. シーンから参照されていない素材(掃除の参考) ----
const used = new Set(openingProject.scenes.flatMap((s) => s.assets));
const unused = Object.keys(assets).filter(
  (id) => !used.has(id) && assets[id].type !== 'render',
);
if (unused.length > 0) {
  console.log(`\nℹ️  どのシーンからも参照されていない素材(render以外): ${unused.join(', ')}`);
}

console.log('');
if (errors > 0) {
  console.error(`check:assets 失敗 — エラー${errors}件 / 警告${warnings}件`);
  process.exit(1);
}
if (warnings > 0) {
  console.warn(`check:assets — 警告${warnings}件`);
}
console.log('check:assets 成功');
