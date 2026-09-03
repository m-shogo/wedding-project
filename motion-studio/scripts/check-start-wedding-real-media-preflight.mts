// StaRt Wedding Edit — Real Media Preflight(TASK3、2026-08-27)。
//
// mainの既存Opening V1 production preflightの考え方(必須slot存在/種別/
// 解像度/duration/破損/crop risk/focus/path/status/usage approval/重複使用)
// を参考にしつつ、StaRtのrole+variantIndex方式に合わせて再実装する
// (ゼロから別思想を作らない。ただしmain側のOpening V1専用スクリプトを
// このタイミングでimportして依存させることはしない。role方式が違うため)。
//
// 対象: src/data/startWeddingEdit/realMedia.ts の START_WEDDING_REAL_MEDIA。
// real manifestが空(実素材投入前)でも実行可能で、その場合はMEDIA_BLOCKEDを
// 返す(エラーではない。これは「まだ実素材が無い」という正しい状態)。
//
// 実行: node --no-warnings scripts/check-start-wedding-real-media-preflight.mts

import {existsSync, statSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {START_WEDDING_REAL_MEDIA, type RealMediaAsset} from '../src/data/startWeddingEdit/realMedia.ts';
import {START_129_ASSET_ROLES} from '../src/data/start129/assetRoles.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const realMediaRoot = join(studioRoot, 'public/real/start-wedding');

type PreflightState =
  | 'MEDIA_READY'
  | 'MEDIA_BLOCKED'
  | 'CROP_QA_REQUIRED'
  | 'FOCUS_QA_REQUIRED'
  | 'DURATION_TOO_SHORT'
  | 'ASPECT_RISK'
  | 'USAGE_NOT_APPROVED';

const errors: string[] = [];
const warnings: string[] = [];
const perAssetStates = new Map<string, PreflightState[]>();

const addState = (assetId: string, state: PreflightState) => {
  const arr = perAssetStates.get(assetId) ?? [];
  arr.push(state);
  perAssetStates.set(assetId, arr);
};

const MIN_PHOTO_LONG_EDGE = 1600; // 1920x1080書き出しでcropしても粗くなりにくい最低ライン
const ASPECT_TOLERANCE = 0.15; // roleのaspectHintとの許容ズレ(比率の相対差)

const aspectHintToRatio = (hint: string): number => {
  const [w, h] = hint.split(':').map(Number);
  return w / h;
};

for (const asset of START_WEDDING_REAL_MEDIA) {
  const spec = START_129_ASSET_ROLES.find((r) => r.role === asset.role);
  if (!spec) {
    errors.push(`${asset.assetId}: 未知のrole "${asset.role}"`);
    continue;
  }

  // 1. usage approval
  if (asset.status !== 'approved' && asset.status !== 'final') {
    addState(asset.assetId, 'USAGE_NOT_APPROVED');
  }

  // 2. file存在確認(実ファイルはGit管理外なので存在しなくてもエラーにはしない。
  //    ただしstatus=approved/finalなのにファイルが無い場合は矛盾としてerror)
  const filePath = join(realMediaRoot, asset.file);
  const fileExists = existsSync(filePath);
  if (!fileExists) {
    if (asset.status === 'approved' || asset.status === 'final') {
      errors.push(`${asset.assetId}: status=${asset.status}なのに実ファイルが見つからない(${asset.file})`);
    }
    continue; // ファイルが無ければ以降の実測チェックは意味がないのでskip
  }

  // 3. kind(拡張子)整合性
  const isVideoExt = /\.(mp4|mov|webm)$/i.test(asset.file);
  const isPhotoExt = /\.(jpg|jpeg|png|webp)$/i.test(asset.file);
  if (asset.kind === 'video' && !isVideoExt) errors.push(`${asset.assetId}: kind=videoだが拡張子が動画ではない(${asset.file})`);
  if (asset.kind === 'photo' && !isPhotoExt) errors.push(`${asset.assetId}: kind=photoだが拡張子が画像ではない(${asset.file})`);

  // 4. サイズ0/破損チェック(最小限)
  const stat = statSync(filePath);
  if (stat.size === 0) {
    errors.push(`${asset.assetId}: ファイルサイズ0(破損の可能性、${asset.file})`);
    continue;
  }

  // 5. aspect risk(widthHeightが未計測ならFOCUS_QA_REQUIREDへ倒す。実測値があればrole期待値と比較)
  if (asset.width == null || asset.height == null) {
    addState(asset.assetId, 'FOCUS_QA_REQUIRED');
    warnings.push(`${asset.assetId}: width/heightが未計測。crop/focus QAのため実測してmanifestへ記録すること。`);
  } else {
    const actualRatio = asset.width / asset.height;
    const expectedRatio = aspectHintToRatio(spec.aspectHint);
    const diff = Math.abs(actualRatio - expectedRatio) / expectedRatio;
    if (diff > ASPECT_TOLERANCE) {
      addState(asset.assetId, 'ASPECT_RISK');
      warnings.push(
        `${asset.assetId}: aspect比が role期待値(${spec.aspectHint})と${(diff * 100).toFixed(0)}%乖離(実測${asset.width}x${asset.height})。crop事故のリスク。`,
      );
    }
    const longEdge = Math.max(asset.width, asset.height);
    if (asset.kind === 'photo' && longEdge < MIN_PHOTO_LONG_EDGE) {
      addState(asset.assetId, 'ASPECT_RISK');
      warnings.push(`${asset.assetId}: 長辺${longEdge}pxが最低ライン${MIN_PHOTO_LONG_EDGE}px未満。1080p書き出しで粗くなる可能性。`);
    }
  }

  // 6. video duration
  if (asset.kind === 'video') {
    if (asset.durationSec == null) {
      addState(asset.assetId, 'FOCUS_QA_REQUIRED');
      warnings.push(`${asset.assetId}: durationSecが未計測。`);
    } else if (asset.durationSec < 2) {
      addState(asset.assetId, 'DURATION_TOO_SHORT');
      errors.push(`${asset.assetId}: durationSec=${asset.durationSec}sが短すぎる(最低2秒目安)。`);
    }
  }

  // 7. focus metadata(人物が写りうるroleでcover使用時、focus未指定は要QA)
  const facePronRoles = ['HERO_WIDE', 'HERO_CLOSE', 'DETAIL_HAND'];
  if (facePronRoles.includes(asset.role) && asset.fit === 'cover' && (asset.focusX == null || asset.focusY == null)) {
    addState(asset.assetId, 'CROP_QA_REQUIRED');
    warnings.push(`${asset.assetId}: 人物が写りうるrole(${asset.role})でfit=coverかつfocusX/focusY未指定。顔切れリスクの確認が必要。`);
  }
}

// 8. 重複使用チェック(同一assetIdを近い秒数で連続使用しすぎていないか、role単位で候補数が少なすぎないか)
const roleCounts = new Map<string, number>();
for (const asset of START_WEDDING_REAL_MEDIA) {
  if (asset.status === 'approved' || asset.status === 'final') {
    roleCounts.set(asset.role, (roleCounts.get(asset.role) ?? 0) + 1);
  }
}
for (const [role, count] of roleCounts) {
  if (count === 1) {
    warnings.push(`role "${role}": 承認済み実素材が1件のみ。このroleを複数shotで使う場合、同じ写真の使い回し感が出るリスク(意味のあるrepriseなら許容)。`);
  }
}

// --- 全体state判定 ---
let overall: PreflightState;
if (START_WEDDING_REAL_MEDIA.length === 0) {
  overall = 'MEDIA_BLOCKED';
} else if (errors.length > 0) {
  overall = 'MEDIA_BLOCKED';
} else {
  const allStates = Array.from(perAssetStates.values()).flat();
  if (allStates.includes('USAGE_NOT_APPROVED')) overall = 'USAGE_NOT_APPROVED';
  else if (allStates.includes('DURATION_TOO_SHORT')) overall = 'DURATION_TOO_SHORT';
  else if (allStates.includes('ASPECT_RISK')) overall = 'ASPECT_RISK';
  else if (allStates.includes('CROP_QA_REQUIRED')) overall = 'CROP_QA_REQUIRED';
  else if (allStates.includes('FOCUS_QA_REQUIRED')) overall = 'FOCUS_QA_REQUIRED';
  else overall = 'MEDIA_READY';
}

console.log(`検査対象: real media manifest ${START_WEDDING_REAL_MEDIA.length}件`);
if (START_WEDDING_REAL_MEDIA.length === 0) {
  console.log('  (manifestが空。実素材投入前の正常な状態。demo assetへfallbackして引き続きrender可能)');
}
for (const [assetId, states] of perAssetStates) {
  console.log(`  ${assetId}: ${states.join(', ')}`);
}
if (warnings.length > 0) {
  console.log(`\n⚠️  警告${warnings.length}件:`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.error(`\n❌ real-media-preflight: FAIL(${errors.length}件)`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`\n✅ real-media-preflight OK`);
console.log(`Preflight State: ${overall}`);
console.log('注意: これは実ファイルの機械的な整合性チェック。人物・ロゴ・看板・権利の目視確認は別途必要。');
