// app/(auth)/verify-otp/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setNotice(null);
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setNotice("Xác thực thành công. Đang chuyển trang...");
      // Điều hướng về dashboard/đặt lịch sau khi xác thực
      setTimeout(() => router.push("/"), 800);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Nhập mã OTP</h1>
      <p className="mt-1 text-sm text-gray-600">
        Vui lòng nhập số điện thoại và mã OTP bạn đã nhận qua SMS.
      </p>

      <form onSubmit={onVerify} className="mt-6 space-y-4">
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
        </div>
        <div>
          <label className="text-sm text-gray-700">Mã OTP</label>
          <input
            required
            inputMode="numeric"
            pattern="[0-9]*"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="6 chữ số"
            className="mt-1 w-full rounded-lg border px-3 py-2 tracking-widest"
          />
        </div>
        <button disabled={loading} className="w-full rounded-lg bg-black px-4 py-2 text-white">
          {loading ? "Đang kiểm tra..." : "Xác thực"}
        </button>
      </form>

      {notice && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}