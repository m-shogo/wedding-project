# Rurubu WEDDING V6 — AA + CW/CQ Photo-led Cover / Role Diversity QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `VERIFIED_LOCAL / PROMOTED_TO_PREFERRED / V7_HOLD / NOT_PRINT_READY`

## Authority readback before work

Live Figma was re-read before mutation and matched the GitHub authority at the beginning of the visual work:

- Outer Z `1576:160` — visible preferred;
- Profile/Q&A CV `1585:2` — visible preferred;
- Story/Chronology CQ `1569:2` — visible preferred;
- Start Here — `V5 FU/FX · V6 Z + CV/CQ INSIDE STUDIES · V7 HOLD`.

Drive V6 root remained present: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No non-Rurubu item-specific Figma/Drive/asset state was inspected or edited.

## Experiment A — Outer AA

### Visible problem

Outer Z had a strong hero, but the front cover still separated the main waterfront feature from the lower support-photo pair with a relatively calm cream interval. At thumbnail scale the lower pair still read slightly as two placed modules rather than one energetic magazine cluster.

### Root-cause hypothesis

The cover did not need another sticker/card/decoration. Bringing the already-legitimate support photos upward, increasing their scale relationship, and tightening the hero/support transition should increase photo-led travel-magazine energy while preserving the same content and image hashes.

### Bounded test

Z was cloned rollback-safely to AA `1592:2`.

Front only:

- waterfront hero moved upward from `y=214` to `y=190` with size unchanged at `793.7×470`;
- pink strap / deck / feature-01 moved with the hero transition;
- dining support changed to about `533.7×320`, rotation `+1.2°`;
- cafe support changed to about `330×268`, rotation `-3.2°`;
- support images were pulled upward into a more intentional overlap/cluster;
- skyline postcard remained a separate small support beat;
- back cover was not changed;
- no new card, generated asset, external binary, raster byte, image hash, shadow, or gradient was introduced.

Initial structural QA detected two real text intersections: destination `横浜` overlapped the moved pink strap and deck. The first state was not adopted. `横浜` was moved upward to `y=40`; re-audit then returned text collision `0` and 18px text safe-area risk `0`.

### Expected improvement

- make the front cover read as one photo-led magazine composition rather than hero + separate lower modules;
- increase lower-page visual energy without reintroducing UI containers;
- retain the existing masthead, native headline, semantic photo roles, and replaceability.

### Regression risks

- title/strap collision after tightening the top transition;
- support-photo softness after enlargement;
- excessive bottom density at thumbnail scale;
- safe-area regression.

### Three-scale evidence

After correction:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- front actual-size `794×1123`: PASS.

Structure / raster QA:

- front visible native text: `12`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- hero `793.7×470` ≤ source `1356×560`;
- skyline `214×196` ≤ source `240×220`;
- dining `533.7×320` ≤ source `732×498`;
- cafe `330×268` ≤ source `810×552`;
- masthead `360×115.92` ≤ source `500×161`.

Result: `AA VERIFIED_LOCAL / PREFERRED`.

## Experiment B — Profile/Q&A CW

### Visible problem

CV was structurally strong, but the dominant visual-role assignment still repeated the waterfront hero and flatlay in several major V6 positions across the book. The Profile hero also used a location photograph while being labeled `GROOM / BRIDE`, which made the semantic relationship weaker than the rest of the page.

### Root-cause hypothesis

Before generating or transporting another asset, the existing verified V6 image hashes could be reassigned to roles where their content fits better. A travel flatlay should work better as the Profile editorial hero, the waterfront should work as a smaller travel snapshot, and the cafe still-life should work better as the Q&A `MEMORIES` hero. This should reduce dominant-photo fatigue and strengthen semantic photo-copy fit without losing replaceability.

### Bounded test

CV was cloned rollback-safely to CW `1593:2`.

Only existing verified hashes were reassigned:

- Profile main: waterfront `539c259...` → travel flatlay `e373847...`;
- Profile snapshot 1: cafe `c1ada11...` → waterfront `539c259...`;
- Q&A memory hero: flatlay `e373847...` → cafe `c1ada11...`;
- Q&A support remains dining `d76eb07...`;
- Profile snapshot 2 remains old-town `439a719...`;
- Profile snapshot 3 remains skyline `644f449...`.

The Profile image overlay label changed as native text from `GROOM / BRIDE` to `TRAVEL PROFILE`, avoiding a misleading person-role label on a travel still-life. All factual/variable page copy remains native and independently editable.

No geometry or copy changes were made to Q04–06; the existing CV realistic long-copy proof therefore remains structurally applicable to the Q&A reflow.

### Expected improvement

- reduce repeated dominant-image fatigue across V6;
- make Profile photography read as travel/favorites editorial content rather than a false person substitute;
- make the Q&A top hero read as a memory scene that better supports the existing quote;
- improve book-level image-role variety without new generation or transport risk.

### Regression risks

- photo/content semantic mismatch;
- insufficient source resolution after reassignment;
- loss of hierarchy if the new still-life hero is visually weaker;
- image/text contrast failure.

### Three-scale evidence

CW:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Profile actual-size `794×1123`: PASS;
- Q&A actual-size `794×1123`: PASS.

Structure / raster QA:

Profile:

- visible native text: `23`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- main flatlay `793.7×328` ≤ source `944×608`;
- snapshot 1 waterfront `410×280` ≤ source `1356×560`;
- snapshot 2 old-town `340×245` ≤ source `352×368`;
- snapshot 3 skyline `238×185` ≤ source `240×220`.

Q&A:

- visible native text: `26`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- route texture `470×470` ≤ source `720×860`;
- memory hero cafe `478×330` ≤ source `810×552`;
- support dining `455×370` ≤ source `732×498`.

Result: `CW VERIFIED_LOCAL / PREFERRED`.

## Promotion transaction

Fresh live authority was re-read immediately before promotion.

- Z `1576:160` → `ROLLBACK / ...`, hidden;
- CV `1585:2` → `ROLLBACK / ...`, hidden;
- AA `1592:2` → `PREFERRED / V6_OUTER_AA_FRONT_PHOTO_CLUSTER_2026_08_17`, visible;
- CW `1593:2` → `PREFERRED / V6_INSIDE_CW_PHOTO_ROLE_DIVERSITY_2026_08_17`, visible;
- CQ `1569:2` unchanged and remains preferred;
- temporary historical-raster audit board `1591:2` → hidden QA study;
- Start Here → `V5 FU/FX · V6 AA + CW/CQ INSIDE STUDIES · V7 HOLD`.

Fresh post-promotion readback confirmed AA/CW/CQ visible preferred, Z/CV hidden rollback, Start Here synchronized, active raster roles `25`, intrinsic violations `0`.

## Asset lifecycle truth

- newly image-generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- existing verified image hashes reassigned to new semantic roles: `YES`;
- existing cover photo roles recomposed: `YES`;
- native variable/factual text preserved: `YES`;
- image roles remain independently replaceable: `YES`;
- screenshot / actual-size QA: `PASS`;
- structure / safe-area QA: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Result / limits

`V6 AA + CW/CQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

Final legitimate photographs, final personal copy, exact printer template, PDF preflight, and physical proof remain outstanding. No completion or print-ready claim is made.