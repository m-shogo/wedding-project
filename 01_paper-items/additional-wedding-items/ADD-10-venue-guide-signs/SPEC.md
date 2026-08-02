# ADD-10 会場案内サイン — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02
Authority: `m-shogo/wedding-project` `main`

## Purpose
会場内でゲストを迷わせず、受付・挙式・披露宴・化粧室などの目的地へ誘導する案内サイン群。旅行テーマは「移動の意味」を補強する範囲に限定し、空港記号や装飾を増やすこと自体を目的にしない。

## Current facts and unknowns
### Confirmed
- Wedding date: `2026.10.24 SAT`
- Location context: `YOKOHAMA`
- Ceremony: `14:10–14:40`
- Reception: `15:00–17:30`

### Must remain TBD until venue confirmation
- 実際に必要な分岐地点と設置枚数
- 会場内の正式な部屋名・階数・エレベーター名
- 受付、クローク、化粧室、喫煙所、授乳室、待合室の位置
- 矢印方向
- 自立スタンド、壁面、卓上などの設置方法
- 会場既設サインとの役割分担

誤案内を防ぐため、TBD情報は最終PDFへ残さない。

## Deliverable system
単独ポスターではなく、必要地点だけに展開できるモジュール式サインシステムとする。

### Core formats
- `A4 portrait`：主要分岐・入口用
- `A5 landscape`：近距離の補助誘導用
- `90 × 210 mm vertical`：細い矢印サイン候補。実設置条件を確認してから採用

### Required sign candidates
- `RECEPTION / 受付`
- `CEREMONY / 挙式会場`
- `RECEPTION HALL / 披露宴会場`
- `CLOAKROOM / クローク`
- `RESTROOM / 化粧室`

候補は制作対象を意味しない。現地下見または会場図面で必要性を確認してから枚数を確定する。

## Art direction — YOKOHAMA WAYFINDING EDITION
- 港町の交通案内・ホテルの館内サインを参照した、静かで上質な誘導設計
- 温かいアイボリーを主面、深いネイビーを主要文字、ミントを現在地・目的地ノード、シルバーを細い構造線へ限定
- 日本語を第一階層、英語を第二階層
- 矢印は最大要素の一つとして扱い、装飾と競合させない
- 左右方向で単純な鏡像コピーにせず、文字幅・余白・矢印の運動方向に応じて光学調整する
- 写真、風景イラスト、国旗、バーコード、スタンプは使用しない
- 航空券・パスポート・るるぶWEDDINGの外観を流用しない
- 角丸カードを均等に並べるWeb UI型レイアウトは禁止

## Information hierarchy
1. Direction arrow
2. Japanese destination name
3. English destination name
4. Optional floor / room label
5. Small event identifier (`SHOGO & SHI-CHAN WEDDING`, only after copy approval)

## Print specification
- Bleed: 3 mm all sides for full-bleed variants
- Safe area: 10 mm minimum from trim edge
- Minimum rule width: 0.3 mm at final size
- Matte or low-glare stock preferred
- Final output: print-ready PDF after 100% size proof and venue placement check

## Semantic node contract
- `FRAME_ADD10_GUIDE_[DESTINATION]_[DIRECTION]_[SIZE]`
- `BG_ADD10_BASE`
- `TXT_ADD10_DESTINATION_JP`
- `TXT_ADD10_DESTINATION_EN`
- `TXT_ADD10_FLOOR_ROOM`
- `ICON_ADD10_DIRECTION_ARROW`
- `DECOR_ADD10_ROUTE_RULE`
- `NODE_ADD10_DESTINATION`
- `NOTE_ADD10_TBD_REMOVE_BEFORE_EXPORT`

## Non-destructive editing rules
- Destination, floor, room, and direction remain native editable text/vector
- One semantic role per node; normal copy must not be baked into raster assets
- Existing completed four-item Figma files and semantic nodes are not modified
- Accepted Drive assets are not regenerated unless a screenshot-supported defect exists

## Asset decision
新規ラスター画像は不要。矢印、経路線、目的地点、罫線はFigma native vectorで制作する。既存ADD-01装飾は視認性を下げ、別アイテムのコピー感を生むため標準では流用しない。
