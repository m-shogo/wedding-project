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

## コンポジション一覧

| ID | 内容 | 尺 | 出力 |
|----|------|----|------|
| `StampTest` | 透過テスト用ハンコ | 2秒 | webm (透過) |
| `StampTestPreview` | 同・紙背景付き比較用 | 2秒 | mp4 |
| `BoardingPassIntro` | 搭乗券イントロ | 8秒 | mp4 |
| `FlightMapNaritaToOkinawa` | 成田→沖縄フライトマップ | 8秒 | mp4 |
| `FlightMapOkinawaToSeoul` | 沖縄→ソウル | 8秒 | mp4 |
| `FlightMapSeoulToHawaii` | ソウル→ハワイ | 8秒 | mp4 |
| `FlightMapHawaiiToYokohama` | ハワイ→横浜 | 8秒 | mp4 |
| `PassportStampOkinawa` | 沖縄ハンコ | 2秒 | webm (透過) |
| `CloudOverlay` | 雲オーバーレイ | 18秒 | webm (透過) |
| `Countdown` | 入場前カウントダウン | 16秒 | mp4 |
| `PhotoCardOkinawa` | 写真カード3枚 | 10秒 | mp4 |
| `StampRushFullRoute` | 全ルート一筆+スタンプ連打(沖縄・韓国省略案の主役) | 22秒 | mp4 |
| `OpeningFullPreview` | 通しテンポ確認用(書き出し任意) | 44秒 | - |

## 書き出し

```sh
pnpm render:stamp-test          # Phase 0: 透過VP9 WebM
pnpm render:stamp-test:prores   # Phase 0代替: ProRes 4444 MOV
pnpm render:stamp-test:preview  # 比較用の背景付きMP4
pnpm render:mvp                 # MVP素材6本を一括書き出し
pnpm render:stamprush           # 全ルート+スタンプ連打(22秒)
pnpm render:preview             # 通し確認用MP4
```

出力先は `out/opening/`、`out/common/`。**out/配下はGit管理しない。**

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
