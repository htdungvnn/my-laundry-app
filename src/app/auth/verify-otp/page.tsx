"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Supabase hiện không hỗ trợ update phone trực tiếp bằng OTP trong auth v2
    // Cách: signInWithOtp để verify số, sau đó update profiles.phone
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { shouldCreateUser: false },
    });

    setLoading(false);
    if (error) setError(error.message);
    else setStep("verify");
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Lưu phone vào profiles
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;
      if (userId) {
        await supabase.from("profiles").update({ phone }).eq("user_id", userId);
      }
      router.replace("/dashboard");
    }
  }

  return (
    <section className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-bold mb-4">Xác thực số điện thoại</h1>

      {step === "enter" && (
        <form onSubmit={sendOtp} className="space-y-4">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+84xxxxxxxxx"
            className="w-full rounded-lg border px-3 py-2"
            required
          />
          <button
            disabled={loading}
            className="w-full rounded-lg bg-black text-white px-3 py-2"
          >
            {loading ? "Đang gửi..." : "Gửi OTP"}
          </button>
        </form>
      )}

      {step === "verify" && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            className="w-full rounded-lg border px-3 py-2"
            required
          />
          <button
            disabled={loading}
            className="w-full rounded-lg bg-black text-white px-3 py-2"
          >
            {loading ? "Đang xác thực..." : "Xác thực"}
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </section>
  );
}