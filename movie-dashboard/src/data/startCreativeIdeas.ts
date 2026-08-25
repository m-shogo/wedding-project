import type {StartExtendedSectionId} from "./startExtendedRhythmMap";

export type StartCreativeDirectionId = "balanced-joy" | "documentary-warm" | "anime-pop";
export type StartCreativeIdeaCategory = "photo" | "motion" | "typography" | "sound";

export interface StartCreativeDirection {
  id: StartCreativeDirectionId;
  label: string;
  summary: string;
  visualRule: string;
  risk: string;
}

export const startCreativeDirections: StartCreativeDirection[] = [
  {id: "balanced-joy", label: "旅するWedding Editorial", summary: "写真を主役に、旅の高揚感とStaRtらしい遊びを要所だけ足す。", visualRule: "静止 → 小さな動き → 3-hit → 呼吸、の落差を作る。", risk: "安全に寄せすぎると普通のスライドショーになる。"},
  {id: "documentary-warm", label: "温かいDocumentary", summary: "表情・家族・友人・自然な動画を中心に、見せる時間を長く取る。", visualRule: "文字とグラフィックを減らし、視線・手・笑顔のつながりで編集する。", risk: "曲の楽しさが弱くならないようサビの変化は残す。"},
  {id: "anime-pop", label: "Playful Anime-OP", summary: "大胆なcrop、短い文字、線・stamp・dotで明るい勢いを強める。", visualRule: "派手さはサビと3-hitへ集中し、全編では使わない。", risk: "エフェクトが人物や写真を隠すとAIテンプレ感が出る。"},
];

export interface StartCreativeIdea {
  id: string;
  sectionId: StartExtendedSectionId;
  category: StartCreativeIdeaCategory;
  title: string;
  suggestion: string;
  why: string;
  materialHint: string;
  caution: string;
}

export const startCreativeIdeas: StartCreativeIdea[] = [
  {id: "opening-eyes-first", sectionId: "opening-pickup", category: "photo", title: "最初は視線で迎える", suggestion: "2人がカメラを見る強い1枚を完全静止で見せ、WELCOMEは小さく置く。", why: "曲より先に人物への信頼を作れる。", materialHint: "目線が見え、背景が散らかっていない横写真。", caution: "冒頭からzoomやflashを入れない。"},
  {id: "opening-room-tone", sectionId: "opening-pickup", category: "sound", title: "会場の空気から始める", suggestion: "正規音源前に、ごく薄い会場room toneか無音の余白を比較する。", why: "上映会場と映像の世界を自然につなげられる。", materialHint: "会場で録った短い環境音。なければ無音比較。", caution: "仮音源で開始位置を確定しない。"},
  {id: "intro-ticket-memory", sectionId: "intro", category: "motion", title: "搭乗券は一度だけ", suggestion: "写真の端から搭乗券要素を1回だけ持ち上げ、route lineで次の旅へつなぐ。", why: "旅の始まりを説明しすぎず伝えられる。", materialHint: "空港・窓・荷物・後ろ姿の写真。", caution: "旅行UIを全編に常設しない。"},
  {id: "intro-departure-word", sectionId: "intro", category: "typography", title: "出発の一語", suggestion: "短い英単語か地名を1つだけ表示し、写真の余白へ固定する。", why: "文字が章タイトルとして機能し、歌詞表示にならない。", materialHint: "文字を置ける空や壁の余白がある写真。", caution: "文章や複数フォントを使わない。"},
  {id: "verse1a-gaze-match", sectionId: "verse-1-a", category: "photo", title: "視線で写真をつなぐ", suggestion: "右を見る写真→進行方向の景色→左から入る写真の順に並べる。", why: "派手なtransitionなしで自然な推進感が出る。", materialHint: "横顔・歩く方向・乗り物の窓の写真。", caution: "撮影順より画面内の方向を優先して比較する。"},
  {id: "verse1a-location-caption", sectionId: "verse-1-a", category: "typography", title: "地名は小さなキャプション", suggestion: "OKINAWAなどの場所名を雑誌のfolioのように小さく置く。", why: "写真の意味を補いながら主役を奪わない。", materialHint: "場所が分かりにくいが表情の良い写真。", caution: "毎カット同じ位置に出し続けない。"},
  {id: "verse1b-detail-burst", sectionId: "verse-1-b", category: "photo", title: "細部写真で期待を積む", suggestion: "手元・料理・看板・靴などのdetailを短く挟み、最後に人物写真へ戻す。", why: "人物写真だけの単調さを避け、サビ前の密度を上げられる。", materialHint: "旅先の物・食事・手・小物の写真。", caution: "細部を連打して2人が見えなくならないようにする。"},
  {id: "verse1b-one-scribble", sectionId: "verse-1-b", category: "motion", title: "手描き線は一発", suggestion: "一番楽しそうな1枚だけに短いscribble underlineを入れる。", why: "遊び心を先出ししつつサビのピークを残せる。", materialHint: "動きのある笑顔・ジャンプ・食事写真。", caution: "zoom・blur・speed lineを同時に足さない。"},
  {id: "chorus1a-hero-hold", sectionId: "chorus-1-a", category: "photo", title: "Heroを先に止める", suggestion: "サビ頭は最強写真を静止で受け、その後だけ小さくpushする。", why: "曲の上昇をtransitionではなく写真の強さで受けられる。", materialHint: "2人の表情・衣装・背景が同時に強い写真。", caution: "サビ頭で写真をすぐ切り替えない。"},
  {id: "chorus1a-word-punch", sectionId: "chorus-1-a", category: "typography", title: "短い言葉を一度だけ", suggestion: "THANK YOUやLET'S STARTなど短い語を1回だけ大きく出す。", why: "Weddingの意味とサビのhitを同時に作れる。", materialHint: "文字を避けられる余白のあるHero写真。", caution: "歌詞本文を表示しない。"},
  {id: "chorus1b-same-photo-hit", sectionId: "chorus-1-b", category: "motion", title: "同じ写真で3-hit", suggestion: "同じHero上でstamp → line → route dotだけを順番に打つ。", why: "写真を読ませたままStaRtの擬音的な楽しさを出せる。", materialHint: "中央や端にグラフィック用余白があるHero写真。", caution: "3回のfull-screen cut・flash・shakeは禁止。"},
  {id: "chorus1b-three-sound", sectionId: "chorus-1-b", category: "sound", title: "3-hitの音は薄く", suggestion: "BGM上で聞こえる場合だけ、質感の違う小さな3音を比較する。", why: "視覚hitを補強できるが、曲を壊さずに済む。", materialHint: "権利確認済みのstamp・paper・tick系SE。", caution: "BGMのアタックと競合するならSEを使わない。"},
  {id: "interlude-window-breath", sectionId: "interlude-1", category: "photo", title: "窓の外で呼吸する", suggestion: "人物から離れ、飛行機・車・ホテル窓の景色を長めに見せる。", why: "1番サビのピークをリセットし、2番へ進める。", materialHint: "窓越しの景色・雲・海・移動中の短い動画。", caution: "新しい情報を大量に入れない。"},
  {id: "interlude-route-reset", sectionId: "interlude-1", category: "motion", title: "Routeで章をリセット", suggestion: "1本のroute lineで前半の場所を結び、次の人物章へ切り替える。", why: "写真文法からグラフィック文法へ一度だけ変化できる。", materialHint: "地名順と実際の旅順のメモ。", caution: "正確な地図UIを作り込みすぎない。"},
  {id: "verse2a-people-panels", sectionId: "verse-2-a", category: "photo", title: "家族・友人を2枚ずつ", suggestion: "関係性が伝わる写真を2枚単位のpanelで見せ、名前は必要な人だけ付ける。", why: "大量写真でも誰との思い出か読みやすい。", materialHint: "同じ人物・場面で距離感の違う写真。", caution: "全員を同じ小ささで並べない。"},
  {id: "verse2a-lower-third", sectionId: "verse-2-a", category: "typography", title: "人物紹介はlower third", suggestion: "FAMILY / FRIENDSなど関係性だけを短く表示する。", why: "説明しすぎず、2人以外の登場を自然に理解できる。", materialHint: "誰が写っているかの簡単なメモ。", caution: "全員のフルネームを必須にしない。"},
  {id: "verse2b-motion-crop", sectionId: "verse-2-b", category: "motion", title: "動きに合わせた大胆crop", suggestion: "腕・視線・歩く方向を次カットの構図へつなぐcrop transitionを1回使う。", why: "2回目のサビ前を1番と違う方法で高められる。", materialHint: "似た方向へ動く写真または動画。", caution: "顔や身体の重要部分を切らない。"},
  {id: "verse2b-color-match", sectionId: "verse-2-b", category: "photo", title: "色で次のHeroへつなぐ", suggestion: "青→青、夕景→暖色など色の近い写真順でサビHeroへ導く。", why: "transitionを増やさず連続性を作れる。", materialHint: "空・海・服・照明の色が強い写真。", caution: "時系列を崩す場合は意味が通るか確認する。"},
  {id: "chorus2a-new-hero", sectionId: "chorus-2-a", category: "photo", title: "1回目と違うHero", suggestion: "1回目が正面なら、2回目は自然な笑顔・動き・広い景色のHeroを選ぶ。", why: "同じレイアウトでも物語が進んだ印象を作れる。", materialHint: "1回目と構図・場所・感情が異なる強い写真。", caution: "単にzoom量だけを増やして強くしない。"},
  {id: "chorus2a-crowd-lift", sectionId: "chorus-2-a", category: "motion", title: "周囲の人へ広げる", suggestion: "Heroの後に家族・友人の笑顔を短く入れ、祝福のスケールを広げる。", why: "2人の旅が結婚式当日の共同体へ着地する。", materialHint: "家族・友人と2人が同じ場にいる写真。", caution: "Hero直後に細かく切りすぎない。"},
  {id: "chorus2b-evolved-hit", sectionId: "chorus-2-b", category: "motion", title: "2回目の3-hitを少し進化", suggestion: "stamp → line → dotの順は保ち、色かscaleのどちらか一方だけ強める。", why: "モチーフを回収しながら繰り返し感を減らせる。", materialHint: "グラフィック用余白のある2回目Hero。", caution: "新しい4つ目のhitを足さない。"},
  {id: "chorus2b-name-hit", sectionId: "chorus-2-b", category: "typography", title: "名前の一部をhitにする", suggestion: "3-hitのうち1つをSHOGO / SHIORIなど名前の短い表示へ置き換えて比較する。", why: "抽象的なgraphicをWedding固有の意味へ戻せる。", materialHint: "英字表記と大文字小文字の希望。", caution: "名前とstampとroute dotを全部同時に出さない。"},
  {id: "recap-contact-sheet", sectionId: "post-chorus-interlude-a", category: "photo", title: "旅のcontact sheet", suggestion: "沖縄・Seoul・Hawaii・家族・友人から代表1枚ずつを写真プリント風に振り返る。", why: "ここまでの物語を短時間で思い出せる。", materialHint: "各章を象徴する代表写真。", caution: "新しい写真だけで構成せず、既出写真も回収する。"},
  {id: "recap-real-laughter", sectionId: "post-chorus-interlude-a", category: "sound", title: "実音声を一瞬だけ", suggestion: "使える場合は笑い声や旅先の環境音を一瞬だけ薄く重ねる。", why: "写真中心の映像に本人性と記憶の手触りが戻る。", materialHint: "実動画に入った自然な音声。", caution: "会話内容やプライバシーを人間確認する。"},
  {id: "rising-yokohama", sectionId: "post-chorus-interlude-b", category: "motion", title: "横浜へ線が上がる", suggestion: "route dotを横浜へ進め、線の上昇をEND WINDOWの文字位置へつなぐ。", why: "旅の終点と会場への到着を1つの動きで示せる。", materialHint: "横浜・会場外観・移動中の写真。", caution: "地図の正確さより方向と到着感を優先する。"},
  {id: "rising-venue-glimpse", sectionId: "post-chorus-interlude-b", category: "photo", title: "会場は一瞬だけ先に見せる", suggestion: "会場のdetailを短く見せ、全景や本命写真はEND WINDOWへ残す。", why: "到着への期待を作り、締めを先食いしない。", materialHint: "入口・照明・看板・窓など会場detail。", caution: "会場紹介動画のように説明しすぎない。"},
  {id: "end-name-date", sectionId: "end-before-c-section", category: "typography", title: "名前と日付だけで止める", suggestion: "SHOGO & SHIORI / 2026.10.24を最小構成で固定し、最後の音で完全静止する。", why: "次の入場や会場進行へ明確に渡せる。", materialHint: "正式な英字表記・日付・必要なら会場名。", caution: "豪華なロゴanimationを追加しない。"},
  {id: "end-human-smile", sectionId: "end-before-c-section", category: "photo", title: "最後は作り笑いでない表情", suggestion: "文字背景には、カメラ目線より自然に笑っている2人の写真も比較する。", why: "映画的な締めより2人らしい余韻を残せる。", materialHint: "自然な笑顔・手をつなぐ・歩く後ろ姿。", caution: "文字が顔へ重ならない構図を選ぶ。"},
];

export function getStartCreativeDirection(id: StartCreativeDirectionId) {
  return startCreativeDirections.find((direction) => direction.id === id) ?? startCreativeDirections[0];
}

export function getStartCreativeIdea(id: string) {
  return startCreativeIdeas.find((idea) => idea.id === id);
}
