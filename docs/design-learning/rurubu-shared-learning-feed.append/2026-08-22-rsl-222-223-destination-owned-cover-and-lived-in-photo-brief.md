# RSL-222 / RSL-223 — destination-owned cover language and lived-in photo authenticity

Date: 2026-08-22
Source scope: Rurubu WEDDING V8

## RSL-222 — travel-cover support copy should describe destination experience, not publication inventory

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Source problem

V8 Outer AP had already removed much generic publication furniture, but its front support deck still read:

`写真、年表、好きな店、寄り道。`
`読むたびに、その日の空気へ戻れる本。`

That copy described what the publication contains more than what the reader experiences in Yokohama. On a travel-led cover, this preserved a small amount of prototype/catalog semantics even though the main destination title was strong.

### Root-cause hypothesis

When a travel cover already owns a clear destination, secondary copy can weaken destination desire if it falls back to format/inventory vocabulary. Concrete place/experience nouns can carry more editorial value without adding decoration.

### Bounded test

Live Figma Outer AV `2273:24` retained AP's layout, image, masthead, destination title, back cover, native editability and physical geometry. Only the front deck changed to:

`海辺、街歩き、好きな店、夜の食卓。`
`横浜の一日を、ページに残す。`

### Evidence

- 500px whole-item: PASS
- 1400px reading: PASS
- 1587×1123 actual-size: PASS
- native text: `12`
- IMAGE: `1`
- text intersections: `0`
- 18px safe risk: `0`
- parent: `2052:2`

### Expected improvement verified

The cover now speaks in destination/experience language before it explains the publication format. This does not fix the photography gap; it fixes the copy's semantic ownership.

### Regression risk

Concrete nouns can become generic travel clichés if they are not actually supported by the final issue content. Future real-content QA must verify the selected nouns.

### Failure fingerprint

`F-RSL-222-TRAVEL-COVER-SUPPORT-COPY-DESCRIBES-PUBLICATION-INVENTORY-INSTEAD-OF-DESTINATION-EXPERIENCE`

### What must remain Rurubu-specific

`横浜`, the exact copy, cover geometry, navy/cream palette, image role, publication title and wedding context.

### Cross-item applicability

Other destination-led print artifacts may independently test whether cover support copy describes the artifact's format or the reader's destination experience before adding more graphic elements.

---

## RSL-223 — destination-photo authenticity should include lived-in evidence, not only landmark recognition

State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS`

### Fresh professional research

New research in this run deliberately moved away from previously repeated book-design sources and focused on travel editorial/photo commissioning:

- Lonely Planet's 2026 `Artifact` project describes a collaboration across editorial, design and photography that preserves travel utility while creating more experimental print work.
- `Bellissimo` uses documentary photography, local expert knowledge and an intentionally unselfconscious design to reveal a lesser-known destination rather than sell a polished tourism image.
- `Arcades` explicitly links authenticity to deeper personal/local connection and ongoing social/geographic research.
- `Desired Landscapes` treats walking and documenting overlooked urban systems as a way to build an authored view of place.

These are research observations, not copied visual recipes.

### Current Rurubu problem

V8 Outer AV still uses the abstract ocean-light master. It is coherent as book-design atmosphere but does not carry enough Yokohama-specific evidence to compete with V6 on `行きたい`.

### Root-cause hypothesis

A destination-specific generated photograph should not prove place only through postcard landmarks or beautiful weather. Lived-in evidence—street surface, storefront rhythm, harbor/city infrastructure, ordinary circulation and other plausible traces of use—can make a destination image feel observed rather than synthetically advertised.

### Bounded production change

The existing Figma production brief `2270:2 / V8 / PHOTO ART DIRECTION / OUTER-01 / QA_PASS` was refined, not replaced:

- target emotion expanded from `ここへ行きたい` to `ここへ行きたい / この街を歩いてみたい`;
- photo character now explicitly asks for lived-in city evidence and rejects using landmark/postcard beauty as the sole proof of Yokohama;
- existing role/crop/text-safe, 35–50mm, natural-light, realistic-color and anti-fake-signage constraints remain.

The first expanded text produced an overflow into the next brief section and was rejected. The copy was compressed until the original brief rhythm was restored; screenshot QA then passed.

### Why this is not VERIFIED_LOCAL yet

No new OUTER-01 image was generated in this run. Drive re-read shows no new role-specific master. Therefore the hypothesis has improved the generation/selection brief but has not yet demonstrated a superior production image.

### Failure fingerprint to test later

`F-RSL-223-DESTINATION-PHOTO-PROVES-PLACE-ONLY-WITH-POSTCARD-LANDMARK-OR-GENERIC-BEAUTY`

### Promotion gate

Move beyond hypothesis only after materially different OUTER-01 candidates are generated, selected, stored in the V8 Drive authority, transported through a verified route, placed into the replaceable Figma role, and compared against AV/V6 at thumbnail, reading and actual-size scales.

### Do not transfer

Do not transfer Yokohama-specific subjects, architecture, framing or copy to other items. Only the authenticity test—observed/lived-in place evidence versus generic destination beauty—is a cross-item candidate after local verification.
