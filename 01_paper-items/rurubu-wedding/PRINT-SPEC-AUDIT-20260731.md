# るるぶWEDDING — Print Spec Audit 2026-07-31

Status: `EMAIL_AUDIT_COMPLETE / PRODUCTION_VALUES_STILL_PENDING`
Current authority: GitHub `main`

## Purpose

Confirm whether real printer / venue production values already exist in connected wedding correspondence before inventing any bleed or safe-margin numbers.

## Gmail search scope

Searched wedding-related correspondence for terms including:
- プロフィールブック
- ペーパーアイテム
- 席次表
- 持込 / 持ち込み
- 入稿
- 塗り足し
- 印刷

Also restricted searches to the venue sender `portsidevilla@bestbridal.co.jp`.

## Relevant venue mail found

Venue correspondence from Art Grace Portside Villa / Best Bridal was found, including:
- `Re: 【10/24_岩堀】WEB招待状のご確認依頼` — 2026-07-04
- `Re: 【10/24_岩堀】誓約者サイトおよび母の着付けに関する質問` — 2026-03-31

The retrieved searchable content concerns invitation/site/questions and does not provide concrete profile-book print-production values.

## Values still NOT supported by evidence

Do not invent:
- bleed amount
- trim-safe margin
- fold-safe margin
- paper stock
- PDF / export profile
- printer-specific color / export requirement

The current `420 x 297 mm` spread and `210 mm` center fold remain structural working geometry only.

## Decision

Print-readiness remains blocked until the actual printer / venue workflow supplies the above values.

Do not spend more time searching general wedding email unless:
1. a printer/vendor name is selected,
2. a venue document explicitly references profile-book/paper-item submission rules, or
3. a new email/attachment containing print instructions arrives.

## Current practical state

What can proceed without these values:
- copy collection
- photo selection
- structural Figma comparison
- real-content visual QA

What cannot be declared Final Print Ready:
- final bleed geometry
- final fold-safe placement
- final export settings
- final print-scale QA
