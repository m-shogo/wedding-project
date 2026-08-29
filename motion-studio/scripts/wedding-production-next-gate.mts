import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

export type MovieId = 'opening' | 'profile';
export type ActionKind = 'COMMAND' | 'HUMAN';
export type ProductionStatus = {
  schemaVersion?: string;
  authority?: string;
  overallState?: string;
  nextActions?: string[];
  readiness?: Record<string, unknown>;
  stages?: Record<string, {state?: string; blockerCodes?: string[]}>;
};

const expectedSchema: Record<MovieId, string> = {
  opening: 'opening-v1-production-status/v1',
  profile: 'profile-v1-production-status/v1',
};
const statusScript: Record<MovieId, string> = {
  opening: 'scripts/opening-v1-production-status.mts',
  profile: 'scripts/profile-v1-production-status.mts',
};

export function classifyNextAction(text: string): ActionKind {
  return /^(pnpm\s|node\s--no-warnings\s|npm\s|yarn\s)/.test(text.trim()) ? 'COMMAND' : 'HUMAN';
}

const productionReady = (movieId: MovieId, status: ProductionStatus) => movieId === 'opening'
  ? status.readiness?.productionReady === true
  : status.readiness?.productionReady === true;

const guiState = (overallState: string) => /DAVINCI|FINAL_DELIVERY_APPROVAL/.test(overallState);

export function deriveProjectNextGate(movieId: MovieId, status: ProductionStatus) {
  if (status.schemaVersion !== expectedSchema[movieId]) throw new Error(`${movieId}: status schema mismatch: ${status.schemaVersion ?? 'missing'}`);
  if (status.authority !== 'DERIVED_PRODUCTION_STATUS') throw new Error(`${movieId}: status authority mismatch`);
  if (!status.overallState) throw new Error(`${movieId}: overallState missing`);
  const rawActions = Array.isArray(status.nextActions) ? status.nextActions : [];
  const actions = rawActions.map((text, index) => ({index, kind: classifyNextAction(text), text}));
  const firstAction = actions[0] ?? null;
  const firstHumanIndex = actions.findIndex((action) => action.kind === 'HUMAN');
  const safeCommandsBeforeHuman = actions.filter((action) => action.kind === 'COMMAND' && (firstHumanIndex < 0 || action.index < firstHumanIndex));
  const blockerCodes = [...new Set(Object.values(status.stages ?? {}).flatMap((stage) => stage.blockerCodes ?? []))].sort();
  const ready = productionReady(movieId, status);
  return {
    movieId,
    statusSchemaVersion: status.schemaVersion,
    overallState: status.overallState,
    productionReady: ready,
    blockerCodes,
    firstAction,
    actions,
    automationSafeCommandsBeforeHuman: safeCommandsBeforeHuman.map((action) => action.text),
    nextAutomationSafeCommand: safeCommandsBeforeHuman[0]?.text ?? null,
    humanRequiredBeforeFurtherAutomation: firstAction?.kind === 'HUMAN',
    macGuiStage: guiState(status.overallState),
    evidenceBoundary: {
      macRemotionStudioGuiActual: 'NOT_RUN' as const,
      macDaVinciGuiActual: 'NOT_RUN' as const,
      finalDeliveryApprovedByThisReport: false,
    },
  };
}

export function buildWeddingProductionNextGate(statuses: Record<MovieId, ProductionStatus>) {
  const projects = (["opening", "profile"] as const).map((movieId) => deriveProjectNextGate(movieId, statuses[movieId]));
  const automationCandidate = projects.find((project) => project.nextAutomationSafeCommand && !project.productionReady) ?? null;
  const humanCandidate = projects.find((project) => project.humanRequiredBeforeFurtherAutomation && !project.productionReady) ?? null;
  return {
    schemaVersion: 'wedding-production-next-gate/v1' as const,
    authority: 'DERIVED_WEDDING_PRODUCTION_NEXT_GATE' as const,
    productionReady: projects.every((project) => project.productionReady),
    projects,
    selectedNextTarget: automationCandidate
      ? {movieId: automationCandidate.movieId, kind: 'COMMAND' as const, action: automationCandidate.nextAutomationSafeCommand}
      : humanCandidate
        ? {movieId: humanCandidate.movieId, kind: 'HUMAN' as const, action: humanCandidate.firstAction?.text ?? null}
        : null,
    guardrails: [
      'NEXT_GATE_REPORT != ACTION_EXECUTED',
      'COMMAND_CLASSIFIED_SAFE_BEFORE_HUMAN != COMMAND_EXECUTED',
      'HUMAN_ACTION_MUST_NOT_BE_AUTOMATED',
      'MAC_REMOTION_STUDIO_GUI_ACTUAL_REMAINS_NOT_RUN_UNTIL_REAL_GUI_EVIDENCE',
      'MAC_DAVINCI_GUI_ACTUAL_REMAINS_NOT_RUN_UNTIL_REAL_GUI_EVIDENCE',
      'DERIVED_STATUS != PRODUCTION_PROMOTION',
      'FINAL_DELIVERY_APPROVAL_REMAINS_HUMAN_ONLY',
    ],
  };
}

function readStatus(root: string, movieId: MovieId): ProductionStatus {
  const result = spawnSync(process.execPath, ['--no-warnings', statusScript[movieId], '--json'], {cwd: root, encoding: 'utf8'});
  if (result.status !== 0) throw new Error(`${movieId}: production status command failed\n${result.stdout}\n${result.stderr}`);
  try { return JSON.parse(result.stdout); }
  catch { throw new Error(`${movieId}: production status returned invalid JSON`); }
}

function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const requested = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
  if (requested && requested !== 'opening' && requested !== 'profile' && requested !== 'all') {
    console.error('Usage: node --no-warnings scripts/wedding-production-next-gate.mts [--movie=opening|profile|all] [--json]');
    process.exit(1);
  }
  const report = buildWeddingProductionNextGate({opening: readStatus(root, 'opening'), profile: readStatus(root, 'profile')});
  const filtered = requested && requested !== 'all'
    ? {...report, projects: report.projects.filter((project) => project.movieId === requested), selectedNextTarget: report.projects.find((project) => project.movieId === requested)?.firstAction ? {movieId: requested, kind: report.projects.find((project) => project.movieId === requested)!.firstAction!.kind, action: report.projects.find((project) => project.movieId === requested)!.firstAction!.text} : null}
    : report;
  if (process.argv.includes('--json')) console.log(JSON.stringify(filtered, null, 2));
  else {
    console.log(`Wedding production next gate: ${filtered.productionReady ? 'PRODUCTION_READY' : 'WORK_REMAINS'}`);
    for (const project of filtered.projects) {
      console.log(`${project.movieId}=${project.overallState} ready=${project.productionReady ? 'YES' : 'NO'} next=${project.firstAction?.kind ?? 'NONE'}:${project.firstAction?.text ?? 'none'}`);
      console.log(`  automationSafe=${project.nextAutomationSafeCommand ?? 'NONE'}`);
      console.log(`  macRemotionStudioGuiActual=NOT_RUN macDaVinciGuiActual=NOT_RUN`);
    }
    console.log(`SELECTED / ${filtered.selectedNextTarget ? `${filtered.selectedNextTarget.movieId} / ${filtered.selectedNextTarget.kind} / ${filtered.selectedNextTarget.action}` : 'none'}`);
  }
}

if (process.argv[1]?.endsWith('wedding-production-next-gate.mts')) main();
