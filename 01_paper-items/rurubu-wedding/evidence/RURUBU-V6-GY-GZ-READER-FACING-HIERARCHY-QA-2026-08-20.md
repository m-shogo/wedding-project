# Rurubu WEDDING V6 — GY / GZ reader-facing hierarchy QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
V7: HOLD

## Start state

Live review-board authority before this run:

- Outer GU `1975:2`
- Profile / Q&A HA `1996:99`
- Story / chronology GW `1987:2`
- Memory Spots GV `1976:2`
- Cafe / Table GL `2000:2`
- 1DAY Plan GQ `1968:71`

The shared learning system, Rurubu feed and neutral non-Rurubu feed were read before writes. No non-Rurubu item-specific Figma, Drive, ledger, asset or GitHub production path was inspected or edited.

## Experiment A — Memory Spots GY

### Visible problem

GV's right page was structurally clean but SPOT 03 remained materially weaker than SPOT 04 at actual size. Its `03`, title, body and English-only microcopy read more like a small inserted module than a deliberate travel-guide beat. The guide metadata below also retained generic English semantic labels despite a Japanese-first page.

### Hypothesis

The small photograph itself was already legitimate and source-safe, so the correct first move was not a new photo or card. Increasing the native editorial responsibility of the ordinal/title/body and converting ordinary semantic microcopy to reader-facing Japanese could strengthen the beat while preserving the major/minor hierarchy.

Neutral methods consumed as hypotheses:

- actual-size audit of the smallest meaningful reader-facing copy;
- Japanese-first semantic labels when English has no unique authenticity/navigation job.

No literal non-Rurubu layout, palette, asset or production state was transferred.

### Bounded test

Rollback-safe duplicate GY `2003:2`, right page `2003:24`:

- `GUIDE_KICK`: `4 PLACES / OUR YOKOHAMA` → `横浜 / 4つの寄り道`;
- SPOT 03 ordinal: `72px → 82px`;
- SPOT 03 title: `27px → 31px`;
- SPOT 03 body: `12.5px → 13.5px`;
- SPOT 03 meta: `MINATOMIRAI / SUNSET / WALK` → `夕暮れどき / 水辺をさんぽ`, `10.5px → 11.5px`;
- SPOT 04 label: `04 / TABLE & TALK` → `04 / 食卓の時間`, `11px → 11.5px`;
- guide metadata converted to native Japanese-first labels: `おすすめ時間 / 夕暮れ`, `気分 / さんぽ`, `写真 / 水辺`, `カフェ / 休憩`, `夕景 / みなとみらい`, `食卓 / ふたり時間`;
- all four photo roles, crops and image hashes unchanged.

Initial structure QA found one real `GUIDE_DECK ↔ SPOT03_NUM` collision of approximately `104×6px`. The ordinal was moved down; the failed intermediate state was not adopted.

### Verification

- whole spread / 1200px: PASS and stronger than GV;
- reading/page scale: PASS;
- actual-size right `2003:24 / 794×1123`: PASS;
- right visible native text: `19`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- image geometry/hash changes from GV: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Promotion:

- GY `2003:2` → `PREFERRED / V6_INSIDE_GY_MEMORY_SPOT03_JAPANESE_READER_HIERARCHY_2026_08_20` at review-board x `272000`, y `1300`;
- GV `1976:2` → hidden rollback.

## Experiment B — Profile / Q&A GZ

### Visible problem

HA's primary Q&A hierarchy was strong, but fresh native-size audit found several meaningful reader-facing secondary roles at `9–10.5px`, including the Q6 kicker, support-photo caption and Q5 answer. These were not decorative folios; they carried real editorial or answer content.

### Hypothesis

A page can look strong at thumbnail scale while meaningful secondary copy remains physically fragile. A bounded type hardening should improve native-size reading without flattening the major hierarchy, provided long-copy reserve is retested.

### Bounded test

Rollback-safe duplicate GZ `2004:2`, right page `2004:49`:

- `QA_FOOT`: `10.5 → 11.5px`;
- `QA_CLOSING_NOTE`: `10.5 → 11.5px`;
- `QA_SUPPORT_CAPTION`: `10 → 11.5px`;
- `QA_Q04_EDITORIAL_KICK`: `10.5 → 11.5px`;
- `QA_Q6_KICKER`: `9 → 11.5px`;
- Q5 answer: `10.5 → 11.5px`;
- photos, image hashes, primary questions, primary answers and overall composition unchanged.

Dedicated long-copy proof `2004:101` expanded the Q5 answer to `70px` height. First proof failed by `4px` against the bottom closing editorial line. The production candidate was not adopted in that state. Moving only the closing line from y `995 → 1010` restored long-copy reserve while remaining inside the physical footer/safe-area reserve.

### Verification

- whole spread / 1200px: PASS;
- reading/page scale: PASS;
- actual-size Q&A `2004:49 / 794×1123`: PASS;
- right visible native text: `29`;
- production collision count: `0`;
- 18px safe-area risks: `0`;
- long-copy proof collision count after repair: `0`;
- long-copy proof safe-area risks: `0`;
- image geometry/hash changes from HA: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Promotion:

- GZ `2004:2` → `PREFERRED / V6_PROFILE_QA_GZ_SECONDARY_READER_COPY_ACTUAL_SIZE_2026_08_20` at x `273800`, y `0`;
- HA `1996:99` → hidden rollback;
- long-copy proof `2004:101` → hidden evidence.

## Rejected experiment — Outer GX

A rollback-safe Outer candidate `2002:2` tested reusing the already-verified Cafe composed travel texture as a bounded background behind the back-cover chronology.

The candidate passed basic rendering and actual-size inspection, but the reused fixed texture did not materially strengthen chronology hierarchy and made the back-cover lower field feel like the same generic design language reused across sections. This conflicts with the section-specific visual-role intent: fixed decoration should have a local semantic/editorial job, not merely fill space.

Decision: `REJECTED`.

- GX `2002:2` renamed `REJECTED / V6_OUTER_GX_REUSED_SECTION_TEXTURE_TOO_GENERIC_2026_08_20`;
- hidden; GU remained preferred.

Failure fingerprint:

`CROSS_SECTION_COMPOSED_TEXTURE_REUSE_GENERICITY / same fixed texture reused across unrelated Rurubu section roles / technically valid but visually generic and homogenizing / stop same-treatment reuse unless the receiving section has a specific semantic need`.

## Final all-six live audit

Final live preferred set:

- GU Outer `1975:2`
- GZ Profile / Q&A `2004:2`
- GW Story / chronology `1987:2`
- GY Memory Spots `2003:2`
- GL Cafe / Table `2000:2`
- GQ 1DAY Plan `1968:71`

Start Here:

`V5 FU/FX · V6 GU + GZ/GW + GY MEMORY SPOTS + GL CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

Cross-spread structure audit:

- preferred spreads: `6`;
- physical pages: `12`;
- visible native-text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible implementation/proof/placeholder leakage: `0`;
- visible IMAGE roles: `29`;
- unique image hashes: `8`.

Image hash repetition remains a known quality ceiling rather than a numerical target. Current counts are unchanged by GY/GZ because no image role changed.

## Asset lifecycle declaration

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GY adopted + placed + visually verified: YES;
- GZ adopted + placed + visually verified: YES;
- GZ long-copy proof: PASS after repair;
- GX generated/transport state: not applicable; existing composed raster reused only in rejected Figma study;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback history preserved: YES;
- V7 touched: NO.

## Completion status

This is not V6 completion and not print-ready. Final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold requirements, exported PDF preflight and physical proof remain required.