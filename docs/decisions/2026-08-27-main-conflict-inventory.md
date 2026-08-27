# main Conflict Inventory(read-only、TASK10-12)

Status: RECORD(read-only調査。mergeやrebaseは実施していない)
merge-base: `80c59e8`(HEAD側)/ 実行時点のorigin/main

このbranchでmerge/rebaseは行っていない。以下は「今後統合する時に何が
競合しうるか」「mainから何を再利用できるか」の記録のみ。

## ファイル単位の重複(実際に競合しうる箇所)

このbranch(`feature/start-129-three-showcases`)とmainの両方が
merge-base以降に変更したファイルは、リポジトリ全体で**4件のみ**。

| ファイル | このbranch側の変更 | main側の変更 | 分類 | 理由 |
|---|---|---|---|---|
| `motion-studio/package.json` | pnpm scriptsを多数追加(timing-master/real-media関連) | `profile:*`系のpnpm scriptsを多数追加 | **SAFE** | 両方とも同じ挿入位置(`dev:director-recipes`直後)に別々のscriptを追加しているだけ。行単位の衝突は出るが、両方のブロックをそのまま残すだけで機械的に解決できる |
| `movie-dashboard/src/App.tsx` | +4行 | +2行 | **SAFE** | 両方とも新しいroute/importの追加のみ(小さい差分) |
| `movie-dashboard/src/components/Sidebar.tsx` | +2行 | +1行 | **SAFE** | 両方ともnav項目の追加のみ |
| `movie-dashboard/README.md` | +1行 | +1行 | **SAFE** | ドキュメント追記のみ |

**HIGH_RISK / MANUAL_REVIEWに分類される衝突は現時点で0件。**

このbranchが独自に追加した`motion-studio/src/data/startWeddingEdit/*`
`motion-studio/scripts/*-wedding-*`等は、mainには存在しない新規ファイルの
ため、そもそも衝突しようがない(新規追加同士でconflictしない)。

## 守るべきこのbranch固有の資産(main統合時に壊さないこと)

- `TimingMaster`(`src/data/startWeddingEdit/timingMaster.ts`)とその
  offset合成関数(`resolveEffectiveCueTimeMs`)
- `generated.ts`のcueId/threeHitCueIds伝播
- Visual Impact lead-in(`VISUAL_IMPACT_LEAD_IN_FRAMES`、
  `choreographedMoments.tsx`)
- Listening Review(`render-cue-listening-clips.mts`、filter機能)
- Safety Gate群(`check:full-song-identity`/`check:minimum-usable-duration`/
  `check:preview-offset-isolation`/`test:generated-idempotency`等)
- 今回追加したReal Media Authority(`realMedia.ts`)

これらはmain側に同名の対応物が無い(新規ファイル)ため、通常のfile-levelの
mergeでは自動的に保持される。リスクがあるとすれば、`package.json`の
script名が偶然重複するケースだが、現時点で確認した限り重複は無い。

## mainから再利用可能な基盤(TASK11)

mainには、Profile Movie(`profile-v1`)向けに、StaRt Wedding Editが
将来欲しい機能と類似の基盤が既にかなり実装されている。

| 領域 | main側の実装(抜粋) | StaRtへの再利用可能性 |
|---|---|---|
| Real Media同期/検証 | `sync-profile-v1-runtime-media.mts`、`check-profile-v1-runtime-media.mts`、`profileV1RuntimeMedia.generated.ts` | 高。StaRt側の`realMedia.ts`は今回ゼロから設計したが、mainのProfile V1側は既に「sync→check→assembly preflight」という3段構成まで実装済み。次にStaRt側のreal media同期を自動化する際、この構成を参考にできる |
| Assembly preflight | `profile-v1-assembly-preflight.mts` | 高。TASK3で作った`check-start-wedding-real-media-preflight.mts`と役割が近い。将来的に共通化できる可能性があるが、role方式(StaRt)とProfile側のスロット方式が異なるため、今すぐの統合は見送るべき |
| BGM権利承認 | `profile-v1-bgm-rights-approval.mts` | 中。StaRtの音源権利確認は`docs/08_rights-privacy.md`側で別管理されているため、直接の統合は不要だが、承認フローの型(`--init`/`--strict`)は参考になる |
| DaVinci finishing evidence | `profile-v1-davinci-finishing-evidence.mts` | 高(TASK12参照) |
| Final delivery approval | `profile-v1-final-delivery-approval.mts` | 中。StaRtがTiming freeze後に同種のgateを持つ場合の参考実装になる |
| Resolve/Palmier handoff | `resolveHandoffPolicy.ts`、`resolveHandoff.schema.ts`、`resolvePalmierFCPXMLV2Runtime.ts`、`resolveOTIOInterchange.ts`、`resolveDrfxFixture.ts`、`resolveLottieFixture.ts`、`resolveNativePIP.ts`、`resolveRuntimeCanaryPack.ts`等 | 高(TASK12参照) |
| 共有motion-kit | `engines.tsx`(+470行)、`directorRecipeAdapter.ts`、`renderablePresets.ts`、`routeLineMath.ts`(新規) | 中。Director Recipe側の演出強化。StaRt Wedding Editは`choreographedMoments.tsx`という別系統のbespoke実装を使っているため直接の依存はないが、共通engineの改善はDirector Recipe経由でStaRt Extended側に間接的な恩恵がありうる |

**今回はcherry-pickしていない。** Human Review待ちのbranchで大量に取り込むと
検証負荷が跳ね上がるため、「何が使えるか」の記録に留めた。

## DaVinci / Palmier handoff readiness(TASK12)

mainには既にResolve/Palmier向けの型・schemaが複数存在する
(`resolveHandoffPolicy.ts`、`resolveDrfxFixture.schema.ts`、
`resolvePalmierFCPXMLV2Runtime.ts`、`resolveOTIOInterchange.ts`等)。
これらはProfile V1向けに作られたものだが、以下の役割分担はStaRt Wedding
Editでもそのまま踏襲できる。

```text
Remotion  → Timing / layout / reproducible motion(現状のStaRt実装のまま)
Palmier   → scene/timeline準備補助(FCPXML v2 runtime resolverが既にmain側に存在)
DaVinci   → 最終polish(color/audio/複雑なmask・effect/delivery)
```

**今回はDaVinci Actualを操作する処理は一切実行していない**(brief指示通り)。
準備できているのは、mainに存在するhandoff schemaの所在確認のみ。
StaRt側でこれらを使う具体的なhandoff packageの生成は、Timing freeze後の
別タスクとして扱う。

## 結論

- SAFE: 4件(package.json、App.tsx、Sidebar.tsx、README.md。全て軽微な追記の重複)
- AUTO_MERGE_LIKELY: 0件(上記4件はSAFEに分類したため該当なし)
- MANUAL_REVIEW: 0件
- HIGH_RISK: 0件

現時点でのdiverge規模(main側150ファイル変更、このbranch側94ファイル変更)
に対して、実際に重複するファイルは4件のみであり、統合自体の技術的リスクは
低いと判断できる。ただし、brief指示通り、Human Review完了・Timing freeze・
B案本制作の安定化まではmerge/rebaseを実施しない。
