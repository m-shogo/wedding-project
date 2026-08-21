# Rurubu shared-learning append — 2026-08-22

## RSL-199 — Adjacent pages should not repeat the same semantic job as different modules

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: Rurubu WEDDING V8 1DAY J → T
Figma current: `2203:2`

### Visible problem

V8 1DAY J had a correct time-scaled timeline on the right, but the left repeated the same four schedule events as another time/action/descriptor list. The two pages were visually different yet semantically redundant. At spread scale this read as a data/UI prototype rather than a publication with deliberate page-to-page pacing.

### Root-cause hypothesis

Removing cards and making row spacing uneven is not enough if neighboring pages still perform the same editorial job. AI-assisted layouts often preserve every available data representation instead of deciding which page owns exact information and which page owns atmosphere, interpretation, pacing or transition.

Failure fingerprint:

`F-RSL-199-ADJACENT-PAGES-REPEAT-SAME-SEMANTIC-JOB-AS-DIFFERENT-MODULES`

### Professional principle tested

Fresh Eye Magazine research on Richard Turley / Mark Porter emphasized editorial pacing, scale and protecting content from redundant design paraphernalia. The bounded Rurubu hypothesis was:

> When two adjacent pages repeat the same underlying facts, assign distinct editorial responsibilities before adding another visual system.

### Bounded test

T `2203:2` preserved the exact time-scaled right timeline. On the left it hid duplicated time/action rows and reused only the existing Japanese descriptors `海辺 / 長めに / 寄り道 / ゆっくり` as an uneven typographic pace score.

Left became experiential pacing; right remained exact data.

### Rejected subtest

The first pass alternated red on `長めに / ゆっくり`. This was rejected because the color contrast had no semantic owner. The modifiers were switched to the existing neutral gray/regular weight.

Related warning fingerprint:

`UNOWNED-ACCENT-COLOR-ALTERNATION`

### Evidence

- whole spread: PASS
- reading scale: PASS
- actual size `1587×1123`: PASS
- native visible text: `26`
- visible IMAGE: `0`
- text intersections: `0`
- 18 px safe risk: `0`
- one-character semantic wrap tails: `0`
- rollback J `2179:2` retained hidden
- V6/V7 untouched
- Drive writes: `0`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-1DAY-T-DIFFERENTIATED-PACE-TIME-DATA-QA-2026-08-22.md`

### What must remain Rurubu-specific

Do not transfer the exact `海辺 / 長めに / 寄り道 / ゆっくり` words, type sizes, coordinates, V8 cream/navy palette, timeline geometry, schedule times or page composition.

### Cross-item applicability hypothesis

Potentially transferable diagnostic only:

1. inspect adjacent pages/halves for duplicated semantic responsibility;
2. choose one owner for exact facts/data;
3. let the other side perform a different real editorial job using article-owned content;
4. reject decorative alternation that lacks semantic ownership;
5. verify at spread, reading and actual-size scale.

Do not promote to a project rule until a materially different item independently benefits without losing usability or required redundancy.
