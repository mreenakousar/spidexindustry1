# Copilot / AI Assistant Instructions

This repository contains a public website and an Admin ERP dashboard (Next.js 15, App Router).

When assisting contributors or making changes, follow these principles:

- Preserve existing app structure under `app/`. Prefer adding new `page.tsx` files for routes.
- Use `use client` only in components that require client-side hooks or browser APIs.
- Keep UI components in `components/` and types in `types/`.
- For admin work, prefer adding files under `app/admin` and reusable pieces under `components/admin`.
- Avoid running external network calls; implement local `app/api/*` mock routes for feature scaffolding.
- Link to documentation instead of duplicating it: see [AGENTS.md](AGENTS.md) and [README.md](README.md).

If you modify code, run `npm run build` locally (or in CI) to ensure TypeScript/Next checks pass.
