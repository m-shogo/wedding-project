import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

export type WeddingProjectMotionMovieId = 'opening' | 'profile';
export type WeddingProjectMotionProvenancePreflightState = 'CURRENT' | 'NOT_APPLICABLE' | 'INVALID';

const readOptionalJson = (path: string) => {
  if (!existsSync(path)) return {exists: false, value: null as any, error: null as string | null};
  try {
    return {exists: true, value: JSON.parse(readFileSync(path, 'utf8')) as any, error: null as string | null};
  } catch (error) {
    return {exists: true, value: null as any, error: error instanceof Error ? error.message : String(error)};
  }
};

export function runWeddingProjectMotionProvenancePreflight(root: string, movie: WeddingProjectMotionMovieId) {
  const outDir = join(root, 'out', 'handoff', `${movie}-v1`);
  const bundlePath = join(outDir, `${movie}-v1-production-bundle.json`);
  const recoveryPath = join(outDir, `${movie}-v1-davinci-production-recovery.json`);
  const bundle = readOptionalJson(bundlePath);
  const recovery = readOptionalJson(recoveryPath);
  const command = `node --no-warnings scripts/verify-wedding-project-motion-production-provenance.mts --movie=${movie}`;

  if (bundle.error || recovery.error) {
    return {
      state: 'INVALID' as const,
      current: false,
      applicable: true,
      command,
      error: `PROJECT_MOTION_PROVENANCE_PREFLIGHT_JSON_INVALID:${movie}:${bundle.error ?? recovery.error}`,
    };
  }

  const hasProvenance = Boolean(bundle.value?.projectMotionProvenance || recovery.value?.projectMotionProvenance);
  if (!hasProvenance) {
    return {
      state: 'NOT_APPLICABLE' as const,
      current: false,
      applicable: false,
      command,
      error: null,
    };
  }

  const result = spawnSync(process.execPath, [
    '--no-warnings',
    join(root, 'scripts', 'verify-wedding-project-motion-production-provenance.mts'),
    `--movie=${movie}`,
  ], {
    cwd: root,
    encoding: 'utf8',
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  if (result.status === 0 && output.includes('Project Motion production provenance consistency: CURRENT')) {
    return {
      state: 'CURRENT' as const,
      current: true,
      applicable: true,
      command,
      error: null,
    };
  }

  return {
    state: 'INVALID' as const,
    current: false,
    applicable: true,
    command,
    error: output.split('\n').find((line) => line.trim().length > 0) ?? `PROJECT_MOTION_PREFLIGHT_EXIT_${result.status ?? 'UNKNOWN'}`,
  };
}
