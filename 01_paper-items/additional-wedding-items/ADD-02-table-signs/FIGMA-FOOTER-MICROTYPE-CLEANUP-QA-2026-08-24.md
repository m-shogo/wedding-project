# ADD-02 — Footer microtype / generic English cleanup QA — 2026-08-24

Status: `VERIFIED_LOCAL / CURRENT_UPDATED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Authority

- GitHub authority observed before first write: `main` at `0c53cb42ecb419995e17a5f4cf1259c5656ffc76`
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

A physical-unit audit also found the confirmed date under-scaled. With the provisional `100 mm` width represented by `1000 px`, the prior factual date roles were approximately:

- SINGAPORE: `19 px` ≈ `5.39 pt`
- BALI: `20 px` ≈ `5.67 pt`
- KOREA: `19 px` ≈ `5.39 pt`
- MALDIVES: `20 px` ≈ `5.67 pt`
- HAWAII: `22 px` ≈ `6.24 pt`
- ITALY: `22 px` ≈ `6.24 pt`
- JAPAN: `22 px` ≈ `6.24 pt`

HONG KONG was already `26 px` ≈ `7.37 pt` and was not enlarged.

This applies two already-promoted project rules rather than creating a new blanket style rule:

1. reader-irrelevant generic English/internal-concept labels should not remain merely as decoration;
2. factual/semantic microtype must be checked in physical units, not judged only from Figma-screen pixels.

## Bounded comparisons

Before the first production mutation, rollback-safe comparisons were created for SINGAPORE and KOREA:

- `179:2 / QA / ADD-02 SINGAPORE / NO GENERIC FOOTER + DATE 26 / 2026-08-24`
- `179:23 / QA / ADD-02 KOREA / NO GENERIC FOOTER + DATE 26 / 2026-08-24`

The comparisons changed only:

- `WEDDING JOURNEY` → hidden;
- date `19 px → 26 px`.

Whole-item and reading screenshots were stronger: the footer no longer looked like a generic travel-template signature, and the confirmed date became physically more credible without competing with destination/table hierarchy.

Fresh screenshots of HONG KONG, BALI and MALDIVES independently showed the same generic footer behavior. BALI and MALDIVES also showed the same under-scaled confirmed date role.

A subsequent physical-unit pass audited the remaining same-format signs. HAWAII, ITALY and JAPAN showed the same factual-date legibility weakness at `22 px`, so those date roles were repaired independently without changing any other layout or visual grammar.

## Rollback

Full hidden pre-change rollback roots were created before production mutation.

Footer + date batch:

- HONG KONG: `180:2`
- SINGAPORE: `180:19`
- BALI: `180:40`
- KOREA: `180:55`
- MALDIVES: `180:74`

Date-only follow-on batch:

- HAWAII: `182:2`
- ITALY: `182:16`
- JAPAN: `182:29`

No existing Current root was deleted or replaced.

## Adopted Current change

Production roots remain stable.

Generic-footer cleanup:

- HONG KONG `2:56`: `WEDDING JOURNEY` hidden; date remains `26 px`.
- SINGAPORE `2:65`: `WEDDING JOURNEY` hidden; date `19 → 26 px`.
- BALI `2:74`: `WEDDING JOURNEY` hidden; date `20 → 26 px`.
- KOREA `2:83`: `WEDDING JOURNEY` hidden; date `19 → 26 px`.
- MALDIVES `2:92`: `WEDDING JOURNEY` hidden; date `20 → 26 px`.

Date-only actual-size repair:

- HAWAII `2:2`: date `22 → 26 px`.
- ITALY `2:11`: date `22 → 26 px`.
- JAPAN `2:47`: date `22 → 26 px`.

Destination names, Japanese labels, table-number cues, theme placeholders, description placeholders, layout skeletons, color fields and fixed art remain unchanged.

FRANCE / SPAIN / TAIWAN were not mechanically normalized. Their existing date roles are `24 / 23 / 24 px` and remain item-specific pending any screenshot-supported defect or physical proof.

## Three-scale / structure QA

Fresh post-change screenshot review:

- SINGAPORE: PASS; larger date remains subordinate and fits its yellow paper role.
- BALI: PASS; footer is cleaner and date remains inside the lower terracotta field.
- KOREA: PASS; beige date paper remains balanced without generic footer copy.
- MALDIVES: PASS; coral footer reads cleaner and date is more robust.
- HONG KONG: generic footer removed; existing 26 px date retained.
- HAWAII: PASS after `22 → 26`; date remains subordinate inside the coral lower field.
- ITALY: PASS after `22 → 26`; date remains quiet but visibly more credible at the bottom of the warm paper field.
- JAPAN: PASS after `22 → 26`; enlarged date remains subordinate and does not compete with the large Japanese destination hierarchy.

Post-change live readback:

HONG KONG / SINGAPORE / BALI / KOREA / MALDIVES:

- visible native text: `6` each;
- fixed-height visible text: `0` each;
- outside visible text: `0` each;
- IMAGE fills: `0` each;
- `WEDDING JOURNEY`: hidden on all five;
- confirmed date: `26 px` on all five.

HAWAII / ITALY / JAPAN:

- visible native text: `6` each;
- fixed-height visible text: `0` each;
- outside visible text: `0` each;
- IMAGE fills: `0` each;
- confirmed date: `26 px`, `textAutoResize=HEIGHT`.

The current family remains fully native/editable and no variable/factual copy was rasterized.

## Asset / Drive decision

- image generation: `0`
- Drive write: `0`

The diagnosed defects were editorial hierarchy and actual-size typography, not missing photography/illustration. Adding generated art would not solve them.

## Transfer boundary

Do **not** mechanically delete every English phrase or force every date in the 11-sign family to one size. The receiving test is role-based: does the English have a reader-facing job, and is factual text credible at the intended physical scale? France/Spain/Taiwan retain their current role-specific treatment until evidence says otherwise.

## Deferred finalization

Keep `NOT_PRINT_READY` until final theme copy, exact stand/holder obstruction proof, vendor bleed/safe template, stock/profile, venue-lighting review and physical proof exist.
