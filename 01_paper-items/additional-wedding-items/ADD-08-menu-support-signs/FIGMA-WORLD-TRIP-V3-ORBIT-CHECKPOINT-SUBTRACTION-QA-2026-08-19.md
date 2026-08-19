# ADD-08 World Trip V3 — orbit / checkpoint subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / WORLD_TRIP_ORBIT_CHECKPOINT_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `4e3f0ed5344bfb44d93da33207b17300fc0264ad`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected World Trip V3: `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`
- long-copy stress: `23:75 / QA_CLEANROOM_ADD08_V3_WORLD_LONG_COPY_STRESS_FINAL_2026_08_15`
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

## Visible issue

Fresh reading-scale review found the fixed-art column still carrying a double concentric orbit near the top plus three tiny checkpoint dots along the long route curve. The menu chapters, Japanese title, chapter numbering and route curve already establish the travel/culinary editorial direction.

The double orbit read like a target/scanner widget, while the three dots had no chapter, destination, course, ingredient, timing or physical role. This introduced UI/checkpoint semantics without adding guest-facing meaning.

## Bounded comparisons

Selected production was not edited during evaluation.

Comparisons created on the production page:

- `41:40 / QA / ADD-08 WORLD TRIP V3 / OUTER ORBIT OFF / 2026-08-19` — outer orbit only hidden;
- `41:78 / QA / ADD-08 WORLD TRIP V3 / BOTH ORBITS OFF / 2026-08-19` — both orbit circles hidden;
- `41:2 / QA / ADD-08 WORLD TRIP V3 / NO ROUTE CHECKPOINT DOTS / 2026-08-19` — checkpoint-dot-only structural probe.

The outer-orbit-only version still read as a target. Removing both circles while retaining the single long route curve was stronger: the right column still has enough fixed-art presence but no longer looks like scanner/progress UI.

## Promotion / rollback

Hidden rollback copies were created before promotion:

- selected: `42:2 / ROLLBACK / ADD-08 WORLD TRIP V3 / PRE ORBIT-CHECKPOINT SUBTRACTION / 2026-08-19`;
- stress: `42:40 / ROLLBACK / ADD-08 WORLD TRIP V3 STRESS / PRE ORBIT-CHECKPOINT SUBTRACTION / 2026-08-19`.

Adopted selected changes:

- orbit vectors `21:48 / 21:49`: hidden;
- checkpoint vectors `21:52 / 21:53 / 21:54`: hidden;
- long route vector `21:50`: retained.

Matching stress changes:

- orbit vectors `23:80 / 23:81`: hidden;
- checkpoint vectors `23:84 / 23:85 / 23:86`: hidden;
- long route vector `23:82`: retained.

Comparisons were hidden after adoption. Drink V3, Allergy/Dietary V2 and retained legacy production were not changed.

## Three-scale / structure QA

- whole/reading screenshot: PASS at ~1000px;
- native canvas remains `1400×1980`;
- selected visible native text: `14`;
- stress visible native text: `14`;
- selected visible fixed-art vector after subtraction: one long route curve;
- stress visible fixed-art vector after subtraction: one long route curve;
- visible text outside root: `0` selected/stress;
- IMAGE additions: `0`;
- variable food/allergy/factual copy rasterized: `0`.

The right-side fixed art remains intentionally asymmetric rather than being removed wholesale. The bounded test therefore reduces UI semantics without collapsing the item into generic emptiness.

## Asset / Drive decision

Image generation: `0`.
Drive write: `0`.

The defect was excessive native fixed-art containment/checkpoint geometry, not missing imagery.

## Decision

`VERIFIED_LOCAL / WORLD_TRIP_ORBIT_CHECKPOINT_SUBTRACTION_PASS`.

This directly applies existing shared principles about non-semantic containment and checkpoint markers. No new shared lesson was created.