# wedding-motion-studio

結婚式ムービー用のモーション素材生成スタジオ。Remotion + React + TypeScriptで、CapCutに渡す短尺素材(搭乗券、フライトマップ、パスポートハンコ、雲、カウントダウン、写真カード)を書き出す。

完成動画はここでは作らない。**素材を書き出し、最終編集はCapCutで行う。**

## コンセプト

- タイトル: `MEMORY FLIGHT 1024`
- 便名: `SS1024` (SS = Shogo / Shiori、1024 = 10月24日)
- ルート: Narita → Okinawa → Seoul → Hawaii → Yokohama Wedding Ceremony
- 世界観は `../docs/02_style-bible.md` に従う(ネイビー、ゴールド、アイボリー、上品、映画的)

## 使い方

```sh
pnpm install
pnpm dev          # Remotion Studioを開く(プレビュー&props調整)
```

自作のEditor UIはない。**Remotion Studioがエディタ**。各コンポジションはZodスキーマを持っているので、右側のpropsパネルでスライダー・色・文字を調整し、「Save defaults」でソースに保存できる(そのままGit管理される)。

## テンプレート一覧(Remotion Studioのサイドバーに日本語で並ぶ)

IDは漢字+英数字のみ(Remotionの仕様でひらがな・カタカナは使えない)。
出力ファイル名はCapCutで扱いやすいよう英語のまま。

### 00-動作確認

| テンプレート | 内容 | 尺 | 書き出し |
|----|------|----|------|
| `透過確認-押印` | 透過テスト用ハンコ | 2秒 | `pnpm render:stamp-test` (webm透過) |
| `透過確認-紙背景` | 同・紙背景付き比較用 | 2秒 | `pnpm render:stamp-test:preview` |

### 10-開幕素材

| テンプレート | 内容 | 尺 | 書き出し |
|----|------|----|------|
| `搭乗券` | 搭乗券イントロ(ivory/navy切替) | 8秒 | `pnpm render:boarding` |
| `地図-成田-沖縄` | フライトマップ第1区間 | 8秒 | `pnpm render:map:okinawa` |
| `地図-沖縄-韓国` | 第2区間 | 8秒 | `pnpm render:map:seoul` |
| `地図-韓国-Hawaii` | 第3区間 | 8秒 | `pnpm render:map:hawaii` |
| `地図-Hawaii-横浜` | 最終区間 | 8秒 | `pnpm render:map:yokohama` |
| `押印-沖縄` | OKINAWA / MEMORY 01 | 2秒 | `pnpm render:stamp:okinawa` (webm透過) |
| `押印-韓国` | SEOUL / MEMORY 02 | 2秒 | `pnpm render:stamp:seoul` (webm透過) |
| `押印-Hawaii-求婚` | HAWAII / PROPOSAL | 2秒 | `pnpm render:stamp:hawaii` (webm透過) |
| `押印-横浜` | YOKOHAMA / FINAL DESTINATION | 2秒 | `pnpm render:stamp:yokohama` (webm透過) |
| `押印連打-全路線` | 全ルート一筆+スタンプ連打(尺圧縮案の主役) | 22秒 | `pnpm render:stamprush` |
| `雲-透過` | 雲オーバーレイ | 18秒 | `pnpm render:cloud` (webm透過) |
| `雲海` | 上空の雲海(朝/昼/夕切替、上部テロップ余白) | 10秒 | `pnpm render:cloudsea` |
| `飛行機窓` | 機内から見た窓と流れる雲(朝/昼/夕切替) | 10秒 | `pnpm render:window` |
| `扉-光` | 扉が開いて光が差す余韻(入場直前用) | 12秒 | `pnpm render:doorlight` |
| `入場前-秒読` | Doors opening → 10〜1 → Please welcome | 16秒 | `pnpm render:countdown` |
| `写真-沖縄` | 写真カード3枚 MEMORY 01 | 10秒 | `pnpm render:photo:okinawa` |
| `写真-韓国` | 写真カード3枚 MEMORY 02 | 10秒 | `pnpm render:photo:seoul` |
| `写真-Hawaii` | 写真カード3枚 MEMORY 03(動きゆっくり) | 10秒 | `pnpm render:photo:hawaii` |
| `題字-汎用` | 汎用テロップ(透過。「Ladies and gentlemen...」等) | 8秒 | `pnpm render 題字-汎用 final` |

### 20-Profile素材(プロフィールムービー用)

| テンプレート | 内容 | 尺 | 書き出し |
|----|------|----|------|
| `章題` | 章タイトル(CHAPTER 1 / Departure / 出発) | 6秒 | `pnpm render 章題 final` |
| `年表` | 歩みの年表。航路と同じ点線が伸びる | 12秒 | `pnpm render 年表 final` |
| `写真一枚` | 写真1枚をゆっくり見せる主役テンプレ | 8秒 | `pnpm render 写真一枚 final` |
| `紹介札` | 家族・友人・犬の紹介カード | 8秒 | `pnpm render 紹介札 final` |

### 90-全体確認

| テンプレート | 内容 | 尺 | 書き出し |
|----|------|----|------|
| `開幕-全体確認` | openingProjectのシーン構成をそのまま通すテンポ確認用 | 82秒 | `pnpm render:preview` |

### 99-説明書

| テンプレート | 内容 |
|----|------|
| `取扱説明` | Studio内で読める使い方とTipsの要約。詳細は [MANUAL.md](MANUAL.md) |

## 書き出し(preset方式を推奨)

```sh
pnpm render <テンプレ名> preview   # 確認用: 50%スケール低画質 → out/preview/
pnpm render <テンプレ名> draft     # 調整用: 1080p標準画質    → out/draft/
pnpm render <テンプレ名> final     # 納品用: 高画質。alpha素材は透過WebM → out/opening|common/
pnpm render <テンプレ名> prores    # alpha素材のProRes 4444 MOV(WebM透過が読めない時)
pnpm render --all final           # 全素材を一括書き出し
```

例: `pnpm render 押印-沖縄 final`。引数なしで実行するとテンプレ一覧が出る。
従来の `pnpm render:xxx` 個別コマンドもそのまま使える。
出力先は `out/` 配下に統一。**out/配下はGit管理しない。**

## 品質チェック

```sh
pnpm check          # 下の2つをまとめて実行
pnpm check:motion   # シーン構成・registry・Root.tsxの整合チェック
pnpm check:assets   # 素材ファイルの存在チェック
```

CapCutに組み込む前、コミット前に `pnpm check` を通す。

## データ構造(単一情報源)

| ファイル | 役割 |
|---|---|
| [src/data/openingProject.ts](src/data/openingProject.ts) | 新郎新婦・日付・会場・トーン・fps・解像度・シーン構成 |
| [src/data/openingProject.schema.ts](src/data/openingProject.schema.ts) | 上のzod検証スキーマ |
| [src/data/assets.ts](src/data/assets.ts) | 写真・AI背景・音源・書き出し素材のID管理(パス直書き禁止) |
| [src/data/sceneRegistry.ts](src/data/sceneRegistry.ts) | 全テンプレートのメタデータ(ID・尺・出力先・透過区分) |
| [src/data/theme.ts](src/data/theme.ts) | 色・フォント・解像度のデザイントークン |

**Root.tsxはregistryから自動生成しない**(StudioのSave defaultsが壊れるため)。
テンプレート追加は「Root.tsxに追加 → sceneRegistry.tsに追加 → `pnpm check:motion`」の3点セットで行う。

## Phase 0: CapCut透過確認手順

1. `pnpm render:stamp-test` を実行する
2. `out/common/stamp_test_vp9.webm` をCapCutにImportする
3. 適当な写真や背景動画の上のトラックに重ねる
4. 黒背景・白背景が出ず、ハンコだけ表示されるか確認する
5. 透明にならない場合は `pnpm render:stamp-test:prores` でProRes 4444 MOVを試す
6. それもダメな場合、雲・光系は黒背景MP4 + CapCutのブレンドモード「スクリーン」で代替できる(暗色のハンコは透過必須)
7. 結果を `../docs/decisions/` に記録する

## CapCutでの推奨トラック構成

```text
Track 1: 背景動画 / 写真 / AI背景
Track 2: map素材 (map_narita_to_okinawa.mp4)
Track 3: cloud_overlay.webm (不透明度を下げて)
Track 4: stamp_xxx.webm (ブレンド「乗算」にするとインク感が増す)
Track 5: photo_card_xxx.mp4
Track 6: CapCutテロップ微調整
Track 7: SE
Track 8: BGM
```

## 実写真の入れ方

1. 写真を `public/photos/opening/` に置く(例: `okinawa-01.jpg`)
2. `src/data/memories.ts` の `photos` を `'opening/okinawa-01.jpg'` のように書き換える
3. `null` のままだと上品なプレースホルダーカードが表示される

`public/photos/` はGit管理しない。実写真はローカル/iCloud/Driveで管理する。

## ルール

- 文字・数字・地名はすべてRemotonで描く(AI画像/動画に文字を入れない)
- 人物の顔をAI生成しない。写真は実写真を使う
- 1カット1動作。派手なバウンドやグリッチは禁止
- 色とフォントは `src/data/theme.ts` / `src/data/fonts.ts` だけで管理する
- フォントはCormorant Garamond (Google Fonts / OFLライセンス)
- Remotionは個人利用なら無料ライセンスで使える

## ディレクトリ

```text
src/
  compositions/{common,opening,profile}/  シーン(Composition)
  components/{common,opening,profile}/    部品
  data/                                   テーマ、コンセプト、ルート、写真データ
public/photos/                            実写真(Git管理外)
out/                                      書き出し先(Git管理外)
```

profile配下はプロフィールムービー用に予約。オープニングMVPの品質基準が固まってから展開する。
