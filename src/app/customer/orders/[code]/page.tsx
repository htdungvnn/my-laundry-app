// src/app/(customer)/order/[code]/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data: ord } = await supabase.from("orders").select("*").eq("code", code).single();
      setOrder(ord ?? null);
      if (ord) {
        const { data: its } = await supabase.from("order_items").select("*, services(name, unit)").eq("order_id", ord.id);
        setItems(its ?? []);
      }
      setLoading(false);
    };
    run();
  }, [code]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Đơn hàng {code}</h1>
      {loading ? <p className="mt-3">Đang tải…</p> : order ? (
        <>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Info label="Trạng thái" value={viStatus(order.status)} />
            <Info label="Tổng tiền" value={`${(order.total_amount ?? 0).toLocaleString()}₫`} />
            <Info label="Tạo lúc" value={new Date(order.created_at).toLocaleString("vi-VN")} />
          </div>
          <div className="mt-6 rounded-2xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">Dịch vụ</th>
                  <th className="px-3 py-2 text-left">SL</th>
                  <th className="px-3 py-2 text-left">Đơn giá</th>
                  <th className="px-3 py-2 text-left">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="px-3 py-2">{i.services?.name} ({i.services?.unit})</td>
                    <td className="px-3 py-2">{i.qty}</td>
                    <td className="px-3 py-2">{(i.price ?? 0).toLocaleString()}₫</td>
                    <td className="px-3 py-2">{(i.amount ?? i.qty * (i.price ?? 0)).toLocaleString()}₫</td>
                  </tr>
                ))}
                {!items.length && <tr><td className="px-3 py-3" colSpan={4}>Chưa có dòng dịch vụ.</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-3">Không tìm thấy đơn.</p>
      )}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
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