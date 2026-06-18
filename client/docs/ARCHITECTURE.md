# Architecture Overview

This project is a Next.js 15 application using the App Router and TypeScript. Key points:

- App layout: `app/` contains routes and nested layouts. Server components are preferred by default.
- Admin area: `app/admin` (server-managed pages) with `components/admin` for shared UI (Sidebar, TopNav, AdminShell).
- Client portal: `app/client-area` is a separate area for authenticated client workflows.
- Components: reusable UI in `components/` split by feature (cards, forms, navigation, ui).
- Data & types: simple fixtures in `data/`; types in `types/`.
- Styling: TailwindCSS with configuration in `tailwind.config.cjs` and global styles in `styles/globals.css`.
- APIs: add route handlers to `app/api/*`. For development, local mock routes are acceptable.

Conventions

- Use `page.tsx` files for route entry points, `route.ts` for API routes.
- Client-only interactions should include `"use client"` at the top of the file.
- Prefer small components with clear props and TypeScript definitions.
