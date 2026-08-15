# Rurubu V5 FX — source-fidelity Memory Spots cluster

Date: 2026-08-15
Scope: Rurubu WEDDING only
Starting main before this write: `93ec4cb47de18f9687747651192280c532254d14`

## Visible problem

FO `1200:2` had improved image-set semantics, but fresh intrinsic-size QA exposed the same class of problem already found on FL outer: Memory 01 street hash `439a719d73f28e8dd2889f2026cccb15f345ec63` is intrinsically `352×368` yet was displayed at `680×410` as the lower-half lead image.

At actual size the composition was relying on a source that could not credibly support its printed role. In addition, FO repeated the same waterfront source in the upper History field and lower Memory 03.

## Intermediate FW test

FW `1213:2` changed only Memory 03 from repeated waterfront to already-verified coast hash `adbb8e529451a81dd25e4eb29bf068655569ce25` while preserving the photo role and native `次の目的地` caption.

Result: semantic story and duplicate-source behavior improved, but the oversized `352×368` street lead remained. FW therefore stayed an intermediate study rather than becoming Best.

## FX clean-room lower-half rebuild

FX `1214:2` preserves the accepted upper History field as the page's dominant photo and rebuilds only the lower Memory Spots section as an asymmetric three-photo cluster:

- Memory 01 street: `350×365`, intrinsic `352×368`, node `1214:267`;
- Memory 02 exact Q60 Yokohama skyline: `200×220`, intrinsic `240×220`, node `1214:268`;
- Memory 03 verified coast / next destination: `330×177`, intrinsic `796×428`, node `1214:269`.

Instead of forcing Memory 01 to be a second hero, the upper History photograph remains dominant for the page. Native `01` / title / body are rebalanced around the bounded street image; 02 and 03 keep visibly different scale/orientation and retain their semantic captions.

## Three-scale evidence

- 1000 px whole spread: PASS, with clearer source-fidelity-safe rhythm than FO;
- actual-size right page `1214:132`, 794×1123: PASS;
- left page inherited from FO and previously passed actual-size QA;
- visible native text: `52`;
- visible IMAGE fills: `6`;
- absolute text intersections: `0`;
- 18 px text safe-area risks: `0`;
- fold: `1214:284`, x=`792.700012`, width=`2`, height=`1122.5`.

## Source-fidelity / provenance readback

All visible FX images are at or below intrinsic dimensions in both axes:

- profile A `810×552` source → `575×430` display;
- profile B `732×498` → `292×340`;
- History `1356×560` → `793.7×492`;
- Memory 01 street `352×368` → `350×365`;
- Memory 02 exact skyline `240×220` → `200×220`;
- Memory 03 coast `796×428` → `330×177`.

Fresh Drive readback this run:

- street derivative Drive `1ZsLOgZbZWyfYgDfvKvYPqOsbMJrSf1J5`, `RURUBU_V5_07_MEMORY_OLD_TOWN__FIGMA_352x368_Q30_SINGLECALL.jpg`, JPEG;
- exact skyline Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, `RURUBU_V5_01_COVER_HERO__ROLE_240x220_Q78.jpg`, JPEG;
- coast derivative Drive `1epb80L7WSZDmU86zl6PVQkZ8frP1JEeN`, `RURUBU_V5_06_MEMORY_COAST__FIGMA_796x428_Q30.jpg`, JPEG.

No new binary was uploaded or generated.

## Promotion

- FX `1214:2` → `BEST_CLEANROOM_INSIDE_FX_SOURCE_FIDELITY_MEMORY_CLUSTER_2026_08_15`;
- FO `1200:2` → hidden rollback `ROLLBACK_HIDDEN_INSIDE_FO_2026_08_15`;
- FW `1213:2` → hidden intermediate study;
- FU `1209:2` remains Best Outer;
- Start Here `845:27` → `FU outer / FX inside`;
- Current `77:18 / 77:290` untouched.

## Learning

A page does not need every subsection to carry its own dominant raster. If one section already supplies the page's dominant photographic mass, a lower information cluster can become more authentic—not less energetic—by respecting the intrinsic scale of weaker sources and using typography, varied image scale, rotation and spacing to maintain editorial rhythm.

This is a source-fidelity and hierarchy principle, not permission to copy the FX geometry or Rurubu visual language into other items.
