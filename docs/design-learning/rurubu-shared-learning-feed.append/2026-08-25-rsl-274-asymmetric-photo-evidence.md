# RSL-274 — Asymmetric source truth can require asymmetric photographic coverage

Date: 2026-08-25
Source scope/item: Rurubu WEDDING / V7 Memory+Guide G9→G10

State: `VERIFIED_LOCAL_DESIGN / HIRES-ASSET-BLOCKED → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-274-UNVERIFIED-PLACE-DUMMIES-FORCE-SYMMETRIC-PHOTO-COVERAGE-WHEN-SOURCE-EVIDENCE-IS-ASYMMETRIC`

## Visible problem

A multi-place Memory/Guide spread had grounded native copy for `沖縄 → 韓国 → ハワイ → 横浜`, but the available verified photography was not equally authoritative for all four places. G9 still visually filled several place beats with unrelated structural dummies. Even where copy/photo caption ownership had been separated, the spread-level impression could still imply that every place had documentary visual evidence.

## Root-cause hypothesis

Editorial completeness was being simulated as **photo parity**. When source truth is asymmetric, forcing equal photographic coverage can be less truthful and more AI/template-like than allowing some destinations to remain typographic beats.

## Professional input

Travel-photo storytelling and picture editing do not require the principal subject or an image in every beat. Scene setters, people, details and transitions should be selected because they perform a story job. The transferable decision principle is to match photographic presence to evidence and editorial role rather than to module count.

## Bounded experiment

On rollback-safe V7 G10 `2563:35`:

- retain all grounded/variable native copy;
- replace the large opening dummy with verified real-couple Hawaii `036.jpg` screen evidence;
- use verified real-couple Hawaii `004.jpg` only for the Hawaii guide beat;
- explicitly state neither image is proposal-specific evidence;
- withhold unrelated secondary / Okinawa / Yokohama place dummies;
- preserve V7's 01–04 scan rhythm through type and spatial variation rather than fake one-photo-per-place completeness.

No new factual copy, card, decorative filler, fake map, generated place image or photo-caption claim was added.

## Evidence

Figma:
- current G10 `2563:35`;
- hidden rollback G9 `2443:2`;
- authority page `2052:2`.

Image truth:
- 036 screen derivative hash `c80602f1881db70f3a005651f982a0f38b294a9d`, intrinsic `350×233`, displayed `650×370`;
- 004 screen derivative hash `b77012f2eb0a832acfe6fecd883775832ba029c6`, intrinsic `350×233`, displayed `420×250`.

Three-scale result:
- 500px: PASS;
- 1400px: PASS;
- 1587×1123: DESIGN COMPOSITION PASS / HIRES PHOTO QA BLOCKED.

Structure:
- visible native text `20`;
- text intersections `0`;
- 18px edge risks `0`.

Git evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-G10-MEMORY-ASYMMETRIC-VERIFIED-PHOTO-EVIDENCE-QA-2026-08-25.md`.

## What this does NOT mean

- Do not globally remove photos from multi-place spreads.
- Do not infer that verified Hawaii couple photography proves the proposal event.
- Do not reuse G10's coordinates, 01–04 typography, palette or photo ratios elsewhere.
- Do not treat the 350×233 screen derivatives as print-ready assets.

## Transfer hypothesis

When another editorial artifact contains several semantic beats but verified visual evidence exists for only some of them, test whether **asymmetric evidence density** is stronger and more truthful than filling every beat with generic/structural imagery. Preserve navigation and rhythm with typography, sequence, whitespace or other legitimate media; add photos only where the source and editorial job justify them.

A receiving item must independently verify that the reduced/asymmetric image coverage improves whole-item rhythm rather than merely creating empty space.
