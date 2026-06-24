import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase env vars missing — middleware bypassing auth checks.");
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        } catch {
          // Ignored when called from a Server Component
        }
      },
    },
  });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // Skip internal Next.js routes, API routes, and static assets
    if (
      path.startsWith("/_") ||
      path.startsWith("/api") ||
      path === "/favicon.ico"
    ) {
      return response;
    }

    /**
     * Role source of truth: app_metadata.role
     * This field can ONLY be set via Supabase SQL editor or service-role API.
     * It cannot be modified by the user from the client — making it secure for RBAC.
     *
     * To grant admin role via Supabase SQL editor:
     *   UPDATE auth.users
     *   SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
     *   WHERE email = 'your-admin@example.com';
     */
    const role: string | null = user ? (user.app_metadata?.role || "client") : null;

    // ── Protect /admin ──────────────────────────────────────────────
    if (path.startsWith("/admin")) {
      if (!user) {
        return NextResponse.redirect(
          new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url)
        );
      }
      if (role !== "admin") {
        // Authenticated but not admin → send to their portal
        return NextResponse.redirect(new URL("/client-area", request.url));
      }
    }

    // ── Protect /client-area ─────────────────────────────────────────
    if (path.startsWith("/client-area")) {
      if (!user) {
        return NextResponse.redirect(
          new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url)
        );
      }
    }

    // ── Redirect logged-in users away from /login and /signup ────────
    if (user && (path === "/login" || path === "/signup")) {
      const dest = role === "admin" ? "/admin" : "/client-area";
      return NextResponse.redirect(new URL(dest, request.url));
    }
  } catch (error) {
    console.error("Middleware auth check failed:", error);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
