# Premium Clothing Manufacturing Website

A starter Next.js 15 (App Router) TypeScript project for a premium clothing manufacturing site. Built with TailwindCSS, Framer Motion, React Hook Form and Zod.

Prerequisites

- Node.js 18 or 20
- npm (bundled with Node.js)

Quick start (development)

```bash
npm install
npm run dev
```

Build and run (production)

```bash
npm run build
npm start
```

Available scripts (see `package.json`)

- `dev`: start Next.js in development mode
- `build`: compile the app for production (also checks TypeScript/Next compilation)
- `start`: run the compiled production build

Project structure (important paths)

- `app/` — application routes and pages (App Router)
- `app/api/` — API route handlers
- `components/` — reusable React components organized by feature
- `data/` — data fixtures and small utilities
- `types/` — TypeScript types and interfaces
- `styles/globals.css` — global Tailwind styles

Notes and conventions

- This repo uses the Next.js App Router. Prefer server components by default and add `use client` at the top of files that use React hooks or browser APIs.
- Styling is done with TailwindCSS; keep global configuration in `tailwind.config.cjs` and `styles/globals.css`.
- There is no test harness in the repo — run `npm run build` locally to validate TypeScript and Next compilation.

Agent and contributor guidance

- For quick context and AI agent guidance, see [AGENTS.md](AGENTS.md).
- To add a new page, create a `page.tsx` under `app/...`.
- To add an API route, add a `route.ts` under `app/api/...`.

Contributing

- Fork, create a branch, and open a pull request. Keep changes small and focused.

Known gotchas

- Targeting Next.js 15: some older Next patterns may be obsolete.
- Ensure `use client` is added where components rely on client-only behavior.

---

Generated to provide clearer setup and navigation for contributors and automation.
