# ADD-07 Escort Card Guide — V2 Step Marker Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED_IN_SELECTED_V2 / LONG_COPY_REVALIDATED / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `ef37fa6e9db30a407c5690e1efb9cbc1e91fa84e`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- selected A2: `14:3`
- selected A3: `14:25`
- long-copy stress: `15:4 / 15:27`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- retained legacy production remains unchanged: `1:2 / 1:17`

## Visible problem

Fresh whole-item review of the selected clean-room V2 family showed that each `01 / 02 / 03` number sat on top of an offset blue station circle. The mint route already supplied the wayfinding/station relationship, so the extra filled circles made the steps read more like UI/status markers and created optical crowding around the number glyphs.

The issue was visible in both A2 and A3. The Japanese action labels and route itself were already strong and did not need redesign.

## Bounded comparison

A rollback-safe comparison was created on Figma page:

- `23:2 / QA / ADD-07 / STEP MARKER SUBTRACTION / 2026-08-18`
- A2 candidate: `23:3`
- A3 candidate: `23:26`

Only two things changed in the candidate:

1. hide the three filled station-circle vectors while preserving the mint route and arrow;
2. recolor native step numbers `01 / 02 / 03` from navy to the existing route-blue.

No title, lead, action copy, route geometry, terminal field, date, location, safe area, or size changed.

## Result

The candidate was stronger at whole-item scale: the route remains obvious, but the steps read as editorial wayfinding rather than button/status UI. The blue number itself now performs the station emphasis without a redundant container.

The change was adopted into selected A2/A3 and synchronized to both hidden long-copy stress roots.

Pre-change hidden rollbacks:

- `23:49`
- `23:72`
- `23:95`
- `23:118`

## QA

After adoption:

- A2 whole-item / 500px: PASS
- A3 whole-item / 500px: PASS
- A2 reading / 1000px: PASS
- selected roots remain `1400×1980` and `990×1400`
- raster IMAGE fills added: `0`
- station-circle vectors visible in each route group: `0`; route line + arrow remain visible
- long-copy stress `15:4 / 15:27`: text outside root `0`
- long-copy screenshots remain readable; number/action bounding boxes are close by design, but glyphs do not visually collide
- stress roots returned to hidden QA state after verification

## Hybrid authoring / Drive

- variable copy: native Figma text
- route semantics: existing clean-room editable vector preserved
- generated/composed asset: not required
- Drive writes: `0`

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid for the selected V2 family, with `STEP_MARKER_UI_SUBTRACTION_PASS` added as local visual polish evidence.

This is an item-specific treatment. Do not transfer the exact route, number color, or marker geometry to other wedding items. The reusable QA principle is only to remove redundant visible containment when the functional route/binding relationship remains clear without it.
