# ADD-01 ウェルカムボード — QA

Status: `WB-01_WB-02_WB-03_WB-04_QA_PASS / ASSET_IN_PROGRESS`
Date: 2026-08-02

## Layout QA

- [x] WB-01はA2縦300 dpi相当の4961 × 7016 px
- [x] 中央の可変テキスト・写真配置領域を妨げない余白
- [x] 装飾は四隅寄りで主役と競合しない
- [x] 既存4種の単純複製ではない
- [x] WB-02は横長の単一路線装飾で、A2縦の上部・下部・対角配置へ非破壊で使用可能
- [x] WB-03は単体バッジとして四隅・写真近傍・タイトル補助位置へ配置可能
- [x] WB-04は細線主体で、写真・名前・日付より前へ出ない補助装飾として使用可能
- [x] WB-04は真円UIバッジではなく、印刷物向けのコンパス目盛り・針・旅程軌道で構成
- [ ] 最終レイアウトで四辺3 mmの塗り足しを設定
- [ ] 最終レイアウトで重要文字を仕上がり端から20 mm以上内側へ配置
- [ ] 最終レイアウトで3 m視認性を確認

## Text QA

- [x] WB-01〜WB-04へ名前・日付・会場名・長文を焼き込んでいない
- [x] 未確定会場名を捏造していない
- [ ] Figma配置時に可変テキストを編集可能レイヤーで追加

## WB-01 image QA

- [x] PNG / RGB / 4961 × 7016 px
- [x] 299.9994 dpi metadata
- [x] SHA-256: `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7`

## WB-02 transparent PNG QA

- [x] PNG / RGBA / 3083 × 1233 px
- [x] alpha extrema `0–235`
- [x] 外周透明・緑フリンジなし・背景焼込みなし
- [x] SHA-256: `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84`

## WB-03 transparent PNG QA

- [x] PNG / RGBA / 1826 × 1748 px
- [x] alpha extrema `0–245`
- [x] 外周透明・緑フリンジなし・背景焼込みなし
- [x] 視覚QA: 不規則な荷物ステッカー輪郭、地球儀、経路線、紙飛行機、空白タブの階層が成立
- [x] SHA-256: `407ec787643771040de0125957dd49c7491604f820440c52c27ee5c4399799c3`

## WB-04 transparent PNG QA

- [x] PNG / RGBA
- [x] 1821 × 1821 px
- [x] alpha channel実在
- [x] alpha extrema `0–205`
- [x] 外周透明
- [x] visible greenなし
- [x] 緑フリンジなし
- [x] checkerboard焼込みなし
- [x] 白背景焼込みなし
- [x] 1素材1ファイル
- [x] 文字・ロゴ・透かしなし
- [x] 視覚QA: 同心円、大小目盛り、4方向針、斜め補助針、中央ハブの階層が成立
- [x] 旅程軌道・3ノード・紙飛行機は非対称に配置され、機械的な均等装飾を回避
- [x] 低彩度ネイビー・シルバー・ミント・温かいゴールドがWB-01〜03と調和
- [x] 写真上へ縮小配置しても主役になりすぎない半透明・細線設計
- [x] ファイルサイズ64,830 bytes、0 byteではない
- [x] SHA-256: `c1a05cbc3b3e36c8a255d6dd0a6ae09c414f4396154cc7c4fb5d6fb62866ac56`

## Transparent PNG QA

WB-05へ継続適用。

- [ ] alpha channel実在
- [ ] 外周透明
- [ ] visible greenなし
- [ ] 緑フリンジなし
- [ ] checkerboard焼込みなし
- [ ] 白背景焼込みなし
- [ ] 1素材1ファイル

## Drive/Git QA

- [x] Driveの追加アイテム親フォルダとADD-01フォルダを作成・readback
- [x] WB-01〜WB-04をDriveへ新規保存
- [x] WB-01〜WB-04のファイル名・MIME type・親フォルダをreadback
- [x] WB-01〜WB-04のDrive IDを`DRIVE-REGISTER.md`へ記録
- [x] WB-01〜WB-04を`ASSET-QUEUE.md`で`ACCEPTED`へ更新
- [ ] ADD-01全素材完了後のitem completion QA

## Current result

- Production asset QA PASS: 4
- QA REJECT: 0
- Drive production saves: 4
- Accepted: WB-01, WB-02, WB-03, WB-04
- Item status: `ASSET_IN_PROGRESS`
- Next: `WB-05_YOKOHAMA_ACCENT_TRANSPARENT_PNG_REVIEW`
