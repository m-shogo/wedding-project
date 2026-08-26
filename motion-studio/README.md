# wedding-motion-studio

Remotion + React + TypeScriptで結婚式ムービーを制作するスタジオ。

## Opening authority

Opening全体の単一authorityは `../docs/opening-authority.md`。

- StaRt Extended Candidate = 本命方向
- Opening V1 60秒 = Short Candidate / venue fallback / 比較用
- このREADMEでShortの実装手順が先に出ることを、Final採用済みという意味にしない

## Short Candidate: Opening V1

Opening V1は、**このmotion-studioで60秒のShort fallbackまでrenderできる実装**。

現行正本:

- `src/index-opening-v1.ts`
- `src/OpeningV1Root.tsx`
- `src/compositions/opening/OpeningV1.tsx`
- `src/data/openingV1.ts`
- `../docs/opening-v1-motion-map.md`

仕様:

- 60秒 / 1920×1080 / 30fps
- 8scene
- 実写真scene 53秒（約88%）
- 必須AI B-roll 0本
- 冒頭2秒から実写真
- fake `CloudSea` transitionなし
- 中央serif Wedding titleなし
- Palmier / CapCutは必要時のfinal polishだけ

## 最短操作

### 1. 写真を置く

`public/photos/opening/`

```text
okinawa-01.jpg
okinawa-02.jpg
okinawa-03.jpg
seoul-01.jpg
seoul-02.jpg
seoul-03.jpg
hawaii-01.jpg
hawaii-02.jpg
hawaii-03.jpg
hero-01.jpg
hero-02.jpg
```

### 2. Studioで確認

```sh
pnpm install
pnpm dev:opening-v1
```

写真探索は自動。通常は手動 `pnpm sync:photos` 不要。

### 3. preview

```sh
pnpm render:opening-v1:preview
```

出力:

`out/preview/opening_v1_preview.mp4`

### 4. final

```sh
pnpm render:opening-v1
```

出力:

`out/opening/opening_v1.mp4`

finalはcanonical写真11/11が揃っていないと失敗する。

## Opening V1 timeline

| time | scene | source |
|---|---|---|
| 00:00–00:02 | Photo cold open | Hero実写真 |
| 00:02–00:13 | Okinawa | 実写真3枚 |
| 00:13–00:24 | Seoul | 実写真3枚 |
| 00:24–00:35 | Hawaii | 実写真3枚 |
| 00:35–00:44 | Hero A | 実写真 |
| 00:44–00:53 | Hero B | 実写真 |
| 00:53–00:57 | Hawaii → Yokohama | Remotion route |
| 00:57–01:00 | Documentary end card | Remotion text |

## Opening QA

```sh
pnpm prepare:opening-v1
pnpm typecheck
pnpm check
pnpm check:opening-sound
pnpm exec remotion compositions src/index-opening-v1.ts
pnpm qa:opening-stills
```

Opening変更PRではGitHub Actionsが自動で:

- photo discovery
- TypeScript
- motion / asset / part / preset contracts
- sound cue contract
- 60秒Composition contract
- 10-frame Visual QA still render

を実行する。

**CI GREENだけでmergeしない。** `opening-v1-qa-stills` artifactを実際に目視する。

placeholder時も写真領域に薄いコントラストが出るので、full / left / right / wideの構図を確認できる。

## 写真表示ルール

| role | fit |
|---|---|
| full | cover |
| left / right | cover |
| wide | contain |
| cold open / Hero A / Hero B | contain |

縦写真をblur背景で無理に16:9化しない。
`cover`で顔が切れる写真だけ `objectPosition` を調整する。

## motionルール

- staticが第一候補
- pushは最大約2.4%程度
- driftは小さく
- 全写真Ken Burns禁止寄り
- zoom / whip / glow / film burnを常用しない
- transitionで誤魔化さずhard cutとsound continuityを優先

## 音

Opening音源は `src/data/assets.ts` と `src/data/openingV1Sound.ts` で管理する。

- `missing` の音源は再生されない
- `candidate / approved / final` のaudioだけtimelineへ入る
- BGMと環境音の上映/SNS利用条件を確認してからstatusを上げる
- J-cutで海・街・会場room toneを次の画より少し先行させる
- whooshを全cutへ付けない

## Visual QAで削除済み

以下はOpening V1へ戻さない:

- 5秒中央serif title
- `CloudSea` 4秒transition
- 大きなWedding ending title
- 均等3枚Photo Card
- `MEMORY 01` / `WELCOME ABOARD`等の説明kicker

必要性を実写真previewで説明できる場合だけ再検討する。

## 既存テンプレート群

`src/Root.tsx` 側には、過去に作った短尺素材/プロフィール用テンプレートも残っている。

例:

- 搭乗券
- route map
- passport stamp
- countdown
- photo card
- profile chapter title
- timeline
- single photo
- intro card

これらは**Opening V1の現行timeline正本ではない**。
必要な別ムービーや比較検証でのみ使う。

一覧確認:

```sh
pnpm dev
pnpm exec remotion compositions src/index.ts
pnpm preset
```

legacy `開幕-全体確認` 82秒版は順番/歴史確認用。Opening V1の正本ではない。

## Director Recipe Renderer（StaRt Extended本命方向の制作/比較用）

`movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A、97件の演出レシピdata）を、
実際にRemotionでpreview/renderできるようにする共有レンダラー。
**Extended本命方向の制作基盤。** ただしcatalog自体をFinal扱いせず、実素材で4〜8 motion familyへ削る。

設計方針: 97個の個別コンポーネントは作らない。各レシピは `motionPresetIds`
(既存36 Motion Kit presetへの参照)を持ち、それを6つの共有engineへ機械的にマッピングする。

```text
directorRecipeCatalog.ts (movie-dashboard, Phase A data)
  → src/motion-kit/directorRecipeAdapter.ts (recipe → engine + props)
  → src/compositions/common/DirectorRecipePreview.tsx (1つのdata-driven component)
  → src/DirectorRecipeRoot.tsx (97件分のCompositionをcatalogから自動登録)
```

共有engine(`src/motion-kit/engines.tsx`)は6つ。既存4つ + Phase Bで追加した2つ:

| engine | 由来 | 用途 |
|---|---|---|
| `TypographyRevealEngine` | 既存(StaRt Motion Kit) | mask/punch/stagger文字 |
| `CameraTransformEngine` | 既存 | static/push/pull/pan |
| `TransitionWipeEngine` | 既存 | 方向wipe、color field release |
| `GraphicHitEngine` | 既存 | triplet/speed-lines/impact |
| `NativeCutEngine` | **Phase B新規** | hard cut / J-cut / L-cutの編集点そのものを可視化(9レシピが該当) |
| `PhotoLayoutEngine` | **Phase B新規** | contact sheet / split panel / panel gridの複数写真並び |

`directorRecipeCatalog.ts` はmovie-dashboard側のデータファイルをそのまま相対import
している(モノレポにpnpm workspaceは無いが、同一Git repo内なのでesbuild/tscとも解決できる)。
データの単一情報源はmovie-dashboard側のまま。motion-studio側にコピーは作らない。

コマンド:

```sh
pnpm dev:director-recipes                  # Remotion Studioで97件を確認
pnpm director-recipes:list                 # 全Composition idを一覧
pnpm render:director-recipe cam-locked-frame   # 1件だけlow-res renderして確認(既定 scale=0.25 crf=30)
pnpm check:director-recipes                # 97件全件がresolve可能か + engine契約を検証(pnpm checkに含まれる)
```

`pnpm check:director-recipes` は以下を検証する。

- 97件全てが `directorRecipeAdapter.ts` を通ってthrowせずresolveすること
- 使用engineが上記6つの外に出ていないこと(=個別コンポーネントへ逃げていないこと)
- `DirectorRecipeRoot.tsx` がcatalogをmapして登録している(手書き97個ではない)こと
- `index-director-recipes.ts` が正しくregisterRootしていること

近似・簡略化していること(Phase D以降の課題):

- `photo-2p5d-parallax` は真の視差(前景/背景レイヤー分離)ではなく、restrained pushで近似
- `cam-25d-parallax` / `accent-halftone-burst` / `accent-scribble-underline` / `accent-stamp-triplet` は専用ビジュアルへ更新済み。`StartDirectorVisualUpgradesV1`で4種をまとめて比較できる
- 実写真/実動画の差し込みslotはまだプレースホルダーのみ(`DemoBackdrop` / `REAL PHOTO / VIDEO SLOT`表記)

### Preview Catalogue / Director Motion Reel / Category Reels（Phase C）

97件を「データとして存在するだけ」から「見て比較できるプレビュー」にする層。
**Movie Dashboard側のUI一覧・フィルタ画面はPhase D。ここではRemotion Composition止まり。**

新設ファイル:

```text
src/motion-kit/directorRecipeReelSelections.ts       Reel/Category Reel/比較セットの選抜ロジック(data-driven, JSX無し)
src/compositions/common/DirectorRecipeReel.tsx        Reel本体(既存DirectorRecipePreviewを再利用して連結表示するだけ)
src/compositions/common/DirectorRecipeComparison.tsx  比較グリッド(同一frame上に複数レシピを並べて表示)
scripts/render-director-recipe-collection.mts          Reel/Category Reel/比較セットのrenderコマンド
```

`directorRecipeReelSelections.ts` の選抜ロジックが計算(`placeRecipesSequentially` / `reelDurationInFrames` /
`comparisonDurationInFrames`)を持ち、`.tsx`側はレンダリングだけを担当する。
これは意図的な分離: `check:director-recipes` はプレーンなNode ESM loaderで `.mts` を直接実行するため、
JSXを含む `.tsx` を直接importできない(importすると `ERR_UNKNOWN_FILE_EXTENSION` で落ちる)。

#### Director Recipe Highlight Reel

全カテゴリ各2件、カタログ順で20/97件を選抜した通し視聴用reel。カテゴリ網羅を優先し、
各カテゴリの残りは個別のCategory Reelで見る。

```text
DirectorRecipeReel-Highlight   20 recipes / 52.07秒（実測）
```

#### Category Reels（10、`directorRecipeCategories` から自動生成。97件を過不足なく分担）

| Composition id | カテゴリ | 件数 | 尺(実測) |
|---|---|---:|---:|
| `DirectorRecipeReel-cinematic-camera` | Cinematic Reel | 9 | 38.60秒 |
| `DirectorRecipeReel-photo-presentation` | Photo Presentation Reel | 9 | 23.40秒 |
| `DirectorRecipeReel-typography` | Typography Reel | 9 | 9.80秒 |
| `DirectorRecipeReel-anime-op-grammar` | Anime OP Reel | 9 | 8.13秒 |
| `DirectorRecipeReel-cut-transition` | Cut & Transition Reel | 9 | 7.40秒 |
| `DirectorRecipeReel-rhythm-music-hit` | Rhythm Reel | 9 | 14.93秒 |
| `DirectorRecipeReel-travel` | Travel Reel | 9 | 21.00秒 |
| `DirectorRecipeReel-editorial-cm` | Editorial / CM Reel | 9 | 28.60秒 |
| `DirectorRecipeReel-wedding-emotion` | Wedding Reel | 9 | 36.00秒 |
| `DirectorRecipeReel-start-specific` | StaRt Reel | 16 | 83.13秒 |

タスク依頼にあった7分類(Cinematic / Anime OP / Travel / Typography / Rhythm / Wedding / StaRt)は
上表にすべて含まれる。それ以外の3カテゴリ(Photo Presentation / Cut & Transition / Editorial CM)も
`directorRecipeCategories` を機械的にiterateして同じ仕組みでreel化しており、97件全部がどこかの
Category Reelに属する(手作業で選んだ7個だけを特別扱いしていない)。

Composition idはRemotionの命名制約(`a-z A-Z 0-9 CJK -` のみ、`_` 不可)のため、
カテゴリのSNAKE_CASE enum値を `categorySlug()` でkebab-caseへ変換している。

#### 比較セット(最低2組、`comparisonSets`)

同じ編集上の「瞬間」を複数レシピで同時に見せるグリッド。各レシピは自分のframe時計で動くため、
1枚のframeの中で演出差だけを比較できる。

| Composition id | 内容 | 収録レシピ |
|---|---|---|
| `DirectorRecipeComparison-hero-photo-presentation` | 同じHero写真を6つの提示方法で比較 | `photo-full-bleed` / `cam-restrained-push` / `cam-slow-pull` / `photo-negative-space` / `photo-freeze-on-motion` / `photo-editorial-crop` |
| `DirectorRecipeComparison-three-hit-accent` | 同じ3-hitタイミングを6つのaccent文法で比較 | `rhythm-three-hit` / `typo-word-punch` / `anime-impact-frame` / `travel-passport-stamp` / `cut-soft-impact` / `anime-micro-rgb` |

#### コマンド

```sh
pnpm exec remotion compositions src/index-director-recipes.ts   # Reel/Category Reel/比較セットのid一覧を含む全件表示
pnpm dev:director-recipes                                       # Remotion Studioで再生確認
pnpm render:director-recipe-collection DirectorRecipeReel-Highlight
pnpm render:director-recipe-collection DirectorRecipeReel-typography
pnpm render:director-recipe-collection DirectorRecipeComparison-hero-photo-presentation
pnpm check:director-recipes   # 97件の契約チェックに加え、Highlight Reel/Category Reel/比較セットの
                               # カバレッジ・重複・尺上限(研究reel1本あたり90秒)も検証。pnpm checkに含まれる
```

既定は `--scale=0.667 --crf=30`(1920x1080 Composition→1280x720、研究用低bitrate)。
`--scale=1` を渡せば1080pフルレンダーになる。

実測レンダー(このPhase Cで実施):

```text
pnpm render:director-recipe-collection DirectorRecipeComparison-hero-photo-presentation
  → out/director-recipes/DirectorRecipeComparison-hero-photo-presentation.mp4
  → 1280x720 / h264 / 30fps / 6.06秒 / 296.6 kB / 成功

pnpm render:director-recipe-collection DirectorRecipeReel-typography
  → out/director-recipes/DirectorRecipeReel-typography.mp4
  → 1280x720 / h264 / 30fps / 9.80秒 / 595.1 kB / 成功
```

`out/director-recipes/**` は生成物なのでGit管理しない。

#### Phase D以降への引き継ぎ

- Movie Dashboard側での一覧・フィルタ・ブラウジングUIは実装済み(Phase D、`movie-dashboard`の`Director Recipe Catalog`ページ)。
- Palmier/DaVinci handoffファイル生成は実装済み(Phase F、`exports/palmier/`)。
- Claude/Codex A/Bフレームワークは実装済み(Phase G、下記)。両レーンの実render・winner確定はまだ未実施(人間確認待ち)。
- 97件全部の高画質1080pフルレンダーは意図的に未実施(研究用途では不要という判断)。歌詞・著作権音源・実在人物のAI生成は一切扱っていない。

### Claude / Codex A/Bフレームワーク（Phase G、研究/比較用）

同一音源・同一20秒(chorus-1-a + chorus-1-b, 00:38-00:58)・同一briefで、Claude CodeとCodex
CLI/agentの制作結果を人間が公平に見比べるための枠組み。**Opening V1には影響しない。**

```text
movie-dashboard/src/data/startClaudeCodexAB.ts   12評価軸(rubric付き) + 比較データ + winner null contract
motion-studio/scripts/export-claude-codex-ab-handoff.mts   Claude/Codex両レーンの独立handoff pack生成
motion-studio/scripts/check-claude-codex-ab.mts            評価軸の形式 + artifactPath実在 + winner contractを検証(pnpm checkに含まれる)
docs/handoff/2026-08-25-codex-ab-comparison-handoff.md      Codexへそのまま渡せる完全な依頼プロンプト
docs/decisions/2026-08-25-claude-codex-ab-framework.md      設計判断とCodex CLI実測結果
```

```sh
pnpm export:claude-codex-ab-handoff   # exports/palmier-ab/{claude,codex}/ に独立したhandoffを生成
pnpm check:claude-codex-ab            # winner!=null なら対応するartifactPathが実在するか等を検証
```

**winnerはAIが自分では確定しない。** `codexCandidate.artifactPath` / `claudeCandidate.artifactPath`
は実際にrenderしたファイルのrepo相対パスが入るまで`null`のまま。存在しないパスを入れると
`check:claude-codex-ab`がbuildを失敗させる。

## 既存テンプレを書き出す場合

```sh
pnpm render <テンプレID> preview
pnpm render <テンプレID> draft
pnpm render <テンプレID> final
pnpm render <テンプレID> prores
```

透過素材などの既存コマンドも `package.json` に残している。

## AssetStatus

| status | 意味 |
|---|---|
| missing | 未入手 |
| idea | アイデア |
| prompt_ready | 生成準備済み |
| generated_preview | 試作。本番使用不可 |
| candidate | 採用候補 |
| approved | 採用決定 |
| final | 本番使用OK |
| external | repo外管理 |

AIが勝手にcandidate以上へ昇格させない。
approved/final素材が消えていれば `check:assets` が失敗する。

## Git管理

Gitへ入れない:

- `public/photos/` の実写真
- `public/audio/` の本番音源
- `out/` の動画/still
- 大きなAI生成素材

Gitへ残す:

- Remotion source
- timeline / asset registry
- prompt / QA / decision
- docs / CSV / contract scripts

## StaRt 129秒 3案ショーケース(研究・比較用。Extended/Short本番とは別枠)

`docs/opening-authority.md`のProduct authority(Extended本命/Short fallback)を変更しない、129秒通し比較用の研究実装。詳細: `../docs/handoff/start-129-showcase-review-guide.md`。

- A案(旅の記録映画) / B案(冒険アニメOP) / C案(リズム・タイポMV)
- 共通14 section・129秒・歌詞32slotデータモデルは `src/data/start129/`
- 実写真・正規音源・歌詞は未投入(placeholderでrender可能)

```sh
pnpm dev:start-129              # Studioで6 Composition(A/B/C × Clean/Guide)を確認
pnpm render:start-129:a         # A案 低解像度preview
pnpm render:start-129:b         # B案
pnpm render:start-129:c         # C案
pnpm qa:start-129                # 代表15時点 × 3案のstillを一括render(要目視)
pnpm check:start-129             # データ契約チェック(129秒/歌詞32slot順序/重複)。Visual QAの代替にはならない
```

ローカルデータ配置(すべてGit管理外):

```text
motion-studio/local/lyrics.local.json     権利確認済み歌詞32句(schema: src/data/start129/localLyrics.ts)
motion-studio/local/rights.local.json     権利メモ(schema: src/data/start129/localRights.ts)
motion-studio/local/audio/start-129.mp3   権利確認済み音源(mp3/wav/m4a/aac)
```

無料ダミー素材(Pexels公式API。`PEXELS_API_KEY`必要):

```sh
python3 scripts/fetch-start-129-demo-assets.py --role HERO_WIDE --count 3          # 候補確認
python3 scripts/fetch-start-129-demo-assets.py --role HERO_WIDE --count 3 --write  # 取得
pnpm sync:start-129-demo-assets                                                     # 目視確認後、Remotionへ反映
```

## StaRt Wedding Edit(音楽主導版。129秒固定を撤回した実装)

`Start129`(上記、129秒/14 section/歌詞32 slot固定)は旧仕様。Wedding Editは
「曲の先頭〜2番サビ後の間奏が終わる地点」を実測(2026-08-26時点145.6秒)で使う、
Palmier Pro on-device beat detectionによる実測beat同期版。詳細:
`../docs/decisions/2026-08-25-start-wedding-edit-scope-change.md`。

- 実音源: `motion-studio/local/audio/StaRt.m4a`(gitignore済み)
- 実歌詞: 1〜37行目(2回目「僕は探すんだ」まで)を30 phraseとして可変長timing
- 冒頭は「S→StaRt」を実測beatへ同期させて組み立てる(旧「ようこそ」は削除)
- 歌詞animation familyは12種類を実使用(character-build 20%、3連続同一familyなし):
  character-build / word-hit / three-hit-build / held-note-stretch / whisper-reveal /
  impact-word / split-conflict / question-pause / repetition-echo / baseline-travel /
  type-mask / foreground-reveal
- ローカルデータ: `local/{structure,phrase,word-accent,beat,transition}-map.local.json`
  (すべてgitignore済み。`verifiedByListening: false` — 人間の聴取による最終確認は未実施)

```sh
pnpm sync:start-wedding-edit-local        # 音源trim + データ検証 + generated.ts更新
pnpm dev:start-wedding-edit                # Studioで6 Composition確認
pnpm render:start-wedding-edit:v2          # フル解像度6本 → out/start-wedding-edit-final-v2/
pnpm typecheck
pnpm check:start-wedding-edit-phrase-qa    # 歌詞データ契約(coverage/family分布/StaRt完成)
node --no-warnings scripts/check-start-wedding-edit-render-qa.mts --dir=out/start-wedding-edit-final-v2
```

既知の限界: 音声を人間が聴取して確認したものではない(2026-08-26まで、この環境に
聴取手段が無かった)。Type Maskは実shot連動ではなく固定写真を使用。
Lyric-to-Transition / Call-and-Response Layout / Ending Dissolveは独立animation
familyとしては未実装。

### Cue聴取確認(TimingMaster、人間が実際に聴いて`verifiedByListening`を上げる手段)

```sh
pnpm render:cue-listening-clips   # 全78 cue(vocal cue 73 + letterCue 5)の前後クリップを生成
open local/analysis/start-wedding/listening-review.local.html   # ブラウザで聴取
```

聴取結果は `local/analysis/start-wedding/listening-decisions.local.json`(手で作成、
すべてgitignore済み)へ次の形式で記録する。

```json
{
  "verifiedBy": "人間の名前",
  "decisions": [
    {"cueId": "P012-H01", "status": "ok"},
    {"cueId": "P012-H02", "status": "adjust", "deltaMs": -40, "note": "少し早く感じる"},
    {"cueId": "INTRO-START-S", "status": "reject", "note": "確認できない"}
  ]
}
```

```sh
pnpm apply:listening-verification   # decisionsに列挙したcueだけへ安全に反映
pnpm sync:timing-master             # generated.tsへ反映
```

decisionsに列挙されていないcueは一切変更されない(全件一律verified化はしない)。
`status=adjust`のdeltaMsは既存`cueOffsetMs`への加算であり、置換ではない
(二重適用防止のため`resolveEffectiveCueTimeMs()`経由でのみ最終合成される)。
`status=reject`のcueは`verifiedByListening`をtrueにせず、再確認が必要な状態のまま残す。

## 関連

- `../docs/task-board.md`
- `../docs/opening-v1-motion-map.md`
- `../docs/02_style-bible.md`
- `../docs/handoff/start-129-showcase-review-guide.md`
- `../docs/decisions/start-129-three-showcase-directions.md`
- `CLAUDE.md`
- `MANUAL.md`
