# Rurubu V8 AW8 — person labels without decorative ordinals

Date: 2026-08-24
Scope: Rurubu WEDDING only

## Decision changed by new professional learning

A current editorial/interview research pass shifted the question from “how should `01 / 02` be styled?” to “what reader-facing job do those numbers perform beside the two person names?”

AW7 used `SHOGO / 01` and `SHI-CHAN / 02`. The names already carried identity, while the ordinals had no verified sequence/navigation/quantity/cross-reference authority. A rollback-safe AW8 therefore retained the names and removed only `/ 01` and `/ 02`.

## Outcome

AW8 `2459:2` passed 500px / 1400px / 1587×1123 visual QA. Structure readback returned native text `20`, IMAGE `1`, text collisions `0`, 18px edge risks `0`, Japanese→Inter mismatch `0`, parent `2052:2`, and current V7/V8 root overlap `0`.

AW7 `2439:2` remains hidden rollback at `x=300000`.

The experiment strengthened existing RSL-251 rather than creating a duplicate fingerprint. The lesson remains conditional: numbers are kept when they do real reader work; unsupported editorial/system furniture is tested for removal or semantic revision.

## Boundaries

No photography, Drive asset, image hash, personal answer, V6 production or V7 production changed. AW8 remains REAL-CONTENT-BLOCKED and NOT PRINT READY.
