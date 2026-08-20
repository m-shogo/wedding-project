# Rurubu V6 GU/GV — factual placeholder + guide metadata QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Review page: `845:2 / 00_RURUBU_START_HERE`
GitHub main before write: `0ecd1267ace3b1e62e408459b8f2ce34436913fb`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## GU — Outer unresolved year subtraction

### Visible problem

GB displayed unresolved `201x / 202x` strings for chronology events whose exact dates are not authoritative in current production data. At actual size they looked like semi-real facts rather than an intentional editorial treatment.

### Root-cause hypothesis

The chronology already has native ordinal numbers 01–06. When a factual value is not known, a pseudo-date adds visual noise and false precision without adding order or meaning.

### Bounded test

Rollback-safe duplicate GU `1975:2` from GB `1929:2`:

- hide `V6_A_YEAR_0..3` only;
- keep 01–06, event labels, known 2026 dates and all photographs unchanged;
- no new decoration, no image generation, no new image hash.

### Evidence

Whole spread screenshot: PASS.
Back actual-size `1975:3 / 794×1123`: PASS.
Structure: native text 21; text collision 0; 18px safe risk 0.

### Decision

ADOPTED as `PREFERRED / V6_OUTER_GU_UNRESOLVED_YEAR_PLACEHOLDER_SUBTRACTION_2026_08_20`.
GB retained hidden rollback.

Regression risk: removing too much temporal information could make ordering ambiguous. Not observed because ordinal hierarchy remains explicit.

## GV — Memory Spots guide metadata field

### Visible problem

GE's lower `CHECK! / 4 SPOT GUIDE` compressed six useful facts into one dense two-line 11.5px string. It was present but weak at actual size.

### Root-cause hypothesis

Minor metadata does not need cards, but independent facts should have enough spatial separation to scan as deliberate reader-facing information.

### Bounded test

Rollback-safe duplicate GV `1976:2` from GE `1941:2`:

- hide the original dense `TEXT / GUIDE_INFO_COPY`;
- create six native 12.5px text beats using exactly the same facts;
- 3 columns × 2 rows;
- no card, icon, image, raster or new background.

Initial structure QA found three 3px row contacts. Second-row y-position was corrected before adoption.

### Evidence

Whole spread screenshot: PASS.
Guide actual-size `1976:24 / 794×1123`: PASS.
Structure: guide native text 19; text collision 0; 18px safe risk 0.

### Decision

ADOPTED as `PREFERRED / V6_INSIDE_GV_MEMORY_GUIDE_METADATA_GRID_2026_08_20`.
GE retained hidden rollback.

Regression risk: distributed metadata can become a dashboard/grid. The accepted treatment has no containers and remains subordinate to the large photo feature.

## Asset lifecycle state

- generated this run: 0
- adopted generated assets: 0
- Drive writes: 0
- external binary placements: 0
- new image hashes: 0
- replaceable photos: preserved
- native variable text: preserved
- V7 touched: no

## Three-scale decision

GU and GV both improved reader-facing finish without adding UI-like containment or inventing facts. Both are `VERIFIED_LOCAL`; V6 remains `NOT_PRINT_READY` pending final photos/copy, printer template, PDF preflight and physical proof.
