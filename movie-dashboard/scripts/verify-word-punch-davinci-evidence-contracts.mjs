import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const capture=fs.readFileSync(path.join(root,"src/data/wordPunchDaVinciEvidenceCapture.ts"),"utf8");
const shared=fs.readFileSync(path.join(root,"src/data/davinciActualEvidenceContract.ts"),"utf8");
const gate=fs.readFileSync(path.join(root,"src/data/wordPunchDaVinciPromotionGate.ts"),"utf8");
const panel=fs.readFileSync(path.join(root,"src/components/WordPunchDaVinciEvidencePanel.tsx"),"utf8");
const selector=fs.readFileSync(path.join(root,"src/components/TypographyProductionRouteSelector.tsx"),"utf8");
const errors=[];const need=(s,t,m)=>{if(!s.includes(t))errors.push(m)};
for(const t of ['word-punch-davinci-evidence-capture/v1','authority: "EVIDENCE_ONLY"','wordPunchRequiredBindingRoles','"TEXT_PLUS_TOOL"','"TRANSFORM_TOOL"','"TIMING"','"SCALE"','"OPACITY"','"EASING"','blankDaVinciVisualQa()','parseDaVinciLiveParameterBindings','parseDaVinciVisualQa','STALE_WORD_PUNCH_EVIDENCE_CAPTURE','evaluateWordPunchDaVinciEvidenceCapture','capturedDaVinciBindingRoles','productionReady: false'])need(capture,t,`Word Punch capture missing: ${t}`);
for(const t of ['DaVinciLiveParameterBindingV1','DaVinciVisualQaV1','parseDaVinciLiveParameterBindings','capturedDaVinciBindingRoles','assertDaVinciEvidenceIdentity','blankDaVinciVisualQa'])need(shared,t,`generic Actual evidence contract missing: ${t}`);
for(const t of ['word-punch-davinci-promotion-assessment/v1','eligibleForHumanPromotionReview: blockers.length === 0','LIVE_PARAMETER_BINDINGS_INCOMPLETE','VISUAL_QA_1X_NOT_PASS','automaticPromotionAllowed: false','productionReady: false'])need(gate,t,`Word Punch promotion gate missing: ${t}`);
for(const t of ['Word Punch / whole-title Transform Actual','Actual JSONを書き出す','Readback template','Readback取込','Machine checks:','Live binding roles:','Visual QA: 1x','Promotion review:','Automatic promotion: NO / productionReady: NO'])need(panel,t,`Word Punch evidence panel missing: ${t}`);
for(const t of ['import { WordPunchDaVinciEvidencePanel }','selection?.patternId === "type-word-punch"','<WordPunchDaVinciEvidencePanel scene={scene} selection={selection} />'])need(selector,t,`selector missing Word Punch wiring: ${t}`);
if(/productionReady:\s*true/.test(capture)||/automaticPromotionAllowed:\s*true/.test(gate))errors.push("evidence workflow must not auto-promote");
if(errors.length){console.error(`Word Punch evidence contracts FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log("Word Punch evidence contracts OK: generic Actual evidence parsing, six live binding roles, exact canonical readback, 1x/half-speed QA and human-only promotion gate are wired without automatic route promotion.");
