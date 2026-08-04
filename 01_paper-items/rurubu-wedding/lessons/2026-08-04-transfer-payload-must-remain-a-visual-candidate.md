# Transfer payload must remain a visual candidate

Date: 2026-08-04
Applies to: Rurubu V5/V6 and later image-placement workflows
Status: `TESTED / NOT PROMOTED TO PROJECT_RULE`

## Source

V5-10 back-cover main-image preparation for semantic node `77:24`.

## Hypothesis

A role-sized derivative can be recompressed to fit a bounded network-independent transfer while preserving enough visual information for a live screenshot trial.

## Result

The approved `944 × 608` composition was retained while reducing the transfer candidate from 73,152 bytes at WebP Q60 to 33,886 bytes at WebP Q22. The Q22 file was saved and read back from Drive as ID `1g9EeXoIsX_GFZX8RV03Qt3joNUvakXcf`.

## Failure

The external Figma upload URL again failed at DNS resolution. No live placement occurred and no photo-role completion was claimed.

## Lesson

A payload-constrained derivative is only a transport candidate. Dimension compliance and a locally plausible preview do not replace live whole-item, reading-scale, and actual-size QA. Preserve the higher-quality derivative and master so a compressed candidate can be rejected without loss.

## Adopted/rejected status

- adopted: preserve dimensions and composition while testing a bounded transfer derivative
- rejected: treating lower byte size or local preview as live visual completion
- project-wide promotion: pending evidence from a successful live placement and three-scale comparison

## Next application

Place the candidate on a bounded semantic node, verify the image hash and structure, and reject it if map linework, rings, fabric, notebook texture, or photo detail visibly degrades. If rejected, use chunked transfer for the higher-quality derivative rather than compressing further.
