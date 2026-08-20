# Rurubu V6 HA — Q02/Q03 cream editorial beat feedback

Date: 2026-08-20
Scope: Rurubu WEDDING only

## Visible problem

GT's Q02/Q03 were still grouped by a large navy filled rectangle. The rest of the page had already become photo-led and asymmetric, so this one shared band read more like a UI/status module than a Japanese magazine interview beat.

## Principle / capability tested

Use subtraction first: replace a no-longer-necessary filled container with native typographic hierarchy + one functional rule + an existing legitimate photograph. Because Q02/Q03 are editable variable copy, preserve editability with native vertical Auto Layout and prove realistic long-copy growth before promotion.

## Expected improvement

- less UI/component feeling;
- clearer 02/03 scanning at thumbnail and page scale;
- stronger transition from the hero Q01 photograph into the dining/Q04 feature;
- no loss of native editability or replaceable-photo structure.

## Regression risks

- inverse text could become unreadable when the dark field is removed;
- long Japanese answers could grow into the dining photo;
- shrinking the photo could weaken the page;
- removing too much binding could make 02/03 feel detached.

## Experiment / evidence

- source: GT `1981:111`;
- candidate/adopted: HA `1996:99`;
- right page: `1996:146`;
- hidden stress proof: `1998:2` / right `1998:49`;
- hidden rollback: GT `1981:111`.

Rejected state 1: white inverse copy inherited from the navy band became too faint on cream.

Correction: use existing navy reader text while retaining cyan/yellow ordinals.

Rejected state 2: long-copy Auto Layout stacks grew to bottom y `597` while support photo began at y `595`.

Correction: support photo y `610`, `545×255`; long-copy proof retains 13px minimum clearance.

## Three-scale result

- 500px whole: PASS;
- 1200px whole: PASS;
- 794×1123 actual Q&A: PASS;
- preferred text collisions: 0;
- preferred 18px safe-area risks: 0;
- long-copy proof collisions: 0;
- long-copy proof safe-area risks: 0;
- preferred implementation/proof/placeholder leakage across all six current spreads: 0 hits.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

HA is visibly stronger than GT because Q02/Q03 read as two compact print interview beats instead of one reusable UI bar. The adjacent dining photograph remains strong enough after the shallower crop and stays independently replaceable.

## Next application

Continue comparing all six V6 spreads at the same scale. The next visual-quality ceiling is the narrow photo pool: waterfront, cafe and dining hashes each still appear five times. Do not reduce that count by inserting semantically false photography. Prefer an unused legitimate Rurubu asset if one can be verified; otherwise only demote a photo role when that role does not need photographic evidence.
