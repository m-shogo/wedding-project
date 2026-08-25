# Rurubu V7 F7/F8 — adjacent-spread photo repetition reject QA

Date: 2026-08-25
Scope: Rurubu WEDDING only

## Problem audited

After F6 became current, publication-level sequencing exposed a different issue: Profile K8 and Memory G10 already use verified Hawaii `004/036`, so Story F6 repeats the same two sources across adjacent/near-adjacent roles. RSL-273 makes this a legitimate publication-pacing question even though each individual spread passes.

The goal was **not** to remove photography by rule. The bounded question was whether Story could use a materially different verified image treatment without becoming empty or losing V7's high-energy editorial rhythm.

## F7 `2573:2` — REJECTED

Test:

- same F6 layout/copy/chronology;
- Story dominant changed to verified real Hawaii `007` screen derivative, hash `e9c5d4b516f723b16994a92d0b96a46aaf7619f8`;
- repeated 004/036 Story secondary role withheld;
- chronology image remains withheld.

Result:

- 500px: repetition is reduced, but left-page mid-spread rhythm weakens materially;
- 1400px: the old secondary caption remains visually orphaned and the lower-middle field reads as missing content rather than purposeful pacing;
- no promotion.

Final state: `2573:2 / REJECTED / ... / MID-SPREAD RHYTHM LOSS / HIDDEN`, x=`304000`, visible=false.

## F8 `2574:2` — REJECTED

Method switch after F7: do not restore the repeated photo. Instead, turn existing native copy `覚えているのは、場所の名前より、その日の空気。` into a larger typographic second beat.

Bounded change:

- source/copy unchanged;
- text role moved to x=455 / y=650;
- 20px, 31px leading, 290×86;
- 007 remains the only Story photograph.

Result:

- 500px: still too quiet for the V7 Story role;
- 1400px: the second beat produces weak Japanese wrapping (`空 / 気。`) and the open field still reads more as absence than deliberate tempo;
- improving the copy further would become a larger re-composition rather than a bounded correction, so the experiment stops here.

Final state: `2574:2 / REJECTED / ... / EMPTY-FIELD + JAPANESE WRAP WEAKNESS / HIDDEN`, x=`306000`, visible=false.

## Decision

Keep **F6 `2570:2` current**.

This does not resolve publication-wide reuse permanently. It proves that blindly solving repetition by subtracting a photo can be worse than the repetition itself. The next valid improvement requires either:

- another role-correct verified Story image not already dominating adjacent spreads; or
- a materially redesigned Story sequence that still preserves V7's mid-spread rhythm.

Do not keep polishing F7/F8 merely to satisfy a no-repeat preference.

## Learning

RSL-273 remains relevant, but its transferable rule is **not** `never repeat an image`. Repetition must be weighed against publication pacing and semantic role. A repeated verified source can be temporarily preferable to a subtraction that creates a dead editorial field.

RSL-261 also explains the F8 Japanese line-break failure: text substitution for a removed visual role requires fresh semantic-wrap QA, not only geometry fit.

No new permanent rule is promoted from these rejected candidates.

## Asset / truth

- image generation: 0
- Drive write: 0
- new master: 0
- new imageHash: 0
- final photography adoption: 0
- V6/V8 changes: 0
