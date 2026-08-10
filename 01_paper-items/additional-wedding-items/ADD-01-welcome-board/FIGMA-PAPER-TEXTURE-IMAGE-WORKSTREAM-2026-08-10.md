# ADD-01 — Paper Texture Image Workstream

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_RETAINED / IMAGE_LAYER_ADDED / NOT_PRINT_READY`

## Live authority

- start/latest observed `main` before this write: `2b9bdc506deb17c202621b13bf11b2d765370f4c`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `XyyTGuz6BMf8XRhPZZfdoT`
- production root: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- hero role: `7:30 / IMG_WELCOME_HERO_REPLACEABLE`
- Drive root: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`

## Screenshot diagnosis

The promoted V2 composition remains strong, but the whole board still rendered as a very flat digital ivory plane while the real couple hero image remains intentionally unresolved. The old Drive background was reviewed and rejected for reuse because its pale cyan gradient, arcs and rounded placeholder geometry would reintroduce the generic/template look.

## Image workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for generative-AI imagery.

Rather than fabricate the couple or claim unavailable generation, a safe non-person procedural production asset was created: a warm-ivory archival paper texture with subtle grain/fiber only and no text, people, QR, venue data or factual content.

Drive master:

- file: `ADD-01_WARM_IVORY_PAPER_TEXTURE_MASTER_v1.png`
- Drive ID: `1OAia3mnw2Cl8iYOeuxI1wKlZy6p5DxdV`
- MIME: `image/png`
- size: `4,419,751 bytes`
- verified parent: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`

## Figma placement

Added an independent background image role:

- `8:2 / IMG_PAPER_TEXTURE_REPLACEABLE`
- size: `852 × 1200`
- position: full-frame `0,0`
- opacity: `0.16`
- blend: `MULTIPLY`
- IMAGE fill: `FILL`

The layer sits behind production content and does not replace the real-photo hero role.

## Screenshot / structure QA

Post-placement whole-item screenshot keeps the existing hierarchy and contrast intact while reducing the purely flat digital surface. No visible tile seam or decorative UI motif was introduced.

Structure readback:

- native text: `10`
- IMAGE fill nodes: `1` (`8:2` only)
- real hero remains separate: `7:30`
- no text was rasterized or flattened
- variable/final copy remains native editable

## Decision

Keep the texture as a replaceable low-strength production image layer. Real couple hero selection/crop remains `DEFERRED_FINALIZATION`; do not synthesize bride/groom likeness as if real.
