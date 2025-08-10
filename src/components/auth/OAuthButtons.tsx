"use client";

import { supabase } from "@/lib/supabaseClient";

export default function OAuthButtons() {
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;

  const signInOAuth = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        scopes: provider === "google"
          ? "openid email profile"
          : "public_profile email"
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => signInOAuth("google")}
        className="rounded-lg border px-3 py-2 text-sm"
      >
        Đăng nhập với Google
      </button>
      <button
        onClick={() => signInOAuth("facebook")}
        className="rounded-lg border px-3 py-2 text-sm"
      >
        Đăng nhập với Facebook
      </button>
    </div>
  );
}