# Wedding Print Toolkit

Status: `PROTOTYPE`

結婚式ペーパーアイテム4種の本番Figmaを、量産・QA・Design Foundationの面から補助するローカルFigma Plugin。

## 現在の機能

### 1. Typography QA
- 選択範囲があればその中だけ、なければ現在ページ全体を走査
- Missing Font を検出
- 設定した最小文字サイズ未満を検出
- 空Text layerを検出
- `TODO` / `PLACEHOLDER` / `仮` を検出
- 問題レイヤーをUIから選択してズーム可能

### 2. Bootstrap Wedding Tokens
`Wedding Print Tokens` Variable Collectionを作成/更新する。

初期token:
- Common/Navy
- Common/Ivory
- Common/MutedRed
- Common/Sage
- Common/Sky
- Common/Yellow
- Common/Gold
- Rurubu/Blue
- Rurubu/Red
- Passport/Navy
- Ticket/Ink

## なぜ作るか
既存Pluginを増やすこと自体が目的ではない。今回の4アイテム固有の反復作業・QAで、毎回人間が同じ確認を行うコストと事故を減らすため。

## セットアップ
Figma Desktopで `Plugins > Development > New plugin...` を使い、新しいlocal pluginを作ってFigmaが発行したplugin IDを取得する。

1. `manifest.template.json` を `manifest.json` としてコピー
2. `REPLACE_WITH_FIGMA_GENERATED_PLUGIN_ID` をFigma発行IDへ置換
3. `Plugins > Development > Import plugin from manifest...`
4. `manifest.json` を選ぶ

Figma公式では新規Pluginに `documentAccess: dynamic-page` が必須。Plugin IDはFigma側で発行されるためrepoへ固定値を捏造しない。

## 検証ルール
このPluginはまだ `PROTOTYPE`。

`VERIFIED`へ上げる条件:
- Figma Desktopでmanifest import成功
- Typography QAがテストFrameで期待通り検出
- 問題レイヤー選択が動作
- Token bootstrapを2回実行して重複Variableが増えない
- 既存Designを破壊しない
- 実際の4本番ファイルの少なくとも1つでQA成功

## 次の候補
1. Guest CSV Populate
2. Long-name Stress Test
3. Print QA Overlay（safe area / bleed / crop guide）
4. Photo Placeholder Batch Swap
5. Batch Export Helper
6. Asset-Frozen marker / Current status helper

## 原則
- 美的判断をPluginへ丸投げしない
- Pluginは反復作業・整合性・QAを担当
- 最終の光学調整は人間
- 新機能は `IDEA → PROTOTYPE → VERIFIED → CURRENT / REJECTED`
