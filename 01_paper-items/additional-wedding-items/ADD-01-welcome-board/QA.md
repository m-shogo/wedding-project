# ADD-01 ウェルカムボード — QA

Status: `QA_PLAN_READY / NO_ASSET_TESTED`
Date: 2026-08-01

## Layout QA

- [ ] A2縦の仕上がり寸法が420 × 594 mm
- [ ] 四辺3 mmの塗り足し
- [ ] 重要文字が仕上がり端から20 mm以内に入っていない
- [ ] タイトル、名前、日付の視認順が明確
- [ ] 3 m程度離れた想定でも主要情報が読める
- [ ] 写真差し替え枠が主役で、装飾が競合しない
- [ ] 既存4種の単純複製になっていない

## Text QA

- [ ] 名前・日付・会場・サブコピーが編集可能テキスト
- [ ] 未確定会場名を捏造していない
- [ ] 長文を画像へ焼き込んでいない
- [ ] 2026.10.24の表記統一

## Image QA

- [ ] 人物・犬をAI生成/AI変換していない
- [ ] 仮写真と本番写真を区別
- [ ] 画像解像度がA2印刷に耐える
- [ ] 背景に不要な文字・ロゴ・透かしがない

## Transparent PNG QA

WB-02〜WB-05に適用。

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
- [ ] Drive folder readback
- [ ] 正本素材をDriveへ保存
- [ ] ファイル名・MIME type・親フォルダをreadback
- [ ] Drive IDを`DRIVE-REGISTER.md`へ記録
- [ ] Git write後readback

## Current result

- QA PASS: 0 production assets
- QA REJECT: 0
- Blocking: production asset generation not started
- Item status: `SPEC_READY`
