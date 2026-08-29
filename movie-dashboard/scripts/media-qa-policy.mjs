import fs from "node:fs";

export function classifyMediaSet(files, exists = fs.existsSync) {
  const present = files.filter((file) => exists(file));
  const missing = files.filter((file) => !exists(file));
  return {
    mode: present.length === 0 ? "ABSENT" : missing.length === 0 ? "COMPLETE" : "PARTIAL",
    present,
    missing,
  };
}

export function assertCompleteOrAbsent(label, state, errors) {
  if (state.mode !== "PARTIAL") return;
  errors.push(`${label} is partially installed; missing: ${state.missing.join(", ")}`);
}
