# ADD-02 — Footer microtype / generic English cleanup QA — 2026-08-24

Status: `VERIFIED_LOCAL / CURRENT_UPDATED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Authority

- GitHub authority observed before write: `main` at `0c53cb42ecb419995e17a5f4cf1259c5656ffc76`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Recommended physical format from `SPEC.md`: `100 × 148 mm` postcard portrait class, with exact vendor template still deferred.

## Visible defect

Fresh actual-size review found a repeated footer issue on five Destination V4/V3 signs:

- HONG KONG `2:56`
- SINGAPORE `2:65`
- BALI `2:74`
- KOREA `2:83`
- MALDIVES `2:92`

Each displayed the small English footer `WEDDING JOURNEY`. It did not identify a real artifact, brand, destination, function, instruction, or factual role. At whole-item scale it read as generic travel-theme filler and made the signs feel more template-authored.

A physical-unit audit also found the confirmed date under-scaled on four of the five signs. With the provisional `100 mm` width represented by `1000 px`, the former date sizes were approximately:

- SINGAPORE: `19 px` ≈ `5.39 pt`
- BALI: `20 px` ≈ `5.67 pt`
- KOREA: `19 px` ≈ `5.39 pt`
- MALDIVES: `20 px` ≈ `5.67 pt`

HONG KONG was already `26 px` ≈ `7.37 pt` and was not enlarged.

This applies two already-promoted project rules rather than creating a new blanket style rule:

1. reader-irrelevant generic English/internal-concept labels should not remain merely as decoration;
2. factual/semantic microtype must be checked in physical units, not judged only from Figma-screen pixels.

## Bounded comparisons

Before production mutation, rollback-safe comparisons were created for SINGAPORE and KOREA:

- `179:2 / QA / ADD-02 SINGAPORE / NO GENERIC FOOTER + DATE 26 / 2026-08-24`
- `179:23 / QA / ADD-02 KOREA / NO GENERIC FOOTER + DATE 26 / 2026-08-24`

The comparisons changed only:

- `WEDDING JOURNEY` → hidden;
- date `19 px → 26 px`.

Whole-item and reading screenshots were stronger: the footer no longer looked like a generic travel-template signature, and the confirmed date became physically more credible without competing with destination/table hierarchy.

Fresh screenshots of HONG KONG, BALI and MALDIVES independently showed the same generic footer behavior. BALI and MALDIVES also showed the same under-scaled confirmed date role.

## Rollback

Full hidden pre-change rollback roots were created before production mutation:

- HONG KONG: `180:2`
- SINGAPORE: `180:19`
- BALI: `180:40`
- KOREA: `180:55`
- MALDIVES: `180:74`

No existing Current root was deleted or replaced.

## Adopted Current change

Production roots remain stable:

- HONG KONG `2:56`: `WEDDING JOURNEY` hidden; date remains `26 px`.
- SINGAPORE `2:65`: `WEDDING JOURNEY` hidden; date `19 → 26 px`.
- BALI `2:74`: `WEDDING JOURNEY` hidden; date `20 → 26 px`.
- KOREA `2:83`: `WEDDING JOURNEY` hidden; date `19 → 26 px`.
- MALDIVES `2:92`: `WEDDING JOURNEY` hidden; date `20 → 26 px`.

Destination names, Japanese labels, table-number cues, theme placeholders, description placeholders, layout skeletons, color fields and fixed art remain unchanged.

## Three-scale / structure QA

Fresh post-change screenshot review:

- SINGAPORE: PASS at whole/reading scale; larger date remains subordinate and fits its yellow paper role.
- BALI: PASS at whole/reading scale; footer is cleaner and date remains inside the lower terracotta field.
- KOREA: PASS at whole/reading scale; the beige date paper remains balanced without generic footer copy.
- MALDIVES: PASS at whole/reading scale; coral footer reads cleaner and date is more robust.
- HONG KONG: generic footer removed; existing 26 px date retained.

Post-change live readback on all five roots:

- visible native text: `6` each;
- fixed-height visible text: `0` each;
- outside visible text: `0` each;
- IMAGE fills: `0` each;
- `WEDDING JOURNEY`: hidden on all five;
- confirmed date: `26 px` on all five.

The current family remains fully native/editable and no variable/factual copy was rasterized.

## Asset / Drive decision

- image generation: `0`
- Drive write: `0`

The diagnosed defect was editorial hierarchy and actual-size typography, not missing photography/illustration. Adding generated art would not solve the issue.

## Transfer boundary

Do **not** mechanically delete every English phrase or force every date in the 11-sign family to one size. France/Spain/Taiwan/Hawaii/Italy/Japan have different physical roles and layout skeletons. Apply the reader-job and actual-size tests per sign.

## Deferred finalization

Keep `NOT_PRINT_READY` until final theme copy, exact stand/holder obstruction proof, vendor bleed/safe template, stock/profile, venue-lighting review and physical proof exist.
