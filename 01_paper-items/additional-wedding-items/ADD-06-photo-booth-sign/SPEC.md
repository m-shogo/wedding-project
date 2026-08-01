# ADD-06 フォトブースサイン — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Purpose

会場内の写真撮影場所を示すサイン。完成済み4種の素材は参照のみとし、改変・再生成しない。

## Format

- Primary: A3 portrait, 297 × 420 mm
- Optional compact: A4 portrait, 210 × 297 mm（比例縮小ではなく再レイアウト）
- Bleed: 3 mm
- Safe area: 仕上がりから12 mm以上
- Viewing distance: 約1.5–3 m

## Art direction

- 旅行雑誌の撮影スポット案内を、会場サインとして静かに再解釈する
- ミント、ブルー、シルバー、温かい白を使用
- 主役は見出しと余白。装飾は片側に寄せ、アプリ風の均等カード群にしない
- 既存るるぶWEDDING内の `BEST SHOT` 表現は参照可能だが、正本を編集・複製しない

## Editable copy

推奨主見出しは候補として保持し、Figmaで選択する。

- `PHOTO SPOT`
- `BEST SHOT`
- `TRAVEL MEMORY`
- 補助文: `Capture a memory from our special journey.`

本文、日付、会場名、ハッシュタグ、QRコードは画像へ焼き込まない。

## Layout zones

- `ZONE_HEADER`: 上部20–24%
- `ZONE_HERO_SPACE`: 中央50–58%。人物写真を生成せず、撮影時の視線を邪魔しない余白
- `ZONE_NOTE`: 下部15–20%
- `ZONE_DECOR_EDGE`: 左下または右上の一方向だけ

## Semantic node names

- `FRAME_ADD06_A3_PORTRAIT`
- `BG_PHOTO_SPOT_PAPER`
- `TXT_PHOTO_SPOT_TITLE`
- `TXT_PHOTO_SPOT_SUBTITLE`
- `TXT_PHOTO_SPOT_NOTE`
- `TXT_WEDDING_DATE`
- `TXT_WEDDING_LOCATION`
- `DECOR_ROUTE_EDGE`
- `DECOR_CAMERA_MARK`
- `DECOR_SPARKLE_CLUSTER`

## Production decision

このアイテムは、文字・ルート線・簡易カメラ記号・スパークルをFigmaのnative text/vectorで構築できる。既存完成物の改変や重複ラスター生成を避けるため、現時点では新規production rasterを作らない。
