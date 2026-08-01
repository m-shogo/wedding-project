# ADD-01 ウェルカムボード — SPEC

Status: `SPEC_READY`
Date: 2026-08-01
Authority: `m-shogo/wedding-project` `main`

## 1. 目的

会場入口で結婚式全体の「旅行」テーマを最初に伝えるウェルカムボード。完成済み4種の正本は改変せず、世界観のみ参照する。

## 2. 本命仕様

- 用紙: A2縦
- 仕上がり: 420 × 594 mm
- 塗り足し: 四辺3 mm
- 制作サイズ: 426 × 600 mm
- 安全域: 仕上がり端から最低15 mm、重要文字は20 mm推奨
- 解像度: 300 dpi
- カラーモード: 印刷所指定がなければRGBで制作し、入稿時に確認
- 正本出力候補: PDF/X系 + 高解像度PNG

## 3. 比較候補

- A3縦: 297 × 420 mm
- A2横は比較のみ。入口の視認性と既存旅行雑誌風レイアウトとの相性から縦を本命とする。

## 4. デザイン方向

- 「横浜旅行の特別号」または「ふたりの旅の始発点」を思わせる旅行雑誌表紙
- るるぶ風の情報密度は参照可能だが、既存るるぶWEDDING正本を複製・改変しない
- Bride palette: ミントグリーン、グリーン、ブルー、シルバー、控えめなキラキラ
- 主役は新郎新婦の実写真または写真差し替え枠。人物をAI変換しない
- 装飾は航空ルート線、搭乗スタンプ、ラゲッジタグ、方位記号、横浜を想起する小要素を候補とする
- 過度な空港掲示板風より、祝祭感と写真の見やすさを優先する

## 5. 可変テキスト

画像へ焼き込まずFigmaテキストとして保持する。

- Welcome title
- 新郎名
- 新婦名
- 2026.10.24
- Yokohama
- 会場名（未確定ならTBD）
- 短いサブコピー

推奨サブコピー候補:

- `Welcome to our wedding journey.`
- `Our journey begins here.`
- `Thank you for traveling with us.`

本番採用文言はFigma配置時に選定する。

## 6. 画像領域

- `IMG_WELCOME_HERO`: 新郎新婦写真差し替え枠
- 写真はAI変換禁止
- 仮組みでは無地プレースホルダーまたは権利確認済みの仮素材のみ使用
- 写真候補が複数ある場合も正本へ焼き込まず、差し替え可能な構造にする

## 7. Semantic node names

- `FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- `BG_WELCOME_BASE`
- `IMG_WELCOME_HERO`
- `TXT_WELCOME_TITLE`
- `TXT_COUPLE_NAMES`
- `TXT_WEDDING_DATE`
- `TXT_WEDDING_LOCATION`
- `TXT_WELCOME_SUBCOPY`
- `DECOR_ROUTE_LINE_01`
- `DECOR_TRAVEL_BADGE_01`
- `DECOR_COMPASS_01`
- `SAFE_AREA_GUIDE`
- `BLEED_GUIDE`

## 8. 採用ゲート

- A2縦で3 m程度離れてもタイトル・名前・日付が読める
- 写真を邪魔しない
- ミント/ブルー/シルバーが過度に寒くならず、結婚式らしい温かさがある
- 既存4種のコピーではなく、同じ旅行世界観の新規アイテムとして成立
- 可変情報が編集可能
- 印刷サイズ、塗り足し、安全域が明示されている
- Drive正本IDが記録されるまで`COMPLETED`にしない

## 9. 未確定事項

- 新郎新婦の表記（英字/日本語）
- 会場正式名称
- 使用写真
- 印刷会社と入稿仕様
- 額装またはパネル加工の有無

未確定事項は捏造せず、Figmaで差し替え可能にする。
