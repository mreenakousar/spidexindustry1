"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "../../actions/auth";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={className}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}