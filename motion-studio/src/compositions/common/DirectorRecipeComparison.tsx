import {AbsoluteFill} from 'remotion';
import {DirectorRecipePreview} from './DirectorRecipePreview';
import {resolveDirectorRecipeById} from '../../motion-kit/directorRecipeAdapter';
export {comparisonDurationInFrames} from '../../motion-kit/directorRecipeReelSelections';

// Must match the width/height this composition is registered with in DirectorRecipeRoot.tsx.
// DirectorRecipePreview's internals use absolute pixel offsets authored for a 1920x1080 canvas,
// so a comparison cell is built by rendering the full 1920x1080 preview into a fixed-size
// wrapper and scaling the whole wrapper down with a CSS transform, rather than letting it
// reflow inside a small box.
const COMP_WIDTH = 1920;
const COMP_HEIGHT = 1080;
const GRID_PADDING = 18;
const GRID_GAP = 12;

function ComparisonCell({recipeId, cellWidth, cellHeight}: {recipeId: string; cellWidth: number; cellHeight: number}) {
  const {recipe} = resolveDirectorRecipeById(recipeId);
  const scale = Math.min(cellWidth / COMP_WIDTH, cellHeight / COMP_HEIGHT);

  return (
    <div style={{position: 'relative', width: cellWidth, height: cellHeight, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.28)', background: '#05101c'}}>
      <div style={{position: 'absolute', top: 0, left: 0, width: COMP_WIDTH, height: COMP_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left'}}>
        <DirectorRecipePreview recipeId={recipeId} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 10,
          bottom: 8,
          right: 10,
          fontSize: 13,
          color: '#fff',
          opacity: 0.9,
          letterSpacing: '0.03em',
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
        }}
      >
        {recipe.label}
      </div>
    </div>
  );
}

/**
 * A comparison set: several recipes rendered simultaneously (same global frame clock) so the
 * same "moment" is visible executed through different editorial grammars at once, instead of
 * having to remember one clip while watching the next. See Phase C task brief item 3.
 */
export function DirectorRecipeComparisonGrid({recipeIds, columns}: {recipeIds: string[]; columns?: number}) {
  const cols = columns ?? (recipeIds.length > 4 ? 3 : 2);
  const rows = Math.ceil(recipeIds.length / cols);
  const cellWidth = (COMP_WIDTH - GRID_PADDING * 2 - GRID_GAP * (cols - 1)) / cols;
  const cellHeight = (COMP_HEIGHT - GRID_PADDING * 2 - GRID_GAP * (rows - 1)) / rows;

  return (
    <AbsoluteFill style={{backgroundColor: '#05101c', padding: GRID_PADDING}}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: GRID_GAP, width: '100%', height: '100%'}}>
        {recipeIds.map((id) => (
          <ComparisonCell key={id} recipeId={id} cellWidth={cellWidth} cellHeight={cellHeight} />
        ))}
      </div>
    </AbsoluteFill>
  );
}
