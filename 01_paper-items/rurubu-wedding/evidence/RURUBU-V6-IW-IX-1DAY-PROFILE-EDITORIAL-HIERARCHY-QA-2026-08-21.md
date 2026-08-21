# Rurubu WEDDING V6 — IW / IX editorial hierarchy QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Authority read before production writes

The run re-read the shared learning system, Rurubu shared feed, neutral non-Rurubu shared feed, AI-assisted Figma Hybrid Authoring policy, Rurubu Production Operating System V2, V6 guardrails/postmortem, Magazine Editorial Design Knowledge Base, current V6 status, live Figma preferred nodes, and Drive V6 root. Non-Rurubu item-specific Figma/Drive/ledger/assets were not inspected or edited.

## Common-scale review

The live preferred set at run start was `IU + IP + IR + IV + IT + IM`.

At 500 px whole-spread scale:

- IU, IR, IV and IT retained strong photo-led hierarchy.
- IM 1DAY still read partly as a lower-half tile grid: Stop 03 and Stop 04 each owned a separate rectangular module despite unequal sizing.
- IP Profile still read partly as `large photo + narrow fact sidebar`; the lack of cards did not remove the web/sidebar role geometry.

The run therefore tested materially different rollback-safe candidates instead of polishing the newest pages by default.

---

## IW — Yokohama 1DAY dominant street + dinner postcard

### Visible problem

IM `2087:2` had already removed the route rail and used unequal photography, but the lower-right page still resolved into discrete Stop 03 and Stop 04 rectangles. At thumbnail scale this retained a mild 2×2/dashboard reading.

### Root-cause hypothesis

The problem was not missing photography or insufficient decoration. The lower roles still had independent rectangular ownership. One dominant image with a smaller overlapping support image should create a more editorial photo sequence while native stop numbers/times preserve chronology.

### Bounded clean-room test

Duplicated IM to IW candidate `2131:2`, keeping the left 1DAY page unchanged.

Right page `2131:33` changes:

- Stop 03 street photo: `360×220 → 560×292`, positioned as the dominant lower photographic beat.
- Stop 04 dining photo: `366×200 → 280×176`, repositioned as an overlapping postcard/support beat.
- Existing Stop 03/04 number, time, title, copy and metadata stayed native and were repositioned around the new photographic hierarchy.
- No new card, rail, gradient, shadow, image, generated asset or image hash was added.
- Existing verified replaceable photo fills were preserved.

### First QA repair

Initial structure QA found two 18 px safe-area failures:

- folio bottom reserve: `12 px`;
- Stop 04 metadata right reserve: `8.7 px`.

Repair:

- folio y: `1098 → 1090`;
- Stop 04 metadata width: `285 → 265`.

The candidate was not promoted until the safe-area audit was clean.

### Three-scale result

- whole spread / 500 px: PASS; lower half reads as one dominant street field with a smaller dinner postcard rather than two peer tiles.
- reading / 1400 px: PASS; stop order, times and captions remain clear.
- actual right page / `794×1123`: PASS; crop, title/copy readability and overlap are plausible.

Final structure QA, right page:

- visible native text: `24`;
- IMAGE-fill nodes: `4`;
- text intersections: `0`;
- 18 px safe-area risks: `0`;
- whole-page flattening: NO;
- native copy/editability preserved: YES;
- replaceable image roles preserved: YES.

### Promotion

- adopted preferred: IW `2131:2 / PREFERRED / V6_INSIDE_IW_1DAY_DOMINANT_STREET_POSTCARD_2026_08_21`, live x=`275600`, y=`1300`;
- hidden rollback: IM `2087:2`, x=`284800`, y=`1300`.

Decision: `IW ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

---

## IX — Profile wide hero + compact fact band

### Visible problem

IP `2096:2` left profile used a strong main camera/travel image, but six facts were stacked in a narrow x≈542 column beside it. Even without cards, the page still read partly like a web page with a factual sidebar.

### Root-cause hypothesis

UI/sidebar feeling can be produced by role width and vertical ownership, not only boxes. Making the travel image a full-width editorial field and regrouping the same native facts into a compact multi-column band should preserve density while producing a print-magazine reading path.

### Bounded clean-room test

Duplicated IP to IX candidate `2132:101`; Q&A right page was preserved unchanged.

Left page `2132:102` changes:

- main camera/travel image: `520×640 → 793.7×500`, becoming a full-width hero field;
- quote retained on the hero;
- `ふたりの旅プロフィール` moved below the hero as the information-section heading;
- the six existing native facts were regrouped into a `3 columns × 2 rows` editorial fact band;
- lower waterfront and street photographs remained existing verified replaceable fills and were rebalanced as a photo collage;
- `03 次の旅へ。` became the editorial close beside the collage;
- no new asset or image hash was introduced.

### Failure / correction

The first candidate render exposed a real relocation regression: `ふたりの旅プロフィール` inherited its old white fill from its former on-photo role and became low-contrast on the cream paper field.

The candidate was not promoted in that state. The title was changed to the existing navy text color already used in the same candidate, then all scales were rechecked.

A separate initial scripting attempt targeted the wrong exact profile frame name and failed atomically before mutation. The method was corrected after live child-name readback; no partial Figma state resulted.

### Three-scale result

- whole spread / 500 px: PASS; the left page no longer reads as `photo + narrow sidebar`, and the full spread has a stronger photo/type rhythm.
- reading / 1400 px: PASS; six facts remain scannable and Q&A hierarchy remains unchanged.
- actual left page / `794×1123`: PASS; hero crop, quote, fact band, collage and 03 close are readable.

Final full-spread structure QA:

- visible native text: `54`;
- IMAGE-fill nodes: `5`;
- same-parent text intersections: `0`;
- 18 px safe-area risks: `0`;
- whole-page flattening: NO;
- native variable copy preserved: YES;
- replaceable image roles preserved: YES.

### Promotion

- adopted preferred: IX `2132:101 / PREFERRED / V6_PROFILE_IX_WIDE_HERO_FACT_BAND_2026_08_21`, live x=`273800`, y=`0`;
- hidden rollback: IP `2096:2`, x=`286600`, y=`0`.

Decision: `IX ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

---

## Asset / Drive state

This run did not diagnose image fidelity as the bottleneck, so generation was not used merely for activity.

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive masters: `0`;
- new role-sized derivatives: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified Rurubu image fills only: YES.

Drive V6 root was re-read before promotions and durable evidence writes.

## Resulting live preferred set

`IU + IX + IR + IV + IT + IW`

V7 remains HOLD. This is dummy-design/editorial QA progress only; it is not `PRINT_READY`. Final real photography/copy, real-copy stress, printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.