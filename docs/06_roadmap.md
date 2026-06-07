# 制作ロードマップ

## 基本方針

動画AIは最後に使う。先に会場仕様、BGM、写真選定、秒割り、試作で勝ち筋を作る。

## Phase 0 会場仕様確認

目的: 最後の書き出し事故を防ぐ。

確認すること:

- 推奨画角
- 推奨解像度
- 推奨ファイル形式
- 音量ルール
- 持ち込み方法
- 提出締切
- 再生テストの可否

記録先:

- `docs/templates/venue-specs.csv`
- `docs/09_deliverables.md`

## Phase 1 BGM候補集め

目的: 尺、テンポ、感情の山を先に決める。

やること:

- 会場上映用の候補を集める
- SNS投稿用に使えるかを分ける
- 盛り上がり位置をメモする
- 曲の雰囲気を章構成に合わせる

記録先:

- `docs/templates/music-candidates.csv`

## Phase 2 参考映像研究

目的: 「いい感じ」ではなく「欲しい5秒」を集める。

集めるもの:

- 旅行CM
- 航空会社CM
- 映画予告編
- MV
- 空港映像
- 海、雲、夜景、光
- CapCut神作品

記録先:

- `docs/templates/reference-log.csv`

## Phase 3 Style Bible確定

目的: 以後の素材、テロップ、AI生成、編集判断をぶらさない。

やること:

- 色
- 光
- 質感
- カメラ
- フォント
- 禁止事項

記録先:

- `docs/02_style-bible.md`

## Phase 4 素材整理

目的: 写真、動画、音源、参考素材を迷子にしない。

やること:

- 受け取ったものは `00_inbox/`
- 用途が決まったら分類
- 採用、保留、不採用を記録

記録先:

- `docs/07_asset-intake.md`
- `docs/templates/asset-log.csv`

## Phase 5 写真選定

目的: 良い写真を全部入れるのではなく、ストーリーに効く写真を選ぶ。

選ぶ基準:

- 表情が良い
- 章の役割がある
- 家族、友人、犬との関係が伝わる
- 画質が足りる
- テロップを載せる余白がある

記録先:

- `docs/templates/photo-selection.csv`

## Phase 6 秒割り・絵コンテ

目的: CapCutを開く前に構成を決める。

やること:

- 写真の表示秒数
- パン、ズーム
- テロップ
- AI素材の挿入位置
- BGMの山との対応

記録先:

- `docs/templates/storyboard.csv`

## Phase 7 10秒試作

目的: 世界観が成立するかを最小単位で見る。

含めるもの:

- 実写真
- テロップ
- BGM
- AI背景または参考背景
- トランジション

確認:

- `docs/10_quality-gates.md` の Gate 1

## Phase 8 30秒試作

目的: 冒頭から章切り替えまでのテンポを確認する。

確認:

- `docs/10_quality-gates.md` の Gate 2

## Phase 9 1章だけ完成

目的: 本編全体を作る前に、完成品質の基準を作る。

おすすめ:

- Chapter 1 出発
- または Chapter 4 冒険

見ること:

- 写真の見やすさ
- テロップの読みやすさ
- BGM合わせ
- AI素材の出しゃばり具合
- 最終的な質感

## Phase 10 AI背景素材制作

目的: 必要な素材だけを低コストで作る。

やること:

- `ai-shot-list.csv` で候補を絞る
- 静止画で構図確認
- ローカル試作
- 本番動画AIは採用候補だけ

記録先:

- `docs/04_ai-video-assets.md`
- `docs/templates/ai-shot-list.csv`

## Phase 11 本編ラフ

目的: 全体の流れを一度つなぐ。

確認:

- `docs/10_quality-gates.md` の Gate 3

## Phase 12 テロップ・BGM・音量調整

目的: ゲストが見やすく、聞きやすい状態にする。

やること:

- テロップ短縮
- 表示時間調整
- 写真差し替え
- BGM音量調整
- 余韻調整

## Phase 13 権利・プライバシー確認

目的: 上映版、SNS版、共有版を安全に分ける。

確認:

- 音源
- フォント
- テンプレート
- AI生成サービス
- 友人や家族の写り方

記録先:

- `docs/08_rights-privacy.md`

## Phase 14 上映前チェック

目的: 会場での失敗を防ぐ。

確認:

- 会場仕様に合う書き出し
- 文字サイズ
- 音量
- 暗すぎないか
- 予備ファイル
- 持ち込み方法

品質ゲート:

- `docs/10_quality-gates.md` の Gate 4

## Phase 15 最終書き出し・バックアップ

目的: 当日使える状態で複数保管する。

やること:

- 上映版を書き出す
- 予備形式を書き出す
- SNS版が必要なら別書き出し
- 外部ストレージやクラウドにバックアップ

記録先:

- `90_exports/`
- `docs/09_deliverables.md`

## 調査待ち

以下は最新の料金、無料枠、クレジット消費、商用利用条件が変わるため、使う直前に公式情報で確認する。

- Runway
- Pika
- Luma
- Kling
- Hailuo
- Wan
- Hunyuan Video
- ComfyUI
