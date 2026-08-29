import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

export type MovieId = 'opening' | 'profile';
export type ActionKind = 'COMMAND' | 'HUMAN' | 'INPUT_REQUIRED';
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
const commandPrefix = /^(pnpm\s|node\s--no-warnings\s|npm\s|yarn\s)/;
const unresolvedInput = /(\/ABS\/PATH\/TO\/|<[^>]+>|\$\{?(?:SOURCE|INPUT|MEDIA|BGM|PATH)[A-Z0-9_]*\}?)/i;

export function classifyNextAction(text: string): ActionKind {
  const value = text.trim();
  if (!commandPrefix.test(value)) return 'HUMAN';
  return unresolvedInput.test(value) ? 'INPUT_REQUIRED' : 'COMMAND';
}

const productionReady = (_movieId: MovieId, status: ProductionStatus) => status.readiness?.productionReady === true;
const guiState = (overallState: string) => /DAVINCI|FINAL_DELIVERY_APPROVAL/.test(overallState);

export function deriveProjectNextGate(movieId: MovieId, status: ProductionStatus) {
  if (status.schemaVersion !== expectedSchema[movieId]) throw new Error(`${movieId}: status schema mismatch: ${status.schemaVersion ?? 'missing'}`);
  if (status.authority !== 'DERIVED_PRODUCTION_STATUS') throw new Error(`${movieId}: status authority mismatch`);
  if (!status.overallState) throw new Error(`${movieId}: overallState missing`);
  const rawActions = Array.isArray(status.nextActions) ? status.nextActions : [];
  const actions = rawActions.map((text, index) => ({index, kind: classifyNextAction(text), text}));
  const firstAction = actions[0] ?? null;
  const firstBarrierIndex = actions.findIndex((action) => action.kind !== 'COMMAND');
  const safeCommandPrefix = actions.filter((action) => action.kind === 'COMMAND' && (firstBarrierIndex < 0 || action.index < firstBarrierIndex));
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
    automationSafeCommandsBeforeBarrier: safeCommandPrefix.map((action) => action.text),
    nextAutomationSafeCommand: safeCommandPrefix[0]?.text ?? null,
    inputRequiredBeforeFurtherAutomation: firstAction?.kind === 'INPUT_REQUIRED',
    requiredInputCommandTemplate: firstAction?.kind === 'INPUT_REQUIRED' ? firstAction.text : null,
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
  const inputCandidate = projects.find((project) => project.inputRequiredBeforeFurtherAutomation && !project.productionReady) ?? null;
  const humanCandidate = projects.find((project) => project.humanRequiredBeforeFurtherAutomation && !project.productionReady) ?? null;
  return {
    schemaVersion: 'wedding-production-next-gate/v1' as const,
    authority: 'DERIVED_WEDDING_PRODUCTION_NEXT_GATE' as const,
    productionReady: projects.every((project) => project.productionReady),
    projects,
    selectedNextTarget: automationCandidate
      ? {movieId: automationCandidate.movieId, kind: 'COMMAND' as const, action: automationCandidate.nextAutomationSafeCommand}
      : inputCandidate
        ? {movieId: inputCandidate.movieId, kind: 'INPUT_REQUIRED' as const, action: inputCandidate.requiredInputCommandTemplate}
        : humanCandidate
          ? {movieId: humanCandidate.movieId, kind: 'HUMAN' as const, action: humanCandidate.firstAction?.text ?? null}
          : null,
    guardrails: [
      'NEXT_GATE_REPORT != ACTION_EXECUTED',
      'COMMAND_CLASSIFIED_SAFE_BEFORE_BARRIER != COMMAND_EXECUTED',
      'UNRESOLVED_INPUT_PATH != AUTOMATION_SAFE_COMMAND',
      'INPUT_REQUIRED_BARRIER_STOPS_LATER_COMMANDS_FROM_AUTO_EXECUTION',
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
    ? (() => {
        const project = report.projects.find((item) => item.movieId === requested)!;
        const target = project.nextAutomationSafeCommand
          ? {movieId: requested, kind: 'COMMAND' as const, action: project.nextAutomationSafeCommand}
          : project.inputRequiredBeforeFurtherAutomation
            ? {movieId: requested, kind: 'INPUT_REQUIRED' as const, action: project.requiredInputCommandTemplate}
            : project.firstAction
              ? {movieId: requested, kind: project.firstAction.kind, action: project.firstAction.text}
              : null;
        return {...report, projects: [project], selectedNextTarget: target};
      })()
    : report;
  if (process.argv.includes('--json')) console.log(JSON.stringify(filtered, null, 2));
  else {
    console.log(`Wedding production next gate: ${filtered.productionReady ? 'PRODUCTION_READY' : 'WORK_REMAINS'}`);
    for (const project of filtered.projects) {
      console.log(`${project.movieId}=${project.overallState} ready=${project.productionReady ? 'YES' : 'NO'} next=${project.firstAction?.kind ?? 'NONE'}:${project.firstAction?.text ?? 'none'}`);
      console.log(`  automationSafe=${project.nextAutomationSafeCommand ?? 'NONE'}`);
      console.log(`  inputRequired=${project.requiredInputCommandTemplate ?? 'NONE'}`);
      console.log('  macRemotionStudioGuiActual=NOT_RUN macDaVinciGuiActual=NOT_RUN');
    }
    console.log(`SELECTED / ${filtered.selectedNextTarget ? `${filtered.selectedNextTarget.movieId} / ${filtered.selectedNextTarget.kind} / ${filtered.selectedNextTarget.action}` : 'none'}`);
  }
}

if (process.argv[1]?.endsWith('wedding-production-next-gate.mts')) main();
