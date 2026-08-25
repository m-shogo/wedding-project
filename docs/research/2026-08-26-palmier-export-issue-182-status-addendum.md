# Palmier Export Issue #182 Status Addendum

Status: CORRECTION  
Date: 2026-08-26

## Correction

`docs/research/2026-08-26-palmier-davinci-export-qa-and-instruction-guardrails.md` の Issue #182 記述について、追加確認で **Issue #182は現在Closedで、PR #183で修正済み** と確認した。

Source:
- https://github.com/palmier-io/palmier-pro/issues/182

したがってCurrent authorityは次の通り。

- **現行Palmier mainに未修正のexport false-success bugがある、と断定してはならない。**
- Issue #182は過去のfailure evidenceとして保持する。
- Guardrail（unique output path / terminal job polling / fresh artifact verification / parse-readback / clean DaVinci import）は、古いversion、fork、未検証build、将来regressionにも耐える一般的なExport QAとして維持する。
- Tool Learning Baseでは、failure knowledgeとcurrent bug statusを分離し、`FIXED_UPSTREAM / VERSION_SCOPED_GUARDRAIL` として扱う。

## Version-aware trust rule

今後、PalmierのCapabilityをTrustedへ上げる場合は最低限:

```text
Palmier version/tag/commit
+ capability
+ expected behavior
+ observed runtime behavior
+ artifact evidence
```

を記録する。

過去Issueの存在だけでCurrentをBlockedにしない。逆に、IssueがClosedでも実機/対象versionを未検証ならWedding Verifiedには上げない。

## Additional upstream evidence

Palmier `AGENTS.md` current mainは、file mutation/exportについて次を明示している。

- unique temporary paths
- complete replacement ready前にdestinationをdelete/replaceしない
- user-requested file failuresをsurfaceする
- `try?` / empty result / success-shaped responseで隠さない

この設計原則はIssue #182修正後も、Wedding側のExport QA guardrailを維持する根拠になる。
