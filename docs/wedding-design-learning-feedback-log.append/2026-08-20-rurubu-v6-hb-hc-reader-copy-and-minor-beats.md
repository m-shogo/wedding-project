# Rurubu V6 — HB / HC visual-learning feedback

Date: 2026-08-20
Scope: Rurubu WEDDING only
V7: HOLD

## Experiment A — Outer HB

### Visible problem

Outer GV was already photo-led, but two finish defects remained:

- front/back helper labels still contained generic English template language;
- back chronology 02/04 were subordinate enough to become weak at actual-size print reading.

### Principle / capability tested

Reader-facing native microcopy + actual-size subordinate-beat hardening before adding any new decoration or photography.

### Bounded change

- Japanese-first native support labels;
- 02/04 ordinal/title visual mass increased modestly;
- all photos, image hashes, facts, palette and major chronology beats unchanged.

### Expected improvement

Keep unequal hierarchy while making every meaningful event readable; remove remaining template-token feel.

### Regression risk

- minor beats could become too strong and flatten chronology hierarchy;
- larger type could wrap inside stale text boxes or collide with neighboring labels;
- Japanese strings could exceed inherited English widths.

### Failure evidence

Initial HB was rejected:

- 04 wrapped vertically because its inherited text box was too narrow;
- after widening, three 02/04 text contacts remained.

Fingerprint: `TYPE_SCALE_WITH_STALE_TEXTBOX_WRAP_OR_CONTACT`.

### Final evidence

Figma:

- HB `2010:2`;
- back actual-size `2010:3 / 794×1123`;
- front actual-size `2010:52 / 794×1123`;
- whole 1200px PASS;
- collisions 0;
- 18px safe risks 0;
- GV `2006:2` hidden rollback.

Status: `ADOPTED / VERIFIED_LOCAL`.

### Next application

Before adding more visual treatment to an already-mature V6 page, inspect whether subordinate native type has become practically invisible or whether small labels still read like production/template tokens.

## Experiment B — Cafe/Table HC

### Visible problem

GL's photography and geometry were already acceptable, but generic labels such as `CAFE GUIDE`, `CAFE NOTE`, `VIEW & WALK`, `TABLE & TALK`, `TABLE NOTE`, and `CHECK!` still made the page feel like an editorial template rather than finished Japanese travel-guide copy.

### Principle / capability tested

Change only reader-facing native microcopy; do not disturb a layout whose visual hierarchy and photography already work.

### Bounded change

Converted generic utility/role labels to Japanese reader-facing wording while preserving:

- every photo;
- every image hash;
- every photo geometry/crop;
- section hierarchy;
- palette;
- replaceability/editability.

### Expected improvement

Increase finished-magazine plausibility without visual clutter or asset churn.

### Regression risk

Japanese strings are often wider than the English tokens they replace; lexical cleanup still needs actual-size collision/safe-area QA.

### Final evidence

Figma:

- HC `2012:2`;
- Cafe `2012:3 / 794×1123`;
- Table `2012:33 / 794×1123`;
- whole 1200px PASS;
- Cafe native text 20 / collisions 0 / safe risks 0;
- Table native text 22 / collisions 0 / safe risks 0;
- GL `2000:2` hidden rollback.

Status: `ADOPTED / VERIFIED_LOCAL`.

### Next application

Continue converting only generic schema-like helper labels where they have no intentional brand/category role. Preserve purposeful English masthead/category language and do not mechanically translate everything.

## Asset / evidence reconciliation

- generated this run: 0;
- adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new image hashes: 0;
- native text preserved: YES;
- replaceable photos preserved: YES;
- rollback preserved: YES;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- Start Here after promotion: `V5 FU/FX · V6 HB + GZ/GW + GY MEMORY SPOTS + HC CAFE & TABLE + GR 1DAY PLAN · V7 HOLD`.

## Cross-item note

These results add Rurubu-local evidence for existing RSL-133 and RSL-153. They do not promote either lesson cross-item and do not transfer Rurubu-specific copy, typography sizes, colors, layouts or assets.