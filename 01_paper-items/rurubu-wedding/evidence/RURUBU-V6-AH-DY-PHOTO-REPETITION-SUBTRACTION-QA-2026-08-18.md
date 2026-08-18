# RURUBU V6 — AH / DY Photo Repetition Subtraction QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

The preferred V6 set had a small photo pool reused across many roles. After DX, cafe and Yokohama skyline each appeared 7 times. Repetition had become a publication-level quality ceiling even though individual roles were structurally valid.

## Experiment A — DY Cafe & Table

Source: DT `1695:2`.
Candidate: DY `1717:2`.

Bounded change on the left Cafe page only:

- hid repeated cafe hero `PHOTO / GOURMET_CAFE_HERO_REPLACEABLE` using hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- reused the already-verified composed travel texture hash `691a6ceed471a5d8efa144052a10564eed177b4f` as a bounded fixed-decoration field;
- strengthened existing native text into a photo-free editorial Cafe feature (`休日のカフェ時間。` plus practical metadata);
- preserved the smaller replaceable Yokohama view photo;
- added no new raster bytes, image hash, Drive asset, card, shadow, or generated decoration.

QA:

- whole spread 500px: PASS;
- whole spread 1200px: PASS;
- left page `1717:3` actual-size 794×1123: PASS;
- visible native text: 14;
- visible IMAGE roles: 2 = one composed texture + one replaceable photo;
- absolute text collisions: 0;
- 18px text safe-area risks: 0.

Promotion: DY preferred; DT hidden rollback.

## Experiment B — AH Outer

Source: AG `1676:2`.
Candidate: AH `1717:55`.

The same Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042` appeared twice within the outer spread: back support and front postcard.

Bounded change on the front postcard only:

- replaced the front duplicate skyline raster with the existing verified travel texture hash `691a6ceed471a5d8efa144052a10564eed177b4f`;
- converted that area into an editable mini issue panel using native `YOKOHAMA / ISSUE 2026` and `PHOTO / FOOD / MEMORY` copy;
- kept the back skyline photograph untouched;
- kept hero, dining, cafe, masthead, chronology and all other outer geometry unchanged.

Initial QA found one collision between `V6_A_DECK` and the new issue-panel title. The candidate was not promoted until the native panel copy was moved lower and rechecked.

Final QA:

- whole spread 500px: PASS;
- whole spread 1200px: PASS;
- front page actual-size 794×1123: PASS;
- front native text: 13;
- absolute text collisions: 0;
- 18px text safe-area risks: 0.

Promotion: AH preferred; AG hidden rollback.

## Preferred-set repetition after promotion

Current preferred roots: AH `1717:55`, DN `1675:2`, DO `1679:2`, DS `1709:2`, DY `1717:2`, DX `1714:2`.

Visible hash counts:

- cafe `c1ada...`: 6 (was 7);
- Yokohama skyline `644f...`: 6 (was 7);
- waterfront `539c...`: 6;
- dining `d76e...`: 6;
- travel texture `691a...`: 5;
- travel-object `e373...`: 4;
- travel street `439a...`: 3;
- masthead PNG `0bdb...`: 1.

Photo repetition is still unresolved globally, but the dominant four photo sources are no longer skewed at 7 uses and two exact repeated-photo roles were removed without introducing false destination imagery.

## Asset lifecycle truth

- newly generated assets: 0;
- adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new image hashes: 0;
- existing verified composed texture reused: YES;
- native text preserved: YES;
- remaining photography remains replaceable: YES;
- rollback frames preserved: YES;
- V7 touched: NO.

## Status

`VERIFIED_LOCAL / ADOPTED_IN_V6_PREFERRED / NOT_PRINT_READY`.
