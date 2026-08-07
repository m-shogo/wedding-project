# Palmier Agent Handoff

更新基準日: 2026-08-07

`movie-dashboard` の **Palmier 実行Handoff** は、動画Prompt・生成結果・scene情報をClaude Code / Palmier MCPへ渡すための実行パック。

## 目的

Palmier作業開始時に毎回、

- どのPromptを使うか
- 何が生成済みか
- どのsceneへ置くか
- first / last frameが必要か
- どれをレビューすべきか
- どれが不採用か

を人間が再整理しない。

## 自動route

### draft

- 原則: 低コスト試作。
- movie-dashboardの動画生成キューからpacketを取得。
- Palmier側にはplaceholderとmetadataだけ準備可能。
- generation creditsは自動消費しない。

### testing + resultAssetなし

- 生成結果待ち。
- 既に外部で生成済みならmovie-dashboardへresult pathを登録。
- 未生成なら1本だけ試作し、結果を先にレビューする。

### testing + resultAssetあり

- 新規生成ではなく **AI動画 結果レビュー** を優先。
- Palmierへ置く場合もreview placeholderとして扱い、採用扱いにしない。

### adopted

- Palmier / CapCut実尺へ進む。
- resultAsset.pathがあればtimelineへ配置候補。
- Prompt.statusはPalmier側から勝手に変更しない。

### rejected

- 新規生成より **AI動画 失敗学習** を優先。
- retry 3/3なら同系統生成を停止。

### mode=first-last

- Palmierのfirst / last frame制御を優先候補にする。
- first frame / last frame / reference roleを準備してから生成判断。

## Paid-generation boundary

Palmier公式ではgenerationにcreditsを使用する。

そのためHandoffの標準指示は:

1. project / media library / timelineを読む。
2. existing assetsを配置する。
3. placeholder / first-last slots / referencesを準備する。
4. missing pathsや矛盾を報告する。
5. **有料generationはユーザーが明示するまで実行しない。**

この境界は自動化不足ではなく、不要課金と暴走生成を防ぐための設計。

## Handoffに含める情報

Promptごとに:

- promptId
- title
- scene
- status
- current model
- mode
- duration
- aspect ratio
- preset
- finish candidate
- negative policy
- route
- next action
- model prompt
- QA avoid
- result assets + path

Runwayで `negative-policy=qa-only` の場合、QA avoidはモデル入力へ送らないことを明記する。

## Palmier agentのreturn contract

作業後はpromptId単位で次のいずれかを返す。

- `placed`
- `missing`
- `timing-changed`
- `reference-needed`
- `generated-result-path`
- `review-needed`

movie-dashboardへ戻すべき情報をPalmier内だけに閉じ込めない。

## 非破壊ルール

- 既存timeline編集を上書きしない。
- 可能ならplaceholder / clip swapを使う。
- 人物、家族、友人、犬をAI生成へ置換しない。
- 重要文字・caption・logoはeditor/compositorで載せる。
- Prompt採用状態をPalmier側だけで変更しない。
- 大きな動画・画像ファイルをGitへ入れない。
