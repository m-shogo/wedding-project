# ADD-11 写真共有 / QR案内サイン — FIGMA PLACEMENT BRIEF

Status: `READY_AFTER_FIGMA_ACCESS`
Date: 2026-08-02

## Frame

- Primary frame: A5 portrait, 148 × 210 mm
- Bleed frame: 154 × 216 mm
- Reflow frame: A4 portrait, 210 × 297 mm
- Safe area: 10 mm minimum

## Layer order

1. `BG_ADD11_BASE`
2. `DECOR_TRAVEL_ROUTE`
3. `TXT_SHARE_TITLE`
4. `TXT_SHARE_NOTE`
5. `QR_PHOTO_SHARE`
6. `TXT_ACCESS_STEPS`
7. `TXT_HASHTAG`
8. `TXT_PRIVACY_NOTE`
9. `TXT_EXPIRY_NOTE`
10. `DECOR_CAMERA_ICON`

## Layout guidance

- 上部25%: タイトルと短い導入文
- 中央45%: QR差し替え枠を主役として配置
- 下部30%: 利用手順、ハッシュタグ、公開範囲、期限
- QR周囲には装飾や文字を侵入させない
- QRの白背景とquiet zoneを維持する
- カメラ/共有アイコンはQRより視覚的に弱くする

## Editable content contract

- QR画像は正式URL確定後に差し替える
- ハッシュタグ未採用時は`TXT_HASHTAG`を非表示
- 期限なしの場合も勝手に削除せず、運用確認後に`TXT_EXPIRY_NOTE`を非表示
- 公開範囲・アップロード可否・パスコードは運用確定値のみ入力

## Export gate

- 正式URL照合済み
- QR実機スキャンPASS
- 印刷実寸スキャンPASS
- プライバシー文言確認済み
- bleed/safe area確認済み
- QR quiet zone侵害なし

## Prohibited

- QRをAI画像生成する
- 未確定URLを本番値として固定する
- QR上に装飾・透明効果・色味補正を重ねる
- 完成済み4種の正本を流用・編集する
