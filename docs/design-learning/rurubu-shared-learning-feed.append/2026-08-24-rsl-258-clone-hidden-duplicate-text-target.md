# RSL-258 — clone mutation must target visible semantic text roles

Date: 2026-08-24
Scope: Rurubu WEDDING / Figma production
State: `VERIFIED_LOCAL`
Fingerprint: `F-RSL-258-CLONED-FRAME-HIDDEN-DUPLICATE-TEXT-INTERCEPTS-CHARACTER-ONLY-MUTATION`

## Operation attempted

Edit the exact time labels inside a rollback-safe clone of V8 1DAY AT3.

Initial selector used character content (`findOne` by `10:00 / 11:40 / 15:10 / 18:30`) after cloning.

## Symptom

The mutation call returned successful node IDs, but the fresh candidate screenshot still displayed all four original clock times.

## Root-cause hypothesis

The cloned frame contained hidden duplicate descendants carrying the same character values. Character-only search did not express which visible editorial role owned the text and could resolve to a hidden duplicate before the visible `R_TIME0..3` nodes.

## Corrected method

Switch selector strategy rather than retrying the same approach:

1. filter to `TEXT && visible`;
2. address semantic node names `R_TIME0 / R_TIME1 / R_TIME2 / R_TIME3 / R_MAP_NOTE`;
3. require exactly one visible match per role;
4. load fonts and write;
5. read back the visible characters;
6. only after successful readback run screenshot/structure QA.

## Verification

Corrected AT4 `2409:37` visible readback:

- `R_TIME0 = 朝`
- `R_TIME1 = 昼`
- `R_TIME2 = 午後`
- `R_TIME3 = 夜`
- `R_MAP_NOTE = 朝から夜まで。寄り道しながら、横浜をゆっくり歩く。`

Subsequent exact-time probe returned `0`; 500 / 1400 / 1587×1123 visual QA passed.

## Applicability

Use this lesson when cloned/rollback-heavy Figma frames can contain hidden duplicate text nodes. Character matching is still acceptable when uniqueness is first proven; semantic role-name targeting is safer for repeated production labels.

Do not promote beyond `VERIFIED_LOCAL` until the same failure class is reproduced or independently avoided in another meaningful Figma operation.
