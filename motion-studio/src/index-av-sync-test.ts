import {registerRoot, Composition} from 'remotion';
import React from 'react';
import {AVSyncTestComposition, avSyncTestDurationInFrames} from './compositions/startWeddingEdit/AVSyncTest';

const Root: React.FC = () =>
  React.createElement(Composition, {
    id: 'AVSyncTest',
    component: AVSyncTestComposition,
    durationInFrames: avSyncTestDurationInFrames,
    fps: 30,
    width: 1920,
    height: 1080,
  });

registerRoot(Root);
