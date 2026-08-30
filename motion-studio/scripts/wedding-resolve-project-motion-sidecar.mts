import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {
  resolveHandoffSidecarSchema,
  type ResolveHandoffSidecar,
  type ResolveProjectMotionBindingArtifact,
} from '../src/data/resolveHandoff.schema.ts';
import type {WeddingMovieId} from './wedding-project-motion-artifact-store.mts';
import type {WeddingPalmierProjectMotionBindingArtifactV1} from './wedding-project-motion-production-provenance.mts';

const SHA256_RE = /^[a-f0-9]{64}$/;

export const sha256File = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

export function buildResolveProjectMotionBindingArtifact(
  movie: WeddingMovieId,
  palmierBindingPath: string,
  expectedSha256: string,
  palmierBinding: WeddingPalmierProjectMotionBindingArtifactV1,
): ResolveProjectMotionBindingArtifact {
  if (!SHA256_RE.test(expectedSha256)) throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_SHA256_INVALID:${movie}`);
  if (
    palmierBinding.schemaVersion !== 'wedding-palmier-project-motion-binding-artifact/v1' ||
    palmierBinding.authority !== 'PALMIER_PROJECT_MOTION_ASSEMBLY_BINDING' ||
    palmierBinding.projectId !== movie
  ) throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_CONTRACT_INVALID:${movie}`);

  const binding = palmierBinding.binding;
  if (
    binding.projectId !== movie ||
    binding.currentnessState !== 'CURRENT' ||
    binding.palmierCurrent !== true ||
    binding.davinciHandoffCurrent !== true ||
    binding.remotionStudioGuiActual !== 'NOT_RUN' ||
    binding.macDaVinciGuiActual !== 'NOT_RUN' ||
    binding.productionReady !== false
  ) throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_NOT_CURRENT_OR_EVIDENCE_SAFE:${movie}`);

  if (
    palmierBinding.evidenceBoundary?.palmierApplicationPerformed !== false ||
    palmierBinding.evidenceBoundary?.remotionStudioGuiActual !== 'NOT_RUN' ||
    palmierBinding.evidenceBoundary?.macDaVinciGuiActual !== 'NOT_RUN' ||
    palmierBinding.evidenceBoundary?.productionReady !== false
  ) throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_EVIDENCE_BOUNDARY_INVALID:${movie}`);

  return {
    authority: 'PALMIER_PROJECT_MOTION_ASSEMBLY_BINDING',
    projectId: movie,
    path: palmierBindingPath,
    sha256: expectedSha256,
    currentnessState: 'CURRENT',
    palmierCurrent: true,
    davinciHandoffCurrent: true,
    remotionStudioGuiActual: 'NOT_RUN',
    macDaVinciGuiActual: 'NOT_RUN',
    productionReady: false,
  };
}

export function buildWeddingResolveProjectMotionSidecar(args: {
  movie: WeddingMovieId;
  baseline: ResolveHandoffSidecar;
  artifactId: string;
  artifact: ResolveHandoffSidecar['artifact'];
  projectMotionBindingArtifact: ResolveProjectMotionBindingArtifact;
  generatedAt?: string;
}): ResolveHandoffSidecar {
  if (args.projectMotionBindingArtifact.projectId !== args.movie) {
    throw new Error(`RESOLVE_PROJECT_MOTION_BINDING_PROJECT_MISMATCH:${args.movie}`);
  }
  return resolveHandoffSidecarSchema.parse({
    ...args.baseline,
    artifactId: args.artifactId,
    generatedAt: args.generatedAt ?? new Date().toISOString(),
    source: {
      ...args.baseline.source,
      projectRef: `wedding-${args.movie}-v1`,
      compositionOrTimeline: `${args.movie}-v1-production-handoff`,
    },
    artifact: args.artifact,
    projectMotionBindingArtifact: args.projectMotionBindingArtifact,
    notes: [
      ...args.baseline.notes,
      'Project Motion binding is SHA-bound to the canonical Palmier assembly artifact and revalidated before Resolve handoff generation.',
      'Generated Resolve sidecar does not prove Palmier application, Resolve GUI execution, or final production approval.',
    ],
  });
}
