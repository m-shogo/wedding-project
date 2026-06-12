import {FadeUpCaption, type FadeUpCaptionProps} from './FadeUpCaption';
import {MaskRevealTitle, type MaskRevealTitleProps} from './MaskRevealTitle';
import {ElegantLowerThird, type ElegantLowerThirdProps} from './ElegantLowerThird';

// textパーツの統一入口。variantで呼び分ける薄いdispatcher。
// テンプレ側は <TextPart variant="..." /> を差すだけにする。型はvariantごとに厳密。
export type TextPartProps =
  | ({variant: 'fade-up'} & FadeUpCaptionProps)
  | ({variant: 'mask-reveal'} & MaskRevealTitleProps)
  | ({variant: 'lower-third'} & ElegantLowerThirdProps);

export const TextPart = (props: TextPartProps) => {
  switch (props.variant) {
    case 'fade-up': {
      const {variant: _variant, ...rest} = props;
      return <FadeUpCaption {...rest} />;
    }
    case 'mask-reveal': {
      const {variant: _variant, ...rest} = props;
      return <MaskRevealTitle {...rest} />;
    }
    case 'lower-third': {
      const {variant: _variant, ...rest} = props;
      return <ElegantLowerThird {...rest} />;
    }
    default: {
      // variantの網羅漏れをコンパイル時に検出する
      const _exhaustive: never = props;
      return _exhaustive;
    }
  }
};
