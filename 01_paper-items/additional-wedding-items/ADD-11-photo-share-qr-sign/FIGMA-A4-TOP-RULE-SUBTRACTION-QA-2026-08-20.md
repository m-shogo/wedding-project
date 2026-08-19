# ADD-11 A4 — Top Rule Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_SYNC_PASS / ROLLBACK_SAFE`
Date: 2026-08-20
Start authority SHA: `187b3906b8d1eaa95f15220089b3cfd5ca7d94d5`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2`
- hidden A4 long-copy stress: `19:56`
- A5 `18:19` unchanged
- exact Drive folder: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive writes: `0`

## Visible problem

Fresh A4 whole-item review found a thin full-width mint `DECOR_TOP_RULE` directly beneath the small `写真共有` category label. The selected A5 already uses an open Japanese-first header, and on A4 the large native headline, category label and spacing already establish the header hierarchy. The extra rule no longer bound a separate region and instead read as a residual template separator.

## Bounded test

Rollback-safe comparison:

- page: `40:2 / QA / ADD-11 A4 / TOP RULE SUBTRACTION / 2026-08-20`
- comparison: `40:3 / QA_ADD11_A4_NO_TOP_RULE_2026_08_20`
- changed only: `DECOR_TOP_RULE` visibility → hidden

QR geometry, invisible quiet-zone reserve, native headline/note, three-step flow, privacy, hashtag and expiry roles were unchanged.

The open-header version was stronger at whole-item scale and visually consistent with the selected family's quieter scanner-free direction.

## Adoption / rollback

Pre-change hidden rollbacks:

- selected A4: `41:2`
- A4 long-copy stress: `41:24`

Adopted:

- selected `19:35 / DECOR_TOP_RULE`: hidden
- stress `19:57 / DECOR_TOP_RULE`: hidden
- comparison `40:3`: hidden after adoption

A5 was not changed.

## Three-scale / structure QA

- whole-item ~700px: PASS
- native A4 canvas: `1240×1754`
- selected visible native text: `13`
- stress visible native text: `13` when audited
- selected/stress IMAGE fills: `0`
- selected/stress visible text outside root: `0`
- selected/stress top rule visible: `false`
- QR quiet-zone reserve remains `332×332` with visible stroke count `0`
- QR role / semantic placeholder unchanged
- hidden long-copy stress remains synchronized with selected treatment

## Decision

`VERIFIED_LOCAL / ADOPTED`.

The transferable principle is not “remove top rules.” A rule should be retained when it performs trim, binding, grouping or navigation work. In this A4 composition the Japanese category label, large headline and spacing already performed the grouping, so the line became an orphan separator.

## Deferred

Official share URL/service, permissions/privacy wording, hashtag/expiry decision, real QR, device/low-light scan proof, vendor bleed/profile and physical print proof remain blocked/deferred. No final QR destination or factual access rule was invented.
