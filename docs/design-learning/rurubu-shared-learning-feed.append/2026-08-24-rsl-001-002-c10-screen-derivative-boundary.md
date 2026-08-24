# RSL-001 / RSL-002 reproduction — V7 C10 real-photo screen derivative boundary

Date: 2026-08-24
Source: Rurubu WEDDING / V7 Outer
State: strengthens existing `RSL-001` and `RSL-002`; **no new failure ID**

## Observed

A legitimate real Hawaii/couple image had reached Figma as a `350×233` screen-comparison derivative and was displayed inside an approximately `793.7×765` hero role. The photo was semantically much stronger than the structural dummy and supported meaningful crop comparison, but it was visibly too small to establish actual-size or print quality.

## Bounded experiment

- C9 `2462:2`: real-photo screen derivative with `FILL`.
- C10 `2483:2`: same imageHash/source, tighter `CROP` only.
- C10 improved immediate people/wedding recognition while retaining sea/palm Hawaii context at 500px and 1400px.
- C10 structure: native text `17`, IMAGE `6`, text intersections `0`, 18px edge risks `0`.
- actual-size quality remained blocked because the Figma source was still `350×233`.

The verified Drive master is materially different in quality: `4500×3000`, `5,266,253 bytes`, Drive `1NsFR25Q963Nk847fTMB3elwWy689P8XY`.

## Learning extension

`RSL-001`: image selection, low-resolution screen placement, preferred crop, high-resolution placement, actual-size verification, and print approval are separate states. A successful crop comparison must not silently promote the asset's quality state.

`RSL-002`: source quality is upstream of dominant-image actual-size approval. A low-resolution derivative may be useful for picture-edit/crop decisions, but enlarging it cannot be counted as actual-size or print evidence.

`RSL-005`: a fresh high-resolution placement attempt was justified because the full Drive master became locally materializable. The final upload still hit the existing `mcp.figma.com` DNS fingerprint, so the route was stopped after one fresh attempt.

## Transfer boundary

Transferable: completion-state separation, source-intrinsic-size readback, low-res composition-vs-print distinction, and stop conditions.

Do not transfer: Hawaii `007.jpg`, C10 crop transform, Rurubu cover geometry, masthead, palette, or exact photo role.
