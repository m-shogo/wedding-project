import {useMemo, useState} from "react";

type MediaKind = "photo" | "photo-or-video";

export type LocalMediaIntakeSlot = {
  id: string;
  canonicalStem: string;
  label: string;
  kind: MediaKind;
};

type SelectedFile = {
  name: string;
  stem: string;
  extension: string;
};

const photoExtensions = new Set(["jpg", "jpeg", "png", "webp"]);
const videoExtensions = new Set(["mp4", "mov", "webm"]);

function parseFileName(name: string): SelectedFile {
  const base = name.split(/[\\/]/).pop() ?? name;
  const dot = base.lastIndexOf(".");
  if (dot <= 0 || dot === base.length - 1) {
    return {name: base, stem: base, extension: ""};
  }
  return {
    name: base,
    stem: base.slice(0, dot),
    extension: base.slice(dot + 1).toLowerCase(),
  };
}

function extensionAllowed(kind: MediaKind, extension: string) {
  if (photoExtensions.has(extension)) return true;
  return kind === "photo-or-video" && videoExtensions.has(extension);
}

export function LocalMediaIntakeValidator({
  slots,
  title = "投入前ファイル名チェック",
}: {
  slots: LocalMediaIntakeSlot[];
  title?: string;
}) {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const result = useMemo(() => {
    const selected = selectedNames.map(parseFileName);
    const slotByStem = new Map(slots.map((slot) => [slot.canonicalStem, slot]));
    const matchedBySlot = new Map<string, SelectedFile[]>();
    const unexpected: SelectedFile[] = [];
    const invalidExtension: Array<{file: SelectedFile; slot: LocalMediaIntakeSlot}> = [];

    for (const file of selected) {
      const slot = slotByStem.get(file.stem);
      if (!slot) {
        unexpected.push(file);
        continue;
      }
      if (!extensionAllowed(slot.kind, file.extension)) {
        invalidExtension.push({file, slot});
        continue;
      }
      const current = matchedBySlot.get(slot.id) ?? [];
      current.push(file);
      matchedBySlot.set(slot.id, current);
    }

    const duplicates = slots
      .map((slot) => ({slot, files: matchedBySlot.get(slot.id) ?? []}))
      .filter((item) => item.files.length > 1);
    const matched = slots.filter((slot) => (matchedBySlot.get(slot.id)?.length ?? 0) === 1);
    const missing = slots.filter((slot) => (matchedBySlot.get(slot.id)?.length ?? 0) === 0);
    const clean = selected.length > 0
      && matched.length === slots.length
      && unexpected.length === 0
      && invalidExtension.length === 0
      && duplicates.length === 0;

    return {selected, matched, missing, unexpected, invalidExtension, duplicates, clean};
  }, [selectedNames, slots]);

  return (
    <section className="mb-8 border-2 border-cyan-200 dark:border-cyan-800">
      <div className="p-4 md:p-5 border-b border-cyan-100 dark:border-cyan-900/60">
        <p className="text-[10px] tracking-[0.18em] font-semibold text-cyan-600 dark:text-cyan-300">LOCAL PRECHECK / NO UPLOAD</p>
        <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-navy-900 dark:text-sand-100">{title}</h2>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
              実ファイルをコピーする前に、選んだローカルファイルの名前・拡張子・重複をcanonical slotへ照合します。ブラウザ内で名前だけ検査し、ファイル本体はアップロードしません。
            </p>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-mono font-bold ${result.clean ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-200"}`}>
            {result.clean ? "NAMES READY" : `${result.matched.length}/${slots.length} MATCHED`}
          </span>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <label className="inline-flex cursor-pointer items-center gap-2 bg-navy-800 px-3 py-2 text-xs font-semibold text-white dark:bg-sand-100 dark:text-navy-900">
          ファイルを選んで検査
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.webm"
            className="sr-only"
            onChange={(event) => setSelectedNames(Array.from(event.currentTarget.files ?? []).map((file) => file.name))}
          />
        </label>
        {result.selected.length === 0 ? (
          <p className="mt-3 text-xs text-navy-400">まだファイル未選択。canonical名へリネームした候補をまとめて選択してください。</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-px bg-sand-200 dark:bg-navy-600">
            <div className="bg-white dark:bg-navy-800 p-3"><p className="text-[9px] text-navy-400">SELECTED</p><p className="mt-1 font-mono font-bold">{result.selected.length}</p></div>
            <div className="bg-white dark:bg-navy-800 p-3"><p className="text-[9px] text-navy-400">MATCHED</p><p className="mt-1 font-mono font-bold text-emerald-700 dark:text-emerald-300">{result.matched.length}</p></div>
            <div className="bg-white dark:bg-navy-800 p-3"><p className="text-[9px] text-navy-400">MISSING</p><p className="mt-1 font-mono font-bold text-amber-700 dark:text-amber-300">{result.missing.length}</p></div>
            <div className="bg-white dark:bg-navy-800 p-3"><p className="text-[9px] text-navy-400">PROBLEMS</p><p className="mt-1 font-mono font-bold text-red-700 dark:text-red-300">{result.unexpected.length + result.invalidExtension.length + result.duplicates.length}</p></div>
          </div>
        )}

        {result.selected.length > 0 && !result.clean ? (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            {result.missing.length > 0 ? (
              <div>
                <p className="font-semibold text-amber-700 dark:text-amber-300">MISSING canonical stem</p>
                <div className="mt-2 space-y-1">{result.missing.map((slot) => <code key={slot.id} className="block break-all text-[10px]">{slot.canonicalStem}</code>)}</div>
              </div>
            ) : null}
            {result.unexpected.length > 0 || result.invalidExtension.length > 0 || result.duplicates.length > 0 ? (
              <div>
                <p className="font-semibold text-red-700 dark:text-red-300">FIX BEFORE COPY</p>
                <div className="mt-2 space-y-1 text-[10px] text-navy-600 dark:text-navy-300">
                  {result.unexpected.map((file) => <p key={`unexpected-${file.name}`}>UNKNOWN: <code>{file.name}</code></p>)}
                  {result.invalidExtension.map(({file, slot}) => <p key={`invalid-${file.name}`}>INVALID TYPE: <code>{file.name}</code> → {slot.label}</p>)}
                  {result.duplicates.map(({slot, files}) => <p key={`duplicate-${slot.id}`}>DUPLICATE: <code>{slot.canonicalStem}</code> ({files.map((file) => file.name).join(", ")})</p>)}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {result.clean ? (
          <p className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            canonical filename / extension / duplicate check PASS。次に実ファイルを指定のMotion Studio folderへコピーし、repo側のsync/preflightで実体を再検証してください。
          </p>
        ) : null}

        <p className="mt-4 text-[10px] text-navy-400">LOCAL_NAME_CHECK_PASS != FILE_COPIED / FILE_COPIED != PRODUCTION_READY</p>
      </div>
    </section>
  );
}
