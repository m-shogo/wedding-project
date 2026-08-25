import {AbsoluteFill} from 'remotion';
import {TypographyRevealEngine} from '../../motion-kit/engines';

/**
 * Repository-generated CONCEPT preview only.
 *
 * This deliberately reuses the existing TypographyRevealEngine instead of
 * inventing another Mask Reveal implementation. It is NOT evidence that the
 * DaVinci Text+ implementation has been verified.
 */
export function VisualMotionMaskRevealConcept() {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#17191c',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <TypographyRevealEngine text="WELCOME" intensity="M" mode="mask" transparent />
    </AbsoluteFill>
  );
}
