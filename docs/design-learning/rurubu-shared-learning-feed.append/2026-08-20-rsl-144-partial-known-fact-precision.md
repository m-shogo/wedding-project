# RSL-144 — Partial-known facts should degrade precision instead of fabricating subfields

Date: 2026-08-20
Source scope/item: Rurubu WEDDING / V6 Profile
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred Profile displayed native birthday value `1991.XX.XX`. The year existed in the current content, but month/day were unresolved. At actual size the `XX.XX` portion read as unfinished production data and implied false precision.

## Root-cause hypothesis

When a fact is only partially known, a reader-facing artifact should show the known precision level rather than preserving pseudo-subfields. Native editability means a more precise authoritative value can be inserted later without rebuilding the layout.

## Bounded test

On rollback-safe duplicate GT `1981:111`, edit only `TEXT / PROFILE_VALUE_2` from `1991.XX.XX` to native `1991年`. Preserve the `誕生日` label, all other profile/Q&A copy, photos, masks, crops, image hashes and geometry.

## Expected improvement

Remove the unfinished-template signal and avoid manufacturing an unknown month/day while keeping the known year visible.

## Regression risk

A partial value can be mistaken for final completeness if downstream production never revisits it. The native node must remain replaceable when authoritative full data arrives.

## Three-scale / structure evidence

- 1200px spread: PASS;
- Profile actual-size `1981:112 / 794×1123`: PASS;
- Profile visible native text: `26`;
- Q&A visible native text: `29`;
- same-parent absolute text collision: `0`;
- 18px safe-area risk: `0`;
- stray visible text: `0`.

## Evidence

- Figma: GT `1981:111`; changed native node `1981:127`; former GR `1971:2` retained hidden rollback.
- Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GT-GS-FACTUAL-PRECISION-QA-2026-08-20.md`.

## What must remain Rurubu-specific

Do not transfer the specific year, birthday label, typography, photo composition, palette or profile geometry.

## Cross-item applicability hypothesis

A different wedding print artifact may independently test this method when a reader-facing field contains a partially known fact. Transfer only the principle: show authoritative precision, keep the field native/editable, and do not synthesize unknown subfields.

## Related local verification — RSL-142

The same run also applied the existing unresolved-placeholder subtraction method to Story/chronology GS `1981:2`: four native `20XX.XX` nodes for events 01–04 were hidden while verified dates 05/06 remained. 1200px + actual-size QA passed with collision 0 and safe-area risk 0. This strengthens RSL-142 locally but does not create a duplicate visual rule.
