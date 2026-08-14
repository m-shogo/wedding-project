// pnpm check:presets
// presetRegistry.ts(テンプレ×propsの名前付き組み合わせ)の健全性を検証する。
// 失敗時はexit 1。エラーは ❌、警告は ⚠️。
//
// propsの正しさは、各Compositionのzodスキーマと突き合わせて検証する。
// スキーマは .tsx にあり Node から import できない(JSXを型ストリップできない)ため、
// Root.tsx の id↔schema 対応とスキーマ定義をソースから読み取って照合している。

import {readFileSync, readdirSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';
import {presets} from '../src/data/presetRegistry.ts';
import type {PresetStatus} from '../src/data/presetRegistry.ts';
import {templates} from '../src/data/sceneRegistry.ts';

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

const STATUSES: PresetStatus[] = ['draft', 'approved'];
const ID_RE = /^[a-z0-9-]+$/;

// --- Root.tsx から Composition id → schema名 を取る ---
const rootSrc = readFileSync(join(rootDir, 'src/Root.tsx'), 'utf8');
const idToSchema = new Map<string, string>();
for (const chunk of rootSrc.split('<Composition').slice(1)) {
  const id = chunk.match(/id="([^"]+)"/)?.[1];
  const schema = chunk.match(/schema=\{(\w+)\}/)?.[1];
  if (id && schema) idToSchema.set(id, schema);
}

// --- compositions配下から zodスキーマ定義を集める ---
type FieldSpec = {
  optional: boolean;
  nullable: boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  type?: 'string' | 'number' | 'boolean' | 'enum' | 'other';
};

const collectTsx = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return collectTsx(full);
    return name.endsWith('.tsx') ? [full] : [];
  });

// `= z.object({` から対応する閉じ括弧までを取り出す
const sliceObjectBody = (src: string, startIdx: number): string => {
  const open = src.indexOf('{', startIdx);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  return '';
};

const schemaFields = new Map<string, Map<string, FieldSpec>>();
for (const file of collectTsx(join(rootDir, 'src/compositions'))) {
  const src = readFileSync(file, 'utf8');
  const re = /export const (\w+Schema) = z\.object\(/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const body = sliceObjectBody(src, m.index + m[0].length - 1);
    const fields = new Map<string, FieldSpec>();
    // ネストしたobjectは今のところ無い前提。深さ1のキーだけ拾う
    let depth = 0;
    for (const rawLine of body.split('\n')) {
      const line = rawLine.trim();
      if (depth === 0) {
        const km = line.match(/^(\w+):\s*(.*)$/);
        if (km) {
          const [, key, rest] = km;
          const enumMatch = rest.match(/z\.enum\(\[([^\]]+)\]\)/);
          fields.set(key, {
            optional: rest.includes('.optional()'),
            nullable: rest.includes('.nullable()'),
            enumValues: enumMatch
              ? enumMatch[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
              : undefined,
            min: rest.match(/\.min\((\d+)\)/) ? Number(rest.match(/\.min\((\d+)\)/)![1]) : undefined,
            max: rest.match(/\.max\((\d+)\)/) ? Number(rest.match(/\.max\((\d+)\)/)![1]) : undefined,
            type: enumMatch
              ? 'enum'
              : rest.includes('z.string')
                ? 'string'
                : rest.includes('z.number')
                  ? 'number'
                  : rest.includes('z.boolean')
                    ? 'boolean'
                    : 'other',
          });
        }
      }
      depth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length;
    }
    schemaFields.set(m[1], fields);
  }
}

// --- 検証 ---
const templateIds = new Set(templates.map((t) => t.id));
const seenIds = new Set<string>();

for (const p of presets) {
  const at = `preset "${p.id}"`;

  if (!ID_RE.test(p.id)) err(`${at}: idは英小文字・数字・ハイフンのみ`);
  if (seenIds.has(p.id)) err(`${at}: idが重複している`);
  seenIds.add(p.id);

  if (!p.label.trim()) err(`${at}: labelが空`);
  if (!p.description.trim()) err(`${at}: descriptionが空`);
  if (!p.usage.trim()) err(`${at}: usageが空`);
  if (!STATUSES.includes(p.status)) err(`${at}: statusが不正 (${p.status})`);

  if (!templateIds.has(p.compositionId)) {
    err(`${at}: compositionId "${p.compositionId}" がsceneRegistryに無い`);
    continue;
  }

  const schemaName = idToSchema.get(p.compositionId);
  if (!schemaName) {
    warn(`${at}: Root.tsxで "${p.compositionId}" のschemaを特定できず、props検証をスキップ`);
    continue;
  }
  const fields = schemaFields.get(schemaName);
  if (!fields) {
    warn(`${at}: スキーマ ${schemaName} の定義を見つけられず、props検証をスキップ`);
    continue;
  }

  // 過不足チェック
  for (const [key, spec] of fields) {
    if (!(key in p.props) && !spec.optional) {
      err(`${at}: props "${key}" が足りない (${schemaName})`);
    }
  }
  for (const key of Object.keys(p.props)) {
    if (!fields.has(key)) err(`${at}: props "${key}" は ${schemaName} に無い`);
  }

  // 値チェック
  for (const [key, value] of Object.entries(p.props)) {
    const spec = fields.get(key);
    if (!spec) continue;
    if (value === null) {
      if (!spec.nullable) err(`${at}: props "${key}" はnull不可`);
      continue;
    }
    if (spec.type === 'enum' && spec.enumValues && !spec.enumValues.includes(String(value))) {
      err(`${at}: props "${key}" は ${spec.enumValues.join(' | ')} のいずれか (実際: ${String(value)})`);
    }
    if (spec.type === 'number') {
      if (typeof value !== 'number') {
        err(`${at}: props "${key}" は数値であるべき`);
      } else {
        if (spec.min !== undefined && value < spec.min) err(`${at}: props "${key}" が最小値${spec.min}未満 (${value})`);
        if (spec.max !== undefined && value > spec.max) err(`${at}: props "${key}" が最大値${spec.max}超過 (${value})`);
      }
    }
    if (spec.type === 'boolean' && typeof value !== 'boolean') {
      err(`${at}: props "${key}" は真偽値であるべき`);
    }
    if (spec.type === 'string') {
      if (typeof value !== 'string') {
        err(`${at}: props "${key}" は文字列であるべき`);
      } else if (spec.min !== undefined && value.length < spec.min) {
        err(`${at}: props "${key}" が空/短すぎる (min ${spec.min})`);
      }
    }
  }
}

// approvedへの昇格は人間確認が前提。AIが勝手に上げていないかを可視化する
const approved = presets.filter((p) => p.status === 'approved');
if (approved.length > 0) {
  console.log(`ℹ️  approvedプリセット ${approved.length}件: ${approved.map((p) => p.id).join(', ')}`);
}

const byComposition = new Map<string, number>();
for (const p of presets) byComposition.set(p.compositionId, (byComposition.get(p.compositionId) ?? 0) + 1);

if (errors === 0) {
  console.log(
    `✅ preset ${presets.length}件 / ${byComposition.size}テンプレート` +
      (warnings > 0 ? ` (警告${warnings}件)` : ''),
  );
} else {
  console.error(`\n❌ エラー${errors}件 / 警告${warnings}件`);
}

process.exit(errors > 0 ? 1 : 0);
