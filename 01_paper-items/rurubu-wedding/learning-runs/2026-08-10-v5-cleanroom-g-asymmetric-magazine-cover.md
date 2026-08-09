# V5 Clean-room G — asymmetric magazine cover QA

Date: 2026-08-10
Status: `PROTOTYPED / VISUALLY_STRONGER_COMPARATOR / NOT_CURRENT`
Scope: Rurubu WEDDING V5 outer only

## Authorities re-read

Before the run, re-read the project-wide Figma production system, asset-generation memory, AI continuous-learning system, project memory, quality-over-legacy decision, the design-learning feedback log, the live Rurubu Figma page, verified Drive hero derivatives, and `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`.

The live Figma state remains the highest visual authority. The role ledger currently still reports 11 active roles / 10 photo-role pass / 10 complete; this run does not rewrite those counts because the cover production hero is still not verified in Current.

## Visible problem

The prior clean-room E comparator (`608:665`) had improved the cover silhouette, but the front still read as a neat layout around one soft city image and the back cover remained too airy. The right-side cover modules lacked the overlap and scale variation of a Japanese travel-information magazine.

The Current/legacy cover hero hash remains `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, already rejected for visible quality risk.

## Hypothesis

A materially different photo-led comparator should improve the Rurubu-like editorial feel by:

- using one dominant image rather than a card grid;
- adding small photographic callouts with asymmetric crop, rotation, and overlap;
- strengthening Japanese display hierarchy;
- turning the back cover into a photo-led editorial page instead of a quiet archive layout;
- keeping native text, semantic image roles, fold guide, provenance, and rollback-safe comparison frames.

Regression risk: a side stack could become a web gallery; tilted photos could become decorative scrapbook noise; enlarging a non-cover-specific source could reveal softness; route decoration could collide with microtype.

## Prototype F — rigid gallery rejected as final direction

Created:

- `609:2 / V5_OUTER_RURUBU_CLEANROOM_F_COLLAGE_2026_08_10`
- front `609:129`
- supporting photo nodes `609:156`, `609:157`, `609:158`

The front replaced the known-low-quality cover placeholder with an existing verified Figma image fill (`539c259be8036b481d06b4f76db9a39b407d90e8`) only as a comparison image, increased title scale, and created a photo collage.

Whole-item screenshot QA showed a meaningful image-quality and hierarchy gain, but the three aligned right-side photos read too much like a gallery/UI rail. Result: `REVISE`, not Current.

## Prototype G — asymmetric magazine composition

Created:

- `609:159 / V5_OUTER_RURUBU_CLEANROOM_G_ASYMMETRIC_2026_08_10`
- front `609:286`
- comparison hero `609:287`
- supporting callouts `609:312`, `609:313`, `609:314`

Front changes:

- dominant comparator hero enlarged to `620 × 610`;
- three supporting photos converted from a rigid rail to asymmetric overlapping callouts;
- one supporting photo is circular; two remain rectangular with small opposing rotations and white print-like borders;
- Japanese coverline hierarchy remains dominant;
- navy pull-quote overlaps the image bottom;
- pink/cyan/yellow bottom rule remains as a compact editorial anchor;
- feature navigation remains native text below the photo.

Whole-item and front-only screenshots show a clearer Japanese travel-magazine silhouette than clean-room E/F. The composition is more photo-led, more asymmetric, and less like a dashboard/gallery.

## Back-cover redesign inside G

The back cover was also changed materially:

- `OUR TRAVEL NOTES` increased in scale;
- main camera/map photo expanded to `690 × 350`;
- memory caption moved into a dark navy image-overlap panel with pink/white type;
- `FRIENDS & FAMILY` became a two-photo mini-feature with unequal image sizes;
- yellow and cyan caption bands replace isolated card-like captions;
- route section moved upward to reduce dead space.

Reading-scale QA detected a real regression: the zig-zag route lines crossed the year/event microtype. The fix moved all years/events downward and the zig-zag lines upward. A fresh screenshot verified separation after the correction.

## Three-scale status

### Whole item / thumbnail

`PASS_AS_COMPARATOR`: clean-room G is materially more energetic and magazine-like than clean-room E. Front/back density and scale contrast are stronger.

### Reading/page scale

`PASS_AS_COMPARATOR`: headline → hero → pull quote → feature row reads clearly. The back-cover route collision was found and fixed. Supporting photo callouts remain clearly secondary to the hero.

### Actual-size/detail

`CONDITIONAL`: native text and structure remain intact, but the temporary comparison hero is not the cover-role Drive derivative and is being enlarged beyond its original role. It therefore cannot satisfy the cover photo gate.

## Structure QA

Final readback for `609:159`:

- native text: 59
- visible text: 40
- IMAGE-fill nodes: 11
- fold guide: `609:315`, visible, 2 px
- comparison hero: `609:287`, `620 × 610`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- back main: `609:165`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`
- friend photos: `609:180` hash `2005b91ce26ead7d8128f547c293fe4a510f5d24`; `609:184` hash `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
- temporary transfer node removed after failed transport test

No Current frame was overwritten.

## Cover derivative transport test

Drive readback verified:

- Q60 derivative ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, 1330 × 1220 JPEG, 155,439 bytes
- Q30 transport derivative ID `1vp6S35BwocVVpciT3kuybjk-Pp5GIyyc`, 1330 × 1220 WebP, 66,850 bytes

A fresh Figma `upload_assets` endpoint was requested for node `609:287`. The execution container again failed DNS resolution for `mcp.figma.com`. This is the same external-network blocker already observed previously, so this route is now considered repeated and must not be retried unchanged.

A direct `createImageAsync` URL path was also rejected because that API is unsupported in the current Figma runtime. Failed Figma scripts were atomic.

The ledger contains a previously verified alternative: guarded shared-plugin-data chunk reconstruction inside Figma. That is the next binary-safe method if a role-sized transport derivative is imported in a future run.

## Decision

- Clean-room G: `ADOPT_AS_STRONGEST_OUTER_COMPARATOR_SO_FAR`
- Promote to Current: `NO`
- V5 complete: `NO`
- V6 production start: `NO`

Reason: the composition is now stronger, but `609:287` is only a comparison image borrowed from another verified role. The cover-specific Drive derivative must be transported, visually QA'd at all three scales, hash-bound to the target node, and reconciled with the ledger before Current promotion.

## Reusable lesson

1. A rigid side-image rail quickly reads as web/gallery UI even when photography is strong. Asymmetric crop, overlap, scale variation, and a clear dominant photo better support travel-magazine grammar.
2. Increasing editorial density must be followed by actual-size microtype QA; route decoration can collide even when the whole page looks stronger.
3. Repeating a DNS-blocked upload endpoint is not progress. After two confirmed failures, switch to an already-proven in-editor chunk reconstruction path or continue safe editorial work.

## Next application

1. Use the Drive-backed 1330 × 1220 cover derivative, preferably the Q60 master-derived candidate, through the proven guarded shared-plugin-data reconstruction path rather than another external POST.
2. Apply it first to the clean-room comparator hero, verify image hash, then run whole-spread / front-page / actual-size screenshot QA.
3. If clean-room G still wins after the real cover derivative is placed, reconcile the asset ledger and only then consider Current promotion.
