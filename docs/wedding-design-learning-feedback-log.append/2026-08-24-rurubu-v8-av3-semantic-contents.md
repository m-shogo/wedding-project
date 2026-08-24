# Rurubu V8 AV3 — semantic contents decision

Date: 2026-08-24

New professional learning changed the design decision from “style the numbered contents better” to “separate useful semantic navigation from unverified ordinal structure.”

Live result:
- V8 Outer AV3 `2431:2` promoted.
- Native `BACK_INDEX` `2431:9` changed from numbered `01–05` contents to semantic labels only.
- `この本の中身` remains because it has a reader-facing orientation job.
- AV2 `2347:2` preserved as hidden rollback.
- 500 / 1400 / 1587×1123 QA PASS; text intersections 0; current V8 root overlap 0.

Learning deduplicated into existing RSL-251 rather than creating a cosmetic new failure ID. V7 and V8 now provide materially different same-item evidence that editorial numbers need a real reader-facing referent.

Asset truth: no generation, Drive write, master, image hash, photo or crop change. Current photo remains structural dummy, so AV3 is not real-content complete or print-ready.
