# WEDDING PASSPORT — vNext Professional QA / 2026-08-21

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / VNEXT_SELECTED_CANDIDATE / READY_FOR_PROMOTION / NOT_PRINT_READY`

## Live authority

- start/latest `main` before this evidence write: `800d8e2f0fa2c4e0f6d44367ee5e0b59b658a2bf`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- vNext reset: `docs/automation/NON-RURUBU-PROFESSIONAL-VNEXT-RESET-2026-08-20.md`
- professional council: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected front: `178:2 / VNEXT_SELECTED_CANDIDATE / PASSPORT FRONT / ISLAND DEPARTURE`
- selected back: `178:16 / VNEXT_SELECTED_CANDIDATE / PASSPORT BACK / SUNSET AFTERGLOW`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata was read back live; no Drive write was needed because this direction does not require raster/generated imagery.

## Clean-room authorship

The vNext direction was built from blank frames and did not copy visual nodes, old layouts, decorative vectors, image crops, rails, badges, or generated assets from prior Passport production. Only factual/semantic requirements were carried forward: 1480×2100 canvas, wedding-passport physical role, confirmed date `2026.10.24`, `YOKOHAMA`, and editable semantic roles for couple name / issue information.

The retained prior selected family was opened only after the new vNext candidate had reached full-size structure + stress QA, solely for final comparison.

## Authoring split

- variable/factual copy: native Figma text;
- fixed graphic atmosphere: simple native editable vector/shape roles;
- replaceable photography: none required for this direction;
- generated/composed raster: none required;
- IMAGE fills: `0` on both selected roots;
- variable text baked into raster/SVG: `0`.

## Structural defect found and repaired

Live structure readback found a hidden authoring defect that screenshot appearance alone did not reveal: all 16 vNext text roles had `textAutoResize=NONE` with nominal height `10px`, while the rendered glyphs visually overflowed those boxes. This made future copy growth, collision checks and editable text geometry unreliable even though the screenshots looked correct.

Rollback copies were preserved before repair:

- `179:28 / ROLLBACK / VNEXT PASSPORT FRONT / PRE TEXT GEOMETRY FIX / 2026-08-21`
- `179:42 / ROLLBACK / VNEXT PASSPORT BACK / PRE TEXT GEOMETRY FIX / 2026-08-21`

After explicitly loading `Noto Sans JP Bold`, `Noto Sans JP Medium`, `Inter Bold`, and `Inter Medium`, all 16 selected-candidate text nodes were changed to `textAutoResize=HEIGHT` while widths and positions were preserved.

Representative corrected geometry:

- front headline `178:9`: `820×10 / NONE` → `820×420 / HEIGHT`
- front couple `178:14`: `430×10 / NONE` → `430×52 / HEIGHT`
- back headline `178:21`: `1090×10 / NONE` → `1090×256 / HEIGHT`
- back closing `178:26`: `720×10 / NONE` → `720×360 / HEIGHT`

Post-repair screenshots preserve the intended composition.

## Long-copy / variable-role stress

Rollback-safe QA copies were created after the geometry repair:

- `180:2 / QA / VNEXT PASSPORT FRONT / LONG COPY STRESS / 2026-08-21`
- `180:16 / QA / VNEXT PASSPORT BACK / LONG COPY STRESS / 2026-08-21`

Stress changes were limited to native variable text roles. No production decoration or geometry was copied from an old design.

Front stress:
- couple name expanded to two lines, bottom `1934` on a 2100px canvas;
- closing joy line expanded to two lines, bottom `2022`;
- no text left the canvas and the large-scale hierarchy remained readable.

Back stress:
- message expanded to three lines, bottom `892`;
- issue information expanded to two lines, bottom `1262`;
- couple name expanded to two lines, bottom `1990`;
- no text left the canvas and no factual/semantic role was rasterized.

## Three-scale visual QA

### Whole-item / thumbnail

PASS.

Front reads immediately as a bright departure-day keepsake: ocean spine → oversized sun → Japanese headline → sweeping coral gesture → large date → lower lagoon/magenta movement. Back reads as afterglow/return: deep ocean field → warm Japanese message → factual date cluster → cropped coral sunset → oversized closing phrase.

No admin-dashboard cards, fake airport UI, fake barcode, class/gate credentials, scanner reticles, random badges, gradients, shadows, or tropical clip-art are present.

### Reading scale

PASS.

Japanese copy remains the emotional carrier. English is subordinate artifact identity. Date/place and semantic placeholders remain distinct from emotional copy. The front couple-name role remains readable over the organic lower field; long-name stress still preserves hierarchy.

### Actual-size / detail / structure

PASS for current digital master geometry; physical vendor proof remains deferred.

- selected roots: 1480×2100 each;
- native text: 8 front + 8 back;
- IMAGE fills: 0;
- corrected auto-height text geometry provides real editable bounds;
- long-copy stress remains inside the canvas;
- no unintended flatten/rasterization was introduced.

## Professional council score

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-up: `14/15`
- Japanese typography / editorial craft: `13/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / flight / Hawaii warmth without cliché: `9/10`
- Item-specific functionality: `8/10`
- Physical print credibility: `8/10`
- Editability / realistic content resilience: `5/5`
- Family fit without template sameness: `5/5`

Total: `90/100`.

Executive Creative Director: no veto.
Japanese Editorial Designer: no veto after real text geometry repair and stress review.
Print Production Director: no veto for the digital master; physical paper/vendor proof remains deferred.

## Final comparison against retained prior selected family

Only after the vNext candidate was mature, retained prior roots were opened for final comparison:

- retained front `144:3 / V3 / FRONT / ARCHIVAL PORT LOG`
- retained back `144:26 / V3 / BACK / ARCHIVAL END NOTE`

The retained family remains strong as a quiet archival/editorial direction, but the vNext family is the clearer match for the new project brief: more joyful, more pop, more arrival/departure energy, warmer destination character, and stronger instant emotional impact while avoiding fake aviation credentials.

Decision: vNext is the preferred professional direction and clearly wins the current `SUNSHINE DEPARTURE` brief. Prior production remains preserved as rollback/history.

## Deferred finalization

`NOT_PRINT_READY` remains until physical proof / printer profile / stock / finishing / final names and final issue copy are authoritative.

## Next target

Proceed to BOARDING PASS vNext professional QA. First receiving-item check: verify whether its native text geometry reproduces the same hidden `10px + textAutoResize=NONE` failure fingerprint before judging long-copy resilience.
