# 追加ウェディングアイテム — CURRENT STATUS

Status: `ACTIVE / PREPARATION_AND_ASSET_PRODUCTION`
Date: 2026-08-01
Authority: `m-shogo/wedding-project` `main`

このファイルは追加ウェディングアイテム制作の現在地を示す。詳細仕様は`MASTER-LIST.md`、実行ルールは`CURRENT-AUTOMATION-PLAN.md`、再発防止は`POSTMORTEM-AND-REPEAT-PREVENTION.md`を参照する。

## 完成済み・対象外

- るるぶWEDDING
- 青春ふたりきっぷ
- BOARDING PASS
- WEDDING PASSPORT

上記4種へのwrite・再生成・Figma編集は禁止。

## 現在の対象

追加17種。Figmaは使用せず、Figma課金後にすぐ配置できるところまで準備する。

| ID | アイテム | 状態 |
|---|---|---|
| ADD-01 | ウェルカムボード | `PENDING` |
| ADD-02 | 11卓の国別テーブルサイン | `PENDING` |
| ADD-03 | 当日タイムテーブルボード | `PENDING` |
| ADD-04 | 受付サイン | `PENDING` |
| ADD-05 | サンキュータグ / プチギフトタグ | `PENDING` |
| ADD-06 | フォトブースサイン | `PENDING` |
| ADD-07 | エスコートカード案内ボード | `PENDING` |
| ADD-08 | メニュー補助サイン | `PENDING` |
| ADD-09 | ゲストブックサイン | `PENDING` |
| ADD-10 | クローク / お手洗い / 会場案内サイン | `PENDING` |
| ADD-11 | 写真共有 / ハッシュタグ / QR案内サイン | `PENDING` |
| ADD-12 | 新郎新婦クイズカード | `PENDING` |
| ADD-13 | メッセージカード / 寄せ書きカード | `PENDING` |
| ADD-14 | 二次会案内カード / サイン | `PENDING_REQUIREMENT_CHECK` |
| ADD-15 | 料理紹介カード / 各国テーマ説明カード | `PENDING` |
| ADD-16 | 両親贈呈品メッセージカード | `PENDING` |
| ADD-17 | 子ども向けミニカード / ぬりえ | `PENDING_REQUIREMENT_CHECK` |

## Current pointer

`ACTIVE_NEXT = ADD-01_WELCOME_BOARD`

## Current execution rules

- Figma禁止
- 1時間ごとのScheduled Taskで進行
- 生成だけで完了扱いしない
- `生成 → 後処理 → QA → Drive → Drive readback → Git → NEXT更新`を1単位とする
- 1素材1ファイル
- Drive IDとcommit SHAがなければ`COMPLETED`にしない
- 既存成果物をGitとDriveで検索してから新規生成する
- 条件付きアイテムは実施有無を勝手に確定せず、テンプレ準備まで許容する

## Figma課金後の開始条件

各アイテムで以下が揃ったものから配置可能とする。

- `SPEC.md`
- `ASSET-QUEUE.md`
- `DRIVE-REGISTER.md`
- `QA.md`
- `FIGMA-PLACEMENT-BRIEF.md`
- 正本素材のDrive ID
- 可変テキスト一覧
- semantic node name案
- 印刷サイズ・塗り足し・安全域

## Completion declaration

追加17種すべてが`COMPLETED`、`PLACEMENT_READY`、`PREPARED_FOR_FIGMA`、または`NOT_REQUIRED`のいずれかになった時点で、

`ALL_ADDITIONAL_ITEMS_PREPARED`

とする。
