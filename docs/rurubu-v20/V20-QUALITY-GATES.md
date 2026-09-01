# V20 Quality Gates

Status: `CANONICAL_V20_QA / RESET_2026-09-01`

Highest page-role authority: `V20-CURRENT-PAGE-ARCHITECTURE.md`.

V20 does not use V10/V11/V12 visual scores, old SVG style, old P05 Hawaii-only role, old P07 guide/discovery/schedule role or old P08 closing-message role as current design authority.

## Gate 0 — Grounding

Pass before structural production:
- A5 portrait / 8 pages confirmed;
- wedding date `2026.10.24` confirmed;
- P08 barcode digits `2026102400000` confirmed;
- current authority chain read;
- missing personal facts identified;
- no page depends on fabricated Q&A/dates/captions;
- current P01–P08 architecture/manual/Bible exist.

## Gate 1 — Photo inventory

Pass when:
- candidate photos are inventoried by current page role;
- P04 has real travel candidates or explicit gaps;
- P05 has family/friend candidates or explicit gaps;
- P06 has real-life candidates or explicit gaps;
- P07 has at least one strong closing candidate;
- hero/support roles are not duplicated blindly.

Do not solve source gaps with invented memories.

## Gate 2 — Silhouette / page identity

At thumbnail scale:
- P01 = strong magazine cover;
- P02 = profile/people feature;
- P03 = quieter story feature;
- P04 = strongest travel-memory interior page;
- P05 = warm family/friend people-memory page;
- P06 = candid real-life page;
- P07 = calm closing/message page;
- P08 = unmistakably sparse magazine back cover.

Immediate fail if:
- P05 still reads as Hawaii-only feature;
- P07 reads as `TODAY'S TRAVEL GUIDE`, `11 DESTINATIONS`, map/discovery/timetable;
- P08 reads as the main thank-you feature.

## Gate 3 — Reading hierarchy

For each interior page define:
1. first read;
2. second read;
3. third read;
4. factual copy;
5. optional micro discovery.

P08 may deliberately have only 1–2 reading steps.

Fail if 4+ large elements compete equally.

## Gate 4 — 75% clutter calibration

The current target is not maximum density.

Pass when:
- energetic pages still feel like edited Japanese travel magazine pages;
- major photos remain visible;
- only 2–3 meaningful secondary events compete below the first read;
- calm fields are allowed to remain calm;
- micro details reward browsing without filling every gap.

Fail when:
- stickers are added only because space exists;
- copy/photo sizes shrink to accommodate more content;
- every edge is active;
- every photo has a different ornament;
- the page looks like a scrapbook kit rather than a magazine.

## Gate 5 — Anti-UI / editorial behavior

Pass when:
- equal card grids are avoided;
- scale classes vary;
- photo treatments vary by semantic role;
- overlaps are intentional;
- calm reading support is integrated;
- repeated components do not determine the page.

Immediate revision triggers:
- three or more equal rounded cards;
- same radius/shadow everywhere;
- old flat SVG/icon-pack aesthetics;
- identical adjacent page structures.

## Gate 6 — Authentic magazine energy

Ask:
- is there one dominant title/hero event?;
- does photography carry major page weight?;
- do title/photo/frame/vessel relationships feel physically edited?;
- does the page still feel rich before body copy is read?;
- is the current density appropriate for that page's role rather than maximized automatically?;
- does the page look like a real printed editorial page rather than a wedding template?

P01 may use `るるぶ WEDDING` under current private-homage direction.

## Gate 7 — Content truth

Fail final output if it invents:
- relationship dates;
- Q&A answers;
- family/friend identities or relationships;
- anecdotes;
- destination facts;
- venue facts;
- QR/transport data;
- publisher/price/ISBN/JAN commerce claims.

## Gate 8 — Editability

Pass when:
- authoritative text is native/editable;
- important real photos are independently replaceable;
- frame/decor remains separable from photo source;
- final master is not one flattened bitmap;
- one-shot page generations remain art-direction proofs only.

## Gate 9 — Three-scale review

Review at:
1. thumbnail;
2. normal screen reading;
3. A5 actual-size equivalent.

At A5, group-photo faces on P05 must remain reasonably recognizable and P08 barcode digits must remain legible.

## Gate 10 — Spread review

P02–P03:
- clear `WHO → STORY` rhythm;
- not mirrored templates.

P04–P05:
- clear `PLACES WE REMEMBER → PEOPLE WE REMEMBER` relationship;
- P04 is travel-led;
- P05 is people-led;
- no requirement for an old route crossing the fold;
- no old Hawaii/proposal P05 visual role.

P06–P07:
- P06 retains playful image energy;
- P07 visibly slows down and closes emotionally;
- no P07 destination/discovery system.

P08:
- reviewed independently as back cover.

## Gate 11 — Photo resolution / provenance

Before final promotion:
- source locator recorded;
- final/proxy state recorded;
- effective PPI checked;
- no reference-only image used as production art;
- mystery external assets rejected.

## Gate 12 — Copy / vessel stress

Stress-test:
- P02 profile facts near intended maximum;
- P03 story paragraphs near working maximum;
- P04 travel captions without shrinking below comfortable type;
- P05 short family/friend captions without identity invention;
- P06 captions;
- P07 closing message near 100 Japanese characters if needed;
- P08 minimal meta + exact barcode digits.

Human copy may be shortened/rebroken to fit a strong vessel. Do not solve overflow by making A5 text microscopic.

## Gate 13 — P08 barcode integrity

Required visible digits:
`2026102400000`

If encoded, use a format that can preserve those exact digits such as Code 128-compatible encoding.

Do not silently convert to a different EAN-13 check digit.

This barcode is decorative/private-publication metadata, not a claim of real commercial registration.

## Gate 14 — Print geometry

Before PRINT_READY:
- bleed/trim/safe verified;
- center-fold risks checked;
- exported PDF dimensions verified;
- fonts/images reviewed;
- printer profile/CMYK/preflight applied;
- physical proof inspected where possible.

`FIGMA COMPLETE != PRINT READY`.

## Correction priority

When a page feels weak, fix in this order:
1. current page job;
2. content selection;
3. hero/photo choice;
4. title scale;
5. composition silhouette;
6. reading path;
7. photo inequality;
8. calm/support field;
9. overlap/edge activity;
10. color jobs;
11. medium editorial units;
12. micro discoveries;
13. micro-spacing.

Never start by adding more stickers.

`CURRENT PAGE ROLE + 75% EDITED DENSITY > LEGACY LAYOUT CONTINUITY.`