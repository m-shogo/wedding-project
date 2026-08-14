#!/usr/bin/env python3
"""サンプル素材を「1本にまとめる」「秒単位で切り分ける」ためのローカルツール。

このプロジェクトは素材本体をGitに入れない。素材は 10_references/media/ 配下
(Git管理外) にローカル保存し、このスクリプトで確認用リールへまとめたり、
docs/templates/sample-clips.csv のクリップ定義に従って切り出したりする。

前提: ffmpeg がインストール済み (brew install ffmpeg)。

使い方:
  # 1) 集めた素材を1本の確認用リールにまとめる (プールの動画を連結)
  python3 scripts/slice_clips.py reel                # 何をするか表示 (dry-run)
  python3 scripts/slice_clips.py reel --write        # 実行

  # 2) CSVのクリップ定義に従って切り分ける
  python3 scripts/slice_clips.py slice               # dry-run。切り出し予定を確認
  python3 scripts/slice_clips.py slice --write       # 実行
  python3 scripts/slice_clips.py slice --write --status picked   # pick=picked だけ
  python3 scripts/slice_clips.py slice --write --copy            # 再エンコードなし(高速/キーフレーム精度)

  # 3) CSVの定義だけ検証する (ffmpeg/素材不要。CIで実行)
  python3 scripts/slice_clips.py validate

デフォルトは frame 精度のため再エンコード (libx264 + aac)。
--copy は高速だがカット位置が最寄りキーフレームに寄る。まず確認用に切るなら --copy でよい。
"""
from __future__ import annotations

import argparse
import csv
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = REPO_ROOT / "docs" / "templates" / "sample-clips.csv"
MEDIA_DIR = REPO_ROOT / "10_references" / "media"
POOL_DIR = MEDIA_DIR / "pool"
REEL_DIR = MEDIA_DIR / "reel"
CLIPS_DIR = MEDIA_DIR / "clips"
REEL_PATH = REEL_DIR / "review_reel.mp4"

VIDEO_EXTS = {".mp4", ".mov", ".m4v", ".webm", ".mkv"}
# pick 状態の意味: pool=集めただけ / candidate=切り出し候補 / picked=採用 / rejected=不採用
SLICEABLE_DEFAULT = {"candidate", "picked"}


def die(msg: str) -> None:
    print(f"エラー: {msg}", file=sys.stderr)
    sys.exit(1)


def check_ffmpeg() -> None:
    from shutil import which

    if which("ffmpeg") is None:
        die("ffmpeg が見つかりません。`brew install ffmpeg` を実行してください。")


def parse_tc(value: str) -> float:
    """タイムコード文字列を秒(float)に変換する。

    受け付ける形式: SS, SS.ms, MM:SS(.ms), HH:MM:SS(.ms)
    """
    value = (value or "").strip()
    if not value:
        raise ValueError("空のタイムコード")
    parts = value.split(":")
    try:
        parts = [float(p) for p in parts]
    except ValueError as exc:
        raise ValueError(f"数値に変換できません: {value!r}") from exc
    if len(parts) == 1:
        seconds = parts[0]
    elif len(parts) == 2:
        seconds = parts[0] * 60 + parts[1]
    elif len(parts) == 3:
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2]
    else:
        raise ValueError(f"タイムコードの形式が不正: {value!r}")
    if seconds < 0:
        raise ValueError(f"負のタイムコード: {value!r}")
    return seconds


def fmt(seconds: float) -> str:
    return f"{seconds:.3f}"


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


# ---------------------------------------------------------------------------
# reel: プールの動画を1本にまとめる
# ---------------------------------------------------------------------------
def collect_pool_videos() -> list[Path]:
    if not POOL_DIR.exists():
        return []
    files = [p for p in sorted(POOL_DIR.iterdir()) if p.suffix.lower() in VIDEO_EXTS]
    return files


def build_reel(write: bool, keep_temp: bool = False) -> None:
    videos = collect_pool_videos()
    if not videos:
        die(
            f"プールに動画がありません: {rel(POOL_DIR)}\n"
            "  集めたサンプル動画を 10_references/media/pool/ に置いてから再実行してください。"
        )
    print(f"確認用リールを作成: {rel(REEL_PATH)}")
    print(f"連結する動画 {len(videos)} 本:")
    cumulative = 0.0
    for v in videos:
        print(f"  - {rel(v)}")
    print(
        "\n各動画は解像度・fpsを揃えるため再エンコードして連結します(1080p/30fps基準)。"
    )
    if not write:
        print("\n[dry-run] 実行するには --write を付けてください。")
        return

    check_ffmpeg()
    REEL_DIR.mkdir(parents=True, exist_ok=True)
    # concat demuxer は同一コーデック前提なので、まず各動画を中間正規化する。
    tmp_dir = REEL_DIR / "_tmp_normalized"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    normalized: list[Path] = []
    for i, v in enumerate(videos):
        out = tmp_dir / f"norm_{i:03d}.mp4"
        cmd = [
            "ffmpeg", "-y", "-i", str(v),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,"
                   "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30",
            "-c:v", "libx264", "-preset", "medium", "-crf", "20",
            "-c:a", "aac", "-ar", "48000", "-ac", "2",
            str(out),
        ]
        print(f"正規化中 ({i + 1}/{len(videos)}): {rel(v)}")
        subprocess.run(cmd, check=True)
        normalized.append(out)

    list_file = tmp_dir / "concat_list.txt"
    list_file.write_text(
        "".join(f"file '{p.as_posix()}'\n" for p in normalized), encoding="utf-8"
    )
    concat_cmd = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_file),
        "-c", "copy", str(REEL_PATH),
    ]
    print("連結中...")
    subprocess.run(concat_cmd, check=True)

    # 中間ファイルは素材全部の複製なので、実素材だと容量を食う。既定で消す。
    if keep_temp:
        print(f"\n中間ファイルを保持: {rel(tmp_dir)}")
    else:
        from shutil import rmtree

        rmtree(tmp_dir, ignore_errors=True)

    print(f"\n完了: {rel(REEL_PATH)}")
    print("この1本をスクラブして、使いたい区間の in/out を sample-clips.csv に記録してください。")


# ---------------------------------------------------------------------------
# slice: CSVに従って切り分ける
# ---------------------------------------------------------------------------
def load_rows() -> list[dict]:
    if not CSV_PATH.exists():
        die(f"CSVが見つかりません: {rel(CSV_PATH)}")
    with CSV_PATH.open(encoding="utf-8") as f:
        return list(csv.DictReader(f))


def slice_clips(write: bool, statuses: set[str], copy: bool) -> None:
    rows = load_rows()
    if not rows:
        die("CSVにクリップ定義がありません。")

    targets = []
    skipped = []
    for row in rows:
        pick = (row.get("pick") or "").strip().lower()
        if pick not in statuses:
            skipped.append((row, f"pick={pick or '(空)'} は対象外"))
            continue
        targets.append(row)

    print(f"対象 pick: {', '.join(sorted(statuses))}")
    print(f"切り出し対象: {len(targets)} 件 / 全 {len(rows)} 件\n")

    if skipped:
        print(f"スキップ {len(skipped)} 件 (pick状態が対象外):")
        for row, why in skipped:
            print(f"  - {row.get('clip_id', '?')}: {why}")
        print()

    plan = []
    errors = []
    for row in targets:
        clip_id = (row.get("clip_id") or "").strip() or "?"
        src_rel = (row.get("source_file") or "").strip()
        if not src_rel:
            errors.append(f"{clip_id}: source_file が空")
            continue
        src = (REPO_ROOT / src_rel).resolve()
        try:
            start = parse_tc(row.get("in_tc", ""))
            end = parse_tc(row.get("out_tc", ""))
        except ValueError as exc:
            errors.append(f"{clip_id}: タイムコード不正 ({exc})")
            continue
        if end <= start:
            errors.append(f"{clip_id}: out_tc({end}) <= in_tc({start})")
            continue
        out_name = (row.get("out_name") or "").strip() or clip_id
        out_path = CLIPS_DIR / f"{out_name}.mp4"
        exists = src.exists()
        plan.append(
            {
                "clip_id": clip_id, "src": src, "src_rel": src_rel,
                "start": start, "end": end, "out": out_path, "exists": exists,
            }
        )

    if errors:
        print("定義エラー:")
        for e in errors:
            print(f"  - {e}")
        print()

    print("切り出し計画:")
    for p in plan:
        mark = "" if p["exists"] else "  [ソース未配置]"
        print(
            f"  {p['clip_id']}: {p['src_rel']} "
            f"[{fmt(p['start'])}s → {fmt(p['end'])}s, {fmt(p['end'] - p['start'])}s] "
            f"→ {rel(p['out'])}{mark}"
        )

    missing = [p for p in plan if not p["exists"]]
    if not write:
        print("\n[dry-run] 実行するには --write を付けてください。")
        if missing:
            print(f"注意: ソース未配置が {len(missing)} 件あります(実行時にスキップ)。")
        return

    if errors:
        die("定義エラーがあるため実行を中止します。CSVを修正してください。")

    runnable = [p for p in plan if p["exists"]]
    if not runnable:
        die("実行可能なクリップがありません(ソースが全て未配置)。")

    check_ffmpeg()
    CLIPS_DIR.mkdir(parents=True, exist_ok=True)
    print()
    for p in runnable:
        dur = p["end"] - p["start"]
        if copy:
            cmd = [
                "ffmpeg", "-y", "-ss", fmt(p["start"]), "-i", str(p["src"]),
                "-t", fmt(dur), "-c", "copy", str(p["out"]),
            ]
        else:
            cmd = [
                "ffmpeg", "-y", "-i", str(p["src"]),
                "-ss", fmt(p["start"]), "-t", fmt(dur),
                "-c:v", "libx264", "-preset", "medium", "-crf", "18",
                "-c:a", "aac", str(p["out"]),
            ]
        print(f"切り出し: {p['clip_id']} → {rel(p['out'])}")
        subprocess.run(cmd, check=True)

    print(f"\n完了: {len(runnable)} 件を {rel(CLIPS_DIR)} に出力しました。")
    if missing:
        print(f"スキップ(ソース未配置): {len(missing)} 件")
    print("切り出したクリップを確認し、CSVの pick と rating を更新してください。")


EXPECTED_HEADER = [
    "clip_id", "source_file", "in_tc", "out_tc", "chapter", "role",
    "motion", "tags", "caption_space", "rating", "pick", "out_name", "notes",
]
VALID_PICK = {"pool", "candidate", "picked", "rejected"}
RECIPES_PATH = REPO_ROOT / "docs" / "data" / "recipes.json"


def load_recipes() -> tuple[set[str], set[str]]:
    """レシピ辞書から (motion語彙, レシピid) を読む。

    docs/data/recipes.json は人間向け docs/reference-recipes.md の機械可読版。
    CSVのmotionがこの語彙に無い＝表記ゆれなので検証で弾く。
    """
    if not RECIPES_PATH.exists():
        return set(), set()
    import json

    try:
        data = json.loads(RECIPES_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        die(f"{rel(RECIPES_PATH)} が不正なJSON: {exc}")
    motions = {m["id"] for m in data.get("motion_vocab", []) if "id" in m}
    recipe_ids = {r["id"] for r in data.get("recipes", []) if "id" in r}
    # レシピが語彙外のmotionを指していないかも見る(辞書自身の整合)
    unknown = {
        m for r in data.get("recipes", []) for m in r.get("motion", [])
    } - motions
    if unknown:
        die(
            f"{rel(RECIPES_PATH)}: recipes が motion_vocab に無い値を参照: "
            f"{', '.join(sorted(unknown))}"
        )
    return motions, recipe_ids


def validate_csv() -> None:
    """CSVの定義だけを検証する。ffmpegも素材も不要なのでCIから実行できる。"""
    if not CSV_PATH.exists():
        die(f"CSVが見つかりません: {rel(CSV_PATH)}")
    with CSV_PATH.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        header = reader.fieldnames or []
        rows = list(reader)

    motions, recipe_ids = load_recipes()

    errors: list[str] = []
    if header != EXPECTED_HEADER:
        errors.append(
            "ヘッダーが想定と違います。\n"
            f"    想定: {','.join(EXPECTED_HEADER)}\n"
            f"    実際: {','.join(header)}"
        )

    seen_ids: dict[str, int] = {}
    seen_out: dict[str, str] = {}
    for i, row in enumerate(rows, start=2):  # 2行目=最初のデータ行
        cid = (row.get("clip_id") or "").strip()
        loc = f"{i}行目"
        if not cid:
            errors.append(f"{loc}: clip_id が空")
        elif cid in seen_ids:
            errors.append(f"{loc}: clip_id 重複 '{cid}' ({seen_ids[cid]}行目と)")
        else:
            seen_ids[cid] = i

        if not (row.get("source_file") or "").strip():
            errors.append(f"{loc} ({cid}): source_file が空")

        try:
            start = parse_tc(row.get("in_tc", ""))
            end = parse_tc(row.get("out_tc", ""))
            if end <= start:
                errors.append(f"{loc} ({cid}): out_tc <= in_tc")
        except ValueError as exc:
            errors.append(f"{loc} ({cid}): タイムコード不正 ({exc})")

        pick = (row.get("pick") or "").strip().lower()
        if pick and pick not in VALID_PICK:
            errors.append(
                f"{loc} ({cid}): pick 不正 '{pick}' (許可: {', '.join(sorted(VALID_PICK))})"
            )

        rating = (row.get("rating") or "").strip()
        if rating:
            try:
                rv = int(rating)
                if not 0 <= rv <= 100:
                    errors.append(f"{loc} ({cid}): rating は0-100 (実際 {rv})")
            except ValueError:
                errors.append(f"{loc} ({cid}): rating が整数でない '{rating}'")

        motion = (row.get("motion") or "").strip()
        if motion and motions and motion not in motions:
            errors.append(
                f"{loc} ({cid}): motion 不正 '{motion}'。"
                f"docs/data/recipes.json の motion_vocab から選ぶ"
            )

        # notes にレシピid(rec-NN)を書いたら、実在するidか見る
        notes = row.get("notes") or ""
        for token in re.findall(r"rec-\d+", notes):
            if recipe_ids and token not in recipe_ids:
                errors.append(f"{loc} ({cid}): notes のレシピid '{token}' は存在しない")

        out_name = (row.get("out_name") or "").strip() or cid
        if out_name:
            if out_name in seen_out and seen_out[out_name] != cid:
                errors.append(f"{loc} ({cid}): out_name 重複 '{out_name}'")
            seen_out[out_name] = cid

    if errors:
        print(f"検証NG: {len(errors)} 件の問題", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print(f"検証OK: {len(rows)} 件のクリップ定義に問題なし ({rel(CSV_PATH)})")


PREVIEW_DIR = MEDIA_DIR / "preview"


def build_preview(write: bool, targets: str) -> None:
    """各動画から3枚(10%/50%/90%)を抜いて横並びの確認シートを作る。

    説明文だけでは分からない要素(ロゴ・人物・看板)を目視で弾くための工程。
    実測: "airplane wing" にAVIANCA、"airline plane taxiing" にAmericanの
    ロゴが写っていた。どちらも説明文からは読み取れなかった。
    """
    src_dir = POOL_DIR if targets == "pool" else CLIPS_DIR
    if not src_dir.exists():
        die(f"対象がありません: {rel(src_dir)}")
    videos = [p for p in sorted(src_dir.iterdir()) if p.suffix.lower() in VIDEO_EXTS]
    if not videos:
        die(f"動画がありません: {rel(src_dir)}")

    print(f"確認シートを作成: {rel(src_dir)} → {rel(PREVIEW_DIR)}")
    print(f"対象 {len(videos)} 本 (各3枚: 10% / 50% / 90%地点)")
    for v in videos:
        print(f"  - {v.name}")

    if not write:
        print("\n[dry-run] 実行するには --write を付けてください。")
        return

    check_ffmpeg()
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    print()
    for v in videos:
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "csv=p=0", str(v)],
            capture_output=True, text=True,
        )
        try:
            dur = float(probe.stdout.strip())
        except ValueError:
            print(f"  尺を取得できずスキップ: {v.name}")
            continue

        shots = []
        for i, ratio in enumerate((0.10, 0.50, 0.90)):
            shot = PREVIEW_DIR / f".{v.stem}_{i}.jpg"
            subprocess.run(
                ["ffmpeg", "-v", "error", "-y", "-ss", fmt(dur * ratio), "-i", str(v),
                 "-frames:v", "1", "-vf", "scale=420:-1", str(shot)],
                check=True,
            )
            shots.append(shot)

        sheet = PREVIEW_DIR / f"{v.stem}.jpg"
        cmd = ["ffmpeg", "-v", "error", "-y"]
        for s in shots:
            cmd += ["-i", str(s)]
        cmd += ["-filter_complex", "hstack=inputs=3", str(sheet)]
        subprocess.run(cmd, check=True)
        for s in shots:
            s.unlink(missing_ok=True)
        print(f"確認シート: {rel(sheet)}")

    print(f"\n完了: {len(videos)} 本分を {rel(PREVIEW_DIR)} に出力しました。")
    print("画像を開いて、人物・動物・文字・ロゴ・看板が無いか確認してください。")
    print("特に実在の航空機・店舗・車両は、ロゴや社名が写り込みやすい。")


DASHBOARD_JSON = REPO_ROOT / "movie-dashboard" / "src" / "data" / "clips.json"


def sync_dashboard(write: bool, check: bool = False) -> None:
    """CSV + レシピ辞書から movie-dashboard 用の clips.json を生成する。

    CSVを単一情報源にして、dashboard側は読み取り専用ビューアにする。
    (dashboardのlocalStorage編集と二重管理にならないようにするため)
    """
    import json

    validate_csv()  # 不正なCSVをdashboardへ流さない
    rows = load_rows()
    data = json.loads(RECIPES_PATH.read_text(encoding="utf-8"))

    clips = []
    for row in rows:
        cid = (row.get("clip_id") or "").strip()
        try:
            start = parse_tc(row.get("in_tc", ""))
            end = parse_tc(row.get("out_tc", ""))
        except ValueError:
            continue
        tags = [t for t in (row.get("tags") or "").split(";") if t.strip()]
        recipe_ids = sorted(set(re.findall(r"rec-\d+", row.get("notes") or "")))
        rating_raw = (row.get("rating") or "").strip()
        clips.append(
            {
                "clipId": cid,
                "sourceFile": (row.get("source_file") or "").strip(),
                "inTc": (row.get("in_tc") or "").strip(),
                "outTc": (row.get("out_tc") or "").strip(),
                "durationSec": round(end - start, 3),
                "chapter": (row.get("chapter") or "").strip(),
                "role": (row.get("role") or "").strip(),
                "motion": (row.get("motion") or "").strip(),
                "tags": [t.strip() for t in tags],
                "captionSpace": (row.get("caption_space") or "").strip(),
                "rating": int(rating_raw) if rating_raw.isdigit() else 0,
                "pick": (row.get("pick") or "").strip().lower(),
                "outName": (row.get("out_name") or "").strip() or cid,
                "notes": (row.get("notes") or "").strip(),
                "recipeIds": recipe_ids,
            }
        )

    payload = {
        "_comment": (
            "自動生成。直接編集しない。"
            "docs/templates/sample-clips.csv を編集して "
            "`python3 scripts/slice_clips.py sync-dashboard --write` で再生成する。"
        ),
        "source": "docs/templates/sample-clips.csv",
        "motionVocab": data.get("motion_vocab", []),
        "recipes": data.get("recipes", []),
        "clips": clips,
    }
    text = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"

    print(f"生成先: {rel(DASHBOARD_JSON)}")
    print(f"クリップ {len(clips)} 件 / レシピ {len(payload['recipes'])} 件 / motion語彙 {len(payload['motionVocab'])} 件")

    in_sync = DASHBOARD_JSON.exists() and DASHBOARD_JSON.read_text(encoding="utf-8") == text

    if check:
        # CIでCSVとclips.jsonのズレを検出する。生成物のcommit忘れを防ぐ。
        if in_sync:
            print("\n同期OK: clips.json はCSVと一致しています。")
            return
        print(
            f"\n同期NG: {rel(DASHBOARD_JSON)} がCSVと一致しません。\n"
            "  `python3 scripts/slice_clips.py sync-dashboard --write` を実行してcommitしてください。",
            file=sys.stderr,
        )
        sys.exit(1)

    if not write:
        if in_sync:
            print("\n[dry-run] 既存ファイルと同一。更新不要。")
        else:
            print("\n[dry-run] 実行するには --write を付けてください。")
        return

    DASHBOARD_JSON.parent.mkdir(parents=True, exist_ok=True)
    DASHBOARD_JSON.write_text(text, encoding="utf-8")
    print(f"\n完了: {rel(DASHBOARD_JSON)} を更新しました。")


def show_recipes(chapter: str | None, motion: str | None, as_json: bool) -> None:
    """レシピを絞り込んで表示する。人間にもAIにも同じ入口を提供する。"""
    import json

    if not RECIPES_PATH.exists():
        die(f"レシピ辞書が見つかりません: {rel(RECIPES_PATH)}")
    data = json.loads(RECIPES_PATH.read_text(encoding="utf-8"))
    recipes = data.get("recipes", [])

    if chapter:
        try:
            ch = int(chapter)
        except ValueError:
            die(f"章は数値で指定してください: {chapter!r}")
        recipes = [r for r in recipes if ch in r.get("chapters", [])]
    if motion:
        recipes = [r for r in recipes if motion in r.get("motion", [])]

    if as_json:
        print(json.dumps(recipes, ensure_ascii=False, indent=2))
        return

    if not recipes:
        print("該当するレシピがありません。")
        return

    print(f"レシピ {len(recipes)} 件\n")
    for r in recipes:
        chapters = ",".join(str(c) for c in r.get("chapters", [])) or "-"
        print(f"[{r['id']}] {r['name']}  (章{chapters} / {r.get('role', '-')})")
        print(f"    motion    : {', '.join(r.get('motion', []))}")
        print(f"    ビート    : {r.get('beats', '-')}")
        print(f"    つなぎ    : {r.get('transition', '-')}")
        print(f"    テロップ  : {r.get('caption', '-')}")
        print(f"    避ける    : {r.get('avoid', '-')}")
        if r.get("motion_studio_alt"):
            print(f"    自作代替  : motion-studio の {r['motion_studio_alt']}")
        print()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command")

    p_reel = sub.add_parser("reel", help="プールの動画を1本の確認用リールにまとめる")
    p_reel.add_argument("--write", action="store_true", help="実際に実行する")
    p_reel.add_argument("--keep-temp", action="store_true", help="中間ファイルを消さずに残す")

    p_slice = sub.add_parser("slice", help="CSVに従ってクリップを切り分ける")
    p_slice.add_argument("--write", action="store_true", help="実際に実行する")
    p_slice.add_argument(
        "--status", nargs="+", default=sorted(SLICEABLE_DEFAULT),
        help="切り出し対象の pick 状態 (既定: candidate picked)",
    )
    p_slice.add_argument("--copy", action="store_true", help="再エンコードせず高速に切る(キーフレーム精度)")

    sub.add_parser("validate", help="CSVとレシピ辞書の定義を検証する(ffmpeg/素材不要)")

    p_rec = sub.add_parser("recipes", help="演出レシピを絞り込んで表示する")
    p_rec.add_argument("--chapter", help="章で絞る (例: 1)")
    p_rec.add_argument("--motion", help="motionで絞る (例: drift)")
    p_rec.add_argument("--json", action="store_true", dest="as_json", help="JSONで出力(AI/他ツール向け)")

    p_prev = sub.add_parser("preview", help="各動画から3枚抜いて目視確認用シートを作る")
    p_prev.add_argument("--write", action="store_true", help="実際に生成する")
    p_prev.add_argument("--targets", choices=["pool", "clips"], default="pool",
                        help="対象 (既定: pool)")

    p_sync = sub.add_parser("sync-dashboard", help="movie-dashboard用の clips.json を生成する")
    p_sync.add_argument("--write", action="store_true", help="実際に書き出す")
    p_sync.add_argument("--check", action="store_true", help="CSVとのズレを検出する(CI用。ズレていたら異常終了)")

    args = parser.parse_args()

    if args.command == "reel":
        build_reel(args.write, args.keep_temp)
    elif args.command == "slice":
        slice_clips(args.write, {s.lower() for s in args.status}, args.copy)
    elif args.command == "validate":
        validate_csv()
    elif args.command == "recipes":
        show_recipes(args.chapter, args.motion, args.as_json)
    elif args.command == "preview":
        build_preview(args.write, args.targets)
    elif args.command == "sync-dashboard":
        sync_dashboard(args.write, args.check)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
