# Resolve handoff editability v1

Date: 2026-08-26
Status: CURRENT / EVIDENCE-BACKED / RUNTIME-PARTIAL
Scope: Movie only

## Decision

A successful Palmier/asset handoff is no longer allowed to imply post-handoff editability.

Track these axes independently:

1. **Transport / rebuild** — did the value or asset reach DaVinci?
2. **Automation availability** — can the current Resolve edition/context be driven by Codex/API?
3. **Editability** — after handoff, can the intended motion/effect still be changed parametrically, or only as a clip/asset?
4. **Runtime evidence** — did an actual Resolve Canary prove the claimed behavior?

## New guardrail: IMPORTED != PARAMETRIC_EDITABLE

Blackmagic Design's DaVinci Resolve 21 New Features Guide says `.lottie` / OGraf files can be dragged into the Media Pool or timeline, preserve alpha, and are treated like a **fully rendered animation clip**. Fusion also provides `OGrafLoader`.

Therefore Motion Zukan must classify direct Lottie import as:

- transport/recovery: `REBUILD_ASSET`
- preferred native route: `MEDIA_POOL_IMPORT`
- editability: `CLIP_LEVEL_ONLY`
- internal/source-animation editability: `PENDING_RUNTIME`

Do **not** upgrade direct Lottie import to `PARAMETRIC_NATIVE` merely because the animation plays correctly.

If internal controls must remain adjustable, test an `OGrafLoader` / Fusion route as a separate Canary. Do not claim that route exposes arbitrary Lottie source parameters until observed.

## Automation availability remains separate

External Python/Lua/Developer API and Workflow Integration routes are edition/context dependent. A capability documented in Resolve Studio does not prove external Codex execution in Free/UNKNOWN environments.

Use `resolveAutomationAvailability.ts` to keep this boundary explicit.

## Canary

For `.lottie` / OGraf:

1. clean Resolve 21 project
2. direct Media Pool/timeline import
3. verify alpha, duration, trim and playback
4. save/reopen
5. inspect what controls remain editable
6. separately load via Fusion `OGrafLoader`
7. compare direct-import vs Fusion editability
8. only then promote editability beyond `CLIP_LEVEL_ONLY`

## Sources

- Blackmagic Design, DaVinci Resolve 21 New Features Guide: https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf
- Blackmagic Design, Resolve 21 What's New: https://www.blackmagicdesign.com/jp/products/davinciresolve/whatsnew

## Research saturation

`RESEARCH_SATURATED = false`

High-value runtime gaps remain: Lottie/OGraf editability, clean Palmier FCPXML import, Fusion `.setting` portability, audio volume/fade write surface, and full Golden Handoff parity.
