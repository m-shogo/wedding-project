# ADD-15 — VISUAL_REOPENED blocker evidence

Date: 2026-08-11
State: `BLOCKED_REQUIRED_INPUT / FIGMA_NOT_STARTED / IMAGE_GEN_UNAVAILABLE_THIS_RUN`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before write: `f796469fe9c9d61b45f4f7048cdb944318dc7889`

## Live authority readback

- Item: `ADD-15 料理紹介 / 国テーマ説明カード`
- SPEC: `01_paper-items/additional-wedding-items/ADD-15-cuisine-destination-story-cards/SPEC.md`
- Drive authority folder: `186f2tA2czrrdIQ_7djhPBun6dStztmS8 / ADD-15_料理紹介_国テーマ説明カード`
- Drive child count observed this run: `0`
- Exact live Figma file key/page/node: not established in repository authority; production Figma must not be guessed.

## Blocking gate

The item SPEC requires a formal deployment choice before Figma production work:

1. `Model A — Course story cards`, or
2. `Model B — Destination story cards`, or
3. `NOT_REQUIRED`.

The same gate also requires the required count/location and authoritative source content. Until the model is selected, creating a production card, generating dish imagery, implying cuisine/destination relationships, or inventing Figma authority would violate the item truth/safety contract.

## Visual-work decision

No Figma write, Drive asset write, or generated-image placement was performed this run.

This is not a visual-quality PASS. The second visual art-direction pass remains open for ADD-15 until the deployment decision is authoritative.

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` is recorded separately from the deployment blocker. Even if image generation becomes available, no dish/food asset should be generated as production evidence before Model A is selected with authoritative dish/source information. If Model B is selected, destination-detail imagery may be considered after the target destination list and placement role are authoritative.

## Retry suppression

Do not repeat the same hourly investigation while the three-way deployment decision is unchanged. Resume ADD-15 production work when authority explicitly resolves `Model A`, `Model B`, or `NOT_REQUIRED`.

If unresolved, continue to other safe non-Rurubu work rather than creating speculative placeholders that would be mistaken for production.

## Completion state

`ADD_15_VISUAL_REOPENED_BLOCKED_REQUIRED_INPUT / NO_SELLABLE_VISUAL_PASS_YET / NO_FIGMA_AUTHORITY_YET`
