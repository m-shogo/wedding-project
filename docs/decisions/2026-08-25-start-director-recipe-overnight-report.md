# StaRt Director Recipe System — Overnight Report (Phase A〜H)

Date: 2026-08-25
Status: Phase H完了。研究トラックとしては一区切り。Opening V1（本番正本）には影響なし。

## 1. 完了したPhase一覧とPR / マージ済みSHA

| Phase | 内容 | PR | マージ済みSHA |
|---|---|---|---|
| A | Director Recipe Catalogデータモデル（97件） | [#252](https://github.com/m-shogo/wedding-project/pull/252) | `a5569552` |
| B | 共有Remotionレンダラー（6 engine） | [#253](https://github.com/m-shogo/wedding-project/pull/253) | `f2144e86` |
| C | Preview Catalogue / Reel / 比較セット | [#255](https://github.com/m-shogo/wedding-project/pull/255) | `5ca1003c` |
| D | Movie Dashboard閲覧UI | [#257](https://github.com/m-shogo/wedding-project/pull/257) | `d11a2cf0` |
| E | StaRt 14 section ⇄ recipe マッピング | [#258](https://github.com/m-shogo/wedding-project/pull/258) | `232ae1f3` |
| F | Palmier / DaVinci handoff | [#259](https://github.com/m-shogo/wedding-project/pull/259) | `813bf9f5` |
| G | Claude / Codex A/B比較フレームワーク | [#260](https://github.com/m-shogo/wedding-project/pull/260) | `dc8caff0` |
| H | 統合・磨き上げ・穴埋め（本レポート対象） | (このPRのURL・SHAは下記「branch / PR」節参照) | — |

## 2. 最新main SHA

Phase H着手時点の origin/main: `dc8caff0734468520afcaefc805613380d6d2f6d`（Phase Gのマージコミット）。

## 3. CI status

Phase A〜Gは全てPRとしてマージ済み（squash mergeの履歴が `git log --oneline` に残る）。
Phase Hでは以下をローカルで実行し、全件成功を確認した（結果は本レポート末尾のセクション参照）。
GitHub Actions上のCI green確認はPR作成後に別途行う。

## 4. Recipe数、Shared Engine数、Render成功数

- Recipe数: **97**（`directorRecipeCatalog.length`、`check:director-recipe-catalog` / `check:director-recipes` 双方で検証済み）
- Shared Engine数: **6**（`typography-reveal` / `camera-transform` / `transition-wipe` / `graphic-hit` / `native-cut` / `photo-layout`）
- Render成功数（Phase Hで実施した再現性確認）:
  - `DirectorRecipeReel-typography` を再render → `out/director-recipes/DirectorRecipeReel-typography.mp4`
    1280x720 / h264 / 30fps / 9.856秒 / 595,087 bytes で成功。Phase C当時にREADMEへ記録された
    「9.80秒 / 595.1 kB」と一致し、再現性を確認した。
  - Phase Cで過去に実施済みの実render（README記録のまま、再実行はしていない）:
    `DirectorRecipeComparison-hero-photo-presentation`（6.06秒 / 296.6 kB）。
  - 97件全部の個別1080pフルレンダーは意図的に未実施（研究用途では不要という既存判断を維持）。

## 5. StaRt section mapping（14 section）の状態

- `startSectionRecipeMap.ts` は14 section全てをカバー（`opening-pickup` 〜 `end-before-c-section`）。
- 各sectionのprimaryRecipeIds/alternateRecipeIdsが実際に `directorRecipeCatalog.ts` に存在することは
  Phase E時点から movie-dashboard 側の `check:start-section-recipe-map` で検証済みだった。
- **Phase Hで新規に閉じたギャップ**: それらの recipe id が実際に motion-studio の
  `directorRecipeAdapter.ts` を通ってrenderable engineへresolveできるかは、これまで検証されて
  いなかった（movie-dashboardとmotion-studioが別パッケージのため）。新規スクリプト
  `motion-studio/scripts/check-start-section-recipe-renderable.mts` を作成し、14 section ×
  primary/alternate 実測83件を全て `resolveDirectorRecipeById()` に通し、例外なく成功、かつ全て
  6つの共有engineに収まることを確認した。`pnpm check`（motion-studio）に組み込み済み。

## 6. 音源分析状況

**AUDIO_BLOCKED** — 正規ローカル音源は無く、YouTube reference timingのみで研究している。
`startExtendedRhythmMap.ts` のreference endpoint（約2:09）はあくまで研究用referenceであり、
実音源の波形とMarkerが最終的な権威。Phase Hでもこの状態は変わらず。

## 7. 写真分析状況

**MEDIA_BLOCKED** — 実写真は投入されておらず、Director Recipe Previewはダミー素材
（`DemoBackdrop` / `REAL PHOTO / VIDEO SLOT`表記のプレースホルダー）のみで動作している。
Phase Hでもこの状態は変わらず。

## 8. Claude A/B artifact状況

枠組みのみ完成（Phase G）。`startClaudeCodexAB.ts` の12軸rubricと比較データは実装済みだが、
`claudeCandidate.artifactPath` / `codexCandidate.artifactPath` はどちらも `null` のまま
（`check:claude-codex-ab` が実在しないパスを弾く設計）。Phase Hでは実行していない。

## 9. Codex A/B状況

Codex CLI利用可能と確認済み（Phase Gで `codex --version` / `codex doctor` 実測）。実行は未着手。
handoffドキュメント（`docs/handoff/2026-08-25-codex-ab-comparison-handoff.md`）は完成済みで、
そのまま渡せる状態。Phase Hでは実行していない（brief通り、時間がかかりすぎる場合は不要という
判断に従った）。

## 10. Palmier handoff

完成（Phase F）。`exports/palmier/director-recipe-section-handoff.{csv,md,json}` を
`pnpm export:palmier-recipe-handoff` で生成できる。read-onlyでMCP動作確認済み
（Palmierへの実書き込みはPhase Hでも行っていない）。

## 11. DaVinci learning

完成（Phase F）。`docs/davinci-skill-recipe-map.md` に逆引きドキュメントあり。Phase Hでの変更なし。

## 12. BLOCKED項目一覧

- AUDIO_BLOCKED: 正規ローカル音源なし。
- MEDIA_BLOCKED: 実写真なし、ダミー素材のみ。
- Claude/Codex A/B: 枠組み完成、実行未着手（両レーンとも）。
- 97件からの絞り込み: 人間の採否判断待ち（AIは`status`を勝手に上げない）。

## 13. ユーザーが次にやること

1. 正規音源を用意する。用意でき次第、`startExtendedRhythmMap.ts` のreference timingを実音源の
   波形/Markerベースへ差し替える。
2. 実写真を用意する。用意でき次第、Director Recipe Previewのsource slotをダミーから差し替える。
3. 97件のレシピから、実際にStaRt用に使う4〜8 motion familyへ絞り込む判断をする
   （`movie-dashboard` の Director Recipe Catalog 画面で候補を見比べられる）。
4. Codex A/Bを実際に実行するかどうかを判断する。実行する場合は
   `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` のプロンプトをそのまま使える。
5. **最優先は変わらずOpening V1（`docs/opening-v1-motion-map.md`）の実写真11枚投入**。この研究
   トラックはOpening V1の後回しでよい並行トラック。

## 14. Finalまでの残り

この研究トラック単体のFinalは「97件から絞り込んだ4〜8 motion familyが、正規音源+実写真の
下で実際にStaRt用最終素材としてrenderされ、人間が採用を確定する」まで。現時点ではその手前の
「基盤が正しく動くことの機械的な保証」までが完了している。Opening V1本体のFinalとは別工程。

---

## Phase H 実行ログ（このセッションで実際に行ったこと）

### 追加/変更したファイル

- `motion-studio/scripts/check-start-section-recipe-renderable.mts`（新規） — 14 section ×
  primary/alternate recipeの実renderability契約チェック。
- `motion-studio/package.json` — `check:start-section-recipes` scriptを追加し、`check`に組み込み。
- `movie-dashboard/src/pages/DirectorRecipeCatalog.tsx` — `?tab=section-map` クエリでタブを直接
  開けるようにし、StartMotionShowcaseへの相互リンクを追加。
- `movie-dashboard/src/pages/StartMotionShowcase.tsx` — DirectorRecipeCatalog（SECTION MAPタブ）
  への相互リンクを追加。
- `docs/start-director-recipe-system-overview.md`（新規） — Phase A〜Hの索引ドキュメント。
- `README.md` — 「現在の入口」「movie-dashboard」節に研究トラックへの導線を1〜2行追記。
- `docs/task-board.md` — 「並行研究トラック」節に、人間が判断すべき項目をNext/Laterへ追記。
- 本レポート `docs/decisions/2026-08-25-start-director-recipe-overnight-report.md`（新規）。

新規Recipe/Engineの追加はゼロ（brief通り最小限。既存の欠けていた接続を1本埋めただけ）。

### 実行したcheck/buildコマンドと結果

```text
cd movie-dashboard && pnpm build
  → tsc -b && vite build 成功（165 modules transformed, dist生成）

cd movie-dashboard && pnpm check:movie-coach
  → 全24項目のcontract（Director Recipe Catalog / StaRt Section ⇄ Recipe Map含む）成功

cd motion-studio && pnpm check
  → check:motion / check:assets / check:parts / check:presets / check:start-motion-kit /
    check:director-recipes / check:start-section-recipes（新規） / check:claude-codex-ab
    全て成功。新規スクリプトの出力:
    "StaRt Section ⇄ Recipe renderability contracts OK: 14/14 sections, 83
     primary/alternate recipe references all resolve through directorRecipeAdapter and
     use only the 6 shared engines. Catalog size: 97."

cd motion-studio && pnpm typecheck
  → tsc --noEmit エラーなし
```

### 実際に成功したレンダーの詳細

```text
pnpm render:director-recipe-collection DirectorRecipeReel-typography
  → out/director-recipes/DirectorRecipeReel-typography.mp4
  → codec=h264, 1280x720, 30fps, duration=9.856s, size=595,087 bytes
  → ffprobeで実測。Phase C当時のREADME記録（9.80秒 / 595.1 kB）と一致し、再現性を確認。
```

### branch名、PR、マージ有無

- branch: `feat/start-extended-showcase-v1`
- PR: このレポート作成後に `gh pr create` で作成し、CI green確認後 `gh pr merge --squash` する
  （実行結果はこのセッションの最終応答で報告）。

### BLOCKEDにした項目

- AUDIO_BLOCKED（正規音源なし）
- MEDIA_BLOCKED（実写真なし）
- Claude/Codex A/B 実行（枠組みのみ、両レーンとも未実行）
- 97件からの4〜8 motion family絞り込み（人間判断待ち）
