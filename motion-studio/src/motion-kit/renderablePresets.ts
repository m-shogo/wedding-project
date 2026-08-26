import type {MotionIntensity, TransitionWipeDirection, TransitionWipeVariant} from './engines';

export type RenderEngine = 'typography-reveal' | 'camera-transform' | 'transition-wipe' | 'graphic-hit' | 'native-cut' | 'photo-layout';

export interface RenderableMotionPreset {
  presetId: string;
  engine: RenderEngine;
  intensity: MotionIntensity;
  label: string;
  demoText?: string;
  // typography-reveal / camera-transform / native-cut / photo-layout / graphic-hitのmode・
  // variant選択に使う。transition-wipeだけは下のdirection/wipeVariantを使う専用フィールドを
  // 持つため、engine: 'transition-wipe'のpresetではmodeを設定しない
  // (direction/variantの二重意味を`mode`一つへ押し込めない)。
  mode?: string;
  // engine: 'transition-wipe'専用。方向性を持たないvariant(flash/release等)では省略してよい。
  direction?: TransitionWipeDirection;
  // engine: 'transition-wipe'専用。省略時はresolveTransitionWipePropsが'wipe'へ既定する。
  wipeVariant?: TransitionWipeVariant;
}

export const renderableMotionPresets: RenderableMotionPreset[] = [
  {presetId: 'type-mask-slide', engine: 'typography-reveal', intensity: 'M', label: 'Mask Slide', demoText: 'WELCOME', mode: 'mask'},
  {presetId: 'type-word-punch', engine: 'typography-reveal', intensity: 'L', label: 'Word Punch', demoText: 'START', mode: 'punch'},
  {presetId: 'photo-static-hero', engine: 'camera-transform', intensity: 'S', label: 'Static Hero', mode: 'static'},
  {presetId: 'photo-small-push', engine: 'camera-transform', intensity: 'M', label: 'Small Push', mode: 'push'},
  {presetId: 'wipe-route-line', engine: 'transition-wipe', intensity: 'M', label: 'Route Line Wipe', direction: 'right', wipeVariant: 'route-line'},
  // flash-one-frame-softはdirectionに依存しない(TransitionWipeEngineのflash variantが
  // directionを無視して全画面impactのみを描く)ため、directionを指定しない。
  {presetId: 'flash-one-frame-soft', engine: 'transition-wipe', intensity: 'S', label: 'Soft Impact Frame', wipeVariant: 'flash'},
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
  {presetId: 'type-tracking-burst', engine: 'typography-reveal', intensity: 'M', label: 'Tracking Burst', demoText: 'ARRIVAL', mode: 'tracking'},
  {presetId: 'photo-slow-pull', engine: 'camera-transform', intensity: 'M', label: 'Slow Pull', mode: 'pull'},
  {presetId: 'wipe-directional-shape', engine: 'transition-wipe', intensity: 'M', label: 'Directional Shape Wipe', direction: 'right', wipeVariant: 'shape'},
  {presetId: 'accent-impact-frame', engine: 'graphic-hit', intensity: 'L', label: 'Impact Frame', mode: 'impact'},
  // 2026-08-26 batch3: TypographyRevealEngineへ新modeを2つ追加(hop/lock)して対応。
  // 他のbatchと違い、既存modeの使い回しではなく実際にengineへ新機能を実装した。
  {presetId: 'type-baseline-hop', engine: 'typography-reveal', intensity: 'M', label: 'Baseline Hop', demoText: 'HOP', mode: 'hop'},
  {presetId: 'type-frame-lock', engine: 'typography-reveal', intensity: 'L', label: 'Frame Lock', demoText: 'YOKOHAMA', mode: 'lock'},
  // 2026-08-26 batch4: 引き続きengineへ新機能(outline mode / release variant)を実装。
  {presetId: 'type-outline-fill', engine: 'typography-reveal', intensity: 'M', label: 'Outline to Fill', demoText: 'MEMORY', mode: 'outline'},
  // color-field-releaseもflash同様direction非依存(全画面のfade-in/hold/fade-out)。
  {presetId: 'color-field-release', engine: 'transition-wipe', intensity: 'M', label: 'Color Field Release', wipeVariant: 'release'},
  // 2026-08-26 batch5: 引き続きengineへ新機能(triplet mode / vertical-wipe mode / paper variant)を実装。
  {presetId: 'type-triplet', engine: 'typography-reveal', intensity: 'L', label: 'Triplet Type', demoText: 'GO', mode: 'triplet'},
  {presetId: 'type-vertical-wipe', engine: 'typography-reveal', intensity: 'M', label: 'Vertical Wipe', demoText: 'CHAPTER', mode: 'vertical-wipe'},
  // directionは既存の実render確認済み挙動(motionPreviewEvidence.ts)を変えないため
  // 従来のデフォルト'right'のまま維持する。
  {presetId: 'wipe-paper-edge', engine: 'transition-wipe', intensity: 'M', label: 'Paper Edge Wipe', direction: 'right', wipeVariant: 'paper'},
  // 2026-08-26 batch6: TypographyRevealEngineへword-stagger/counter-scroll mode、
  // CameraTransformEngineへfreeze mode、GraphicHitEngineへcel-shadow/rgb-split
  // variantを新規実装。これでdavinci-edit/palmier-native以外(engine: 'remotion')の
  // 35 Motion Kit presetを全てrenderable化する。
  {presetId: 'type-type-on-rhythm', engine: 'typography-reveal', intensity: 'M', label: 'Rhythm Type On', demoText: 'OUR JOURNEY', mode: 'word-stagger'},
  {presetId: 'type-counter-scroll', engine: 'typography-reveal', intensity: 'M', label: 'Counter Scroll', demoText: 'YOKOHAMA → HAWAII', mode: 'counter-scroll'},
  {presetId: 'photo-freeze-cutout', engine: 'camera-transform', intensity: 'L', label: 'Freeze Cutout', mode: 'freeze'},
  {presetId: 'accent-cel-shadow-sweep', engine: 'graphic-hit', intensity: 'M', label: 'Cel Shadow Sweep', mode: 'cel-shadow'},
  {presetId: 'accent-micro-rgb-split', engine: 'graphic-hit', intensity: 'M', label: 'Micro RGB Split', mode: 'rgb-split'},
];
