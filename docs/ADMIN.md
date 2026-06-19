# Admin Area Development Guide

This file explains how the `app/admin` area is organized and how to work on Admin features.

Structure

- `app/admin/layout.tsx` — admin layout wrapper used by all admin routes.
- `app/admin/page.tsx` — main dashboard page.
- `components/admin` — shared admin UI (Sidebar, TopNav, AdminShell, widgets, tables).
- `types/admin.ts` — TypeScript interfaces for admin data models.
- `data/adminMock.ts` — simple mock data used for scaffolding UI.

Development notes

- Start by editing components in `components/admin` and pages under `app/admin/<route>`.
- For API scaffolding, add mock endpoints under `app/api/admin/*` (e.g. `orders/route.ts`).
- Use Zod for validation and TanStack Query for data fetching when integrating with a real backend.
- Ensure admin UI is responsive; Sidebar is fixed at desktop widths and collapses on mobile.

Accessibility

- Use semantic elements (nav, header, main, aside) and ARIA attributes carefully.

Testing

- Validate changes by running `npm run build` and viewing the admin pages locally with `npm run dev`.
