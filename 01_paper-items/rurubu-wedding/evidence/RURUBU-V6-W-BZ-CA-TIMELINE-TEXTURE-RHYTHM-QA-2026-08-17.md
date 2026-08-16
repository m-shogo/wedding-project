# RURUBU V6 W + BZ/CA — Timeline Texture + Rhythm QA

Date: 2026-08-17
Scope: Rurubu WEDDING only. V7 remains HOLD.

## Live preferred
- Outer W: `1491:2` unchanged.
- Profile/Q&A BZ: `1514:2` unchanged.
- Story/Chronology CA: `1517:2` — `PREFERRED / V6_INSIDE_CA_TIMELINE_TEXTURE_RHYTHM_2026_08_17`.
- Start Here: `V5 FU/FX · V6 W + BZ/CA INSIDE STUDIES · V7 HOLD`.
- Rollback BY: `1510:2` hidden as `ROLLBACK_HIDDEN / V6_INSIDE_BY_PRE_CA_2026_08_17`.

## Visible problem
BY chronology had valid hierarchy and replaceable photography, but the middle cream field still broke into isolated text-only support events. `02` and `04` read as separate annotations rather than part of one editorial journey.

## Bounded test — BY → CA
No new generated asset, external binary or photo was added.

- reused the already-verified Rurubu composed travel texture hash `691a6ceed471a5d8efa144052a10564eed177b4f` as a bounded timeline background only;
- timeline texture display `430×505`, intrinsic `720×860`, opacity `0.18`;
- tightened support-event vertical rhythm;
- moved event 03 feature and event 05 feature upward to form a denser diagonal sequence;
- kept all event copy native text and all visible photographs as independent IMAGE roles;
- left Story geometry/content unchanged from BY.

Initial defects caught before promotion:
- event 04 magenta rule crossed the `04` number after the event was moved;
- event 02 copy intersected the moved event 03 number.

Both states were rejected and repaired before promotion. Event-number rules were realigned to the moved numbers and event 02 copy width was reduced to `170px`.

## Three-scale visual evidence
- whole spread 500px: PASS;
- whole spread 1400px: PASS;
- chronology actual-size `794×1123`: PASS.

Visual comparison: CA reduces the blank/template feel in the middle chronology field while keeping the texture subordinate to photography and native event copy.

## Structure QA
### Story page
- native text: `11`;
- visible IMAGE roles: `4` (3 replaceable photos + 1 composed texture);
- text collision: `0`;
- 18px text safe-area risk: `0`.

Intrinsic checks:
- Story texture `375×500 / 720×860` PASS;
- Story hero `820×520 / 1356×560` PASS;
- Story support-1 `238×216 / 240×220` PASS;
- Story support-2 `515×350 / 810×552` PASS.

### Chronology page
- native text: `30`;
- visible IMAGE roles: `5` (4 replaceable photos + 1 composed texture);
- text collision: `0`;
- 18px text safe-area risk: `0`.

Intrinsic checks:
- Timeline texture `430×505 / 720×860` PASS;
- feature hero `801×430 / 944×608` PASS;
- event 01 `350×190 / 1356×560` PASS;
- event 03 `300×220 / 352×368` PASS;
- event 05 `410×155 / 732×498` PASS.

## Photo-diversity audit
A same-scope Rurubu-only search found three low-reuse V5 image hashes. Two contained recognizable people and were rejected for V6 profile/story substitution because they could imply real bride/groom imagery. The remaining non-person beach image was only `270×192`, insufficient for a hero role. No weak/unsafe substitution was adopted merely to reduce repetition.

Drive `20_FIGMA_DERIVATIVES` also contained no new high-quality non-person hero alternative. Existing V6 generated section masters remain present but unadopted.

## Asset lifecycle truth
- newly generated images: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new distinct raster bytes: `0`;
- existing verified composed texture reused: `YES`;
- replaceable photo roles preserved: `YES`;
- native editable copy preserved: `YES`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Result
`W + BZ/CA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / NOT_PRINT_READY`.

Final photography, final personal copy, exact printer template, PDF preflight and physical proof remain outside this pass.