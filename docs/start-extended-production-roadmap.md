# StaRt Extended Opening — 初心者向け制作ロードマップ

## 迷ったときの入口

Movie Dashboardの `StaRt Selection / Next` を開く。

```sh
cd movie-dashboard
pnpm dev
```

ブラウザで `/movie-coach/start-selection` を開くと、画面最上部の緑枠に「今やること」が1つだけ表示される。選択・チェック・コメントはブラウザ内へ自動保存される。

## 制作の順番

1. 推奨6 Motion Familyを確認する。わからなければ変更しない
2. 14セクションを上から開き、レシピと必要素材を確認する
3. 写真・動画を棚卸しし、サビ用Hero写真を2枚以上選ぶ
4. 使用許諾済みの正規ローカル音源を用意し、波形とMarkerを確認する
5. 「Codex用プロンプトをコピー」で選定・コメント・未完了項目を1つにまとめる
6. Codexへ貼り付け、実素材版Roughの更新を依頼する
7. renderを目視し、修正コメントを同じ画面へ追記する

## 最初から選ばれている6系統

- Hero Still: 強い写真を止めて見せる
- Editorial Photo: 写真を雑誌のように整理する
- Typography Accent: 短い文字で区切る
- Travel Route: 旅と場面転換を伝える
- Panel Recap: 複数の思い出を振り返る
- Rhythm Three-Hit: 同じ写真の上で3回だけリズムを打つ

これは制作開始用の推奨案で、最終採用ではない。Favorite / Maybe / Rejectと採用確定は人間が行う。

## Roughを見る

```sh
cd motion-studio
pnpm render:start-extended-rough
```

出力先は `motion-studio/out/start-extended/start_extended_opening_rough_v1.mp4`。現在の129秒は研究用referenceでありFinal timingではない。正規ローカル音源の波形・Markerと実素材が確認されるまでは `AUDIO_BLOCKED / MEDIA_BLOCKED` のまま進める。

## 完成へ進める判断

- UIの14 sectionがすべて選択済み
- 使う写真・動画の一覧がある
- Hero写真が決まっている
- 正規音源の使用条件を確認済み
- 波形とMarkerを人間が確認済み
- Roughを目視し、区間ごとのコメントが残っている

チェックが不足していても研究用Roughは見られる。ただし、不足項目を「完了」と見なしてFinal化しない。
