## 2026-08-15 — V5 failure memory must become V6 preflight, not just archive

**Context:** repeated Rurubu V5 visual and tooling failures accumulated across clean-room comparisons, asset transport attempts, screenshot QA, structure QA, and authority reconciliation.

**Observed failure:** Individual learning-run records existed, but known failure classes could still be retried later because the lessons were distributed across many files and not consulted as a single preflight stop-list.

**Root cause:** Failure capture and failure prevention were separate. Recording a failure after a run did not automatically make it an execution guardrail for the next version.

**General editorial/process principle:** A mature design system does not only remember what worked. It maintains explicit failure fingerprints, retry conditions, fallback methods, and promotion gates. V6 must begin by loading these failures before generating assets or constructing concepts.

**Process change:** Created `RURUBU-V6-FAILURE-MEMORY-AND-PREFLIGHT-2026-08-15.md`. V6 must consult it before production work and treat matching known failures as blocked until the stated retry condition changes.

**Key inherited V6 guardrails:**

- binary transport is a capability preflight, not repeated design work
- source fidelity before image scale
- no legacy composition inheritance by convenience
- hierarchy before cards/badges/decoration
- absolute-coordinate collision plus rendered actual-size typography QA
- three-scale comparison is mandatory
- Working/Review/Studies/Archive roles stay separated from day one
- promotion includes Figma Review + Start Here + ledger/Git synchronization
- generated/saved/placed/verified remain independent states
- same failure fingerprint twice means switch method

**Applies to:** V6 and later Rurubu versions

**Status:** TESTED PROCESS GUARDRAIL / V6 PREFLIGHT REQUIRED

**Evidence:** repeated V5 learning runs and lessons; consolidated failure taxonomy and preflight document dated 2026-08-15.
