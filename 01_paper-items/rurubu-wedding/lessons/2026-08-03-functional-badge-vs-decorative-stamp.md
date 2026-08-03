# LESSON — Functional badge versus decorative stamp

**Date:** 2026-08-03

**Context:** Rurubu WEDDING V5 front cover, node `77:167 / DECOR_FEATURE_STAMP_STAR`.

**Source:** Live whole-spread screenshots before and after a bounded visibility change, plus structural inspection of the existing semantic nodes and rollback frames.

**Hypothesis:** Removing a non-semantic star stamp would reduce cumulative sticker/template feel and clarify the date badge without reducing the travel-magazine identity.

**Observed result:** The upper-right cover perimeter became calmer. The date badge gained clearer ownership of the issue/date function. The masthead, cover lines, circular snap, hero caption, feature index, location strip, and folio retained sufficient energy and hierarchy.

**Failure/regression check:** No comprehension, contrast, crop, text, fold, trim, or structural dependency was lost. The experiment does not repair the dominant photograph and must not be presented as photo-gate progress.

**General editorial principle:** A badge or stamp should survive because it communicates category, navigation, date, page reference, recommendation, ranking, or another concrete editorial role. Pure decoration must be judged by its cumulative competition with nearby elements, not by whether it looks acceptable in isolation.

**Process change:** During cover review, classify each badge/stamp as `FUNCTIONAL`, `ATMOSPHERIC_BUT_NECESSARY`, or `DECORATIVE_ONLY`. Attempt hiding `DECORATIVE_ONLY` elements on a rollback-safe basis and compare the whole page before adopting removal.

**Design change:** `77:167` changed from visible to hidden; it remains available for rollback.

**Verification evidence:** Live outer-spread screenshot after change, returned mutated node ID, preserved native text and photo nodes, and unchanged V4 rollback frames.

**Adopted/rejected status:** `VERIFIED / ADOPTED_FOR_V5_CURRENT / NOT_PROMOTED_TO_PROJECT_RULE`.

**Next application:** Re-evaluate the remaining cover icons after the hero photograph passes quality QA. Do not remove the camera or airplane icon automatically; each must be tested against its distinct semantic/navigation value.
