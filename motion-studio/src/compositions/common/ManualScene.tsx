import type {CSSProperties} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {PaperTexture} from '../../components/common/PaperTexture';

const col: CSSProperties = {
  flex: 1,
  background: colors.ivory,
  borderRadius: 10,
  padding: '34px 40px',
  boxShadow: '0 14px 50px rgba(16,25,44,0.18)',
};

const h: CSSProperties = {
  fontSize: 30,
  letterSpacing: '0.2em',
  color: '#8C7A4F',
  borderBottom: `1.5px solid ${colors.gold}`,
  paddingBottom: 12,
  marginBottom: 20,
};

const li: CSSProperties = {
  fontSize: 24,
  lineHeight: 1.75,
  color: colors.navy,
};

// Studio内で読める取扱説明。詳細は MANUAL.md を見る。
export const ManualScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.beige,
        fontFamily: serifFamily,
        padding: '60px 70px',
        opacity,
      }}
    >
      <PaperTexture opacity={0.05} id="manual-grain" />
      <div style={{textAlign: 'center', marginBottom: 36}}>
        <div style={{fontSize: 26, letterSpacing: '0.42em', color: '#8C7A4F'}}>
          MOTION STUDIO
        </div>
        <div style={{fontSize: 44, letterSpacing: '0.2em', color: colors.navy, marginTop: 6}}>
          取扱説明 — 詳細は MANUAL.md
        </div>
      </div>
      <div style={{display: 'flex', gap: 36, flex: 1}}>
        <div style={col}>
          <div style={h}>1. 素材を作る5ステップ</div>
          <div style={li}>
            ① 左の一覧からテンプレートを選ぶ
            <br />
            ② 右のPropsパネルで文字・色・サイズを調整
            <br />
            ③ 再生して動きを確認する
            <br />
            ④「Save defaults」で調整値を保存
            <br />
            ⑤ 右下のRenderボタンか
            <br />
            　 `pnpm render:xxx` で書き出し
          </div>
          <div style={{...h, marginTop: 28}}>写真の差し替え</div>
          <div style={li}>
            public/photos/opening/ に写真を置き、
            <br />
            写真テンプレのphotos欄に
            <br />
            "opening/ファイル名.jpg" と入力する
          </div>
        </div>
        <div style={col}>
          <div style={h}>2. CapCutへの渡し方</div>
          <div style={li}>
            ・出力先は out/opening/ と out/common/
            <br />
            ・押印と雲は透過webm → 上のトラックに重ねる
            <br />
            ・押印はブレンド「乗算」でインク感が増す
            <br />
            ・雲は不透明度を下げて使う
            <br />
            ・BGMを先に置き、山にマーカーを打つ
            <br />
            ・押印の「ポン」と秒読の開始を山に合わせる
            <br />
            ・透過が黒くなったらProRes版を書き出す
          </div>
        </div>
        <div style={col}>
          <div style={h}>3. Tips</div>
          <div style={li}>
            ・1カット1動作。動きを足しすぎない
            <br />
            ・ズームは1.04〜1.06で十分
            <br />
            ・尺が合わない時はCapCutで切らず
            <br />
            　 Remotion側で秒数を直す方が綺麗
            <br />
            ・テンプレ名は漢字のみ(かな不可)
            <br />
            ・新しい動きが欲しくなったら
            <br />
            　 Claudeに頼めばテンプレ化される
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
