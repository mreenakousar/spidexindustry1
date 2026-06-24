import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Gracefully handle missing environment variables in development
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables are missing. Middleware is bypassing checks.");
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          } catch (error) {
            // Can be ignored if called from a Server Component
          }
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();
    const path = url.pathname;

    // Bypass middleware for internal Next.js routes, API routes, and static assets
    if (path.startsWith("/_") || path.startsWith("/api") || path === "/favicon.ico") {
      return response;
    }

    // Admin email check
    const adminEmail = process.env.ADMIN_EMAIL || "admin@speedxindustry.com";
    const isSystemAdmin = user?.email?.toLowerCase() === adminEmail.toLowerCase();
    const role = user ? (isSystemAdmin ? "admin" : (user.user_metadata?.role || "client")) : null;

    // Protect Admin Area
    if (path.startsWith("/admin")) {
      if (!user) {
        return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url));
      }
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/client-area", request.url));
      }
    }

    // Protect Client Area
    if (path.startsWith("/client-area")) {
      if (!user) {
        return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url));
      }
      if (role !== "client" && role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Redirect logged-in users away from Auth pages
    if (user && (path === "/login" || path === "/signup")) {
      const redirectUrl = role === "admin" ? "/admin" : "/client-area";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  } catch (error) {
    console.error("Middleware auth check failed:", error);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
