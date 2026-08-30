import {existsSync, readFileSync} from 'node:fs';
import {basename, dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolve21AlphaHandoffPolicy} from '../src/data/resolveHandoffPolicy.ts';
import {writeCanonicalJsonArtifact, type WeddingMovieId} from './wedding-project-motion-artifact-store.mts';
import type {WeddingPalmierProjectMotionBindingArtifactV1} from './wedding-project-motion-production-provenance.mts';
import {
  buildResolveProjectMotionBindingArtifact,
  buildWeddingResolveProjectMotionSidecar,
  sha256File,
} from './wedding-resolve-project-motion-sidecar.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/export-wedding-resolve-project-motion-sidecar.mts --movie=opening|profile');
  process.exit(1);
}
const movie = movieArg as WeddingMovieId;
const config = movie === 'opening'
  ? {
      bundle: join(root, 'out/handoff/opening-v1/opening-v1-production-bundle.json'),
      out: join(root, 'out/handoff/opening-v1/opening-v1-resolve-project-motion-handoff.json'),
    }
  : {
      bundle: join(root, 'out/handoff/profile-v1/profile-v1-production-bundle.json'),
      out: join(root, 'out/handoff/profile-v1/profile-v1-resolve-project-motion-handoff.json'),
    };

if (!existsSync(config.bundle)) throw new Error(`RESOLVE_PROJECT_MOTION_PRODUCTION_BUNDLE_MISSING:${movie}`);
const bundle = JSON.parse(readFileSync(config.bundle, 'utf8')) as any;
const ref = bundle?.palmier?.projectMotionBindingArtifact;
const expectedRef = bundle?.davinci?.expectedProjectMotionBindingArtifact;
if (!ref?.path || !ref?.sha256 || !expectedRef?.path || !expectedRef?.sha256) {
  throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_REFERENCE_MISSING:${movie}`);
}
if (ref.path !== expectedRef.path || ref.sha256 !== expectedRef.sha256) {
  throw new Error(`RESOLVE_PROJECT_MOTION_PALMIER_DAVINCI_REFERENCE_MISMATCH:${movie}`);
}

const bindingPath = join(dirname(config.bundle), ref.path);
if (!existsSync(bindingPath)) throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_ARTIFACT_MISSING:${movie}`);
const actualSha256 = sha256File(bindingPath);
if (actualSha256 !== ref.sha256) {
  throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_ARTIFACT_SHA256_MISMATCH:${movie}`);
}
const palmierBinding = JSON.parse(readFileSync(bindingPath, 'utf8')) as WeddingPalmierProjectMotionBindingArtifactV1;
const binding = buildResolveProjectMotionBindingArtifact(movie, basename(bindingPath), actualSha256, palmierBinding);

const handoffAsset = bundle?.davinci?.handoffAsset;
if (!handoffAsset || typeof handoffAsset !== 'string') throw new Error(`RESOLVE_HANDOFF_ASSET_MISSING:${movie}`);
const handoffAssetPath = join(root, handoffAsset);
if (!existsSync(handoffAssetPath)) throw new Error(`RESOLVE_HANDOFF_ASSET_FILE_MISSING:${movie}:${handoffAsset}`);
if (bundle?.davinci?.expectedSha256 !== sha256File(handoffAssetPath)) {
  throw new Error(`RESOLVE_HANDOFF_ASSET_SHA256_MISMATCH:${movie}`);
}
if (bundle?.davinci?.macActualState !== 'NOT_RUN' || bundle?.davinci?.productionReady !== false) {
  throw new Error(`RESOLVE_HANDOFF_EVIDENCE_BOUNDARY_INVALID:${movie}`);
}

const sidecar = buildWeddingResolveProjectMotionSidecar({
  movie,
  baseline: resolve21AlphaHandoffPolicy,
  artifactId: `${movie}-v1-final-render-project-motion-handoff`,
  artifact: {
    kind: 'MEDIA',
    path: handoffAsset,
    codec: 'production-final-render',
    container: handoffAsset.toLowerCase().endsWith('.mp4') ? 'MP4' : undefined,
  },
  projectMotionBindingArtifact: binding,
});
writeCanonicalJsonArtifact(config.out, sidecar);

console.log(`Resolve Project Motion handoff sidecar: ${relative(root, config.out).replaceAll('\\', '/')}`);
console.log(`Project Motion binding SHA-256: ${binding.sha256}`);
console.log('Mac Remotion Studio GUI Actual remains NOT_RUN; sidecar generation is not GUI evidence.');
console.log('Mac DaVinci Actual remains NOT_RUN; sidecar generation does not execute Resolve GUI work.');
