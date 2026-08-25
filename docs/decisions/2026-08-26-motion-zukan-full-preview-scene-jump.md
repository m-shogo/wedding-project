# モーション図鑑 — 全体通しPreviewからScene編集へ戻る導線

Date: 2026-08-26
Status: Accepted
Scope: Movie / モーション図鑑 / Opening・Profile共通

## 決定

Opening / Profile の全体通しPreview画面では、映像再生の下にシンプルなSceneタイムラインを表示する。

ユーザーは通し再生を見ながら、気になったSceneをタイムライン上で選択し、そのSceneの編集画面へ直接戻れる。

## 目的

通し再生で「ここだけ直したい」と感じたときに、Sceneを探し直す手間をなくす。

基本フロー:

1. Motion単体Preview
2. 自分の素材でTry-on Preview
3. 2候補Compare
4. 採用
5. 前後Scene込みContext Preview
6. Opening / Profile 全体通しPreview
7. 気になったSceneをタイムラインから選択
8. そのSceneの編集画面へ戻る

## UI原則

全体Preview画面は分析ダッシュボードにしない。

映像の下には必要最小限のSceneナビゲーションだけを置く。

例:

```text
[                Full Preview                ]

Scene 01 | Scene 02 | Scene 03 | Scene 04 | Scene 05
                      ^
                    current
```

Sceneをクリックすると、そのSceneを選択した状態でScene Composer / 編集画面へ遷移する。

## 表示してよいもの

- Sceneの順番
- Sceneの短い名前またはサムネイル
- 現在再生中のScene
- 選択中のScene
- クリック / タップで編集へ戻る導線

## 表示しないもの

通しPreview画面では以下を常設しない。

- AI採点
- 自動品質評価
- Motion重複警告
- 方向重複警告
- テンポ診断
- 自動修正提案
- Propertyの詳細値一覧
- DaVinci Inspector相当の編集UI

通しPreviewの主目的は「映像を見ること」であり、Sceneタイムラインは編集箇所へ戻るためのナビゲーションである。

## 非破壊原則

Sceneタイムライン上の移動・選択・シーク操作だけでは、以下を変更しない。

- SceneInstance
- HUMAN_SELECTED
- LOCKED
- Motion設定
- Property Override
- Timeline順序

ユーザーが実際にScene編集画面で変更を確定したときのみHuman Masterを更新する。

## 再生位置との連携

全体Previewの再生位置から現在のSceneを判定し、タイムライン上で現在位置を分かりやすく表示する。

ただし初期実装では複雑な編集タイムラインを作らない。

必要なのは「今どのSceneか分かる」「Sceneを押すと戻れる」の2点。

## Opening / Profile

同じ仕組みを利用する。

- Opening全体通しPreview → Opening Scene Timeline
- Profile全体通しPreview → Profile Scene Timeline

プロジェクト種別によって別NLEを作らない。

## 境界

モーション図鑑 / Scene ComposerはDaVinci Resolveの編集タイムラインを再実装しない。

細かなクリップ編集、Spline、Fusion、Color、Fairlight等はDaVinciで仕上げる。

このScene Timelineは「ムービー全体を見て、直したいSceneへ素早く戻る」ための軽量ナビゲーションである。
