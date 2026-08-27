// StaRt Wedding Edit — Real Media Authority(TASK1、2026-08-27)。
//
// 目的: placeholder/demo asset(Pexels等の無料ダミー素材)から、実Wedding写真・
// 実動画へ安全に差し替えるための単一正本。TimingMasterとは完全に分離する
// (Timing ≠ Media Asset)。ここを触ってもphrase/cueのtimeMs・frameは
// 一切変わらない。
//
// 既存のstart129 role/variantIndex方式(assetRoles.ts / resolveDemoAsset.ts)
// を壊さず、その「上」に real media層を追加する:
//
//   resolveWeddingMediaAsset(role, variantIndex)
//     1. real manifestにapproved/final相当のentryがあれば、それを返す
//     2. 無ければ resolveDemoAsset() (既存のdemo asset) にfallback
//     3. demoも無ければ StartDemoBackdrop側の抽象placeholderへ(既存動作のまま)
//
// 実ファイル配置(すべてGit管理外、既存 public/photos/ と同じ扱い):
//   public/real/start-wedding/<ROLE>/<file>
//
// このファイル自体(manifest配列)はGit管理する。中身は
// パス・寸法・crop/focusメタデータのみで、歌詞本文・個人情報は含まない。

import {resolveDemoAsset, type ResolvedDemoAsset} from '../start129/resolveDemoAsset.ts';
import type {Start129AssetRole} from '../start129/assetRoles.ts';

export type RealMediaKind = 'photo' | 'video';
export type RealMediaOrientation = 'landscape' | 'portrait' | 'square';
export type RealMediaFit = 'cover' | 'contain' | 'blurred-extend';
export type RealMediaStatus = 'missing' | 'candidate' | 'approved' | 'final';
export type RealMediaSourceType = 'own-photo' | 'own-video' | 'licensed' | 'unknown';

export type RealMediaAsset = {
  /** 一意なid。role+連番など、人間が見て分かる文字列にする(例: "hero-wide-01")。 */
  assetId: string;
  role: Start129AssetRole;
  /** このroleの何番目の候補として使うか。resolveDemoAssetと同じ考え方。 */
  variantIndex: number;
  /** public/real/start-wedding/ からの相対パス(staticFile()にそのまま渡せる形)。 */
  file: string;
  kind: RealMediaKind;
  /** 実測できていない場合はnull(preflightがffprobe/画像ヘッダで埋める想定)。 */
  width: number | null;
  height: number | null;
  aspectRatio: string | null; // 例: "16:9"。widthHeightから導出可能だが人間が読みやすい形も持つ
  durationSec: number | null; // videoのみ。photoはnull
  orientation: RealMediaOrientation | null;
  /** 0-100の%。顔・主役が切れないためのcover時の注視点。未指定はnull(中央想定)。 */
  focusX: number | null;
  focusY: number | null;
  fit: RealMediaFit;
  status: RealMediaStatus;
  sourceType: RealMediaSourceType;
  /** 人間の一言メモ。歌詞本文やphraseIdの引用は禁止(このファイルはTiming非依存)。 */
  note: string;
};

// 初期状態は意図的に空。実素材が投入され、人間がstatusをapproved/final相当まで
// 上げたエントリだけをここへ追加する(AIが勝手にcandidate以上へ昇格させない、
// 既存のAssetStatus運用ルールと同じ思想)。
export const START_WEDDING_REAL_MEDIA: RealMediaAsset[] = [];

const isUsable = (asset: RealMediaAsset): boolean => asset.status === 'approved' || asset.status === 'final';

export type ResolvedWeddingMediaAsset = ResolvedDemoAsset & {source: 'real' | 'demo' | 'placeholder'; assetId: string | null};

/** role+variantIndexから実際に使う素材を解決する。real → demo → placeholderの
 * fallback chainはStartDemoBackdrop側の既存placeholder fallback(pathが
 * undefinedならAbstractPlaceholderへ)と組み合わせて完結する。 */
export const resolveWeddingMediaAsset = (role: Start129AssetRole, variantIndex: number): ResolvedWeddingMediaAsset => {
  const realCandidates = START_WEDDING_REAL_MEDIA.filter((a) => a.role === role && isUsable(a));
  if (realCandidates.length > 0) {
    const real = realCandidates[variantIndex % realCandidates.length];
    return {path: `real/start-wedding/${real.file}`, kind: real.kind, source: 'real', assetId: real.assetId};
  }
  const demo = resolveDemoAsset(role, variantIndex);
  return {...demo, source: demo.path ? 'demo' : 'placeholder', assetId: null};
};

export type RealMediaStatusSummary = {
  totalEntries: number;
  byStatus: Record<RealMediaStatus, number>;
  rolesWithRealMedia: Start129AssetRole[];
};

export const summarizeRealMediaStatus = (): RealMediaStatusSummary => {
  const byStatus: Record<RealMediaStatus, number> = {missing: 0, candidate: 0, approved: 0, final: 0};
  const roles = new Set<Start129AssetRole>();
  for (const a of START_WEDDING_REAL_MEDIA) {
    byStatus[a.status]++;
    if (isUsable(a)) roles.add(a.role);
  }
  return {totalEntries: START_WEDDING_REAL_MEDIA.length, byStatus, rolesWithRealMedia: Array.from(roles)};
};
