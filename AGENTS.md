# AGENTS.md

## 言語

- 日本語で回答、文書作成、ファイル名提案を行う。

## プロジェクト目的

- 動画制作をメインに進める。優先順位は、オープニングムービー、プロフィールムービー、紹介ムービー、AI背景素材、関連制作物の順。
- このリポジトリは、結婚式全体のコンセプト、内容、好み、制作判断を覚えるための場所でもある。
- 旅行テーマで統一された、映画予告編風と冒険アニメOP風の結婚式ムービーを作る。
- 目的は「AI動画作品」ではなく、二人らしさ、思い出、家族、友人、犬、音楽、世界観が自然につながる完成度の高いムービー。

## 現在の作業入口

レビュー前・作業前は、この順で見る。

1. `README.md`: 現在の入口とGit管理ルール。
2. `docs/task-board.md`: Now / Next / Blocked。
3. `02_opening-movie/asset-status.md`: AI素材の採否、不採用、再生成対象。
4. `motion-studio/README.md`: Remotion素材スタジオ。
5. `movie-dashboard/README.md`: ブラウザ制作ダッシュボード。

## 制作方針

- AI動画は主役にしない。背景、章切り替え、空気感、トランジション素材として使う。
- 新郎、新婦、家族、友人、犬は実写真・実動画を中心に扱う。
- 人物や犬のAI生成、AI変形、顔の置き換えは原則しない。
- クレジット消費を抑えるため、まずローカル試作や静止画検証で構図を固め、本番だけ有料動画AIを検討する。
- 長尺動画を生成せず、3-5秒のループしやすい素材を資産化する。
- 印刷物や返礼品はサブ制作物として扱い、動画の世界観に合わせる。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。人物なしで再生成する。

## 重要ドキュメント

- `docs/00_start-here.md`: 作業開始時の判断フロー
- `docs/01_brief.md`: 全体方針
- `docs/project-memory.md`: Gitを制作記憶として使う方針
- `docs/02_style-bible.md`: 世界観、色、光、禁止事項
- `docs/03_movie-structure.md`: 章構成
- `docs/04_ai-video-assets.md`: AI素材の作り方
- `docs/ai-video-operation.md`: 動画AIの実運用
- `docs/local-video-ai-setup.md`: ローカル動画AI環境の入れ方とClaude/Codexへの渡し方
- `docs/comfy-codex-chatgpt-workflow.md`: ComfyUI、Codex、ChatGPT/Claudeの連携手順
- `docs/05_capcut-editing.md`: 編集ルール
- `docs/capcut-operation.md`: CapCutの実運用
- `docs/failure-patterns.md`: 動画AIとCapCutの失敗例
- `docs/06_roadmap.md`: 制作順
- `docs/07_asset-intake.md`: 素材受け入れ
- `docs/08_rights-privacy.md`: 権利とプライバシー
- `docs/09_deliverables.md`: 納品仕様
- `docs/10_quality-gates.md`: 試作、レビュー、上映前チェック
- `docs/theme-switching.md`: 旅行テーマから別テーマへ変える時の差し替え方
- `docs/materials-todo.md`: 全動画に必要な素材と情報のTODO
- `docs/task-board.md`: 現在の作業状態
- `motion-studio/README.md`: Remotion素材スタジオ
- `movie-dashboard/README.md`: ブラウザ制作ダッシュボード

## ファイル運用

- 受け取った未整理素材は `00_inbox/` に置く。
- 実写真は `05_photos/`、実動画は `06_videos/`、BGM関連は `07_music/`、テキストは `08_texts/` に分類する。
- 生成AI素材は `04_ai-video-assets/` または各制作物フォルダのローカル素材置き場に置き、採用・保留・不採用が分かる名前にする。
- `02_opening-movie/sample_image/**` はGit管理外。GitHub上に無いこと自体を欠落扱いしない。
- 写真、動画、音源、書き出し済みムービー、大きなAI生成画像/動画は原則Gitに入れない。`.gitignore` を尊重し、必要ならログやメモだけコミットする。
- 素材を移動・分類したら `docs/templates/asset-log.csv` または制作物フォルダのメモに用途と採否を残す。
- 編集指示に進む場合は `docs/templates/capcut-edit-plan.csv` に秒数、動き、テロップ、BGM位置を残す。
- 書き出し前後は `docs/templates/export-checklist.csv` を使う。
- クライアントデータ、個人情報、写真、動画、音源を外部へアップロードする前に必ず確認する。
- BGMやフォントは利用条件を確認し、上映・SNS投稿・二次利用の可否を分けて考える。

## AIへの依頼時の基準

- まず `Style Bible` を確認する。
- 「いい感じ」ではなく「何秒のどんな素材が必要か」を明確にする。
- 生成プロンプトには原則 `no text, no logo, no watermark, no people, no animals, no signage` を入れる。
- 3-5秒、ゆっくり動く、主役は1つ、ループ可能、テロップ余白ありを優先する。
- 動画AI候補は `docs/templates/ai-video-scorecard.csv` で採点し、80点以上だけ本番生成候補にする。
- ただし、人物・動物・文字・ロゴ・看板が入った素材は点数に関係なく不採用または再生成対象。
- 最新の動画AIの料金、無料枠、クレジット消費、利用条件を扱う場合は、公式情報または一次情報を確認してから判断する。

## 制作判断

- 迷った判断は `docs/decisions/` に短く残す。
- 判断は、完成度、クレジット節約、実写真尊重、権利安全性、編集しやすさの順に見る。
- 本番生成や外部アップロードは、採用候補が絞れてから行う。
- ラフ版、完成前、上映前には `docs/10_quality-gates.md` のチェックを使う。
- 作業状態が変わったら `docs/task-board.md` の Now / Next / Later / Blocked を必要に応じて更新する。
- 動画以外の相談でも、結婚式全体のコンセプトや動画の世界観に関係する内容は記録対象にする。

## 検証

- 文書変更後は `rg --files` で構成を確認する。
- Markdown は見出し、リンク、フォルダ名の整合性を確認する。
- 動画・画像素材を追加した場合は、用途と採用判断を該当メモへ残す。
- `motion-studio` 変更時は `pnpm check` / `pnpm typecheck` / `pnpm export` を確認する。
- `movie-dashboard` 変更時は `pnpm build` とアプリ内データ整合性チェックを確認する。

## Wedding Figma / 印刷物の共通学習

Wedding内でFigmaを使うデザイン研究・改善を行う場合は、item固有authorityに加えて次を必ず共通入口として読む。

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Vector化が関係する場合のみ `docs/design-learning/RASTER-TO-EDITABLE-SVG-FIGMA-WORKFLOW.md`

AI-assisted Figmaのproject-wide defaultは役割分担を明確にする。

- 可変・意味を持つ文字はnative Figma text。
- 文字以外の固定装飾・あしらい・視覚処理は、将来個別編集する理由がなければ生成/composed assetを優先してよい。
- native textの背景枠・帯・紙片・吹き出し等も生成側に含めてよい。1行、2〜3行、4行以上などを固定ルールにせず、実際の文字量に合うsupport assetとsafe zoneを設計する。
- ロゴ、wordmark、icon、再利用価値の高いflat graphicは、必要性がある場合SVG/vectorを使う。
- 差し替え対象画像はstable mask/crop roleに置き、異なる画像サイズ・比率へ差し替えても周辺layoutを作り直さない構造にする。
- Figmaは主にassembly、native text編集、画像差し替え、配置、読みやすさ、最終QAのsurfaceとして使い、装飾を無理に大量のnative geometryで再現しない。
- ただしページ全体の一枚画像化や、後で変更する文字・事実の画像焼き込みはdefaultにしない。

この共通方針は制作方法だけを共有し、Rurubu、Passport、Ticket、ADD等の固有レイアウト・配色・装飾・世界観を同一化しない。
