// src/app/(customer)/addresses/new/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddressNewPage() {
  const router = useRouter();
  const [line1, setLine1] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("TP.HCM");
  const [isDefault, setIsDefault] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user?.id;
    if (!uid) { setErr("Bạn cần đăng nhập."); setLoading(false); return; }

    if (isDefault) {
      await supabase.from("addresses").update({ is_default: false }).eq("user_id", uid);
    }
    const { error } = await supabase.from("addresses").insert({
      user_id: uid,
      line1: line1.trim(),
      ward: ward.trim() || null,
      district: district.trim() || null,
      city: city.trim() || null,
      is_default: isDefault,
    });
    setLoading(false);
    if (error) setErr(error.message);
    else router.replace("/addresses");
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold">Thêm địa chỉ</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border p-6">
        <div>
          <label className="text-sm text-gray-700">Địa chỉ</label>
          <input value={line1} onChange={e => setLine1(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" required />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-gray-700">Phường/Xã</label>
            <input value={ward} onChange={e => setWard(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Quận/Huyện</label>
            <input value={district} onChange={e => setDistrict(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Tỉnh/Thành</label>
            <input value={city} onChange={e => setCity(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} />
          Đặt làm địa chỉ mặc định
        </label>
        <button disabled={loading} className="rounded-lg bg-black px-4 py-2 text-white">
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
        {err && <p className="rounded bg-red-50 p-2 text-sm text-red-700">{err}</p>}
      </form>
    </section>
  );
}