// src/components/HeaderAuthActions.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

export default function HeaderAuthActions() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setIsAuthed(!!data.session);
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // tránh nháy UI: render rỗng trong lúc xác định session
  if (isAuthed === null) return null;

  if (!isAuthed) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login" className="rounded-lg border px-3 py-1.5 text-sm">Đăng nhập</Link>
        <Link href="/auth/signup" className="rounded-lg bg-black px-3 py-1.5 text-sm text-white">Đăng ký</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/public/dashboard" className="rounded-lg border px-3 py-1.5 text-sm">Tài khoản</Link>
      <LogoutButton className="rounded-lg border px-3 py-1.5 text-sm" />
    </div>
  );
}