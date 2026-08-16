# Rurubu WEDDING V6 — T + BI/BH dense-profile QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

`BI_PROMOTED / T_AND_BH_UNCHANGED / PROFILE_LONG_VALUE_STRESS_PASS / V7_HOLD / NOT_PRINT_READY`

Preferred live state:

- Outer T `1447:2`
- Profile/Q&A BI `1458:2 / PREFERRED / V6_INSIDE_BI_DENSE_NATIVE_PROFILE_DATA_2026_08_16`
- Story/chronology BH `1451:2`
- Start Here `845:27`: `V5 FU/FX · V6 T + BI/BH INSIDE STUDIES · V7 HOLD`

BG `1439:58` is preserved hidden as rollback. BI-specific long-value proof `1459:2` is hidden after PASS.

## Visible problem

BG's profile photography and macro hierarchy were already strong, but all six profile values were still literal `—` placeholders in a wide 3-column × 2-row layout. At actual size this created a large wireframe-like quiet zone between the hero and memory photos. The problem was not missing decoration; it was missing realistic information mass and a data layout that was too diffuse.

## Root-cause hypothesis

A professional editorial page must be judged with representative native text, not only empty placeholders. Converting the data area to a denser 2-column × 3-row structure and using realistic editable dummy-value lengths should reveal whether the profile page can carry real content while looking like a finished magazine rather than a template.

## Bounded test

BI duplicated BG and changed only the Profile page. Q&A geometry/type was untouched.

Profile changes:

- retained the existing full-width replaceable hero and three replaceable memory photos;
- retained native section title, profile name and native pullquote;
- rearranged the six existing native label/value pairs from `3 columns × 2 rows` to `2 columns × 3 rows`;
- replaced `—` placeholders with representative editable dummy values such as `神奈川県 / KANAGAWA`, `1991.XX.XX`, `旅行・写真・映画`, `カフェ・スイーツ`, `散歩してカフェ巡り`, `SMILE / 笑顔`;
- added no cards, lines, shadows, gradients, generated decoration, image asset or external transport.

The values are design dummies, not final personal facts. Their purpose is to expose real text density; each remains native Figma text and is expected to be replaced with final copy later.

## Visual QA

### Whole spread / thumbnail

BG and BI compared at 500px: BI preferred. The profile page now reads as an intentionally edited data feature instead of hero → empty form → photos.

### Actual-size Profile

BI Profile `1458:3`, native `794×1123`: PASS.

Final Profile structure:

- visible native text: `17`
- replaceable IMAGE roles: `4`
- text/text collisions: `0`
- 18px text safe-area risks: `0`

### Long-value stress

Dedicated proof `1459:2` used substantially longer native values across all six fields, including multi-line cases.

Rendered actual-size Profile: PASS.

Stress structure:

- profile value/label text collisions: `0`
- 18px safe-area risks: `0`
- new profile data versus lower photo collisions: `0`
- the only text/image intersections reported were the pre-existing intentional `PROFILE_NAME` and `PROFILE_QUOTE` overlays on the hero photograph.

Proof was hidden after PASS.

## Q&A verification

BI Q&A is an exact clone of BG Q&A and was not mutated.

Fresh BI readback:

- visible native text: `25`
- replaceable IMAGE roles: `2`
- text/text collisions: `0`
- 18px safe-area risks: `0`

The existing dedicated BG long-answer proof remains applicable because BI did not alter Q&A geometry or typography.

## Drive / asset truth

Fresh Drive V6 root had already been read back in this run:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

No new generation, Drive write, external binary placement, or generated section-decoration adoption occurred.

## Lifecycle truth

- newly generated images: `0`
- new Drive saves: `0`
- new binary placements: `0`
- existing verified Figma photo hashes reused: `YES`
- native editable profile copy: `YES`
- replaceable photos preserved: `YES`
- BI actual-size visual QA: `PASS`
- BI long-value stress: `PASS`
- rollback preserved: `YES`
- V7 touched: `NO`

## Decision

BI is `VERIFIED_LOCAL` and promoted over BG. V6 remains `NOT_PRINT_READY`; final real profile facts/photos, printer template, bleed/trim/fold, PDF preflight and physical proof remain separate required gates.