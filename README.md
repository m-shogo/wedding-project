# wedding-project

結婚式の動画制作を中心に管理しつつ、結婚式全体のコンセプト、内容、判断を覚えるためのプロジェクト。

メインはオープニングムービー、プロフィールムービー、紹介ムービー。テーマは「旅行」。AIは主役ではなく、必要な背景/B-roll/つなぎの補助に限定する。新郎新婦、家族、友人、犬は実写真・実動画を中心に扱う。

## 現在の最優先

**2026-10-24の上映用Opening V1を完成させる。**

現行Opening V1:

- 60秒
- 8scene
- 実写真scene 53秒（約88%）
- 必須AI B-roll 0本
- Remotionがsource of truth
- 11枚の実写真を差し替えるだけでpreview/finalへ進める構成

詳細: `docs/opening-v1-motion-map.md`

作業順: `docs/task-board.md`

## 現在の入口

作業前はこの順で見る。

1. `docs/task-board.md` — 今やること。
2. `docs/opening-v1-motion-map.md` — Opening V1の60秒構成・編集言語・QA正本。
3. `motion-studio/README.md` — Remotion実装・render・QA。
4. `02_opening-movie/asset-status.md` — 既存素材の採否と不足。旧AI素材も含むため、Opening正本より優先しない。
5. `movie-dashboard/README.md` — 絵コンテ、素材、プロンプト、タスクの補助管理。
6. `docs/00_start-here.md` — 全体ナビ。

## motion-studio

Remotion + React + TypeScriptでWedding Movieと必要なモーション素材を作る場所。

Opening V1については、**ここで完成動画までrenderする**。

```sh
cd motion-studio
pnpm install
pnpm dev:opening-v1
pnpm render:opening-v1:preview
pnpm render:opening-v1
```

- `public/photos/opening/` の写真は起動/render前に自動探索される。
- previewは写真不足でもplaceholderで確認できる。
- final renderはcanonical 11枚が揃うまで失敗する。
- Opening変更PRはtypecheckだけでなくVisual QA stillを8枚renderする。
- still/video/`out/`配下は生成物なのでGit管理しない。
- Palmier / CapCutは必要な場合のBGM微調整・trim・venue向けfinal polishだけに使う。別timelineを正本にしない。

## movie-dashboard

ブラウザ上で、絵コンテ、素材、プロンプト、タスクを管理する補助ダッシュボード。

```sh
cd movie-dashboard
pnpm install
pnpm dev
```

- データはlocalStorageに保存される。
- 共有・永続化したい場合はJSONエクスポートし、必要に応じて `src/data/*.json` に反映してcommitする。
- 大きな画像、動画、音源はGitに入れず、パス・メモ・採否だけ管理する。
- ダッシュボード機能追加より実際のOpening完成を優先する。

## 優先順位

1. Opening V1完成
2. プロフィールムービー
3. 紹介ムービー、その他動画
4. 必要になったAI B-roll / 背景素材
5. ダッシュボード・制作基盤の追加改善
6. その他関連制作物

## Opening V1で戻さないもの

Visual QAでテンプレ感/生成感が強かったため削除済み:

- 中央serifの5秒title card
- `CloudSea` 4秒transition
- 大きいWedding風ending title
- 均等3枚Photo Card
- 全写真Ken Burns
- 意味の薄い英字kicker

AI動画を作ること自体を目標にしない。実写真+BGMのpreviewで弱いcutが明確になった場合だけ、必要shotをPrompt Builderへ送る。

## まず見る

- [タスクボード](docs/task-board.md)
- [Opening V1 編集言語](docs/opening-v1-motion-map.md)
- [制作方針](docs/01_brief.md)
- [Project Memory](docs/project-memory.md)
- [Style Bible](docs/02_style-bible.md)
- [品質ゲート](docs/10_quality-gates.md)
- [権利・プライバシー](docs/08_rights-privacy.md)
- [納品仕様](docs/09_deliverables.md)
- [写真選定CSV](docs/templates/photo-selection.csv)
- [BGM候補CSV](docs/templates/music-candidates.csv)
- [会場仕様CSV](docs/templates/venue-specs.csv)

## フォルダ

```text
00_inbox/                  受け取った素材の一時置き場
01_profile-movie/          プロフィールムービー
02_opening-movie/          オープニング関連資料・旧素材
03_introduction-movie/     紹介ムービー、その他紹介系
04_ai-video-assets/        AI生成の背景・つなぎ素材
05_photos/                 実写真
06_videos/                 実動画
07_music/                  BGM候補、効果音メモ
08_texts/                  ナレーション、テロップ、コメント
09_design-assets/          フォント、色、ロゴ風素材、装飾
10_references/             参考動画、参考スクショ、URLメモ
11_printables/             印刷物、返礼品、しおり案
motion-studio/             Remotion本編/モーション制作
movie-dashboard/           ブラウザ制作補助ダッシュボード
opening-movie/             初期構想アーカイブ（現行入口ではない）
90_exports/                書き出し済み成果物（Git管理外）
99_archive/                不採用・古い版
```

## Git管理ルール

1. 写真・動画・音源・書き出し済みムービー・大きなAI生成素材は原則Gitに入れない。
2. Gitに残すのは、コード、ログ、判断、構成、プロンプト、編集指示、CSV/MD/HTMLの管理資料。
3. `02_opening-movie/sample_image/**` はローカル管理。GitHub上に無いこと自体は欠落ではない。
4. `motion-studio/out/**`、still画像、動画書き出しは生成物なのでGit管理しない。
5. 実素材を外部サービスやAIに渡す前に、権利・プライバシーを確認する。

## 素材採用ルール

- AI素材は必要性が確認された短い背景/B-rollだけ。
- 人物、犬、家族、友人のAI生成・AI変形はしない。
- AI画像/動画に文字、数字、ロゴ、看板、ウォーターマークを入れない。
- 人物・動物・文字・ロゴ・看板が混入したAI素材は不採用または再生成。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。

## ログ

- 素材一覧: `docs/templates/asset-log.csv`
- 絵コンテ: `docs/templates/storyboard.csv`
- AI生成候補: `docs/templates/ai-shot-list.csv`
- AI動画採点: `docs/templates/ai-video-scorecard.csv`
- 写真選定: `docs/templates/photo-selection.csv`
- BGM候補: `docs/templates/music-candidates.csv`
- 参考映像: `docs/templates/reference-log.csv`
- 会場仕様: `docs/templates/venue-specs.csv`
- レビュー記録: `docs/templates/review-notes.csv`
- 書き出しチェック: `docs/templates/export-checklist.csv`
- 素材TODO管理: `docs/templates/materials-checklist.csv`
- 制作判断: `docs/decisions/`

## 次にやる

最新のNow/Nextは `docs/task-board.md` を見る。README内の固定TODOではなく、タスクボードを単一の作業入口にする。
