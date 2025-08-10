// app/(auth)/callback/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const run = async () => {
      const code = search.get("code");
      const errDesc = search.get("error_description");

      if (errDesc) {
        console.error("OAuth error:", errDesc);
        router.replace("/login");
        return;
      }

      if (!code) {
        router.replace("/login");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error(error);
        router.replace("/login");
        return;
      }

      // Kiểm tra profile có phone chưa
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;
      if (!userId) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("phone")
        .eq("user_id", userId)
        .single();

      if (!profile?.phone) {
        router.replace("/verify-otp");
      } else {
        router.replace("/");
      }
    };

    run();
  }, [router, search]);

  return (
    <div className="min-h-dvh grid place-items-center">
      <div>Đang xác thực...</div>
    </div>
  );
}