import {z} from 'zod';
import {AbsoluteFill} from 'remotion';
import {CloudLayer} from '../../components/common/CloudLayer';

export const cloudOverlaySchema = z.object({
  cloudOpacity: z.number().min(0).max(1),
  speed: z.number().min(0.2).max(10),
});

export type CloudOverlayProps = z.infer<typeof cloudOverlaySchema>;

export const cloudOverlayDefaults: CloudOverlayProps = {
  cloudOpacity: 0.5,
  speed: 1.6,
};

// 透過背景の雲オーバーレイ。地図や写真の上に重ねる用。
export const CloudOverlayScene = ({cloudOpacity, speed}: CloudOverlayProps) => {
  return (
    <AbsoluteFill style={{backgroundColor: 'transparent'}}>
      <CloudLayer opacity={cloudOpacity} speed={speed} idSuffix="overlay" />
    </AbsoluteFill>
  );
};
