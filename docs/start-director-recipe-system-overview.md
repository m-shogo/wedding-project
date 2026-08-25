# StaRt Director Recipe System — 索引（Phase A〜I）

## Authority / 現在の本命

このシステムは、2026-10-24 Wedding Openingの **StaRt Extended Candidate（曲頭 → 2番サビ後間奏 → Cメロ前END）を本命方向として検討・制作するための研究/制作基盤**。

Opening全体の単一authorityは `docs/opening-authority.md`。Extendedの構成handoffは
`docs/handoff/START-EXTENDED-MOTION-HANDOFF-2026-08-24.md`。

- **Extended Candidate = 本命方向**
- **Opening V1 60秒 = Short Candidate / fallback / venue short option / 比較用**
- どちらも消さない
- 最終判断は正規音源・実写真・実動画を入れたartifactを見て行う

過去のPhase H文書にあった「Opening V1が本番正本・実写真11枚投入が常に最優先」という表現は、Extended handoffのauthorityと逆転していたため、この索引では採用しない。

## 何が完成しているか

Mrs. GREEN APPLE「StaRt」オープニングムービー案のために、97件の演出レシピ（Director Recipe Catalog）、共有Remotion renderer、StaRt 14 section mapping、Palmier/DaVinci handoff、Claude/Codex A/B frameworkまで実装済み。

ただし **「97件がengineへresolveできる」ことと「97種類の見た目が忠実に実装済み」なことは別**。

現状の完成度は次の3段階で理解する。

1. **Data complete** — 97 recipeの用途・energy・avoid・StaRt section等が定義済み
2. **Engine-resolvable** — 97/97が6 shared engineへ機械的にresolve可能
3. **Visual fidelity** — 一部は忠実、一部は近似、一部はplaceholder。ここはまだ改善対象

## Phase一覧

| Phase | 内容 | 成果物 | PR | merge |
|---|---|---|---|---|
| A | Director Recipe Catalog（97件） | `movie-dashboard/src/data/directorRecipeCatalog.ts` | #252 | `a5569552` |
| B | 共有Remotion renderer（6 engine） | `motion-studio/src/motion-kit/directorRecipeAdapter.ts` / `engines.tsx` | #253 | `f2144e86` |
| C | Highlight / Category Reel / Comparison | `DirectorRecipeReel.tsx` / `DirectorRecipeComparison.tsx` | #255 | `5ca1003c` |
| D | Movie Dashboard catalog UI | `DirectorRecipeCatalog.tsx` | #257 | `d11a2cf0` |
| E | StaRt 14 section ⇄ recipe map | `startSectionRecipeMap.ts` | #258 | `232ae1f3` |
| F | Palmier / DaVinci handoff | export scripts / skill map | #259 | `813bf9f5` |
| G | Claude / Codex A/B framework | `startClaudeCodexAB.ts` | #260 | `dc8caff0` |
| H | integration / renderability contract | overview / cross-links / section renderability | #261 | `188cc4cb` |
| I | Claude/Codex A/B実行試行 | Claude 20s composition / Codex sandbox attempt | #268 | `937921af` |

## 全体構造

```text
movie-dashboard/src/data/directorRecipeCatalog.ts
  └─ 97 recipe metadata
       ↓
motion-studio/src/motion-kit/directorRecipeAdapter.ts
  └─ Motion Kit preset → 6 shared engine + props
       ↓
motion-studio/src/compositions/common/DirectorRecipePreview.tsx
  └─ 1 data-driven preview component
       ↓
motion-studio/src/DirectorRecipeRoot.tsx
  ├─ 97 recipe compositions
  ├─ 10 category reels
  ├─ highlight reel
  ├─ comparison sets
  ├─ StartAbClaudeChorus1
  └─ StartAbCodexChorus1

movie-dashboard/src/data/startSectionRecipeMap.ts
  └─ StaRt 14 section → primary / alternate / avoid
       ↓
motion-studio/scripts/check-start-section-recipe-renderable.mts
  └─ primary / alternate refsがrendererへresolve可能か検証
```

## Renderabilityの意味

`check:start-section-recipes` が保証しているのは、section map内のrecipe idが `resolveDirectorRecipeById()` を通り、6 shared engineのいずれかへ落ちること。

これは重要な機械保証だが、**見た目の完成保証ではない**。

現在把握している近似:

- `photo-2p5d-parallax` → 真のforeground/background depth separationではなくrestrained push近似
- `cam-25d-parallax` → depth layer分離済み
- `accent-halftone-burst` → 専用halftone visual実装済み
- `accent-scribble-underline` → 専用scribble visual実装済み
- `accent-stamp-triplet` → 専用stamp visual実装済み
- `native-cut`系 → 実素材2shotのcutではなくedit-point placeholderで説明
- 実写真/実動画 → `DemoBackdrop` placeholder

全recipeの `visualFidelity`（exact / representative / placeholder）は
`movie-dashboard/src/data/directorRecipeVisualFidelity.ts`で監査し、Dashboardでも明示する。

## 「見て選べる」状態の現状

Remotion Studioでは97 Composition / Category Reel / Comparisonを再生・renderできる。

一方、Movie DashboardのCatalogは現状:

- filter
- recipe説明
- section map
- render command copy
- visual fidelity表示・filter
- 人間のFavorite / Maybe / Reject（localStorage、catalog statusとは分離）

が中心で、**Dashboard内でそのまま実動画を再生するinline preview UIではない**。

人手選定は実装済みだが、Dashboard内で動画を見ながら選ぶinline previewにはまだ1段足りない。

次フェーズでは:

1. representative/placeholderを優先的に専用visualへ改善
2. review artifactをGitではなくActions artifact / local ignored outputへ出す
3. Dashboardからpreviewを見やすくする導線を作る

を行う。

## Phase I A/Bの扱い

Phase Iでは `StartAbClaudeChorus1`（00:38–00:58 research window）を実renderできる状態まで実装した。

Codex laneはCLIを実行したが、その実行環境のChromium sandbox制約でrender artifactを作れなかった。winnerはnullのまま。

重要:

- A/Bは正規StaRt音源なし
- 実Hero写真なし
- Claude側もplaceholder映像
- この状態でClaude/Codexの編集品質の勝者を決めない

さらに、Phase Iで一度review MP4をGitへforce-addしたが、repoの既存方針「生成動画はGit管理しない」と矛盾するため、review fixで撤去する。今後review MP4はGitHub Actions artifactまたはgitignored local outputにする。

## Git media policy

Gitへ入れない:

- 正規StaRt音源
- 実写真 / 実動画
- Remotion generated MP4 / MOV / WebM
- render still大量出力

Gitへ残す:

- source code
- timeline / marker metadata
- recipe / section mapping
- QA contract
- render command
- ffprobe等の小さいevidence metadata
- decision / handoff docs

## コマンド

### movie-dashboard

```sh
cd movie-dashboard
pnpm dev
pnpm build
pnpm check:movie-coach
```

### motion-studio

```sh
cd motion-studio
pnpm dev:director-recipes
pnpm director-recipes:list
pnpm render:director-recipe <recipe-id>
pnpm render:director-recipe-collection <reel-id>
pnpm check:director-recipes
pnpm check:start-section-recipes
pnpm check:claude-codex-ab
pnpm export:palmier-recipe-handoff
pnpm export:claude-codex-ab-handoff
pnpm typecheck
pnpm check
```

## Audio / Media authority

### AUDIO

正規local音源はまだ未投入。

YouTube/外部解析の秒数はresearch referenceとして利用するが、Final timing authorityは:

`cleared local audio → waveform → section marker → beat/onset review`

約2:09はFinal固定値ではない。

### MEDIA

実写真/実動画はまだDirector Recipe research previewへ投入されていない。

最終的には実素材で:

- crop safety
- photo readability
- negative space
- hero suitability
- motion suitability

を確認してから4〜8 motion familyへ絞る。

## 次の優先順位

1. 権利確認済みlocal音源を投入し、`AUDIO_BLOCKED`を解除して14 section timingをwaveformへsnap
2. 実写真・実動画を投入し、`MEDIA_BLOCKED`を解除してStaRt Extended Showcaseを本物の素材へ差し替え
3. artifactを見ながら4〜8 motion familyへ削減
4. representative/placeholderのうち採用候補だけを専用visualへ改善
5. Dashboardのinline preview導線を改善
6. Short V1とExtendedを同一素材条件で最終比較

## 関連

- `docs/opening-authority.md` — 現在のOpening authority
- `docs/handoff/START-EXTENDED-MOTION-HANDOFF-2026-08-24.md` — Extended構成handoff
- `docs/decisions/2026-08-25-start-director-recipe-overnight-report.md`
- `docs/decisions/2026-08-25-claude-codex-ab-execution-phase-i.md`
- `docs/decisions/2026-08-25-director-recipe-catalog-research.md`
- `docs/decisions/2026-08-25-start-section-recipe-mapping.md`
- `docs/decisions/2026-08-25-director-recipe-palmier-davinci-handoff.md`
- `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md`
