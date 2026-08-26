# Run 04 summary

Meaningful changes:

- Resolve patch authority updated from 21.0.3 to 21.0.4.
- New Studio scope getter treated as read/scope only, not write proof.
- `.drfx` promoted to the leading scripting-free reusable Resolve Free recovery candidate, with clean-install/dependency canaries.
- Remotion runtime/skill versions separated; current runtime remains 4.0.475 and candidate stable is 4.0.508.
- Remotion package upgrades must be atomic and version-coherent.
- Current Free routing now prefers direct native import -> native transported properties -> generated `.drfx` -> guided native rebuild -> alpha bake -> Studio scripting only where available and verified.

No property was promoted to Runtime Verified in this run.
