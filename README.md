# Zeeshan Portfolio Architecture

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://izsk.netlify.app)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)

> **Live Application Server**: [https://izsk.netlify.app](https://izsk.netlify.app)

![Zeeshan Portfolio Interface](https://izsk.netlify.app/images/screenshot.png)

This repository serves as my interactive full-stack developer portfolio. More importantly, it is a living showcase of modern system design, web performance optimization, and rigorous frontend architectural patterns.

Built using **React 19**, **Vite 8**, **TypeScript**, and **Vanilla Extract**, the core goal of this repository was to over-engineer a simple domain (a portfolio) to demonstrate capability in building scalable, enterprise-grade web applications.

---

## 🏗️ Architectural Decisions & Paradigms

The codebase departs heavily from standard junior-level React templates. It enforces strict separation of concerns, heavily optimizes Core Web Vitals, and utilizes patterns explicitly requested in Staff/Senior engineering environments.

### 1. Headless Data Architecture (Static JSON API)

Rather than hardcoding personal data (experience, skills, projects) directly into React `.tsx` files, the data layer has been completely decoupled. All content is strictly maintained in a JSON database located within the `public/` directory.

- **Why this was chosen**: This simulates a Headless CMS architecture. If I ever want to build an alternative portfolio layout in Vue or Svelte next year, I simply fetch the exact same static JSON tree. It totally separates structural UI development from data entry.

### 2. TanStack Query + Ky Data Fetching

Wait, why bring in a heavy async state manager like React Query to fetch a static, local JSON file?

- **Why this is relevant**: While native `fetch` inside a `useEffect` would execute the job, that is an anti-pattern known for causing race conditions, missing cancellation tokens, and re-rendering loops. React Query instantly gives us request deduplication, background caching, stale-time mechanics, and removes all raw `useEffect` logic. `Ky` was utilized over `axios` to ensure the HTTP client is built natively on top of the modern Fetch API, slashing bundle weight.

### 3. The Compound Component Pattern

Certain architectural layout nodes across this project utilize the **Compound Component Pattern** (similar to how `<select>` and `<option>` operate natively).

- **Why this is critical**: Prop-drilling forces rigidly defined UI components. By leveraging compound components, we share implicit state internally (usually via Context) while allowing the consumer completely arbitrary control over the layout. It proves an understanding of Inversion of Control (IoC), rendering massive, cluttered `props` interfaces obsolete.

### 4. Zero-Runtime CSS (Vanilla Extract)

Instead of utilizing Tailwind or a heavy runtime-injected CSS-in-JS solution like Styled-Components, the layout relies exclusively on `Vanilla Extract`.

- **The Value**: Styles are written strictly using TypeScript, providing absolute type-safety for global tokens (`vars.color.background`), but are compiled at build-time directly to static `.css` files. This means 0ms runtime metric delays usually associated with JS style evaluations on mobile processors.

### 5. Multi-Dimensional Design System (Theme Contracts)

Most developers implement a basic "Dark Mode" and stop there. This repository utilizes `createThemeContract` through Vanilla Extract to formulate **over 15 distinct semantic color palettes** (color-1 through color-9) that seamlessly scale across both Light and Dark paradigms natively.

- **The Impact**: This creates a fully dynamic, type-safe Design System engine capable of hot-swapping semantic CSS variables on the fly without breaking a single layout rule—exactly mirroring massive white-label enterprise applications.

### 6. React 19 Compiler Integration (Auto-Memoization)

Configuring `babel-plugin-react-compiler` alongside **React 19** at the bundler layer explicitly drops the historical need to manually wrap hooks in `useMemo` and `useCallback`.

- **Why this was executed**: By leveraging the official experimental React Compiler, the entire component tree is automatically memoized mathematically by Vite, preventing all unnecessary re-renders implicitly. It demonstrates a massive optimization leap.

### 7. Hydration-Safe State Persistence

Application states (such as active theme or sound preferences) are handled gracefully via Zustand's `persist` middleware, securely writing choices dynamically to browser `localStorage`.

- **The Value**: Unlike typical React Context architectures that suffer from layout-shifting "hydration mismatch" errors when the server state disagrees with the local browser state, this architecture fully sidesteps that trap. It delivers perfectly synchronized session memory out-of-the-box.

---

## 📦 Custom NPM Packages Engineered for this Repository

Rather than depending solely on third-party libraries, I abstracted internal structural needs into my own strict, open-source NPM dependencies to demonstrate package management and generalized lifecycle APIs.

- **[zsk-react-error](https://github.com/sk-izsk/zsk-react-error)**
  Provides a completely self-contained, highly strict `ErrorBoundary` layout to safely capture rendering and networking crashes, preventing the catastrophic "White Screen of Death" in production.
- **[zsk-react-i18n](https://github.com/sk-izsk/zsk-react-i18n)**
  A lightweight, context-driven localization wrapper utilized to seamlessly switch the application's internal text graphs between English and French with zero layout tearing.

---

## ⚡ Performance Optimization Benchmarks

- **PWA Ready**: Integrated via `vite-plugin-pwa` with a registered Service Worker caching all network assets. The application will boot up at 60fps on a previously-visited mobile phone instantly, even with airplane mode engaged.
- **React.lazy Route Splitting**: The router natively imports application chunks conditionally via `<Suspense>`.
- **Keyboard A11y Hooking**: Programmatically intercepted `window.keydown` bindings for power-users. (Try `Cmd/Ctrl + D` to download the CV, or `T` to invert layouts).
- **Asset/Network Throttling**: Interactive components (like native clicks) are generated mathematically utilizing the browser's native `AudioContext` mapping, meaning no audio buffers are needlessly pushed over the HTTPS layer!

---

## 🏃🏽‍♂️ Local Run Instructions

If you wish to clone this and stress-test the pipeline:

```bash
# Clone Repository
git clone https://github.com/sk-izsk/zsk-portfolio.git
cd zsk-portfolio

# Install node packages natively utilizing Bun
bun install

# Run the lightning-fast Vite environment locally
bun start
```

_Code metrics formulated logically by Shaikh Zeeshan Murshed._
