import {loadFont} from '@remotion/google-fonts/CormorantGaramond';

const {fontFamily} = loadFont();

// 上品なセリフ体。レンダリング時にGoogle Fontsから読み込む。
export const serifFamily = `'${fontFamily}', Georgia, 'Times New Roman', serif`;
