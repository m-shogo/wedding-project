# ADD-01 ウェルカムボード — QA

Status: `WB-01_QA_PASS / ASSET_IN_PROGRESS`
Date: 2026-08-01

## Layout QA

- [x] WB-01はA2縦300 dpi相当の4961 × 7016 px
- [x] 中央の可変テキスト・写真配置領域を妨げない余白
- [x] 装飾は四隅寄りで主役と競合しない
- [x] 既存4種の単純複製ではない
- [ ] 最終レイアウトで四辺3 mmの塗り足しを設定
- [ ] 最終レイアウトで重要文字を仕上がり端から20 mm以上内側へ配置
- [ ] 最終レイアウトで3 m視認性を確認

## Text QA

- [x] WB-01へ名前・日付・会場・サブコピーを焼き込んでいない
- [x] 未確定会場名を捏造していない
- [x] 長文を画像へ焼き込んでいない
- [ ] Figma配置時に可変テキストを編集可能レイヤーで追加

## WB-01 image QA

- [x] 人物・犬をAI生成/AI変換していない
- [x] 不要な文字・ロゴ・透かしなし
- [x] PNG / RGB
- [x] 4961 × 7016 px
- [x] 299.9994 dpi metadata
- [x] ファイルサイズ36,169,290 bytes、0 byteではない
- [x] 視覚QA: mint-to-blueの淡い紙質、中央の可読領域、控えめな旅行ルート風曲線を確認
- [x] SHA-256: `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7`

## Transparent PNG QA

WB-02〜WB-05に適用。WB-01は背景画像のため透過対象外。

- [ ] alpha channel実在
- [ ] 外周透明
- [ ] visible greenなし
- [ ] 緑フリンジなし
- [ ] checkerboard焼込みなし
- [ ] 白背景焼込みなし
- [ ] 1素材1ファイル

## Drive/Git QA

- [x] Driveの追加アイテム親フォルダを作成
- [x] DriveのADD-01フォルダを作成
- [x] Drive folder readback
- [x] WB-01正本素材をDriveへ新規保存
- [x] WB-01ファイル名・MIME typeをreadback
- [x] WB-01 parent folder IDをupload responseで確認
- [x] WB-01 Drive IDを`DRIVE-REGISTER.md`へ記録
- [x] WB-01を`ASSET-QUEUE.md`で`ACCEPTED`へ更新
- [ ] ADD-01全素材完了後のitem completion QA

## Current result

- Production asset QA PASS: 1
- QA REJECT: 0
- Drive production saves: 1
- Accepted: WB-01
- Item status: `ASSET_IN_PROGRESS`
- Next: `WB-02_TRAVEL_ROUTE_LINE_TRANSPARENT_PNG`
