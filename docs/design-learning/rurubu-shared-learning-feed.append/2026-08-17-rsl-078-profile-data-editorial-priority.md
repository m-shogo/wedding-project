# RSL-078 — Repeated editable profile facts can be editorialized by semantic priority instead of equal grid rhythm

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source scope/item: Rurubu WEDDING / V6 Profile CZ

## Visible problem

Six valid native profile facts still read like a 2×3 form because labels/values had nearly equal row rhythm and visual weight.

## Root-cause hypothesis

Repeated facts do not need equal visual priority. If the facts stay native/editable, the layout can separate compact metadata, larger personality/favorite facts, and quieter support facts without introducing cards.

## Bounded test

Rollback-safe CZ `1609:2` changed only the Profile fact hierarchy:

- compact 出身地 / 誕生日 metadata row;
- larger 趣味 / 休日の過ごし方 beats;
- quieter 好きな食べ物 / チャームポイント row;
- photos and Q&A unchanged;
- no new asset or container.

## Expected improvement

Reduce form/grid reading and make the facts feel selected by an editor rather than mechanically enumerated.

## Regression risk

Changing width/size/position alters wrapping reserve. A visually stronger short-copy state can fail realistic long copy.

## Evidence

First realistic-copy proof failed with two collisions and was rejected. After geometry correction, second proof passed:

- Profile actual-size 794×1123: PASS;
- collisions: 0;
- 18px safe-area risks: 0;
- CZ spread 1400×990: PASS and stronger than CX;
- photos/image hashes unchanged.

Figma:

- CZ preferred `1609:2`;
- CX rollback `1601:2` hidden;
- failed proof `1610:2` hidden;
- PASS proof `1610:82 / 1610:83` hidden.

Drive: V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`, no new writes.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AB-CZ-CY-PROFILE-DATA-HIERARCHY-QA-2026-08-17.md`.

## What must remain Rurubu-specific

Exact facts, sizes, positions, colors, copy, photography and Rurubu-like visual grammar.

## Cross-item applicability hypothesis

When another print artifact contains several editable facts that look like a form, independently test semantic-priority typography before adding cards. Always rerun realistic-copy stress after changing widths or hierarchy.
