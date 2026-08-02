# Wedding Figma / AI Continuous Learning System

Date: 2026-08-02
Scope: all present and future wedding design work in Figma
Authority: project-wide learning and improvement process

## Purpose

The goal is not to memorize a fixed set of tricks. The goal is to keep improving editorial judgment, Figma execution, AI-assisted production, Japanese typography, asset generation, and print reliability over time.

Every useful discovery must become one of:

- a verified production technique
- a new design heuristic
- a rejected anti-pattern
- a repeatable experiment
- a validator or QA check
- an updated project memory rule

Learning that does not change the work, the QA, or the next decision is not considered complete.

## Learning loop

Use this loop continuously:

1. **Observe** — identify a design weakness, tool limitation, failure, or new capability.
2. **Research** — prefer official Figma, Adobe, W3C/JLREQ, printer, and model documentation.
3. **Hypothesize** — state what should improve and what could regress.
4. **Prototype safely** — test on a duplicate frame, non-current branch, or one bounded semantic role.
5. **Compare** — review before/after at whole-item, reading, and actual-size detail scales.
6. **Verify** — check visual quality, native editability, semantic structure, Drive provenance, and print plausibility.
7. **Record** — write the result, including failed attempts, to GitHub.
8. **Promote or reject** — add a reusable lesson to project memory only when the evidence is strong enough.
9. **Apply forward** — use accepted knowledge on the next suitable wedding item.

## Evidence levels

- `DISCOVERED`: found in documentation or examples, not yet tested.
- `PROTOTYPED`: tested in a safe copy or bounded role.
- `VERIFIED`: improved the target and passed QA.
- `PROJECT_RULE`: reusable and promoted into project memory.
- `REJECTED`: failed, regressed quality, or was unsuitable for print/editorial work.

Do not promote `DISCOVERED` directly to `PROJECT_RULE`.

## Figma knowledge tracks

Continuously study and test:

- layout guides, columns, margins, baseline rhythm, and print-safe grids
- non-destructive image fills and crop control
- text styles, color styles, variables, libraries, and naming systems
- auto layout used selectively for repeated text/caption structures, not as a reason to create UI-card layouts
- components and variants for repeated production elements while preserving editorial variation
- vector editing, masks, boolean operations, export, and PDF preparation
- semantic layer naming and AI-assisted renaming without destroying established role names
- visual search and asset discovery
- Figma AI image generation and editing
- background removal, image expansion, object removal, and resolution enhancement
- realistic placeholder content generation while preserving native Japanese text
- plugin/MCP workflows, write limits, payload limits, and safe rollback

## AI design usage principles

AI is useful for:

- divergent concept exploration
- role-specific image ideation
- generating clean dummy photography with planned crop zones
- removing backgrounds and extending image edges
- testing alternate compositions
- creating realistic-length placeholder copy for stress testing
- layer organization and asset discovery
- identifying repetitive production tasks

AI must not replace:

- editorial hierarchy decisions
- Japanese typography QA
- factual verification
- rights and consent checks
- real couple/family/friend identity imagery
- print preflight
- final taste and restraint

Figma explicitly warns that AI outputs may be inaccurate or misleading. Treat AI output as a draft or candidate, then verify with human editorial judgment and project QA.

## Official-reference baseline

Current primary references include:

- Figma AI overview and responsibility guidance: https://help.figma.com/hc/en-us/articles/24039793359767-About-Figma-AI
- Figma Design AI tools: https://help.figma.com/hc/en-us/articles/23870272542231-Use-AI-tools-in-Figma-Design
- Figma AI image generation/editing: https://help.figma.com/hc/en-us/articles/24004542669463-Make-an-image-with-AI
- Figma AI content replacement: https://help.figma.com/hc/en-us/articles/23796390206743-Replace-text-content-with-AI
- Figma AI layer naming: https://help.figma.com/hc/en-us/articles/24004711129879-Rename-layers-with-AI
- Figma AI asset search: https://help.figma.com/hc/en-us/articles/24037716110615-Find-assets-and-designs-using-AI
- Figma auto layout: https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties
- Adobe Japanese layout grids: https://helpx.adobe.com/indesign/desktop/layout-and-grid-tools/grids/create-customize-layout-grids.html
- Adobe baseline grids: https://helpx.adobe.com/indesign/desktop/layout-and-grid-tools/grids/use-a-baseline-grid.html
- W3C Japanese Layout Requirements: https://www.w3.org/International/jlreq/

Re-check current official documentation before relying on feature availability, plan limits, credit costs, or changed behavior.

## Experiment protocol

Every Figma/AI experiment must record:

- date
- item/version
- target node or duplicate frame
- observed problem
- tool/feature tested
- prompt or settings
- before evidence
- after evidence
- quality gain
- regressions
- editability impact
- print impact
- decision: adopt / revise / reject
- reusable lesson
- Git commit

## Failure policy

Failure is acceptable and useful when:

- the Current candidate is protected
- the failure is detected by QA
- the root cause is recorded
- the same method is not repeated blindly
- the lesson changes the next attempt

Failure is not acceptable when it is hidden, reported as completion, repeated without new evidence, or allowed to destroy provenance or rollback.

## Feedback contract

Periodic feedback to the user must include:

1. what was learned
2. which official or reliable source supported it
3. what was tested in the actual wedding project
4. what visibly improved
5. what failed or was rejected
6. what was added to GitHub/project memory
7. what will change in the next production pass

Avoid generic reports such as “studied Figma” or “quality improved.” Use node IDs, files, screenshots, counts, and concrete before/after decisions where available.

## Ongoing cadence

- during active production: capture lessons immediately
- overnight improvement runs: test only bounded, rollback-safe changes
- weekly: review current Figma/AI/editorial updates and consolidate durable lessons
- after each major item: run a postmortem and promote reusable knowledge
- before each new wedding item: read project memory and relevant learning records
