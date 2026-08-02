# ADD-16 両親贈呈品メッセージカード — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Purpose
披露宴終盤の両親贈呈品に添える、家族への感謝を静かに伝えるためのカード。贈呈品そのもの、手紙朗読、花束、記念品の役割を奪わず、受け取った後も保管できる印刷物として成立させる。

## Decision gate
制作開始前に次を確定する。

- 新郎家／新婦家で各1枚か、両家共通1枚か
- 贈呈品の種類、外寸、包装、取付方法
- カードを手渡すか、箱内へ入れるか、リボンへ添えるか
- 表面に氏名を入れるか
- 本文を全文印刷するか、短文のみ印刷するか
- 縦書き／横書き
- 読み上げる手紙との内容重複を許容するか

未確定の家族関係、氏名、エピソード、呼称、贈呈順、贈呈品仕様を事実として作らない。

## Format
### Primary
- 100 × 148 mm 縦（ポストカード相当）
- 両面。表=献辞と日付、裏=本文
- 塗り足し: 四辺3 mm
- 安全域: 仕上がり線から8 mm以上

### Conditional variants
- 90 × 55 mm 横: 小型ギフトタグ用途
- 148 × 210 mm 二つ折り: 長文または自筆署名を残す場合

サイズ違いは単純縮小せず、文字量、余白、贈呈品との比率に合わせてリフローする。

## Content hierarchy
1. 家族への呼びかけ
2. 感謝を示す主文
3. 日付
4. 新郎新婦の署名
5. 任意の短い旅の比喩

本文未確定時はsemantic placeholderを使用し、最終PDFには残さない。

## Art direction
コンセプトは `HOME PORT / THE JOURNEY BEGAN HERE`。

- 旅行テーマは「出発点」「帰る場所」「これまでの道のり」という意味に限定
- 温かいアイボリー、深いネイビー、控えめなミントまたはシルバー
- 家族写真、花束、家、ハート、飛行機を意味なく並べない
- 既存4種のパスポート、航空券、切符、旅行雑誌の外観を複製しない
- 左右対称で儀礼的すぎる賞状風、均等な角丸カードUI、過剰な筆記体を避ける
- 本文の呼吸を優先し、余白を装飾として扱う
- 新郎家／新婦家の2枚を作る場合も、単純な色違いではなく本文量と呼称に合わせて光学調整する

## Editable text
- `TXT_PARENT_RECIPIENT`
- `TXT_PARENT_MESSAGE`
- `TXT_PARENT_DATE`
- `TXT_COUPLE_SIGNATURE`
- `TXT_OPTIONAL_HOME_PORT_LINE`

本番本文、氏名、家族固有情報を画像へ焼き込まない。

## Semantic node names
- `FRAME_PARENT_GIFT_CARD_FRONT`
- `FRAME_PARENT_GIFT_CARD_BACK`
- `TXT_PARENT_RECIPIENT`
- `TXT_PARENT_MESSAGE`
- `TXT_PARENT_DATE`
- `TXT_COUPLE_SIGNATURE`
- `TXT_OPTIONAL_HOME_PORT_LINE`
- `DECOR_HOME_PORT_ROUTE`
- `DECOR_ORIGIN_MARK`
- `AREA_HANDWRITTEN_SIGNATURE`

## Material policy
- 新規ラスターは原則不要
- 家族写真は正式採用、利用許可、解像度、トリミング余地が確認できた場合のみ検討
- AI生成の家族写真、架空の思い出写真、人物変換は禁止
- 罫線、起点マーク、短いルートはFigma native vectorで構成する

## Constraints
- 完成済み4種へwriteしない
- 既存semantic nodeを変更しない
- Figma操作禁止
- 家族構成、呼称、氏名、出来事を推測しない
- 手紙本文とカード本文の役割を確認するまで長文を固定しない
