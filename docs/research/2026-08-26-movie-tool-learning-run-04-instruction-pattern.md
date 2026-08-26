# Resolve 21.0.4 bounded instruction pattern

Use this only when the required execution surface is actually available.

## Normalize

Human Master must state: target timeline, intended clips, property, values, timing/easing, allowed pages/routes, editability requirement, and verification criteria.

## Studio selected-clip route

1. Target Page and Timeline explicitly.
2. Ask the human to select the intended clips; state expected count/name constraints.
3. Read `Timeline.GetSelectedClips()` when supported.
4. Abort on empty or mismatched selection.
5. Apply only a separately Runtime Verified mutation path.
6. Read back the changed property.
7. Save/reopen or render when persistence/visual parity matters.

Do not turn a successful selection read into permission to mutate unsupported properties.

## Free Resolve artifact route

1. State that external scripting is unavailable in the current environment.
2. Prefer direct import, then generated `.drfx`/`.setting` artifact, then Human Master guided native rebuild.
3. Name the destination category/page and exact exposed controls.
4. Preserve existing timeline/media unless the instruction explicitly scopes a replacement.
5. Verify install/import, editability, save/reopen, dependencies and render result.

Failure classification must distinguish: scope mismatch, edition/runtime unavailable, unsupported write path, handoff loss, dependency missing, artifact packaging failure, and visual mismatch.
