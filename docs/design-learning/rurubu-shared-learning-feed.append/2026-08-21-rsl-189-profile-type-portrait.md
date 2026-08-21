# Rurubu shared learning append — type portrait without false image authority

Date: 2026-08-21
Owner: Rurubu WEDDING hourly improvement task

## RSL-189 — If portrait authority is absent, synthetic image mass can be less authentic than native type

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: Rurubu WEDDING V8 Profile/Q&A

### Visible problem

V8 Profile used a generated contact-proof-style image as the largest left-page visual, but the image did not carry a legitimate portrait, place, event, documentary fragment or information role. It read as an image-shaped placeholder and increased AI/prototype feeling.

### Evidence before change

Current prior root `2164:2` used generated image role `2164:6`, while the actual identity facts already lived in editable text. No verified real-person portrait authority was available, and generated recognizable people cannot represent the real couple.

### Root-cause hypothesis

The defect was not merely low image quality. Visual mass was assigned to an image without semantic/documentary ownership. When the role is profile/identity and no portrait authority exists, that false visual promise can be more damaging than intentional typographic restraint.

### Principle tested

Before generating or retaining image-shaped profile decoration, ask whether the image can truthfully carry identity or documentary meaning. If not, test whether native typography can act as the profile's visual voice while keeping identity facts editable.

### Bounded change

On rollback-safe V8 Profile H `2177:2`:

- hide the generated contact-proof role;
- preserve right-page Q&A;
- split the existing SHOGO / SHI-CHAN facts into two native typographic identities;
- keep one functional rule and semantic section index;
- remove decorative English microcopy that did not help the reader;
- preserve former Profile F `2164:2` as hidden rollback.

### Expected improvement

Lower AI/template signal, stronger identity clarity, no false portrait implication, and a more defensible book-design page without inventing an image.

### Regression risk

A text-led profile can become sterile or overly sparse; real verified portrait photography may later outperform this treatment. Do not turn this into a blanket anti-photo rule.

### Three-scale evidence

- 500px whole spread: PASS; two-person contrast remains the primary left-page read.
- 1400px reading scale: PASS.
- 1588×1123 actual size: PASS.
- visible native text: 25.
- IMAGE fill nodes: 0.
- same-parent text intersections: 0.
- 18px safe-area risks: 0.
- visible internal/process-language fingerprints: 0.

### Figma / Drive / GitHub evidence

- current Figma root: `2177:2`
- rollback root: `2164:2`
- previous generated master remains Drive `1MsisJ-qed1vYjGbMFiylN2DI6Lim_1Ko` as historical/rollback provenance only; it is not claimed by current H
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-PROFILE-H-TYPE-PORTRAIT-QA-2026-08-21.md`

### What must remain Rurubu-specific

Names, exact copy, 01/02 treatment, typography scale, color system, coordinates, book-edition composition and V8 current-state declaration.

### Cross-item applicability

Another print item may independently test this only when a profile/identity image has no verified semantic or identity authority. It must not be used as permission to remove legitimate photography or to copy this layout.

### Failure fingerprint

`F-RSL-189-SYNTHETIC-PROFILE-VISUAL-WITHOUT-PORTRAIT-AUTHORITY`

Stop condition: if a future role-specific, legitimate and visually stronger portrait/identity asset exists, compare it against the typographic solution rather than preserving type-only design by doctrine.
