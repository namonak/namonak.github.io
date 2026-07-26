# ADR 0002: Render Mermaid diagrams at build time

- Status: Accepted
- Date: 2026-07-26

## Context

Technical posts use Mermaid diagrams. Rendering them in the browser adds client-side JavaScript work and can leave diagrams unavailable until hydration.

## Decision

Transform fenced Mermaid blocks to SVG while Astro builds the site. Treat invalid Mermaid syntax as a build or validation error.

## Consequences

- Published diagrams are immediately visible static SVG content.
- The site avoids a Mermaid client runtime.
- Authors receive feedback before an invalid diagram reaches GitHub Pages.
- Diagram CSS must keep SVG content readable and non-clipped on mobile.
