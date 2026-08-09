# ADD-02 — Reopened Visual Clean-room / Hong Kong + Singapore + Bali + Korea + Maldives

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_DIRECTION_ADVANCED / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `a3a2a47a3f45abc7e0af4436b5fd3f5f35647ff1`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Hong Kong production: `2:56 / FRAME_TABLE_SIGN_HONG_KONG`
- Singapore production: `2:65 / FRAME_TABLE_SIGN_SINGAPORE`
- Bali production: `2:74 / FRAME_TABLE_SIGN_BALI`
- Korea production: `2:83 / FRAME_TABLE_SIGN_KOREA`
- Maldives production: `2:92 / FRAME_TABLE_SIGN_MALDIVES`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Fresh production diagnosis

The remaining production signs still use the repeated sparse color-block archetypes already rejected by the reopened visual gate. They are structurally usable but do not read as five destination-specific pieces in a sellable 11-sign collection. This run therefore created separate clean-room candidates without touching production.

## Hong Kong V2 — harbor-grid editorial

Created `16:2 / QA_ADD_02_HONG_KONG_CLEANROOM_V2_HARBOR_GRID_2026_08_10`.

Direction:

- deep navy city field, narrow cinnabar spine, and a deliberately cropped warm-paper cut;
- oversized two-line `HONG / KONG` hierarchy;
- cyan harbor lines and two limited amber/red vertical light fields rather than fake neon or fake signage;
- large native `香港`, semantic dummy copy and non-badged `07` in the lower paper field;
- no lantern cliché, skyline stock photo, fake Chinese text, transport UI, gradients, rounded cards, or shadow.

Screenshot QA confirms a materially different visual grammar from Taiwan V2: Hong Kong is more vertical/harbor-grid driven while Taiwan remains storefront/night-print driven. The warm blank cut is intentional negative space rather than a detached card.

## Singapore V2 — tropical modernism

Created `16:29 / QA_ADD_02_SINGAPORE_CLEANROOM_V2_TROPICAL_MODERN_2026_08_10`.

Direction:

- jade field, black structural column, sand field, and one coral architectural accent;
- modernist vertical blocks plus a restrained botanical ellipse/stem instead of literal landmark illustration;
- large `SINGAPORE`, native `シンガポール`, semantic dummy copy and `08`;
- no Marina Bay Sands cliché, merlion clip-art, generic tropical stock image, UI framing, or gradients.

Screenshot QA shows strong thumbnail hierarchy and a distinct tropical-modernist rhythm that does not reuse the Hawaii coastal grammar.

## Bali V2 — volcanic earth / split carved geometry

Created `16:49 / QA_ADD_02_BALI_CLEANROOM_V2_VOLCANIC_CARVED_2026_08_10`.

Direction:

- clay upper field, ink transition band, ochre sun and pale carved split-gate geometry;
- large `BALI`, native `バリ`, semantic dummy copy and `09`;
- earth/stone print palette instead of photographic resort imagery;
- no temple-photo cliché, fake ritual text, tropical stock photo, or ornamental overload.

The first screenshot exposed two diagonal line elements as an accidental waveform-like crossing through the carved geometry. `BA_VOLCANO_LEFT` and `BA_VOLCANO_RIGHT` were hidden in the same run. The repaired screenshot reads as a split carved/gate silhouette rather than an audio waveform.

## Korea V2 — hanji modular print

Created `16:72 / QA_ADD_02_KOREA_CLEANROOM_V2_HANJI_MODULAR_2026_08_10`.

Direction:

- cobalt, coral and ink top-field blocks with a warm-paper lower field;
- fine hanji/fold lines, large `KOREA`, native `韓国`, semantic dummy copy and `10`;
- intentionally contemporary print composition rather than flag, palace, hanbok, or K-pop cliché.

The first screenshot showed the fold-line set running behind the native country title. The fold lines were compressed upward (`y=718...854`, width `475`) so the final screenshot keeps the title clear while retaining the paper-fold texture.

## Maldives V2 — horizon / water-field poster

Created `16:93 / QA_ADD_02_MALDIVES_CLEANROOM_V2_HORIZON_FIELD_2026_08_10`.

Direction:

- aqua sky, deep navy water field, sand horizon and one coral disc;
- uneven cyan water rules plus one white current line rather than a resort/bungalow stock image;
- large `MALDIVES`, native `モルディブ`, semantic dummy copy and `11`;
- no overwater-villa cliché, luxury-resort advertising treatment, gradient sunset, or generic travel-photo look.

Screenshot QA confirms a clean horizon-led identity distinct from Hawaii's volcanic/coastal direction.

## Structure QA

Live Plugin API readback after final screenshot repairs:

| Candidate | Frame | Native text | IMAGE fills | Safe guide | Text outside root |
| --- | --- | ---: | ---: | ---: | ---: |
| Hong Kong `16:2` | `1000 × 1480` | 7 | 0 | 1 | 0 |
| Singapore `16:29` | `1000 × 1480` | 7 | 0 | 1 | 0 |
| Bali `16:49` | `1000 × 1480` | 7 | 0 | 1 | 0 |
| Korea `16:72` | `1000 × 1480` | 7 | 0 | 1 | 0 |
| Maldives `16:93` | `1000 × 1480` | 7 | 0 | 1 | 0 |

No rasterized or flattened text was introduced. Variable copy remains native editable text.

## Image-generation status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image is claimed. No generated candidate was saved or placed. The run continued with native graphic-art-direction work because all five targets had concrete composition defects that could be improved without inventing raster assets.

When image generation becomes available, only generate destination imagery that can plausibly beat these clean-room posters in context. Use multiple materially different candidates and reject stock-tourism aesthetics, fake lettering/signage, distorted architecture, plastic surfaces and over-processed AI lighting. Variable copy must remain native in Figma.

## Drive

- exact authority folder verified live: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- Drive changes: `0`
- reason: no adopted raster master exists in this run.

## Decision

`ADD_02_VISUAL_DIRECTION_ADVANCE / REMAINING_FIVE_CLEANROOMS_CREATED / BALI_SCREENSHOT_DEFECT_REPAIRED / KOREA_SCREENSHOT_DEFECT_REPAIRED / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED`

All 11 destinations now have either a materially different clean-room direction or an earlier clean-room candidate. Do not bulk-promote yet. The next highest-value step is a whole-family thumbnail review of the eleven clean-room directions, followed by selective subtraction/normalization of shared anchors (safe area, folio, table-number logic, typography family) while preserving destination-specific visual grammar. Only after that family review should winning clean-room candidates replace production and ADD-02 receive `SELLABLE_VISUAL_QA_PASS`.