# ADD-14 二次会案内 — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Purpose
二次会の実施が確定した場合に、披露宴後の移動・開始時刻・参加方法を誤解なく案内するための条件付きテンプレート。実施しない場合は`NOT_REQUIRED`へ切り替える。

## Required information before production
- 二次会を実施するか
- 正式会場名・住所・階数
- 受付開始・開始・終了予定時刻
- 披露宴会場からの移動方法と所要時間
- 会費・支払方法
- 参加対象と出欠回答方法・期限
- 幹事または当日連絡先
- 服装・持ち物・年齢制限などの注意事項

未確定情報を推測して本番文言にしない。

## Format
- 本命: A6縦（148 × 105 mm）または名刺2枚相当の縦長カード
- 代替: A5縦の卓上案内
- 塗り足し: 四辺3 mm
- 安全域: 仕上がり線から7 mm以上
- QRを使う場合: 公式URL確定後に差し替え可能な独立ノードとする

## Visual direction
コンセプトは`NIGHT CONNECTION / YOKOHAMA LATE DEPARTURE`。披露宴の紙面を縮小コピーせず、夜の横浜を想起させる深いネイビー、温かいアイボリー、限定的なミントとシルバーで構成する。時刻・場所・移動を主情報とし、装飾は一本の夜間ルートと目的地ノードに限定する。ネオン看板、酒瓶、グラス、過剰な星、均等な角丸カード群は使わない。

## Editable text
- `TXT_AFTER_PARTY_TITLE`
- `TXT_AFTER_PARTY_STATUS`
- `TXT_VENUE_NAME`
- `TXT_VENUE_ADDRESS`
- `TXT_RECEPTION_TIME`
- `TXT_START_TIME`
- `TXT_END_TIME`
- `TXT_FEE`
- `TXT_ACCESS`
- `TXT_RSVP_DEADLINE`
- `TXT_CONTACT`
- `TXT_NOTICE`

## Semantic node names
- `FRAME_AFTER_PARTY_GUIDE_FRONT`
- `FRAME_AFTER_PARTY_GUIDE_BACK`
- `GROUP_AFTER_PARTY_CORE_INFO`
- `GROUP_AFTER_PARTY_ACCESS`
- `AREA_AFTER_PARTY_QR_REPLACEABLE`
- `DECOR_NIGHT_ROUTE_LINE`
- `DECOR_DESTINATION_NODE`

## Constraints
- 完成済み4種のsemantic nodeへwriteしない
- 人物・犬をAI変換しない
- 会場・時刻・会費・URLを捏造しない
- 可変情報を画像へ焼き込まない
- Current authorityが許可するまでFigma操作しない
