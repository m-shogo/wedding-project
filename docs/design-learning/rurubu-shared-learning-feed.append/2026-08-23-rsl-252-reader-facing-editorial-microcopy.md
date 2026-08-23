# RSL-252 — reader-visible editorial microcopy must have a reader job

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V7 Outer
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-252-INTERNAL-OR-GENERIC-MAGAZINE-MICROCOPY-IS-VISIBLE-WITHOUT-A-READER-FACING-JOB`

## Visible problem

V7 Outer C7 `2379:2` contained two small labels that survived earlier hierarchy cleanup:

- `4 WAYS / OUR ISLAND DAYS` — plausible magazine texture but semantically redundant beside the actual four-item browse list;
- `V7 STUDY / HAWAII POP EDITORIAL` — internal design/version language exposed directly to the reader.

At thumbnail scale neither broke layout, which made the defect easy to miss. The failure was authenticity and editorial responsibility rather than collision or spacing.

## Root-cause hypothesis

Small labels escape scrutiny because they are treated as harmless visual seasoning. In an editorial artifact, however, even minor coverline/kicker/folio-like text contributes to publication voice and navigation. Generic English or internal schema labels can therefore make a polished page feel templated/AI-authored despite clean geometry.

## Professional basis

Fresh references used this run:

- JAGDA typography guidance: language begins from meaning; visual form should organize and transmit that meaning.
- Society of Publication Designers coverline discussion: cover blurbs function as teasers that tell readers what is inside, in addition to their visual role.
- Eye discussion of magazine contents/navigation: editorial furniture should perform an actual navigation, sales or brand job appropriate to the title.

These were converted into a local decision principle rather than copied stylistically.

## Bounded test

Rollback-safe C8 `2381:2` changed only two text responsibilities:

- `2381:9`: `4 WAYS / OUR ISLAND DAYS` → `ふたりの4つの過ごし方`;
- `2381:19`: internal `V7 STUDY / HAWAII POP EDITORIAL` hidden.

Everything else remained unchanged, including photography, crop, semantic front `4`, functional back `01–04`, palette, root geometry and factual/date copy.

C7 `2379:2` is hidden rollback at `x=300000`.

## Three-scale evidence

- 500 px whole-item: PASS
- 1400 px reading: PASS
- 1587×1123 actual-size: PASS for DESIGN QA
- visible native text: `17`
- IMAGE fills: `6`
- text intersections: `0`
- bounded 18 px edge risks: `0`
- current V7 root overlaps: `0`

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C8-READER-FACING-MICROCOPY-QA-2026-08-23.md`

## Transferable principle

Before retaining any visible kicker, micro-label, folio-like text, English taxonomy, production note or footer string, ask what reader-facing job it performs: navigation, teaser, semantic grouping, identity, production truth, legal/credit or another concrete purpose. If the answer is only “it makes this look like a magazine/design study,” hide, replace or rewrite it rollback-safely and compare.

This is **not** an English-ban rule. English is valid when it carries meaning, identity or navigation. It is also **not** a rule to remove small type globally.

## What must remain Rurubu-specific

Do not transfer C8's coral/cyan/yellow palette, exact Japanese phrase, numerical hierarchy, cover composition, Hawaii art direction or photo treatment.

## Next receiving-item experiment

A materially different print item may independently audit visible microcopy for internal schema/version language or generic stylistic labels, then test semantic replacement/removal at whole-item, reading and actual-size scales. Cross-item verification is required before project-wide promotion.
