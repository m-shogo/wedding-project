# ADD-02 — Destination V4 full-family promotion QA

Date: 2026-08-21
State: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DESTINATION_V4_FULL_FAMILY_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start/latest main immediately before this write: `28276435232ae630f93693cfd0c596f730bf8662`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
Drive writes: `0`
Generated assets: `0`

## Why the full family was reopened again

The previous promoted 11-sign family was structurally sound and already held Sellable Visual PASS, but family-scale review still exposed a repeated visual fingerprint: large circles, rounded sweeps/bars and closely related mass distributions recurred across several destinations. The later V3/V4 studies proved that destination-specific material language alone was also insufficient when multiple signs converged on one quiet edge-field / upper-title skeleton.

This pass therefore evaluated a stricter question: can the entire eleven-sign collection preserve one wedding/travel family while giving each destination a materially different, place-derived layout skeleton and emotional energy?

No existing production or earlier candidate was duplicated as the authoring source for the new Hong Kong, Singapore, Bali, Korea or Maldives V4 designs in this run. Only verified non-visual requirements were carried forward: `1000×1480`, table number, destination name, date, native editable `[テーマ名]` / `[国テーマ説明]`, and the already-authoritative table order.

## Professional/place research translated into design principles

Research was used as a source of principles, not as permission to copy tourism logos or official campaign artwork.

### Hong Kong — `HARBOUR CROSSING BROADSIDE`

Official Hong Kong tourism material emphasizes contrast, vibrancy and the harbour as part of the city's identity. The clean-room direction therefore uses two shore masses divided by a broad cyan harbour corridor with restrained ferry-wake lines. It avoids fake neon lettering, skyline stock imagery, lantern cliché and transport UI.

- selected: `166:3 / VNEXT_V4 / HONG KONG / HARBOUR CROSSING BROADSIDE / CLEANROOM SELECTED CANDIDATE`
- stress: `166:45 / QA / HONG KONG V4 / HARBOUR CROSSING / LONG COPY STRESS`

A screenshot-visible fixed-art defect was caught under long copy: the small pink night register competed with the extended description. It was removed rather than forcing the text around decoration. Re-review PASS.

### Singapore — `CITY IN NATURE TERRACES`

Official Singapore tourism material describes a city where urban life and nature are deliberately intertwined; Esplanade's sunshade architecture also supports a shaded-canopy reading without copying the building literally.

The first clean-room V4 direction `166:20 / SHADE GARDEN VERANDA` was **rejected** after family-scale review because its lower vertical blocks read like a bar chart/admin visualization. The structurally valid candidate was not cosmetically polished into submission. The method was switched and a fresh blank-frame V4B was authored:

- selected: `169:2 / VNEXT_V4 / SINGAPORE / CITY IN NATURE TERRACES / CLEANROOM SELECTED CANDIDATE`
- stress: `169:23 / QA / SINGAPORE V4B / CITY IN NATURE TERRACES / LONG COPY STRESS`
- rejected V4A retained hidden as `REJECTED / SINGAPORE V4A / SHADE GARDEN VERANDA / BAR-CHART READING`

The final V4B uses an irregular green/blue canopy, staggered light panels and broad overlapping lower terraces rather than equal chart columns. Long-copy screenshot and structure QA PASS.

### Bali — `SUBAK TERRACE RHYTHM`

The design uses the principle of water/land rhythm associated with Bali's living Subak cultural landscape, without using temple silhouettes, ritual text or generic resort/tropical imagery.

- selected: `170:3 / VNEXT_V4 / BALI / SUBAK TERRACE RHYTHM / CLEANROOM SELECTED CANDIDATE`
- stress: `170:51 / QA / BALI V4 / SUBAK TERRACE RHYTHM / LONG COPY STRESS`

The first stress screenshot showed extended native copy entering the upper fixed terrace field. The terrace/water sequence was pushed downward and recomposed; footer date/copy was then repositioned onto the clay footer and visually rechecked. Final stress PASS.

### Korea — `HANJI PRINT STUDIO`

Official Korea tourism material around Hanji House describes traditional Korean paper through a showroom/open archive/print studio/workroom context. That supported a paper-and-print direction rather than a flag, palace, hanbok or K-pop shorthand.

- selected: `170:18 / VNEXT_V4 / KOREA / HANJI PRINT STUDIO / CLEANROOM SELECTED CANDIDATE`
- stress: `170:66 / QA / KOREA V4 / HANJI PRINT STUDIO / LONG COPY STRESS`

The first stress screenshot exposed two real defects: the dynamic text stack compressed into the fixed ink bar, and the initial registration mark read as a plus/cross symbol rather than print-production notation. The description lane and ink bar were separated; the cross-like mark was replaced by crop-corner marks. Final stress PASS.

### Maldives — `ATOLL CONTOUR FIELD`

Official Maldives tourism material describes 26 atolls and rings of islands/reefs, with ocean shaping identity and daily life. The design therefore uses line-only atoll contours and small island marks instead of the old generic resort/villa/sunset vocabulary.

- selected: `170:33 / VNEXT_V4 / MALDIVES / ATOLL CONTOUR FIELD / CLEANROOM SELECTED CANDIDATE`
- stress: `170:81 / QA / MALDIVES V4 / ATOLL CONTOUR FIELD / LONG COPY STRESS`

The first stress screenshot showed extended description copy approaching the atoll contour. The text lane was narrowed and the contour group moved right. Final stress PASS.

## Existing mature anchors retained from the same clean-room program

The new five destinations joined six already-mature independent candidate directions:

- HAWAII `163:2 / TRADE WIND BROADSIDE`
- ITALY `164:2 / PIAZZA POSTER RHYTHM`
- FRANCE `157:3 / JOIE BROADSIDE`
- SPAIN `153:2 / CERAMIC COURTYARD RHYTHM`
- TAIWAN `154:3 / ISLAND WEAVE`
- JAPAN `161:2 / CELEBRATION PAPER PARADE`

Earlier QA had already verified their three-scale/long-copy behavior. The V4 weak-anchor repair specifically removed the previous Hawaii/Japan/Italy convergence before this full-family decision.

## Full-family comparison

Review-only same-scale boards were built with proportional `rescale()`, not root `resize()`:

- eight-destination checkpoint: `168:2 / QA / ADD-02 / EIGHT DESTINATION V3-V4 VS CURRENT / 2026-08-21`
- full family: `172:2 / QA / ADD-02 / FULL 11 DESTINATION V4-CANDIDATE VS CURRENT / 2026-08-21`

The final full board compared all eleven candidates in table order against the retained current family at the same scale.

### Visual result

The candidate row is materially stronger on the reopened visual problem:

- no single large-circle / rounded-sweep grammar dominates the family;
- destination identity comes from different mass distributions rather than color swaps;
- Japanese/English destination typography remains clear at thumbnail scale;
- celebration energy is retained instead of replacing the old template with quiet gallery-poster minimalism;
- Hong Kong crossing, Singapore terraces, Bali water/land steps, Korea paper/print studio and Maldives atoll contours read as different artifacts while still belonging to one warm, vivid travel-wedding collection;
- the collection keeps one shared discipline—strong type, paper fields, factual table/date roles and editable Japanese copy—without forcing one layout skeleton.

Professional Design Council score for the full candidate family: **93/100**.

- concept / ownability: `14/15`
- emotional excitement: `14/15`
- Japanese/editorial typography: `13/15`
- composition / hierarchy / rhythm: `14/15`
- travel/destination integration without cliché: `10/10`
- item-specific functionality: `10/10`
- physical print credibility: `9/10`
- editability / content resilience: `5/5`
- family fit without template sameness: `4/5`

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remained after the long-copy repairs.

## Promotion and rollback

After the full-family board showed a coherent win, the entire family was promoted together rather than creating a half-old / half-new production set.

A complete pre-promotion rollback family was created first:

- `173:2 / ROLLBACK / ADD-02 / PRE-DESTINATION-V4-FAMILY / 2026-08-21`

Stable production root IDs were preserved and only their promoted contents were replaced:

| Table | Production root | Promoted clean-room source |
| --- | --- | --- |
| 01 HAWAII | `2:2` | `163:2` |
| 02 ITALY | `2:11` | `164:2` |
| 03 FRANCE | `2:20` | `157:3` |
| 04 SPAIN | `2:29` | `153:2` |
| 05 TAIWAN | `2:38` | `154:3` |
| 06 JAPAN | `2:47` | `161:2` |
| 07 HONG KONG | `2:56` | `166:3` |
| 08 SINGAPORE | `2:65` | `169:2` |
| 09 BALI | `2:74` | `170:3` |
| 10 KOREA | `2:83` | `170:18` |
| 11 MALDIVES | `2:92` | `170:33` |

Promotion is not treated as clean-room authoring: every source above had already been independently built and matured before current production was overwritten. All prior candidates and the complete old family remain preserved as history/rollback.

## Post-promotion structure QA

All eleven production roots remain `1000×1480` and editable.

Post-write Plugin API readback:

| Table | Native text | Fixed-height text | Outside root | IMAGE fills |
| --- | ---: | ---: | ---: | ---: |
| HAWAII | 6 | 0 | 0 | 0 |
| ITALY | 6 | 0 | 0 | 0 |
| FRANCE | 7 | 0 | 0 | 0 |
| SPAIN | 6 | 0 | 0 | 0 |
| TAIWAN | 6 | 0 | 0 | 0 |
| JAPAN | 6 | 0 | 0 | 0 |
| HONG KONG | 7 | 0 | 0 | 0 |
| SINGAPORE | 7 | 0 | 0 | 0 |
| BALI | 7 | 0 | 0 | 0 |
| KOREA | 7 | 0 | 0 | 0 |
| MALDIVES | 7 | 0 | 0 | 0 |

All semantic/factual copy is native text. The newly promoted family intentionally has `IMAGE fills = 0`; the old tiled print-grain image role was not carried forward merely for historical consistency because the mature V4/V3 art direction does not need it.

The dedicated stress frames were hidden after verification. Review-only family boards were hidden after evidence capture. Rejected Singapore V4A was retained hidden rather than deleted.

## Image generation / Drive decision

Image generation: `0`.

The verified bottleneck in this pass was destination specificity, layout-skeleton convergence and celebration energy—not missing photography, illustration or texture. Adding generated travel imagery would not have solved the identified defect and would have introduced unnecessary stock/AI-artifact risk.

Drive authority was verified live before promotion:

- folder ID: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- folder name: `ADD-02_11卓の国別テーブルサイン`
- Drive write: `0`

The older archival print-grain master may remain in Drive as historical asset evidence; it is no longer a current Figma production dependency for this family.

## Learning state

Strengthened within ADD-02:

- `DESTINATION_FAMILY_DIVERSITY_REQUIRES_SKELETON_AND_ENERGY_VARIATION` — `VERIFIED_LOCAL` across the complete eleven-sign family;
- `MATERIAL_DIVERSITY_CAN_STILL_CONVERGE_ON_ONE_LAYOUT_SKELETON` — independently reinforced inside the same item family;
- fixed-art-vs-dynamic-native-copy screenshot QA was reproduced on Hong Kong, Singapore, Bali, Korea and Maldives before promotion;
- a structurally valid clean-room direction must still be rejected when it recreates an admin/chart grammar, as demonstrated by Singapore V4A.

These remain item-family evidence rather than a new project-wide visual rule. Exact palettes, destination motifs and layout skeletons must not transfer literally to unrelated wedding items.

## Deferred finalization

Remain `NOT_PRINT_READY` until real final inputs/proofs exist:

- final authoritative `[テーマ名]` / `[国テーマ説明]` copy;
- exact stand/holder dimensions and obstruction proof;
- vendor bleed/trim/safe-area template;
- paper stock/profile and physical actual-size print proof;
- final venue-lighting review of thin rules and pale fields.

## Decision

`DESTINATION_V4_FULL_FAMILY_PROMOTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`.

ADD-02 should now progress out of iterative V4 expansion. The next non-Rurubu target is ADD-03 latest-live re-audit against its own current evidence and the project-wide family-scale gate; do not reopen ADD-02 again without a concrete new screenshot-supported defect or required final input.
