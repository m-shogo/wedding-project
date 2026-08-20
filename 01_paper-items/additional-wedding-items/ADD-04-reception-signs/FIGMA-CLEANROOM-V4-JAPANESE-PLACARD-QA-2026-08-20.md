# ADD-04 受付サイン — Clean-room V4 Japanese Placard QA

Date: 2026-08-20
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LONG_COPY_STRESS_PASS / V3_AND_LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before this evidence write: `c3bb6895077bff98d058b218fc520fb0fd21f97c`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- selected review section: `29:9 / SELECTED CLEANROOM V4 / ADD-04 / JAPANESE RECEPTION PLACARDS / 2026-08-20`
- groom V4: `29:10 / SELECTED V4 / GROOM / JAPANESE RECEPTION PLACARD`
- bride V4: `29:26 / SELECTED V4 / BRIDE / JAPANESE RECEPTION PLACARD`
- V4 long-copy stress: `30:34 / 30:50`, hidden after QA
- V4 pre-footer-subtraction rollback: `30:2 / 30:18`, hidden
- prior selected V3 preserved: `16:2 / 16:17`
- retained legacy preserved: `1:3 / 1:14`
- exact Drive authority folder: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

Drive metadata was live-read immediately before this write and confirmed that exact folder ID/name. Drive write: `0`.

## Why the visual pass was reopened again

Fresh same-size review of selected V3 showed a real whole-item weakness despite its earlier structural/sellable evidence: the large black reception band was clear, but the rest of the A5 field was extremely sparse. At thumbnail scale the sign read as `header band + two unresolved fields + long empty paper`, close to the Current failure mode of treating emptiness as premium quality.

This was not a missing-image defect. Image generation would have added theme decoration without solving the information hierarchy, so `IMAGE_GENERATION_NOT_REQUIRED` was retained.

## V4 clean-room construction

V4 was created on new blank `740×1050` frames. No old Figma node, layout group, band, rail, icon, SVG, generated asset, crop or bitmap was duplicated into V4.

The only item facts/semantic constraints carried into the new frames were:

- groom/bride reception distinction;
- date `2026.10.24 SAT`;
- location `YOKOHAMA`;
- optional native name field;
- optional native direction/guidance field;
- A5-like current frame size `740×1050` as the existing verified digital canvas constraint.

The reopened audit had identified the abstract failure fingerprint `SPARSE_FALSE_PREMIUM`; V4 did not reuse V3's black-band composition or visual construction. After V4 existed, same-scale comparison was repeated for selection.

## V4 art direction

Direction: **Japanese reception placard / editorial paper sign**.

- warm uncoated-paper field;
- narrow colored edge spine rather than a large black UI-like band;
- Shippori Mincho `受付` as the dominant tabletop read;
- stacked native `新郎側 / 新婦側` side identity;
- compact date/location register;
- restrained bilingual `GROOM RECEPTION / BRIDE RECEPTION` secondary role;
- native reader-facing cue `こちらで受付をお願いいたします`;
- open lower ledger for optional `お名前` and `ご案内` fields;
- one simple lower rule for the direction field;
- groom/bride use different edge/accent colors but remain one physical-paper family;
- no cards, shadows, gradients, fake gate/flight/seat data, icons, badges or image filler.

The first V4 draft included tiny decorative `RECEPTION DESK` footer copy. It added no reader-facing information and repeated the reception role, so hidden rollback copies `30:2 / 30:18` were created and only that footer was removed. The cleaner variant was selected.

## Hybrid authoring split

- variable/factual content: native editable Figma text;
- semantic placeholders: native editable `[お名前]` / `[方向]`;
- fixed decoration: simple native lines/fields only because the geometry is small and functional;
- reusable SVG: not required for this direction;
- generated/composed raster: not required;
- replaceable image role: not required;
- variable information baked into raster/SVG: `0`.

## Three-scale visual QA

### V4 groom `29:10`

- whole-item / ~500 px: PASS;
- reading / ~800 px: PASS;
- actual canvas / `740×1050`: PASS.

At thumbnail scale the primary `受付` and `新郎側` identity remain immediately legible, while the lower field has enough information rhythm to avoid the prior empty-template reading. At reading/actual size the small date/location, labels and bilingual role remain legible without competing with `受付`.

### V4 bride `29:26`

- whole-item / ~500 px: PASS;
- actual canvas / `740×1050`: PASS;
- mirrored-role optical review: PASS; the bride side is not a blind geometric mirror because title/date/identity anchors are independently placed.

### Completion comparison against V3

Current V3 `16:2 / 16:17` remains structurally valid and preserved. At ~500 px, V4 is preferred because it:

- has stronger Japanese-first physical-sign identity;
- uses the A5 field more intentionally;
- avoids the large generic black hero-band treatment;
- reduces the false-premium empty lower field without adding boxes or decorative clutter;
- remains immediately readable as reception signage.

Decision: `V4 SELECTED / SELLABLE_VISUAL_QA_PASS`.

## Long-copy / structure QA

Stress proofs:

- groom `30:34`;
- bride `30:50`.

Stress content intentionally exercised a long native name and a two-to-three-line native direction message. Both proofs were inspected at actual `740×1050` and hidden after QA.

Live structural readback for each selected V4 root:

- size `740×1050`;
- `clipsContent=true`;
- visible native text: `10`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- visible text collisions: `0`.

Live structural readback for each stress root:

- visible native text: `10`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- visible text collisions: `0`;
- long name expands from `46px` to `92px` height;
- long direction expands from `34px` to `68px` height;
- both remain clear of the next semantic role / lower rule in the tested range.

All variable text remains native and editable. No full-page flattening was introduced.

## Asset / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported bottleneck was composition and typographic hierarchy, not missing hero imagery, illustration, texture or collage. No generated candidate was produced merely to satisfy an image quota.

- Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`;
- Drive writes: `0`;
- generated assets: `0`.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- whether the optional name role is used and its final wording;
- actual direction wording;
- stand/holder overlap and lower-edge occlusion;
- venue lighting/glare and approximately 2m viewing-distance proof;
- final printer template, bleed, safe area, stock/profile and physical print proof.

V3 and retained legacy remain preserved for rollback/history. Next progression target: `ADD-05 サンキュータグ / プチギフトタグ`.
