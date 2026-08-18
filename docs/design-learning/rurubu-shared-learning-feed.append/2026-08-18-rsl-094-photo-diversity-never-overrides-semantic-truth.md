# RSL-094 — Photo diversity never overrides semantic truth

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source: Rurubu WEDDING / V6 1DAY Plan

Visible problem: the preferred 1DAY spread reused the same waterfront image for dominant hero and STOP 01, while the publication reused a small dummy-photo pool heavily.

Root-cause hypothesis: exact adjacent-source repetition can feel synthetic, but a naive diversity fix can be worse if the substitute contradicts the named destination/story.

Bounded experiment: DW changed only STOP 01 to another existing image; actual screenshot showed a tropical resort, so DW was rejected for destination-semantic mismatch. DX changed only STOP 01 to the verified Yokohama skyline source at a source-safe `238×210`; no other route layout, copy or asset authority changed.

Expected improvement: reduce obvious same-spread repetition while preserving factual place plausibility and editable image roles.

Regression risk: a truthful replacement may itself be globally overused or visually quieter. Diversity counts alone are not an adoption metric.

Three-scale evidence: whole spread ~1200px PASS; reading PASS; right page actual 794×1123 PASS; final collision 0; 18px safe risk 0.

Figma evidence: rejected DW `1713:2`; adopted DX `1714:2`; STOP 01 `1714:41`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`; DV rollback `1701:2`.

Drive V6 root remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

What remains Rurubu-specific: Yokohama assets, route layout, times, skyline size, palette and travel-guide grammar.

Cross-item hypothesis: when reducing repeated imagery, verify semantic/factual fit before accepting a visually different source. A truthful repeat is preferable to a false substitute; the preferred outcome is a distinct truthful source when available.
