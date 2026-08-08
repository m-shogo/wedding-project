# V5-06 lead memory coast — role crop / binary-safe promotion

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Production Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Current target: `77:430 / IA_MEMORY_1_PHOTO`
Comparison: `436:2 / V5_MEMORY_01_COAST_DERIVATIVE_COMPARISON_2026_08_08`, target `436:148`

## Source / visible problem

V5-06 was still an active incomplete lead-memory role. The semantic box is `398 × 214`, but the intended Drive source had not yet been verified through the full derivative → Figma → screenshot → structure → Git lifecycle.

The visible goal was not to create another decorative image. It was to make the first MEMORY SPOTS image read as a clear coastal-trip memory while remaining visually subordinate to the larger history lead.

## Hypothesis / tested principle

The verified master was already compositionally strong enough. Before regenerating, test a role-specific wide crop that preserves the coast, horizon, cliff town, boats and mountain edge while removing excess foreground/sky.

Acceptance criteria:
- derivative at least exact `2×` target size (`796 × 428`)
- source remains specific and natural at `398 × 214`
- no false-person identity risk
- Drive readback verified
- duplicate-first Figma placement
- whole/page, reading and actual-size screenshots pass
- semantic node, native text, fold guide and rollback remain intact

Expected improvement:
- stronger destination specificity and memory-story function
- materially sharper / more intentional crop than the old fill
- no unnecessary asset regeneration

Possible regression:
- blue ocean could dominate the lower page
- aggressive crop could lose destination context
- transfer compression/corruption could create false success

## Master review

Drive master:
- file: `06_MEMORY_SPOT_01_COAST_DUMMY.png`
- ID: `1DgbIjrpAhRunU6fmDVF4y_jcXOB4t3wx`
- size: `2,453,405 bytes`
- decoded source: `1448 × 1086`

Visual review found the master suitable for the role. It already contains a plausible coastal scene without recognizable generated people. Regeneration was therefore **rejected as unnecessary activity**.

Role crop tested from the master:
- crop box: `(0, 105, 1448, 884)`
- output geometry: `796 × 428` — exactly `2×` the Figma semantic box

## Accepted derivative

Accepted V5 dummy-design derivative:
- `RURUBU_V5_06_MEMORY_COAST__FIGMA_796x428_Q30.jpg`
- Drive ID: `1epb80L7WSZDmU86zl6PVQkZ8frP1JEeN`
- `796 × 428`
- `23,276 bytes`
- SHA-256: `0c0ac76ed45aa8f0261df92b5e1ead40991a3d5c767b5ab2a01ab8c921ce8746`

A Q42 derivative (`29,983 bytes`, Drive ID `1yCTMVW18KYQjHnlTHAZzCShQsnPfGt9J`) and Q18 fallback (`15,415 bytes`, Drive ID `1mJYvY7aJT0AcA4Z450lwZ2QjlUMyb7jc`) were also produced during transport testing, but neither is the Current evidence asset. Q30 is the accepted derivative because its natural-size screenshot passed and the exact bytes were successfully reconstructed and promoted.

## Transport failures and method change

Several routes were tested only on rollback-safe comparison material:

1. Figma upload endpoint was obtained but the execution environment again could not resolve `mcp.figma.com`.
2. `figma.createImageAsync()` was unavailable in this host runtime.
3. `fetch` was undefined inside the Figma execution sandbox.
4. private `setPluginData` was unavailable and the host explicitly directed use of shared plugin data.
5. one shared-data chunk attempt was truncated. The encoded-length guard caught the mismatch before decoding or Current mutation.

Method switched rather than repeating the same blocker:
- `setSharedPluginData` with five guarded chunks
- chunk lengths: `6500, 6500, 6500, 6500, 5036`
- reconstructed encoded length: `31,036`
- decoded length: `23,276 bytes`
- JPEG SOI/EOI verified
- then `figma.createImage(bytes)` was applied to the comparison node

This was a transport method, not quality evidence. Promotion happened only after screenshot and structure QA.

## Figma verification

Comparison:
- frame: `436:2`
- node: `436:148 / IA_MEMORY_1_PHOTO`
- geometry: `398 × 214`
- previous comparison hash: `8344d95d228f3ca6661d2dbd06220353d265a540`
- verified new hash: `adbb8e529451a81dd25e4eb29bf068655569ce25`

Current promotion:
- node: `77:430 / IA_MEMORY_1_PHOTO`
- previous hash: `8344d95d228f3ca6661d2dbd06220353d265a540`
- Current hash: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- Current and comparison hashes match exactly

## Three-scale QA

### Whole-item / spread

PASS. The lower-right MEMORY SPOTS section now has a clear coastal lead image. It remains subordinate to the large history waterfront photo while giving the memory section its own destination identity.

### Reading / page

PASS. Reading order remains timeline → history lead → MEMORY SPOTS heading → coast lead → small memory spots. The blue coast image does not overwhelm the page hierarchy.

### Actual-size detail

PASS for V5 dummy-design QA at natural `398 × 214`. Coastline, cliff-town buildings, boats, horizon, mountain edge and cloud structure remain visibly distinct without obvious block compression.

This is not final commercial-print image approval; real-content and printer-specific resolution remain separate gates.

## Structure QA

Post-promotion Current inside:
- native text nodes: `92`
- IMAGE-fill nodes: `9`
- semantic node name and `398 × 214` geometry preserved
- fold guide `77:288` preserved
- rollback `59:2` and `59:178` preserved
- comparison `436:2` preserved
- temporary shared transport chunks cleared after hash verification

## Result

`DISCOVERED → PROTOTYPED → VERIFIED_FOR_V5_DUMMY_DESIGN / PHOTO_ROLE_PASS / ROLE_COMPLETE / NOT_PROJECT_RULE`

V5-06 is now a verified completed active role. The broader technique remains contextual: inspect a good master and try role-specific cropping before regeneration, but do not generalize Q30 or this byte size to dominant photography.

## Next application

1. Test the same master-first / role-crop-first logic on V5-12 and V5-13, with their own actual-size QA.
2. Do not generalize this compression to V5-01; the cover hero remains the final dominant blocker and requires its own higher bar.
3. Keep V5-03/V5-04 identity-safe: recognizable generated faces cannot become stand-ins for the real couple.
4. V6 production remains closed until the complete V5 dummy-photo/design gate is verified.
