# Rurubu WEDDING — Cafe/Table photo direction full-pool + V7/V8 QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
V6 control changed: no
V7 production changed: no
V8 production changed: no

## Live authorities read before writes

- Figma study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- V7 current set: `C8 2381:2 + K5 2516:2 + F4 2427:2 + G9 2443:2 + H10 2467:2 + C6E 2505:2`
- V8 current set: `AV5 2456:2 + AW8 2459:2 + AL5 2500:2 + AQ7 2449:2 + AS7 2454:25 + AT6 2510:2`
- V7 Cafe photo authority before update: `2305:2`
- V7 Drive authority: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x`
- V8 Drive authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- actual Hawaii source-photo folder: `1A6cea2UHMv3fiZ43PcCCj3BXxXKK-PyV`

## New professional research used in the decision

Food/editorial-photo research was used for process, not surface imitation:

- editorial food photography should be intentionally appetite-producing rather than merely decorative;
- photo editors produce/edit/conceptualize the shoot with photographer and food/prop styling;
- the final image is the result of active collaboration and selection, not a generic stock slot;
- for this publication, the transferable principle is **assign distinct reader-facing jobs to photographs and picture-edit the publication/set, rather than forcing available destination images into prebuilt geometry**.

## Complete Hawaii source-pool audit

The earlier Cafe/Table audit covered 16 images. This pass fetched and visually inspected the remaining source files so the pool is now audited **001–036 / 36 of 36**.

Observed pool character:
- actual couple / wedding portraits;
- beach / lawn / park / waterfront environment;
- wedding/shoot props and portrait details.

Observed Cafe/Table eligibility across the full pool:
- appetizing food/drink evidence: `0`;
- plate/table meal detail: `0`;
- restaurant/interior evidence: `0`;
- eating/shared-meal hands: `0`.

Result: destination authenticity is verified, but Cafe/Table editorial-role fit is not. **No existing frame is adopted into H10 or AS7.**

## V7 photo-authority update

Current authority: `2305:2`
Hidden rollback created: `2526:2`

Updated decisions:
- current H10 `515×565` Cafe dominant is dummy geometry, not a final photo contract;
- current H10 `705×460` Table dominant is dummy geometry, not a final photo contract;
- select photographs before locking crop/area;
- V7 must picture-edit three different photo jobs together:
  1. Cafe dominant — appetite-first;
  2. transition — pause/table toward next shop/street;
  3. Table dominant — food + shared hands/gesture + place atmosphere.
- do not force A/B/C into one identical slot.

QA:
- screenshot: `1200×1165` PASS;
- visible native text: `28`;
- text intersections: `0`;
- bottom reserve: `34px`;
- parent: `2052:2`.

H10 `2467:2` production remains unchanged.

## V8 materially different photo-authority experiment

Current V8 production AS7 `2454:25` has one visible dining dummy `2454:49 / 500×330` and remains unchanged.

New non-current authority: `2527:2`

V8 direction is deliberately different from V7:
- one dining-essay photograph, not a three-photo set;
- the photograph behaves like a paragraph in the book;
- candidate families: appetite-led / gesture-led / atmosphere-led;
- adopt only a frame that can hold `food / gesture / place` without destroying the quiet page-turn rhythm;
- select photo before final area/crop; `500×330` is dummy geometry.

### First-pass failure

First construction used nested auto-layout with intended text auto-height, but resulting text and rows stayed at `10px`. Screenshot QA showed severe clipping. The successful API write was therefore **not** treated as successful design output.

Method switch:
- explicit safe row/text heights;
- transparent row containers;
- fixed widths;
- screenshot + geometry readback.

Repaired QA:
- screenshot: `1400×1080` PASS;
- visible native text: `20`;
- text intersections: `0`;
- bottom reserve: `214px`;
- parent: `2052:2`.

This failure is normalized as RSL-271.

## Current-root integrity after writes

Re-read current production roots:

V7:
- `2381:2`
- `2516:2`
- `2427:2`
- `2443:2`
- `2467:2`
- `2505:2`

V8:
- `2456:2`
- `2459:2`
- `2500:2`
- `2449:2`
- `2454:25`
- `2510:2`

Result:
- all parent `2052:2`;
- all current roots visible;
- pairwise current-root overlap: `0`.

## Learning state

RSL-270:
- strengthened to `VERIFIED_LOCAL (FULL-POOL ASSET AUDIT) / LIVE-DESIGN PROMOTION STILL BLOCKED`;
- negative source-pool claim is now based on the complete available pool, not a sample;
- live-design promotion still requires role-correct candidates to improve H10/AS7 at three scales.

RSL-271:
- `VERIFIED_LOCAL` Figma production failure;
- successful setter intent is not evidence of final auto-layout/text geometry;
- verify screenshot and geometry; switch construction method when the intended text-height contract fails.

## Asset truth

This pass:
- image generation: `0`;
- Drive writes: `0`;
- new Drive masters: `0`;
- production photo placement: `0`;
- new image hashes: `0`;
- final photography adoption: `0`.

## Promotion / print boundary

Neither H10 nor AS7 is final photography or print-ready. No candidate was promoted merely because the source was genuinely Hawaii. Printer template, effective PPI, PDF preflight and physical proof remain separate gates.

## Next action

- V7 H10: create/source distinct candidates for the three photo jobs and picture-edit them as one set; then redesign crop/area from the selected photographs.
- V8 AS7: create/source materially different single-frame dining essays; do not copy V7 photo count, palette, crop hierarchy or tempo.
- Compare actual role-correct photography at thumbnail, reading and detail scales before any production promotion.
