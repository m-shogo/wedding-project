# WEDDING PASSPORT Asset Register

Updated: 2026-07-30
Current authority: GitHub `main`

## Source design constraints already established in Drive
- production order: Rurubu WEDDING -> WEDDING PASSPORT -> BOARDING PASS -> 青春ふたりきっぷ
- visual language: deep navy, warm ivory, restrained gold; stamp accents may use muted red/blue
- cover identity must be fictional and wedding-specific
- do not copy a real national coat of arms, passport title, security pattern, MRZ, official seal, or airline logo
- desired motifs: airplane, map/route, travel stamp, event date

Drive references used for this register:
- `00_Figma本番前_Current Authority・制作ルール`
- `01_パスポート風｜参考画像ギャラリー・分析`
- `01_パスポート風_デザイン言語化・再現プロンプト.md`

Note: the Drive Current Authority document still contains an older branch pointer. Per current project rule, GitHub `main` is authoritative; do not restore that historical branch as Current.

## Production asset 001
### passport-emblem-compass-airplane.svg
Path: `assets/passport-emblem-compass-airplane.svg`
Status: `CANDIDATE_READY / TRANSPARENCY_VERIFIED / FIGMA_EDITABLE / DRIVE_UPLOAD_BLOCKED`

Purpose:
- WEDDING PASSPORT front-cover central identity candidate
- may also be reused at reduced size as an interior folio/seal mark after print-scale QA

Originality / safety:
- original fictional wedding emblem
- no national coat of arms
- no real passport seal
- no airline identity
- no machine-readable zone or security-document imitation

Construction:
- compass-ring geometry
- original airplane silhouette
- event date `2026 · 10 · 24`
- `WEDDING PASSPORT` and `JOURNEY TOGETHER` wording
- restrained single-color gold candidate `#B79A58`

Transparency QA:
- SVG root contains no background rectangle or image
- only intended vector paths/text are painted
- therefore background is transparent by construction
- verified by readback from GitHub `main` after commit

Tool chain:
- source constraints: Google Drive reference analysis
- generation: programmatic SVG (chosen instead of raster generation because this identity is geometric/typographic and benefits from full Figma editability)
- verification: GitHub readback / structural transparency inspection

Drive sync status:
- target item folder: `01_パスポート風_メニュー・ドリンク・座席表`
- target production subfolder: `20_制作素材/01_ベクター・アイコン`
- target folder ID: `1zs8Y7jVKW7xqng_U9Hr2aKZxyySbbym2`
- Drive inspection on 2026-07-30 confirmed the target folder currently contains no files; this asset is not present there yet.
- immediate upload attempts from the current runtime were rejected because Google Drive requires a registered connector file reference and would not accept the local sandbox file path.
- do not mark this asset `COMPLETED` or `PLACEMENT_READY` until Drive upload succeeds and existence is re-verified.
- next scheduled run must prioritize retrying Drive upload before advancing this asset's completion state.

## Next assets, one at a time
1. fictional entry/arrival stamp mark
2. subtle route-line / world-map ornament (not a security pattern)
3. table/destination label system for 11 table themes
4. interior section divider mark

Do not create an asset sheet. Each fixed asset remains a separate file.
