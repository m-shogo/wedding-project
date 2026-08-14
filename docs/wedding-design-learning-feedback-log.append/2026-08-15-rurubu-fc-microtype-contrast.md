# 2026-08-15 — Rurubu FC microtype contrast feedback

Actual-size review found that technically present top-right issue metadata was visually disappearing into a cream background. The repair changed only native text color, not geometry or containment.

Lesson: rendered contrast at the final physical scale is a separate QA dimension from collision/safe-area structure. Prefer a direct native-type contrast repair before adding containers or effects. This is already consistent with the project’s subtraction-first direction; no new cross-item project rule is promoted from this single repair.
