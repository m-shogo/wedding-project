# 2026-08-15 — V5 FL/FM semantic photo-role clean-room

Scope: Rurubu WEDDING only.

## Starting authority

- GitHub main observed before writes: `90bc76625a8c41dd6c4b4521c420405d21467718`.
- Previous visual authority: FJ outer `1193:2` / EO inside `1107:285`.
- Current production reference stayed untouched: outer `77:18`, inside `77:290`.
- Exact secondary Q60 remained Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1195:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Q60 master remained Drive `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155439 bytes.

## Experiment A — FK exact-Q60 transport probe

Visible problem: the dominant cover Q60 master still lacked exact Figma placement/provenance.

Bounded test: duplicate FJ to FK `1194:2`, prepare only a duplicate image role, materialize the exact Drive master, request an official Figma upload target, and POST the exact JPEG bytes.

Result: BLOCKED. The submit endpoint again failed before mutation with normalized fingerprint `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM` (`mcp.figma.com` DNS resolution). This is the already-known fingerprint, so the method was stopped rather than cosmetically retried. FK was renamed `BLOCKED_HIDDEN_OUTER_FK_Q60_UPLOAD_DNS_2026_08_15` and hidden.

Generated: 0. Newly adopted generated asset: 0. New external binary placed: 0.

## Experiment B — FL destination-semantic back-cover repair

Visible problem: FJ's back-cover dominant photo was visually attractive but read as a foreign cliff/coast destination, conflicting with the Yokohama-led issue identity at whole-item scale.

Root-cause hypothesis: photo beauty alone cannot compensate for destination-semantic mismatch. A verified, plausible waterfront source can strengthen issue coherence even without adding another asset or decorative container.

Bounded test: duplicate FJ to FL; replace only the back dominant image fill with an existing verified Rurubu waterfront source (`1039:133`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`, intrinsic 1356×560); rebalance the existing friends-photo/timeline field vertically; retain native headline, captions, timeline, fold, all front-cover facts, and exact secondary Q60.

Expected improvement: back and front should read as one Yokohama/travel issue rather than two unrelated destinations.

Regression risk: a city image can feel generic; moving the lower modules can create timeline collisions or safe-area pressure.

Evidence:
- Figma FL: `1195:2`; back `1195:3`; front `1195:132`.
- 500px whole-item: PASS and stronger destination coherence than FJ.
- 1000px spread: PASS.
- actual-size back ≈798×1123: PASS.
- structure: 35 visible native text; 7 visible IMAGE fills; absolute text intersections 0; 18px safe-area risks 0; fold `1195:193`, x=792.7, width=2.
- image role `1195:6` renamed `FL_BACK_YOKOHAMA_WIDE_VERIFIED_Q18` and preserves hash `539c259be8036b481d06b4f76db9a39b407d90e8`.

Status: ADOPTED. FJ `1193:2` is hidden rollback.

## Experiment C — FM real-person semantic safety + inside redesign

Visible problem: EO's profile spread used recognizable generic/generated people while native text labeled the roles `SHOGO` and `SHI-CHAN`. Regardless of visual quality, this could represent strangers as the real couple and violates the project's real-person image boundary.

Root-cause hypothesis: when verified real-person photography is unavailable, identity should stay in native editable type while imagery carries atmosphere, interests, destination or objects — not an invented face.

First attempt: an FM script used incorrect text-node lookup and failed atomically with `profile nodes missing`. No mutation occurred. The node names were inspected once, the query contract was corrected, and the same broken lookup was not repeated.

Bounded successful test: duplicate EO to FM `1196:285`; replace only the two profile photo roles with already-verified non-person Rurubu atmosphere assets:
- `1196:290 / FM_PROFILE_A_TRAVEL_MOOD_NOT_PERSON` → hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, intrinsic 810×552.
- `1196:295 / FM_PROFILE_B_TRAVEL_MOOD_NOT_PERSON` → hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, intrinsic 732×498.

Native `SHOGO`, `SHI-CHAN`, profile metadata, questions, dates and factual copy were retained. Question hierarchy was vertically rebalanced instead of adding cards/shadows/gradients. One inherited right-page caption sat exactly at the 18px bound; candidate-only node `1196:546` was moved to x=20 and revalidated.

Expected improvement: remove false-identity risk, make the profile page read as a travel/lifestyle editorial profile, and retain editability until verified real photographs are intentionally supplied.

Regression risk: object/food imagery can become generic lifestyle stock if it does not connect to native profile metadata; non-person imagery must not silently become a permanent substitute for desired real photos.

Evidence:
- FM root `1196:285`; left `1196:286`.
- 1000px spread: PASS.
- actual-size left 794×1123: PASS.
- final structure: 52 visible native text; 6 visible IMAGE fills; absolute text intersections 0; 18px safe-area risks 0.
- EO `1107:285` preserved as hidden rollback.

Status: ADOPTED as current best inside comparator.

## Final live comparator after this run

- Best outer: FL `1195:2` — `BEST_CLEANROOM_OUTER_FL_REVIEW_2026_08_15`.
- Best inside: FM `1196:285` — `BEST_CLEANROOM_INSIDE_FM_NONPERSON_PROFILE_2026_08_15`.
- Current `77:18 / 77:290`: untouched.
- Start Here labels reconciled to `FL outer / FM inside`.

## Learning / next application

1. Destination-semantic coherence is a first-class photo QA dimension, separate from image sharpness and beauty.
2. A generated or unverified recognizable person must never inherit a real bride/groom identity merely because native labels sit nearby. Preserve identity in native text and use non-person atmosphere or an explicit replaceable role until verified real photography exists.
3. The known Q60 transport failure remains a capability fingerprint, not a reason to stall other high-value visual work.
4. For V6, define image roles before generation/selection: `destination truth`, `human identity status`, `print role`, `target crop`, `text-safe zone`, and `provenance state` must be explicit before a raster is allowed to become dominant.

V5 complete: NO. V6 production started: NO. Remaining gate includes exact dominant Q60 placement/provenance followed by final asset/print/fold/ledger reconciliation.