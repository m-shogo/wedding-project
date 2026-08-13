# Rurubu FA diagonal photo-collage feedback — 2026-08-13

## Visible problem
EZ had improved substantially, but its front cover still behaved like stacked horizontal web sections: cream headline zone, wide hero zone, lower full-width photo zone. The angled 02 photo plus broad cyan caption also retained a card-like UI impression at actual size.

## Principle / capability tested
Use source fidelity and materially different scale relationships before adding decoration. Recompose a safe duplicate around one short wide hero, one vertical old-town feature, one larger angled support photo, one bounded coast photo, and the verified Yokohama destination postcard. Preserve native Japanese text, semantic image nodes, non-destructive IMAGE fills, provenance, and rollback.

## Expected improvement
- stronger magazine thumbnail silhouette
- more diagonal/asymmetric eye movement
- less dashboard/card rhythm
- less dependence on stretching a single weak image for impact
- more travel-editorial density without adding generic badges or shadows

## Regression risk
- lower collage can become crowded if more captions or stickers are added
- some imagery repeats accepted V5 roles across front/back; do not treat reuse as destination fact
- the cyan Feature 02 label remains visually stronger than ideal and should only be revisited when a smaller safe edit clearly beats the current state
- dominant history hash `539c...` remains a provenance limitation and must not be renamed or counted as Q60 master

## Evidence
Adopted FA Working `1161:2`; Review `1167:2`; Start Here `1168:2`.
- 500 px whole-item PASS
- 1000 px whole-item PASS
- 794 × 1123 actual front PASS
- 35 visible native text across outer
- 0 absolute text intersections on front/back
- 0 bounded 18 px text safe-area risks
- fold `1161:193`, x=792.7, width=2
- exact secondary Q60: Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1161:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`

## Adopted / rejected
ADOPTED: FA as new Best Outer over EZ by screenshot evidence at thumbnail, reading and actual size.
REJECTED METHOD: one-shot large multi-node recompose; runtime rejected atomically before mutation. Switched to smaller reversible photo-geometry steps rather than retrying the same method.

## Next application
For the next Rurubu experiment, start with subtraction and photo geometry. Do not add a card, badge, shadow, or new generated asset unless a concrete screenshot defect requires it. Before any dominant-image promotion, require exact Drive ID → Figma node/image hash → screenshot → structure → ledger agreement.
