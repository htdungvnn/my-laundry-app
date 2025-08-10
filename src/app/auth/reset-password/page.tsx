// app/(auth)/reset-password/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export const metadata = { title: "Đặt lại mật khẩu" };

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/update-password`
      : undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setNotice("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
      <p className="mt-1 text-sm text-gray-600">Nhập email để nhận liên kết đặt lại mật khẩu.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@example.com"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <button disabled={loading} className="w-full rounded-lg bg-black px-4 py-2 text-white">
          {loading ? "Đang gửi..." : "Gửi hướng dẫn"}
        </button>
      </form>

      {notice && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}