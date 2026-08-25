# RURUBU V7 — K7 Profile sequence-pacing QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Start main: `acc526703d27e9247b7ebb343232cc07df36ae21`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Professional research observation

Fresh publication-design research focused on **sequence / rhythm / pacing across a book or magazine**, not isolated page polish.

Useful principle extracted:

- a publication can change pace intentionally rather than repeating the same visual opening grammar on adjacent spreads;
- the change should still create a strong beat, not merely become quieter;
- image/type decisions should be judged in sequence because repeated image roles can flatten a publication even when each spread works alone.

This was treated as an observation and tested locally rather than promoted as a general rule.

## Live problem

Current V7 Outer C8 `2381:2` and Profile K5 `2516:2` used the exact same still-life image hash in a dominant opening role:

- C8 `2381:3 / PHOTO / V7_BACK_TRAVEL_STILL_LIFE_ROLE_DUMMY`
- K5 `2516:3 / PHOTO / V7_PROFILE_MAIN_DUMMY`
- shared hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`

The two pages were individually readable, but in publication sequence the repeated flower/camera image made the Profile opening read like reuse of the Outer template rather than a new editorial beat.

## Bounded experiments

### K6 `2541:2` — rejected

- cloned K5 rollback-safely;
- hid the repeated main dummy;
- expanded the existing coral field across the full left-page opening;
- moved only the already-used real-couple `004.jpg` screen derivative to a small supporting role without enlarging it beyond `250×130`;
- preserved all profile facts, `回答待ち`, Q&A, palette and right-page structure.

Result: repetition disappeared, but at 500 px the coral field was too passive and the opening lost V7 energy.

Decision: `REJECTED / insufficient typographic beat`.

### K7 `2541:50` — adopted

K7 keeps K6's sequence change but strengthens the typographic beat rather than restoring the repeated photo:

- main repeated dummy stays hidden;
- coral opening remains full-width on the left page;
- `旅するふたり、6つのこと。` increased from 32 px to 42 px with 52 px leading;
- `次は、どこへ / 行こう。` increased from 24 px to 27 px;
- real-couple `004.jpg` screen derivative remains a small `250×130` supporting beat, not a hero;
- `036.jpg` remains the lower small couple snapshot;
- no new factual copy, card, pill, gradient, shadow, generated image, Drive write or new image hash.

## Three-scale QA

K7:

- whole-item / 500 px: PASS and stronger than K6;
- reading / 1400 px: PASS;
- actual-size / 1587×1123: DESIGN QA PASS;
- native text: `26`;
- visible IMAGE fills: `4`;
- text intersections: `0`;
- 18 px edge risks: `0`;
- Japanese→Inter mismatch: `0`;
- repeated C8 opening hash visible in K7: `false`;
- parent: `2052:2`.

The two real-couple snap derivatives are each intrinsic `350×233`; K7 does not enlarge the moved `004.jpg` role beyond the previous `250×130` size. High-resolution/final-personal-content gates remain separate.

## Publication-sequence check

At 500 px, the opening sequence now reads:

1. C8 Outer — photo-heavy, high-energy cover;
2. K7 Profile — coral/type-led opening with one small human evidence beat;
3. F4 Story — blue-field + chronology/photo structure.

The change creates a deliberate photo → type/color → story/time rhythm rather than repeating the same still-life opening twice.

## Professional critique gate

- Art director: PASS — Profile now has a distinct idea within the same publication identity.
- Editorial designer: PASS — Profile reading order and Q&A utility are unchanged; only the opening role changes.
- Book designer: PASS — adjacent-spread pacing improves compared with C8→K5.
- Typographer: PASS — stronger type scale survives native-size QA without collisions.
- Photo editor: PASS for role logic; final photography/hi-res remains blocked.
- Print designer: DESIGN QA PASS; REAL CONTENT / printer template / proof remain blocked.

## Promotion / rollback

- **K7 `2541:50`** → current V7 Profile comparison at `x=15900 / y=13000`.
- **K5 `2516:2`** → hidden rollback at `x=300000`.
- **K6 `2541:2`** → hidden rejected evidence at `x=302000`.

## Asset truth

- image generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new image hash: `0`
- final photography adoption: `0`
- V6 change: `0`
- V8 production change: `0`

K7 is `VERIFIED_LOCAL_DESIGN / REAL-CONTENT-BLOCKED / SNAP-HIRES-BLOCKED`, not print-ready.