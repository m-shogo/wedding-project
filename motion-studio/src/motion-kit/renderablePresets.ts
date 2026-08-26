import type {MotionIntensity} from './engines';

export type RenderEngine = 'typography-reveal' | 'camera-transform' | 'transition-wipe' | 'graphic-hit' | 'native-cut' | 'photo-layout';

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
  // 2026-08-26追加: モーション図鑑v1カタログ化のため、既存engineが既に対応している
  // modeだけを使ってrenderable presetを増やす(新しいengine機能は追加しない)。
  {presetId: 'type-char-stagger', engine: 'typography-reveal', intensity: 'M', label: 'Character Stagger', demoText: 'JOURNEY', mode: 'stagger'},
  {presetId: 'photo-directional-pan', engine: 'camera-transform', intensity: 'M', label: 'Directional Pan', mode: 'pan'},
  {presetId: 'photo-2p5d-parallax', engine: 'camera-transform', intensity: 'M', label: '2.5D Parallax', mode: 'parallax'},
  {presetId: 'photo-contact-sheet-snap', engine: 'photo-layout', intensity: 'M', label: 'Contact Sheet Snap', mode: 'contact-sheet'},
  {presetId: 'photo-split-panel', engine: 'photo-layout', intensity: 'M', label: 'Split Panel', mode: 'split-panel'},
  {presetId: 'accent-panel-grid', engine: 'photo-layout', intensity: 'M', label: 'Panel Grid', mode: 'panel-grid'},
  {presetId: 'accent-halftone-burst', engine: 'graphic-hit', intensity: 'M', label: 'Halftone Burst', mode: 'halftone'},
  {presetId: 'accent-scribble-underline', engine: 'graphic-hit', intensity: 'M', label: 'Scribble Underline', mode: 'scribble'},
  {presetId: 'cut-hard-accent', engine: 'native-cut', intensity: 'M', label: 'Hard Cut Accent', mode: 'hard'},
  // 2026-08-26 batch2: 同じくexisting engineのmode/directionだけを追加で使う。
  {presetId: 'type-tracking-burst', engine: 'typography-reveal', intensity: 'M', label: 'Tracking Burst', demoText: 'ARRIVAL', mode: 'stagger'},
  {presetId: 'photo-slow-pull', engine: 'camera-transform', intensity: 'M', label: 'Slow Pull', mode: 'pull'},
  {presetId: 'wipe-directional-shape', engine: 'transition-wipe', intensity: 'M', label: 'Directional Shape Wipe', mode: 'left'},
  {presetId: 'accent-impact-frame', engine: 'graphic-hit', intensity: 'L', label: 'Impact Frame', mode: 'impact'},
];
