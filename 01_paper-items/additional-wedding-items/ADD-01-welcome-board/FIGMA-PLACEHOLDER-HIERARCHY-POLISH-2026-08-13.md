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