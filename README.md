![React Doctor](https://www.react.doctor/share/badge?p=zsk-portfolio&s=100)

# zsk-portfolio

Personal portfolio built with React, TypeScript, Vite, Zustand, React Query, and vanilla-extract.

## Stack

- React + TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- vanilla-extract
- Font Awesome

## Getting Started

### Prerequisites

- Bun (recommended)

### Install

```bash
bun install
```

### Run Dev Server

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Preview Build

```bash
bun run preview
```

## Project Structure

```text
src/
  components/
  hooks/
  routes/
  screens/
  stores/
  styles/
  types/
  utils/
public/
  portfolio-data.json
```

## Architecture Notes

- `AppWrapper` owns global providers and shell-level layout concerns.
- `Screen` centralizes section/container/title/loading/error behavior.
- Routing is lazy-loaded through `routes/`.
- Theme and sidebar are state-driven with Zustand stores.
- Complex UI domains use compound components where it improves clarity:
  - Activity timeline
  - Service card
  - Project card

## Data Source

Portfolio content is read from `public/portfolio-data.json`.

Type definitions are in `src/types/portfolio.ts`.

## Memoization Notes

Current status:

- Memoization is used only in derived list/view-model hotspots.
- No broad or premature memoization is applied.

Implemented memoization:

- `src/components/about/EducationSection.tsx`
  - memoized derived timeline items.
- `src/components/about/ExperienceSection.tsx`
  - memoized derived timeline items.
- `src/screens/ProjectScreen.tsx`
  - memoized project view-model (`projectHref`, `isExternal`).

Guideline:

- Add memoization when profiling shows measurable render cost.
- Prefer readability when computations are cheap.

## Scripts

- `bun run dev` - start development server
- `bun run build` - type-check and build for production
- `bun run preview` - preview production build

## Related Docs

- `PORTFOLIO_DATA_GUIDE.md` for portfolio data shape and usage examples.
