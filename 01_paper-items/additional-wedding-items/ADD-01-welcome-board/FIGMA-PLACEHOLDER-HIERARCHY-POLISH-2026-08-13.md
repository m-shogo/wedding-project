# ADD-01 — Placeholder Hierarchy Polish — 2026-08-13

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / FINAL_REAL_HERO_PHOTO_DEFERRED / NOT_PRINT_READY`

Authority before this evidence write:
- current `main`: `ca869d036ee48bc5a17c92ddb9265c6557b0adb6`
- Current: `VISUAL_REOPENED / FIGMA_EDIT_ALLOWED`
- Figma: `XyyTGuz6BMf8XRhPZZfdoT / 1:3`
- Drive: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`

Fresh 852×1200 review found proof metadata competing with the guest-facing hierarchy, especially the 32px `[新郎新婦名 · LAYOUT DUMMY]` display role.

Rollback proof: `15:2 / ROLLBACK_ADD01_PLACEHOLDER_TEXT_PRE_HIERARCHY_2026_08_13`, hidden on `99_QA`.

Native-text production polish:
- `7:32`: `[写真] · LAYOUT DUMMY`; suffix 7px muted warm gray, opacity 0.74.
- `7:33`: `[写真キャプション] · LAYOUT DUMMY`; suffix 7px muted warm gray, opacity 0.74.
- `7:35`: `[新郎新婦名] · LAYOUT DUMMY`; primary remains 32px Noto Serif JP Bold, suffix 10px Noto Sans JP Regular, muted warm gray, opacity 0.74.
- `7:37`: `YOKOHAMA / [会場名] · LAYOUT DUMMY`; suffix 8px muted warm gray, opacity 0.74.

Screenshot QA: 355×500 whole-item PASS; 852×1200 actual-size PASS. No collision or clipping.

Structure readback: 852×1200, `clipsContent=true`, native text 10, visible text 10, outside root 0. Paper texture remains `8:2 / IMG_PAPER_TEXTURE_REPLACEABLE` at opacity 0.16. Real-photo role remains separate at `7:30 / IMG_WELCOME_HERO_REPLACEABLE`, 474×744. No text flattening/raster replacement.

Image generation was not required for this defect; generated candidates 0, Drive writes 0. Final real-couple photo remains deferred.

## 2026-08-14 fresh editorial de-template polish — English folio removal

Observed latest `main` immediately before this write: `86731c66f38e4f07304198c016b1fefde8e6b868`.

Fresh 852×1200 production screenshot showed that the overall asymmetric welcome-board composition still sells, but the bottom-right `WELCOME BOARD 01` folio carried no guest-facing or production-critical information and read as generic English series filler. Under the reopened visual standard, keeping it added more template signal than editorial value.

Rollback-safe proof created before mutation:
- `16:2 / ROLLBACK_ADD01_PRE_ENGLISH_FOLIO_REMOVAL_2026_08_14`, hidden on `99_QA`.

Production root remained `1:3`. Only `7:39 / TXT_FOLIO` was changed, by setting it hidden. All guest-facing Japanese copy, date/location facts, semantic placeholders, hero role and paper texture remained unchanged.

Post-write actual-size screenshot: PASS. The lower-right area now resolves as a restrained red rule rather than an implementation-like series label, while the main Japanese title, hero-photo role and couple/date hierarchy remain intact.

Structural readback:
- root: 852×1200, `clipsContent=true`;
- native text nodes: 10 total / 9 visible;
- IMAGE fill nodes: 1 existing `8:2 / IMG_PAPER_TEXTURE_REPLACEABLE`;
- visible text outside root: 0;
- `7:39` reads back `visible=false`;
- no native text flattening or raster replacement.

Drive authority was live-read before the Figma write and remains `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`; Drive write 0.

Image decision: `IMAGE_GENERATION_NOT_REQUIRED`. The screenshot-supported defect was non-semantic English filler, not missing imagery. Final real-couple hero remains deferred.

Current result remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / FINAL_REAL_HERO_PHOTO_DEFERRED / NOT_PRINT_READY`.