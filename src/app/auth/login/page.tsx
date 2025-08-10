// app/(auth)/login/page.tsx
"use client";

import { useAuthRedirect } from "@/lib/useAuthRedirect";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";


type Mode = "email" | "phone";

export default function LoginPage() {
  useAuthRedirect({ when: "authenticated", redirectTo: "/" });
  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback` // nếu có callback riêng, tạo route tương ứng
      : undefined;

  async function onLoginEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setNotice("Đã gửi mã/đường dẫn đăng nhập đến email của bạn.");
  }

  async function onLoginPhone(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setLoading(false);
    if (error) setError(error.message);
    else setNotice("Đã gửi mã OTP qua SMS. Vui lòng nhập mã ở bước kế tiếp.");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Đăng nhập</h1>
      <p className="mt-1 text-sm text-gray-600">
        Chọn phương thức đăng nhập để tiếp tục đặt lịch.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode("email")}
          className={`rounded-lg border px-3 py-2 text-sm ${mode === "email" ? "bg-gray-100" : ""}`}
        >
          Email OTP
        </button>
        <button
          onClick={() => setMode("phone")}
          className={`rounded-lg border px-3 py-2 text-sm ${mode === "phone" ? "bg-gray-100" : ""}`}
        >
          SMS OTP (SĐT)
        </button>
      </div>

      {mode === "email" ? (
        <form onSubmit={onLoginEmail} className="mt-6 space-y-4">
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
          <button
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2 text-white"
          >
            {loading ? "Đang gửi..." : "Gửi mã/Link đăng nhập"}
          </button>
        </form>
      ) : (
        <form onSubmit={onLoginPhone} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Số điện thoại</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+84xxxxxxxxx"
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              Nhập theo chuẩn E.164, ví dụ: +84901234567.
            </p>
          </div>
          <button
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2 text-white"
          >
            {loading ? "Đang gửi..." : "Gửi OTP SMS"}
          </button>
          <p className="text-xs text-gray-500">
            Đã nhận mã? <Link className="underline" href="/verify-phone">Nhập OTP tại đây</Link>.
          </p>
        </form>
      )}

      {notice && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 text-sm text-gray-700">
        Chưa có tài khoản? <Link href="/signup" className="underline">Đăng ký</Link>
      </div>
    </div>
  );
}