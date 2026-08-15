# 2026-08-15 — FO editorial image-set lesson

## Visible defect

The lower `思い出スポット` section had enough photos and strong individual crops, but the set mixed visual/place semantics in a way that felt like assembled stock travel imagery rather than one authored magazine story.

## Editorial lesson

**Judge photo groups as a sentence, not as isolated nouns.**

For a dense Japanese travel-magazine spread, lead/support photography should establish distinct scale and rhythm while still telling one plausible story. Before generating another image, test whether existing verified assets can be reassigned to better roles. Then separately audit repetition: repeated photography is a defect only when it weakens the reading, not merely because a hash appears twice.

## FO test

FO `1200:2` changed only three image roles on FN's right page:
- lead street image `1200:267` / `439a719d...`;
- exact Yokohama Q60 support `1200:268` / `644f449c...`;
- waterfront support `1200:269` / `539c259b...`.

The result was stronger at spread and actual-size scale and preserved the existing native typography and asymmetric hierarchy.

## Rejected counter-test

FP `1202:2` hid the repeated waterfront and converted role 03 to a text-led paper callout. The lower-right area lost photographic closure and the page became less convincingly magazine-like. FP was rejected and hidden.

## Future V6 use

At V6 concept start, map each photo role by **story function** before generation: dominant scene / specific destination proof / human-free atmosphere / detail / transition / closure. Generate only when a role cannot be fulfilled with an accepted source at adequate fidelity. Do not demand unique imagery per role if reuse is visually intentional, but do not let one attractive stock-like source stand in for unrelated narrative roles.

Status: adopted local lesson; cross-item candidate through RSL-012.