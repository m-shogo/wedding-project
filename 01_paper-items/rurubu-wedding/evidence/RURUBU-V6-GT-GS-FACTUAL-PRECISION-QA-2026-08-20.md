# るるぶWEDDING V6 — GT / GS factual-placeholder cleanup QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / PROFILE_GT_ADOPTED / STORY_CHRONOLOGY_GS_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Authority read before writes

- GitHub main immediately before evidence write: `43c1d2f2f4062c1f42968c0d0762e160f121c42b`.
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- Start Here page: `845:2 / 00_RURUBU_START_HERE`.
- Drive V6 root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- Shared system, Rurubu feed and neutral non-Rurubu feed were read before production writes. No non-Rurubu item-specific Figma/Drive/GitHub production surface was inspected or mutated.

## Experiment A — Story / chronology GS

### Visible problem

Preferred GP `1961:2` still displayed `20XX.XX` on events 01–04. The page was visually mature, so those four pseudo-dates no longer read as intentional placeholders; they read as unfinished factual data. Exact dates are not authoritative in the current Rurubu scope.

### Root-cause hypothesis

Chronology order is already communicated by native event numbers, headlines, layout and the verified dates on events 05/06. Showing fake date precision adds no reader value and conflicts with the existing rule not to manufacture unresolved facts.

### Bounded rollback-safe test

- duplicate GP to candidate `1981:2`;
- hide only four native `TEXT / EVENT_DATE_1..4` nodes whose characters were exactly `20XX.XX`;
- preserve event numbers, event copy, photos, image hashes, crop, geometry, Story page, `2026.02.11`, and `2026.10.24`;
- add no image, card, rail, raster or generated decoration.

### Evidence

- spread screenshot 1200px: PASS and cleaner than GP;
- chronology actual-size `1981:28 / 794×1123`: PASS;
- Story visible native text: `12`;
- chronology visible native text: `28` after four pseudo-date nodes were hidden;
- same-parent absolute text collision: `0`;
- 18px text safe-area risk: `0`;
- stray visible text outside the two page frames: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Promotion:
- GS `1981:2 / PREFERRED / V6_INSIDE_GS_CHRONOLOGY_UNKNOWN_DATE_SUBTRACTION_2026_08_20`;
- former GP `1961:2` retained hidden as rollback.

This is additional local verification of the factual-placeholder principle already represented by RSL-142; no duplicate visual rule is promoted.

## Experiment B — Profile / Q&A GT

### Visible problem

Preferred GR `1971:2` still displayed `1991.XX.XX` under native label `誕生日`. The year is present in the existing content, but month/day are unresolved. At actual size the string looks like unfinished production data rather than reader-facing editorial copy.

### Root-cause hypothesis

When a fact is partially known, reducing displayed precision to the known portion is more truthful and more finished-looking than preserving fake subfields such as `XX.XX`.

### Bounded rollback-safe test

- duplicate GR to candidate `1981:111`;
- edit only `TEXT / PROFILE_VALUE_2` from `1991.XX.XX` to native `1991年`;
- load the text node's current font before mutation;
- preserve label, profile geometry, Q&A, photos, image hashes, crops, masks and all other copy;
- add no asset or decorative geometry.

### Evidence

- spread screenshot 1200px: PASS and cleaner than GR;
- Profile actual-size `1981:112 / 794×1123`: PASS;
- Profile visible native text: `26`;
- Q&A visible native text: `29`;
- same-parent absolute text collision: `0` on both pages;
- 18px text safe-area risk: `0` on both pages;
- stray visible text outside the two page frames: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Promotion:
- GT `1981:111 / PREFERRED / V6_PROFILE_QA_GT_PARTIAL_BIRTH_YEAR_CLEANUP_2026_08_20`;
- former GR `1971:2` retained hidden as rollback.

## Start Here / production state

`845:27` was updated to:

`V5 FU/FX · V6 GU + GT/GS + GV MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

No V7 production node was changed.

## Asset lifecycle

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback state preserved: YES.

## Completion boundary

This does not make V6 print-ready. Final legitimate photography/copy, exact page count/imposition, printer template, bleed/trim/fold/safe-area confirmation, PDF preflight and physical proof remain required.
