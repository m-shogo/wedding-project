# Rurubu WEDDING V6 — EP Cafe/Table typography-note QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / EP_PREFERRED / EL_ROLLBACK_PRESERVED / V7_HOLD / NOT_PRINT_READY`
Start GitHub authority: `9506648cdd037f01c4d3069695176d5bf19b5541`

## Authority

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- source preferred: EL `1789:2`
- promoted preferred: EP `1796:2`
- EP Table page: `1796:29`
- hidden rollback: EL `1789:2`
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- V7: HOLD / untouched

## Visible problem

Fresh six-spread same-scale review found the Cafe/Table right page weaker than the other current V6 spreads. The dominant dining photograph was strong, but the lower-right travel-object image still behaved like a separate medium photo card. Its content was useful as atmosphere but was not required evidence for the dining story, so it carried too much visual responsibility and kept a modular/template reading.

## Root-cause hypothesis

The issue was not missing imagery. A nonessential support image had been promoted to its own card-like module. However, removing it completely risked over-subtraction: Rurubu-like travel-magazine density depends on controlled supporting visual rhythm, not typography-only emptiness.

## Bounded tests

### Test A — photo removed / native type only

Rollback-safe duplicate EP `1796:2` first hid the travel-object photo and converted the role to an editable native `04` feature:

- `TABLE NOTE / 04`
- large native `04`
- `旅の余韻を、持ち帰る。`
- native short body copy

The result reduced the card/module feeling, but whole-spread review showed that the right page became too quiet and lost useful travel-magazine density. **Rejected.**

### Test B — small overlapping support photo + native 04 feature

The same verified image source was restored only as a small support thumbnail, not as a separate card:

- photo node `1796:42 / PHOTO / TABLE_NOTE_SUPPORT_REPLACEABLE`
- final geometry `175×125`, rotation about `-4°`
- image hash `e3738476f760932bb5b09c9d60f174dd6c84049d`
- native `04`/title/body remain independently editable
- dominant dining hero remains `1796:31`, `732×498`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

Actual-size review initially found the rotated support photo touching the native 04 title by about 2px. The title/body were moved down before promotion. Intentional overlap remains only with the small kicker/ordinal area; the readable title is unobstructed.

## Three-scale evidence

Final EP:

- whole / 500px: PASS; stronger than EL and stronger than the typography-only Test A
- reading / 1200px spread: PASS
- actual-size Table page `1796:29`, `794×1123`: PASS
- visible native Table text: `22`
- absolute text collision: `0`
- 18px text safe-area risk: `0`
- unintended support-photo/title contact: `0`
- visible Table IMAGE roles: `2`

The Cafe left page is unchanged from EL and retains its previous verified state.

## Promotion / rollback

- EP `1796:2` renamed `PREFERRED / V6_INSIDE_EP_CAFE_TABLE_TYPO_NOTE_2026_08_19` and moved into EL's preferred slot.
- EL `1789:2` renamed `ROLLBACK / V6_INSIDE_EL_CAFE_NUMBERED_SECOND_FEATURE_2026_08_19` and hidden.
- Start Here `845:27` updated to `V5 FU/FX · V6 EO + EK/EN + EM MEMORY SPOTS + EP CAFE & TABLE + EJ 1DAY PLAN · V7 HOLD`.
- final live readback confirmed EP visible, EL hidden, Start Here synchronized.

## Asset lifecycle truth

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- image source changes: `0`
- existing support-photo geometry changed: `YES`
- native variable text preserved: `YES`
- replaceable photo roles preserved: `YES`
- V7 touched: `NO`

## Decision

`EP_PREFERRED / VERIFIED_LOCAL`.

The transferable lesson is not “remove support photography.” It is to test the semantic responsibility of a support-photo card. If the image is not essential evidence, compare full removal against a smaller photo bound to an editable typographic beat. Over-subtraction can be worse than a restrained support image, so promotion requires whole/read/actual evidence.
