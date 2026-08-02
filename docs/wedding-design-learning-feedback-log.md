# Wedding Design Learning / Feedback Log

This file records research, experiments, failures, verified improvements, and feedback that should influence future wedding work.

---

## 2026-08-02 — Initial continuous-learning baseline

### What was researched

Official/current documentation was reviewed for:

- Figma AI responsibilities and limitations
- Figma Design AI feature set
- AI image generation and editing
- AI content replacement
- AI layer renaming
- AI asset/design search
- auto layout behavior
- Japanese editorial layout grids and baseline grids
- W3C Japanese Layout Requirements

### Key findings

1. **AI output remains a candidate, not authority.** Figma's own guidance states that AI results may be inaccurate, incomplete, or misleading and require independent judgment and verification.
2. **Figma AI is strongest for bounded production assistance.** Current tools include image generation/editing, background removal, image expansion, object isolation/erasing, resolution enhancement, text replacement, layer renaming, asset search, and interaction generation.
3. **AI layer renaming must not overwrite semantic project naming.** Figma AI normally preserves manually named layers, which supports the existing semantic-node strategy. Still verify after bulk operations.
4. **Replace Content is useful for realistic-length dummy copy, not final facts.** It can improve text-length stress tests while final names, dates, and personal information remain manually verified native text.
5. **Auto layout must be used selectively in print/editorial work.** It is useful for adaptive caption groups, repeated facts, and text-length testing, but its UI-oriented defaults can reinforce cards, bento layouts, and overly even spacing.
6. **Baseline and layout grids remain central to magazine quality.** Adobe distinguishes text baseline alignment from object/document grids; Japanese layout grids additionally control character size, character spacing, line spacing, line count, and columns.
7. **Japanese typography needs its own QA.** JLREQ covers line composition, page formats, headings, notes, illustrations, tables, and paragraph placement—not just prohibited line-start/line-end characters.
8. **AI image enhancement cannot rescue a wrong editorial image.** Boosting resolution or expanding edges is appropriate only when the source already has the right subject, role, crop potential, rights, and identity treatment.

### Project-level consequences

- The wedding project now has a permanent research → prototype → verify → record → promote/reject loop.
- AI features will be tested on duplicate frames or bounded semantic roles before Current use.
- Placeholder-copy generation will be used for 100%, 130%, and 150% text-length stress tests.
- Auto layout will be evaluated for captions and repeated production modules, not used as a blanket page-construction method.
- AI image tools will be separated by purpose: generate, extend, remove background, erase object, enhance resolution. Each action requires a specific defect and acceptance criterion.
- Semantic layer names and native text remain protected.
- Failures are recorded and promoted into project memory only after they are generalizable.

### Experiments queued

- V5: compare current manually positioned caption groups with a safe duplicate using constrained auto layout for text-length resilience.
- V5: test a higher-quality role-sized image derivative and compare against Figma resolution enhancement; adopt only the sharper editable result.
- V5: test realistic-length Japanese dummy copy without changing final personal facts.
- V5: audit whether AI-assisted layer renaming would leave semantic photo-role names untouched; do not run on Current until proven.
- All items: create a baseline/grid worksheet that maps body leading, captions, margins, fold-safe areas, and repeated alignment edges.
- V6: use AI search/reference analysis for structural inspiration, while generating all production imagery clean-room and keeping published references out of final art.

### Current status

`RESEARCH_RECORDED / EXPERIMENTS_QUEUED / NO_UNVERIFIED_TOOL_RULE_PROMOTED`
