# Rurubu shared learning — RSL-149 to RSL-151

Date: 2026-08-20
Scope: Rurubu WEDDING

## RSL-149 — Japanese-first semantic microcopy can remove residual template tone

State: `VERIFIED_CROSS_ITEM`

### Source problem

Memory Spots GV was Japanese-led overall, but ordinary semantic labels still used generic English such as `4 PLACES / OUR YOKOHAMA`, `MINATOMIRAI / SUNSET / WALK`, `TABLE & TALK`, and `BEST TIME / MOOD / PHOTO / CAFE / SUNSET / TABLE`.

### Root-cause hypothesis

The English did not perform a unique brand, legal, code, authenticity or navigation job. In a Japanese-first travel-guide spread it therefore read as residual template styling rather than useful hierarchy.

### Bounded test

GY `2003:2` changed only native semantic microcopy and nearby native hierarchy. Representative replacements:

- `4 PLACES / OUR YOKOHAMA` → `横浜 / 4つの寄り道`;
- `MINATOMIRAI / SUNSET / WALK` → `夕暮れどき / 水辺をさんぽ`;
- `04 / TABLE & TALK` → `04 / 食卓の時間`;
- guide labels → `おすすめ時間 / 気分 / 写真 / カフェ / 夕景 / 食卓`.

All photographs, image hashes and replaceable roles were preserved.

### Expected improvement

More coherent Japanese-first editorial hierarchy and less generic AI/template tone without adding decoration.

### Regression risk

Do not translate intentional brands, artifact-type labels, destination names, standardized codes or English that performs a distinct authenticity/navigation job. Japanese strings can also wrap differently, so actual-size QA remains mandatory.

### Evidence

- whole spread 1200px: PASS;
- actual-size right `2003:24 / 794×1123`: PASS;
- final right text collisions `0`;
- 18px safe-area risks `0`;
- no image changes.

The neutral non-Rurubu feed already held a materially independent `VERIFIED_CROSS_ITEM` Japanese-first semantic-label method. GY independently reproduced the method in a Rurubu travel-magazine role without inspecting or copying non-Rurubu production layouts/assets. Therefore the method has cross-scope receiving-item verification.

### What remains Rurubu-specific

Exact Japanese copy, magenta/yellow/cyan palette, SPOT hierarchy, photo choices, typography sizes and placement.

### Cross-item applicability

Audit isolated English semantic labels only when they lack a unique reader-facing purpose. Transfer the decision method, never this visual treatment.

---

## RSL-150 — Actual-size QA must harden meaningful secondary copy, then rerun long-copy reserve

State: `VERIFIED_CROSS_ITEM`

### Source problem

Profile/Q&A HA looked strong at thumbnail/read scale, but fresh native-size audit found meaningful reader-facing secondary text at `9–10.5px`, including the Q6 kicker, support-photo caption and Q5 answer.

### Root-cause hypothesis

Dominant type can make a page look finished while genuinely meaningful secondary copy remains physically fragile. Enlarging it is safe only if dynamic-copy reserve is revalidated afterward.

### Bounded test

GZ `2004:2` raised only meaningful secondary native roles to `11.5px`, including Q5 answer and Q6 kicker. Primary hierarchy, photos, hashes and geometry were preserved.

Dedicated long-copy proof `2004:101` expanded Q5 answer height to `70px`. The first proof failed by `4px` against the bottom closing line. The candidate was not adopted in that state. Moving only the bottom closing line `y 995 → 1010` restored reserve.

### Expected improvement

Better native-size readability without flattening the Q&A hierarchy.

### Regression risk

Blindly enlarging every small role can flatten hierarchy or consume safe reserve. Decorative folios and intentionally subordinate metadata are not automatically candidates. Any material type-size change to dynamic copy requires fresh stress.

### Evidence

- GZ whole 1200px: PASS;
- actual-size Q&A `2004:49 / 794×1123`: PASS;
- production text collisions `0`;
- production 18px safe-area risks `0`;
- long-copy proof after repair: collision `0`, safe risk `0`;
- image changes `0`.

The neutral non-Rurubu feed already held a cross-item actual-size secondary-copy method. GZ independently reproduced it in Rurubu, including the important failure/retest behavior.

### What remains Rurubu-specific

Exact 11.5px size, Q&A layout, Japanese copy, photo placement, color system and closing position.

### Cross-item applicability

Classify smallest meaningful reader-facing copy at native physical size, harden only genuinely fragile roles, and rerun dynamic-copy/collision/safe-area QA.

---

## RSL-151 — Cross-section reuse of a fixed composed texture can homogenize the magazine

State: `REJECTED`

Failure fingerprint: `CROSS_SECTION_COMPOSED_TEXTURE_REUSE_GENERICITY`

### Source problem

Outer GU chronology remains visually quieter than its dominant photo field. A rollback-safe GX experiment reused the already-verified Cafe composed travel texture as a low-opacity chronology background.

### Root-cause hypothesis tested

A bounded composed texture might add print-native continuity without new cards or imagery.

### Bounded test

GX `2002:2` placed the existing Rurubu texture hash `691a6ceed471a5d8efa144052a10564eed177b4f` behind only the back chronology at low opacity. No new asset was generated or transported.

### Result

Technically valid, but visually weaker as a design decision. The same fixed decorative treatment across unrelated Cafe and chronology roles made the sections feel more generic/homogenized and did not materially solve chronology hierarchy.

Decision: `REJECTED`; GX hidden, GU retained.

### Expected improvement that did not materialize

More print texture and less empty cream field.

### Regression observed

Cross-section visual sameness and decoration without a sufficiently specific semantic/editorial job.

### Evidence

- whole spread comparison performed;
- actual-size back `794×1123` inspected;
- no structural/asset blocker caused rejection; rejection was visual/editorial.

### What must remain Rurubu-specific

The tested texture, opacity, chronology geometry and all section visual treatments.

### Cross-item applicability

Do not promote this into a blanket ban on asset reuse. The transferable caution is: fixed decoration reused across distinct editorial sections must prove a local semantic/binding job. If it merely fills space or makes unrelated pages look alike, switch method or create a section-specific asset instead.
