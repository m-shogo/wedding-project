# wedding-project

結婚式の動画制作を中心に管理しつつ、結婚式全体のコンセプト、内容、判断を覚えるためのプロジェクト。

メインはオープニングムービー、プロフィールムービー、紹介ムービー。動画が主軸だが、コンセプト、BGM、テロップ、印刷物、返礼品、会場演出などの相談も、動画の世界観とつながるものとして扱う。テーマは「旅行」。AI は主役ではなく、背景素材、つなぎ素材、世界観補強として使う。新郎新婦、家族、友人、犬は実写真・実動画を中心に扱う。

## 現在の入口

レビュー前・作業前は、この順で見る。

1. `docs/task-board.md` — 今やること、詰まり、次のレビュー対象。
2. `02_opening-movie/asset-status.md` — AI静止画/I2V素材の採否と不足。
3. `motion-studio/README.md` — Remotion製モーション素材のテンプレ、書き出し、制作コックピット。
4. `motion-studio/exports/index.html` — `pnpm export` で生成する制作コックピット。確認入口。
5. `movie-dashboard/README.md` — ブラウザ管理ダッシュボード。絵コンテ、素材、プロンプト、タスクを編集する。
6. `docs/00_start-here.md` — 初回作業者向けの全体ナビ。

## 現在の制作ハブ

### motion-studio

Remotion + React + TypeScript で、CapCutに渡す短尺モーション素材を作る場所。

```sh
cd motion-studio
pnpm install
pnpm dev
pnpm check
pnpm export
```

- Remotion Studio が見た目調整用エディタ。
- 完成動画はここでは作らない。素材を書き出して、最終編集はCapCutで行う。
- `pnpm export` で `motion-studio/exports/index.html` などの制作コックピットを更新する。
- still画像・動画・`out/` 配下は生成物なのでGit管理しない。

### movie-dashboard

ブラウザ上で、絵コンテ、素材、プロンプト、タスクを管理する制作ダッシュボード。

```sh
cd movie-dashboard
pnpm install
pnpm dev
```

- データはlocalStorageに保存される。
- 共有・永続化したい場合はJSONエクスポートし、必要に応じて `src/data/*.json` に反映してcommitする。
- 大きな画像、動画、音源はGitに入れず、パス・メモ・採否だけ管理する。

## 優先順位

1. オープニングムービー
2. プロフィールムービー
3. 紹介ムービー、その他動画
4. AI背景素材ライブラリ
5. テロップ、BGM、編集指示
6. 印刷物や返礼品などの関連制作物

## まず見る

- [Start Here](docs/00_start-here.md)
- [制作方針](docs/01_brief.md)
- [Project Memory](docs/project-memory.md)
- [Style Bible](docs/02_style-bible.md)
- [ムービー構成](docs/03_movie-structure.md)
- [AI動画素材計画](docs/04_ai-video-assets.md)
- [動画AI運用手順](docs/ai-video-operation.md)
- [ローカル動画AIセットアップ手順](docs/local-video-ai-setup.md)
- [ComfyUI・Codex・ChatGPT連携マニュアル](docs/comfy-codex-chatgpt-workflow.md)
- [CapCut編集ルール](docs/05_capcut-editing.md)
- [CapCut運用手順](docs/capcut-operation.md)
- [失敗例リスト](docs/failure-patterns.md)
- [進行ロードマップ](docs/06_roadmap.md)
- [素材受け入れルール](docs/07_asset-intake.md)
- [権利・プライバシー](docs/08_rights-privacy.md)
- [納品仕様](docs/09_deliverables.md)
- [品質ゲート](docs/10_quality-gates.md)
- [テーマ差し替えガイド](docs/theme-switching.md)
- [全動画 素材・情報TODO](docs/materials-todo.md)
- [クリップ素材集の使い方](docs/clip-library-guide.md)
- [参考レシピ一覧（おいしいとこどり素材集）](docs/reference-recipes.md)
- [無料素材の入手先](docs/free-sample-sources.md)
- [タスクボード](docs/task-board.md)

## フォルダ

```text
00_inbox/                  受け取った素材の一時置き場
01_profile-movie/          プロフィールムービー
02_opening-movie/          オープニングムービー
03_introduction-movie/     紹介ムービー、その他紹介系
04_ai-video-assets/        AI生成の背景・つなぎ素材
05_photos/                 実写真
06_videos/                 実動画
07_music/                  BGM候補、効果音メモ
08_texts/                  ナレーション、テロップ、コメント
09_design-assets/          フォント、色、ロゴ風素材、装飾
10_references/             参考動画、参考スクショ、URLメモ
11_printables/             印刷物、返礼品、しおり案。動画の世界観に合わせるサブ制作物
motion-studio/             Remotion製モーション素材スタジオ
movie-dashboard/           ブラウザ制作ダッシュボード
opening-movie/             オープニング構成案1の初期構想アーカイブ（現行入口ではない）
90_exports/                書き出し済み成果物（Git管理外）
99_archive/                不採用・古い版
```

## Git管理ルール

1. 写真・動画・音源・書き出し済みムービー・大きなAI生成素材は原則Gitに入れない。
2. Gitに残すのは、ログ、判断、構成、プロンプト、編集指示、CSV/MD/HTMLの管理資料。
3. `02_opening-movie/sample_image/**` はローカル管理。GitHub上に無いこと自体は欠落ではない。
4. `motion-studio/out/**`、still画像、動画書き出しは生成物なのでGit管理しない。
5. 実素材を外部サービスやAIに渡す前に、権利・プライバシーを確認する。

## 素材採用ルール

- AI素材は原則 3-5秒の背景・つなぎ素材。
- 人物、犬、家族、友人のAI生成・AI変形は原則しない。
- AI画像/動画に文字、数字、ロゴ、看板、ウォーターマークを入れない。
- 人物・動物・文字・ロゴ・看板が入ったAI素材は、点数が高くても不採用または再生成対象。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。人物なしで再生成する。

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
- CapCut編集指示: `docs/templates/capcut-edit-plan.csv`
- 書き出しチェック: `docs/templates/export-checklist.csv`
- 素材TODO管理: `docs/templates/materials-checklist.csv`
- 制作判断: `docs/decisions/`

## 次にやる

最新のNow/Nextは `docs/task-board.md` を見る。README内の固定TODOではなく、タスクボードを単一の作業入口にする。
