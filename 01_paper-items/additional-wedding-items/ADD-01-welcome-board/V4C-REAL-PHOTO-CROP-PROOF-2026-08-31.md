# ADD-01 — V4C real-photo crop proof — 2026-08-31

Status: `REAL_PHOTO_SOURCE_CROP_QA_PASS / FIGMA_IMPORT_STILL_BLOCKED / SELLABLE_VISUAL_QA_IN_PROGRESS / NOT_PROMOTED / NOT_PRINT_READY`

Pre-write latest `main`: `f9266b9174c67e8aa8bdbe446c3e728a664730c1`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Scope: non-Rurubu `ADD-01 ウェルカムボード` only.

## Live authority readback before this write

- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- page: `24:2 / V4_CLEANROOM_ADD01_WELCOME_2026_08_28`
- V4C root: `61:2 / V4C / ADD-01 / COASTAL EDITORIAL SPREAD / CLEANROOM / PHOTO-LED`, `852×1200 px`, visible
- replaceable photo role: `61:7 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED / LANDSCAPE 720x440 / SUBJECT-RIGHT`, `720×440 px`, visible
- current `61:7` fill remains a solid placeholder; no production IMAGE fill was left behind
- exact ADD-01 Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- real-photo source: `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg`
- Drive file id: `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P`
- source metadata re-read this run: JPEG, `5,266,253 bytes`; authoritative source dimensions remain `4500×3000 px`

No Rurubu node/path/asset was read or edited.

## New crop proof

The exact real JPEG was materialized locally from Drive and inspected directly rather than judging the teal Figma placeholder.

V4C photo role aspect ratio:

- target `61:7`: `720 / 440 = 1.63636…`
- source: `4500 / 3000 = 1.5`

A centered `FILL` crop therefore keeps the full `4500 px` source width and requires `2750 px` source height. The exact crop removes only:

- `125 px` from the top; and
- `125 px` from the bottom.

Resulting source crop: **`4500×2750 px`**.

Direct visual inspection of that exact crop confirms:

- both people remain fully visible;
- heads, hands, dress hem and shoes remain inside the crop;
- the intended subject-right placement is preserved;
- the left-side sky / palm / water negative space remains substantial;
- no horizontal crop is required, so the source's environmental storytelling is retained;
- the crop does not force the couple toward an edge or create an accidental limb cut.

This closes the previously unverified question of whether the known real source itself can survive V4C's landscape geometry. It does **not** close the Figma import blocker and is not a substitute for an in-Figma final photo proof.

## Effective PPI / print scenarios

Final physical size remains unconfirmed, so these remain scenario calculations rather than production authority.

Using the exact `4500×2750 px` crop:

- A3 portrait scenario (`297×420 mm`): `61:7` ≈ `251.0×153.4 mm` → effective PPI ≈ **455 ppi**;
- A2 portrait scenario (`420×594 mm`): `61:7` ≈ `354.9×216.9 mm` → effective PPI ≈ **322 ppi**.

Both scenarios remain above the preferred 300 ppi threshold. `RESOLUTION_WARNING` is therefore **not indicated by the known source/crop in these scenarios**, but final production status stays `DEFERRED_FINALIZATION` until the authoritative physical size and actual placed crop are fixed.

No low-resolution proxy is treated as final-production evidence.

## Actual-size type / physical conditions

No Figma typography or geometry changed in this proof run, so the existing V4C scenario values remain:

- A3: hero ≈ `63.2 pt`; names ≈ `33.6 pt`; message ≈ `21.7 pt`; eyebrow ≈ `17.8 pt`; date caption ≈ `15.8 pt`;
- A2: hero ≈ `89.4 pt`; names ≈ `47.5 pt`; message ≈ `30.7 pt`; eyebrow ≈ `25.2 pt`; date caption ≈ `22.4 pt`.

Final trim / bleed / safe geometry is still unknown; no guessed 3 mm bleed is introduced. Stand/easel/frame occlusion remains deferred. QR, punch, perforation, fold and handwriting fields are not applicable to ADD-01.

## Figma upload route status

A fresh supported upload URL was issued against exact node `61:7`, but POST of the locally materialized JPEG again stopped before transfer because `mcp.figma.com` could not be DNS-resolved from the execution HTTP client. No partial mutation survived.

Because this is the already-known transient network failure, repeated upload attempts were stopped. The useful new evidence in this run is the **exact-source crop proof**, not another blocker claim.

## CMYK / remaining production risks

The exact crop contains bright blue sky/water, green foliage, skin tones, a yellow dress, brown suit, pale clouds/highlights and beach neutrals. These remain profile/stock-sensitive and require final CMYK proof. Deep-ink/coral/sand/warm-paper fields in the Figma composition likewise require profile proof and grayscale hierarchy review.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory. Still deferred:

- real JPEG actually rendered in `61:7` and three-scale in-Figma comparison;
- authoritative final physical size;
- printer template, trim/bleed/safe and stock;
- stand/easel/frame occlusion and viewing-distance proof;
- CMYK/profile, black construction and grayscale proof;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% or physical proof.

## Decision

`REAL_PHOTO_SOURCE_CROP_QA_PASS` is now verified for V4C. The known 4500×3000 source is compositionally compatible with the 720×440 subject-right photo role and remains resolution-safe in the current A3/A2 scenarios without upscaling.

Do **not** promote to `SELLABLE_VISUAL_QA_PASS` yet: the actual photo still has to render inside Figma so thumbnail / reading / actual-size hierarchy, color interaction and final focal-point behavior can be judged in the real page composition.