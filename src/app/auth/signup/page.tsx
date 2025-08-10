// app/(auth)/signup/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAuthRedirect } from "@/lib/useAuthRedirect";
import Link from "next/link";
import { useState } from "react";

type Mode = "email" | "phone";

export default function SignupPage() {
   useAuthRedirect({ when: "authenticated", redirectTo: "/" });
  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;

  async function onSignupEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setNotice("Đã gửi email xác thực. Vui lòng kiểm tra hộp thư.");
  }

  async function onSignupPhone(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { shouldCreateUser: true },
    });
    setLoading(false);
     if (error) {
    setError(error.message);
  } else {
    setNotice(
      <>
        Đã gửi OTP SMS.{" "}
        <Link href="./verify-otp" className="underline">
          Nhập mã tại trang xác thực OTP
        </Link>
        .
      </>
    );
  }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Đăng ký</h1>
      <p className="mt-1 text-sm text-gray-600">
        Tạo tài khoản nhanh để đặt lịch giặt là.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode("email")}
          className={`rounded-lg border px-3 py-2 text-sm ${mode === "email" ? "bg-gray-100" : ""}`}
        >
          Email
        </button>
        <button
          onClick={() => setMode("phone")}
          className={`rounded-lg border px-3 py-2 text-sm ${mode === "phone" ? "bg-gray-100" : ""}`}
        >
          Số điện thoại
        </button>
      </div>

      {mode === "email" ? (
        <form onSubmit={onSignupEmail} className="mt-6 space-y-4">
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
            {loading ? "Đang gửi..." : "Gửi email xác thực"}
          </button>
        </form>
      ) : (
        <form onSubmit={onSignupPhone} className="mt-6 space-y-4">
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
            <p className="mt-1 text-xs text-gray-500">Ví dụ: +84901234567.</p>
          </div>
          <button disabled={loading} className="w-full rounded-lg bg-black px-4 py-2 text-white">
            {loading ? "Đang gửi..." : "Gửi OTP SMS"}
          </button>
        </form>
      )}

      {notice && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 text-sm text-gray-700">
        Đã có tài khoản? <Link href="/login" className="underline">Đăng nhập</Link>
      </div>
    </div>
  );
}