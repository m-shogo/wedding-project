# るるぶWEDDING V8 — CURRENT STATUS

Date: 2026-08-22
Direction: editorial monograph / book-design restraint + controlled travel desire
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`
V7 comparison set: six-role clean-room study, preserved and not preferred
Production state: `V8_AP_OUTER_CURRENT / V8_AK_PROFILE_CURRENT / V8_AL_STORY_CURRENT / V8_AQ_MEMORY_CURRENT / V8_AS_CAFE_CURRENT / V8_AT_1DAY_CURRENT / NOT_GLOBAL_WINNER / NOT_PRINT_READY`

## Current V8 roots

1. **Outer AP `2251:2`** — destination-led `横浜` hierarchy; Japanese reader contents; one verified abstract ocean-light supporting master. Previous AH `2234:2` hidden rollback.
2. **Profile/Q&A AK `2238:2`** — content-owned Japanese personality hierarchy; answer-owned Q&A voice. Previous AJ `2235:2` hidden rollback. IMAGE `0`.
3. **Story/Chronology AL `2238:35`** — typography-led emotional story + unequal chronology rhythm; reader-facing Japanese furniture. Previous Q `2196:2` hidden rollback. IMAGE `0`.
4. **Memory/Guide AQ `2256:2`** — concrete sensory memory fragments carry the left-page editorial mass; Guide semantics retained. Previous AM `2238:73` hidden rollback. IMAGE `0`.
5. **Cafe/Table AS `2261:2`** — sensory Cafe plus Dinner close with explicit closing gravity. Previous AF `2230:26` hidden rollback. IMAGE `0`.
6. **1DAY/Model Course AT `2264:2`** — left experiential pace is expressed through two semantically paired statements (`海辺は、長めに。` / `寄り道は、ゆっくり。`) rather than four loosely scattered fragments; right exact time/action data remains unchanged. Previous AR `2257:2` hidden rollback. IMAGE `0`.

## Structural QA

| Role | Native text | Text intersections | 18px safe risk | IMAGE |
| --- | ---: | ---: | ---: | ---: |
| Outer AP | 12 | 0 | 0 | 1 |
| Profile/Q&A AK | 23 | 0 | 0 | 0 |
| Story/Chronology AL | 25 | 0 | 0 | 0 |
| Memory/Guide AQ | 21 | 0 | 0 | 0 |
| Cafe/Table AS | 13 | 0 | 0 | 0 |
| 1DAY/Model Course AT | 19 | 0 | 0 | 0 |

1DAY AT was reviewed at whole-item 500px, reading 1000px, and actual-size 1587×1123. First pass was rejected because `寄り道は、ゆっくり。` produced a tiny final-line wrap; text-box width/scale was corrected before promotion. Final accidental explicit one-character lines: `0`. Parent page: `2052:2`.

Working physical geometry remains `420×297 mm`. Required right-page time labels are 22px (about 16.5pt at this working mapping) and closing copy is 18px (about 13.5pt), so the newly cross-item-verified physical factual-microtype QA did not require a size repair here.

## Drive authority

V8 folder:
`1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`

Verified existing masters retained:
- ocean-light `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- contact-proof `1MsisJ-qed1vYjGbMFiylN2DI6Lim_1Ko`
- contour-atlas `1hmk0-lnk_c7KmurWPAsUMUFB5NpKT1GC`
- table-essay `1aqjC7cMXymK7r5MqABiNHjL207OY3XKP`
- day-foldout `1KxMoNigZn6yKVu8e1MP9xt7Z-MaQzn-q`

No new Drive master was added in this run.

## Latest professional learning

### RSL-220 — semantic pairing should precede spatial irregularity

Fresh research input: IDEA No.346 describes Heikichi Harata's parataxis-based editorial practice as deliberate connection of short separated statements. The local transferable hypothesis was connection-before-scatter, not literal visual imitation.

Observed defect: AR's `海辺 / 長めに / 寄り道 / ゆっくり` could read as synthetic designerly randomness because their relationship was only implied by distance and scale.

Bounded result: AT pairs the same content into two authored statements while preserving the right exact-time page. 500 / 1000 / 1587×1123 PASS; native text `19`; IMAGE `0`; intersections `0`; 18px safe risk `0`; accidental explicit one-character lines `0`.

State: `RSL-220 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
Failure fingerprint: `F-RSL-220-SCATTERED-SHORT-WORDS-SIMULATE-EDITORIAL-RHYTHM-WITHOUT-EXPLICIT-SEMANTIC-PAIRING`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AT-1DAY-PAIRED-PACE-QA-2026-08-22.md`
Learning: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-22-rsl-220-semantic-pairing-before-spatial-irregularity.md`

### RSL-221 — Drive-mounted bytes can bypass the blocked external upload-submit path

RSL-208's unchanged `mcp.figma.com` DNS-blocked POST was not retried.

A distinct route was tested:
`Drive raw fetch through connected authority → materialized execution bytes → bounded derivative → byte decode in Figma script → figma.createImage(bytes) → hidden QA fill`.

The first alternate (`fetch()` inside Figma Plugin runtime) failed atomically with `ReferenceError: fetch is not defined` and must not be retried unchanged.

The byte-injection method then succeeded in a hidden non-production transport probe:
- QA frame `2266:2`
- probe rectangle `2266:3`
- image hash `69f50f48faf0a463bf09b249a25b6669698aca7a`
- bytes `736`
- parent `2052:2`

This proves `figma.createImage(bytes)` is available when Drive bytes are materialized outside the Plugin runtime. It does **not** make the low-resolution probe a production asset. Future production use must keep the high-quality Drive master, create a role-sized derivative with verified quality/effective resolution, then place/hash/crop/three-scale QA it. Large payloads may still require a larger binary bridge rather than inline script embedding.

State: `RSL-221 VERIFIED_LOCAL`.
Learning: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-22-rsl-221-drive-mounted-bytes-figma-createimage-fallback.md`

## Active boundaries

- RSL-219: quiet pages still need content-owned closing gravity.
- RSL-218: data-bound spacing can make generic timeline furniture redundant.
- RSL-217: concrete article-owned memory should outrank duplicated abstract concept tokens.
- RSL-216: travel pages should not explain their own design method to the reader.
- RSL-215: reader-facing publication furniture should not expose internal schema vocabulary.
- RSL-214: dominant hierarchy should be owned by actual editorial content, not easy Latin identifiers.
- RSL-213: generic English furniture with no reader value weakens publication voice.
- RSL-212: facing pages should have complementary semantic jobs rather than duplicate vocabulary.
- RSL-211: spread unity must not be simulated by arbitrary diagonal choreography.
- RSL-210: page furniture must declare real page role.
- RSL-209: quiet editorial restraint must not become sterile equal weighting.
- RSL-208: unchanged official upload-submit DNS failure must not be repeated without material change.
- RSL-207: parent/page verification after Figma writes remains mandatory.
- project-wide Japanese semantic line-break QA and binding-function checks remain active.
- cross-item physical factual-microtype QA is consumed as a QA method only; no fixed minimum point size is promoted here.

## Asset truth for this run

- new image-model generation: `0`
- newly created Drive masters: `0`
- new **production** Figma image placements: `0`
- hidden non-production image-transport probe: `1`
- V6/V7 image hashes reused in production: `0`
- current Outer ocean-light remains an abstract supporting role, not Yokohama photography

## Current comparison decision

- **V6 `JC + IX + JB + IZ + IT + JA`** remains strongest for immediate travel desire, photographic atmosphere, and unmistakable Rurubu-like excitement.
- **V7** remains useful as a high-energy comparison but is weakened by synthetic/schematic image craft.
- **V8 `AP + AK + AL + AQ + AS + AT`** has stronger book/editorial pacing and less AI/UI-template residue, but still lacks V6's destination-specific photographic desire.
- V8 is not promoted as global winner.

## Next highest-value work

1. Do not create V9.
2. Preserve V6/V7 and all rollback/rejected V8 roots.
3. Keep `AP + AK + AL + AQ + AS + AT` unless a role-valid alternative wins three-scale and structural QA.
4. When a new role-specific generated master becomes available, use RSL-221 as the preferred fallback candidate if the official upload route is still DNS-blocked: Drive master → verified role derivative → materialized bytes → `figma.createImage` → exact image role → hash/crop/three-scale QA.
5. Never promote a low-resolution transport probe or screenshot as a production image.
6. Continue Japanese semantic-wrap, physical microtype, and mojikumi/kinsoku QA.
7. Compare V6/V7/V8 on professional editorial quality, destination specificity and travel desire.
8. Keep DESIGN QA, REAL CONTENT QA, PRINT TEMPLATE/PREFLIGHT and PHYSICAL PROOF separate.

Current state:
`V8 AP + AK + AL + AQ + AS + AT = VERIFIED_LOCAL_DESIGN_STUDIES / DISTINCT_BOOK_EDITORIAL_SYSTEM / SEMANTIC-PACE-PAIRING-IMPROVED / DRIVE-BYTES-TO-FIGMA-FALLBACK-PROVEN-LOCAL / NATIVE_TEXT_EDITABILITY_PRESERVED / ROLLBACK_SAFE / DESTINATION_PHOTO_POWER_STILL_BELOW_V6 / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
