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

### 30-部品確認

| テンプレート | 内容 | 尺 | 書き出し |
|----|------|----|------|
| `文字部品-確認` | `parts/text` の3パーツを時間差で見る確認用(本番素材ではない) | 10秒 | preview-only |

### 90-順番・尺確認

| テンプレート | 内容 | 尺 | 書き出し |
|----|------|----|------|
| `開幕-全体確認` | openingProjectの順番・尺だけを通しで確認する制作用プレビュー | 82秒 | `pnpm render:preview` |

注意: `開幕-全体確認` は**順番と尺の確認専用**で、見た目の最終確認には使わない。
propsはプレビュー用の代表値で、Root.tsxのdefaultProps(Save defaultsの調整値)を完全には反映しない。
見た目の最終確認は個別テンプレートのstill書き出し(`pnpm exec remotion still <ID> ...`)か
本番render(`pnpm render <ID> final`)で行う。

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
pnpm check          # 下の3つをまとめて実行
pnpm check:motion   # シーン構成・registry・Root.tsxの整合チェック
pnpm check:assets   # 素材ファイルの存在チェック
pnpm check:parts    # 再利用パーツ(partRegistry.ts)の健全性チェック
```

CapCutに組み込む前、コミット前に `pnpm check` を通す。

### 素材の制作段階(AssetStatus)

| status | 意味 | checkの扱い |
|---|---|---|
| `missing` | まだ手元にない | 情報表示 |
| `idea` | アイデアだけある | 情報表示 |
| `prompt_ready` | AI生成プロンプト・準備済み | 情報表示 |
| `generated_preview` | 生成済みの**試作**。本番使用不可 | 無くても情報表示。`regenerateCommand`か`recoveryNote`どちらかが必須(両方無いと警告) |
| `candidate` | 採用候補(本番確定ではない) | ファイルが無ければ警告 |
| `approved` | 採用決定。最終書き出し前 | ファイルが無ければ**エラー** |
| `final` | 本番使用OK | ファイルが無ければ**エラー** |
| `external` | repo外管理 | 存在チェック対象外 |

**final扱いしてよい条件**: 人間(新郎新婦)が実物を見て採用を確定し、
権利・プライバシー確認(BGM・写真)が済んでいること。
**AI(Claude/Codex)が勝手にcandidate以上へ昇格させるのは禁止。**
`generated_preview` をfinal扱いすることも禁止。

さらにシーンとの混同もチェックされる:
final sceneに未承認素材(missing/idea/prompt_ready/generated_preview/candidate)が
混ざるとエラー、approved sceneにmissing/idea/prompt_readyが混ざるとエラー。

fresh clone(out/やpublic/photos/が空)でも `pnpm check` は通る設計
(generated_previewは未生成でも再生成コマンドを表示するだけ)。

### `regenerateCommand` と `recoveryNote` の使い分け

| フィールド | 使う場面 | 例 |
|---|---|---|
| `regenerateCommand` | ターミナルで**そのまま実行できる**コマンド | `pnpm render 搭乗券 final` |
| `recoveryNote` | 実行コマンドではない人間向け復旧・確認メモ | `ComfyUIの~/...を採点して採用ファイルを決める` |
| `note` | 素材の補足説明 | `採点はscorecard.csv` |

ルール:
- `regenerateCommand` に `# コメント` を入れない
- render素材は `regenerateCommand` を必ず書く
- AI生成素材でCLI再生成コマンドが無い場合は `recoveryNote` で復旧手順を書く
- `generated_preview` は `regenerateCommand` か `recoveryNote` の**どちらか**が必須(両方無いとcheckが警告)

## 制作管理ファイルの出力

```sh
pnpm export           # 下の3つをまとめて実行
pnpm export:capcut    # CapCut作業表CSV/MD + 本番未確定素材一覧
pnpm export:review    # レビュー用HTML(シーン一覧+品質チェックリスト)
pnpm export:home      # 制作コックピット(確認入口ページ)
pnpm export:stills    # 主要Compositionのstill画像(サムネイル)生成。重いので別コマンド
```

Visual Cockpit運用:

- 通常確認: `pnpm export`(still画像が無くてもコックピットは壊れない)
- 見た目サムネイルも更新: `pnpm export:stills && pnpm export`
- still画像(`exports/previews/*.png`)は生成物なのでGit管理しない

出力先(CSV/MD/HTMLはGit管理してよい。動画・画像はexports/に置かない):

```text
exports/index.html                         制作ホーム(まず開く入口ページ)
exports/capcut/opening-timeline.csv        CapCut作業表(start/end自動計算)
exports/capcut/opening-timeline.md         同・目視用
exports/capcut/opening-missing-assets.md   本番未確定素材の一覧(これを空にするのがゴール)
exports/review-gallery/opening/review.html レビューページ(品質ゲートのチェックボックス付き)
```

単一情報源は `src/data/openingProject.ts`。出力ファイルを直接編集しない。

## 迷ったらここから

- **制作コックピット**: `exports/index.html`(`pnpm export` で更新)。
  今日やること(優先度つき)・シーン別の状態・Compositionを見る順番・
  素材一覧・パーツカタログ・AIプロンプト履歴が1枚で分かる
- これは**編集UIではなく制作判断の入口**。状態保存・検索・カンバンは作らない
- **Remotion Studio** は見た目確認・props微調整用。操作説明は
  [docs/remotion-studio-guide.md](docs/remotion-studio-guide.md)
- AI(Fable/Codex)の作業後は**必ず** `pnpm export` して、まず `exports/index.html` を見る
- 既存テンプレへの変更はStudioの見た目だけで判断せず `git diff` も見る

## AIプロンプト履歴

AI画像・動画の生成履歴は [src/data/aiPromptRegistry.ts](src/data/aiPromptRegistry.ts) に
素材ID(assets.ts)と紐づけて記録する。生成を実行したら1レコード追加する。
`pnpm check:assets` がassetIdの存在・status・resultPathの矛盾を検証する。

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

## 再利用パーツ(parts/)

完成テンプレートを増やす前に、まず**既存テンプレに差し込めるパーツ化**を検討する。
テロップ演出を新しく作るときは、新テンプレではなく `src/components/parts/text/` に追加する。

置き場所:

```text
src/components/parts/
  text/      テロップ・章タイトル・字幕・名前表示(実装済み)
  photo/     写真カード・写真枠・トリミング補助(今後)
  layout/    セーフエリア・中央寄せ・下部配置・2カラム(今後)
  effects/   光・紙質感・影・マスク(今後)
```

textパーツは `TextPart` で variant 呼び分けできる(テンプレ側はこれを差すだけ):

```tsx
import {TextPart} from '../../components/parts/text';

<TextPart variant="fade-up" text="本日はご搭乗ありがとうございます"
  subText="MEMORY FLIGHT 1024" position="bottom"
  startFrame={20} durationFrames={120} tone="ivory" size="md" />

<TextPart variant="mask-reveal" title="CHAPTER 1" subtitle="Departure"
  startFrame={10} durationFrames={140} align="center" tone="gold" />

<TextPart variant="lower-third" name="COOKIE" role="FAMILY / DOG"
  comment="いつも一緒に旅をしてきた大切な家族"
  position="right" startFrame={30} durationFrames={150} tone="ivory" />
```

パーツ追加時のルール(詳細は [parts/README.md](src/components/parts/README.md)):

- 1パーツ1責務。propsを増やしすぎない
- 色・フォントは `theme.ts` / `fonts.ts` から取る(直書き禁止)、`Math.random`禁止
- 派手なグリッチ・バウンド・回転文字は禁止、GSAP/anime.js/Three.jsは原則使わない
- 追加したら `src/data/partRegistry.ts` に登録し、確認用 `文字部品-確認`
  (TextPartsPreview)も更新して `pnpm check:parts` を通す
- `status` は `draft` で追加する。`approved` への昇格は人間確認が必須(AIが勝手に上げない)

既存 `GenericTitle`(透過題字/大きいタイトル素材)とは役割が違う。
parts/text は「テンプレに差し込む小〜中サイズの再利用文字部品」。被っても壊さず共存。

確認: `pnpm check`(check:motion + check:assets + check:parts)。
見た目は `pnpm exec remotion still 文字部品-確認 /tmp/x.png --frame=50` で確認できる。

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
  components/{common,opening,profile}/    部品(シーン固有寄り)
  components/parts/{text,photo,layout,effects}/  再利用パーツ基盤
  data/                                   テーマ、コンセプト、ルート、写真、partRegistry
public/photos/                            実写真(Git管理外)
out/                                      書き出し先(Git管理外)
```

profile配下はプロフィールムービー用に予約。オープニングMVPの品質基準が固まってから展開する。
