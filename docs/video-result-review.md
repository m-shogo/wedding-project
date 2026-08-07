# AI動画 結果レビュー運用

更新基準日: 2026-08-07

`movie-dashboard` の **AI動画 結果レビュー** は、生成した動画を同じ品質基準で確認し、採用または不採用・再生成理由をPromptへ残すための最終レビュー画面。

## 標準フロー

1. **動画プロンプト** でシーンとショット意図を作る。
2. **動画生成キュー** から生成パックをコピーし、Promptを `testing` にする。
3. 生成結果を素材ライブラリへ登録する。
4. Prompt Bankで結果素材をPromptへ紐付ける。
5. **AI動画 結果レビュー** の「レビュー待ち」を開く。
6. 結果素材を確認し、共通QAとプリセット固有QAをチェックする。
7. 全QAを通過したものだけ `QA PASS → 採用` にする。
8. 不採用は理由を必ず記録する。
9. 再生成する場合は不採用Promptからretry draftを作り、生成キューへ戻す。
10. 同じ系統のretryは最大3回。3回失敗したらショット設計へ戻る。

## レビュー待ちの条件

- `Prompt.status === testing`
- `Prompt.resultAssetIds.length > 0`

生成したつもりでも結果素材がPromptへ紐付いていなければレビュー完了にはしない。

## 共通QA

- 人物・動物・読める文字・ロゴ・看板が0。
- 主動作が1つで、勝手なカット・追加アクションがない。
- 建築・翼・窓枠・水平線などの形状が時間方向に安定。
- カメラの加減速と被写体の慣性が自然。
- 光・影・反射・露出がフレーム間で連続。
- 必要なテロップ余白が最後まで維持。
- 不要なフレア・粒子・過剰発光・AIショーリール感がない。
- 実写真・実動画の前後に置いて、このカットだけ浮かない。
- CapCut実尺で前後ショットと接続して違和感がない。

プリセットに `qa=` が保存されている場合は、上記に加えてプリセット固有QAも必須にする。

## 採用

全QAチェック済みの場合だけ採用できる。

```text
video-review=passed / reviewedAt=<ISO時刻> / checks=<通過数>/<全QA数>
```

結果Assetのstatusは自動変更しない。複数候補や別シーン再利用を壊さないため、素材の選定状態は素材ライブラリ側で管理する。

## 不採用

理由は必須。

```text
video-review=rejected / reviewedAt=<ISO時刻> / reason=<理由>
```

不採用時はPrompt.statusを `rejected` にする。

## retry draft

不採用Promptから **再生成ドラフト** を押すと、新しいPromptを作る。

- 元Promptは `rejected` のまま保存。
- 新Promptは `draft`。
- 元のsceneId / movieId / model / presetを継承。
- 過去の結果Assetは継承しない。
- 不採用理由をretry correctionとして次のpromptへ引き継ぐ。
- sceneとの相互リンクを新しいpromptIdで作り直す。

```text
retry-of=<直前promptId> / retry-root=<最初のpromptId> / retry-attempt=<1..3> / source-review=<不採用理由>
```

### Promptを長文化させない

retry 2/3、3/3を作る時に、過去の`Retry correction`を積み上げない。
常に元Promptへ戻して、**最新の不採用理由1つだけ**を補正文として付ける。

```text
元Prompt + retry1補正 + retry2補正 + retry3補正
```

にはしない。

```text
元Prompt + 最新retry補正
```

を維持する。

## retry上限

同じ系統のretryは最大3回。

```text
original
  ↓
retry 1/3
  ↓
retry 2/3
  ↓
retry 3/3
  ↓
STOP
```

3回失敗したら同じPromptへ文章を継ぎ足さない。次のどれかを変更する。

1. 元の静止画。
2. 参照画像・参照動画。
3. ショット構成、主動作、カメラ。
4. 生成モデル。
5. AIを使わずMotion Studio / 実素材へ切り替える。

「もう1回だけ」を繰り返してクレジットを消費しないための強制停止ルールとする。

## なぜ自動採用しないか

AI動画の品質は単純なファイル存在や自動スコアだけでは判断しない。

- 人影に見えるもの
- 文字っぽい形
- 数フレームだけの形状崩壊
- 実写の前後で初めて気づく不自然さ
- 会場スクリーンで見た時の違和感

などがあるため、最終採用は目視とCapCut実尺確認を必須にする。

## 完了条件

- Promptがシーンへ紐付いている。
- Promptが `testing` を経由している。
- 結果素材がPromptへ紐付いている。
- 共通QAとプリセット固有QAをすべて通過。
- CapCut実尺確認済み。
- Prompt.statusが `adopted`。
- Prompt.notesに `video-review=passed` が記録されている。
