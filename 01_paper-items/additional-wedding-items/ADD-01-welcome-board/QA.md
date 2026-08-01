# ADD-01 ウェルカムボード — QA

Status: `PLACEMENT_READY / PRODUCTION_QA_PASS`
Date: 2026-08-02

## Layout QA

- [x] WB-01はA2縦300 dpi相当の4961 × 7016 px
- [x] 中央の可変テキスト・写真配置領域を妨げない余白
- [x] 装飾は四隅寄りで主役と競合しない
- [x] 既存4種の単純複製ではない
- [x] WB-02は横長の単一路線装飾で、A2縦の上部・下部・対角配置へ非破壊で使用可能
- [x] WB-03は単体バッジとして四隅・写真近傍・タイトル補助位置へ配置可能
- [x] WB-04は細線主体で、写真・名前・日付より前へ出ない補助装飾として使用可能
- [x] WB-05は追加不要。既存4素材に重ねると装飾過多になるため生成しない
- [ ] 最終レイアウトで四辺3 mmの塗り足しを設定
- [ ] 最終レイアウトで重要文字を仕上がり端から20 mm以上内側へ配置
- [ ] 最終レイアウトで3 m視認性を確認

## Text QA

- [x] WB-01〜WB-04へ名前・日付・会場名・長文を焼き込んでいない
- [x] 未確定会場名を捏造していない
- [x] Yokohama/locationは編集テキストとして配置文書へ残した
- [ ] Figma配置時に可変テキストを編集可能レイヤーで追加

## Production asset QA

| Asset | Mechanical | Visual | Transparency | Drive readback |
|---|---|---|---|---|
| WB-01 | PASS | PASS | N/A | PASS |
| WB-02 | PASS | PASS | PASS | PASS |
| WB-03 | PASS | PASS | PASS | PASS |
| WB-04 | PASS | PASS | PASS | PASS |
| WB-05 | N/A | `NOT_REQUIRED_AFTER_REVIEW` | N/A | N/A |

## Integrity

- WB-01 SHA-256: `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7`
- WB-02 SHA-256: `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84`
- WB-03 SHA-256: `407ec787643771040de0125957dd49c7491604f820440c52c27ee5c4399799c3`
- WB-04 SHA-256: `c1a05cbc3b3e36c8a255d6dd0a6ae09c414f4396154cc7c4fb5d6fb62866ac56`

## Drive/Git QA

- [x] Driveの追加アイテム親フォルダとADD-01フォルダをreadback
- [x] WB-01〜WB-04をDriveへ新規保存
- [x] WB-01〜WB-04のファイル名・MIME type・親フォルダをreadback
- [x] WB-01〜WB-04のDrive IDを`DRIVE-REGISTER.md`へ記録
- [x] WB-01〜WB-04を`ASSET-QUEUE.md`で`ACCEPTED`へ更新
- [x] WB-05の重複検索と不要判定を記録
- [x] `FIGMA-PLACEMENT-BRIEF.md`へDrive ID、semantic node、印刷仕様を反映
- [x] ADD-01 production completion QA

## Current result

- Production asset QA PASS: 4
- QA REJECT: 0
- Drive production saves: 4
- Accepted: WB-01, WB-02, WB-03, WB-04
- Not required: WB-05
- Item status: `PLACEMENT_READY`
- Next: `ADD-02_TABLE_SIGNS_SPEC_AND_QUEUE`

Figma未実行のため、塗り足し・最終文字配置・3 m視認性は配置時の最終QAとして残す。これらは素材準備の未完了を意味しない。
