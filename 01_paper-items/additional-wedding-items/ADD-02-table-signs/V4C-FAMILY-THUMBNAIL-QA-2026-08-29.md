# ADD-02 — V4C 11-table family thumbnail QA

Date: 2026-08-29
Scope: non-Rurubu only
Latest main immediately before final write: `5fc30af10ef422ea15d7cc450ac9dd93cf6a1715`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Status: `FAMILY_THREE_SCALE_QA_COMPLETE / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_REUSED / V4C_CLEAR_VISUAL_WIN / NOT_PRINT_READY`

## Live authority

Figma fileKey: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

The Drive folder ID and name were live-read immediately before the design work. No Drive asset write was needed because this refinement uses native/editable vector fixed art and native text only.

All 11 V4C comparison roots remain the live clean-room family:

1. `232:22` — TABLE 01 HAWAII / PACIFIC POSTCARD
2. `229:2` — TABLE 02 ITALY / TERRACOTTA LOGGIA
3. `228:2` — TABLE 03 FRANCE / ARCADE POSTER
4. `210:2` — TABLE 04 SPAIN / CERAMIC COURTYARD
5. `218:2` — TABLE 05 TAIWAN / PAPER LIGHT CANOPY
6. `234:2` — TABLE 06 JAPAN / INDIGO BOOK JACKET
7. `235:2` — TABLE 07 HONG KONG / HARBOUR BROADSHEET
8. `236:2` — TABLE 08 SINGAPORE / TROPICAL MODERNIST BROADSHEET
9. `237:2` — TABLE 09 BALI / SPLIT GATE FOLIO
10. `222:2` — TABLE 10 KOREA / HANJI INK WINDOW
11. `237:58` — TABLE 11 MALDIVES / LAGOON TYPOGRAPHIC CUT

Pages:
- `201:2 / V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`: Hawaii, Italy, France, Spain, Taiwan, Japan, Hong Kong, Korea
- `197:2 / V4_CLEANROOM_ADD02_COUNTRY_SIGNS_2026_08_28`: Singapore, Bali, Maldives

## Final blocker correction — France

The prior family contact sheet correctly withheld the sellable gate because France had a large lower cream field that read as empty-premium whitespace rather than intentional poster composition when the placeholder copy was short.

France `228:2` was refined in place without copying legacy production/V2/V3 construction. A new fixed-art group was added:

- `242:2 / FIXED ART / LOWER ARCHITECTURE ANCHOR`
- lower cobalt plane `242:3`
- lower rose bar `242:4`
- three elevation rules `242:5`–`242:7`
- cropped architectural arch `242:8`

This is a purposeful architectural/elevation continuation of the existing France poster premise, not a badge/card/grid filler. It closes the previously unstructured lower field while leaving the native text stack independent and editable.

Post-write live structure readback for France:

- visible native text nodes: `6`
- text outside root: `0`
- text/text overlap pairs: `0`
- IMAGE fill nodes: `0`
- raster effective PPI: `N/A`
- `RESOLUTION_WARNING`: none

## Family rerender / visual judgment

QA contact sheet authority remains `239:2 / QA / V4C / ADD-02 / 11 TABLE FAMILY / THUMBNAIL CONTACT SHEET`.

Only its France QA clone was refreshed from the corrected live source (`242:9`); all other QA clones remained evidence-only. The sheet was shown, rerendered at one-screen scale, reviewed, and hidden again after QA.

Result:

- France no longer falls into the previous empty-whitespace failure state;
- Spain and Taiwan were intentionally **not simplified** after rerender: their denser upper fields remain materially different destination art directions, but the country title still wins the 3-second scan and the information block remains readable;
- across the 11 signs, variation now reads as destination-specific art direction rather than accidental inconsistency;
- common family grammar remains: `100×148mm`, warm-paper/content field discipline, strong destination-first typography, table/date metadata, restrained travel-editorial color system, and native variable-copy roles;
- V4C is a visual win over the retained V4B production QA family `209:1529`: V4C has stronger destination-specific composition, less repeated wave/folio grammar, stronger poster/editorial asymmetry, and fewer signs that read as variants of one geometric template.

Decision: `V4C_CLEAR_VISUAL_WIN / SELLABLE_VISUAL_QA_PASS`.

The previous `DESIGN_QA_PASS_WITH_PLACEHOLDERS` is reused only for verified structural/long-copy history, not as sellable-visual evidence. V4C-specific long-copy and live structural checks performed during this clean-room series remain the current structural support.

## Print-first result

Working physical authority: `100 × 148 mm` per sign (`1000 × 1480 px`, 10 px/mm working geometry).

France current native type at actual-size working conversion:

- destination EN `88px` ≈ `24.9pt`
- destination JP `36px` ≈ `10.2pt`
- theme `28px` ≈ `7.9pt`
- description `25px` ≈ `7.1pt`
- table number `25px` ≈ `7.1pt`
- date `27px` ≈ `7.7pt`

The new France anchor is vector/native fixed art, not raster, so there is no source-pixel requirement or effective-PPI warning. Family-wide V4C candidates are currently vector/native-text based for these final-reviewed roles.

CMYK risk remains concentrated in deep navy/indigo/green/charcoal, cobalt/cyan/aqua, coral/rose/vermillion, saffron/ochre/gold and warm cream. Grayscale hierarchy is preserved at family thumbnail scale, but vendor-profile conversion has not been proven.

No QR, fold, punch, perforation, signature or handwriting field applies to the current ADD-02 authority. Holder/easel occlusion is still a physical-finalization concern.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

`DEFERRED_FINALIZATION`:

- printer template;
- confirmed trim / bleed / safe-area geometry;
- holder/easel lip and viewing-angle proof;
- final stock/coating;
- CMYK profile and black construction;
- PDF export, font embed, transparency, overprint/knockout;
- preflight;
- 100% physical proof.

## Progression

ADD-02 may now progress past the reopened visual gate. Do not spend another run on decorative micro-polish unless a new screenshot-supported defect appears. Continue to the next non-Rurubu item in authority order that does not already have both `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.
