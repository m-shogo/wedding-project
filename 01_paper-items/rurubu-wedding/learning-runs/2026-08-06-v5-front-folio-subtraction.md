# V5 Front Folio Subtraction — Verified Learning Run

Date: 2026-08-06
Item/version: Rurubu WEDDING V5
Live Figma page: `01_RURUBU_WEDDING`
Candidate: `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` (`77:18`)

## Authority and scope

This run followed the project-wide production, asset, continuous-learning, feedback, project-memory, and quality-over-legacy authorities plus the current Rurubu status and editorial lessons. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Visible problem

The front cover retained a small bottom-right folio instance displaying `P.01 COVER` (`77:250`). The cover already communicates its identity through the masthead, issue bar, hero feature hierarchy, six-item contents module, and bottom issue footer. The folio added a second UI-like pill in the same lower area without improving navigation or comprehension.

## Anti-legacy question

Would this element be chosen if the existing composition did not already contain it?

Decision: no. A cover does not need a page-location marker that restates `COVER`, especially when a footer and issue hierarchy are already present.

## Hypothesis

Hiding the redundant folio should reduce interface-like badge density and leave a cleaner lower-right edge while preserving the contents grid, footer, hierarchy, native text, semantic photo nodes, editability, fold guide, and rollback history.

## Expected improvement

- clearer cover silhouette at thumbnail scale
- less UI/pill repetition at reading scale
- quieter lower-right edge at actual-size detail scale
- no loss of meaningful editorial information

## Possible regression

The lower-right corner could appear visually empty or the contents module could lose a useful endpoint. Adoption therefore required a new whole-spread screenshot and structural readback.

## Change

- node: `77:250`
- name/type: `RURUBU/Folio` / `INSTANCE`
- text descendant: `P.01 COVER`
- position/size: `x 624`, `y 1038`, `88 × 25`
- mutation: `visible: true → false`
- deletion: none
- rollback: immediate by restoring visibility

No photo, crop, fill, text content, frame hierarchy, or semantic role was altered.

## Verification evidence

### Thumbnail / whole-item

The post-change outer-spread screenshot preserved the front/back balance, masthead dominance, hero-photo authority, contents grouping, and bottom footer. The former folio area does not read as a hole.

### Reading / page

Reading order remains:

`issue bar → masthead/date → feature ribbon → hero photograph → feature overlays → six-item contents → issue footer`

The folio supplied no unique navigation after the contents and footer were already present.

### Detail / actual-size

- no text reflow
- no collision or clipping
- no mask exposure
- no image-crop change
- no fold/safe-area regression observed

### Structure readback

- folio `77:250`: `visible: false`
- native text nodes in outer candidate: `85`
- visible text nodes: `52`
- IMAGE-fill nodes: `14`
- semantic dominant photo nodes remain intact, including `77:24` and `77:148`
- provisional fold guide `77:288`: preserved and visible
- V4 rollback outer `59:2`: preserved
- V4 rollback inside `59:178`: preserved

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT`

The subtraction improved restraint without removing information or damaging structure. This remains a bounded V5 decision; it is not promoted directly into a universal project rule.

## Failure

None in the Figma mutation or QA. The change was incremental and rollback-safe.

## Ledger and gate effect

This was an editorial-density improvement, not an asset-provenance closure. Therefore:

- `INTENDED_SOURCE_APPLIED`: unchanged
- `PHOTO_ROLE_PASS`: unchanged
- V5 dummy-design completion gate: unchanged
- V6 start gate: unchanged

## Next application

Resume the higher-priority Batch A work through a binary-safe Figma image-placement route. Do not repeat the previously failed manual base64 or external upload POST methods without a materially different transport capability. Continue bounded editorial repair only when it does not displace dominant-image correction.
