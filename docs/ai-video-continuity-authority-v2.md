# AI Video Continuity Authority v2

## Why v2 exists

The original continuity fingerprint bound an approved timeline to the selected AI result Asset ID, path, scene duration, model/preset and available media metadata. That detected most editing changes, but it could not distinguish a different video overwritten at the same path when duration/resolution/fps stayed the same.

Continuity fingerprint v2 also includes the selected Asset's `sha256-sampled-v1` probe fingerprint when available. This makes a later local-video replacement change the continuity fingerprint even when the saved path and common metadata remain unchanged.

## Migration behavior

The fingerprint prefix changes from `v1-` to `v2-`. Existing v1 continuity PASS records therefore become stale once v2 code evaluates the movie. This is intentional: the previous PASS was not bound to sampled media identity. Re-run the existing continuity visual check once and save a new PASS.

## Limits

`sha256-sampled-v1` is not a full-file hash. It samples bounded regions from the beginning, middle and end of the file. v2 therefore improves authority against common accidental replacements but does not claim cryptographic full-file integrity.

If an older adopted Asset has no sample fingerprint, v2 still binds to the existing Asset ID/path/media metadata. The absence of a sample fingerprint does not fabricate one or automatically fail the movie.

Formal continuity PASS remains a human visual sign-off. A sample fingerprint can invalidate stale authority, but it can never grant authority by itself.
