"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
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
