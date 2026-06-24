import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { syncUserToDb } from "../../../../database/auth";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const user = data.user;
      
      // Update metadata role if email is admin email
      const adminEmail = process.env.ADMIN_EMAIL || "admin@speedxindustry.com";
      const isSystemAdmin = user.email?.toLowerCase() === adminEmail.toLowerCase();
      
      if (isSystemAdmin && user.user_metadata?.role !== "admin") {
        await supabase.auth.updateUser({
          data: { role: "admin" }
        });
        user.user_metadata = { ...user.user_metadata, role: "admin" };
      }

      // Sync user to MongoDB
      await syncUserToDb(user);

      // Determine redirect URL based on role
      const role = isSystemAdmin ? "admin" : (user.user_metadata?.role || "client");
      const redirectUrl = role === "admin" ? "/admin" : "/client-area";
      
      return NextResponse.redirect(`${origin}${redirectUrl}`);
    }
  }

  // Redirect to login page with an error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
