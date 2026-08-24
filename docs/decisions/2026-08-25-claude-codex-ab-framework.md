# Claude / Codex A/B comparison framework (Phase G)

Date: 2026-08-25
Status: 実装完了。実際のwinner判定は未実施（人間確認待ち・設計通り）。

## 背景

Director Recipe Catalog Phase A〜F（movie-dashboard 97演出レシピ、motion-studio共有レンダラー、
Reel/比較セット、Movie Dashboard閲覧UI、StaRt section⇄recipeマッピング、Palmier/DaVinci
handoff）がmainへマージ済み（`813bf9f5`）。これはStaRt Extended Openingの研究トラックで、
Opening V1（2026-10-24上映の本番正本）とは別系統。

Phase Gの目的は、同一音源・同一時間・同一素材・同一briefでClaude CodeとCodex CLI/agentの2系統
の制作結果を比較できる枠組みを作ること。目的は「どちらが優れているかを自動で決める」ことでは
なく、**人間が公平に見比べられる状態を機械的に整えること**。

## Codex CLI利用可否の実測

推測ではなく実際にコマンドを実行して確認した。

```text
$ which codex
/opt/homebrew/bin/codex

$ codex --version
codex-cli 0.144.1

$ codex doctor
...
auth mode                chatgpt
stored ChatGPT tokens    true
websocket    connected (HTTP 101 Switching Protocols) ...
reachability active provider endpoints are reachable over HTTP
16 ok · 1 idle · 3 notes · 1 warn · 0 fail degraded

$ codex exec --sandbox read-only "Reply with exactly the text: CODEX_OK"
...
model: gpt-5.6-sol
...
codex
CODEX_OK
```

結論: **Codex CLIはこの環境で実際に利用可能**（brew管理、ChatGPT認証済み、`codex exec`が
実際に応答を返すことを確認）。したがって `CODEX_BLOCKED` は該当しない。

## 実行スコープの判断

タスク指示は「Codex agentを実際に起動して作業させるところまでやってよいが、時間がかかりすぎる
場合は依頼プロンプトの生成までで良い」としている。

Phase G自体の設計・データ構造・contract・check scriptの実装と検証（このセッションの主作業）に
加えて、Codexに実際に20秒分のRemotion renderをフルで作らせるのは、単一セッションのbash実行時間
予算に対して重い（Remotion renderは数十秒〜分オーダー、Codex側の試行錯誤も含めると更に伸びる）。

そのため、このPhaseでは:

1. Codex CLIの実利用可能性は実測で確認済み（上記）。
2. Codexが実行できる**完全なhandoffプロンプト**を
   `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` として作成した。このファイル単体で
   Codexが迷わず作業を開始できる（repo構造、対象20秒区間、primary/avoid recipe、評価軸、
   winner確定条件をすべて含む）。
3. Codex側の実際のフルrender実行はこのセッションでは行わず、次のセッションでこのhandoffを
   `codex exec` または対話セッションへ渡す形で引き継ぐ。

**フェイク実行はしていない。** `codex exec`の疎通確認は実際に行ったが、20秒分のDirector
Recipe renderという本番タスクそのものは未実行であり、`startClaudeCodexAB.ts`の
`codexCandidate.artifactPath`は`null`のままにしてある。

## 設計判断

### データ構造を movie-dashboard に置いた理由

Phase A（`directorRecipeCatalog.ts`）・Phase E（`startSectionRecipeMap.ts`）と同じ
`movie-dashboard/src/data/`に置くことで、既存の「単一情報源はmovie-dashboard側、motion-studio
は相対importで読むだけ」という規約（Phase B/F README記載）を踏襲した。新しい配置ルールを
増やしていない。

### winner nullを機械的に守る二段構え

1. `validateStartAbComparisonShape()`（`startClaudeCodexAB.ts`内、fs非依存）:
   winnerが非nullならdecidedBy/decidedAt/対応するartifactPathが必須、というデータ形状の整合性
   をチェックする。ブラウザ側（movie-dashboard）からも同じ関数を再利用できる。
2. `motion-studio/scripts/check-claude-codex-ab.mts`（fs依存）:
   上記に加えて、**artifactPathが実際にファイルとして存在するか**をfilesystemで確認する。
   存在しないパスがartifactPathに入っているだけでbuildを失敗させる
   （winnerが未設定でも、存在しないpathを指すこと自体をエラーにする）。

この2つを分けたのは、Phase A〜F全体で「movie-dashboard側のdataファイルはブラウザからも
Node scriptからも読める、fs操作はmotion-studio scripts側に閉じる」という既存の責務分離
（`motion-studio/CLAUDE.md`「Node直実行 `.mts` とRemotion browser codeの責務を混ぜない」）
に合わせるため。

### レーン分離の方法

Palmier project名（`START_AB_CLAUDE` / `START_AB_CODEX`）とexport出力ディレクトリ
（`motion-studio/exports/palmier-ab/claude/` / `.../codex/`）の両方で分離した。
Palmier側は実際のprojectをこのセッションでは作成していない（`docs/palmier-operation.md`の
「まだ本編集しない」方針を踏襲し、read-only export packの生成に留めた）。両レーンのexport
packは実際に生成・検証済み（`pnpm export:claude-codex-ab-handoff`）。

### 対象20秒区間の選定

`startExtendedRhythmMap.ts`の`chorus-1-a`(38-48s)+`chorus-1-b`(48-58s) = 20秒を選んだ。
理由:

- タスク指示の「20〜30秒」範囲に収まる実在のsection境界（恣意的に秒数を切っていない）。
- Phase Eマッピングで最もdensity/energyが高い区間（peak/peak）であり、比較の意味が出やすい。
- chorus-1-a→chorus-1-bは「Hero写真提示→同一Hero維持のまま3-hit」という明確な構造を持ち、
  評価軸（3-hit演出、chorus持ち上がり等）と直接対応する。

## 実装したもの

| ファイル | 役割 |
|---|---|
| `movie-dashboard/src/data/startClaudeCodexAB.ts` | 12評価軸(rubric付き)、比較データ構造、winner null contract、`validateStartAbComparisonShape()` |
| `motion-studio/scripts/export-claude-codex-ab-handoff.mts` | Claude/Codex両レーンの独立したhandoff pack(csv/md/json)を生成 |
| `motion-studio/scripts/check-claude-codex-ab.mts` | 評価軸の形式チェック + artifactPath実在チェック + winner contract検証。`pnpm check`に組み込み済み |
| `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` | Codexへそのまま渡せる完全な依頼プロンプト |
| `docs/decisions/2026-08-25-claude-codex-ab-framework.md` | 本ファイル |

## 検証結果

```text
cd motion-studio
pnpm export:claude-codex-ab-handoff   # OK: 2 section rows x 2 lanes (csv/md/json each)
pnpm check:claude-codex-ab            # OK: 12 axes, winner=null (expected)
pnpm typecheck                        # OK
pnpm check                            # OK (check:motion / assets / parts / presets /
                                       #     start-motion-kit / director-recipes /
                                       #     claude-codex-ab すべて成功)
cd ../movie-dashboard
pnpm build                            # OK (tsc -b && vite build 成功)
```

## Phase Hへの引き継ぎ

- `startClaudeCodexAB.ts`の`codexCandidate.artifactPath`と`claudeCandidate.artifactPath`は
  両方まだ`null`。実際に両レーンでrenderを実行し、パスを埋めるのは次フェーズの作業。
- Codexへの依頼は`docs/handoff/2026-08-25-codex-ab-comparison-handoff.md`をそのまま渡せば
  開始できる状態。
- winnerを決めるのは人間。どちらのAIも自発的にwinnerを埋めない
  （`check-claude-codex-ab.mts`が実在しないartifactPathを弾くため、捏造しても機械的に落ちる）。
- Extended Motion Showcase仕上げ（Phase H）を進める際、この比較結果を直接の意思決定材料には
  せず、あくまで参考research trackとして扱う。Opening V1（本番）には影響しない。
