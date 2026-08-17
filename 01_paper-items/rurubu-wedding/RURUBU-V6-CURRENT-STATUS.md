# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AD_CURRENT / INSIDE_DC_DE_PREFERRED_STUDIES / BACK_TITLE_DIRECT_PHOTO_VERIFIED / CHRONOLOGY_PHOTO_CASCADE_VERIFIED / Q02_Q03_BINDING_STRIP_RETAINED_AFTER_REJECTED_DIRECT_PHOTO_TEST / QA_Q02_Q03_REALISTIC_COPY_STRESS_VERIFIED / NATIVE_VARIABLE_TEXT_RESILIENCE_VERIFIED / CHRONOLOGY_INTRINSIC_GATE_VERIFIED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Fresh live readback confirms the preferred V6 set:

- Outer AD `1626:99` — `PREFERRED / V6_OUTER_AD_BACK_TITLE_DIRECT_PHOTO_2026_08_17`;
- Profile / Q&A DC `1618:2` — `PREFERRED / V6_INSIDE_DC_QA_PHOTO_INTEGRATED_2026_08_17`;
- Story / chronology DE `1624:18` — `PREFERRED / V6_INSIDE_DE_CHRONOLOGY_PHOTO_CASCADE_2026_08_17`.

Immediate rollback / rejected evidence:

- Outer AC `1614:2` — hidden rollback after AD promotion;
- Story / chronology DB `1615:2` — hidden rollback after DE promotion;
- Q&A DF `1626:18` — hidden rejected direct-photo-text comparison because contrast weakened;
- DC realistic-copy proof `1619:2` — hidden after PASS;
- older rollback-safe comparisons and copy stresses remain preserved.

V7 was not edited.

## AD — back-cover title integrated into dominant photography

### Visible problem

AC still used a large navy title field over a valid travel-flatlay photograph. The page was readable, but the field created a false panel/header section and reduced the photograph-first magazine feeling.

### Bounded treatment

AD was created from a rollback-safe AC duplicate.

- hid only the large `V6_A_BACK_NAVY_FIELD`;
- retained the yellow `TRAVEL LOG` kicker;
- moved the existing native back title/subtitle directly onto the verified flatlay photo;
- changed those native texts to white with restrained shadow for contrast;
- preserved cafe photo, skyline support, back timeline, WEDDING terminal, fold, front cover and all image hashes;
- added no generated asset, Drive save, external binary, card or gradient.

### QA

- whole outer 1200×849: PASS;
- back actual-size `1626:100` at 794×1123: PASS;
- native text: 23;
- image roles: 3;
- text collisions: 0;
- 18px text safe-area risks: 0.

Result: `AD VERIFIED_LOCAL / PREFERRED`.

## DC — Q02/Q03 photo-integrated editorial beat retained

DC remains preferred from the prior run.

A new bounded DF comparison tested whether the Q02/Q03 navy strip could also be removed. DF placed the same native white Q02/Q03 copy directly on the dining photo. The bright table area weakened actual visual contrast, so DF was rejected and hidden.

This verifies that DC's bounded navy strip currently performs a real contrast/binding function rather than merely decorative containment.

DC retained evidence:

- whole spread: PASS;
- Q&A actual-size `1618:42` at 794×1123: PASS;
- native Q&A text: 26;
- text collisions: 0;
- 18px safe-area risks: 0;
- dedicated Q02/Q03 realistic-copy stress `1619:2`: PASS.

Result: `DC VERIFIED_LOCAL / PREFERRED`; DF `REJECTED`.

## DE — chronology photo cascade + photo-carried title

### Visible problem

DB chronology still read partly like an information UI. A large navy title panel separated the hero photograph from the lower chronology, while 01/03/05 remained rectangular modules and 02/04 occupied a separate side rail.

### Bounded treatment

DE was created from a rollback-safe DB duplicate.

- removed only the large chronology title panel;
- placed the native title/deck directly on the verified hero photograph in white text with restrained shadow;
- preserved the yellow `TRAVEL TIMELINE` kicker;
- enlarged/repositioned the existing replaceable Event 01 / 03 / 05 photo roles into an asymmetric cascade;
- retained Event 02 / 04 as quieter native side notes;
- retained WEDDING as the strong terminal beat;
- added no generated image, Drive asset, card or new raster bytes.

### Intrinsic-source failure caught before final acceptance

The first DE layout used Event 03 at `390×260`, but source readback showed only `352×368`.

That intermediate state failed the intrinsic-display-role gate and was not accepted. Event 03 was corrected to `350×260`, with its native number/date/title stack re-aligned.

Final intrinsic readback:

- timeline texture: display `230×540`, source `720×860`;
- hero: display `801×430`, source `944×608`;
- Event 03: display `350×260`, source `352×368`;
- Event 01: display `515×260`, source `1356×560`;
- Event 05: display `340×185`, source `732×498`;
- intrinsic violations: 0.

### Final QA

- whole spread 1200×849: PASS;
- chronology actual-size `1624:43` at 794×1123: PASS;
- native text: 31;
- visible raster roles: 5;
- text collisions: 0;
- 18px text safe-area risks: 0;
- intrinsic violations: 0.

Result: `DE VERIFIED_LOCAL / PREFERRED`.

## Native text resilience retained

AD/DC/DE preserve the existing editable-text contract:

- profile values remain native editable text;
- Q01–Q06 questions/answers remain native text;
- Q04 remains a native auto-height stack;
- Story text remains native;
- chronology Event 01–06 date/title/copy remain native stacks;
- the chronology title/deck remain native even though they now sit on photography;
- back-cover title/subtitle remain native even though the large navy field was removed.

Future final-copy replacement still requires fresh realistic-copy / actual-size validation where geometry or line breaks materially change.

## Active raster reconciliation

No image source/hash was changed in this run.

The current book keeps the previously reconciled active image set, with DE chronology geometry receiving a fresh role-level intrinsic audit after resizing.

- new image hashes: 0;
- generated section assets adopted: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster bytes: 0;
- DE chronology visible raster roles: 5 / intrinsic-safe 5/5;
- AD back-cover image geometry changed: NO;
- DC image sources/hashes changed: NO.

The prior whole-book reconciliation remains the source/hash baseline:

- `01_paper-items/rurubu-wedding/RURUBU-V6-AA-CX-CY-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`.

## Drive / generated section masters

Fresh Drive readback confirms the V6 root remains live:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted. No known quality-preserving binary-placement capability changed, so previously failed transport methods were not repeated for activity.

## Latest evidence / learning

Primary evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AD-DC-DE-QA-PHOTO-CASCADE-2026-08-17.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-ad-de-photo-cascade-and-title-panel-subtraction.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-081-photo-type-contrast-gate.md`.

Latest learning:

- RSL-080 — bind floating repeated copy to an already-valid photo anchor before adding another card system: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-081 — photo-carried native type is a bounded subtraction option only when contrast and intrinsic-source gates pass; retain a field when its contrast/binding function is proven: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific photos, palette, title wording, cascade coordinates, milestone geometry and editorial grammar do not transfer.

## Asset lifecycle truth for this run

- newly image-generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- existing replaceable chronology photos resized/repositioned: YES;
- chronology intrinsic violation detected during experiment: YES;
- chronology intrinsic violation corrected before final adoption: YES;
- back-cover image geometry changed: NO;
- variable copy remains native: YES;
- photo replaceability preserved: YES;
- screenshot / actual-size QA: PASS;
- rollback preserved: YES;
- rejected comparison preserved hidden: YES;
- V7 touched: NO.

## Completion gate

Do not call V6 complete or print-ready until:

- AD + DC/DE cohere with final legitimate photography and final personal copy as one magazine system;
- final personal copy receives fresh actual-size / realistic-copy stress where needed;
- any future replacement photo revalidates crop, semantic role, overlay contrast and intrinsic quality;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 AD + DC/DE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / BACK_TITLE_DIRECT_PHOTO_VERIFIED / CHRONOLOGY_PHOTO_CASCADE_VERIFIED / Q02_Q03_BINDING_FUNCTION_VERIFIED / NATIVE_TEXT_EDITABILITY_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare AD + DC/DE as one magazine and target the next region that still reads as a template rather than a finished Japanese travel-information magazine.
3. Do not remove DC's Q02/Q03 strip merely for visual subtraction; it now has evidence-backed contrast/binding value.
4. When strengthening a photo role, rerun intrinsic-source and actual-size QA before promotion.
5. Prefer final legitimate photography when available and revalidate crop/contrast/semantics after replacement.
6. Replace dummy native copy with final personal copy and rerun targeted copy stresses.
7. Keep generated section masters unadopted until quality-preserving placement and actual-size QA are possible.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
