# ADD-11 写真共有 / QR案内 — Figma V4 MEMORY WINDOW QA

Date: 2026-08-31
Authority at write: `docs/automation/non-rurubu-figma-quality-current.md`
Start main SHA: `e3c6c6679e63d389cf8c6dcf5897d1033e7ecea4`

## Decision

`V4_MEMORY_WINDOW_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / NOT_PRINT_READY`

The previous `DARKROOM DEVELOPING TRAY` Current remains preserved as comparison / rollback history. It was not duplicated or used as the construction base.

## Live authority

- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- new blank V4 page: `72:2 / V4 / ADD-11 / MEMORY WINDOW / 2026-08-31`
- V4 A5: `72:3 / CURRENT / V4 / ADD-11 / MEMORY WINDOW / A5`
- V4 A4: `72:9 / CURRENT / V4 / ADD-11 / MEMORY WINDOW / A4`
- hidden fresh stress A5: `74:19`
- hidden fresh stress A4: `74:36`
- exact Drive folder: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive readback: folder exists and is currently empty
- Drive writes for this V4: `0`

## Clean-room provenance / visual intent

V4 started on a newly-created blank Figma page. No old production, V2, V3, vNext, DARKROOM, PHOTO LAB or NIGHT ALBUM frame/group was duplicated into V4.

The direction is `MEMORY WINDOW`: warm-cream paper, a deep-cobalt side field, one large coral disc, a thin mint route with muted-gold entry tick, and an independent white QR paper crossing the color boundary. Japanese serif typography is the first-read hero. This is deliberately materially different from the retained black darkroom tray / rotated developing-print grammar.

Rejected AI/template signals:

- no card grid;
- no dashboard/web-panel grouping;
- no fake film metadata, fake URL, fake QR destination or decorative transport data;
- no meaningless English badge/sticker;
- no generated bride/groom/guest photography;
- no generic stock travel image.

## Responsibility split

- variable / final copy: native Figma text;
- headline / emotional copy: native Figma text;
- sharing / privacy / retention / hashtag placeholders: native Figma text inside reflow-safe vertical Auto Layout;
- final QR: independent replaceable semantic white-paper role; current `[QR]` is native placeholder text only;
- fixed color-field / route / disc geometry: native editable vector shapes;
- raster/generated assets: `0`;
- IMAGE fills: `0`;
- SVG dependency: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the item-specific quality problem is information hierarchy and scan trust, not missing pictorial imagery. Adding generated photography would increase stock/AI risk and reduce QR clarity.

## Screenshot / three-scale QA

A5 was freshly inspected at:

- thumbnail: `353×500` render — PASS after repair;
- reading: `706×1000` render — PASS;
- actual/native: `875×1240` render — PASS.

A4 was freshly inspected at:

- thumbnail: `354×500` render — PASS;
- actual/native: `1240×1754` render — PASS; layout is an independent reflow rather than a scale-only output.

First screenshot exposed a real defect: the new `AUTO / HEADER` and `AUTO / SHARE INFO` parents were only 10px high and clipped their children. V4 was not promoted in that state. The parents were repaired to true Auto Layout growth / unclipped content, then re-rendered. A second visual defect — unintended Japanese hero wrapping (`みんなの写真 / で、 / 今日が続く。`) — was corrected to deliberate `みんなの写真で、 / 今日が続く。` without shrinking the role into microtype.

Final three-scale read reads in this order:

1. `みんなの写真で、今日が続く。`
2. sharing method / information roles;
3. independent QR paper;
4. closing message and date.

## Fresh long-copy / structure QA

Fresh V4 stress copies were created from the new V4 only, not from legacy production:

- A5 `74:19`
- A4 `74:36`

Stress fields include semantic unresolved copy such as:

- `[写真共有サービス・アクセス方法]`
- `[公開範囲・閲覧権限に関する案内文]`
- `[保存期間・削除時期に関する案内文]`
- `[写真共有時の注意事項・ハッシュタグ案内]`

The first stress render showed a weak Japanese wrap at the information-lane edge. The information lane was widened rather than shrinking type. Final structural readback for A5, A4 and both stress roots:

- native text: `9` each;
- fixed-height text: `0` each;
- text outside root: `0` each;
- IMAGE fills: `0` each.

Stress roots were hidden after verification.

## Print-first QA

Working trim roles:

- A5 portrait: `148×210 mm`, Figma `875×1240 px`, about `5.91 px/mm`;
- A4 portrait: `210×297 mm`, Figma `1240×1754 px`, about `5.90 px/mm`.

Printer template is not yet authoritative, so no production bleed or printer-safe geometry was invented. `bleed / final safe / printer profile = DEFERRED_FINALIZATION`.

A5 approximate actual-size type:

- hero `46 px` ≈ `22.1 pt`;
- kicker `20 px` ≈ `9.6 pt`;
- lead `24 px` ≈ `11.5 pt`;
- info `21 px` ≈ `10.1 pt`;
- closing `24 px` ≈ `11.5 pt`;
- date `22 px` ≈ `10.5 pt`;
- QR placeholder `27 px` ≈ `12.9 pt`.

A4 approximate actual-size type:

- hero `62 px` ≈ `29.8 pt`;
- kicker `27 px` ≈ `13.0 pt`;
- lead / closing `32 px` ≈ `15.4 pt`;
- info `28 px` ≈ `13.4 pt`;
- date `30 px` ≈ `14.4 pt`;
- QR placeholder `36 px` ≈ `17.3 pt`.

QR reserve geometry:

- A5 white QR paper: approximately `236 px` ≈ `39.9 mm` square;
- A4 white QR paper: approximately `335 px` ≈ `56.7 mm` square.

This is reserve geometry only. `QR_SCAN_PROOF` is blocked until the approved final URL exists. The actual QR must retain its encoded quiet zone and be scanned at 100% physical size on iPhone / Android and under likely venue conditions; the white paper reserve is not itself proof of quiet-zone compliance.

Raster effective PPI: `N/A` because V4 contains no raster IMAGE fill. `RESOLUTION_WARNING=NONE` for current V4 graphic content.

## CMYK / physical risks still open

- deep cobalt may darken / lose separation after CMYK conversion;
- saturated coral may shift or dull;
- mint route and muted-gold tick need actual-stock contrast proof;
- warm cream depends on paper white / ink interaction;
- deep green Japanese type and black construction must follow final printer specification;
- grayscale proof must retain hero → QR → secondary-copy hierarchy;
- final A5/A4 choice and installation method are unresolved;
- stand/frame/easel occlusion and glare are unresolved;
- final QR destination, permission/privacy wording, retention/expiry and hashtag decision are unresolved;
- PDF export, font embedding, transparency, overprint/knockout, preflight and 100% / physical proof remain required.

Punch / fold / perforation / handwriting / sticker application: not applicable to current ADD-11 sign authority.

`DESIGN_COMPLETE != PRINT_READY` remains in force.