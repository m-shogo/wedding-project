# wedding-motion-studio

Remotion + React + TypeScriptで結婚式ムービーを制作するスタジオ。

## 最優先: Opening V1

2026-10-24上映用Opening V1は、**このmotion-studioで60秒の完成動画までrenderする**。

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

## Director Recipe Renderer（StaRt拡張、研究/比較用）

`movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A、97件の演出レシピdata）を、
実際にRemotionでpreview/renderできるようにする共有レンダラー。
**Opening V1の正本ではない。** 実写真11枚投入が最優先で、これは並行研究トラック。

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

近似・簡略化していること(Phase C以降の課題):

- `photo-2p5d-parallax` は真の視差(前景/背景レイヤー分離)ではなく、restrained pushで近似
- `accent-halftone-burst` / `accent-scribble-underline` / `accent-stamp-triplet` は専用ビジュアルが無く、既存のtriplet hitで近似
- 実写真/実動画の差し込みslotはまだプレースホルダーのみ(`DemoBackdrop` / `REAL PHOTO / VIDEO SLOT`表記)

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

## 関連

- `../docs/task-board.md`
- `../docs/opening-v1-motion-map.md`
- `../docs/02_style-bible.md`
- `CLAUDE.md`
- `MANUAL.md`
