import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

const projects = {
  opening: {
    script: 'scripts/opening-v1-production-status.mts',
    expectedSchema: 'opening-v1-production-status/v1',
    stageOrder: ['media', 'previewRender', 'previewSourceBinding', 'previewReview', 'finalRender', 'finalRenderReview', 'productionBundle', 'davinciFinishing', 'finalDeliveryApproval'],
  },
  profile: {
    script: 'scripts/profile-v1-production-status.mts',
    expectedSchema: 'profile-v1-production-status/v1',
    stageOrder: ['assembly', 'finalRender', 'finalRenderReview', 'productionBundle', 'davinciFinishing', 'finalDeliveryApproval'],
  },
} as const;

const runJson = (script: string) => {
  const result = spawnSync(process.execPath, ['--no-warnings', script, '--json'], {cwd: root, encoding: 'utf8'});
  if (result.status !== 0) {
    throw new Error(`${script} failed: ${(result.stderr || result.stdout || '').trim()}`);
  }
  return JSON.parse(result.stdout);
};

const stableCodes = (stage: Record<string, unknown> | null | undefined) =>
  Array.isArray(stage?.blockerCodes) ? stage.blockerCodes.map(String) : [];
const recoverySteps = (stage: Record<string, unknown> | null | undefined) =>
  Array.isArray(stage?.recovery) ? stage.recovery.map(String) : [];

const summarize = (projectId: keyof typeof projects) => {
  const config = projects[projectId];
  const report = runJson(config.script);
  if (report.schemaVersion !== config.expectedSchema || report.authority !== 'DERIVED_PRODUCTION_STATUS') {
    throw new Error(`${projectId}: unexpected status authority ${report.schemaVersion}/${report.authority}`);
  }

  const stages = config.stageOrder.map((name) => ({name, ...(report.stages?.[name] ?? {})}));
  const currentIndex = stages.findIndex((stage) => stage.state !== 'PASS');
  const current = currentIndex >= 0 ? stages[currentIndex] : null;
  const downstream = currentIndex >= 0 ? stages.slice(currentIndex + 1) : [];
  const blockers = Array.isArray(current?.blockers) ? current.blockers.map(String) : [];
  const blockerCodes = stableCodes(current);
  const recovery = recoverySteps(current);
  const nextActions = Array.isArray(report.nextActions) ? report.nextActions.map(String) : [];

  return {
    projectId,
    overallState: String(report.overallState ?? 'UNKNOWN'),
    productionReady: report.readiness?.productionReady === true,
    currentCriticalStage: current ? {
      name: current.name,
      state: String(current.state ?? 'UNKNOWN'),
      detail: String(current.detail ?? 'No detail reported.'),
      ...(current.path ? {path: String(current.path)} : {}),
      blockers,
      blockerCodes,
      recovery,
    } : null,
    downstreamBlockedStages: downstream.map((stage) => ({
      name: stage.name,
      state: String(stage.state ?? 'UNKNOWN'),
      detail: String(stage.detail ?? 'No detail reported.'),
      ...(stage.path ? {path: String(stage.path)} : {}),
      blockerCodes: stableCodes(stage),
      recovery: recoverySteps(stage),
    })),
    nextActions,
    readiness: report.readiness ?? {},
  };
};

const opening = summarize('opening');
const profile = summarize('profile');
const productionReady = opening.productionReady && profile.productionReady;
const report = {
  schemaVersion: 'wedding-movie-production-critical-path/v1' as const,
  authority: 'DERIVED_CROSS_PROJECT_CRITICAL_PATH' as const,
  productionReady,
  projects: {opening, profile},
  guardrails: [
    'CRITICAL_PATH_REPORT != PRODUCTION_APPROVAL',
    'RECOVERY_COMMAND_LISTED != RECOVERY_EXECUTED',
    'CI_STATUS != MAC_DAVINCI_ACTUAL',
    'DOWNSTREAM_BLOCKED != DOWNSTREAM_FAILED',
    'STABLE_BLOCKER_CODE != RAW_BLOCKER_DETAIL',
  ],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  for (const project of [opening, profile]) {
    const current = project.currentCriticalStage;
    console.log(`${project.projectId.toUpperCase()} / ${project.overallState} / productionReady=${project.productionReady ? 'YES' : 'NO'}`);
    if (current) {
      console.log(`  CURRENT / ${current.name}:${current.state} / ${current.detail}`);
      if (current.path) console.log(`  PATH    / ${current.path}`);
      for (const code of current.blockerCodes) console.log(`  CODE    / ${code}`);
      for (const blocker of current.blockers) console.log(`  BLOCK   / ${blocker}`);
      for (const step of current.recovery) console.log(`  RECOVER / ${step}`);
      console.log(`  WAITING / ${project.downstreamBlockedStages.map((stage) => stage.name).join(' -> ') || 'none'}`);
      for (const action of project.nextActions) console.log(`  NEXT    / ${action}`);
    } else {
      console.log('  CURRENT / all canonical production stages PASS');
    }
  }
  console.log(`ALL / productionReady=${productionReady ? 'YES' : 'NO'}`);
}

if (strict && !productionReady) process.exit(1);
