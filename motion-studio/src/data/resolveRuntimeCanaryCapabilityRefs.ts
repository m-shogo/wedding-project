export type ResolveRuntimeCanaryCapabilityRef = {
  kind: 'HANDOFF_PROPERTY' | 'TOOL_CAPABILITY' | 'RESEARCH_CANARY';
  id: string;
  sourceRef: string;
};

export const resolveRuntimeCanaryCapabilityRefs: Record<string, ResolveRuntimeCanaryCapabilityRef[]> = {
  'DV21-PALMIER-FCPXML-01': [
    {kind: 'HANDOFF_PROPERTY', id: 'clip-placement-trim-speed', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'position-scale-rotation-flip', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'crop-static', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'text-properties', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'static-volume-source-timecode', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'audio-volume-keyframes', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'audio-fade', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  ],
  'DV21-REMOTION-ALPHA-01': [
    {kind: 'TOOL_CAPABILITY', id: 'visual-alpha-composite', sourceRef: 'motion-studio/src/data/resolveHandoffPolicy.ts'},
  ],
  'DV21-LOTTIE-OGRAF-01': [
    {kind: 'HANDOFF_PROPERTY', id: 'lottie-overlay', sourceRef: 'movie-dashboard/src/data/resolveHandoffEditability.ts'},
  ],
  'DV21-DRFX-FREE-01': [
    {kind: 'HANDOFF_PROPERTY', id: 'text-background-box', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'crop-keyframes', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'edge-softness', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'edge-rounding', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'title-rotation-scale', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  ],
  'DV21-AUDIO-RECOVERY-01': [
    {kind: 'HANDOFF_PROPERTY', id: 'audio-volume-keyframes', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
    {kind: 'HANDOFF_PROPERTY', id: 'audio-fade', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  ],
  'DV21-DRT-PORTABILITY-01': [
    {kind: 'RESEARCH_CANARY', id: 'DV21-DRT-PORT-02', sourceRef: 'docs/research/2026-08-26-movie-tool-learning-run-14-resolve21-drt-dra-portability.md'},
  ],
};

export function getResolveRuntimeCanaryCapabilityRefs(canaryId: string): ResolveRuntimeCanaryCapabilityRef[] {
  return resolveRuntimeCanaryCapabilityRefs[canaryId] ?? [];
}
