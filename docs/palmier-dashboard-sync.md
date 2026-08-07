# Palmier結果とmovie-dashboardの同期ルール

Created: 2026-08-07

## 目的

Palmier Free + Claude Code MCP で作った10秒/30秒/90秒ラフの結果を、movie-dashboardと既存CSVへ戻すためのルール。

口頭メモで終わらせず、必ず以下へ反映する。

- `movie-dashboard` のシーン、素材、プロンプト、タスク
- `docs/templates/review-notes.csv`
- `docs/templates/ai-video-scorecard.csv`
- `docs/templates/capcut-edit-plan.csv`

## Palmier後に必ず記録するもの

| 項目 | 記録先 | 内容 |
|---|---|---|
| ラフの尺 | movie-dashboard / review-notes | 10秒、30秒、90秒など |
| 使用素材 | movie-dashboard assets | ファイルパス、種別、採否 |
| 使用シーン | movie-dashboard scenes | どの素材をどのシーンに使ったか |
| 不足素材 | movie-dashboard tasks | 生成・撮影・選定が必要な素材 |
| 良かったプロンプト | Prompt Bank | 再現したい生成プロンプト |
| ボツ理由 | scorecard / notes | 人物混入、文字混入、AI破綻など |
| CapCut作業 | CapCut Pack | BGM合わせ、字幕、キーフレーム、トランジション |

## 10秒テスト後の同期

Palmierで10秒ラフを作ったら、以下を更新する。

### movie-dashboard

1. `scenes` に `Palmier 10秒試作` を登録、または既存Opening scenesへ紐付ける。
2. 使用素材を `assets` に登録する。
3. 不足素材を `tasks` に登録する。
4. 良いAI素材は `candidate`、本採用候補は `selected` にする。
5. ボツ素材は `rejected`、再生成は `needs_regen` にする。

### CSV / docs

- `docs/templates/review-notes.csv`: Palmier操作性、尺、違和感を記録。
- `docs/templates/ai-video-scorecard.csv`: AI素材の採点。
- `docs/templates/capcut-edit-plan.csv`: CapCutで仕上げる作業を記録。

## 30秒テスト後の同期

30秒テストでは、構成成立の可否を中心に記録する。

確認項目:

- 冒頭で引き込めるか
- 旅行テーマが伝わるか
- 入場直前に高揚感があるか
- 実写真とAI背景の比率が自然か
- 似たAI背景が連続していないか
- CapCutへ渡す作業が明確か

movie-dashboardへ反映するステータス:

| 状態 | 意味 |
|---|---|
| `candidate` | 試作で使えたが本採用未定 |
| `selected` | 本編ラフに進める素材 |
| `needs_regen` | 構図は良いが再生成が必要 |
| `rejected` | 人物・文字混入、AI破綻、テーマ不一致 |
| `used_in_capcut` | CapCut投入済み |
| `final` | 最終版採用 |

## 90秒ラフ後の同期

90秒ラフ後は、CapCut Packを作る。

必須出力:

| column | 内容 |
|---|---|
| order | カット順 |
| start | 開始秒 |
| end | 終了秒 |
| sceneId | 絵コンテのシーンID |
| assetId | 素材ID |
| sourceType | ai-video / photo / remotion / text / bgm |
| caption | 後乗せテロップ |
| capcutWork | CapCutで行う作業 |
| qaNote | QA注意点 |

## Claude Codeへの同期プロンプト

Palmier試作後にローカルで使う。

```text
/Users/m-shogo/Developer/personal/wedding-project で作業してください。

Palmierで作成した今回のラフ編集結果を、movie-dashboardと既存CSVに反映してください。

入力情報:
- ラフの種類: 10秒 / 30秒 / 90秒
- 使用素材一覧
- 良かった素材
- ボツ素材
- 不足素材
- CapCutで仕上げる作業
- 気になった点

反映先:
1. movie-dashboardのデータ。必要ならJSONエクスポート内容をsrc/dataへ反映
2. docs/templates/review-notes.csv
3. docs/templates/ai-video-scorecard.csv
4. docs/templates/capcut-edit-plan.csv
5. docs/task-board.md

必ず守ること:
- 大きな画像・動画・音源はGitに入れない
- 実素材のパス、採否、メモだけGitに残す
- 人物・犬・家族・友人のAI生成/AI変形は禁止
- AI素材に人物、動物、文字、数字、ロゴ、看板が入っていたら rejected または needs_regen
- CapCutは最終仕上げ。Palmierはラフ編集まで

完了条件:
- 整合性が取れている
- 不足素材がMissing List/Tasksに入っている
- CapCut Packに次の編集作業が出ている
- commitして報告
```

## 失敗時の戻し方

Palmier側で壊れた場合:

1. 元素材は触らず、Palmierプロジェクトをコピーして再試行する。
2. 壊れたラフは `99_archive/` へ移動する。
3. 何が壊れたかを `docs/templates/review-notes.csv` に残す。
4. 同じ失敗が3回続いたらPalmierではなくCapCut手動またはmotion-studioへ戻す。

## 判断基準

Palmierを継続する:

- 素材整理が速くなる
- 不足素材が明確になる
- 10秒/30秒ラフが安全に作れる
- CapCut前の構成確認として役立つ

Palmierを保留する:

- タイムライン操作が不安定
- 素材の読み取りが弱い
- 変更内容が分かりにくい
- CapCutへ渡す前に余計な手戻りが増える
