# RSL-229 — Guide utility without authoritative map data

Date: 2026-08-23
Scope: Rurubu WEDDING local learning
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Fingerprint

`F-RSL-229-FAKE-MAP-UTILITY-WITHOUT-AUTHORITATIVE-LOCATION-DATA`

## Visible problem

A travel-guide page can easily look more “travel-like” by adding pins, routes, maps or coordinate graphics even when exact place/location data is not actually authoritative. This produces a strong UI/travel signal but weakens truthfulness and can create AI-like pseudo-information.

## Research observation

Professional travel titles such as LOST iN, Time Out and Flaneur support strong place identity through editorial selection, typography, observed local function and information architecture. The transferable idea is not their surface style: useful travel identity does not require fabricated geographic furniture.

## Local test

V7 Memory+Guide G `2295:2` used a four-stop reader sequence without a fake map:
- 01 朝 / 海辺を歩く;
- 02 昼 / 小さな店に入る;
- 03 夕 / 街の光を見る;
- 04 夜 / 食卓で終える.

The four entries use unequal visual responsibility and supporting photo roles instead of equal cards, pins or a route rail.

QA:
- 500 px: PASS;
- 1400 px: PASS;
- 1587×1123: PASS;
- intersections: 0;
- 18 px safe risk: 0;
- unintended one-character line-end candidates: 0.

## Verified local principle

When exact place/coordinate truth is unavailable, test whether guide utility can be carried by **reader action + sequence/time label + photo responsibility + concise editorial copy** before inventing a map/pin/route representation.

This is not a rule to avoid maps. If real location data is authoritative and a map improves navigation, a map can be the correct solution.

## Promotion boundary

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` only. Cross-item evidence is required before project-wide promotion.