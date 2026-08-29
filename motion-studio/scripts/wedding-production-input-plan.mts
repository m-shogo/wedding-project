import {isAbsolute, resolve, basename} from 'node:path';

export type WeddingInputMovieId = 'opening' | 'profile';
export type WeddingProductionInputPlanOptions = {
  movieId: WeddingInputMovieId;
  mediaSource: string;
  bgmSource?: string | null;
};

function requireAbsolute(label: string, value: string) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} is required`);
  if (!isAbsolute(trimmed)) throw new Error(`${label} must be an absolute path: ${trimmed}`);
  if (/\/ABS(?:OLUTE)?\/PATH\/TO\//i.test(trimmed) || /<[^>]+>/.test(trimmed)) throw new Error(`${label} must not contain a placeholder path`);
  return resolve(trimmed);
}

export function buildWeddingProductionInputPlan(options: WeddingProductionInputPlanOptions) {
  const mediaSource = requireAbsolute('mediaSource', options.mediaSource);
  const bgmSource = options.bgmSource ? requireAbsolute('bgmSource', options.bgmSource) : null;
  const project = options.movieId;
  const receipt = `out/intake/${project}-media-intake.json`;
  const commands = [
    `node --no-warnings scripts/intake-production-media.mts --project ${project} --source "${mediaSource}"`,
    `node --no-warnings scripts/intake-production-media.mts --project ${project} --source "${mediaSource}" --apply --receipt "${receipt}"`,
    `node --no-warnings scripts/verify-production-media-intake-receipt.mts --project ${project}`,
    `pnpm prepare:${project}-v1`,
  ];
  if (bgmSource) {
    commands.push(
      `node --no-warnings scripts/intake-production-bgm.mts --project ${project} --source "${bgmSource}"`,
      `node --no-warnings scripts/intake-production-bgm.mts --project ${project} --source "${bgmSource}" --apply --receipt "out/intake/${project}-bgm-intake.json"`,
      `node --no-warnings scripts/verify-production-bgm-intake-receipt.mts --project ${project}`,
    );
  }
  return {
    schemaVersion: 'wedding-production-input-plan/v1' as const,
    authority: 'USER_PATH_BOUND_COMMAND_PLAN' as const,
    movieId: project,
    mediaSource,
    bgmSource,
    commands,
    executionState: 'NOT_RUN' as const,
    evidenceBoundary: {
      remotionStudioGuiActual: 'NOT_RUN' as const,
      macDaVinciGuiActual: 'NOT_RUN' as const,
      finalDeliveryApproved: false,
    },
    guardrails: [
      'INPUT_PLAN != COMMAND_EXECUTED',
      'ABSOLUTE_REAL_PATH_REQUIRED',
      'PLACEHOLDER_PATH_REJECTED',
      'SOURCE_MEDIA_REMAINS_UNMODIFIED_BY_PLAN_GENERATION',
      'GUI_ACTUAL_REMAINS_NOT_RUN_UNTIL_TRUE_GUI_EVIDENCE',
    ],
  };
}

function arg(name: string) {
  const prefix = `--${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length) ?? null;
}

function main() {
  const movieId = arg('movie');
  if (movieId !== 'opening' && movieId !== 'profile') {
    console.error('Usage: node --no-warnings scripts/wedding-production-input-plan.mts --movie=opening|profile --media-source=/ABS/PATH [--bgm-source=/ABS/PATH] [--json]');
    process.exit(1);
  }
  try {
    const plan = buildWeddingProductionInputPlan({movieId, mediaSource: arg('media-source') ?? '', bgmSource: arg('bgm-source')});
    if (process.argv.includes('--json')) console.log(JSON.stringify(plan, null, 2));
    else {
      console.log(`${plan.movieId} production input plan / ${plan.executionState}`);
      plan.commands.forEach((command, index) => console.log(`${index + 1}. ${command}`));
      console.log('Remotion Studio GUI Actual=NOT_RUN / Mac DaVinci GUI Actual=NOT_RUN');
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (basename(process.argv[1] ?? '') === 'wedding-production-input-plan.mts') main();
