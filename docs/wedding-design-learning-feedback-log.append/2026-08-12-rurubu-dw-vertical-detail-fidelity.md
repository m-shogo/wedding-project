# 2026-08-12 — Rurubu DW vertical-photo experiment feedback

Scope: Rurubu WEDDING only.

Visible problem: the best outer comparator DV still separates a wide destination hero from a lower feature zone strongly enough to retain some poster/template feeling.

Tested principle: a narrow Japanese editorial text column beside a dominant vertical photo can create stronger travel-magazine asymmetry than a conventional hero-over-content split.

Expected improvement: stronger thumbnail recognition, more varied scale, less UI-like module geometry, and a more print-native editorial rhythm.

Observed evidence: DW `1001:2` achieved the intended asymmetry and passed thumbnail/reading hierarchy checks after typography and collision repair. Final structure had 35 visible native text nodes, 0 same-parent text intersections, and 0 front text safe-area risks.

Regression: at natural `794×1123` front-page scale, the reused source hash `539c259be8036b481d06b4f76db9a39b407d90e8` became visibly pixelated in the tall crop. The concept therefore failed actual-size/detail QA and was rejected instead of being promoted.

Transport learning: exact Q60 master and the Drive-verified 560×514 derivative remain available, but official Figma byte upload again stopped at DNS resolution. An alternate bounded payload test was integrity-incomplete and rendered blank, so it was discarded and not counted as placement.

Adoption status: REJECTED. DV `996:2` remains best outer; DF `899:2` remains best inside. Current remains untouched.

Next application: retain the vertical editorial-column idea only when a correctly proven destination derivative can support the requested crop at actual print size. Never trade source fidelity for a stronger thumbnail composition.
