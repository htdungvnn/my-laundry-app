// app/(auth)/update-password/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setNotice("Đặt lại mật khẩu thành công!");
      setTimeout(() => router.push("/login"), 800);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Cập nhật mật khẩu</h1>
      <p className="mt-1 text-sm text-gray-600">Nhập mật khẩu mới của bạn.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-700">Mật khẩu mới</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <button disabled={loading} className="w-full rounded-lg bg-black px-4 py-2 text-white">
          {loading ? "Đang cập nhật..." : "Lưu mật khẩu"}
        </button>
      </form>

      {notice && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}