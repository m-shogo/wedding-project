# 2026-08-15 — FC microtype contrast

- Visible problem: `YOKOHAMA / SPECIAL ISSUE` yellow and `2026 AUTUMN` white were too weak on the cream stock at actual-size review.
- Principle: when print microtype lacks contrast, repair native type color before adding a badge, panel, shadow, or other container.
- Change: FC nodes `1180:186` → magenta `#F0054D`; `1180:187` → deep navy `#051229`.
- Expected improvement: issue metadata remains secondary but is readable at 1:1 print scale.
- Regression risk: over-emphasis competing with the main Japanese masthead. Kept size/position unchanged and changed color only.
- Evidence: 794×1123 actual-size front PASS; absolute text intersections 0; bounded 18px text safe-area risks 0.
- Status: ADOPTED / VERIFIED_LOCAL.
