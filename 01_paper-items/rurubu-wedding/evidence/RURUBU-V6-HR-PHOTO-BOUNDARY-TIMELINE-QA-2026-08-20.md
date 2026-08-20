# RURUBU V6 HR — Photo-boundary Timeline QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Source preferred before test: HJ `2024:2`
Adopted preferred: HR `2033:111`
Timeline page: `2033:137`
Rollback: HJ `2024:2` hidden
V7: HOLD / untouched

## Visible problem

HJ's timeline right page had a strong hero but the lower page still split into separate systems: 01/02/04 native text at left and a 03 photo module at right. The page still read partly like a timeline/template rather than a travel-magazine photo feature.

## Bounded redesign

- duplicated HJ rollback-safely;
- Story left page unchanged;
- hid only the weak composed timeline texture;
- kept the existing replaceable 03 photo at `350×260`, moving it upward across the hero/cream boundary;
- placed native 03/title/copy directly on that photo;
- retained 01 as opening major milestone;
- retained 02 and 04 as quieter bridges;
- moved 05 into a distinct right-side milestone;
- rebuilt 06/WEDDING as a full-width terminal beat;
- kept all variable/factual copy as native Figma text;
- introduced no new image source, generated asset, Drive save, binary placement or image hash.

## Failure / correction evidence

### Font-load failure

First copy-edit attempt tried to set characters on `Noto Sans JP Bold` without loading the font. Figma rejected the write. Immediate live readback showed no partial HR candidate. The retry changed method by avoiding copy mutation until the font contract was explicitly loaded.

Fingerprint: `FIGMA_TEXT_MUTATION_UNLOADED_FONT`.

### Actual-size contacts

The first successful HR geometry passed visual screenshot review but structural actual-size QA found:

- Event 05 date ↔ 05 number contact;
- Event 05 number ↔ 入籍 title contact;
- Event 06 date ↔ WEDDING title contact;
- Event 05 copy also approached the right safe edge.

That state was not promoted. Event 05 was moved inward and narrowed; WEDDING was shifted away from the 06 date. Final structure audit returned zero contacts and zero 18px safe-area risks.

## Three-scale evidence

- whole spread, 1200px: PASS; HR visually preferred over HJ.
- reading/page context: PASS; 03 now binds hero and lower chronology instead of floating as a separate card/module.
- actual-size timeline `2033:137 / 794×1123`: PASS.

Final actual-size structure:

- visible native text: `28`;
- visible image roles: `2`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- page-level stray text: `0`;
- 03 photo display remains `350×260`;
- no image enlargement in this test;
- no new image hash.

## Asset / Drive state

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing section-generated masters remain saved but unadopted. This test used no generation or binary transport.

Lifecycle classification:

- generated: `0`;
- Drive saved: `0`;
- placed new binary: `0`;
- adopted new binary: `0`;
- reused existing replaceable image role: YES;
- native text retained: YES;
- visually verified: YES;
- rollback preserved: YES.

## Decision

`HR ADOPTED / VERIFIED_LOCAL`.

HR is a stronger V6 chronology study than HJ, but V6 remains `NOT_PRINT_READY` pending final photography/copy, page imposition, print template, PDF preflight and physical proof.
