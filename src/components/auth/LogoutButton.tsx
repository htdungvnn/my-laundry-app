// src/components/LogoutButton.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const onSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={onSignOut}
      className={className ?? "rounded-lg border px-3 py-1.5 text-sm"}
      title="Đăng xuất"
    >
      Đăng xuất
    </button>
  );
}