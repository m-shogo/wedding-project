// role + variantIndexから実際のdemo asset(path + photo/video種別)を解決する共通関数。
//
// 旧実装はStartDemoBackdrop.tsx内に直接書かれており、他の場所(StaRt Wedding Edit
// のType Mask等)から同じroleの実素材を参照する手段が無かった。ここへ抽出することで、
// 「同じshotが今画面に出しているのと同じ写真」を他のcomponentからも安全に参照できる。

import {start129AssetRoleSpec, type Start129AssetRole} from './assetRoles.ts';
import {start129DemoAssetLibrary} from './demoAssetLibrary.generated.ts';

export type ResolvedDemoAsset = {
  path: string | undefined;
  kind: 'photo' | 'video';
};

export const resolveDemoAsset = (role: Start129AssetRole, variantIndex: number): ResolvedDemoAsset => {
  const candidates = start129DemoAssetLibrary[role] ?? [];
  const path = candidates[variantIndex % Math.max(candidates.length, 1)];
  const spec = start129AssetRoleSpec(role);
  return {path, kind: spec.kind};
};
