# ADD-04 受付サイン — Factual Date Lane QA

Date: 2026-08-23
Status: `VERIFIED_LOCAL / CURRENT_UPDATED / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`
Start main SHA: `44f2a7404c9f6131835cf321bd305ded42fee64a`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- groom Current: `33:2 / VNEXT_PRO_ADD04_GROOM_ARRIVAL_FAN_SELECTED`
- bride Current: `33:15 / VNEXT_PRO_ADD04_BRIDE_ARRIVAL_FAN_SELECTED`
- long-copy stress: `38:26 / 38:38`
- exact Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`
- Drive authority was live-read back before Git evidence write; Drive write `0`.

## Visible defect

The confirmed factual line `2026.10.24 · YOKOHAMA` was native text, but it sat at `x=466 / y=970 / 15px` directly on the right angled paper-fan field. At live reading scale the slanted top edge of the fan crossed the text's visual field, so part of the label read over color while another part approached the cream background. The text technically remained inside the root, but its contrast/support was optically unstable and the factual anchor looked smaller and less intentional than the rest of the reception hierarchy.

This was not an image-asset problem and did not justify a clean-room rebuild. It was a bounded typography/fixed-art interaction defect in the otherwise preferred ARRIVAL FAN Current.

## Bounded comparison

Two rollback-safe groom comparisons were created without changing Current:

1. `42:2 / REJECTED / ADD-04 DATE ON ANGLED FAN / 2026-08-23`
   - kept the date on the fan;
   - enlarged `15px → 18px` and widened its lane;
   - rejected because the angled fan boundary still crossed the factual line and made the contrast split more obvious.

2. `42:14 / VERIFIED / ADD-04 DATE ON CREAM FACTUAL LANE / 2026-08-23`
   - moved only the factual date/location role to stable cream paper at `x=56 / y=835`;
   - changed to Inter Bold `18px`, ocean navy;
   - preserved the fan artwork, reception copy, name/guidance hierarchy, size and all semantics.

Candidate 2 clearly improved whole-item and reading-scale clarity without turning the date into a badge or new UI field.

## Promotion / rollback

Exact pre-change rollback copies were preserved before Current mutation:

- groom Current rollback: `42:26`
- bride Current rollback: `42:38`
- groom stress rollback: `42:50`
- bride stress rollback: `42:62`

Current + stress date roles were then synchronized:

- groom date `39:27`
- bride date `39:53`
- groom stress date `38:37`
- bride stress date `38:49`

Final role contract:

- native text: `2026.10.24 · YOKOHAMA`
- Inter Bold `18px`
- `x=56 / y=835 / w=360`
- `textAutoResize=HEIGHT`
- ocean-navy factual text on the stable cream paper field

The rejected/verified comparison frames were moved off production into the professional-reopen study page and hidden.

## Screenshot QA

- groom Current reading scale: PASS; the factual line now reads as a deliberate lower editorial anchor and no longer crosses a changing color boundary.
- bride Current pair logic: structurally synchronized with the same factual lane.
- groom realistic long-copy stress: PASS; long name + multi-line guidance still leave clear vertical reserve before the factual line and fan artwork.
- whole-item hierarchy remains `受付 → 新郎側/新婦側 → welcome → name/guidance → factual date/location → celebratory fan`.

## Structure QA

Post-change readback:

- groom Current `33:2`: native text `8`, auto-height `8/8`, fixed-height `0`, outside `0`, IMAGE fills `0`;
- bride Current `33:15`: native text `8`, auto-height `8/8`, fixed-height `0`, outside `0`, IMAGE fills `0`;
- groom stress `38:26`: native text `8`, auto-height `8/8`, fixed-height `0`, outside `0`, IMAGE fills `0`;
- bride stress `38:38`: native text `8`, auto-height `8/8`, fixed-height `0`, outside `0`, IMAGE fills `0`.

No variable or factual copy was rasterized. No SVG, generated image, or Drive asset was added.

## Learning status

`VERIFIED_LOCAL` application of an existing general principle: a native factual role can be structurally inside bounds yet still fail when fixed art creates an unstable contrast/support field beneath it. The transferable QA method is to inspect native variable/factual copy against non-text fixed art at whole/reading scale, not only text-vs-text collision metadata.

Do **not** promote a new project rule from this one item. The exact cream lane, font size, fan geometry, colors and y-position are ADD-04-specific.

## Deferred finalization

Unchanged:

- final optional reception name/guidance copy;
- tabletop holder lower-edge occlusion;
- venue lighting/glare and real viewing distance;
- final printer template / bleed / stock / physical proof.
