#!/usr/bin/env bash
set -u

# Read-only local documentation probe for the OTIO scripting surface.
# It does not launch Resolve, connect to the scripting API, mutate a project,
# install anything, or make network requests.

roots=(
  "/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting"
  "$HOME/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting"
)

readme=""
for root in "${roots[@]}"; do
  if [ -d "$root" ]; then
    candidate=$(find "$root" -maxdepth 2 -type f \( -iname 'README.txt' -o -iname 'README.md' -o -iname '*Scripting*.txt' \) -print -quit 2>/dev/null || true)
    if [ -n "${candidate:-}" ]; then
      readme="$candidate"
      break
    fi
  fi
done

has_literal() {
  literal="$1"
  if [ -z "$readme" ]; then
    printf 'UNAVAILABLE\n'
  elif grep -Fq "$literal" "$readme" 2>/dev/null; then
    printf 'YES\n'
  else
    printf 'NO\n'
  fi
}

printf '%s\n' 'RESOLVE21_OTIO_API_READONLY_PROBE_V1'
printf 'scriptingReadme=%s\n' "${readme:-NOT_FOUND}"
printf 'importTimelineFromFileMention=%s\n' "$(has_literal 'ImportTimelineFromFile')"
printf 'otioImportTokenMention=%s\n' "$(has_literal 'OTIO')"
printf 'timelineExportMention=%s\n' "$(has_literal 'Export(fileName, exportType, exportSubtype)')"
printf 'exportOtioConstantMention=%s\n' "$(has_literal 'EXPORT_OTIO')"
printf '%s\n' 'apiCallsPerformed=NO'
printf '%s\n' 'resolveLaunchPerformed=NO'
printf '%s\n' 'mutationsPerformed=NO'
printf '%s\n' 'networkRequestsPerformed=NO'
printf '%s\n' 'guardrail=README_SURFACE_PRESENT != RUNTIME_CALL_VERIFIED'
printf '%s\n' 'next=If the exact local README exposes the OTIO surface, a disposable runtime canary may test the supported call; otherwise use the documented Resolve UI route.'
