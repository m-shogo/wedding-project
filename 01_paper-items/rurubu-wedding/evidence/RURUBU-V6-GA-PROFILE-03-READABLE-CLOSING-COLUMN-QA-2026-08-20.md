# Rurubu WEDDING V6 — GA Profile 03 Readable Closing Column QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate/adopted spread: `1922:2`
Profile page: `1922:3`
Rollback source: FP `1895:18`

## Visible problem

FP already solved the missing-photo `03 / NEXT TRIP` role with native typography, but the closing column was squeezed into roughly 138px at the far right by the second snapshot. At actual size, the body copy was noticeably tighter than the rest of the editorial page and read more like a leftover slot than an intentional closing beat.

## Bounded test

GA duplicated FP and changed only the Profile lower cluster:

- moved existing replaceable snapshot 02 left and reduced it from `340×245` to `320×235`;
- preserved its existing image source/hash and non-destructive replaceable role;
- widened the native 03 closing column to about `168px`;
- enlarged/normalized the native 03 number/title/body for actual-size readability;
- changed generic microcopy `NEXT TRIP / 03` to reader-facing native copy `旅のつづき / 03`;
- added no image, card, new raster, generated asset, or new image hash;
- Q&A page was not changed.

## Rejected intermediate state

The first wider-column arrangement moved `次の旅へ。` upward into a yellow line already baked inside the existing composed travel texture. Structural text/text collision checks could not detect that raster/text visual crossing. The intermediate state was rejected.

The final GA moved the native meta/title/body below the baked rule while keeping the wider column.

Failure fingerprint: `BAKED_DECOR_NATIVE_COPY_VISUAL_CROSSING_AFTER_REFLOW`.

## Three-scale visual evidence

- whole spread thumbnail / 500px: PASS; closing beat is more legible without weakening the photo cluster;
- whole spread reading / 1200px: PASS;
- Profile actual-size `794×1123`: PASS;
- FP actual-size was also re-read for direct comparison before adoption.

## Structure QA

Final GA Profile:

- visible native text: `26`;
- changed closing text vs all visible text contacts: `0`;
- 18px text safe-area risks: `0`;
- snapshot 02: `320×235`, smaller than FP and therefore no new source-fidelity enlargement risk;
- native text remains editable;
- photos remain independent replaceable IMAGE roles;
- rollback FP preserved hidden.

## Asset lifecycle state

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing composed texture reused unchanged: YES;
- new Figma photo asset: `0`.

## Decision

ADOPTED / `PREFERRED / V6_INSIDE_GA_PROFILE_03_READABLE_CLOSING_COLUMN_2026_08_20`.

FP was renamed rollback and hidden. Start Here now reads:

`V5 FU/FX · V6 FO + GA/FR + FT MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

V6 remains `NOT_PRINT_READY`; final photos/copy, imposition, printer template, PDF preflight and physical proof remain separate gates.
