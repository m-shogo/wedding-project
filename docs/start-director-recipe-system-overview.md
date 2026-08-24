# StaRt Director Recipe System — 索引（Phase A〜H）

**この索引が指す全体は、Opening V1（2026-10-24上映の本番正本）とは別系統の並行研究トラック。**
Opening V1の作業順・完成優先度を一切変えない。実写真11枚投入が引き続き最優先。
Opening V1側の正本は `docs/opening-v1-motion-map.md` と `docs/task-board.md`。

Mrs. GREEN APPLE「StaRt」オープニングムービー案のための研究基盤として、97件の演出レシピ
（Director Recipe Catalog）を、共有Remotionレンダラーで実際にpreview/render可能な状態まで
作り、StaRtの14 sectionへのマッピング、Palmier/DaVinciへのhandoff、Claude/Codex A/B比較の
枠組みまでを一通り整えた。Phase Hはこれらの「まとめ上げ」フェーズ。

## Phase一覧

| Phase | 内容 | 成果物 | PR | マージ済みSHA |
|---|---|---|---|---|
| A | Director Recipe Catalogデータモデル（97件） | `movie-dashboard/src/data/directorRecipeCatalog.ts` | [#252](https://github.com/m-shogo/wedding-project/pull/252) | `a5569552` |
| B | 共有Remotionレンダラー（6 engine） | `motion-studio/src/motion-kit/directorRecipeAdapter.ts`, `src/compositions/common/DirectorRecipePreview.tsx`, `src/motion-kit/engines.tsx` | [#253](https://github.com/m-shogo/wedding-project/pull/253) | `f2144e86` |
| C | Preview Catalogue / Highlight Reel / Category Reels / 比較セット | `motion-studio/src/motion-kit/directorRecipeReelSelections.ts`, `src/compositions/common/DirectorRecipeReel.tsx`, `DirectorRecipeComparison.tsx`, `scripts/render-director-recipe-collection.mts` | [#255](https://github.com/m-shogo/wedding-project/pull/255) | `5ca1003c` |
| D | Movie Dashboard閲覧UI | `movie-dashboard/src/pages/DirectorRecipeCatalog.tsx` | [#257](https://github.com/m-shogo/wedding-project/pull/257) | `d11a2cf0` |
| E | StaRt 14 section ⇄ recipe マッピング | `movie-dashboard/src/data/startSectionRecipeMap.ts` | [#258](https://github.com/m-shogo/wedding-project/pull/258) | `232ae1f3` |
| F | Palmier / DaVinci handoff | `motion-studio/scripts/export-palmier-recipe-handoff.mts`, `docs/davinci-skill-recipe-map.md` | [#259](https://github.com/m-shogo/wedding-project/pull/259) | `813bf9f5` |
| G | Claude / Codex A/B比較フレームワーク | `movie-dashboard/src/data/startClaudeCodexAB.ts`, `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` | [#260](https://github.com/m-shogo/wedding-project/pull/260) | `dc8caff0` |
| H | 統合・磨き上げ・穴埋め（このPhase） | このドキュメント、`check-start-section-recipe-renderable.mts`、Showcase⇄Catalog相互リンク | (このPR) | (このPRのマージ後に追記) |

## 全体構造

```text
movie-dashboard/src/data/directorRecipeCatalog.ts (Phase A)
  ├─ 97 recipes, 10 categories, 6 shared engineへ resolve
  ↓
motion-studio/src/motion-kit/directorRecipeAdapter.ts (Phase B)
  ├─ recipe.motionPresetIds → RecipeLayer[] (engine + props)
  ↓
motion-studio/src/compositions/common/DirectorRecipePreview.tsx (Phase B)
  ├─ 1つのdata-drivenコンポーネントが全97件を描画
  ↓
motion-studio/src/DirectorRecipeRoot.tsx
  ├─ 97 Composition + 10 Category Reel + Highlight Reel + 2 Comparison Set を自動登録 (Phase C)

movie-dashboard/src/data/startSectionRecipeMap.ts (Phase E)
  ├─ 14 StaRt section → primary/alternate/avoid recipe id
  ↓
motion-studio/scripts/check-start-section-recipe-renderable.mts (Phase H, NEW)
  └─ 14 sectionの primary/alternate 全件が実際にresolveDirectorRecipeById()を
     通ってrenderable engineへ落ちることを検証（movie-dashboard側のID存在チェックだけでは
     足りなかった「実際にrenderできるか」を motion-studio 側から機械的に閉じる）

movie-dashboard/src/pages/DirectorRecipeCatalog.tsx (Phase D)
  ├─ CATALOGタブ: 97件をcategory/energy/source/section/intensity/statusで絞り込み
  └─ SECTION MAPタブ: 14 sectionのprimary/alternate/avoidを見る
       ↕ 相互リンク (Phase H, NEW)
movie-dashboard/src/pages/StartMotionShowcase.tsx (既存Motion Kit 36種)
  └─ 曲頭→2番サビ後間奏の歌詞slot・rhythm map・実素材slotを見る rough timeline

motion-studio/scripts/export-palmier-recipe-handoff.mts (Phase F)
  └─ exports/palmier/director-recipe-section-handoff.{csv,md,json}

movie-dashboard/src/data/startClaudeCodexAB.ts (Phase G)
  └─ 12軸rubric + Claude/Codex 独立handoff + winner null contract
```

## コマンド一覧

### movie-dashboard

```sh
cd movie-dashboard
pnpm dev                              # Director Recipe Catalog / StaRt Motion Showcase を確認
pnpm build                            # tsc -b && vite build
pnpm check:director-recipe-catalog    # Phase A契約（97件、10カテゴリ、no pre-approved status）
pnpm check:start-section-recipe-map   # Phase E契約（14 section網羅、id存在確認、重複チェック）
pnpm check:movie-coach                # 上記含む全Movie Coach系contract一括
```

### motion-studio

```sh
cd motion-studio
pnpm dev:director-recipes                          # Remotion Studioで97件確認
pnpm director-recipes:list                          # 全Composition id一覧
pnpm render:director-recipe <recipe-id>              # 1件だけlow-res render
pnpm render:director-recipe-collection <reel-id>     # Reel/Category Reel/比較セットrender
pnpm check:director-recipes                          # Phase B/C契約（97件resolve, engine制約, Reelカバレッジ）
pnpm check:start-section-recipes                     # Phase H NEW — 14 sectionのprimary/alternateが
                                                       # 実際にrenderableかをmotion-studio側から検証
pnpm export:palmier-recipe-handoff                    # Phase F handoff export
pnpm check:claude-codex-ab                            # Phase G winner-null contract
pnpm export:claude-codex-ab-handoff                   # Phase G Claude/Codex独立handoff export
pnpm check                                            # 上記チェック含む motion-studio 全contract一括
pnpm typecheck                                        # tsc --noEmit
```

## Phase Hで実施した検証

1. **Renderability contract（新規）**: `motion-studio/scripts/check-start-section-recipe-renderable.mts`。
   `movie-dashboard` 側の `verify-start-section-recipe-map-contracts.mjs` は「recipe idが
   catalogに存在するか」までしか見ていなかった。新スクリプトは14 section全ての
   primary/alternateレシピ（実測83件）を `resolveDirectorRecipeById()` に通し、実際に
   renderer layerへ解決できること・使用engineが6つの共有engineに収まっていることを検証する。
   `pnpm check`（motion-studio）に組み込み済み。
2. **実render再現性確認**: `pnpm render:director-recipe-collection DirectorRecipeReel-typography`
   を実行し、`out/director-recipes/DirectorRecipeReel-typography.mp4` が
   1280x720 / h264 / 30fps / 9.856秒 / 595,087 bytes で成功することを確認した
   （Phase Cのメモに記録されていた595.1 kBと一致）。
3. **相互リンク**: `movie-dashboard/src/pages/StartMotionShowcase.tsx` と
   `movie-dashboard/src/pages/DirectorRecipeCatalog.tsx` の間に相互リンクを追加。
   Catalog側は `?tab=section-map` クエリでSECTION MAPタブを直接開けるようにした
   （Sidebarには元々両方の項目が隣接して存在しており、新規ページは作っていない）。
4. **`pnpm build` / `pnpm check`**: movie-dashboard・motion-studio双方で実行し、全件成功を確認
   （詳細はOvernight Reportに記録）。

## Phase D以降で残っている簡略化・近似（変更なし、引き続き認識しておくべき事項）

- `photo-2p5d-parallax` は真の視差ではなくrestrained pushで近似。
- `accent-halftone-burst` / `accent-scribble-underline` / `accent-stamp-triplet` は専用ビジュアルが
  無く、既存のtriplet hitで近似。
- 実写真/実動画の差し込みslotはまだプレースホルダー（`DemoBackdrop` / `REAL PHOTO / VIDEO SLOT`）。
- 97件全部の高画質1080pフルレンダーは意図的に未実施（研究用途では不要という判断）。

## 音源・写真のブロッカー（変更なし）

- **AUDIO_BLOCKED**: 正規ローカル音源が無く、YouTube reference timingのみで研究している。
  Final秒数は実音源の波形とMarkerが権威。
- **MEDIA_BLOCKED**: 実写真は投入されておらず、ダミー素材のみで研究している。

## 次に人間がやること

このPhase Hをもって研究トラックの「基盤としての完成」は一区切り。次に必要な人間判断は
Overnight Report（`docs/decisions/2026-08-25-start-director-recipe-overnight-report.md`）の
「ユーザーが次にやること」節を参照。要約:

1. 97件から実際に使う4〜8 motion familyへ絞り込む。
2. 正規音源が来たらFinal秒数を確定する。
3. 実写真が来たらsource slotを差し替える。
4. Codex A/Bを実際に走らせるかどうかを判断する（`docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` にhandoff済み）。

## 関連ドキュメント

- `motion-studio/README.md`「Director Recipe Renderer」節
- `docs/decisions/2026-08-25-director-recipe-catalog-research.md`
- `docs/decisions/2026-08-25-start-section-recipe-mapping.md`
- `docs/decisions/2026-08-25-director-recipe-palmier-davinci-handoff.md`
- `docs/decisions/2026-08-25-claude-codex-ab-framework.md`
- `docs/handoff/START-EXTENDED-MOTION-HANDOFF-2026-08-24.md`
- `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md`
- `docs/task-board.md`「並行研究トラック」節
