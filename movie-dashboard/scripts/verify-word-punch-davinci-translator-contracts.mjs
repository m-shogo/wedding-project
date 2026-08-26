import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const translator=fs.readFileSync(path.join(root,"src/data/wordPunchDaVinciTranslator.ts"),"utf8");
const engine=fs.readFileSync(path.join(root,"../motion-studio/src/motion-kit/engines.tsx"),"utf8");
const routing=fs.readFileSync(path.join(root,"src/data/typographySceneProductionRouting.ts"),"utf8");
const errors=[]; const need=(s,t,m)=>{if(!s.includes(t))errors.push(m)};
for(const t of ["mode === 'punch'","1 + 0.18 * strength","opacity = mode === 'outline'","Easing.out(Easing.cubic)"]) need(engine,t,`canonical punch drift: ${t}`);
for(const t of ['patternId: "type-word-punch"','mode: "punch"','durationSeconds = 0.5','1 + 0.18 * strength','implementationId: "impl-type-word-punch-davinci-text-plus-transform"','target: "FUSION_TEXT_PLUS_TRANSFORM"','["Text+", "Transform", "Keyframe", "Spline"]','scale: { from: scaleFrom, to: 1 }','opacity: { from: 0, to: 1 }','easing: "EASE_OUT_CUBIC"','runtimeApplyState: "NOT_RUN"','runtimeReadbackState: "NOT_RUN"','liveParameterBindingState: "NOT_VERIFIED"','renderParityState: "NOT_RUN"','WHOLE_TITLE_PUNCH != FOLLOWER_ANIMATION']) need(translator,t,`Word Punch translator missing: ${t}`);
need(routing,'"type-word-punch",\n    "punch",\n    "DAVINCI_ACTUAL_CANDIDATE",\n    "impl-type-word-punch-davinci-text-plus-transform"',"Word Punch route must be Actual candidate");
if(/runtimeApplyState:\s*"PASS"/.test(translator)||/liveParameterBindingState:\s*"VERIFIED"/.test(translator))errors.push("translator must not fabricate runtime evidence");
if(/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,120}type-word-punch/.test(routing))errors.push("translator alone must not promote live implementation");
if(errors.length){console.error(`Word Punch translator contracts FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log("Word Punch translator contracts OK: canonical whole-title scale/opacity punch maps deterministically to Text+ + Transform while live binding/apply/readback/render parity remain unverified.");
