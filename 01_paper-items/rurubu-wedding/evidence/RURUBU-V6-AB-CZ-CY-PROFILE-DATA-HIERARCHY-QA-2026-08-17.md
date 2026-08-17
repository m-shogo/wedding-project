# Rurubu WEDDING V6 — AB + CZ/CY profile-data hierarchy QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Source problem

CX's Profile page had strong photo hierarchy and native editability, but the six profile facts still read like a 2-column × 3-row form because labels and values shared nearly uniform scale and row rhythm.

## Root-cause hypothesis

The defect was not missing decoration. The repeated facts needed editorial priority: compact factual metadata, two larger personality/favorite beats, and a quieter support row. The native variable text could remain editable if long-copy reserve was revalidated after the geometry change.

## Bounded test

Created rollback-safe CZ `1609:2` from CX `1601:2`. Q&A and all photos were left unchanged.

Profile changes only:

- compact top metadata row: 出身地 / 誕生日;
- promoted `趣味` and `休日の過ごし方` into larger native favorite beats;
- reduced `好きな食べ物` and `チャームポイント` into a quieter support row;
- preserved native text and auto-height behavior;
- no card, box, shadow, gradient, new decoration, image hash, or photo geometry change.

## First realistic-copy stress — REJECTED

Proof `1610:2` exposed two structural failures:

- `出身地` label overlapped the longer value;
- a long `休日の過ごし方` value overlapped the bottom support row.

The first state was not promoted.

## Corrected geometry

- shifted `PROFILE_VALUE_1` right and reduced its width;
- reduced the `休日の過ごし方` feature from 20px to 18px while preserving its editorial priority;
- moved the support facts lower and reduced them to 12.5px.

Second proof `1610:82 / 1610:83` used realistic longer Japanese values, including:

- `神奈川県川崎市多摩区 / KANAGAWA`;
- `旅行・写真・映画・カフェ巡り`;
- `散歩しながら気になるカフェを巡ってゆっくり過ごす`;
- `甘いもの・カフェ・ご当地グルメ`.

Result:

- profile text collisions: 0;
- 18px text safe-area risks: 0;
- actual-size 794×1123: PASS.

## Visual QA

- CZ spread 1400×990: PASS and visually stronger than CX;
- CZ Profile actual-size 794×1123: PASS;
- realistic-copy Profile actual-size 794×1123: PASS;
- post-promotion CZ spread 1400×990: PASS.

The new hierarchy reduces form/grid reading while keeping the page photo-led and fully editable.

## Adoption

`VERIFIED_LOCAL / ADOPTED`

- CZ `1609:2` promoted as `PREFERRED / V6_INSIDE_CZ_PROFILE_DATA_EDITORIAL_HIERARCHY_2026_08_17`;
- CX `1601:2` preserved hidden as rollback;
- failed proof `1610:2` preserved hidden as rejected structural evidence;
- corrected proof `1610:82` preserved hidden after PASS;
- Q&A unchanged;
- CY unchanged;
- Start Here: `V5 FU/FX · V6 AB + CZ/CY INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle truth

- generated: 0;
- Drive saves: 0;
- binary placements: 0;
- raster bytes: 0;
- image hashes changed: 0;
- native variable text preserved: YES;
- replaceable photo structure preserved: YES.

## What remains Rurubu-specific

Exact fact selection, Japanese copy, typography sizes, coordinates, photography, colors and Rurubu-like editorial direction must not transfer literally.

## Cross-item applicability hypothesis

When repeated editable facts read like a form, another print artifact may independently test splitting them into compact metadata + one or two emphasized semantic facts + quiet support facts, but must rerun realistic-copy stress because hierarchy changes alter wrapping reserve.
