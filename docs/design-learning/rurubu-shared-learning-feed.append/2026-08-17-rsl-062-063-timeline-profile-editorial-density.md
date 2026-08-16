# Rurubu shared learning — RSL-062 / RSL-063

Date: 2026-08-17
Source scope: Rurubu WEDDING V6 only
Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CK-CI-PHOTO-LED-TIMELINE-PROFILE-DATA-QA-2026-08-17.md`

## RSL-062 — hierarchy can survive removal of number containers

State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Source problem

Chronology CH had strong photographs but still read as a timeline UI because large colored rectangular containers surrounded 01/03/05.

### Root-cause hypothesis

When order is already explicit in native number/date/title text, large number containers may be redundant. Free number typography placed in direct relationship with unequal photographs can retain hierarchy while removing card grammar.

### Bounded test

On rollback-safe CI, hide only the 01/03/05 color blocks, keep numbers native, redistribute existing photos, keep 02/04 as smaller bridges, keep the WEDDING terminal, reduce background texture, and invent no factual dates.

### Expected improvement

Less dashboard/timeline-module appearance; stronger photo-led travel-magazine reading.

### Regression risk

Sequence could become ambiguous or numbers could visually detach from their events. Actual-size QA and 01—06 ordering were therefore retained.

### Evidence/result

500px whole, reading-scale and `794×1123` actual-size all favored CI. One nonessential micro-caption collided with Event 4 and was subtracted. Final chronology: native text `30`, replaceable photo roles `4`, text collision `0`, safe risk `0`.

### Rurubu-specific / do not transfer

Do not transfer these exact magenta/cyan/yellow colors, number sizes, travel photos, event wording, chronology positions, title geometry or Rurubu editorial grammar.

### Cross-item applicability hypothesis

For another print item with strongly repeated numbered modules, test whether container geometry is doing real semantic work before keeping it. The transferable method is `remove redundant container → preserve native ordering → compare at three scales`, not this layout.

## RSL-063 — semantic repeated data can become an editorial rail

State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Source problem

CG Profile's six native profile fields were structurally correct but visually resembled a sparse form between the photo hero and snapshot cluster.

### Root-cause hypothesis

Repeated native facts do not require six separate visual modules. A compact text-first rail can preserve editability and long-copy flexibility while increasing editorial density.

### Bounded test

On rollback-safe CK, hide three decorative row bars, keep labels/values separate native text, add one native editorial kicker, compress six fields to three rows, and move existing photo roles upward without changing their dimensions or sources.

### Expected improvement

Profile page should read as a travel-magazine personality feature rather than a form/template.

### Regression risk

Long values could collide after compression. A dedicated hidden long-copy proof used realistic longer Japanese values with auto-height.

### Evidence/result

Actual-size CK Profile: native text `19`, replaceable photos `4`, collision `0`, safe risk `0`. Long-copy proof `1553:156`: collision `0`, safe `0`, with longest tested value heights up to `38px`.

### Rurubu-specific / do not transfer

Do not transfer the exact three-row geometry, bilingual dummy values, palette, snapshot overlap, hero photograph or typography sizes.

### Cross-item applicability hypothesis

For repeated semantic facts in another print item, test compact text hierarchy before adding cards. Long-copy stress is mandatory after compression.

Neither lesson is `VERIFIED_CROSS_ITEM` or `PROMOTED_PROJECT_RULE`.