import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const artifact=fs.readFileSync(path.join(root,"src/data/wordPunchDaVinciActualArtifact.ts"),"utf8");
const routing=fs.readFileSync(path.join(root,"src/data/typographySceneProductionRouting.ts"),"utf8");
const errors=[];const need=(s,t,m)=>{if(!s.includes(t))errors.push(m)};
for(const t of ['schemaVersion: "word-punch-davinci-actual-artifact/v1"','authority: "EVIDENCE_ONLY"','patternId: "type-word-punch"','BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER','buildWordPunchDaVinciTranslatorSpec(baseline)','STALE_WORD_PUNCH_ACTUAL_SELECTION','state: "NOT_VERIFIED"','Create/attach a whole-title Fusion Transform path','Keep every check NOT_RUN','compareWordPunchDaVinciActualReadback','expectedSource: "CANONICAL_TRANSLATOR_SPEC"','scaleFromDelta','opacityFromDelta','attachWordPunchDaVinciActualReadback','productionReady: false']) need(artifact,t,`Word Punch Actual artifact missing: ${t}`);
need(routing,'"type-word-punch",\n    "punch",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-word-punch-davinci-text-plus-transform"',"Word Punch route must expose bounded Actual workflow");
if(/parameterBinding:[\s\S]{0,100}state:\s*"VERIFIED"/.test(artifact))errors.push("must not pre-verify bindings");
if(/visualQa1x:\s*"PASS"/.test(artifact)||/productionReady:\s*true/.test(artifact))errors.push("must not fabricate QA/production readiness");
if(/DAVINCI_ACTUAL_VERIFIED[\s\S]{0,120}type-word-punch/.test(routing))errors.push("must not claim Mac Actual verification");
if(errors.length){console.error(`Word Punch Actual artifact contracts FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log("Word Punch Actual artifact contracts OK: bounded evidence-only Text+/Transform canary uses canonical translator values and leaves bindings, GUI/render QA and production promotion unverified.");
