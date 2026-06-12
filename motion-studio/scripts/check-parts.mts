// pnpm check:parts
// partRegistry.ts(再利用パーツのメタデータ)の健全性を検証する。
// 失敗時はexit 1。エラーは ❌、警告は ⚠️。

import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';
import {parts} from '../src/data/partRegistry.ts';
import type {PartCategory, PartStatus} from '../src/data/partRegistry.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

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

const CATEGORIES: PartCategory[] = ['text', 'photo', 'layout', 'effect'];
const STATUSES: PartStatus[] = ['draft', 'approved', 'deprecated'];
const ID_RE = /^[a-z0-9-]+$/;

// 今回登録されているべきtextパーツ(消えたら検出する)
const REQUIRED_IDS = [
  'text-fade-up-caption',
  'text-mask-reveal-title',
  'text-elegant-lower-third',
];

// text/index.ts の内容を読み込む(Reactを直importせずexport整合を確認する)
const textIndexPath = join(rootDir, 'src/components/parts/text/index.ts');
let textIndexContent = '';
try {
  textIndexContent = readFileSync(textIndexPath, 'utf-8');
} catch {
  err(`text/index.ts が読み込めない: ${textIndexPath}`);
}

// 承認理由に使われる文言パターン
const APPROVAL_KEYWORDS = /承認|確認済み|approved|レビュー済み|確定/i;

console.log(`パーツレジストリ: ${parts.length}件\n`);

// id重複
const ids = parts.map((p) => p.id);
for (const d of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) {
  err(`partRegistry: idが重複: ${d}`);
}

for (const p of parts) {
  // --- 基本フォーマット ---
  if (!ID_RE.test(p.id)) {
    err(`${p.id}: idは英小文字・数字・ハイフンのみ`);
  }
  if (!CATEGORIES.includes(p.category)) {
    err(`${p.id}: categoryが不正 (${p.category})`);
  }
  if (!STATUSES.includes(p.status)) {
    err(`${p.id}: statusが不正 (${p.status})`);
  }
  if (p.allowedIn.length === 0) {
    warn(`${p.id}: allowedInが空(どのムービーで使えるか明示する)`);
  }

  // --- 必須フィールドが空でないか ---
  if (p.category === 'text' && !p.name.trim()) {
    err(`${p.id}: textカテゴリのnameが空`);
  }
  if (!p.description.trim()) {
    err(`${p.id}: descriptionが空`);
  }
  if (!p.usage.trim()) {
    err(`${p.id}: usageが空`);
  }

  // --- textカテゴリ: 実コンポーネントがtext/index.tsでexportされているか ---
  if (p.category === 'text' && textIndexContent) {
    if (!textIndexContent.includes(p.name)) {
      err(
        `${p.id}: name "${p.name}" が text/index.ts でexportされていない` +
          `(パーツ追加時はindex.tsへのexportも必須)`,
      );
    }
  }

  // --- approved時は承認理由をnotesに残す(AIが勝手にapprovedにしないためのガード) ---
  if (p.status === 'approved') {
    if (!p.notes || !APPROVAL_KEYWORDS.test(p.notes)) {
      warn(
        `${p.id}: status=approvedだがnotesに承認理由が見つからない` +
          `(「確認済み」「承認」等の文言をnotesに書く)`,
      );
    }
  }

  console.log(`ℹ️  [${p.status}] ${p.id} (${p.category}) — ${p.usage}`);
}

// 必須パーツの存在
for (const required of REQUIRED_IDS) {
  if (!parts.some((p) => p.id === required)) {
    err(`必須パーツが見つからない: ${required}`);
  }
}

console.log('');
if (errors > 0) {
  console.error(`check:parts 失敗 — エラー${errors}件 / 警告${warnings}件`);
  process.exit(1);
}
if (warnings > 0) {
  console.warn(`check:parts — 警告${warnings}件`);
}
console.log(`check:parts 成功 (${parts.length}件: ${parts.map((p) => p.id).join(', ')})`);
