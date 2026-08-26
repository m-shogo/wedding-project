# ADD-06 フォトブースサイン — Top Coral Crop Subtraction QA

Date: 2026-08-27
Scope: non-Rurubu / ADD-06 フォトブースサイン
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main: `0e6b2c5cbe594316f71be2f3f7caddfccdc601df`

## Result

`VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_RESTORED`

The full-width `DECOR / CORAL TOP CROP` was removed from Current and long-copy proof after a rollback-safe bounded comparison showed that it read as a web/app header or status bar rather than part of the physical photo-booth artifact.

No replacement ornament, SVG, image, or generated asset was added.

## Live authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current page: `56:105`
- Current root: `56:106`
- Current top crop: `56:107` — now hidden
- long-copy proof: `56:157` — remains hidden after QA
- long-copy top crop: `56:158` — now hidden
- exact Drive folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- adopted SVG master remains: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1 / photo-strip-continuous-developed-prints-v2.svg`

Drive authority was live-confirmed before the Figma change. No Drive write was required.

## Visible problem

The Current used a 28px coral bar across the entire top edge:

- node `56:107`
- `x=0 / y=0 / w=990 / h=28`

At thumbnail and reading scales it appeared before the real photo-strip artifact and was visually detached from the strip, native copy, lower information field, trim/fold/binding semantics, or any reader-facing function.

The role therefore read more like a web/app header or generic status bar than a printed photo-booth sign.

## Root-cause hypothesis

The coral color itself was not the problem; coral remains purposeful inside the continuous four-exposure SVG. The defect was the **full-width canvas-edge geometry without a physical or semantic binding role**.

Normalized fingerprint:

`FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`

## Bounded test

Only the top-crop role was changed.

Comparison frames:

- normal: `57:2 / QA / ADD-06 / NO CORAL TOP CROP / 2026-08-27`
- long-copy: `57:53 / QA / ADD-06 / LONG COPY / NO CORAL TOP CROP / 2026-08-27`

Both comparisons cloned the corresponding Current/stress structure for bounded QA and hid only their copied `DECOR / CORAL TOP CROP` role. They did not change:

- Japanese hierarchy;
- photo-strip SVG;
- lower physical information field;
- date/location/closing geometry;
- copy;
- fonts;
- image roles;
- Drive asset provenance.

## Three-scale evidence

No-top-crop comparison:

- whole-item / 500px max dimension: PASS; the continuous strip and Japanese hero become the first reads immediately;
- reading / 1000px max dimension: PASS; removal reduces web-header framing without making the page sparse;
- actual-size / native `990×1400`: PASS; no missing trim/binding meaning becomes apparent;
- realistic long-copy / native `990×1400`: PASS; long guide, long installation placeholder, and closing remain stable.

The comparison was materially stronger at whole-item scale because the page now reads as one open printed composition rather than a cream canvas capped by a UI-like coral header.

## Rollback and promotion

Before Current mutation, full rollbacks were created:

- `57:104 / ROLLBACK / ADD-06 / PRE-NO-TOP-CROP / CURRENT / 2026-08-27`
- `57:155 / ROLLBACK / ADD-06 / PRE-NO-TOP-CROP / LONG COPY / 2026-08-27`

Promotion changed only:

- Current `56:107` → hidden
- long-copy `56:158` → hidden

The two comparison frames `57:2 / 57:53` were hidden after verification.

## Post-change structure readback

Current `56:106` after promotion:

- top crop hidden: yes;
- continuous SVG root remains `56:108`;
- native text roles remain `7`;
- IMAGE fills remain `0`;
- generated raster remains `0`;
- semantic/factual copy baked into SVG remains `0`.

Long-copy `56:157` retains the same structure with its top crop hidden and remains hidden after QA.

No variable/factual content was rasterized. Hybrid responsibility remains native text + editable SVG fixed art.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was purposeless fixed geometry, not missing photography, illustration, paper texture, background, or hero art. Generating new imagery would have added noise rather than solving the diagnosed issue.

## Learning state

`VERIFIED_LOCAL`.

The transferable hypothesis is narrow:

> A full-width decorative edge that has no trim, fold, binding, physical-artifact, hierarchy, or reader-facing job may make a print composition read like a web/app header. Test bounded subtraction at whole/read/actual scales before retaining it.

Do **not** transfer the exact coral color, dimensions, photo-booth layout, or a blanket rule to remove all top edges. ADD-14 has already shown that a top color field can be worth retaining when it carries genuine emotional/event rhythm.

This lesson is not promoted project-wide from ADD-06 alone.

## Decision

ADD-06 restores:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

Keep `NOT_PRINT_READY` until final booth copy/location, mounting/sightline, printer template/profile, physical print and venue-lighting proof are available.
