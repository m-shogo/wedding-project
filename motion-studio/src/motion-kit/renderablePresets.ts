import type {MotionIntensity} from './engines';

export type RenderEngine = 'typography-reveal' | 'camera-transform' | 'transition-wipe' | 'graphic-hit';

export interface RenderableMotionPreset {
  presetId: string;
  engine: RenderEngine;
  intensity: MotionIntensity;
  label: string;
  demoText?: string;
  mode?: string;
}

export const renderableMotionPresets: RenderableMotionPreset[] = [
  {presetId: 'type-mask-slide', engine: 'typography-reveal', intensity: 'M', label: 'Mask Slide', demoText: 'WELCOME', mode: 'mask'},
  {presetId: 'type-word-punch', engine: 'typography-reveal', intensity: 'L', label: 'Word Punch', demoText: 'START', mode: 'punch'},
  {presetId: 'photo-static-hero', engine: 'camera-transform', intensity: 'S', label: 'Static Hero', mode: 'static'},
  {presetId: 'photo-small-push', engine: 'camera-transform', intensity: 'M', label: 'Small Push', mode: 'push'},
  {presetId: 'wipe-route-line', engine: 'transition-wipe', intensity: 'M', label: 'Route Line Wipe', mode: 'right'},
  {presetId: 'flash-one-frame-soft', engine: 'transition-wipe', intensity: 'S', label: 'Soft Impact Frame', mode: 'up'},
  {presetId: 'accent-speed-lines', engine: 'graphic-hit', intensity: 'M', label: 'Speed Lines', mode: 'speed-lines'},
  {presetId: 'accent-stamp-triplet', engine: 'graphic-hit', intensity: 'L', label: 'Stamp Triplet', mode: 'triplet'},
];
