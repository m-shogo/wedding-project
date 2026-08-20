# ADD-04 受付サイン — QA

Status: `CURRENT / CLEANROOM_V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / V3_AND_LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

Current selected clean-room V4:

- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- selected section: `29:9 / SELECTED CLEANROOM V4 / ADD-04 / JAPANESE RECEPTION PLACARDS / 2026-08-20`
- groom selected: `29:10 / SELECTED V4 / GROOM / JAPANESE RECEPTION PLACARD`
- bride selected: `29:26 / SELECTED V4 / BRIDE / JAPANESE RECEPTION PLACARD`
- groom long-copy proof: `30:34` — hidden after QA
- bride long-copy proof: `30:50` — hidden after QA
- pre-footer-subtraction rollback: `30:2 / 30:18` — hidden
- each selected frame: `740×1050`
- prior selected V3 preserved: `16:2 / 16:17`
- retained legacy preserved: `1:3 / 1:14`
- exact Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

Current V4 evidence: `FIGMA-CLEANROOM-V4-JAPANESE-PLACARD-QA-2026-08-20.md`.

## Why V4 supersedes V3 visually

Fresh same-scale review of V3 showed a real whole-item weakness despite its previous structural and visual PASS: the large black title band was clear, but the remaining A5 field read as two unresolved fields floating in a long empty paper area. At thumbnail scale it approached Current's `false premium by emptiness` failure mode.

V4 was built on new blank `740×1050` frames without duplicating any V3/legacy frame, layout group, black band, rail, icon, SVG, bitmap, generated asset or crop. It uses only the verified item facts and semantic requirements.

The selected V4 direction is a Japanese editorial reception placard:

- warm paper field;
- narrow groom/bride edge spine instead of a large hero band;
- Shippori Mincho `受付` as the dominant tabletop read;
- stacked native `新郎側 / 新婦側` identity;
- compact date/location register;
- restrained bilingual reception role;
- native reader-facing reception cue;
- open lower name/direction ledger rather than cards or form boxes;
- no shadows, gradients, badges, fake transport data, icons or image filler.

At ~500px V4 has stronger Japanese-first physical-sign identity, uses the full paper field more intentionally, and remains immediately recognizable as reception signage. V3 remains intact as rollback/history but is no longer the selected visual family.

## V4 bounded polish

The first V4 draft included tiny `RECEPTION DESK` footer text. It duplicated the already-established reception role and behaved as decorative English filler. Hidden rollback copies `30:2 / 30:18` were created, then only that footer was removed from selected V4. No factual or semantic field changed.

## Three-scale visual QA

Groom `29:10`:

- whole-item / ~500 px: PASS;
- reading / ~800 px: PASS;
- actual canvas / `740×1050`: PASS.

Bride `29:26`:

- whole-item / ~500 px: PASS;
- actual canvas / `740×1050`: PASS;
- optical pair review: PASS; bride/groom share a family but are not a blind mirrored duplicate.

Completion-only comparison against preserved V3 at ~500px: V4 preferred.

## Structure / long-copy stress

Selected V4 readback, each root:

- `740×1050`;
- `clipsContent=true`;
- visible native text `10`;
- IMAGE fills `0`;
- visible text outside root `0`;
- visible text collisions `0`;
- variable name/direction fields remain native editable text;
- variable content baked into raster/SVG `0`.

Long-copy stress `30:34 / 30:50` uses a long native name and multi-line direction message. Actual-size screenshot and structural readback both PASS:

- visible text outside root `0`;
- visible text collisions `0`;
- long name expands `46px → 92px`;
- long direction expands `34px → 68px`;
- both remain clear of subsequent roles and the lower rule in the tested range.

Stress proofs are hidden after QA.

## Hybrid authoring / asset decision

- variable/factual copy: native editable Figma text;
- semantic placeholders: native editable `[お名前] / [方向]`;
- fixed art: simple native paper/line geometry only;
- editable SVG: not required for this direction;
- generated/composed raster: not required;
- replaceable image role: not required.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported bottleneck was composition and typography, not missing hero imagery, texture, illustration or collage.

Drive authority was live-read immediately before the V4 evidence write and confirmed as `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`. Drive write `0`.

## Fact / placeholder contract

Confirmed facts/roles:

- groom/bride reception distinction;
- date `2026.10.24 SAT`;
- location `YOKOHAMA`;
- optional native name field;
- optional native direction/guidance field.

Do not invent receptionist names, surname use, payment/gift handling, QR, gate/flight/seat information or other operational facts. Unknown name/direction values remain semantic placeholders until authoritative copy exists.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- whether the optional name role is used and its final wording;
- actual direction wording;
- stand/holder overlap and lower-edge occlusion;
- venue lighting/glare and approximately 2m viewing-distance proof;
- final printer template, bleed, safe area, stock/profile and physical print proof.

Do not reopen V4 for cosmetic churn unless a fresh screenshot or authoritative input exposes a concrete defect. Next progression target: `ADD-05 サンキュータグ / プチギフトタグ`.
