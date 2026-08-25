# StaRt Extended Opening — 初心者向け制作ロードマップ

## 迷ったときの入口

Movie Dashboardの `StaRt Selection / Next` を開く。

```sh
cd movie-dashboard
pnpm dev
```

ブラウザで `/movie-coach/start-selection` を開くと、画面最上部の緑枠に「今やること」が1つだけ表示される。選択・チェック・コメントはブラウザ内へ自動保存される。

Selectionができたら `/movie-coach/start-production` の「StaRt制作ワークスペース」へ進む。素材選定から第2修正依頼まで、画面上部の6ステップで進められる。

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

1. Creative Idea Assistantで全体の雰囲気を1つ選ぶ
2. 14区間のアイデアを眺め、使いたい案だけ「採用候補に追加」する
3. 推奨6 Motion Familyを確認する。わからなければ変更しない
4. 14セクションを上から開き、レシピと必要素材を確認する
5. 写真・動画を棚卸しし、サビ用Hero写真を2枚以上選ぶ
6. 使用許諾済みの正規ローカル音源を用意し、波形とMarkerを確認する
7. 「Codex用プロンプトをコピー」で方向性・アイデア・選定・コメント・未完了項目を1つにまとめる
8. Codexへ貼り付け、実素材版Roughの更新を依頼する
9. renderを目視し、修正コメントを同じ画面へ追記する

## Creative Idea Assistantの使い方

Selection Modeには、完成形を考えるための3つの全体方向と、14区間×2案のCreative Ideasがある。

- 全体方向は最初から「旅するWedding Editorial」を選択済み。迷ったらそのままでよい
- 区間を選ぶと、提案・効く理由・必要素材・注意点をまとめて確認できる
- 「採用候補に追加」した案だけがShortlist JSONとCodex用プロンプトへ入る
- アイデアは制作開始用の候補であり、追加は必須ではない
- 追加してもapprovedにはならない。実素材Roughを見て人間が最終判断する
- アイデア選択だけでは `MEDIA_BLOCKED / AUDIO_BLOCKED` は解除されない

## StaRt制作ワークスペースの使い方

1. 素材ボードへ実写真・実動画のタイトルと原本パスを登録する
2. Hero・旅・家族友人・会場・小物へ分類し、Hero候補と文字余白を記録する
3. カードを14区間へドラッグする。ドラッグが難しい場合はカード選択後に追加ボタンを使う
4. 不足診断でHero・横写真・会場・END文字余白・未配置区間を確認する
5. 選択済みCreative Ideasを「この素材で試せる・素材が必要・音源確認後」で絞る
6. 同じ区間の演出レシピをA/Bで比較し、人間が採用候補を選ぶ
7. Rough動画を再生し、再生位置・区間・修正分類付きのコメントを残す
8. 第2修正プロンプトをコピーし、素材割り当て・A/B結果・未解決コメントをCodexへ渡す

完成度メーターは選定・素材・音源・Rough・修正・Finalを別々に表示する。チェック操作は作業完了の記録であり、素材・音源・品質を自動承認するものではない。

素材が多い場合は、素材ボードの「一括読込コマンドをコピー」を使う。次のコマンドは原本を移動・上書きせず、Git管理外のローカルプレビューリンクとmanifestだけを作る。

```sh
cd movie-dashboard
pnpm sync:start-materials
pnpm dev
```

画面を再読み込みすると「同期済み○件をボードへ追加」が表示される。追加後のタイトル・パス編集や削除は既存の素材ライブラリで行う。

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

### Finderで開く方法

1. Selection Modeの保存先カードで「パスをコピー」
2. Finderを開いて `⌘⇧G`
3. パスを貼り付けてEnter
4. 表示されたフォルダへ原本を入れる

最初に一括rename、crop、resize、色補正、動画の切り出しを行う必要はない。原本を残し、採用後にCodexがRemotion用コピーを整える。写真runtimeが直接扱える形式はJPG/JPEG/PNG/WEBP。HEIC原本は消さず、採用分だけ後工程で変換する。

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
