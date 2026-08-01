# 追加ウェディングアイテム制作 — CURRENT AUTOMATION PLAN

Status: `ACTIVE / HOURLY / FIGMA_PROHIBITED`
Authority date: 2026-08-01
Repository authority: `m-shogo/wedding-project` `main`

この文書は、完成済み4種以外の追加ウェディングアイテムを自動制作するための唯一のCurrent入口である。過去のスケジュール・旧キュー・会話メモと衝突した場合は、この文書を優先する。

## 1. 完成済み4種 — 永久除外

次の4種は完成済みとして扱い、この自動制作では一切触らない。

- るるぶWEDDING
- 青春ふたりきっぷ
- BOARDING PASS
- WEDDING PASSPORT

禁止事項:

- 再作成
- 再生成
- 再配置
- 再採用判定
- Figma編集
- 完了済み素材の別案生成
- 旧版をCurrentへ戻すこと

参照は可能だが、write対象にはしない。

## 2. Figma禁止

この自動制作ではFigmaを使用しない。

- Figma MCP call禁止
- Figmaファイル作成禁止
- Figma既存ファイル編集禁止
- Figma quota probe禁止

成果物は、画像生成・ローカル/プログラム処理・Google Drive・Git管理までとする。

Figma課金後に配置・編集できるよう、各成果物では以下を準備する。

- 印刷サイズ
- 塗り足し・安全域
- 可変テキスト一覧
- 画像と編集テキストの分離
- semantic node name案
- Drive正本ID
- 配置メモ

## 3. 追加制作の固定順

先頭の未完了1件から進める。順番を飛ばさない。

### Phase A — 最優先

1. `ADD-01` ウェルカムボード
2. `ADD-02` 11卓の国別テーブルサイン
3. `ADD-03` 当日タイムテーブルボード
4. `ADD-04` 受付サイン
5. `ADD-05` サンキュータグ / プチギフトタグ

### Phase B — 優先高

6. `ADD-06` フォトブースサイン
7. `ADD-07` エスコートカード案内ボード
8. `ADD-08` メニュー補助サイン
9. `ADD-09` ゲストブックサイン
10. `ADD-10` クローク / お手洗い / 会場案内サイン

### Phase C — 拡張候補

11. `ADD-11` 写真共有 / ハッシュタグ / QR案内サイン
12. `ADD-12` 新郎新婦クイズカード
13. `ADD-13` メッセージカード / 寄せ書きカード
14. `ADD-14` 二次会案内カード / サイン
15. `ADD-15` 料理紹介カード / 各国テーマ説明カード
16. `ADD-16` 両親贈呈品メッセージカード
17. `ADD-17` 子ども向けミニカード / ぬりえ

詳細は `MASTER-LIST.md` を正本とする。

### 初期状態

| ID | アイテム | 優先度 | 状態 |
|---|---|---|---|
| ADD-01 | ウェルカムボード | 最優先 | `PENDING` |
| ADD-02 | 11卓の国別テーブルサイン | 最優先 | `PENDING` |
| ADD-03 | 当日タイムテーブルボード | 最優先 | `PENDING` |
| ADD-04 | 受付サイン | 最優先 | `PENDING` |
| ADD-05 | サンキュータグ / プチギフトタグ | 最優先 | `PENDING` |
| ADD-06 | フォトブースサイン | 高 | `PENDING` |
| ADD-07 | エスコートカード案内ボード | 高 | `PENDING` |
| ADD-08 | メニュー補助サイン | 高 | `PENDING` |
| ADD-09 | ゲストブックサイン | 高 | `PENDING` |
| ADD-10 | クローク / お手洗い / 会場案内サイン | 高 | `PENDING` |
| ADD-11 | 写真共有 / ハッシュタグ / QR案内サイン | 中 | `PENDING` |
| ADD-12 | 新郎新婦クイズカード | 中 | `PENDING` |
| ADD-13 | メッセージカード / 寄せ書きカード | 中 | `PENDING` |
| ADD-14 | 二次会案内カード / サイン | 条件付き | `PENDING_REQUIREMENT_CHECK` |
| ADD-15 | 料理紹介カード / 各国テーマ説明カード | 中 | `PENDING` |
| ADD-16 | 両親贈呈品メッセージカード | 中 | `PENDING` |
| ADD-17 | 子ども向けミニカード / ぬりえ | 条件付き | `PENDING_REQUIREMENT_CHECK` |

各実行開始時にGitとDriveを再確認し、既に成果物と完了証跡がある場合は状態を更新して再作成を防止する。

## 4. 自動実行スケジュール

- 開始: 2026-08-01 13:00 JST
- 頻度: 1時間ごと
- 回数: 24回
- 目的: 2026-08-02中までに可能な限りPhase A/Bを完了し、Phase CのFigma前準備を進める

品質ゲートを下げて見かけ上の完了数を増やしてはならない。

## 5. 毎回の必須開始手順

1. GitHub `main` の最新状態を取得する。
2. この `CURRENT-AUTOMATION-PLAN.md` を読む。
3. `POSTMORTEM-AND-REPEAT-PREVENTION.md` を読む。
4. `MASTER-LIST.md` と `CURRENT-STATUS.md` を読む。
5. 対象アイテムのitem-specificキュー・QA・Drive registerを読む。
6. Google Driveの対象フォルダを確認する。
7. `COMPLETED` / `PLACEMENT_READY` / `ACCEPTED`をスキップする。
8. `GENERATED_ONLY` / `DRIVE_UPLOAD_BLOCKED` / `IN_PROGRESS`を先に回収する。
9. 固定順の先頭にある本当の未完了1件を決める。

前回の会話・記憶・古いcommitだけを根拠に現在地を決めない。

## 6. 1アイテムの標準パイプライン

1. 仕様整理
2. 必要素材一覧をitem-specificキューへ記録
3. 既存Git・Driveの重複検索
4. 画像生成またはプログラム生成
5. 必要なら透過処理
6. 機械QA
7. 視覚QA
8. Google Driveへ新規保存
9. Drive上で存在・ファイル名・MIME type・親フォルダをreadback
10. Drive file ID / URLをGitへ記録
11. item-specific状態と`CURRENT-STATUS.md`を更新
12. write直前に最新mainを再確認
13. commit
14. commit後にmainとDriveを再確認
15. 次の未完了素材または次アイテムへ進む

## 7. 重複・やり直し防止

- 1素材 = 1ファイル
- asset sheetは`QA_CONTACT_SHEET / NON_PRODUCTION`
- 採用済み、`COMPLETED`、`PLACEMENT_READY`、`ACCEPTED`は必ずスキップ
- 同じ名前・役割・構図の再生成前にGitとDriveを検索
- Driveへ上書きせず新規保存
- 候補と正本を区別
- 同じ失敗方法を2回繰り返さない
- 2回失敗したら生成方法・背景除去方法・出力形式を変更
- 進んだふり禁止
- Drive未保存なら完了扱いにしない
- Git commitなしなら完了扱いにしない
- 旧版をCurrentへ昇格しない

## 8. 画像とテキストの分離

画像生成を優先するもの:

- ロゴ
- 装飾タイトル
- スタンプ
- エンブレム
- 写真フレーム
- 旅行小物
- 質感やイラストが価値になる装飾

画像化しないもの:

- ゲスト名
- 卓番号
- 可変日付
- QRコード
- 長文
- 普通の見出し
- 通常本文
- 後で差し替える可変ラベル

可変情報は編集可能なテキストデータとして別管理する。

## 9. 透過PNGルール

透過が必要な素材は原則:

1. 単色グリーン背景で1素材のみ生成
2. Python/chroma-keyでalpha化
3. alpha channel実在確認
4. 外周透明確認
5. visible green / 緑フリンジ確認
6. checkerboard・白背景・緑背景の焼き込みがないことを確認

不適合素材は`REJECTED`。本番へ昇格させない。

## 10. Drive完了ゲート

成果物はGitだけでは完了しない。

完了条件:

- 正しいDriveフォルダへ保存済み
- Drive上で存在確認済み
- ファイル名確認済み
- MIME type / 拡張子確認済み
- 必要なら透過確認済み
- Drive file ID / URLをGitへ記録済み

Drive uploadが失敗した場合は`DRIVE_UPLOAD_BLOCKED`として未完了のまま残し、次回最優先で再試行する。

## 11. Git競合防止

- item-specificファイルを優先して更新
- 全体共通文書を毎素材ごとに変更しない
- write直前に最新mainを取得
- 対象pathが変わっていたら再読込
- 古い内容で上書きしない
- force push禁止
- 履歴書換え禁止
- ユーザー変更の巻き戻し禁止
- 競合時は差分を再構成してからwrite

## 12. 各アイテムの完了条件

### 単体画像系

- 視覚QA PASS
- 必要な透過QA PASS
- Drive保存済み
- Drive存在確認済み
- Git記録済み
- commit SHAあり

### 複数点セット系

- 必要点数が全て揃っている
- 命名規則が統一されている
- サイズ・余白・トーンが統一されている
- 各ファイルを個別保存
- 一覧QAは参考用のみ
- 本番正本は個別ファイル

### ボード系

- 印刷想定サイズを明記
- 塗り足し・安全域を明記
- 可変テキストを別管理
- 画像生成部分と編集テキスト部分を分離
- Figma semantic node name案を記録
- Drive/Git完了ゲートPASS

### 条件付きアイテム

`ADD-14`、`ADD-17`など実施条件が不明なものは、勝手に本番文言や人数を確定しない。ダミー仕様・テンプレ・必要情報一覧までを`PREPARED_FOR_FIGMA`として準備し、実施有無は別途確定する。

## 13. 報告フォーマット

各実行回の終了時に必ず報告する。

- 対象アイテム
- 開始時状態
- 実際に変更したもの
- 生成数
- QA PASS数 / REJECT数
- Drive新規保存数
- Drive file ID / URL
- Git commit SHA
- BLOCK
- 次回の先頭未完了

実作業がない場合は`NO_CHANGE`と理由を明示し、成果を捏造しない。

## 14. 全17件完了後

全17件が完了、または条件付きアイテムが`PREPARED_FOR_FIGMA`なら:

- 新規生成しない
- 再作成しない
- GitとDriveの整合性だけ確認
- 欠損・重複・未記録IDがなければ`ALL_ADDITIONAL_ITEMS_PREPARED`
- 完了報告後、同じ成果物を増殖させない

## 15. Current宣言

この自動制作の対象は追加17種だけである。
完成済み4種とFigmaは対象外である。

`ACTIVE_NEXT = ADD-01_WELCOME_BOARD`
