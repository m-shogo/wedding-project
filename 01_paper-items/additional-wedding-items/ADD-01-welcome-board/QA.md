# ADD-01 ウェルカムボード — QA

Status: `WB-01_WB-02_QA_PASS / ASSET_IN_PROGRESS`
Date: 2026-08-02

## Layout QA

- [x] WB-01はA2縦300 dpi相当の4961 × 7016 px
- [x] 中央の可変テキスト・写真配置領域を妨げない余白
- [x] 装飾は四隅寄りで主役と競合しない
- [x] 既存4種の単純複製ではない
- [x] WB-02は横長の単一路線装飾で、A2縦の上部・下部・対角配置へ非破壊で使用可能
- [x] WB-02の線幅・ノード・飛行機は縮小配置しても視認でき、主役写真より強くならない
- [ ] 最終レイアウトで四辺3 mmの塗り足しを設定
- [ ] 最終レイアウトで重要文字を仕上がり端から20 mm以上内側へ配置
- [ ] 最終レイアウトで3 m視認性を確認

## Text QA

- [x] WB-01へ名前・日付・会場・サブコピーを焼き込んでいない
- [x] WB-02に文字・日付・固有名詞を焼き込んでいない
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

## WB-02 transparent PNG QA

- [x] PNG / RGBA
- [x] 3083 × 1233 px
- [x] alpha channel実在
- [x] alpha extrema `0–235`
- [x] 外周透明
- [x] visible greenなし
- [x] 緑フリンジなし
- [x] checkerboard焼込みなし
- [x] 白背景焼込みなし
- [x] 1素材1ファイル
- [x] 文字・ロゴ・透かしなし
- [x] 視覚QA: 曲線の破綻なし、点線間隔の大きな乱れなし、5つのルートノードと紙飛行機の階層が成立
- [x] 写真領域を横切っても主役になりすぎない低彩度シルバー・ネイビー・ミント・温かいゴールド
- [x] ファイルサイズ26,708 bytes、0 byteではない
- [x] SHA-256: `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84`

## Transparent PNG QA

WB-03〜WB-05に継続適用。

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
- [x] WB-02正本素材をDriveへ新規保存
- [x] WB-02ファイル名・MIME typeをDrive searchでreadback
- [x] WB-02 parent folder IDをupload responseで確認
- [x] WB-02 Drive IDを`DRIVE-REGISTER.md`へ記録
- [x] WB-02を`ASSET-QUEUE.md`で`ACCEPTED`へ更新
- [ ] ADD-01全素材完了後のitem completion QA

## Current result

- Production asset QA PASS: 2
- QA REJECT: 0
- Drive production saves: 2
- Accepted: WB-01, WB-02
- Item status: `ASSET_IN_PROGRESS`
- Next: `WB-03_TRAVEL_BADGE_TRANSPARENT_PNG`
