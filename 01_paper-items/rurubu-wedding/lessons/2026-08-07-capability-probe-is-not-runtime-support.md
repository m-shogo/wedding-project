# Capability probe is not runtime support

Date: 2026-08-07
Status: `VERIFIED FOR CURRENT FIGMA RUNTIME / NOT PROJECT_RULE`

## Source

Rurubu WEDDING V5 dominant-photo recovery for `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO / 77:24`.

The accepted Drive derivative was already available and visually suitable, but a safer direct import method was being evaluated before falling back to the previously proven chunked binary path.

## Hypothesis

A positive JavaScript capability probe such as `typeof figma.createImageAsync === "function"` should indicate that the corresponding Plugin API method can be used in the current `use_figma` execution runtime.

## Result

The probe returned `function`, but the bounded call failed atomically with:

`Error: in createImageAsync: "createImageAsync" is not a supported API`

No Figma node was mutated.

## Failure

Feature presence in the injected API object can be a false-positive capability signal. A method may exist syntactically while still being disabled by the execution runtime.

## Adopted V5 behavior

- Treat `typeof method === "function"` only as `DISCOVERED`, never as proof of runtime support.
- Promote a method to `PROTOTYPED` or `VERIFIED` only after one bounded, non-destructive execution succeeds.
- When the bounded execution explicitly reports `not a supported API`, do not retry the same method without a runtime change.
- For current V5 image transport, prefer the already proven chunked shared-plugin-data → `base64Decode` → `createImage` route rather than repeating `createImageAsync` or the DNS-blocked raw upload path.

## Regression protection

A capability test must happen before any live mutation whenever possible. Failed scripts in this runtime are atomic, but that property does not justify combining discovery and broad mutation in one script.

## Next application

Use this distinction when evaluating any new Figma Plugin API method during V5/V6 work. Keep it item-level until repeated evidence supports project-wide promotion.