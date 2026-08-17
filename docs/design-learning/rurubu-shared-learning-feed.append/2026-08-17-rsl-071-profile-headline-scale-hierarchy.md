# RSL-071 — Native Japanese headline scale hierarchy before adding decoration

Date: 2026-08-17
Source scope: Rurubu WEDDING / V6 Profile
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred V6 Profile page was structurally clean and photo-led, but its opening headline `ふたりのこと、もっと。` remained one evenly weighted 48px line. Beside the stronger Outer Y and Chronology CQ, the page entrance still read quieter and more template-like than a Japanese travel-information magazine feature.

## Root-cause hypothesis

The defect was not missing cards, stickers, or additional imagery. The headline itself lacked a strong internal scale relationship. Splitting one semantic phrase into two native-text beats could create a more editorial entrance while keeping all variable copy editable and all photos replaceable.

## Bounded test

Rollback-safe duplicate from CP:

- source frame: `1567:18`
- candidate/preferred frame: `1571:2`
- preserved Q&A page without visual changes
- changed only Profile heading hierarchy
- `ふたりのこと、` kept as native text at 44px
- `もっと。` created as a separate native 68px magenta accent and allowed to overlap the hero field intentionally
- deck and existing yellow rule were repositioned to balance the new two-step headline
- no new photo, card, shadow, gradient, raster decoration, or image hash change

## Expected improvement

Increase Japanese magazine headline energy at thumbnail and page scale without reintroducing UI geometry or sacrificing editability.

## Regression risk

- accidental headline-to-headline collision
- safe-area violation
- accent text overpowering the hero image
- semantic phrase fragmentation that becomes hard to edit later

## Evidence

Figma:

- preferred: `1571:2` — `PREFERRED / V6_INSIDE_CR_PROFILE_HEADLINE_HIERARCHY_2026_08_17`
- rollback: `1567:18` — hidden CP
- Start Here: `V5 FU/FX · V6 Y + CR/CQ INSIDE STUDIES · V7 HOLD`
- final Profile structural QA: native text `23`, replaceable IMAGE roles `4`, text collision `0`, 18px safe-area risk `0`, overflow `0`
- four Profile photo roles remain IMAGE fills and remain independently replaceable
- three-scale evidence captured at 500px whole-item and 794×1123 actual-size; full spread also reviewed at 1200px

Google Drive:

- V6 authority root read back before/after Figma work: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- no Drive write and no generated master adoption in this experiment

GitHub:

- this lesson file is the durable evidence record for the run

## Result

`VERIFIED_LOCAL / ADOPTED_IN_RURUBU_V6`

CR is preferred over CP because the page gains a materially stronger editorial entry without adding ornamental geometry or changing photo assets.

## What must remain Rurubu-specific

Do not transfer the exact Japanese phrase, magenta color, 44/68px scale pair, positions, yellow rule, hero overlap amount, or Rurubu page composition to other wedding items.

## Cross-item applicability hypothesis

When a print page is structurally correct but visually timid, test semantic native-text scale hierarchy before adding cards or composed decoration. Transfer only the method: split emphasis within editable copy, verify contrast/fit, and review at thumbnail, reading, and actual-size scales.

## Next Rurubu application

Review Y + CR/CQ as one book. Prioritize the next visibly quiet section only if the defect can be stated concretely; do not continue changing already-strong sections merely to create another version.
