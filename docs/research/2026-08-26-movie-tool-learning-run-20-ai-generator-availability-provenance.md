# Movie Tool Learning Run 20 — AI generator availability, provenance, and rebuild intent

Date: 2026-08-26
Scope: Movie Tool Learning only.

## Why this run exists

AI image/video generation is part of the Wedding production toolchain, but generated pixels have a different portability problem from FCPXML/DRFX/native Resolve data: a provider can change or remove a product/model while the resulting asset remains in the project.

Therefore Tool Learning must track **current product availability** and **generation provenance** separately from model capability.

## OpenAI Sora — capability is historical, product availability is not current

OpenAI's current official Help Center states:

- Sora web/app experiences were discontinued on **2026-04-26**.
- Sora API is scheduled to be discontinued on **2026-09-24**.
- OpenAI recommends exporting Sora content as soon as possible and documents a sunset export path.

OpenAI's current product/release pages also label Sora/Sora 2 as no longer available.

This creates a new hard guardrail:

`MODEL_CAPABILITY != CURRENT_PRODUCT_AVAILABILITY`

Do not recommend a discontinued generation surface merely because older demos or capability docs are impressive.

For existing Sora assets:

`DEPRECATED_OR_SUNSETTING_GENERATOR => EXPORT_SOURCE_AND_PROVENANCE_NOW`

OpenAI also documented visible/invisible provenance signals and C2PA metadata on Sora outputs. That provenance should be preserved when available, but provenance does not make a generation reproducible.

Guardrail:

`C2PA_PRESENT != CREATIVE_REPRODUCIBILITY`

## Google Veo 3.1 — current control-oriented generation candidate

Google DeepMind's current official Veo page identifies **Veo 3.1** as its leading video generation model and documents:

- native audio,
- reference/“ingredients” images for scenes, characters and objects,
- character consistency via references,
- scene extension,
- camera controls,
- first and last frame control,
- outpainting,
- object insertion,
- motion controls,
- 1080p and 4K output.

For Tool Learning this means a prompt alone is an incomplete Human Master. The exact reference image roles and generation controls are part of the intent.

Guardrail:

`PROMPT_SAVED != GENERATION_INTENT_SAVED`

A Veo asset recovery pack should also preserve references, their roles, camera/motion choices, first/last frames and audio intent when used.

## Adobe Firefly — host/product and underlying model must both be recorded

Adobe's current official Firefly documentation lists partner video models such as Veo 3.1, Kling 3.0, Ray variants and Runway Gen-4.5 alongside Adobe models.

This exposes another important distinction:

- provider/model = who made the model,
- host product = where the user invoked it,
- plan/credits/availability = whether that route is currently usable.

A generated asset saying only “Veo 3.1” is incomplete if it was generated through Firefly rather than Google's own Flow/Gemini/API surface, because available controls, cost, policy and metadata may differ.

Guardrail:

`MODEL_IDENTITY != HOST_EXECUTION_SURFACE`

`HOST_AVAILABILITY != MODEL_EXISTENCE`

## Rebuild classification for generative assets

Unlike deterministic project data, most generative assets should not default to `EXACT` regeneration even with the same prompt.

New rebuild classes:

- `REPRODUCIBLE_CANDIDATE` — all known deterministic controls/seed/version are captured and reproduced behavior has been demonstrated.
- `REBUILD_INTENT` — prompt + references + constraints preserve creative intent but exact pixels are not promised.
- `SOURCE_ONLY` — original source output is authoritative; regeneration is not relied on.
- `UNAVAILABLE` — provider/model/surface is gone and source output must be preserved.

Guardrail:

`SAME_PROMPT != SAME_OUTPUT`

For Wedding generated footage, `REBUILD_INTENT` should be the default until actual deterministic reproduction is proven for the exact provider/model/surface.

## Machine-readable implementation

Added:

`motion-studio/src/data/generatedAsset.schema.ts`

The contract records:

- asset kind,
- provider,
- host product,
- model/version,
- availability + checked timestamp,
- rebuild class,
- prompt/negative prompt/seed,
- generation parameters,
- reference assets with semantic role and optional hash,
- output path/hash/resolution/duration/FPS/audio,
- expected/observed C2PA/content credentials/watermark state,
- commercial/license/person-likeness policy notes,
- project-policy compatibility,
- Human Intent: purpose / must-preserve / may-vary / forbidden changes,
- verification state.

This lets AI-generated media join the same recovery discipline as Resolve/Palmier artifacts without pretending it is native editable motion.

## Compiler routing update

Before choosing an AI generator for a Wedding asset:

1. Confirm the product/model/surface is currently available.
2. Confirm project-policy compatibility and licensing/commercial-use conditions for the exact surface.
3. Decide whether the asset needs still-image, image-to-video, first/last frame, reference consistency, camera control, native audio, or another specific capability.
4. Preserve generation provenance before the asset enters Palmier/Remotion/Resolve.
5. Treat the rendered generated output as Source Truth unless reproducible generation has been demonstrated.
6. Build editable motion around the generated asset in Palmier/Remotion/Resolve rather than asking the generator to replace native timeline/edit controls unnecessarily.

Guardrail:

`GENERATED_ASSET != EDITABLE_MOTION`

## New canary — AI-PROVENANCE-01

For one generated Wedding-safe synthetic asset:

1. Record provider, host, exact model/version if exposed.
2. Record availability check date.
3. Store prompt and all reference images with semantic role.
4. Store all exposed generation settings.
5. Hash the output and references.
6. Inspect provenance/content credentials if present.
7. Import the asset into the normal Wedding editing pipeline.
8. At a later date, retry generation with the same captured inputs.
9. Compare visual intent, not just file hash.
10. Classify exact reproducibility honestly.

Expected default result for current generative video: `REBUILD_INTENT`, not `EXACT`.

## New canary — AI-AVAILABILITY-01

Before any generator becomes a recommended route in Tool Learning:

- verify official current availability,
- record host/product + model separately,
- record plan/API/access constraints,
- test one generation in the actual intended environment when possible,
- set a revalidation trigger for sunset/deprecation/model replacement.

## Failure fingerprints

- `historical-capability-recommended-as-current`: old Sora capability page is treated as a usable 2026 route -> availability check required.
- `model-only-provenance`: host product is missing -> incomplete.
- `prompt-only-recovery`: reference images/settings/version are absent -> `REBUILD_INTENT` at best.
- `provenance-equals-reproducible`: C2PA/source attribution is confused with deterministic regeneration -> forbidden.
- `ai-generated-pixels-treated-as-native-motion`: timeline/editable controls are delegated to generation unnecessarily -> build native edit structure after generation.

## Evidence

Primary:

- OpenAI Help Center — current Sora discontinuation dates/export guidance.
- OpenAI official Sora/Sora 2 pages — product no longer available; historical provenance/C2PA statements.
- Google DeepMind — current Veo 3.1 official capability page.
- Adobe Help/Firefly — current partner video model catalog and host-model selection behavior.

## Saturation

NO_CHANGE is false. Tool Learning now distinguishes AI model capability, host surface availability, provenance and rebuild intent, and stores the model in a machine-readable schema.
