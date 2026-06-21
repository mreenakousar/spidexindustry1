"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "../../src/actions/auth";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.replace("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className}
    >
      Logout
    </button>
  );
}

