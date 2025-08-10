// src/app/(customer)/profile/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess.session?.user?.id;
      if (!uid) return;
      const { data } = await supabase.from("profiles").select("*").eq("user_id", uid).single();
      if (data) {
        setFullName(data.full_name ?? "");
        setPhone(data.phone ?? "");
      }
    };
    run();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user?.id;
    const { error } = await supabase.from("profiles").upsert(
      { user_id: uid, full_name: fullName.trim(), phone: phone.trim() || null },
      { onConflict: "user_id" }
    );
    setSaving(false);
    setNotice(error ? error.message : "Đã lưu hồ sơ.");
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold">Hồ sơ</h1>
      <form onSubmit={onSave} className="mt-6 space-y-4 rounded-2xl border p-6">
        <div>
          <label className="text-sm text-gray-700">Họ tên</label>
          <input value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm text-gray-700">Số điện thoại</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <button disabled={saving} className="rounded-lg bg-black px-4 py-2 text-white">
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
        {notice && <p className="text-sm mt-2">{notice}</p>}
      </form>
    </section>
  );
}