// pnpm check:parts
// partRegistry.ts(再利用パーツのメタデータ)の健全性を検証する。
// 失敗時はexit 1。エラーは ❌、警告は ⚠️。

import {parts} from '../src/data/partRegistry.ts';
import type {PartCategory, PartStatus} from '../src/data/partRegistry.ts';

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

console.log(`パーツレジストリ: ${parts.length}件\n`);

// id重複
const ids = parts.map((p) => p.id);
for (const d of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) {
  err(`partRegistry: idが重複: ${d}`);
}

for (const p of parts) {
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
console.log('check:parts 成功');
