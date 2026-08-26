#!/usr/bin/env bash
set -u

# Generic read-only environment probe for Resolve 21 runtime canaries.
# This script does NOT launch Resolve, install software, edit config, write project files,
# change preferences, or make network requests.

find_resolve_app() {
  for root in "/Applications" "$HOME/Applications"; do
    if [ -d "$root" ]; then
      found=$(find "$root" -maxdepth 4 -type d -name "DaVinci Resolve.app" -print -quit 2>/dev/null || true)
      if [ -n "${found:-}" ]; then
        printf '%s\n' "$found"
        return 0
      fi
    fi
  done
  return 1
}

read_plist_value() {
  plist="$1"
  key="$2"
  if command -v plutil >/dev/null 2>&1; then
    value=$(plutil -extract "$key" raw -o - "$plist" 2>/dev/null || true)
    if [ -n "${value:-}" ]; then
      printf '%s\n' "$value"
      return 0
    fi
  fi
  if [ -x /usr/libexec/PlistBuddy ]; then
    value=$(/usr/libexec/PlistBuddy -c "Print :$key" "$plist" 2>/dev/null || true)
    if [ -n "${value:-}" ]; then
      printf '%s\n' "$value"
      return 0
    fi
  fi
  return 1
}

yes_no_dir() {
  [ -d "$1" ] && printf 'YES\n' || printf 'NO\n'
}

yes_no_env() {
  name="$1"
  eval "value=\${$name-}"
  [ -n "${value:-}" ] && printf 'YES\n' || printf 'NO\n'
}

resolve_app=$(find_resolve_app || true)
resolve_version="UNAVAILABLE"
resolve_build="UNAVAILABLE"
resolve_bundle_id="UNAVAILABLE"

if [ -n "${resolve_app:-}" ] && [ -f "$resolve_app/Contents/Info.plist" ]; then
  info_plist="$resolve_app/Contents/Info.plist"
  resolve_version=$(read_plist_value "$info_plist" CFBundleShortVersionString || printf 'UNKNOWN')
  resolve_build=$(read_plist_value "$info_plist" CFBundleVersion || printf 'UNKNOWN')
  resolve_bundle_id=$(read_plist_value "$info_plist" CFBundleIdentifier || printf 'UNKNOWN')
fi

system_modules="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules"
user_modules="$HOME/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules"

mcp_bin=$(command -v davinci-resolve-mcp 2>/dev/null || true)
mcp_config_hint="NO"
for config in \
  "$HOME/.claude.json" \
  "$HOME/.claude/settings.json" \
  "$HOME/.cursor/mcp.json" \
  "$HOME/.config/claude/claude_desktop_config.json"
do
  if [ -f "$config" ] && grep -qi "davinci-resolve" "$config" 2>/dev/null; then
    mcp_config_hint="YES"
    break
  fi
done

printf '%s\n' "RESOLVE21_RUNTIME_CANARY_PROBE_V1"
printf 'resolveApp=%s\n' "${resolve_app:-NOT_FOUND}"
printf 'resolveVersionFromBundle=%s\n' "$resolve_version"
printf 'resolveBuildFromBundle=%s\n' "$resolve_build"
printf 'resolveBundleId=%s\n' "$resolve_bundle_id"
printf '%s\n' "resolveEdition=UNVERIFIED"
printf 'systemScriptingModulesPresent=%s\n' "$(yes_no_dir "$system_modules")"
printf 'userScriptingModulesPresent=%s\n' "$(yes_no_dir "$user_modules")"
printf 'resolveScriptApiEnvPresent=%s\n' "$(yes_no_env RESOLVE_SCRIPT_API)"
printf 'resolveScriptLibEnvPresent=%s\n' "$(yes_no_env RESOLVE_SCRIPT_LIB)"
printf 'pythonPathEnvPresent=%s\n' "$(yes_no_env PYTHONPATH)"
printf 'davinciMcpBinary=%s\n' "${mcp_bin:-NOT_FOUND}"
printf 'davinciMcpConfiguredHint=%s\n' "$mcp_config_hint"
printf '%s\n' "authoritativeRuntimeIdentity=REQUIRED_FROM_LIVE_RESOLVE_OR_SUPPORTED_API"
printf '%s\n' "mutationsPerformed=NO"
printf '%s\n' "networkRequestsPerformed=NO"
printf '%s\n' "next=Compile one canary with: cd motion-studio && pnpm resolve:canary --list"
