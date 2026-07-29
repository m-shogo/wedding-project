# Wedding Print Toolkit — Figma Plugin Prototype

Status: `PROTOTYPE / NOT CURRENT`

結婚式ペーパーアイテム4種の反復作業とQAを補助する、プロジェクト専用Figma Plugin候補。

## 目的
- デザインを自動生成するPluginではない。
- 入稿前の事故・大量差し替え・style drift・文字崩れを減らす。
- 美的最終判断は人間/Figma側に残す。

## MVP順
1. Typography Stress Tester
2. Guest Data Populate
3. Design Foundation Bootstrap
4. Print QA Overlay

## 現段階
まずTypography Stress Testerの最小prototypeを置く。

検査候補:
- missing font
- 小さすぎるfont size
- fixed-size text box (`textAutoResize === NONE`) のリスク表示
- 長文Text layer

「実際にoverflowしている」とはまだ断定しない。Figma Plugin APIで自然サイズを測る検証を追加してから昇格する。

## Setup
Figma Desktopで `Plugins > Development > New Plugin...` から正規plugin IDを発行し、`manifest.example.json` を元に実manifestを作る。
架空のplugin IDはGitに固定しない。

Plugin API quickstart:
https://developers.figma.com/docs/plugins/plugin-quickstart-guide/

## Status policy
- IDEA
- PROTOTYPE
- VERIFIED
- CURRENT
- REJECTED

`CURRENT`になるまでは本番Figmaの必須依存にしない。
