# 2026-08-21 — Rurubu V6 IE Gourmet clean-room feedback

Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Visible problem

In the common 500px preferred-set comparison, HC `2012:2` Gourmet/Cafe was the weakest spread. Its left page depended on a large pale composed texture/background field and a small waterfront photograph, so the page felt sparse and brochure/web-like despite adequate native copy. The right dining page was already strong.

## Principle / capability tested

Replace a decorative pseudo-hero with one legitimate, semantically plausible existing photo role before adding decoration or generating a new asset. Rebuild hierarchy with dominant photography + native Japanese typography, while preserving neighboring work that already passes visual QA.

## Bounded change

IE `2061:2` was created as a rollback-safe duplicate of HC. On the left page only:

- hid the composed texture field;
- reused verified Rurubu café/dessert source `2003:15`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, as the dominant café image;
- retained the waterfront fill as a smaller support image;
- re-clustered native Feature 01/02 text without new cards/shadows/gradients;
- left the strong right dining page unchanged.

## Expected improvement

Stronger Japanese travel-magazine first read, more asymmetric photo/type hierarchy, less empty decorative field, and less UI/brochure rhythm without sacrificing editability or adding asset lifecycle risk.

## Regression risk

Dominant-photo enlargement can expose source softness; large numbers/headlines can collide; collision fixes can over-compress type into timid columns; reusing an image can create narrative repetition. Final photography still needs legitimate replacement authority.

## Review evidence

- whole-item 500px: PASS;
- reading spread 1400px: PASS after corrective loops;
- actual-size left `2061:3 / 794×1123`: PASS;
- left native text `20`, IMAGE fills `2`, text intersections `0`, 18px safe-area risk `0`;
- right native text `22`, IMAGE fills `1`, text intersections `0`, 18px safe-area risk `0`.

The first IE reading-scale candidate exposed Feature 01 crowding and structure readback found two unintended text intersections. Those were corrected before promotion. A subsequent collision-free Feature 02 became too narrow at thumbnail scale; it was widened and the support image shifted. This is important: technical collision-free status alone was not accepted as visual success.

## Adopted state

- preferred: IE `2061:2` at x=`273800`, y=`1300`;
- hidden rollback: HC `2012:2`;
- no newly generated assets;
- no new Drive save;
- no new binary upload;
- no new image hash;
- native text and replaceable photo semantics preserved;
- V7 untouched.

## Evidence references

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IE-GOURMET-CLEANROOM-PHOTO-LED-QA-2026-08-21.md`
- evidence commit `b0fda291ed7bb72813664fd3d9d3183b54764fed`
- status promotion commit `f692bb9c6cfdc53b14de875bb085b0be2bc71861`
- shared lesson `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-21-rsl-161-dominant-photo-can-replace-decorative-pseudo-hero.md`

## Next application

Re-run the six-spread common thumbnail comparison with IE replacing HC and choose the next weakest page. Do not continue polishing IE merely because it is newest. Apply this method elsewhere only when a real decorative pseudo-hero/background field is visibly substituting for hierarchy; never transfer IE geometry, assets, palette, or Rurubu visual grammar as a generic template.