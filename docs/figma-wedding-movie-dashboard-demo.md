# Figma: Wedding Movie Control Center Demo

Created: 2026-08-07

## Figma file

- Figma URL: https://www.figma.com/design/vwC1tArvxpNFSdBmXd9RBD
- File name: `Wedding Movie Control Center Demo`
- Purpose: 結婚式オープニングムービー制作を、素材・絵コンテ・プロンプト・不足素材・Palmier/CapCut導線まで一目で管理するためのFigmaデモ。

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

## 使い方

このFigmaデモは最終デザインではなく、`movie-dashboard` を実装する前の情報設計・UIデモとして使う。

### Palmierでの役割

Palmierは最終編集ではなく、以下に限定する。

- AI動画、実写真、Motion Studio素材の読み込み
- 素材整理
- 10秒・30秒・90秒のラフカット
- 不足素材の洗い出し
- CapCutへ渡す前の構成確認

### CapCutでの役割

CapCutは仕上げに限定する。

- BGM合わせ
- キーフレーム
- 写真演出
- テロップ
- トランジション
- 最終書き出し

## 実装優先順位

### P0: 静的JSONで可視化

- `movie-dashboard/src/data/scenes.json`
- `movie-dashboard/src/data/assets.json`
- `movie-dashboard/src/data/prompts.json`
- `movie-dashboard/src/data/tasks.json`

まずはFigmaの構成をそのままReact/Viteで表示する。

### P1: Asset Library + Prompt Bank

生成結果とプロンプトを紐づける。良かった生成を再現できるようにする。

### P2: Missing List自動算出

`scenes.requiredAssets` と `assets.status` から、不足素材を自動表示する。

### P3: CapCut Pack

採用素材だけをシーン順に並べ、CapCut投入用の順番表・CSVを書き出せるようにする。

## 必須ルール

- 大きな写真・動画・音源はGitに入れない。
- AIは背景・つなぎ・世界観補強に限定する。
- 人物、犬、家族、友人のAI生成・AI変形は禁止。
- AI動画は3〜5秒素材を基本にする。
- 文字入りAI動画は禁止。文字はMotion StudioかCapCutで重ねる。
- Palmierはラフ編集まで。最終仕上げはCapCut。

## 次にやること

1. Palmier MCP読み取り確認を行う。
2. `02_opening-movie/source/palmier-test-001/` にテスト素材を10個だけ置く。
3. Palmierで10秒試作を作る。
4. 結果を `docs/templates/review-notes.csv` と `docs/templates/ai-video-scorecard.csv` に記録する。
5. 問題なければ30秒試作へ進む。
6. その後、Figmaデモを基準に `movie-dashboard/` を実装する。

## Claude Codeへ渡す実装プロンプト

```text
/Users/m-shogo/Developer/personal/wedding-project で作業してください。

Figmaデモ https://www.figma.com/design/vwC1tArvxpNFSdBmXd9RBD を参考に、
新規ディレクトリ movie-dashboard/ を作成してください。

目的：
結婚式オープニングムービー制作の管理サイトを作る。
生成画像、自前写真、自前動画、生成AI動画、Motion Studio書き出し、プロンプト、絵コンテ、進捗、不足素材、CapCut Packを一目で見られるローカルWebアプリにする。

重要：
- 既存 motion-studio/ は触らない
- 大きな画像・動画・音源はGit管理しない
- まずDBは使わない
- JSONで管理する
- Palmierはラフ編集、CapCutは最終仕上げという分担を守る
- 人物、犬、家族、友人のAI生成・AI変形は禁止

技術：
- Vite
- React
- TypeScript
- Tailwind CSS

作る画面：
1. Dashboard
2. Storyboard
3. Asset Library
4. Prompt Bank
5. Missing List
6. CapCut Pack

データ：
- movie-dashboard/src/data/scenes.json
- movie-dashboard/src/data/assets.json
- movie-dashboard/src/data/prompts.json
- movie-dashboard/src/data/tasks.json

完了条件：
- pnpm install
- pnpm dev
- pnpm build
が通る。
READMEに起動方法と運用方法を書く。
```
