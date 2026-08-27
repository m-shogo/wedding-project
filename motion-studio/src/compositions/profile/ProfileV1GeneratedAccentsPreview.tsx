import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {ProfileV1GeneratedAccents} from './ProfileV1GeneratedAccents';

const accentChapters = [
  {id: 'departure' as const, title: '出発', chapterIndex: 0},
  {id: 'intersection' as const, title: '交差', chapterIndex: 2},
  {id: 'arrival' as const, title: '到着', chapterIndex: 4},
] as const;

/**
 * Optional generated rolesだけを実素材/BGMなしでvisual smokeできる9秒preview。
 * このcomposition自体はHuman production QAの代替ではない。
 */
export const ProfileV1GeneratedAccentsPreview = () => {
  const {fps} = useVideoConfig();
  const beatDuration = 3 * fps;

  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #07131f, #173a5e)', color: '#fff', overflow: 'hidden'}}>
      {accentChapters.map((chapter, index) => (
        <Sequence key={chapter.id} from={index * beatDuration} durationInFrames={beatDuration} layout="none">
          <AbsoluteFill>
            <div
              style={{
                position: 'absolute',
                inset: 70,
                border: '1px solid rgba(255,255,255,0.16)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))',
              }}
            />
            <div style={{position: 'absolute', left: 82, top: 62, fontSize: 14, letterSpacing: '0.2em', opacity: 0.46}}>
              PROFILE V1 / GENERATED ROLE VISUAL SMOKE / NOT PRODUCTION EVIDENCE
            </div>
            <div style={{position: 'absolute', left: 82, bottom: 62, fontSize: 16, letterSpacing: '0.12em', opacity: 0.52}}>
              {chapter.id}
            </div>
            <ProfileV1GeneratedAccents
              chapterId={chapter.id}
              chapterTitle={chapter.title}
              chapterIndex={chapter.chapterIndex}
              duration={beatDuration}
            />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
