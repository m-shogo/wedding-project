# ADD-06 フォトブースサイン V3 — shallower footer band QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / PRODUCTION_ADOPTED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start authority SHA: `2c492b7415106bb15a53bcde20200583c7fb4a5d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected clean-room V3: `25:3`
- long-copy proof: `25:41`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Visible problem

After the earlier removal of generic kicker/route decoration and radar-style lens reticle, fresh whole-item review showed the remaining mint footer field using `226px` of the `1400px` canvas while carrying only date and location. The large field made the bottom read more like a separate web/footer section than a compact print anchor.

The problem was not missing decoration or missing imagery. The band simply occupied more vertical mass than its information role required.

## Bounded comparison

Created selected comparison:

- `37:2 / QA / ADD-06 V3 / SHALLOWER FOOTER BAND / 2026-08-19`

Only the footer region changed:

- mint field: `y 1174 / h 226` → `y 1210 / h 190`;
- date: `y 1242` → `1260`;
- location: `y 1238` → `1256`.

Title, Japanese photo-booth cue, two-ring editable lens mark, colors and all text wording were unchanged.

The shallower band was stronger at whole-item scale: it remained a clear physical bottom anchor without reading as a detached UI footer.

## Long-copy verification

Matching stress comparison:

- `37:22 / QA / ADD-06 V3 / SHALLOWER FOOTER LONG COPY / 2026-08-19`.

Existing long location copy remained native and wrapped inside the shallower band. Final stress location bottom: `1324 / 1400`, leaving `76px` bottom clearance.

Native-size long-copy screenshot: PASS.

## Adoption / rollback

Before production mutation, hidden rollbacks were created:

- `38:2 / ROLLBACK / ADD-06 V3 / PRE_SHALLOW_FOOTER / 2026-08-19`;
- `38:22 / ROLLBACK / ADD-06 V3 STRESS / PRE_SHALLOW_FOOTER / 2026-08-19`.

The same bounded footer change was adopted in selected `25:3` and stress `25:41`. Comparisons were hidden after adoption; stress returned to hidden state.

## Three-scale / structure QA

- whole / ~500px: PASS;
- reading / ~1000px: PASS;
- actual selected canvas `990×1400`: PASS;
- actual long-copy proof `990×1400`: PASS;
- selected location bottom: `1290`, root bottom `1400`;
- long-copy location bottom: `1324`, root bottom `1400`;
- native variable copy preserved;
- IMAGE fills: `0`;
- no rasterization or flattening introduced.

## Drive / image decision

Exact Drive folder was live-read immediately before mutation. Drive write: `0`.

Image generation: `0`. The visible defect was oversized footer-section mass, not a missing visual asset.

## Decision

`FOOTER_SECTION_MASS_REDUCTION_PASS`.

This remains item-specific. A colored bottom band should not be mechanically reduced in other artifacts when it carries a real physical, binding, contrast or information-density role.