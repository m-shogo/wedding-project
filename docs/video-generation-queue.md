# 動画生成キュー運用

更新基準日: 2026-08-07

`movie-dashboard` の **動画生成キュー** は、Prompt Bankに保存した動画Promptをモデル別にまとめ、生成サービス間の移動・コピペ・生成後の結果登録を減らすための実行画面。

## 標準フロー

1. **動画プロンプト** でシーンとプリセットを選び、Prompt Bankへ保存する。
2. **動画生成キュー** を開く。
3. `生成待ち + テスト中` を表示する。
4. 同じモデルのショットをまとめて処理する。
5. 1本ずつ進める場合は **コピー + テスト中** を使う。
6. 外部の生成サービスで動画を生成し、所定のローカル/Drive等へ保存する。
7. キューの **+ 結果を登録** を押し、結果タイトル・保存パスを入力する。
8. Asset / Prompt / Sceneの紐付けが自動で作られる。
9. **AI動画 結果レビュー** へ進みQAする。

以前必要だった「素材ライブラリでAsset追加 → Prompt Bankで結果を紐付け」の2画面作業は、結果登録から一括で行う。

## 生成パック

1ショットのコピー内容:

- MODEL
- SHOT
- SCENE
- PRESET
- FINISH CANDIDATE
- PROMPT
- AVOID
- NOTES

## モデル単位の一括コピー

```text
Seedance 2.0 Mini
  雲海
  飛行機窓
  空港ロビー
  海

↓ 低コスト試作をまとめて実行

Runway Gen-4.5 / Veo 3.1
  採用候補だけ仕上げ
```

## 生成結果の一括登録

**+ 結果を登録** では動画ファイル自体をアップロードしない。
保存済みファイルのパスだけを登録する。

作成するAsset:

```text
type=ai_video
status=ready
source=<Prompt.tool>
usage=Generated result for <promptId>
```

保存時に自動で行うこと:

1. 新しいAssetを作る。
2. PromptのmovieIdをAssetへ継承する。
3. Promptに紐付く全sceneIdへAssetを相互リンクする。
4. Prompt.resultAssetIdsへ新Assetを追加する。
5. 元Promptがdraftならtestingへ進める。
6. 結果レビューが拾える状態にする。

結果Assetは `selected` / `used` には自動昇格しない。QA前の生成結果なので `ready` に留める。

## 結果メモ

任意の生成メモへ次を残せる。

- provider側のvariant/seed
- resolution
- duration
- 使用した参照素材
- 気づいた破綻
- 生成サービス側の設定

自動で `promptId` と `registeredAt` もAsset.notesへ記録する。

## ステータス

- `draft`: まだ生成へ投げていない。
- `testing`: 試作中または比較生成中。
- `adopted`: QAを通過したPrompt。
- `rejected`: 不採用Prompt。

**コピー + テスト中** は `draft → testing`。
結果登録でもdraftのままならtestingへ進める。
単なるコピーはステータスを変更しない。

## Export

表示中キューは次で書き出せる。

- Markdown: 人間が読みやすい生成指示パック。
- JSON: 後続自動化へ渡しやすい構造化データ。

大きな画像・動画自体は含めず、promptId / sceneId / resultAssetIdsなどの管理情報だけを出力する。

## QA上の注意

結果を登録しただけでは採用にならない。

採用には次が必要。

- 人物・動物・文字・ロゴ・看板が0。
- ショット固有QAを通る。
- 形状、光、慣性、カメラ速度が安定。
- 結果素材がPromptへ紐付いている。
- AI動画 結果レビューをPASSする。
- CapCut実尺で前後ショットと確認する。
