// src/app/(customer)/promos/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function PromosPage() {
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      // tuỳ bạn lưu promos ở đâu; ví dụ bảng "promotions"
      const { data } = await supabase.from("promotions").select("*").eq("active", true).order("created_at", { ascending: false });
      setPromos(data ?? []);
    };
    run();
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Mã khuyến mãi</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {promos.length ? promos.map(p => (
          <div key={p.id} className="rounded-2xl border p-4">
            <div className="font-semibold">{p.code}</div>
            <div className="text-sm text-gray-600">{p.description}</div>
            <div className="text-xs text-gray-500 mt-1">HSD: {p.expired_at ? new Date(p.expired_at).toLocaleDateString("vi-VN") : "—"}</div>
          </div>
        )) : <div>Hiện chưa có khuyến mãi.</div>}
      </div>
    </section>
  );
}