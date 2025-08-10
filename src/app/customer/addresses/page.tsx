// src/app/(customer)/addresses/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AddressesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user?.id;
    const { data } = await supabase.from("addresses").select("*").eq("user_id", uid).order("is_default", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function makeDefault(id: string) {
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user?.id;
    // unset others
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", uid);
    await supabase.from("addresses").update({ is_default: true }).eq("id", id).eq("user_id", uid);
    load();
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Địa chỉ</h1>
        <Link href="/addresses/new" className="rounded-lg bg-black px-4 py-2 text-white text-sm">Thêm địa chỉ</Link>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {loading ? "Đang tải…" : items.length ? items.map(a => (
          <div key={a.id} className="rounded-2xl border p-4">
            <div className="font-medium">{a.line1}</div>
            <div className="text-sm text-gray-600">{[a.ward, a.district, a.city].filter(Boolean).join(", ")}</div>
            <div className="mt-3 flex gap-2">
              {!a.is_default && (
                <button onClick={() => makeDefault(a.id)} className="rounded-lg border px-3 py-1.5 text-sm">Đặt mặc định</button>
              )}
              {a.is_default && <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">Mặc định</span>}
            </div>
          </div>
        )) : <div>Chưa có địa chỉ.</div>}
      </div>
    </section>
  );
}