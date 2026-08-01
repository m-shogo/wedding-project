# 追加ウェディングアイテム — MASTER LIST

Status: `CURRENT / FIGMA_PREPARATION_BACKLOG`
Authority date: 2026-08-01
Scope: 完成済み4種を除く追加制作

## 0. 永久除外

以下は完成済み。再作成・再生成・再配置・Figma編集をしない。

- るるぶWEDDING
- 青春ふたりきっぷ
- BOARDING PASS
- WEDDING PASSPORT

## 1. 共通テーマ

- 結婚式日: 2026-10-24
- 会場: 横浜
- 全体テーマ: 旅行
- 既存世界観: るるぶ風 / 航空券 / パスポート / 旅程表 / 空港案内
- Bride palette: ミントグリーン / グリーン / ブルー / シルバー / キラキラ
- 人物・ゲスト・犬のAI変換は禁止
- 可変情報は画像へ焼き込まず、Figmaで編集可能なテキストとして分離する

## 2. 優先順位つき一覧

| ID | アイテム | 優先度 | 初期状態 | 想定用途 |
|---|---|---|---|---|
| ADD-01 | ウェルカムボード | 最優先 | `PENDING` | 会場入口 |
| ADD-02 | 11卓の国別テーブルサイン | 最優先 | `PENDING` | 各卓案内 |
| ADD-03 | 当日タイムテーブルボード | 最優先 | `PENDING` | 当日の旅程案内 |
| ADD-04 | 受付サイン | 最優先 | `PENDING` | 新郎側・新婦側・受付 |
| ADD-05 | サンキュータグ / プチギフトタグ | 最優先 | `PENDING` | プチギフト |
| ADD-06 | フォトブースサイン | 高 | `PENDING` | 写真撮影場所 |
| ADD-07 | エスコートカード案内ボード | 高 | `PENDING` | 搭乗券風カードの案内 |
| ADD-08 | メニュー補助サイン | 高 | `PENDING` | 料理・ドリンク補助 |
| ADD-09 | ゲストブックサイン | 高 | `PENDING` | 受付記入案内 |
| ADD-10 | クローク / お手洗い / 会場案内サイン | 高 | `PENDING` | 会場導線 |
| ADD-11 | 写真共有 / ハッシュタグ / QR案内サイン | 中 | `PENDING` | 写真収集・共有 |
| ADD-12 | 新郎新婦クイズカード | 中 | `PENDING` | ゲスト参加演出 |
| ADD-13 | メッセージカード / 寄せ書きカード | 中 | `PENDING` | ゲストメッセージ |
| ADD-14 | 二次会案内カード / サイン | 条件付き | `PENDING_REQUIREMENT_CHECK` | 二次会がある場合 |
| ADD-15 | 料理紹介カード / 各国テーマ説明カード | 中 | `PENDING` | 卓テーマの演出 |
| ADD-16 | 両親贈呈品メッセージカード | 中 | `PENDING` | 贈呈品添え |
| ADD-17 | 子ども向けミニカード / ぬりえ | 条件付き | `PENDING_REQUIREMENT_CHECK` | 子どもゲスト向け |

## 3. アイテム別準備仕様

### ADD-01 ウェルカムボード

- 推奨サイズ候補: A2 / A3
- 方向: 縦を本命、横を比較候補
- 世界観: るるぶ特別号の表紙 / 旅行特集
- 可変テキスト: 新郎新婦名、日付、会場名、Welcome文
- semantic node案:
  - `TXT_WELCOME_TITLE`
  - `TXT_COUPLE_NAMES`
  - `TXT_WEDDING_DATE`
  - `IMG_WELCOME_HERO`
  - `DECOR_TRAVEL_BADGE_01`

### ADD-02 11卓の国別テーブルサイン

対象:

1. Hawaii
2. Italy
3. France
4. Spain
5. Taiwan
6. Japan
7. Hong Kong
8. Singapore
9. Bali
10. Korea
11. Maldives

- 本番は11卓を各1ファイルで管理
- 共通テンプレ + 国別背景・アイコン・短い説明
- 卓番号または卓名は編集テキスト
- semantic node案:
  - `TXT_TABLE_NAME`
  - `TXT_COUNTRY_NAME`
  - `TXT_COUNTRY_NOTE`
  - `IMG_COUNTRY_HERO`
  - `DECOR_COUNTRY_ICON`

### ADD-03 当日タイムテーブルボード

固定済みの時刻:

- Ceremony: 14:10–14:40
- Reception: 15:00–17:30

- 受付開始など未確定情報はダミーまたは`TBD`
- 旅行の旅程表 / Departure board風
- semantic node案:
  - `TXT_TIMELINE_TITLE`
  - `TXT_EVENT_01_TIME`
  - `TXT_EVENT_01_LABEL`
  - `TXT_EVENT_02_TIME`
  - `TXT_EVENT_02_LABEL`

### ADD-04 受付サイン

最低セット:

- 新郎側受付
- 新婦側受付
- Guest Book
- Gift / 御祝儀案内は会場運用確認後

semantic node案:

- `TXT_RECEPTION_SIDE`
- `TXT_RECEPTION_NOTE`
- `DECOR_RECEPTION_ICON`

### ADD-05 サンキュータグ / プチギフトタグ

文言候補:

- `Thank you for traveling with us.`
- `Have a safe trip home.`
- `2026.10.24`

- 穴あけ位置、安全域を明記
- 複数面付けデータと単体正本を分離
- semantic node案:
  - `TXT_THANK_YOU`
  - `TXT_DATE`
  - `DECOR_SMALL_TRAVEL_MARK`

### ADD-06 フォトブースサイン

文言候補:

- `BEST SHOT`
- `PHOTO SPOT`
- `TRAVEL MEMORY`

既存るるぶ素材を参照可能。ただし完成済み4種の正本を改変しない。

### ADD-07 エスコートカード案内ボード

文言候補:

- `BOARDING GATE`
- `Please pick up your ticket.`
- `Find your destination.`

BOARDING PASS本体は完成済みのため改変禁止。案内ボードのみ新規制作する。

### ADD-08 メニュー補助サイン

候補:

- Drink Menu案内
- Allergy / dietary案内
- World Trip Special Menu説明

料理・ドリンクの確定情報がない部分はダミーで準備し、事実として確定しない。

### ADD-09 ゲストブックサイン

文言候補:

- `Please sign our guest book.`
- `Leave a message for our journey.`

受付サインと同じコンポーネント系統で作る。

### ADD-10 クローク / お手洗い / 会場案内サイン

候補:

- Reception
- Cloak
- Restroom
- Photo Booth
- Smoking Area
- Elevator

実際の施設導線・設置可否は会場確認前に確定しない。

### ADD-11 写真共有 / ハッシュタグ / QR案内サイン

- QRコードの内容は未確定
- QRコードを画像生成しない
- QR差し替え枠だけ準備
- semantic node案:
  - `QR_PHOTO_SHARE`
  - `TXT_SHARE_TITLE`
  - `TXT_SHARE_NOTE`

### ADD-12 新郎新婦クイズカード

- 問題文・選択肢はダミーで準備可能
- 正解は本番内容確定まで固定しない
- 回収方法、回答方法、景品有無は未確定

### ADD-13 メッセージカード / 寄せ書きカード

テーマ候補:

- おすすめの旅先
- ふたりへの旅のアドバイス
- ふたりへのメッセージ

記入面は十分な余白を確保する。

### ADD-14 二次会案内カード / サイン

- 二次会の実施有無が未確定
- 会場・時間・参加方法を勝手に作らない
- テンプレと必要情報一覧まで準備し、`PREPARED_FOR_FIGMA`を許容

### ADD-15 料理紹介カード / 各国テーマ説明カード

- 11卓の国別テーマと連動
- 実際の料理と関係がない国説明を料理名として誤表示しない
- 国別ミニトリビア / 旅の思い出説明を編集テキストとして準備

### ADD-16 両親贈呈品メッセージカード

- 本番文章は未確定
- ダミー文ではなく、文字量レンジと差し替え枠を準備
- 写真使用時は人物AI変換禁止

### ADD-17 子ども向けミニカード / ぬりえ

- 子どもゲスト数・年齢が未確定
- 年齢に応じて難易度を決める
- テンプレ、ぬりえ枠、簡単な旅行モチーフまで準備可能
- 実施不要なら`NOT_REQUIRED`とする

## 4. 共通Figma準備成果物

各アイテムごとに以下を揃える。

- `SPEC.md`
- `ASSET-QUEUE.md`
- `DRIVE-REGISTER.md`
- `QA.md`
- `FIGMA-PLACEMENT-BRIEF.md`
- 正本素材は1素材1ファイル
- QA contact sheetは`NON_PRODUCTION`

Figma課金後は、新しい検討を始めず、これらを読んで配置・編集へ進める状態を目標とする。

## 5. 完了ステータス

- `PENDING`: 未着手
- `SPEC_READY`: 仕様準備完了
- `ASSET_IN_PROGRESS`: 素材作成中
- `GENERATED_ONLY`: 生成後工程未完
- `DRIVE_UPLOAD_BLOCKED`: Drive未完
- `PLACEMENT_READY`: Figma配置可能
- `PREPARED_FOR_FIGMA`: 条件付きアイテムのテンプレ準備完了
- `COMPLETED`: QA・Drive・Gitが全て完了
- `NOT_REQUIRED`: 実施不要と確定
- `REJECTED`: 不採用

## 6. Current pointer

`ACTIVE_NEXT = ADD-01_WELCOME_BOARD`
