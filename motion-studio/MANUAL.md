# motion-studio 取扱説明書

結婚式ムービー用のモーション素材を、テンプレート選択+パネル調整で作るためのマニュアル。
Studio内の `99-説明書 > 取扱説明` にも要約版がある。

## 起動

```sh
cd motion-studio
pnpm dev        # Remotion Studioがブラウザで開く
```

## 画面の見方

```text
左パネル   : テンプレート一覧(フォルダで分類)
中央      : プレビュー。再生・シーク・透過の市松表示
右パネル   : Props(調整項目)。Schema表示が基本、JSON直編集も可
右下      : Renderボタン(GUIから書き出し)
```

## 素材を作る基本サイクル

1. 左の一覧からテンプレートを選ぶ(例: `押印-沖縄`)
2. 右のPropsパネルで文字・色・サイズ・タイミングを調整する
3. スペースキーで再生して動きを確認する
4. 「Save defaults」を押すと調整値がソースコードに保存される(Git管理される)
5. 書き出す。方法は2つ:
   - 右下のRenderボタン(GUI)
   - ターミナルで `pnpm render:xxx`(コマンドはREADMEの表を見る)

透過素材(押印・雲)はコマンド推奨。VP9透過の設定が入っているため。

## 写真の差し替え

1. 写真を `public/photos/opening/` に置く(例: `okinawa-01.jpg`)
2. 写真テンプレ(`写真-沖縄` など)を開く
3. Propsの `photos` 欄に `"opening/okinawa-01.jpg"` と入力する
4. `null` のままの枠は上品なプレースホルダーが表示される

写真フォルダはGit管理外。実写真がrepoに入ることはない。

## CapCutへの渡し方

- 出力先: `out/opening/` と `out/common/`
- 透過webm(押印・雲)は上のトラックに重ねるだけで背景が抜ける
- 透過が黒くなる場合は `pnpm render:stamp-test:prores` でProRes 4444 MOVを試す
- 推奨トラック構成はREADMEを見る

### CapCut側のコツ

- BGMを先に置き、盛り上がりにマーカーを打つ
- 押印の「ポン」(再生開始から約0.3秒)をBGMの山に合わせる
- `入場前-秒読` の数字は1秒ちょうどで切り替わる。BGMのビートに頭を合わせる
- 押印はブレンドモード「乗算」にするとインクが紙に染みた質感になる
- 雲・扉の光は不透明度50-70%に下げると上品になる
- 地図素材の上に雲webmを重ねると空気感が出る(濃すぎ注意)

## デザインのTips

- 1カット1動作。ズームしながらパンしながら回転、はしない
- ズームは1.04〜1.06で十分。それ以上は安っぽくなる
- 尺が合わないときはCapCutで無理に伸縮せず、Remotion側で秒数を変えて書き出し直す
  (テンプレの`durationInFrames`調整は私=Claudeに頼めば一瞬)
- 色を変えたくなったら `src/data/theme.ts` を直す。全テンプレに一括で効く
- 文字はテンプレ側で必ず描く。AI背景素材に文字を入れない
- 派手なバウンド・グリッチ・速いカメラは使わない(Style Bible)

## テンプレートの命名ルール

- コンポジションIDは漢字+英数字+ハイフンのみ(Remotionの仕様でひらがな・カタカナ不可)
- 出力ファイル名は英語(CapCutでの管理しやすさ優先)

## データ構造と量産ルール(Codex/Claudeでの作業向け)

- 文言・日付・シーン構成は `src/data/openingProject.ts` が単一情報源。
  テンプレートに名前や日付をハードコードせず、ここから引く(新規テンプレの場合)
- 素材は `src/data/assets.ts` のIDで参照する。パス直書きをしない
- テンプレートのメタデータは `src/data/sceneRegistry.ts`。
  **Root.tsxとregistryは手で両方更新し、`pnpm check:motion` で整合を確認する**
  (Root自動生成にしないのはSave defaultsを守るため)
- 書き出しは `pnpm render <テンプレ名> <preset>`(preview/draft/final/prores)
- コミット前に `pnpm check` を通す

### テンプレート追加の手順(3点セット)

1. `src/compositions/` にシーンを作る(部品は `src/components/` を再利用)
2. `Root.tsx` に `<Composition>` を追加(defaultPropsは**リテラル**で書く)
3. `src/data/sceneRegistry.ts` にエントリを追加(ID・尺・出力先・kind)
4. `pnpm check:motion && pnpm typecheck` が通ることを確認

## 新しいテンプレートが欲しいとき

CapCut編集中に「こういう動きが欲しい」と思ったら、Claudeにそのまま伝える。

```text
例: 「章タイトルが光と一緒にフェードインするテンプレ作って」
例: 「押印-京都 を追加して」(既存の使い回しは登録1ブロックで済む)
```

部品(components)→シーン(compositions)→Root登録、の3層構造なので、
既存部品の組み合わせならすぐ増やせる。プロフィールムービー用の
`src/compositions/profile/` も予約済み。

## トラブル時

- **Studioが開かない**: ポート競合。`pnpm dev -- --port 3790` で別ポート
- **フォントが一瞬違う**: Cormorant Garamondの読み込み待ち。書き出しには影響しない
- **プレビューでハンコのにじみが出ない**: 一部ブラウザのSVGフィルタの癖。
  書き出しファイルでは正しく出る(検証済み)
- **書き出しが遅い**: `remotion.config.ts` のconcurrencyを下げるとメモリ安定
- **Save defaultsが効かない**: defaultPropsはRoot.tsx内のリテラルのまま保つこと
  (変数参照やspreadにすると書き戻せなくなる)
