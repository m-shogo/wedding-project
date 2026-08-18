# ADD-02 V14 — direct URL image API probe + placeholder cleanup

Status: `TESTED_LOCAL / DIRECT_URL_IMAGE_API_UNSUPPORTED / SEMANTIC_PLACEHOLDER_CLEANUP_PASS / PHOTO_PLACEMENT_BLOCKED / NO_PROMOTION`
Date: 2026-08-18
Start authority SHA: `c9d36b92d35611afb75a663f82fe1614269594d1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- clean-room V14 Hawaii root: `78:8`
- replaceable hero role: `78:9`
- hidden long-copy stress: `78:20`
- Drive authority: `ADD-02_11卓の国別テーブルサイン` / `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- retained legacy production was not opened or modified during this probe.

## Why this probe was valid

Previous V14 evidence had already stopped repeating the failed shell/upload route because the environment could not deliver bytes to `mcp.figma.com`. This run tested a materially different path: whether the Figma Plugin API itself could load a public image URL directly, avoiding shell binary transport.

Verified public source used for the capability probe:

- Wikimedia Commons: `Diamond Head from Fort DeRussy Beach.jpg`
- original: `4032×3024`, JPEG
- creator: Farragutful
- license: `CC BY-SA 4.0`
- intended role: non-person Hawaii destination hero only; no variable text would be baked into the image.

## Probe result

A rollback-safe Figma `use_figma` operation attempted:

`figma.createImageAsync('https://upload.wikimedia.org/.../Diamond_Head_from_Fort_DeRussy_Beach.jpg')`

The runtime returned:

`Error: in createImageAsync: "createImageAsync" is not a supported API`

The operation was wrapped so that the temporary rollback copy would be removed on failure. No image fill was created and no production/legacy node changed.

This is a new failure fingerprint, distinct from the earlier DNS/upload POST failure:

- operation: direct public-URL image load through Figma Plugin API;
- environment/tool path: connected `use_figma` Plugin API runtime;
- symptom: `createImageAsync` unsupported;
- cause class: unsupported Plugin API surface in this runtime;
- date: 2026-08-18;
- stop condition: do not retry `createImageAsync` unless the connected Figma runtime advertises/supports that API in a materially changed environment.

The correct next photo method remains a connector-native binary/file-reference route or another newly available supported Figma image-ingestion capability. Do not fall back to another vector landscape merely to create activity.

## Semantic placeholder cleanup while blocked

The existing V14 candidate still printed internal proof language even though Current now forbids that on guest-facing copy.

Bounded cleanup:

- root `78:16`: `［国テーマ説明文 · LAYOUT DUMMY］` → `［国テーマ説明文］`;
- hidden stress `78:28`: removed only the `LAYOUT DUMMY` suffix while preserving the same long-copy stress mass.

Hidden rollbacks:

- V14 root pre-cleanup: `85:2`;
- V14 stress pre-cleanup: `85:14`.

## QA after cleanup

Fresh V14 root screenshot was inspected at 1000px reading scale. The placeholder now reads as guest-facing semantic copy rather than a proof sheet.

Structural readback:

- root `78:8`: native visible text `6`, proof-language `0`, outside text `0`, text collisions `0`, IMAGE fill nodes `0`;
- hidden stress `78:20`: native visible text `6`, proof-language `0`, outside text `0`, text collisions `0`, IMAGE fill nodes `0`;
- hero `78:9` remains the intentional solid placeholder and still has no IMAGE fill.

## Decision

`PHOTO_PLACEMENT_BLOCKED / NO_PROMOTION` remains correct.

The structural/semantic candidate is cleaner, but it cannot be compared to retained production or promoted until a real high-resolution destination hero is actually placed and then passes crop/contrast/actual-size QA. No Drive write occurred in this run.
