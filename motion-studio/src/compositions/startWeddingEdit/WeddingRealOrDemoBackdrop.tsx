// StaRt Wedding Edit専用のbackdrop。StartDemoBackdrop(start129共有部品)が
// TASK4で受け取れるようになったassetResolver injectionを、weddingAssetResolver
// で固定した薄いwrapper。real → demo → placeholderのfallback描画ロジック自体は
// StartDemoBackdrop側にのみ存在し、二重実装しない。

import React from 'react';
import {StartDemoBackdrop, type StartDemoBackdropProps} from '../start129/StartDemoBackdrop';
import {weddingAssetResolver} from '../../data/startWeddingEdit/realMedia';

export const WeddingRealOrDemoBackdrop: React.FC<StartDemoBackdropProps> = (props) => (
  <StartDemoBackdrop {...props} assetResolver={weddingAssetResolver} />
);
