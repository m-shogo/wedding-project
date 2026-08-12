# BOARDING PASS — Clean-room V2 Reopened Sellable Visual QA

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `a2170f472e054761e3fbd851a0eebdbdd2e927ae`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `P2PtpMyhyZqHYe1ZBBCD13`
- production front: `8:5 / FRAME_FRONT`
- production back: `8:73 / FRAME_BACK`
- Drive authority folder: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`

The prior `DESIGN_QA_PASS_WITH_PLACEHOLDERS` is treated only as structural/factual history. The visual gate below is based on current live screenshots and the materially different clean-room V2.

## Reopened visual diagnosis

The live pre-V2 front was functional but still looked like an airline/admin form: a giant full-width navy header, evenly spaced field blocks, heavy English labels, fake-machine barcode treatment, and a detachable stub that felt like a UI side panel rather than a designed paper object.

The live pre-V2 back had the opposite problem: after removing fake-airline decoration, it became a navy side rail plus a large empty cream field. It was clean but visually under-authored, relying on absence rather than strong Japanese typography or editorial rhythm.

Both therefore failed the reopened question: “Would this be selected if it arrived today as a new professional proposal?”

## Clean-room V2 front

Created `18:2 / QA_BOARDING_FRONT_CLEANROOM_V2_EDITORIAL_2026_08_10` as a materially different rollback-safe comparison.

Key changes:

- removed the giant navy top banner and reduced navy to a narrow physical-edge anchor;
- retained the detachable/perforated stub because it has real paper-function value;
- changed hierarchy from English airline form language to Japanese-first editorial labeling;
- `BOARDING PASS` became subordinate `ESCORT TICKET` rather than the main visual claim;
- main semantic headline is the native editable guest-name field;
- fake route semantics were replaced with explicit editable reception/table placeholders: `[受付情報 · LAYOUT DUMMY]` and `[卓情報 · LAYOUT DUMMY]`;
- date, ceremony time, and venue are treated as a lower editorial information row rather than equal dashboard fields;
- fake barcode bars were hidden instead of used as visual filler;
- stub remains table-led, with roman-name and final-information placeholders clearly separated;
- added only one short burgundy anchor and one low-opacity `24` typographic atmosphere; no plane, stamp, fake route, gradient, shadow, or generic badge was added.

## Clean-room V2 back

Created `18:70 / QA_BOARDING_BACK_CLEANROOM_V2_EDITORIAL_2026_08_10`.

Key changes:

- removed the full-height 205px navy side band and reduced it to the same narrow edge language as the front;
- changed English `THANK YOU FOR COMING` to Japanese-first `きょうを、ありがとう。`;
- rebuilt the body in native Japanese serif type with a deliberate three-line editorial rhythm;
- added a short burgundy horizontal anchor and very low-opacity native `余韻` atmosphere on the right;
- kept one small `WEDDING NOTE` kicker and one date/location folio only;
- screenshot review caught a duplicated orange date inherited from the old side rail; the duplicate was hidden in the same run so the final back has one clear factual folio.

## Screenshot QA

Front and back were reviewed from live 1200 × 550 renders after the clean-room edit and again after production promotion.

### Front

- no giant header/dashboard band remains;
- information hierarchy reads left-to-right as name → reception/table → date/time/venue → detachable table stub;
- the stub still reads as a physical tear-off element rather than a UI sidebar;
- typography now has a Japanese editorial character rather than generic airline-system styling;
- no fake barcode, route line, plane, airline stamp, or unsupported transport credential is visible;
- the short red rule and faint date numeral function as anchors without becoming template decoration.

### Back

- `きょうを、ありがとう。` is the clear first read;
- the right-side `余韻` atmosphere uses native text and remains intentionally faint;
- negative space is now supported by typographic rhythm rather than being empty by default;
- duplicated date was removed after screenshot review;
- no fake airline language, route, class, stamp, barcode, or badge remains visible.

## Long-copy stress

Front stress proof: `19:2 / QA_BOARDING_FRONT_CLEANROOM_V2_LONG_COPY_STRESS_2026_08_10`.

Tested native editable semantic strings include:

- `[長い氏名レイアウト確認テキスト · LAYOUT DUMMY]`;
- `[LONG ROMAN NAME · LAYOUT DUMMY]`;
- `[長い受付案内レイアウト確認テキスト · LAYOUT DUMMY]`;
- `[長い卓案内レイアウト確認テキスト · LAYOUT DUMMY]`;
- `[長い会場名レイアウト確認 · LAYOUT DUMMY]`.

The name and supporting fields wrap as intended without collision or frame escape.

Stress structure:

- frame: `1200 × 550`;
- native text nodes: `24`;
- IMAGE-fill nodes: `0`;
- text outside frame: `0`.

## Production promotion and rollback

V2 clearly won the live same-size comparison and was promoted while preserving semantic production IDs.

- production front remains `8:5 / FRAME_FRONT`;
- production back remains `8:73 / FRAME_BACK`;
- former front production preserved as `21:2 / ROLLBACK_BOARDING_FRONT_PRE_V2_EDITORIAL_2026_08_10`;
- former back production preserved as `21:70 / ROLLBACK_BOARDING_BACK_PRE_V2_EDITORIAL_2026_08_10`;
- clean-room candidates remain available for comparison history;
- front stress proof `19:2` remains available.

## Post-promotion structure readback

### Front `8:5`

- `1200 × 550`, `clipsContent=true`;
- native text nodes: `24`;
- IMAGE-fill nodes: `0`;
- text outside frame: `0`;
- rollback `21:2` exists at `1200 × 550`.

### Back `8:73`

- `1200 × 550`, `clipsContent=true`;
- native text nodes: `8`;
- IMAGE-fill nodes: `0`;
- text outside frame: `0`;
- rollback `21:70` exists at `1200 × 550`.

All visible variable information remains native editable text/vector structure; no raster flattening was introduced.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image was claimed, stored, or placed. The live defect was composition/typography, and the successful clean-room solution did not require a raster hero. Adding a generic airline/travel image would have increased stock/AI risk rather than fixing the paper hierarchy.

## Drive

Drive authority was re-read immediately before the production write and again before this evidence write.

- folder ID: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`;
- Drive changes: `0`;
- reason: no generated or raster asset was adopted.

## Deferred finalization

`DEFERRED_FINALIZATION` remains for final guest name/romanization, table assignment, any final reception/venue wording, final approved thank-you wording, printer/vendor geometry and export profile, and physical 100% proof.

These do not block the reopened sellable placeholder visual pass.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

BOARDING PASS may leave the reopened visual queue. Next target is `青春ふたりきっぷ`, which must be reopened visually even if its older structural QA passed.

## 2026-08-12 fresh front spot-check — semantic placeholder normalization

Observed latest `main` immediately before production edit: `9d604c29e20bfdc782ba011f3276e4d0ff62d3e4`.

Fresh 1200×550 front/back screenshots confirmed the V2 editorial direction remains strong. The front still exposed several legacy generic `DUMMY` values and an ambiguous detachable-stub table value `--`, even though Current requires unknown variable values to remain explicit semantic layout placeholders.

Rollback-safe proof:
- hidden front rollback: `24:2 / ROLLBACK_BOARDING_FRONT_PRE_SEMANTIC_PLACEHOLDER_FIX_2026_08_12`;
- production root remained `8:5`.

Production changes, all native editable text:
- `21:108 / TXT_GUEST_NAME`: `[氏名 · DUMMY]` → `[氏名 · LAYOUT DUMMY]`;
- `21:123 / TXT_VENUE_VALUE`: `[VENUE · DUMMY]` → `[会場名 · LAYOUT DUMMY]`;
- `21:127 / TXT_STUB_NAME`: `[ROMAN NAME · DUMMY]` → `[ローマ字氏名 · LAYOUT DUMMY]`;
- `21:129 / TXT_STUB_GATE`: `[最終案内 · DUMMY]` → `[最終案内 · LAYOUT DUMMY]`;
- `21:126 / TXT_TABLE_VALUE`: ambiguous `--` → two-level `[卓番号]` + small `LAYOUT DUMMY`; the role was resized to `185×52` and positioned at `y=106` inside the physical tear-off stub.

The old `GATE` and `YOKOHAMA / HAPPINESS` legacy text nodes remain hidden and were not revived.

Post-write screenshot QA:
- front 1200×550: PASS; guest name remains the dominant editorial anchor;
- reception/table/date/ceremony-time hierarchy is unchanged;
- stub now communicates that the table value is replaceable rather than displaying an unexplained dash;
- back 1200×550 was freshly checked and required no edit.

Live post-write structure:
- front `8:5`: 1200×550, `clipsContent=true`, 24 native text nodes, 0 text outside root;
- current later-adopted IMAGE role: `23:2 / IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`, opacity `0.14`, blend `MULTIPLY`;
- no raster flattening or variable copy was baked into the texture.

The IMAGE role supersedes the older historical `IMAGE-fill nodes: 0` production snapshot above; it was not added in this spot-check. Drive authority remained `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`; Drive write this spot-check: `0`.

Current result remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`.
