# ADD-01 ウェルカムボード｜装飾減算QA 2026-08-07

- 開始時 / write直前 GitHub main: `c3b876c96cde7238808482bb3278e4e8ef1e1e66`
- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- Production: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- Google Drive root: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`
- るるぶWEDDING領域: read/write対象外、変更なし

## ライブ監査

GitHub CurrentとDrive rootを再確認し、Figma productionをwhole-item screenshot / design-contextでライブ監査した。既存記録では `99_QA` pageが存在するとされていたが、ライブmetadataでは開始時に `01_PRODUCTION` のみだったため、過去記録を正本扱いせずライブ状態を優先した。

可視問題は、hero写真左下のcompassと写真下のroute line + 3 nodesが、ゲストに必要な情報を持たず、hero写真・氏名間にUI的な装飾レイヤーを追加していた点。ウェルカムボードとして写真と名前を主役にするため減算対象とした。

## rollback-safe変更

ライブに存在しなかった `99_QA` pageを新規作成し、変更前production cloneを保存した。

- QA page: `1:2 / 99_QA`
- rollback proof: `2:2 / QA_ADD_01_DECOR_SUBTRACTION_PROOF_2026_08_07`

Productionでは削除せず `visible=false` とした。

- `1:11 DECOR_ROUTE_LINE_01`
- `1:12 DECOR_ROUTE_NODE`
- `1:13 DECOR_ROUTE_NODE`
- `1:14 DECOR_ROUTE_NODE`
- `1:20 DECOR_COMPASS_01`
- `1:21 DECOR_COMPASS_AXIS_V`
- `1:22 DECOR_COMPASS_AXIS_H`

native text、hero placeholder、日付、会場placeholder、上部rule、単一travel badgeは変更していない。flatten / image化 / 全面置換なし。

## Screenshot / structure QA

変更後whole-item screenshotとdesign-contextをreadback。

- hero写真下端からcouple namesまでの視線が装飾に遮られない
- 写真左下のcompass重なりが消失
- route line / 3 nodesが消失
- title → subcopy → hero → names → date/locationの階層を維持
- editable textとsemantic placeholderを維持
- hero frame geometry `660 × 610`を維持
- clipping / canvas外逸脱の新規発生なし
- rollback proof保持

## Drive

Drive root metadataをライブ確認。素材自体の具体的欠陥は今回確認していないため、再生成・上書き・追加保存は0件。

## 状態

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / FINAL_PHOTO_AND_COPY_PENDING / NOT_PRINT_READY`

ADD-01の主要な可視欠陥は今回の監査範囲では解消。正式hero写真、couple names、会場名、最終subtitle、A2/A3、印刷業者profile、100%現物確認は `DEFERRED_FINALIZATION` とし、次はADD-02 11卓の国別テーブルサインへ進む。ADD-02はGitHub上 `PREPARED_FOR_FIGMA / FIGMA_NOT_STARTED`、Drive root `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r` をライブ確認済み。