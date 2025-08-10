// src/lib/useAuthRedirect.ts
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type When = "authenticated" | "unauthenticated";

/**
 * Redirect helper:
 * - when === "authenticated": if logged in => redirectTo (dùng cho trang login/signup)
 * - when === "unauthenticated": if NOT logged in => redirectTo (dùng cho trang private)
 */
export function useAuthRedirect({
  when,
  redirectTo,
}: {
  when: When;
  redirectTo: string;
}) {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!isMounted) return;

      if (when === "authenticated" && session) {
        router.replace(redirectTo);
      } else if (when === "unauthenticated" && !session) {
        router.replace(redirectTo);
      }
    };

    // initial check
    check();

    // listen to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (when === "authenticated" && session) {
        router.replace(redirectTo);
      } else if (when === "unauthenticated" && !session) {
        router.replace(redirectTo);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router, when, redirectTo]);
}