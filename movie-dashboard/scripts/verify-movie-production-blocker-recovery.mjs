import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(relative)=>fs.readFileSync(path.join(root,relative),"utf8");
const catalog=read("src/data/movieProductionBlockerRecovery.ts");
const model=read("src/data/weddingMovieProductionCriticalPath.ts");
const card=read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const errors=[];
const need=(source,token,message)=>{if(!source.includes(token))errors.push(message)};

for(const token of [
  'blockerRecoveryActionsFor',
  'code === "PHOTO_MISSING"',
  'code.startsWith("BGM_")',
  'code === "MEDIA_MISSING"',
  'code.startsWith("BGM_RIGHTS:")',
  'code.startsWith("STRUCTURE_REVIEW:")',
  'code.startsWith("REAL_MEDIA_REVIEW:")',
  'route: "/opening-photo-intake"',
  'route: "/opening-bgm-intake"',
  'route: "/profile-media-intake"',
  'route: "/profile-bgm-intake"',
  'command: "pnpm profile:structure-review:init"',
  'route: "/movie-coach/compare"',
  'route: "/palmier-handoff"',
  'route: "/movie-coach/fusion"',
  'RECOVERY_ACTION_VISIBLE != RECOVERY_EXECUTED',
  'DAVINCI_RECOVERY_ROUTE_VISIBLE != MAC_DAVINCI_ACTUAL',
])need(catalog,token,`blocker recovery catalog missing ${token}`);

for(const token of [
  'blockerRecoveryActionsFor(projectId, currentBlockerCodes)',
  'blockerRecoveryActionsFor(projectId, blockerCodes)',
  'blockerActions:',
  '...movieProductionBlockerRecoveryGuardrails',
])need(model,token,`critical path does not export blocker recovery ${token}`);

for(const token of [
  'BlockerRecoveryAction',
  'current.blockerActions.length > 0',
  'current.blockerActions.map',
  'stage.blockerActions.length > 0',
  'stage.blockerActions.map',
  'action.kind === "ROUTE"',
  'action.kind === "COMMAND"',
])need(card,token,`critical path UI does not render blocker recovery ${token}`);

for(const source of [catalog,model,card]){
  if(source.includes('macDaVinciActualVerified: true')||source.includes('productionReady: true'))errors.push('blocker recovery hardcodes Actual or production readiness');
}

if(errors.length){console.error(`Movie production blocker recovery FAILED (${errors.length})`);for(const error of errors)console.error(`- ${error}`);process.exit(1)}
console.log('Movie production blocker recovery OK: stable blocker codes carry code-specific route/command recovery into Critical Path UI/export without executing Human QA or Mac DaVinci Actual.');
