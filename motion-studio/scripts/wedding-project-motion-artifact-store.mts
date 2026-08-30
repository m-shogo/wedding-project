import {mkdirSync, renameSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export type WeddingMovieId = 'opening' | 'profile';

const motionStudioRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));

export interface WeddingProjectMotionCanonicalArtifactPaths {
  directory: string;
  receipt: string;
  currentness: string;
}

function defaultArtifactRoot() {
  return process.env.WEDDING_PROJECT_MOTION_ARTIFACT_ROOT
    ? resolve(process.env.WEDDING_PROJECT_MOTION_ARTIFACT_ROOT)
    : motionStudioRoot;
}

export function getWeddingProjectMotionCanonicalArtifactPaths(
  movie: WeddingMovieId,
  root = defaultArtifactRoot(),
): WeddingProjectMotionCanonicalArtifactPaths {
  const directory = join(root, 'out', 'handoff', `${movie}-v1`, 'project-motion');
  return {
    directory,
    receipt: join(directory, 'project-motion-import-receipt.json'),
    currentness: join(directory, 'project-motion-import-currentness.json'),
  };
}

export function writeCanonicalJsonArtifact(path: string, value: unknown) {
  mkdirSync(dirname(path), {recursive: true});
  const temporaryPath = `${path}.tmp-${process.pid}`;
  writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  renameSync(temporaryPath, path);
  return path;
}
