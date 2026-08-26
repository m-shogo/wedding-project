import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderableMotionPresets} from '../src/motion-kit/renderablePresets.ts';
import {resolveTransitionWipeProps, resolveTransitionWipePresetProps} from '../src/motion-kit/transitionWipeResolver.ts';
import {
  buildCubicBezierArcLengthLut,
  cubicBezierPointAtArcProgress,
  cubicBezierPoint,
  routeControlPoints,
  routeStaysWithinViewBox,
} from '../src/motion-kit/routeLineMath.ts';
import {resolveAllDirectorRecipes} from '../src/motion-kit/directorRecipeAdapter.ts';
import type {TransitionWipeDirection, TransitionWipeVariant} from '../src/motion-kit/engines.tsx';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(root, '..');
const engines = fs.readFileSync(path.join(root, 'src/motion-kit/engines.tsx'), 'utf8');
const presets = fs.readFileSync(path.join(root, 'src/motion-kit/renderablePresets.ts'), 'utf8');
const reel = fs.readFileSync(path.join(root, 'src/compositions/common/StartMotionReel.tsx'), 'utf8');
const rootFile = fs.readFileSync(path.join(root, 'src/StartMotionKitRoot.tsx'), 'utf8');
const index = fs.readFileSync(path.join(root, 'src/index-start-motion-kit.ts'), 'utf8');
const catalog = fs.readFileSync(path.join(repoRoot, 'movie-dashboard/src/data/startMotionKit.ts'), 'utf8');
const errors: string[] = [];

const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const engine of ['TypographyRevealEngine', 'CameraTransformEngine', 'TransitionWipeEngine', 'GraphicHitEngine', 'NativeCutEngine', 'PhotoLayoutEngine']) {
  requireText(engines, `function ${engine}`, `shared renderer missing: ${engine}`);
}
for (const intensity of ["'S'", "'M'", "'L'"]) requireText(engines, intensity, `motion intensity missing: ${intensity}`);
requireText(engines, 'transparent?: boolean', 'transparent overlay support missing');

const ids = [...presets.matchAll(/presetId: '([^']+)'/g)].map((match) => match[1]);
// 2026-08-26: モーション図鑑v1カタログ化のため8→17→21→23→25→28→33へ拡張。
// hop/lock/outline/release/triplet/vertical-wipe/paper/word-stagger/counter-scroll/
// freeze/cel-shadow/rgb-splitはengineへの新機能実装を伴う(既存modeの使い回しではない)。
// 33件で、engine: 'remotion'の35 Motion Kit presetのうちtype-mask-slide経由分を除く
// 全件がrenderable化された(davinci-edit/palmier-nativeのcut-match-shape /
// whip-source-matched / type-quiet-captionはRemotion描画対象外のまま)。
if (ids.length !== 33) errors.push(`renderable subset must contain exactly 33 evidence targets in V1, found ${ids.length}`);
if (new Set(ids).size !== ids.length) errors.push('renderable subset ids must be unique');
if (ids.length >= 36) errors.push('V1 renderer must not pretend all 36 catalog presets are renderable');
for (const id of ids) {
  if (!catalog.includes(`p("${id}"`)) errors.push(`renderable preset missing from Movie Coach catalog: ${id}`);
}
for (const engine of ['typography-reveal', 'camera-transform', 'transition-wipe', 'graphic-hit', 'native-cut', 'photo-layout']) {
  requireText(presets, `engine: '${engine}'`, `renderable subset must exercise shared engine: ${engine}`);
}

requireText(reel, 'renderableMotionPresets.map', 'Motion Reel must render the evidence subset');
requireText(reel, 'REAL PHOTO / VIDEO SLOT', 'Motion Reel must remain explicit about real media slots');
requireText(rootFile, 'id="StaRtMotionReelV1"', 'Motion Reel composition missing');
requireText(rootFile, 'id="StaRtMotionOverlayPreview"', 'transparent overlay preview composition missing');
requireText(index, 'registerRoot(StartMotionKitRoot)', 'StaRt Motion Kit entrypoint missing');

// --- transition-wipe direction/variant wiring regression check ---------------------------
//
// Prior bug: StartMotionReel.tsx overloaded a single `mode` string as both direction and
// variant, so route-line/flash silently fell back to the generic 'wipe' variant. This exercises
// the real resolveTransitionWipeProps() pure function (the same one StartMotionReel.tsx and
// directorRecipeAdapter.ts call) against the actual renderableMotionPresets data, instead of
// grepping source text, so it fails if the wiring regresses again.
const transitionWipePresets = renderableMotionPresets.filter((preset) => preset.engine === 'transition-wipe');
if (transitionWipePresets.length === 0) {
  errors.push('expected at least one engine: "transition-wipe" renderable preset to validate direction/variant wiring against');
}

const expectedWipeVariantByPresetId: Record<string, TransitionWipeVariant> = {
  'wipe-route-line': 'route-line',
  'flash-one-frame-soft': 'flash',
  'wipe-directional-shape': 'shape',
  'wipe-paper-edge': 'paper',
  'color-field-release': 'release',
};
for (const [presetId, expectedVariant] of Object.entries(expectedWipeVariantByPresetId)) {
  const preset = transitionWipePresets.find((entry) => entry.presetId === presetId);
  if (!preset) {
    errors.push(`transition-wipe wiring check: expected renderable preset missing: ${presetId}`);
    continue;
  }
  const resolved = resolveTransitionWipeProps(preset);
  if (resolved.variant !== expectedVariant) {
    errors.push(`transition-wipe wiring check: ${presetId} resolved variant="${resolved.variant}", expected "${expectedVariant}" (silently fell back to a generic variant?)`);
  }
  const canonical = resolveTransitionWipePresetProps(presetId);
  if (resolved.direction !== canonical.direction || resolved.variant !== canonical.variant) {
    errors.push(`transition-wipe wiring check: Motion Reel ${presetId} does not match canonical direction/variant mapping`);
  }
}

for (const recipe of resolveAllDirectorRecipes()) {
  for (const layer of recipe.layers.filter((entry) => entry.engine === 'transition-wipe')) {
    const canonical = resolveTransitionWipePresetProps(layer.presetId);
    if (layer.props.direction !== canonical.direction || layer.props.variant !== canonical.variant) {
      errors.push(`transition-wipe wiring check: Director Recipe ${recipe.recipe.id}/${layer.presetId} does not match canonical direction/variant mapping`);
    }
  }
}

// Every transition-wipe preset must set its own `wipeVariant` explicitly. `mode` must not be
// used to smuggle a direction/variant value for this engine (that ambiguity is exactly what
// caused the original bug), and an unset `wipeVariant` would silently resolve to the generic
// 'wipe' via resolveTransitionWipeProps's default — which is fine for a deliberately generic
// preset, but there is currently no such preset in the catalog, so require it to be explicit.
for (const preset of transitionWipePresets) {
  if (preset.mode !== undefined) {
    errors.push(`transition-wipe wiring check: ${preset.presetId} sets legacy "mode" (="${preset.mode}"); use direction/wipeVariant instead`);
  }
  if (preset.wipeVariant === undefined) {
    errors.push(`transition-wipe wiring check: ${preset.presetId} does not set wipeVariant explicitly (would silently resolve to the generic "wipe")`);
  }
}

// --- route-line Bezier geometry regression check ------------------------------------------
//
// Prior bug: the leading dot was positioned with independent HTML percent-interpolation while
// the line was an SVG Bezier path, so the dot did not track the curve, vertical directions
// escaped the viewBox, and 'left'/'up' did not reverse traversal. This recomputes the same pure
// geometry the engine renders and asserts on it directly.
const allDirections: TransitionWipeDirection[] = ['left', 'right', 'up', 'down'];
for (const direction of allDirections) {
  if (!routeStaysWithinViewBox(direction)) {
    errors.push(`route-line geometry check: direction="${direction}" control points fall outside the viewBox`);
  }
  const points = routeControlPoints(direction);
  const start = cubicBezierPoint(points, 0);
  const end = cubicBezierPoint(points, 1);
  if (Math.abs(start.x - points[0].x) > 0.001 || Math.abs(start.y - points[0].y) > 0.001) {
    errors.push(`route-line geometry check: direction="${direction}" t=0 must equal the first control point`);
  }
  if (Math.abs(end.x - points[3].x) > 0.001 || Math.abs(end.y - points[3].y) > 0.001) {
    errors.push(`route-line geometry check: direction="${direction}" t=1 must equal the last control point`);
  }
  const primaryAxis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const increasing = direction === 'right' || direction === 'down';
  if (increasing && !(end[primaryAxis] > start[primaryAxis])) {
    errors.push(`route-line geometry check: direction="${direction}" should travel toward increasing ${primaryAxis}`);
  }
  if (!increasing && !(end[primaryAxis] < start[primaryAxis])) {
    errors.push(`route-line geometry check: direction="${direction}" should travel toward decreasing ${primaryAxis}`);
  }

  const productionLut = buildCubicBezierArcLengthLut(points);
  const referenceLut = buildCubicBezierArcLengthLut(points, 32768);
  for (const progress of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
    const productionPoint = cubicBezierPointAtArcProgress(points, progress, productionLut);
    const referencePoint = cubicBezierPointAtArcProgress(points, progress, referenceLut);
    const errorPixels = Math.hypot(productionPoint.x - referencePoint.x, productionPoint.y - referencePoint.y);
    if (errorPixels > 1) {
      errors.push(`route-line arc-length check: direction="${direction}" progress=${progress} dot error=${errorPixels.toFixed(3)}px exceeds 1px`);
    }
  }
}

if (errors.length) {
  console.error(`StaRt shared renderer contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `StaRt shared renderer contracts OK: ${ids.length} renderable presets / 4 shared engines / transparent overlay preview / ` +
    `${transitionWipePresets.length} transition-wipe direction+variant wired / route-line geometry within viewBox and arc-length dot error <=1px for all 4 directions.`,
);
