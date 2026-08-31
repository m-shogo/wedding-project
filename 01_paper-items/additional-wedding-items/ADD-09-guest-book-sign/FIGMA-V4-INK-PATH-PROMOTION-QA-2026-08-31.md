# ADD-09 Guest Book Sign — Figma V4 INK PATH promotion QA

Date: 2026-08-31
State: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / ACTUAL_SIZE_QA_PASS / PRINT_GEOMETRY_APPLIED / NOT_PRINT_READY`
Start authority SHA: `8b124018694074f4afebd06216bfc3ef775a913a`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Why a new V4 was required

The live Current at run start was still `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / OPEN PAPER TOP / 2026-08-28` on page `41:2 / VNEXT_FAMILY_AUDIT_D`. It retained valid structural and sellable evidence, but the current automation contract requires the non-Rurubu V4 pass to be authored as a new blank-frame production direction rather than using prior production/V2/V3/vNext visual construction as the authoring base.

The retained Current was therefore treated only as comparison / rollback evidence. No old frame, layout group, pen geometry, paper field, decorative vector, crop or generated asset was copied into the new V4.

## Live authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- new V4 page: `65:2 / V4 / ADD-09 / INK PATH / 2026-08-31`
- print/bleed parent: `66:2 / PRINT / V4 / ADD-09 / A5 / BLEED 3MM`
- trim production root: `65:3 / TRIM / V4 / ADD-09 / A5 148x210 / INK PATH`
- hidden final long-copy stress: `66:33 / QA / V4 / ADD-09 / A5 / LONG COPY / FINAL`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive writes: `0`

## Clean-room V4 art direction — INK PATH

Intent: make the tabletop sign read as an editorial writing invitation, not a form, web card, airport credential, faux book cover, or repeated family template.

First read:

`今日の旅に、ひとこと。`

Construction:

- warm paper field;
- Japanese serif hero with Japanese-first operational hierarchy;
- three native editable information roles without cards/boxes;
- a narrow continuous ink rail and editable pen-nib SVG on the right;
- a single editable signature-path SVG at the lower edge;
- one short coral entry rule;
- no raster background, stock image, generated person, badge, fake stamp, route credential, dashboard grid, repeated rounded card, or purposeless English filler.

The first draft used a thick rounded vertical rail with three dots. Screenshot review rejected it because it read like UI/timeline grammar. It was replaced in-run with a thin continuous writing rail. The first hero also wrapped into the lead and was repaired before further QA.

Role split:

- variable/factual copy: native Figma text;
- operational role grouping/reflow: native Auto Layout;
- pen nib / signature path: editable SVG;
- simple rule/rail: native vector geometry;
- raster/generated asset: `0`;
- replaceable photo role: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the bottleneck was composition / print typography / semantic writing cues, not missing photography or illustrative atmosphere.

## Authoritative print geometry

`SPEC.md` is explicit for ADD-09:

- Primary trim: **A5 portrait, 148 × 210 mm**;
- Alternate: A4 portrait reflow;
- bleed: **3 mm all sides**;
- safe: **10 mm from trim edge**.

The V4 production root uses `1000 × 1419 px` as the trim working grid (`6.756756 px/mm`). Production geometry now includes:

- trim: `148 × 210 mm`;
- bleed parent: `154 × 216 mm`;
- bleed inset in Figma: `20.2703 px` per edge;
- hidden non-print safe guide: `67.5676 px` from trim = 10 mm.

No guessed printer geometry was added beyond the item authority.

## Actual-size type QA

Using A5 trim as authority, Figma px map to about `0.4195 pt/px`.

Approximate printed sizes:

- hero 72 px → **30.2 pt**;
- operational values 27 px → **11.3 pt**;
- lead 25 px → **10.5 pt**;
- closing 24 px → **10.1 pt**;
- date 21 px → **8.8 pt**;
- kicker / role labels 20 px → **8.4 pt**.

A first print audit caught the role labels at 16 px (about 6.7 pt). They were increased to 20 px before promotion. The pen nib / signature path were also moved fully inside the authoritative 10 mm safe area.

## Three-scale visual QA

Final production was reviewed at:

1. thumbnail: `353 × 500` render — PASS; Japanese hero is the 3-second first read and the right writing rail does not become a UI sidebar;
2. reading: `705 × 1000` render — PASS; hierarchy from hero → lead → three operational roles → closing is clear;
3. native/actual canvas: `1000 × 1419` trim and `1041 × 1460` bleed render — PASS; type, rule weight, pen nib and signature path remain credible at print-detail scale.

Compared with retained `41:56`, V4 is materially different: no bottom dark desk panel, no horizontal pen-rest composition, no prior Current geometry, and no vNext family layout reuse.

## Long-copy stress / structure QA

Dynamic values were stressed with deliberately long QA copy on `66:33`.

The first stress exposed a real collision between closing/date and the fixed signature path. The fixed horizontal separator also became semantically misplaced after reflow. Promotion was blocked until both were repaired:

- removed the fixed separator;
- lowered and flattened the signature path while keeping it inside safe;
- regenerated the final stress clone from repaired production geometry.

Final readback for both Current and stress:

- visible native text: `11`;
- text outside trim: `0`;
- text outside 10 mm safe: `0`;
- non-auto-height text: `0`;
- fixed-art/text collisions: `0`;
- IMAGE-fill nodes: `0`.

Stress root is hidden after QA.

## Effective PPI / resolution

No raster IMAGE fill exists in production.

- effective raster PPI: `N/A`;
- `RESOLUTION_WARNING=NONE`.

The editable SVG/vector marks are not treated as raster resolution evidence.

## CMYK / print risks

Still require printer/profile proof:

- deep navy and deep green may close up or lose separation after CMYK conversion;
- coral may shift/dull depending on profile and paper stock;
- warm paper background must be checked against the actual paper white / stock;
- small dark text black construction must follow printer guidance; do not assume registration black or rich black;
- grayscale hierarchy should be rechecked from the final converted PDF, not inferred from RGB alone.

## Physical/deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Remain deferred until authoritative final proof exists:

- final writing method and real pen placement;
- final installation wording / location;
- holder/easel occlusion and tabletop viewing distance;
- final stock and printer CMYK/profile;
- PDF export / font embed;
- transparency, overprint and knockout checks;
- preflight;
- 100% print or physical proof.

QR, punch, fold, perforation and handwriting entry areas are not production features of this sign itself.

## Decision

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / ACTUAL_SIZE_QA_PASS / PRINT_GEOMETRY_APPLIED / CLEANROOM_PROVENANCE_PASS / NOT_PRINT_READY`.

Proceed to ADD-10 after QA.md authority is switched to this V4.