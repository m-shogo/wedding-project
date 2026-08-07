# Figma: Wedding Movie Control Center Demo

Created: 2026-08-07
Updated: 2026-08-07

## Figma file

- Figma URL: https://www.figma.com/design/vwC1tArvxpNFSdBmXd9RBD
- File name: `Wedding Movie Control Center Demo`
- Purpose: 結婚式オープニングムービー制作を、素材・絵コンテ・プロンプト・不足素材・Palmier/CapCut導線まで一目で管理するためのFigmaデモ。

## 現在の位置づけ

`movie-dashboard/` は既に存在する。したがって、このFigmaは「新規実装の指示書」ではなく、以下のために使う。

- 既存 `movie-dashboard` の画面改善方向
- Palmier Free + Claude Code MCP運用の可視化
- 90秒絵コンテの全体確認
- AI画像/動画プロンプトパックの優先順位確認
- CapCut Packへ渡す前の制作導線確認

## 作成済みフレーム

1. `00 Cover - Wedding Movie Control Center`
   - 目的、世界観、主要画面の全体説明。
2. `01 Dashboard Screen`
   - 進捗、今日やること、不足素材、Palmier 10秒テストのゲートを可視化。
3. `02 Storyboard Screen`
   - 90秒オープニングの9シーン構成をカード化。
4. `03 Asset Library + Prompt Bank`
   - 自前写真、動画、AI画像、AI動画、Remotion素材、プロンプト履歴をまとめる画面。
5. `04 Palmier to CapCut Workflow`
   - Palmier Free + Claude Code MCPからCapCut仕上げまでの作業導線。
6. `05 Implementation Spec for movie-dashboard`
   - `movie-dashboard` 実装へ落とすためのJSON設計と優先順位。
7. `06 Palmier Execution Board`
   - Palmier 10秒 → 30秒 → 90秒 → CapCut Pack の実行順。
8. `07 AI Prompt Pack Board`
   - 画像生成12枚、動画化優先6本、固定negative、採用QA。

## 関連Git正本

| ドキュメント | 役割 |
|---|---|
| `docs/palmier-operation.md` | Palmier Free + Claude Code MCPの運用手順 |
| `docs/opening-90s-storyboard.md` | 90秒オープニング完全絵コンテ |
| `docs/ai-generation-prompt-pack.md` | 画像生成12枚 + 動画化プロンプト |
| `docs/palmier-dashboard-sync.md` | Palmier結果をmovie-dashboard/CSVへ戻すルール |
| `docs/task-board.md` | 現在のNow/Next/Blocked |
| `movie-dashboard/README.md` | 既存ダッシュボードの起動・運用方法 |

## Palmierでの役割

Palmierは最終編集ではなく、以下に限定する。

- AI動画、実写真、Motion Studio素材の読み込み
- 素材整理
- 10秒・30秒・90秒のラフカット
- 不足素材の洗い出し
- CapCutへ渡す前の構成確認

## CapCutでの役割

CapCutは仕上げに限定する。

- BGM合わせ
- キーフレーム
- 写真演出
- テロップ
- トランジション
- 最終書き出し

## 必須ルール

- 大きな写真・動画・音源はGitに入れない。
- AIは背景・つなぎ・世界観補強に限定する。
- 人物、犬、家族、友人のAI生成・AI変形は禁止。
- AI動画は3〜5秒素材を基本にする。
- 文字入りAI動画は禁止。文字はmotion-studioかCapCutで重ねる。
- Palmierはラフ編集まで。最終仕上げはCapCut。

## 次にやること

1. Palmier MCP読み取り確認を行う。
2. `02_opening-movie/source/palmier-test-001/` にテスト素材を10個だけ置く。
3. Palmierで10秒試作を作る。
4. 結果を `docs/palmier-dashboard-sync.md` に従って `movie-dashboard` とCSVへ反映する。
5. 問題なければ30秒試作へ進む。
6. 30秒試作後に90秒ラフへ進むか判断する。

## Claude Codeへ渡すローカル実行プロンプト

```text
/Users/m-shogo/Developer/personal/wedding-project で作業してください。

まず以下を読んでください。
- docs/task-board.md
- docs/palmier-operation.md
- docs/opening-90s-storyboard.md
- docs/ai-generation-prompt-pack.md
- docs/palmier-dashboard-sync.md
- movie-dashboard/README.md

目的:
Palmier Free + Claude Code MCPで、結婚式オープニングムービーの10秒試作を安全に実行する準備をする。

やること:
1. Palmier MCP読み取り確認を行う
2. 10秒試作用の素材フォルダ `02_opening-movie/source/palmier-test-001/` の構成を確認する
3. 使える素材だけで10秒試作を行う
4. 使用素材、不足素材、ボツ理由、CapCutで仕上げる作業を整理する
5. `docs/palmier-dashboard-sync.md` に沿ってmovie-dashboardとCSVへ反映する
6. 大きな画像・動画・音源はGitに入れない
7. commitして報告する

禁止:
- 既存motion-studioを壊す
- 人物、犬、家族、友人をAI生成/AI変形する
- AI動画に文字、数字、ロゴ、看板を入れる
- Palmierで最終編集までやろうとする
```
