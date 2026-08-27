import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const model = read("src/data/weddingMovieProductionCriticalPath.ts");
const card = read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const profileIntake = read("src/pages/ProfileMediaIntake.tsx");
const profileBgmIntake = read("src/pages/ProfileBgmIntake.tsx");
const profileGateSync = read("scripts/sync-profile-production-gate.mjs");
const profileGate = read("src/data/profileProductionGate.generated.ts");
const app = read("src/App.tsx");
const sceneHandoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const openingHandoff = read("src/data/openingProductionStatusHandoff.ts");
const profileHandoff = read("src/data/profileProductionStatusHandoff.ts");
const errors = [];
const need = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'wedding-movie-production-critical-path-dashboard/v2',
  'DERIVED_FROM_MOTION_STUDIO_PRODUCTION_STATUS_AND_INPUT_GATES',
  'openingProductionGate',
  'profileProductionGate',
  'openingProductionStatus.stages',
  'profileProductionStatus.stages',
  'currentCriticalStage',
  'downstreamBlockedStages',
  'inputLanesFor(projectId, current.name)',
  'openingProductionGate.photos.intakeReceiptCurrent',
  'openingProductionGate.bgm.intakeReceiptCurrent',
  'profileProductionGate.media.intakeReceiptCurrent',
  'profileProductionGate.bgm.intakeReceiptCurrent',
  'profileProductionGate.bgm.intakeReceiptPath',
  'profileProductionGate.bgm.intakeReceiptBlockerCodes',
  'profileProductionGate.bgm.rightsState',
  'PROFILE_BGM_FILE_MISSING',
  'PROFILE_BGM_RIGHTS_',
  'route: "/opening-photo-intake"',
  'route: "/opening-bgm-intake"',
  'route: "/profile-media-intake"',
  'route: "/profile-bgm-intake"',
  'route: "/profile-planner"',
  'BGM実ファイル・intake receipt・上映権利確認をcurrent SHAへ固定する',
  'INPUT_LANE_READY != PROJECT_PRODUCTION_READY',
  'ACTION_TARGET_VISIBLE != ACTION_COMPLETED',
  'productionReady: opening.productionReady && profile.productionReady',
  'CI_STATUS != MAC_DAVINCI_ACTUAL',
]) need(model, token, `critical-path model missing ${token}`);

for (const token of [
  'report.audio.intakeReceiptCurrent',
  'report.audio.intakeReceiptPath',
  'report.audio.intakeReceiptBlockers',
  'report.audio.rightsApprovalPath',
  'report.audio.rightsBoundSha256',
  'bgmReceiptBlockerCodes',
]) need(profileGateSync, token, `Profile production gate sync missing BGM receipt contract ${token}`);

for (const token of [
  '"intakeReceiptCurrent": false',
  '"intakeReceiptPath": "out/intake/profile-bgm-intake.json"',
  '"intakeReceiptBlockerCodes": [',
  '"rightsApprovalPath": "out/qa/profile-v1-bgm-rights-approval.json"',
  '"rightsBoundSha256": null',
]) need(profileGate, token, `Generated Profile gate missing BGM receipt truth ${token}`);

for (const token of [
  'NOW / PRODUCTION CRITICAL PATH',
  'current?.detail',
  'current.path',
  'current.inputLanes',
  'lane.detail',
  'lane.intakePath',
  'lane.blockerCodes',
  'current.recovery',
  'current.actionTargets',
  'to={target.route}',
  'target.purpose',
  'project.downstreamBlockedStages',
  'wedding-movie-production-critical-path.json',
  'Opening:',
  'Profile:',
]) need(card, token, `critical-path UI missing ${token}`);

for (const token of [
  'PROFILE MEDIA INTAKE',
  'profileProductionGate',
  'gate.mediaSlots.filter',
  'slot.canonicalStem',
  'public/profile/<canonical-stem>',
  'pnpm prepare:profile-v1',
  'Human QA / Mac DaVinci Actual / final approval',
]) need(profileIntake, token, `Profile media intake missing ${token}`);

for (const token of [
  'PROFILE BGM INTAKE',
  'profileProductionGate',
  'motion-studio/public/audio/profile/bgm-main.mp3',
  'motion-studio/out/intake/profile-bgm-intake.json',
  'verify-production-bgm-intake-receipt.mts --project profile',
  'pnpm profile:bgm-rights:strict',
  'current intake receipt + Human approval',
]) need(profileBgmIntake, token, `Profile BGM intake missing ${token}`);

for (const token of [
  'ProfileMediaIntake',
  'path="profile-media-intake" element={<ProfileMediaIntake />}',
  'ProfileBgmIntake',
  'path="profile-bgm-intake" element={<ProfileBgmIntake />}',
]) need(app, token, `App Profile intake routing missing ${token}`);

for (const token of [
  'WeddingMovieProductionCriticalPathCard',
  '<WeddingMovieProductionCriticalPathCard projectId={scene.projectId} />',
]) need(sceneHandoff, token, `Scene handoff critical-path routing missing ${token}`);

for (const [name, source, projectKey] of [
  ['Opening', openingHandoff, 'criticalPath: criticalPath.projects.opening'],
  ['Profile', profileHandoff, 'criticalPath: criticalPath.projects.profile'],
]) {
  need(source, 'buildWeddingMovieProductionCriticalPath', `${name} handoff does not derive critical path`);
  need(source, projectKey, `${name} handoff missing project critical path`);
  need(source, 'crossProjectCriticalPath', `${name} handoff missing cross-project critical path`);
  need(source, 'CRITICAL_PATH_EXPORTED != RECOVERY_EXECUTED', `${name} handoff missing recovery guardrail`);
}

for (const source of [model, card, profileIntake, profileBgmIntake, openingHandoff, profileHandoff]) {
  if (source.includes('macDaVinciActualVerified: true') || source.includes('productionReady: true')) {
    errors.push('Critical-path dashboard hardcodes Actual or production readiness');
  }
}

if (errors.length) {
  console.error(`Wedding Movie production critical-path dashboard FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Wedding Movie production critical-path dashboard OK: current blocker, independent input lanes with Profile/Opening receipt + rights truth, actionable intake routes, downstream stages and cross-project readiness remain visible/exportable without promoting Human QA or Mac Actual.');
