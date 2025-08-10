// src/app/(customer)/orders/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderRow = {
  id: string;
  code: string;
  status: string;
  total_amount: number | null;
  created_at: string;
};

export default function OrdersPage() {
  const [items, setItems] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;
      if (!userId) { setItems([]); setLoading(false); return; }

      const { data } = await supabase
        .from("orders")
        .select("id, code, status, total_amount, created_at")
        .eq("customer_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

      setItems((data ?? []) as OrderRow[]);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Đơn hàng</h1>
        <Link className="rounded-lg bg-black px-4 py-2 text-white text-sm" href="/order/new">Tạo đơn</Link>
      </div>
      <div className="mt-6 rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Mã đơn</th>
              <th className="px-3 py-2 text-left">Trạng thái</th>
              <th className="px-3 py-2 text-left">Tổng tiền</th>
              <th className="px-3 py-2 text-left">Ngày tạo</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-3 py-3" colSpan={5}>Đang tải…</td></tr>
            ) : items.length ? (
              items.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="px-3 py-2 font-mono">{o.code}</td>
                  <td className="px-3 py-2">{viStatus(o.status)}</td>
                  <td className="px-3 py-2">{(o.total_amount ?? 0).toLocaleString()}₫</td>
                  <td className="px-3 py-2">{new Date(o.created_at).toLocaleString("vi-VN")}</td>
                  <td className="px-3 py-2">
                    <Link className="underline" href={`/order/${o.code}`}>Chi tiết</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td className="px-3 py-3" colSpan={5}>Chưa có đơn hàng.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function viStatus(s: string) {
  const map: Record<string, string> = {
    draft: "Nháp",
    pending_payment: "Chờ thanh toán",
    paid: "Đã thanh toán",
    assigned: "Đã phân công",
    picked_up: "Đã lấy đồ",
    processing: "Đang xử lý",
    ready: "Sẵn sàng",
    out_for_delivery: "Đang giao",
    completed: "Hoàn tất",
    canceled: "Huỷ",
    refunded: "Hoàn tiền",
  };
  return map[s] ?? s;
}