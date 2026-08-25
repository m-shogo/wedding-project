# Rurubu V7 H11 — design-learning feedback

Date: 2026-08-25

## New researched knowledge

Fresh editorial/food-publication research reinforced that photography and typography should be organized around the story and publication voice, not exposed production vocabulary. Food & Wine's photography issue and Bon Appétit's recent visual-direction material both emphasize story-led visual decisions, photography-led hierarchy, and reducing generic visual noise.

## What changed in the live design

The research changed a real live decision: V7 H10's fixed display `料理、皿、手元、店の空気。` was not polished further. It was diagnosed as photo-brief vocabulary leaking into the reader layer.

H11 `2537:2` instead uses the reader-facing fixed display `ひと皿から、旅が深まる。`, while retaining V7's high-energy identity and preserving variable text/photo editability.

## Verified result

- whole-item PASS;
- reading-scale PASS;
- actual-size DESIGN QA PASS;
- effective native text 11;
- text collision 0;
- current-root overlap 0;
- H10 retained hidden rollback;
- final photography remains blocked.

## Learning effect

RSL-272 now has independent reproduction in both V7 high-energy magazine and V8 restrained book systems. The transferable lesson is the distinction between internal production vocabulary and reader-facing publication voice; the literal wording and visual treatment remain item/system-specific.

## Failure reuse

Official `upload_assets` availability justified one high-resolution Outer transport recheck as a material capability change. The actual POST still hit the known `mcp.figma.com` DNS failure, so the method was stopped immediately without repeated retries and C12 stayed unchanged.
