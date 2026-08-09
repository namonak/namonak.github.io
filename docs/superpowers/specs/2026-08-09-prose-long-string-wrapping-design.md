# Prose Long-String Wrapping Design

## Goal

Prevent an unbroken URL, path, hash, or English identifier inside rendered article prose from widening the document beyond the viewport.

## Approved behavior

Apply `overflow-wrap: anywhere` to `.prose` at every viewport width. The inherited rule introduces an emergency line-break opportunity only when an otherwise unbreakable string cannot fit its available line box.

This means:

- Normal Korean and English prose keeps its existing wrapping behavior.
- Raw URLs, long paths, hashes, and identifiers may wrap when necessary.
- Inline code inherits the defensive wrapping behavior.
- Fenced code blocks retain their existing horizontal scrolling because their preformatted white-space behavior does not permit wrapping.
- Table cells retain their existing `white-space: nowrap` behavior and table-internal horizontal scrolling.

## Scope

Modify only rendered article prose and its browser regression coverage. Do not change article titles, metadata, adjacent navigation, cards, tables, fenced code blocks, category visibility, or content files.

No breakpoint-specific media query is required. The rule is safe at wider viewports because it does not introduce an emergency break while the string fits.

## Verification

Browser tests will add representative long URL and inline-code strings to a real rendered `.prose` container, then verify at desktop, tablet, and mobile widths that:

- The document has no horizontal overflow.
- The injected prose content remains within the prose container.
- Existing table containment and code-block scrolling tests continue to pass.

The implementation remains uncommitted until the user completes visual review.
