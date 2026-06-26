import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/me
 *
 * Server-side route that reads the Supabase session cookie and returns
 * the current user's profile and role. The Navbar and other client
 * components call this instead of doing any client-side role guessing.
 *
 * Role source of truth: auth.users.raw_app_meta_data.role
 * (app_metadata can only be set server-side — secure for RBAC)
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ user: null, role: null }, { status: 200 });
    }

    // Role comes from app_metadata (set server-side / via SQL only)
    const role: string = user.app_metadata?.role || "client";
    const name: string =
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "";
    const avatarUrl: string =
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      "";

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name,
        avatarUrl,
      },
      role,
    });
  } catch {
    return NextResponse.json({ user: null, role: null }, { status: 200 });
  }
}
