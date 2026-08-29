# ADD-02 Singapore — V4C Tropical Modernist Broadside

Date: 2026-08-29
Start/main authority immediately before write: `4bbce94ab5885105e0660192d6c5044f8bd1b786`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Figma page: `197:2 / V4_CLEANROOM_ADD02_COUNTRY_SIGNS_2026_08_28`
Retained prior Singapore comparison: `198:115 / V4 / ADD-02 / TABLE 08 / SINGAPORE / CLEANROOM`
New V4C root: `236:2 / V4C / ADD-02 / TABLE 08 / SINGAPORE / TROPICAL MODERNIST BROADSHEET / CLEANROOM`
Hidden final long-copy proof: `236:111 / QA / V4C / ADD-02 / SINGAPORE / LONG COPY / FINAL`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Why this V4C exists

The retained Singapore candidate was structurally sound but still read as a broad green/yellow abstract garden composition. This run created a materially different clean-room candidate from a blank `1000 × 1480` frame rather than duplicating or restyling prior production.

V4C uses a tropical-modernist editorial broadside premise: deep-jade header field, warm paper body, narrow citrus rail, clipped botanical/orbit geometry, coral register marks, strong left-aligned destination typography, and controlled asymmetry. It deliberately avoids equal cards, dashboard panels, fake transport UI, stock photography, gradients, shadows, and decorative travel badges.

The prior Singapore design remains untouched as retained comparison/rollback.

## Hybrid authoring / provenance

- variable factual roles are native editable Figma text: `TABLE 08`, `SINGAPORE`, `シンガポール`, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`;
- title/copy semantic roles are grouped into nested native Auto Layout stacks (`236:52`, `236:53`, `236:54`) for long-copy resilience;
- fixed atmosphere is editable Figma vector/shape construction; no variable facts are baked into fixed art;
- raster IMAGE fills: `0`;
- no prior production/V2/V3/V4 frame or decorative group was duplicated as construction material;
- no Drive asset was reused or newly generated because the screenshot-supported defect was composition/typography, not a missing raster role.

## Meaningful corrections during this run

1. The first V4C build exposed a common Figma text-box defect: several native texts rendered visibly while retaining `10px` fixed node heights. All V4C text nodes were normalized to `textAutoResize = HEIGHT` and read back at real rendered heights.
2. Long-copy stress initially showed theme/description collision because those semantic roles were absolutely positioned. The four destination/copy roles were rebuilt into nested native Auto Layout stacks so Japanese theme and description copy reflow vertically without overlap.
3. Screenshot QA then showed the botanical stem crossing the long-copy text-safe column even though text/text geometry was clean. The stem and fruit register were shifted 140px toward the right rail; the final stress screenshot no longer shows decoration crossing the copy block.
4. A small `GARDEN CITY` fixed editorial wordmark evaluated to only about `5.1pt` at final physical size and added nonessential English filler, so it was removed rather than accepted as microtype.

## Long-copy stress QA

Hidden proof `236:111` uses:

- theme: `緑と建築が重なるガーデンシティの景色を楽しむテーブルテーマ`
- description: `熱帯の植物と都市建築が隣り合うシンガポールの空気感から着想し、深い緑、あたたかな黄、珊瑚色のアクセントを重ねています。会話を楽しみながら、今日だけの旅の続きをゆっくりお過ごしください。`

Final structural result:

- theme height: `88px`;
- description height: `210px`;
- native text outside root: `0`;
- text/text overlaps: `0`;
- no font-size reduction was used to force the pass;
- proof is hidden after QA and is not production-facing.

## Three-scale visual QA performed in this run

- whole/thumbnail: composition remains immediately distinct from the retained Singapore direction; destination is the first read and the right rail reads as an intentional print device rather than a web panel;
- reading scale: JP destination, theme, explanation and date maintain a clear hierarchy; no fake labels/badges or stock imagery were added;
- actual/native 1000 × 1480 screenshot: the long-copy version remains readable and the botanical geometry stays outside the copy-safe column after correction.

This evidence advances Singapore V4C to a serious comparison candidate, but does **not** promote ADD-02 family production yet.

## Print-first readback

Working physical authority remains `100 × 148 mm`, corresponding to `10 px/mm` in the current Figma geometry.

Approximate actual-size type equivalents from physical placement:

- `SINGAPORE 92px` → `9.2mm` → about `26.1pt`;
- JP destination `40px` → `4.0mm` → about `11.3pt`;
- theme `30px` → `3.0mm` → about `8.5pt`;
- description `25px` → `2.5mm` → about `7.1pt`;
- `TABLE 08 30px` → about `8.5pt`;
- date `28px` → about `7.9pt`;
- editorial index `58px` → about `16.4pt`.

Fine editable marks read back at `8–9px` thickness (`0.8–0.9mm`) for the key rules/stems, which is materially safer than hairline ornament at this size.

Raster/image fills: `0`, therefore effective raster PPI is `N/A` and there is no `RESOLUTION_WARNING` for this candidate.

CMYK risks remain for deep jade, warm citrus/yellow, coral red, muted botanical green, and warm cream. Grayscale hierarchy and vendor-profile conversion are still finalization work.

## Physical / production conditions still deferred

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

`DEFERRED_FINALIZATION`:

- printer template and exact trim/bleed/safe authority;
- whether a holder/easel clips the bottom or right rail;
- final stock / coating and CMYK profile;
- final black construction / overprint-knockout behavior;
- PDF export, font embedding and transparency/preflight;
- 100% printed proof / physical stand test.

No QR, fold, punch, perforation, signature or handwriting field applies to this table sign at the current authority.

## Current state

`V4C_SINGAPORE_CREATED / LONG_COPY_QA_PASS / STRUCTURE_QA_PASS / THREE_SCALE_SCREENSHOT_QA_PASS / SERIOUS_COMPARISON_CANDIDATE / NOT_PROMOTED / NOT_PRINT_READY`

Next safe ADD-02 work: create/review materially different V4C candidates for Bali and Maldives, then perform family-level three-scale comparison before any `SELLABLE_VISUAL_QA_PASS` promotion.