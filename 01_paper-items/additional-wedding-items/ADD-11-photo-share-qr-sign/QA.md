# ADD-11 写真共有 / QR案内サイン — QA

Status: `PASS_FOR_FIGMA_PREPARATION`
Date: 2026-08-02

## Scope QA

- [x] 完成済み4種へwriteしていない
- [x] Figmaを使用していない
- [x] ADD-11以外を新規制作していない
- [x] 既存Git・Drive重複を確認した

## Specification QA

- [x] A5縦の印刷サイズを明記
- [x] A4縦リフロー候補を明記
- [x] 3 mm塗り足しを明記
- [x] 10 mm以上の安全域を明記
- [x] QR quiet zoneを明記
- [x] 可変テキストを分離
- [x] semantic node nameを定義
- [x] 正式URL・公開範囲・期限を未確定として保持

## Asset QA

- [x] QRコードを画像生成していない
- [x] 新規ラスター不要の理由を記録
- [x] native vectorで構成可能
- [x] 人物・ゲスト・犬のAI変換なし
- [x] 透過素材なし。透過QAは対象外

## Drive QA

- [x] 新規フォルダ作成
- [x] Drive ID確認
- [x] フォルダ名確認
- [x] MIME type確認
- [x] 親フォルダ確認

## Deferred final QA

正式URL確定後に以下を必須とする。

- [ ] QR内容のURL照合
- [ ] iPhone/Androidでの実機スキャン
- [ ] 印刷実寸でのスキャン
- [ ] 低照度・斜め角度での可読性
- [ ] アクセス権限・期限・プライバシー文言の確認

## Result

`PREPARED_FOR_FIGMA`

本番QRと最終印刷データは未確定情報が揃うまで作成しない。
