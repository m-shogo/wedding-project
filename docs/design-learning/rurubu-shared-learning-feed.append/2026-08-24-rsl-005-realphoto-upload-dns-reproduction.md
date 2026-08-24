# RSL-005 — Real-photo Figma upload DNS reproduction

Date: 2026-08-24
Source scope: Rurubu WEDDING / V7 Outer real-photo candidate transport
State: `PROMOTED_PROJECT_RULE` (reproduction; no state change)

Existing rule:
**Same failure fingerprint twice without a material capability/environment change means method switch.**

## New reproduction

A legitimate real Hawaii source photo `007.jpg` was re-resolved and copied into the exact V7 Drive authority folder as:

`v7_outer_hawaii_007_realphoto_candidate_master.jpg / 1NsFR25Q963Nk847fTMB3elwWy689P8XY`

Rollback-safe Figma candidate C9 `2462:2` targeted hero `2462:20`. `upload_assets` issued a valid one-shot upload URL, but the raw JPEG POST failed before mutation with the already-known environment error:

`curl: (6) Could not resolve host: mcp.figma.com`

## Corrected method

The upload URL was not regenerated/retried. Post-failure readback proved `2462:20` still carried the previous dummy hash, so C9 was hidden as blocked evidence while current C8 stayed unchanged.

The verified Drive master is preserved for a materially different future transport capability.

## Why this matters

The rule prevents activity theater: repeatedly requesting new upload URLs cannot improve a DNS-level environment failure, and would create more partially staged candidates without advancing photography quality.

## What transfers

Transfer only the failure-handling method:
- compare operation/context/symptom/root cause before retry;
- read back whether mutation actually happened;
- preserve successfully completed upstream work;
- switch transport/environment after repeated identical infrastructure failure.

Do not transfer the Rurubu photo, Drive ID, Figma geometry or art direction.

## Evidence

`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C9-REAL-HAWAII-007-DRIVE-MASTER-TRANSPORT-BLOCKED-2026-08-24.md`
