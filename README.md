# wedding-project

結婚式の動画制作を中心に管理しつつ、結婚式全体のコンセプト、内容、判断を覚えるためのプロジェクト。

メインはオープニングムービー、プロフィールムービー、紹介ムービー。動画が主軸だが、コンセプト、BGM、テロップ、印刷物、返礼品、会場演出などの相談も、動画の世界観とつながるものとして扱う。テーマのサンプルは「旅行」。AI は主役ではなく、背景素材、つなぎ素材、世界観補強として使う。新郎新婦、家族、友人、犬は実写真を中心に扱う。

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
motion-studio/             Remotion製モーション素材スタジオ（搭乗券、地図、ハンコ、カウントダウン）
90_exports/                書き出し済み成果物
99_archive/                不採用・古い版
```

## 運用

1. 素材はまず `00_inbox/` に入れる。
2. 何の制作物に使うか決まったら該当フォルダへ移す。
3. 写真・動画・音源は原則Gitに入れない。ローカルで管理し、ログだけ残す。
4. AI で作るのは原則 3-5 秒の素材。
5. 動画の完成度は `Style Bible`、写真選別、BGM合わせ、編集テンポで作る。
6. 人物、犬、家族、友人のAI生成・AI変形は原則しない。
7. 重要なコンセプト、好み、判断はGitに残し、次回以降の前提にする。

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

1. 会場仕様を `docs/templates/venue-specs.csv` に記録する。
2. BGM候補を `docs/templates/music-candidates.csv` に集める。
3. 参考動画や写真を `00_inbox/` に入れる。
4. `docs/templates/asset-log.csv` に素材の用途と採否を記録する。
5. `02_opening-movie/roadmap.md` と `01_profile-movie/roadmap.md` を見て、動画の10秒試作を作る。
