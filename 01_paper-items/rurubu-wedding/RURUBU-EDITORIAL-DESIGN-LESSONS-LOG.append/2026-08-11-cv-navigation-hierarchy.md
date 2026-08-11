# Rurubu editorial lessons — CV navigation + hierarchy

Date: 2026-08-11

- **Production-file legibility is part of design quality.** Once clean-room iterations accumulate, keep true Current, active Review, safe Working, and legacy study material visibly separated. An explicit Start page prevents rollback history from becoming canvas clutter.
- **Compare at one zoom level.** Best and Current should be physically close enough that thumbnail/whole-item differences are readable without panning through large empty gaps.
- **Use native type contrast before inventing another container.** On CV, a single-line navy `旅するWEDDING` masthead held against the bright sky more convincingly than the weaker light treatment, without another card or global dark panel.
- **Editorial chronology needs semantic peaks.** Unequal milestone type scale and a magenta `2026.10.24` read more like print narrative than a uniform UI stepper.
- **Typography changes require two kinds of QA.** CV first exposed visible wrapping regressions in screenshot review, then programmatic intersection QA found one remaining timeline collision that was easy to miss visually. Both were repaired before promotion.
- **Composition and raster quality remain separate gates.** CV is now the strongest outer comparator for layout/typography, but its cover hero node `848:133` still uses proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` at natural `640×587`. That cannot satisfy the production photo gate.
- **Do not substitute the wrong semantic image just because it is larger.** The in-file audit found a higher-resolution history derivative, but it remains a history-role asset; it is not a legitimate cover replacement.

Verified state: CV `848:2`, front `848:131`, fold `848:186` at x=`792.7000122070312`, visible native text `37`, IMAGE fills `7`, same-parent visible text intersections `0`. Review snapshot `851:2` now carries CV as Best outer; CM remains Best inside. Current `77:18 / 77:290` is unchanged.

Next use: keep the new Start/Review/Working split. Do not spend another iteration decorating the 640×587 proxy. The next meaningful cover step is a semantically valid high-quality master/derivative with provenance, exact Figma placement, then thumbnail/page/actual-size crop QA.
