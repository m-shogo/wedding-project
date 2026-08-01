# 追加ウェディングアイテム — CURRENT STATUS

Status: `ACTIVE / PREPARATION_AND_ASSET_PRODUCTION`
Date: 2026-08-02
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
| ADD-01 | ウェルカムボード | `PLACEMENT_READY` |
| ADD-02 | 11卓の国別テーブルサイン | `PREPARED_FOR_FIGMA` |
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

`ACTIVE_NEXT = ADD-03_TIMETABLE_BOARD_SPEC_AND_QUEUE`

## ADD-01 checkpoint

- item-specific documents: 5/5 prepared
- production assets: 4
- accepted assets: WB-01, WB-02, WB-03, WB-04
- WB-05: `NOT_REQUIRED_AFTER_REVIEW` because an additional Yokohama graphic would compete with hero photo, title and editable location text
- WB-06: editable Figma photo-frame shape specification ready
- WB-07: editable title/name/date/location text specification ready
- Drive ADD-01 folder: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`
- Production QA: 4 PASS / 0 REJECT
- item completion: `PLACEMENT_READY`

## ADD-02 checkpoint

- item-specific documents: 5/5 prepared
- destinations fixed: Hawaii, Italy, France, Spain, Taiwan, Japan, Hong Kong, Singapore, Bali, Korea, Maldives
- production model: one Figma item file with 11 semantic destination frames; one destination per export
- common hierarchy and country-specific art direction recorded
- editable text and non-destructive photo contract recorded
- provisional primary size: 100 × 148 mm portrait, subject to holder/vendor confirmation
- Drive ADD-02 folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- production raster assets: 0 by design
- generation decision: fake country imagery and generic flag-card generation rejected; selected real photos and native Figma motifs take priority
- first prototype set for future Figma: Hawaii / Taiwan / Maldives
- item completion: `PREPARED_FOR_FIGMA`

## Current execution rules

- Figma禁止
- 生成だけで完了扱いしない
- `生成 → 後処理 → QA → Drive → Drive readback → Git → NEXT更新`を1単位とする
- 1素材1ファイル
- Drive IDとcommit SHAがなければ`COMPLETED`にしない
- 既存成果物をGitとDriveで検索してから新規生成する
- 条件付きアイテムは実施有無を勝手に確定せず、テンプレ準備まで許容する
- 素材が不要なアイテムは、無理にラスターを生成せず`PREPARED_FOR_FIGMA`を許容する

## Figma課金後の開始条件

各アイテムで以下が揃ったものから配置可能とする。

- `SPEC.md`
- `ASSET-QUEUE.md`
- `DRIVE-REGISTER.md`
- `QA.md`
- `FIGMA-PLACEMENT-BRIEF.md`
- 正本素材のDrive ID、または素材不要の明示的判断
- 可変テキスト一覧
- semantic node name案
- 印刷サイズ・塗り足し・安全域

## Completion declaration

追加17種すべてが`COMPLETED`、`PLACEMENT_READY`、`PREPARED_FOR_FIGMA`、または`NOT_REQUIRED`のいずれかになった時点で、

`ALL_ADDITIONAL_ITEMS_PREPARED`

とする。
