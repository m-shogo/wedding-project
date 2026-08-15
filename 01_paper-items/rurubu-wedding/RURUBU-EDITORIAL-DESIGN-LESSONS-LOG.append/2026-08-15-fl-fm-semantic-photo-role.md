# 2026-08-15 — FL/FM semantic photo-role lessons

## Lesson A — Destination semantics are part of photo fidelity

**Visible problem:** a technically acceptable, attractive travel image on FJ's back cover read as a foreign cliff/coast destination while the issue is explicitly Yokohama-led.

**Principle tested:** evaluate a dominant photo on `destination-semantic coherence` in addition to sharpness, crop, color and visual impact.

**Bounded experiment:** FL `1195:2` replaced only the back dominant source with an already-verified waterfront source (hash `539c259be8036b481d06b4f76db9a39b407d90e8`) and rebalanced existing lower modules. No new card, shadow, gradient, generated image or factual copy.

**Expected improvement:** front/back should feel like one destination issue rather than a collage of unrelated attractive places.

**Regression risk:** a semantically safer city image can still become generic stock if it lacks a clear editorial role.

**Evidence:** 500px whole-item PASS; 1000px spread PASS; actual-size back ≈798×1123 PASS; 35 visible native texts; 7 IMAGE fills; absolute text intersections 0; 18px safe-area risks 0; fold preserved.

**Status:** `VERIFIED_LOCAL / ADOPTED`.

**V6 application:** every dominant image brief must state destination/subject truth and reject visually strong candidates that contradict the intended place or story.

---

## Lesson B — Never let an invented face inherit a real-person label

**Visible problem:** EO's profile page paired recognizable generic/generated people with native identity labels `SHOGO` and `SHI-CHAN`, creating a false implication that those people represented the real couple.

**Principle tested:** when verified real-person photography is unavailable, keep identity/facts native and editable, but shift the raster role to non-person atmosphere/interests/objects rather than inventing a face.

**Bounded experiment:** FM `1196:285` replaced only the two profile raster roles with already-verified non-person travel/lifestyle atmosphere sources (`c1ada112...`, `d76eb07...`), preserved all profile copy and names as native text, and rebalanced the question hierarchy without new containers.

**Expected improvement:** preserve a strong magazine profile page without identity fabrication.

**Regression risk:** non-person lifestyle photos can become generic stock; they must connect to native metadata and remain explicitly replaceable if real photos later become available.

**Evidence:** 1000px inside spread PASS; actual-size left 794×1123 PASS; final 52 native texts; 6 IMAGE fills; absolute text intersections 0; 18px safe-area risks 0. EO retained as hidden rollback.

**Status:** `VERIFIED_LOCAL / ADOPTED`.

**V6 application:** all image roles involving real people must carry an explicit identity state before generation/selection: `VERIFIED_REAL`, `NONPERSON_ATMOSPHERE`, or `PLACEHOLDER_REPLACEABLE`. `GENERATED_PERSON_AS_REAL` is prohibited.

---

## Failure memory — Q60 exact master transport

The exact Drive master (`1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155439 bytes) was materialized and an official Figma upload target was issued against safe duplicate FK. POST failed before mutation with the existing normalized fingerprint `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM`.

Per the shared failure rule, the same path was stopped rather than repeatedly retried. This remains an infrastructure/capability blocker, not a visual-design failure and not completion evidence.