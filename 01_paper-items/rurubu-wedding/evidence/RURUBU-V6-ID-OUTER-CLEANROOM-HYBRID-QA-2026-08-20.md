# RURUBU V6 ID — Outer Clean-room Hybrid QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Preferred candidate: `2051:2 / V6 ID PREFERRED OUTER / HN BACK + PHOTO-LED CLEANROOM FRONT`
Rollback: HN `2029:2`, IC `2049:47`

## Visible problem

HN's back cover already had a strong photo-led travel-note + chronology hierarchy, but its front still read as a full-width cream masthead/header followed by a horizontal hero section. At whole-item scale that preserved a stacked-section rhythm and limited the cover's travel-magazine impact.

## Root-cause hypothesis

The weakness was not lack of decoration or lack of assets. The front's main photograph did not own enough of the page, and the masthead behaved like a horizontal web/header region instead of an editorial overlay/support attached to photography.

## Clean-room test

IC `2049:47` was built as a rollback-safe clean-room outer study using only existing verified Rurubu image fills and native-text sources.

Front changes:

- waterfront hero expanded to a large top photographic field;
- masthead became a bounded cream support over/within that photo field rather than a full-width page header;
- current Rurubu WEDDING lockup was preserved as an independent asset;
- Feature 01 became number + native title + rule over photography;
- lower front became one editorial feature column plus one support photograph;
- no rounded card grid, shadow system, gradient, or new generated asset was added.

Back test:

- IC also rebuilt the back chronology with a looser clean-room composition.
- Thumbnail comparison showed that this lost useful information density and closure compared with HN.
- Whole-spread IC was therefore not adopted.

## Hybrid selection

ID `2051:2` duplicates HN, hides HN's original front inside the rollback-safe duplicate, and inserts the stronger clean-room front while preserving the verified HN back.

This is a selective promotion, not a monolithic version preference.

## QA evidence

### Whole-item / thumbnail

- HN 500px: structurally sound but front reads more like header → hero → lower module.
- IC 500px: stronger front, weaker back.
- ID 500px: retains HN back density while gaining the stronger clean-room front.
- result: ID PASS / preferred.

### Reading scale

ID 1400px render:

- masthead support and logo remain distinct;
- Feature 01 number/title/rule remains readable over the hero;
- lower Feature 03 and support photo remain clearly subordinate;
- back chronology retains HN's mature hierarchy;
- no obvious card/UI containment was introduced.

Result: PASS.

### Actual-size/detail

ID native render ≈ `1588×1123`:

- small cover-line text remains readable in the current dummy-design state;
- support-photo caption remains legible;
- no clipped headline or accidental trim-edge placement was observed;
- native text remains editable.

Result: PASS.

### Structure audit

Effective-visibility audit on ID:

- visible native text: `35`;
- visible IMAGE fills: `5`;
- effective text intersections: `0`;
- 18px outer safe-area risk: `0`;
- hidden original HN front inside ID: YES;
- whole-page flattening: NO.

## Asset / Drive truth

Drive V6 root was reverified before the experiment:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This experiment did not create or adopt any new generated master.

- generated assets: `0`
- Drive saves: `0`
- external binary placements: `0`
- new image-hash claims: `0`
- source-image strategy: existing verified Rurubu image fills only

Therefore this QA proves layout/hierarchy improvement only; it does not change image provenance authority.

## Failure / correction evidence

Initial IC creation ended with unsupported `setPluginData`, which caused an atomic Figma rollback.

Fingerprint: `FIGMA_HOST_SETPLUGINDATA_UNSUPPORTED`.

The corrected invocation removed the unsupported metadata call; the same failing mechanism was not repeated.

A later chronology cleanup accidentally matched title node names while removing failed numeral clones. This was visible in screenshot QA before any promotion. Titles/descriptions were rebuilt explicitly and IC remained comparison-only.

This reinforces that screenshot QA must follow semantic-name-driven bulk mutations even when the mutation call itself succeeds.

## Decision

`ID ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

HN and IC remain hidden rollback/comparison evidence.

V7 remains HOLD.

ID is not `PRINT_READY`; final legitimate photography/copy, final imposition, exact printer template, bleed/trim/fold/safe-area, exported PDF preflight, and physical proof remain separate gates.
