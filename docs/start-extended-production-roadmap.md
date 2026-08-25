# StaRt Extended Opening — 初心者向け制作ロードマップ

## 迷ったときの入口

Movie Dashboardの `StaRt Selection / Next` を開く。

```sh
cd movie-dashboard
pnpm dev
```

ブラウザで `/movie-coach/start-selection` を開くと、画面最上部の緑枠に「今やること」が1つだけ表示される。選択・チェック・コメントはブラウザ内へ自動保存される。

## 現在地と完成まで

| 段階 | 状態 | 完了条件 |
|---|---|---|
| 1. 制作基盤 | 完了 | 6 family、14 section、Selection UI、研究用Roughが動く |
| 2. 原本投入 | **現在ここ** | 写真・動画を所定フォルダへ入れ、Hero候補を選ぶ |
| 3. 素材割り当て | 未着手 | 採用素材が14 sectionへ割り当てられ `MEDIA_BLOCKED` を解除できる |
| 4. 音源確定 | 未着手 | 利用条件、波形、Marker、終了点を人間確認し `AUDIO_BLOCKED` を解除できる |
| 5. 実素材Rough | 未着手 | 実写真・実動画・正規音源で全編を目視できる |
| 6. 修正ラウンド | 未着手 | 区間コメントを反映し、文字・crop・hold・3-hitを調整する |
| 7. Final | 未着手 | 全画面目視、音量、尺、会場再生条件を確認して本番書き出しする |

## 制作の順番

1. 推奨6 Motion Familyを確認する。わからなければ変更しない
2. 14セクションを上から開き、レシピと必要素材を確認する
3. 写真・動画を棚卸しし、サビ用Hero写真を2枚以上選ぶ
4. 使用許諾済みの正規ローカル音源を用意し、波形とMarkerを確認する
5. 「Codex用プロンプトをコピー」で選定・コメント・未完了項目を1つにまとめる
6. Codexへ貼り付け、実素材版Roughの更新を依頼する
7. renderを目視し、修正コメントを同じ画面へ追記する

## 素材と音源の置き場

原本はリポジトリ内のGit管理外フォルダへ置く。写真・動画・音源ファイル自体はcommitしない。

```text
05_photos/opening/
├── couple/          2人・Hero候補
├── travel/          沖縄・Seoul・Hawaiiなど
├── family-friends/  家族・友人
└── venue/           横浜・会場

06_videos/opening/   実動画

07_music/
├── candidates/      未確定の音源候補
├── licensed/        会場利用条件を確認した音源
└── se/              効果音・環境音
```

選定後、Codexが採用素材だけを `motion-studio/public/` 配下のRemotion runtimeへ接続する。原本は移動・上書きしない。旧V1専用の `motion-studio/public/photos/opening/` や `public/audio/opening/bgm-main.mp3` を、StaRt Extendedの正本として直接使わない。

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
